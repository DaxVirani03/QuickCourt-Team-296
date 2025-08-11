import React from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import LoadingSpinner from '../common/LoadingSpinner';

const Layout = ({ children }) => {
  const { loading } = useLoading();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

export default Layout; 