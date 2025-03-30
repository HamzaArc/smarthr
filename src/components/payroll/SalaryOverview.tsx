
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend,
  ResponsiveContainer, 
  TooltipProps 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Sample salary data
const sampleSalaryData = [
  { 
    id: 'emp001', 
    name: 'Ahmed Khalid', 
    position: 'HR Manager',
    department: 'Human Resources',
    basicSalary: 20000,
    allowances: 5000,
    deductions: 2500,
    netSalary: 22500,
    lastUpdate: '2023-09-15'
  },
  { 
    id: 'emp005', 
    name: 'Sara Mansouri', 
    position: 'Senior Developer',
    department: 'IT',
    basicSalary: 18000,
    allowances: 3000,
    deductions: 2000,
    netSalary: 19000,
    lastUpdate: '2023-09-15'
  },
  { 
    id: 'emp008', 
    name: 'Karim El Ouazzani', 
    position: 'Marketing Specialist',
    department: 'Marketing',
    basicSalary: 16000,
    allowances: 2500,
    deductions: 1800,
    netSalary: 16700,
    lastUpdate: '2023-09-15'
  },
  { 
    id: 'emp012', 
    name: 'Fatima Zahra', 
    position: 'Finance Officer',
    department: 'Finance',
    basicSalary: 16500,
    allowances: 2000,
    deductions: 1700,
    netSalary: 16800,
    lastUpdate: '2023-09-15'
  },
  { 
    id: 'emp020', 
    name: 'Youssef Amrani', 
    position: 'Customer Support Lead',
    department: 'Customer Service',
    basicSalary: 15000,
    allowances: 1500,
    deductions: 1600,
    netSalary: 14900,
    lastUpdate: '2023-09-15'
  }
];

// Department salary distribution for chart
const departmentSalaryData = [
  { name: 'HR', value: 55000, fill: '#8884d8' },
  { name: 'IT', value: 72000, fill: '#83a6ed' },
  { name: 'Marketing', value: 48000, fill: '#8dd1e1' },
  { name: 'Finance', value: 60000, fill: '#82ca9d' },
  { name: 'Customer Service', value: 45000, fill: '#a4de6c' }
];

// Salary composition data
const salaryCompositionData = [
  {
    name: 'HR',
    basic: 42000,
    allowances: 8000,
    deductions: 5000,
  },
  {
    name: 'IT',
    basic: 55000,
    allowances: 12000,
    deductions: 8000,
  },
  {
    name: 'Marketing',
    basic: 38000,
    allowances: 6000,
    deductions: 4500,
  },
  {
    name: 'Finance',
    basic: 48000,
    allowances: 7500,
    deductions: 6000,
  },
  {
    name: 'Customer Service',
    basic: 36000,
    allowances: 5500,
    deductions: 3800,
  },
];

// Chart configuration
const chartConfig = {
  basic: {
    label: 'Basic Salary',
    color: '#8884d8',
  },
  allowances: {
    label: 'Allowances',
    color: '#82ca9d',
  },
  deductions: {
    label: 'Deductions',
    color: '#ff8042',
  },
};

const currencyFormatter = new Intl.NumberFormat('fr-MA', {
  style: 'currency',
  currency: 'MAD',
  minimumFractionDigits: 0,
});

const SalaryOverview: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('payroll.departmentDistribution')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={salaryCompositionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value/1000}k`} />
                  <RechartsTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            active={active}
                            payload={payload}
                            labelFormatter={(name) => `${name} ${t('common.department')}`}
                            formatter={(value, name) => [
                              currencyFormatter.format(value as number), 
                              chartConfig[name as keyof typeof chartConfig]?.label || name
                            ]}
                          />
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="basic" name={chartConfig.basic.label} fill={chartConfig.basic.color} />
                  <Bar dataKey="allowances" name={chartConfig.allowances.label} fill={chartConfig.allowances.color} />
                  <Bar dataKey="deductions" name={chartConfig.deductions.label} fill={chartConfig.deductions.color} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('payroll.payrollSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">{t('payroll.totalMonthlySalaries')}</p>
                <p className="text-2xl font-bold mt-1">{currencyFormatter.format(230000)}</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">{t('payroll.averageSalary')}</p>
                <p className="text-2xl font-bold mt-1">{currencyFormatter.format(17950)}</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">{t('payroll.totalAllowances')}</p>
                <p className="text-2xl font-bold mt-1">{currencyFormatter.format(39000)}</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">{t('payroll.totalDeductions')}</p>
                <p className="text-2xl font-bold mt-1">{currencyFormatter.format(27300)}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">{t('payroll.keyPayrollMetrics')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{t('payroll.highestPaidDepartment')}</span>
                  <Badge>IT</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('payroll.lowestPaidDepartment')}</span>
                  <Badge variant="outline">Customer Service</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('payroll.payrollRunDate')}</span>
                  <span className="text-sm font-medium">{format(new Date(), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('payroll.nextPayrollRun')}</span>
                  <span className="text-sm font-medium">{format(new Date(2023, 9, 30), 'MMMM d, yyyy')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('payroll.employeeSalaries')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('common.employee')}</TableHead>
                <TableHead>{t('common.position')}</TableHead>
                <TableHead>{t('common.department')}</TableHead>
                <TableHead className="text-right">{t('payroll.basicSalary')}</TableHead>
                <TableHead className="text-right">{t('payroll.allowances')}</TableHead>
                <TableHead className="text-right">{t('payroll.deductions')}</TableHead>
                <TableHead className="text-right">{t('payroll.netSalary')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleSalaryData.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell className="text-right">{currencyFormatter.format(employee.basicSalary)}</TableCell>
                  <TableCell className="text-right">{currencyFormatter.format(employee.allowances)}</TableCell>
                  <TableCell className="text-right">{currencyFormatter.format(employee.deductions)}</TableCell>
                  <TableCell className="text-right font-medium">{currencyFormatter.format(employee.netSalary)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryOverview;
