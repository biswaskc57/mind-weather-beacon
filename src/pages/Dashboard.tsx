
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { useStressMeter } from '@/hooks/use-stress-meter';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import StressScoreCard from '@/components/dashboard/StressScoreCard';
import EnvironmentalDataSection from '@/components/dashboard/EnvironmentalDataSection';
import { getStressLevel, generateAirQualityHistory } from '@/utils/dashboardUtils';

const Dashboard = () => {
  // User data - in a real app, this would come from a user context or API
  const userData = {
    firstName: 'Anastasia',
    lastName: 'Morgan',
  };

  const [rawApiData, setRawApiData] = useState<any>(null);
  const [rawAirQualityData, setRawAirQualityData] = useState<any>(null);
  
  const { location } = useLocation();
  const { data: environmentalData, refetch } = useEnvironmentalData({
    latitude: location?.latitude,
    longitude: location?.longitude
  });
  const { stressData } = useStressMeter({ environmentalData });

  // Fetch raw API data for charts
  useEffect(() => {
    const fetchRawData = async () => {
      try {
        const lat = location?.latitude || 60.17;
        const lon = location?.longitude || 24.94;
        
        // Fetch weather data
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m`;
        
        // Fetch air quality and UV data (removed pollen as it's not supported)
        const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,uv_index`;
        
        // Parallel fetch for both APIs
        const [weatherResponse, airQualityResponse] = await Promise.all([
          fetch(weatherUrl),
          fetch(airQualityUrl)
        ]);
        
        if (!weatherResponse.ok || !airQualityResponse.ok) {
          throw new Error('Failed to fetch raw API data');
        }
        
        const weatherData = await weatherResponse.json();
        const airQualityData = await airQualityResponse.json();
        
        setRawApiData(weatherData);
        setRawAirQualityData(airQualityData);
      } catch (err) {
        console.error('Error fetching raw API data:', err);
      }
    };
    
    fetchRawData();
  }, [location]);

  // Generate air quality history data
  const airQualityHistory = generateAirQualityHistory(
    environmentalData?.airQuality.pm25,
    environmentalData?.airQuality.pm10,
    rawApiData,
    rawAirQualityData
  );

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Welcome Header with Avatar */}
        <WelcomeHeader 
          firstName={userData.firstName}
          stressLevel={getStressLevel(stressData?.score)}
        />
        
        {/* Stress Score Card */}
        <StressScoreCard
          score={stressData?.score || 50}
          trend={stressData?.trend}
        />
        
        {/* Environmental Data Section */}
        <EnvironmentalDataSection
          environmentalData={environmentalData}
          airQualityHistory={airQualityHistory}
          refetchData={refetch}
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
