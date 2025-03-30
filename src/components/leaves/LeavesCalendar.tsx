import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format, getMonth, getYear, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Leave } from '@/types';
import { DayClickEventHandler, DayProps } from 'react-day-picker';

const employeeLeaves: Leave[] = [
  {
    id: '1',
    employeeId: 'emp001',
    startDate: '2023-11-15',
    endDate: '2023-11-20',
    reason: 'Annual vacation with family',
    status: 'approved',
    type: 'annual',
  },
  {
    id: '2',
    employeeId: 'emp005',
    startDate: '2023-11-10',
    endDate: '2023-11-12',
    reason: 'Medical appointment',
    status: 'approved',
    type: 'sick',
  },
  {
    id: '3',
    employeeId: 'emp008',
    startDate: '2023-12-01',
    endDate: '2023-12-15',
    reason: 'Visiting family abroad',
    status: 'pending',
    type: 'annual',
  },
];

const employeeNames: Record<string, string> = {
  emp001: 'Ahmed Khalid',
  emp005: 'Sara Mansouri',
  emp008: 'Karim El Ouazzani',
};

const nationalHolidays = [
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-01-11', name: 'Manifesto of Independence' },
  { date: '2023-05-01', name: 'Labor Day' },
  { date: '2023-07-30', name: 'Throne Day' },
  { date: '2023-08-14', name: 'Allegiance Day (Oued Eddahab)' },
  { date: '2023-08-20', name: 'Revolution Day' },
  { date: '2023-08-21', name: 'Youth Day' },
  { date: '2023-11-06', name: 'Green March Day' },
  { date: '2023-11-18', name: 'Independence Day' },
  { date: '2023-04-21', name: 'Eid al-Fitr' },
  { date: '2023-04-22', name: 'Eid al-Fitr Holiday' },
  { date: '2023-06-28', name: 'Eid al-Adha' },
  { date: '2023-06-29', name: 'Eid al-Adha Holiday' },
  { date: '2023-07-19', name: 'Islamic New Year' },
  { date: '2023-09-27', name: 'Prophet\'s Birthday' },
];

const LeavesCalendar: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedYear, setSelectedYear] = useState<string>(getYear(new Date()).toString());
  const [selectedMonth, setSelectedMonth] = useState<string>(getMonth(new Date()).toString());
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');

  const filteredLeaves = selectedEmployee === 'all'
    ? employeeLeaves
    : employeeLeaves.filter(leave => leave.employeeId === selectedEmployee);

  const isLeaveDay = (date: Date) => {
    return filteredLeaves.some(leave => {
      const startDate = parseISO(leave.startDate);
      const endDate = parseISO(leave.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const isHoliday = (date: Date) => {
    return nationalHolidays.some(holiday => {
      const holidayDate = parseISO(holiday.date);
      return date.getDate() === holidayDate.getDate() && 
             date.getMonth() === holidayDate.getMonth() && 
             date.getFullYear() === holidayDate.getFullYear();
    });
  };

  const getLeavesForDate = (date: Date) => {
    return filteredLeaves.filter(leave => {
      const startDate = parseISO(leave.startDate);
      const endDate = parseISO(leave.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const getHolidayForDate = (date: Date) => {
    return nationalHolidays.find(holiday => {
      const holidayDate = parseISO(holiday.date);
      return date.getDate() === holidayDate.getDate() && 
             date.getMonth() === holidayDate.getMonth() && 
             date.getFullYear() === holidayDate.getFullYear();
    });
  };

  const renderDay = (day: Date) => {
    const isLeave = isLeaveDay(day);
    const isNationalHoliday = isHoliday(day);
    
    return (
      <div className="relative">
        <div>{day.getDate()}</div>
        {isLeave && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500" />
        )}
        {isNationalHoliday && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-red-500" />
        )}
      </div>
    );
  };

  const currentYear = getYear(new Date());
  const availableYears = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString());

  const months = Array.from({ length: 12 }, (_, i) => i.toString());

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('leaves.teamCalendar')}</CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('leaves.selectEmployee')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('leaves.allEmployees')}</SelectItem>
                {Object.entries(employeeNames).map(([id, name]) => (
                  <SelectItem key={id} value={id}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4 space-x-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={t('common.month')} />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {format(new Date(2023, parseInt(month), 1), 'MMMM')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder={t('common.year')} />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => {
                const newDate = new Date();
                setSelectedMonth(getMonth(newDate).toString());
                setSelectedYear(getYear(newDate).toString());
              }}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="custom-calendar mx-auto max-w-lg">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={new Date(parseInt(selectedYear), parseInt(selectedMonth))}
              onMonthChange={(date) => {
                setSelectedMonth(getMonth(date).toString());
                setSelectedYear(getYear(date).toString());
              }}
              className="border rounded-md"
              modifiers={{
                leaveDay: (date) => isLeaveDay(date),
                holiday: (date) => isHoliday(date),
              }}
              modifiersClassNames={{
                leaveDay: "leave-day",
                holiday: "holiday",
              }}
              components={{
                Day: ({ date, ...dayProps }: DayProps) => {
                  if (!date) return null;
                  
                  return (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            {...dayProps}
                            className={cn(
                              dayProps.className || "",
                              isLeaveDay(date) && "bg-blue-100 text-blue-900 hover:bg-blue-200",
                              isHoliday(date) && "bg-red-100 text-red-900 hover:bg-red-200"
                            )}
                          >
                            {date.getDate()}
                          </button>
                        </TooltipTrigger>
                        {(isLeaveDay(date) || isHoliday(date)) && (
                          <TooltipContent side="bottom" className="max-w-xs">
                            <div className="space-y-2">
                              {getHolidayForDate(date) && (
                                <div>
                                  <Badge variant="outline" className="bg-red-100 text-red-900 mb-1">
                                    {t('leaves.holiday')}
                                  </Badge>
                                  <p className="font-semibold">{getHolidayForDate(date)?.name}</p>
                                </div>
                              )}
                              
                              {getLeavesForDate(date).map((leave) => (
                                <div key={leave.id} className="border-t pt-1">
                                  <Badge variant="outline" className="bg-blue-100 text-blue-900 mb-1">
                                    {t(`leaves.${leave.type}`)}
                                  </Badge>
                                  <p className="font-semibold">{employeeNames[leave.employeeId]}</p>
                                  <p className="text-xs text-muted-foreground">{leave.reason}</p>
                                </div>
                              ))}
                            </div>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  );
                },
              }}
            />
          </div>
          
          <div className="flex justify-center mt-6 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">{t('leaves.employeeLeave')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm">{t('leaves.nationalHoliday')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('leaves.upcomingHolidays')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nationalHolidays
              .filter(holiday => {
                const holidayDate = parseISO(holiday.date);
                return holidayDate >= new Date();
              })
              .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
              .slice(0, 5)
              .map((holiday) => (
                <div key={holiday.date} className="flex items-start space-x-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{holiday.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(holiday.date), 'EEEE, MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
              
            {nationalHolidays.filter(holiday => parseISO(holiday.date) >= new Date()).length === 0 && (
              <div className="text-center p-6">
                <Info className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">
                  {t('leaves.noUpcomingHolidays')}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeavesCalendar;
