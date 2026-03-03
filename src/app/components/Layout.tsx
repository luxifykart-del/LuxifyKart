import { Outlet } from 'react-router';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { BackToTop } from './BackToTop';
import { CartProvider } from '../context/CartContext';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <BackToTop />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}