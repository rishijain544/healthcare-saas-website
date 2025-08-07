import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

const CTASection = () => {
  const benefits = [
    'No setup fees or hidden costs',
    '30-day free trial',
    '24/7 customer support',
    'Easy migration from existing systems',
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Healthcare Operations?
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of healthcare professionals who trust our platform to streamline their operations and improve patient care.
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start space-x-3 text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-blue-600 shadow-xl"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-blue-200 text-sm">
            <p className="mb-4">Trusted by 500+ healthcare facilities worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-xs">SOC 2 Compliant</div>
              <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
              <div className="text-xs">HIPAA Certified</div>
              <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
              <div className="text-xs">99.9% Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
