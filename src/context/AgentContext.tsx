import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Agent, AgentDecision } from '../types/agent';

interface AgentContextType {
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;
  activeAgent: Agent | null;
  setActiveAgent: (agent: Agent | null) => void;
  decisions: AgentDecision[];
  addDecision: (decision: AgentDecision) => void;
  removeDecision: (decisionId: string) => void;
  updateDecision: (decisionId: string, decision: Partial<AgentDecision>) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [decisions, setDecisions] = useState<AgentDecision[]>([]);

  const addDecision = (decision: AgentDecision) => {
    setDecisions([...decisions, decision]);
  };

  const removeDecision = (decisionId: string) => {
    setDecisions(decisions.filter((d) => d.id !== decisionId));
  };

  const updateDecision = (decisionId: string, updatedFields: Partial<AgentDecision>) => {
    setDecisions(
      decisions.map((d) =>
        d.id === decisionId ? { ...d, ...updatedFields } : d
      )
    );
  };

  return (
    <AgentContext.Provider
      value={{
        agents,
        setAgents,
        activeAgent,
        setActiveAgent,
        decisions,
        addDecision,
        removeDecision,
        updateDecision,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgentContext must be used within AgentProvider');
  }
  return context;
};
