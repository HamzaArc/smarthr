
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, ChevronRight, BarChart, Calendar, Users, Shield, Clock, Zap } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">SH</span>
            </div>
            <span className="font-bold text-xl">Smart HRs</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              {t('landing.features')}
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              {t('landing.testimonials')}
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              {t('landing.pricing')}
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              {t('landing.contact')}
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Link to="/login">
              <Button variant="outline" size="sm">
                {t('auth.login')}
              </Button>
            </Link>
            <Link to="/login" className="hidden md:block">
              <Button size="sm">
                {t('auth.getStarted')} <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-60 z-0"></div>
        <div className="hero-gradient absolute top-0 left-0 w-full h-2 z-10"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="shine-text">{t('landing.modernHr')}</span> {t('landing.simplified')}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                {t('landing.heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    {t('landing.startFree')} <ChevronRight className="h-5 w-5 ml-1" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    {t('landing.learnMore')}
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                    >
                      <span className="text-xs font-medium">U{i}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">2,500+</span> {t('landing.companiesGlobally')}
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="relative max-w-md animate-float">
                <div className="absolute -top-8 -left-8 h-16 w-16 bg-yellow-100 rounded-xl rotate-12"></div>
                <div className="absolute -bottom-10 -right-8 h-20 w-20 bg-blue-100 rounded-full"></div>
                
                <div className="glass-card rounded-2xl p-2 shadow-xl">
                  <img 
                    src="/placeholder.svg" 
                    alt="Dashboard Preview" 
                    className="w-full h-auto rounded-xl shadow-sm"
                  />
                  
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-3">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">+24% {t('landing.productivity')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-12 wavy-bg"></div>
        
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.featuresTitle')}</h2>
            <p className="text-lg text-gray-600">{t('landing.featuresSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Users, 
                title: t('landing.featureEmployeeTitle'), 
                description: t('landing.featureEmployeeDesc')
              },
              { 
                icon: Calendar, 
                title: t('landing.featureAttendanceTitle'), 
                description: t('landing.featureAttendanceDesc')
              },
              { 
                icon: BarChart, 
                title: t('landing.featureAnalyticsTitle'), 
                description: t('landing.featureAnalyticsDesc')
              },
              { 
                icon: Clock, 
                title: t('landing.featureTimeTitle'), 
                description: t('landing.featureTimeDesc')
              },
              { 
                icon: Shield, 
                title: t('landing.featureSecurityTitle'), 
                description: t('landing.featureSecurityDesc')
              },
              { 
                icon: Zap, 
                title: t('landing.featureAutomationTitle'), 
                description: t('landing.featureAutomationDesc')
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.testimonialsTitle')}</h2>
            <p className="text-lg text-gray-600">{t('landing.testimonialsSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <span className="text-sm font-medium">U{i}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{t('landing.testimonialName')} {i}</p>
                      <p className="text-sm text-gray-500">{t('landing.testimonialPosition')}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{t('landing.testimonialText')}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-primary text-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.ctaTitle')}</h2>
            <p className="text-xl mb-8 opacity-90">{t('landing.ctaSubtitle')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-primary">
                  {t('landing.ctaButtonPrimary')}
                </Button>
              </Link>
              <a href="#contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  {t('landing.ctaButtonSecondary')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-300">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">SH</span>
                </div>
                <span className="font-bold text-xl text-white">Smart HRs</span>
              </div>
              <p className="text-gray-400 mb-4">{t('landing.footerTagline')}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">{t('landing.footerProduct')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footerFeatures')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footerPricing')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footerFaq')}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">{t('landing.footerCompany')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footerAbout')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footerBlog')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footerContact')}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">{t('landing.footerLegal')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footerTerms')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footerPrivacy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footerCookies')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Smart HRs. {t('landing.footerRights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
