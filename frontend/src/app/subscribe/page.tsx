'use client';

import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SubscribePage() {
    const { userId } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        if (!userId) {
            router.push('/sign-in');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ user_id: userId })
            });

            const data = await res.json();
            if (data.checkout_url) {
                // Redirect to Dodo Payments checkout
                window.location.href = data.checkout_url;
            } else {
                alert('Could not initiate checkout. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Checkout failed. Please ensure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-white mb-4">
                        Upgrade to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Pro</span>
                    </h1>
                    <p className="text-xl text-slate-400">Unlimited contract analysis. Advanced AI insights. Priority support.</p>
                </div>

                {/* Pricing Card */}
                <div className="relative group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>

                    <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-10 shadow-2xl">
                        {/* Badge */}
                        <div className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                            <span className="text-sm font-semibold text-blue-400">MOST POPULAR</span>
                        </div>

                        {/* Plan Name */}
                        <h2 className="text-3xl font-bold text-white mb-2">Pro Plan</h2>
                        <p className="text-slate-400 mb-8">For professionals and teams who need unlimited access</p>

                        {/* Price */}
                        <div className="flex items-baseline mb-8">
                            <span className="text-6xl font-extrabold text-white">$19</span>
                            <span className="text-2xl text-slate-400 ml-2">/month</span>
                        </div>

                        {/* Features */}
                        <ul className="space-y-4 mb-10">
                            {[
                                'Unlimited document uploads',
                                'Advanced AI risk analysis',
                                'Traffic Light scoring system',
                                'Secure document vault',
                                'Export analysis reports (PDF)',
                                'Priority email support',
                                'Early access to new features'
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-slate-300">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                'Upgrade to Pro Now'
                            )}
                        </button>

                        {/* Trust Badges */}
                        <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-slate-500">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                Secure Payment
                            </div>
                            <span>•</span>
                            <div>Cancel Anytime</div>
                            <span>•</span>
                            <div>30-Day Guarantee</div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-12 text-center">
                    <p className="text-slate-400">
                        Questions? <a href="mailto:support@legalese.ai" className="text-blue-400 hover:text-blue-300 underline">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
