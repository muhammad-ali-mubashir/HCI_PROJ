import { ChatInterface } from '../features/chat/ChatInterface';
import { WorkflowCanvas } from '../features/workflow/WorkflowCanvas';
import { motion } from 'framer-motion';

export const ChatPage = () => {
    return (
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-[#FDFCFA] to-[#F5F1E8]">
            {/* Left Panel: Chat */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-1/3 min-w-[350px] max-w-[500px] h-full z-20 border-r border-[#E5E0D8]"
            >
                <ChatInterface />
            </motion.div>

            {/* Center Panel: Canvas */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 h-full relative z-10"
            >
                <WorkflowCanvas />
            </motion.div>
        </div>
    );
};
