
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { employees } from '@/services/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, MoreHorizontal, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const EmployeeList: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">{t('employees.active')}</Badge>;
      case 'inactive':
        return <Badge variant="outline">{t('employees.inactive')}</Badge>;
      case 'onLeave':
        return <Badge className="bg-yellow-500">{t('employees.onLeave')}</Badge>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`${t('common.search')} ${t('common.employees').toLowerCase()}`}
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          <span>{t('employees.addNew')}</span>
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('employees.name')}</TableHead>
              <TableHead>{t('employees.email')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('employees.department')}</TableHead>
              <TableHead className="hidden lg:table-cell">{t('employees.position')}</TableHead>
              <TableHead className="hidden sm:table-cell">{t('employees.status')}</TableHead>
              <TableHead className="w-10">{t('common.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={employee.imageUrl} alt={employee.name} />
                        <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{employee.department}</TableCell>
                  <TableCell className="hidden lg:table-cell">{employee.position}</TableCell>
                  <TableCell className="hidden sm:table-cell">{getStatusBadge(employee.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>{t('common.view')}</DropdownMenuItem>
                        <DropdownMenuItem>{t('common.edit')}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          {t('common.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeList;
