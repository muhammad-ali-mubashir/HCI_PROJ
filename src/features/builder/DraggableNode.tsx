import React from 'react';
import { motion } from 'framer-motion';
import { Node } from '../workflow/Node';
import type { Node as NodeType } from '../../lib/types';
import { useWorkflowStore } from '../../store/useWorkflowStore';

interface DraggableNodeProps {
    node: NodeType;
}

export const DraggableNode: React.FC<DraggableNodeProps> = ({ node }) => {
    const { updateNodePosition } = useWorkflowStore();

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
                updateNodePosition(node.id, {
                    x: node.position.x + info.offset.x,
                    y: node.position.y + info.offset.y
                });
            }}
            className="absolute"
            style={{ x: node.position.x, y: node.position.y }}
        >
            <Node node={node} />
        </motion.div>
    );
};
