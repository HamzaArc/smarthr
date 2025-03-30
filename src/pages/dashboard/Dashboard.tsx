
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import EmployeeList from '@/components/EmployeeList';
import AttendanceTracker from '@/components/AttendanceTracker';
import { Users, UserCheck, UserMinus, LayoutGrid, CheckSquare, Calendar, CalendarClock, Smile, TrendingUp, UserCog, DollarSign, BarChart3 } from 'lucide-react';
import { departments, employees } from '@/services/mockData';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Analytics data
const departmentSizeData = [
  { name: 'HR', value: 12 },
  { name: 'IT', value: 24 },
  { name: 'Finance', value: 18 },
  { name: 'Marketing', value: 14 },
  { name: 'Sales', value: 22 },
];

const employeeGrowthData = [
  { month: 'Jan', employees: 120 },
  { month: 'Feb', employees: 132 },
  { month: 'Mar', employees: 145 },
  { month: 'Apr', employees: 155 },
  { month: 'May', employees: 165 },
  { month: 'Jun', employees: 180 },
  { month: 'Jul', employees: 190 },
  { month: 'Aug', employees: 205 },
];

const attritionData = [
  { month: 'Jan', rate: 2.3 },
  { month: 'Feb', rate: 2.1 },
  { month: 'Mar', rate: 1.8 },
  { month: 'Apr', rate: 2.2 },
  { month: 'May', rate: 1.9 },
  { month: 'Jun', rate: 1.7 },
  { month: 'Jul', rate: 1.5 },
  { month: 'Aug', rate: 1.6 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

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
      
      {/* HR Analytics Dashboard section - replacing the image with actual analytics */}
      <div className="mt-4">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>HR Analytics Dashboard</CardTitle>
            <CardDescription>Real-time overview of your HR metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Employee Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={employeeGrowthData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="employees" stroke="#8884d8" fillOpacity={1} fill="url(#colorEmployees)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Department Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={departmentSizeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {departmentSizeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value} employees`, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Attrition Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={attritionData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Attrition Rate']} />
                        <Line type="monotone" dataKey="rate" stroke="#ff8042" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard 
                title="Avg. Retention"
                value="4.2 yrs"
                icon={<UserCog className="h-6 w-6 text-indigo-600" />}
              />
              <StatCard 
                title="Avg. Salary"
                value="$68,500"
                icon={<DollarSign className="h-6 w-6 text-emerald-600" />}
              />
              <StatCard 
                title="Productivity"
                value="+24%"
                icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
              />
              <StatCard 
                title="Pending Reviews"
                value="18"
                icon={<BarChart3 className="h-6 w-6 text-amber-600" />}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
