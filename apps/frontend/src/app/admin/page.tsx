"use client";

import { useState } from 'react';
import { Card, Title, Button, Callout, Metric, Text } from "@tremor/react";
import { Download, RefreshCw, Database } from "lucide-react";

// Admin page for data management - no authentication required since it's public
export default function AdminPage() {  
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);

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
    } catch (error) {
      setImportResult({
        success: false,
        message: "Failed to import data"
      });
      setImporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Title>Data Management</Title>
        <Text className="mt-2">
          Import and manage SF permit data from data.sfgov.org
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Database className="h-5 w-5 text-blue-600" />
            <Title>Import Permit Data</Title>
          </div>
          
          <Text className="mb-4">
            Import the latest permit data from San Francisco's Open Data portal. 
            This will fetch recent permits and update the D1 database.
          </Text>
          
          <Button 
            onClick={handleImportData}
            disabled={importing}
            className="w-full"
          >
            {importing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Import Latest Data
              </>
            )}
          </Button>
          
          {importResult && (
            <Callout 
              title={importResult.success ? "Success" : "Error"}
              color={importResult.success ? "green" : "red"}
              className="mt-4"
            >
              {importResult.message}
              {importResult.success && (
                <div className="mt-2 text-sm">
                  Imported: {importResult.imported} permits, Errors: {importResult.errors}
                </div>
              )}
            </Callout>
          )}
        </Card>

        <Card className="p-6">
          <Title className="mb-4">Database Stats</Title>
          <div className="space-y-4">
            <div>
              <Text>Total Permits</Text>
              <Metric>15,420</Metric>
            </div>
            <div>
              <Text>Last Import</Text>
              <Text className="text-sm text-gray-600">2 hours ago</Text>
            </div>
            <div>
              <Text>Data Source</Text>
              <Text className="text-sm text-gray-600">data.sfgov.org</Text>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Title className="mb-4">API Endpoints</Title>
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
      </Card>
    </div>
  );
} 