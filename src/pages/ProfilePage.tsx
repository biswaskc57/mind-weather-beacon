
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, HeartPulse, Activity, LineChart, Moon, MapPin, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  // Mock user data - in a real app this would come from an API or context
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    health: {
      sleep: {
        average: 7.5,
        lastWeek: [8, 7.5, 6, 7, 8.5, 9, 7.5],
        quality: "Good"
      },
      heartRate: {
        resting: 65,
        average: 72,
        lastWeek: [70, 72, 68, 75, 74, 70, 72]
      },
      bloodPressure: {
        systolic: 118,
        diastolic: 75,
        lastWeek: [
          { systolic: 120, diastolic: 78 },
          { systolic: 118, diastolic: 75 },
          { systolic: 117, diastolic: 74 },
          { systolic: 121, diastolic: 79 },
          { systolic: 116, diastolic: 75 },
          { systolic: 118, diastolic: 76 },
          { systolic: 118, diastolic: 75 }
        ]
      },
      activity: {
        average: 8500,
        lastWeek: [9200, 7800, 8500, 10200, 6500, 9000, 8500],
      }
    },
    environmental: {
      favorite: "Coastal areas with moderate humidity and low pollution",
      sensitive: ["High humidity", "Pollen", "Air pollution"],
      idealConditions: {
        temperature: "18-24°C",
        humidity: "40-60%",
        airQuality: "Good (0-50 AQI)"
      }
    }
  };

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
                <img 
                  src={userData.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-muted-foreground text-sm">{userData.email}</p>
              
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {userData.location}
              </div>
              
              <div className="w-full border-t border-border mt-4 pt-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="health">Health Data</TabsTrigger>
              <TabsTrigger value="environmental">Environmental</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About You</CardTitle>
                  <CardDescription>Your personal and health overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{userData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{userData.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">{userData.joinDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h3 className="text-lg font-medium mb-3">Health Summary</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <HeartPulse className="h-5 w-5 mr-2 text-red-500" />
                          <h4 className="font-medium">Heart Rate</h4>
                        </div>
                        <p className="text-2xl font-bold">{userData.health.heartRate.average} <span className="text-sm font-normal text-muted-foreground">bpm</span></p>
                      </div>
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Moon className="h-5 w-5 mr-2 text-purple-500" />
                          <h4 className="font-medium">Sleep</h4>
                        </div>
                        <p className="text-2xl font-bold">{userData.health.sleep.average} <span className="text-sm font-normal text-muted-foreground">hrs</span></p>
                      </div>
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Activity className="h-5 w-5 mr-2 text-blue-500" />
                          <h4 className="font-medium">Blood Pressure</h4>
                        </div>
                        <p className="text-2xl font-bold">{userData.health.bloodPressure.systolic}/{userData.health.bloodPressure.diastolic}</p>
                      </div>
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <LineChart className="h-5 w-5 mr-2 text-green-500" />
                          <h4 className="font-medium">Activity</h4>
                        </div>
                        <p className="text-2xl font-bold">{userData.health.activity.average.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">steps</span></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="health" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sleep Data</CardTitle>
                  <CardDescription>Your sleep patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 bg-muted/40 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Sleep history chart would appear here</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Average Sleep Duration</h4>
                      <p className="text-2xl font-bold">{userData.health.sleep.average} hours</p>
                      <p className="text-sm text-muted-foreground mt-1">Quality: {userData.health.sleep.quality}</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Sleep Recommendation</h4>
                      <p className="text-sm">Based on your age and activity level, we recommend 7-8 hours of sleep per night.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Heart Rate & Blood Pressure</CardTitle>
                  <CardDescription>Your cardiovascular health metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 bg-muted/40 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Heart rate history chart would appear here</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Resting Heart Rate</h4>
                      <p className="text-2xl font-bold">{userData.health.heartRate.resting} bpm</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Average Heart Rate</h4>
                      <p className="text-2xl font-bold">{userData.health.heartRate.average} bpm</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Blood Pressure</h4>
                      <p className="text-2xl font-bold">{userData.health.bloodPressure.systolic}/{userData.health.bloodPressure.diastolic}</p>
                      <p className="text-sm text-muted-foreground mt-1">Normal range</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="environmental" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Preferences</CardTitle>
                  <CardDescription>Your ideal environmental conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Favorite Environment</h3>
                    <p>{userData.environmental.favorite}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Environmental Sensitivities</h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.environmental.sensitive.map((item, index) => (
                        <span key={index} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Ideal Conditions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <h4 className="text-sm font-medium">Temperature</h4>
                        <p className="mt-1">{userData.environmental.idealConditions.temperature}</p>
                      </div>
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <h4 className="text-sm font-medium">Humidity</h4>
                        <p className="mt-1">{userData.environmental.idealConditions.humidity}</p>
                      </div>
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <h4 className="text-sm font-medium">Air Quality</h4>
                        <p className="mt-1">{userData.environmental.idealConditions.airQuality}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
