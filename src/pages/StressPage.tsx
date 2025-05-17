
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { useStressMeter } from '@/hooks/use-stress-meter';
import StressScoreCard from '@/components/stress/StressScoreCard';
import StressTrendChart from '@/components/stress/StressTrendChart';
import ImpactFactorsChart from '@/components/stress/ImpactFactorsChart';
import FactorAnalysisList from '@/components/stress/FactorAnalysisList';

const StressPage = () => {
  const { location } = useLocation();
  const { data: environmentalData } = useEnvironmentalData({
    latitude: location?.latitude,
    longitude: location?.longitude
  });
  const { stressData } = useStressMeter({ environmentalData });
  
  // Mock data for stress history
  const stressHistory = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 72 },
    { day: 'Wed', value: 58 },
    { day: 'Thu', value: 60 },
    { day: 'Fri', value: 54 },
    { day: 'Sat', value: 48 },
    { day: 'Sun', value: stressData?.score || 55 },
  ];
  
  // Impact factor data for pie chart
  const impactData = stressData?.factors?.map(factor => ({
    name: factor.name,
    value: Math.abs(factor.impact),
    isPositive: factor.impact <= 0
  })) || [
    { name: 'Air Quality', value: 30, isPositive: false },
    { name: 'UV Index', value: 20, isPositive: false },
    { name: 'Temperature', value: 15, isPositive: true },
    { name: 'Pollen', value: 25, isPositive: false },
    { name: 'Humidity', value: 10, isPositive: true },
  ];
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Stress Meter</h1>
        <p className="text-muted-foreground">Track your environmental stress factors</p>
      </div>
      
      {/* Stress Score Card */}
      <div className="mb-6">
        <StressScoreCard 
          score={stressData?.score || 50}
          trend={stressData?.trend}
        />
      </div>
      
      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <StressTrendChart data={stressHistory} />
        
        {/* Stress Factors */}
        <ImpactFactorsChart data={impactData} />
      </div>
      
      {/* Impact Factors List */}
      <div className="mt-6">
        <FactorAnalysisList factors={stressData?.factors || []} />
      </div>
    </MainLayout>
  );
};

export default StressPage;
