import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { User, EnvelopeSimple, Lock } from '@phosphor-icons/react';
import { auth, type User as UserType } from '../lib/auth';

export const AccountSettingsPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const currentUser = auth.getUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }
        setUser(currentUser);
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [navigate]);

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (user) {
                const updatedUser = { ...user, name, email };
                auth.login(updatedUser); // Update local storage
                setUser(updatedUser);
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-text-primary mb-2">
                        Account Settings
                    </h1>
                    <p className="text-text-secondary">
                        Manage your personal information and security.
                    </p>
                </motion.div>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your public profile details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <Input
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                icon={User}
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                icon={EnvelopeSimple}
                            />
                            <div className="flex justify-end pt-2">
                                <Button type="submit" isLoading={isLoading}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>Change your password to keep your account secure.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); /* Handle password change */ }}>
                            <Input
                                label="Current Password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="••••••••"
                                icon={Lock}
                            />
                            <Input
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                icon={Lock}
                            />
                            <div className="flex justify-end pt-2">
                                <Button variant="outline" type="submit" disabled={!currentPassword || !newPassword}>
                                    Update Password
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
