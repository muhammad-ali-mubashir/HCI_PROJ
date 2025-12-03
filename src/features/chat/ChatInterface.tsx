import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { simulateWorkflowGeneration } from '../../lib/simulation';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export const ChatInterface = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { messages, addMessage, setWorkflow, startExecution } = useWorkflowStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
        setInput('');
        setIsLoading(true);

        try {
            const response = await simulateWorkflowGeneration(input);

            const botMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant' as const,
                content: response.message,
                timestamp: Date.now(),
            };

            addMessage(botMsg);
            setWorkflow({
                id: Date.now().toString(),
                name: 'Generated Workflow',
                nodes: response.nodes,
                edges: response.edges
            });

            // Auto-start execution for demo purposes
            setTimeout(() => startExecution(), 1000);

        } catch (error) {
            console.error("Simulation failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const suggestedPrompts = [
        "Create an e-commerce automation workflow",
        "Build a social media manager bot",
        "Generate a customer support ticket system"
    ];

    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
        // Optional: auto-submit
        // handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    };

    return (
        <div className="flex flex-col h-full bg-white/5 border-r border-white/10 backdrop-blur-sm">
            <div className="p-4 border-b border-white/10">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-400" />
                    AI Assistant
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((msg) => (
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
                                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                msg.role === 'user' ? "bg-blue-600" : "bg-purple-600"
                            )}>
                                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className={clsx(
                                "p-3 rounded-2xl text-sm",
                                msg.role === 'user'
                                    ? "bg-blue-600/20 text-blue-100 rounded-tr-none"
                                    : "bg-white/10 text-gray-200 rounded-tl-none"
                            )}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 space-y-3">
                {/* Suggested Prompts */}
                {messages.length === 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {suggestedPrompts.map((prompt, index) => (
                            <button
                                key={index}
                                onClick={() => handlePromptClick(prompt)}
                                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-gray-300 transition-colors text-left"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe a workflow..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-gray-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
