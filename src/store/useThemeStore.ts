import { create } from 'zustand';
import type { ThemeState } from '../lib/types';

export const useThemeStore = create<ThemeState>((set) => ({
    mode: 'dark', // Default to dark for "visually brilliant" requirement
    reducedMotion: false,
    highContrast: false,

    toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
    toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
}));
