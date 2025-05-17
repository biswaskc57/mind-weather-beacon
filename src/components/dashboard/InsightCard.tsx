
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface InsightCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  variant?: 'default' | 'warning' | 'success' | 'danger';
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  description, 
  icon, 
  variant = 'default' 
}) => {
  const getVariantStyles = () => {
    switch(variant) {
      case 'warning':
        return {
          border: 'border-l-yellow-500',
          iconBg: 'bg-yellow-100',
          iconText: 'text-yellow-800'
        };
      case 'success':
        return {
          border: 'border-l-green-500',
          iconBg: 'bg-green-100',
          iconText: 'text-green-800'
        };
      case 'danger':
        return {
          border: 'border-l-red-500',
          iconBg: 'bg-red-100',
          iconText: 'text-red-800'
        };
      default:
        return {
          border: 'border-l-blue-500',
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-800'
        };
    }
  };
  
  const styles = getVariantStyles();
  
  return (
    <Card className={cn("insights-card border-l-4", styles.border)}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className={cn("p-2 rounded-full", styles.iconBg)}>
            <div className={cn("w-5 h-5", styles.iconText)}>{icon}</div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
