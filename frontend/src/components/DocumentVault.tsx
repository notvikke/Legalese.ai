'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { Trash2 } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';
import CountdownTimer from './CountdownTimer';
import { useDev } from '@/context/DevContext';

interface UserStatus {
    is_premium: boolean;
    document_count: number;
    limit: number;
    premium_expires_at?: string;
}

const DocumentVault = () => {
    const router = useRouter();
    const { userId } = useAuth();
    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const { isProOverride, resetCreditsTrigger } = useDev();

    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<UserStatus | null>(null);
    const [documents, setDocuments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;
        fetchData();
    }, [userId, resetCreditsTrigger]); // Re-fetch on credit reset trigger

    const fetchData = async () => {
        try {
            // Fetch User Status
            const statusRes = await fetch(`${API_ENDPOINTS.userStatus}?user_id=${userId}&email=${encodeURIComponent(userEmail || '')}`);
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

    // Apply Dev Overrides
    const effectiveStatus: UserStatus | null = status ? {
        ...status,
        is_premium: isProOverride ? true : status.is_premium,
        // If mocking pro and no expiry, mock an expiry 7 days out
        premium_expires_at: isProOverride && !status.premium_expires_at
            ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            : status.premium_expires_at
    } : null;

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        // Client-side limit check using effectiveStatus
        const isAdmin = userEmail === 'vikastro911@gmail.com';
        if (!isAdmin && effectiveStatus && !effectiveStatus.is_premium && effectiveStatus.document_count >= effectiveStatus.limit) {
            router.push('/subscribe');
            return;
        }

        setIsUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", userId || "anonymous");
        formData.append("email", userEmail || "");

        try {
            const res = await fetch(API_ENDPOINTS.analyze, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                if (res.status === 402 && !isProOverride) {
                    router.push('/subscribe');
                    return;
                }

                let errDetail;
                try {
                    const err = await res.json();
                    errDetail = err.detail;
                } catch (e) {
                    console.error("Non-JSON response received");
                    if (res.status === 500) {
                        const errorMsg = String(errDetail || "");
                        if (errorMsg.includes("password authentication failed")) {
                            errDetail = "Database Password Incorrect. Update DATABASE_URL in Vercel Settings.";
                        } else if (errorMsg.includes("DATABASE_URL not set")) {
                            errDetail = "Database Not Configured. Set DATABASE_URL in Vercel.";
                        } else {
                            errDetail = `Server Error (500): ${errorMsg}`;
                        }
                    } else {
                        errDetail = `Request failed with status ${res.status}`;
                    }
                }

                alert(`Error: ${errDetail || "Upload failed"}`);
                return;
            }

            const data = await res.json();
            router.push(`/analysis/${data.document_id}`);
        } catch (error) {
            console.error(error);
            alert(`Upload failed. Ensure backend is running at ${API_ENDPOINTS.analyze}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (e: React.MouseEvent, docId: number) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to permanently delete this document and its report?')) return;

        try {
            const res = await fetch(API_ENDPOINTS.document(docId), {
                method: 'DELETE',
            });

            if (res.ok) {
                setDocuments(prev => prev.filter(d => (d.document_id || d.id) !== docId));
                fetchData();
            } else {
                alert('Failed to delete document');
            }
        } catch (error) {
            console.error('Delete error', error);
            alert('Error deleting document');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <div className="text-white">Loading vault...</div>
            </div>
        );
    }

    const isAdmin = userEmail === 'vikastro911@gmail.com';
    const isLimitReached = !isAdmin && effectiveStatus && !effectiveStatus.is_premium && effectiveStatus.document_count >= effectiveStatus.limit;

    return (
        <div className="bg-slate-900 min-h-screen p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="flex items-center gap-4 mb-1">
                            <h1 className="text-3xl font-bold text-white tracking-tight">Document Vault</h1>
                            <button
                                onClick={() => router.push('/')}
                                className="text-xs text-slate-500 hover:text-blue-400 transition-colors border border-slate-700 rounded px-2 py-1"
                            >
                                ← Return to Home
                            </button>
                        </div>
                        <p className="text-slate-400 mt-1">
                            {effectiveStatus && !effectiveStatus.is_premium
                                ? "Your first 3 scans are on us! Analyze contracts instantly."
                                : "Manage and analyze your legal contracts"}
                        </p>
                    </div>

                    {/* Usage Stats & Actions */}
                    <div className="flex items-center gap-4">
                        {effectiveStatus && !effectiveStatus.is_premium && (
                            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                                <span className="text-slate-400 text-sm">Free Plan Usage: </span>
                                <span className={`font-bold ${isLimitReached ? 'text-red-400' : 'text-green-400'}`}>
                                    {effectiveStatus.document_count}/{effectiveStatus.limit}
                                </span>
                            </div>
                        )}

                        {(isAdmin || effectiveStatus?.is_premium) && (
                            <div className="flex items-center gap-3">
                                {isAdmin ? (
                                    <div className="bg-purple-900/30 px-4 py-2 rounded-lg border border-purple-500/30 flex items-center gap-2">
                                        <span className="text-purple-200 font-bold">🛡️ Admin Access</span>
                                    </div>
                                ) : (
                                    <div className="bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-500/30">
                                        <span className="text-blue-200 font-semibold">✨ Premium Plan</span>
                                    </div>
                                )}

                                {!isAdmin && effectiveStatus?.premium_expires_at && (
                                    <CountdownTimer targetDate={effectiveStatus.premium_expires_at} />
                                )}
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
                {!effectiveStatus?.is_premium && !isLimitReached && (
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
                        const firstClause = doc.results && doc.results.length > 0 ? doc.results[0] : null;

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
                                <div className="text-right flex items-center gap-3">
                                    <button
                                        onClick={(e) => handleDelete(e, doc.document_id || doc.id)}
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors group/delete"
                                        title="Delete Document"
                                    >
                                        <Trash2 className="w-5 h-5 opacity-70 group-hover/delete:opacity-100" />
                                    </button>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
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
