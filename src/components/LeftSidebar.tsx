
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import { useProjectStore } from '../store/useProjectStore';
import {
    Moon, Sun, Gear, ChartBar, Folder, CompassTool, SignOut,
    CaretDown, Plus, BookOpen, Question, FileText, Share, MagnifyingGlass,
    DotsThree, Pencil, Trash, Book, ArrowSquareOut
} from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { Dropdown, DropdownItem } from './ui/Dropdown';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
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
        setActiveWorkflow,
        createWorkflow,
        updateWorkflow,
        deleteWorkflow
    } = useProjectStore();

    // Local State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newWorkflowName, setNewWorkflowName] = useState('');
    const [editingWorkflowId, setEditingWorkflowId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [deletingWorkflowId, setDeletingWorkflowId] = useState<string | null>(null);
    const [activeMenuWorkflowId, setActiveMenuWorkflowId] = useState<string | null>(null);

    // Derived State
    const currentProject = projects.find(p => p.id === activeProjectId);
    const projectWorkflows = currentProject?.workflows.map(wId => workflows[wId]).filter(Boolean) || [];

    const bottomNavItems = [
        { path: '/dashboard', icon: ChartBar, label: 'Dashboard' },
        { path: '/docs', icon: Book, label: 'Documentation' },
        { path: '/settings', icon: Gear, label: 'Settings' },
    ];

    const handleOpenCreateModal = () => {
        if (!activeProjectId) return;
        setNewWorkflowName('');
        setIsCreateModalOpen(true);
    };

    const handleConfirmCreate = () => {
        if (!activeProjectId || !newWorkflowName.trim()) return;
        const newWorkflowId = createWorkflow(activeProjectId, newWorkflowName.trim());
        setActiveWorkflow(newWorkflowId);
        setIsCreateModalOpen(false);
        navigate('/workspace');
    };

    const handleStartRename = (e: React.MouseEvent, workflow: any) => {
        e.stopPropagation();
        setEditingWorkflowId(workflow.id);
        setEditName(workflow.name);
    };

    const handleRenameSave = () => {
        if (editingWorkflowId && editName.trim()) {
            updateWorkflow(editingWorkflowId, { name: editName.trim() });
        }
        setEditingWorkflowId(null);
        setEditName('');
    };

    const handleRenameKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleRenameSave();
        if (e.key === 'Escape') {
            setEditingWorkflowId(null);
            setEditName('');
        }
    };

    const handleDeleteClick = (e: React.MouseEvent, workflowId: string) => {
        e.stopPropagation();
        setDeletingWorkflowId(workflowId);
    };

    const handleConfirmDelete = () => {
        if (deletingWorkflowId) {
            deleteWorkflow(deletingWorkflowId);
            setDeletingWorkflowId(null);
        }
    };

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
                        <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-surface-active" onClick={handleOpenCreateModal}>
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
                                    if (editingWorkflowId === workflow.id) return;
                                    setActiveWorkflow(workflow.id);
                                    navigate('/workspace');
                                }}
                                className={cn(
                                    "flex items-center gap-2.5 px-3 py-1.5 rounded-md cursor-pointer text-sm group transition-colors relative",
                                    activeWorkflowId === workflow.id && editingWorkflowId !== workflow.id
                                        ? "bg-surface-active text-text-primary"
                                        : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                                )}
                            >
                                {editingWorkflowId === workflow.id ? (
                                    <div className="flex-1 mr-2" onClick={(e) => e.stopPropagation()}>
                                        <Input
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            onBlur={handleRenameSave}
                                            onKeyDown={handleRenameKeyDown}
                                            autoFocus
                                            className="h-7 text-xs py-0 px-2 bg-background border-none ring-1 ring-primary/50 text-text-primary"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className={cn(
                                            "w-2 h-2 rounded-[2px]",
                                            activeWorkflowId === workflow.id ? "bg-blue-500" : "bg-text-tertiary group-hover:bg-text-secondary"
                                        )} />
                                        <span className="flex-1 truncate">{workflow.name}</span>

                                        <div
                                            className={cn(
                                                "transition-opacity",
                                                activeMenuWorkflowId === workflow.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                            )}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Dropdown
                                                align="left"
                                                open={activeMenuWorkflowId === workflow.id}
                                                onOpenChange={(isOpen) => setActiveMenuWorkflowId(isOpen ? workflow.id : null)}
                                                trigger={
                                                    <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-surface-active text-text-tertiary">
                                                        <DotsThree className="w-4 h-4" />
                                                    </Button>
                                                }
                                            >
                                                <DropdownItem onClick={(e) => handleStartRename(e, workflow)} icon={Pencil}>
                                                    Rename
                                                </DropdownItem>
                                                <DropdownItem onClick={(e) => handleDeleteClick(e, workflow.id)} icon={Trash} danger>
                                                    Delete
                                                </DropdownItem>
                                            </Dropdown>
                                        </div>
                                    </>
                                )}
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
                        target={item.path === '/docs' ? '_blank' : undefined}
                        rel={item.path === '/docs' ? 'noopener noreferrer' : undefined}
                        className={cn(
                            "flex items-center gap-3 px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                        )}
                    >
                        <item.icon className="w-4 h-4 text-text-tertiary group-hover:text-text-secondary" />
                        <span className="flex-1">{item.label}</span>
                        {item.path === '/docs' && (
                            <ArrowSquareOut className="w-3.5 h-3.5 text-text-tertiary" />
                        )}
                    </Link>
                ))}
            </div>

            {/* Create Workflow Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Workflow"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleConfirmCreate}>Create Workflow</Button>
                    </>
                }
            >
                <div className="py-2">
                    <Input
                        label="Workflow Name"
                        placeholder="e.g. Data Analysis Pipeline"
                        value={newWorkflowName}
                        onChange={(e) => setNewWorkflowName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleConfirmCreate();
                        }}
                        autoFocus
                    />
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deletingWorkflowId}
                onClose={() => setDeletingWorkflowId(null)}
                title="Delete Workflow"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setDeletingWorkflowId(null)}>Cancel</Button>
                        <Button
                            variant="primary"
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={handleConfirmDelete}
                        >
                            Delete
                        </Button>
                    </>
                }
            >
                <div className="py-2 text-sm text-text-secondary">
                    Are you sure you want to delete this workflow? This action cannot be undone.
                </div>
            </Modal>
        </div>
    );
};

