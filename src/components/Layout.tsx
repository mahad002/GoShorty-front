import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import Footer from './Footer';
import MaintenanceBanner from './MaintenanceBanner';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Check if we're on the dashboard or other authenticated routes
  const isAuthenticatedRoute = location.pathname === '/dashboard' || 
                              location.pathname === '/policies' ||
                              location.pathname === '/quotes';
  
  // Show UserNavbar for authenticated users on dashboard routes
  const showUserNavbar = isAuthenticated && isAuthenticatedRoute;
  
  return (
    <div className="flex flex-col min-h-screen  w-full">
      <Navbar />
     
      {showUserNavbar &&
      <div className="mx-28 my-5"> 
      <UserNavbar />
      </div>
      }
      
      {!showUserNavbar && (
        <div className="mx-24 my-5">
          <MaintenanceBanner isVisible={true} />
        </div>
      )}
      <div className="mx-28 mb-5">
     
        {children}
   
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;