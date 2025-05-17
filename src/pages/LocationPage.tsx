
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LocationTracker from '@/components/location/LocationTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPinIcon } from '@/components/icons/Icons';

const LocationPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Location</h1>
        <p className="text-muted-foreground">Manage your location settings and data</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LocationTracker />
        
        <div className="space-y-6">
          <Alert>
            <MapPinIcon className="h-4 w-4" />
            <AlertTitle>Privacy Notice</AlertTitle>
            <AlertDescription>
              Your location data is only stored locally on your device and used to fetch environmental data.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle>Location Data Usage</CardTitle>
              <CardDescription>How your location data helps MindSense work better</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-mindsense-primary pl-4 py-2">
                <h4 className="font-medium">Environmental Data</h4>
                <p className="text-sm text-gray-500">
                  Your location allows us to fetch accurate air quality, pollen, and weather data for your area.
                </p>
              </div>
              
              <div className="border-l-4 border-mindsense-secondary pl-4 py-2">
                <h4 className="font-medium">Custom Insights</h4>
                <p className="text-sm text-gray-500">
                  Location-specific environmental factors help us provide more personalized mental health insights.
                </p>
              </div>
              
              <div className="border-l-4 border-mindsense-accent pl-4 py-2">
                <h4 className="font-medium">Future Predictions</h4>
                <p className="text-sm text-gray-500">
                  Your location helps our algorithms forecast how upcoming environmental changes might affect you.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Location Accuracy</CardTitle>
              <CardDescription>About the location technology</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                MindSense uses your device's location services to provide the most accurate data. We support high-precision 
                location tracking with Galileo satellite data when available on your device.
              </p>
              <p className="text-sm text-gray-500">
                For the most accurate environmental data, we recommend allowing precise location access in your device settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default LocationPage;
