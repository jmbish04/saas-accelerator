"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permitAPI = exports.apiClient = void 0;
// Utility for making API calls to the Cloudflare Worker
const WORKER_API_URL = process.env.WORKER_API_URL || 'https://permit-dashboard.your-subdomain.workers.dev';
class APIClient {
    baseUrl;
    constructor(baseUrl = WORKER_API_URL) {
        this.baseUrl = baseUrl;
    }
    async get(endpoint) {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return response.json();
    }
    async post(endpoint, data) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return response.json();
    }
}
exports.apiClient = new APIClient();
// API functions
exports.permitAPI = {
    // Get dashboard data
    getDashboard: () => exports.apiClient.get('/api/dashboard'),
    // Get permit statistics
    getStats: () => exports.apiClient.get('/api/permits/stats'),
    // Get permits with pagination
    getPermits: (limit = 100, offset = 0) => exports.apiClient.get(`/api/permits?limit=${limit}&offset=${offset}`),
    // Get permits for map
    getMapData: (limit = 500) => exports.apiClient.get(`/api/permits/map?limit=${limit}`),
    // Import permit data
    importPermits: (limit = 1000) => exports.apiClient.post('/api/import-permits', { limit }),
    // AI Analysis
    getAIAnalysis: (question, permitIds) => exports.apiClient.post('/api/ai/analyze', { question, permitIds }),
    // AI Question
    askAI: (question) => exports.apiClient.post('/api/ai/question', { question }),
};
