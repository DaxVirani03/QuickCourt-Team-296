import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set up axios defaults
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const res = await axios.get('/api/auth/me');
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user: res.data.user, token: state.token }
          });
        } catch (error) {
          localStorage.removeItem('token');
          dispatch({ type: 'AUTH_FAIL' });
        }
      } else {
        dispatch({ type: 'AUTH_FAIL' });
      }
    };

    loadUser();
  }, [state.token]);

  const login = async (email, password) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { user, token } = res.data;
      
      localStorage.setItem('token', token);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token }
      });
      
      return res.data;
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL' });
      throw error;
    }
  };

  const register = async (formData) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const res = await axios.post('/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return res.data;
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    });
  };

  const verifyEmail = async (email, otp) => {
    try {
      const res = await axios.post('/api/auth/verify-email', { email, otp });
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const res = await axios.post('/api/auth/reset-password', { token, password });
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const resendVerification = async (email) => {
    try {
      const res = await axios.post('/api/auth/resend-verification', { email });
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    login,
    register,
    logout,
    updateUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    resendVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 