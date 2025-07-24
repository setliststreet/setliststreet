import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
        className="min-h-screen bg-[url('/elements/background3.png')] bg-no-repeat bg-center bg-cover"
      >
     <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
