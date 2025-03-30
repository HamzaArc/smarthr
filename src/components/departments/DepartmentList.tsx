
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Edit, Trash2, Users, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { Department } from '@/types';

// Sample departments data
const departmentsData: Department[] = [
  {
    id: 'dept-hr',
    name: 'Human Resources',
    employeeCount: 5,
    manager: 'Ahmed Khalid',
  },
  {
    id: 'dept-it',
    name: 'Information Technology',
    employeeCount: 12,
    manager: 'Sara Mansouri',
  },
  {
    id: 'dept-marketing',
    name: 'Marketing',
    employeeCount: 8,
    manager: 'Karim El Ouazzani',
  },
  {
    id: 'dept-finance',
    name: 'Finance',
    employeeCount: 6,
    manager: 'Fatima Zahra',
  },
  {
    id: 'dept-sales',
    name: 'Sales',
    employeeCount: 10,
    manager: 'Youssef Amrani',
  },
  {
    id: 'dept-operations',
    name: 'Operations',
    employeeCount: 15,
    manager: 'Leila Bennani',
  },
  {
    id: 'dept-rd',
    name: 'Research & Development',
    employeeCount: 7,
    manager: 'Mohammed El Fassi',
  },
];

const DepartmentList: React.FC = () => {
  const { t } = useLanguage();
  const [departments, setDepartments] = useState<Department[]>(departmentsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    manager: '',
    description: '',
  });

  const filteredDepartments = departments.filter(
    (dept) => 
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dept.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.manager) {
      toast({
        title: t('departments.validationError'),
        description: t('departments.fillRequiredFields'),
        variant: 'destructive',
      });
      return;
    }

    const newDept: Department = {
      id: `dept-${newDepartment.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: newDepartment.name,
      manager: newDepartment.manager,
      employeeCount: 0,
    };

    setDepartments([...departments, newDept]);
    setNewDepartment({ name: '', manager: '', description: '' });
    setIsAddDialogOpen(false);

    toast({
      title: t('departments.departmentAdded'),
      description: t('departments.departmentAddedDescription'),
    });
  };

  const handleEditDepartment = () => {
    if (!editingDepartment) return;

    setDepartments(
      departments.map((dept) => 
        dept.id === editingDepartment.id ? editingDepartment : dept
      )
    );
    setIsEditDialogOpen(false);

    toast({
      title: t('departments.departmentUpdated'),
      description: t('departments.departmentUpdatedDescription'),
    });
  };

  const handleDeleteDepartment = () => {
    if (!editingDepartment) return;

    setDepartments(
      departments.filter((dept) => dept.id !== editingDepartment.id)
    );
    setIsDeleteDialogOpen(false);

    toast({
      title: t('departments.departmentDeleted'),
      description: t('departments.departmentDeletedDescription'),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <div>
            <CardTitle>{t('departments.manageDepartments')}</CardTitle>
            <CardDescription>{t('departments.departmentsDescription')}</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('departments.addDepartment')}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('common.search')}
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('departments.department')}</TableHead>
                <TableHead>{t('departments.manager')}</TableHead>
                <TableHead className="text-center">{t('departments.employees')}</TableHead>
                <TableHead className="text-right">{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">{department.name}</TableCell>
                    <TableCell>{department.manager}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="flex items-center justify-center gap-1">
                        <Users className="h-3 w-3" />
                        {department.employeeCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingDepartment(department);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingDepartment(department);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    {searchQuery
                      ? t('departments.noMatchingDepartments')
                      : t('departments.noDepartments')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Department Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('departments.addDepartment')}</DialogTitle>
            <DialogDescription>
              {t('departments.addDepartmentDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('departments.name')}</Label>
              <Input
                id="name"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                placeholder={t('departments.namePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manager">{t('departments.manager')}</Label>
              <Input
                id="manager"
                value={newDepartment.manager}
                onChange={(e) => setNewDepartment({ ...newDepartment, manager: e.target.value })}
                placeholder={t('departments.managerPlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('common.description')}</Label>
              <Textarea
                id="description"
                value={newDepartment.description}
                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                placeholder={t('departments.descriptionPlaceholder')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleAddDepartment}>
              {t('common.add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Department Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('departments.editDepartment')}</DialogTitle>
            <DialogDescription>
              {t('departments.editDepartmentDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">{t('departments.name')}</Label>
              <Input
                id="edit-name"
                value={editingDepartment?.name || ''}
                onChange={(e) => setEditingDepartment(editingDepartment ? { ...editingDepartment, name: e.target.value } : null)}
                placeholder={t('departments.namePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-manager">{t('departments.manager')}</Label>
              <Input
                id="edit-manager"
                value={editingDepartment?.manager || ''}
                onChange={(e) => setEditingDepartment(editingDepartment ? { ...editingDepartment, manager: e.target.value } : null)}
                placeholder={t('departments.managerPlaceholder')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleEditDepartment}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Department Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('departments.deleteDepartment')}</DialogTitle>
            <DialogDescription>
              {t('departments.deleteDepartmentDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              {t('departments.deleteConfirmation')} <strong>{editingDepartment?.name}</strong>?
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t('departments.deleteWarning')}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDeleteDepartment}>
              {t('common.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentList;
