import React from 'react';
import { ArrowRightCircle as CircleArrowRight } from 'lucide-react';

const Quotes: React.FC = () => {
  // Dummy data for now, replace with actual data fetching
  const activeQuotes = 0;
  const expiredQuotes = 1;
  const allQuotes = 1;
  const lastUpdated = '11/05/2025, 14:10:30'; // This should also be dynamic

  return (
    <div className="px-24 py-10 rounded-lg shadow-lg text-white bg-[#1d1e2c]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-white text-center">Your GoShorty quotes</h2>
     
      </div>
      <hr className="border-gray-600 my-4" />
      <div className="text-center ">
        <p className="text-white mb-6">Ooops, there are no quotes to show here, would you like to start a new quote?</p>
        <button 
              type="submit" 
              className="base-button button-style-primary "
            >
                <>
                  <span className="font-bold">Start new quote</span>
                  <CircleArrowRight className="w-6 h-6 ml-2 inline-block relative -top-[1px]" strokeWidth={1} />
                </>
            </button>
      </div>
    </div>
  );
};

export default Quotes; 