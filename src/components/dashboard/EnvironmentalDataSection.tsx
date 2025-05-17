
import React from 'react';
import { Button } from '@/components/ui/button';
import AirQualityCard from './AirQualityCard';
import WeatherCard from './WeatherCard';
import PollenCard from './PollenCard';
import AirQualityChart from './AirQualityChart';
import AirQualityMap from './AirQualityMap';

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
      <AirQualityMap />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <AirQualityCard airQuality={environmentalData?.airQuality} />
        <WeatherCard weather={environmentalData?.weather} />
        <PollenCard pollen={environmentalData?.pollen} />
      </div>
      
      {/* Air Quality Chart */}
      <AirQualityChart airQualityHistory={airQualityHistory} />
    </div>
  );
};

export default EnvironmentalDataSection;
