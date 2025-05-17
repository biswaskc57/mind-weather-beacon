
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SuggestionSection from '@/components/dashboard/SuggestionSection';
import StressMeter from '@/components/dashboard/StressMeter';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { useStressMeter } from '@/hooks/use-stress-meter';
import { ArrowRight, Heart, Thermometer, Wind } from 'lucide-react';

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

  // Calculate overall health status
  const getOverallStatus = () => {
    if (!stressData) return { status: 'unknown', text: 'We need more data to assess your health' };
    
    if (stressData.score < 30) {
      return { 
        status: 'excellent', 
        text: 'Your overall health indicators are excellent',
        color: 'text-green-600'
      };
    } else if (stressData.score < 60) {
      return { 
        status: 'good', 
        text: 'Your health indicators are generally good',
        color: 'text-green-600'
      };
    } else {
      return { 
        status: 'needs-attention', 
        text: 'You seem quite stressed today',
        color: 'text-red-600'
      };
    }
  };

  const healthStatus = getOverallStatus();

  const getMessageBasedOnStress = () => {
    if (!stressData) return "I'm analyzing your health patterns...";
    
    if (stressData.score > 60) {
      return "I can see that today you seem quite stressed. I can help you!";
    } else if (stressData.score > 30) {
      return "You're experiencing moderate stress levels today. Let's work on that.";
    } else {
      return "You're doing great today! Here are some tips to maintain your wellbeing.";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Welcome Section with Avatar */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Hi {userData.firstName}
          </h1>
          
          <div className="mb-6 flex justify-center">
            <img 
              src="/lovable-uploads/2538149c-abf7-4d41-8866-760644fcc7a6.png" 
              alt="User avatar" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          
          <p className="text-lg text-gray-700 max-w-md mx-auto">
            {getMessageBasedOnStress()}
          </p>
        </div>
        
        {/* Stress Analysis Section */}
        <Card className="border-green-100 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-green-800">Stress Analysis</h2>
                <p className="text-gray-600">Based on your environmental factors and biometric data, here's your current stress profile:</p>
                
                <div className="mt-4">
                  <StressMeter 
                    value={stressData?.score || 50} 
                    recentTrend={stressData?.trend || 'stable'} 
                    compact={true}
                  />
                </div>
                
                <div className="pt-4">
                  <Link to="/metrics">
                    <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                      View Detailed Metrics
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-green-800 mb-3">Stress Contributors</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Personal Stress</span>
                    </div>
                    <span className="text-sm font-medium">66.7%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                      <span className="text-sm">External Causes</span>
                    </div>
                    <span className="text-sm font-medium">33.3%</span>
                  </div>
                  
                  <h4 className="font-medium text-green-800 mt-4 mb-2">External Factors</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {environmentalData && [
                      { name: "Air Pollution", icon: <Wind className="h-3 w-3 text-red-700" /> },
                      { name: "Temperature", icon: <Thermometer className="h-3 w-3 text-pink-400" /> },
                      { name: "Pollen", icon: <div className="h-3 w-3 bg-pink-300 rounded-full" /> },
                      { name: "Humidity", icon: <div className="h-3 w-3 bg-red-600 rounded-full" /> },
                      { name: "Noise", icon: <div className="h-3 w-3 bg-pink-400 rounded-full" /> }
                    ].map((factor, index) => (
                      <div key={index} className="flex items-center bg-white p-2 rounded-md">
                        {factor.icon}
                        <span className="text-xs ml-2">{factor.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Personalized Suggestions */}
        <SuggestionSection
          environmentalData={environmentalData}
          stressData={stressData}
        />
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-green-100 hover:border-green-200 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-800">Track your daily metrics</h3>
                <p className="text-sm text-gray-600">Log your activities and symptoms</p>
              </div>
              <Link to="/metrics">
                <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-800">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-green-100 hover:border-green-200 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-800">Check nearby conditions</h3>
                <p className="text-sm text-gray-600">Environmental health factors</p>
              </div>
              <Link to="/environment">
                <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-800">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
