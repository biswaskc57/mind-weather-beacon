
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingForm from '@/components/onboarding/OnboardingForm';

const Onboarding = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if onboarding was already completed
    if (localStorage.getItem('onboardingComplete') === 'true') {
      navigate('/');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-mindsense-primary/10 to-mindsense-secondary/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-mindsense-primary to-mindsense-secondary flex items-center justify-center mb-4">
          <span className="text-white font-bold text-2xl">M</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome to MindSense</h1>
        <p className="text-gray-600">
          Track how your environment affects your mental wellbeing
        </p>
      </div>
      
      <OnboardingForm />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default Onboarding;
