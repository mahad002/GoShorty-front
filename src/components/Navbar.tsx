import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import quoteIcon from '../assets/quote-icon.svg';
import Logo from './Logo';
import Menu from './Menu';
import { Menu as MenuIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header-wrapper">
      <div className="header-bar-wrapper">
        <ul>
          <li><a href="https://goshorty.co.uk/about-us/" target="_blank" rel="noopener">About GoShorty</a></li>
          <li><a href="https://goshorty.co.uk/faqs/" target="_blank" rel="noopener">FAQs</a></li>
          <li><a href="https://goshorty.co.uk/blog/" target="_blank" rel="noopener">Blog</a></li>
          <li><a href="https://goshorty.co.uk/contact" target="_blank" rel="noopener">Contact us</a></li>
        </ul>
      </div>
      <div className="flex justify-around items-center header-wrapper-inner">
        <div className="w-[90px] md:hidden">
          <img src={quoteIcon} alt="Quote Icon" className="text-[#00AEEF]" />
        </div>
        <div className="flex justify-center md:justify-start">
          <Logo />
        </div>
        <div className="w-[90px] flex justify-end items-center">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2"
          >
            <MenuIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Navbar;