import React from 'react';
import { ArrowRightCircle as CircleArrowRight } from 'lucide-react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`fixed top-0 right-0 h-full w-4/5 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-2 border-b">
          <h2 className="text-2xl font-sans">MENU</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        
        <div className="flex flex-col space-y-6">
          <div className="bg-[#ce43ff] flex items-center p-2 h-20">
            <span className="text-black text-xl">Home</span>
          </div>
          <div className="flex flex-col space-y-2 px-2">
            <a 
              href="https://goshorty.co.uk/quote/" 
              target="_blank"
              rel="noopener noreferrer"
              className="base-button button-style-primary w-full flex items-center justify-center px-4 py-3 bg-[#70ed9b] text-black"
              style={{ transition: 'none' }}
            >
              <span className="font-bold mr-2">Get a Quote</span>
              <CircleArrowRight className="w-6 h-6" strokeWidth={1} />
            </a>

            <a 
              href="https://goshorty.co.uk/help-centre/" 
              target="_blank"
              rel="noopener noreferrer"
              className="base-button button-style-primary w-full flex items-center justify-center px-4 py-3 bg-[#70ed9b] text-black"
              style={{ transition: 'none' }}
            >
              <span className="font-bold mr-2">Help Centre</span>
              <CircleArrowRight className="w-6 h-6" strokeWidth={1} />
            </a>

            <a 
              href="https://goshorty.co.uk/contact/" 
              target="_blank"
              rel="noopener noreferrer"
              className="base-button button-style-primary w-full flex items-center justify-center px-4 py-3 bg-[#70ed9b] text-black"
              style={{ transition: 'none' }}
            >
              <span className="font-bold mr-2">Contact Us</span>
              <CircleArrowRight className="w-6 h-6" strokeWidth={1} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu; 