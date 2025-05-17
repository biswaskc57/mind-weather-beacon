
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StressScore from './StressScore';
import StressStatusInfo from './StressStatusInfo';

interface StressScoreCardProps {
  score: number;
  trend?: 'increasing' | 'decreasing' | 'stable';
}

const StressScoreCard: React.FC<StressScoreCardProps> = ({ score, trend }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Stress Score</CardTitle>
        <CardDescription>Based on environmental factors and their impact on mental wellbeing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <StressScore score={score} />
          <StressStatusInfo score={score} trend={trend} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StressScoreCard;
