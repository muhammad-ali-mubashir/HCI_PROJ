import { useEffect, useState } from 'react';
import { ShieldCheck, Lightning, Pulse, Cpu } from '@phosphor-icons/react';

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
        <div className="bg-[#16161A] border border-white/8 rounded-xl p-5 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div 
                        className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20"
                        style={{ boxShadow: '0 0 12px rgba(139, 92, 246, 0.15)' }}
                    >
                        <Cpu className="w-5 h-5 text-violet-400" weight="bold" />
                    </div>
                    <div>
                        <h3 className="text-[15px] font-semibold text-white/90">AutoML Engine</h3>
                        <div className="flex items-center gap-2">
                            <span 
                                className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                                style={{ boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)' }}
                            />
                            <span className="text-[11px] text-emerald-400 font-medium">System Online</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="bg-violet-500/5 border border-violet-500/15 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1.5 text-violet-400">
                        <Lightning className="w-3.5 h-3.5" weight="bold" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">Optimized</span>
                    </div>
                    <div className="text-xl font-bold text-white/90">
                        {stats.optimizations}
                    </div>
                </div>

                <div className="bg-cyan-500/5 border border-cyan-500/15 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1.5 text-cyan-400">
                        <ShieldCheck className="w-3.5 h-3.5" weight="bold" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">Healed</span>
                    </div>
                    <div className="text-xl font-bold text-white/90">
                        {stats.healed}
                    </div>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/15 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1.5 text-emerald-400">
                        <Pulse className="w-3.5 h-3.5" weight="bold" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">Efficiency</span>
                    </div>
                    <div className="text-xl font-bold text-white/90">
                        {stats.efficiency.toFixed(0)}%
                    </div>
                </div>
            </div>
        </div>
    );
};
