import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/useThemeStore';
import { Moon, Sun, Gear, ChartBar, Folder, CompassTool, SignOut, ArrowRight } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { Dropdown, DropdownItem } from './ui/Dropdown';
import { auth } from '../lib/auth';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { mode, toggleMode } = useThemeStore();
    const location = useLocation();
    const user = auth.getUser();

    // Determine if we are in "App Mode" (protected routes)
    const isAppMode = ['/projects', '/workspace', '/dashboard', '/settings', '/account-settings'].some(path => location.pathname.startsWith(path));

    const publicNavItems = [
        { href: '/#productivity', label: 'Features' },
        { href: '/#pricing', label: 'Pricing' },
        { href: '/#faq', label: 'FAQ' },
    ];

    const appNavItems = [
        { path: '/projects', icon: Folder, label: 'Projects' },
        { path: '/workspace', icon: CompassTool, label: 'Workspace' },
        { path: '/dashboard', icon: ChartBar, label: 'Dashboard' },
        { path: '/settings', icon: Gear, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-primary/20 transition-colors duration-200">
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-200",
                mode === 'dark'
                    ? "border-b border-white/5 bg-background/80"
                    : "border-b border-black/5 bg-background/80 shadow-sm"
            )}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
                                <img
                                    src="/badge.svg"
                                    alt="AutoM8 Logo"
                                    className="w-8 h-8 rounded-lg transition-transform group-hover:scale-105"
                                />
                                <span className="text-text-primary">AutoM8</span>
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-1">
                                {!isAppMode ? (
                                    // Public / Home Navbar Item
                                    <>
                                        {publicNavItems.map((item) => (
                                            <a
                                                key={item.label}
                                                href={item.href}
                                                className={cn(
                                                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                                                )}
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </>
                                ) : (
                                    // App Navbar Items (Only when logged in/in app)
                                    <>
                                        {appNavItems.map((item) => {
                                            const isActive = location.pathname.startsWith(item.path);
                                            return (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className={cn(
                                                        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 group",
                                                        isActive
                                                            ? mode === 'dark'
                                                                ? "text-text-primary bg-white/5"
                                                                : "text-text-primary bg-black/5"
                                                            : mode === 'dark'
                                                                ? "text-text-secondary hover:text-text-primary hover:bg-white/5"
                                                                : "text-text-secondary hover:text-text-primary hover:bg-black/5"
                                                    )}
                                                >
                                                    <item.icon className={cn(
                                                        "w-4 h-4 transition-colors",
                                                        isActive
                                                            ? "text-primary"
                                                            : "text-text-tertiary group-hover:text-text-primary"
                                                    )} />
                                                    {item.label}
                                                </Link>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {user ? (
                                <>
                                    {!isAppMode && (
                                        <Link to="/projects">
                                            <Button variant="gradient" size="sm">
                                                Projects
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    )}
                                    <Dropdown
                                        trigger={
                                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                                <div className="text-right hidden sm:block">
                                                    <div className="text-sm font-medium text-text-primary">{user.name}</div>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-violet-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-background hover:ring-primary/50 transition-all">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                            </div>
                                        }
                                    >
                                        <div className="px-4 py-2 border-b border-[var(--card-border)] mb-1">
                                            <p className="text-sm font-medium text-text-primary">{user.name}</p>
                                            <p className="text-xs text-text-secondary truncate">{user.email}</p>
                                        </div>

                                        <Link to="/account-settings">
                                            <DropdownItem icon={Gear}>Account Settings</DropdownItem>
                                        </Link>

                                        <DropdownItem
                                            icon={SignOut}
                                            danger
                                            onClick={() => {
                                                auth.logout();
                                                window.location.href = '/';
                                            }}
                                        >
                                            Sign out
                                        </DropdownItem>
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                                        Sign in
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="gradient" size="sm">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMode}
                                className="text-text-secondary hover:text-text-primary ml-2"
                                aria-label="Toggle Theme"
                            >
                                {mode === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-16 min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    key={location.pathname}
                    className="h-full"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};
