
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { AlertCircle, Calendar as CalendarIcon, CheckCircle2, Clock, Download, Play, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const PayrollProcessing: React.FC = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date>(new Date());
  const [progressValue, setProgressValue] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [includeAllowances, setIncludeAllowances] = useState(true);
  const [includeDeductions, setIncludeDeductions] = useState(true);

  const handleProcess = () => {
    setIsProcessing(true);
    setProgressValue(0);
    
    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast({
            title: t('payroll.processingComplete'),
            description: t('payroll.processingSuccessMessage'),
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{t('payroll.processPayroll')}</CardTitle>
          <CardDescription>{t('payroll.processPayrollDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t('payroll.payrollPeriod')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'MMMM yyyy') : <span>{t('payroll.selectMonth')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  disabled={(date) => date > new Date()}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-4">
            <Label>{t('payroll.paymentMethod')}</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank">{t('payroll.bankTransfer')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">{t('payroll.cashPayment')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="check" id="check" />
                <Label htmlFor="check">{t('payroll.checkPayment')}</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <Label>{t('payroll.payrollComponents')}</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="basicSalary" 
                  checked={true} 
                  disabled
                />
                <Label htmlFor="basicSalary">{t('payroll.basicSalary')} ({t('common.required')})</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="allowances" 
                  checked={includeAllowances} 
                  onCheckedChange={(checked) => setIncludeAllowances(!!checked)}
                />
                <Label htmlFor="allowances">{t('payroll.allowances')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="deductions" 
                  checked={includeDeductions} 
                  onCheckedChange={(checked) => setIncludeDeductions(!!checked)}
                />
                <Label htmlFor="deductions">{t('payroll.deductions')}</Label>
              </div>
            </div>
          </div>
          
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>{t('payroll.processingProgress')}</Label>
                <span className="text-sm">{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">{t('common.reset')}</Button>
          <Button 
            onClick={handleProcess} 
            disabled={isProcessing}
            className={isProcessing ? 'cursor-not-allowed' : ''}
          >
            {isProcessing ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                {t('payroll.processing')}
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {t('payroll.runPayroll')}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('payroll.payrollStatus')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('payroll.currentMonth')}</span>
                <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                  {t('payroll.pending')}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('payroll.lastProcessed')}</span>
                <span className="text-sm">{format(new Date(2023, 8, 25), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('payroll.employeesToProcess')}</span>
                <span className="text-sm">15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('payroll.totalAmount')}</span>
                <span className="text-sm font-bold">230,000 MAD</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('payroll.recentPayrolls')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{format(new Date(2023, 8, 1), 'MMMM yyyy')}</p>
                  <p className="text-sm text-muted-foreground">15 {t('common.employees')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <Download className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{format(new Date(2023, 7, 1), 'MMMM yyyy')}</p>
                  <p className="text-sm text-muted-foreground">14 {t('common.employees')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <Download className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{format(new Date(2023, 6, 1), 'MMMM yyyy')}</p>
                  <p className="text-sm text-muted-foreground">14 {t('common.employees')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" aria-label="Incomplete" />
                  <Download className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayrollProcessing;
