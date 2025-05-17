import React from 'react';
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
  // Normalize size and color for visualization
  const maxImpact = Math.max(...factors.map(f => Math.abs(f.impact)));
  const minImpact = Math.min(...factors.map(f => Math.abs(f.impact)));

  // Map impact to size (between 60 and 180 px)
  const mapImpactToSize = (impact: number): number => {
    const scaled = (Math.abs(impact) - minImpact) / (maxImpact - minImpact);
    return 60 + scaled * 120;
  };

  // Map impact to red gradient (#82ca9d green to #ea384c red)
  const getColorByImpact = (impact: number): string => {
    const absImpact = Math.abs(impact);
    const percentage = (absImpact - minImpact) / (maxImpact - minImpact);
    const red = Math.min(234, 130 + percentage * 100);
    const green = Math.max(100, 202 - percentage * 150);
    const blue = 120;
    return `rgb(${Math.floor(red)}, ${Math.floor(green)}, ${blue})`;
  };

  const processedFactors = factors.map((factor, index) => ({
    ...factor,
    size: mapImpactToSize(factor.impact),
    color: getColorByImpact(factor.impact),
    left: Math.random() * 80 + 10,   // 10% to 90%
    top: Math.random() * 80 + 10,    // 10% to 90%
  }));

  return (
    <Card className="mb-16">
      <CardHeader>
        <CardTitle>Environmental Factors</CardTitle>
        <CardDescription>
          Larger and redder bubbles indicate stronger negative impact on your stress level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[500px] w-full">
          {processedFactors.map((factor) => (
            <div
              key={factor.name}
              className="absolute flex flex-col items-center transition-all hover:scale-105"
              style={{
                left: `${factor.left}%`,
                top: `${factor.top}%`,
              }}
            >
              <div
                className="rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  width: `${factor.size}px`,
                  height: `${factor.size}px`,
                  backgroundColor: factor.color,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              ></div>
              <div className="mt-3 text-center w-[150px]">
                <div className="font-medium text-sm">{factor.name}</div>
                <div className="text-xs text-muted-foreground">{factor.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalFactorsBubbles;
