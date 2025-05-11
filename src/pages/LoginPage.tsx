import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <div className="main-header-text">
        Login to view your quotes and policies
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;