
import React from 'react';
import Header from './Header';
import SideNav from './SideNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import ChatbotWidget from '../dashboard/ChatbotWidget';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && <SideNav />}
        <main className={cn(
          "flex-1 overflow-auto bg-mindsense-background",
          isMobile ? "p-4 pt-14" : "p-6"
        )}>
          {isMobile && <SideNav />}
          {children}
        </main>
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default MainLayout;
