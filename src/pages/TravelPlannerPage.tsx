
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { MapPin, Plane, CloudSun, ThermometerSun, Wind, Droplets, Calendar } from 'lucide-react';

const TravelPlannerPage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('summer');
  const [healthPreferences, setHealthPreferences] = useState({
    temperature: [18, 28], // min-max in Celsius
    humidity: 50, // percentage
    airQuality: 80, // 0-100 scale where 100 is best
  });
  
  // Mock destinations - in a real app these would come from an API using Galileo/Copernicus data
  const recommendedDestinations = [
    {
      name: "Costa del Sol, Spain",
      image: "https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      weather: {
        temperature: 24,
        humidity: 55,
        airQuality: 85,
        uvIndex: 7
      },
      match: 95,
      season: "summer",
      description: "Perfect Mediterranean climate with low humidity and clean coastal air. Ideal for those with respiratory conditions."
    },
    {
      name: "Swiss Alps",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      weather: {
        temperature: 15,
        humidity: 40,
        airQuality: 95,
        uvIndex: 6
      },
      match: 90,
      season: "summer",
      description: "Pristine mountain air with low allergens. Excellent for asthma sufferers and those seeking clean environmental conditions."
    },
    {
      name: "Algarve, Portugal",
      image: "https://images.unsplash.com/photo-1566995541398-c0929a3a3fb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      weather: {
        temperature: 22,
        humidity: 60,
        airQuality: 80,
        uvIndex: 8
      },
      match: 87,
      season: "summer",
      description: "Coastal Atlantic climate with moderate humidity and good air circulation. Beneficial for skin conditions."
    },
    {
      name: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      weather: {
        temperature: 10,
        humidity: 65,
        airQuality: 75,
        uvIndex: 3
      },
      match: 82,
      season: "spring",
      description: "Moderate climate with balanced humidity. Note: May affect seasonal allergy sufferers during cherry blossom season."
    }
  ];

  // Filter destinations based on search and season
  const filteredDestinations = recommendedDestinations
    .filter(dest => dest.name.toLowerCase().includes(searchLocation.toLowerCase()))
    .filter(dest => selectedSeason === 'all' || dest.season === selectedSeason);

  const handleSliderChange = (name: string, value: number | number[]) => {
    setHealthPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Travel Planner</h1>
        <p className="text-muted-foreground">Find destinations that match your environmental health needs</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search and Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find Your Ideal Destination</CardTitle>
              <CardDescription>Search based on health and environmental factors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="location"
                    placeholder="Search destinations..." 
                    className="pl-10"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Season</Label>
                <Tabs defaultValue="summer" value={selectedSeason} onValueChange={setSelectedSeason}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="summer">Summer</TabsTrigger>
                    <TabsTrigger value="winter">Winter</TabsTrigger>
                    <TabsTrigger value="spring">Spring</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="pt-2 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Temperature Range</Label>
                    <span className="text-sm text-muted-foreground">
                      {healthPreferences.temperature[0]}°C - {healthPreferences.temperature[1]}°C
                    </span>
                  </div>
                  <Slider 
                    defaultValue={[18, 28]} 
                    min={0} 
                    max={40} 
                    step={1}
                    value={healthPreferences.temperature}
                    onValueChange={(value) => handleSliderChange('temperature', value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Humidity Preference</Label>
                    <span className="text-sm text-muted-foreground">{healthPreferences.humidity}%</span>
                  </div>
                  <Slider 
                    defaultValue={[50]} 
                    min={20} 
                    max={90} 
                    step={5}
                    value={[healthPreferences.humidity]}
                    onValueChange={(value) => handleSliderChange('humidity', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Air Quality Importance</Label>
                    <span className="text-sm text-muted-foreground">{healthPreferences.airQuality}%</span>
                  </div>
                  <Slider 
                    defaultValue={[80]} 
                    min={0} 
                    max={100} 
                    step={5}
                    value={[healthPreferences.airQuality]}
                    onValueChange={(value) => handleSliderChange('airQuality', value[0])}
                  />
                </div>
              </div>
              
              <Button className="w-full mt-2">
                <Plane className="mr-2 h-4 w-4" />
                Find Destinations
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Environmental Health Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CloudSun className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Check Air Quality Before Booking</p>
                  <p className="text-xs text-muted-foreground">Air quality can vary seasonally. Research your destination's typical conditions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Consider Seasonal Allergies</p>
                  <p className="text-xs text-muted-foreground">Pollen seasons differ by region. Plan accordingly if you have allergies.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <ThermometerSun className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Altitude Changes</p>
                  <p className="text-xs text-muted-foreground">High altitudes have different air pressure and oxygen levels which can affect health.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Destination Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Destinations</CardTitle>
              <CardDescription>Based on your environmental health profile</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDestinations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No destinations found matching your criteria.</p>
                  <p className="text-sm">Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredDestinations.map((destination, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 border-b border-border pb-6 last:border-0 last:pb-0">
                      <div className="w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden">
                        <img 
                          src={destination.image} 
                          alt={destination.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold">{destination.name}</h3>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {destination.match}% Match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{destination.description}</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                          <div className="flex flex-col items-center bg-muted/40 p-2 rounded-md">
                            <ThermometerSun className="h-4 w-4 mb-1 text-amber-500" />
                            <span className="text-xs text-muted-foreground">Temperature</span>
                            <span className="font-medium">{destination.weather.temperature}°C</span>
                          </div>
                          <div className="flex flex-col items-center bg-muted/40 p-2 rounded-md">
                            <Droplets className="h-4 w-4 mb-1 text-blue-500" />
                            <span className="text-xs text-muted-foreground">Humidity</span>
                            <span className="font-medium">{destination.weather.humidity}%</span>
                          </div>
                          <div className="flex flex-col items-center bg-muted/40 p-2 rounded-md">
                            <Wind className="h-4 w-4 mb-1 text-green-500" />
                            <span className="text-xs text-muted-foreground">Air Quality</span>
                            <span className="font-medium">{destination.weather.airQuality}/100</span>
                          </div>
                          <div className="flex flex-col items-center bg-muted/40 p-2 rounded-md">
                            <CloudSun className="h-4 w-4 mb-1 text-purple-500" />
                            <span className="text-xs text-muted-foreground">UV Index</span>
                            <span className="font-medium">{destination.weather.uvIndex}/10</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-3">
                          <Button size="sm">View Details</Button>
                          <Button size="sm" variant="outline">Save</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TravelPlannerPage;
