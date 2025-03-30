
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChartBar, Users, Calendar, Building, CreditCard } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-24 px-4 md:px-6 text-white">
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Transform your HR operations with Smart HRs
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                All-in-one HR management platform for modern companies
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium px-6">
                  <Link to="/login">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <Link to="/login">Schedule Demo</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-float rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/ec1cf5ff-2906-4607-a5fb-144739203506.png" 
                alt="HR Dashboard" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-pulse-soft">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                  <ChartBar className="h-4 w-4 text-green-500" />
                  <span>+24% productivity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comprehensive HR Solution</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Smart HRs provides all the tools you need to manage your workforce efficiently
          </p>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Employee Management</h3>
            <p className="text-gray-600 mb-4">
              Complete employee lifecycle management from onboarding to offboarding
            </p>
            <img 
              src="/lovable-uploads/43985051-fafe-4b06-aaeb-7c014b2c113d.png" 
              alt="Employee Management" 
              className="w-full h-auto rounded-lg mt-4"
            />
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Attendance & Leave</h3>
            <p className="text-gray-600 mb-4">
              Streamlined attendance tracking and leave management system
            </p>
            <img 
              src="/lovable-uploads/95c7791c-b64a-4c91-b1b1-95c6e7ffec77.png" 
              alt="Attendance & Leave" 
              className="w-full h-auto rounded-lg mt-4"
            />
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Payroll Processing</h3>
            <p className="text-gray-600 mb-4">
              Automated payroll calculations and seamless payment processing
            </p>
            <img 
              src="/lovable-uploads/bdb092c1-e98e-432f-a833-a317d2fdc003.png" 
              alt="Payroll Processing" 
              className="w-full h-auto rounded-lg mt-4"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-700 py-16 px-4 md:px-6 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your HR operations?</h2>
          <p className="text-xl mb-8">Join thousands of companies using Smart HRs</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium px-8">
              <Link to="/login">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white hover:bg-gray-100 text-indigo-700 border-2 px-8">
              <Link to="/login">Schedule Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Leading Companies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/19b2ba39-9901-4360-a945-6fac80d078ce.png" 
                  alt="Company Logo" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Tech Innovators Inc</h4>
                  <p className="text-sm text-gray-500">Software Development</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Smart HRs has completely transformed how we manage our workforce. The interface is intuitive and the automation features save us hours every week."
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/19b2ba39-9901-4360-a945-6fac80d078ce.png" 
                  alt="Company Logo" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Global Solutions Ltd</h4>
                  <p className="text-sm text-gray-500">Consulting Services</p>
                </div>
              </div>
              <p className="text-gray-600">
                "We've seen a 30% reduction in administrative tasks since implementing Smart HRs. Our HR team can now focus on strategic initiatives rather than paperwork."
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/19b2ba39-9901-4360-a945-6fac80d078ce.png" 
                  alt="Company Logo" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Creative Designs Co</h4>
                  <p className="text-sm text-gray-500">Marketing Agency</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The payroll processing feature in Smart HRs is exceptional. It handles complex calculations accurately and our employees love the transparent payslip portal."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Smart HRs</h3>
              <p className="text-slate-400">
                Modern HR management solution for forward-thinking companies
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Case Studies</a></li>
                <li><a href="#" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>© 2023 Smart HRs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
