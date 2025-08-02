// SF Socrata API integration for permit data
import { drizzle } from "drizzle-orm/d1";
import { permits } from "@repo/db/schema";

const SF_PERMITS_API = "https://data.sfgov.org/resource/i98e-djp9.json";

export interface SocrataPermit {
  permit_number?: string;
  permit_type?: string;
  permit_type_definition?: string;
  permit_creation_date?: string;
  block?: string;
  lot?: string;
  street_number?: string;
  street_name?: string;
  street_suffix?: string;
  unit?: string;
  description?: string;
  current_status?: string;
  current_status_date?: string;
  filed_date?: string;
  issued_date?: string;
  completed_date?: string;
  first_construction_document_date?: string;
  structural_notification?: string;
  number_of_existing_stories?: string;
  number_of_proposed_stories?: string;
  voluntary_seismic_upgrade?: string;
  fire_only_permit?: string;
  permit_expiration_date?: string;
  estimated_cost?: string;
  revised_cost?: string;
  existing_use?: string;
  existing_units?: string;
  proposed_use?: string;
  proposed_units?: string;
  plansets?: string;
  supervisorial_district?: string;
  neighborhoods_analysis_boundaries?: string;
  zipcode?: string;
  location?: {
    latitude?: string;
    longitude?: string;
  };
  record_id?: string;
}

export class PermitDataService {
  private db: any;

  constructor(database: D1Database) {
    this.db = drizzle(database);
  }

  async importFromSocrata(limit = 1000): Promise<{ imported: number; errors: number }> {
    try {
      const response = await fetch(`${SF_PERMITS_API}?$limit=${limit}&$order=permit_creation_date DESC`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SocrataPermit[] = await response.json();
      
      let imported = 0;
      let errors = 0;

      for (const item of data) {
        try {
          if (!item.permit_number) {
            errors++;
            continue;
          }

          await this.db.insert(permits).values({
            id: item.permit_number,
            permitType: item.permit_type || null,
            permitTypeDefinition: item.permit_type_definition || null,
            applicationCreationDate: item.permit_creation_date || null,
            block: item.block || null,
            lot: item.lot || null,
            streetNumber: item.street_number || null,
            streetName: item.street_name || null,
            streetSuffix: item.street_suffix || null,
            unit: item.unit || null,
            description: item.description || null,
            currentStatus: item.current_status || null,
            currentStatusDate: item.current_status_date || null,
            filedDate: item.filed_date || null,
            issuedDate: item.issued_date || null,
            completedDate: item.completed_date || null,
            firstConstructionDocumentDate: item.first_construction_document_date || null,
            structuralNotification: item.structural_notification || null,
            numberOfExistingStories: item.number_of_existing_stories ? parseInt(item.number_of_existing_stories) : null,
            numberOfProposedStories: item.number_of_proposed_stories ? parseInt(item.number_of_proposed_stories) : null,
            voluntarySeismicUpgrade: item.voluntary_seismic_upgrade || null,
            fireOnlyPermit: item.fire_only_permit || null,
            permitExpirationDate: item.permit_expiration_date || null,
            estimatedCost: item.estimated_cost ? parseFloat(item.estimated_cost) : null,
            revisedCost: item.revised_cost ? parseFloat(item.revised_cost) : null,
            existingUse: item.existing_use || null,
            existingUnits: item.existing_units ? parseInt(item.existing_units) : null,
            proposedUse: item.proposed_use || null,
            proposedUnits: item.proposed_units ? parseInt(item.proposed_units) : null,
            plansets: item.plansets ? parseInt(item.plansets) : null,
            supervisorialDistrict: item.supervisorial_district || null,
            neighborhoods: item.neighborhoods_analysis_boundaries || null,
            zipcode: item.zipcode || null,
            location: item.location ? JSON.stringify(item.location) : null,
            recordId: item.record_id || null,
          }).onConflictDoNothing();
          
          imported++;
        } catch (error) {
          console.error(`Error inserting permit ${item.permit_number}:`, error);
          errors++;
        }
      }

      return { imported, errors };
    } catch (error) {
      console.error("Error fetching data from Socrata API:", error);
      throw error;
    }
  }

  async getPermitStats() {
    const totalPermits = await this.db.select().from(permits).execute().then((results: any[]) => results.length);
    
    // Get permits by status
    const statusQuery = `
      SELECT current_status, COUNT(*) as count 
      FROM permits 
      WHERE current_status IS NOT NULL 
      GROUP BY current_status 
      ORDER BY count DESC
    `;
    
    // Get permits by type
    const typeQuery = `
      SELECT permit_type, COUNT(*) as count 
      FROM permits 
      WHERE permit_type IS NOT NULL 
      GROUP BY permit_type 
      ORDER BY count DESC 
      LIMIT 10
    `;

    return {
      totalPermits,
      // TODO: Implement aggregation queries when drizzle D1 supports them better
      byStatus: [],
      byType: []
    };
  }

  async getPermits(limit = 100, offset = 0) {
    return await this.db
      .select()
      .from(permits)
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async getPermitsForMap(limit = 500) {
    return await this.db
      .select({
        id: permits.id,
        streetNumber: permits.streetNumber,
        streetName: permits.streetName,
        permitType: permits.permitType,
        currentStatus: permits.currentStatus,
        location: permits.location
      })
      .from(permits)
      .where('location IS NOT NULL')
      .limit(limit)
      .execute();
  }
}