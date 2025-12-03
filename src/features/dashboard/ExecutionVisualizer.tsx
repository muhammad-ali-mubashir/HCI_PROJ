import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { Activity, CheckCircle, AlertCircle, Terminal, Code, Clock } from 'lucide-react';
import clsx from 'clsx';

export const ExecutionVisualizer = () => {
    const { executionLog, isExecuting } = useWorkflowStore();
    const [viewMode, setViewMode] = useState<'list' | 'json'>('list');

    return (
        <div className="bg-[#1E293B] border border-[#E5E0D8]/20 rounded-3xl p-6 backdrop-blur-sm h-full overflow-hidden flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Terminal className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Live Execution Log</h3>
                        <p className="text-gray-400 text-xs">Real-time workflow processing events</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode('list')}
                        className={clsx(
                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                            viewMode === 'list' ? "bg-blue-500/20 text-blue-400" : "text-gray-400 hover:text-white"
                        )}
                    >
                        List
                    </button>
                    <button
                        onClick={() => setViewMode('json')}
                        className={clsx(
                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                            viewMode === 'json' ? "bg-blue-500/20 text-blue-400" : "text-gray-400 hover:text-white"
                        )}
                    >
                        <Code className="w-3 h-3 inline mr-1" />
                        JSON
                    </button>
                </div>
            </div>

            {isExecuting && (
                <div className="mb-4 flex items-center gap-2 text-xs text-blue-400 bg-blue-400/10 px-3 py-2 rounded-lg border border-blue-400/20">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    Processing workflow execution...
                </div>
            )}

            <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {executionLog.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                        <Activity className="w-10 h-10 opacity-20" />
                        <p>Waiting for execution triggers...</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {executionLog.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group"
                            >
                                {viewMode === 'list' ? (
                                    <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className={clsx(
                                            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                                            step.status === 'success' ? "bg-green-500/20 text-green-400" :
                                                step.status === 'error' ? "bg-red-500/20 text-red-400" :
                                                    step.nodeId === 'system' ? "bg-purple-500/20 text-purple-400" : // System/AutoML events
                                                        "bg-blue-500/20 text-blue-400"
                                        )}>
                                            {step.status === 'success' ? <CheckCircle className="w-3 h-3" /> :
                                                step.status === 'error' ? <AlertCircle className="w-3 h-3" /> :
                                                    step.nodeId === 'system' ? <Activity className="w-3 h-3" /> : // Optimization icon
                                                        <Activity className="w-3 h-3 animate-spin" />}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-200">
                                                    {step.nodeName || step.nodeId}
                                                </p>
                                                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(step.timestamp).toLocaleTimeString()}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {step.message || (step.status === 'success' ? 'Execution completed successfully' :
                                                    step.status === 'error' ? step.error || 'Execution failed' : 'Processing...')}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="font-mono text-xs bg-black/30 p-3 rounded-xl border border-white/5 text-gray-300 overflow-x-auto">
                                        <span className="text-blue-400">{"{"}</span>
                                        <div className="pl-4">
                                            <span className="text-purple-400">"node"</span>: <span className="text-green-400">"{step.nodeId}"</span>,
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-purple-400">"status"</span>: <span className={step.status === 'error' ? "text-red-400" : "text-green-400"}>"{step.status}"</span>,
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-purple-400">"timestamp"</span>: <span className="text-yellow-400">{step.timestamp}</span>
                                        </div>
                                        <span className="text-blue-400">{"}"}</span>,
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};
