import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { mockAgents, COLORS } from '../../data/mockData';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    agentName?: string;
}

interface AIChatProps {
    isOpen: boolean;
    onClose: () => void;
    selectedAgent?: string;
}

const agentResponses: Record<string, string[]> = {
    'Supply Chain Orchestrator': [
        "Based on current consumption patterns, I predict you'll need to order rice within 5 days. Should I prepare a procurement draft?",
        "I've analyzed 3 vendors for the beef order. Ahmed's Farm offers the best combination of price, reliability, and proximity.",
        "Alert: Milk inventory is critically low. I recommend an urgent order from Mama Grace Dairy - they have 200L available.",
    ],
    'Vendor Assistant': [
        "I've sent an SMS to Ahmed's Farm confirming the delivery for Friday. They responded within 30 minutes.",
        "Mama Grace Dairy has updated their inventory - fresh milk is now available at KES 50/L.",
        "I can help coordinate with vendors. What product are you looking for?",
    ],
    'Sustainability Agent': [
        "Choosing local vendor Ahmed's Farm over international suppliers saves 45kg CO₂ per delivery.",
        "This month's net carbon impact: +2,835 kg CO₂ saved (including 12kg AI operational cost).",
        "I recommend prioritizing Fresh Harvest Vegetables - they have the highest sustainability score at 95%.",
    ],
    'Cultural Liaison': [
        "78% of the camp population requires halal food. I've flagged all non-halal products in pending orders.",
        "Ahmed's Farm and Mama Grace Dairy are both halal certified - safe for procurement.",
        "I can help ensure all orders meet cultural and dietary requirements. What would you like to check?",
    ],
    'Economic Empowerment': [
        "Vendor income distribution is currently at 92% equity score. Ali Cooking Supplies needs more orders for balance.",
        "This month, local vendors have received $4,250 in income from camp procurement.",
        "I recommend spreading the next grain order across Turkana Grains Cooperative to improve equity.",
    ],
    'Meta Orchestrator': [
        "I've synthesized recommendations from all 5 agents. The consensus is to order from Ahmed's Farm for meat products.",
        "Coordinating agent inputs... Supply Chain prioritizes speed, Sustainability recommends local, Cultural confirms halal. All agents agree on Ahmed's Farm.",
        "How can I help coordinate the AI agents for you today?",
    ],
};

const getRandomResponse = (agentName: string): string => {
    const responses = agentResponses[agentName] || agentResponses['Meta Orchestrator'];
    return responses[Math.floor(Math.random() * responses.length)];
};

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, selectedAgent }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: `Hello! I'm ${selectedAgent || 'the CampConnect AI'}. How can I assist you with camp logistics today?`,
            timestamp: new Date(),
            agentName: selectedAgent || 'Meta Orchestrator',
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        const agentName = selectedAgent || 'Meta Orchestrator';
        const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: getRandomResponse(agentName),
            timestamp: new Date(),
            agentName,
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const currentAgent = mockAgents.find(a => a.name === selectedAgent) || mockAgents[5];

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-4">
            {/* Header */}
            <div
                className="px-4 py-3 flex items-center justify-between text-white"
                style={{ backgroundColor: currentAgent.color }}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{currentAgent.name}</h3>
                        <p className="text-xs text-white/80">AI Assistant</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                    ? 'bg-blue-600'
                                    : ''
                                }`}
                            style={message.role === 'assistant' ? { backgroundColor: currentAgent.color } : undefined}
                        >
                            {message.role === 'user' ? (
                                <User className="w-4 h-4 text-white" />
                            ) : (
                                <Bot className="w-4 h-4 text-white" />
                            )}
                        </div>
                        <div
                            className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${message.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-md'
                                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-md'
                                }`}
                        >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400'
                                }`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-3">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: currentAgent.color }}
                        >
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about inventory, vendors, or orders..."
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        disabled={isTyping}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full transition-colors"
                    >
                        {isTyping ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                    AI responses are simulated for demo purposes
                </p>
            </div>
        </div>
    );
};
