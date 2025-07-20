import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function MainLayout({ children, title, description }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {title && (
          <div className="text-center mb-8 pt-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </main>
      
      <Footer />
    </div>
  );
} 