
// Helper functions for dashboard components

export const getStressLevel = (score?: number): string => {
  if (!score) return "analyzing your stress levels";
  if (score > 70) return "quite stressed";
  if (score > 50) return "somewhat stressed";
  if (score > 30) return "a little stressed";
  return "not very stressed";
};

// Generate air quality history from real data if available, otherwise use mock data
export const generateAirQualityHistory = (currentPm25?: number, currentPm10?: number, apiData?: any) => {
  if (apiData && apiData.hourly && apiData.hourly.pm2_5 && apiData.hourly.pm10 && apiData.hourly.time) {
    // Use actual API data if available
    const dataPoints = [];
    // Get 5 data points from the array with equal spacing (including the last one)
    const dataLength = apiData.hourly.time.length;
    
    for (let i = 0; i < 5; i++) {
      // Calculate index for evenly spaced points
      const index = i === 4 ? dataLength - 1 : Math.floor(i * (dataLength - 1) / 4);
      
      // Format time for display
      const timeString = new Date(apiData.hourly.time[index]).toLocaleDateString();
      
      dataPoints.push({
        name: i === 4 ? 'Current' : timeString,
        pm25: apiData.hourly.pm2_5[index] || 0,
        pm10: apiData.hourly.pm10[index] || 0
      });
    }
    
    return dataPoints;
  }
  
  // Fallback to mock data if API data isn't available
  return [
    { name: 'Week 1', pm25: 12, pm10: 23 },
    { name: 'Week 2', pm25: 15, pm10: 27 },
    { name: 'Week 3', pm25: 18, pm10: 32 },
    { name: 'Week 4', pm25: 14, pm10: 25 },
    { name: 'Current', pm25: currentPm25 || 15, pm10: currentPm10 || 28 }
  ];
};
