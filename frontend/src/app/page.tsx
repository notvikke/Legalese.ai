'use client';

import { useRouter } from 'next/navigation';
import { useAuth, useClerk } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function HomePage() {
    const router = useRouter();
    const { isSignedIn, isLoaded } = useAuth();
    const { openSignIn } = useClerk();

    useEffect(() => {
        if (isLoaded) {
            // If user is signed in, redirect to dashboard
            if (isSignedIn) {
                router.push('/dashboard');
            }
        }
    }, [isSignedIn, isLoaded, router]);

    const handleGetStarted = () => {
        if (isSignedIn) {
            router.push('/dashboard');
        } else {
            // Open Clerk sign-in modal with redirect to dashboard after sign-in
            openSignIn({
                redirectUrl: '/dashboard',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
                        Legalese<span className="text-blue-400">.ai</span>
                    </h1>
                    <p className="text-2xl text-slate-300 mb-4">
                        AI-Powered Contract Analysis
                    </p>
                    <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
                        Upload your legal documents and get instant risk analysis powered by advanced AI.
                        Identify problematic clauses before you sign.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={handleGetStarted}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                        >
                            Get Started Free
                        </button>
                        <button
                            onClick={() => router.push('/subscribe')}
                            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
                        >
                            View Pricing
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-all">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-white mb-3">Risk Detection</h3>
                        <p className="text-slate-400">
                            Automatically identify high-risk clauses like uncapped liability, indemnification, and unfavorable terms.
                        </p>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-all">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold text-white mb-3">Instant Analysis</h3>
                        <p className="text-slate-400">
                            Get comprehensive contract analysis in seconds. Upload PDF or DOCX files and receive immediate insights.
                        </p>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-all">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-bold text-white mb-3">Clear Reports</h3>
                        <p className="text-slate-400">
                            Color-coded risk levels (Red, Yellow, Green) with detailed explanations for every flagged clause.
                        </p>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                1
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-white mb-2">Upload Your Contract</h4>
                                <p className="text-slate-400">Support for PDF and DOCX formats. Your documents are processed securely.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                2
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-white mb-2">AI Analysis</h4>
                                <p className="text-slate-400">Our AI scans every clause for potential risks and unfavorable terms.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                3
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-white mb-2">Review Results</h4>
                                <p className="text-slate-400">Get a detailed breakdown with risk levels and actionable recommendations.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Preview */}
                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Simple Pricing</h2>
                    <div className="inline-block bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
                        <div className="text-slate-400 mb-2">Free: 1 document</div>
                        <div className="text-4xl font-bold text-white mb-2">$15<span className="text-lg text-slate-400">/month</span></div>
                        <div className="text-slate-400">Unlimited documents</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
