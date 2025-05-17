
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
  
  const { location } = useLocation();
  const { 
    data: environmentalData, 
    refetch,
    rawData 
  } = useEnvironmentalData({
    latitude: location?.latitude,
    longitude: location?.longitude
  });
  const { stressData } = useStressMeter({ environmentalData });

  // Generate air quality history data
  const airQualityHistory = generateAirQualityHistory(
    environmentalData?.airQuality.pm25,
    environmentalData?.airQuality.pm10,
    rawData.weather,
    rawData.airQuality
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
