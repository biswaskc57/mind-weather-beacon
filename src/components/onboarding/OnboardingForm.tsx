
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    existingConditions: false,
    locationConsent: false,
    wearableConnect: false
  });
  
  const navigate = useNavigate();
  
  const updateForm = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.age || !formData.gender) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
    } else if (step === 2) {
      if (!formData.locationConsent) {
        toast({
          title: "Location Permission Required",
          description: "We need your location to provide environmental data",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form data
      console.log("Submitting form data:", formData);
      
      // Store in local storage for now
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.setItem('onboardingComplete', 'true');
      
      toast({
        title: "Onboarding Complete",
        description: "Welcome to MindSense!"
      });
      
      // Redirect to dashboard
      navigate('/');
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Welcome to MindSense</CardTitle>
              <CardDescription>Let's get to know you a little better</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => updateForm('age', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={(value) => updateForm('gender', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                    <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
              <CardDescription>Help us understand your health context</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="existingConditions" 
                  checked={formData.existingConditions}
                  onCheckedChange={(checked) => 
                    updateForm('existingConditions', checked === true)
                  }
                />
                <Label htmlFor="existingConditions">
                  I have pre-existing mental health conditions (anxiety, depression, etc.)
                </Label>
              </div>
              <div className="pt-4">
                <div className="pb-2">
                  <Label>Location Access</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    MindSense needs access to your location to provide accurate environmental data
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="locationConsent" 
                    checked={formData.locationConsent}
                    onCheckedChange={(checked) => 
                      updateForm('locationConsent', checked === true)
                    }
                  />
                  <Label htmlFor="locationConsent">
                    I consent to sharing my location data
                  </Label>
                </div>
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Connect Your Devices</CardTitle>
              <CardDescription>Link your wearables for more accurate insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="wearableConnect" 
                  checked={formData.wearableConnect}
                  onCheckedChange={(checked) => 
                    updateForm('wearableConnect', checked === true)
                  }
                />
                <Label htmlFor="wearableConnect">
                  Connect to wearable devices (optional)
                </Label>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  If you don't have a wearable device, we'll use simulated data for demonstration purposes.
                </p>
              </div>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      {renderStepContent()}
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`w-2 h-2 rounded-full ${s === step ? 'bg-primary' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
        <Button onClick={handleNext}>
          {step < 3 ? 'Next' : 'Complete'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnboardingForm;
