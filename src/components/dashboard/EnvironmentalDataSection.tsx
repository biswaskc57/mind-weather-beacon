
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CloudIcon, SunnyIcon, WindIcon } from '@/components/icons/Icons';

interface EnvironmentalDataSectionProps {
  environmentalData: any;
  airQualityHistory: any[];
  refetchData: () => void;
}

const EnvironmentalDataSection: React.FC<EnvironmentalDataSectionProps> = ({
  environmentalData,
  airQualityHistory,
  refetchData
}) => {
  const getAirQualityStatus = (pm25: number) => {
    if (pm25 < 12) return { label: 'Good', color: 'text-green-500' };
    if (pm25 < 35.4) return { label: 'Moderate', color: 'text-yellow-500' };
    if (pm25 < 55.4) return { label: 'Unhealthy for Sensitive Groups', color: 'text-orange-500' };
    return { label: 'Unhealthy', color: 'text-red-500' };
  };

  const getUVStatus = (uv: number) => {
    if (uv < 3) return { label: 'Low', color: 'text-green-500' };
    if (uv < 6) return { label: 'Moderate', color: 'text-yellow-500' };
    if (uv < 8) return { label: 'High', color: 'text-orange-500' };
    return { label: 'Very High', color: 'text-red-500' };
  };

  const airStatus = environmentalData ? 
    getAirQualityStatus(environmentalData.airQuality.pm25) : 
    { label: 'Unknown', color: 'text-gray-500' };
  
  const uvStatus = environmentalData ? 
    getUVStatus(environmentalData.weather.uvIndex) : 
    { label: 'Unknown', color: 'text-gray-500' };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Environmental Data</h2>
          <p className="text-muted-foreground">Detailed analysis of your surroundings</p>
        </div>
        <Button 
          variant="outline"
          onClick={refetchData}
          size="sm"
        >
          Refresh Data
        </Button>
      </div>
      
      {/* Air Quality Map */}
      <Card className="mb-6 overflow-hidden">
        <CardContent className="p-0">
          <iframe 
            title="Europe Air Quality Forecast - Pollen"
            width="100%" 
            height="300" 
            src="https://atmosphere.copernicus.eu/charts/embed/cams_air_quality/europe-air-quality-forecast-pollens?controls_overlay=1&layer_name=composition_europe_pol_grass_forecast_surface&level=key_0&originating_centre=85_2&player_dimension=valid_time&projection=opencharts_europe" 
            frameBorder="0" 
            allowFullScreen
          ></iframe>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CloudIcon className="mr-2 h-5 w-5" />
              Air Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            {environmentalData ? (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">{environmentalData.airQuality.aqi}</span>
                  <span className={`font-medium ${airStatus.color}`}>{airStatus.label}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">PM2.5</span>
                    <span>{environmentalData.airQuality.pm25.toFixed(1)} μg/m³</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">PM10</span>
                    <span>{environmentalData.airQuality.pm10.toFixed(1)} μg/m³</span>
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <SunnyIcon className="mr-2 h-5 w-5" />
              Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            {environmentalData ? (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">{environmentalData.weather.temperature.toFixed(1)}°C</span>
                  <span className="text-sm text-gray-500">{environmentalData.weather.humidity.toFixed(0)}% humidity</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">UV Index</span>
                    <span className={uvStatus.color}>{environmentalData.weather.uvIndex.toFixed(1)} ({uvStatus.label})</span>
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <WindIcon className="mr-2 h-5 w-5" />
              Pollen
            </CardTitle>
          </CardHeader>
          <CardContent>
            {environmentalData ? (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">
                    {((environmentalData.pollen.grass + environmentalData.pollen.tree + environmentalData.pollen.weed) / 3).toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">Average Level (0-5)</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Grass</span>
                    <span>{environmentalData.pollen.grass}/5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tree</span>
                    <span>{environmentalData.pollen.tree}/5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Weed</span>
                    <span>{environmentalData.pollen.weed}/5</span>
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
      </div>
      
      {/* Air Quality Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Air Quality Trend</CardTitle>
          <CardDescription>
            PM2.5 and PM10 levels over the past month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={airQualityHistory}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pm25" name="PM2.5 (μg/m³)" fill="#3B82F6" />
                <Bar dataKey="pm10" name="PM10 (μg/m³)" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentalDataSection;
