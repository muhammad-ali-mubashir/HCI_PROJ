import { MetricChart } from '../features/dashboard/MetricChart';
import { ExecutionVisualizer } from '../features/dashboard/ExecutionVisualizer';
import { motion } from 'framer-motion';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { 
    Lightning, 
    CheckCircle, 
    ArrowUp, 
    ArrowDown,
    Pulse,
    Users,
    Globe,
    Gauge,
    TrendUp,
    Calendar,
    Play,
    Warning
} from '@phosphor-icons/react';

// Stat card component
const StatCard = ({ 
    label, 
    value, 
    change, 
    changeType, 
    icon: Icon, 
    color,
    delay = 0 
}: { 
    label: string; 
    value: string; 
    change: string; 
    changeType: 'up' | 'down' | 'neutral';
    icon: PhosphorIcon;
    color: string;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="p-5 rounded-xl bg-surface border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-all"
    >
        <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" weight="duotone" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                changeType === 'up' ? 'bg-emerald-500/10 text-emerald-400' :
                changeType === 'down' ? 'bg-red-500/10 text-red-400' :
                'bg-white/5 text-text-tertiary'
            }`}>
                {changeType === 'up' && <ArrowUp className="w-3 h-3" />}
                {changeType === 'down' && <ArrowDown className="w-3 h-3" />}
                {change}
            </div>
        </div>
        <div className="text-2xl font-bold text-text-primary mb-1">{value}</div>
        <div className="text-sm text-text-secondary">{label}</div>
    </motion.div>
);

// Recent activity item
const ActivityItem = ({ 
    workflow, 
    status, 
    time, 
    duration 
}: { 
    workflow: string; 
    status: 'success' | 'failed' | 'running';
    time: string;
    duration: string;
}) => (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-surface-hover/50 border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-all">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            status === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
            status === 'failed' ? 'bg-red-500/10 text-red-400' :
            'bg-blue-500/10 text-blue-400'
        }`}>
            {status === 'success' && <CheckCircle className="w-4 h-4" weight="fill" />}
            {status === 'failed' && <Warning className="w-4 h-4" weight="fill" />}
            {status === 'running' && <Play className="w-4 h-4 animate-pulse" weight="fill" />}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{workflow}</p>
            <p className="text-xs text-text-tertiary">{time}</p>
        </div>
        <div className="text-xs text-text-secondary font-mono bg-surface-hover px-2 py-1 rounded">
            {duration}
        </div>
    </div>
);

export const DashboardPage = () => {
    // Mock data for charts
    const executionsData = [45, 62, 38, 75, 52, 88, 95, 72, 110, 85, 92, 78];
    const successRateData = [96, 94, 98, 95, 97, 93, 99, 96, 98, 97, 95, 99];
    const latencyData = [42, 38, 45, 35, 48, 32, 28, 36, 40, 33, 38, 30];

    // Mock recent activity
    const recentActivity = [
        { workflow: 'Email Notification Flow', status: 'success' as const, time: '2 mins ago', duration: '1.2s' },
        { workflow: 'Data Sync Pipeline', status: 'running' as const, time: 'Just now', duration: '...' },
        { workflow: 'User Onboarding Sequence', status: 'success' as const, time: '5 mins ago', duration: '3.8s' },
        { workflow: 'Slack Alert Automation', status: 'failed' as const, time: '12 mins ago', duration: '0.8s' },
        { workflow: 'Weekly Report Generator', status: 'success' as const, time: '1 hour ago', duration: '12.4s' },
    ];

    // Mock top workflows
    const topWorkflows = [
        { name: 'Customer Support Triage', executions: 1247, successRate: 99.2 },
        { name: 'Lead Scoring Pipeline', executions: 892, successRate: 97.8 },
        { name: 'Invoice Processing', executions: 654, successRate: 98.5 },
        { name: 'Social Media Monitor', executions: 521, successRate: 96.1 },
    ];

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background">
            {/* Subtle grid background */}
            <div 
                className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle, var(--color-text-tertiary) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                    opacity: 0.15
                }}
            />
            
            <div className="relative z-10 p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1 font-serif">
                                    Dashboard
                                </h1>
                                <p className="text-text-secondary">
                                    Monitor your workflows and performance metrics
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-tertiary">
                                <Calendar className="w-4 h-4" />
                                <span>Last 24 hours</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard
                            label="Total Executions"
                            value="12,847"
                            change="+12.5%"
                            changeType="up"
                            icon={Lightning}
                            color="bg-primary/10 text-primary"
                            delay={0.1}
                        />
                        <StatCard
                            label="Success Rate"
                            value="98.7%"
                            change="+2.1%"
                            changeType="up"
                            icon={CheckCircle}
                            color="bg-emerald-500/10 text-emerald-400"
                            delay={0.15}
                        />
                        <StatCard
                            label="Avg Response Time"
                            value="38ms"
                            change="-15%"
                            changeType="up"
                            icon={Gauge}
                            color="bg-amber-500/10 text-amber-400"
                            delay={0.2}
                        />
                        <StatCard
                            label="Active Workflows"
                            value="24"
                            change="+3"
                            changeType="up"
                            icon={Pulse}
                            color="bg-violet-500/10 text-violet-400"
                            delay={0.25}
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <MetricChart 
                            label="Executions" 
                            data={executionsData} 
                            color="#6366F1" 
                            unit=""
                            total="847"
                            trend="+18%"
                        />
                        <MetricChart 
                            label="Success Rate" 
                            data={successRateData} 
                            color="#10B981" 
                            unit="%"
                            total="98.7"
                            trend="+2.1%"
                        />
                        <MetricChart 
                            label="Avg Latency" 
                            data={latencyData} 
                            color="#F59E0B" 
                            unit="ms"
                            total="38"
                            trend="-15%"
                        />
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="p-6 rounded-xl bg-surface border border-[var(--card-border)]"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                                    <Pulse className="w-5 h-5 text-primary" />
                                    Recent Activity
                                </h3>
                                <button className="text-xs text-primary hover:text-primary-hover transition-colors">
                                    View all
                                </button>
                            </div>
                            <div className="space-y-3">
                                {recentActivity.map((item, index) => (
                                    <ActivityItem key={index} {...item} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Top Workflows */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                            className="p-6 rounded-xl bg-surface border border-[var(--card-border)]"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                                    <TrendUp className="w-5 h-5 text-emerald-400" />
                                    Top Workflows
                                </h3>
                                <button className="text-xs text-primary hover:text-primary-hover transition-colors">
                                    View all
                                </button>
                            </div>
                            <div className="space-y-4">
                                {topWorkflows.map((workflow, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-surface-hover border border-[var(--card-border)] flex items-center justify-center text-sm font-semibold text-text-secondary">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-text-primary truncate">
                                                {workflow.name}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-text-tertiary">
                                                    {workflow.executions.toLocaleString()} runs
                                                </span>
                                                <span className="text-xs text-emerald-400">
                                                    {workflow.successRate}% success
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-24 h-2 bg-surface-hover rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full"
                                                style={{ width: `${workflow.successRate}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Execution Visualizer and Global Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        <ExecutionVisualizer />
                        
                        {/* Global Activity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="p-6 rounded-xl bg-surface border border-[var(--card-border)]"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-cyan-400" />
                                    Global Activity
                                </h3>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 rounded-lg bg-surface-hover/50 border border-[var(--card-border)]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="w-4 h-4 text-text-tertiary" />
                                        <span className="text-xs text-text-tertiary">Active Users</span>
                                    </div>
                                    <div className="text-2xl font-bold text-text-primary">2,847</div>
                                </div>
                                <div className="p-4 rounded-lg bg-surface-hover/50 border border-[var(--card-border)]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe className="w-4 h-4 text-text-tertiary" />
                                        <span className="text-xs text-text-tertiary">Regions</span>
                                    </div>
                                    <div className="text-2xl font-bold text-text-primary">12</div>
                                </div>
                            </div>

                            {/* Region breakdown */}
                            <div className="space-y-3">
                                {[
                                    { region: 'North America', percentage: 42, color: 'bg-primary' },
                                    { region: 'Europe', percentage: 31, color: 'bg-emerald-500' },
                                    { region: 'Asia Pacific', percentage: 18, color: 'bg-amber-500' },
                                    { region: 'Other', percentage: 9, color: 'bg-violet-500' },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                        <span className="text-sm text-text-secondary flex-1">{item.region}</span>
                                        <span className="text-sm font-medium text-text-primary">{item.percentage}%</span>
                                        <div className="w-20 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${item.color} rounded-full`}
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
