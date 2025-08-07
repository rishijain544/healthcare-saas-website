import React from 'react';
import { 
  CreditCard, 
  Bot, 
  Globe, 
  Building2, 
  TrendingUp, 
  MapPin,
  ArrowRight
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: CreditCard,
      title: 'Billing Automation',
      description: 'Streamline your billing process with AI-powered automation that reduces errors and saves time.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Bot,
      title: 'AI Talking Agent',
      description: 'Intelligent virtual assistant that handles patient inquiries and appointment scheduling 24/7.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Globe,
      title: 'Bilingual Interface',
      description: 'Support multiple languages to serve diverse patient populations effectively.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Building2,
      title: 'ERP Modules',
      description: 'Comprehensive enterprise resource planning tools designed specifically for healthcare.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: TrendingUp,
      title: 'Price Comparison',
      description: 'Compare treatment costs and help patients make informed financial decisions.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: MapPin,
      title: 'GPS-based Hospital Ratings',
      description: 'Location-based hospital ratings and reviews to help patients find the best care nearby.',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Key Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how our AI-powered platform transforms healthcare operations with cutting-edge technology and intuitive design.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                <span className="mr-2">Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to transform your healthcare operations?
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Explore All Features
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
