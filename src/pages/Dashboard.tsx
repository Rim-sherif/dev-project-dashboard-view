
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Users, Briefcase, Building2, ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app, these would come from API calls
  const summaryData = {
    developers: 12,
    projects: 25,
    properties: 87,
    images: 342
  };

  const recentActivities = [
    { id: 1, type: 'property', action: 'added', name: 'Skyline Apartments', date: '2023-05-06' },
    { id: 2, type: 'developer', action: 'updated', name: 'Acme Development Co.', date: '2023-05-05' },
    { id: 3, type: 'project', action: 'added', name: 'Riverside Heights', date: '2023-05-04' },
    { id: 4, type: 'property', action: 'updated', name: 'City View Condos', date: '2023-05-03' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <DashboardLayout title="Dashboard">
      <PageHeader 
        title="Dashboard" 
        description="Welcome to PropertyAdmin dashboard"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card 
          title="Developers" 
          value={summaryData.developers} 
          icon={<Users className="h-6 w-6" />} 
          className="cursor-pointer"
          onClick={() => navigate('/developers')}
        />
        <Card 
          title="Projects" 
          value={summaryData.projects} 
          icon={<Briefcase className="h-6 w-6" />}
          className="cursor-pointer"
          onClick={() => navigate('/projects')}
        />
        <Card 
          title="Properties" 
          value={summaryData.properties} 
          icon={<Building2 className="h-6 w-6" />}
          className="cursor-pointer"
          onClick={() => navigate('/properties')}
        />
        <Card 
          title="Uploaded Images" 
          value={summaryData.images}
          icon={<ImageIcon className="h-6 w-6" />}
          className="cursor-pointer"
          onClick={() => navigate('/images')}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-admin-border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-admin-text mb-4">Recent Activity</h2>
        <div className="divide-y divide-admin-border">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="py-3 flex justify-between items-center">
              <div>
                <span className="font-medium text-admin-text">{activity.name}</span>
                <span className="text-admin-text-light"> was {activity.action}</span>
              </div>
              <span className="text-sm text-admin-text-light">{formatDate(activity.date)}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
