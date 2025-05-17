
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
        const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,uv_index,allergens_grass_pollen`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch raw API data');
        
        const data = await response.json();
        setRawApiData(data);
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
    rawApiData
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
