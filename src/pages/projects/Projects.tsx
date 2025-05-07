
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Mock data
const initialProjects = [
  { 
    id: 1, 
    name: 'Skyline Towers', 
    developer: 'Acme Development Co.', 
    developerId: 1,
    location: 'Downtown, Metro City', 
    status: 'Active',
    properties: 24
  },
  { 
    id: 2, 
    name: 'Riverside Heights', 
    developer: 'Skyline Builders', 
    developerId: 2,
    location: 'Riverside, Metro City', 
    status: 'Planning',
    properties: 12
  },
  { 
    id: 3, 
    name: 'Green Valley Estates', 
    developer: 'Urban Home Developers', 
    developerId: 3,
    location: 'Green Valley, Metro City', 
    status: 'Completed',
    properties: 36
  },
  { 
    id: 4, 
    name: 'City View Condos', 
    developer: 'Greenway Properties', 
    developerId: 4,
    location: 'Midtown, Metro City', 
    status: 'Active',
    properties: 18
  },
  { 
    id: 5, 
    name: 'Metro Heights', 
    developer: 'Modern Living Spaces', 
    developerId: 5,
    location: 'Uptown, Metro City', 
    status: 'Planning',
    properties: 0
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    // In a real app, this would be an API call
    setProjects(projects.filter(project => project.id !== id));
    
    toast({
      title: "Project deleted",
      description: "The project has been deleted successfully",
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'default';
      case 'planning':
        return 'outline';
      case 'completed':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <DashboardLayout title="Projects">
      <PageHeader 
        title="Projects" 
        description="Manage property development projects"
        actionLabel="Add Project"
        actionHref="/projects/add"
      />

      <div className="bg-white rounded-lg border border-admin-border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Developer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Properties</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <Link to={`/developers/${project.developerId}`} className="text-admin-primary hover:underline">
                    {project.developer}
                  </Link>
                </TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(project.status)}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.properties}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/projects/${project.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/projects/edit/${project.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(project.id)}
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

export default Projects;
