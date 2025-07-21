import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[url('/images/background1.png')] bg-cover bg-center">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
