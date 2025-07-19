import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <nav>
        <Link href="/terms-of-service">Terms of Service</Link>
        <Link href="/about-this-app">About this App</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </nav>
      
      <div>
        <p>Copyright 2025, Setlist Street</p>
      </div>
    </footer>
  );
} 