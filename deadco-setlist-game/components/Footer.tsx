import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Footer Navigation Links - Individual Containers with Proper Spacing */}
          <nav className="flex flex-wrap justify-center lg:justify-start items-center">
            <div className="px-6 py-2">
              <Link 
                href="/terms" 
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-3 px-5 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200"
              >
                Terms of Service
              </Link>
            </div>
            <div className="px-6 py-2">
              <Link 
                href="/about-this-app" 
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-3 px-5 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200"
              >
                About this App
              </Link>
            </div>
            <div className="px-6 py-2">
              <Link 
                href="/privacy" 
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-3 px-5 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200"
              >
                Privacy Policy
              </Link>
            </div>
          </nav>

          {/* Copyright - In its own container with proper spacing */}
          <div className="text-center lg:text-right px-6 py-2">
            <div className="py-3 px-5">
              <p className="text-gray-500 text-sm">
                © 2025 Setlist Street. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 