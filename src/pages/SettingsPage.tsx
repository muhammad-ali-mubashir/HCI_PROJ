import { useThemeStore } from '../store/useThemeStore';
import { motion } from 'framer-motion';
import { Moon, Sun, Eye, Zap, Download, FileJson, Image } from 'lucide-react';
import clsx from 'clsx';

export const SettingsPage = () => {
    const { mode, toggleMode, reducedMotion, toggleReducedMotion, highContrast, toggleHighContrast } = useThemeStore();

    const SettingSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="bg-white/80 backdrop-blur-sm border-2 border-[#E5E0D8] rounded-3xl p-8 mb-6 shadow-lg hover:shadow-xl hover:border-[#D4A574] transition-all duration-300">
            <h2 className="text-2xl font-black text-[#1E293B] mb-6">{title}</h2>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );

    const Toggle = ({ label, icon: Icon, value, onChange, description }: any) => (
        <div className="flex items-center justify-between p-6 rounded-2xl bg-white/60 border border-[#E5E0D8] hover:border-[#D4A574] hover:bg-white/80 transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#D4A574] to-[#8B7355] text-white shadow-md">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-[#1E293B] font-bold text-lg">{label}</h3>
                    <p className="text-sm text-[#64748B] mt-1">{description}</p>
                </div>
            </div>
            <button
                onClick={onChange}
                className={clsx(
                    "w-14 h-7 rounded-full transition-all duration-300 relative shadow-inner",
                    value ? "bg-gradient-to-r from-[#8B7355] to-[#6B5444]" : "bg-[#D4C5A9]"
                )}
            >
                <motion.div
                    animate={{ x: value ? 28 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-6 h-6 bg-white rounded-full absolute top-0.5 shadow-md"
                />
            </button>
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#FDFCFA] via-[#F5F1E8] to-[#E8DCC4] p-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-5xl font-black text-[#1E293B] mb-3">
                        Settings
                    </h1>
                    <p className="text-xl text-[#64748B]">
                        Customize your experience
                    </p>
                </motion.div>

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
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-white border-2 border-[#E5E0D8] hover:border-[#D4A574] transition-all text-[#1E293B] font-bold shadow-md hover:shadow-lg"
                        >
                            <FileJson className="w-5 h-5 text-[#8B7355]" />
                            Export JSON
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-white border-2 border-[#E5E0D8] hover:border-[#D4A574] transition-all text-[#1E293B] font-bold shadow-md hover:shadow-lg"
                        >
                            <Image className="w-5 h-5 text-[#8B7355]" />
                            Export SVG
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="sm:col-span-2 flex items-center justify-center gap-3 p-5 rounded-2xl bg-gradient-to-r from-[#8B7355] to-[#6B5444] text-white font-bold shadow-xl hover:shadow-2xl transition-all"
                        >
                            <Download className="w-5 h-5" />
                            Download Full Report
                        </motion.button>
                    </div>
                </SettingSection>
            </div>
        </div>
    );
};
