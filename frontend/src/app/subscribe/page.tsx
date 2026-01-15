'use client';

import { useAuth, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { API_ENDPOINTS } from '@/config/api';

export default function SubscribePage() {
    const { userId, isSignedIn } = useAuth();
    const { openSignIn } = useClerk();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleFreePlan = () => {
        if (isSignedIn) {
            router.push('/dashboard');
        } else {
            openSignIn({
                redirectUrl: '/dashboard',
            });
        }
    };

    const handleSubscribe = async () => {
        if (!isSignedIn) {
            openSignIn({
                redirectUrl: '/subscribe', // Return here after sign in to complete purchase
            });
            return;
        }

        if (!userId) return;

        setIsLoading(true);
        try {
            const res = await fetch(API_ENDPOINTS.createCheckoutSession, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ user_id: userId })
            });

            const data = await res.json();
            if (data.checkout_url) {
                window.location.href = data.checkout_url;
            } else {
                alert('Could not start checkout. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error starting checkout');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
                    <p className="text-xl text-slate-300">Start free, upgrade when you need more</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Free Plan */}
                    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
                        <h3 className="text-2xl font-bold text-white mb-2">Free Trial</h3>
                        <div className="text-4xl font-bold text-white mb-6">
                            $0<span className="text-lg text-slate-400">/forever</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-2 text-slate-300">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>1 document analysis</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-300">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>Full risk detection</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-300">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>PDF & DOCX support</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-400">
                                <span className="text-slate-600 mt-1">✗</span>
                                <span>Unlimited documents</span>
                            </li>
                        </ul>
                        <button
                            onClick={handleFreePlan}
                            className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
                        >
                            Get Started Free
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl border-2 border-blue-400 relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                            RECOMMENDED
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                        <div className="text-4xl font-bold text-white mb-6">
                            $15<span className="text-lg text-blue-200">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-2 text-white">
                                <span className="text-yellow-300 mt-1">✓</span>
                                <span><strong>Unlimited</strong> document analysis</span>
                            </li>
                            <li className="flex items-start gap-2 text-white">
                                <span className="text-yellow-300 mt-1">✓</span>
                                <span>Full risk detection</span>
                            </li>
                            <li className="flex items-start gap-2 text-white">
                                <span className="text-yellow-300 mt-1">✓</span>
                                <span>PDF & DOCX support</span>
                            </li>
                            <li className="flex items-start gap-2 text-white">
                                <span className="text-yellow-300 mt-1">✓</span>
                                <span>Priority support</span>
                            </li>
                        </ul>
                        <button
                            onClick={handleSubscribe}
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Loading...' : 'Upgrade to Premium'}
                        </button>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4 text-left max-w-2xl mx-auto">
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
                            <h4 className="font-semibold text-white mb-2">Can I cancel anytime?</h4>
                            <p className="text-slate-400">Yes! Cancel your subscription anytime. No long-term commitments.</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
                            <h4 className="font-semibold text-white mb-2">What file formats do you support?</h4>
                            <p className="text-slate-400">We support PDF and DOCX (Microsoft Word) files.</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
                            <h4 className="font-semibold text-white mb-2">Is my data secure?</h4>
                            <p className="text-slate-400">Yes! All documents are encrypted and stored securely. We never share your data.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
