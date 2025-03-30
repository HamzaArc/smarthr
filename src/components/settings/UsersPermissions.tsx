
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, UserPlus, Edit, Trash2, Shield, Users, Lock, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { User } from '@/types';

// Sample users data
const usersData: User[] = [
  {
    id: 'user1',
    name: 'Ahmed Khalid',
    email: 'ahmed.k@example.com',
    role: 'admin',
    language: 'en',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'user2',
    name: 'Sara Mansouri',
    email: 'sara.m@example.com',
    role: 'manager',
    language: 'fr',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'user3',
    name: 'Karim El Ouazzani',
    email: 'karim.o@example.com',
    role: 'employee',
    language: 'ar',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'user4',
    name: 'Fatima Zahra',
    email: 'fatima.z@example.com',
    role: 'manager',
    language: 'fr',
    imageUrl: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 'user5',
    name: 'Youssef Amrani',
    email: 'youssef.a@example.com',
    role: 'employee',
    language: 'en',
    imageUrl: 'https://i.pravatar.cc/150?img=7',
  },
];

// Sample roles data
const rolesData = [
  {
    id: 'admin',
    name: 'Administrator',
    count: 1,
    permissions: {
      users: ['view', 'create', 'edit', 'delete'],
      employees: ['view', 'create', 'edit', 'delete'],
      departments: ['view', 'create', 'edit', 'delete'],
      attendance: ['view', 'create', 'edit', 'delete'],
      leaves: ['view', 'create', 'edit', 'delete', 'approve'],
      payroll: ['view', 'create', 'edit', 'delete'],
      settings: ['view', 'edit'],
    },
  },
  {
    id: 'manager',
    name: 'Manager',
    count: 2,
    permissions: {
      users: ['view'],
      employees: ['view', 'edit'],
      departments: ['view'],
      attendance: ['view', 'create', 'edit'],
      leaves: ['view', 'approve'],
      payroll: ['view'],
      settings: ['view'],
    },
  },
  {
    id: 'employee',
    name: 'Employee',
    count: 2,
    permissions: {
      users: [],
      employees: ['view'],
      departments: ['view'],
      attendance: ['view'],
      leaves: ['view', 'create'],
      payroll: ['view'],
      settings: [],
    },
  },
];

const UsersPermissions: React.FC = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>(usersData);
  const [roles, setRoles] = useState(rolesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'employee',
    password: '',
    confirmPassword: '',
  });

  const filteredUsers = users.filter(
    (user) => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    // Validation
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.password) {
      toast({
        title: t('settings.validationError'),
        description: t('settings.fillRequiredFields'),
        variant: 'destructive',
      });
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: t('settings.passwordMismatch'),
        description: t('settings.passwordMismatchDescription'),
        variant: 'destructive',
      });
      return;
    }

    const newUserObj: User = {
      id: `user${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as 'admin' | 'manager' | 'employee',
      language: 'en',
    };

    setUsers([...users, newUserObj]);
    setIsAddUserDialogOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'employee',
      password: '',
      confirmPassword: '',
    });

    toast({
      title: t('settings.userAdded'),
      description: t('settings.userAddedDescription'),
    });
  };

  const handleEditUser = () => {
    if (!editingUser) return;

    setUsers(
      users.map((user) => 
        user.id === editingUser.id ? editingUser : user
      )
    );
    setIsEditDialogOpen(false);

    toast({
      title: t('settings.userUpdated'),
      description: t('settings.userUpdatedDescription'),
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));

    toast({
      title: t('settings.userDeleted'),
      description: t('settings.userDeletedDescription'),
    });
  };

  const handleEditRole = () => {
    if (!editingRole) return;

    setRoles(
      roles.map((role) => 
        role.id === editingRole.id ? editingRole : role
      )
    );
    setIsEditRoleDialogOpen(false);

    toast({
      title: t('settings.roleUpdated'),
      description: t('settings.roleUpdatedDescription'),
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-500">{t('settings.roles.admin')}</Badge>;
      case 'manager':
        return <Badge className="bg-blue-500">{t('settings.roles.manager')}</Badge>;
      case 'employee':
        return <Badge className="bg-green-500">{t('settings.roles.employee')}</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  return (
    <Tabs defaultValue="users">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{t('settings.users')}</span>
        </TabsTrigger>
        <TabsTrigger value="roles" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>{t('settings.roles')}</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="users" className="pt-4">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
            <div>
              <CardTitle>{t('settings.manageUsers')}</CardTitle>
              <CardDescription>{t('settings.manageUsersDescription')}</CardDescription>
            </div>
            <Button onClick={() => setIsAddUserDialogOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              {t('settings.addUser')}
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
                  <TableHead>{t('common.user')}</TableHead>
                  <TableHead>{t('common.email')}</TableHead>
                  <TableHead>{t('common.role')}</TableHead>
                  <TableHead>{t('common.language')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.imageUrl} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {user.language === 'en' && 'English'}
                          {user.language === 'fr' && 'Français'}
                          {user.language === 'ar' && 'العربية'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingUser(user);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      {searchQuery
                        ? t('settings.noMatchingUsers')
                        : t('settings.noUsers')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="roles" className="pt-4">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
            <div>
              <CardTitle>{t('settings.manageRoles')}</CardTitle>
              <CardDescription>{t('settings.manageRolesDescription')}</CardDescription>
            </div>
            <Button onClick={() => setIsAddRoleDialogOpen(true)}>
              <Shield className="mr-2 h-4 w-4" />
              {t('settings.addRole')}
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('common.role')}</TableHead>
                  <TableHead>{t('settings.userCount')}</TableHead>
                  <TableHead>{t('settings.permissions')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">
                      {role.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {role.count} {role.count === 1 ? t('common.user') : t('common.users')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(role.permissions).map(([module, perms]) => 
                          perms.length > 0 ? (
                            <Badge 
                              key={module} 
                              variant="outline" 
                              className="bg-muted"
                            >
                              {t(`settings.modules.${module}`)}
                            </Badge>
                          ) : null
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingRole(role);
                          setIsEditRoleDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('settings.addUser')}</DialogTitle>
            <DialogDescription>
              {t('settings.addUserDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('common.name')}</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder={t('settings.namePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('common.email')}</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder={t('settings.emailPlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">{t('common.role')}</Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({ ...newUser, role: value })}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder={t('settings.selectRole')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">{t('settings.roles.admin')}</SelectItem>
                  <SelectItem value="manager">{t('settings.roles.manager')}</SelectItem>
                  <SelectItem value="employee">{t('settings.roles.employee')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('common.password')}</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder={t('settings.passwordPlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t('settings.confirmPassword')}</Label>
              <Input
                id="confirm-password"
                type="password"
                value={newUser.confirmPassword}
                onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                placeholder={t('settings.confirmPasswordPlaceholder')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleAddUser}>
              {t('common.add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('settings.editUser')}</DialogTitle>
            <DialogDescription>
              {t('settings.editUserDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">{t('common.name')}</Label>
              <Input
                id="edit-name"
                value={editingUser?.name || ''}
                onChange={(e) => setEditingUser(editingUser ? { ...editingUser, name: e.target.value } : null)}
                placeholder={t('settings.namePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">{t('common.email')}</Label>
              <Input
                id="edit-email"
                type="email"
                value={editingUser?.email || ''}
                onChange={(e) => setEditingUser(editingUser ? { ...editingUser, email: e.target.value } : null)}
                placeholder={t('settings.emailPlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">{t('common.role')}</Label>
              <Select
                value={editingUser?.role}
                onValueChange={(value) => setEditingUser(editingUser ? { ...editingUser, role: value as 'admin' | 'manager' | 'employee' } : null)}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder={t('settings.selectRole')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">{t('settings.roles.admin')}</SelectItem>
                  <SelectItem value="manager">{t('settings.roles.manager')}</SelectItem>
                  <SelectItem value="employee">{t('settings.roles.employee')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-language">{t('common.language')}</Label>
              <Select
                value={editingUser?.language}
                onValueChange={(value) => setEditingUser(editingUser ? { ...editingUser, language: value as 'en' | 'fr' | 'ar' } : null)}
              >
                <SelectTrigger id="edit-language">
                  <SelectValue placeholder={t('settings.selectLanguage')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleEditUser}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('settings.editRole')}</DialogTitle>
            <DialogDescription>
              {t('settings.editRoleDescription')}
            </DialogDescription>
          </DialogHeader>
          {editingRole && (
            <div className="py-4">
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">{t('common.name')}</Label>
                  <Input
                    id="role-name"
                    value={editingRole.name}
                    onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  {t('settings.permissionsMatrix')}
                </h3>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('settings.module')}</TableHead>
                      <TableHead>{t('settings.permissions.view')}</TableHead>
                      <TableHead>{t('settings.permissions.create')}</TableHead>
                      <TableHead>{t('settings.permissions.edit')}</TableHead>
                      <TableHead>{t('settings.permissions.delete')}</TableHead>
                      <TableHead>{t('settings.permissions.approve')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(editingRole.permissions).map(([module, permissions]) => (
                      <TableRow key={module}>
                        <TableCell className="font-medium">
                          {t(`settings.modules.${module}`)}
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={(permissions as string[]).includes('view')}
                            onCheckedChange={(checked) => {
                              const newPermissions = [...permissions as string[]];
                              if (checked) {
                                if (!newPermissions.includes('view')) {
                                  newPermissions.push('view');
                                }
                              } else {
                                const index = newPermissions.indexOf('view');
                                if (index !== -1) {
                                  newPermissions.splice(index, 1);
                                }
                              }
                              setEditingRole({
                                ...editingRole,
                                permissions: {
                                  ...editingRole.permissions,
                                  [module]: newPermissions
                                }
                              });
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={(permissions as string[]).includes('create')}
                            onCheckedChange={(checked) => {
                              const newPermissions = [...permissions as string[]];
                              if (checked) {
                                if (!newPermissions.includes('create')) {
                                  newPermissions.push('create');
                                }
                              } else {
                                const index = newPermissions.indexOf('create');
                                if (index !== -1) {
                                  newPermissions.splice(index, 1);
                                }
                              }
                              setEditingRole({
                                ...editingRole,
                                permissions: {
                                  ...editingRole.permissions,
                                  [module]: newPermissions
                                }
                              });
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={(permissions as string[]).includes('edit')}
                            onCheckedChange={(checked) => {
                              const newPermissions = [...permissions as string[]];
                              if (checked) {
                                if (!newPermissions.includes('edit')) {
                                  newPermissions.push('edit');
                                }
                              } else {
                                const index = newPermissions.indexOf('edit');
                                if (index !== -1) {
                                  newPermissions.splice(index, 1);
                                }
                              }
                              setEditingRole({
                                ...editingRole,
                                permissions: {
                                  ...editingRole.permissions,
                                  [module]: newPermissions
                                }
                              });
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox 
                            checked={(permissions as string[]).includes('delete')}
                            onCheckedChange={(checked) => {
                              const newPermissions = [...permissions as string[]];
                              if (checked) {
                                if (!newPermissions.includes('delete')) {
                                  newPermissions.push('delete');
                                }
                              } else {
                                const index = newPermissions.indexOf('delete');
                                if (index !== -1) {
                                  newPermissions.splice(index, 1);
                                }
                              }
                              setEditingRole({
                                ...editingRole,
                                permissions: {
                                  ...editingRole.permissions,
                                  [module]: newPermissions
                                }
                              });
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {module === 'leaves' && (
                            <Checkbox 
                              checked={(permissions as string[]).includes('approve')}
                              onCheckedChange={(checked) => {
                                const newPermissions = [...permissions as string[]];
                                if (checked) {
                                  if (!newPermissions.includes('approve')) {
                                    newPermissions.push('approve');
                                  }
                                } else {
                                  const index = newPermissions.indexOf('approve');
                                  if (index !== -1) {
                                    newPermissions.splice(index, 1);
                                  }
                                }
                                setEditingRole({
                                  ...editingRole,
                                  permissions: {
                                    ...editingRole.permissions,
                                    [module]: newPermissions
                                  }
                                });
                              }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleEditRole}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
};

export default UsersPermissions;
