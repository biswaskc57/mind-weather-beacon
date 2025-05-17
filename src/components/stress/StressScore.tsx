
import React from 'react';

interface StressScoreProps {
  score: number;
}

const StressScore: React.FC<StressScoreProps> = ({ score }) => {
  return (
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
          stroke={score < 30 ? "#10B981" : 
                 score < 60 ? "#F59E0B" : 
                 score < 80 ? "#F97316" : "#EF4444"}
          strokeWidth="10"
          strokeDasharray="283"
          strokeDashoffset={283 - (score / 100) * 283}
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
          {score.toFixed(0)}
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
  );
};

export default StressScore;
