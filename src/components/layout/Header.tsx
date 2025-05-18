
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-3">
        <img 
          src="/lovable-uploads/0c1c2ced-7d48-4e89-a842-a3d260f82a29.png" 
          alt="Calmos Logo" 
          className="h-8 w-8"
          style={{width:"110%"}}
        />
        <span className="text-xl font-bold bg-gradient-to-r from-mindsense-primary to-mindsense-secondary text-transparent bg-clip-text">
          Calmos
        </span>
      </Link>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Avatar>
          <AvatarImage 
            src="/lovable-uploads/0c1c2ced-7d48-4e89-a842-a3d260f82a29.png" 
            alt="Calmos Logo" 
            style={{width:"110%"}} 
          />
          <AvatarFallback className="bg-gradient-to-r from-mindsense-primary to-mindsense-secondary text-white">
            C
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
