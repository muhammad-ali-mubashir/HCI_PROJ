import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Node as WorkflowNode } from '../../lib/types';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Lightning, Plugs, Envelope, Clock, Code, Play, Trash, DotsThree } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { useWorkflowStore } from '../../store/useWorkflowStore';

const iconMap: Record<string, PhosphorIcon> = {
    trigger: Lightning,
    action: Envelope,
    function: Code,
    webhook: Plugs,
    schedule: Clock,
};

// Linear-style neon accent colors for connection dots
const dotColorMap: Record<string, { bg: string; glow: string; text: string }> = {
    trigger: { bg: 'bg-pink-500', glow: '0 0 10px rgba(236, 72, 153, 0.6)', text: '#EC4899' },
    action: { bg: 'bg-emerald-500', glow: '0 0 10px rgba(16, 185, 129, 0.6)', text: '#10B981' },
    function: { bg: 'bg-amber-500', glow: '0 0 10px rgba(245, 158, 11, 0.6)', text: '#F59E0B' },
    webhook: { bg: 'bg-violet-500', glow: '0 0 10px rgba(139, 92, 246, 0.6)', text: '#8B5CF6' },
    schedule: { bg: 'bg-cyan-500', glow: '0 0 10px rgba(6, 182, 212, 0.6)', text: '#06B6D4' },
};

// Node-specific content based on label/type
const getNodeContent = (node: WorkflowNode) => {
    const label = node.label.toLowerCase();
    
    if (label.includes('email') || label.includes('mail')) {
        return { description: 'SEND EMAIL', config: 'recipient, subject, body' };
    }
    if (label.includes('webhook') || label.includes('form')) {
        return { description: 'RECEIVE DATA', config: 'endpoint, method, headers' };
    }
    if (label.includes('schedule') || label.includes('cron')) {
        return { description: 'TIME-BASED TRIGGER', config: 'interval, timezone' };
    }
    if (label.includes('notification') || label.includes('notify')) {
        return { description: 'PUSH NOTIFICATIONS', config: 'channel, message' };
    }
    if (label.includes('validate') || label.includes('check')) {
        return { description: 'DATA VALIDATION', config: 'rules, schema' };
    }
    if (label.includes('transform') || label.includes('map')) {
        return { description: 'TRANSFORM DATA', config: 'mapping, format' };
    }
    if (label.includes('database') || label.includes('db') || label.includes('query')) {
        return { description: 'DATABASE QUERY', config: 'query, connection' };
    }
    if (label.includes('http') || label.includes('api') || label.includes('request')) {
        return { description: 'HTTP REQUEST', config: 'url, method, body' };
    }
    if (label.includes('code') || label.includes('script')) {
        return { description: 'CUSTOM CODE', config: 'JavaScript code' };
    }
    if (label.includes('ai') || label.includes('chat') || label.includes('gpt')) {
        return { description: 'AI PROCESSING', config: 'model, prompt' };
    }
    
    // Default by type
    switch (node.type) {
        case 'trigger':
            return { description: 'WORKFLOW TRIGGER', config: 'trigger conditions' };
        case 'action':
            return { description: 'EXECUTE ACTION', config: 'action parameters' };
        case 'function':
            return { description: 'PROCESS DATA', config: 'function logic' };
        case 'webhook':
            return { description: 'HTTP ENDPOINT', config: 'endpoint config' };
        case 'schedule':
            return { description: 'SCHEDULED TASK', config: 'cron expression' };
        default:
            return { description: 'NODE OPERATION', config: 'configuration' };
    }
};

// Node dimensions for connection point calculations
export const NODE_WIDTH = 220;
export const NODE_HEIGHT = 140;

interface NodeProps {
    node: WorkflowNode;
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
    const dotColors = dotColorMap[node.type] || { bg: 'bg-gray-500', glow: '0 0 10px rgba(107, 114, 128, 0.6)', text: '#6B7280' };
    const { isExecuting, executionLog } = useWorkflowStore();
    const isDraggingConnection = useRef(false);

    const executionStatus = executionLog.find(step => step.nodeId === node.id)?.status;
    const isRunning = executionStatus === 'running' || (isExecuting && !executionStatus);
    const nodeContent = getNodeContent(node);

    return (
        <motion.div
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                x: node.position.x,
                y: node.position.y,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{
                position: 'absolute',
                left: 0,
                top: 0
            }}
            onClick={onClick}
            className="cursor-pointer group workflow-node"
        >
            {/* Connection Point - Input (left) */}
            <div
                className={cn(
                    "absolute -left-[7px] w-[14px] h-[14px] rounded-full transition-transform cursor-crosshair z-30 hover:scale-125",
                    dotColors.bg
                )}
                style={{ 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    boxShadow: dotColors.glow
                }}
                onMouseUp={(e) => {
                    e.stopPropagation();
                    if (onConnectEnd) onConnectEnd();
                }}
            />
            
            {/* Connection Point - Output (right) */}
            <div
                className={cn(
                    "absolute -right-[7px] w-[14px] h-[14px] rounded-full transition-transform cursor-crosshair z-30 hover:scale-125",
                    dotColors.bg
                )}
                style={{ 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    boxShadow: dotColors.glow
                }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    isDraggingConnection.current = true;
                    if (onConnectStart) onConnectStart();
                    
                    const handleMouseUp = () => {
                        isDraggingConnection.current = false;
                        window.removeEventListener('mouseup', handleMouseUp);
                    };
                    window.addEventListener('mouseup', handleMouseUp);
                }}
            />

            {/* Node Card - Linear Style: Border-based depth, no shadows */}
            <div 
                className={cn(
                    "rounded-xl overflow-hidden transition-all duration-150",
                    // Linear style: solid background + border for depth
                    "bg-[#16161A]",
                    // 1px border for depth (no shadows)
                    isSelected 
                        ? "border border-white/20" 
                        : "border border-white/[0.08] hover:border-white/[0.12]"
                )}
                style={{ width: NODE_WIDTH }}
            >
                {/* Header */}
                <div className="px-3 py-2.5 flex items-center gap-2">
                    {/* Status Dot with glow */}
                    <div 
                        className={cn("w-2 h-2 rounded-full shrink-0", dotColors.bg)}
                        style={{ boxShadow: dotColors.glow }}
                    />
                    
                    {/* Title */}
                    <span className="flex-1 text-[13px] font-medium text-white truncate">
                        {node.label}
                    </span>
                    
                    {/* Menu Button */}
                    <button 
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/5 rounded transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DotsThree className="w-4 h-4 text-white/40" weight="bold" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="px-3 pb-3 space-y-2">
                    {/* Type indicator with icon */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-white/[0.03] border border-white/[0.06]">
                            <Icon className="w-3.5 h-3.5 text-white/50" />
                        </div>
                        <span className="text-xs text-white/30 capitalize">{node.type}</span>
                    </div>

                    {/* Description label with neon accent */}
                    <div 
                        className={cn("text-[10px] uppercase tracking-wider font-medium flex items-center gap-1.5")}
                        style={{ color: dotColors.text }}
                    >
                        <div 
                            className={cn("w-1.5 h-1.5 rounded-full", dotColors.bg)}
                            style={{ boxShadow: dotColors.glow }}
                        />
                        {nodeContent.description}
                    </div>

                    {/* Config field - Linear style input */}
                    <div className="bg-[#0F0F12] rounded-lg px-2.5 py-2 border border-white/[0.06]">
                        <span className="text-[11px] text-white/35">{nodeContent.config}</span>
                    </div>

                    {/* Execution Status */}
                    {executionStatus && (
                        <div className={cn(
                            "flex items-center gap-2 px-2 py-1.5 rounded-md text-xs border",
                            executionStatus === 'success' 
                                ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" 
                                : "bg-red-500/5 text-red-400 border-red-500/20"
                        )}>
                            <div 
                                className={cn("w-1.5 h-1.5 rounded-full")}
                                style={{ 
                                    backgroundColor: executionStatus === 'success' ? '#10B981' : '#EF4444',
                                    boxShadow: executionStatus === 'success' 
                                        ? '0 0 8px rgba(16, 185, 129, 0.6)' 
                                        : '0 0 8px rgba(239, 68, 68, 0.6)'
                                }}
                            />
                            {executionStatus === 'success' ? 'Completed' : 'Failed'}
                        </div>
                    )}
                </div>

                {/* Actions Footer - appears on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity border-t border-white/[0.06] px-3 py-2 flex items-center justify-between bg-white/[0.02]">
                    <button 
                        className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Play className="w-3 h-3" weight="fill" />
                        <span>Run</span>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onDelete) onDelete(node.id);
                        }}
                        className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-red-400 transition-colors"
                    >
                        <Trash className="w-3 h-3" />
                        <span>Delete</span>
                    </button>
                </div>

                {/* Running Animation */}
                {isRunning && isExecuting && (
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    </div>
                )}
            </div>
        </motion.div>
    );
};
