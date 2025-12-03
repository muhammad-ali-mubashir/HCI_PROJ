import { WorkflowCanvas } from '../features/workflow/WorkflowCanvas';
import { NodePalette } from '../features/builder/NodePalette';
import { motion } from 'framer-motion';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { useEffect } from 'react';

export const BuilderPage = () => {
    const { resetWorkflow } = useWorkflowStore();

    // Clear canvas when entering builder mode
    useEffect(() => {
        resetWorkflow();
    }, [resetWorkflow]);

    return (
        <div className="h-[calc(100vh-4rem)] flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 relative"
            >
                <WorkflowCanvas />
                <NodePalette />
            </motion.div>
        </div>
    );
};
