import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Footer Navigation Links - Always Horizontal with Even Spacing */}
          <nav className="flex flex-wrap justify-center lg:justify-start items-center gap-x-8 gap-y-4">
            <Link 
              href="/terms" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-2 px-4 rounded hover:bg-gray-100"
            >
              Terms of Service
            </Link>
            <Link 
              href="/about-this-app" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-2 px-4 rounded hover:bg-gray-100"
            >
              About this App
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-2 px-4 rounded hover:bg-gray-100"
            >
              Privacy Policy
            </Link>
          </nav>

          {/* Copyright - Evenly Spaced */}
          <div className="text-center lg:text-right">
            <p className="text-gray-500 text-sm py-2 px-4">
              © 2025 Setlist Street. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 