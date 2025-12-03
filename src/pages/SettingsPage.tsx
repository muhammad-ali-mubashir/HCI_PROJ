import { useThemeStore } from '../store/useThemeStore';
import { motion } from 'framer-motion';
import { Moon, Sun, Eye, Zap, Download, FileJson, Image } from 'lucide-react';
import clsx from 'clsx';

export const SettingsPage = () => {
    const { mode, toggleMode, reducedMotion, toggleReducedMotion, highContrast, toggleHighContrast } = useThemeStore();

    const SettingSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );

    const Toggle = ({ label, icon: Icon, value, onChange, description }: any) => (
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-white font-medium">{label}</h3>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>
            </div>
            <button
                onClick={onChange}
                className={clsx(
                    "w-12 h-6 rounded-full transition-colors relative",
                    value ? "bg-blue-600" : "bg-gray-600"
                )}
            >
                <motion.div
                    animate={{ x: value ? 24 : 2 }}
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                />
            </button>
        </div>
    );

    return (
        <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-8"
            >
                Settings
            </motion.h1>

            <SettingSection title="Appearance">
                <Toggle
                    label="Dark Mode"
                    description="Switch between light and dark themes"
                    icon={mode === 'dark' ? Moon : Sun}
                    value={mode === 'dark'}
                    onChange={toggleMode}
                />
                <Toggle
                    label="High Contrast"
                    description="Increase contrast for better visibility"
                    icon={Eye}
                    value={highContrast}
                    onChange={toggleHighContrast}
                />
            </SettingSection>

            <SettingSection title="Accessibility & Motion">
                <Toggle
                    label="Reduced Motion"
                    description="Minimize animations for a simpler experience"
                    icon={Zap}
                    value={reducedMotion}
                    onChange={toggleReducedMotion}
                />
            </SettingSection>

            <SettingSection title="Data & Export">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-medium">
                        <FileJson className="w-5 h-5" />
                        Export JSON
                    </button>
                    <button className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-medium">
                        <Image className="w-5 h-5" />
                        Export SVG
                    </button>
                    <button className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-medium sm:col-span-2">
                        <Download className="w-5 h-5" />
                        Download Full Report
                    </button>
                </div>
            </SettingSection>
        </div>
    );
};
