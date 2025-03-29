
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import EmployeeList from '@/components/EmployeeList';

const Employees: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('common.employees')}</h1>
        <p className="text-muted-foreground">
          {t('employees.list')}
        </p>
      </div>
      
      <EmployeeList />
    </div>
  );
};

export default Employees;
