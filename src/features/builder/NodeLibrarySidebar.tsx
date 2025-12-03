import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Icon } from '@phosphor-icons/react';
import { 
    Plugs, 
    Envelope, 
    Code, 
    Clock, 
    MagnifyingGlass,
    Lightning,
    Database,
    Globe,
    ChatCircle,
    Bell,
    ArrowsClockwise,
    CaretDown,
    CaretRight,
    DotsSixVertical,
    Sliders,
    X,
    Trash
} from '@phosphor-icons/react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { useThemeStore } from '../../store/useThemeStore';
import type { NodeType } from '../../lib/types';

interface NodeItem {
    type: NodeType;
    label: string;
    description: string;
    icon: Icon;
    color: string;
    glow: string;
}

interface NodeCategory {
    name: string;
    icon: Icon;
    nodes: NodeItem[];
}

interface NodeLibrarySidebarProps {
    selectedNodeId: string | null;
    onNodeSelect: (nodeId: string | null) => void;
}

// Linear-style neon colors with glows
const nodeCategories: NodeCategory[] = [
    {
        name: 'Triggers',
        icon: Lightning,
        nodes: [
            { type: 'trigger', label: 'Manual Trigger', description: 'Start workflow manually', icon: Lightning, color: 'bg-pink-500', glow: '0 0 12px rgba(236, 72, 153, 0.5)' },
            { type: 'webhook', label: 'Webhook', description: 'HTTP webhook trigger', icon: Plugs, color: 'bg-violet-500', glow: '0 0 12px rgba(139, 92, 246, 0.5)' },
            { type: 'schedule', label: 'Schedule', description: 'Time-based trigger', icon: Clock, color: 'bg-cyan-500', glow: '0 0 12px rgba(6, 182, 212, 0.5)' },
        ]
    },
    {
        name: 'Actions',
        icon: Envelope,
        nodes: [
            { type: 'action', label: 'Send Email', description: 'Send an email message', icon: Envelope, color: 'bg-emerald-500', glow: '0 0 12px rgba(16, 185, 129, 0.5)' },
            { type: 'action', label: 'HTTP Request', description: 'Make API calls', icon: Globe, color: 'bg-cyan-500', glow: '0 0 12px rgba(6, 182, 212, 0.5)' },
            { type: 'action', label: 'Send Notification', description: 'Push notification', icon: Bell, color: 'bg-amber-500', glow: '0 0 12px rgba(245, 158, 11, 0.5)' },
        ]
    },
    {
        name: 'Logic',
        icon: ArrowsClockwise,
        nodes: [
            { type: 'function', label: 'Code', description: 'Custom JavaScript', icon: Code, color: 'bg-violet-500', glow: '0 0 12px rgba(139, 92, 246, 0.5)' },
            { type: 'function', label: 'Transform', description: 'Transform data', icon: ArrowsClockwise, color: 'bg-indigo-500', glow: '0 0 12px rgba(99, 102, 241, 0.5)' },
        ]
    },
    {
        name: 'Data',
        icon: Database,
        nodes: [
            { type: 'action', label: 'Database', description: 'Query database', icon: Database, color: 'bg-emerald-500', glow: '0 0 12px rgba(16, 185, 129, 0.5)' },
            { type: 'action', label: 'Chat/AI', description: 'AI processing', icon: ChatCircle, color: 'bg-violet-500', glow: '0 0 12px rgba(139, 92, 246, 0.5)' },
        ]
    },
];

export const NodeLibrarySidebar = ({ selectedNodeId, onNodeSelect }: NodeLibrarySidebarProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['Triggers', 'Actions']);
    const { nodes, addNode, removeNode, updateNode } = useWorkflowStore();
    const { mode } = useThemeStore();
    
    const selectedNode = selectedNodeId ? nodes.find(n => n.id === selectedNodeId) : null;

    const toggleCategory = (categoryName: string) => {
        setExpandedCategories(prev => 
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    const handleDragStart = (e: React.DragEvent, nodeType: NodeType, label: string) => {
        e.dataTransfer.setData('nodeType', nodeType);
        e.dataTransfer.setData('nodeLabel', label);
        e.dataTransfer.effectAllowed = 'copy';
    };

    const handleAddNode = (type: NodeType, label: string) => {
        requestAnimationFrame(() => {
            const newNode = {
                id: `node-${Date.now()}`,
                type,
                label,
                position: { x: 400 + Math.random() * 100, y: 300 + Math.random() * 100 }
            };
            addNode(newNode);
        });
    };

    const filteredCategories = nodeCategories.map(category => ({
        ...category,
        nodes: category.nodes.filter(node => 
            node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            node.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.nodes.length > 0);

    return (
        <div className="flex flex-col h-full">
            {/* Search - Theme aware */}
            <div className={`p-3 border-b transition-colors ${mode === 'dark' ? 'border-white/8' : 'border-black/8'}`}>
                <div className="relative">
                    <MagnifyingGlass className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${mode === 'dark' ? 'text-white/30' : 'text-black/30'}`} />
                    <input
                        type="text"
                        placeholder="Search nodes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-9 pr-3 h-9 text-sm border rounded-lg focus:outline-none transition-colors ${
                            mode === 'dark' 
                                ? 'bg-[#0F0F12] border-white/8 text-white/90 placeholder:text-white/25 focus:border-white/20' 
                                : 'bg-white border-black/10 text-black/90 placeholder:text-black/30 focus:border-black/20'
                        }`}
                    />
                </div>
            </div>

            {/* Node Categories */}
            <div className="flex-1 overflow-y-auto">
                {filteredCategories.map((category) => (
                    <div key={category.name} className={`border-b transition-colors ${mode === 'dark' ? 'border-white/6' : 'border-black/6'}`}>
                        {/* Category Header - Theme aware */}
                        <button
                            onClick={() => toggleCategory(category.name)}
                            className={`w-full px-3 py-2.5 flex items-center gap-2 transition-colors text-left ${
                                mode === 'dark' ? 'hover:bg-white/3' : 'hover:bg-black/3'
                            }`}
                        >
                            <category.icon className={`w-4 h-4 ${mode === 'dark' ? 'text-white/40' : 'text-black/40'}`} />
                            <span className={`flex-1 text-[13px] font-medium ${mode === 'dark' ? 'text-white/80' : 'text-black/80'}`}>{category.name}</span>
                            {expandedCategories.includes(category.name) ? (
                                <CaretDown className={`w-4 h-4 ${mode === 'dark' ? 'text-white/30' : 'text-black/30'}`} />
                            ) : (
                                <CaretRight className={`w-4 h-4 ${mode === 'dark' ? 'text-white/30' : 'text-black/30'}`} />
                            )}
                        </button>

                        {/* Category Nodes */}
                        <AnimatePresence>
                            {expandedCategories.includes(category.name) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-2 pb-2 space-y-1">
                                        {category.nodes.map((node, index) => (
                                            <motion.div
                                                key={`${node.type}-${node.label}-${index}`}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, node.type, node.label)}
                                                onClick={() => handleAddNode(node.type, node.label)}
                                                whileHover={{ x: 2 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-grab active:cursor-grabbing transition-all group ${
                                                    mode === 'dark' 
                                                        ? 'bg-[#16161A] border-white/6 hover:border-white/12' 
                                                        : 'bg-white border-black/6 hover:border-black/12 shadow-sm'
                                                }`}
                                            >
                                                <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${mode === 'dark' ? 'text-white/20' : 'text-black/20'}`}>
                                                    <DotsSixVertical className="w-3 h-3" />
                                                </div>
                                                <div 
                                                    className={`w-8 h-8 rounded-lg ${node.color} flex items-center justify-center shrink-0`}
                                                    style={{ boxShadow: mode === 'dark' ? node.glow : 'none' }}
                                                >
                                                    <node.icon className="w-4 h-4 text-white" weight="bold" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-[13px] font-medium truncate ${mode === 'dark' ? 'text-white/90' : 'text-black/90'}`}>{node.label}</p>
                                                    <p className={`text-[11px] truncate ${mode === 'dark' ? 'text-white/35' : 'text-black/40'}`}>{node.description}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Node Inspector - Theme aware */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`border-t transition-colors ${
                            mode === 'dark' ? 'border-white/8 bg-[#16161A]' : 'border-black/8 bg-white'
                        }`}
                    >
                        <div className={`p-3 border-b flex items-center justify-between ${
                            mode === 'dark' ? 'border-white/6' : 'border-black/6'
                        }`}>
                            <div className="flex items-center gap-2">
                                <Sliders className={`w-4 h-4 ${mode === 'dark' ? 'text-white/40' : 'text-black/40'}`} />
                                <span className={`text-[13px] font-semibold ${mode === 'dark' ? 'text-white/90' : 'text-black/90'}`}>Inspector</span>
                            </div>
                            <button
                                onClick={() => onNodeSelect(null)}
                                className={`h-6 w-6 flex items-center justify-center rounded transition-colors ${
                                    mode === 'dark' ? 'hover:bg-white/6' : 'hover:bg-black/6'
                                }`}
                            >
                                <X className={`w-3.5 h-3.5 ${mode === 'dark' ? 'text-white/40' : 'text-black/40'}`} />
                            </button>
                        </div>
                        <div className="p-3 space-y-3">
                            {/* Node Type Badge - neon style */}
                            <div className="flex items-center gap-2">
                                <span 
                                    className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border
                                        ${selectedNode.type === 'trigger' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                                          selectedNode.type === 'action' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                          selectedNode.type === 'function' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
                                          selectedNode.type === 'webhook' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
                                          selectedNode.type === 'schedule' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                          mode === 'dark' ? 'bg-white/5 text-white/50 border-white/10' : 'bg-black/5 text-black/50 border-black/10'
                                        }`}
                                >
                                    {selectedNode.type}
                                </span>
                            </div>

                            {/* Node Label */}
                            <div className="space-y-1.5">
                                <label className={`text-[11px] uppercase tracking-wider ${mode === 'dark' ? 'text-white/35' : 'text-black/40'}`}>Label</label>
                                <input
                                    type="text"
                                    value={selectedNode.label}
                                    onChange={(e) => updateNode(selectedNode.id, { label: e.target.value })}
                                    className={`w-full h-8 px-2.5 text-sm border rounded-lg focus:outline-none transition-colors ${
                                        mode === 'dark' 
                                            ? 'bg-[#0F0F12] border-white/8 text-white/90 focus:border-white/20' 
                                            : 'bg-gray-50 border-black/10 text-black/90 focus:border-black/20'
                                    }`}
                                />
                            </div>

                            {/* Node ID (readonly) */}
                            <div className="space-y-1.5">
                                <label className={`text-[11px] uppercase tracking-wider ${mode === 'dark' ? 'text-white/35' : 'text-black/40'}`}>ID</label>
                                <p className={`text-[11px] font-mono px-2.5 py-2 rounded-lg truncate ${
                                    mode === 'dark' 
                                        ? 'text-white/40 bg-[#0F0F12] border border-white/6' 
                                        : 'text-black/40 bg-gray-50 border border-black/6'
                                }`}>
                                    {selectedNode.id}
                                </p>
                            </div>

                            {/* Position */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1.5">
                                    <label className={`text-[11px] uppercase tracking-wider ${mode === 'dark' ? 'text-white/35' : 'text-black/40'}`}>X</label>
                                    <p className={`text-[11px] font-mono px-2.5 py-2 rounded-lg ${
                                        mode === 'dark' 
                                            ? 'text-white/50 bg-[#0F0F12] border border-white/6' 
                                            : 'text-black/50 bg-gray-50 border border-black/6'
                                    }`}>
                                        {Math.round(selectedNode.position.x)}
                                    </p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className={`text-[11px] uppercase tracking-wider ${mode === 'dark' ? 'text-white/35' : 'text-black/40'}`}>Y</label>
                                    <p className={`text-[11px] font-mono px-2.5 py-2 rounded-lg ${
                                        mode === 'dark' 
                                            ? 'text-white/50 bg-[#0F0F12] border border-white/6' 
                                            : 'text-black/50 bg-gray-50 border border-black/6'
                                    }`}>
                                        {Math.round(selectedNode.position.y)}
                                    </p>
                                </div>
                            </div>

                            {/* Delete Button - Theme aware */}
                            <button
                                onClick={() => {
                                    removeNode(selectedNode.id);
                                    onNodeSelect(null);
                                }}
                                className="w-full h-8 text-[12px] font-medium text-red-400 bg-red-500/5 border border-red-500/15 rounded-lg hover:bg-red-500/10 hover:border-red-500/25 transition-all flex items-center justify-center gap-2 mt-2"
                            >
                                <Trash className="w-3.5 h-3.5" />
                                Delete Node
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
