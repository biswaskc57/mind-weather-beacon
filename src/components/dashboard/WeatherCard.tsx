
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SunnyIcon } from '@/components/icons/Icons';

interface WeatherCardProps {
  weather: {
    temperature: number;
    humidity: number;
    uvIndex: number;
  } | undefined;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getUVStatus = (uv: number) => {
    if (uv < 3) return { label: 'Low', color: 'text-green-500' };
    if (uv < 6) return { label: 'Moderate', color: 'text-yellow-500' };
    if (uv < 8) return { label: 'High', color: 'text-orange-500' };
    return { label: 'Very High', color: 'text-red-500' };
  };
  
  // Safe access to weather data
  const temperature = typeof weather?.temperature === 'number' ? weather.temperature : 0;
  const humidity = typeof weather?.humidity === 'number' ? weather.humidity : 0;
  const uvIndex = typeof weather?.uvIndex === 'number' ? weather.uvIndex : 0;
  
  const uvStatus = weather ? 
    getUVStatus(uvIndex) : 
    { label: 'Unknown', color: 'text-gray-500' };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <SunnyIcon className="mr-2 h-5 w-5" />
          Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        {weather ? (
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold">{temperature.toFixed(1)}°C</span>
              <span className="text-sm text-gray-500">{humidity.toFixed(0)}% humidity</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">UV Index</span>
                <span className={uvStatus.color}>{uvIndex.toFixed(1)} ({uvStatus.label})</span>
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

export default WeatherCard;
