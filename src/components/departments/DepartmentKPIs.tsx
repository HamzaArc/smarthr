
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp, TrendingDown, Users, Clock } from 'lucide-react';

// Sample KPI data for departments
const departmentPerformanceData = [
  { name: 'HR', efficiency: 85, retention: 92, satisfaction: 88 },
  { name: 'IT', efficiency: 90, retention: 85, satisfaction: 87 },
  { name: 'Marketing', efficiency: 78, retention: 80, satisfaction: 85 },
  { name: 'Finance', efficiency: 88, retention: 94, satisfaction: 82 },
  { name: 'Sales', efficiency: 92, retention: 78, satisfaction: 89 },
  { name: 'Operations', efficiency: 83, retention: 87, satisfaction: 84 },
  { name: 'R&D', efficiency: 87, retention: 89, satisfaction: 90 },
];

// Sample employee satisfaction data
const satisfactionTrendData = [
  { month: 'Jan', HR: 82, IT: 85, Marketing: 78, Finance: 80, Sales: 83 },
  { month: 'Feb', HR: 85, IT: 83, Marketing: 80, Finance: 81, Sales: 84 },
  { month: 'Mar', HR: 86, IT: 86, Marketing: 82, Finance: 83, Sales: 86 },
  { month: 'Apr', HR: 84, IT: 88, Marketing: 83, Finance: 82, Sales: 85 },
  { month: 'May', HR: 87, IT: 89, Marketing: 85, Finance: 84, Sales: 87 },
  { month: 'Jun', HR: 90, IT: 87, Marketing: 84, Finance: 85, Sales: 86 },
  { month: 'Jul', HR: 89, IT: 90, Marketing: 83, Finance: 86, Sales: 88 },
  { month: 'Aug', HR: 90, IT: 92, Marketing: 85, Finance: 87, Sales: 89 },
  { month: 'Sep', HR: 88, IT: 91, Marketing: 87, Finance: 82, Sales: 91 },
];

// Sample attendance rate data
const attendanceRateData = [
  { name: 'HR', value: 96 },
  { name: 'IT', value: 98 },
  { name: 'Marketing', value: 94 },
  { name: 'Finance', value: 97 },
  { name: 'Sales', value: 93 },
  { name: 'Operations', value: 95 },
  { name: 'R&D', value: 97 },
];

// Sample department growth data
const departmentGrowthData = [
  { name: 'HR', current: 5, previous: 4 },
  { name: 'IT', current: 12, previous: 8 },
  { name: 'Marketing', current: 8, previous: 6 },
  { name: 'Finance', current: 6, previous: 5 },
  { name: 'Sales', current: 10, previous: 7 },
  { name: 'Operations', current: 15, previous: 12 },
  { name: 'R&D', current: 7, previous: 4 },
];

// Pie chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

// Chart configuration
const chartConfig = {
  efficiency: {
    label: 'Efficiency',
    color: '#8884d8',
  },
  retention: {
    label: 'Retention',
    color: '#82ca9d',
  },
  satisfaction: {
    label: 'Satisfaction',
    color: '#ffc658',
  },
  HR: {
    label: 'HR',
    color: '#8884d8',
  },
  IT: {
    label: 'IT',
    color: '#82ca9d',
  },
  Marketing: {
    label: 'Marketing',
    color: '#ffc658',
  },
  Finance: {
    label: 'Finance',
    color: '#ff8042',
  },
  Sales: {
    label: 'Sales',
    color: '#0088fe',
  },
};

const DepartmentKPIs: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  // Filter data based on selected department
  const filteredPerformanceData = selectedDepartment === 'all'
    ? departmentPerformanceData
    : departmentPerformanceData.filter(dept => dept.name === selectedDepartment);

  const filteredGrowthData = selectedDepartment === 'all'
    ? departmentGrowthData
    : departmentGrowthData.filter(dept => dept.name === selectedDepartment);

  const filteredAttendanceData = selectedDepartment === 'all'
    ? attendanceRateData
    : attendanceRateData.filter(dept => dept.name === selectedDepartment);

  // Calculate overall department stats
  const calculateOverallStats = () => {
    const stats = {
      totalEmployees: departmentGrowthData.reduce((acc, dept) => acc + dept.current, 0),
      avgEfficiency: Math.round(departmentPerformanceData.reduce((acc, dept) => acc + dept.efficiency, 0) / departmentPerformanceData.length),
      avgSatisfaction: Math.round(departmentPerformanceData.reduce((acc, dept) => acc + dept.satisfaction, 0) / departmentPerformanceData.length),
      avgAttendance: Math.round(attendanceRateData.reduce((acc, dept) => acc + dept.value, 0) / attendanceRateData.length),
    };
    return stats;
  };

  const overallStats = calculateOverallStats();

  // Calculate department-specific stats
  const getDepartmentStats = (deptName: string) => {
    const dept = {
      efficiency: departmentPerformanceData.find(d => d.name === deptName)?.efficiency || 0,
      satisfaction: departmentPerformanceData.find(d => d.name === deptName)?.satisfaction || 0,
      attendance: attendanceRateData.find(d => d.name === deptName)?.value || 0,
      employees: departmentGrowthData.find(d => d.name === deptName)?.current || 0,
      growth: departmentGrowthData.find(d => d.name === deptName)?.current - (departmentGrowthData.find(d => d.name === deptName)?.previous || 0),
    };
    
    return dept;
  };

  const selectedStats = selectedDepartment !== 'all' ? getDepartmentStats(selectedDepartment) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Performance Metrics</h2>
          <p className="text-muted-foreground">Analyze department performance and metrics</p>
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departmentPerformanceData.map((dept) => (
              <SelectItem key={dept.name} value={dept.name}>{dept.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employees</p>
                <h3 className="text-2xl font-bold mt-1">
                  {selectedDepartment !== 'all' ? selectedStats?.employees : overallStats.totalEmployees}
                </h3>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            {selectedDepartment !== 'all' && selectedStats && (
              <div className="flex items-center mt-3 text-sm">
                {selectedStats.growth > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+{selectedStats.growth}</span>
                  </>
                ) : selectedStats.growth < 0 ? (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-500">{selectedStats.growth}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">No change</span>
                )}
                <span className="text-muted-foreground ml-1">this year</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                <h3 className="text-2xl font-bold mt-1">
                  {selectedDepartment !== 'all' ? selectedStats?.efficiency : overallStats.avgEfficiency}%
                </h3>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${selectedDepartment !== 'all' ? selectedStats?.efficiency : overallStats.avgEfficiency}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                <h3 className="text-2xl font-bold mt-1">
                  {selectedDepartment !== 'all' ? selectedStats?.satisfaction : overallStats.avgSatisfaction}%
                </h3>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${selectedDepartment !== 'all' ? selectedStats?.satisfaction : overallStats.avgSatisfaction}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                <h3 className="text-2xl font-bold mt-1">
                  {selectedDepartment !== 'all' ? selectedStats?.attendance : overallStats.avgAttendance}%
                </h3>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${selectedDepartment !== 'all' ? selectedStats?.attendance : overallStats.avgAttendance}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Efficiency, retention and satisfaction metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bar">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="bar" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Bar Chart</span>
                </TabsTrigger>
                <TabsTrigger value="line" className="flex items-center gap-2">
                  <LineChartIcon className="h-4 w-4" />
                  <span>Line Chart</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bar">
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredPerformanceData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="efficiency" name="Efficiency" fill={chartConfig.efficiency.color} />
                      <Bar dataKey="retention" name="Retention" fill={chartConfig.retention.color} />
                      <Bar dataKey="satisfaction" name="Satisfaction" fill={chartConfig.satisfaction.color} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
              
              <TabsContent value="line">
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={filteredPerformanceData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="efficiency" name="Efficiency" stroke={chartConfig.efficiency.color} />
                      <Line type="monotone" dataKey="retention" name="Retention" stroke={chartConfig.retention.color} />
                      <Line type="monotone" dataKey="satisfaction" name="Satisfaction" stroke={chartConfig.satisfaction.color} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Satisfaction Trend</CardTitle>
            <CardDescription>Employee satisfaction over time by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={satisfactionTrendData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Legend />
                  {selectedDepartment === 'all' ? (
                    <>
                      <Line type="monotone" dataKey="HR" name="HR" stroke={chartConfig.HR.color} />
                      <Line type="monotone" dataKey="IT" name="IT" stroke={chartConfig.IT.color} />
                      <Line type="monotone" dataKey="Marketing" name="Marketing" stroke={chartConfig.Marketing.color} />
                      <Line type="monotone" dataKey="Finance" name="Finance" stroke={chartConfig.Finance.color} />
                      <Line type="monotone" dataKey="Sales" name="Sales" stroke={chartConfig.Sales.color} />
                    </>
                  ) : (
                    <Line type="monotone" dataKey={selectedDepartment} name={selectedDepartment} stroke="#8884d8" />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Growth</CardTitle>
            <CardDescription>Employee count comparison year over year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredGrowthData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="previous" name="Previous Year" fill="#8884d8" />
                  <Bar dataKey="current" name="Current Year" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate</CardTitle>
            <CardDescription>Percentage of attendance by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filteredAttendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, value}) => `${name}: ${value}%`}
                  >
                    {filteredAttendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentKPIs;
