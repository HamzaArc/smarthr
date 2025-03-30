
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ban, FileText, BarChart3, CreditCard } from 'lucide-react';
import SalaryOverview from '@/components/payroll/SalaryOverview';
import PayrollProcessing from '@/components/payroll/PayrollProcessing'; 
import PayrollReports from '@/components/payroll/PayrollReports';
import PayslipView from '@/components/payroll/PayslipView';

const Payroll: React.FC = () => {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
      </div>

      <Tabs defaultValue="salaries" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="salaries" className="flex items-center gap-2">
            <Ban className="h-4 w-4" />
            <span>Salary Overview</span>
          </TabsTrigger>
          <TabsTrigger value="processing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Payroll Processing</span>
          </TabsTrigger>
          <TabsTrigger value="payslips" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Payslips</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Reports</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="salaries" className="pt-4">
          <SalaryOverview />
        </TabsContent>
        
        <TabsContent value="processing" className="pt-4">
          <PayrollProcessing />
        </TabsContent>
        
        <TabsContent value="payslips" className="pt-4">
          <PayslipView />
        </TabsContent>
        
        <TabsContent value="reports" className="pt-4">
          <PayrollReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payroll;
