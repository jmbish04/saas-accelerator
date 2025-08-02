"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermitChart = PermitChart;
const react_1 = require("@tremor/react");
function PermitChart({ title, data, dataKey, nameKey, type = 'bar' }) {
    if (!data || data.length === 0) {
        return (<react_1.Card>
        <react_1.Title>{title}</react_1.Title>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </react_1.Card>);
    }
    // Transform data for chart compatibility
    const chartData = data.map(item => ({
        name: item[nameKey],
        value: item[dataKey],
        [nameKey]: item[nameKey],
        [dataKey]: item[dataKey],
    }));
    return (<react_1.Card>
      <react_1.Title className="mb-4">{title}</react_1.Title>
      {type === 'pie' ? (<react_1.PieChart data={chartData} category={dataKey} index={nameKey} className="h-64" colors={['blue', 'green', 'yellow', 'purple', 'red']}/>) : (<react_1.BarChart data={chartData} index={nameKey} categories={[dataKey]} colors={['blue']} className="h-64" yAxisWidth={48}/>)}
    </react_1.Card>);
}
