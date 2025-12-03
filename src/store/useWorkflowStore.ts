import { create } from 'zustand';
import type { Node, Edge, Workflow, ChatMessage, ExecutionStep } from '../lib/types';

interface WorkflowState {
    nodes: Node[];
    edges: Edge[];
    messages: ChatMessage[];
    executionLog: ExecutionStep[];
    isExecuting: boolean;

    // Actions
    addNode: (node: Node) => void;
    removeNode: (id: string) => void;
    updateNodePosition: (id: string, position: { x: number; y: number }) => void;
    addEdge: (edge: Edge) => void;
    removeEdge: (id: string) => void;
    setWorkflow: (workflow: Workflow) => void;
    addMessage: (message: ChatMessage) => void;
    startExecution: () => void;
    stopExecution: () => void;
    addExecutionStep: (step: ExecutionStep) => void;
    resetWorkflow: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
    nodes: [],
    edges: [],
    messages: [],
    executionLog: [],
    isExecuting: false,

    addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),

    removeNode: (id) => set((state) => ({
        nodes: state.nodes.filter((n) => n.id !== id),
        edges: state.edges.filter((e) => e.source !== id && e.target !== id)
    })),

    updateNodePosition: (id, position) => set((state) => ({
        nodes: state.nodes.map((n) => n.id === id ? { ...n, position } : n)
    })),

    addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),

    removeEdge: (id) => set((state) => ({ edges: state.edges.filter((e) => e.id !== id) })),

    setWorkflow: (workflow) => set({ nodes: workflow.nodes, edges: workflow.edges }),

    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

    startExecution: () => set({ isExecuting: true, executionLog: [] }),

    stopExecution: () => set({ isExecuting: false }),

    addExecutionStep: (step) => set((state) => ({ executionLog: [...state.executionLog, step] })),

    resetWorkflow: () => set({ nodes: [], edges: [], messages: [], executionLog: [], isExecuting: false }),
}));
