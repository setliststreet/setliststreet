import React, { useState } from 'react';
import Link from 'next/link';
 
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  return (
    <header className="bg-white border-gray-200 sticky top-0 z-[999] w-full shadow-md">
      <div className="max-w-7xl mx-auto margin-right-10 px-6 sm:px-8 lg:px-12">
 
 
        <div className="countdown-inner"></div>
        <div className="flex justify-between items-center h-16 mb-4">
          {/* Logo */}
 
          <Link href="/" className="logo-button">SETLIST STREET</Link>
 
          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-8 lg:gap-14">
            <div className="button-container">
              <Link href="/rules" className="custom-button">How to Play</Link>
            </div>
 
            <div className="button-container">
              <Link href="/faq" className="custom-button">FAQ</Link>
            </div>
 
            <div className="button-container">
              <Link href="/setlist-hints" className="custom-button">Setlist Hints</Link>
            </div>
 
             <div className="button-container">
              <Link href="/view-results" className="custom-button">Live Results</Link>
            </div>
 
            <div className="button-container">
              <Link href="/login" className="custom-button">Sign In</Link>
            </div>
 
            <div className="button-container">
              <Link href="/register" className="custom-button">Sign Up</Link>
            </div>
          </nav>
        </div>
       
      </div>
   
    </header>
  );
}