import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
        className="min-h-screen bg-[url('/elements/background1.png')] bg-no-repeat bg-center bg-cover"
      
                // className="min-h-screen bg-no-repeat bg-center bg-cover"

      >
     <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
