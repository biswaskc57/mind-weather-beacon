
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FactorItem {
  name: string;
  impact: number; 
  description: string;
}

interface FactorAnalysisListProps {
  factors: FactorItem[];
}

const FactorAnalysisList: React.FC<FactorAnalysisListProps> = ({ factors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Factor Analysis</CardTitle>
        <CardDescription>How each environmental factor is affecting your stress levels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {factors && factors.length > 0 ? (
            factors.map((factor, index) => (
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
  );
};

export default FactorAnalysisList;
