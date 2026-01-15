'use client';

import { ThemeProvider } from 'next-themes';
import { DevProvider } from '@/context/DevContext';
import { ClerkProvider } from '@clerk/nextjs';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <DevProvider>
                    {children}
                </DevProvider>
            </ThemeProvider>
        </ClerkProvider>
    );
}
