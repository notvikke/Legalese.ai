export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-900 py-16 px-6">
            <div className="max-w-4xl mx-auto prose prose-invert prose-slate">
                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
                <p className="text-slate-400 mb-6">Last Updated: January 15, 2026</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                    <p className="text-slate-300 leading-relaxed">
                        By accessing and using Legalese.ai ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                    <p className="text-slate-300 leading-relaxed">
                        Legalese.ai provides AI-powered contract analysis tools designed to identify potential risks in legal documents. The Service is provided "as is" and is intended for informational purposes only. It does not constitute legal advice.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                    <p className="text-slate-300 leading-relaxed">
                        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">4. Subscription and Payment</h2>
                    <p className="text-slate-300 leading-relaxed">
                        Certain features of the Service require a paid subscription. By subscribing, you agree to pay all fees associated with your chosen plan. Subscriptions automatically renew unless canceled. You may cancel at any time through your account settings.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">5. Acceptable Use</h2>
                    <p className="text-slate-300 leading-relaxed">
                        You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair the Service. You may not attempt to gain unauthorized access to any part of the Service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                    <p className="text-slate-300 leading-relaxed">
                        All content, features, and functionality of the Service are owned by Legalese.ai and are protected by international copyright, trademark, and other intellectual property laws.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                    <p className="text-slate-300 leading-relaxed">
                        Legalese.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service. The Service is not a substitute for professional legal advice.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
                    <p className="text-slate-300 leading-relaxed">
                        We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated terms.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
                    <p className="text-slate-300 leading-relaxed">
                        If you have any questions about these Terms of Service, please contact us at{' '}
                        <a href="mailto:legal@legalese.ai" className="text-blue-400 hover:text-blue-300 underline">
                            legal@legalese.ai
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}
