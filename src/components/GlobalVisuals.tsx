import { useThemeStore } from '../store/useThemeStore';

export const GlobalVisuals = () => {
    const { highContrast } = useThemeStore();

    if (highContrast) return null; // Accessibility override

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        </div>
    );
};
