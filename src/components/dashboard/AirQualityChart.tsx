
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AirQualityChartProps {
  airQualityHistory: Array<{
    name: string;
    pm25: number;
    pm10: number;
  }>;
}

const AirQualityChart: React.FC<AirQualityChartProps> = ({ airQualityHistory }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Air Quality Trend</CardTitle>
        <CardDescription>
          PM2.5 and PM10 levels over the past month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={airQualityHistory}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pm25" name="PM2.5 (μg/m³)" fill="#3B82F6" />
              <Bar dataKey="pm10" name="PM10 (μg/m³)" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityChart;
