import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              Setlist Street
            </Link>
          </div>

          {/* Navigation Links - Always visible, responsive */}
          <nav className="hidden sm:flex space-x-4 lg:space-x-6">
            <Link 
              href="/rules" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors border border-transparent hover:border-gray-200 rounded"
            >
              How to Play
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors border border-transparent hover:border-gray-200 rounded"
            >
              FAQ
            </Link>
            <Link 
              href="/login" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors border border-transparent hover:border-gray-200 rounded"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 text-sm font-medium rounded-md transition-colors border border-purple-600"
            >
              Sign Up
            </Link>
          </nav>

          {/* Mobile menu button - Only shown on small screens */}
          <div className="sm:hidden">
            <button className="text-gray-600 hover:text-gray-900 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 rounded">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 