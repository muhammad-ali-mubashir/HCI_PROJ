import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    width?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, width = "max-w-md" }) => {

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
                            className={cn(
                                "w-full bg-surface border border-[var(--card-border)] rounded-xl shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]",
                                width
                            )}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--card-border)]">
                                <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="h-8 w-8 text-text-tertiary hover:text-text-primary"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-4 overflow-y-auto">
                                {children}
                            </div>

                            {/* Footer */}
                            {footer && (
                                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--card-border)] bg-surface-secondary/30 rounded-b-xl">
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
