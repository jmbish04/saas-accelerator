# SF Permit Dashboard

A public, serverless dashboard for San Francisco building permits powered by Cloudflare Workers, D1 database, and Workers AI.

## Features

- 🏗️ **Real-time Permit Data** - Import and visualize SF building permits from data.sfgov.org
- 🗄️ **Cloudflare D1 Database** - Serverless SQLite database for permit storage
- 🤖 **AI-Powered Insights** - Analyze permit trends using Cloudflare Workers AI (Llama 3)
- 📊 **Interactive Dashboard** - Charts, KPIs, and data tables
- 🗺️ **Map Visualization** - Geographic permit distribution (placeholder)
- 💬 **AI Chat Assistant** - Ask questions about permit data in natural language
- 🚀 **Fully Serverless** - No authentication, payments, or user accounts required

## Tech Stack

**Backend (Cloudflare Workers)**
- Hono.js API framework
- Cloudflare D1 (SQLite) database
- Drizzle ORM for database operations
- Workers AI for natural language processing
- Socrata API integration for SF Open Data

**Frontend (Next.js)**
- React + TypeScript + Tailwind CSS
- Tremor components for dashboard UI
- Lucide React icons
- Static export for Cloudflare Pages deployment

## Getting Started

### Prerequisites

- Node.js 18+
- Cloudflare account
- Wrangler CLI installed globally: `npm install -g wrangler`

### 1. Clone and Setup

```bash
git clone <repository-url>
cd saas-accelerator
```

### 2. Deploy D1 Database

```bash
cd apps/backend

# Create D1 database
wrangler d1 create permit-dashboard

# Update wrangler.toml with your database ID
# Replace "permit-dashboard" in database_id with the actual ID from the create command

# Generate and run migrations
npm run db:generate
wrangler d1 migrations apply permit-dashboard
```

### 3. Deploy Backend (Worker)

```bash
cd apps/backend

# Deploy to Cloudflare Workers
wrangler deploy

# Note the deployed URL (e.g., https://permit-dashboard.your-subdomain.workers.dev)
```

### 4. Import Permit Data

After deployment, import SF permit data:

```bash
# Call the import endpoint
curl -X POST https://your-worker-url.workers.dev/api/import-permits \
  -H "Content-Type: application/json" \
  -d '{"limit": 5000}'
```

Or use the admin interface at `/admin` after frontend deployment.

### 5. Deploy Frontend

```bash
cd apps/frontend

# Update API URL in next.config.js
# Set WORKER_API_URL to your deployed Worker URL

# Build static site
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy out --project-name permit-dashboard-frontend
```

## API Endpoints

### Data Endpoints
- `GET /api/permits` - List permits with pagination
- `GET /api/permits/stats` - Permit statistics and counts
- `GET /api/permits/map` - Permit locations for map visualization
- `GET /api/dashboard` - Combined dashboard data with AI insights

### Data Management
- `POST /api/import-permits` - Import data from SF Open Data API

### AI Endpoints
- `POST /api/ai/analyze` - AI analysis of permit data trends
- `POST /api/ai/question` - Natural language Q&A about permits

### Example API Calls

```bash
# Get recent permits
curl https://your-worker-url.workers.dev/api/permits?limit=10

# Get permit statistics  
curl https://your-worker-url.workers.dev/api/permits/stats

# Ask AI a question
curl -X POST https://your-worker-url.workers.dev/api/ai/question \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the most common permit types in SF?"}'

# Get AI analysis
curl -X POST https://your-worker-url.workers.dev/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{"question": "Show me trends in residential permits"}'
```

## Development

### Backend Development

```bash
cd apps/backend

# Start local development server
npm run dev

# Run tests
npm test
```

### Frontend Development

```bash
cd apps/frontend

# Start development server
npm run dev

# Build for production
npm run build
```

## Data Import Process

The application imports permit data from San Francisco's Open Data portal using the Socrata API:

**Data Source:** https://data.sfgov.org/resource/i98e-djp9.json

**Import Process:**
1. Fetches recent permits from Socrata API
2. Transforms data to match D1 schema
3. Handles duplicates and errors gracefully
4. Stores in Cloudflare D1 database

**Available Fields:**
- Permit ID, type, and status
- Application and processing dates
- Property address and location
- Project description and costs
- Zoning and district information

## AI Functionality

### Analysis Features
- Trend identification in permit data
- Statistical insights and patterns
- Neighborhood and district analysis
- Processing time analysis

### Chat Assistant
- Natural language queries about permits
- Real-time responses using Llama 3
- Context-aware answers based on actual data
- Fallback responses for complex queries

### Extending AI Features

To add new AI capabilities:

1. **Backend:** Add new endpoints in `src/app.ts`
2. **AI Service:** Extend `src/services/permit-ai.ts`
3. **Frontend:** Update components to use new endpoints

```typescript
// Example: Add permit prediction endpoint
app.post("/api/ai/predict", async (c) => {
  const aiService = new PermitAIService(c.env.AI);
  const prediction = await aiService.predictProcessingTime(permitData);
  return c.json({ prediction });
});
```

## Deployment Architecture

```
Frontend (Cloudflare Pages)
    ↓ API calls
Backend (Cloudflare Workers)
    ↓ Database queries  ↓ AI requests
Cloudflare D1          Workers AI
    ↓ Data import
SF Open Data (Socrata API)
```

## Configuration

### Environment Variables

**Backend (wrangler.toml):**
```toml
[vars]
# Add any configuration variables here
SF_DATA_API_TOKEN = "optional-token-for-higher-rate-limits"
```

**Frontend (next.config.js):**
```javascript
env: {
  WORKER_API_URL: 'https://your-worker-url.workers.dev',
}
```

### Customization

- **Data Sources:** Modify `src/services/permit-data.ts` to add other data sources
- **AI Models:** Change AI model in `src/services/permit-ai.ts`
- **Database Schema:** Update `packages/db/src/schema.ts` for additional fields
- **UI Components:** Customize dashboard in `src/app/page.tsx`

## Monitoring and Maintenance

### Regular Tasks
- Import fresh permit data weekly/monthly
- Monitor D1 database storage usage
- Review AI response quality and accuracy
- Update data schema for new permit fields

### Performance Optimization
- Use D1 indexes for common queries
- Implement caching for frequently accessed data
- Optimize AI prompts for faster responses
- Monitor Worker execution time and memory usage

## Security Considerations

This is a **public dashboard** with no authentication required. All data is publicly available from SF Open Data.

**Built-in Protections:**
- Rate limiting through Cloudflare (if configured)
- Input validation on all endpoints
- Error handling without exposing internal details
- Read-only public API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test locally
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with reproduction steps
3. Include relevant error messages and logs