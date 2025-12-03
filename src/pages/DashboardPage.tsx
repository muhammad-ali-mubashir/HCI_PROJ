import { MetricChart } from '../features/dashboard/MetricChart';
import { ExecutionVisualizer } from '../features/dashboard/ExecutionVisualizer';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';

export const DashboardPage = () => {
    // Mock data for charts
    const executionsData = [12, 19, 3, 5, 2, 3, 15, 22, 18, 10];
    const successRateData = [95, 92, 98, 94, 96, 91, 99, 97, 95, 98];
    const latencyData = [120, 150, 110, 130, 140, 125, 115, 135, 145, 120];

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background p-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-text-primary mb-2">
                        System Overview
                    </h1>
                    <p className="text-text-secondary text-lg">
                        Monitor your workflows and performance metrics
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <MetricChart label="Total Executions (24h)" data={executionsData} color="#3B82F6" />
                    <MetricChart label="Success Rate (%)" data={successRateData} color="#10B981" />
                    <MetricChart label="Avg Latency (ms)" data={latencyData} color="#F59E0B" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
                    <ExecutionVisualizer />

                    {/* Placeholder for another widget */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Card className="h-full flex items-center justify-center p-8 hover:border-primary/50 transition-colors">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                                    <span className="text-4xl">🌍</span>
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-3">Global Activity Map</h3>
                                <p className="text-text-secondary text-lg">
                                    Real-time geographic distribution of workflow triggers
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
