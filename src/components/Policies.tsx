import React from 'react';
import { ArrowRightCircle as CircleArrowRight } from 'lucide-react';
import PolicyCard, { Policy } from './PolicyCard';

const Policies: React.FC = () => {
  // Dummy data for now, replace with actual data fetching
  const livePolicies = 1;
  const expiredPolicies = 0;
  const allPolicies = 1;
  const lastUpdated = '11/05/2025, 14:10:30'; // This should also be dynamic
  const [active, setActive] = React.useState('live'); // To track which button is active
  
  // Sample policy data
  const samplePolicy: Policy = {
    id: '1',
    vehicle: 'Toyota Corolla',
    registration: 'AB12 CDE',
    coverStart: '01/01/2025',
    coverEnd: '31/12/2025',
    status: 'Live',
    type: 'Car'
  };

  // Show policies based on active filter
  const hasPolicies = (active === 'live' && livePolicies > 0) || 
                      (active === 'expired' && expiredPolicies > 0) || 
                      (active === 'all' && allPolicies > 0);

  return (
    <div className="px-4 tablet-only-view:px-12 desktop-only-view:px-16 py-6 desktop-only-view:py-10 rounded-lg shadow-lg text-white bg-[#1d1e2c]">
      {/* Desktop View */}
      <div className="hidden desktop-only-view ">
        <div className="grid grid-cols-3 items-end content-center">
          <div className="col-span-1">
            <h2 className="text-3xl font-bold text-white text-center">Your GoShorty policies</h2>
          </div>
          <div className="col-span-2 space-x-1 flex justify-end items-end">
            <button 
              onClick={() => setActive('live')}
              className={`${active === 'live' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'}  px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              Live (<span className="inline-block">{livePolicies}</span>)
            </button>
            <button 
              onClick={() => setActive('expired')}
              className={`${active === 'expired' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'} px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              Expired (<span className="inline-block">{expiredPolicies}</span>)
            </button>
            <button 
              onClick={() => setActive('all')}
              className={`${active === 'all' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'}  px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              All (<span className="inline-block">{allPolicies}</span>)
            </button>
            <span className="text-xs text-white">{lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Tablet View */}
      <div className="hidden tablet-only-view">
        <div className="flex flex-col">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-white">Your GoShorty policies</h2>
            <span className="text-xs text-white">{lastUpdated}</span>
          </div>
          <div className="flex justify-center space-x-2">
            <button 
              onClick={() => setActive('live')}
              className={`${active === 'live' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'}  px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              Live (<span className="inline-block">{livePolicies}</span>)
            </button>
            <button 
              onClick={() => setActive('expired')}
              className={`${active === 'expired' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'} px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              Expired (<span className="inline-block">{expiredPolicies}</span>)
            </button>
            <button 
              onClick={() => setActive('all')}
              className={`${active === 'all' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'}  px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              All (<span className="inline-block">{allPolicies}</span>)
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="mobile-only-view">
        <div className="flex flex-col">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold text-white">Your GoShorty policies</h2>
            <span className="text-xs text-white">{lastUpdated}</span>
          </div>
          <div className="flex justify-center space-x-2">
            <button 
              onClick={() => setActive('live')}
              className={`${active === 'live' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'}  px-4 py-1 rounded-full text-sm font-bold shadow-md`}
            >
              Live (<span className="inline-block">{livePolicies}</span>)
            </button>
            <button 
              onClick={() => setActive('expired')}
              className={`${active === 'expired' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'} px-4 py-1 rounded-full text-sm font-bold shadow-md`}
            >
              Expired (<span className="inline-block">{expiredPolicies}</span>)
            </button>
            {/* "All" button removed for mobile view */}
          </div>
        </div>
      </div>

      <hr className="border-gray-600 my-4" />
      {hasPolicies ? (
        <div>
          {(active === 'live' || active === 'all') && (
            <PolicyCard policy={samplePolicy} />
          )}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-white mb-6">Ooops, there are no policies to show here, would you like to start a new quote?</p>
          <button 
            type="submit" 
            className="base-button button-style-primary"
          >
            <>
              <span className="font-bold">Start new quote</span>
              <CircleArrowRight className="w-6 h-6 ml-2 inline-block relative -top-[1px]" strokeWidth={1} />
            </>
          </button>
        </div>
      )}

      <hr className="border-gray-600 my-4" />
      
      {/* Desktop and Tablet View Navigation */}
      <div className="hidden desktop-only-view tablet-only-view">
        <div className="flex justify-between">
          <button className="flex items-center space-x-2 text-white hover:text-blue-400">
            <CircleArrowRight size={20} className="transform rotate-180 text-blue-400" />
            <span>Back Home</span>
          </button>
          <button className="flex items-center space-x-2 text-white hover:text-blue-400">
            <span>View Quotes</span>
            <CircleArrowRight size={20} className="text-blue-400" />
          </button>
        </div>
      </div>
      
      {/* Mobile View Navigation - Side by Side */}
      <div className="mobile-only-view">
        <div className="flex justify-between">
          <button className="flex items-center space-x-1 text-white hover:text-blue-400">
            <CircleArrowRight size={16} className="transform rotate-180 text-blue-400" />
            <span>Back Home</span>
          </button>
          <button className="flex items-center space-x-1 text-white hover:text-blue-400">
            <span>View Quotes</span>
            <CircleArrowRight size={16} className="text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Policies; 