import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'left' | 'right';
    className?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    children,
    align = 'right',
    className,
    open,
    onOpenChange
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalIsOpen;

    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalIsOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
                handleOpenChange(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Calculate position
            if (triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                setPosition({
                    top: rect.bottom + 8,
                    left: align === 'right' ? rect.right - 192 : rect.left // 192px is w-48
                });
            }
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, align, handleOpenChange]);

    return (
        <div className={cn("relative", className)}>
            <div
                ref={triggerRef}
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpenChange(!isOpen);
                }}
                className="cursor-pointer"
            >
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && position && (
                    <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        style={{
                            position: 'fixed',
                            top: position.top,
                            left: position.left,
                            width: '12rem', // w-48
                            zIndex: 9999
                        }}
                        className="rounded-xl border border-[var(--card-border)] bg-surface shadow-[var(--shadow-card)] overflow-hidden"
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
    icon?: any;
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
