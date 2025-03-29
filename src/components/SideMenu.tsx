
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
  SidebarMenuLink,
  SidebarGroup
} from '@/components/ui/sidebar';
import { 
  Home, 
  Users, 
  LayoutGrid, 
  ClipboardCheck, 
  CalendarDays, 
  BriefcaseBusiness,
  Settings, 
  CreditCard,
  HelpCircle
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const SideMenu: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: Home, label: t('common.dashboard') },
    { path: '/employees', icon: Users, label: t('common.employees') },
    { path: '/departments', icon: LayoutGrid, label: t('common.departments') },
    { path: '/attendance', icon: ClipboardCheck, label: t('common.attendance') },
    { path: '/leaves', icon: CalendarDays, label: t('common.leaves') },
    { path: '/recruitment', icon: BriefcaseBusiness, label: t('common.recruitment') },
    { path: '/payroll', icon: CreditCard, label: t('common.payroll') },
    { path: '/settings', icon: Settings, label: t('common.settings') },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-bold text-primary-foreground">SS</span>
          </div>
          <span className="font-bold text-xl">{t('app.name')}</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuLink 
                  asChild 
                  active={isActive(item.path)}
                >
                  <Link to={item.path} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <HelpCircle className="h-5 w-5" />
            <span>Support</span>
          </div>
          <div className="px-2">
            <LanguageSelector />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideMenu;
