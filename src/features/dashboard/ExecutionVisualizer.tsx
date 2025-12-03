import { motion } from 'framer-motion';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { Pulse, CheckCircle, WarningCircle } from '@phosphor-icons/react';
import clsx from 'clsx';

export const ExecutionVisualizer = () => {
    const { executionLog, isExecuting } = useWorkflowStore();

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold flex items-center gap-2">
                    <Pulse className="w-5 h-5 text-blue-400" />
                    Live Execution Log
                </h3>
                {isExecuting && (
                    <span className="flex items-center gap-2 text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        Running
                    </span>
                )}
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                {executionLog.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        No execution data available
                    </div>
                ) : (
                    executionLog.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5"
                        >
                            <div className={clsx(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                step.status === 'success' ? "bg-green-500/20 text-green-400" :
                                    step.status === 'error' ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                            )}>
                                {step.status === 'success' ? <CheckCircle className="w-4 h-4" /> :
                                    step.status === 'error' ? <WarningCircle className="w-4 h-4" /> :
                                        <Pulse className="w-4 h-4 animate-spin" />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-200 truncate">
                                    Node Execution: {step.nodeId}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(step.timestamp).toLocaleTimeString()}
                                </p>
                            </div>

                            <div className="text-xs font-mono text-gray-400 bg-black/20 px-2 py-1 rounded">
                                {step.status.toUpperCase()}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};
