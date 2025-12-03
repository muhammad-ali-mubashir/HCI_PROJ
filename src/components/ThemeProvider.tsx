import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { mode } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;
        
        // Remove both classes first
        root.classList.remove('light', 'dark');
        
        // Add the current theme class
        root.classList.add(mode);
        
        // Also update the color-scheme for native elements
        root.style.colorScheme = mode;
    }, [mode]);

    return <>{children}</>;
};
