import { MetricChart } from '../features/dashboard/MetricChart';
import { ExecutionVisualizer } from '../features/dashboard/ExecutionVisualizer';
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <MetricChart label="Total Executions (24h)" data={executionsData} color="#8B7355" />
                    <MetricChart label="Success Rate (%)" data={successRateData} color="#D4A574" />
                    <MetricChart label="Avg Latency (ms)" data={latencyData} color="#B8935C" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
                    <ExecutionVisualizer />

                    {/* Placeholder for another widget */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="bg-white/80 backdrop-blur-sm border-2 border-[#E5E0D8] rounded-3xl p-8 flex items-center justify-center shadow-xl hover:shadow-2xl hover:border-[#D4A574] transition-all duration-300"
                    >
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#D4A574] to-[#8B7355] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <span className="text-4xl">🌍</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#1E293B] mb-3">Global Activity Map</h3>
                            <p className="text-[#64748B] text-lg">
                                Real-time geographic distribution of workflow triggers
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
