import React, { useState, useRef, useEffect } from 'react';
import { PaperPlaneRight, Robot, User, Clock } from '@phosphor-icons/react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { simulateWorkflowGeneration } from '../../lib/simulation';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import type { ExecutionLogEntry } from '../../lib/types';

export const ChatInterface = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {
        messages,
        addMessage,
        setWorkflow,
        conversationContext,
        setConversationContext
    } = useWorkflowStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Format execution logs as a message component - Linear style
    const ExecutionLogsDisplay = ({ logs }: { logs: ExecutionLogEntry[] }) => {
        return (
            <div className="mt-2 space-y-1.5 text-xs">
                {logs.map((log, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={clsx(
                            "flex items-start gap-2 p-2.5 rounded-lg border",
                            log.status === 'success' && "bg-emerald-500/5 border-emerald-500/15",
                            log.status === 'error' && "bg-red-500/5 border-red-500/15"
                        )}
                    >
                        <span 
                            className="w-2 h-2 rounded-full mt-1 shrink-0"
                            style={{
                                backgroundColor: log.status === 'success' ? '#10B981' : '#EF4444',
                                boxShadow: log.status === 'success' 
                                    ? '0 0 8px rgba(16, 185, 129, 0.5)' 
                                    : '0 0 8px rgba(239, 68, 68, 0.5)'
                            }}
                        />
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-text-primary">
                                {log.nodeName}
                            </div>
                            {log.message && (
                                <div className="text-text-tertiary mt-0.5">
                                    {log.message}
                                </div>
                            )}
                            {log.error && (
                                <div className="text-red-400 mt-0.5">
                                    {log.error}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-1 text-text-tertiary shrink-0">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = {
            id: Date.now().toString(),
            role: 'user' as const,
            content: input,
            timestamp: Date.now(),
        };

        addMessage(userMsg);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // Pass conversation context if exists
            const response = await simulateWorkflowGeneration(currentInput, conversationContext || undefined);

            // Add bot response
            const botMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant' as const,
                content: response.message,
                timestamp: Date.now(),
            };

            addMessage(botMsg);

            // If there are execution logs, add them as a separate message
            if (response.executionLogs && response.executionLogs.length > 0) {
                setTimeout(() => {
                    const logMsg = {
                        id: (Date.now() + 2).toString(),
                        role: 'assistant' as const,
                        content: '__EXECUTION_LOGS__',
                        timestamp: Date.now(),
                    };
                    addMessage(logMsg);
                    (logMsg as any).executionLogs = response.executionLogs;
                }, 300);
            }

            // If there are recommendations, add them as a separate message
            if (response.recommendations && response.recommendations.length > 0) {
                setTimeout(() => {
                    const recMsg = {
                        id: (Date.now() + 3).toString(),
                        role: 'assistant' as const,
                        content: '__RECOMMENDATIONS__',
                        timestamp: Date.now(),
                    };
                    addMessage(recMsg);
                    (recMsg as any).recommendations = response.recommendations;
                }, 800);
            }

            // Update workflow visualization if nodes were returned
            if (response.nodes && response.nodes.length > 0) {
                setWorkflow({
                    id: Date.now().toString(),
                    name: 'Generated Workflow',
                    nodes: response.nodes,
                    edges: response.edges
                });

                if (response.executionLogs) {
                    response.executionLogs.forEach((_, index) => {
                        setTimeout(() => {
                            // Update node status in the visualization
                        }, index * 800);
                    });
                }
            }

            setConversationContext(response.conversationContext || null);

        } catch (error) {
            console.error("Simulation failed", error);
            const errorMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant' as const,
                content: '❌ Sorry, something went wrong. Please try again.',
                timestamp: Date.now(),
            };
            addMessage(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const suggestedPrompts = [
        "Trigger the Welcome Email workflow",
        "Create a new workflow",
        "List available workflows",
        "Show workflow log for New Lead"
    ];

    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
    };

    return (
        <div className="flex flex-col h-full bg-background border-r border-[var(--card-border)] transition-colors duration-200">
            {/* Header - Linear style */}
            <div className="p-4 border-b border-[var(--card-border)]">
                <h2 className="text-[15px] font-semibold flex items-center gap-2 text-text-primary">
                    <div 
                        className="w-5 h-5 rounded flex items-center justify-center bg-violet-500"
                        style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)' }}
                    >
                        <Robot className="w-3 h-3 text-white" weight="bold" />
                    </div>
                    AI Assistant
                </h2>
                <p className="text-[11px] text-text-tertiary mt-1">
                    Create, trigger, and monitor workflows
                </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((msg) => {
                        const hasLogs = (msg as any).executionLogs;
                        const hasRecommendations = (msg as any).recommendations;
                        const isLogsMessage = msg.content === '__EXECUTION_LOGS__' || msg.content === '__RECOMMENDATIONS__';

                        if (isLogsMessage) {
                            if (hasLogs) {
                                return (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-3"
                                    >
                                        <div 
                                            className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center shrink-0"
                                            style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }}
                                        >
                                            <Robot className="w-3.5 h-3.5 text-white" weight="bold" />
                                        </div>
                                        <div className="flex-1 bg-surface border border-[var(--card-border)] p-3 rounded-xl rounded-tl-none">
                                            <ExecutionLogsDisplay logs={hasLogs} />
                                        </div>
                                    </motion.div>
                                );
                            }
                            if (hasRecommendations) {
                                return (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-3"
                                    >
                                        <div 
                                            className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center shrink-0"
                                            style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }}
                                        >
                                            <Robot className="w-3.5 h-3.5 text-white" weight="bold" />
                                        </div>
                                        <div className="flex-1 bg-violet-500/5 border border-violet-500/15 p-4 rounded-xl rounded-tl-none">
                                            <h4 className="font-semibold text-violet-400 mb-2 flex items-center gap-2 text-[13px]">
                                                <span>💡</span> AutoML Recommendations
                                            </h4>
                                            <div className="space-y-2">
                                                {(hasRecommendations as string[]).map((rec, idx) => (
                                                    <div key={idx} className="text-[12px] text-text-secondary bg-background border border-[var(--card-border)] p-2.5 rounded-lg">
                                                        {rec}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            }
                        }

                        return (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={clsx(
                                    "flex gap-3 max-w-[90%]",
                                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <div className={clsx(
                                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                                    msg.role === 'user'
                                        ? "bg-emerald-500"
                                        : "bg-violet-500"
                                )}
                                style={{ 
                                    boxShadow: msg.role === 'user' 
                                        ? '0 0 10px rgba(16, 185, 129, 0.3)' 
                                        : '0 0 10px rgba(139, 92, 246, 0.3)' 
                                }}
                                >
                                    {msg.role === 'user' 
                                        ? <User className="w-3.5 h-3.5 text-white" weight="bold" /> 
                                        : <Robot className="w-3.5 h-3.5 text-white" weight="bold" />
                                    }
                                </div>
                                <div className={clsx(
                                    "p-3 rounded-xl text-[13px] leading-relaxed whitespace-pre-line border",
                                    msg.role === 'user'
                                        ? "bg-emerald-500/10 border-emerald-500/15 text-text-primary rounded-tr-none"
                                        : "bg-surface border-[var(--card-border)] text-text-secondary rounded-tl-none"
                                )}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        );
                    })}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-3"
                        >
                            <div 
                                className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center"
                                style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }}
                            >
                                <Robot className="w-3.5 h-3.5 text-white" weight="bold" />
                            </div>
                            <div className="bg-surface border border-[var(--card-border)] p-3 rounded-xl rounded-tl-none flex gap-1.5 items-center">
                                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Linear style */}
            <div className="p-4 border-t border-[var(--card-border)] space-y-3">
                {/* Suggested Prompts */}
                {messages.length === 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {suggestedPrompts.map((prompt, index) => (
                            <button
                                key={index}
                                onClick={() => handlePromptClick(prompt)}
                                className="text-[11px] bg-surface hover:bg-surface-hover border border-[var(--card-border)] hover:border-[var(--card-border-hover)] rounded-full px-3 py-1.5 text-text-secondary hover:text-text-primary transition-all font-medium"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}

                {/* Conversation context hint */}
                {conversationContext && (
                    <div 
                        className="text-[11px] text-violet-400 bg-violet-500/10 px-3 py-2 rounded-lg border border-violet-500/20 font-medium flex items-center gap-2"
                    >
                        <div 
                            className="w-1.5 h-1.5 rounded-full bg-violet-500"
                            style={{ boxShadow: '0 0 6px rgba(139, 92, 246, 0.5)' }}
                        />
                        Waiting for your response...
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={conversationContext ? "Type your answer..." : "Describe a workflow or trigger one..."}
                            className="w-full bg-surface border border-[var(--card-border)] rounded-xl py-3 px-4 pr-12 focus:outline-none focus:border-[var(--card-border-hover)] transition-all text-text-primary placeholder-text-tertiary text-[13px]"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 rounded-lg text-white disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-all"
                            style={{ boxShadow: input.trim() && !isLoading ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none' }}
                        >
                            <PaperPlaneRight className="w-4 h-4" weight="bold" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
