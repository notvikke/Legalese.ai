'use client';

import React from 'react';
import Link from 'next/link';
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Sun, Moon, Home } from "lucide-react";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
              Legaleze.ai
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </Link>
              {isSignedIn && (
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors border border-transparent hover:border-blue-500/50 px-3 py-1 rounded-full hover:bg-blue-500/10"
                >
                  Dashboard
                </Link>
              )}
            </div>

            <div className="h-4 w-px bg-white/10 hidden md:block"></div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                aria-label="Toggle Theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>

              {isSignedIn ? (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 ring-2 ring-blue-500/50"
                    }
                  }}
                />
              ) : (
                <SignInButton mode="modal">
                  <button className="text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
