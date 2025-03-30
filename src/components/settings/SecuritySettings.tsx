
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Shield, Lock, Key, Fingerprint, AlertTriangle } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const { t } = useLanguage();

  const handleSaveSettings = () => {
    toast({
      title: t('settings.securitySettingsSaved'),
      description: t('settings.securitySettingsSavedDescription'),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.passwordPolicy')}</CardTitle>
          <CardDescription>{t('settings.passwordPolicyDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="min-length">{t('settings.minimumLength')}</Label>
            <div className="flex items-center gap-2">
              <Input id="min-length" type="number" defaultValue="8" min="6" max="24" className="w-24" />
              <span className="text-sm text-muted-foreground">{t('common.characters')}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-uppercase">{t('settings.requireUppercase')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.requireUppercaseDescription')}
              </p>
            </div>
            <Switch id="require-uppercase" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-number">{t('settings.requireNumber')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.requireNumberDescription')}
              </p>
            </div>
            <Switch id="require-number" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-special">{t('settings.requireSpecialChar')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.requireSpecialCharDescription')}
              </p>
            </div>
            <Switch id="require-special" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password-expiry">{t('settings.passwordExpiry')}</Label>
            <Select defaultValue="90">
              <SelectTrigger id="password-expiry">
                <SelectValue placeholder={t('settings.selectPasswordExpiry')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 {t('common.days')}</SelectItem>
                <SelectItem value="60">60 {t('common.days')}</SelectItem>
                <SelectItem value="90">90 {t('common.days')}</SelectItem>
                <SelectItem value="180">180 {t('common.days')}</SelectItem>
                <SelectItem value="never">{t('settings.never')}</SelectItem>
              </SelectContent>
            </Select>
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
          <CardTitle>{t('settings.twoFactorAuthentication')}</CardTitle>
          <CardDescription>{t('settings.twoFactorAuthenticationDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Fingerprint className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>{t('settings.enable2FA')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.enable2FADescription')}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="2fa-method">{t('settings.preferredMethod')}</Label>
            <Select defaultValue="app">
              <SelectTrigger id="2fa-method">
                <SelectValue placeholder={t('settings.select2FAMethod')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app">{t('settings.authenticatorApp')}</SelectItem>
                <SelectItem value="sms">{t('settings.sms')}</SelectItem>
                <SelectItem value="email">{t('settings.email')}</SelectItem>
              </SelectContent>
            </Select>
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
          <CardTitle>{t('settings.sessionSecurity')}</CardTitle>
          <CardDescription>{t('settings.sessionSecurityDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="session-timeout">{t('settings.sessionTimeout')}</Label>
            <Select defaultValue="30">
              <SelectTrigger id="session-timeout">
                <SelectValue placeholder={t('settings.selectSessionTimeout')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 {t('common.minutes')}</SelectItem>
                <SelectItem value="30">30 {t('common.minutes')}</SelectItem>
                <SelectItem value="60">60 {t('common.minutes')}</SelectItem>
                <SelectItem value="120">2 {t('common.hours')}</SelectItem>
                <SelectItem value="never">{t('settings.never')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="concurrent-sessions">{t('settings.allowConcurrentSessions')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.allowConcurrentSessionsDescription')}
              </p>
            </div>
            <Switch id="concurrent-sessions" />
          </div>
          
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-700">{t('settings.activeSessions')}</h4>
              <p className="text-sm text-amber-600 mt-1">
                {t('settings.activeSessionsDescription')}
              </p>
              <Button variant="outline" size="sm" className="mt-2 border-amber-300 text-amber-700 hover:bg-amber-100">
                {t('settings.terminateAllSessions')}
              </Button>
            </div>
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

export default SecuritySettings;
