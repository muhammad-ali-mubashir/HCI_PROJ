import React from 'react';
import { motion } from 'framer-motion';
import type { Node as NodeType } from '../../lib/types';
import { Lightning, Plugs, Envelope, Clock, Code, Play, Trash } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { useWorkflowStore } from '../../store/useWorkflowStore';

const iconMap = {
    trigger: Plugs,
    action: Envelope,
    function: Code,
    webhook: Plugs,
    schedule: Clock,
};

const colorMap = {
    trigger: 'text-primary bg-primary/10 border-primary/20',
    action: 'text-success bg-success/10 border-success/20',
    function: 'text-warning bg-warning/10 border-warning/20',
    webhook: 'text-primary bg-primary/10 border-primary/20',
    schedule: 'text-text-secondary bg-surface-active border-white/10',
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
    const Icon = iconMap[node.type] || Lightning;
    const colorClass = colorMap[node.type] || 'text-text-secondary bg-surface border-white/10';
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
                    ? "0 0 0 2px #3B82F6, 0 4px 20px rgba(59, 130, 246, 0.2)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
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
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-text-secondary rounded-full border-2 border-background hover:bg-primary hover:scale-125 transition-all cursor-pointer z-20"
                onMouseUp={(e) => {
                    e.stopPropagation();
                    if (onConnectEnd) onConnectEnd();
                }}
                title="Drop connection here"
            />
            <div
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-text-secondary rounded-full border-2 border-background hover:bg-primary hover:scale-125 transition-all cursor-grab active:cursor-grabbing z-20"
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onConnectStart) onConnectStart();
                }}
                title="Drag to connect"
            />

            <div className={cn(
                "w-64 bg-surface rounded-xl overflow-hidden border transition-colors",
                isSelected ? "border-primary" : "border-white/5 hover:border-white/10"
            )}>
                <div className="p-4 flex items-center gap-3">
                    <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center border",
                        colorClass
                    )}>
                        <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-text-primary truncate">{node.label}</h3>
                        <p className="text-xs text-text-secondary truncate capitalize">{node.type}</p>
                    </div>

                    {/* Status/Actions */}
                    <div className="flex items-center gap-2">
                        {executionStatus ? (
                            <div className={cn(
                                "w-2 h-2 rounded-full",
                                executionStatus === 'success' ? "bg-success" : "bg-error"
                            )} />
                        ) : (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button className="p-1.5 hover:bg-white/5 rounded-md text-text-secondary hover:text-text-primary transition-colors">
                                    <Play className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onDelete) onDelete(node.id);
                                    }}
                                    className="p-1.5 hover:bg-error/10 rounded-md text-text-secondary hover:text-error transition-colors"
                                >
                                    <Trash className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Active State Overlay */}
                {isRunning && isExecuting && (
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                )}
            </div>
        </motion.div>
    );
};
