"use client";

import { Card, Grid, Text, Metric } from "@tremor/react";
import { TrendingUp, FileText, CheckCircle, Clock } from "lucide-react";

interface StatsData {
  totalPermits: number;
  byStatus: Array<{ status: string; count: number }>;
  byType: Array<{ type: string; count: number }>;
}

interface StatsCardsProps {
  data?: StatsData;
}

export function StatsCards({ data }: StatsCardsProps) {
  if (!data) {
    return (
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </Card>
        ))}
      </Grid>
    );
  }

  const issuedPermits = data.byStatus.find(s => s.status === 'ISSUED')?.count || 0;
  const filedPermits = data.byStatus.find(s => s.status === 'FILED')?.count || 0;
  const approvedPermits = data.byStatus.find(s => s.status === 'APPROVED')?.count || 0;

  const cards = [
    {
      title: "Total Permits",
      metric: data.totalPermits.toLocaleString(),
      icon: FileText,
      color: "blue",
    },
    {
      title: "Issued",
      metric: issuedPermits.toLocaleString(),
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Filed",
      metric: filedPermits.toLocaleString(),
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Processing",
      metric: approvedPermits.toLocaleString(),
      icon: TrendingUp,
      color: "purple",
    },
  ];

  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
      {cards.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm font-medium text-gray-600">
                  {item.title}
                </Text>
                <Metric className="text-2xl font-bold mt-1">
                  {item.metric}
                </Metric>
              </div>
              <div className={`p-3 rounded-full bg-${item.color}-100`}>
                <Icon className={`h-6 w-6 text-${item.color}-600`} />
              </div>
            </div>
          </Card>
        );
      })}
    </Grid>
  );
}