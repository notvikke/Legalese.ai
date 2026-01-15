'use client';

import React from 'react';
import Link from 'next/link';
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
              Legalese.ai
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <div className="h-4 w-px bg-white/10"></div>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="text-sm font-medium px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
