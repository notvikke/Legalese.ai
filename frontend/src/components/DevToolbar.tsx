'use client';
import { useDev } from '@/context/DevContext';

export default function DevToolbar() {
    const { isProOverride, toggleProOverride, triggerResetCredits, triggerResetTimer } = useDev();

    // Only render in development
    if (process.env.NODE_ENV === 'production') return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-3 flex justify-center items-center gap-4 text-xs z-[100] backdrop-blur-md border-t border-slate-700 shadow-2xl">
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 rounded-full border border-yellow-500/20 text-yellow-400 font-mono font-bold">
                <span>⚡ DEV_TOOLBAR</span>
            </div>

            <div className="h-4 w-px bg-white/20 mx-2"></div>

            <button
                onClick={toggleProOverride}
                className={`px-3 py-1.5 rounded transition-all font-medium ${isProOverride
                        ? 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_10px_rgba(22,163,74,0.5)]'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
            >
                {isProOverride ? '✅ Mock Pro: ACTIVE' : '⭕ Mock Pro: OFF'}
            </button>

            <button
                onClick={triggerResetCredits}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-blue-900 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white transition-all"
            >
                ↺ Reset Free Credits
            </button>

            <button
                onClick={triggerResetTimer}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-amber-900 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-white transition-all"
            >
                ↺ Reset Expiration
            </button>
        </div>
    );
}
