
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SuggestionSection from '@/components/dashboard/SuggestionSection';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { useStressMeter } from '@/hooks/use-stress-meter';
import { ArrowRight } from 'lucide-react';

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

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            MindSense Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor your environmental health factors and stress levels
          </p>
        </div>
        
        {/* User Welcome Card */}
        <Card className="border-green-100 mb-8 overflow-hidden shadow-md">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src="/lovable-uploads/2538149c-abf7-4d41-8866-760644fcc7a6.png" 
                alt="User avatar" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Welcome back, {userData.firstName}!
                </h2>
                <p className="text-gray-600 mb-4">
                  Here's your personalized health overview for today
                </p>
                <div className="inline-block bg-white px-4 py-2 rounded-full text-green-700 font-semibold shadow-sm">
                  {!stressData ? "Analyzing your health..." : 
                    stressData.score > 60 ? "High Stress Level" :
                    stressData.score > 30 ? "Moderate Stress Level" : 
                    "Low Stress Level"
                  }
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Environmental Factors */}
        <h2 className="text-xl font-semibold text-green-800 mb-4">Environmental Health Factors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">Air Quality</h3>
              <p className="text-gray-500 text-sm mb-3">
                {environmentalData?.airQuality ? 
                  `PM2.5: ${environmentalData.airQuality.pm25} μg/m³` : 
                  "Loading data..."}
              </p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: environmentalData?.airQuality ? `${Math.min(environmentalData.airQuality.pm25, 100)}%` : "0%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">Weather</h3>
              <p className="text-gray-500 text-sm mb-3">
                {environmentalData?.weather ? 
                  `${environmentalData.weather.temperature}°C, UV: ${environmentalData.weather.uvIndex}` : 
                  "Loading data..."}
              </p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full" 
                  style={{ width: environmentalData?.weather ? `${Math.min(environmentalData.weather.uvIndex * 10, 100)}%` : "0%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">Pollen</h3>
              <p className="text-gray-500 text-sm mb-3">
                {environmentalData?.pollen ? 
                  `Grass: ${environmentalData.pollen.grass}, Tree: ${environmentalData.pollen.tree}` : 
                  "Loading data..."}
              </p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ 
                    width: environmentalData?.pollen ? 
                      `${Math.min(((environmentalData.pollen.grass + environmentalData.pollen.tree + environmentalData.pollen.weed) / 15) * 100, 100)}%` : 
                      "0%" 
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Personalized Suggestions */}
        <SuggestionSection
          environmentalData={environmentalData}
          stressData={stressData}
        />
        
        {/* Quick Links Section */}
        <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-green-100 hover:border-green-200 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-800">View Detailed Metrics</h3>
                <p className="text-sm text-gray-600">Track your health data over time</p>
              </div>
              <Link to="/metrics">
                <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-green-100 hover:border-green-200 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-800">Environmental Map</h3>
                <p className="text-sm text-gray-600">Check nearby conditions</p>
              </div>
              <Link to="/environment">
                <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
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
