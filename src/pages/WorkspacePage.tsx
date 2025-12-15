import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, CaretRight, SidebarSimple, ChatCircle } from '@phosphor-icons/react';
import { ChatInterface } from '../features/chat/ChatInterface';
import { WorkflowCanvas } from '../features/workflow/WorkflowCanvas';
import { NodePalette } from '../features/builder/NodePalette';
import { NodeLibrarySidebar } from '../features/builder/NodeLibrarySidebar';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { useProjectStore } from '../store/useProjectStore';
import { useThemeStore } from '../store/useThemeStore';
import { Button } from '../components/ui/Button';

export const WorkspacePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const { nodes, edges, setWorkflow, resetWorkflow } = useWorkflowStore();
    const { activeWorkflowId, workflows, saveWorkflow } = useProjectStore();
    const { mode } = useThemeStore();

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
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background relative">
            {/* Left Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 280, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`h-full border-r backdrop-blur-sm flex flex-col overflow-hidden transition-colors z-40 absolute md:relative ${mode === 'dark'
                                ? 'border-white/5 bg-surface/30'
                                : 'border-black/5 bg-surface/80 shadow-sm'
                            }`}
                    >
                        <div className={`flex items-center justify-between p-3 border-b transition-colors ${mode === 'dark' ? 'border-white/5' : 'border-black/5'
                            }`}>
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

                {/* Chat Toggle Button - Always visible, positioned in bottom right of canvas */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-6 right-6 z-30"
                >
                    <Button
                        variant="secondary"
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className={`h-10 px-3 gap-2 shadow-lg ${mode === 'dark'
                                ? 'bg-surface border-white/10 hover:border-white/20'
                                : 'bg-surface border-black/10 hover:border-black/20 shadow-md'
                            }`}
                    >
                        <ChatCircle className="w-4 h-4" weight={isChatOpen ? 'fill' : 'regular'} />
                        <span className="text-xs font-medium">{isChatOpen ? 'Hide Chat' : 'Show Chat'}</span>
                        {isChatOpen ? <CaretRight className="w-3 h-3" /> : <CaretLeft className="w-3 h-3" />}
                    </Button>
                </motion.div>
            </motion.div>

            {/* Right Panel: Chat */}
            <AnimatePresence mode="wait">
                {isChatOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 380, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`h-full border-l backdrop-blur-sm flex flex-col overflow-hidden transition-colors z-40 absolute right-0 md:relative ${mode === 'dark'
                                ? 'border-white/5 bg-surface/30'
                                : 'border-black/5 bg-surface/80 shadow-sm'
                            }`}
                    >
                        <ChatInterface />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
