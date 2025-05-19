import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightCircle as CircleArrowRight } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="form-main-container mb-5">
      <div className="form-inner-container">
        <div className="py-16 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-6 text-white">404</h1>
          <h2 className="text-3xl font-semibold mb-4 text-white">Page Not Found</h2>
          <p className="text-xl mb-8 text-gray-300 text-center max-w-md">
            Sorry, we couldn't find the page you're looking for. The GoShorty portal is only available for active users.
          </p>
          <div className="flex flex-col gap-4 items-center">
      

            <button 
              type="submit" 
              className="base-button button-style-primary base-button-full-width"
              onClick={() => window.location.href = 'https://goshorty.co.uk'} 
            >
            
                <>
                  <span className="font-bold">Visit GoShorty</span>
                  <CircleArrowRight className="w-6 h-6 ml-2 inline-block relative -top-[1px]" strokeWidth={1} />
                </>
           
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 