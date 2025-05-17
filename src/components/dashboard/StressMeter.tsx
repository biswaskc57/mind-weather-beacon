
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StressMeterProps {
  value: number; // 0-100
  recentTrend: 'increasing' | 'decreasing' | 'stable';
}

const StressMeter: React.FC<StressMeterProps> = ({ value, recentTrend }) => {
  // Ensure the value is within 0-100 range
  const normalizedValue = Math.max(0, Math.min(100, value));
  
  // Convert to percentage for styling
  const percentage = `${normalizedValue}%`;
  
  const getTrendIcon = () => {
    switch(recentTrend) {
      case 'increasing':
        return (
          <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        );
      case 'decreasing':
        return (
          <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        );
    }
  };
  
  const getStressLabel = () => {
    if (value < 30) return 'Low';
    if (value < 70) return 'Moderate';
    return 'High';
  };
  
  const getTrendText = () => {
    switch(recentTrend) {
      case 'increasing':
        return 'Increasing';
      case 'decreasing':
        return 'Decreasing';
      default:
        return 'Stable';
    }
  };
  
  const getTrendClass = () => {
    switch(recentTrend) {
      case 'increasing':
        return 'text-red-500';
      case 'decreasing':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stress Meter</CardTitle>
        <CardDescription>Your current stress level based on environmental and biometric data</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Current Level: {getStressLabel()}</span>
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              <span className={`text-sm ${getTrendClass()}`}>{getTrendText()}</span>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 flex rounded stress-meter-gradient">
              <div className="absolute top-0 right-0 h-full bg-black bg-opacity-30 rounded-r-full" style={{ width: `${100 - normalizedValue}%` }}></div>
            </div>
            <div className="relative h-0">
              <div 
                className="absolute bottom-0 w-3 h-3 rounded-full bg-white shadow-md border-2 border-mindsense-primary transform -translate-y-1" 
                style={{ left: `calc(${percentage} - 6px)` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 pt-2">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StressMeter;
