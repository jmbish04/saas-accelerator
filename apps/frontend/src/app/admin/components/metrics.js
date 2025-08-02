"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metrics = Metrics;
const react_1 = require("@tremor/react");
const use_fetch_1 = require("@/hooks/use-fetch");
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
function Metrics() {
    const { data } = (0, use_fetch_1.useFetch)("/api/admin/metrics");
    return (<>
      {categories.map((item) => (<react_1.Card key={item.title}>
          <react_1.Text>{item.title}</react_1.Text>
          <react_1.Metric className="mt-2">
            {data?.[item.title] || item.metric}
          </react_1.Metric>
        </react_1.Card>))}
    </>);
}
