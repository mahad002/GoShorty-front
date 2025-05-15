import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import car from '../assets/car-icon.svg';
import userIcon from '../assets/icon-user.svg';

const UserNavbar: React.FC = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Get user name from auth context or use default
  const userName = user?.name || 'Mohammed Bhatti';

  return (
    <div className="base-card bg-[#1d1e2c] w-full p-0 m-0 text-white">
      {/* Desktop View (1262px and above) */}
      <div className="desktop-only-view">
        <div className="dashboard-top-banner flex flex-row justify-between items-center p-4">
          <div className="dashboard-welcome-text flex items-center">
            <img src={car} alt="GoShorty Car Icon" className="mr-2" />
            <div className="sub-header-text md:text-left">
              Hi, Mr {userName}, welcome to <em>Your GoShorty</em>
            </div>
          </div>
          <div>
            <div className="dashboard-main-links flex justify-end">
              <Link 
                to="/portal" 
                className={`dashboard-main-link ${isActive('/portal') ? 'dashboard-main-link-active' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/policies" 
                className={`dashboard-main-link ${isActive('/policies') ? 'dashboard-main-link-active' : ''}`}
              >
                Policies
              </Link>
              <Link 
                to="/quotes" 
                className={`dashboard-main-link ${isActive('/quotes') ? 'dashboard-main-link-active' : ''}`}
              >
                Quotes
              </Link>
              <div className="dashboard-logout-link flex" onClick={logout}>
                <img src={userIcon} alt="GoShorty User Icon" />
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet View (823px to 1261px) */}
      <div className="tablet-only-view">
        <div className="dashboard-top-banner flex flex-col justify-between items-center p-4">
          <div className="dashboard-welcome-text w-full flex items-center justify-center mb-4">
            <img src={car} alt="GoShorty Car Icon" className="mr-2" />
            <div className="sub-header-text">
              Hi, Mr {userName}, welcome to <em>Your GoShorty</em>
            </div>
          </div>
          <div className="w-full">
            <div className="dashboard-main-links flex justify-center">
              <Link 
                to="/portal" 
                className={`dashboard-main-link ${isActive('/portal') ? 'dashboard-main-link-active' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/policies" 
                className={`dashboard-main-link ${isActive('/policies') ? 'dashboard-main-link-active' : ''}`}
              >
                Policies
              </Link>
              <Link 
                to="/quotes" 
                className={`dashboard-main-link ${isActive('/quotes') ? 'dashboard-main-link-active' : ''}`}
              >
                Quotes
              </Link>
              <div className="dashboard-logout-link flex" onClick={logout}>
                <img src={userIcon} alt="GoShorty User Icon" />
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View (below 823px) - Only navigation links */}
      <div className="mobile-only-view">
        <div className="dashboard-main-links flex justify-center py-3">
          <Link 
            to="/portal" 
            className={`dashboard-main-link ${isActive('/portal') ? 'dashboard-main-link-active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/policies" 
            className={`dashboard-main-link ${isActive('/policies') ? 'dashboard-main-link-active' : ''}`}
          >
            Policies
          </Link>
          <Link 
            to="/quotes" 
            className={`dashboard-main-link ${isActive('/quotes') ? 'dashboard-main-link-active' : ''}`}
          >
            Quotes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar; 