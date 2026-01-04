import { api } from './api';

export interface Agent {
  id: string;
  name: string;
  type: 'supply-chain' | 'vendor' | 'sustainability' | 'economic' | 'cultural' | 'orchestrator';
  status: 'active' | 'inactive' | 'running';
  successRate: number;
  decisionsCount: number;
}

export interface AgentAction {
  id: string;
  agentId: string;
  action: string;
  result: any;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export const agentsService = {
  async getAgents(): Promise<Agent[]> {
    try {
      const response = await api.get('/agents');
      return response.data;
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  },

  async triggerAgent(agentId: string, payload: any) {
    try {
      return await api.post(`/agents/${agentId}/trigger`, payload);
    } catch (error) {
      console.error('Error triggering agent:', error);
      throw error;
    }
  },

  async getAgentActions(agentId: string) {
    try {
      const response = await api.get(`/agents/${agentId}/actions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching agent actions:', error);
      return [];
    }
  },

  async updateAgent(agentId: string, config: any) {
    try {
      return await api.put(`/agents/${agentId}`, config);
    } catch (error) {
      console.error('Error updating agent:', error);
      throw error;
    }
  },
};

export default agentsService;
