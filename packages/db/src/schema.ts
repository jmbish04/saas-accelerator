import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Permits table for SF permit data
export const permits = sqliteTable("permits", {
  id: text("id").primaryKey(), // Use permit application number as ID
  permitType: text("permit_type"),
  permitTypeDefinition: text("permit_type_definition"),
  applicationCreationDate: text("application_creation_date"),
  block: text("block"),
  lot: text("lot"),
  streetNumber: text("street_number"),
  streetName: text("street_name"),
  streetSuffix: text("street_suffix"),
  unit: text("unit"),
  description: text("description"),
  currentStatus: text("current_status"),
  currentStatusDate: text("current_status_date"),
  filedDate: text("filed_date"),
  issuedDate: text("issued_date"),
  completedDate: text("completed_date"),
  firstConstructionDocumentDate: text("first_construction_document_date"),
  structuralNotification: text("structural_notification"),
  numberOfExistingStories: integer("number_of_existing_stories"),
  numberOfProposedStories: integer("number_of_proposed_stories"),
  voluntarySeismicUpgrade: text("voluntary_seismic_upgrade"),
  fireOnlyPermit: text("fire_only_permit"),
  permitExpirationDate: text("permit_expiration_date"),
  estimatedCost: real("estimated_cost"),
  revisedCost: real("revised_cost"),
  existingUse: text("existing_use"),
  existingUnits: integer("existing_units"),
  proposedUse: text("proposed_use"),
  proposedUnits: integer("proposed_units"),
  plansets: integer("plansets"),
  supervisorialDistrict: text("supervisorial_district"),
  neighborhoods: text("neighborhoods"),
  zipcode: text("zipcode"),
  location: text("location"), // JSON string for lat/lng
  recordId: text("record_id"),
});

export type Permit = typeof permits.$inferSelect; 