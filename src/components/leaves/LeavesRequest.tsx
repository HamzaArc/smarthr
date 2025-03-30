
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const leaveFormSchema = z.object({
  startDate: z.date({
    required_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
  }).refine(
    (date) => date >= new Date(),
    {
      message: 'End date cannot be in the past',
    }
  ),
  type: z.string({
    required_error: 'Please select a leave type',
  }),
  reason: z.string().min(5, {
    message: 'Reason must be at least 5 characters',
  }).max(500, {
    message: 'Reason must not exceed 500 characters',
  }),
});

type LeaveFormValues = z.infer<typeof leaveFormSchema>;

const LeavesRequest: React.FC = () => {
  const { t } = useLanguage();
  
  const form = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      reason: '',
    },
  });

  function onSubmit(data: LeaveFormValues) {
    console.log('Leave request submitted', data);
    
    // Here you would typically submit to an API
    toast({
      title: 'Leave request submitted',
      description: `Your leave request from ${format(data.startDate, 'PPP')} to ${format(data.endDate, 'PPP')} has been submitted.`,
    });
    
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('leaves.requestLeave')}</CardTitle>
        <CardDescription>{t('leaves.requestDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t('leaves.startDate')}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{t('leaves.selectDate')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t('leaves.endDate')}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{t('leaves.selectDate')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => 
                            date < new Date() || 
                            (form.getValues().startDate && date < form.getValues().startDate)
                          }
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('leaves.type')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('leaves.selectType')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="annual">{t('leaves.annual')}</SelectItem>
                        <SelectItem value="sick">{t('leaves.sick')}</SelectItem>
                        <SelectItem value="unpaid">{t('leaves.unpaid')}</SelectItem>
                        <SelectItem value="maternity">{t('leaves.maternity')}</SelectItem>
                        <SelectItem value="paternity">{t('leaves.paternity')}</SelectItem>
                        <SelectItem value="other">{t('leaves.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('leaves.reason')}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t('leaves.reasonPlaceholder')}
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      {t('leaves.reasonDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">{t('common.submit')}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LeavesRequest;
