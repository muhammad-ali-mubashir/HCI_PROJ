import React, { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { useLocation } from 'react-router-dom';

import { SidebarSimple } from '@phosphor-icons/react';
import { cn } from '../lib/utils';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    // Sidebar Visibility Logic
    const shouldHideRightSidebar = location.pathname.startsWith('/dashboard') ||
        location.pathname.startsWith('/settings') ||
        location.pathname.startsWith('/account-settings') ||
        location.pathname.startsWith('/docs') ||
        location.pathname.startsWith('/projects');

    const shouldHideLeftSidebar = location.pathname.startsWith('/docs');

    // Sidebar State
    const [leftWidth, setLeftWidth] = useState(288); // Default 72 * 4 = 288px
    const [rightWidth, setRightWidth] = useState(320); // Default 80 * 4 = 320px
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
    const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
    
    const collapsedLeftWidth = 60; // Width when collapsed to show only icons

    // Effect to handle route-based visibility overrides
    React.useEffect(() => {
        if (shouldHideRightSidebar) {
            setIsRightSidebarOpen(false);
        } else {
            setIsRightSidebarOpen(true);
        }
    }, [shouldHideRightSidebar]);

    // Resizing Logic
    const startResizing = React.useCallback((side: 'left' | 'right') => {
        const handleMouseMove = (e: MouseEvent) => {
            if (side === 'left') {
                const newWidth = Math.max(200, Math.min(600, e.clientX));
                setLeftWidth(newWidth);
            } else {
                const newWidth = Math.max(250, Math.min(600, window.innerWidth - e.clientX));
                setRightWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto'; // Re-enable selection
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none'; // Prevent text selection while resizing
    }, []);


    return (
        <div className="flex h-screen w-full bg-background overflow-hidden relative">

            {/* LEFT SIDEBAR AREA */}
            {!shouldHideLeftSidebar && (
                <>
                    {/* Left Resizer Handle - only show when not collapsed */}
                    {!isLeftSidebarCollapsed && (
                        <div
                            className="w-1 hover:w-1.5 bg-transparent hover:bg-primary/20 cursor-col-resize absolute z-50 h-full transition-colors"
                            style={{ left: (isLeftSidebarCollapsed ? collapsedLeftWidth : leftWidth) - 2 }} // Overlap slightly
                            onMouseDown={() => startResizing('left')}
                        />
                    )}
                    <div 
                        style={{ 
                            width: isLeftSidebarCollapsed ? collapsedLeftWidth : leftWidth, 
                            minWidth: isLeftSidebarCollapsed ? collapsedLeftWidth : leftWidth, 
                            maxWidth: isLeftSidebarCollapsed ? collapsedLeftWidth : leftWidth,
                            left: 0
                        }} 
                        className={cn(
                            "h-full absolute z-40",
                            isLeftSidebarCollapsed && "transition-all duration-300"
                        )}
                    >
                        <LeftSidebar 
                            isCollapsed={isLeftSidebarCollapsed} 
                            onToggleCollapse={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)} 
                        />
                    </div>
                </>
            )}

            {/* MAIN CONTENT */}
            <main className="flex-1 h-full overflow-hidden relative flex flex-col min-w-0">
                <div className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
                    {children}
                </div>
            </main>

            {/* RIGHT SIDEBAR AREA */}
            {!shouldHideRightSidebar && isRightSidebarOpen && (
                <>
                    {/* Right Resizer Handle */}
                    <div
                        className="w-1 hover:w-1.5 bg-transparent hover:bg-primary/20 cursor-col-resize absolute z-50 h-full transition-colors"
                        style={{ right: rightWidth - 2 }} // Overlap slightly
                        onMouseDown={() => startResizing('right')}
                    />
                    <div style={{ width: rightWidth, minWidth: rightWidth, maxWidth: rightWidth }} className="h-full relative shrink-0">
                        <RightSidebar onClose={() => setIsRightSidebarOpen(false)} />
                    </div>
                </>
            )}

            {/* Re-open toggle if closed manually but allowed by route */}
            {!shouldHideRightSidebar && !isRightSidebarOpen && (
                <button
                    onClick={() => setIsRightSidebarOpen(true)}
                    className="absolute top-14 right-4 z-50 p-2 bg-surface border border-border rounded-md shadow-md hover:bg-surface-hover text-text-secondary transition-all"
                    title="Open Sidebar"
                >
                    <SidebarSimple className="w-5 h-5 transform rotate-180" />
                </button>
            )}
        </div>
    );
};
