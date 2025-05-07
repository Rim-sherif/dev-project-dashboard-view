
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Mock project data
const projects = [
  { id: 1, name: 'Skyline Towers', developer: 'Acme Development Co.' },
  { id: 2, name: 'Riverside Heights', developer: 'Skyline Builders' },
  { id: 3, name: 'Green Valley Estates', developer: 'Urban Home Developers' },
  { id: 4, name: 'City View Condos', developer: 'Greenway Properties' },
];

const propertyTypes = [
  'Apartment', 'Penthouse', 'Villa', 'House', 'Studio', 'Duplex', 'Townhouse'
];

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    projectId: '',
    type: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    description: '',
    status: 'available', // Default value
    features: '', // Comma-separated
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.projectId || !formData.price) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Property added",
        description: "The property has been added successfully",
      });
      navigate('/properties');
    }, 1000);
  };

  return (
    <DashboardLayout title="Add Property">
      <PageHeader 
        title="Add Property" 
        description="Create a new real estate property"
      />

      <Card className="max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 md:col-span-2">
                <div>
                  <Label htmlFor="name">Property Name <span className="text-admin-error">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Property name"
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="project">Project <span className="text-admin-error">*</span></Label>
                  <Select
                    value={formData.projectId}
                    onValueChange={(value) => handleSelectChange('projectId', value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.name} ({project.developer})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="type">Property Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="size">Size (sq ft)</Label>
                <Input
                  id="size"
                  name="size"
                  type="number"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Size in square feet"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="Number of bedrooms"
                  className="mt-1"
                  min="0"
                  step="1"
                />
              </div>
              
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="Number of bathrooms"
                  className="mt-1"
                  min="0"
                  step="0.5"
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price <span className="text-admin-error">*</span></Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="mt-1"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <Label>Property Status</Label>
                <RadioGroup 
                  defaultValue="available" 
                  className="flex space-x-4 mt-2"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="available" id="available" />
                    <Label htmlFor="available" className="cursor-pointer">Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reserved" id="reserved" />
                    <Label htmlFor="reserved" className="cursor-pointer">Reserved</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sold" id="sold" />
                    <Label htmlFor="sold" className="cursor-pointer">Sold</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Property address"
                  className="mt-1"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="features">Features</Label>
                <Input
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="e.g. Balcony, Swimming Pool, Garden (comma-separated)"
                  className="mt-1"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Property description"
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/properties')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Property'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AddProperty;
