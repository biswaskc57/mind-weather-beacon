
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SuggestionSection from '@/components/dashboard/SuggestionSection';
import StressMeter from '@/components/dashboard/StressMeter';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { useStressMeter } from '@/hooks/use-stress-meter';
import { ArrowRight, Heart } from 'lucide-react';

const Dashboard = () => {
  // User data - in a real app, this would come from a user context or API
  const userData = {
    firstName: 'Alex',
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
        color: 'text-blue-600'
      };
    } else {
      return { 
        status: 'needs-attention', 
        text: 'Some health factors need your attention',
        color: 'text-amber-600'
      };
    }
  };

  const healthStatus = getOverallStatus();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="border-none shadow-sm bg-gradient-to-r from-mindsense-primary/10 to-mindsense-secondary/10">
          <CardContent className="pt-6">
            <div className="space-y-2 mb-4">
              <h1 className="text-2xl font-bold">
                Hello, {userData.firstName}
              </h1>
              <p className="text-muted-foreground">
                Here is your current health situation
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                <Heart className={`h-6 w-6 ${healthStatus.color}`} />
              </div>
              <div>
                <h2 className={`font-medium ${healthStatus.color}`}>
                  {healthStatus.status === 'excellent' ? 'Excellent Health Status' : 
                   healthStatus.status === 'good' ? 'Good Health Status' : 
                   'Health Needs Attention'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {healthStatus.text}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link to="/metrics">
                <Button variant="outline" className="w-full">
                  View Health Metrics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="w-full">
                  Update Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Stress Meter Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Stress Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[120px]">
                <StressMeter 
                  value={stressData?.score || 50} 
                  recentTrend={stressData?.trend || 'stable'} 
                  compact={true}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Health Factors</CardTitle>
            </CardHeader>
            <CardContent>
              {stressData?.factors ? (
                <div className="space-y-3">
                  {stressData.factors.slice(0, 3).map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{factor.name}</span>
                      <div className="ml-auto flex items-center">
                        <div className={`h-2 w-24 rounded-full ${
                          factor.impact > 5 ? 'bg-red-200' : 
                          factor.impact > 2 ? 'bg-amber-200' : 'bg-green-200'
                        }`}>
                          <div className={`h-full rounded-full ${
                            factor.impact > 5 ? 'bg-red-500' : 
                            factor.impact > 2 ? 'bg-amber-500' : 'bg-green-500'
                          }`} style={{width: `${(factor.impact / 10) * 100}%`}}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[100px]">
                  <p className="text-muted-foreground">No health factor data available</p>
                </div>
              )}
              <div className="mt-4">
                <Link to="/metrics">
                  <Button variant="ghost" size="sm" className="w-full">
                    See all factors
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Personalized Suggestions */}
        <SuggestionSection
          environmentalData={environmentalData}
          stressData={stressData}
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
