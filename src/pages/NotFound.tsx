
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-admin-surface">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-admin-primary">404</h1>
        <h2 className="text-2xl font-semibold text-admin-text mb-4">Page Not Found</h2>
        <p className="text-admin-text-light mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
