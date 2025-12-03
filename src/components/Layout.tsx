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
            "min-h-screen transition-colors duration-500",
            mode === 'dark' ? "bg-[#0F172A] text-[#F5F1E8]" : "bg-[#FDFCFA] text-[#1E293B]"
        )}>
            <nav className={clsx(
                "fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl bg-opacity-90 transition-all duration-300",
                mode === 'dark'
                    ? "border-[rgba(229,224,216,0.1)] bg-[#1E293B]/90"
                    : "border-[#E5E0D8] bg-white/90"
            )}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/home" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
                                <div className={clsx(
                                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                                    mode === 'dark'
                                        ? "bg-gradient-to-br from-[#D4A574] to-[#8B7355]"
                                        : "bg-gradient-to-br from-[#8B7355] to-[#6B5444]"
                                )}>
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <span className={clsx(
                                    "transition-colors duration-300",
                                    mode === 'dark' ? "text-[#F5F1E8]" : "text-[#1E293B]"
                                )}>AutoM8</span>
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={clsx(
                                            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden group",
                                            location.pathname === item.path
                                                ? mode === 'dark'
                                                    ? "bg-[#D4A574]/20 text-[#D4A574] shadow-[0_0_15px_rgba(212,165,116,0.2)]"
                                                    : "bg-[#8B7355]/10 text-[#6B5444] shadow-sm"
                                                : mode === 'dark'
                                                    ? "hover:bg-white/5 text-[#E8DCC4] hover:text-[#D4A574]"
                                                    : "hover:bg-[#F5F1E8] text-[#475569] hover:text-[#6B5444]"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 relative z-10">
                                            <item.icon className="w-4 h-4" />
                                            {item.label}
                                        </div>
                                        {location.pathname === item.path && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className={clsx(
                                                    "absolute inset-0 rounded-lg",
                                                    mode === 'dark'
                                                        ? "bg-gradient-to-r from-[#D4A574]/10 to-[#8B7355]/10"
                                                        : "bg-gradient-to-r from-[#E8DCC4]/30 to-[#D4C5A9]/30"
                                                )}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={toggleMode}
                                className={clsx(
                                    "p-2 rounded-full transition-all duration-300 hover:scale-110",
                                    mode === 'dark'
                                        ? "hover:bg-[#D4A574]/20 text-[#D4A574]"
                                        : "hover:bg-[#8B7355]/10 text-[#8B7355]"
                                )}
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    key={location.pathname}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};
