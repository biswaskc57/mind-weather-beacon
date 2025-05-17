
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { useStressMeter } from '@/hooks/use-stress-meter';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import StressScoreCard from '@/components/dashboard/StressScoreCard';
import EnvironmentalFactorsBubbles from '@/components/dashboard/EnvironmentalFactorsBubbles';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  // User data - in a real app, this would come from a user context or API
  const userData = {
    firstName: 'Anastasia',
    lastName: 'Morgan',
  };

  const { location } = useLocation();
  const { data: environmentalData } = useEnvironmentalData({
    latitude: location?.latitude,
    longitude: location?.longitude
  });
  const { stressData } = useStressMeter({ environmentalData });

  const getStressLevel = () => {
    if (!stressData) return "analyzing your stress levels";
    if (stressData.score > 70) return "quite stressed";
    if (stressData.score > 50) return "somewhat stressed";
    if (stressData.score > 30) return "a little stressed";
    return "not very stressed";
  };

  // Create demo factors data if real data is unavailable
  const demoFactors = [
    { name: 'PM2.5 Levels', impact: 75, description: 'Current PM2.5 levels are high in your area' },
    { name: 'PM10 Levels', impact: 45, description: 'Moderate PM10 levels may cause respiratory irritation' },
    { name: 'UV Exposure', impact: 60, description: 'Very high UV index - avoid outdoor activities' },
    { name: 'Pollen Levels', impact: 85, description: 'High pollen counts may worsen allergies and affect mood' },
    { name: 'Temperature', impact: -25, description: 'Comfortable temperature range is beneficial for mental wellbeing' },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Welcome Header with Avatar */}
        <WelcomeHeader 
          firstName={userData.firstName}
          stressLevel={getStressLevel()}
        />
        
        {/* Stress Score Card */}
        <StressScoreCard
          score={stressData?.score || 50}
          trend={stressData?.trend}
        />
        
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
        
        {/* Environmental Factors Section */}
        <EnvironmentalFactorsBubbles 
          factors={stressData?.factors || demoFactors}
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
