import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts for the Setlist Street theme */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Nunito:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Creepster&family=Bungee&family=Montserrat+Alternates:wght@300;400;600;700&family=Fira+Code:wght@300;400;500;600&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Favicon and meta */}
        <link rel="icon" href="/skull.svg" />
        <meta name="description" content="Predict Dead & Company setlists, compete with friends, and win prizes!" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 