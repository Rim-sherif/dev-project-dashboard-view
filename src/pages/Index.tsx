
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // Redirect to the dashboard when visiting the index page
  useEffect(() => {
    navigate('/login');
  }, [navigate]);
  
  return null;
};

export default Index;
