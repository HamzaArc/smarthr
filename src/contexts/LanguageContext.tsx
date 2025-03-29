
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Our translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'app.name': 'SmartShepherd HR',
    'common.dashboard': 'Dashboard',
    'common.employees': 'Employees',
    'common.departments': 'Departments',
    'common.attendance': 'Attendance',
    'common.leaves': 'Leaves',
    'common.recruitment': 'Recruitment',
    'common.payroll': 'Payroll',
    'common.settings': 'Settings',
    'common.logout': 'Logout',
    'common.search': 'Search',
    'common.notifications': 'Notifications',
    'common.profile': 'Profile',
    'common.language': 'Language',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.add': 'Add',
    'common.status': 'Status',
    'common.actions': 'Actions',
    'common.welcome': 'Welcome',

    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.createAccount': 'Create Account',
    'auth.haveAccount': 'Already have an account?',
    'auth.rememberMe': 'Remember Me',

    // Dashboard
    'dashboard.totalEmployees': 'Total Employees',
    'dashboard.presentToday': 'Present Today',
    'dashboard.onLeave': 'On Leave',
    'dashboard.departments': 'Departments',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.recentActivities': 'Recent Activities',
    'dashboard.upcomingEvents': 'Upcoming Events',
    'dashboard.announcements': 'Announcements',

    // Employees
    'employees.list': 'Employees List',
    'employees.addNew': 'Add New Employee',
    'employees.name': 'Name',
    'employees.email': 'Email',
    'employees.phone': 'Phone',
    'employees.position': 'Position',
    'employees.department': 'Department',
    'employees.joinDate': 'Join Date',
    'employees.status': 'Status',
    'employees.active': 'Active',
    'employees.inactive': 'Inactive',
    'employees.onLeave': 'On Leave',

    // Attendance
    'attendance.today': 'Today\'s Attendance',
    'attendance.clockIn': 'Clock In',
    'attendance.clockOut': 'Clock Out',
    'attendance.present': 'Present',
    'attendance.absent': 'Absent',
    'attendance.late': 'Late',
    'attendance.date': 'Date',
    'attendance.status': 'Status',
  },
  fr: {
    // Common
    'app.name': 'SmartShepherd RH',
    'common.dashboard': 'Tableau de bord',
    'common.employees': 'Employés',
    'common.departments': 'Départements',
    'common.attendance': 'Présence',
    'common.leaves': 'Congés',
    'common.recruitment': 'Recrutement',
    'common.payroll': 'Paie',
    'common.settings': 'Paramètres',
    'common.logout': 'Déconnexion',
    'common.search': 'Rechercher',
    'common.notifications': 'Notifications',
    'common.profile': 'Profil',
    'common.language': 'Langue',
    'common.cancel': 'Annuler',
    'common.save': 'Enregistrer',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.view': 'Voir',
    'common.add': 'Ajouter',
    'common.status': 'Statut',
    'common.actions': 'Actions',
    'common.welcome': 'Bienvenue',

    // Auth
    'auth.login': 'Connexion',
    'auth.signup': 'Inscription',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.forgotPassword': 'Mot de passe oublié?',
    'auth.noAccount': 'Vous n\'avez pas de compte?',
    'auth.createAccount': 'Créer un compte',
    'auth.haveAccount': 'Vous avez déjà un compte?',
    'auth.rememberMe': 'Se souvenir de moi',

    // Dashboard
    'dashboard.totalEmployees': 'Total des employés',
    'dashboard.presentToday': 'Présents aujourd\'hui',
    'dashboard.onLeave': 'En congé',
    'dashboard.departments': 'Départements',
    'dashboard.quickActions': 'Actions rapides',
    'dashboard.recentActivities': 'Activités récentes',
    'dashboard.upcomingEvents': 'Événements à venir',
    'dashboard.announcements': 'Annonces',

    // Employees
    'employees.list': 'Liste des employés',
    'employees.addNew': 'Ajouter un employé',
    'employees.name': 'Nom',
    'employees.email': 'Email',
    'employees.phone': 'Téléphone',
    'employees.position': 'Poste',
    'employees.department': 'Département',
    'employees.joinDate': 'Date d\'entrée',
    'employees.status': 'Statut',
    'employees.active': 'Actif',
    'employees.inactive': 'Inactif',
    'employees.onLeave': 'En congé',

    // Attendance
    'attendance.today': 'Présence aujourd\'hui',
    'attendance.clockIn': 'Pointer l\'entrée',
    'attendance.clockOut': 'Pointer la sortie',
    'attendance.present': 'Présent',
    'attendance.absent': 'Absent',
    'attendance.late': 'En retard',
    'attendance.date': 'Date',
    'attendance.status': 'Statut',
  },
  ar: {
    // Common
    'app.name': 'سمارت شيبيرد للموارد البشرية',
    'common.dashboard': 'لوحة القيادة',
    'common.employees': 'الموظفون',
    'common.departments': 'الأقسام',
    'common.attendance': 'الحضور',
    'common.leaves': 'الإجازات',
    'common.recruitment': 'التوظيف',
    'common.payroll': 'الرواتب',
    'common.settings': 'الإعدادات',
    'common.logout': 'تسجيل الخروج',
    'common.search': 'بحث',
    'common.notifications': 'الإشعارات',
    'common.profile': 'الملف الشخصي',
    'common.language': 'اللغة',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.add': 'إضافة',
    'common.status': 'الحالة',
    'common.actions': 'الإجراءات',
    'common.welcome': 'مرحباً',

    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.createAccount': 'إنشاء حساب',
    'auth.haveAccount': 'لديك حساب بالفعل؟',
    'auth.rememberMe': 'تذكرني',

    // Dashboard
    'dashboard.totalEmployees': 'إجمالي الموظفين',
    'dashboard.presentToday': 'الحاضرون اليوم',
    'dashboard.onLeave': 'في إجازة',
    'dashboard.departments': 'الأقسام',
    'dashboard.quickActions': 'إجراءات سريعة',
    'dashboard.recentActivities': 'الأنشطة الأخيرة',
    'dashboard.upcomingEvents': 'الأحداث القادمة',
    'dashboard.announcements': 'الإعلانات',

    // Employees
    'employees.list': 'قائمة الموظفين',
    'employees.addNew': 'إضافة موظف جديد',
    'employees.name': 'الاسم',
    'employees.email': 'البريد الإلكتروني',
    'employees.phone': 'الهاتف',
    'employees.position': 'المنصب',
    'employees.department': 'القسم',
    'employees.joinDate': 'تاريخ الانضمام',
    'employees.status': 'الحالة',
    'employees.active': 'نشط',
    'employees.inactive': 'غير نشط',
    'employees.onLeave': 'في إجازة',

    // Attendance
    'attendance.today': 'الحضور اليوم',
    'attendance.clockIn': 'تسجيل الدخول',
    'attendance.clockOut': 'تسجيل الخروج',
    'attendance.present': 'حاضر',
    'attendance.absent': 'غائب',
    'attendance.late': 'متأخر',
    'attendance.date': 'التاريخ',
    'attendance.status': 'الحالة',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Try to get the language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Handle RTL for Arabic
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    if (lang === 'ar') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
