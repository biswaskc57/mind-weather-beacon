
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  timestamp: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Function to get location using the browser's Geolocation API
  const updateLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      toast({
        title: 'Location Error',
        description: 'Geolocation is not supported by your browser',
        variant: 'destructive',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // For now, we'll use a mock reverse geocoding service
          // In a real app, you'd use a geocoding API like Google Maps or OpenStreetMap
          let locationDetails = { city: undefined, country: undefined };
          
          try {
            // Simulated reverse geocoding response
            if (latitude && longitude) {
              // This is just a mock - you would replace with actual API call
              locationDetails = {
                city: 'Sample City',
                country: 'Sample Country'
              };
            }
          } catch (geocodeError) {
            console.error('Error getting location details:', geocodeError);
          }
          
          const newLocation: LocationData = {
            latitude,
            longitude,
            ...locationDetails,
            timestamp: Date.now()
          };
          
          setLocation(newLocation);
          
          // Save to local storage for persistence
          localStorage.setItem('userLocation', JSON.stringify(newLocation));
          
          toast({
            title: 'Location Updated',
            description: locationDetails.city 
              ? `Location set to ${locationDetails.city}, ${locationDetails.country}`
              : 'Your coordinates have been updated',
          });
        } catch (err) {
          console.error('Error handling position:', err);
          setError('Failed to process your location');
          toast({
            title: 'Location Error',
            description: 'Failed to process your location',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setIsLoading(false);
        
        let errorMessage = 'Unable to retrieve your location';
        if (err.code === 1) {
          errorMessage = 'Location access was denied. Please enable location services.';
        } else if (err.code === 2) {
          errorMessage = 'Location information is unavailable.';
        } else if (err.code === 3) {
          errorMessage = 'The request to get location timed out.';
        }
        
        setError(errorMessage);
        toast({
          title: 'Location Error',
          description: errorMessage,
          variant: 'destructive',
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);
  
  // Load saved location from localStorage on component mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    
    if (savedLocation) {
      try {
        const parsedLocation = JSON.parse(savedLocation);
        // Check if saved location is less than 24 hours old
        const isLocationRecent = (Date.now() - parsedLocation.timestamp) < (24 * 60 * 60 * 1000);
        
        if (isLocationRecent) {
          setLocation(parsedLocation);
        } else {
          // Location data is stale, get a fresh update
          updateLocation();
        }
      } catch (err) {
        console.error('Error parsing saved location:', err);
        updateLocation();
      }
    } else if (localStorage.getItem('onboardingComplete')) {
      // If onboarding is complete but we don't have a location, try to get one automatically
      updateLocation();
    }
  }, [updateLocation]);

  return { location, isLoading, error, updateLocation };
};
