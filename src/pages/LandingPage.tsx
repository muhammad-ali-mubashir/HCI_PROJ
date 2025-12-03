import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Layers, Activity } from 'lucide-react';
import { HeroCanvas } from '../components/HeroCanvas';

export const LandingPage = () => {
    return (
        <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
            <HeroCanvas />

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-500 dark:to-pink-500 drop-shadow-lg">
                        Automate Your World
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                        Experience the future of workflow automation. Visualize, build, and execute complex tasks with a stunning, interactive interface.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/chat">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center gap-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-shadow"
                            >
                                Start Automating <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>

                        <Link to="/builder">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-full font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2 shadow-lg dark:shadow-none"
                            >
                                Manual Builder
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Zap, title: "Instant Generation", desc: "Turn natural language into complex workflows in seconds." },
                        { icon: Layers, title: "Visual Builder", desc: "Drag, drop, and connect nodes with intuitive physics." },
                        { icon: Activity, title: "Live Simulation", desc: "Watch your data flow in real-time with particle effects." }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.2 }}
                            className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors shadow-xl dark:shadow-none"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
