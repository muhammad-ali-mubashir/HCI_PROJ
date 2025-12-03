import { motion } from 'framer-motion';
import type { NodeType } from '../../lib/types';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Plugs, Envelope, Clock, Code, Lightning } from '@phosphor-icons/react';
import { useWorkflowStore } from '../../store/useWorkflowStore';

interface NodeTypeItem {
    type: NodeType;
    label: string;
    icon: PhosphorIcon;
}

const nodeTypes: NodeTypeItem[] = [
    { type: 'trigger', label: 'Webhook', icon: Plugs },
    { type: 'schedule', label: 'Schedule', icon: Clock },
    { type: 'action', label: 'Send Email', icon: Envelope },
    { type: 'function', label: 'Code', icon: Code },
];

export const NodeLibrary = () => {
    const { addNode } = useWorkflowStore();

    const handleAddNode = (type: NodeType) => {
        addNode({
            id: Date.now().toString(),
            type,
            label: type.charAt(0).toUpperCase() + type.slice(1),
            position: { x: 400, y: 300 }, // Default center position
        });
    };

    return (
        <div className="w-64 bg-white/5 border-r border-white/10 p-4 backdrop-blur-sm h-full">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Lightning className="w-5 h-5 text-yellow-400" />
                Library
            </h2>

            <div className="space-y-3">
                {nodeTypes.map((item, index) => (
                    <motion.button
                        key={`${item.type}-${index}`}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddNode(item.type)}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-left group"
                    >
                        <div className="p-2 rounded-lg bg-linear-to-br from-gray-700 to-gray-800 group-hover:from-blue-600 group-hover:to-purple-600 transition-colors">
                            <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-200 font-medium">{item.label}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
