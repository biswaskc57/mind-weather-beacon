
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  CompassIcon, 
  ChartBarIcon, 
  CloudIcon, 
  BrainIcon, 
  SettingsIcon, 
  CalendarIcon, 
  UserIcon
} from '@/components/icons/Icons';
import { Activity } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Menu, X } from 'lucide-react';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, onClick }) => {
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
      onClick={onClick}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const SideNavContent = ({ onItemClick }: { onItemClick?: () => void }) => {
  return (
    <>
      <div className="px-4 mb-8">
        <div className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider px-4">
          Main
        </div>
        <nav className="space-y-1">
          <NavItem to="/" label="Dashboard" icon={<ChartBarIcon />} onClick={onItemClick} />
          <NavItem to="/metrics" label="Metrics" icon={<Activity className="h-5 w-5" />} onClick={onItemClick} />
          <NavItem to="/environment" label="Environment" icon={<CloudIcon />} onClick={onItemClick} />
          <NavItem to="/location" label="Location" icon={<CompassIcon />} onClick={onItemClick} />
          <NavItem to="/stress" label="Stress Meter" icon={<BrainIcon />} onClick={onItemClick} />
        </nav>
      </div>
      
      <div className="px-4 mb-8">
        <div className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider px-4">
          Personal
        </div>
        <nav className="space-y-1">
          <NavItem to="/insights" label="Insights" icon={<CalendarIcon />} onClick={onItemClick} />
          <NavItem to="/profile" label="Profile" icon={<UserIcon />} onClick={onItemClick} />
          <NavItem to="/settings" label="Settings" icon={<SettingsIcon />} onClick={onItemClick} />
        </nav>
      </div>
      
      <div className="mt-auto px-6 pb-6">
        <div className="bg-gradient-to-r from-mindsense-primary/10 to-mindsense-secondary/10 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-mindsense-primary mb-1">Upgrade to Pro</h4>
          <p className="text-xs text-gray-500 mb-3">Get access to more insights and features</p>
          <Button className="w-full bg-mindsense-primary hover:bg-mindsense-primary/90">
            Upgrade Now
          </Button>
        </div>
      </div>
    </>
  );
};

const SideNav = () => {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // For mobile: render a drawer with the sidebar content
  if (isMobile) {
    return (
      <div className="lg:hidden absolute top-4 left-4 z-30">
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" className="p-1 h-10 w-10">
              <Menu className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh]">
            <div className="w-full h-full bg-white py-6 flex flex-col overflow-y-auto">
              <div className="flex justify-end px-4 mb-2">
                <Button 
                  variant="ghost" 
                  className="p-1 h-9 w-9" 
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <SideNavContent onItemClick={() => setIsDrawerOpen(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  // For desktop: render the sidebar as before
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 py-6 flex flex-col overflow-y-auto">
      <SideNavContent />
    </div>
  );
};

export default SideNav;
