
import { Employee, Department, Attendance, Leave, Vacancy, Notification } from '@/types';

// Mock Employees
export const employees: Employee[] = [
  {
    id: '1',
    name: 'Youssef Alami',
    email: 'youssef.alami@smartshepherd.com',
    phone: '+212 661-234567',
    position: 'HR Manager',
    department: 'Human Resources',
    joinDate: '2021-03-15',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '2',
    name: 'Fatima Zahra',
    email: 'fatima.zahra@smartshepherd.com',
    phone: '+212 662-345678',
    position: 'Finance Director',
    department: 'Finance',
    joinDate: '2020-05-20',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '3',
    name: 'Mohammed El Khamlichi',
    email: 'mohammed.k@smartshepherd.com',
    phone: '+212 663-456789',
    position: 'Marketing Specialist',
    department: 'Marketing',
    joinDate: '2022-01-10',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '4',
    name: 'Amina Benali',
    email: 'amina.b@smartshepherd.com',
    phone: '+212 664-567890',
    position: 'IT Support',
    department: 'IT',
    joinDate: '2021-09-05',
    status: 'onLeave',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '5',
    name: 'Karim Tazi',
    email: 'karim.t@smartshepherd.com',
    phone: '+212 665-678901',
    position: 'Software Developer',
    department: 'IT',
    joinDate: '2022-03-20',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '6',
    name: 'Samir El Mansouri',
    email: 'samir.m@smartshepherd.com',
    phone: '+212 666-789012',
    position: 'Sales Representative',
    department: 'Sales',
    joinDate: '2020-11-15',
    status: 'inactive',
    imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

// Mock Departments
export const departments: Department[] = [
  {
    id: '1',
    name: 'Human Resources',
    employeeCount: 4,
    manager: 'Youssef Alami'
  },
  {
    id: '2',
    name: 'Finance',
    employeeCount: 6,
    manager: 'Fatima Zahra'
  },
  {
    id: '3',
    name: 'Marketing',
    employeeCount: 5,
    manager: 'Leila Haddad'
  },
  {
    id: '4',
    name: 'IT',
    employeeCount: 8,
    manager: 'Karim Tazi'
  },
  {
    id: '5',
    name: 'Sales',
    employeeCount: 10,
    manager: 'Hassan Benjelloun'
  }
];

// Mock Attendance
export const attendance: Attendance[] = [
  {
    id: '1',
    employeeId: '1',
    date: '2023-06-01',
    clockIn: '08:30',
    clockOut: '17:45',
    status: 'present'
  },
  {
    id: '2',
    employeeId: '2',
    date: '2023-06-01',
    clockIn: '09:15',
    clockOut: '18:00',
    status: 'late'
  },
  {
    id: '3',
    employeeId: '3',
    date: '2023-06-01',
    clockIn: '08:00',
    clockOut: '17:00',
    status: 'present'
  },
  {
    id: '4',
    employeeId: '4',
    date: '2023-06-01',
    clockIn: '',
    clockOut: null,
    status: 'absent'
  },
  {
    id: '5',
    employeeId: '5',
    date: '2023-06-01',
    clockIn: '08:10',
    clockOut: '17:30',
    status: 'present'
  }
];

// Mock Leaves
export const leaves: Leave[] = [
  {
    id: '1',
    employeeId: '4',
    startDate: '2023-06-01',
    endDate: '2023-06-07',
    reason: 'Family vacation',
    status: 'approved',
    type: 'annual'
  },
  {
    id: '2',
    employeeId: '2',
    startDate: '2023-06-10',
    endDate: '2023-06-12',
    reason: 'Medical appointment',
    status: 'approved',
    type: 'sick'
  },
  {
    id: '3',
    employeeId: '3',
    startDate: '2023-06-15',
    endDate: '2023-06-15',
    reason: 'Personal reasons',
    status: 'pending',
    type: 'unpaid'
  }
];

// Mock Vacancies
export const vacancies: Vacancy[] = [
  {
    id: '1',
    title: 'Senior HR Specialist',
    department: 'Human Resources',
    location: 'Casablanca',
    description: 'We are looking for an experienced HR specialist to join our team and help manage employee relations and development programs.',
    requirements: [
      'Bachelor\'s degree in HR or related field',
      'Minimum 5 years of experience in HR',
      'Excellent communication skills',
      'Fluent in Arabic, French, and English'
    ],
    posted: '2023-05-01',
    deadline: '2023-06-30',
    status: 'open'
  },
  {
    id: '2',
    title: 'Financial Analyst',
    department: 'Finance',
    location: 'Rabat',
    description: 'Seeking a detail-oriented financial analyst to support our finance department with budgeting, forecasting, and financial reporting.',
    requirements: [
      'Bachelor\'s degree in Finance or Accounting',
      '3+ years of experience in financial analysis',
      'Proficiency in Excel and financial software',
      'Strong analytical skills'
    ],
    posted: '2023-05-15',
    deadline: '2023-06-15',
    status: 'open'
  },
  {
    id: '3',
    title: 'Software Engineer',
    department: 'IT',
    location: 'Casablanca',
    description: 'Join our development team to build and maintain innovative software solutions for our growing client base.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Experience with JavaScript, React, and Node.js',
      'Knowledge of database technologies',
      'Problem-solving mindset'
    ],
    posted: '2023-05-10',
    deadline: '2023-06-20',
    status: 'open'
  }
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Employee Onboarding',
    message: 'Please complete the onboarding process for Nadia Benjelloun who joins next week.',
    type: 'info',
    read: false,
    date: '2023-06-01T10:30:00'
  },
  {
    id: '2',
    title: 'Leave Request Approved',
    message: 'Your leave request for June 10-12 has been approved.',
    type: 'success',
    read: true,
    date: '2023-05-28T14:45:00'
  },
  {
    id: '3',
    title: 'Payroll Processing',
    message: 'May payroll has been processed. Salaries will be disbursed by the 5th of June.',
    type: 'info',
    read: false,
    date: '2023-05-31T16:20:00'
  },
  {
    id: '4',
    title: 'Document Expired',
    message: 'Employee ID card for Mohammed El Khamlichi expires in 15 days. Please renew it.',
    type: 'warning',
    read: false,
    date: '2023-05-30T09:15:00'
  }
];

// Helper function to get employee by ID
export const getEmployeeById = (id: string): Employee | undefined => {
  return employees.find(employee => employee.id === id);
};

// Helper function to get department by ID
export const getDepartmentById = (id: string): Department | undefined => {
  return departments.find(department => department.id === id);
};
