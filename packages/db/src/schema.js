"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permits = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
// Permits table for SF permit data
exports.permits = (0, sqlite_core_1.sqliteTable)("permits", {
    id: (0, sqlite_core_1.text)("id").primaryKey(), // Use permit application number as ID
    permitType: (0, sqlite_core_1.text)("permit_type"),
    permitTypeDefinition: (0, sqlite_core_1.text)("permit_type_definition"),
    applicationCreationDate: (0, sqlite_core_1.text)("application_creation_date"),
    block: (0, sqlite_core_1.text)("block"),
    lot: (0, sqlite_core_1.text)("lot"),
    streetNumber: (0, sqlite_core_1.text)("street_number"),
    streetName: (0, sqlite_core_1.text)("street_name"),
    streetSuffix: (0, sqlite_core_1.text)("street_suffix"),
    unit: (0, sqlite_core_1.text)("unit"),
    description: (0, sqlite_core_1.text)("description"),
    currentStatus: (0, sqlite_core_1.text)("current_status"),
    currentStatusDate: (0, sqlite_core_1.text)("current_status_date"),
    filedDate: (0, sqlite_core_1.text)("filed_date"),
    issuedDate: (0, sqlite_core_1.text)("issued_date"),
    completedDate: (0, sqlite_core_1.text)("completed_date"),
    firstConstructionDocumentDate: (0, sqlite_core_1.text)("first_construction_document_date"),
    structuralNotification: (0, sqlite_core_1.text)("structural_notification"),
    numberOfExistingStories: (0, sqlite_core_1.integer)("number_of_existing_stories"),
    numberOfProposedStories: (0, sqlite_core_1.integer)("number_of_proposed_stories"),
    voluntarySeismicUpgrade: (0, sqlite_core_1.text)("voluntary_seismic_upgrade"),
    fireOnlyPermit: (0, sqlite_core_1.text)("fire_only_permit"),
    permitExpirationDate: (0, sqlite_core_1.text)("permit_expiration_date"),
    estimatedCost: (0, sqlite_core_1.real)("estimated_cost"),
    revisedCost: (0, sqlite_core_1.real)("revised_cost"),
    existingUse: (0, sqlite_core_1.text)("existing_use"),
    existingUnits: (0, sqlite_core_1.integer)("existing_units"),
    proposedUse: (0, sqlite_core_1.text)("proposed_use"),
    proposedUnits: (0, sqlite_core_1.integer)("proposed_units"),
    plansets: (0, sqlite_core_1.integer)("plansets"),
    supervisorialDistrict: (0, sqlite_core_1.text)("supervisorial_district"),
    neighborhoods: (0, sqlite_core_1.text)("neighborhoods"),
    zipcode: (0, sqlite_core_1.text)("zipcode"),
    location: (0, sqlite_core_1.text)("location"), // JSON string for lat/lng
    recordId: (0, sqlite_core_1.text)("record_id"),
});
