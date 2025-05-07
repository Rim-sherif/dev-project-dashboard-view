
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const initialProperties = [
  { 
    id: 1, 
    name: 'Luxury Penthouse A', 
    project: 'Skyline Towers',
    projectId: 1,
    type: 'Penthouse', 
    size: 2500, 
    bedrooms: 3, 
    bathrooms: 3.5,
    price: 1250000,
    status: 'Available',
    imageCount: 5
  },
  { 
    id: 2, 
    name: 'Deluxe Suite B', 
    project: 'Skyline Towers',
    projectId: 1,
    type: 'Apartment', 
    size: 1800, 
    bedrooms: 2, 
    bathrooms: 2,
    price: 850000,
    status: 'Sold',
    imageCount: 3
  },
  { 
    id: 3, 
    name: 'Garden Villa C', 
    project: 'Riverside Heights',
    projectId: 2,
    type: 'Villa', 
    size: 3200, 
    bedrooms: 4, 
    bathrooms: 4.5,
    price: 1750000,
    status: 'Available',
    imageCount: 8
  },
  { 
    id: 4, 
    name: 'Studio Apartment D', 
    project: 'City View Condos',
    projectId: 4,
    type: 'Studio', 
    size: 650, 
    bedrooms: 0, 
    bathrooms: 1,
    price: 450000,
    status: 'Reserved',
    imageCount: 2
  },
  { 
    id: 5, 
    name: 'Family Home E', 
    project: 'Green Valley Estates',
    projectId: 3,
    type: 'House', 
    size: 2800, 
    bedrooms: 4, 
    bathrooms: 3,
    price: 1450000,
    status: 'Available',
    imageCount: 6
  },
];

const Properties = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [viewMode, setViewMode] = useState('grid');
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    // In a real app, this would be an API call
    setProperties(properties.filter(property => property.id !== id));
    
    toast({
      title: "Property deleted",
      description: "The property has been deleted successfully",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'sold':
        return 'bg-red-100 text-red-700';
      case 'reserved':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardLayout title="Properties">
      <PageHeader 
        title="Properties" 
        description="Manage real estate properties"
        actionLabel="Add Property"
        actionHref="/properties/add"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-admin-secondary relative">
                {property.imageCount > 0 ? (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-md flex items-center">
                    <Image className="h-3 w-3 mr-1" /> {property.imageCount}
                  </div>
                ) : null}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-admin-text">{property.name}</h3>
                  <Badge className={getStatusColor(property.status)}>
                    {property.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-admin-text-light mb-2">
                  Project: <Link to={`/projects/${property.projectId}`} className="text-admin-primary hover:underline">{property.project}</Link>
                </p>
                
                <p className="font-bold text-lg text-admin-accent mb-3">
                  {formatPrice(property.price)}
                </p>
                
                <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-admin-text-light">
                  <div>
                    <p className="font-medium">{property.bedrooms}</p>
                    <p>Beds</p>
                  </div>
                  <div>
                    <p className="font-medium">{property.bathrooms}</p>
                    <p>Baths</p>
                  </div>
                  <div>
                    <p className="font-medium">{property.size}</p>
                    <p>Sq Ft</p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to={`/properties/${property.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/properties/edit/${property.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(property.id)}
                      className="text-admin-error hover:text-admin-error hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
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
                <th className="text-left p-4">Property</th>
                <th className="text-left p-4">Project</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Size</th>
                <th className="text-left p-4">Beds/Baths</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-b border-admin-border">
                  <td className="p-4 font-medium">{property.name}</td>
                  <td className="p-4">
                    <Link to={`/projects/${property.projectId}`} className="text-admin-primary hover:underline">
                      {property.project}
                    </Link>
                  </td>
                  <td className="p-4">{property.type}</td>
                  <td className="p-4">{property.size} sq ft</td>
                  <td className="p-4">{property.bedrooms} / {property.bathrooms}</td>
                  <td className="p-4">{formatPrice(property.price)}</td>
                  <td className="p-4">
                    <Badge className={getStatusColor(property.status)}>
                      {property.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/properties/${property.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/properties/edit/${property.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(property.id)}
                        className="text-admin-error hover:text-admin-error hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
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

export default Properties;
