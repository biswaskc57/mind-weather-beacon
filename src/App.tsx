
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import EnvironmentPage from "./pages/EnvironmentPage";
import LocationPage from "./pages/LocationPage";
import StressPage from "./pages/StressPage";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Route guard to check if onboarding is complete
const RequireOnboarding = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if onboarding is complete in localStorage
    const isComplete = localStorage.getItem("onboardingComplete") === "true";
    setOnboardingComplete(isComplete);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!onboardingComplete) {
    // Redirect to onboarding, but remember where they were trying to go
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <RequireOnboarding>
                <Dashboard />
              </RequireOnboarding>
            } 
          />
          <Route 
            path="/environment" 
            element={
              <RequireOnboarding>
                <EnvironmentPage />
              </RequireOnboarding>
            } 
          />
          <Route 
            path="/location" 
            element={
              <RequireOnboarding>
                <LocationPage />
              </RequireOnboarding>
            } 
          />
          <Route 
            path="/stress" 
            element={
              <RequireOnboarding>
                <StressPage />
              </RequireOnboarding>
            } 
          />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
