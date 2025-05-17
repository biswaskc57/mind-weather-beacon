
import { useState, useEffect } from 'react';
import { EnvironmentalData } from './use-environmental-data';

interface StressMeterData {
  score: number; // 0-100
  trend: 'increasing' | 'decreasing' | 'stable';
  factors: Array<{
    name: string;
    impact: number; // -10 to 10, with negative being beneficial
    description: string;
  }>;
}

interface UseStressMeterProps {
  environmentalData: EnvironmentalData | null;
  biometricData?: any; // Optional biometric data from wearables
}

export const useStressMeter = ({ environmentalData, biometricData }: UseStressMeterProps) => {
  const [stressData, setStressData] = useState<StressMeterData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate stress score based on environmental and optional biometric data
  useEffect(() => {
    if (!environmentalData) return;
    
    setIsLoading(true);

    try {
      // Base score calculation using environmental factors
      let baseScore = 0;
      const factors = [];
      
      // Air quality factors
      const pm25Impact = calculatePM25Impact(environmentalData.airQuality.pm25);
      baseScore += pm25Impact.impact;
      factors.push({
        name: 'PM2.5 Levels',
        impact: pm25Impact.impact,
        description: pm25Impact.description
      });
      
      const pm10Impact = calculatePM10Impact(environmentalData.airQuality.pm10);
      baseScore += pm10Impact.impact;
      factors.push({
        name: 'PM10 Levels',
        impact: pm10Impact.impact,
        description: pm10Impact.description
      });
      
      // Weather factors
      const uvImpact = calculateUVImpact(environmentalData.weather.uvIndex);
      baseScore += uvImpact.impact;
      factors.push({
        name: 'UV Exposure',
        impact: uvImpact.impact,
        description: uvImpact.description
      });
      
      const temperatureImpact = calculateTemperatureImpact(environmentalData.weather.temperature);
      baseScore += temperatureImpact.impact;
      factors.push({
        name: 'Temperature',
        impact: temperatureImpact.impact,
        description: temperatureImpact.description
      });
      
      // Pollen factors
      const pollenImpact = calculatePollenImpact(
        environmentalData.pollen.grass,
        environmentalData.pollen.tree,
        environmentalData.pollen.weed
      );
      baseScore += pollenImpact.impact;
      factors.push({
        name: 'Pollen Levels',
        impact: pollenImpact.impact,
        description: pollenImpact.description
      });
      
      // Add biometric data if available
      if (biometricData) {
        // Example biometric impact calculation (this would be more sophisticated in a real app)
        const biometricImpact = {
          impact: (biometricData.restingHeartRate > 80) ? 10 : 0,
          description: (biometricData.restingHeartRate > 80) 
            ? 'Elevated resting heart rate may indicate stress'
            : 'Healthy resting heart rate'
        };
        
        baseScore += biometricImpact.impact;
        factors.push({
          name: 'Heart Rate',
          impact: biometricImpact.impact,
          description: biometricImpact.description
        });
      }
      
      // Normalize score to 0-100 range
      const normalizedScore = Math.min(100, Math.max(0, 50 + baseScore * 2.5));
      
      // Get previous score for trend calculation
      let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
      const prevStressData = localStorage.getItem('stressData');
      
      if (prevStressData) {
        const parsedPrevData = JSON.parse(prevStressData);
        const prevScore = parsedPrevData.score;
        
        if (normalizedScore > prevScore + 5) {
          trend = 'increasing';
        } else if (normalizedScore < prevScore - 5) {
          trend = 'decreasing';
        }
      }
      
      const newStressData: StressMeterData = {
        score: normalizedScore,
        trend,
        factors
      };
      
      setStressData(newStressData);
      localStorage.setItem('stressData', JSON.stringify(newStressData));
      
    } catch (err) {
      console.error('Error calculating stress meter:', err);
      setError('Failed to calculate stress meter data');
    } finally {
      setIsLoading(false);
    }
  }, [environmentalData, biometricData]);

  return { stressData, isLoading, error };
};

// Utility functions for calculating impacts

function calculatePM25Impact(pm25: number) {
  if (pm25 < 12) {
    return { 
      impact: 0, 
      description: 'PM2.5 levels are good and shouldn\'t affect your health' 
    };
  } else if (pm25 < 35.4) {
    return { 
      impact: 2, 
      description: 'Moderate PM2.5 levels may cause breathing discomfort for sensitive individuals' 
    };
  } else if (pm25 < 55.4) {
    return { 
      impact: 5, 
      description: 'Unhealthy PM2.5 levels - consider limited outdoor activities' 
    };
  } else {
    return { 
      impact: 8, 
      description: 'Very unhealthy PM2.5 levels - stay indoors if possible' 
    };
  }
}

function calculatePM10Impact(pm10: number) {
  if (pm10 < 54) {
    return { 
      impact: 0, 
      description: 'PM10 levels are good' 
    };
  } else if (pm10 < 154) {
    return { 
      impact: 2, 
      description: 'Moderate PM10 levels may cause respiratory irritation' 
    };
  } else if (pm10 < 254) {
    return { 
      impact: 5, 
      description: 'Unhealthy PM10 levels may worsen existing conditions' 
    };
  } else {
    return { 
      impact: 8, 
      description: 'Very unhealthy PM10 levels - limit outdoor exposure' 
    };
  }
}

function calculateUVImpact(uvIndex: number) {
  if (uvIndex < 3) {
    return { 
      impact: -1, 
      description: 'Low UV index - safe for outdoor activities' 
    };
  } else if (uvIndex < 6) {
    return { 
      impact: 1, 
      description: 'Moderate UV index - wear sun protection' 
    };
  } else if (uvIndex < 8) {
    return { 
      impact: 3, 
      description: 'High UV index - limit midday sun exposure' 
    };
  } else {
    return { 
      impact: 6, 
      description: 'Very high UV index - avoid outdoor activities' 
    };
  }
}

function calculateTemperatureImpact(temperature: number) {
  if (temperature < 15) {
    return { 
      impact: 2, 
      description: 'Cold temperatures may increase stress and anxiety' 
    };
  } else if (temperature < 25) {
    return { 
      impact: -2, 
      description: 'Comfortable temperature range is beneficial for mental wellbeing' 
    };
  } else {
    return { 
      impact: 3, 
      description: 'Hot temperatures may increase irritability and stress' 
    };
  }
}

function calculatePollenImpact(grass: number, tree: number, weed: number) {
  const avgPollen = (grass + tree + weed) / 3;
  
  if (avgPollen < 1) {
    return { 
      impact: 0, 
      description: 'Low pollen counts - minimal impact on health' 
    };
  } else if (avgPollen < 3) {
    return { 
      impact: 2, 
      description: 'Moderate pollen levels may cause mild allergic reactions' 
    };
  } else {
    return { 
      impact: 5, 
      description: 'High pollen counts may worsen allergies and affect mood' 
    };
  }
}
