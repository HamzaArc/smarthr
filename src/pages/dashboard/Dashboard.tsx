
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import EmployeeList from '@/components/EmployeeList';
import AttendanceTracker from '@/components/AttendanceTracker';
import { Users, UserCheck, UserMinus, LayoutGrid, CheckSquare, Calendar, CalendarClock, Smile } from 'lucide-react';
import { departments, employees } from '@/services/mockData';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  // Calculate some stats
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const onLeaveEmployees = employees.filter(e => e.status === 'onLeave').length;
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('common.dashboard')}</h1>
        <p className="text-muted-foreground">
          {t('common.welcome')}, {user?.name}
        </p>
      </div>
      
      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title={t('dashboard.totalEmployees')}
          value={employees.length}
          icon={<Users className="h-6 w-6 text-primary" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title={t('dashboard.presentToday')}
          value={activeEmployees}
          icon={<UserCheck className="h-6 w-6 text-green-600" />}
        />
        <StatCard 
          title={t('dashboard.onLeave')}
          value={onLeaveEmployees}
          icon={<UserMinus className="h-6 w-6 text-yellow-500" />}
        />
        <StatCard 
          title={t('dashboard.departments')}
          value={departments.length}
          icon={<LayoutGrid className="h-6 w-6 text-blue-500" />}
        />
      </div>
      
      {/* Quick actions and recent activities */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>{t('employees.list')}</CardTitle>
            <CardDescription>
              {t('dashboard.totalEmployees')}: {employees.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeeList />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions')}</CardTitle>
            <CardDescription>
              Common daily tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                  <CheckSquare className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">{t('attendance.clockIn')}</span>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                  <Calendar className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">{t('common.leaves')}</span>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                  <CalendarClock className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">{t('common.attendance')}</span>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                  <Smile className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">Feedback</span>
                </CardContent>
              </Card>
            </div>
            
            <AttendanceTracker />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
