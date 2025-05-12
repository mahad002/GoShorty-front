import React from 'react';
import { Car, ChevronRight, ArrowRightCircle as CircleArrowRight } from 'lucide-react';
import DocumentIcon from '../assets/documents-icon.svg'; // Assuming SVGR setup
import UKFlag from '../assets/veh-reg-uk.png';

export interface Policy {
  id: string;
  vehicle: string;
  registration: string;
  coverStart: string;
  coverEnd: string;
  status: 'Expired' | 'Live';
  type: string; // e.g., 'Car'
}

interface PolicyCardProps {
  policy: Policy;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy }) => {
  const isExpired = policy.status === 'Expired';

  return (
    <>
      <div className="relative">
        <div className="absolute top-0 right-8 transform translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-full flex items-center">
          <Car size={16} className="text-white" />
          <span className="text-xxs leading-none ml-1">Car</span>
        </div>
      </div>
    
      <div className="bg-[#202132] p-6 rounded-lg shadow-md text-white mb-6 ">
        {/* Desktop View */}
        <div className="hidden desktop-only-view desktop-only-view:px-16">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div>
                <p className="text-sm text-white">Vehicle:</p>
                <p className="text-lg font-semibold">{policy.vehicle}</p>
              </div>
            </div>
            <div>
              {/* License Plate */}
              <div className="bg-yellow-400 text-black rounded text-center font-bold flex items-center justify-center border-2 border-blue-800">
                <div className="bg-blue-600 text-white text-xs self-stretch">
                  <img src={UKFlag} alt="UK Flag" className="w-6 h-8" />
                </div>
                <div className="flex items-center space-x-2 p-1">
                  <span>{policy.registration}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-white">Cover start:</p>
              <p className="whitespace-pre-line">{policy.coverStart}</p>
            </div>
            <div>
              <p className="text-sm text-white">Cover end:</p>
              <p className="whitespace-pre-line">{policy.coverEnd}</p>
            </div>
          </div>
        </div>

        {/* Tablet View */}
        <div className="hidden tablet-only-view">
          <div className="flex flex-col mb-4">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-white">Vehicle:</p>
                <p className="text-lg font-semibold">{policy.vehicle}</p>
              </div>
              <div>
                {/* License Plate */}
                <div className="bg-yellow-400 text-black rounded text-center font-bold flex items-center justify-center border-2 border-blue-800">
                  <div className="bg-blue-600 text-white text-xs self-stretch">
                    <img src={UKFlag} alt="UK Flag" className="w-6 h-8" />
                  </div>
                  <div className="flex items-center space-x-2 p-1">
                    <span>{policy.registration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-white">Cover start:</p>
                <p className="whitespace-pre-line">{policy.coverStart}</p>
              </div>
              <div>
                <p className="text-sm text-white">Cover end:</p>
                <p className="whitespace-pre-line">{policy.coverEnd}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="mobile-only-view">
          <div className="flex flex-col mb-4">
            {/* Registration plate first */}
            <div className="flex justify-center mb-3">
              <div className="bg-yellow-400 text-black rounded text-center font-bold flex items-center justify-center border-2 border-blue-800">
                <div className="bg-blue-600 text-white text-xs self-stretch">
                  <img src={UKFlag} alt="UK Flag" className="w-6 h-8" />
                </div>
                <div className="flex items-center space-x-2 p-1">
                  <span>{policy.registration}</span>
                </div>
              </div>
            </div>
            
            {/* Vehicle info below */}
            <div className="text-center mb-3">
              <p className="text-sm text-white">Vehicle:</p>
              <p className="text-lg font-semibold">{policy.vehicle}</p>
            </div>
            
            {/* Cover start and end with smaller text */}
            <div className="flex justify-between">
              <div className="text-center w-1/2">
                <p className="text-xs text-white">Cover start:</p>
                <p className="text-sm">{policy.coverStart}</p>
              </div>
              <div className="text-center w-1/2">
                <p className="text-xs text-white">Cover end:</p>
                <p className="text-sm">{policy.coverEnd}</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-600 my-4" />

        {/* Desktop and Tablet View */}
        <div className="hidden desktop-only-view tablet-only-view">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-sm text-white">Current status:</p>
              <p className={`font-semibold ${isExpired ? 'text-red-400' : 'text-green-400'} ml-2`}>
                {policy.status}
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 border border-gray-500 hover:border-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                <span>Documents</span>
                <ChevronRight size={16} />
                <img src={DocumentIcon} alt="Documents" className="w-5 h-5" />
              </button>
              <button className="flex items-center space-x-2 bg-[#70ed9b] text-[#1d1e2c] px-4 py-2 rounded-full text-sm font-bold hover:bg-opacity-90">
                <span>Buy again</span>
                <CircleArrowRight size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
          
        {/* Mobile View */}
        <div className="mobile-only-view">
          <div className="flex flex-col">
            <div className="flex items-center justify-center mb-4">
              <p className="text-sm text-white">Current status:</p>
              <p className={`font-semibold ${isExpired ? 'text-red-400' : 'text-green-400'} ml-2`}>
                {policy.status}
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button className="flex-1 flex items-center justify-center space-x-1 border border-gray-500 hover:border-gray-400 text-white px-2 py-2 rounded-full text-xs font-medium">
                <span>Documents</span>
                <ChevronRight size={14} />
                <img src={DocumentIcon} alt="Documents" className="w-4 h-4" />
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 bg-[#70ed9b] text-[#1d1e2c] px-2 py-2 rounded-full text-xs font-bold hover:bg-opacity-90">
                <span>Buy again</span>
                <CircleArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyCard;
