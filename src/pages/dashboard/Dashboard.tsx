
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import EmployeeList from '@/components/EmployeeList';
import AttendanceTracker from '@/components/AttendanceTracker';
import { Users, UserCheck, UserMinus, LayoutGrid, CheckSquare, Calendar, CalendarClock, Smile } from 'lucide-react';
import { departments, employees } from '@/services/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Calculate some stats
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const onLeaveEmployees = employees.filter(e => e.status === 'onLeave').length;
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {user?.name}
        </p>
      </div>
      
      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Employees"
          value={employees.length}
          icon={<Users className="h-6 w-6 text-primary" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Present Today"
          value={activeEmployees}
          icon={<UserCheck className="h-6 w-6 text-green-600" />}
        />
        <StatCard 
          title="On Leave"
          value={onLeaveEmployees}
          icon={<UserMinus className="h-6 w-6 text-yellow-500" />}
        />
        <StatCard 
          title="Departments"
          value={departments.length}
          icon={<LayoutGrid className="h-6 w-6 text-blue-500" />}
        />
      </div>
      
      {/* Dashboard preview and employee list */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>
              Total Employees: {employees.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeeList />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common daily tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                  <CheckSquare className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">Clock In</span>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                  <Calendar className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">Apply Leave</span>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                  <CalendarClock className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">View Schedule</span>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                  <Smile className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">Submit Feedback</span>
                </CardContent>
              </Card>
            </div>
            
            <AttendanceTracker />
          </CardContent>
        </Card>
      </div>
      
      {/* HR Dashboard preview image */}
      <div className="mt-4">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>HR Analytics Dashboard</CardTitle>
            <CardDescription>Real-time overview of your HR metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <img 
              src="/lovable-uploads/d9ff0fa8-a5e6-4d0e-be04-1894a710bc9c.png" 
              alt="HR Dashboard Preview" 
              className="w-full h-auto object-cover rounded-b-lg"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
