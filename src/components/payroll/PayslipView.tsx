
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Bank, Calendar, Download, FileDown, FilePdf, Mail, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Sample employee data
const employees = [
  { id: 'emp001', name: 'Ahmed Khalid' },
  { id: 'emp005', name: 'Sara Mansouri' },
  { id: 'emp008', name: 'Karim El Ouazzani' },
  { id: 'emp012', name: 'Fatima Zahra' },
  { id: 'emp020', name: 'Youssef Amrani' },
];

// Sample payslip data
const payslipData = {
  emp001: {
    employeeId: 'emp001',
    name: 'Ahmed Khalid',
    position: 'HR Manager',
    department: 'Human Resources',
    month: new Date(2023, 8, 1),
    bankInfo: 'BMCE Bank - 011122223333',
    earnings: [
      { description: 'Basic Salary', amount: 20000 },
      { description: 'Housing Allowance', amount: 3000 },
      { description: 'Transportation Allowance', amount: 1500 },
      { description: 'Performance Bonus', amount: 500 },
    ],
    deductions: [
      { description: 'Income Tax', amount: 1800 },
      { description: 'Social Security', amount: 700 },
    ],
    totalEarnings: 25000,
    totalDeductions: 2500,
    netPay: 22500,
  },
  // Add data for other employees as needed
};

const currencyFormatter = new Intl.NumberFormat('fr-MA', {
  style: 'currency',
  currency: 'MAD',
  minimumFractionDigits: 0,
});

const PayslipView: React.FC = () => {
  const { t } = useLanguage();
  const [selectedEmployee, setSelectedEmployee] = useState<string>('emp001');
  const [selectedMonth, setSelectedMonth] = useState<string>('2023-09');

  const handleDownload = () => {
    toast({
      title: t('payroll.downloadStarted'),
      description: t('payroll.payslipDownloadMessage'),
    });
  };

  const handleEmail = () => {
    toast({
      title: t('payroll.emailSent'),
      description: t('payroll.payslipEmailMessage'),
    });
  };

  const payslip = payslipData[selectedEmployee as keyof typeof payslipData];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>{t('payroll.viewPayslip')}</CardTitle>
          <CardDescription>{t('payroll.selectEmployeeAndMonth')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('common.employee')}</label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger>
                <SelectValue placeholder={t('payroll.selectEmployee')} />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('payroll.payPeriod')}</label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder={t('payroll.selectMonth')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-09">{t('common.months.september')} 2023</SelectItem>
                <SelectItem value="2023-08">{t('common.months.august')} 2023</SelectItem>
                <SelectItem value="2023-07">{t('common.months.july')} 2023</SelectItem>
                <SelectItem value="2023-06">{t('common.months.june')} 2023</SelectItem>
                <SelectItem value="2023-05">{t('common.months.may')} 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button 
            className="w-full" 
            variant="outline"
            onClick={handleDownload}
          >
            <FilePdf className="mr-2 h-4 w-4" />
            {t('payroll.downloadPdf')}
          </Button>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={handleEmail}
          >
            <Mail className="mr-2 h-4 w-4" />
            {t('payroll.emailPayslip')}
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t('payroll.payslip')}</CardTitle>
            <CardDescription>
              {format(payslip.month, 'MMMM yyyy')}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleEmail}>
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">{t('company.name')}</h2>
              <p className="text-sm text-muted-foreground">{t('company.address')}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('common.employee')}:</span>
                </div>
                <p className="text-sm pl-6">{payslip.name}</p>
                <p className="text-sm pl-6">{payslip.position}</p>
                <p className="text-sm pl-6">{payslip.department}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('payroll.payPeriod')}:</span>
                </div>
                <p className="text-sm pl-6">{format(payslip.month, 'MMMM yyyy')}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <Bank className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('payroll.bankInfo')}:</span>
                </div>
                <p className="text-sm pl-6">{payslip.bankInfo}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{t('payroll.earnings')}</h3>
              <div className="space-y-2">
                {payslip.earnings.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">{item.description}</span>
                    <span className="text-sm font-medium">{currencyFormatter.format(item.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>{t('payroll.totalEarnings')}</span>
                  <span>{currencyFormatter.format(payslip.totalEarnings)}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">{t('payroll.deductions')}</h3>
              <div className="space-y-2">
                {payslip.deductions.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">{item.description}</span>
                    <span className="text-sm font-medium">{currencyFormatter.format(item.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>{t('payroll.totalDeductions')}</span>
                  <span>{currencyFormatter.format(payslip.totalDeductions)}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="bg-primary/10 p-3 rounded-lg flex justify-between items-center">
              <span className="font-bold">{t('payroll.netPay')}</span>
              <span className="text-xl font-bold">{currencyFormatter.format(payslip.netPay)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayslipView;
