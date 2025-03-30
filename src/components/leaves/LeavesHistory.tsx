
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, User, Calendar, Clock, FileType, AlertCircle } from 'lucide-react';
import type { Leave } from '@/types';

// Sample employee leaves for history
const leaveHistory: Leave[] = [
  {
    id: '1',
    employeeId: 'emp001',
    startDate: '2023-01-10',
    endDate: '2023-01-15',
    reason: 'Winter vacation',
    status: 'approved',
    type: 'annual',
  },
  {
    id: '2',
    employeeId: 'emp001',
    startDate: '2023-05-03',
    endDate: '2023-05-05',
    reason: 'Family emergency',
    status: 'approved',
    type: 'annual',
  },
  {
    id: '3',
    employeeId: 'emp005',
    startDate: '2023-02-14',
    endDate: '2023-02-16',
    reason: 'Medical procedure',
    status: 'approved',
    type: 'sick',
  },
  {
    id: '4',
    employeeId: 'emp008',
    startDate: '2023-03-20',
    endDate: '2023-03-25',
    reason: 'Personal time off',
    status: 'rejected',
    type: 'unpaid',
  },
  {
    id: '5',
    employeeId: 'emp005',
    startDate: '2023-06-12',
    endDate: '2023-06-12',
    reason: 'Doctor appointment',
    status: 'approved',
    type: 'sick',
  },
  {
    id: '6',
    employeeId: 'emp001',
    startDate: '2023-07-24',
    endDate: '2023-08-07',
    reason: 'Summer vacation',
    status: 'approved',
    type: 'annual',
  },
];

// Mock employee data
const employeeNames: Record<string, string> = {
  emp001: 'Ahmed Khalid',
  emp005: 'Sara Mansouri',
  emp008: 'Karim El Ouazzani',
};

const LeavesHistory: React.FC = () => {
  const { t } = useLanguage();
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter leaves based on selected filters
  const filteredLeaves = leaveHistory.filter(leave => {
    return (selectedEmployee === 'all' || leave.employeeId === selectedEmployee) &&
           (selectedType === 'all' || leave.type === selectedType) &&
           (selectedStatus === 'all' || leave.status === selectedStatus) &&
           (searchQuery === '' || 
            employeeNames[leave.employeeId]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            leave.reason.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  // Calculate leave statistics
  const calculateStats = () => {
    const leavesByEmployee: Record<string, { annual: number, sick: number, unpaid: number, total: number }> = {};
    
    leaveHistory.forEach(leave => {
      if (leave.status === 'approved') {
        const startDate = parseISO(leave.startDate);
        const endDate = parseISO(leave.endDate);
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
        if (!leavesByEmployee[leave.employeeId]) {
          leavesByEmployee[leave.employeeId] = { annual: 0, sick: 0, unpaid: 0, total: 0 };
        }
        
        leavesByEmployee[leave.employeeId][leave.type as 'annual' | 'sick' | 'unpaid'] += days;
        leavesByEmployee[leave.employeeId].total += days;
      }
    });
    
    return leavesByEmployee;
  };

  const leaveStats = calculateStats();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">{t('leaves.approved')}</Badge>;
      case 'rejected':
        return <Badge variant="destructive">{t('leaves.rejected')}</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">{t('leaves.pending')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="list" className="flex items-center gap-2">
          <FileType className="h-4 w-4" />
          <span>{t('leaves.leaveHistory')}</span>
        </TabsTrigger>
        <TabsTrigger value="summary" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{t('leaves.leaveSummary')}</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="list">
        <Card>
          <CardHeader>
            <CardTitle>{t('leaves.leaveHistory')}</CardTitle>
            <CardDescription>{t('leaves.historyDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('common.search')}
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder={t('leaves.selectEmployee')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('leaves.allEmployees')}</SelectItem>
                  {Object.entries(employeeNames).map(([id, name]) => (
                    <SelectItem key={id} value={id}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder={t('leaves.leaveType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('leaves.allTypes')}</SelectItem>
                  <SelectItem value="annual">{t('leaves.annual')}</SelectItem>
                  <SelectItem value="sick">{t('leaves.sick')}</SelectItem>
                  <SelectItem value="unpaid">{t('leaves.unpaid')}</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder={t('common.status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.allStatuses')}</SelectItem>
                  <SelectItem value="approved">{t('leaves.approved')}</SelectItem>
                  <SelectItem value="rejected">{t('leaves.rejected')}</SelectItem>
                  <SelectItem value="pending">{t('leaves.pending')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredLeaves.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.employee')}</TableHead>
                    <TableHead>{t('leaves.type')}</TableHead>
                    <TableHead>{t('leaves.period')}</TableHead>
                    <TableHead>{t('leaves.duration')}</TableHead>
                    <TableHead>{t('leaves.reason')}</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaves.map((leave) => {
                    const startDate = parseISO(leave.startDate);
                    const endDate = parseISO(leave.endDate);
                    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                    
                    return (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {employeeNames[leave.employeeId] || leave.employeeId}
                          </div>
                        </TableCell>
                        <TableCell>
                          {t(`leaves.${leave.type}`)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(parseISO(leave.startDate), 'MMM d, yyyy')} 
                              {leave.startDate !== leave.endDate && ` - ${format(parseISO(leave.endDate), 'MMM d, yyyy')}`}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {days} {days === 1 ? t('common.day') : t('common.days')}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate" title={leave.reason}>
                          {leave.reason}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(leave.status)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center p-6">
                <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-lg font-medium">{t('leaves.noRecordsFound')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('leaves.tryDifferentFilters')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="summary">
        <Card>
          <CardHeader>
            <CardTitle>{t('leaves.leaveSummary')}</CardTitle>
            <CardDescription>{t('leaves.summaryDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('common.employee')}</TableHead>
                  <TableHead>{t('leaves.annual')}</TableHead>
                  <TableHead>{t('leaves.sick')}</TableHead>
                  <TableHead>{t('leaves.unpaid')}</TableHead>
                  <TableHead>{t('common.total')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(leaveStats).map(([employeeId, stats]) => (
                  <TableRow key={employeeId}>
                    <TableCell className="font-medium">
                      {employeeNames[employeeId] || employeeId}
                    </TableCell>
                    <TableCell>
                      {stats.annual} {stats.annual === 1 ? t('common.day') : t('common.days')}
                    </TableCell>
                    <TableCell>
                      {stats.sick} {stats.sick === 1 ? t('common.day') : t('common.days')}
                    </TableCell>
                    <TableCell>
                      {stats.unpaid} {stats.unpaid === 1 ? t('common.day') : t('common.days')}
                    </TableCell>
                    <TableCell className="font-medium">
                      {stats.total} {stats.total === 1 ? t('common.day') : t('common.days')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LeavesHistory;
