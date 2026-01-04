import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  process.env.REACT_APP_GEMINI_API_KEY || ''
);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  async generateAgentResponse(
    agentType: string,
    context: any,
    prompt: string
  ): Promise<string> {
    const systemPrompt = this.getAgentSystemPrompt(agentType);
    
    const fullPrompt = `${systemPrompt}

Context: ${JSON.stringify(context)}

Query: ${prompt}

Respond as the ${agentType} agent with structured reasoning.`;

    const result = await this.model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  }

  async predictShortage(inventoryData: any): Promise<any> {
    const prompt = `Analyze this inventory data and predict potential shortages:
${JSON.stringify(inventoryData)}

Return JSON with:
{
  "predictions": [
    {
      "item": "string",
      "shortage_in_days": number,
      "confidence": number (0-1),
      "reasoning": "string"
    }
  ]
}`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse AI response');
  }

  async evaluateVendor(vendorData: any, criteria: any): Promise<any> {
    const prompt = `Evaluate this vendor based on the criteria:

Vendor: ${JSON.stringify(vendorData)}
Criteria: ${JSON.stringify(criteria)}

Return JSON with scores (0-100) for each criterion and overall recommendation.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse AI response');
  }

  private getAgentSystemPrompt(agentType: string): string {
    const prompts: Record<string, string> = {
      'supply-chain': `You are the Supply Chain Agent for CampConnect. Your role is to ensure camps never run out of essential supplies. Analyze consumption patterns, predict shortages 3-7 days in advance, and recommend orders. Prioritize speed and reliability.`,
      
      'sustainability': `You are the Sustainability Advisor Agent. Calculate carbon footprints for all procurement options. Advocate for local sourcing to reduce emissions. Monitor waste and track the AI system's own carbon cost.`,
      
      'cultural': `You are the Cultural Liaison Agent. Ensure all procurement respects dietary restrictions, religious requirements, and cultural preferences. Flag inappropriate items and track cultural holidays.`,
      
      'economic': `You are the Economic Empowerment Agent. Promote fair distribution of orders among vendors. Monitor income equity and help underrepresented vendors grow their business.`,
      
      'orchestrator': `You are the Orchestrator Agent. Synthesize recommendations from all other agents, resolve conflicts, and present unified recommendations to humans with clear tradeoffs.`,
    };
    
    return prompts[agentType] || prompts['orchestrator'];
  }
}

export const gemini = new GeminiService();