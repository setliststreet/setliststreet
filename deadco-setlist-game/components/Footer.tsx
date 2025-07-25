import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
    <div className="countdown-outer">
    </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        
        <div className="flex flex-wrap justify-between items-center gap-8">
          
          <div className="flex justify-center lg:justify-start space-x-3">
          <div className="schedule-button">
                       <a href="/sponsor" className="text-purple-600 underline font-bold">Sponsor</a>
          </div>
          </div>

          {/* Center Navigation Links */}
          <div className="flex-grow flex flex-col items-center">
            <nav className="flex flex-wrap justify-center items-center gap-8 mb-3">
              <Link
                href="/terms"
                className="link-button"
              >
                Terms of Service
              </Link>
              <Link
                href="/about-this-app"
                className="link-button"
              >
                About this App
              </Link>
              <Link
                href="/privacy"
                className="link-button"
              >
                Privacy Policy
              </Link>
            </nav>

            {/* Copyright - Centered under links */}
            <p                 className="custom-button"
>
              © 2025 Setlist Street. All rights reserved.
            </p>
          </div>

          {/* Right Sponsor Logos */}
          <div className="schedule-button">




                       <a href="/sponsor" className="text-purple-600 underline font-bold">Sponsor</a>
</div>
        </div>
      </div>
      <div className="countdown-outer">
      </div>
    </footer>
  );
} 