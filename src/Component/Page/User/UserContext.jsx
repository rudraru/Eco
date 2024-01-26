import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context to hold user information
export const UserContext = createContext();

// Create a provider component to manage user state
export const UserProvider = ({ children }) => {
  // State to hold user information
  const [user, setUser] = useState(null);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Effect to run on component mount
  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');

    // If user data is present, set the user state
    if (storedUserId && storedUsername && storedEmail) {
      setUser({ userId: storedUserId, username: storedUsername, email: storedEmail });
    }

    // Set loading to false after checking localStorage
    setLoading(false);
  }, []);

  // Function to update user information on login
  const loginUser = (userData) => {
    setUser(userData);

    // Save user data to localStorage
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('email', userData.email);
    console.log('User logged in:', userData);
  };

  // Function to clear user information on logout
  const logoutUser = () => {
    setUser(null);

    // Clear user data from localStorage on logout
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    console.log('User logged out');
  };

  // Log user and loading state for debugging purposes
  console.log('User state:', user);
  console.log('Loading state:', loading);

  // Create a context value to provide to consumers
  const contextValue = {
    user,
    loading,
    loginUser,
    logoutUser,
  };

  // Provide the context value to the children components
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Custom hook to easily access the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
