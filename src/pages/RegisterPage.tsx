import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GoogleLogo, GithubLogo, Eye, EyeSlash } from '@phosphor-icons/react';
import FaultyTerminal from '../components/FaultyTerminal';

const TERMINAL_CONFIG = {
    scale: 1.5,
    gridMul: [2, 1] as [number, number],
    digitSize: 1.2,
    timeScale: 0.5,
    pause: false,
    scanlineIntensity: 0.2,
    glitchAmount: 0.5,
    flickerAmount: 0.3,
    noiseAmp: 0.8,
    chromaticAberration: 0.05,
    dither: 0.1,
    curvature: 0.1,
    tint: "#6366f1",
    mouseReact: true,
    mouseStrength: 0.4,
    pageLoadAnimation: true,
    brightness: 0.8,
};

export function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration delay
        setTimeout(() => {
            setIsLoading(false);
            import('../lib/auth').then(({ auth }) => {
                auth.login({ name, email });
                navigate('/projects');
            });
        }, 1500);
    };

    return (
        <div className="w-full h-screen bg-surface flex overflow-hidden">
            {/* Left Panel - Form */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-24 flex flex-col justify-between bg-surface relative z-10 overflow-y-auto">
                <div className="max-w-md w-full mx-auto flex flex-col h-full justify-center">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight w-fit hover:opacity-80 transition-opacity mb-12 absolute top-8 left-8 sm:left-12">
                        <img
                            src="/badge.svg"
                            alt="AutoM8 Logo"
                            className="w-8 h-8 rounded-lg"
                        />
                        <span className="text-text-primary">AutoM8</span>
                    </Link>

                    <div className="space-y-6 mt-16 sm:mt-0">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold font-serif text-text-primary">Create an account</h1>
                            <p className="text-text-secondary">Enter your information to get started.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                                <GoogleLogo className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                            <Button variant="outline" className="w-full">
                                <GithubLogo className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-[var(--card-border)]" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-surface px-2 text-text-secondary">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-4">
                            <Input
                                label="Full Name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="relative">
                                <Input
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-[34px] text-text-tertiary hover:text-text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeSlash className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                                Create account
                            </Button>
                        </form>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-text-secondary">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:underline font-medium hover:text-primary-hover transition-colors">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-text-tertiary">
                    <span className="cursor-pointer hover:text-text-primary mr-4">Help</span>
                    <span className="cursor-pointer hover:text-text-primary mr-4">Terms</span>
                    <span className="cursor-pointer hover:text-text-primary">Privacy</span>
                </div>
            </div>

            {/* Right Panel - Visual */}
            <div className="hidden lg:block w-1/2 relative bg-black h-full">
                <div className="absolute inset-0">
                    <FaultyTerminal
                        {...TERMINAL_CONFIG}
                    />
                </div>
                {/* Optional Overlay to ensure text readability if we added any, or just aesthetic darkening */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                <div className="absolute bottom-12 left-12 right-12 text-white z-10 pointer-events-none p-12">
                    <h2 className="text-4xl font-bold mb-4 font-serif">Automate your workflow</h2>
                    <p className="text-white/70 text-lg max-w-md">Join thousands of developers building the future with AutoM8.</p>
                </div>
            </div>
        </div>
    );
}
