
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const { t } = useLanguage();
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: Home, label: t('common.dashboard') },
    { path: '/employees', icon: Users, label: t('common.employees') },
    { path: '/departments', icon: LayoutGrid, label: t('common.departments') },
    { path: '/attendance', icon: CheckCheck, label: t('common.attendance') },
    { path: '/leaves', icon: CalendarDays, label: t('common.leaves') },
    { path: '/recruitment', icon: BriefcaseBusiness, label: t('common.recruitment') },
    { path: '/payroll', icon: CreditCard, label: t('common.payroll') },
    { path: '/settings', icon: Settings, label: t('common.settings') },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar className="bg-primary text-white border-r-0">
      <SidebarHeader className="flex h-16 items-center px-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
            <span className="text-sm font-bold text-primary">SH</span>
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
                  className={`text-white/80 hover:text-white hover:bg-white/10 ${isActive(item.path) ? 'bg-white/20 text-white' : ''}`}
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
          <div className="flex items-center gap-3 px-2 py-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
            <HelpCircle className="h-5 w-5" />
            <span>Support</span>
          </div>
          <div className="px-2 mb-2">
            <LanguageSelector />
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className="justify-start text-white/80 hover:text-white hover:bg-white/10"
          >
            <LogOut className="h-5 w-5 mr-3" />
            {t('auth.logout')}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideMenu;
