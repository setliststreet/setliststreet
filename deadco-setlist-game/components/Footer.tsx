import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
    <div className="countdown-outer">
    </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        
        {/* Single Row Layout - Always Horizontal */}
        <div className="flex flex-wrap justify-between items-center gap-8">
          
          {/* Left Sponsor Logos */}
          <div className="flex justify-center lg:justify-start space-x-3">
          <div className="countdown-between">
                      </div>
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-3 w-20 h-12 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">Sponsor</span>
            </div>
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-3 w-20 h-12 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">Sponsor</span>
            </div>

          </div>

          {/* Center Navigation Links */}
          <div className="flex-grow flex flex-col items-center">
            <nav className="flex flex-wrap justify-center items-center gap-8 mb-3">
              <Link 
                href="/terms" 
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-2 px-4 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200"
              >
                Terms of Service
              </Link>
              <Link 
                href="/about-this-app" 
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-2 px-4 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200"
              >
                About this App
              </Link>
              <Link 
                href="/privacy" 
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors py-2 px-4 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200"
              >
                Privacy Policy
              </Link>
            </nav>
            
            {/* Copyright - Centered under links */}
            <p className="text-gray-500 text-sm text-center">
              © 2025 Setlist Street. All rights reserved.
            </p>
          </div>

          {/* Right Sponsor Logos */}
          <div className="flex justify-center lg:justify-end space-x-3">
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-3 w-20 h-12 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">Sponsor</span>
            </div>
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-3 w-20 h-12 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">Sponsor</span>
            </div>
            <div className="countdown-between">
            </div>
          </div>

        </div>
      </div>
      <div className="countdown-outer">
      </div>
    </footer>
  );
} 