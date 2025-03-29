
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AttendanceTracker from '@/components/AttendanceTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { attendance, employees } from '@/services/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Attendance: React.FC = () => {
  const { t } = useLanguage();
  
  // Get employee data for each attendance record
  const attendanceWithEmployees = attendance.map(record => {
    const employee = employees.find(emp => emp.id === record.employeeId);
    return { ...record, employee };
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500">{t('attendance.present')}</Badge>;
      case 'absent':
        return <Badge variant="destructive">{t('attendance.absent')}</Badge>;
      case 'late':
        return <Badge className="bg-yellow-500">{t('attendance.late')}</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('common.attendance')}</h1>
        <p className="text-muted-foreground">
          Track daily attendance and time records
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <AttendanceTracker />
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('attendance.today')}</CardTitle>
              <CardDescription>
                View all employees' attendance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('employees.name')}</TableHead>
                    <TableHead>{t('attendance.clockIn')}</TableHead>
                    <TableHead>{t('attendance.clockOut')}</TableHead>
                    <TableHead>{t('attendance.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceWithEmployees.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage 
                              src={record.employee?.imageUrl} 
                              alt={record.employee?.name} 
                            />
                            <AvatarFallback>
                              {record.employee?.name
                                .split(' ')
                                .map(part => part[0])
                                .join('')
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{record.employee?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{record.clockIn || '-'}</TableCell>
                      <TableCell>{record.clockOut || '-'}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
