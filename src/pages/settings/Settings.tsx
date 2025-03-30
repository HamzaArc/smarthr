
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, Globe, Bell, Lock, Shield, Users, Building } from 'lucide-react';

import GeneralSettings from '@/components/settings/GeneralSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import UsersPermissions from '@/components/settings/UsersPermissions';
import CompanySettings from '@/components/settings/CompanySettings';

const Settings: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span>{t('settings.general')}</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>{t('settings.company')}</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>{t('settings.notifications')}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>{t('settings.security')}</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{t('settings.users')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="pt-4">
          <GeneralSettings />
        </TabsContent>
        
        <TabsContent value="company" className="pt-4">
          <CompanySettings />
        </TabsContent>
        
        <TabsContent value="notifications" className="pt-4">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="security" className="pt-4">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="users" className="pt-4">
          <UsersPermissions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
