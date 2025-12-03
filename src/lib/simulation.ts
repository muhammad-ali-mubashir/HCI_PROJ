import type { Node, Edge, WorkflowDefinition, CommandIntent, ConversationContext, ExecutionLogEntry } from './types';

interface SimulationResponse {
    nodes: Node[];
    edges: Edge[];
    message: string;
    conversationContext?: ConversationContext;
    executionLogs?: ExecutionLogEntry[];
    workflowList?: string[];
}

// Pre-defined workflow registry
const WORKFLOW_REGISTRY: Record<string, WorkflowDefinition> = {
    "welcome_email": {
        id: 'wf-1',
        name: 'Welcome Email',
        description: 'Sends a welcome email to new users',
        requiredParams: ['email'],
        nodes: [
            { id: '1', type: 'trigger', label: 'New User Trigger', position: { x: 100, y: 300 } },
            { id: '2', type: 'function', label: 'Personalize Content', position: { x: 400, y: 300 } },
            { id: '3', type: 'action', label: 'Send Email', position: { x: 700, y: 300 } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    "new_lead": {
        id: 'wf-2',
        name: 'New Lead',
        description: 'Processes new leads from form submissions',
        requiredParams: ['name', 'email'],
        nodes: [
            { id: '1', type: 'webhook', label: 'Form Submission', position: { x: 100, y: 300 } },
            { id: '2', type: 'function', label: 'Validate Data', position: { x: 400, y: 300 } },
            { id: '3', type: 'action', label: 'Add to CRM', position: { x: 700, y: 200 } },
            { id: '4', type: 'action', label: 'Notify Sales Team', position: { x: 700, y: 400 } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }
        ]
    },
    "send_report": {
        id: 'wf-3',
        name: 'Send Report',
        description: 'Generates and sends weekly reports',
        requiredParams: ['recipient'],
        canFail: true, // Can simulate failure
        nodes: [
            { id: '1', type: 'schedule', label: 'Weekly Trigger', position: { x: 100, y: 300 } },
            { id: '2', type: 'function', label: 'Generate Report', position: { x: 400, y: 300 } },
            { id: '3', type: 'action', label: 'Send Email', position: { x: 700, y: 300 } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    },
    "weekly_newsletter": {
        id: 'wf-4',
        name: 'Weekly Newsletter',
        description: 'Sends weekly newsletter to subscribers',
        requiredParams: [],
        nodes: [
            { id: '1', type: 'schedule', label: 'Weekly Schedule', position: { x: 100, y: 300 } },
            { id: '2', type: 'function', label: 'Fetch Content', position: { x: 400, y: 200 } },
            { id: '3', type: 'action', label: 'Send to Subscribers', position: { x: 700, y: 200 } },
            { id: '4', type: 'action', label: 'Log Execution', position: { x: 700, y: 400 } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }
        ]
    },
    "form_logger": {
        id: 'wf-5',
        name: 'Form Logger',
        description: 'Logs form submissions to Google Sheets',
        requiredParams: [],
        nodes: [
            { id: '1', type: 'webhook', label: 'Form Webhook', position: { x: 100, y: 300 } },
            { id: '2', type: 'action', label: 'Add to Google Sheets', position: { x: 400, y: 300 } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }
        ]
    }
};

// Parse user intent from message
export const parseUserIntent = (message: string): CommandIntent => {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.match(/trigger|run|execute|start/)) return 'trigger_workflow';
    if (lowerMsg.match(/create|build|make|new workflow/)) return 'create_workflow';
    if (lowerMsg.match(/edit|modify|update|change/)) return 'edit_workflow';
    if (lowerMsg.match(/log|monitor|show|history|status/)) return 'monitor_workflow';
    if (lowerMsg.match(/list|what|available|workflows/)) return 'list_workflows';

    return 'unknown';
};

// Extract workflow name from message
export const extractWorkflowName = (message: string): string | null => {
    for (const key in WORKFLOW_REGISTRY) {
        const workflow = WORKFLOW_REGISTRY[key];
        if (message.toLowerCase().includes(workflow.name.toLowerCase())) {
            return key;
        }
    }
    return null;
};

// Extract parameters from message
export const extractParameters = (message: string): Record<string, any> => {
    const params: Record<string, any> = {};

    // Extract email
    const emailMatch = message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    if (emailMatch) params.email = emailMatch[1];

    // Extract names (simple heuristic)
    const nameMatch = message.match(/for\s+([A-Z][a-z]+)/);
    if (nameMatch) params.name = nameMatch[1];

    return params;
};

// Generate execution logs
export const generateExecutionLogs = (workflow: WorkflowDefinition, shouldFail: boolean = false): ExecutionLogEntry[] => {
    const logs: ExecutionLogEntry[] = [];
    const startTime = Date.now();

    workflow.nodes.forEach((node, index) => {
        const isLastNode = index === workflow.nodes.length - 1;
        const shouldFailThisNode = shouldFail && isLastNode;

        logs.push({
            nodeId: node.id,
            nodeName: node.label,
            status: shouldFailThisNode ? 'error' : 'success',
            timestamp: startTime + (index * 800),
            message: shouldFailThisNode
                ? undefined
                : `${node.label} executed successfully`,
            error: shouldFailThisNode
                ? 'Email service unavailable. Please try again later.'
                : undefined
        });
    });

    return logs;
};

// Simulate workflow triggering
export const simulateWorkflowTrigger = async (
    workflowKey: string,
    parameters: Record<string, any>
): Promise<SimulationResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const workflow = WORKFLOW_REGISTRY[workflowKey];

            if (!workflow) {
                resolve({
                    nodes: [],
                    edges: [],
                    message: `❌ Workflow not found. Type "list workflows" to see available workflows.`
                });
                return;
            }

            // Check for missing parameters
            const missingParams = workflow.requiredParams?.filter(param => !parameters[param]) || [];

            if (missingParams.length > 0) {
                resolve({
                    nodes: workflow.nodes,
                    edges: workflow.edges,
                    message: `To trigger "${workflow.name}", I need some information. What is the ${missingParams[0]}?`,
                    conversationContext: {
                        intent: 'trigger_workflow',
                        workflowName: workflowKey,
                        parameters,
                        missingParams,
                        step: 'collecting_params'
                    }
                });
                return;
            }

            // Simulate execution with potential failure
            const shouldFail = workflow.canFail && Math.random() < 0.3; // 30% chance of failure
            const logs = generateExecutionLogs(workflow, shouldFail);

            const paramString = Object.entries(parameters)
                .map(([k, v]) => `${k}: ${v}`)
                .join(', ');

            resolve({
                nodes: workflow.nodes,
                edges: workflow.edges,
                message: shouldFail
                    ? `❌ Workflow "${workflow.name}" failed during execution.`
                    : `✅ Workflow "${workflow.name}" executed successfully with parameters: ${paramString}`,
                executionLogs: logs
            });
        }, 1200);
    });
};

// Simulate workflow creation
export const simulateWorkflowCreation = async (
    message: string,
    context?: ConversationContext
): Promise<SimulationResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // If waiting for workflow name
            if (context?.step === 'awaiting_name') {
                const workflowName = message.trim();
                const workflowKey = workflowName.toLowerCase().replace(/\s+/g, '_');

                // Detect nodes from original message or use defaults
                let nodeTypes = ['trigger', 'action'];
                if (context.parameters?.original_message) {
                    const msg = context.parameters.original_message.toLowerCase();
                    if (msg.includes('google sheets')) nodeTypes.push('google_sheets');
                    if (msg.includes('email')) nodeTypes.push('email');
                    if (msg.includes('webhook')) nodeTypes = ['webhook', ...nodeTypes];
                }

                const newWorkflow: WorkflowDefinition = {
                    id: `wf-${Date.now()}`,
                    name: workflowName,
                    description: `Custom workflow: ${workflowName}`,
                    nodes: [
                        { id: '1', type: 'trigger', label: 'Trigger', position: { x: 100, y: 300 } },
                        { id: '2', type: 'action', label: 'Action', position: { x: 400, y: 300 } }
                    ],
                    edges: [
                        { id: 'e1-2', source: '1', target: '2' }
                    ]
                };

                // Add to registry (in real app, this would persist)
                WORKFLOW_REGISTRY[workflowKey] = newWorkflow;

                resolve({
                    nodes: newWorkflow.nodes,
                    edges: newWorkflow.edges,
                    message: `✅ Workflow "${workflowName}" created successfully with nodes: ${newWorkflow.nodes.map(n => n.label).join(' → ')}. Ready to use!`
                });
                return;
            }

            // Initial creation request
            resolve({
                nodes: [],
                edges: [],
                message: `Sure! I'll help you create a new workflow. What should the name of this workflow be?`,
                conversationContext: {
                    intent: 'create_workflow',
                    step: 'awaiting_name',
                    parameters: { original_message: message }
                }
            });
        }, 800);
    });
};

// Simulate showing workflow logs
export const simulateShowLogs = async (workflowKey: string): Promise<SimulationResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const workflow = WORKFLOW_REGISTRY[workflowKey];

            if (!workflow) {
                resolve({
                    nodes: [],
                    edges: [],
                    message: `❌ Workflow not found.`
                });
                return;
            }

            const logs = generateExecutionLogs(workflow, false);

            resolve({
                nodes: workflow.nodes,
                edges: workflow.edges,
                message: `📊 Execution log for "${workflow.name}":`,
                executionLogs: logs
            });
        }, 600);
    });
};

// List all workflows
export const simulateListWorkflows = async (): Promise<SimulationResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const workflowList = Object.values(WORKFLOW_REGISTRY).map(wf =>
                `• **${wf.name}** - ${wf.description}`
            );

            resolve({
                nodes: [],
                edges: [],
                message: `📋 Available workflows:\n\n${workflowList.join('\n')}`,
                workflowList: Object.values(WORKFLOW_REGISTRY).map(wf => wf.name)
            });
        }, 500);
    });
};

// Main simulation handler
export const simulateWorkflowGeneration = async (
    message: string,
    context?: ConversationContext
): Promise<SimulationResponse> => {
    // If we have context, we're in the middle of a conversation
    if (context) {
        if (context.intent === 'trigger_workflow' && context.step === 'collecting_params') {
            // User is providing a missing parameter
            const param = context.missingParams?.[0];
            const newParams = { ...context.parameters, [param!]: message.trim() };
            return simulateWorkflowTrigger(context.workflowName!, newParams);
        }

        if (context.intent === 'create_workflow' && context.step === 'awaiting_name') {
            return simulateWorkflowCreation(message, context);
        }
    }

    // Parse intent from message
    const intent = parseUserIntent(message);

    switch (intent) {
        case 'list_workflows':
            return simulateListWorkflows();

        case 'monitor_workflow': {
            const workflowKey = extractWorkflowName(message);
            if (workflowKey) {
                return simulateShowLogs(workflowKey);
            }
            return {
                nodes: [],
                edges: [],
                message: `Which workflow would you like to monitor? Available workflows: ${Object.values(WORKFLOW_REGISTRY).map(wf => wf.name).join(', ')}`
            };
        }

        case 'trigger_workflow': {
            const workflowKey = extractWorkflowName(message);
            if (workflowKey) {
                const parameters = extractParameters(message);
                return simulateWorkflowTrigger(workflowKey, parameters);
            }
            return {
                nodes: [],
                edges: [],
                message: `Which workflow would you like to trigger? Type "list workflows" to see available options.`
            };
        }

        case 'create_workflow':
            return simulateWorkflowCreation(message);

        default:
            // Fallback to original behavior for general queries
            return simulateGeneralWorkflow(message);
    }
};

// Original general workflow generation (for backward compatibility)
const simulateGeneralWorkflow = async (prompt: string): Promise<SimulationResponse> => {
    const MOCK_RESPONSES: Record<string, Omit<SimulationResponse, 'conversationContext' | 'executionLogs'>> = {
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

    return new Promise((resolve) => {
        setTimeout(() => {
            const lowerPrompt = prompt.toLowerCase();
            let key = 'ecommerce';

            if (lowerPrompt.includes('social')) key = 'social';
            else if (lowerPrompt.includes('support') || lowerPrompt.includes('ticket')) key = 'support';
            else if (lowerPrompt.includes('shop') || lowerPrompt.includes('order')) key = 'ecommerce';

            resolve(MOCK_RESPONSES[key]);
        }, 1500);
    });
};

// Export workflow registry for other components
export const getWorkflowRegistry = () => WORKFLOW_REGISTRY;
