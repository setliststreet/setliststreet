import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-[100] w-full shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors">
              Setlist Street
            </Link>
          </div>

          {/* Navigation Links - Properly Right-Aligned with Good Spacing */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/rules" 
              className="text-gray-800 hover:text-purple-600 px-4 py-2 text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              How to Play
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-800 hover:text-purple-600 px-4 py-2 text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              FAQ
            </Link>
            <Link 
              href="/login" 
              className="text-gray-800 hover:text-purple-600 px-4 py-2 text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 text-sm font-semibold rounded-lg transition-all border-2 border-purple-600 hover:border-purple-700 shadow-md hover:shadow-lg ml-2"
            >
              Sign Up
            </Link>
          </nav>

          {/* Mobile menu button - For small screens only */}
          <div className="md:hidden">
            <button className="text-gray-800 hover:text-purple-600 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border-2 border-gray-300 hover:border-purple-300 rounded-lg bg-white shadow-sm">
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