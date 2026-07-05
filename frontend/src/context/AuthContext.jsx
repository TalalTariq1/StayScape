// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);

// Keys for storing data securely in the browser window
const AUTH_STORAGE_KEY = 'stayscape_user';
const TOKEN_STORAGE_KEY = 'token';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // NEW MODAL CONTROL STATE: Accessible by any component on the site
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login'); // Supports 'login' or 'signup'

  // On app load, check if a session exists in localStorage so
  // refreshing the page doesn't log the user out.
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // LIVE login — Talks to Express API via authService
  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      
      // Save both the real JWT token and user profile to localStorage
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
      
      setUser(data.user);
      
      // NEW HANDLER BEHAVIOR: Close the popup instantly once login completes successfully
      setIsModalOpen(false);
      return data.user;
    } catch (error) {
      // Pass the error back up to your AuthModal so it can display the server's error message
      throw error;
    }
  };

  // LIVE signup — Talks to Express API via authService
  // LIVE signup — Registers the account without forcing auto-login
  const signup = async (fullName, email, password) => {
    try {
      const data = await registerUser(fullName, email, password);
      
      // Removed the automatic token generation & active user session sets 
      // so the guest is required to log in manually through the form.
      
      return data; // Passes raw success payload back up to AuthModal
    } catch (error) {
      throw error;
    }
  };

  // LIVE logout — Completely clears the browser session signatures
  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
  };

  // NEW HELPER TRIGGERS: Easily open/close modal and switch contexts from external components
  const openLoginModal = () => {
    setModalMode('login');
    setIsModalOpen(true);
  };

  const openSignupModal = () => {
    setModalMode('signup');
    setIsModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    // EXPORTED COMPONENT CONTROLLERS:
    isModalOpen,
    modalMode,
    openLoginModal,
    openSignupModal,
    closeAuthModal
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook so components just do: const { user, login, logout } = useAuth();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};