
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { notifications } from '@/services/mockData';

const NotificationMenu: React.FC = () => {
  const { t } = useLanguage();
  const unreadCount = notifications.filter(n => !n.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('default', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] bg-red-500 text-white"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>{t('common.notifications')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          <DropdownMenuGroup>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex-col items-start p-4">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(notification.date)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={`mt-2 ${getTypeStyles(notification.type)}`}
                  >
                    {notification.type}
                  </Badge>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No notifications
              </div>
            )}
          </DropdownMenuGroup>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer justify-center">
          <button className="w-full text-center text-sm font-medium text-primary py-2">
            View all notifications
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
