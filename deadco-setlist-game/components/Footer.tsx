import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          
          {/* Left Sponsor Logos */}
          <div className="lg:col-span-1 flex justify-center lg:justify-start space-x-4">
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 w-24 h-16 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">Sponsor Logo</span>
            </div>
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 w-24 h-16 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">Sponsor Logo</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="lg:col-span-3">
            <nav className="flex flex-wrap justify-center items-center gap-6">
              <Link 
                href="/terms" 
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-3 px-5 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200"
              >
                Terms of Service
              </Link>
              <Link 
                href="/about-this-app" 
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-3 px-5 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200"
              >
                About this App
              </Link>
              <Link 
                href="/privacy" 
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-3 px-5 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200"
              >
                Privacy Policy
              </Link>
            </nav>
            
            {/* Copyright - Centered under links */}
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
                © 2025 Setlist Street. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right Sponsor Logos */}
          <div className="lg:col-span-1 flex justify-center lg:justify-end space-x-4">
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 w-24 h-16 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">Sponsor Logo</span>
            </div>
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 w-24 h-16 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">Sponsor Logo</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
} 