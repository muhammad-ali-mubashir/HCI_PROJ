import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project, Workflow, Node, Edge } from '../lib/types';

interface ProjectState {
    projects: Project[];
    workflows: Record<string, Workflow>; // Map workflow ID to Workflow object
    activeProjectId: string | null;
    activeWorkflowId: string | null;

    // Project Actions
    createProject: (name: string, description?: string) => void;
    deleteProject: (id: string) => void;
    setActiveProject: (id: string | null) => void;
    updateProject: (id: string, data: Partial<Project>) => void;

    // Workflow Actions
    createWorkflow: (projectId: string, name: string, description?: string) => string;
    deleteWorkflow: (id: string) => void;
    setActiveWorkflow: (id: string | null) => void;
    updateWorkflow: (id: string, data: Partial<Workflow>) => void;
    saveWorkflow: (id: string, nodes: Node[], edges: Edge[]) => void;
}

export const useProjectStore = create<ProjectState>()(
    persist(
        (set) => ({
            projects: [],
            workflows: {},
            activeProjectId: null,
            activeWorkflowId: null,

            createProject: (name, description) => {
                const newProject: Project = {
                    id: crypto.randomUUID(),
                    name,
                    description,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    workflows: []
                };
                set((state) => ({
                    projects: [...state.projects, newProject],
                    activeProjectId: newProject.id
                }));
            },

            deleteProject: (id) => {
                set((state) => {
                    const project = state.projects.find(p => p.id === id);
                    if (!project) return state;

                    // Remove associated workflows
                    const newWorkflows = { ...state.workflows };
                    project.workflows.forEach(wId => {
                        delete newWorkflows[wId];
                    });

                    return {
                        projects: state.projects.filter(p => p.id !== id),
                        workflows: newWorkflows,
                        activeProjectId: state.activeProjectId === id ? null : state.activeProjectId,
                        activeWorkflowId: state.activeWorkflowId && project.workflows.includes(state.activeWorkflowId) ? null : state.activeWorkflowId
                    };
                });
            },

            setActiveProject: (id) => set({ activeProjectId: id }),

            updateProject: (id, data) => set((state) => ({
                projects: state.projects.map(p => p.id === id ? { ...p, ...data, updatedAt: Date.now() } : p)
            })),

            createWorkflow: (projectId, name, description) => {
                const id = crypto.randomUUID();
                const newWorkflow: Workflow = {
                    id,
                    projectId,
                    name,
                    description,
                    nodes: [],
                    edges: [],
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                };

                set((state) => ({
                    workflows: { ...state.workflows, [id]: newWorkflow },
                    projects: state.projects.map(p => 
                        p.id === projectId 
                            ? { ...p, workflows: [...p.workflows, id], updatedAt: Date.now() }
                            : p
                    ),
                    activeWorkflowId: id
                }));
                return id;
            },

            deleteWorkflow: (id) => {
                set((state) => {
                    const workflow = state.workflows[id];
                    if (!workflow) return state;

                    const newWorkflows = { ...state.workflows };
                    delete newWorkflows[id];

                    return {
                        workflows: newWorkflows,
                        projects: state.projects.map(p => 
                            p.id === workflow.projectId 
                                ? { ...p, workflows: p.workflows.filter(wId => wId !== id), updatedAt: Date.now() }
                                : p
                        ),
                        activeWorkflowId: state.activeWorkflowId === id ? null : state.activeWorkflowId
                    };
                });
            },

            setActiveWorkflow: (id) => set({ activeWorkflowId: id }),

            updateWorkflow: (id, data) => set((state) => ({
                workflows: {
                    ...state.workflows,
                    [id]: { ...state.workflows[id], ...data, updatedAt: Date.now() }
                }
            })),

            saveWorkflow: (id, nodes, edges) => set((state) => ({
                workflows: {
                    ...state.workflows,
                    [id]: { ...state.workflows[id], nodes, edges, updatedAt: Date.now() }
                }
            }))
        }),
        {
            name: 'autom8-project-storage',
        }
    )
);
