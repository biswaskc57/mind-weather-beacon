
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import { MapPinIcon } from '@/components/icons/Icons';
import { useLocation } from '@/hooks/use-location';

const LocationTracker = () => {
  const { 
    location, 
    error, 
    isLoading, 
    updateLocation 
  } = useLocation();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Location</CardTitle>
        <CardDescription>We use your location to fetch accurate environmental data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
        
        {!isLoading && error && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-700 font-medium mb-2">Location Error</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        {!isLoading && location && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPinIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Current Location</h4>
                <p className="text-sm text-gray-500">Coordinates detected</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Latitude</p>
                <p className="font-medium">{location.latitude.toFixed(6)}</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Longitude</p>
                <p className="font-medium">{location.longitude.toFixed(6)}</p>
              </div>
            </div>
            
            {location.city && (
              <div className="mt-4 bg-white p-3 rounded border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="font-medium">{location.city}, {location.country}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={updateLocation}
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Location'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocationTracker;
