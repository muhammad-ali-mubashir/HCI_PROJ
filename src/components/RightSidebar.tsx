import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import { cn } from '../lib/utils';
import { ChatCircle, Wrench, Faders, Gear, SignOut } from '@phosphor-icons/react';
import { ChatInterface } from '../features/chat/ChatInterface';
import { NodeLibrarySidebar } from '../features/builder/NodeLibrarySidebar';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { Dropdown, DropdownItem } from './ui/Dropdown';
import { auth } from '../lib/auth';

import { X } from '@phosphor-icons/react';

type Tab = 'copilot' | 'toolbar' | 'editor';

interface RightSidebarProps {
    onClose?: () => void;
}

export const RightSidebar = ({ onClose }: RightSidebarProps) => {
    const { mode } = useThemeStore();
    const [activeTab, setActiveTab] = useState<Tab>('copilot');
    const { selectedNodeId, selectNode } = useWorkflowStore();
    const navigate = useNavigate();
    const user = auth.getUser();

    // Dummy Editor Content for now
    const EditorContent = () => (
        <div className="p-4 text-sm text-text-secondary text-center mt-10">
            <Faders className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Select a node to configure properties.</p>
        </div>
    );

    return (
        <div className={cn(
            "w-full border-l flex flex-col h-full bg-background transition-colors duration-200 relative",
            mode === 'dark' ? "border-white/5" : "border-black/5"
        )}>
            {/* Close Button - Absolute Top Right */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-hover z-50"
                    title="Close Sidebar"
                >
                    <X className="w-4 h-4" />
                </button>
            )}

            {/* User Profile Section */}
            <div className={cn(
                "p-2 border-b pr-10", // Added pr-10 to avoid overlap with Close button
                mode === 'dark' ? "border-white/5" : "border-black/5"
            )}>
                <Dropdown
                    align="left"
                    className="w-full"
                    trigger={
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer w-full">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium text-text-primary leading-none">{user?.name || 'User'}</span>
                                <span className="text-[10px] text-text-tertiary mt-1">Free Plan</span>
                            </div>
                        </div>
                    }
                >
                    <DropdownItem icon={Gear} onClick={() => navigate('/account-settings')}>
                        Account Settings
                    </DropdownItem>
                    <DropdownItem
                        icon={SignOut}
                        danger
                        onClick={() => {
                            auth.logout();
                            navigate('/login');
                        }}
                    >
                        Sign Out
                    </DropdownItem>
                </Dropdown>
            </div>

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
                        <NodeLibrarySidebar
                            selectedNodeId={selectedNodeId}
                            onNodeSelect={selectNode}
                        />
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

const TabButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => {
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
