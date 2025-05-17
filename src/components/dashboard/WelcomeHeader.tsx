
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface WelcomeHeaderProps {
  firstName: string;
  stressLevel: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ firstName, stressLevel }) => {
  return (
    <>
      {/* Simple Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          Hi {firstName}
        </h1>
      </div>
      
      {/* AI Agent Avatar Section */}
      <div className="flex justify-center mb-12">
        <Avatar className="h-40 w-40">
          <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
          <AvatarFallback className="bg-mindsense-primary text-white text-4xl">AI</AvatarFallback>
        </Avatar>
      </div>
      
      {/* Stress Analysis Text */}
      <div className="text-center mb-16">
        <p className="text-xl font-medium text-muted-foreground mb-2">
          I can see that today you seem {stressLevel}.
        </p>
        <p className="text-xl font-medium text-mindsense-primary">
          I can help you!
        </p>
      </div>
    </>
  );
};

export default WelcomeHeader;
