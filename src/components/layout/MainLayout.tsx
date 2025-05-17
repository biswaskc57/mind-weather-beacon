
import React from 'react';
import Header from './Header';
import SideNav from './SideNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <main className="flex-1 overflow-auto p-6 bg-mindsense-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
