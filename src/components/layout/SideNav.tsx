
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  CompassIcon, 
  ChartBarIcon, 
  CloudIcon, 
  BrainIcon, 
  SettingsIcon, 
  CalendarIcon, 
  UserIcon 
} from '@/components/icons/Icons';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
        isActive 
          ? "bg-mindsense-primary text-white" 
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const SideNav = () => {
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 py-6 flex flex-col">
      <div className="px-4 mb-8">
        <div className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider px-4">
          Main
        </div>
        <nav className="space-y-1">
          <NavItem to="/" label="Dashboard" icon={<ChartBarIcon />} />
          <NavItem to="/environment" label="Environment" icon={<CloudIcon />} />
          <NavItem to="/location" label="Location" icon={<CompassIcon />} />
          <NavItem to="/stress" label="Stress Meter" icon={<BrainIcon />} />
        </nav>
      </div>
      
      <div className="px-4 mb-8">
        <div className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider px-4">
          Personal
        </div>
        <nav className="space-y-1">
          <NavItem to="/insights" label="Insights" icon={<CalendarIcon />} />
          <NavItem to="/profile" label="Profile" icon={<UserIcon />} />
          <NavItem to="/settings" label="Settings" icon={<SettingsIcon />} />
        </nav>
      </div>
      
      <div className="mt-auto px-6">
        <div className="bg-gradient-to-r from-mindsense-primary/10 to-mindsense-secondary/10 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-mindsense-primary mb-1">Upgrade to Pro</h4>
          <p className="text-xs text-gray-500 mb-3">Get access to more insights and features</p>
          <Button className="w-full bg-mindsense-primary hover:bg-mindsense-primary/90">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
