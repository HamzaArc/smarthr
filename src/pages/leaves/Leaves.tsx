
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, ListChecks, Clock, FileText } from 'lucide-react';
import LeavesApproval from '@/components/leaves/LeavesApproval';
import LeavesCalendar from '@/components/leaves/LeavesCalendar';
import LeavesRequest from '@/components/leaves/LeavesRequest';
import LeavesHistory from '@/components/leaves/LeavesHistory';

const Leaves: React.FC = () => {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
      </div>

      <Tabs defaultValue="request" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="request" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Request Leave</span>
          </TabsTrigger>
          <TabsTrigger value="approval" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            <span>Approvals</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>Calendar View</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Leave History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="request" className="pt-4">
          <LeavesRequest />
        </TabsContent>
        
        <TabsContent value="approval" className="pt-4">
          <LeavesApproval />
        </TabsContent>
        
        <TabsContent value="calendar" className="pt-4">
          <LeavesCalendar />
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <LeavesHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaves;
