import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/useThemeStore';
import { Moon, Sun, Zap, Layout as LayoutIcon, Play, Settings } from 'lucide-react';
import clsx from 'clsx';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { mode, toggleMode } = useThemeStore();
    const location = useLocation();

    const navItems = [
        { path: '/home', icon: Zap, label: 'Home' },
        { path: '/chat', icon: Play, label: 'Automate' },
        { path: '/builder', icon: LayoutIcon, label: 'Builder' },
        { path: '/dashboard', icon: Zap, label: 'Dashboard' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className={clsx(
            "min-h-screen transition-colors duration-300",
            mode === 'dark' ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        )}>
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md bg-opacity-80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/home" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <span>AutoM8</span>
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={clsx(
                                            "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                            location.pathname === item.path
                                                ? "bg-white/10 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                : "hover:bg-white/5 hover:text-blue-300"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <item.icon className="w-4 h-4" />
                                            {item.label}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={toggleMode}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Toggle Theme"
                            >
                                {mode === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-16 min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key={location.pathname}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};
