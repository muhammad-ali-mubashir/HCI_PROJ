import { useThemeStore } from '../store/useThemeStore';
import { motion } from 'framer-motion';
import { Moon, Sun, Eye, Lightning, DownloadSimple, FileCode, Image } from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Switch } from '../components/ui/Switch';
import { Button } from '../components/ui/Button';

export const SettingsPage = () => {
    const { mode, toggleMode, reducedMotion, toggleReducedMotion, highContrast, toggleHighContrast } = useThemeStore();

    const SettingItem = ({ label, icon: Icon, value, onChange, description }: any) => (
        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-surface-hover transition-colors">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-text-primary font-medium">{label}</h3>
                    <p className="text-sm text-text-secondary">{description}</p>
                </div>
            </div>
            <Switch checked={value} onCheckedChange={onChange} />
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-text-primary mb-2">
                        Settings
                    </h1>
                    <p className="text-text-secondary">
                        Customize your experience
                    </p>
                </motion.div>

                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <SettingItem
                            label="Dark Mode"
                            description="Switch between light and dark themes"
                            icon={mode === 'dark' ? Moon : Sun}
                            value={mode === 'dark'}
                            onChange={toggleMode}
                        />
                        <SettingItem
                            label="High Contrast"
                            description="Increase contrast for better visibility"
                            icon={Eye}
                            value={highContrast}
                            onChange={toggleHighContrast}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Accessibility & Motion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SettingItem
                            label="Reduced Motion"
                            description="Minimize animations for a simpler experience"
                            icon={Lightning}
                            value={reducedMotion}
                            onChange={toggleReducedMotion}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Data & Export</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button variant="outline" className="justify-start h-auto py-4 px-4">
                                <FileCode className="w-5 h-5 mr-3 text-text-secondary" />
                                <div className="text-left">
                                    <div className="font-medium">Export JSON</div>
                                    <div className="text-xs text-text-secondary font-normal">Download raw data</div>
                                </div>
                            </Button>
                            <Button variant="outline" className="justify-start h-auto py-4 px-4">
                                <Image className="w-5 h-5 mr-3 text-text-secondary" />
                                <div className="text-left">
                                    <div className="font-medium">Export SVG</div>
                                    <div className="text-xs text-text-secondary font-normal">Download visuals</div>
                                </div>
                            </Button>
                            <Button className="sm:col-span-2 w-full">
                                <DownloadSimple className="w-4 h-4 mr-2" />
                                Download Full Report
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
