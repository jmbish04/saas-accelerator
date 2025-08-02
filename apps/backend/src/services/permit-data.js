"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermitDataService = void 0;
// SF Socrata API integration for permit data
const d1_1 = require("drizzle-orm/d1");
const schema_1 = require("@repo/db/schema");
const SF_PERMITS_API = "https://data.sfgov.org/resource/i98e-djp9.json";
class PermitDataService {
    db;
    constructor(database) {
        this.db = (0, d1_1.drizzle)(database);
    }
    async importFromSocrata(limit = 1000) {
        try {
            const response = await fetch(`${SF_PERMITS_API}?$limit=${limit}&$order=permit_creation_date DESC`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            let imported = 0;
            let errors = 0;
            for (const item of data) {
                try {
                    if (!item.permit_number) {
                        errors++;
                        continue;
                    }
                    await this.db.insert(schema_1.permits).values({
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
                }
                catch (error) {
                    console.error(`Error inserting permit ${item.permit_number}:`, error);
                    errors++;
                }
            }
            return { imported, errors };
        }
        catch (error) {
            console.error("Error fetching data from Socrata API:", error);
            throw error;
        }
    }
    async getPermitStats() {
        const totalPermits = await this.db.select().from(schema_1.permits).execute().then((results) => results.length);
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
            .from(schema_1.permits)
            .limit(limit)
            .offset(offset)
            .execute();
    }
    async getPermitsForMap(limit = 500) {
        return await this.db
            .select({
            id: schema_1.permits.id,
            streetNumber: schema_1.permits.streetNumber,
            streetName: schema_1.permits.streetName,
            permitType: schema_1.permits.permitType,
            currentStatus: schema_1.permits.currentStatus,
            location: schema_1.permits.location
        })
            .from(schema_1.permits)
            .where('location IS NOT NULL')
            .limit(limit)
            .execute();
    }
}
exports.PermitDataService = PermitDataService;
