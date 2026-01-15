'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { API_ENDPOINTS } from '@/config/api';


const DocumentVault = () => {
    const router = useRouter();
    const { getToken, userId } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const [documents, setDocuments] = useState<any[]>([
        // Mock Data for UI dev before backend connection
        { id: 1, filename: "NDA_Agreement_v2.pdf", created_at: "2023-10-25", risk_score: "High" },
        { id: 2, filename: "Service_Contract.docx", created_at: "2023-10-26", risk_score: "Low" },
    ]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setIsUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", userId || "anonymous");

        try {
            const token = await getToken();
            // In a real scenario, use correct backend URL
            const res = await fetch(API_ENDPOINTS.analyze, {
                method: "POST",
                body: formData,
                // headers: { Authorization: `Bearer ${token}` } 
            });

            if (!res.ok) {
                if (res.status === 402) {
                    // Free limit reached
                    const confirmUpgrade = confirm("You've reached your free limit. Upgrade to Premium for $15/mo to continue?");
                    if (confirmUpgrade) {
                        // Create checkout session
                        const checkoutRes = await fetch(API_ENDPOINTS.createCheckoutSession, {
                            method: "POST",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: new URLSearchParams({ user_id: userId || "" })
                        });
                        const checkoutData = await checkoutRes.json();
                        if (checkoutData.checkout_url) {
                            window.location.href = checkoutData.checkout_url;
                        } else {
                            alert("Could not start checkout.");
                        }
                    }
                    return;
                }
                const err = await res.json();
                alert(`Error: ${err.detail || "Upload failed"}`);
                return;
            }

            const data = await res.json();
            router.push(`/analysis/${data.document_id}`);
        } catch (error) {
            console.error(error);
            alert("Upload failed. Ensure backend is running.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-slate-900/50 min-h-screen p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Document Vault</h1>
                    <label className={`btn-primary cursor-pointer relative ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                        {isUploading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                Analyzing...
                            </span>
                        ) : (
                            <>
                                <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleUpload} />
                                + Upload New Contract
                            </>
                        )}
                    </label>
                </div>

                <div className="grid gap-4">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            onClick={() => router.push(`/analysis/${doc.id}`)}
                            className="group glass-panel p-6 rounded-xl flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-500"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    📄
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-slate-200 group-hover:text-white">{doc.filename}</h3>
                                    <p className="text-sm text-slate-500">Uploaded on {doc.created_at}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${doc.risk_score === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                    doc.risk_score === 'Low' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                    {doc.risk_score} Risk
                                </span>
                                <p className="text-xs text-slate-500 mt-2">Click to view analysis →</p>
                            </div>
                        </div>
                    ))}

                    {documents.length === 0 && (
                        <div className="text-center py-20 border-2 border-dashed border-slate-700 rounded-xl">
                            <p className="text-slate-500">No documents yet. Upload one to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentVault;
