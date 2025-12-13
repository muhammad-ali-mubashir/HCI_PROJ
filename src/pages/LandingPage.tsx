import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Lightning,
    Sparkle,
    Robot,
    GitBranch,
    Clock,
    ShieldCheck,
    Gauge,
    Users,
    Check,
    CaretDown,
    Rocket,
    Brain,
    Plugs,
    ChartLineUp,
    Timer,
    Envelope,
    Code,
    PaperPlaneRight,
    DotsThree
} from '@phosphor-icons/react';
import { Button } from '../components/ui/Button';
import { useState } from 'react';
import FaultyTerminal from '../components/FaultyTerminal';
import { useThemeStore } from '../store/useThemeStore';
import { cn } from '../lib/utils';

export const LandingPage = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const { mode } = useThemeStore();
    const isDark = mode === 'dark';

    return (
        <div className="relative min-h-screen bg-background overflow-hidden transition-colors duration-200">
            {/* FaultyTerminal Background - Hero Section Only (Dark mode only) */}
            {isDark && (
                <div className="absolute inset-0 h-[900px] pointer-events-none">
                    <FaultyTerminal
                        scale={1.5}
                        gridMul={[2, 1]}
                        digitSize={1.2}
                        timeScale={0.5}
                        pause={false}
                        scanlineIntensity={0.2}
                        glitchAmount={0.5}
                        flickerAmount={0.3}
                        noiseAmp={0.8}
                        chromaticAberration={0}
                        dither={0}
                        curvature={0}
                        tint="#6366f1"
                        mouseReact={true}
                        mouseStrength={0.3}
                        pageLoadAnimation={true}
                        brightness={0.15}
                    />
                    {/* Gradient overlay to fade out the terminal effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
                </div>
            )}

            {/* Light mode: Gradient background */}
            {!isDark && (
                <div className="absolute inset-0 h-[900px] pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 50%)`,
                    }} />
                </div>
            )}

            {/* Subtle grid background for rest of page */}
            <div
                className="fixed inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: isDark
                        ? `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`
                        : `radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                }}
            />

            {/* ==================== HERO SECTION ==================== */}
            <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-24">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8",
                            isDark
                                ? "bg-surface/80 border border-white/10"
                                : "bg-white/80 border border-black/10 shadow-sm"
                        )}
                    >
                        <Sparkle className="w-3.5 h-3.5 text-primary" weight="fill" />
                        <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                            AI-Powered Workflow Automation
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-text-primary font-serif"
                    >
                        Build workflows that<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-primary/50 italic">
                            work like magic
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Transform natural language into powerful automation workflows.
                        Visualize, build, and execute complex tasks with our stunning visual interface.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link to="/register">
                            <Button size="lg" className="h-12 px-8 text-base">
                                Start Free Trial
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>

                        <Link to="/workspace">
                            <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
                                View Demo
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-12 flex flex-wrap items-center justify-center gap-8 text-text-tertiary"
                    >
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-sm">SOC 2 Compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">10,000+ Teams</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Lightning className="w-4 h-4" />
                            <span className="text-sm">99.9% Uptime</span>
                        </div>
                    </motion.div>
                </div>

                {/* UI Preview - Workflow Builder Snippet */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="mt-16 w-full max-w-5xl mx-auto"
                >
                    <div className={cn(
                        "relative rounded-xl overflow-hidden backdrop-blur-sm",
                        isDark
                            ? "border border-white/[0.08] bg-surface/80 shadow-2xl"
                            : "border border-black/[0.08] bg-white shadow-xl"
                    )}>
                        {/* Browser chrome */}
                        <div className={cn(
                            "flex items-center gap-2 px-4 py-3 border-b",
                            isDark ? "border-white/[0.08] bg-surface/50" : "border-black/[0.08] bg-gray-50"
                        )}>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className={cn(
                                    "px-4 py-1 rounded-md text-xs text-text-tertiary",
                                    isDark ? "bg-white/5" : "bg-black/5"
                                )}>
                                    app.flowai.dev/builder
                                </div>
                            </div>
                        </div>

                        {/* App content mockup */}
                        <div className="flex h-[400px]">
                            {/* Sidebar */}
                            <div className={cn(
                                "w-64 border-r p-4 hidden md:block",
                                isDark ? "border-white/[0.08] bg-surface/30" : "border-black/[0.08] bg-gray-50/50"
                            )}>
                                <div className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Node Library</div>
                                {[
                                    { icon: Lightning, label: 'Trigger', color: 'text-pink-500' },
                                    { icon: Envelope, label: 'Send Email', color: 'text-emerald-500' },
                                    { icon: Code, label: 'Code Block', color: 'text-amber-500' },
                                    { icon: Plugs, label: 'Webhook', color: 'text-violet-500' },
                                ].map((node, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + i * 0.1 }}
                                        className={cn(
                                            "flex items-center gap-3 p-2.5 rounded-lg border mb-2 cursor-pointer transition-all",
                                            isDark
                                                ? "bg-white/5 border-white/[0.08] hover:border-white/[0.15]"
                                                : "bg-white border-black/[0.08] hover:border-black/[0.15]"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-md flex items-center justify-center",
                                            isDark ? "bg-white/5" : "bg-gray-100",
                                            node.color
                                        )}>
                                            <node.icon className="w-4 h-4" weight="duotone" />
                                        </div>
                                        <span className="text-sm text-text-secondary">{node.label}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Canvas area with nodes */}
                            <div className="flex-1 relative overflow-hidden">
                                {/* Dot grid */}
                                <div
                                    className="absolute inset-0 opacity-30"
                                    style={{
                                        backgroundImage: isDark
                                            ? `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`
                                            : `radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)`,
                                        backgroundSize: '24px 24px',
                                    }}
                                />

                                {/* Sample workflow nodes */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    {/* Connection line 1 */}
                                    <motion.path
                                        d="M 180 100 C 250 100, 270 180, 340 180"
                                        stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}
                                        strokeWidth="2"
                                        fill="none"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1, delay: 1.2 }}
                                    />
                                    {/* Connection line 2 */}
                                    <motion.path
                                        d="M 500 180 C 570 180, 590 260, 660 260"
                                        stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}
                                        strokeWidth="2"
                                        fill="none"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1, delay: 1.4 }}
                                    />
                                </svg>

                                {/* Node 1 - Trigger */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.9, type: "spring" }}
                                    className="absolute left-8 top-12 w-44"
                                >
                                    <div className={cn(
                                        "p-3 rounded-xl border group",
                                        isDark ? "bg-surface border-white/[0.08]" : "bg-white border-black/[0.08] shadow-sm"
                                    )}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-text-primary">Webhook Trigger</span>
                                            <DotsThree className="w-4 h-4 text-text-tertiary" />
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={cn(
                                                "w-6 h-6 rounded-md flex items-center justify-center",
                                                isDark ? "bg-white/5" : "bg-gray-100"
                                            )}>
                                                <Plugs className="w-3.5 h-3.5 text-violet-500" />
                                            </div>
                                            <span className="text-[10px] text-text-tertiary">webhook</span>
                                        </div>
                                        <div className="text-[10px] text-pink-500 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-pink-500" style={{ boxShadow: '0 0 8px rgba(236, 72, 153, 0.6)' }} />
                                            RECEIVE DATA
                                        </div>
                                        {/* Output dot */}
                                        <div className={cn(
                                            "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-pink-500 border-2",
                                            isDark ? "border-surface" : "border-white"
                                        )} style={{ boxShadow: '0 0 10px rgba(236, 72, 153, 0.6)' }} />
                                    </div>
                                </motion.div>

                                {/* Node 2 - Action */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.1, type: "spring" }}
                                    className="absolute left-52 top-32 w-44"
                                >
                                    <div className={cn(
                                        "p-3 rounded-xl border-primary/30",
                                        isDark
                                            ? "bg-surface shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                                            : "bg-white shadow-lg border border-primary/30"
                                    )}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-text-primary">Send Email</span>
                                            <DotsThree className="w-4 h-4 text-text-tertiary" />
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={cn(
                                                "w-6 h-6 rounded-md flex items-center justify-center",
                                                isDark ? "bg-white/5" : "bg-gray-100"
                                            )}>
                                                <Envelope className="w-3.5 h-3.5 text-emerald-500" />
                                            </div>
                                            <span className="text-[10px] text-text-tertiary">action</span>
                                        </div>
                                        <div className="text-[10px] text-emerald-500 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />
                                            SEND EMAIL
                                        </div>
                                        {/* Input dot */}
                                        <div className={cn(
                                            "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 border-2",
                                            isDark ? "border-surface" : "border-white"
                                        )} style={{ boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)' }} />
                                        {/* Output dot */}
                                        <div className={cn(
                                            "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 border-2",
                                            isDark ? "border-surface" : "border-white"
                                        )} style={{ boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)' }} />
                                    </div>
                                </motion.div>

                                {/* Node 3 - Code */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.3, type: "spring" }}
                                    className="absolute right-8 top-48 w-44"
                                >
                                    <div className={cn(
                                        "p-3 rounded-xl border",
                                        isDark ? "bg-surface border-white/[0.08]" : "bg-white border-black/[0.08] shadow-sm"
                                    )}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-text-primary">Transform Data</span>
                                            <DotsThree className="w-4 h-4 text-text-tertiary" />
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={cn(
                                                "w-6 h-6 rounded-md flex items-center justify-center",
                                                isDark ? "bg-white/5" : "bg-gray-100"
                                            )}>
                                                <Code className="w-3.5 h-3.5 text-amber-500" />
                                            </div>
                                            <span className="text-[10px] text-text-tertiary">function</span>
                                        </div>
                                        <div className="text-[10px] text-amber-500 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" style={{ boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)' }} />
                                            PROCESS DATA
                                        </div>
                                        {/* Input dot */}
                                        <div className={cn(
                                            "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-500 border-2",
                                            isDark ? "border-surface" : "border-white"
                                        )} style={{ boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)' }} />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Chat sidebar */}
                            <div className={cn(
                                "w-72 border-l flex-col hidden lg:flex",
                                isDark ? "border-white/[0.08] bg-surface/30" : "border-black/[0.08] bg-gray-50/50"
                            )}>
                                <div className={cn(
                                    "p-4 border-b",
                                    isDark ? "border-white/[0.08]" : "border-black/[0.08]"
                                )}>
                                    <div className="flex items-center gap-2">
                                        <Robot className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-medium text-text-primary">AI Assistant</span>
                                    </div>
                                </div>
                                <div className="flex-1 p-4 space-y-3 overflow-hidden">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.5 }}
                                        className="p-3 rounded-lg bg-primary/10 border border-primary/20"
                                    >
                                        <p className="text-xs text-text-secondary leading-relaxed">
                                            "Create a workflow that sends an email when a form is submitted"
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.8 }}
                                        className={cn(
                                            "p-3 rounded-lg border",
                                            isDark ? "bg-white/5 border-white/[0.08]" : "bg-white border-black/[0.08]"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                                <Robot className="w-3 h-3 text-primary" />
                                            </div>
                                            <span className="text-[10px] text-text-tertiary">FlowAI</span>
                                        </div>
                                        <p className="text-xs text-text-secondary leading-relaxed">
                                            I've created a 3-node workflow with a webhook trigger, email action, and data transformer. Ready to deploy!
                                        </p>
                                    </motion.div>
                                </div>
                                <div className={cn(
                                    "p-3 border-t",
                                    isDark ? "border-white/[0.08]" : "border-black/[0.08]"
                                )}>
                                    <div className={cn(
                                        "flex items-center gap-2 p-2 rounded-lg border",
                                        isDark ? "bg-white/5 border-white/[0.08]" : "bg-white border-black/[0.08]"
                                    )}>
                                        <input
                                            type="text"
                                            placeholder="Ask AI to build..."
                                            className="flex-1 bg-transparent text-xs text-text-primary placeholder:text-text-tertiary outline-none"
                                            readOnly
                                        />
                                        <PaperPlaneRight className="w-4 h-4 text-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ==================== PRODUCTIVITY FEATURES ==================== */}
            <section id="productivity" className={cn(
                "relative z-10 py-24 px-4 border-t",
                isDark ? "border-white/5" : "border-black/5"
            )}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Productivity</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4 font-serif">
                            Supercharge your workflow
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Every feature is designed to help you automate faster, smarter, and with less effort.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Robot,
                                title: 'AI-First Design',
                                desc: 'Just describe what you want to automate. Our AI builds the workflow for you.',
                                color: 'text-pink-500',
                                glow: isDark ? 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]' : ''
                            },
                            {
                                icon: GitBranch,
                                title: 'Visual Flow Builder',
                                desc: 'Drag, drop, and connect nodes with an intuitive interface. No code required.',
                                color: 'text-emerald-500',
                                glow: isDark ? 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]' : ''
                            },
                            {
                                icon: Lightning,
                                title: 'Instant Execution',
                                desc: 'Run workflows in milliseconds with our optimized execution engine.',
                                color: 'text-amber-500',
                                glow: isDark ? 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]' : ''
                            },
                            {
                                icon: Clock,
                                title: 'Smart Scheduling',
                                desc: 'Set up cron jobs, delays, and conditional triggers with ease.',
                                color: 'text-cyan-500',
                                glow: isDark ? 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]' : ''
                            },
                            {
                                icon: Plugs,
                                title: '500+ Integrations',
                                desc: 'Connect with all your favorite tools—from Slack to Salesforce.',
                                color: 'text-violet-500',
                                glow: isDark ? 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]' : ''
                            },
                            {
                                icon: ShieldCheck,
                                title: 'Enterprise Security',
                                desc: 'Bank-grade encryption, SSO, and compliance built in from day one.',
                                color: 'text-blue-500',
                                glow: isDark ? 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={cn(
                                    "group p-6 rounded-xl bg-surface border transition-all duration-300",
                                    isDark
                                        ? "border-white/[0.08] hover:border-white/[0.15]"
                                        : "border-black/[0.08] hover:border-black/[0.15] shadow-sm hover:shadow-md",
                                    feature.glow
                                )}
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-lg border flex items-center justify-center mb-4",
                                    isDark ? "bg-white/5 border-white/[0.08]" : "bg-gray-100 border-black/[0.08]",
                                    feature.color
                                )}>
                                    <feature.icon className="w-5 h-5" weight="duotone" />
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== KEY CAPABILITIES ==================== */}
            <section className={cn(
                "relative z-10 py-24 px-4 border-t",
                isDark ? "border-white/5 bg-surface/30" : "border-black/5 bg-gray-50/50"
            )}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Capabilities</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4 font-serif">
                            Everything you need to automate
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            From simple tasks to complex multi-step workflows, we've got you covered.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left: Large feature card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "p-8 rounded-xl bg-surface border transition-all",
                                isDark
                                    ? "border-white/[0.08] hover:border-white/[0.15]"
                                    : "border-black/[0.08] hover:border-black/[0.15] shadow-sm"
                            )}
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 border border-primary/20 flex items-center justify-center mb-6">
                                <Brain className="w-6 h-6 text-primary" weight="duotone" />
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4">
                                AI That Understands Context
                            </h3>
                            <p className="text-text-secondary mb-6 leading-relaxed">
                                Our AI doesn't just follow instructions—it understands your business context.
                                It learns from your workflows, suggests optimizations, and automatically
                                handles edge cases you haven't thought of.
                            </p>
                            <ul className="space-y-3">
                                {['Natural language workflow creation', 'Smart error handling & recovery', 'Automatic performance optimization', 'Context-aware suggestions'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                                        <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-primary" weight="bold" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Right: Stacked feature cards */}
                        <div className="space-y-6">
                            {[
                                {
                                    icon: Rocket,
                                    title: 'One-Click Deploy',
                                    desc: 'Go from idea to production in minutes. No infrastructure to manage.',
                                    accent: 'from-emerald-500/20 to-cyan-500/20',
                                    iconColor: 'text-emerald-500'
                                },
                                {
                                    icon: ChartLineUp,
                                    title: 'Real-Time Analytics',
                                    desc: 'Monitor every execution with detailed logs, metrics, and insights.',
                                    accent: 'from-amber-500/20 to-orange-500/20',
                                    iconColor: 'text-amber-500'
                                },
                                {
                                    icon: GitBranch,
                                    title: 'Version Control',
                                    desc: 'Track changes, roll back anytime, and collaborate with your team.',
                                    accent: 'from-violet-500/20 to-pink-500/20',
                                    iconColor: 'text-violet-500'
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={cn(
                                        "p-6 rounded-xl bg-surface border transition-all flex gap-5",
                                        isDark
                                            ? "border-white/[0.08] hover:border-white/[0.15]"
                                            : "border-black/[0.08] hover:border-black/[0.15] shadow-sm"
                                    )}
                                >
                                    <div className={cn(
                                        "w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br border flex items-center justify-center",
                                        item.accent,
                                        isDark ? "border-white/[0.08]" : "border-black/[0.08]"
                                    )}>
                                        <item.icon className={`w-6 h-6 ${item.iconColor}`} weight="duotone" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-text-primary mb-1">{item.title}</h4>
                                        <p className="text-sm text-text-secondary">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== METRICS ==================== */}
            <section className={cn(
                "relative z-10 py-24 px-4 border-t",
                isDark ? "border-white/5" : "border-black/5"
            )}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">By the Numbers</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-3 font-serif">
                            Trusted by thousands of teams
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '10M+', label: 'Workflows Executed', icon: Lightning },
                            { value: '99.9%', label: 'Uptime SLA', icon: Gauge },
                            { value: '500+', label: 'Integrations', icon: Plugs },
                            { value: '<50ms', label: 'Avg Response Time', icon: Timer }
                        ].map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "p-6 rounded-xl bg-surface border text-center",
                                    isDark ? "border-white/[0.08]" : "border-black/[0.08] shadow-sm"
                                )}
                            >
                                <metric.icon className="w-6 h-6 text-primary mx-auto mb-3" weight="duotone" />
                                <div className="text-3xl sm:text-4xl font-bold text-text-primary mb-1">{metric.value}</div>
                                <div className="text-sm text-text-secondary">{metric.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== PRICING ==================== */}
            <section id="pricing" className={cn(
                "relative z-10 py-24 px-4 border-t",
                isDark ? "border-white/5 bg-surface/30" : "border-black/5 bg-gray-50/50"
            )}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Pricing</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4 font-serif">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Start free, scale as you grow. No hidden fees, no surprises.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                name: 'Starter',
                                price: '$0',
                                period: 'forever',
                                desc: 'Perfect for side projects and experiments',
                                features: ['100 workflow runs/month', '5 active workflows', 'Community support', 'Basic integrations'],
                                cta: 'Get Started',
                                popular: false
                            },
                            {
                                name: 'Pro',
                                price: '$29',
                                period: '/month',
                                desc: 'For growing teams and businesses',
                                features: ['Unlimited workflow runs', 'Unlimited workflows', 'Priority support', 'All integrations', 'Team collaboration', 'Advanced analytics'],
                                cta: 'Start Free Trial',
                                popular: true
                            },
                            {
                                name: 'Enterprise',
                                price: 'Custom',
                                period: '',
                                desc: 'For large organizations with custom needs',
                                features: ['Everything in Pro', 'SSO & SAML', 'Dedicated support', 'Custom integrations', 'SLA guarantee', 'On-premise option'],
                                cta: 'Contact Sales',
                                popular: false
                            }
                        ].map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "relative p-6 rounded-xl border transition-all",
                                    plan.popular
                                        ? isDark
                                            ? 'bg-surface border-primary/30 shadow-[0_0_40px_rgba(99,102,241,0.1)]'
                                            : 'bg-white border-primary shadow-lg'
                                        : isDark
                                            ? 'bg-surface border-white/[0.08] hover:border-white/[0.15]'
                                            : 'bg-white border-black/[0.08] hover:border-black/[0.15] shadow-sm'
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-xs font-semibold text-white rounded-full">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-text-primary mb-1">{plan.name}</h3>
                                    <p className="text-sm text-text-secondary mb-4">{plan.desc}</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                                        <span className="text-text-secondary">{plan.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                                            <Check className="w-4 h-4 text-primary shrink-0" weight="bold" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={plan.popular ? 'primary' : 'outline'}
                                    className="w-full"
                                >
                                    {plan.cta}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== FAQ ==================== */}
            <section id="faq" className={cn(
                "relative z-10 py-24 px-4 border-t",
                isDark ? "border-white/5" : "border-black/5"
            )}>
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">FAQ</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4 font-serif">
                            Frequently Asked Questions
                        </h2>
                    </motion.div>

                    <div className="space-y-3">
                        {[
                            {
                                q: "How does the AI workflow builder work?",
                                a: "Simply describe what you want to automate in plain English. Our AI analyzes your request, breaks it down into logical steps, and creates a visual workflow you can review and customize. No coding required."
                            },
                            {
                                q: "Can I migrate my existing workflows from Zapier or Make.com?",
                                a: "Yes! We provide one-click migration tools for Zapier, Make.com, and n8n. Most workflows transfer seamlessly, and our team is available to help with complex migrations."
                            },
                            {
                                q: "Is there a free tier?",
                                a: "Absolutely. Our Starter plan is free forever and includes 100 workflow runs per month, 5 active workflows, and access to basic integrations. Perfect for getting started."
                            },
                            {
                                q: "What kind of support do you offer?",
                                a: "Starter plans get community support via our Discord. Pro plans include priority email support with <4 hour response times. Enterprise customers get dedicated account managers and 24/7 phone support."
                            },
                            {
                                q: "Is my data secure?",
                                a: "Security is our top priority. We're SOC 2 Type II certified, encrypt all data at rest and in transit, and never store your credentials. Enterprise plans include additional security features like SSO and audit logs."
                            },
                            {
                                q: "Can I self-host FlowAI?",
                                a: "Yes, our Enterprise plan includes a self-hosted option. Deploy on your own infrastructure with full control over your data. We provide Docker images and Kubernetes Helm charts."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={cn(
                                    "rounded-xl bg-surface border overflow-hidden",
                                    isDark ? "border-white/[0.08]" : "border-black/[0.08] shadow-sm"
                                )}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className={cn(
                                        "w-full px-6 py-4 flex items-center justify-between text-left transition-colors",
                                        isDark ? "hover:bg-white/[0.02]" : "hover:bg-black/[0.02]"
                                    )}
                                >
                                    <span className="font-medium text-text-primary">{faq.q}</span>
                                    <CaretDown
                                        className={`w-5 h-5 text-text-secondary transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: openFaq === index ? 'auto' : 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4 text-sm text-text-secondary leading-relaxed">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA ==================== */}
            <section className={cn(
                "relative z-10 py-24 px-4 border-t",
                isDark ? "border-white/5 bg-surface/30" : "border-black/5 bg-gray-50/50"
            )}>
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-5xl font-bold text-text-primary mb-6 font-serif">
                            Ready to automate your <span className="italic">work</span>?
                        </h2>
                        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                            Join thousands of teams who've already transformed their workflows.
                            Start free, no credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register">
                                <Button size="lg" className="h-12 px-8 text-base">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Link to="/chat">
                                <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
                                    Talk to Sales
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className={cn(
                "relative z-10 py-12 px-4 border-t",
                isDark ? "border-white/5" : "border-black/5"
            )}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <img
                            src="/badge.svg"
                            alt="AutoM8 Logo"
                            className="w-8 h-8 rounded-lg"
                        />
                        <span className="font-semibold text-text-primary">AutoM8</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-text-secondary">
                        <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-text-primary transition-colors">Docs</a>
                        <a href="#" className="hover:text-text-primary transition-colors">Blog</a>
                    </div>
                    <div className="text-sm text-text-tertiary">
                        © 2024 AutoM8. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};
