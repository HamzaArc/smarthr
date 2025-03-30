
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Building, Upload } from 'lucide-react';

const CompanySettings: React.FC = () => {
  const { t } = useLanguage();

  const handleSaveSettings = () => {
    toast({
      title: t('settings.companySaved'),
      description: t('settings.companySavedDescription'),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.companyProfile')}</CardTitle>
          <CardDescription>{t('settings.companyProfileDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 border rounded-lg">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
                <Building className="h-16 w-16 text-muted-foreground" />
              </div>
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                {t('settings.uploadLogo')}
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {t('settings.logoRequirements')}
              </p>
            </div>
            
            <div className="w-full md:w-2/3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">{t('settings.companyName')}</Label>
                  <Input id="company-name" defaultValue="Tech Innovate Morocco" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">{t('settings.industry')}</Label>
                  <Select defaultValue="it">
                    <SelectTrigger id="industry">
                      <SelectValue placeholder={t('settings.selectIndustry')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">{t('settings.industries.it')}</SelectItem>
                      <SelectItem value="finance">{t('settings.industries.finance')}</SelectItem>
                      <SelectItem value="manufacturing">{t('settings.industries.manufacturing')}</SelectItem>
                      <SelectItem value="healthcare">{t('settings.industries.healthcare')}</SelectItem>
                      <SelectItem value="education">{t('settings.industries.education')}</SelectItem>
                      <SelectItem value="retail">{t('settings.industries.retail')}</SelectItem>
                      <SelectItem value="other">{t('settings.industries.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-address">{t('settings.address')}</Label>
                <Textarea 
                  id="company-address" 
                  placeholder={t('settings.addressPlaceholder')}
                  defaultValue="123 Techpark Ave, Casablanca, Morocco"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-phone">{t('settings.phoneNumber')}</Label>
                  <Input id="company-phone" defaultValue="+212 522 123 456" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-email">{t('settings.email')}</Label>
                  <Input id="company-email" defaultValue="info@techinnovate.ma" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax-id">{t('settings.taxId')}</Label>
                  <Input id="tax-id" defaultValue="MA12345678" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registration-number">{t('settings.registrationNumber')}</Label>
                  <Input id="registration-number" defaultValue="RC123456" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>
            {t('common.saveChanges')}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.workingHours')}</CardTitle>
          <CardDescription>{t('settings.workingHoursDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="work-days">{t('settings.workDays')}</Label>
              <Select defaultValue="monday-friday">
                <SelectTrigger id="work-days">
                  <SelectValue placeholder={t('settings.selectWorkDays')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday-friday">{t('settings.workDaysOptions.mondayToFriday')}</SelectItem>
                  <SelectItem value="monday-saturday">{t('settings.workDaysOptions.mondayToSaturday')}</SelectItem>
                  <SelectItem value="sunday-thursday">{t('settings.workDaysOptions.sundayToThursday')}</SelectItem>
                  <SelectItem value="custom">{t('settings.workDaysOptions.custom')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="work-hours">{t('settings.workHours')}</Label>
              <Select defaultValue="9-to-5">
                <SelectTrigger id="work-hours">
                  <SelectValue placeholder={t('settings.selectWorkHours')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9-to-5">9:00 AM - 5:00 PM</SelectItem>
                  <SelectItem value="8-to-4">8:00 AM - 4:00 PM</SelectItem>
                  <SelectItem value="10-to-6">10:00 AM - 6:00 PM</SelectItem>
                  <SelectItem value="custom">{t('settings.custom')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lunch-break">{t('settings.lunchBreak')}</Label>
              <Select defaultValue="1-hour">
                <SelectTrigger id="lunch-break">
                  <SelectValue placeholder={t('settings.selectLunchBreak')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30-min">30 {t('common.minutes')}</SelectItem>
                  <SelectItem value="1-hour">1 {t('common.hour')}</SelectItem>
                  <SelectItem value="1.5-hours">1.5 {t('common.hours')}</SelectItem>
                  <SelectItem value="2-hours">2 {t('common.hours')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="work-week-hours">{t('settings.workWeekHours')}</Label>
              <Input id="work-week-hours" defaultValue="40" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>
            {t('common.saveChanges')}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.leavePolicy')}</CardTitle>
          <CardDescription>{t('settings.leavePolicyDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="annual-leave">{t('settings.annualLeave')}</Label>
              <Input id="annual-leave" type="number" defaultValue="21" />
              <p className="text-xs text-muted-foreground">{t('common.daysPerYear')}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sick-leave">{t('settings.sickLeave')}</Label>
              <Input id="sick-leave" type="number" defaultValue="15" />
              <p className="text-xs text-muted-foreground">{t('common.daysPerYear')}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maternity-leave">{t('settings.maternityLeave')}</Label>
              <Input id="maternity-leave" type="number" defaultValue="98" />
              <p className="text-xs text-muted-foreground">{t('common.daysPerYear')}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>
            {t('common.saveChanges')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanySettings;
