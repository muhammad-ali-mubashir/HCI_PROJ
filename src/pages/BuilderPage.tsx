import { WorkflowCanvas } from '../features/workflow/WorkflowCanvas';
import { NodePalette } from '../features/builder/NodePalette';
import { motion } from 'framer-motion';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { useProjectStore } from '../store/useProjectStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const BuilderPage = () => {
    const { nodes, edges, setWorkflow, resetWorkflow } = useWorkflowStore();
    const { activeWorkflowId, workflows, saveWorkflow } = useProjectStore();
    const navigate = useNavigate();

    // Load workflow on mount
    useEffect(() => {
        if (activeWorkflowId && workflows[activeWorkflowId]) {
            setWorkflow(workflows[activeWorkflowId]);
        } else {
            // If no active workflow, maybe redirect to projects or reset
            // For now, let's just reset if we are here without an active workflow (e.g. direct link)
            // But ideally we should redirect to projects
            if (!activeWorkflowId) {
                 // Optional: navigate('/projects');
                 resetWorkflow();
            }
        }
    }, [activeWorkflowId, setWorkflow, resetWorkflow, workflows]); // Added workflows dependency to ensure we have latest data

    // Auto-save when nodes or edges change
    useEffect(() => {
        if (activeWorkflowId) {
            const timeoutId = setTimeout(() => {
                saveWorkflow(activeWorkflowId, nodes, edges);
            }, 1000); // Debounce save by 1s

            return () => clearTimeout(timeoutId);
        }
    }, [nodes, edges, activeWorkflowId, saveWorkflow]);

    return (
        <div className="h-[calc(100vh-4rem)] flex bg-background">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 relative"
            >
                <WorkflowCanvas />
                <NodePalette />
            </motion.div>
        </div>
    );
};
