
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { WindIcon } from '@/components/icons/Icons';

interface PollenCardProps {
  pollen: {
    grass: number;
    tree: number;
    weed: number;
  } | undefined;
}

const getPollenLevelText = (level: number) => {
  if (level === 0) return "None";
  if (level === 1) return "Very Low";
  if (level === 2) return "Low";
  if (level === 3) return "Moderate";
  if (level === 4) return "High";
  return "Very High";
};

const getPollenLevelColor = (level: number) => {
  if (level <= 1) return "text-green-500";
  if (level <= 2) return "text-yellow-500";
  if (level <= 3) return "text-orange-500";
  return "text-red-500";
};

const PollenCard: React.FC<PollenCardProps> = ({ pollen }) => {
  const averageLevel = pollen ? 
    ((pollen.grass + pollen.tree + pollen.weed) / 3).toFixed(1) : 
    "0.0";
    
  const averageLevelNumeric = pollen ? 
    (pollen.grass + pollen.tree + pollen.weed) / 3 : 
    0;
    
  const averageLevelColor = getPollenLevelColor(Math.round(averageLevelNumeric));
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <WindIcon className="mr-2 h-5 w-5" />
          Pollen
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pollen ? (
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className={`text-2xl font-bold ${averageLevelColor}`}>
                {averageLevel}
              </span>
              <span className="text-sm text-gray-500">Average Level (0-5)</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Grass</span>
                <span className={getPollenLevelColor(pollen.grass)}>
                  {pollen.grass}/5 ({getPollenLevelText(pollen.grass)})
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tree</span>
                <span className={getPollenLevelColor(pollen.tree)}>
                  {pollen.tree}/5 ({getPollenLevelText(pollen.tree)})
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Weed</span>
                <span className={getPollenLevelColor(pollen.weed)}>
                  {pollen.weed}/5 ({getPollenLevelText(pollen.weed)})
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-20 flex items-center justify-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PollenCard;
