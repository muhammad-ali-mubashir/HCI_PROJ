import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/useThemeStore';
import { Moon, Sun, Zap, Layout as LayoutIcon, Settings, BarChart3, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { mode, toggleMode } = useThemeStore();
    const location = useLocation();

    const navItems = [
        { path: '/home', icon: Zap, label: 'Home' },
        { path: '/chat', icon: MessageSquare, label: 'Chat' },
        { path: '/builder', icon: LayoutIcon, label: 'Builder' },
        { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-primary/20">
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/home" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                    <Zap className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-text-primary">AutoM8</span>
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-1">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={cn(
                                                "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 group",
                                                isActive
                                                    ? "text-text-primary bg-white/5"
                                                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                                            )}
                                        >
                                            <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary" : "text-text-tertiary group-hover:text-text-primary")} />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMode}
                                className="text-text-secondary hover:text-text-primary"
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
