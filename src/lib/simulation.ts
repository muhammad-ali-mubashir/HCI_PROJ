import type { Node, Edge } from './types';

interface SimulationResponse {
    nodes: Node[];
    edges: Edge[];
    message: string;
}

const MOCK_RESPONSES: Record<string, SimulationResponse> = {
    "ecommerce": {
        nodes: [
            { id: '1', type: 'trigger', label: 'New Order (Shopify)', position: { x: 100, y: 300 } },
            { id: '2', type: 'function', label: 'Filter > $100', position: { x: 400, y: 200 } },
            { id: '3', type: 'function', label: 'Format Data', position: { x: 400, y: 400 } },
            { id: '4', type: 'action', label: 'Send Slack Alert', position: { x: 700, y: 200 } },
            { id: '5', type: 'action', label: 'Add to CRM', position: { x: 700, y: 400 } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e3-5', source: '3', target: '5' }
        ],
        message: "I've created an e-commerce automation workflow. It filters high-value orders to Slack and adds all orders to your CRM."
    },
    "social": {
        nodes: [
            { id: '1', type: 'trigger', label: 'RSS Feed', position: { x: 100, y: 300 } },
            { id: '2', type: 'function', label: 'AI Summarize', position: { x: 400, y: 300 } },
            { id: '3', type: 'action', label: 'Post to Twitter', position: { x: 700, y: 200 } },
            { id: '4', type: 'action', label: 'Post to LinkedIn', position: { x: 700, y: 400 } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }
        ],
        message: "Here is a social media automation workflow. It summarizes new RSS items using AI and posts them to Twitter and LinkedIn."
    },
    "support": {
        nodes: [
            { id: '1', type: 'webhook', label: 'Incoming Ticket', position: { x: 100, y: 300 } },
            { id: '2', type: 'function', label: 'Classify Intent', position: { x: 400, y: 300 } },
            { id: '3', type: 'action', label: 'Auto-Reply', position: { x: 700, y: 200 } },
            { id: '4', type: 'action', label: 'Escalate to Human', position: { x: 700, y: 400 } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }
        ],
        message: "I've generated a customer support bot workflow. It classifies incoming tickets and either auto-replies or escalates them."
    }
};

export const simulateWorkflowGeneration = async (prompt: string): Promise<SimulationResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const lowerPrompt = prompt.toLowerCase();
            let key = 'ecommerce'; // Default to a complex one for "wow" factor

            if (lowerPrompt.includes('social')) key = 'social';
            else if (lowerPrompt.includes('support') || lowerPrompt.includes('ticket')) key = 'support';
            else if (lowerPrompt.includes('shop') || lowerPrompt.includes('order')) key = 'ecommerce';

            resolve(MOCK_RESPONSES[key]);
        }, 1500); // Simulate network delay
    });
};
