import React from 'react';
import { motion } from 'framer-motion';
import type { Edge as EdgeType, Node } from '../../lib/types';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { useThemeStore } from '../../store/useThemeStore';
import { NODE_WIDTH, NODE_HEIGHT } from './Node';

interface EdgeProps {
    edge: EdgeType;
    sourceNode: Node;
    targetNode: Node;
}

export const Edge: React.FC<EdgeProps> = ({ edge, sourceNode, targetNode }) => {
    const { isExecuting } = useWorkflowStore();
    const { mode } = useThemeStore();

    if (!sourceNode || !targetNode) return null;
    
    // Calculate connection points at the center of the dots
    // Source: right side of node (dot is 14px, positioned at -7px from edge)
    const sx = sourceNode.position.x + NODE_WIDTH + 7;
    const sy = sourceNode.position.y + NODE_HEIGHT / 2;
    
    // Target: left side of node
    const tx = targetNode.position.x - 7;
    const ty = targetNode.position.y + NODE_HEIGHT / 2;

    // Control points for smooth bezier curves - Linear style: gentle curves
    const deltaX = Math.abs(tx - sx);
    const controlPointOffset = Math.max(deltaX * 0.5, 60);

    const cp1x = sx + controlPointOffset;
    const cp1y = sy;
    const cp2x = tx - controlPointOffset;
    const cp2y = ty;

    const path = `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${tx} ${ty}`;

    // Theme-aware stroke color
    const strokeColor = mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)';

    return (
        <svg className="absolute inset-0 pointer-events-none overflow-visible w-full h-full">
            <defs>
                {/* Neon glow filter for execution */}
                <filter id={`glow-${edge.id}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Main connection line - Linear style: subtle, border-like */}
            <motion.path
                d={path}
                stroke={strokeColor}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Data Flow Particles when executing - neon style */}
            {isExecuting && (
                <>
                    {/* Glowing particle */}
                    <circle r="4" fill="#10B981" filter={`url(#glow-${edge.id})`}>
                        <animateMotion
                            dur="1.5s"
                            repeatCount="indefinite"
                            path={path}
                            keyPoints="0;1"
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>
                    {/* Trail particle */}
                    <circle r="2" fill="rgba(16, 185, 129, 0.5)">
                        <animateMotion
                            dur="1.5s"
                            begin="0.2s"
                            repeatCount="indefinite"
                            path={path}
                            keyPoints="0;1"
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>
                </>
            )}
        </svg>
    );
};