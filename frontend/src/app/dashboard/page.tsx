'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DocumentVault from "@/components/DocumentVault";

function DashboardContent() {
    const searchParams = useSearchParams();
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.get('success') === 'true') {
            setShowSuccess(true);
            // Auto-hide after 5 seconds
            setTimeout(() => setShowSuccess(false), 5000);
        }
    }, [searchParams]);

    return (
        <>
            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top duration-500">
                    <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                            <p className="font-bold">Welcome to Pro!</p>
                            <p className="text-sm">Your subscription is now active. Enjoy unlimited uploads!</p>
                        </div>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="ml-4 text-white hover:text-green-100"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <DocumentVault />
        </>
    );
}
