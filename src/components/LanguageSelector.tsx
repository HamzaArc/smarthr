
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 px-2 h-9 rounded-full"
        >
          <Globe className="h-4 w-4" />
          <span>{languages.find(lang => lang.code === language)?.flag}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                language === lang.code && "bg-accent"
              )}
              onClick={() => setLanguage(lang.code as 'en' | 'fr' | 'ar')}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="flex-1">{lang.name}</span>
              {language === lang.code && (
                <Check className="h-4 w-4" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
