import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { CaretRight, BookOpen, RocketLaunch, TreeStructure, MagicWand, Gear } from '@phosphor-icons/react';

const sections = [
    {
        id: 'introduction',
        title: 'Introduction',
        icon: BookOpen,
        content: (
            <>
                <h1 className="text-4xl font-bold text-text-primary mb-6">Introduction</h1>
                <p className="text-lg text-text-secondary mb-4 leading-relaxed">
                    Welcome to the <strong>Autom8</strong> documentation. Autom8 is a powerful workflow automation platform designed to help you build, visualize, and execute complex logic using a node-based interface.
                </p>
                <p className="text-lg text-text-secondary mb-4 leading-relaxed">
                    Whether you are automating data processing, integrating APIs, or building AI-powered agents, Autom8 provides the tools you need to bring your ideas to life efficiently.
                </p>
            </>
        )
    },
    {
        id: 'getting-started',
        title: 'Getting Started',
        icon: RocketLaunch,
        content: (
            <>
                <h2 className="text-3xl font-bold text-text-primary mb-6">Getting Started</h2>
                <p className="text-text-secondary mb-4 leading-relaxed">
                    To start using Autom8, you first need to create a project. Projects act as containers for your workflows.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-text-secondary ml-4">
                    <li>Navigate to the <strong>Dashboard</strong>.</li>
                    <li>Click on <strong>"New Project"</strong>.</li>
                    <li>Give your project a name and description.</li>
                    <li>Once created, you will be directed to the project workspace.</li>
                </ol>
            </>
        )
    },
    {
        id: 'workflows',
        title: 'Workflows',
        icon: TreeStructure,
        content: (
            <>
                <h2 className="text-3xl font-bold text-text-primary mb-6">Workflows</h2>
                <p className="text-text-secondary mb-4 leading-relaxed">
                    Workflows are the core of Autom8. They represent visual chains of logic.
                </p>
                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">Creating a Workflow</h3>
                <p className="text-text-secondary mb-4">
                    In the left sidebar of your project workspace, click the <strong>"+"</strong> button next to "Workflows". detailed prompt will appear asking for a name.
                </p>
                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">Managing Workflows</h3>
                <p className="text-text-secondary mb-4">
                    Hover over any workflow in the sidebar to reveal the "More Options" (three dots) button. From there, you can:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                    <li><strong>Rename:</strong> Change the workflow's name inline.</li>
                    <li><strong>Delete:</strong> Remove the workflow permanently (requires confirmation).</li>
                </ul>
            </>
        )
    },
    {
        id: 'copilot',
        title: 'Copilot',
        icon: MagicWand,
        content: (
            <>
                <h2 className="text-3xl font-bold text-text-primary mb-6">AI Copilot</h2>
                <p className="text-text-secondary mb-4 leading-relaxed">
                    Autom8 includes an intelligent AI Copilot to assist you in building workflows.
                </p>
                <p className="text-text-secondary mb-4">
                    Located in the right sidebar, the Copilot can answer questions about nodes, suggest logic improvements, or even help debug your workflow. Simply type your query in the chat interface.
                </p>
            </>
        )
    },
    {
        id: 'settings',
        title: 'Settings',
        icon: Gear,
        content: (
            <>
                <h2 className="text-3xl font-bold text-text-primary mb-6">Settings</h2>
                <p className="text-text-secondary mb-4 leading-relaxed">
                    Customize your experience in the Settings page.
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                    <li><strong>Appearance:</strong> Switch between Light, Dark, and High Contrast themes.</li>
                    <li><strong>Account:</strong> Manage your profile settings and secure your account.</li>
                </ul>
            </>
        )
    }
];

export const DocsPage = () => {
    const [activeSection, setActiveSection] = useState(sections[0].id);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
        }
    };

    return (
        <div className="flex h-full bg-background overflow-hidden">
            {/* Internal Sidebar for TOC */}
            <aside className="w-64 border-r border-border bg-background h-full overflow-y-auto hidden md:block">
                <div className="p-6">
                    <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-4">Contents</h3>
                    <nav className="space-y-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    activeSection === section.id
                                        ? "bg-primary/10 text-primary"
                                        : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                                )}
                            >
                                <section.icon className={cn("w-4 h-4", activeSection === section.id ? "text-primary" : "text-text-tertiary")} />
                                {section.title}
                                {activeSection === section.id && (
                                    <CaretRight className="w-4 h-4 ml-auto text-primary" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto scroll-smooth">
                <div className="max-w-4xl mx-auto px-8 py-12 md:px-12 lg:px-16">
                    <div className="space-y-16">
                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className="scroll-mt-8">
                                {section.content}
                                <div className="h-px bg-border mt-12 mb-12" />
                            </section>
                        ))}
                    </div>

                    <div className="mt-20 pt-10 border-t border-border text-center text-text-tertiary text-sm">
                        <p>&copy; {new Date().getFullYear()} Autom8 Platform. All rights reserved.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};
