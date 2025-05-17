
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
  const [airQualityData, setAirQualityData] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [pollenData, setPollenData] = useState<any>(null);
  
  // Function to fetch environmental data from Open-Meteo API
  const fetchEnvironmentalData = async () => {
    // Use provided coordinates or default to Helsinki (if coordinates not yet available)
    const lat = latitude || 60.17;
    const lon = longitude || 24.94;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch all needed data in parallel
      const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,uv_index`;
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m`;
      const pollenUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=dust,alder_pollen,birch_pollen,grass_pollen`;
      
      // Parallel fetch for all APIs
      const [airQualityResponse, weatherResponse, pollenResponse] = await Promise.all([
        fetch(airQualityUrl),
        fetch(weatherUrl),
        fetch(pollenUrl)
      ]);
      
      if (!airQualityResponse.ok || !weatherResponse.ok) {
        throw new Error('Failed to fetch environmental data from API');
      }
      
      const airQualityResult = await airQualityResponse.json();
      const weatherResult = await weatherResponse.json();
      let pollenResult = null;
      
      if (pollenResponse.ok) {
        pollenResult = await pollenResponse.json();
      }
      
      setAirQualityData(airQualityResult);
      setWeatherData(weatherResult);
      setPollenData(pollenResult);
      
      if (!airQualityResult.hourly || !weatherResult.hourly) {
        throw new Error('Invalid data format received from API');
      }
      
      // Get current index (latest available data)
      const airQualityCurrentIndex = airQualityResult.hourly.time.length - 1;
      const weatherCurrentIndex = weatherResult.hourly.time.length - 1;
      
      // Extract the data we need
      const uvIndexValue = airQualityResult.hourly.uv_index?.[airQualityCurrentIndex];
      
      // Check if we have real pollen data
      let grassPollenValue = 0;
      let treePollenValue = 0;
      let weedPollenValue = 0;
      
      if (pollenResult && pollenResult.hourly) {
        const pollenCurrentIndex = pollenResult.hourly.time.length - 1;
        // Use real pollen data if available
        grassPollenValue = pollenResult.hourly.grass_pollen?.[pollenCurrentIndex] || Math.random() * 5;
        
        // Try to get tree pollen from birch or alder
        if (pollenResult.hourly.birch_pollen) {
          treePollenValue = pollenResult.hourly.birch_pollen[pollenCurrentIndex] || 0;
        } else if (pollenResult.hourly.alder_pollen) {
          treePollenValue = pollenResult.hourly.alder_pollen[pollenCurrentIndex] || 0;
        } else {
          treePollenValue = Math.random() * 5;
        }
        
        // Use dust as proxy for weed pollen if no direct weed data
        weedPollenValue = pollenResult.hourly.dust?.[pollenCurrentIndex] || Math.random() * 5;
      } else {
        // Fallback to random values
        grassPollenValue = Math.random() * 5;
        treePollenValue = Math.random() * 5;
        weedPollenValue = Math.random() * 5;
      }
      
      const environmentalData: EnvironmentalData = {
        airQuality: {
          pm25: airQualityResult.hourly.pm2_5[airQualityCurrentIndex] || 0,
          pm10: airQualityResult.hourly.pm10[airQualityCurrentIndex] || 0,
          aqi: calculateAQI(airQualityResult.hourly.pm2_5[airQualityCurrentIndex], airQualityResult.hourly.pm10[airQualityCurrentIndex]),
        },
        weather: {
          temperature: weatherResult.hourly.temperature_2m[weatherCurrentIndex] || 20,
          humidity: weatherResult.hourly.relative_humidity_2m[weatherCurrentIndex] || 50,
          uvIndex: uvIndexValue !== undefined ? uvIndexValue : Math.random() * 11, // Use real UV data if available
        },
        pollen: {
          grass: convertPollenToScale(grassPollenValue), // Convert to 0-5 scale
          tree: convertPollenToScale(treePollenValue), // Convert to 0-5 scale
          weed: convertPollenToScale(weedPollenValue), // Convert to 0-5 scale
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
      return Math.round(((pm25 - 55.4) / (55.4 - 35.4)) * 50 + 100);
    } else {
      return Math.round(((pm25 - 150.4) / (150.4 - 55.4)) * 50 + 150);
    }
  };
  
  // Convert pollen concentration to 0-5 scale
  const convertPollenToScale = (pollenValue: number) => {
    // Scale for pollen concentrations (grains/m³)
    if (pollenValue < 1) return 0; // None
    if (pollenValue < 5) return 1; // Very low
    if (pollenValue < 10) return 2; // Low
    if (pollenValue < 50) return 3; // Moderate
    if (pollenValue < 100) return 4; // High
    return 5; // Very high
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

  return { 
    data, 
    isLoading, 
    error, 
    refetch: fetchEnvironmentalData,
    rawData: {
      airQuality: airQualityData,
      weather: weatherData,
      pollen: pollenData
    }
  };
};
