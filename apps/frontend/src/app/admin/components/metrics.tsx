"use client";
import { Card, Metric, Text } from "@tremor/react";
import { useFetch } from "@/hooks/use-fetch";

const categories = [
  {
    title: "Total Users",
    metric: "0",
    endpoint: "/api/admin/metrics/users",
  },
  {
    title: "MRR",
    metric: "$0",
    endpoint: "/api/admin/metrics/mrr",
  },
  {
    title: "Active Subscriptions",
    metric: "0",
    endpoint: "/api/admin/metrics/subscriptions",
  },
];

export function Metrics() {
  const { data } = useFetch("/api/admin/metrics");

  return (
    <>
      {categories.map((item) => (
        <Card key={item.title}>
          <Text>{item.title}</Text>
          <Metric className="mt-2">
            {data?.[item.title] || item.metric}
          </Metric>
        </Card>
      ))}
    </>
  );
} 