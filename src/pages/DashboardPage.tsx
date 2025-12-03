import { MetricChart } from '../features/dashboard/MetricChart';
import { ExecutionVisualizer } from '../features/dashboard/ExecutionVisualizer';
import { GlobalActivityMap } from '../features/dashboard/GlobalActivityMap';
import { AutoMLStatusWidget } from '../features/dashboard/AutoMLStatusWidget';
import { motion } from 'framer-motion';

export const DashboardPage = () => {
    // Mock data for charts
    const executionsData = [12, 19, 3, 5, 2, 3, 15, 22, 18, 10];
    const successRateData = [95, 92, 98, 94, 96, 91, 99, 97, 95, 98];
    const latencyData = [120, 150, 110, 130, 140, 125, 115, 135, 145, 120];

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#FDFCFA] via-[#F5F1E8] to-[#E8DCC4] p-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-black text-[#1E293B] mb-2">
                        System Overview
                    </h1>
                    <p className="text-[#64748B] text-lg">
                        Monitor your workflows and performance metrics
                    </p>
                </motion.div>

                {/* AutoML Status */}
                <div className="mb-8 h-48">
                    <AutoMLStatusWidget />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <MetricChart label="Total Executions (24h)" data={executionsData} color="#8B7355" />
                    <MetricChart label="Success Rate (%)" data={successRateData} color="#D4A574" />
                    <MetricChart label="Avg Latency (ms)" data={latencyData} color="#B8935C" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
                    <ExecutionVisualizer />

                    {/* Global Activity Map */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="h-[500px]"
                    >
                        <GlobalActivityMap />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
