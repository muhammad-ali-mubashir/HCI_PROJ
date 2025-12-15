import { motion } from 'framer-motion';
import { Plugs, Envelope, Code, Clock, Plus, X } from '@phosphor-icons/react';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useWorkflowStore } from '../../store/useWorkflowStore';

const nodeTypes = [
    { type: 'trigger', label: 'Trigger', icon: Plugs, color: 'from-pink-500 to-rose-500' },
    { type: 'webhook', label: 'Webhook', icon: Plugs, color: 'from-orange-500 to-red-500' },
    { type: 'schedule', label: 'Schedule', icon: Clock, color: 'from-green-500 to-emerald-500' },
    { type: 'action', label: 'Action', icon: Envelope, color: 'from-blue-500 to-cyan-500' },
    { type: 'function', label: 'Function', icon: Code, color: 'from-purple-500 to-indigo-500' },
];

export const NodePalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { addNode } = useWorkflowStore();
    // const { mode } = useThemeStore();

    const handleAddNode = (type: string, label: string) => {
        const newNode = {
            id: `node-${Date.now()}`,
            type: type as 'trigger' | 'action' | 'function' | 'webhook' | 'schedule',
            label,
            position: { x: 400, y: 300 } // Center of canvas
        };
        addNode(newNode);
        setIsOpen(false);
    };

    return (
        <div className="absolute bottom-6 left-6 z-50">
            {!isOpen ? (
                <Button
                    variant="gradient"
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 rounded-full p-0 shadow-lg"
                >
                    <Plus className="w-6 h-6" />
                </Button>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface/95 backdrop-blur-xl rounded-2xl border border-[var(--card-border)] p-4 shadow-2xl min-w-[280px]"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-text-primary">Add Node</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-surface-hover rounded transition-colors text-text-secondary hover:text-text-primary"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {nodeTypes.map((nodeType) => (
                            <motion.button
                                key={nodeType.type}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleAddNode(nodeType.type, nodeType.label)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors text-left group border border-transparent hover:border-[var(--color-border)]"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${nodeType.color} flex items-center justify-center shadow-md`}>
                                    <nodeType.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-text-primary">{nodeType.label}</p>
                                    <p className="text-xs text-text-secondary capitalize">{nodeType.type}</p>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};
