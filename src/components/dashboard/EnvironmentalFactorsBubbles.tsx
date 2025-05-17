
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EnvironmentalFactor {
  name: string;
  impact: number;
  description: string;
}

interface EnvironmentalFactorsBubblesProps {
  factors: EnvironmentalFactor[];
}

const EnvironmentalFactorsBubbles: React.FC<EnvironmentalFactorsBubblesProps> = ({ factors }) => {
  // Demo data for environmental factors
  const defaultData = [
    { name: 'PM2.5 Levels', x: 20, y: 30, z: 300, fill: '#8884d8', impact: 'High' },
    { name: 'PM10 Levels', x: 65, y: 20, z: 200, fill: '#82ca9d', impact: 'Medium' },
    { name: 'UV Exposure', x: 40, y: 60, z: 250, fill: '#ffc658', impact: 'Medium-High' },
    { name: 'Pollen Levels', x: 80, y: 70, z: 350, fill: '#ff8042', impact: 'Very High' },
    { name: 'Temperature', x: 30, y: 50, z: 150, fill: '#0088FE', impact: 'Low' },
  ];

  // If we have real factors, map them to chart data
  const chartData = factors && factors.length > 0 ? 
    factors.map((factor, index) => ({
      name: factor.name,
      x: 20 + (index * 20) % 80, // Distribute x values
      y: 30 + (index * 15) % 50, // Distribute y values
      z: Math.abs(factor.impact) * 100, // Size based on impact
      fill: getColorByImpact(factor.impact),
      impact: getImpactLevel(factor.impact)
    })) : 
    defaultData;

  // Get color based on impact value
  function getColorByImpact(impact: number): string {
    if (impact < 0) return '#82ca9d'; // positive (negative impact value)
    if (impact > 70) return '#ff8042'; // very high
    if (impact > 50) return '#ffc658'; // high
    if (impact > 30) return '#8884d8'; // medium
    return '#0088FE'; // low
  }

  // Get impact level description
  function getImpactLevel(impact: number): string {
    const absImpact = Math.abs(impact);
    if (absImpact > 70) return 'Very High';
    if (absImpact > 50) return 'High';
    if (absImpact > 30) return 'Medium';
    return 'Low';
  }

  // Custom tooltip for bubble chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm text-muted-foreground">Impact: {payload[0].payload.impact}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="mb-16">
      <CardHeader>
        <CardTitle>Environmental Factors</CardTitle>
        <CardDescription>
          These external factors can influence your stress level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis type="number" dataKey="x" name="x" tick={false} axisLine={false} />
              <YAxis type="number" dataKey="y" name="y" tick={false} axisLine={false} />
              <ZAxis 
                type="number" 
                dataKey="z" 
                range={[50, 400]} 
                name="impact"
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <Legend />
              <Scatter 
                name="Environmental Factors" 
                data={chartData} 
                fill="#8884d8"
                shape={(props) => {
                  const { cx, cy, fill, r } = props;
                  const name = props.payload.name;
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={r} fill={fill} />
                      <text 
                        x={cx} 
                        y={cy} 
                        textAnchor="middle" 
                        fill="#333" 
                        dy={-15}
                        fontSize={12}
                      >
                        {name}
                      </text>
                    </g>
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalFactorsBubbles;
