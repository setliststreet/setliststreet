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
        {/* More Conservative Container with Guaranteed Margins */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
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
          
          {/* Content with proper spacing */}
          <div className="pb-12">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 