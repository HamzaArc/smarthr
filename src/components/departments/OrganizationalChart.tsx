
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Network, List, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

// Organization chart data structure
const organizationData = {
  id: 'ceo',
  name: 'Hassan El Moussaoui',
  title: 'CEO',
  children: [
    {
      id: 'cfo',
      name: 'Fatima Zahra',
      title: 'CFO',
      department: 'Finance',
      children: [
        { 
          id: 'finance-manager', 
          name: 'Youssef El Arabi', 
          title: 'Finance Manager',
          department: 'Finance',
          children: [
            { id: 'accountant1', name: 'Nadia Benkiran', title: 'Senior Accountant', department: 'Finance' },
            { id: 'accountant2', name: 'Omar Benjelloun', title: 'Accountant', department: 'Finance' },
            { id: 'accountant3', name: 'Salma Raiss', title: 'Accountant', department: 'Finance' },
          ]
        },
      ]
    },
    {
      id: 'cto',
      name: 'Sara Mansouri',
      title: 'CTO',
      department: 'IT',
      children: [
        { 
          id: 'dev-lead', 
          name: 'Rachid Bennani', 
          title: 'Development Lead',
          department: 'IT',
          children: [
            { id: 'dev1', name: 'Amal Hassan', title: 'Senior Developer', department: 'IT' },
            { id: 'dev2', name: 'Karim Tazi', title: 'Developer', department: 'IT' },
            { id: 'dev3', name: 'Younes El Malki', title: 'Developer', department: 'IT' },
            { id: 'dev4', name: 'Soukaina Laroussi', title: 'Developer', department: 'IT' },
          ]
        },
        { 
          id: 'infra-lead', 
          name: 'Mohammed El Fassi', 
          title: 'Infrastructure Lead',
          department: 'IT',
          children: [
            { id: 'infra1', name: 'Hamza El Khouli', title: 'System Administrator', department: 'IT' },
            { id: 'infra2', name: 'Laila Sbai', title: 'Network Engineer', department: 'IT' },
          ]
        },
      ]
    },
    {
      id: 'hr-director',
      name: 'Ahmed Khalid',
      title: 'HR Director',
      department: 'Human Resources',
      children: [
        { 
          id: 'hr-manager', 
          name: 'Samira Amrani', 
          title: 'HR Manager',
          department: 'Human Resources',
          children: [
            { id: 'hr1', name: 'Jamal Daoudi', title: 'HR Specialist', department: 'Human Resources' },
            { id: 'hr2', name: 'Hanane Ziani', title: 'Recruitment Specialist', department: 'Human Resources' },
          ]
        },
      ]
    },
    {
      id: 'marketing-director',
      name: 'Karim El Ouazzani',
      title: 'Marketing Director',
      department: 'Marketing',
      children: [
        { 
          id: 'marketing-manager', 
          name: 'Latifa El Otmani', 
          title: 'Marketing Manager',
          department: 'Marketing',
          children: [
            { id: 'marketing1', name: 'Tarik El Amrani', title: 'Digital Marketing Specialist', department: 'Marketing' },
            { id: 'marketing2', name: 'Zineb Chaoui', title: 'Content Specialist', department: 'Marketing' },
            { id: 'marketing3', name: 'Mehdi Benatia', title: 'Graphic Designer', department: 'Marketing' },
          ]
        },
        { 
          id: 'sales-manager', 
          name: 'Youssef Amrani', 
          title: 'Sales Manager',
          department: 'Sales',
          children: [
            { id: 'sales1', name: 'Imane Baadi', title: 'Sales Representative', department: 'Sales' },
            { id: 'sales2', name: 'Adil El Fassi', title: 'Account Manager', department: 'Sales' },
            { id: 'sales3', name: 'Houda Alaoui', title: 'Sales Representative', department: 'Sales' },
          ]
        },
      ]
    },
    {
      id: 'operations-director',
      name: 'Leila Bennani',
      title: 'Operations Director',
      department: 'Operations',
      children: [
        { 
          id: 'operations-manager', 
          name: 'Driss El Alami', 
          title: 'Operations Manager',
          department: 'Operations',
          children: [
            { id: 'ops1', name: 'Yasmine Tazi', title: 'Project Coordinator', department: 'Operations' },
            { id: 'ops2', name: 'Mustapha Idrissi', title: 'Quality Assurance', department: 'Operations' },
          ]
        },
        { 
          id: 'logistics-manager', 
          name: 'Chakib El Mdaghri', 
          title: 'Logistics Manager',
          department: 'Operations',
          children: [
            { id: 'logistics1', name: 'Samir Cherkaoui', title: 'Logistics Coordinator', department: 'Operations' },
            { id: 'logistics2', name: 'Nawal El Harti', title: 'Supply Chain Specialist', department: 'Operations' },
          ]
        },
      ]
    },
  ]
};

// Component to render a tree node
const TreeNode = ({ node, level = 0 }: { node: any, level?: number }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = React.useState(level < 2);

  const hasChildren = node.children && node.children.length > 0;
  
  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const departmentColors: Record<string, string> = {
    'Finance': 'bg-blue-50 border-blue-200 text-blue-700',
    'IT': 'bg-green-50 border-green-200 text-green-700',
    'Human Resources': 'bg-purple-50 border-purple-200 text-purple-700',
    'Marketing': 'bg-orange-50 border-orange-200 text-orange-700',
    'Sales': 'bg-yellow-50 border-yellow-200 text-yellow-700',
    'Operations': 'bg-red-50 border-red-200 text-red-700',
  };

  const deptBadgeClass = node.department ? departmentColors[node.department] || '' : '';

  return (
    <div className="mb-2">
      <div 
        className={cn(
          "border rounded-lg p-3 cursor-pointer hover:bg-muted transition-colors",
          expanded && hasChildren ? "border-primary" : "border-border"
        )}
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{node.name}</div>
            <div className="text-sm text-muted-foreground">{node.title}</div>
          </div>
          {node.department && (
            <span className={cn("text-xs px-2 py-1 rounded-full border", deptBadgeClass)}>
              {node.department}
            </span>
          )}
        </div>
      </div>
      
      {expanded && hasChildren && (
        <div className="ml-8 mt-2 border-l pl-4">
          {node.children.map((child: any) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// Component to render org chart as boxes
const OrgChartNode = ({ node, isRoot = false }: { node: any, isRoot?: boolean }) => {
  const [expanded, setExpanded] = React.useState(isRoot);
  const hasChildren = node.children && node.children.length > 0;
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const departmentColors: Record<string, string> = {
    'Finance': 'border-blue-300 bg-blue-50',
    'IT': 'border-green-300 bg-green-50',
    'Human Resources': 'border-purple-300 bg-purple-50',
    'Marketing': 'border-orange-300 bg-orange-50',
    'Sales': 'border-yellow-300 bg-yellow-50',
    'Operations': 'border-red-300 bg-red-50',
  };

  const nodeClass = node.department && departmentColors[node.department] 
    ? departmentColors[node.department] 
    : 'border-gray-300 bg-gray-50';

  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "w-48 border-2 rounded-lg p-3 cursor-pointer text-center mb-4",
          nodeClass,
          isRoot && "border-primary bg-primary/10"
        )}
        onClick={toggleExpanded}
      >
        <div className="font-semibold">{node.name}</div>
        <div className="text-sm">{node.title}</div>
        {node.department && !isRoot && (
          <div className="text-xs mt-1 text-muted-foreground">{node.department}</div>
        )}
      </div>
      
      {expanded && hasChildren && (
        <div className="relative">
          <div className="w-px h-4 bg-gray-300 absolute top-0 left-1/2 -translate-x-1/2"></div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {node.children.map((child: any, index: number) => (
              <OrgChartNode key={child.id} node={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Department List View
const DepartmentListView = () => {
  const { t } = useLanguage();
  const departmentMap = new Map();
  
  // Process the org data to group by department
  const processDepartments = (node: any) => {
    if (node.department) {
      if (!departmentMap.has(node.department)) {
        departmentMap.set(node.department, []);
      }
      departmentMap.get(node.department).push(node);
    }
    
    if (node.children) {
      node.children.forEach((child: any) => processDepartments(child));
    }
  };
  
  processDepartments(organizationData);
  
  // Convert map to array for rendering
  const departments = Array.from(departmentMap.entries());
  
  return (
    <div className="space-y-6">
      {departments.map(([department, employees]) => (
        <Card key={department}>
          <CardHeader className="pb-2">
            <CardTitle>{department}</CardTitle>
            <CardDescription>
              {employees.length} {t('common.employees')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee: any) => (
                <div key={employee.id} className="border rounded-lg p-3">
                  <div className="font-semibold">{employee.name}</div>
                  <div className="text-sm text-muted-foreground">{employee.title}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const OrganizationalChart: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tree">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tree" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span>{t('departments.hierarchyView')}</span>
          </TabsTrigger>
          <TabsTrigger value="chart" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{t('departments.orgChartView')}</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span>{t('departments.departmentView')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tree" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('departments.companyHierarchy')}</CardTitle>
              <CardDescription>{t('departments.hierarchyDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 max-h-[600px] overflow-y-auto">
                <TreeNode node={organizationData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chart" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('departments.orgChart')}</CardTitle>
              <CardDescription>{t('departments.orgChartDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 overflow-x-auto">
                <div className="min-w-[800px] flex justify-center">
                  <OrgChartNode node={organizationData} isRoot={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list" className="pt-4">
          <DepartmentListView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationalChart;
