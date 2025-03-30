
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCheck, Calendar, UserCheck, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

const AttendanceTracker: React.FC = () => {
  const { t } = useLanguage();
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [date] = useState(new Date());

  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(format(now, 'HH:mm:ss'));
    setClockedIn(true);
    toast({
      title: 'Clock In Successful',
      description: `You clocked in at ${format(now, 'HH:mm:ss')}`,
      variant: 'default',
    });
  };

  const handleClockOut = () => {
    const now = new Date();
    setClockOutTime(format(now, 'HH:mm:ss'));
    setClockedIn(false);
    toast({
      title: 'Clock Out Successful',
      description: `You clocked out at ${format(now, 'HH:mm:ss')}`,
      variant: 'default',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('attendance.today')}</CardTitle>
            <CardDescription>
              {format(date, 'EEEE, MMMM dd, yyyy')}
            </CardDescription>
          </div>
          <Clock className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="clock">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clock" className="flex items-center gap-2">
              <CheckCheck className="h-4 w-4" />
              <span>{t('attendance.clockIn')}</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{t('common.calendar')}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="clock" className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCheck className="h-12 w-12 text-primary" />
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {format(new Date(), 'HH:mm:ss')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(), 'EEEE, MMMM dd, yyyy')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                <Button
                  onClick={handleClockIn}
                  disabled={clockedIn}
                  className="w-full"
                >
                  {t('attendance.clockIn')}
                </Button>
                <Button
                  onClick={handleClockOut}
                  disabled={!clockedIn}
                  variant="outline"
                  className="w-full"
                >
                  {t('attendance.clockOut')}
                </Button>
              </div>
              
              {(clockInTime || clockOutTime) && (
                <div className="mt-4 bg-muted p-3 rounded-md w-full max-w-xs">
                  {clockInTime && (
                    <div className="flex justify-between">
                      <span className="text-sm">{t('attendance.clockIn')}:</span>
                      <span className="text-sm font-medium">{clockInTime}</span>
                    </div>
                  )}
                  {clockOutTime && (
                    <div className="flex justify-between">
                      <span className="text-sm">{t('attendance.clockOut')}:</span>
                      <span className="text-sm font-medium">{clockOutTime}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Calendar view will be implemented in the next update.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AttendanceTracker;
