"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
const react_1 = require("react");
const react_2 = require("@tremor/react");
const stats_cards_1 = require("@/components/stats-cards");
const permit_chart_1 = require("@/components/permit-chart");
const permit_map_1 = require("@/components/permit-map");
const permit_table_1 = require("@/components/permit-table");
const ai_insights_1 = require("@/components/ai-insights");
const ai_chat_1 = require("@/components/ai-chat");
const api_1 = require("@/lib/api");
function HomePage() {
    const [dashboardData, setDashboardData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchDashboard = async () => {
            try {
                // Try to call the actual API, fallback to demo data
                try {
                    const data = await api_1.permitAPI.getDashboard();
                    setDashboardData(data);
                }
                catch (apiError) {
                    console.log('API not available, using demo data');
                    // Fallback to demo data if API is not available
                    setDashboardData({
                        stats: {
                            totalPermits: 15420,
                            byStatus: [
                                { status: 'ISSUED', count: 8234 },
                                { status: 'FILED', count: 3456 },
                                { status: 'APPROVED', count: 2345 },
                                { status: 'EXPIRED', count: 1385 }
                            ],
                            byType: [
                                { type: 'Alterations', count: 6789 },
                                { type: 'New Construction', count: 3456 },
                                { type: 'Demolition', count: 2345 },
                                { type: 'Additions', count: 1890 },
                                { type: 'Sign', count: 940 }
                            ]
                        },
                        recentPermits: [
                            {
                                id: '2024010001',
                                permitType: 'Alterations',
                                streetNumber: '123',
                                streetName: 'Market St',
                                currentStatus: 'ISSUED',
                                applicationCreationDate: '2024-01-15'
                            },
                            {
                                id: '2024010002',
                                permitType: 'New Construction',
                                streetNumber: '456',
                                streetName: 'Mission St',
                                currentStatus: 'FILED',
                                applicationCreationDate: '2024-01-14'
                            },
                            {
                                id: '2024010003',
                                permitType: 'Demolition',
                                streetNumber: '789',
                                streetName: 'Van Ness Ave',
                                currentStatus: 'APPROVED',
                                applicationCreationDate: '2024-01-13'
                            },
                        ],
                        aiInsights: "Based on recent permit data, there's been a 15% increase in residential alteration permits compared to last month, particularly in SOMA and Mission districts. New construction permits have remained steady, with average processing time of 45 days."
                    });
                }
                setLoading(false);
            }
            catch (err) {
                setError('Failed to load dashboard data');
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);
    if (loading) {
        return (<div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>);
    }
    if (error) {
        return (<div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retry
        </button>
      </div>);
    }
    return (<div className="space-y-8">
      {/* Page Title */}
      <div>
        <react_2.Title>San Francisco Building Permits Dashboard</react_2.Title>
        <react_2.Text className="mt-2">
          Real-time insights into SF building permits with AI-powered analysis
        </react_2.Text>
      </div>

      {/* Stats Overview */}
      <stats_cards_1.StatsCards data={dashboardData?.stats}/>

      {/* AI Insights */}
      <ai_insights_1.AIInsights insights={dashboardData?.aiInsights}/>

      {/* Main Content Tabs */}
      <react_2.TabGroup>
        <react_2.TabList>
          <react_2.Tab>Overview</react_2.Tab>
          <react_2.Tab>Map</react_2.Tab>
          <react_2.Tab>Data</react_2.Tab>
          <react_2.Tab>AI Chat</react_2.Tab>
        </react_2.TabList>
        
        <react_2.TabPanels>
          <react_2.TabPanel>
            <div className="space-y-6 mt-6">
              <react_2.Grid numItemsMd={2} className="gap-6">
                <permit_chart_1.PermitChart title="Permits by Status" data={dashboardData?.stats?.byStatus || []} dataKey="count" nameKey="status"/>
                <permit_chart_1.PermitChart title="Permits by Type" data={dashboardData?.stats?.byType || []} dataKey="count" nameKey="type"/>
              </react_2.Grid>
              
              <react_2.Card>
                <react_2.Title>Recent Permit Activity</react_2.Title>
                <permit_table_1.PermitTable permits={dashboardData?.recentPermits || []}/>
              </react_2.Card>
            </div>
          </react_2.TabPanel>
          
          <react_2.TabPanel>
            <div className="mt-6">
              <permit_map_1.PermitMap />
            </div>
          </react_2.TabPanel>
          
          <react_2.TabPanel>
            <div className="mt-6">
              <permit_table_1.PermitTable permits={dashboardData?.recentPermits || []} showAll/>
            </div>
          </react_2.TabPanel>
          
          <react_2.TabPanel>
            <div className="mt-6">
              <ai_chat_1.AIChat />
            </div>
          </react_2.TabPanel>
        </react_2.TabPanels>
      </react_2.TabGroup>
    </div>);
}
