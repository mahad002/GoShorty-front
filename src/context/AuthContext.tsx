import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Server URL from server.js
const SERVER_URL = 'http://localhost:3000';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (userData: {
    email: string;
    surname: string;
    dateOfBirth: string;
    postcode: string;
  }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  loading: true
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userData: {
    email: string;
    surname: string;
    dateOfBirth: string;
    postcode: string;
  }): Promise<boolean> => {
    try {
      // For development - allow any login without backend
      // Create a mock user with the provided email
      const mockUserData = {
        id: 1,
        email: userData.email || 'user@example.com',
        name: userData.surname || 'User',
        token: 'mock-jwt-token'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set the user
      setUser(mockUserData);
      localStorage.setItem('user', JSON.stringify(mockUserData));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 