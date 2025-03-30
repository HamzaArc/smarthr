
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';
import { useAuth } from '@/contexts/AuthContext';

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <SidebarProvider className="min-h-screen h-screen w-full overflow-hidden">
      <div className="flex h-full w-full">
        <SideMenu />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
            <div className="mx-auto max-w-7xl animate-fade-in">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
