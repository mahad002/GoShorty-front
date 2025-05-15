import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { authService } from '../service';


interface AuthContextType {
  isAuthenticated: boolean;Í
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
    const checkAuth = async () => {
      if (authService.isLoggedIn()) {
        try {
          const response = await authService.getProfile();
          if (response.success) {
            setUser(response.data);
          } else {
            // Token might be invalid, remove it
            authService.removeToken();
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          authService.removeToken();
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (userData: {
    email: string;
    surname: string;
    dateOfBirth: string;
    postcode: string;
  }): Promise<boolean> => {
    try {
      const response = await authService.login(userData);
      
      if (response.success) {
        setUser(response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
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