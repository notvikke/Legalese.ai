'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 text-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">

          {/* Hero Image */}
          <div className="relative w-full max-w-3xl h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20 mb-8 group mx-auto">
            <Image
              src="/assets/hero.png"
              alt="Legal Tech AI"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
              AI-Powered Legal Risk Analysis
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Instantly analyze contracts for high-risk clauses using our "Traffic Light" system.
            Secure, fast, and driven by advanced NLP.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-up"}
              className="btn-primary text-lg px-8 py-4 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              {isSignedIn ? "Go to Dashboard" : "Start Free Trial"}
            </Link>
            <a
              href="#features"
              className="px-8 py-4 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all font-medium border border-slate-700"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features for Legal Professionals
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to analyze contracts with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "AI Clause Detection",
                desc: "Our BERT-powered engine identifies risky clauses with 95%+ accuracy."
              },
              {
                icon: "🚦",
                title: "Traffic Light Scoring",
                desc: "Red for Danger, Yellow for Review, Green for Safe. Simple and effective."
              },
              {
                icon: "🔒",
                title: "Secure Document Vault",
                desc: "Bank-grade encryption. Your contracts are safe and accessible 24/7."
              },
              {
                icon: "⚡",
                title: "Instant Analysis",
                desc: "Upload PDFs or Word docs and get results in seconds, not hours."
              },
              {
                icon: "📊",
                title: "Detailed Reports",
                desc: "Export comprehensive risk analysis reports for your records."
              },
              {
                icon: "🎯",
                title: "Priority Support",
                desc: "Pro users get dedicated email support and early access to features."
              },
            ].map((feature, i) => (
              <div key={i} className="card hover:border-blue-500/50 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-400">
              Three simple steps to contract clarity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Upload",
                desc: "Drag and drop your contract (PDF or DOCX). We support all major formats."
              },
              {
                step: "02",
                title: "Analyze",
                desc: "Our AI scans every clause, identifying risks and flagging problematic language."
              },
              {
                step: "03",
                title: "Review",
                desc: "Get a color-coded report with actionable insights. Export or share with your team."
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-7xl font-black text-blue-500/20 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-6 text-blue-500/30 text-4xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Analyze Your First Contract?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of legal professionals using Legalese.ai
          </p>
          <Link
            href="/subscribe"
            className="inline-block px-10 py-5 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-2xl text-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Legalese.ai</h4>
              <p className="text-slate-400 text-sm">
                AI-powered contract risk analysis for modern legal teams.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/subscribe" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@legalese.ai" className="text-slate-400 hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="mailto:hello@legalese.ai" className="text-slate-400 hover:text-white transition-colors">General Inquiries</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2026 Legalese.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
