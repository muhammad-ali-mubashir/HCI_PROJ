import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Node as NodeType } from '../../lib/types';
import { Lightning, Plugs, Envelope, Clock, Code, Play, Trash, DotsThree, Globe, Bell, Database, ChatCircle, ArrowsClockwise } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { useWorkflowStore } from '../../store/useWorkflowStore';

const iconMap: Record<string, React.ElementType> = {
    trigger: Lightning,
    action: Envelope,
    function: Code,
    webhook: Plugs,
    schedule: Clock,
};

// Color dots for different node types (matching reference image)
const dotColorMap: Record<string, string> = {
    trigger: 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]',
    action: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]',
    function: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]',
    webhook: 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]',
    schedule: 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]',
};

// Node-specific content based on label/type
const getNodeContent = (node: NodeType) => {
    const label = node.label.toLowerCase();
    
    if (label.includes('email') || label.includes('mail')) {
        return { description: 'Send email notifications', config: 'recipient, subject, body' };
    }
    if (label.includes('webhook') || label.includes('form')) {
        return { description: 'Receive incoming data', config: 'endpoint, method, headers' };
    }
    if (label.includes('schedule') || label.includes('cron')) {
        return { description: 'Time-based trigger', config: 'interval, timezone' };
    }
    if (label.includes('notification') || label.includes('notify')) {
        return { description: 'Push notifications', config: 'channel, message' };
    }
    if (label.includes('validate') || label.includes('check')) {
        return { description: 'Data validation', config: 'rules, schema' };
    }
    if (label.includes('transform') || label.includes('map')) {
        return { description: 'Transform data', config: 'mapping, format' };
    }
    if (label.includes('database') || label.includes('db') || label.includes('query')) {
        return { description: 'Database operation', config: 'query, connection' };
    }
    if (label.includes('http') || label.includes('api') || label.includes('request')) {
        return { description: 'HTTP request', config: 'url, method, body' };
    }
    if (label.includes('code') || label.includes('script')) {
        return { description: 'Custom logic', config: 'JavaScript code' };
    }
    if (label.includes('ai') || label.includes('chat') || label.includes('gpt')) {
        return { description: 'AI processing', config: 'model, prompt' };
    }
    
    // Default by type
    switch (node.type) {
        case 'trigger':
            return { description: 'Workflow trigger', config: 'trigger conditions' };
        case 'action':
            return { description: 'Execute action', config: 'action parameters' };
        case 'function':
            return { description: 'Process data', config: 'function logic' };
        case 'webhook':
            return { description: 'HTTP endpoint', config: 'endpoint config' };
        case 'schedule':
            return { description: 'Scheduled task', config: 'cron expression' };
        default:
            return { description: 'Node operation', config: 'configuration' };
    }
};

// Node dimensions for connection point calculations
export const NODE_WIDTH = 200;
export const NODE_HEIGHT = 160; // Includes header + content + footer on hover

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
    const dotColor = dotColorMap[node.type] || 'bg-gray-500 shadow-[0_0_8px_rgba(107,114,128,0.6)]';
    const { isExecuting, executionLog } = useWorkflowStore();
    const nodeRef = useRef<HTMLDivElement>(null);
    const isDraggingConnection = useRef(false);

    const executionStatus = executionLog.find(step => step.nodeId === node.id)?.status;
    const isRunning = executionStatus === 'running' || (isExecuting && !executionStatus);
    const nodeContent = getNodeContent(node);

    return (
        <motion.div
            ref={nodeRef}
            drag={!isConnecting && !isDraggingConnection.current}
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => {
                if (!isDraggingConnection.current && onDragStart) onDragStart();
            }}
            onDragEnd={(_, info) => {
                if (!isDraggingConnection.current && onDragEnd) {
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
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.01 }}
            style={{
                position: 'absolute',
                left: 0,
                top: 0
            }}
            onClick={onClick}
            className="cursor-pointer group workflow-node"
        >
            {/* Connection Points - Input (left) - positioned at vertical center */}
            <div
                className={cn(
                    "absolute -left-2 w-4 h-4 rounded-full border-2 border-[#1a1a1a] transition-all cursor-crosshair z-30 hover:scale-125",
                    dotColor
                )}
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                onMouseUp={(e) => {
                    e.stopPropagation();
                    if (onConnectEnd) onConnectEnd();
                }}
                title="Drop connection here"
            />
            
            {/* Connection Points - Output (right) - positioned at vertical center */}
            <div
                className={cn(
                    "absolute -right-2 w-4 h-4 rounded-full border-2 border-[#1a1a1a] transition-all cursor-crosshair z-30 hover:scale-125",
                    dotColor
                )}
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    isDraggingConnection.current = true;
                    if (onConnectStart) onConnectStart();
                    
                    // Reset flag on mouse up anywhere
                    const handleMouseUp = () => {
                        isDraggingConnection.current = false;
                        window.removeEventListener('mouseup', handleMouseUp);
                    };
                    window.addEventListener('mouseup', handleMouseUp);
                }}
                title="Drag to connect"
            />

            {/* Node Card */}
            <div 
                className={cn(
                    "rounded-xl overflow-hidden transition-all duration-200",
                    "bg-[#1a1a1a] border border-white/10",
                    "shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
                    isSelected && "border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_4px_24px_rgba(0,0,0,0.5)]"
                )}
                style={{ width: NODE_WIDTH }}
            >
                {/* Header */}
                <div className="px-3 py-2.5 flex items-center gap-2 border-b border-white/5">
                    {/* Status Dot */}
                    <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", dotColor)} />
                    
                    {/* Title */}
                    <span className="flex-1 text-sm font-medium text-white/90 truncate">
                        {node.label}
                    </span>
                    
                    {/* Menu Button */}
                    <button 
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DotsThree className="w-4 h-4 text-white/50" weight="bold" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-3 space-y-2">
                    {/* Type indicator with icon */}
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "w-6 h-6 rounded-md flex items-center justify-center",
                            "bg-white/5 border border-white/10"
                        )}>
                            <Icon className="w-3.5 h-3.5 text-white/60" />
                        </div>
                        <span className="text-xs text-white/40 capitalize">{node.type}</span>
                    </div>

                    {/* Dynamic content based on node type */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-white/30 uppercase tracking-wider">
                            {nodeContent.description}
                        </div>
                        <div className="bg-[#0f0f0f] rounded-lg px-2.5 py-1.5 border border-white/5">
                            <span className="text-[11px] text-white/40">{nodeContent.config}</span>
                        </div>
                    </div>

                    {/* Execution Status */}
                    {executionStatus && (
                        <div className={cn(
                            "flex items-center gap-2 px-2 py-1.5 rounded-md text-xs",
                            executionStatus === 'success' 
                                ? "bg-emerald-500/10 text-emerald-400" 
                                : "bg-red-500/10 text-red-400"
                        )}>
                            <div className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                executionStatus === 'success' ? "bg-emerald-500" : "bg-red-500"
                            )} />
                            {executionStatus === 'success' ? 'Completed' : 'Failed'}
                        </div>
                    )}
                </div>

                {/* Actions Footer - appears on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity border-t border-white/5 px-3 py-2 flex items-center justify-between">
                    <button 
                        className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Play className="w-3 h-3" weight="fill" />
                        <span>Run</span>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onDelete) onDelete(node.id);
                        }}
                        className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors"
                    >
                        <Trash className="w-3 h-3" />
                        <span>Delete</span>
                    </button>
                </div>

                {/* Running Animation Overlay */}
                {isRunning && isExecuting && (
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                        <div className="absolute inset-0 border-2 border-white/20 rounded-xl animate-pulse" />
                    </div>
                )}
            </div>
        </motion.div>
    );
};
