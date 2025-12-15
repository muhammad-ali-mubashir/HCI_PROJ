import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import { useProjectStore } from '../store/useProjectStore';
import {
    Moon, Sun, Gear, ChartBar, Folder, CompassTool, SignOut,
    CaretDown, Plus, BookOpen, Question, FileText, Share, MagnifyingGlass
} from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { Dropdown, DropdownItem } from './ui/Dropdown';
import { auth } from '../lib/auth';

export const LeftSidebar = () => {
    const { mode, toggleMode } = useThemeStore();
    const location = useLocation();
    const navigate = useNavigate();
    const user = auth.getUser();

    // Connect to Project Store
    const {
        projects,
        activeProjectId,
        setActiveProject,
        workflows,
        activeWorkflowId,
        setActiveWorkflow
    } = useProjectStore();

    // Derived State
    const currentProject = projects.find(p => p.id === activeProjectId);
    const projectWorkflows = currentProject?.workflows.map(wId => workflows[wId]).filter(Boolean) || [];

    const bottomNavItems = [
        { path: '/projects', icon: Folder, label: 'Projects' },
        { path: '/workspace', icon: CompassTool, label: 'Workspace' },
        { path: '/dashboard', icon: ChartBar, label: 'Dashboard' },
        { path: '/settings', icon: Gear, label: 'Settings' },
    ];

    return (
        <div className={cn(
            "w-72 border-r flex flex-col h-full bg-background transition-colors duration-200 font-sans",
            mode === 'dark' ? "border-white/5" : "border-black/5"
        )}>
            {/* Logo Area */}
            <div className="h-14 flex items-center px-4 mb-2">
                <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight group">
                    <img
                        src="/badge.svg"
                        alt="AutoM8 Logo"
                        className="w-7 h-7 rounded-lg transition-transform group-hover:scale-105"
                    />
                    <span className="text-text-primary">AutoM8</span>
                </Link>
            </div>

            {/* Top Section: Project Switcher */}
            <div className="px-3 pb-3 border-b border-transparent">
                <div className="flex items-center justify-between mb-2">
                    <Dropdown
                        align="left"
                        className="flex-1"
                        trigger={
                            <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-hover p-2 rounded-lg transition-colors group">
                                <span className="font-semibold text-sm text-text-primary truncate">
                                    {currentProject?.name || "Select Project"}
                                </span>
                                <CaretDown className="w-3 h-3 text-text-tertiary group-hover:text-text-secondary" />
                            </div>
                        }
                    >
                        {projects.length > 0 ? (
                            projects.map((proj) => (
                                <DropdownItem key={proj.id} onClick={() => setActiveProject(proj.id)}>
                                    {proj.name}
                                </DropdownItem>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-text-tertiary">No projects found</div>
                        )}
                    </Dropdown>

                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-text-secondary hover:text-text-primary">
                            <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-text-secondary hover:text-text-primary">
                            <div className="w-4 h-4 border border-current rounded-sm flex items-center justify-center text-[10px]">
                                <div className="w-[50%] h-full border-r border-current"></div>
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Search Bar Placeholder */}
                <div className="relative group">
                    <MagnifyingGlass className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary group-hover:text-text-secondary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search"
                        className={cn(
                            "w-full bg-surface hover:bg-surface-hover rounded-md py-1.5 pl-9 pr-8 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all border border-transparent",
                            mode === 'dark' ? "bg-white/5" : "bg-black/5"
                        )}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-text-tertiary font-mono">
                        <span className="bg-surface-active px-1 rounded">⌘K</span>
                    </div>
                </div>
            </div>

            {/* Workflows Section */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-4 py-2 flex items-center justify-between group">
                    <h3 className="text-xs font-medium text-text-tertiary hover:text-text-secondary cursor-pointer flex items-center gap-1">
                        Workflows
                        <CaretDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-surface-active">
                            <Folder className="w-3.5 h-3.5 text-text-secondary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-surface-active">
                            <Plus className="w-3.5 h-3.5 text-text-secondary" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
                    {projectWorkflows.length > 0 ? (
                        projectWorkflows.map((workflow) => (
                            <div
                                key={workflow.id}
                                onClick={() => {
                                    setActiveWorkflow(workflow.id);
                                    navigate('/workspace');
                                }}
                                className={cn(
                                    "flex items-center gap-2.5 px-3 py-1.5 rounded-md cursor-pointer text-sm group transition-colors",
                                    activeWorkflowId === workflow.id
                                        ? "bg-surface-active text-text-primary"
                                        : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                                )}
                            >
                                <div className={cn(
                                    "w-2 h-2 rounded-[2px]",
                                    activeWorkflowId === workflow.id ? "bg-blue-500" : "bg-text-tertiary group-hover:bg-text-secondary"
                                )} />
                                <span>{workflow.name}</span>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-xs text-text-tertiary italic">
                            No workflows
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-auto border-t border-transparent p-2 space-y-0.5">
                {bottomNavItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                            "flex items-center gap-3 px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                        )}
                    >
                        <item.icon className="w-4 h-4 text-text-tertiary group-hover:text-text-secondary" />
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};
