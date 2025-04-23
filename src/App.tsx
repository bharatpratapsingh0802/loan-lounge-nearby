import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LenderDetailPage from "./pages/LenderDetailPage";
import EligibilityPage from "./pages/EligibilityPage";
import OffersPage from "./pages/OffersPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import LenderProfilePage from "./pages/LenderProfilePage";
import LenderDashboardPage from "./pages/LenderDashboardPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/lender/:id" element={<LenderDetailPage />} />
                <Route path="/eligibility/:id?" element={<EligibilityPage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/lender-profile" element={<LenderProfilePage />} />
                <Route path="/admin/lender-profile/edit/:id" element={<LenderProfilePage />} />
                <Route path="/admin/dashboard" element={<LenderDashboardPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <BottomNavigation />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
