import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Folder, FileCode, Trash, CaretRight, ArrowLeft } from '@phosphor-icons/react';
import { useProjectStore } from '../store/useProjectStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useWorkflowStore } from '../store/useWorkflowStore';

export const ProjectsPage = () => {
    const navigate = useNavigate();
    const { 
        projects, 
        workflows, 
        createProject, 
        deleteProject, 
        createWorkflow, 
        deleteWorkflow,
        activeProjectId,
        setActiveProject,
        setActiveWorkflow
    } = useProjectStore();
    
    const { setWorkflow } = useWorkflowStore();

    const [isCreatingProject, setIsCreatingProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false);
    const [newWorkflowName, setNewWorkflowName] = useState('');

    const handleCreateProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (newProjectName.trim()) {
            createProject(newProjectName.trim());
            setNewProjectName('');
            setIsCreatingProject(false);
        }
    };

    const handleCreateWorkflow = (e: React.FormEvent) => {
        e.preventDefault();
        if (newWorkflowName.trim() && activeProjectId) {
            createWorkflow(activeProjectId, newWorkflowName.trim());
            setNewWorkflowName('');
            setIsCreatingWorkflow(false);
        }
    };

    const handleOpenWorkflow = (workflowId: string) => {
        const workflow = workflows[workflowId];
        if (workflow) {
            setActiveWorkflow(workflowId);
            setWorkflow(workflow);
            navigate('/workspace');
        }
    };

    const activeProject = activeProjectId ? projects.find(p => p.id === activeProjectId) : null;

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background p-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        {activeProject && (
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setActiveProject(null)}
                                className="mr-2"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-text-primary mb-2">
                                {activeProject ? activeProject.name : 'Projects'}
                            </h1>
                            <p className="text-text-secondary">
                                {activeProject 
                                    ? 'Manage your workflows' 
                                    : 'Organize your automation work'}
                            </p>
                        </div>
                    </div>

                    {!activeProject ? (
                        <Button onClick={() => setIsCreatingProject(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            New Project
                        </Button>
                    ) : (
                        <Button onClick={() => setIsCreatingWorkflow(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            New Workflow
                        </Button>
                    )}
                </motion.div>

                {/* Create Project Modal/Form */}
                <AnimatePresence>
                    {isCreatingProject && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-8 overflow-hidden"
                        >
                            <Card className="p-6 max-w-md">
                                <form onSubmit={handleCreateProject} className="flex gap-4">
                                    <Input
                                        placeholder="Project Name"
                                        value={newProjectName}
                                        onChange={(e) => setNewProjectName(e.target.value)}
                                        autoFocus
                                    />
                                    <Button type="submit">Create</Button>
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        onClick={() => setIsCreatingProject(false)}
                                    >
                                        Cancel
                                    </Button>
                                </form>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Create Workflow Modal/Form */}
                <AnimatePresence>
                    {isCreatingWorkflow && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-8 overflow-hidden"
                        >
                            <Card className="p-6 max-w-md">
                                <form onSubmit={handleCreateWorkflow} className="flex gap-4">
                                    <Input
                                        placeholder="Workflow Name"
                                        value={newWorkflowName}
                                        onChange={(e) => setNewWorkflowName(e.target.value)}
                                        autoFocus
                                    />
                                    <Button type="submit">Create</Button>
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        onClick={() => setIsCreatingWorkflow(false)}
                                    >
                                        Cancel
                                    </Button>
                                </form>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Projects List */}
                {!activeProject && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setActiveProject(project.id)}
                            >
                                <Card className="p-6 cursor-pointer hover:border-primary/50 transition-colors group h-full flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                            <Folder className="w-6 h-6" />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error hover:bg-error/10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (confirm('Are you sure you want to delete this project?')) {
                                                    deleteProject(project.id);
                                                }
                                            }}
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                                        {project.name}
                                    </h3>
                                    <p className="text-text-secondary text-sm mb-4 flex-1">
                                        {project.description || 'No description'}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-text-tertiary mt-auto pt-4 border-t border-white/5">
                                        <span>{project.workflows.length} Workflows</span>
                                        <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                        {projects.length === 0 && (
                            <div className="col-span-full text-center py-20 text-text-secondary">
                                <Folder className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p>No projects yet. Create one to get started.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Workflows List */}
                {activeProject && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeProject.workflows.map((workflowId) => {
                            const workflow = workflows[workflowId];
                            if (!workflow) return null;
                            return (
                                <motion.div
                                    key={workflow.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => handleOpenWorkflow(workflow.id)}
                                >
                                    <Card className="p-6 cursor-pointer hover:border-primary/50 transition-colors group h-full flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary/20 transition-colors">
                                                <FileCode className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error hover:bg-error/10"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (confirm('Are you sure you want to delete this workflow?')) {
                                                        deleteWorkflow(workflow.id);
                                                    }
                                                }}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                                            {workflow.name}
                                        </h3>
                                        <p className="text-text-secondary text-sm mb-4 flex-1">
                                            {workflow.description || 'No description'}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-text-tertiary mt-auto pt-4 border-t border-white/5">
                                            <span>{workflow.nodes.length} Nodes</span>
                                            <div className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform">
                                                Open <CaretRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                        {activeProject.workflows.length === 0 && (
                            <div className="col-span-full text-center py-20 text-text-secondary">
                                <FileCode className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p>No workflows in this project yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
