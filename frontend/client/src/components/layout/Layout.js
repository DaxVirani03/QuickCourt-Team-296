import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';
import Header from './Header';
import LoadingSpinner from '../common/LoadingSpinner';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const { loading } = useLoading();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Header />}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout; 