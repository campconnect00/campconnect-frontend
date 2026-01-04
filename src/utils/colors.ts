export const COLORS = {
  // Primary Brand Colors
  trustBlue: '#0078D4',
  sustainabilityGreen: '#107C10',
  alertAmber: '#F7630C',
  criticalRed: '#D13438',
  
  // Neutral Grays
  gray: {
    50: '#F3F2F1',
    100: '#EDEBE9',
    500: '#8A8886',
    900: '#323130'
  },
  
  // Agent Identity Colors
  agents: {
    supplyChain: '#004E8C',
    vendorAssistant: '#CA5010',
    sustainability: '#498205',
    cultural: '#8764B8',
    economic: '#038387',
    orchestrator: '#C19C00'
  }
} as const;

export const getAgentColor = (agentName: string): string => {
  const mapping: Record<string, string> = {
    'supply': COLORS.agents.supplyChain,
    'vendor': COLORS.agents.vendorAssistant,
    'sustainability': COLORS.agents.sustainability,
    'cultural': COLORS.agents.cultural,
    'economic': COLORS.agents.economic,
    'orchestrator': COLORS.agents.orchestrator,
  };
  
  const key = agentName.toLowerCase();
  for (const [k, v] of Object.entries(mapping)) {
    if (key.includes(k)) return v;
  }
  
  return COLORS.trustBlue;
};