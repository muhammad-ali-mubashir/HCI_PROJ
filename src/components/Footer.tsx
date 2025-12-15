import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import { cn } from '../lib/utils';

export const Footer = () => {
    const { mode } = useThemeStore();
    const isDark = mode === 'dark';
    const location = useLocation();
    const isHome = location.pathname === '/' || location.pathname === '/home';

    return (
        <footer className={cn(
            "relative z-10 py-12 px-4 border-t transition-colors duration-200",
            isDark ? "border-white/5 bg-background" : "border-black/5 bg-background"
        )}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <img
                        src="/badge.svg"
                        alt="AutoM8 Logo"
                        className="w-8 h-8 rounded-lg"
                    />
                    <span className="font-semibold text-text-primary">AutoM8</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-text-secondary flex-wrap justify-center">
                    {!isHome && (
                        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
                    )}
                    <Link to="/privacy" className="hover:text-text-primary transition-colors">Privacy</Link>
                    <Link to="/terms" className="hover:text-text-primary transition-colors">Terms</Link>
                    <Link to="/docs" className="hover:text-text-primary transition-colors">Docs</Link>
                    <Link to="/blog" className="hover:text-text-primary transition-colors">Blog</Link>
                </div>
                <div className="text-sm text-text-tertiary">
                    © 2024 AutoM8. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
