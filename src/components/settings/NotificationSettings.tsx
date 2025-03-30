
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Bell, Mail, MessageSquare, Clock, Calendar, BadgeAlert } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const { t } = useLanguage();

  const handleSaveSettings = () => {
    toast({
      title: t('settings.notificationsSaved'),
      description: t('settings.notificationsSavedDescription'),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.emailNotifications')}</CardTitle>
          <CardDescription>{t('settings.emailNotificationsDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>{t('settings.leaveRequests')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.leaveRequestsDescription')}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>{t('settings.attendanceAlerts')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.attendanceAlertsDescription')}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>{t('settings.upcomingEvents')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.upcomingEventsDescription')}
                </p>
              </div>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>{t('settings.payrollNotifications')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.payrollNotificationsDescription')}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
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
          <CardTitle>{t('settings.systemNotifications')}</CardTitle>
          <CardDescription>{t('settings.systemNotificationsDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <BadgeAlert className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>{t('settings.systemAlerts')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.systemAlertsDescription')}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>{t('settings.employeeMessages')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.employeeMessagesDescription')}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>{t('settings.browserNotifications')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.browserNotificationsDescription')}
                </p>
              </div>
            </div>
            <Switch />
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
          <CardTitle>{t('settings.notificationSchedule')}</CardTitle>
          <CardDescription>{t('settings.notificationScheduleDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>{t('settings.dailyDigest')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.dailyDigestDescription')}
                </p>
              </div>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>{t('settings.weeklyReport')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.weeklyReportDescription')}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
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

export default NotificationSettings;
