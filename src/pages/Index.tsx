
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading spinner while checking authentication
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-4">
          <span className="text-lg font-bold text-primary-foreground">SH</span>
        </div>
        <h1 className="text-2xl font-bold mb-6">Smart HRs</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    </div>
  );
};

export default Index;
