import type { Node, Edge, WorkflowDefinition, CommandIntent, ConversationContext, ExecutionLogEntry } from './types';

interface SimulationResponse {
    nodes: Node[];
    edges: Edge[];
    message: string;
    conversationContext?: ConversationContext;
    executionLogs?: ExecutionLogEntry[];
    workflowList?: string[];
    recommendations?: string[];
}

// Enhanced Workflow Registry with AutoML metadata
const WORKFLOW_REGISTRY: Record<string, WorkflowDefinition> = {
    "welcome_email": {
        id: 'wf-1',
        name: 'User Onboarding',
        description: 'Optimized onboarding flow with smart retries',
        requiredParams: ['email'],
        nodes: [
            { id: '1', type: 'trigger', label: 'New User Trigger', position: { x: 100, y: 300 } },
            { id: '2', type: 'function', label: 'Fetch User Data', position: { x: 400, y: 300 }, data: { optimized: true } },
            { id: '3', type: 'action', label: 'Send Welcome Email', position: { x: 700, y: 300 }, data: { retry: 3, strategy: 'exponential_backoff' } },
            { id: '4', type: 'action', label: 'Logger', position: { x: 1000, y: 300 } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    },
    "weekly_sales": {
        id: 'wf-2',
        name: 'Weekly Sales Report',
        description: 'Automated reporting with batch processing',
        requiredParams: [],
        nodes: [
            { id: '1', type: 'schedule', label: 'Weekly Trigger', position: { x: 100, y: 300 } },
            { id: '2', type: 'function', label: 'Fetch Sales Data', position: { x: 400, y: 300 }, data: { batchSize: 500 } },
            { id: '3', type: 'function', label: 'Generate Report', position: { x: 700, y: 300 } },
            { id: '4', type: 'action', label: 'Send Email', position: { x: 1000, y: 300 }, data: { recipients: 20 } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ]
    }
};

export const parseUserIntent = (message: string): CommandIntent => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.match(/trigger|run|execute|start/)) return 'trigger_workflow';
    if (lowerMsg.match(/create|build|make|automate/)) return 'create_workflow';
    if (lowerMsg.match(/configure|set up|edit/)) return 'edit_workflow';
    if (lowerMsg.match(/log|monitor|show|recommendations/)) return 'monitor_workflow';
    if (lowerMsg.match(/list|what|available/)) return 'list_workflows';
    return 'unknown';
};

export const extractWorkflowName = (message: string): string | null => {
    for (const key in WORKFLOW_REGISTRY) {
        const workflow = WORKFLOW_REGISTRY[key];
        if (message.toLowerCase().includes(workflow.name.toLowerCase()) ||
            message.toLowerCase().includes(key.replace('_', ' '))) {
            return key;
        }
    }
    return null;
};

export const extractParameters = (message: string): Record<string, any> => {
    const params: Record<string, any> = {};
    const emailMatch = message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    if (emailMatch) params.email = emailMatch[1];
    return params;
};

// AutoML Logic: Generate smart logs with self-healing simulation
export const generateAutoMLLogs = (workflow: WorkflowDefinition): ExecutionLogEntry[] => {
    const logs: ExecutionLogEntry[] = [];
    let currentTime = Date.now();

    // Add optimization log
    logs.push({
        nodeId: 'system',
        nodeName: 'AutoML Engine',
        status: 'success',
        timestamp: currentTime,
        message: 'Workflow optimization check passed. Configuration valid.'
    });

    workflow.nodes.forEach((node, _) => {
        currentTime += 800;

        // Simulate self-healing for specific nodes (randomly)
        const simulateError = Math.random() < 0.2 && node.type === 'action';

        if (simulateError) {
            logs.push({
                nodeId: node.id,
                nodeName: node.label,
                status: 'error',
                timestamp: currentTime,
                error: 'Connection timeout (500ms)'
            });

            currentTime += 500;

            logs.push({
                nodeId: node.id,
                nodeName: node.label,
                status: 'running',
                timestamp: currentTime,
                message: 'AutoML optimization applied -> Retrying with exponential backoff...'
            });

            currentTime += 800;
        }

        logs.push({
            nodeId: node.id,
            nodeName: node.label,
            status: 'success',
            timestamp: currentTime,
            message: node.data?.recipients
                ? `Sent to ${node.data.recipients} recipients`
                : node.data?.batchSize
                    ? `Processed ${node.data.batchSize} rows`
                    : 'Executed successfully'
        });
    });

    return logs;
};

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
                    message: `❌ Workflow not found. I can create a new optimized workflow for you if you describe your goal.`
                });
                return;
            }

            const missingParams = workflow.requiredParams?.filter(param => !parameters[param]) || [];

            if (missingParams.length > 0) {
                resolve({
                    nodes: workflow.nodes,
                    edges: workflow.edges,
                    message: `To execute the optimized "${workflow.name}" workflow, I need the **${missingParams[0]}**.`,
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

            const logs = generateAutoMLLogs(workflow);

            resolve({
                nodes: workflow.nodes,
                edges: workflow.edges,
                message: `🚀 **AutoML Execution Started**\nRunning optimized workflow "${workflow.name}"...`,
                executionLogs: logs
            });
        }, 1500);
    });
};

export const simulateWorkflowCreation = async (
    message: string,
    context?: ConversationContext
): Promise<SimulationResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (context?.step === 'awaiting_name') {
                const workflowName = message.trim();
                const workflowKey = workflowName.toLowerCase().replace(/\s+/g, '_');

                const newWorkflow: WorkflowDefinition = {
                    id: `wf-${Date.now()}`,
                    name: workflowName,
                    description: `AutoML generated: ${workflowName}`,
                    nodes: [
                        { id: '1', type: 'trigger', label: 'Smart Trigger', position: { x: 100, y: 300 } },
                        { id: '2', type: 'function', label: 'Auto-Optimize Data', position: { x: 400, y: 300 } },
                        { id: '3', type: 'action', label: 'Execute Action', position: { x: 700, y: 300 } },
                        { id: '4', type: 'action', label: 'Smart Logger', position: { x: 1000, y: 300 } }
                    ],
                    edges: [
                        { id: 'e1-2', source: '1', target: '2' },
                        { id: 'e2-3', source: '2', target: '3' },
                        { id: 'e3-4', source: '3', target: '4' }
                    ]
                };

                WORKFLOW_REGISTRY[workflowKey] = newWorkflow;

                resolve({
                    nodes: newWorkflow.nodes,
                    edges: newWorkflow.edges,
                    message: `✅ **AutoML Optimization Complete**\n\nCreated workflow "**${workflowName}**" with smart nodes:\n• Smart Trigger\n• Auto-Optimize Data\n• Execute Action\n• Smart Logger\n\nReady to execute with self-healing enabled.`
                });
                return;
            }

            resolve({
                nodes: [],
                edges: [],
                message: `🤖 **AutoML Workflow Generator**\n\nI can build an optimized workflow for you. What is the goal of this automation? (e.g., "Automate weekly sales report")`,
                conversationContext: {
                    intent: 'create_workflow',
                    step: 'awaiting_name',
                    parameters: { original_message: message }
                }
            });
        }, 1000);
    });
};

export const simulateRecommendations = async (workflowKey: string): Promise<SimulationResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const workflow = WORKFLOW_REGISTRY[workflowKey];
            if (!workflow) {
                resolve({ nodes: [], edges: [], message: "Workflow not found." });
                return;
            }

            const logs = generateAutoMLLogs(workflow);
            const recommendations = [
                "💡 **Optimization**: Batch emails in groups of 20 for 15% faster execution.",
                "🛡️ **Reliability**: Enable 'Circuit Breaker' pattern on the API node.",
                "⚡ **Performance**: Cache user data to reduce API calls by 40%."
            ];

            resolve({
                nodes: workflow.nodes,
                edges: workflow.edges,
                message: `📊 **AutoML Insights for "${workflow.name}"**\n\nAnalysis complete based on recent executions.`,
                executionLogs: logs,
                recommendations
            });
        }, 1200);
    });
};

export const simulateWorkflowGeneration = async (
    message: string,
    context?: ConversationContext
): Promise<SimulationResponse> => {
    if (context) {
        if (context.intent === 'trigger_workflow' && context.step === 'collecting_params') {
            const param = context.missingParams?.[0];
            const newParams = { ...context.parameters, [param!]: message.trim() };
            return simulateWorkflowTrigger(context.workflowName!, newParams);
        }
        if (context.intent === 'create_workflow' && context.step === 'awaiting_name') {
            return simulateWorkflowCreation(message, context);
        }
    }

    const intent = parseUserIntent(message);

    switch (intent) {
        case 'monitor_workflow': {
            const workflowKey = extractWorkflowName(message);
            if (workflowKey) return simulateRecommendations(workflowKey);
            return { nodes: [], edges: [], message: "Which workflow would you like to analyze? I can provide AutoML recommendations." };
        }
        case 'trigger_workflow': {
            const workflowKey = extractWorkflowName(message);
            if (workflowKey) return simulateWorkflowTrigger(workflowKey, extractParameters(message));
            return { nodes: [], edges: [], message: "Which workflow should I trigger? I'll handle the optimization." };
        }
        case 'create_workflow':
            return simulateWorkflowCreation(message);
        case 'list_workflows':
            return {
                nodes: [],
                edges: [],
                message: `📋 **Available Optimized Workflows**\n\n${Object.values(WORKFLOW_REGISTRY).map(wf => `• **${wf.name}**: ${wf.description}`).join('\n')}`
            };
        default:
            return simulateWorkflowCreation(message);
    }
};

export const getWorkflowRegistry = () => WORKFLOW_REGISTRY;
