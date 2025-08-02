"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const logger_1 = require("hono/logger");
const permit_data_1 = require("./services/permit-data");
const permit_ai_1 = require("./services/permit-ai");
const app = new hono_1.Hono();
// Base middleware
app.use("*", (0, logger_1.logger)(), (0, cors_1.cors)({
    origin: "*", // Allow all origins for public API
    credentials: false,
}));
// Health check
app.get("/health", (c) => c.text("OK"));
// Data import endpoint
app.post("/api/import-permits", async (c) => {
    try {
        const permitService = new permit_data_1.PermitDataService(c.env.DB);
        const { limit } = await c.req.json().catch(() => ({ limit: 1000 }));
        const result = await permitService.importFromSocrata(limit);
        return c.json({
            success: true,
            message: `Import completed: ${result.imported} permits imported, ${result.errors} errors`,
            ...result
        });
    }
    catch (error) {
        console.error("Import error:", error);
        return c.json({ error: "Failed to import permit data" }, 500);
    }
});
// Get permit statistics
app.get("/api/permits/stats", async (c) => {
    try {
        const permitService = new permit_data_1.PermitDataService(c.env.DB);
        const stats = await permitService.getPermitStats();
        return c.json(stats);
    }
    catch (error) {
        console.error("Stats error:", error);
        return c.json({ error: "Failed to fetch permit statistics" }, 500);
    }
});
// Get permits with pagination
app.get("/api/permits", async (c) => {
    try {
        const permitService = new permit_data_1.PermitDataService(c.env.DB);
        const limit = parseInt(c.req.query("limit") || "100");
        const offset = parseInt(c.req.query("offset") || "0");
        const permits = await permitService.getPermits(limit, offset);
        return c.json({
            permits,
            pagination: {
                limit,
                offset,
                hasMore: permits.length === limit
            }
        });
    }
    catch (error) {
        console.error("Permits error:", error);
        return c.json({ error: "Failed to fetch permits" }, 500);
    }
});
// Get permits for map visualization
app.get("/api/permits/map", async (c) => {
    try {
        const permitService = new permit_data_1.PermitDataService(c.env.DB);
        const limit = parseInt(c.req.query("limit") || "500");
        const permits = await permitService.getPermitsForMap(limit);
        return c.json({ permits });
    }
    catch (error) {
        console.error("Map data error:", error);
        return c.json({ error: "Failed to fetch map data" }, 500);
    }
});
// AI Analysis endpoint
app.post("/api/ai/analyze", async (c) => {
    try {
        const { question, permitIds } = await c.req.json();
        const permitService = new permit_data_1.PermitDataService(c.env.DB);
        const aiService = new permit_ai_1.PermitAIService(c.env.AI);
        // Get recent permits for analysis if no specific IDs provided
        const permits = await permitService.getPermits(100, 0);
        const analysis = await aiService.analyzePermitData(permits, question);
        return c.json({
            analysis,
            dataPoints: permits.length,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error("AI analysis error:", error);
        return c.json({ error: "Failed to generate AI analysis" }, 500);
    }
});
// AI Question endpoint
app.post("/api/ai/question", async (c) => {
    try {
        const { question } = await c.req.json();
        if (!question || typeof question !== 'string') {
            return c.json({ error: "Question is required" }, 400);
        }
        const aiService = new permit_ai_1.PermitAIService(c.env.AI);
        const answer = await aiService.answerQuestion(question);
        return c.json({
            question,
            answer,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error("AI question error:", error);
        return c.json({ error: "Failed to process question" }, 500);
    }
});
// Dashboard summary endpoint
app.get("/api/dashboard", async (c) => {
    try {
        const permitService = new permit_data_1.PermitDataService(c.env.DB);
        const aiService = new permit_ai_1.PermitAIService(c.env.AI);
        // Get basic stats and recent permits
        const [stats, recentPermits] = await Promise.all([
            permitService.getPermitStats(),
            permitService.getPermits(50, 0)
        ]);
        // Generate AI insights about recent activity
        const insights = await aiService.analyzePermitData(recentPermits, "What are the key trends and insights from recent permit activity?");
        return c.json({
            stats,
            recentPermits: recentPermits.slice(0, 5), // Just show 5 most recent
            aiInsights: insights,
            lastUpdated: new Date().toISOString()
        });
    }
    catch (error) {
        console.error("Dashboard error:", error);
        return c.json({ error: "Failed to fetch dashboard data" }, 500);
    }
});
exports.default = app;
