import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('helphive_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('helphive_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: Date.now(),
        email,
        name: email.split('@')[0],
        role: 'seeker', // seeker or helper
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        joinedDate: new Date().toISOString(),
        rating: 4.8,
        completedTasks: 23,
        location: {
          city: 'San Francisco',
          state: 'CA',
          coords: { lat: 37.7749, lng: -122.4194 }
        }
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('helphive_user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        ...userData,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
        joinedDate: new Date().toISOString(),
        rating: 5.0,
        completedTasks: 0,
        location: {
          city: 'San Francisco',
          state: 'CA',
          coords: { lat: 37.7749, lng: -122.4194 }
        }
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('helphive_user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('helphive_user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('helphive_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};