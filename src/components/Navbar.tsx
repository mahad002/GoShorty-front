import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Quote } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
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
      <div className="header-wrapper-inner">
        <div className="w-[90px] md:hidden">
          <Quote className="h-12 w-12 text-[#00AEEF]" />
        </div>
        <div>
          <Logo />
        </div>
        <div className="w-[90px]" />
      </div>
    </div>
  );
};

export default Navbar;