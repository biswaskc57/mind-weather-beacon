
import React from 'react';
import { Button } from '@/components/ui/button';

interface StressStatusInfoProps {
  score: number;
  trend?: 'increasing' | 'decreasing' | 'stable';
}

const StressStatusInfo: React.FC<StressStatusInfoProps> = ({ score, trend }) => {
  // Stress level categories
  const getStressCategory = (score: number) => {
    if (score < 30) return { label: 'Low', color: 'bg-green-500' };
    if (score < 60) return { label: 'Moderate', color: 'bg-yellow-500' };
    if (score < 80) return { label: 'High', color: 'bg-orange-500' };
    return { label: 'Very High', color: 'bg-red-500' };
  };
  
  const stressCategory = getStressCategory(score);
  
  return (
    <div className="flex-1 space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${stressCategory.color}`}></div>
          <span className="font-medium text-lg">{stressCategory.label} Stress Level</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {stressCategory.label === 'Low' && 'Your environmental stress level is low today. Great conditions for mental wellbeing.'}
          {stressCategory.label === 'Moderate' && 'Moderate stress factors detected in your environment. Take breaks when needed.'}
          {stressCategory.label === 'High' && 'High environmental stress detected. Consider activities to reduce mental strain.'}
          {stressCategory.label === 'Very High' && 'Very high environmental stress. Take precautions and prioritize self-care.'}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {trend === 'increasing' && (
          <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
            Increasing
          </div>
        )}
        {trend === 'decreasing' && (
          <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
            Decreasing
          </div>
        )}
        {trend === 'stable' && (
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Stable
          </div>
        )}
      </div>
      
      <Button variant="outline" size="sm">View Detailed Report</Button>
    </div>
  );
};

export default StressStatusInfo;
