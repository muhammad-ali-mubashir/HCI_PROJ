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
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import type { NodeType } from '../../lib/types';

interface NodeItem {
    type: NodeType;
    label: string;
    description: string;
    icon: Icon;
    color: string;
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

const nodeCategories: NodeCategory[] = [
    {
        name: 'Triggers',
        icon: Lightning,
        nodes: [
            { type: 'trigger', label: 'Manual Trigger', description: 'Start workflow manually', icon: Lightning, color: 'bg-pink-500' },
            { type: 'webhook', label: 'Webhook', description: 'HTTP webhook trigger', icon: Plugs, color: 'bg-orange-500' },
            { type: 'schedule', label: 'Schedule', description: 'Time-based trigger', icon: Clock, color: 'bg-green-500' },
        ]
    },
    {
        name: 'Actions',
        icon: Envelope,
        nodes: [
            { type: 'action', label: 'Send Email', description: 'Send an email message', icon: Envelope, color: 'bg-blue-500' },
            { type: 'action', label: 'HTTP Request', description: 'Make API calls', icon: Globe, color: 'bg-cyan-500' },
            { type: 'action', label: 'Send Notification', description: 'Push notification', icon: Bell, color: 'bg-yellow-500' },
        ]
    },
    {
        name: 'Logic',
        icon: ArrowsClockwise,
        nodes: [
            { type: 'function', label: 'Code', description: 'Custom JavaScript', icon: Code, color: 'bg-purple-500' },
            { type: 'function', label: 'Transform', description: 'Transform data', icon: ArrowsClockwise, color: 'bg-indigo-500' },
        ]
    },
    {
        name: 'Data',
        icon: Database,
        nodes: [
            { type: 'action', label: 'Database', description: 'Query database', icon: Database, color: 'bg-emerald-500' },
            { type: 'action', label: 'Chat/AI', description: 'AI processing', icon: ChatCircle, color: 'bg-violet-500' },
        ]
    },
];

export const NodeLibrarySidebar = ({ selectedNodeId, onNodeSelect }: NodeLibrarySidebarProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['Triggers', 'Actions']);
    const { nodes, addNode, removeNode, updateNode } = useWorkflowStore();
    
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
        // Use requestAnimationFrame to move impure calls outside of React's render phase
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
            {/* Search */}
            <div className="p-3 border-b border-white/5">
                <div className="relative">
                    <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <Input
                        placeholder="Search nodes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9 text-sm bg-surface/50"
                    />
                </div>
            </div>

            {/* Node Categories */}
            <div className="flex-1 overflow-y-auto">
                {filteredCategories.map((category) => (
                    <div key={category.name} className="border-b border-white/5">
                        {/* Category Header */}
                        <button
                            onClick={() => toggleCategory(category.name)}
                            className="w-full px-3 py-2.5 flex items-center gap-2 hover:bg-white/5 transition-colors text-left"
                        >
                            <category.icon className="w-4 h-4 text-text-secondary" />
                            <span className="flex-1 text-sm font-medium text-text-primary">{category.name}</span>
                            {expandedCategories.includes(category.name) ? (
                                <CaretDown className="w-4 h-4 text-text-tertiary" />
                            ) : (
                                <CaretRight className="w-4 h-4 text-text-tertiary" />
                            )}
                        </button>

                        {/* Category Nodes */}
                        <AnimatePresence>
                            {expandedCategories.includes(category.name) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-2 pb-2 space-y-1">
                                        {category.nodes.map((node, index) => (
                                            <motion.div
                                                key={`${node.type}-${node.label}-${index}`}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, node.type, node.label)}
                                                onClick={() => handleAddNode(node.type, node.label)}
                                                whileHover={{ scale: 1.02, x: 4 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex items-center gap-3 p-2.5 rounded-lg bg-surface/50 hover:bg-surface-hover border border-transparent hover:border-white/10 cursor-grab active:cursor-grabbing transition-colors group"
                                            >
                                                <div className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <DotsSixVertical className="w-3 h-3" />
                                                </div>
                                                <div className={`w-8 h-8 rounded-lg ${node.color} flex items-center justify-center shrink-0`}>
                                                    <node.icon className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-text-primary truncate">{node.label}</p>
                                                    <p className="text-xs text-text-tertiary truncate">{node.description}</p>
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

            {/* Node Inspector */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/10 bg-surface/50"
                    >
                        <div className="p-3 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sliders className="w-4 h-4 text-text-secondary" />
                                <span className="text-sm font-semibold text-text-primary">Node Inspector</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onNodeSelect(null)}
                                className="h-6 w-6"
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </div>
                        <div className="p-3 space-y-3">
                            {/* Node Type Badge */}
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize
                                    ${selectedNode.type === 'trigger' ? 'bg-pink-500/20 text-pink-400' :
                                      selectedNode.type === 'action' ? 'bg-blue-500/20 text-blue-400' :
                                      selectedNode.type === 'function' ? 'bg-purple-500/20 text-purple-400' :
                                      'bg-gray-500/20 text-gray-400'
                                    }`}>
                                    {selectedNode.type}
                                </span>
                            </div>

                            {/* Node Label */}
                            <div className="space-y-1">
                                <label className="text-xs text-text-tertiary">Label</label>
                                <Input
                                    value={selectedNode.label}
                                    onChange={(e) => updateNode(selectedNode.id, { label: e.target.value })}
                                    className="h-8 text-sm bg-surface/50"
                                />
                            </div>

                            {/* Node ID (readonly) */}
                            <div className="space-y-1">
                                <label className="text-xs text-text-tertiary">ID</label>
                                <p className="text-xs text-text-secondary font-mono bg-surface/30 px-2 py-1.5 rounded truncate">
                                    {selectedNode.id}
                                </p>
                            </div>

                            {/* Position */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <label className="text-xs text-text-tertiary">X Position</label>
                                    <p className="text-xs text-text-secondary font-mono bg-surface/30 px-2 py-1.5 rounded">
                                        {Math.round(selectedNode.position.x)}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-text-tertiary">Y Position</label>
                                    <p className="text-xs text-text-secondary font-mono bg-surface/30 px-2 py-1.5 rounded">
                                        {Math.round(selectedNode.position.y)}
                                    </p>
                                </div>
                            </div>

                            {/* Delete Button */}
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    removeNode(selectedNode.id);
                                    onNodeSelect(null);
                                }}
                                className="w-full h-8 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-2"
                            >
                                <Trash className="w-4 h-4 mr-2" />
                                Delete Node
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
