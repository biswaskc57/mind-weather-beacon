
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { CloudIcon, WindIcon, SunnyIcon } from '@/components/icons/Icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EnvironmentPage = () => {
  const { location } = useLocation();
  const { data, isLoading, refetch } = useEnvironmentalData({
    latitude: location?.latitude,
    longitude: location?.longitude
  });

  // Generate some mock historical data
  const airQualityHistory = [
    { name: 'Week 1', pm25: 12, pm10: 23 },
    { name: 'Week 2', pm25: 15, pm10: 27 },
    { name: 'Week 3', pm25: 18, pm10: 32 },
    { name: 'Week 4', pm25: 14, pm10: 25 },
    { name: 'Current', pm25: data?.airQuality?.pm25 || 15, pm10: data?.airQuality?.pm10 || 28 }
  ];

  const pollenHistory = [
    { name: 'Week 1', grass: 2, tree: 3, weed: 1 },
    { name: 'Week 2', grass: 3, tree: 2, weed: 2 },
    { name: 'Week 3', grass: 4, tree: 3, weed: 3 },
    { name: 'Week 4', grass: 3, tree: 2, weed: 2 },
    { name: 'Current', grass: data?.pollen?.grass || 2, tree: data?.pollen?.tree || 1, weed: data?.pollen?.weed || 2 }
  ];

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

  // Safe access to data with fallback values
  const airPm25 = data?.airQuality?.pm25 ?? 0;
  const airPm10 = data?.airQuality?.pm10 ?? 0;
  const airAqi = data?.airQuality?.aqi ?? 0;
  const weatherTemp = data?.weather?.temperature ?? 0;
  const weatherHumidity = data?.weather?.humidity ?? 0;
  const weatherUvIndex = data?.weather?.uvIndex ?? 0;
  const pollenGrass = data?.pollen?.grass ?? 0;
  const pollenTree = data?.pollen?.tree ?? 0;
  const pollenWeed = data?.pollen?.weed ?? 0;

  // Calculate pollen average safely
  const pollenAverage = data ? ((pollenGrass + pollenTree + pollenWeed) / 3) : 0;

  const airStatus = data ? getAirQualityStatus(airPm25) : { label: 'Unknown', color: 'text-gray-500' };
  const uvStatus = data ? getUVStatus(weatherUvIndex) : { label: 'Unknown', color: 'text-gray-500' };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Environmental Data</h1>
          <p className="text-muted-foreground">Detailed analysis of your surroundings</p>
        </div>
        <Button 
          variant="outline"
          disabled={isLoading}
          onClick={() => refetch()}
        >
          {isLoading ? 'Updating...' : 'Refresh Data'}
        </Button>
      </div>

      {/* Current Data Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CloudIcon className="mr-2 h-5 w-5" />
              Air Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data ? (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">{airAqi}</span>
                  <span className={`font-medium ${airStatus.color}`}>{airStatus.label}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">PM2.5</span>
                    <span>{airPm25.toFixed(1)} μg/m³</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">PM10</span>
                    <span>{airPm10.toFixed(1)} μg/m³</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center">
                <p className="text-gray-500">{isLoading ? 'Loading...' : 'No data available'}</p>
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
            {data ? (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">{weatherTemp.toFixed(1)}°C</span>
                  <span className="text-sm text-gray-500">{weatherHumidity.toFixed(0)}% humidity</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">UV Index</span>
                    <span className={uvStatus.color}>{weatherUvIndex.toFixed(1)} ({uvStatus.label})</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center">
                <p className="text-gray-500">{isLoading ? 'Loading...' : 'No data available'}</p>
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
            {data ? (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">
                    {pollenAverage.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">Average Level (0-5)</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Grass</span>
                    <span>{pollenGrass}/5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tree</span>
                    <span>{pollenTree}/5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Weed</span>
                    <span>{pollenWeed}/5</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center">
                <p className="text-gray-500">{isLoading ? 'Loading...' : 'No data available'}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Air Quality Trend</CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>Pollen Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pollenHistory}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="grass" name="Grass" fill="#10B981" />
                  <Bar dataKey="tree" name="Tree" fill="#059669" />
                  <Bar dataKey="weed" name="Weed" fill="#065F46" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EnvironmentPage;
