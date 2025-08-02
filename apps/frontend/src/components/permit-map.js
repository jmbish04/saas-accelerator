"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermitMap = PermitMap;
const react_1 = require("@tremor/react");
const lucide_react_1 = require("lucide-react");
function PermitMap() {
    // Since we can't install leaflet dependencies without package installation,
    // we'll create a placeholder that shows the concept
    return (<react_1.Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <lucide_react_1.MapPin className="h-5 w-5 text-green-600"/>
        <react_1.Title>Permit Locations Map</react_1.Title>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300 h-96 flex items-center justify-center">
        <div className="text-center">
          <lucide_react_1.MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
          <react_1.Text className="text-gray-600 mb-2">Interactive Map Placeholder</react_1.Text>
          <react_1.Text className="text-sm text-gray-500 max-w-md">
            This would show an interactive map of San Francisco with permit locations plotted as markers. 
            Each marker would show permit type, status, and details when clicked.
          </react_1.Text>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <react_1.Text className="text-xs">Issued Permits</react_1.Text>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <react_1.Text className="text-xs">Filed Permits</react_1.Text>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <react_1.Text className="text-xs">In Progress</react_1.Text>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <react_1.Text className="text-sm text-blue-800">
          <strong>Map Features:</strong> Filter by permit type, status, date range. 
          Cluster markers for better performance. Click markers for detailed permit information.
        </react_1.Text>
      </div>
    </react_1.Card>);
}
