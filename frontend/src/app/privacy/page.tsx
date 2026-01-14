export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-900 py-16 px-6">
            <div className="max-w-4xl mx-auto prose prose-invert prose-slate">
                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                <p className="text-slate-400 mb-6">Last Updated: January 15, 2026</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We collect information you provide directly to us, including:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                        <li>Account information (name, email address)</li>
                        <li>Documents you upload for analysis</li>
                        <li>Payment information (processed securely by our payment provider)</li>
                        <li>Usage data and analytics</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                        <li>Provide, maintain, and improve our Service</li>
                        <li>Process your transactions and send related information</li>
                        <li>Send you technical notices and support messages</li>
                        <li>Respond to your comments and questions</li>
                        <li>Monitor and analyze trends and usage</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                    <p className="text-slate-300 leading-relaxed">
                        We implement industry-standard security measures to protect your data, including encryption at rest and in transit. All documents are stored securely in our encrypted database. However, no method of transmission over the Internet is 100% secure.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">4. Data Retention</h2>
                    <p className="text-slate-300 leading-relaxed">
                        We retain your documents and analysis results for as long as your account is active or as needed to provide you services. You may delete documents at any time through your dashboard. Upon account deletion, all associated data will be permanently removed within 30 days.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                    <p className="text-slate-300 leading-relaxed">
                        We use third-party services for authentication (Clerk), payment processing (Dodo Payments), and hosting (Vercel, Supabase). These providers have their own privacy policies governing their use of your information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                        <li>Access and receive a copy of your personal data</li>
                        <li>Correct inaccurate or incomplete data</li>
                        <li>Request deletion of your data</li>
                        <li>Object to or restrict processing of your data</li>
                        <li>Export your data in a portable format</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
                    <p className="text-slate-300 leading-relaxed">
                        We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
                    <p className="text-slate-300 leading-relaxed">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                    <p className="text-slate-300 leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at{' '}
                        <a href="mailto:privacy@legalese.ai" className="text-blue-400 hover:text-blue-300 underline">
                            privacy@legalese.ai
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}
