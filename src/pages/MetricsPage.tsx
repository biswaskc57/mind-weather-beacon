import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import EnvironmentalCard from '@/components/dashboard/EnvironmentalCard';
import StressMeter from '@/components/dashboard/StressMeter';
import PersonalMeters from '@/components/dashboard/PersonalMeters';
import ChartCard from '@/components/dashboard/ChartCard';
import InsightCard from '@/components/dashboard/InsightCard';
import MindWeatherWidget from '@/components/dashboard/MindWeatherWidget';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { useStressMeter } from '@/hooks/use-stress-meter';
import { useIsMobile } from '@/hooks/use-mobile';
import { CloudIcon, MapPinIcon, WindIcon, ColdIcon, HotIcon, SunnyIcon, RainyIcon } from '@/components/icons/Icons';
import { Button } from '@/components/ui/button';

const MetricsPage = () => {
  const { location } = useLocation();
  const { data: environmentalData, isLoading: envDataLoading } = useEnvironmentalData({
    latitude: location?.latitude,
    longitude: location?.longitude
  });
  const { stressData } = useStressMeter({ environmentalData });
  const isMobile = useIsMobile();
  
  // Make sure we have safe default values for PM2.5 data
  const currentPm25Value = environmentalData?.airQuality?.pm25 || 15;
  
  // Mock data for charts - ensuring all values are numbers
  const pm25ChartData = [
    { name: 'Mon', value: 15 },
    { name: 'Tue', value: 18 },
    { name: 'Wed', value: 22 },
    { name: 'Thu', value: 19 },
    { name: 'Fri', value: 16 },
    { name: 'Sat', value: 14 },
    { name: 'Sun', value: Number(currentPm25Value.toFixed(1)) },
  ];
  
  // Mock forecast data
  const forecastData = [
    {
      day: 'Today',
      icon: <SunnyIcon className="w-6 h-6 text-yellow-500" />,
      condition: 'Clear Sky',
      impact: 'positive' as const,
      description: 'Good air quality and moderate UV index - great day for outdoor activities'
    },
    {
      day: 'Tomorrow',
      icon: <WindIcon className="w-6 h-6 text-blue-500" />,
      condition: 'Windy',
      impact: 'neutral' as const,
      description: 'Increased wind may reduce air quality slightly. Temperature remains stable.'
    },
    {
      day: 'Wednesday',
      icon: <RainyIcon className="w-6 h-6 text-gray-500" />,
      condition: 'Light Rain',
      impact: 'negative' as const,
      description: 'Rising humidity may increase discomfort. Consider indoor activities.'
    },
  ];

  // Safe access to environmental data with fallbacks
  const getAirQualityValue = (value: number | undefined, defaultValue: number): number => {
    return typeof value === 'number' ? value : defaultValue;
  };

  const getWeatherValue = (value: number | undefined, defaultValue: number): number => {
    return typeof value === 'number' ? value : defaultValue;
  };

  const getPollenAverage = (): number => {
    if (!environmentalData?.pollen) return 0;
    const { grass, tree, weed } = environmentalData.pollen;
    if (typeof grass !== 'number' || typeof tree !== 'number' || typeof weed !== 'number') return 0;
    return (grass + tree + weed) / 3;
  };

  return (
    <MainLayout>
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Health Metrics</h1>
        <p className="text-sm md:text-base text-muted-foreground">Detailed view of your environmental health factors</p>
      </div>
      
      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
        <EnvironmentalCard
          title="Air Quality"
          value={getAirQualityValue(environmentalData?.airQuality?.pm25, 0).toFixed(1)}
          unit="μg/m³"
          status={getAirQualityValue(environmentalData?.airQuality?.pm25, 0) < 12 ? 'good' : getAirQualityValue(environmentalData?.airQuality?.pm25, 0) < 35 ? 'moderate' : 'poor'}
          icon={<CloudIcon />}
          change="↑ 12% from yesterday"
        />
        <EnvironmentalCard
          title="Temperature"
          value={getWeatherValue(environmentalData?.weather?.temperature, 0).toFixed(1)}
          unit="°C"
          status={getWeatherValue(environmentalData?.weather?.temperature, 0) < 30 ? 'good' : 'moderate'}
          icon={getWeatherValue(environmentalData?.weather?.temperature, 0) > 25 ? <HotIcon /> : <ColdIcon />}
        />
        <EnvironmentalCard
          title="UV Index"
          value={getWeatherValue(environmentalData?.weather?.uvIndex, 0).toFixed(1)}
          unit=""
          status={getWeatherValue(environmentalData?.weather?.uvIndex, 0) < 3 ? 'good' : getWeatherValue(environmentalData?.weather?.uvIndex, 0) < 6 ? 'moderate' : 'poor'}
          icon={<SunnyIcon />}
        />
        <EnvironmentalCard
          title="Pollen"
          value={getPollenAverage().toFixed(1)}
          unit="/5"
          status={getPollenAverage() < 3 ? 'good' : 'moderate'}
          icon={<WindIcon />}
        />
      </div>
      
      {/* Personal Health Meters */}
      <div className="mb-4 md:mb-6">
        <PersonalMeters />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <StressMeter 
            value={stressData?.score || 50} 
            recentTrend={stressData?.trend || 'stable'} 
          />
          
          <ChartCard 
            title="Weekly PM2.5 Trend"
            description="Air quality particulate matter concentration"
            data={pm25ChartData}
            dataKey="value"
            color="#3B82F6"
            unit="μg/m³"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InsightCard
              title="Air Quality Alert"
              description={`Current PM2.5 levels ${getAirQualityValue(environmentalData?.airQuality?.pm25, 0) < 12 ? 'are good' : 'may affect sensitive individuals'}`}
              icon={<CloudIcon />}
              variant={getAirQualityValue(environmentalData?.airQuality?.pm25, 0) < 12 ? 'success' : 'warning'}
            />
            <InsightCard
              title="UV Protection"
              description={getWeatherValue(environmentalData?.weather?.uvIndex, 0) < 3 ? 'Low UV index today' : 'Wear sunscreen if outdoors'}
              icon={<SunnyIcon />}
              variant={getWeatherValue(environmentalData?.weather?.uvIndex, 0) < 3 ? 'success' : 'warning'}
            />
          </div>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          <MindWeatherWidget forecasts={forecastData} />
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="font-medium mb-3">Your Location</h3>
            {location ? (
              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-5 h-5 text-mindsense-primary" />
                <span>{location.city || 'Unknown Location'}</span>
              </div>
            ) : (
              <Button variant="outline" size="sm" className="w-full">
                Set Location
              </Button>
            )}
          </div>
          
          {!isMobile && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium mb-2">Daily Tip</h3>
              <p className="text-sm text-gray-600 mb-3">
                Spending time in nature has been shown to reduce stress and improve mood, even in urban environments.
              </p>
              <Button variant="link" className="p-0 h-auto">Learn more</Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MetricsPage;
