
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EnvironmentalCardProps {
  title: string;
  value: string | number;
  unit: string;
  status: 'good' | 'moderate' | 'poor';
  icon: React.ReactNode;
  change?: string;
}

const EnvironmentalCard: React.FC<EnvironmentalCardProps> = ({
  title,
  value,
  unit,
  status,
  icon,
  change
}) => {
  const getStatusColors = () => {
    switch(status) {
      case 'good':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          badge: 'bg-green-500'
        };
      case 'moderate':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          badge: 'bg-yellow-500'
        };
      case 'poor':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          badge: 'bg-red-500'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          badge: 'bg-gray-500'
        };
    }
  };
  
  const colors = getStatusColors();
  
  return (
    <Card className="environment-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
          <div className={`${colors.bg} p-2 rounded-full`}>
            <div className="w-5 h-5 text-gray-700">{icon}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end space-x-1">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground mb-1">{unit}</div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${colors.badge} mr-2`}></div>
            <span className="text-sm capitalize">{status}</span>
          </div>
          
          {change && (
            <div className="text-xs text-gray-500">{change}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalCard;
