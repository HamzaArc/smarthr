
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/layouts/AppLayout";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import Employees from "@/pages/employees/Employees";
import Attendance from "@/pages/attendance/Attendance";
import Leaves from "@/pages/leaves/Leaves";
import Payroll from "@/pages/payroll/Payroll";
import Departments from "@/pages/departments/Departments";
import Settings from "@/pages/settings/Settings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route element={<AppLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/index" element={<Index />} />
                
                {/* Protected routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/employees" 
                  element={
                    <ProtectedRoute>
                      <Employees />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/departments" 
                  element={
                    <ProtectedRoute>
                      <Departments />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/attendance" 
                  element={
                    <ProtectedRoute>
                      <Attendance />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/leaves" 
                  element={
                    <ProtectedRoute>
                      <Leaves />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/payroll" 
                  element={
                    <ProtectedRoute>
                      <Payroll />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
