import React, { useRef, useState, useEffect } from 'react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { Node } from './Node';
import { Edge } from './Edge';
import { motion } from 'framer-motion';
import { Maximize, Minimize, Hand } from 'lucide-react';

export const WorkflowCanvas = () => {
    const { nodes, edges, updateNodePosition, removeNode, addEdge } = useWorkflowStore();
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
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
            className={`relative w-full h-full overflow-hidden bg-gray-50 dark:bg-[#0f111a] transition-colors duration-300 ${isFullscreen ? 'fixed inset-0 z-50' : ''
                } ${panMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* UI Controls */}
            <div className="absolute top-4 right-4 z-50 flex gap-2">
                {/* Pan Mode Indicator */}
                <div className={`px-3 py-2 rounded-lg backdrop-blur-md border transition-all duration-300 ${panMode
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                    : 'bg-white/10 dark:bg-white/5 border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-400'
                    }`}>
                    <div className="flex items-center gap-2">
                        <Hand className="w-4 h-4" />
                        <span className="text-xs font-medium">Pan Mode (H)</span>
                    </div>
                </div>

                {/* Fullscreen Toggle */}
                <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="px-3 py-2 rounded-lg backdrop-blur-md bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all text-gray-700 dark:text-gray-300"
                >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
            </div>

            {/* Infinite Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(100,100,100,0.5) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(100,100,100,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    transform: `translate(${transform.x % 40}px, ${transform.y % 40}px) scale(${transform.scale})`,
                    transformOrigin: '0 0'
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
                    {/* Temporary Connection Line */}
                    {connectingNodeId && (() => {
                        const sourceNode = nodes.find(n => n.id === connectingNodeId);
                        if (!sourceNode) return null;
                        // Start from right connection point: node width is 256px (w-64 = 16*4 = 64*4 = 256px)
                        const startX = sourceNode.position.x + 256;
                        const startY = sourceNode.position.y + 40; // Half of approximate node height
                        return (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                <defs>
                                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <path
                                    d={`M${startX} ${startY} L${mousePos.x} ${mousePos.y}`}
                                    stroke="url(#connectionGradient)"
                                    strokeWidth="3"
                                    strokeDasharray="8,4"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                {/* Endpoint indicator */}
                                <circle
                                    cx={mousePos.x}
                                    cy={mousePos.y}
                                    r="6"
                                    fill="#60a5fa"
                                    opacity="0.8"
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

            {/* Empty State */}
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 backdrop-blur-sm">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Start Your Workflow</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                            Describe what you want to automate in the chat, and watch the magic happen.
                        </p>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
