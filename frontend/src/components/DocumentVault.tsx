'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { API_ENDPOINTS } from '@/config/api';

interface UserStatus {
    is_premium: boolean;
    document_count: number;
    limit: number;
}

const DocumentVault = () => {
    const router = useRouter();
    const { userId } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<UserStatus | null>(null);
    const [documents, setDocuments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        try {
            // Fetch User Status
            const statusRes = await fetch(`${API_ENDPOINTS.userStatus}?user_id=${userId}`);
            if (statusRes.ok) {
                const statusData = await statusRes.json();
                setStatus(statusData);
            }

            // Fetch Documents
            const docsRes = await fetch(`${API_ENDPOINTS.documents}?user_id=${userId}`);
            if (docsRes.ok) {
                const docsData = await docsRes.json();
                setDocuments(docsData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        // Client-side limit check
        if (status && !status.is_premium && status.document_count >= status.limit) {
            router.push('/subscribe');
            return;
        }

        setIsUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", userId || "anonymous");

        try {
            const res = await fetch(API_ENDPOINTS.analyze, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                if (res.status === 402) {
                    router.push('/subscribe');
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <div className="text-white">Loading vault...</div>
            </div>
        );
    }

    const isLimitReached = status && !status.is_premium && status.document_count >= status.limit;

    return (
        <div className="bg-slate-900 min-h-screen p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Document Vault</h1>
                        <p className="text-slate-400 mt-1">Manage and analyze your legal contracts</p>
                    </div>

                    {/* Usage Stats & Actions */}
                    <div className="flex items-center gap-4">
                        {status && !status.is_premium && (
                            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                                <span className="text-slate-400 text-sm">Free Plan Usage: </span>
                                <span className={`font-bold ${isLimitReached ? 'text-red-400' : 'text-green-400'}`}>
                                    {status.document_count}/{status.limit}
                                </span>
                            </div>
                        )}

                        {status?.is_premium && (
                            <div className="bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-500/30">
                                <span className="text-blue-200 font-semibold">✨ Premium Plan</span>
                            </div>
                        )}

                        {isLimitReached ? (
                            <button
                                onClick={() => router.push('/subscribe')}
                                className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-bold rounded-lg transition-all shadow-lg animate-pulse"
                            >
                                Upgrade to Upload
                            </button>
                        ) : (
                            <label className={`cursor-pointer px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all shadow-lg flex items-center gap-2 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                {isUploading ? (
                                    <>
                                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                        Thinking...
                                    </>
                                ) : (
                                    <>
                                        <span>+ Analyze New</span>
                                        <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleUpload} />
                                    </>
                                )}
                            </label>
                        )}
                    </div>
                </div>

                {/* Available Plans Link (if free) */}
                {!status?.is_premium && !isLimitReached && (
                    <div className="mb-8 flex justify-end">
                        <button
                            onClick={() => router.push('/subscribe')}
                            className="text-sm text-slate-400 hover:text-white underline transition-colors"
                        >
                            View Upgrade Plans
                        </button>
                    </div>
                )}

                {/* Documents Grid */}
                <div className="grid gap-4">
                    {documents.map((doc: any) => {
                        // Safe extraction of risk score from first result if exists
                        const firstClause = doc.results && doc.results.length > 0 ? doc.results[0] : null;
                        const riskLevel = firstClause ? firstClause.risk : 'Reviewed';

                        return (
                            <div
                                key={doc.document_id || doc.id}
                                onClick={() => router.push(`/analysis/${doc.document_id || doc.id}`)}
                                className="group bg-slate-800/50 p-6 rounded-xl flex items-center justify-between hover:bg-slate-800 transition-all cursor-pointer border border-slate-700 hover:border-blue-500/50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        📄
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-slate-200 group-hover:text-white">{doc.filename}</h3>
                                        <p className="text-sm text-slate-500">Click to view analysis</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                                        View Report →
                                    </span>
                                </div>
                            </div>
                        );
                    })}

                    {documents.length === 0 && (
                        <div className="text-center py-24 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50">
                            <div className="text-5xl mb-4 opacity-30">📂</div>
                            <h3 className="text-xl font-semibold text-white mb-2">No documents yet</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                Upload your first contract to get AI-powered risk analysis instantly.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentVault;
