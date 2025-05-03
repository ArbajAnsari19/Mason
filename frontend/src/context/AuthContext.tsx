
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getToken, removeToken } from '@/api/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const token = getToken();
      
      if (token) {
        // In a real app, you might want to validate the token with the server
        try {
          // For now, we'll just extract user from localStorage if it exists
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.error('Failed to restore auth state:', error);
          removeToken();
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    removeToken();
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    setUser: (newUser: User) => {
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    },
    isAuthenticated: !!user,
    isLoading,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
