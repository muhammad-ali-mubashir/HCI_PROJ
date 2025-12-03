export type NodeType = 'trigger' | 'action' | 'function' | 'webhook' | 'schedule';

export interface Node {
    id: string;
    type: NodeType;
    label: string;
    position: { x: number; y: number };
    data?: Record<string, any>;
    status?: 'idle' | 'running' | 'success' | 'error';
}

export interface Edge {
    id: string;
    source: string;
    target: string;
    animated?: boolean;
}

export interface Workflow {
    id: string;
    name: string;
    nodes: Node[];
    edges: Edge[];
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

export interface ExecutionStep {
    nodeId: string;
    status: 'running' | 'success' | 'error';
    timestamp: number;
    output?: any;
}

export interface ThemeState {
    mode: 'light' | 'dark';
    reducedMotion: boolean;
    highContrast: boolean;
    toggleMode: () => void;
    toggleReducedMotion: () => void;
    toggleHighContrast: () => void;
}

// N8N Simulation Types
export type CommandIntent =
    | 'trigger_workflow'
    | 'create_workflow'
    | 'edit_workflow'
    | 'monitor_workflow'
    | 'list_workflows'
    | 'unknown';

export interface ConversationContext {
    intent: CommandIntent;
    workflowName?: string;
    parameters?: Record<string, any>;
    missingParams?: string[];
    step?: string;
}

export interface ExecutionState {
    workflowId: string;
    workflowName: string;
    status: 'pending' | 'running' | 'success' | 'error';
    currentNodeIndex: number;
    startTime: number;
    logs: ExecutionLogEntry[];
}

export interface ExecutionLogEntry {
    nodeId: string;
    nodeName: string;
    status: 'running' | 'success' | 'error';
    timestamp: number;
    message?: string;
    error?: string;
}

export interface ExecutionRecord {
    id: string;
    workflowName: string;
    status: 'success' | 'error';
    startTime: number;
    endTime: number;
    logs: ExecutionLogEntry[];
}

export interface WorkflowDefinition extends Workflow {
    description?: string;
    requiredParams?: string[];
    canFail?: boolean;
}
