import React from 'react';
import { Car, ChevronRight, ArrowRightCircle as CircleArrowRight } from 'lucide-react';
import DocumentIcon from '../assets/documents-icon.svg'; // Assuming SVGR setup

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
    <div className="bg-[#2a2b3a] p-6 rounded-lg shadow-md text-white mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-400">Vehicle:</p>
          <p className="text-lg font-semibold">{policy.vehicle}</p>
        </div>
        <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-full text-xs">
          <Car size={16} className="text-gray-400" />
          <span>{policy.type}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          {/* License Plate */}
          <div className="bg-yellow-400 text-black p-2 rounded text-center font-bold flex items-center justify-center border-2 border-blue-800">
            <div className="bg-blue-600 text-white text-xs px-1 mr-1 self-stretch flex flex-col justify-center items-center rounded-l-sm">
              <span className="font-bold leading-none">UK</span>
              <span className="text-xxs leading-none">GB</span>
            </div>
            {policy.registration}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400">Cover start:</p>
          <p className="whitespace-pre-line">{policy.coverStart}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Cover end:</p>
          <p className="whitespace-pre-line">{policy.coverEnd}</p>
        </div>
      </div>

      <hr className="border-gray-600 my-4" />

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Current status:</p>
          <p className={`font-semibold ${isExpired ? 'text-red-400' : 'text-green-400'}`}>
            {policy.status}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 border border-gray-500 hover:border-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium">
          <img src={DocumentIcon} alt="Documents" className="w-5 h-5" />
            <span>Documents</span>
            <ChevronRight size={16} />
          </button>
          <button className="flex items-center space-x-2 bg-[#70ed9b] text-[#1d1e2c] px-4 py-2 rounded-full text-sm font-bold hover:bg-opacity-90">
            <span>Buy again</span>
            <CircleArrowRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;

// Add to your global CSS or a style tag if not already present for text-xxs:
// .text-xxs { font-size: 0.625rem; /* 10px */ }
// Ensure your tailwind.config.js can generate this or similar small font sizes. 