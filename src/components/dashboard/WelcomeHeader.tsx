
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
      {/* Header with Avatar Section */}
      <div className="flex items-center justify-center gap-4 mb-8 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-black">
          Hi {firstName}
        </h1>
        <Avatar className="h-16 w-16">
          <AvatarImage 
            src="/lovable-uploads/2538149c-abf7-4d41-8866-760644fcc7a6.png" 
            alt="AI Assistant" 
            className="object-cover"
          />
          <AvatarFallback className="bg-mindsense-primary text-white text-2xl">AI</AvatarFallback>
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
