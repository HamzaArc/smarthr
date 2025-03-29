
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'onLeave';
  imageUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  employeeCount: number;
  manager: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  status: 'present' | 'absent' | 'late' | 'halfDay';
}

export interface Leave {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'annual' | 'sick' | 'unpaid' | 'other';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  language: 'en' | 'fr' | 'ar';
  imageUrl?: string;
}

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  posted: string;
  deadline: string;
  status: 'open' | 'closed' | 'draft';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  date: string;
}

export type Language = 'en' | 'fr' | 'ar';
