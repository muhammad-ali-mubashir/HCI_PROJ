import React, { useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { cn } from '../lib/utils';
import { ChatCircle, Wrench, Faders } from '@phosphor-icons/react';
import { ChatInterface } from '../features/chat/ChatInterface';
import { NodeLibrarySidebar } from '../features/builder/NodeLibrarySidebar';
import { useWorkflowStore } from '../store/useWorkflowStore';

type Tab = 'copilot' | 'toolbar' | 'editor';

export const RightSidebar = () => {
    const { mode } = useThemeStore();
    const [activeTab, setActiveTab] = useState<Tab>('copilot');
    const { nodes } = useWorkflowStore(); // You might want this for editor logic

    // Dummy Editor Content for now
    const EditorContent = () => (
        <div className="p-4 text-sm text-text-secondary text-center mt-10">
            <Faders className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Select a node to configure properties.</p>
        </div>
    );

    return (
        <div className={cn(
            "w-96 border-l flex flex-col h-full bg-background transition-colors duration-200",
            mode === 'dark' ? "border-white/5" : "border-black/5"
        )}>
            {/* Tabs Header */}
            <div className={cn(
                "flex items-center p-1 m-2 rounded-lg bg-surface border",
                mode === 'dark' ? "border-white/5" : "border-black/5"
            )}>
                <TabButton
                    active={activeTab === 'copilot'}
                    onClick={() => setActiveTab('copilot')}
                    icon={ChatCircle}
                    label="Copilot"
                />
                <TabButton
                    active={activeTab === 'toolbar'}
                    onClick={() => setActiveTab('toolbar')}
                    icon={Wrench}
                    label="Toolbar"
                />
                <TabButton
                    active={activeTab === 'editor'}
                    onClick={() => setActiveTab('editor')}
                    icon={Faders}
                    label="Editor"
                />
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden relative">
                {activeTab === 'copilot' && (
                    <div className="h-full">
                        <ChatInterface />
                    </div>
                )}
                {activeTab === 'toolbar' && (
                    <div className="h-full overflow-y-auto">
                        <NodeLibrarySidebar />
                    </div>
                )}
                {activeTab === 'editor' && (
                    <div className="h-full overflow-y-auto">
                        <EditorContent />
                    </div>
                )}
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: React.ElementType<any>, label: string }) => {
    const { mode } = useThemeStore();
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200",
                active
                    ? "bg-background text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
            )}
        >
            <Icon className={cn("w-4 h-4", active && "text-primary")} />
            {label}
        </button>
    );
};
