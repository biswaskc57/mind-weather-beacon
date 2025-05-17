
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

const PollenCard: React.FC<PollenCardProps> = ({ pollen }) => {
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
              <span className="text-2xl font-bold">
                {((pollen.grass + pollen.tree + pollen.weed) / 3).toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">Average Level (0-5)</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Grass</span>
                <span>{pollen.grass}/5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tree</span>
                <span>{pollen.tree}/5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Weed</span>
                <span>{pollen.weed}/5</span>
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
