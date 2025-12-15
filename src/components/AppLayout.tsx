import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { useLocation } from 'react-router-dom';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const hideRightSidebar = location.pathname.startsWith('/dashboard') ||
        location.pathname.startsWith('/settings') ||
        location.pathname.startsWith('/account-settings') ||
        location.pathname.startsWith('/docs') ||
        location.pathname.startsWith('/projects');

    const hideLeftSidebar = location.pathname.startsWith('/docs');

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            {!hideLeftSidebar && <LeftSidebar />}

            <main className="flex-1 h-full overflow-hidden relative flex flex-col">
                {/* 
                   We remove the 'pt-16' top padding as there is no top navbar anymore.
                   The main content area takes the remaining space.
                */}
                <div className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
                    {children}
                </div>
            </main>

            {!hideRightSidebar && <RightSidebar />}
        </div>
    );
};
