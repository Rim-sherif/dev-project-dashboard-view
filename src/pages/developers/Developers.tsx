
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock data
const initialDevelopers = [
  { id: 1, name: 'Acme Development Co.', email: 'info@acme-dev.com', phone: '(555) 123-4567', projects: 8 },
  { id: 2, name: 'Skyline Builders', email: 'contact@skylinebuilders.com', phone: '(555) 234-5678', projects: 5 },
  { id: 3, name: 'Urban Home Developers', email: 'info@urbanhomedevelopers.com', phone: '(555) 345-6789', projects: 3 },
  { id: 4, name: 'Greenway Properties', email: 'hello@greenwayproperties.com', phone: '(555) 456-7890', projects: 7 },
  { id: 5, name: 'Modern Living Spaces', email: 'info@modernlivingspaces.com', phone: '(555) 567-8901', projects: 4 },
];

const Developers = () => {
  const [developers, setDevelopers] = useState(initialDevelopers);
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    // In a real app, this would be an API call
    setDevelopers(developers.filter(developer => developer.id !== id));
    
    toast({
      title: "Developer deleted",
      description: "The developer has been deleted successfully",
    });
  };

  return (
    <DashboardLayout title="Developers">
      <PageHeader 
        title="Developers" 
        description="Manage property developers"
        actionLabel="Add Developer"
        actionHref="/developers/add"
      />

      <div className="bg-white rounded-lg border border-admin-border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {developers.map((developer) => (
              <TableRow key={developer.id}>
                <TableCell className="font-medium">{developer.name}</TableCell>
                <TableCell>{developer.email}</TableCell>
                <TableCell>{developer.phone}</TableCell>
                <TableCell>{developer.projects}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/developers/${developer.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/developers/edit/${developer.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(developer.id)}
                      className="text-admin-error hover:text-admin-error hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default Developers;
