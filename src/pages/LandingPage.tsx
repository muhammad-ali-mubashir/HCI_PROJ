import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Layers, Activity, Sparkles, Clock, Users, CheckCircle2 } from 'lucide-react';
import { HeroCanvas } from '../components/HeroCanvas';

export const LandingPage = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#FDFCFA] via-[#F5F1E8] to-[#E8DCC4]">
            {/* Subtle 3D Background */}
            <div className="absolute inset-0 opacity-30">
                <HeroCanvas />
            </div>

            {/* Hero Section */}
            <div className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#E5E0D8] rounded-full mb-8 shadow-lg"
                    >
                        <Sparkles className="w-4 h-4 text-[#D4A574]" />
                        <span className="text-sm font-medium text-[#6B5444]">
                            AI-Powered Workflow Automation
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-[#1E293B] leading-[1.1]"
                    >
                        Build Workflows That
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B7355] via-[#D4A574] to-[#B8935C]">
                            Work Like Magic
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg sm:text-xl text-[#475569] mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        Transform natural language into powerful automation workflows.
                        Visualize, build, and execute complex tasks with our stunning visual interface.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <Link to="/chat">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="group px-10 py-5 bg-gradient-to-r from-[#8B7355] to-[#6B5444] rounded-2xl font-bold text-lg text-white shadow-[0_8px_30px_rgba(107,84,68,0.25)] flex items-center gap-3 hover:shadow-[0_12px_40px_rgba(107,84,68,0.35)] transition-all duration-300"
                            >
                                Start Automating
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>

                        <Link to="/builder">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-5 bg-white/90 backdrop-blur-sm border-2 border-[#E5E0D8] rounded-2xl font-bold text-lg text-[#1E293B] shadow-lg hover:border-[#D4A574] hover:shadow-xl transition-all duration-300"
                            >
                                Explore Builder
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                    >
                        {[
                            { value: '10K+', label: 'Workflows Created' },
                            { value: '50+', label: 'Integrations' },
                            { value: '99.9%', label: 'Uptime' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-black text-[#8B7355] mb-1">{stat.value}</div>
                                <div className="text-sm text-[#64748B] font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="relative z-10 py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-black text-[#1E293B] mb-4">
                            Everything You Need
                        </h2>
                        <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
                            Powerful features designed to make automation simple and delightful
                        </p>
                    </motion.div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Zap,
                                title: 'Instant Generation',
                                desc: 'Turn natural language into complex workflows in seconds using AI.',
                                color: 'from-[#D4A574] to-[#B8935C]',
                                delay: 0
                            },
                            {
                                icon: Layers,
                                title: 'Visual Builder',
                                desc: 'Drag, drop, and connect nodes with smooth physics and animations.',
                                color: 'from-[#8B7355] to-[#6B5444]',
                                delay: 0.2
                            },
                            {
                                icon: Activity,
                                title: 'Live Simulation',
                                desc: 'Watch your data flow in real-time with beautiful particle effects.',
                                color: 'from-[#B8935C] to-[#8B7355]',
                                delay: 0.4
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: feature.delay, duration: 0.6 }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-[#E5E0D8] hover:border-[#D4A574] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Hover Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                                <div className="relative">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        <feature.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#1E293B] mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[#64748B] leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="relative z-10 py-24 px-4 bg-gradient-to-b from-transparent to-white/50">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-black text-[#1E293B] mb-4">
                            Why Choose AutoM8?
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { icon: CheckCircle2, text: 'No coding required - just describe what you want' },
                            { icon: Clock, text: 'Save hours every week with smart automation' },
                            { icon: Users, text: 'Collaborate with your team in real-time' },
                            { icon: Sparkles, text: 'AI-powered suggestions and optimizations' }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex items-start gap-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#E5E0D8] hover:border-[#D4A574] transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-[#D4A574] to-[#8B7355] rounded-xl flex items-center justify-center flex-shrink-0">
                                    <benefit.icon className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-[#475569] font-medium leading-relaxed pt-1">
                                    {benefit.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="relative z-10 py-24 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#8B7355] to-[#6B5444] rounded-3xl p-12 sm:p-16 shadow-2xl"
                >
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                        Ready to Automate Your Workflow?
                    </h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of users who are saving time and boosting productivity
                    </p>
                    <Link to="/chat">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-5 bg-white rounded-2xl font-bold text-lg text-[#6B5444] shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            Get Started Free
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
