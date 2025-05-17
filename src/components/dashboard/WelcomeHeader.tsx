
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
      {/* Simple Header Section */}
      <div className="text-center mb-8 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-black mb-2">
          Hi {firstName}
        </h1>
      </div>
      
      {/* AI Agent Avatar Section */}
      <div className="flex justify-center mb-12 max-w-3xl mx-auto w-full">
        <Avatar className="h-52 w-52">
          <AvatarImage 
            src="/lovable-uploads/2538149c-abf7-4d41-8866-760644fcc7a6.png" 
            alt="AI Assistant" 
            className="object-cover"
          />
          <AvatarFallback className="bg-mindsense-primary text-white text-5xl">AI</AvatarFallback>
        </Avatar>
      </div>
      
      {/* Stress Analysis Text */}
      <Card className="max-w-3xl mx-auto mb-16 text-center">
        <CardContent className="py-6">
          <p className="text-xl font-medium text-muted-foreground mb-2">
            I can see that today you seem quite stressed.
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
