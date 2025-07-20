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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {title && (
            <div className="text-center mb-8">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 