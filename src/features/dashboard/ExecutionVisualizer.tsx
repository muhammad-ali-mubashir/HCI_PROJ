import { motion } from 'framer-motion';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { Pulse, CheckCircle, WarningCircle, Clock } from '@phosphor-icons/react';
import clsx from 'clsx';

// Mock execution data for demo purposes
const mockExecutionLog = [
    { nodeId: 'webhook-trigger', status: 'success' as const, timestamp: Date.now() - 120000, nodeName: 'Webhook Trigger' },
    { nodeId: 'validate-data', status: 'success' as const, timestamp: Date.now() - 90000, nodeName: 'Validate Data' },
    { nodeId: 'transform-payload', status: 'success' as const, timestamp: Date.now() - 60000, nodeName: 'Transform Payload' },
    { nodeId: 'send-email', status: 'running' as const, timestamp: Date.now() - 30000, nodeName: 'Send Email' },
];

export const ExecutionVisualizer = () => {
    const { executionLog: storeLog, isExecuting } = useWorkflowStore();
    
    // Use mock data if store is empty, otherwise use store data
    const executionLog = storeLog.length > 0 ? storeLog : mockExecutionLog;
    const showRunning = isExecuting || storeLog.length === 0;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="p-6 rounded-xl bg-surface border border-white/[0.08] h-full overflow-hidden flex flex-col"
        >
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                    <Pulse className="w-5 h-5 text-primary" />
                    Live Execution Log
                </h3>
                {showRunning && (
                    <span className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                        <span 
                            className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                            style={{ boxShadow: '0 0 8px rgba(99, 102, 241, 0.6)' }}
                        />
                        Running
                    </span>
                )}
            </div>

            <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                {executionLog.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-12">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                            <Clock className="w-6 h-6 text-text-tertiary" />
                        </div>
                        <p className="text-text-secondary text-sm mb-1">No executions yet</p>
                        <p className="text-text-tertiary text-xs">Run a workflow to see execution logs</p>
                    </div>
                ) : (
                    executionLog.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={clsx(
                                "flex items-center gap-4 p-3.5 rounded-xl border transition-all",
                                step.status === 'success' && "bg-emerald-500/[0.03] border-emerald-500/10",
                                step.status === 'error' && "bg-red-500/[0.03] border-red-500/10",
                                step.status === 'running' && "bg-primary/[0.03] border-primary/10"
                            )}
                        >
                            <div className={clsx(
                                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                                step.status === 'success' && "bg-emerald-500/10 text-emerald-400",
                                step.status === 'error' && "bg-red-500/10 text-red-400",
                                step.status === 'running' && "bg-primary/10 text-primary"
                            )}>
                                {step.status === 'success' && <CheckCircle className="w-5 h-5" weight="fill" />}
                                {step.status === 'error' && <WarningCircle className="w-5 h-5" weight="fill" />}
                                {step.status === 'running' && <Pulse className="w-5 h-5 animate-pulse" />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text-primary truncate">
                                    {'nodeName' in step ? step.nodeName : `Node: ${step.nodeId}`}
                                </p>
                                <p className="text-xs text-text-tertiary">
                                    {new Date(step.timestamp).toLocaleTimeString()}
                                </p>
                            </div>

                            <div className={clsx(
                                "text-xs font-medium px-2.5 py-1 rounded-md",
                                step.status === 'success' && "bg-emerald-500/10 text-emerald-400",
                                step.status === 'error' && "bg-red-500/10 text-red-400",
                                step.status === 'running' && "bg-primary/10 text-primary"
                            )}>
                                {step.status === 'running' ? 'RUNNING' : step.status.toUpperCase()}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
};
