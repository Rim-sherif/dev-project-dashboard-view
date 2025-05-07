
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, value, icon, description, trend, className }) => {
  return (
    <div className={cn(
      "bg-white rounded-lg border border-admin-border p-6 shadow-sm transition-all hover:shadow-md", 
      className
    )}>
      <div className="flex justify-between">
        <div>
          <p className="text-admin-text-light text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-admin-text mt-2">{value}</h3>
          
          {description && (
            <p className="text-sm text-admin-text-light mt-2">{description}</p>
          )}
          
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? 'text-admin-success' : 'text-admin-error'}`}>
              <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="h-12 w-12 bg-admin-secondary rounded-full flex items-center justify-center text-admin-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
