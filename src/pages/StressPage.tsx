
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/hooks/use-location';
import { useEnvironmentalData } from '@/hooks/use-environmental-data';
import { useStressMeter } from '@/hooks/use-stress-meter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StressPage = () => {
  const { location } = useLocation();
  const { data: environmentalData } = useEnvironmentalData({
    latitude: location?.latitude,
    longitude: location?.longitude
  });
  const { stressData } = useStressMeter({ environmentalData });
  
  // Mock data for stress history
  const stressHistory = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 72 },
    { day: 'Wed', value: 58 },
    { day: 'Thu', value: 60 },
    { day: 'Fri', value: 54 },
    { day: 'Sat', value: 48 },
    { day: 'Sun', value: stressData?.score || 55 },
  ];
  
  // Impact factor data for pie chart
  const impactData = stressData?.factors?.map(factor => ({
    name: factor.name,
    value: Math.abs(factor.impact),
    isPositive: factor.impact <= 0
  })) || [
    { name: 'Air Quality', value: 30, isPositive: false },
    { name: 'UV Index', value: 20, isPositive: false },
    { name: 'Temperature', value: 15, isPositive: true },
    { name: 'Pollen', value: 25, isPositive: false },
    { name: 'Humidity', value: 10, isPositive: true },
  ];
  
  // Colors for pie chart
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B', '#6366F1'];
  
  // Stress level categories
  const getStressCategory = (score: number) => {
    if (score < 30) return { label: 'Low', color: 'bg-green-500' };
    if (score < 60) return { label: 'Moderate', color: 'bg-yellow-500' };
    if (score < 80) return { label: 'High', color: 'bg-orange-500' };
    return { label: 'Very High', color: 'bg-red-500' };
  };
  
  const stressCategory = getStressCategory(stressData?.score || 50);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Stress Meter</h1>
        <p className="text-muted-foreground">Track your environmental stress factors</p>
      </div>
      
      {/* Stress Score Card */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Stress Score</CardTitle>
            <CardDescription>Based on environmental factors and their impact on mental wellbeing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Circular Score Display */}
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={stressData?.score && stressData.score < 30 ? "#10B981" : 
                           stressData?.score && stressData.score < 60 ? "#F59E0B" : 
                           stressData?.score && stressData.score < 80 ? "#F97316" : "#EF4444"}
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset={283 - ((stressData?.score || 50) / 100) * 283}
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    fontSize="22"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    {stressData?.score?.toFixed(0) || "50"}
                  </text>
                  <text
                    x="50"
                    y="65"
                    fontSize="12"
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fill="#6B7280"
                  >
                    out of 100
                  </text>
                </svg>
              </div>
              
              {/* Status and Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stressCategory.color}`}></div>
                    <span className="font-medium text-lg">{stressCategory.label} Stress Level</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {stressCategory.label === 'Low' && 'Your environmental stress level is low today. Great conditions for mental wellbeing.'}
                    {stressCategory.label === 'Moderate' && 'Moderate stress factors detected in your environment. Take breaks when needed.'}
                    {stressCategory.label === 'High' && 'High environmental stress detected. Consider activities to reduce mental strain.'}
                    {stressCategory.label === 'Very High' && 'Very high environmental stress. Take precautions and prioritize self-care.'}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {stressData?.trend === 'increasing' && (
                    <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                      Increasing
                    </div>
                  )}
                  {stressData?.trend === 'decreasing' && (
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                      Decreasing
                    </div>
                  )}
                  {stressData?.trend === 'stable' && (
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Stable
                    </div>
                  )}
                </div>
                
                <Button variant="outline" size="sm">View Detailed Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Stress Trend</CardTitle>
            <CardDescription>Your stress score over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stressHistory}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value} points`, 'Stress Score']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Stress Factors */}
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
                    data={impactData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {impactData.map((entry, index) => (
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
      </div>
      
      {/* Impact Factors List */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Detailed Factor Analysis</CardTitle>
          <CardDescription>How each environmental factor is affecting your stress levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stressData?.factors ? (
              stressData.factors.map((factor, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{factor.name}</h4>
                    <div className={`px-2 py-1 rounded text-sm ${factor.impact <= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {factor.impact <= 0 ? 'Positive' : 'Negative'} Impact
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No factor data available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default StressPage;
