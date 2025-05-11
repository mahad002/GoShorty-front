import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MaintenanceBanner from './MaintenanceBanner';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-10">
        <MaintenanceBanner isVisible={true} />
      </div>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;