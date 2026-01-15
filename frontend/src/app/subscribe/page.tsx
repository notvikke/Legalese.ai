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

    const handleSubscribe = async (plan: 'monthly' | 'weekly') => {
        if (!isSignedIn) {
            openSignIn({
                redirectUrl: '/subscribe',
            });
            return;
        }

        if (!userId) return;

        setIsLoading(true);
        try {
            const body = new URLSearchParams();
            body.append('user_id', userId);
            body.append('product_type', plan);

            const res = await fetch(API_ENDPOINTS.createCheckoutSession, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body
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

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Free Plan */}
                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">Free Trial</h3>
                        <div className="text-3xl font-bold text-white mb-4">
                            $0<span className="text-base text-slate-400 font-normal">/forever</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start gap-2 text-slate-300 text-sm">
                                <span className="text-green-400 mt-0.5">✓</span>
                                <span>3 document analyses</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-300 text-sm">
                                <span className="text-green-400 mt-0.5">✓</span>
                                <span>Full risk detection</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-400 text-sm">
                                <span className="text-slate-600 mt-0.5">✗</span>
                                <span>Unlimited documents</span>
                            </li>
                        </ul>
                        <button
                            onClick={handleFreePlan}
                            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* 1-Week Pass */}
                    <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 relative flex flex-col shadow-lg shadow-purple-900/20">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                            MOST FLEXIBLE
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">1-Week Pro Pass</h3>
                        <div className="text-3xl font-bold text-white mb-4">
                            $10<span className="text-base text-slate-400 font-normal">/one-time</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">7 Days of Unlimited AI Power. No Subscriptions. No Hassle.</p>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start gap-2 text-white text-sm">
                                <span className="text-purple-400 mt-0.5">✓</span>
                                <span><strong>Instant Access</strong> to Pro tools</span>
                            </li>
                            <li className="flex items-start gap-2 text-white text-sm">
                                <span className="text-purple-400 mt-0.5">✓</span>
                                <span>Unlimited Analysis & Re-writes</span>
                            </li>
                            <li className="flex items-start gap-2 text-white text-sm">
                                <span className="text-purple-400 mt-0.5">✓</span>
                                <span>Auto-expires (No Cancellation needed)</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => handleSubscribe('weekly')}
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all disabled:opacity-50"
                        >
                            {isLoading ? '...' : 'Buy Pass'}
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl border-2 border-blue-400 relative flex flex-col shadow-xl">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-3 py-0.5 rounded-full text-xs font-bold">
                            BEST VALUE
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Monthly Pro</h3>
                        <div className="text-3xl font-bold text-white mb-4">
                            $15<span className="text-base text-blue-200 font-normal">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start gap-2 text-white text-sm">
                                <span className="text-yellow-300 mt-0.5">✓</span>
                                <span><strong>Unlimited</strong> access</span>
                            </li>
                            <li className="flex items-start gap-2 text-white text-sm">
                                <span className="text-yellow-300 mt-0.5">✓</span>
                                <span>Priority support</span>
                            </li>
                            <li className="flex items-start gap-2 text-white text-sm">
                                <span className="text-yellow-300 mt-0.5">✓</span>
                                <span>Clause rewriting</span>
                            </li>
                            <li className="flex items-start gap-2 text-white text-sm">
                                <span className="text-yellow-300 mt-0.5">✓</span>
                                <span>Cancel anytime</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => handleSubscribe('monthly')}
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50"
                        >
                            {isLoading ? 'Loading...' : 'Subscribe'}
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
