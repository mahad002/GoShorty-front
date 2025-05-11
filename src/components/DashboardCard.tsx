import React from 'react';
import { ArrowRightCircle } from 'lucide-react';

interface DashboardCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  description,
  onClick = () => {}
}) => {
  return (
    <div 
      className="border border-gray-700 overflow-hidden bg-[#1f1f2f] p-5 cursor-pointer hover:bg-[#2a2a3a] transition-colors duration-200"
      onClick={onClick}
    >
      <div className="flex justify-center mb-4">
        <img src={icon} alt={`${title} icon`} className="h-10 w-10" />
      </div>
      <h3 className="text-3xl font-bold text-center mb-2 text-white ">{title}</h3>
      <p className="text-xs text-gray-300 text-center mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex justify-center ">
        <div className="rounded-full text-[#50E6A5]">
          <ArrowRightCircle size={22} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard; 