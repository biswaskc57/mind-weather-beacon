
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { useStressMeter } from '@/hooks/use-stress-meter';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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

  // Functions to calculate bubble sizes for environmental factors
  const getBubbleSize = (factor) => {
    if (!environmentalData) return 'medium';
    
    // Determine size based on the factor's severity
    switch (factor) {
      case 'airPollution':
        return environmentalData.airQuality.pm25 > 20 ? 'large' : 'medium';
      case 'pollen':
        const avgPollen = (environmentalData.pollen.grass + environmentalData.pollen.tree + environmentalData.pollen.weed) / 3;
        return avgPollen > 2.5 ? 'large' : 'medium';
      case 'temperature':
        return Math.abs(environmentalData.weather.temperature - 22) > 8 ? 'medium' : 'small';
      case 'humidity':
        return environmentalData.weather.humidity > 60 ? 'small' : 'tiny';
      case 'noise':
        return 'tiny'; // Assuming no noise data, so using small size
      default:
        return 'medium';
    }
  };

  const getStressLevel = () => {
    if (!stressData) return "analyzing your stress levels";
    if (stressData.score > 70) return "quite stressed";
    if (stressData.score > 50) return "somewhat stressed";
    if (stressData.score > 30) return "a little stressed";
    return "not very stressed";
  };
  
  // Stress level categories
  const getStressCategory = (score: number) => {
    if (score < 30) return { label: 'Low', color: 'bg-green-500' };
    if (score < 60) return { label: 'Moderate', color: 'bg-yellow-500' };
    if (score < 80) return { label: 'High', color: 'bg-orange-500' };
    return { label: 'Very High', color: 'bg-red-500' };
  };
  
  const stressCategory = getStressCategory(stressData?.score || 50);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Simple Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Hi {userData.firstName}
          </h1>
        </div>
        
        {/* AI Agent Avatar Section */}
        <div className="flex justify-center mb-12">
          <Avatar className="h-40 w-40">
            <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
            <AvatarFallback className="bg-mindsense-primary text-white text-4xl">AI</AvatarFallback>
          </Avatar>
        </div>
        
        {/* Stress Analysis Text - updated to match style of other pages */}
        <div className="text-center mb-16">
          <p className="text-xl font-medium text-muted-foreground mb-2">
            I can see that today you seem {getStressLevel()}.
          </p>
          <p className="text-xl font-medium text-mindsense-primary">
            I can help you!
          </p>
        </div>
        
        {/* Stress Score Card - imported from StressPage, with consistent max-width */}
        <Card className="mb-16 max-w-3xl mx-auto w-full">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Circular Score Display */}
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={stressData?.score && stressData.score < 30 ? "#10B981" : 
                           stressData?.score && stressData.score < 60 ? "#F59E0B" : 
                           stressData?.score && stressData.score < 80 ? "#F97316" : "#EF4444"}
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset={283 - ((stressData?.score || 50) / 100) * 283}
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    fontSize="22"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    {stressData?.score?.toFixed(0) || "50"}
                  </text>
                  <text
                    x="50"
                    y="65"
                    fontSize="12"
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fill="#6B7280"
                  >
                    out of 100
                  </text>
                </svg>
              </div>
              
              {/* Status and Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stressCategory.color}`}></div>
                    <span className="font-medium text-lg">{stressCategory.label} Stress Level</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {stressCategory.label === 'Low' && 'Your environmental stress level is low today. Great conditions for mental wellbeing.'}
                    {stressCategory.label === 'Moderate' && 'Moderate stress factors detected in your environment. Take breaks when needed.'}
                    {stressCategory.label === 'High' && 'High environmental stress detected. Consider activities to reduce mental strain.'}
                    {stressCategory.label === 'Very High' && 'Very high environmental stress. Take precautions and prioritize self-care.'}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {stressData?.trend === 'increasing' && (
                    <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                      Increasing
                    </div>
                  )}
                  {stressData?.trend === 'decreasing' && (
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                      Decreasing
                    </div>
                  )}
                  {stressData?.trend === 'stable' && (
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Stable
                    </div>
                  )}
                </div>
                
                <Button variant="outline" size="sm">View Detailed Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Environmental Factors Title - Updated to match style from other pages */}
        <div className="text-center mb-8 max-w-3xl mx-auto w-full">
          <h2 className="text-2xl font-semibold leading-none tracking-tight mb-2">
            Environmental Factors
          </h2>
          <p className="text-sm text-muted-foreground">
            These external factors can influence your stress level
          </p>
        </div>
        
        {/* Environmental Factors Bubbles - Updated with consistent width */}
        <div className="flex justify-center mb-16 max-w-3xl mx-auto w-full">
          <div className="relative w-full h-[400px]">
            {/* Pollen - Large bubble */}
            <div className={`absolute left-[15%] top-[100px] w-[180px] h-[180px] rounded-full bg-green-200 flex items-center justify-center text-black font-semibold`}>
              Pollen
            </div>
            
            {/* Air Pollution - Large bubble */}
            <div className={`absolute right-[15%] top-[100px] w-[160px] h-[160px] rounded-full bg-blue-300 flex items-center justify-center text-white font-semibold`}>
              Air Pollution
            </div>
            
            {/* Temperature - Medium bubble */}
            <div className={`absolute bottom-[20px] left-[50%] transform -translate-x-1/2 w-[130px] h-[130px] rounded-full bg-green-300 flex items-center justify-center text-black font-semibold`}>
              Temperature
            </div>
            
            {/* Humidity - Small bubble */}
            <div className={`absolute right-[25%] top-[30px] w-[100px] h-[100px] rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold`}>
              Humidity
            </div>
            
            {/* Noise - Small bubble */}
            <div className={`absolute left-[25%] top-[30px] w-[80px] h-[80px] rounded-full bg-green-100 flex items-center justify-center text-black font-semibold`}>
              Noise
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
