import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowRightCircle } from 'lucide-react';
// Import local SVG files
import carIcon from '../assets/car-icon.svg';
import documentsIcon from '../assets/documents-icon.svg';
import helpcentreIcon from '../assets/helpcentre-icon.svg';
import contactIcon from '../assets/contact-icon.svg';
// For the UK flag in registration plates
import ukRegIcon from '../assets/veh-reg-uk.png';
// Import the new DashboardCard component
import DashboardCard from '../components/DashboardCard';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const userName = user?.name || 'Mohammed Bhatti';
  const firstName =  'Mohammed';
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}, ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

  // Dashboard card data for dynamic rendering
  const dashboardCards = [
    {
      icon: carIcon,
      title: "View your policies",
      description: "Review your current policies with GoShorty, including the option to download the associated documents for each policy."
    },
    {
      icon: documentsIcon,
      title: "View your quotes",
      description: "Retrieve and customise your prior quotes on GoShorty and buy more cover."
    },
    {
      icon: helpcentreIcon,
      title: "Help centre",
      description: "Access support and answers to your queries by browsing through GoShorty's comprehensive FAQ section."
    },
    {
      icon: contactIcon,
      title: "Contact us",
      description: "Require further assistance? Reach out to GoShorty, and we'll gladly assist you with any enquiry, big or small!"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Main Content */}
      <div className="w-full md:w-3/4 bg-[#1d1e2c] rounded-lg shadow-md overflow-hidden">
        <div className="px-28 py-5">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <h1 className="text-2xl font-bold text-white">Your GoShorty portal</h1>
            <span className="text-sm text-gray-400">{formattedDate}</span>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-1 text-white">Hello {firstName}, how can we help?</h2>
            <p className="text-gray-300 mb-6 text-sm leading-tight">
              Welcome to Your GoShorty. Here, you can easily see your policies, check past quotes, buy more cover, and make 
              changes to your preferences. Just choose an option below to get started.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-14">
              {/* Render cards dynamically */}
              {dashboardCards.map((card, index) => (
                <DashboardCard 
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="dashboard-sidebar w-full md:w-1/4 relative">
     
          <h2 className="dashboard-sidebar-header">New quote</h2>
          <p className="dashboard-sidebar-instructions">
            Enter a vehicle registration below to get a new quote:
          </p>
          <div className="dashboard-sidebar-input-wrap flex justify-center  h-12 text-xl ">
          
              <img src={ukRegIcon} alt="UK reg" />
            
            <input 
              type="text" 
              placeholder="ENTER REG" 
              className=" w-full text-3xl text-center font-bold"
            />
          </div>
          <div className="flex  w-full justify-center ">
            <button className="dashboard-sidebar-btn text-xl font-bold">
              Get a Quote <ArrowRightCircle size={16} />
            </button>
          </div>
          <div className="dashboard-sidebar-prev-label">
            Or click on one of your previous registrations:
          </div>
          <div className="dashboard-sidebar-prev-grid">
            <div className="dashboard-sidebar-prev-pill">
              <img src={ukRegIcon} alt="UK reg" />
              <span className='text-xl'>FV64KTK</span>
            </div>
            <div className="dashboard-sidebar-prev-pill">
              <img src={ukRegIcon} alt="UK reg" />
              <span className='text-xl'>N795ENB</span>
            </div>
            <div className="dashboard-sidebar-prev-pill">
              <img src={ukRegIcon} alt="UK reg" />
              <span className='text-xl'>VUI3PXY</span>
            </div>
            <div className="dashboard-sidebar-prev-pill">
              <img src={ukRegIcon} alt="UK reg" />
              <span className='text-xl'>VDI4TKE</span>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Dashboard; 