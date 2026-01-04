import { useState, useCallback, useEffect } from 'react';
import { agentsService, Agent, AgentAction } from '../services/agents';

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await agentsService.getAgents();
      setAgents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerAgent = useCallback(
    async (agentId: string, payload: any) => {
      try {
        return await agentsService.triggerAgent(agentId, payload);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        throw err;
      }
    },
    []
  );

  const getAgentActions = useCallback(async (agentId: string) => {
    try {
      const data = await agentsService.getAgentActions(agentId);
      setActions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  }, []);

  return {
    agents,
    actions,
    loading,
    error,
    fetchAgents,
    triggerAgent,
    getAgentActions,
  };
};

export default useAgents;
