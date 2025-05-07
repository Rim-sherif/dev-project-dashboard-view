
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

// Mock developer data
const developers = [
  { id: 1, name: 'Acme Development Co.' },
  { id: 2, name: 'Skyline Builders' },
  { id: 3, name: 'Urban Home Developers' },
  { id: 4, name: 'Greenway Properties' },
  { id: 5, name: 'Modern Living Spaces' },
];

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    developerId: '',
    location: '',
    description: '',
    status: 'planning', // Default value
    startDate: '',
    estimatedCompletionDate: '',
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
    if (!formData.name || !formData.developerId || !formData.location) {
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
        title: "Project added",
        description: "The project has been added successfully",
      });
      navigate('/projects');
    }, 1000);
  };

  return (
    <DashboardLayout title="Add Project">
      <PageHeader 
        title="Add Project" 
        description="Create a new property development project"
      />

      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Project Name <span className="text-admin-error">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Project name"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="developer">Developer <span className="text-admin-error">*</span></Label>
                <Select
                  value={formData.developerId}
                  onValueChange={(value) => handleSelectChange('developerId', value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a developer" />
                  </SelectTrigger>
                  <SelectContent>
                    {developers.map((developer) => (
                      <SelectItem key={developer.id} value={developer.id.toString()}>
                        {developer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">Location <span className="text-admin-error">*</span></Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State, Country"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Project description"
                  className="mt-1"
                  rows={4}
                />
              </div>
              
              <div>
                <Label>Project Status</Label>
                <RadioGroup 
                  defaultValue="planning" 
                  className="flex space-x-4 mt-2"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="planning" id="planning" />
                    <Label htmlFor="planning" className="cursor-pointer">Planning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active" className="cursor-pointer">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id="completed" />
                    <Label htmlFor="completed" className="cursor-pointer">Completed</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="estimatedCompletionDate">Estimated Completion</Label>
                  <Input
                    id="estimatedCompletionDate"
                    name="estimatedCompletionDate"
                    type="date"
                    value={formData.estimatedCompletionDate}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/projects')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Project'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AddProject;
