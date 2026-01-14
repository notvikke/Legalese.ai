'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface AnalysisResult {
    text: string;
    risk: 'Red' | 'Yellow' | 'Green';
    explanation: string;
}

interface DocumentData {
    document_id: number;
    filename: string;
    content: string;
    results: AnalysisResult[];
}

const AnalysisView = () => {
    const params = useParams();
    const id = params.id;
    const [data, setData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        // Fetch data
        // Mock data for MVP if backend not reachable immediately
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/documents/${id}`);
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                } else {
                    // Fallback mock
                    console.warn("Backend unavailable, using mock");
                    setData({
                        document_id: 123,
                        filename: "Sample_Contract.pdf",
                        content: `1. INDEMNITY. The Contractor agrees to indemnify, defend, and hold harmless the Client from and against any and all claims, losses, liabilities, and expenses (including attorneys' fees) arising out of or in connection with the Contractor's performance of the Services. This indemnity shall not be capped and shall survive termination.

2. TERMINATION. Either party may terminate this Agreement at any time, with or without cause, upon thirty (30) days' written notice to the other party.

3. GOVERNING LAW. This Agreement shall be governed by the laws of the State of Delaware.

4. CONFIDENTIALITY. Both parties agree to keep all proprietary information confidential.`,
                        results: [
                            { text: "This indemnity shall not be capped", risk: "Red", explanation: "Uncapped liability is highly risky. Standard contracts limit liability to fees paid." },
                            { text: "terminate this Agreement at any time", risk: "Yellow", explanation: "Termination for convenience can create instability. Ensure notice period is sufficient." },
                            { text: "governed by the laws of the State of Delaware", risk: "Green", explanation: "Standard Jurisdiction." }
                        ]
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="flex items-center justify-center h-screen text-slate-400">Loading Analysis...</div>;
    if (!data) return <div className="flex items-center justify-center h-screen text-red-400">Error loading document.</div>;

    return (
        <div className="min-h-screen bg-slate-900 grid grid-cols-1 lg:grid-cols-2 overflow-hidden h-screen">
            {/* Left: Document Text */}
            <div className="p-8 overflow-y-auto border-r border-slate-700 bg-slate-900/50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-slate-200 sticky top-0 bg-slate-900 py-4 border-b border-slate-800 z-10">
                        {data.filename}
                    </h2>
                    <div className="prose prose-invert prose-slate max-w-none whitespace-pre-wrap font-serif text-lg leading-relaxed text-slate-300">
                        {data.content}
                    </div>
                </div>
            </div>

            {/* Right: Risk Analysis */}
            <div className="p-8 overflow-y-auto bg-slate-950">
                <h2 className="text-2xl font-bold mb-6 text-white sticky top-0 bg-slate-950 py-4 border-b border-slate-800 z-10 flex items-center justify-between">
                    <span>Risk Analysis</span>
                    <div className="flex items-center gap-2 text-sm font-normal">
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span> High</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span> Review</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span> Safe</span>
                    </div>
                </h2>

                <div className="space-y-6">
                    {data.results.map((item, idx) => (
                        <div key={idx} className={`relative p-6 rounded-xl border backdrop-blur-sm transition-all hover:scale-[1.02] ${item.risk === 'Red' ? 'bg-red-900/10 border-red-500/30 hover:border-red-500/50' :
                            item.risk === 'Yellow' ? 'bg-yellow-900/10 border-yellow-500/30 hover:border-yellow-500/50' :
                                'bg-green-900/10 border-green-500/30 hover:border-green-500/50'
                            }`}>
                            {/* Traffic Light Indicator */}
                            <div className="absolute -left-4 top-6 w-8 h-8 flex items-center justify-center drop-shadow-lg">
                                {item.risk === 'Red' ? (
                                    <img src="/assets/red.png" alt="High Risk" className="w-full h-full object-contain" />
                                ) : item.risk === 'Yellow' ? (
                                    <img src="/assets/yellow.png" alt="Needs Review" className="w-full h-full object-contain" />
                                ) : (
                                    // Fallback for Green if asset missing, or use CSS
                                    <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                                )}
                            </div>

                            <div className="mb-3">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{
                                    color: item.risk === 'Red' ? 'var(--risk-red)' :
                                        item.risk === 'Yellow' ? 'var(--risk-yellow)' :
                                            'var(--risk-green)'
                                }}>
                                    {item.risk === 'Red' ? 'Critical Risk' : item.risk === 'Yellow' ? 'Needs Review' : 'Standard Term'}
                                </h3>
                                <p className="text-slate-200 font-medium italic">"{item.text.substring(0, 150)}..."</p>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-lg border border-white/5">
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    <span className="font-semibold text-slate-300">Analysis: </span>
                                    {item.explanation}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalysisView;
