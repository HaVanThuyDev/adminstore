import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { FloatingContactWidgets } from '../common/FloatingContactWidgets';

export const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 relative selection:bg-cyan-500/20 selection:text-cyan-700">
      <Header />
      <main className="flex-1 pt-28">
        <Outlet />
      </main>
      <Footer />
      <FloatingContactWidgets />
    </div>
  );
};
