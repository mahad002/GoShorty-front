import React, { useState } from 'react';
import { ArrowRightCircle as CircleArrowRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    surname: '',
    dateOfBirth: '',
    postcode: '',
    rememberDetails: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add authentication logic here
  };

  return (
    <div className="form-main-container mb-5">
      <div className="form-inner-container">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-[#70ed9b] animate-spin" />
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        ) : (
          <div className="form-entry grid gap-6">
          <div className="sub-header-text">Login details</div>
          <div>
            <div className="form-input-label">Email</div>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input-input"
              placeholder="jo.bloggs@goshorty.co.uk"
            />
          </div>
          <div>
            <div className="form-input-label">Surname</div>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="form-input-input"
              placeholder="Bloggs"
            />
          </div>
          <div>
            <div className="form-input-label">Date of birth</div>
            <input
              type="text"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="form-input-input"
              placeholder="27/04/1990"
            />
          </div>
          <div>
            <div className="form-input-label">Postcode</div>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              className="form-input-input"
              placeholder="SE1 2AB"
            />
          </div>
          <div className="form-check-box flex items-center justify-center gap-3">
            <input
              type="checkbox"
              id="rememberdetails"
              name="rememberDetails"
              checked={formData.rememberDetails}
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-300 text-[#50E6A5] focus:ring-[#50E6A5] mt-4 mb-4"
            />
            <label htmlFor="rememberdetails" className="text-white text-base mt-4 mb-4">Remember details for next time?</label>
          </div>
          <button type="submit" className="base-button button-style-primary base-button-full-width">
            <span className="font-bold">Continue</span>
            <CircleArrowRight className="w-6 h-6 ml-2 inline-block relative -top-[1px]" strokeWidth={1} />
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;