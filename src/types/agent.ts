export interface Agent {
  id: string;
  name: string;
  type: 'supply-chain' | 'vendor' | 'sustainability' | 'economic' | 'cultural' | 'orchestrator';
  status: 'active' | 'inactive' | 'running';
  successRate: number;
  decisionsCount: number;
  lastAction?: Date;
}

export interface AgentDecision {
  id: string;
  agentId: string;
  title: string;
  description: string;
  reasoning: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'rejected';
}
