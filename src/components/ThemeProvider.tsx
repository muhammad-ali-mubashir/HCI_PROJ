import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { mode, highContrast } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;
        
        // Remove theme classes first
        root.classList.remove('light', 'dark');
        
        // Add the current theme class
        root.classList.add(mode);
        
        // Also update the color-scheme for native elements
        root.style.colorScheme = mode;
    }, [mode]);

    // Handle high contrast mode
    useEffect(() => {
        const root = document.documentElement;
        
        if (highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }
    }, [highContrast]);

    return <>{children}</>;
};
