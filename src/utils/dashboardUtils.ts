
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
  // Check if we have weather data from the forecast API
  if (apiData && apiData.hourly && apiData.hourly.time) {
    // Use actual API data if available - for air quality we'll still use mock data
    // but with proper timestamps from the weather API
    const dataPoints = [];
    // Get 5 data points from the array with equal spacing (including the last one)
    const dataLength = apiData.hourly.time.length;
    
    // Generate mock PM values that trend toward the current values
    const mockStartPm25 = Math.max(5, (currentPm25 || 15) - 5 - Math.random() * 7);
    const mockStartPm10 = Math.max(10, (currentPm10 || 28) - 8 - Math.random() * 10);
    
    for (let i = 0; i < 5; i++) {
      // Calculate index for evenly spaced points
      const index = i === 4 ? dataLength - 1 : Math.floor(i * (dataLength - 1) / 4);
      
      // Format time for display
      const timeString = new Date(apiData.hourly.time[index]).toLocaleDateString();
      
      // For PM values, trend from start values to current values
      const progress = i / 4; // 0 to 1 as i goes from 0 to 4
      const pm25 = mockStartPm25 + progress * ((currentPm25 || 15) - mockStartPm25);
      const pm10 = mockStartPm10 + progress * ((currentPm10 || 28) - mockStartPm10);
      
      dataPoints.push({
        name: i === 4 ? 'Current' : timeString,
        pm25: Number(pm25.toFixed(1)),
        pm10: Number(pm10.toFixed(1))
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
