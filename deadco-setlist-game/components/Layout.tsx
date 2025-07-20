import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ 
  children, 
  title = "Setlist Street - Dead & Company Prediction Games",
  description = "Predict setlists, play bingo, test your knowledge - the ultimate Dead & Company fan experience."
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
} 