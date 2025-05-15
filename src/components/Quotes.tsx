import React from 'react';
import { ArrowRightCircle as CircleArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Quotes: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="px-4 tablet-only-view:px-12 desktop-only-view:px-16 py-6 desktop-only-view:py-10 rounded-lg shadow-lg text-white bg-[#1d1e2c]">
      <div className="flex flex-col">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-white">Your GoShorty quotes</h2>
          <span className="text-xs text-white">{new Date().toLocaleString('en-GB')}</span>
        </div>
      </div>

      <hr className="border-gray-600 my-4" />
      
      <div className="text-center">
        <p className="text-white mb-6">You currently have no saved quotes. Would you like to start a new quote?</p>
        <button 
          type="button" 
          className="base-button button-style-primary"
          onClick={() => window.open('https://your.goshorty.co.uk/', '_blank')}
        >
          <>
            <span className="font-bold">Start new quote</span>
            <CircleArrowRight className="w-6 h-6 ml-2 inline-block relative -top-[1px]" strokeWidth={1} />
          </>
        </button>
      </div>

      <hr className="border-gray-600 my-4" />
      
      {/* Desktop and Tablet View Navigation */}
      <div className="hidden desktop-only-view tablet-only-view">
        <div className="flex justify-between">
          <button 
            className="flex items-center space-x-2 text-white hover:text-blue-400"
            onClick={() => navigate('/portal')}
          >
            <CircleArrowRight size={20} className="transform rotate-180 text-blue-400" />
            <span>Back Home</span>
          </button>
          <button 
            className="flex items-center space-x-2 text-white hover:text-blue-400"
            onClick={() => navigate('/policies')}
          >
            <span>View Policies</span>
            <CircleArrowRight size={20} className="text-blue-400" />
          </button>
        </div>
      </div>
      
      {/* Mobile View Navigation - Side by Side */}
      <div className="mobile-only-view">
        <div className="flex justify-between">
          <button 
            className="flex items-center space-x-1 text-white hover:text-blue-400"
            onClick={() => navigate('/portal')}
          >
            <CircleArrowRight size={16} className="transform rotate-180 text-blue-400" />
            <span>Back Home</span>
          </button>
          <button 
            className="flex items-center space-x-1 text-white hover:text-blue-400"
            onClick={() => navigate('/policies')}
          >
            <span>View Policies</span>
            <CircleArrowRight size={16} className="text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes; 