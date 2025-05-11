import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import car from '../assets/car-icon.svg';
import userIcon from '../assets/icon-user.svg';

const UserNavbar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="base-card bg-[#1d1e2c] w-full p-0 m-0 text-white">
      <div className="dashboard-top-banner">
        <div className="dashboard-welcome-text">
          <img src={car} alt="GoShorty Car Icon" />
          <div className="sub-header-text w-full">
            Hi, Mr Mohammed Bhatti, welcome to <em>Your GoShorty</em>
          </div>
        </div>
        <div>
          <div className="dashboard-main-links">
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
            <div className="dashboard-logout-link" onClick={logout}>
              <img src={userIcon} alt="GoShorty User Icon" />
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar; 