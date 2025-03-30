
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Users, BarChart3, Network } from 'lucide-react';
import DepartmentList from '@/components/departments/DepartmentList';
import DepartmentKPIs from '@/components/departments/DepartmentKPIs';
import OrganizationalChart from '@/components/departments/OrganizationalChart';

const Departments: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('departments.title')}</h1>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            <span>{t('departments.list')}</span>
          </TabsTrigger>
          <TabsTrigger value="kpis" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>{t('departments.kpis')}</span>
          </TabsTrigger>
          <TabsTrigger value="org-chart" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span>{t('departments.orgChart')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="pt-4">
          <DepartmentList />
        </TabsContent>
        
        <TabsContent value="kpis" className="pt-4">
          <DepartmentKPIs />
        </TabsContent>
        
        <TabsContent value="org-chart" className="pt-4">
          <OrganizationalChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Departments;
