
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
  // Process factors for visualization
  const processedFactors = factors.map((factor) => {
    // Get bubble size based on impact (absolute value for both positive and negative impacts)
    const impactAbs = Math.abs(factor.impact);
    const size = mapImpactToSize(impactAbs);
    
    // Get color based on impact (negative impact is good, positive impact is bad)
    const color = getColorByImpact(factor.impact);
    
    return {
      ...factor,
      size,
      color
    };
  });
  
  // Map impact value to bubble size
  function mapImpactToSize(impact: number): number {
    if (impact > 70) return 180;
    if (impact > 50) return 140;
    if (impact > 30) return 100;
    return 70;
  }
  
  // Get color based on impact value
  function getColorByImpact(impact: number): string {
    if (impact < 0) return '#82ca9d'; // green (positive for health)
    if (impact > 70) return '#ea384c'; // red (negative)
    if (impact > 50) return '#F97316'; // orange (medium-high negative)
    if (impact > 30) return '#8B5CF6'; // purple (medium negative)
    return '#0EA5E9'; // blue (low negative)
  }
  
  return (
    <Card className="mb-16">
      <CardHeader>
        <CardTitle>Environmental Factors</CardTitle>
        <CardDescription>
          These external factors can influence your stress level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[500px] w-full">
          {/* Create bubbles with different positions, sizes, and colors */}
          {processedFactors.map((factor, index) => {
            // Calculate position based on index to spread them out
            const xPos = 100 + (index * 140) % 500;
            const yPos = 100 + Math.floor(index / 3) * 150;
            
            return (
              <div 
                key={factor.name}
                className="absolute flex flex-col items-center"
                style={{ 
                  left: `${xPos}px`, 
                  top: `${yPos}px`,
                }}
              >
                <div 
                  className="rounded-full flex items-center justify-center transition-all hover:opacity-90"
                  style={{
                    width: `${factor.size}px`,
                    height: `${factor.size}px`,
                    backgroundColor: factor.color,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                </div>
                <div className="mt-4 text-center">
                  <div className="font-medium text-sm">{factor.name}</div>
                  <div className="text-xs text-muted-foreground">{factor.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalFactorsBubbles;
