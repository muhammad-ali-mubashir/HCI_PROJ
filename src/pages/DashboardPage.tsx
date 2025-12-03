import { MetricChart } from '../features/dashboard/MetricChart';
import { ExecutionVisualizer } from '../features/dashboard/ExecutionVisualizer';
import { motion } from 'framer-motion';

export const DashboardPage = () => {
    // Mock data for charts
    const executionsData = [12, 19, 3, 5, 2, 3, 15, 22, 18, 10];
    const successRateData = [95, 92, 98, 94, 96, 91, 99, 97, 95, 98];
    const latencyData = [120, 150, 110, 130, 140, 125, 115, 135, 145, 120];

    return (
        <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-8"
            >
                System Overview
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <MetricChart label="Total Executions (24h)" data={executionsData} color="#3b82f6" />
                <MetricChart label="Success Rate (%)" data={successRateData} color="#10b981" />
                <MetricChart label="Avg Latency (ms)" data={latencyData} color="#8b5cf6" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
                <ExecutionVisualizer />

                {/* Placeholder for another widget or map */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🌍</span>
                        </div>
                        <h3 className="text-white font-medium mb-2">Global Activity Map</h3>
                        <p className="text-gray-500 text-sm">Real-time geographic distribution of workflow triggers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
