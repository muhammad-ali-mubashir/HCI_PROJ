import React from 'react';
import { motion } from 'framer-motion';
import { TrendUp, TrendDown } from '@phosphor-icons/react';

interface MetricChartProps {
    data: number[];
    color: string;
    label: string;
    unit?: string;
    total?: string;
    trend?: string;
}

export const MetricChart: React.FC<MetricChartProps> = ({ 
    data, 
    color, 
    label,
    unit = '',
    total,
    trend
}) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const isPositiveTrend = trend?.startsWith('+') || trend?.startsWith('-') && label.toLowerCase().includes('latency');

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-xl bg-surface border border-white/[0.08] hover:border-white/[0.15] transition-all"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-1">
                        {label}
                    </h3>
                    {total && (
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-text-primary">
                                {total}{unit}
                            </span>
                            {trend && (
                                <span className={`flex items-center gap-0.5 text-xs font-medium ${
                                    isPositiveTrend ? 'text-emerald-400' : 'text-red-400'
                                }`}>
                                    {isPositiveTrend ? (
                                        <TrendUp className="w-3 h-3" weight="bold" />
                                    ) : (
                                        <TrendDown className="w-3 h-3" weight="bold" />
                                    )}
                                    {trend}
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
                />
            </div>

            {/* Chart */}
            <div className="h-24 flex items-end gap-1">
                {data.map((value, index) => {
                    const height = ((value - min) / (max - min)) * 100;
                    const normalizedHeight = Math.max(height, 10); // Minimum 10% height
                    
                    return (
                        <motion.div
                            key={index}
                            className="flex-1 relative group cursor-pointer"
                            initial={{ height: 0 }}
                            animate={{ height: `${normalizedHeight}%` }}
                            transition={{ duration: 0.5, delay: index * 0.03 }}
                        >
                            <div 
                                className="w-full h-full rounded-sm transition-all group-hover:opacity-100 opacity-70"
                                style={{ 
                                    backgroundColor: color,
                                    boxShadow: `0 0 10px ${color}30`
                                }}
                            />
                            {/* Tooltip */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                <div className="px-2 py-1 rounded bg-surface border border-white/10 text-xs text-text-primary whitespace-nowrap">
                                    {value}{unit}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Time labels */}
            <div className="flex justify-between mt-2 text-[10px] text-text-tertiary">
                <span>12h ago</span>
                <span>6h ago</span>
                <span>Now</span>
            </div>
        </motion.div>
    );
};
