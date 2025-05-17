
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

interface EnvironmentalFactorsBubblesProps {
  factors: BubbleProps[];
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

const EnvironmentalFactorsBubbles: React.FC<EnvironmentalFactorsBubblesProps> = ({ 
  factors = defaultFactors 
}) => {
  return (
    <div className="flex justify-center mb-16 max-w-3xl mx-auto w-full">
      <div className="relative w-full h-[400px]">
        {factors.map((bubble, index) => {
          const sizeClasses = getBubbleSize(bubble.size);
          const positionClasses = Object.entries(bubble.position).map(
            ([key, value]) => `${key === 'left' && value.includes('%') && 'transform -translate-x-1/2'}`
          ).join(' ');
          
          return (
            <div
              key={index}
              className={`absolute ${sizeClasses} rounded-full ${bubble.color} flex items-center justify-center ${bubble.textColor} font-semibold ${positionClasses}`}
              style={bubble.position as React.CSSProperties}
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
