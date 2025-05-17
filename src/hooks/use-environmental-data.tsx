
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
  
  // Function to fetch environmental data from Open-Meteo API
  const fetchEnvironmentalData = async () => {
    // Use provided coordinates or default to Helsinki (if coordinates not yet available)
    const lat = latitude || 60.17;
    const lon = longitude || 24.94;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch air quality data from Open-Meteo API
      const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,uv_index,allergens_grass_pollen`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch environmental data from API');
      }
      
      const apiData = await response.json();
      
      if (!apiData.hourly) {
        throw new Error('Invalid data format received from API');
      }
      
      // Get current index (latest available data)
      const currentIndex = apiData.hourly.time.length - 1;
      
      // Extract the data we need
      const environmentalData: EnvironmentalData = {
        airQuality: {
          pm25: apiData.hourly.pm2_5[currentIndex] || 0,
          pm10: apiData.hourly.pm10[currentIndex] || 0,
          aqi: calculateAQI(apiData.hourly.pm2_5[currentIndex], apiData.hourly.pm10[currentIndex]),
        },
        weather: {
          temperature: 20 + Math.random() * 5, // Placeholder as the air quality API doesn't provide temperature
          humidity: 40 + Math.random() * 30, // Placeholder
          uvIndex: apiData.hourly.uv_index?.[currentIndex] || Math.random() * 11,
        },
        pollen: {
          grass: convertPollenToScale(apiData.hourly.allergens_grass_pollen?.[currentIndex] || 0),
          tree: Math.floor(Math.random() * 6), // Placeholder as API doesn't provide tree pollen
          weed: Math.floor(Math.random() * 6), // Placeholder as API doesn't provide weed pollen
        },
        timestamp: Date.now(),
      };
      
      setData(environmentalData);
      
      // Save to localStorage for offline access
      localStorage.setItem('environmentalData', JSON.stringify(environmentalData));
      
    } catch (err) {
      console.error('Error fetching environmental data:', err);
      setError('Failed to fetch environmental data');
      toast({
        title: 'Data Error',
        description: 'Failed to fetch environmental data. Please try again later.',
        variant: 'destructive',
      });
      
      // Try to load from localStorage as fallback
      const storedData = localStorage.getItem('environmentalData');
      if (storedData) {
        try {
          setData(JSON.parse(storedData));
        } catch (e) {
          console.error('Error parsing stored data:', e);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate Air Quality Index (AQI) based on PM2.5 and PM10
  const calculateAQI = (pm25: number, pm10: number) => {
    // Simplified AQI calculation based primarily on PM2.5
    if (!pm25) return 0;
    
    // PM2.5 based calculation (simplified)
    // AQI ranges: 0-50 (Good), 51-100 (Moderate), 101-150 (Unhealthy for Sensitive), 151-200 (Unhealthy)
    if (pm25 <= 12) {
      return Math.round((pm25 / 12) * 50);
    } else if (pm25 <= 35.4) {
      return Math.round(((pm25 - 12) / (35.4 - 12)) * 50 + 50);
    } else if (pm25 <= 55.4) {
      return Math.round(((pm25 - 35.4) / (55.4 - 35.4)) * 50 + 100);
    } else {
      return Math.round(((pm25 - 55.4) / (150.4 - 55.4)) * 50 + 150);
    }
  };
  
  // Convert pollen concentration to 0-5 scale
  const convertPollenToScale = (pollenValue: number) => {
    // Typical grass pollen concentrations: 0-15 (low), 16-50 (moderate), 51-500 (high)
    if (pollenValue < 5) return 0;
    if (pollenValue < 15) return 1;
    if (pollenValue < 30) return 2;
    if (pollenValue < 50) return 3;
    if (pollenValue < 100) return 4;
    return 5;
  };
  
  // Fetch data when coordinates change
  useEffect(() => {
    if (latitude || longitude) {
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
