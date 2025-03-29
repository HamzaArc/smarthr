
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';
import NotificationMenu from './NotificationMenu';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      
      <div className="flex flex-1 items-center justify-end md:justify-between">
        <div className="relative hidden md:flex w-full max-w-sm items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('common.search')}
            className="w-full pl-8 bg-background"
          />
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              <NotificationMenu />
              <LanguageSelector />
              <UserMenu />
            </>
          )}
          {!isAuthenticated && (
            <LanguageSelector />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
