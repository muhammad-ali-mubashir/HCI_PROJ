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
