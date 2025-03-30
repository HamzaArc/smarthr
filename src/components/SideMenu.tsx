
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup
} from '@/components/ui/sidebar';
import { 
  Home, 
  Users, 
  LayoutGrid, 
  CheckCheck, 
  CalendarDays, 
  BriefcaseBusiness,
  Settings, 
  CreditCard,
  HelpCircle,
  LogOut
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const SideMenu: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/employees', icon: Users, label: 'Employees' },
    { path: '/departments', icon: LayoutGrid, label: 'Departments' },
    { path: '/attendance', icon: CheckCheck, label: 'Attendance' },
    { path: '/leaves', icon: CalendarDays, label: 'Leaves' },
    { path: '/recruitment', icon: BriefcaseBusiness, label: 'Recruitment' },
    { path: '/payroll', icon: CreditCard, label: 'Payroll' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white border-r-0">
      <SidebarHeader className="flex h-16 items-center px-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
            <span className="text-sm font-bold text-indigo-600">SH</span>
          </div>
          <span className="font-bold text-xl text-white">Smart HRs</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive(item.path)}
                  className={`text-white/90 hover:text-white hover:bg-white/10 ${isActive(item.path) ? 'bg-yellow-500/90 text-white' : ''}`}
                >
                  <Link to={item.path} className="flex items-center gap-3 rounded-lg">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-white/10 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2 py-2 text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
            <HelpCircle className="h-5 w-5" />
            <span>Support</span>
          </div>
          <div className="px-2 mb-2">
            <LanguageSelector />
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className="justify-start text-white/90 hover:text-white hover:bg-white/10"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideMenu;
