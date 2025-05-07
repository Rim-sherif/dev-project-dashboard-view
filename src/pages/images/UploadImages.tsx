
import React, { useState, useRef } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock property data
const properties = [
  { id: 1, name: 'Luxury Penthouse A', project: 'Skyline Towers' },
  { id: 2, name: 'Deluxe Suite B', project: 'Skyline Towers' },
  { id: 3, name: 'Garden Villa C', project: 'Riverside Heights' },
  { id: 4, name: 'Studio Apartment D', project: 'City View Condos' },
  { id: 5, name: 'Family Home E', project: 'Green Valley Estates' },
];

interface ImageFile {
  id: number;
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

const UploadImages = () => {
  const [propertyId, setPropertyId] = useState('');
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file, index) => ({
        id: Date.now() + index,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: 'pending' as const,
      }));
      
      setFiles([...files, ...newFiles]);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((file, index) => ({
        id: Date.now() + index,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: 'pending' as const,
      }));
      
      setFiles([...files, ...newFiles]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = (id: number) => {
    const fileToRemove = files.find(file => file.id === id);
    if (fileToRemove && fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    
    setFiles(files.filter(file => file.id !== id));
  };

  const simulateUpload = (file: ImageFile, index: number) => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        
        if (progress >= 100) {
          clearInterval(interval);
          setFiles(currentFiles => 
            currentFiles.map(f => 
              f.id === file.id ? { ...f, progress: 100, status: 'complete' } : f
            )
          );
          resolve();
        } else {
          setFiles(currentFiles => 
            currentFiles.map(f => 
              f.id === file.id ? { ...f, progress, status: 'uploading' } : f
            )
          );
        }
      }, 500);
    });
  };

  const handleUpload = async () => {
    if (!propertyId) {
      toast({
        title: "Property required",
        description: "Please select a property before uploading",
        variant: "destructive",
      });
      return;
    }
    
    if (files.length === 0) {
      toast({
        title: "No files",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    const selectedProperty = properties.find(p => p.id.toString() === propertyId);
    
    try {
      // Simulate uploading files one by one
      for (let i = 0; i < files.length; i++) {
        await simulateUpload(files[i], i);
      }
      
      toast({
        title: "Upload successful",
        description: `Uploaded ${files.length} images for ${selectedProperty?.name}`,
      });
      
      setTimeout(() => {
        navigate('/images');
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Upload error",
        description: "There was an error uploading some files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardLayout title="Upload Images">
      <PageHeader 
        title="Upload Images" 
        description="Upload property images"
      />

      <Card className="max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="property">Property <span className="text-admin-error">*</span></Label>
              <Select
                value={propertyId}
                onValueChange={setPropertyId}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property.id} value={property.id.toString()}>
                      {property.name} ({property.project})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Images</Label>
              <div 
                className="mt-1 border-2 border-dashed border-admin-border rounded-lg p-6 text-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-admin-text-light mb-2" />
                  <p className="text-sm text-admin-text-light mb-1">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-admin-text-light">
                    Supported formats: JPEG, PNG, GIF, WebP
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
            
            {files.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium text-admin-text">Selected Files ({files.length})</h3>
                <div className="space-y-3">
                  {files.map((file) => (
                    <div key={file.id} className="bg-admin-secondary rounded-lg p-3 flex items-center">
                      <div className="h-12 w-12 bg-white rounded-md overflow-hidden flex-shrink-0 mr-3">
                        <img src={file.preview} alt={file.file.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-admin-text truncate" title={file.file.name}>
                          {file.file.name}
                        </p>
                        <p className="text-xs text-admin-text-light">
                          {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        {(file.status === 'uploading' || file.status === 'complete') && (
                          <Progress value={file.progress} className="h-1 mt-2" />
                        )}
                        {file.status === 'error' && (
                          <p className="text-xs text-admin-error mt-1">{file.error || 'Upload failed'}</p>
                        )}
                      </div>
                      {file.status !== 'uploading' && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="ml-2 text-admin-text-light hover:text-admin-error"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file.id);
                          }}
                          disabled={isUploading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/images')}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpload}
                disabled={isUploading || files.length === 0}
              >
                {isUploading ? 'Uploading...' : 'Upload Images'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default UploadImages;
