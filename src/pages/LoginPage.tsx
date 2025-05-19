import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { authService } from '../service';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [validUser, setValidUser] = useState(false);
  const [emailParam, setEmailParam] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAccess = async () => {
      setLoading(true);
      
      // Parse the URL for email parameter
      const searchParams = new URLSearchParams(location.search);
      const email = searchParams.get('email');
      setEmailParam(email);
      
      // If no email parameter is provided, redirect to 404
      if (!email) {
        navigate('/404', { replace: true });
        return;
      }
      
      // Check if the email exists in the system
      try {
        const response = await authService.checkUser({ email });
        if (response.success && response.exists) {
          setValidUser(true);
        } else {
          // If email doesn't exist, redirect to 404
          navigate('/404', { replace: true });
        }
      } catch (error) {
        console.error('Error checking user:', error);
        navigate('/404', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    
    checkAccess();
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-12 w-12 border-4 border-t-[#70ed9b] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Only show login form if the user is valid
  if (validUser) {
    return (
      <div>
        <div className="main-header-text">
          Login to view your quotes and policies
        </div>
        <LoginForm initialEmail={emailParam} />
      </div>
    );
  }

  // This shouldn't render, but just in case
  return null;
};

export default LoginPage;