import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, CaretRight, SidebarSimple, ChatCircle } from '@phosphor-icons/react';
import { ChatInterface } from '../features/chat/ChatInterface';
import { WorkflowCanvas } from '../features/workflow/WorkflowCanvas';
import { NodePalette } from '../features/builder/NodePalette';
import { NodeLibrarySidebar } from '../features/builder/NodeLibrarySidebar';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { useProjectStore } from '../store/useProjectStore';
import { Button } from '../components/ui/Button';

export const WorkspacePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(true);
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
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
            {/* Left Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 280, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="h-full border-r border-white/5 bg-surface/30 backdrop-blur-sm flex flex-col overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-3 border-b border-white/5">
                            <h2 className="text-sm font-semibold text-text-primary">Node Library</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSidebarOpen(false)}
                                className="h-8 w-8"
                            >
                                <CaretLeft className="w-4 h-4" />
                            </Button>
                        </div>
                        <NodeLibrarySidebar 
                            selectedNodeId={selectedNodeId}
                            onNodeSelect={setSelectedNodeId}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar Toggle Button (when closed) */}
            {!isSidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-30"
                >
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => setIsSidebarOpen(true)}
                        className="h-10 w-6 rounded-l-none rounded-r-lg border-l-0"
                    >
                        <SidebarSimple className="w-4 h-4" />
                    </Button>
                </motion.div>
            )}

            {/* Center Panel: Canvas */}
            <motion.div
                layout
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-1 h-full relative z-10"
            >
                <WorkflowCanvas 
                    selectedNodeId={selectedNodeId}
                    onNodeSelect={setSelectedNodeId}
                />
                <NodePalette />
            </motion.div>

            {/* Chat Toggle Button (when closed) */}
            {!isChatOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-30"
                >
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => setIsChatOpen(true)}
                        className="h-10 w-6 rounded-r-none rounded-l-lg border-r-0"
                    >
                        <ChatCircle className="w-4 h-4" />
                    </Button>
                </motion.div>
            )}

            {/* Right Panel: Chat */}
            <AnimatePresence mode="wait">
                {isChatOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 380, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="h-full border-l border-white/5 bg-surface/30 backdrop-blur-sm flex flex-col overflow-hidden"
                    >
                        <div className="absolute top-4 left-4 z-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsChatOpen(false)}
                                className="h-8 w-8"
                            >
                                <CaretRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <ChatInterface />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
