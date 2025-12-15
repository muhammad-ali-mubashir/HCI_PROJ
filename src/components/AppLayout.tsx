import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { useLocation } from 'react-router-dom';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    // Only show Right Sidebar on specific pages? Or always? 
    // The user requirement implies it's a general structural change, 
    // but "Toolbar" (nodes) makes most sense in Workspace.
    // However, "Copilot" might be useful everywhere.
    // Let's keep it visible for now as requested by user "the right sidebar should have three different tabs".

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            <LeftSidebar />

            <main className="flex-1 h-full overflow-hidden relative flex flex-col">
                {/* 
                   We remove the 'pt-16' top padding as there is no top navbar anymore.
                   The main content area takes the remaining space.
                */}
                <div className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
                    {children}
                </div>
            </main>

            <RightSidebar />
        </div>
    );
};
