import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import PolicyDetail from '../components/PolicyDetail';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="fixed inset-0 flex items-center justify-center bg-[#1d2130] text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <div className="h-12 w-12 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Placeholder components for policies and quotes pages
// const PoliciesPage = () => ( // No longer needed, Dashboard will handle /policies
//   <div className="p-8 bg-[#1d2130] rounded-lg m-4 text-white min-h-[400px]">
//     <h1 className="text-2xl font-bold mb-6">Your Policies</h1>
//     <p className="text-lg">You currently have no active policies.</p>
//   </div>
// );

const QuotesPage = () => ( // This can remain if /quotes is a separate page structure
  <div className="p-8 bg-[#1d2130] rounded-lg m-4 text-white min-h-[400px]">
    <h1 className="text-2xl font-bold mb-6">Your Quotes</h1>
    <p className="text-lg">You currently have no saved quotes.</p>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/portal" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/policies" 
        element={ // Changed to render Dashboard for /policies
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/policies/:id" 
        element={
          <ProtectedRoute>
            <PolicyDetail />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/quotes" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes; 