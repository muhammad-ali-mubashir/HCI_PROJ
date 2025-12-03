import React from 'react';
import { motion } from 'framer-motion';

interface MetricChartProps {
    data: number[];
    color: string;
    label: string;
}

export const MetricChart: React.FC<MetricChartProps> = ({ data, color, label }) => {
    const max = Math.max(...data);

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-gray-400 text-sm font-medium mb-4">{label}</h3>
            <div className="h-32 flex items-end justify-between gap-2">
                {data.map((value, index) => (
                    <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / max) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-full rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: color }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="text-xs text-white text-center -mt-5"
                        >
                            {value}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
