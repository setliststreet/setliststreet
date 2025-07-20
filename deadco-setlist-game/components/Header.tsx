import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-[999] w-full shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors">
              Setlist Street
            </Link>
          </div>

          {/* Desktop Navigation Links - Make sure they're always visible on larger screens */}
          <nav className="hidden lg:flex items-center space-x-4 relative z-10">
            <Link 
              href="/rules" 
              className="text-gray-800 hover:text-purple-600 px-3 py-2 text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              How to Play
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-800 hover:text-purple-600 px-3 py-2 text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              FAQ
            </Link>
            <Link 
              href="/login" 
              className="text-gray-800 hover:text-purple-600 px-3 py-2 text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 text-sm font-semibold rounded-lg transition-all border-2 border-purple-600 hover:border-purple-700 shadow-md hover:shadow-lg"
            >
              Sign Up
            </Link>
          </nav>

          {/* Compact Navigation for Medium Screens */}
          <nav className="hidden md:flex lg:hidden items-center space-x-2 relative z-10">
            <Link 
              href="/faq" 
              className="text-gray-800 hover:text-purple-600 px-2 py-1 text-xs font-semibold transition-all rounded"
            >
              FAQ
            </Link>
            <Link 
              href="/login" 
              className="text-gray-800 hover:text-purple-600 px-2 py-1 text-xs font-semibold transition-all rounded"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="bg-purple-600 text-white hover:bg-purple-700 px-3 py-1 text-xs font-semibold rounded transition-all"
            >
              Sign Up
            </Link>
          </nav>

          {/* Mobile menu button - For small screens only */}
          <div className="md:hidden relative z-10">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800 hover:text-purple-600 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border-2 border-gray-300 hover:border-purple-300 rounded-lg bg-white shadow-sm"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Enhanced visibility */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg absolute left-0 right-0 z-[998]">
            <div className="px-4 py-6 space-y-4">
              <Link 
                href="/rules" 
                className="block text-gray-800 hover:text-purple-600 px-4 py-3 text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                How to Play
              </Link>
              <Link 
                href="/faq" 
                className="block text-gray-800 hover:text-purple-600 px-4 py-3 text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/login" 
                className="block text-gray-800 hover:text-purple-600 px-4 py-3 text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="block bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 text-sm font-semibold rounded-lg transition-all border-2 border-purple-600 hover:border-purple-700 shadow-md hover:shadow-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 