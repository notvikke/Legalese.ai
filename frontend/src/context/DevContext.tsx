'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface DevContextType {
    isProOverride: boolean;
    toggleProOverride: () => void;
    resetCreditsTrigger: number;
    triggerResetCredits: () => void;
    resetTimerTrigger: number;
    triggerResetTimer: () => void;
}

const DevContext = createContext<DevContextType | undefined>(undefined);

export function DevProvider({ children }: { children: ReactNode }) {
    const [isProOverride, setIsProOverride] = useState(false);
    const [resetCreditsTrigger, setResetCreditsTrigger] = useState(0);
    const [resetTimerTrigger, setResetTimerTrigger] = useState(0);

    const toggleProOverride = () => setIsProOverride(prev => !prev);
    const triggerResetCredits = () => setResetCreditsTrigger(prev => prev + 1);
    const triggerResetTimer = () => setResetTimerTrigger(prev => prev + 1);

    // Only show in development
    if (process.env.NODE_ENV === 'production') {
        return <>{children}</>;
    }

    return (
        <DevContext.Provider value={{
            isProOverride,
            toggleProOverride,
            resetCreditsTrigger,
            triggerResetCredits,
            resetTimerTrigger,
            triggerResetTimer
        }}>
            {children}
        </DevContext.Provider>
    );
}

export function useDev() {
    const context = useContext(DevContext);
    if (context === undefined) {
        // Return defaults if not wrapped (e.g. production)
        return {
            isProOverride: false,
            toggleProOverride: () => { },
            resetCreditsTrigger: 0,
            triggerResetCredits: () => { },
            resetTimerTrigger: 0,
            triggerResetTimer: () => { }
        };
    }
    return context;
}
