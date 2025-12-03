import React from 'react';
import { motion } from 'framer-motion';
import type { Edge as EdgeType, Node } from '../../lib/types';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { NODE_WIDTH, NODE_HEIGHT } from './Node';

interface EdgeProps {
    edge: EdgeType;
    sourceNode: Node;
    targetNode: Node;
}

export const Edge: React.FC<EdgeProps> = ({ edge, sourceNode, targetNode }) => {
    const { isExecuting } = useWorkflowStore();

    if (!sourceNode || !targetNode) return null;
    
    // Calculate connection points at the center of the dots
    // Source: right side of node + dot offset (8px from edge, dot is 16px wide, so center is at +8)
    const sx = sourceNode.position.x + NODE_WIDTH + 8;
    const sy = sourceNode.position.y + NODE_HEIGHT / 2 + 15;
    
    // Target: left side of node - dot offset
    const tx = targetNode.position.x - 8;
    const ty = targetNode.position.y + NODE_HEIGHT / 2;

    // Control points for smooth bezier curves
    const deltaX = Math.abs(tx - sx);
    const controlPointOffset = Math.max(deltaX * 0.4, 50);

    const cp1x = sx + controlPointOffset;
    const cp1y = sy;
    const cp2x = tx - controlPointOffset;
    const cp2y = ty;

    const path = `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${tx} ${ty}`;

    return (
        <svg className="absolute inset-0 pointer-events-none overflow-visible w-full h-full">
            <defs>
                {/* Subtle glow filter */}
                <filter id={`glow-${edge.id}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Shadow/glow layer */}
            <path
                d={path}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
            />

            {/* Main connection line - subtle white like reference */}
            <motion.path
                d={path}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Data Flow Particles when executing */}
            {isExecuting && (
                <>
                    <circle r="3" fill="rgba(255,255,255,0.8)" filter={`url(#glow-${edge.id})`}>
                        <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            path={path}
                            keyPoints="0;1"
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>
                    <circle r="2" fill="rgba(255,255,255,0.4)">
                        <animateMotion
                            dur="2s"
                            begin="0.3s"
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

