import { useEffect, useState } from 'react';
import { Shield, Zap, Activity, Cpu } from 'lucide-react';

export const AutoMLStatusWidget = () => {
    const [stats, setStats] = useState({
        optimizations: 124,
        healed: 12,
        efficiency: 94
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.5) {
                setStats(prev => ({
                    ...prev,
                    optimizations: prev.optimizations + 1,
                    efficiency: Math.min(99, Math.max(90, prev.efficiency + (Math.random() - 0.5)))
                }));
            }
            if (Math.random() > 0.8) {
                setStats(prev => ({
                    ...prev,
                    healed: prev.healed + 1
                }));
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-sm border-2 border-[#E5E0D8] dark:border-white/10 rounded-3xl p-6 shadow-xl h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-xl">
                        <Cpu className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#1E293B] dark:text-white">AutoML Engine</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">System Online</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                    <div className="flex items-center gap-2 mb-1 text-purple-600 dark:text-purple-400">
                        <Zap className="w-4 h-4" />
                        <span className="text-xs font-bold">Optimized</span>
                    </div>
                    <div className="text-2xl font-black text-[#1E293B] dark:text-white">
                        {stats.optimizations}
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                    <div className="flex items-center gap-2 mb-1 text-blue-600 dark:text-blue-400">
                        <Shield className="w-4 h-4" />
                        <span className="text-xs font-bold">Healed</span>
                    </div>
                    <div className="text-2xl font-black text-[#1E293B] dark:text-white">
                        {stats.healed}
                    </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-2xl border border-green-100 dark:border-green-800/30">
                    <div className="flex items-center gap-2 mb-1 text-green-600 dark:text-green-400">
                        <Activity className="w-4 h-4" />
                        <span className="text-xs font-bold">Efficiency</span>
                    </div>
                    <div className="text-2xl font-black text-[#1E293B] dark:text-white">
                        {stats.efficiency.toFixed(0)}%
                    </div>
                </div>
            </div>
        </div>
    );
};
