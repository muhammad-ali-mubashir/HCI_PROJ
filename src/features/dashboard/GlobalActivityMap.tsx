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
                    // Approximate world map distribution (very rough)
                    x: Math.random() * 100,
                    y: Math.random() * 80 + 10,
                    color: Math.random() > 0.7 ? '#D4A574' : Math.random() > 0.5 ? '#8B7355' : '#4ade80' // Added green for success
                };
                setPings(prev => [...prev.slice(-20), newPing]); // Keep more pings
            }
        }, 300); // Faster interval

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full bg-[#1E293B] rounded-3xl overflow-hidden border-2 border-[#E5E0D8] shadow-xl">
            <div className="absolute inset-0 opacity-20">
                {/* Simplified World Map SVG */}
                <svg viewBox="0 0 100 60" className="w-full h-full fill-current text-gray-400">
                    <path d="M20,15 Q25,10 30,15 T40,15 T50,20 T60,15 T70,10 T80,15 T90,20 V40 H10 V20 Z" />
                    {/* This is a placeholder shape. In a real app, use a proper world map path */}
                    <path d="M5,20 Q10,15 15,20 T25,25 T35,20 T45,25 T55,20 T65,25 T75,20 T85,25 T95,20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                </svg>
                {/* Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Global Activity
                </h3>
                <p className="text-gray-400 text-xs">Real-time workflow triggers</p>
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
                            backgroundColor: ping.color
                        }}
                        className="absolute w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]"
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
