
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, CloudRain, Wind } from 'lucide-react';

interface ForecastItem {
  day: string;
  icon: React.ReactNode;
  condition: string;
  impact: 'positive' | 'neutral' | 'negative';
  description: string;
}

interface MindWeatherWidgetProps {
  forecasts: ForecastItem[];
}

const MindWeatherWidget: React.FC<MindWeatherWidgetProps> = ({ forecasts }) => {
  const getImpactClass = (impact: 'positive' | 'neutral' | 'negative') => {
    switch (impact) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>MindWeather Forecast</CardTitle>
        <CardDescription>Environmental impact predictions for the next few days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {forecasts.map((forecast, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="flex-shrink-0 mr-4 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                {forecast.icon}
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-gray-900">{forecast.day}</h4>
                <div className="flex items-center mt-1">
                  <span className="text-sm mr-2">{forecast.condition}</span>
                  <span className={`text-xs font-medium ${getImpactClass(forecast.impact)}`}>
                    {forecast.impact.charAt(0).toUpperCase() + forecast.impact.slice(1)} Impact
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{forecast.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MindWeatherWidget;
