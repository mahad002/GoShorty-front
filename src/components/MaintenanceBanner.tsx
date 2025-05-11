import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface MaintenanceBannerProps {
  isVisible?: boolean;
}

const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({ isVisible = false }) => {
  if (!isVisible) return null;
  
  return (
    <div className="container px-2 ml-auto mr-auto">
      <div className="p-3 text-center bg-[#ff9800] text-gs-tarmac rounded-lg flex gap-2 items-center text-lg font-medium">
        <div className="hidden p-5 md:flex justify-center">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <div>
          Please note, that the system is scheduled to start maintenance at 11/05/2025 00:00:00 and end at 11/05/2025 02:00:00. Your GoShorty will be unavailable at this time.
        </div>
      </div>
    </div>
  );
};

export default MaintenanceBanner;