import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Envelope, Lock, ArrowRight, User } from '@phosphor-icons/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { HeroCanvas } from '../components/HeroCanvas';

export function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration delay
        setTimeout(() => {
            setIsLoading(false);
            navigate('/home');
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden p-4">
            <HeroCanvas />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md z-10"
            >
                <Card variant="glass" className="p-8">
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="flex justify-center mb-6"
                        >
                            <img 
                                src="/badge.svg" 
                                alt="AutoM8 Logo" 
                                className="w-16 h-16 rounded-2xl"
                            />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-text-primary mb-2">Create Account</h1>
                        <p className="text-text-secondary">Join us and start automating</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-text-tertiary" />
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Envelope className="absolute left-3 top-3 w-4 h-4 text-text-tertiary" />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-text-tertiary" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-text-tertiary" />
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full"
                            size="lg"
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-text-secondary">
                            Already have an account?{' '}
                            <Link to="/" className="text-primary hover:text-primary-hover font-medium transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
