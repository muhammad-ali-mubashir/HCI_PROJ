import React from 'react';
import { Layout } from '../components/Layout';

export const TermsPage = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold text-text-primary mb-8 font-serif">Terms of Service</h1>
                <div className="prose dark:prose-invert max-w-none text-text-secondary">
                    <p className="mb-4">Last updated: December 15, 2024</p>
                    <p className="mb-6">
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the AutoM8 website
                        and application (the "Service") operated by AutoM8 ("us", "we", or "our").
                    </p>

                    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p className="mb-6">
                        By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part
                        of the terms then you may not access the Service.
                    </p>

                    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">2. Accounts</h2>
                    <p className="mb-6">
                        When you create an account with us, you must provide us information that is accurate, complete, and current at all times.
                        Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>

                    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">3. Intellectual Property</h2>
                    <p className="mb-6">
                        The Service and its original content, features, and functionality are and will remain the exclusive property of AutoM8 and its licensors.
                        The Service is protected by copyright, trademark, and other laws of both the country and foreign countries.
                    </p>

                    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">4. Termination</h2>
                    <p className="mb-6">
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever,
                        including without limitation if you breach the Terms.
                    </p>

                    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">5. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at support@autom8.dev.
                    </p>
                </div>
            </div>
        </Layout>
    );
};
