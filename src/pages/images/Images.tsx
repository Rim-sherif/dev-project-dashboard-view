
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Trash, Eye, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const initialImages = [
  { id: 1, name: 'Penthouse Living Room.jpg', property: 'Luxury Penthouse A', propertyId: 1, size: '2.4 MB', uploadDate: '2023-05-05' },
  { id: 2, name: 'Penthouse Kitchen.jpg', property: 'Luxury Penthouse A', propertyId: 1, size: '1.8 MB', uploadDate: '2023-05-05' },
  { id: 3, name: 'Garden Villa Exterior.jpg', property: 'Garden Villa C', propertyId: 3, size: '3.2 MB', uploadDate: '2023-05-04' },
  { id: 4, name: 'Studio Apartment View.jpg', property: 'Studio Apartment D', propertyId: 4, size: '1.5 MB', uploadDate: '2023-05-03' },
  { id: 5, name: 'Family Home Backyard.jpg', property: 'Family Home E', propertyId: 5, size: '2.8 MB', uploadDate: '2023-05-02' },
  { id: 6, name: 'Deluxe Suite Bathroom.jpg', property: 'Deluxe Suite B', propertyId: 2, size: '1.2 MB', uploadDate: '2023-05-02' },
];

const Images = () => {
  const [images, setImages] = useState(initialImages);
  const [viewMode, setViewMode] = useState('grid');
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    // In a real app, this would be an API call
    setImages(images.filter(image => image.id !== id));
    
    toast({
      title: "Image deleted",
      description: "The image has been deleted successfully",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <DashboardLayout title="Images">
      <PageHeader 
        title="Property Images" 
        description="Manage property images"
        actionLabel="Upload Images"
        actionHref="/images/upload"
      />

      <div className="mb-6">
        <Tabs defaultValue="grid" onValueChange={(value) => setViewMode(value)}>
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-admin-secondary relative">
                {/* In a real app, this would be a real image */}
                <div className="absolute inset-0 flex items-center justify-center text-admin-text-light">
                  Image Preview
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-admin-text truncate" title={image.name}>
                  {image.name}
                </h3>
                <p className="text-sm text-admin-text-light mb-2">
                  Property: <Link to={`/properties/${image.propertyId}`} className="text-admin-primary hover:underline">{image.property}</Link>
                </p>
                <div className="flex justify-between text-xs text-admin-text-light mb-3">
                  <span>{image.size}</span>
                  <span>{formatDate(image.uploadDate)}</span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/images/${image.id}`}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(image.id)}
                    className="text-admin-error hover:text-admin-error hover:bg-red-50"
                  >
                    <Trash className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-admin-border shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-admin-border">
                <th className="text-left p-4">Image Name</th>
                <th className="text-left p-4">Property</th>
                <th className="text-left p-4">Size</th>
                <th className="text-left p-4">Upload Date</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image.id} className="border-b border-admin-border">
                  <td className="p-4 font-medium">{image.name}</td>
                  <td className="p-4">
                    <Link to={`/properties/${image.propertyId}`} className="text-admin-primary hover:underline">
                      {image.property}
                    </Link>
                  </td>
                  <td className="p-4">{image.size}</td>
                  <td className="p-4">{formatDate(image.uploadDate)}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/images/${image.id}`}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(image.id)}
                        className="text-admin-error hover:text-admin-error hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Images;
