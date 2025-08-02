// Utility for making API calls to the Cloudflare Worker
const WORKER_API_URL = process.env.WORKER_API_URL || 'https://permit-dashboard.your-subdomain.workers.dev';

class APIClient {
  private baseUrl: string;

  constructor(baseUrl = WORKER_API_URL) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  }

  async post(endpoint: string, data: any) {
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

export const apiClient = new APIClient();

// API functions
export const permitAPI = {
  // Get dashboard data
  getDashboard: () => apiClient.get('/api/dashboard'),
  
  // Get permit statistics
  getStats: () => apiClient.get('/api/permits/stats'),
  
  // Get permits with pagination
  getPermits: (limit = 100, offset = 0) => 
    apiClient.get(`/api/permits?limit=${limit}&offset=${offset}`),
  
  // Get permits for map
  getMapData: (limit = 500) => 
    apiClient.get(`/api/permits/map?limit=${limit}`),
  
  // Import permit data
  importPermits: (limit = 1000) => 
    apiClient.post('/api/import-permits', { limit }),
  
  // AI Analysis
  getAIAnalysis: (question?: string, permitIds?: string[]) => 
    apiClient.post('/api/ai/analyze', { question, permitIds }),
  
  // AI Question
  askAI: (question: string) => 
    apiClient.post('/api/ai/question', { question }),
};