
import React from 'react';

interface BubbleProps {
  factor: string;
  size: 'tiny' | 'small' | 'medium' | 'large';
  position: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  color: string;
  textColor: string;
}

interface EnvironmentalFactor {
  name: string;
  impact: number;
  description: string;
}

interface EnvironmentalFactorsBubblesProps {
  factors: EnvironmentalFactor[];
}

// Default factors if none are provided
const defaultFactors: BubbleProps[] = [
  {
    factor: 'Pollen',
    size: 'large',
    position: { left: '15%', top: '100px' },
    color: 'bg-green-200',
    textColor: 'text-black'
  },
  {
    factor: 'Air Pollution',
    size: 'large',
    position: { right: '15%', top: '100px' },
    color: 'bg-blue-300',
    textColor: 'text-white'
  },
  {
    factor: 'Temperature',
    size: 'medium',
    position: { bottom: '20px', left: '50%' },
    color: 'bg-green-300',
    textColor: 'text-black'
  },
  {
    factor: 'Humidity',
    size: 'small',
    position: { right: '25%', top: '30px' },
    color: 'bg-blue-400',
    textColor: 'text-white'
  },
  {
    factor: 'Noise',
    size: 'tiny',
    position: { left: '25%', top: '30px' },
    color: 'bg-green-100',
    textColor: 'text-black'
  }
];

// Map environmental factors to bubble props
const mapFactorsToBubbles = (factors: EnvironmentalFactor[]): BubbleProps[] => {
  if (!factors || factors.length === 0) return defaultFactors;
  
  // Only map the factors if we have them
  // This is a simple mapping, in a real app you might want to do something more sophisticated
  const positions = [
    { left: '15%', top: '100px' },
    { right: '15%', top: '100px' },
    { bottom: '20px', left: '50%' },
    { right: '25%', top: '30px' },
    { left: '25%', top: '30px' }
  ];
  
  const colors = [
    { color: 'bg-green-200', textColor: 'text-black' },
    { color: 'bg-blue-300', textColor: 'text-white' },
    { color: 'bg-green-300', textColor: 'text-black' },
    { color: 'bg-blue-400', textColor: 'text-white' },
    { color: 'bg-green-100', textColor: 'text-black' }
  ];
  
  const sizes = ['large', 'large', 'medium', 'small', 'tiny'] as const;
  
  return factors.slice(0, 5).map((factor, index) => ({
    factor: factor.name,
    size: sizes[index % sizes.length],
    position: positions[index % positions.length],
    ...colors[index % colors.length]
  }));
};

const getBubbleSize = (size: BubbleProps['size']) => {
  switch (size) {
    case 'large':
      return 'w-[180px] h-[180px]';
    case 'medium':
      return 'w-[130px] h-[130px]';
    case 'small':
      return 'w-[100px] h-[100px]';
    case 'tiny':
      return 'w-[80px] h-[80px]';
    default:
      return 'w-[130px] h-[130px]';
  }
};

const EnvironmentalFactorsBubbles: React.FC<EnvironmentalFactorsBubblesProps> = ({ factors }) => {
  // Map the environmental factors to bubble props
  const bubbles = mapFactorsToBubbles(factors);
  
  return (
    <div className="flex justify-center mb-16 max-w-3xl mx-auto w-full">
      <div className="relative w-full h-[400px]">
        {bubbles.map((bubble, index) => {
          const sizeClasses = getBubbleSize(bubble.size);
          const positionStyle = bubble.position || {};
          
          return (
            <div
              key={index}
              className={`absolute ${sizeClasses} rounded-full ${bubble.color} flex items-center justify-center ${bubble.textColor} font-semibold`}
              style={positionStyle}
            >
              {bubble.factor}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnvironmentalFactorsBubbles;
