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
        {/* Enhanced Global Container with Generous Left/Right Padding */}
        <div className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 xl:px-24">
          {title && (
            <div className="text-center mb-12 pt-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          )}
          
          {/* Content with proper spacing and additional side margins */}
          <div className="pb-12 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 