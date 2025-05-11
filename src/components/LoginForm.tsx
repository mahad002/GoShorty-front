import React, { useState } from 'react';
import { ArrowRightCircle as CircleArrowRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    surname: '',
    dateOfBirth: '',
    postcode: '',
    rememberDetails: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    // Clear error when user starts typing
    if (error) setError('');
    
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!formData.email || !formData.surname || !formData.dateOfBirth || !formData.postcode) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Show loading state
    setIsSubmitting(true);
    
    try {
      console.log('Attempting login with:', formData);
      
      // Call the login function from auth context
      const success = await login({
        email: formData.email,
        surname: formData.surname,
        dateOfBirth: formData.dateOfBirth,
        postcode: formData.postcode
      });
      
      if (success) {
        console.log('Login successful, navigating to dashboard');
        // If login is successful, navigate to dashboard
        navigate('/portal');
      } else {
        console.error('Login failed - invalid credentials');
        setError('Invalid login details. Please check your information and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // For test/demo purposes - fill with test data
  const fillTestData = () => {
    setFormData({
      email: 'user@example.com',
      surname: 'Bloggs',
      dateOfBirth: '27/04/1990',
      postcode: 'SE1 2AB',
      rememberDetails: true
    });
  };

  return (
    <div className="form-main-container mb-5">
      <div className="form-inner-container">
        {isInitialLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h1 className="text-3xl mb-6 font-semibold text-white">Loading...</h1>
            <div className="h-12 w-12 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-entry grid gap-6">
            <div className="sub-header-text">Login details</div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
            <div className="form-check-box flex items-center justify-center gap-3 w-full text-center">
              <input
                type="checkbox"
                id="rememberdetails"
                name="rememberDetails"
                checked={formData.rememberDetails}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-[#50E6A5] focus:ring-[#50E6A5] mt-4 mb-4"
                disabled={isSubmitting}
              />
              <label htmlFor="rememberdetails" className="text-white text-base mt-4 mb-4 text-center w-full">Remember details for next time?</label>
            </div>
            
            <button 
              type="submit" 
              className="base-button button-style-primary base-button-full-width"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span className="font-bold">Continue</span>
                  <CircleArrowRight className="w-6 h-6 ml-2 inline-block relative -top-[1px]" strokeWidth={1} />
                </>
              )}
            </button>
            
           
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;