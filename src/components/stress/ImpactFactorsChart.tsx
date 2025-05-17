
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ImpactFactorData {
  name: string;
  value: number;
  isPositive: boolean;
}

interface ImpactFactorsChartProps {
  data: ImpactFactorData[];
}

const ImpactFactorsChart: React.FC<ImpactFactorsChartProps> = ({ data }) => {
  // Colors for pie chart
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B', '#6366F1'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Impact Factors</CardTitle>
        <CardDescription>Environmental factors affecting your stress level</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isPositive ? '#10B981' : COLORS[index % COLORS.length]} 
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`Impact: ${value}`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactFactorsChart;
