import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Footer Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-start space-x-6">
            <Link 
              href="/terms" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/about-this-app" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              About this App
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              Copyright 2025, Setlist Street
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 