import React, { useState, useEffect } from 'react';
import { ArrowRightCircle as CircleArrowRight } from 'lucide-react';
import PolicyCard, { Policy } from './PolicyCard';
import { policyService } from '../service';
import { useNavigate } from 'react-router-dom';

const Policies: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [policyCounts, setPolicyCounts] = useState({
    livePolicies: 0,
    expiredPolicies: 0,
    allPolicies: 0,
    lastUpdated: new Date().toLocaleString('en-GB')
  });
  const [active, setActive] = useState('live'); // To track which button is active
  const [error, setError] = useState('');

  // Fetch policies based on active filter
  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      try {
        // Convert status to proper case to match backend expectations
        const status = active === 'live' ? 'Live' : 
                      active === 'expired' ? 'Expired' : 'All';
                      
        const response = await policyService.getPolicies(status);
        if (response.success) {
          // Transform backend policy data to match our Policy interface
          const formattedPolicies = response.data.map((policy: any) => ({
            id: policy.id || policy._id || policy.policyNumber,
            vehicle: policy.vehicle,
            registration: policy.registration,
            coverStart: policy.coverStart,
            coverEnd: policy.coverEnd,
            status: policy.status,
            type: policy.type || 'Car'
          }));
          
          // Double-check filtering on frontend side in case backend isn't filtering correctly
          let filteredPolicies = formattedPolicies;
          if (active === 'live') {
            filteredPolicies = formattedPolicies.filter((policy: Policy) => policy.status === 'Live');
          } else if (active === 'expired') {
            filteredPolicies = formattedPolicies.filter((policy: Policy) => policy.status === 'Expired');
          }
          
          setPolicies(filteredPolicies);
          console.log(`Filtered ${status} policies:`, filteredPolicies);
        } else {
          setError('Failed to fetch policies');
        }
      } catch (err) {
        setError('An error occurred while fetching policies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [active]);

  // Fetch policy counts
  useEffect(() => {
    const fetchPolicyCounts = async () => {
      try {
        const response = await policyService.getPolicyCounts();
        if (response.success) {
          setPolicyCounts({
            livePolicies: response.data.liveCount || 0,
            expiredPolicies: response.data.expiredCount || 0,
            allPolicies: response.data.totalCount || 0,
            lastUpdated: new Date().toLocaleString('en-GB')
          });
        } else if (response.liveCount !== undefined) {
          // Direct response without data wrapper
          setPolicyCounts({
            livePolicies: response.liveCount || 0,
            expiredPolicies: response.expiredCount || 0,
            allPolicies: response.totalCount || 0,
            lastUpdated: new Date().toLocaleString('en-GB')
          });
        }
      } catch (err) {
        console.error('Failed to fetch policy counts:', err);
      }
    };

    fetchPolicyCounts();
  }, []);

  // Show policies based on active filter and loading state
  const hasPolicies = policies.length > 0;

  if (loading) {
    return (
      <div className="px-4 tablet-only-view:px-12 desktop-only-view:px-16 py-6 desktop-only-view:py-10 rounded-lg shadow-lg text-white bg-[#1d1e2c] flex justify-center items-center min-h-[400px]">
        <div className="h-12 w-12 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
              Live (<span className="inline-block">{policyCounts.livePolicies}</span>)
            </button>
            <button 
              onClick={() => setActive('expired')}
              className={`${active === 'expired' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'} px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              Expired (<span className="inline-block">{policyCounts.expiredPolicies}</span>)
            </button>
            <button 
              onClick={() => setActive('all')}
              className={`${active === 'all' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'}  px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              All (<span className="inline-block">{policyCounts.allPolicies}</span>)
            </button>
            <span className="text-xs text-white">{policyCounts.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Tablet View */}
      <div className="hidden tablet-only-view">
        <div className="flex flex-col">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-white">Your GoShorty policies</h2>
            <span className="text-xs text-white">{policyCounts.lastUpdated}</span>
          </div>
          <div className="flex justify-center space-x-2">
            <button 
              onClick={() => setActive('live')}
              className={`${active === 'live' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'}  px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              Live (<span className="inline-block">{policyCounts.livePolicies}</span>)
            </button>
            <button 
              onClick={() => setActive('expired')}
              className={`${active === 'expired' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'} px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              Expired (<span className="inline-block">{policyCounts.expiredPolicies}</span>)
            </button>
            <button 
              onClick={() => setActive('all')}
              className={`${active === 'all' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'}  px-6 py-1 rounded-full text-base font-bold shadow-md`}
            >
              All (<span className="inline-block">{policyCounts.allPolicies}</span>)
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="mobile-only-view">
        <div className="flex flex-col">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold text-white">Your GoShorty policies</h2>
            <span className="text-xs text-white">{policyCounts.lastUpdated}</span>
          </div>
          <div className="flex justify-center space-x-2">
            <button 
              onClick={() => setActive('live')}
              className={`${active === 'live' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'}  px-4 py-1 rounded-full text-sm font-bold shadow-md`}
            >
              Live (<span className="inline-block">{policyCounts.livePolicies}</span>)
            </button>
            <button 
              onClick={() => setActive('expired')}
              className={`${active === 'expired' ? 'bg-[#70ed9b] text-[#1d1e2c]' : 'border border-white text-white'} px-4 py-1 rounded-full text-sm font-bold shadow-md`}
            >
              Expired (<span className="inline-block">{policyCounts.expiredPolicies}</span>)
            </button>
            {/* "All" button removed for mobile view */}
          </div>
        </div>
      </div>

      <hr className="border-gray-600 my-4" />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {hasPolicies ? (
        <div>
          {policies.map(policy => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-white mb-6">Ooops, there are no policies to show here, would you like to start a new quote?</p>
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
      )}

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
            onClick={() => navigate('/quotes')}
          >
            <span>View Quotes</span>
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
            onClick={() => navigate('/quotes')}
          >
            <span>View Quotes</span>
            <CircleArrowRight size={16} className="text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Policies; 