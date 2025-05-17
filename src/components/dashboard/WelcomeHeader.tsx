
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeHeaderProps {
  firstName: string;
  stressLevel: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ firstName, stressLevel }) => {
  return (
    <>
      {/* Header Section */}
      <div className="text-center mb-4 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-black">
          Hi {firstName}
        </h1>
      </div>
      
      {/* User Image Section */}
      <div className="flex justify-center mb-8 max-w-3xl mx-auto w-full">
        <Avatar className="h-40 w-40">
          <AvatarImage 
            src="/lovable-uploads/1db0de0e-33bd-4f44-ae8f-c54b7b3a64c5.png" 
            alt="User Avatar" 
            className="object-cover"
          />
          <AvatarFallback className="bg-mindsense-primary text-white text-4xl">
            {firstName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      
      {/* Stress Analysis Text */}
      <Card className="max-w-3xl mx-auto mb-16 text-center">
        <CardContent className="py-6">
          <p className="text-xl font-medium text-muted-foreground mb-2">
            I can see that today you seem {stressLevel}.
          </p>
          <p className="text-xl font-medium text-mindsense-primary">
            I can help you!
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default WelcomeHeader;
