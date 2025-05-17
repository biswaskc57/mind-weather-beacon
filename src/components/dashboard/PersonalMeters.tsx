
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HeartPulse, Moon, Activity, LineChart } from 'lucide-react';

interface PersonalMeterProps {
  title: string;
  value: number;
  maxValue: number;
  unit: string;
  icon: React.ReactNode;
  description?: string;
  color: string;
}

const PersonalMeter: React.FC<PersonalMeterProps> = ({
  title,
  value,
  maxValue,
  unit,
  icon,
  description,
  color
}) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <span className="font-bold text-lg">{value}<span className="text-xs ml-1 font-normal text-gray-500">{unit}</span></span>
      </div>
      
      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}
      
      <Progress value={percentage} className="h-1.5" />
    </div>
  );
};

const PersonalMeters = () => {
  // Mock data - in a real app this would come from an API or context
  const personalData = {
    sleep: {
      hours: 7.5,
      target: 9,
      quality: "Good"
    },
    heartRate: {
      current: 72,
      resting: 65,
      max: 180
    },
    bloodPressure: {
      systolic: 118,
      diastolic: 75,
      target: 120
    },
    stress: {
      level: 35,
      max: 100
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Personal Health</h2>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <PersonalMeter
          title="Sleep"
          value={personalData.sleep.hours}
          maxValue={9}
          unit="hrs"
          icon={<Moon className="h-4 w-4 text-white" />}
          description={`${personalData.sleep.quality} quality`}
          color="bg-purple-500"
        />
        <PersonalMeter
          title="Heart Rate"
          value={personalData.heartRate.current}
          maxValue={personalData.heartRate.max}
          unit="bpm"
          icon={<HeartPulse className="h-4 w-4 text-white" />}
          description={`Resting: ${personalData.heartRate.resting} bpm`}
          color="bg-red-500"
        />
        <PersonalMeter
          title="Blood Pressure"
          value={personalData.bloodPressure.systolic}
          maxValue={personalData.bloodPressure.target + 40}
          unit="/75 mmHg"
          icon={<Activity className="h-4 w-4 text-white" />}
          description="Normal range"
          color="bg-blue-500"
        />
        <PersonalMeter
          title="Activity Level"
          value={68}
          maxValue={100}
          unit="%"
          icon={<LineChart className="h-4 w-4 text-white" />}
          description="8,450 steps today"
          color="bg-green-500"
        />
      </div>
    </div>
  );
};

export default PersonalMeters;
