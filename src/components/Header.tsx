
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';
import NotificationMenu from './NotificationMenu';
import { Input } from '@/components/ui/input';
import { Search, Menu } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
      <div className="md:hidden">
        <SidebarTrigger>
          <Button variant="ghost" size="sm" className="rounded-lg">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SidebarTrigger>
      </div>
      
      <div className="flex flex-1 items-center justify-end md:justify-between">
        <div className="relative hidden md:flex w-full max-w-sm items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder={t('common.search')}
            className="pl-10 bg-background rounded-lg border-muted"
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
