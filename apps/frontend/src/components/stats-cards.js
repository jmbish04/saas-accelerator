"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsCards = StatsCards;
const react_1 = require("@tremor/react");
const lucide_react_1 = require("lucide-react");
function StatsCards({ data }) {
    if (!data) {
        return (<react_1.Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {[1, 2, 3, 4].map((i) => (<react_1.Card key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </react_1.Card>))}
      </react_1.Grid>);
    }
    const issuedPermits = data.byStatus.find(s => s.status === 'ISSUED')?.count || 0;
    const filedPermits = data.byStatus.find(s => s.status === 'FILED')?.count || 0;
    const approvedPermits = data.byStatus.find(s => s.status === 'APPROVED')?.count || 0;
    const cards = [
        {
            title: "Total Permits",
            metric: data.totalPermits.toLocaleString(),
            icon: lucide_react_1.FileText,
            color: "blue",
        },
        {
            title: "Issued",
            metric: issuedPermits.toLocaleString(),
            icon: lucide_react_1.CheckCircle,
            color: "green",
        },
        {
            title: "Filed",
            metric: filedPermits.toLocaleString(),
            icon: lucide_react_1.Clock,
            color: "yellow",
        },
        {
            title: "Processing",
            metric: approvedPermits.toLocaleString(),
            icon: lucide_react_1.TrendingUp,
            color: "purple",
        },
    ];
    return (<react_1.Grid numItemsSm={2} numItemsLg={4} className="gap-6">
      {cards.map((item) => {
            const Icon = item.icon;
            return (<react_1.Card key={item.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <react_1.Text className="text-sm font-medium text-gray-600">
                  {item.title}
                </react_1.Text>
                <react_1.Metric className="text-2xl font-bold mt-1">
                  {item.metric}
                </react_1.Metric>
              </div>
              <div className={`p-3 rounded-full bg-${item.color}-100`}>
                <Icon className={`h-6 w-6 text-${item.color}-600`}/>
              </div>
            </div>
          </react_1.Card>);
        })}
    </react_1.Grid>);
}
