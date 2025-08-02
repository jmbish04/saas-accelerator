"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminPage;
const react_1 = require("react");
const react_2 = require("@tremor/react");
const lucide_react_1 = require("lucide-react");
// Admin page for data management - no authentication required since it's public
function AdminPage() {
    const [importing, setImporting] = (0, react_1.useState)(false);
    const [importResult, setImportResult] = (0, react_1.useState)(null);
    const handleImportData = async () => {
        setImporting(true);
        setImportResult(null);
        try {
            // In a real deployment, this would call the Worker API
            // Simulating the API call for now
            setTimeout(() => {
                setImportResult({
                    success: true,
                    imported: 1247,
                    errors: 3,
                    message: "Data import completed successfully"
                });
                setImporting(false);
            }, 3000);
        }
        catch (error) {
            setImportResult({
                success: false,
                message: "Failed to import data"
            });
            setImporting(false);
        }
    };
    return (<div className="space-y-8">
      <div>
        <react_2.Title>Data Management</react_2.Title>
        <react_2.Text className="mt-2">
          Import and manage SF permit data from data.sfgov.org
        </react_2.Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <react_2.Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <lucide_react_1.Database className="h-5 w-5 text-blue-600"/>
            <react_2.Title>Import Permit Data</react_2.Title>
          </div>
          
          <react_2.Text className="mb-4">
            Import the latest permit data from San Francisco's Open Data portal. 
            This will fetch recent permits and update the D1 database.
          </react_2.Text>
          
          <react_2.Button onClick={handleImportData} disabled={importing} className="w-full">
            {importing ? (<>
                <lucide_react_1.RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
                Importing...
              </>) : (<>
                <lucide_react_1.Download className="h-4 w-4 mr-2"/>
                Import Latest Data
              </>)}
          </react_2.Button>
          
          {importResult && (<react_2.Callout title={importResult.success ? "Success" : "Error"} color={importResult.success ? "green" : "red"} className="mt-4">
              {importResult.message}
              {importResult.success && (<div className="mt-2 text-sm">
                  Imported: {importResult.imported} permits, Errors: {importResult.errors}
                </div>)}
            </react_2.Callout>)}
        </react_2.Card>

        <react_2.Card className="p-6">
          <react_2.Title className="mb-4">Database Stats</react_2.Title>
          <div className="space-y-4">
            <div>
              <react_2.Text>Total Permits</react_2.Text>
              <react_2.Metric>15,420</react_2.Metric>
            </div>
            <div>
              <react_2.Text>Last Import</react_2.Text>
              <react_2.Text className="text-sm text-gray-600">2 hours ago</react_2.Text>
            </div>
            <div>
              <react_2.Text>Data Source</react_2.Text>
              <react_2.Text className="text-sm text-gray-600">data.sfgov.org</react_2.Text>
            </div>
          </div>
        </react_2.Card>
      </div>

      <react_2.Card className="p-6">
        <react_2.Title className="mb-4">API Endpoints</react_2.Title>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>GET /api/permits</span>
            <span className="text-green-600">Active</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>GET /api/permits/stats</span>
            <span className="text-green-600">Active</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>GET /api/permits/map</span>
            <span className="text-green-600">Active</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>POST /api/ai/analyze</span>
            <span className="text-green-600">Active</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>POST /api/ai/question</span>
            <span className="text-green-600">Active</span>
          </div>
        </div>
      </react_2.Card>
    </div>);
}
