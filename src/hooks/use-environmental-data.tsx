
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface EnvironmentalData {
  airQuality: {
    pm25: number; // PM2.5 in μg/m³
    pm10: number; // PM10 in μg/m³
    aqi: number; // Air Quality Index
  };
  weather: {
    temperature: number; // in Celsius
    humidity: number; // in percentage
    uvIndex: number; // UV index
  };
  pollen: {
    grass: number; // Grass pollen level (0-5)
    tree: number; // Tree pollen level (0-5)
    weed: number; // Weed pollen level (0-5)
  };
  timestamp: number;
}

interface UseEnvironmentalDataProps {
  latitude?: number;
  longitude?: number;
}

export const useEnvironmentalData = ({ latitude, longitude }: UseEnvironmentalDataProps) => {
  const [data, setData] = useState<EnvironmentalData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Function to fetch environmental data
  const fetchEnvironmentalData = async () => {
    if (!latitude || !longitude) {
      setError('Location coordinates are required');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real application, you would make API calls to services like Open-Meteo or Copernicus
      // For this demo, we'll simulate the data
      
      // Simulate network request delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock environmental data
      const mockData: EnvironmentalData = {
        airQuality: {
          pm25: Math.random() * 30, // 0-30 µg/m³ (good to hazardous)
          pm10: Math.random() * 50, // 0-50 µg/m³ (good to hazardous)
          aqi: Math.floor(Math.random() * 150), // 0-150 (good to unhealthy)
        },
        weather: {
          temperature: 15 + Math.random() * 15, // 15-30°C
          humidity: 30 + Math.random() * 60, // 30-90%
          uvIndex: Math.random() * 11, // 0-11 UV index
        },
        pollen: {
          grass: Math.floor(Math.random() * 6), // 0-5 level
          tree: Math.floor(Math.random() * 6), // 0-5 level
          weed: Math.floor(Math.random() * 6), // 0-5 level
        },
        timestamp: Date.now(),
      };
      
      setData(mockData);
      
      // Save to localStorage for offline access
      localStorage.setItem('environmentalData', JSON.stringify(mockData));
      
    } catch (err) {
      console.error('Error fetching environmental data:', err);
      setError('Failed to fetch environmental data');
      toast({
        title: 'Data Error',
        description: 'Failed to fetch environmental data. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch data when coordinates change
  useEffect(() => {
    if (latitude && longitude) {
      // Check if we have stored data and if it's recent (less than 3 hours old)
      const storedData = localStorage.getItem('environmentalData');
      
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          const isDataRecent = (Date.now() - parsedData.timestamp) < (3 * 60 * 60 * 1000); // 3 hours
          
          if (isDataRecent) {
            setData(parsedData);
          } else {
            // Data is stale, fetch fresh data
            fetchEnvironmentalData();
          }
        } catch (err) {
          console.error('Error parsing stored environmental data:', err);
          fetchEnvironmentalData();
        }
      } else {
        fetchEnvironmentalData();
      }
    }
  }, [latitude, longitude]);

  return { data, isLoading, error, refetch: fetchEnvironmentalData };
};
