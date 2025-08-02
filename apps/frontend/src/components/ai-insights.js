"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIInsights = AIInsights;
const react_1 = require("@tremor/react");
const lucide_react_1 = require("lucide-react");
function AIInsights({ insights }) {
    if (!insights) {
        return (<react_1.Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <lucide_react_1.Brain className="h-5 w-5 text-blue-600"/>
          <react_1.Title>AI Insights</react_1.Title>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </react_1.Card>);
    }
    return (<react_1.Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-blue-100 rounded-full">
          <lucide_react_1.Brain className="h-5 w-5 text-blue-600"/>
        </div>
        <div>
          <react_1.Title className="text-blue-900">AI Insights</react_1.Title>
          <react_1.Text className="text-blue-700 text-sm">
            Powered by Cloudflare Workers AI
          </react_1.Text>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-blue-100">
        <div className="flex items-start space-x-3">
          <lucide_react_1.TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0"/>
          <react_1.Text className="text-gray-800 leading-relaxed">
            {insights}
          </react_1.Text>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-blue-600">
        Generated from recent permit data • Updates hourly
      </div>
    </react_1.Card>);
}
