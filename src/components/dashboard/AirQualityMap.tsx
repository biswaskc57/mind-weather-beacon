
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AirQualityMap: React.FC = () => {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardContent className="p-0">
        <iframe 
          title="Europe Air Quality Forecast - Pollen"
          width="100%" 
          height="300" 
          src="https://atmosphere.copernicus.eu/charts/embed/cams_air_quality/europe-air-quality-forecast-pollens?controls_overlay=1&layer_name=composition_europe_pol_grass_forecast_surface&level=key_0&originating_centre=85_2&player_dimension=valid_time&projection=opencharts_europe" 
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      </CardContent>
    </Card>
  );
};

export default AirQualityMap;
