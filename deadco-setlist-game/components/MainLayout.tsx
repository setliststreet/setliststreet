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
          <div className="text-center mb-12 pt-12 px-6">
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
        
        {/* Simple content wrapper without complex constraints */}
        <div className="pb-12">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 