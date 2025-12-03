import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Clock } from 'lucide-react';
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

    // Format execution logs as a message component
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
                            "flex items-start gap-2 p-2 rounded-lg",
                            log.status === 'success' && "bg-green-50 dark:bg-green-900/20",
                            log.status === 'error' && "bg-red-50 dark:bg-red-900/20"
                        )}
                    >
                        <span className="flex-shrink-0">
                            {log.status === 'success' ? '✅' : '❌'}
                        </span>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-[#1E293B] dark:text-[#E8DCC4]">
                                {log.nodeName}
                            </div>
                            {log.message && (
                                <div className="text-[#64748B] dark:text-[#D4C5A9] mt-0.5">
                                    {log.message}
                                </div>
                            )}
                            {log.error && (
                                <div className="text-red-600 dark:text-red-400 mt-0.5">
                                    {log.error}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-1 text-[#94A3B8] dark:text-[#B8935C] flex-shrink-0">
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
                        // Store logs in a custom property (we'll handle this specially in rendering)
                    };
                    addMessage(logMsg);

                    // Store logs separately for rendering
                    (logMsg as any).executionLogs = response.executionLogs;
                }, 300);
            }

            // Update workflow visualization if nodes were returned
            if (response.nodes && response.nodes.length > 0) {
                setWorkflow({
                    id: Date.now().toString(),
                    name: 'Generated Workflow',
                    nodes: response.nodes,
                    edges: response.edges
                });

                // Animate nodes sequentially if it's an execution
                if (response.executionLogs) {
                    response.executionLogs.forEach((log, index) => {
                        setTimeout(() => {
                            // Update node status in the visualization
                            // This will be handled by WorkflowCanvas component
                        }, index * 800);
                    });
                }
            }

            // Update conversation context
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
        <div className="flex flex-col h-full bg-white/5 dark:bg-[#1E293B]/30 border-r border-[#E5E0D8]/20 dark:border-white/10 backdrop-blur-sm">
            <div className="p-4 border-b border-[#E5E0D8]/20 dark:border-white/10">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#8B7355] dark:text-[#D4A574]" />
                    n8n AI Assistant
                </h2>
                <p className="text-xs text-[#64748B] dark:text-[#D4C5A9] mt-1">
                    Create, trigger, and monitor workflows
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((msg) => {
                        // Check if this is a special execution logs message
                        const hasLogs = (msg as any).executionLogs;
                        const isLogsMessage = msg.content === '__EXECUTION_LOGS__';

                        if (isLogsMessage && hasLogs) {
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A574] to-[#8B7355] flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 bg-[#F5F1E8]/80 dark:bg-white/10 p-3 rounded-2xl rounded-tl-none">
                                        <ExecutionLogsDisplay logs={(msg as any).executionLogs} />
                                    </div>
                                </motion.div>
                            );
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
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                                    msg.role === 'user'
                                        ? "bg-gradient-to-br from-[#8B7355] to-[#6B5444] dark:from-[#D4A574] dark:to-[#B8935C]"
                                        : "bg-gradient-to-br from-[#D4A574] to-[#8B7355] dark:from-[#D4A574] dark:to-[#B8935C]"
                                )}>
                                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>
                                <div className={clsx(
                                    "p-3 rounded-2xl text-sm transition-all duration-200 whitespace-pre-line",
                                    msg.role === 'user'
                                        ? "bg-[#8B7355]/20 dark:bg-[#D4A574]/20 text-[#1E293B] dark:text-[#F5F1E8] rounded-tr-none"
                                        : "bg-[#F5F1E8]/80 dark:bg-white/10 text-[#334155] dark:text-[#E8DCC4] rounded-tl-none"
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
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A574] to-[#8B7355] flex items-center justify-center">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-[#F5F1E8]/80 dark:bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                <span className="w-2 h-2 bg-[#8B7355] dark:bg-[#D4A574] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-[#8B7355] dark:bg-[#D4A574] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-[#8B7355] dark:bg-[#D4A574] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-[#E5E0D8]/20 dark:border-white/10 space-y-3">
                {/* Suggested Prompts */}
                {messages.length === 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {suggestedPrompts.map((prompt, index) => (
                            <button
                                key={index}
                                onClick={() => handlePromptClick(prompt)}
                                className="text-xs bg-[#F5F1E8] dark:bg-white/10 hover:bg-[#E8DCC4] dark:hover:bg-white/20 border border-[#E5E0D8] dark:border-white/10 rounded-full px-3 py-1.5 text-[#1E293B] dark:text-[#F5F1E8] hover:text-black dark:hover:text-white transition-all duration-200 text-left font-medium"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}

                {/* Conversation context hint */}
                {conversationContext && (
                    <div className="text-xs text-[#8B7355] dark:text-[#D4A574] bg-[#F5F1E8] dark:bg-white/10 px-3 py-2 rounded-lg border border-[#E5E0D8] dark:border-white/10 font-medium">
                        💬 Waiting for your response...
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={conversationContext ? "Type your answer..." : "Describe a workflow or trigger one..."}
                            className="w-full bg-white dark:bg-[#0F172A] border border-[#E5E0D8] dark:border-white/20 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#D4A574] dark:focus:ring-[#D4A574] transition-all text-[#1E293B] dark:text-white placeholder-[#64748B] dark:placeholder-gray-400 shadow-sm"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-[#8B7355] to-[#6B5444] dark:from-[#D4A574] dark:to-[#B8935C] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200 shadow-md"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
