'use client';

import { useRouter } from 'next/navigation';
import { useAuth, useClerk } from '@clerk/nextjs';
import { Wand2, FileDown, Shield, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function HomePage() {
    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { openSignIn } = useClerk();

    const handleGetStarted = () => {
        if (isSignedIn) {
            router.push('/dashboard');
        } else {
            openSignIn({
                redirectUrl: '/dashboard',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-slate-50 selection:bg-blue-500/30">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 animate-fadeIn">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            v2.0 Now Live
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                            Legalese<span className="text-blue-500">.ai</span>
                        </h1>
                        <p className="text-2xl text-slate-300 mb-6 font-light">
                            AI-Powered Contract Analysis
                        </p>
                        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Upload your legal documents and get instant risk analysis powered by advanced AI.
                            Identify problematic clauses before you sign.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={handleGetStarted}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 group"
                            >
                                Get Started Free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => router.push('/subscribe')}
                                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all hover:border-slate-600"
                            >
                                View Pricing
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Showcase (Bento Grid) */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

                    {/* Feature 1: AI Negotiation Assistant */}
                    <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="p-8 md:p-10 relative z-10">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Wand2 className="w-6 h-6 text-blue-400" />
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-4">Turn Risks into Relationships.</h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Don't just find problems—fix them. Our AI Negotiation Assistant uses specialized legal models to rewrite high-risk clauses into balanced, market-standard language instantly.
                            </p>

                            {/* UI Mockup: Before/After */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                {/* Before Card */}
                                <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-4 transform group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-red-400" />
                                        <span className="text-xs font-bold text-red-400 uppercase tracking-wide">High Risk</span>
                                    </div>
                                    <div className="h-2 w-3/4 bg-red-500/20 rounded mb-2"></div>
                                    <div className="h-2 w-1/2 bg-red-500/20 rounded"></div>
                                </div>

                                {/* After Card */}
                                <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-4 transform group-hover:-translate-y-1 transition-transform duration-500 delay-150">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                        <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Balanced</span>
                                    </div>
                                    <div className="h-2 w-3/4 bg-green-500/20 rounded mb-2"></div>
                                    <div className="h-2 w-5/6 bg-green-500/20 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: PDF Export */}
                    <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="p-8 md:p-10 relative z-10 flex-grow">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <FileDown className="w-6 h-6 text-purple-400" />
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-4">Executive-Ready Reports.</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Take your analysis offline. Generate beautifully branded, professional PDF risk summaries at the click of a button. Perfect for sharing with legal teams.
                            </p>
                        </div>

                        {/* UI Mockup: PDF Slide-out */}
                        <div className="relative h-48 mt-auto overflow-hidden">
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-slate-900 rounded-t-2xl border border-slate-700 shadow-2xl transform group-hover:-translate-y-4 transition-transform duration-700 ease-out p-4">
                                {/* Fake Header */}
                                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                                    <div className="w-20 h-2 bg-slate-700 rounded"></div>
                                    <div className="w-8 h-8 bg-blue-500/20 rounded-full"></div>
                                </div>
                                {/* Fake Content Lines */}
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-slate-800 rounded"></div>
                                    <div className="h-2 w-5/6 bg-slate-800 rounded"></div>
                                    <div className="h-2 w-4/6 bg-slate-800 rounded"></div>
                                </div>
                                {/* Paper Effect */}
                                <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Security Trust Banner */}
            <div className="border-y border-slate-800 bg-slate-900/50">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto">
                        <div className="flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full"></div>
                            <Shield className="w-24 h-24 text-slate-200 relative z-10" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Security First Guarantee</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Your data is your own. We utilize <span className="text-blue-400 font-semibold">stateless processing</span> for all exports and re-writes.
                                Legalese.ai <span className="text-white font-medium">never stores your documents</span> on our servers and never uses your private data to train AI models.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works (Simplified) */}
            <div className="py-24 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white text-center mb-16">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    {[
                        { step: 1, title: 'Upload Contract', desc: 'Securely upload your PDF or DOCX file.', icon: '📄' },
                        { step: 2, title: 'AI Analysis', desc: 'Our engine identifies risks instantly.', icon: '⚡' },
                        { step: 3, title: 'Review & Actions', desc: 'Export reports or rewrite clauses.', icon: '✅' }
                    ].map((item) => (
                        <div key={item.step} className="text-center group">
                            <div className="w-16 h-16 mx-auto bg-slate-800 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg border border-slate-700 group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-300">
                                {item.icon}
                            </div>
                            <div className="inline-block px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-400 mb-3">
                                Step 0{item.step}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing Preview */}
            <div className="pb-24 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Simple Pricing</h2>
                <div className="inline-block bg-gradient-to-b from-slate-800 to-slate-800/50 p-1 rounded-2xl">
                    <div className="bg-slate-900 rounded-xl p-8 border border-slate-700/50">
                        <div className="text-slate-400 mb-2 uppercase tracking-wide text-xs font-bold">Start For Free</div>
                        <div className="text-5xl font-bold text-white mb-4 tracking-tight">3 <span className="text-lg text-slate-500 font-normal">documents</span></div>
                        <button
                            onClick={() => router.push('/subscribe')}
                            className="w-full py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            View Plans
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
