import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'left' | 'right';
    className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, children, align = 'right', className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={cn("relative", className)} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "absolute top-full mt-2 w-48 rounded-xl border border-[var(--card-border)] bg-surface shadow-[var(--shadow-card)] overflow-hidden z-50",
                            align === 'right' ? 'right-0' : 'left-0'
                        )}
                    >
                        <div className="py-1">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    danger?: boolean;
    icon?: React.ElementType;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ children, danger, icon: Icon, className, ...props }) => {
    return (
        <button
            className={cn(
                "w-full px-4 py-2 text-sm text-left flex items-center gap-2 transition-colors",
                danger
                    ? "text-red-500 hover:bg-red-500/10"
                    : "text-text-primary hover:bg-surface-hover",
                className
            )}
            {...props}
        >
            {Icon && <Icon className="w-4 h-4 opacity-70" />}
            {children}
        </button>
    );
};
