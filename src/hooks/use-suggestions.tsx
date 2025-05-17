
import { useState, useEffect } from 'react';
import { EnvironmentalData } from './use-environmental-data';

interface Suggestion {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  iconBg: string;
  iconColor: string;
  timeframe: string;
  factors: Array<{
    name: string;
    impact: number;
  }>;
}

interface UseSuggestionsProps {
  environmentalData: EnvironmentalData | null;
  stressData?: any;
  biometricData?: any;
}

export const useSuggestions = ({ environmentalData, stressData, biometricData }: UseSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!environmentalData) return;
    
    setIsLoading(true);

    try {
      // This is a simulation of ML-based predictions
      // In a real app, this would use a trained model or API
      
      setTimeout(() => {
        const generatedSuggestions: Suggestion[] = [];
        
        // Air quality suggestions
        if (environmentalData.airQuality.pm25 > 20) {
          generatedSuggestions.push({
            title: "Consider an air purifier",
            description: "PM2.5 levels are elevated. Using an air purifier at home could help reduce your exposure to particles.",
            priority: environmentalData.airQuality.pm25 > 35 ? 'high' : 'medium',
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-700",
            timeframe: "Next 24 hours",
            factors: [
              { name: "PM2.5", impact: 8 }
            ]
          });
        }
        
        // UV-based suggestions
        if (environmentalData.weather.uvIndex > 7) {
          generatedSuggestions.push({
            title: "Limit sun exposure",
            description: "UV index is very high. Limit outdoor activities between 10am and 4pm and use sunscreen SPF 30+.",
            priority: 'high',
            iconBg: "bg-orange-100",
            iconColor: "text-orange-700",
            timeframe: "Today",
            factors: [
              { name: "UV Index", impact: 9 }
            ]
          });
        }
        
        // Temperature-based suggestions
        if (environmentalData.weather.temperature > 30) {
          generatedSuggestions.push({
            title: "Stay hydrated",
            description: "Temperature is high. Drink at least 2-3 liters of water and seek air-conditioned environments when possible.",
            priority: 'medium',
            iconBg: "bg-blue-100",
            iconColor: "text-blue-700",
            timeframe: "Today",
            factors: [
              { name: "Temperature", impact: 7 }
            ]
          });
        }
        
        // Pollen-based suggestions
        const avgPollen = (environmentalData.pollen.grass + environmentalData.pollen.tree + environmentalData.pollen.weed) / 3;
        if (avgPollen > 3) {
          generatedSuggestions.push({
            title: "Pollen avoidance strategies",
            description: "High pollen levels detected. Keep windows closed and consider wearing a mask if you have allergies.",
            priority: 'medium',
            iconBg: "bg-green-100",
            iconColor: "text-green-700",
            timeframe: "Next few days",
            factors: [
              { name: "Pollen Level", impact: 6 }
            ]
          });
        }
        
        // Stress-based suggestions
        if (stressData && stressData.score > 70) {
          generatedSuggestions.push({
            title: "Try a relaxation technique",
            description: "Your stress level is elevated. Try a 10-minute mindfulness meditation or deep breathing exercise.",
            priority: 'high',
            iconBg: "bg-purple-100",
            iconColor: "text-purple-700",
            timeframe: "Today",
            factors: [
              { name: "Stress Level", impact: 8 }
            ]
          });
        } else if (stressData && stressData.score > 50) {
          generatedSuggestions.push({
            title: "Take short breaks",
            description: "Moderate stress detected. Consider taking short breaks throughout the day to reset your mind.",
            priority: 'medium',
            iconBg: "bg-purple-100",
            iconColor: "text-purple-700",
            timeframe: "Today",
            factors: [
              { name: "Stress Level", impact: 5 }
            ]
          });
        }
        
        // Ensure we have at least one suggestion
        if (generatedSuggestions.length === 0) {
          generatedSuggestions.push({
            title: "Maintain your routine",
            description: "Environmental conditions are favorable. Continue with your usual activities and wellness practices.",
            priority: 'low',
            iconBg: "bg-green-100",
            iconColor: "text-green-700",
            timeframe: "Today",
            factors: [
              { name: "Overall Conditions", impact: 2 }
            ]
          });
        }
        
        // Future prediction suggestion (always include one)
        generatedSuggestions.push({
          title: "Plan outdoor activities for Wednesday",
          description: "Weather forecasts predict optimal conditions for outdoor exercise with low pollen count and moderate temperature.",
          priority: 'low',
          iconBg: "bg-blue-100",
          iconColor: "text-blue-700",
          timeframe: "Next 3 days",
          factors: [
            { name: "Weather Forecast", impact: 2 },
            { name: "Pollen Forecast", impact: 1 }
          ]
        });
        
        setSuggestions(generatedSuggestions);
        setIsLoading(false);
      }, 1200); // Simulate loading time
      
    } catch (err) {
      console.error('Error generating suggestions:', err);
      setError('Failed to generate personalized suggestions');
      setIsLoading(false);
    }
  }, [environmentalData, stressData, biometricData]);

  return { suggestions, isLoading, error };
};
