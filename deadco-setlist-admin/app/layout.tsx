

export const metadata = {
  title: 'DeadCo Setlist Admin',
  description: 'Fantasy setlist admin panel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-charcoal">
        {children}
      </body>
    </html>
  );
}
