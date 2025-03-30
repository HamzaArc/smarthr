
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const GeneralSettings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  const handleSaveSettings = () => {
    toast({
      title: t('settings.settingsSaved'),
      description: t('settings.settingsSavedDescription'),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.applicationSettings')}</CardTitle>
          <CardDescription>{t('settings.applicationSettingsDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="app-name">{t('settings.applicationName')}</Label>
            <Input id="app-name" defaultValue="StaffSync HR" />
            <p className="text-sm text-muted-foreground">
              {t('settings.applicationNameDescription')}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="app-language">{t('settings.defaultLanguage')}</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="app-language">
                <SelectValue placeholder={t('settings.selectLanguage')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {t('settings.defaultLanguageDescription')}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timezone">{t('settings.timezone')}</Label>
            <Select defaultValue="Africa/Casablanca">
              <SelectTrigger id="timezone">
                <SelectValue placeholder={t('settings.selectTimezone')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Africa/Casablanca">Casablanca (GMT+1)</SelectItem>
                <SelectItem value="Africa/Cairo">Cairo (GMT+2)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (GMT+1)</SelectItem>
                <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {t('settings.timezoneDescription')}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date-format">{t('settings.dateFormat')}</Label>
            <Select defaultValue="DD/MM/YYYY">
              <SelectTrigger id="date-format">
                <SelectValue placeholder={t('settings.selectDateFormat')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">{t('settings.darkMode')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.darkModeDescription')}
              </p>
            </div>
            <Switch id="dark-mode" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>
            {t('common.saveChanges')}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.emailSettings')}</CardTitle>
          <CardDescription>{t('settings.emailSettingsDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="smtp-server">{t('settings.smtpServer')}</Label>
            <Input id="smtp-server" placeholder="smtp.example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="smtp-port">{t('settings.smtpPort')}</Label>
            <Input id="smtp-port" placeholder="587" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="smtp-username">{t('settings.smtpUsername')}</Label>
            <Input id="smtp-username" placeholder="user@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="smtp-password">{t('settings.smtpPassword')}</Label>
            <Input id="smtp-password" type="password" placeholder="••••••••" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="smtp-encryption">{t('settings.useEncryption')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.useEncryptionDescription')}
              </p>
            </div>
            <Switch id="smtp-encryption" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>
            {t('common.saveChanges')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GeneralSettings;
