
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StressScoreCardProps {
  score: number;
  trend?: 'increasing' | 'decreasing' | 'stable';
}

const StressScoreCard: React.FC<StressScoreCardProps> = ({ 
  score = 50,
  trend = 'stable'
}) => {
  // Stress level categories
  const getStressCategory = (score: number) => {
    if (score < 30) return { label: 'Low', color: 'bg-green-500' };
    if (score < 60) return { label: 'Moderate', color: 'bg-yellow-500' };
    if (score < 80) return { label: 'High', color: 'bg-orange-500' };
    return { label: 'Very High', color: 'bg-red-500' };
  };
  
  const stressCategory = getStressCategory(score);

  return (
    <Card className="mb-16 max-w-3xl mx-auto w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Circular Score Display */}
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={score < 30 ? "#10B981" : 
                       score < 60 ? "#F59E0B" : 
                       score < 80 ? "#F97316" : "#EF4444"}
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset={283 - (score / 100) * 283}
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="50"
                fontSize="22"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="central"
              >
                {score.toFixed(0)}
              </text>
              <text
                x="50"
                y="65"
                fontSize="12"
                textAnchor="middle"
                alignmentBaseline="central"
                fill="#6B7280"
              >
                out of 100
              </text>
            </svg>
          </div>
          
          {/* Status and Info */}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default StressScoreCard;
