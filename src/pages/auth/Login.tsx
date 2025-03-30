
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center pattern-bg p-4">
      <Link to="/" className="absolute top-4 left-4 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {t('auth.backToHome')}
      </Link>
      
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-blue-400"></div>
          <CardHeader className="space-y-2 text-center pt-8">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-primary-foreground">SH</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Smart HRs</CardTitle>
            <CardDescription>{t('auth.login')}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="rounded-lg h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Button variant="link" className="p-0 h-auto text-sm" size="sm">
                    {t('auth.forgotPassword')}
                  </Button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="rounded-lg h-11"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') {
                      setRememberMe(checked);
                    }
                  }}
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  {t('auth.rememberMe')}
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full rounded-lg h-11 transition-all shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>{t('auth.loggingIn')}</span>
                  </>
                ) : (
                  t('auth.login')
                )}
              </Button>
              <div className="text-center text-sm">
                <span className="text-muted-foreground">{t('auth.noAccount')}</span>
                {' '}
                <Button variant="link" className="p-0 h-auto" size="sm">
                  {t('auth.createAccount')}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
