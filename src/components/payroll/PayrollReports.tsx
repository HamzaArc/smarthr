
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { Calendar } from '@/components/ui/calendar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { CalendarRange, Download, FileDown, FileText, LineChart, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Define DateRange type
type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

// Sample data for the payroll trend chart
const payrollTrendData = [
  { month: 'Jan', amount: 210000 },
  { month: 'Feb', amount: 215000 },
  { month: 'Mar', amount: 215000 },
  { month: 'Apr', amount: 220000 },
  { month: 'May', amount: 220000 },
  { month: 'Jun', amount: 225000 },
  { month: 'Jul', amount: 225000 },
  { month: 'Aug', amount: 226000 },
  { month: 'Sep', amount: 230000 },
];

// Sample data for department breakdown
const departmentBreakdownData = [
  { department: 'HR', amount: 55000 },
  { department: 'IT', amount: 72000 },
  { department: 'Marketing', amount: 48000 },
  { department: 'Finance', amount: 60000 },
  { department: 'Customer Service', amount: 45000 },
];

// Sample reports
const availableReports = [
  { id: 'monthly-summary', name: 'Monthly Payroll Summary', icon: FileText },
  { id: 'tax-report', name: 'Tax Deduction Report', icon: FileText },
  { id: 'dept-breakdown', name: 'Department Cost Breakdown', icon: BarChart3 },
  { id: 'ytd-summary', name: 'Year-to-Date Summary', icon: LineChart },
  { id: 'benefits-report', name: 'Benefits & Allowances Report', icon: FileText },
];

// Chart configuration
const chartConfig = {
  payroll: {
    label: 'Payroll Amount',
    color: '#8884d8',
  },
  hr: {
    label: 'HR',
    color: '#8884d8',
  },
  it: {
    label: 'IT',
    color: '#82ca9d',
  },
  marketing: {
    label: 'Marketing',
    color: '#ffc658',
  },
  finance: {
    label: 'Finance',
    color: '#ff8042',
  },
  customerService: {
    label: 'Customer Service',
    color: '#0088fe',
  },
};

const currencyFormatter = new Intl.NumberFormat('fr-MA', {
  style: 'currency',
  currency: 'MAD',
  minimumFractionDigits: 0,
});

const PayrollReports: React.FC = () => {
  const { t } = useLanguage();
  const [reportFormat, setReportFormat] = useState('pdf');
  const [selectedReport, setSelectedReport] = useState('monthly-summary');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });

  const handleGenerateReport = () => {
    toast({
      title: t('payroll.generatingReport'),
      description: t('payroll.reportGenerationMessage'),
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('payroll.generateReports')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t('payroll.reportType')}</Label>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger>
                <SelectValue placeholder={t('payroll.selectReport')} />
              </SelectTrigger>
              <SelectContent>
                {availableReports.map((report) => (
                  <SelectItem key={report.id} value={report.id}>
                    <div className="flex items-center gap-2">
                      <report.icon className="h-4 w-4" />
                      <span>{report.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>{t('payroll.dateRange')}</Label>
            <div className="flex flex-col space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="from" className="text-xs">{t('common.from')}</Label>
                  <Input 
                    id="from" 
                    type="date" 
                    value={dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : undefined;
                      setDateRange(prev => ({
                        from: date,
                        to: prev?.to
                      }));
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="to" className="text-xs">{t('common.to')}</Label>
                  <Input 
                    id="to" 
                    type="date" 
                    value={dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : undefined;
                      setDateRange(prev => ({
                        from: prev?.from,
                        to: date
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>{t('payroll.reportFormat')}</Label>
            <Select value={reportFormat} onValueChange={setReportFormat}>
              <SelectTrigger>
                <SelectValue placeholder={t('payroll.selectFormat')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="w-full" onClick={handleGenerateReport}>
            <Download className="mr-2 h-4 w-4" />
            {t('payroll.generateReport')}
          </Button>
        </CardContent>
      </Card>
      
      <div className="md:col-span-2 space-y-6">
        <Tabs defaultValue="payroll-trend">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payroll-trend">
              <LineChart className="h-4 w-4 mr-2" />
              {t('payroll.payrollTrend')}
            </TabsTrigger>
            <TabsTrigger value="department-breakdown">
              <BarChart3 className="h-4 w-4 mr-2" />
              {t('payroll.departmentBreakdown')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="payroll-trend" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('payroll.payrollTrend')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={payrollTrendData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `${value/1000}k`}
                        domain={['dataMin - 10000', 'dataMax + 10000']}
                      />
                      <Tooltip formatter={(value) => currencyFormatter.format(value as number)} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        name={t('payroll.totalPayroll')}
                        stroke={chartConfig.payroll.color} 
                        fill={chartConfig.payroll.color} 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="department-breakdown" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('payroll.departmentBreakdown')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentBreakdownData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis 
                        tickFormatter={(value) => `${value/1000}k`}
                      />
                      <Tooltip formatter={(value) => currencyFormatter.format(value as number)} />
                      <Legend />
                      <Bar 
                        dataKey="amount" 
                        name={t('payroll.departmentCost')}
                        fill="#8884d8"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('payroll.recentReports')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Monthly Payroll Summary</p>
                    <p className="text-xs text-muted-foreground">{t('common.months.september')} 2023</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Tax Deduction Report</p>
                    <p className="text-xs text-muted-foreground">Q3 2023</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Department Cost Breakdown</p>
                    <p className="text-xs text-muted-foreground">YTD 2023</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayrollReports;
