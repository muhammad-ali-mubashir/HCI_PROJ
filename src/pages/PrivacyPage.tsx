import React from 'react';
import { Layout } from '../components/Layout';

export const PrivacyPage = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold text-text-primary mb-8 font-serif">Privacy Policy</h1>
                <div className="prose dark:prose-invert max-w-none text-text-secondary">
                    <p className="mb-4">Last updated: December 15, 2024</p>
                    <p className="mb-6">
                        At AutoM8, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                        disclose, and safeguard your information when you visit our website or use our application.
                    </p>

                    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Information We Collect</h2>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Personal Data:</strong> Name, email address, and other information you voluntarily give to us when registering.</li>
                        <li><strong>Usage Data:</strong> Information automatically collected when you access and use the Service, such as IP address, browser type, and operating system.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">How We Use Your Information</h2>
                    <p className="mb-6">
                        We use the information we collect to operate, maintain, and improve our services, communicate with you,
                        and comply with legal obligations.
                    </p>

                    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Data Security</h2>
                    <p className="mb-6">
                        We use administrative, technical, and physical security measures to help protect your personal information.
                        While we have taken reasonable steps to secure the personal information you provide to us, please be aware
                        that despite our efforts, no security measures are perfect or impenetrable.
                    </p>

                    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Contact Us</h2>
                    <p>
                        If you have questions or comments about this Privacy Policy, please contact us at support@autom8.dev.
                    </p>
                </div>
            </div>
        </Layout>
    );
};
