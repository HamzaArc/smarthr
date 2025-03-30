
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronRight, BarChart, Calendar, Users, Shield, Clock, Zap } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">SH</span>
            </div>
            <span className="font-bold text-xl">Smart HRs</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/login" className="hidden md:block">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                Get Started <ChevronRight className="h-4 w-4 ml-1" />
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Modern HR</span> simplified
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Streamline your HR operations with our all-in-one platform for employee management, attendance tracking, and payroll processing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
                    Start Free Trial <ChevronRight className="h-5 w-5 ml-1" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
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
                  <span className="font-semibold text-gray-900">2,500+</span> companies globally
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="relative max-w-md animate-float">
                <div className="absolute -top-8 -left-8 h-16 w-16 bg-yellow-100 rounded-xl rotate-12"></div>
                <div className="absolute -bottom-10 -right-8 h-20 w-20 bg-blue-100 rounded-full"></div>
                
                <div className="glass-card rounded-2xl p-2 shadow-xl">
                  <img 
                    src="/lovable-uploads/95c7791c-b64a-4c91-b1b1-95c6e7ffec77.png" 
                    alt="HR Dashboard Preview" 
                    className="w-full h-auto rounded-xl shadow-sm"
                  />
                  
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-3">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm font-medium">+24% productivity</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600">Everything you need to manage your workforce efficiently</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Users, 
                title: "Employee Management", 
                description: "Manage employee information, documents and performance all in one place."
              },
              { 
                icon: Calendar, 
                title: "Attendance Tracking", 
                description: "Track time, attendance and leaves with automated workflows."
              },
              { 
                icon: BarChart, 
                title: "Analytics & Reporting", 
                description: "Get insights with customizable dashboards and detailed reporting."
              },
              { 
                icon: Clock, 
                title: "Time Management", 
                description: "Effortless scheduling, time tracking and shift management."
              },
              { 
                icon: Shield, 
                title: "Data Security", 
                description: "Enterprise-grade security to protect sensitive HR data."
              },
              { 
                icon: Zap, 
                title: "Workflow Automation", 
                description: "Automate repetitive tasks and approval processes."
              }
            ].map((feature, index) => (
              <Card key={index} className="border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Businesses</h2>
            <p className="text-lg text-gray-600">See what our customers have to say about Smart HRs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                position: "HR Director, TechCorp",
                text: "Smart HRs has transformed how we manage our workforce. The intuitive interface and powerful features have saved us countless hours."
              },
              {
                name: "Michael Chen",
                position: "CEO, GrowthStartup",
                text: "As we scaled from 10 to 100 employees, Smart HRs made the transition seamless. The automation features are game-changing."
              },
              {
                name: "Jessica Williams",
                position: "Operations Manager, RetailPlus",
                text: "The attendance and shift management features have dramatically improved our workforce planning and reduced overtime costs."
              }
            ].map((testimonial, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <span className="text-sm font-medium">U{i+1}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your HR operations?</h2>
            <p className="text-xl mb-8 text-white opacity-90">Join thousands of companies using Smart HRs</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-indigo-600 font-medium">
                  Start Free Trial
                </Button>
              </Link>
              <a href="#contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Schedule Demo
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
                <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">SH</span>
                </div>
                <span className="font-bold text-xl text-white">Smart HRs</span>
              </div>
              <p className="text-gray-400 mb-4">Simplifying HR operations for the modern workplace</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Smart HRs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
