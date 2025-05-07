
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  actionLabel, 
  actionHref, 
  onAction 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-admin-text">{title}</h1>
        {description && <p className="text-admin-text-light mt-1">{description}</p>}
      </div>
      
      {actionLabel && (actionHref || onAction) && (
        actionHref ? (
          <Link to={actionHref}>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          </Link>
        ) : (
          <Button onClick={onAction}>
            <PlusIcon className="h-4 w-4 mr-2" />
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
};

export default PageHeader;
