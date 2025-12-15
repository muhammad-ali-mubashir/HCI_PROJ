import { useState, useEffect } from 'react';
import { WorkflowCanvas } from '../features/workflow/WorkflowCanvas';
import { NodePalette } from '../features/builder/NodePalette';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { useProjectStore } from '../store/useProjectStore';

export const WorkspacePage = () => {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const { nodes, edges, setWorkflow, resetWorkflow } = useWorkflowStore();
    const { activeWorkflowId, workflows, saveWorkflow } = useProjectStore();

    // Load workflow on mount
    useEffect(() => {
        if (activeWorkflowId && workflows[activeWorkflowId]) {
            setWorkflow(workflows[activeWorkflowId]);
        } else {
            if (!activeWorkflowId) {
                resetWorkflow();
            }
        }
    }, [activeWorkflowId, setWorkflow, resetWorkflow, workflows]);

    // Auto-save when nodes or edges change
    useEffect(() => {
        if (activeWorkflowId) {
            const timeoutId = setTimeout(() => {
                saveWorkflow(activeWorkflowId, nodes, edges);
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [nodes, edges, activeWorkflowId, saveWorkflow]);

    return (
        <div className="h-full w-full relative">
            <NodePalette />
            <WorkflowCanvas
                selectedNodeId={selectedNodeId}
                onNodeSelect={setSelectedNodeId}
            />
        </div>
    );
};
