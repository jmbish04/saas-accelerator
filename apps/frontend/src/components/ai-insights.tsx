"use client";

import { Card, Title, Text } from "@tremor/react";
import { Brain, TrendingUp } from "lucide-react";

interface AIInsightsProps {
  insights?: string;
}

export function AIInsights({ insights }: AIInsightsProps) {
  if (!insights) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="h-5 w-5 text-blue-600" />
          <Title>AI Insights</Title>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-blue-100 rounded-full">
          <Brain className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <Title className="text-blue-900">AI Insights</Title>
          <Text className="text-blue-700 text-sm">
            Powered by Cloudflare Workers AI
          </Text>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-blue-100">
        <div className="flex items-start space-x-3">
          <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <Text className="text-gray-800 leading-relaxed">
            {insights}
          </Text>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-blue-600">
        Generated from recent permit data • Updates hourly
      </div>
    </Card>
  );
}