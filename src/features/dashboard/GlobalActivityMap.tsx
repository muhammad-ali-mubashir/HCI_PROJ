import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ping {
    id: number;
    x: number;
    y: number;
    color: string;
}

export const GlobalActivityMap = () => {
    const [pings, setPings] = useState<Ping[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly generate pings - increased frequency for "Global" feel
            if (Math.random() > 0.1) {
                const newPing = {
                    id: Date.now(),
                    x: Math.random() * 100,
                    y: Math.random() * 80 + 10,
                    // Linear-style neon colors
                    color: Math.random() > 0.7 ? '#EC4899' : Math.random() > 0.5 ? '#8B5CF6' : '#10B981'
                };
                setPings(prev => [...prev.slice(-20), newPing]);
            }
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full bg-[#16161A] rounded-xl overflow-hidden border border-white/8">
            <div className="absolute inset-0 opacity-20">
                {/* Simplified World Map SVG */}
                <svg viewBox="0 0 100 60" className="w-full h-full fill-current text-white/20">
                    <path d="M20,15 Q25,10 30,15 T40,15 T50,20 T60,15 T70,10 T80,15 T90,20 V40 H10 V20 Z" />
                    <path d="M5,20 Q10,15 15,20 T25,25 T35,20 T45,25 T55,20 T65,25 T75,20 T85,25 T95,20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                </svg>
                {/* Dot Grid */}
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                        backgroundSize: '16px 16px'
                    }}
                />
            </div>

            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-white/90 font-semibold text-[15px] flex items-center gap-2">
                    <span 
                        className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                        style={{ boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)' }}
                    />
                    Global Activity
                </h3>
                <p className="text-white/35 text-[11px]">Real-time workflow triggers</p>
            </div>

            <AnimatePresence>
                {pings.map(ping => (
                    <motion.div
                        key={ping.id}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        style={{
                            left: `${ping.x}%`,
                            top: `${ping.y}%`,
                            backgroundColor: ping.color,
                            boxShadow: `0 0 12px ${ping.color}`
                        }}
                        className="absolute w-2 h-2 rounded-full"
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
