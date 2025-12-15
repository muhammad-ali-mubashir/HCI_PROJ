import React, { useRef, useState, useEffect } from 'react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { useThemeStore } from '../../store/useThemeStore';
import { Node, NODE_WIDTH, NODE_HEIGHT } from './Node';
import { Edge } from './Edge';
import { motion } from 'framer-motion';
import { CornersOut, CornersIn, Hand } from '@phosphor-icons/react';

interface WorkflowCanvasProps {
    selectedNodeId?: string | null;
    onNodeSelect?: (nodeId: string | null) => void;
}

export const WorkflowCanvas = ({ selectedNodeId: externalSelectedNodeId, onNodeSelect }: WorkflowCanvasProps = {}) => {
    const { nodes, edges, updateNodePosition, removeNode, addEdge } = useWorkflowStore();
    const { mode } = useThemeStore();
    const [internalSelectedNodeId, setInternalSelectedNodeId] = useState<string | null>(null);

    // Use external state if provided, otherwise use internal
    const selectedNodeId = externalSelectedNodeId !== undefined ? externalSelectedNodeId : internalSelectedNodeId;
    const setSelectedNodeId = (nodeId: string | null) => {
        if (onNodeSelect) {
            onNodeSelect(nodeId);
        } else {
            setInternalSelectedNodeId(nodeId);
        }
    };

    const containerRef = useRef<HTMLDivElement>(null);

    // Pan/Zoom State
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
    const [isPanning, setIsPanning] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const [panMode, setPanMode] = useState(false); // H key toggle
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Connection State
    const [connectingNodeId, setConnectingNodeId] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Keyboard listener for 'H' key
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'h' || e.key === 'H') {
                setPanMode(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Listen for fullscreen changes (e.g., user presses Escape)
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Toggle fullscreen using browser API
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const scaleAmount = -e.deltaY * 0.001;
            setTransform(prev => ({
                ...prev,
                scale: Math.min(Math.max(0.5, prev.scale + scaleAmount), 2)
            }));
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        // Only pan if panMode is enabled AND clicking on background
        if (!panMode) return;
        if ((e.target as HTMLElement).closest('.workflow-node')) return;

        setIsPanning(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Handle Panning
        if (isPanning && panMode) {
            const dx = e.clientX - lastMousePos.x;
            const dy = e.clientY - lastMousePos.y;
            setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
            setLastMousePos({ x: e.clientX, y: e.clientY });
        }

        // Handle Connecting Line
        if (connectingNodeId && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: (e.clientX - rect.left - transform.x) / transform.scale,
                y: (e.clientY - rect.top - transform.y) / transform.scale
            });
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
        setConnectingNodeId(null);
    };

    const startConnection = (nodeId: string) => {
        setConnectingNodeId(nodeId);
    };

    const completeConnection = (targetNodeId: string) => {
        if (connectingNodeId && connectingNodeId !== targetNodeId) {
            const newEdge = {
                id: `e${connectingNodeId}-${targetNodeId}-${Date.now()}`,
                source: connectingNodeId,
                target: targetNodeId
            };
            addEdge(newEdge);
        }
        setConnectingNodeId(null);
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden transition-colors duration-300 ${isFullscreen ? 'fixed inset-0 z-50' : ''
                } ${panMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
            style={{ backgroundColor: 'var(--color-background)' }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* UI Controls - Linear style */}
            <div className="absolute top-4 right-4 z-50 flex gap-2">
                {/* Pan Mode Toggle Button */}
                <button
                    onClick={() => setPanMode(prev => !prev)}
                    className={`px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${panMode
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                        : 'bg-surface border-[var(--card-border)] text-text-tertiary hover:border-[var(--card-border-hover)] hover:text-text-secondary'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Hand className="w-4 h-4" weight={panMode ? 'fill' : 'regular'} />
                        <span className="text-[11px] font-medium">Pan (H)</span>
                    </div>
                </button>

                {/* Fullscreen Toggle */}
                <button
                    onClick={toggleFullscreen}
                    className="px-3 py-2 rounded-lg bg-surface border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-all text-text-tertiary hover:text-text-secondary"
                >
                    {isFullscreen ? <CornersIn className="w-4 h-4" /> : <CornersOut className="w-4 h-4" />}
                </button>
            </div>

            {/* Linear-style Dot Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: mode === 'dark'
                        ? `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`
                        : `radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                    transform: `translate(${transform.x % 24}px, ${transform.y % 24}px)`,
                }}
            />

            {/* Content Container with Transform */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                    x: transform.x,
                    y: transform.y,
                    scale: transform.scale,
                    transformOrigin: '0 0'
                }}
            >
                {/* Edges Layer */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {edges.map((edge) => {
                        const source = nodes.find(n => n.id === edge.source);
                        const target = nodes.find(n => n.id === edge.target);
                        if (!source || !target) return null;
                        return (
                            <Edge
                                key={edge.id}
                                edge={edge}
                                sourceNode={source}
                                targetNode={target}
                            />
                        );
                    })}
                    {/* Temporary Connection Line - Linear style */}
                    {connectingNodeId && (() => {
                        const sourceNode = nodes.find(n => n.id === connectingNodeId);
                        if (!sourceNode) return null;
                        // Start from center of right connection dot
                        const startX = sourceNode.position.x + NODE_WIDTH;
                        const startY = sourceNode.position.y + NODE_HEIGHT / 2;

                        // Orthogonal Path to mouse
                        const mouseX = mousePos.x;
                        const mouseY = mousePos.y;

                        const dist = mouseX - startX;
                        const midX = startX + dist / 2;
                        const radius = 10;
                        const dirY = mouseY > startY ? 1 : -1;

                        let path = '';

                        // Fallback logic for tight spaces
                        if (Math.abs(mouseY - startY) < radius * 2 || Math.abs(midX - startX) < radius) {
                            const controlOffset = Math.max(Math.abs(mouseX - startX) * 0.5, 50);
                            path = `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${mouseX - controlOffset} ${mouseY}, ${mouseX} ${mouseY}`;
                        } else {
                            path = `
                                M ${startX} ${startY} 
                                L ${midX - radius} ${startY} 
                                Q ${midX} ${startY} ${midX} ${startY + radius * dirY} 
                                L ${midX} ${mouseY - radius * dirY} 
                                Q ${midX} ${mouseY} ${midX + radius} ${mouseY} 
                                L ${mouseX} ${mouseY}
                            `;
                        }

                        // Theme-aware stroke color
                        const tempStrokeColor = mode === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)';

                        return (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                <defs>
                                    <filter id="tempGlow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                {/* Main dashed line */}
                                <path
                                    d={path}
                                    stroke={tempStrokeColor}
                                    strokeWidth="1.5"
                                    strokeDasharray="6,4"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                {/* Neon endpoint indicator */}
                                <circle
                                    cx={mousePos.x}
                                    cy={mousePos.y}
                                    r="5"
                                    fill="#10B981"
                                    filter="url(#tempGlow)"
                                />
                            </svg>
                        );
                    })()}
                </div>

                {/* Nodes Layer */}
                <div className="absolute inset-0 w-full h-full z-10">
                    {nodes.map((node) => (
                        <Node
                            key={node.id}
                            node={node}
                            isSelected={selectedNodeId === node.id}
                            isConnecting={!!connectingNodeId}
                            onClick={() => setSelectedNodeId(node.id)}
                            onDragEnd={(id, x, y) => {
                                updateNodePosition(id, { x, y });
                            }}
                            onDelete={removeNode}
                            onConnectStart={() => startConnection(node.id)}
                            onConnectEnd={() => completeConnection(node.id)}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Empty State - Linear style */}
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="w-14 h-14 bg-surface border border-[var(--card-border)] rounded-xl flex items-center justify-center mx-auto mb-4">
                            <div
                                className="w-6 h-6 rounded-lg bg-emerald-500"
                                style={{ boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)' }}
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">Start Your Workflow</h3>
                        <p className="text-[13px] text-text-tertiary max-w-[280px] mx-auto leading-relaxed">
                            Describe what you want to automate in the chat, or drag nodes from the sidebar.
                        </p>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
