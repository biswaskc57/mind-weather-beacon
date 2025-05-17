
// Helper functions for dashboard components

export const getStressLevel = (score?: number): string => {
  if (!score) return "analyzing your stress levels";
  if (score > 70) return "quite stressed";
  if (score > 50) return "somewhat stressed";
  if (score > 30) return "a little stressed";
  return "not very stressed";
};

// Generate mock historical data for air quality
export const generateAirQualityHistory = (currentPm25?: number, currentPm10?: number) => [
  { name: 'Week 1', pm25: 12, pm10: 23 },
  { name: 'Week 2', pm25: 15, pm10: 27 },
  { name: 'Week 3', pm25: 18, pm10: 32 },
  { name: 'Week 4', pm25: 14, pm10: 25 },
  { name: 'Current', pm25: currentPm25 || 15, pm10: currentPm10 || 28 }
];
