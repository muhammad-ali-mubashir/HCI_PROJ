import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Layers, Activity, Sparkles } from 'lucide-react';
import { HeroCanvas } from '../components/HeroCanvas';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const LandingPage = () => {
    return (
        <div className="relative min-h-screen bg-background overflow-hidden">
            <HeroCanvas />

            {/* Hero Section */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                            AI-Powered Workflow Automation
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-text-primary"
                    >
                        Build workflows that <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
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
                        <Link to="/chat">
                            <Button size="lg" className="h-12 px-8 text-base">
                                Start Automating
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>

                        <Link to="/builder">
                            <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
                                Explore Builder
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="relative z-10 py-24 px-4 border-t border-white/5 bg-surface/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: 'Instant Generation',
                                desc: 'Turn natural language into complex workflows in seconds using AI.'
                            },
                            {
                                icon: Layers,
                                title: 'Visual Builder',
                                desc: 'Drag, drop, and connect nodes with smooth physics and animations.'
                            },
                            {
                                icon: Activity,
                                title: 'Live Simulation',
                                desc: 'Watch your data flow in real-time with beautiful visualization.'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Card className="h-full p-6 hover:bg-white/5 transition-colors duration-300">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
