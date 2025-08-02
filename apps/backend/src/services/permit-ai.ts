// Workers AI integration for permit data analysis
export class PermitAIService {
  private ai: any;

  constructor(ai: any) {
    this.ai = ai;
  }

  async analyzePermitData(permits: any[], question?: string): Promise<string> {
    try {
      // Prepare a summary of the permit data
      const summary = this.prepareDataSummary(permits);
      
      const prompt = question 
        ? `Based on the following San Francisco permit data, answer this question: "${question}"\n\nData Summary:\n${summary}`
        : `Analyze the following San Francisco permit data and provide insights about trends, patterns, and notable observations:\n\n${summary}`;

      const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are an expert data analyst specializing in urban planning and construction permits. Provide clear, concise insights based on the data provided.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000
      });

      return response.response || 'Unable to generate analysis at this time.';
    } catch (error) {
      console.error('Error with Workers AI:', error);
      return 'Sorry, I encountered an error while analyzing the data. Please try again.';
    }
  }

  async answerQuestion(question: string, context?: any): Promise<string> {
    try {
      const contextInfo = context ? `\n\nRelevant context: ${JSON.stringify(context, null, 2)}` : '';
      
      const prompt = `You are an expert on San Francisco building permits and construction data. Answer the following question about SF permits: "${question}"${contextInfo}`;

      const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable assistant specializing in San Francisco building permits, construction trends, and urban development. Provide accurate, helpful information based on permit data and general knowledge of SF construction regulations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800
      });

      return response.response || 'I apologize, but I cannot provide an answer at this time. Please try rephrasing your question.';
    } catch (error) {
      console.error('Error with Workers AI question answering:', error);
      return 'Sorry, I encountered an error while processing your question. Please try again.';
    }
  }

  private prepareDataSummary(permits: any[]): string {
    if (!permits || permits.length === 0) {
      return 'No permit data available.';
    }

    // Basic statistics
    const totalPermits = permits.length;
    const permitTypes = permits.reduce((acc: any, permit) => {
      const type = permit.permitType || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const statuses = permits.reduce((acc: any, permit) => {
      const status = permit.currentStatus || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Top permit types
    const topTypes = Object.entries(permitTypes)
      .sort(([,a]: any, [,b]: any) => b - a)
      .slice(0, 5)
      .map(([type, count]) => `${type}: ${count}`)
      .join(', ');

    // Top statuses
    const topStatuses = Object.entries(statuses)
      .sort(([,a]: any, [,b]: any) => b - a)
      .slice(0, 5)
      .map(([status, count]) => `${status}: ${count}`)
      .join(', ');

    // Recent permits (assuming applicationCreationDate exists)
    const recentPermits = permits
      .filter(p => p.applicationCreationDate)
      .sort((a, b) => new Date(b.applicationCreationDate).getTime() - new Date(a.applicationCreationDate).getTime())
      .slice(0, 3)
      .map(p => `${p.id} (${p.permitType || 'Unknown'}) - ${p.applicationCreationDate}`)
      .join('; ');

    return `
Total Permits: ${totalPermits}

Top Permit Types: ${topTypes}

Top Statuses: ${topStatuses}

Recent Permits: ${recentPermits}

Sample Permit Details:
${permits.slice(0, 3).map(p => 
  `- ID: ${p.id}, Type: ${p.permitType || 'N/A'}, Status: ${p.currentStatus || 'N/A'}, Address: ${p.streetNumber || ''} ${p.streetName || 'N/A'}, Description: ${(p.description || '').substring(0, 100)}...`
).join('\n')}
    `.trim();
  }
}