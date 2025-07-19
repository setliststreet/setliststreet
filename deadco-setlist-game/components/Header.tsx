import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div>
        <Link href="/">
          <h1>Setlist Street</h1>
        </Link>
        
        <nav>
          <Link href="/how-to-play">How to Play</Link>
          <Link href="/view-results">View Results</Link>
          <Link href="/sign-up">Sign In/Sign Up</Link>
        </nav>
      </div>
    </header>
  );
} 