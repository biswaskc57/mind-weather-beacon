
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CloudIcon } from '@/components/icons/Icons';

interface AirQualityCardProps {
  airQuality: {
    pm25: number;
    pm10: number;
    aqi: number;
  } | undefined;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQuality }) => {
  const getAirQualityStatus = (pm25: number) => {
    if (pm25 < 12) return { label: 'Good', color: 'text-green-500' };
    if (pm25 < 35.4) return { label: 'Moderate', color: 'text-yellow-500' };
    if (pm25 < 55.4) return { label: 'Unhealthy for Sensitive Groups', color: 'text-orange-500' };
    return { label: 'Unhealthy', color: 'text-red-500' };
  };

  const airStatus = airQuality ? 
    getAirQualityStatus(airQuality.pm25) : 
    { label: 'Unknown', color: 'text-gray-500' };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <CloudIcon className="mr-2 h-5 w-5" />
          Air Quality
        </CardTitle>
      </CardHeader>
      <CardContent>
        {airQuality ? (
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold">{airQuality.aqi}</span>
              <span className={`font-medium ${airStatus.color}`}>{airStatus.label}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">PM2.5</span>
                <span>{airQuality.pm25.toFixed(1)} μg/m³</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">PM10</span>
                <span>{airQuality.pm10.toFixed(1)} μg/m³</span>
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

export default AirQualityCard;
