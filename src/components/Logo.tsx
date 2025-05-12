import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center justify-center md:justify-start">
      <img 
        src={logo}
        alt="GoShorty Insurance"
        className="h-12 md:h-16"
      />
    </Link>
  );
};

export default Logo;