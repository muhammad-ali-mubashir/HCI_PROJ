import React from 'react';
import { motion } from 'framer-motion';
import type { Node as NodeType } from '../../lib/types';
import { Zap, Webhook, Mail, Clock, Code, Play, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useWorkflowStore } from '../../store/useWorkflowStore';

const iconMap = {
    trigger: Webhook,
    action: Mail,
    function: Code,
    webhook: Webhook,
    schedule: Clock,
};

const colorMap = {
    trigger: 'from-[#D4A574] to-[#B8935C]',
    action: 'from-[#475569] to-[#334155]',
    function: 'from-[#D4C5A9] to-[#8B7355]',
    webhook: 'from-[#B8935C] to-[#8B7355]',
    schedule: 'from-[#6B5444] to-[#4A3F35]',
};

interface NodeProps {
    node: NodeType;
    isSelected?: boolean;
    isConnecting?: boolean;
    onClick?: () => void;
    onDragEnd?: (id: string, x: number, y: number) => void;
    onDragStart?: () => void;
    onDelete?: (id: string) => void;
    onConnectStart?: () => void;
    onConnectEnd?: () => void;
}

export const Node: React.FC<NodeProps> = ({ node, isSelected, isConnecting, onClick, onDragEnd, onDragStart, onDelete, onConnectStart, onConnectEnd }) => {
    const Icon = iconMap[node.type] || Zap;
    const gradient = colorMap[node.type] || 'from-gray-500 to-gray-600';
    const { isExecuting, executionLog } = useWorkflowStore();

    const executionStatus = executionLog.find(step => step.nodeId === node.id)?.status;
    const isRunning = executionStatus === 'running' || (isExecuting && !executionStatus);

    return (
        <motion.div
            drag={!isConnecting}
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => {
                if (onDragStart) onDragStart();
            }}
            onDragEnd={(_, info) => {
                if (onDragEnd) {
                    const newX = node.position.x + info.offset.x;
                    const newY = node.position.y + info.offset.y;
                    onDragEnd(node.id, newX, newY);
                }
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                x: node.position.x,
                y: node.position.y,
                boxShadow: isSelected
                    ? "0 0 0 2px #fff, 0 0 20px rgba(255,255,255,0.5)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
                position: 'absolute',
                left: 0,
                top: 0
            }}
            onClick={onClick}
            className="cursor-pointer group workflow-node"
        >
            {/* Connection Points */}
            <div
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#D4A574] rounded-full border-2 border-[#0f111a] dark:border-[#1E293B] hover:bg-[#B8935C] hover:scale-150 transition-all cursor-pointer z-20 shadow-lg"
                onMouseUp={(e) => {
                    e.stopPropagation();
                    if (onConnectEnd) onConnectEnd();
                }}
                title="Drop connection here"
            />
            <div
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#8B7355] rounded-full border-2 border-[#0f111a] dark:border-[#1E293B] hover:bg-[#D4A574] hover:scale-150 transition-all cursor-grab active:cursor-grabbing z-20 shadow-lg"
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onConnectStart) onConnectStart();
                }}
                title="Drag to connect"
            />

            <div className="w-64 bg-gray-800 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-xl">
                {/* Header */}
                <div className={clsx("h-1.5 w-full bg-gradient-to-r", gradient)} />

                <div className="p-4 flex items-start gap-4">
                    <div className={clsx(
                        "w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br shadow-lg shrink-0",
                        gradient
                    )}>
                        <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">{node.label}</h3>
                        <p className="text-xs text-gray-400 truncate mt-0.5 capitalize">{node.type}</p>
                    </div>

                    {/* Status/Actions */}
                    <div className="flex items-center gap-2">
                        {executionStatus ? (
                            <div className={clsx(
                                "w-2 h-2 rounded-full",
                                executionStatus === 'success' ? "bg-green-500" : "bg-red-500"
                            )} />
                        ) : (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                                    <Play className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onDelete) onDelete(node.id);
                                    }}
                                    className="p-1 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Active State Overlay */}
                {isRunning && isExecuting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                )}
            </div>
        </motion.div>
    );
};

