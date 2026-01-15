'use client';

import { DevProvider } from '@/context/DevContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <DevProvider>
            {children}
        </DevProvider>
    );
}
