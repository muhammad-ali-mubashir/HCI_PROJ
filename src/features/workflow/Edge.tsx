import React from 'react';
import { motion } from 'framer-motion';
import type { Edge as EdgeType, Node } from '../../lib/types';
import { useWorkflowStore } from '../../store/useWorkflowStore';

interface EdgeProps {
    edge: EdgeType;
    sourceNode: Node;
    targetNode: Node;
}

export const Edge: React.FC<EdgeProps> = ({ edge, sourceNode, targetNode }) => {
    const { isExecuting } = useWorkflowStore();

    if (!sourceNode || !targetNode) return null;

    // Calculate path
    const sx = sourceNode.position.x;
    const sy = sourceNode.position.y;
    const tx = targetNode.position.x;
    const ty = targetNode.position.y;

    // Control points for smooth bezier
    const deltaX = Math.abs(tx - sx);
    const controlPointOffset = Math.max(deltaX * 0.5, 50);

    const cp1x = sx + controlPointOffset;
    const cp1y = sy;
    const cp2x = tx - controlPointOffset;
    const cp2y = ty;

    const path = `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${tx} ${ty}`;

    return (
        <svg className="absolute inset-0 pointer-events-none overflow-visible w-full h-full">
            <defs>
                <linearGradient id={`gradient-${edge.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background Line (Ghost) */}
            <path
                d={path}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />

            {/* Animated Drawing Line */}
            <motion.path
                d={path}
                stroke={`url(#gradient-${edge.id})`}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Data Flow Particles - Enhanced */}
            {isExecuting && (
                <>
                    <circle r="4" fill="#fff" filter="url(#glow)">
                        <animateMotion
                            dur="1.5s"
                            repeatCount="indefinite"
                            path={path}
                            keyPoints="0;1"
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>
                    <circle r="2" fill="#fff" opacity="0.6">
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

