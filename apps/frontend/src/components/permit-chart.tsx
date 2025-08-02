"use client";

import { Card, Title, BarChart, PieChart } from "@tremor/react";

interface ChartData {
  [key: string]: string | number;
}

interface PermitChartProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  nameKey: string;
  type?: 'bar' | 'pie';
}

export function PermitChart({ 
  title, 
  data, 
  dataKey, 
  nameKey, 
  type = 'bar' 
}: PermitChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <Title>{title}</Title>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </Card>
    );
  }

  // Transform data for chart compatibility
  const chartData = data.map(item => ({
    name: item[nameKey] as string,
    value: item[dataKey] as number,
    [nameKey]: item[nameKey],
    [dataKey]: item[dataKey],
  }));

  return (
    <Card>
      <Title className="mb-4">{title}</Title>
      {type === 'pie' ? (
        <PieChart
          data={chartData}
          category={dataKey}
          index={nameKey}
          className="h-64"
          colors={['blue', 'green', 'yellow', 'purple', 'red']}
        />
      ) : (
        <BarChart
          data={chartData}
          index={nameKey}
          categories={[dataKey]}
          colors={['blue']}
          className="h-64"
          yAxisWidth={48}
        />
      )}
    </Card>
  );
}