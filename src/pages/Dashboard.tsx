
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { useStressMeter } from '@/hooks/use-stress-meter';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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

  // Data for stress pie chart
  const stressChartData = [
    { name: 'Personal Stress', value: 66.7, color: '#8B0000' },
    { name: 'External causes', value: 33.3, color: '#A9A9A9' },
  ];

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

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Simple Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Hi {userData.firstName}
          </h1>
        </div>
        
        {/* Avatar Section */}
        <div className="flex justify-center mb-12">
          <img 
            src="/lovable-uploads/82d4ac43-0403-41c7-9b77-e171f03adec1.png" 
            alt="User avatar" 
            className="w-40 h-auto"
          />
        </div>
        
        {/* Stress Analysis Text */}
        <div className="text-center mb-16">
          <p className="text-xl font-medium mb-2">
            I can see that today you seems {getStressLevel()}.
          </p>
          <p className="text-xl font-medium">
            I can help you!
          </p>
        </div>
        
        {/* Stress Analysis Chart */}
        <div className="mb-16">
          <div className="flex justify-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%" className="max-w-[400px]">
              <PieChart>
                <Pie
                  data={stressChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={0}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {stressChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Environmental Factors Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium">
            These external factors can influence your stress fault
          </h2>
        </div>
        
        {/* Environmental Factors Bubbles */}
        <div className="flex justify-center mb-16">
          <div className="relative w-[500px] h-[400px]">
            {/* Pollen - Large bubble */}
            <div className={`absolute left-[80px] top-[100px] w-[200px] h-[200px] rounded-full bg-pink-300 flex items-center justify-center text-black font-semibold`}>
              Pollen
            </div>
            
            {/* Air Pollution - Large bubble */}
            <div className={`absolute right-[80px] top-[100px] w-[180px] h-[180px] rounded-full bg-red-800 flex items-center justify-center text-white font-semibold`}>
              Air Pollution
            </div>
            
            {/* Temperature - Medium bubble */}
            <div className={`absolute bottom-[20px] left-[50%] transform -translate-x-1/2 w-[130px] h-[130px] rounded-full bg-pink-200 flex items-center justify-center text-black font-semibold`}>
              Temperature
            </div>
            
            {/* Humidity - Small bubble */}
            <div className={`absolute right-[150px] top-[30px] w-[100px] h-[100px] rounded-full bg-red-700 flex items-center justify-center text-white font-semibold`}>
              Humidity
            </div>
            
            {/* Noise - Small bubble */}
            <div className={`absolute left-[150px] top-[30px] w-[80px] h-[80px] rounded-full bg-pink-200 flex items-center justify-center text-black font-semibold`}>
              Noise
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
