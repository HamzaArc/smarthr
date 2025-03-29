
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/layouts/AppLayout";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import Employees from "@/pages/employees/Employees";
import Attendance from "@/pages/attendance/Attendance";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

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
              <Route element={<AppLayout />}>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                
                {/* Protected routes */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
                  path="/attendance" 
                  element={
                    <ProtectedRoute>
                      <Attendance />
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
