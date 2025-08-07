import React from 'react';
import { 
  CreditCard, 
  Bot, 
  Globe, 
  Building2, 
  TrendingUp, 
  MapPin,
  Shield,
  Clock,
  Users,
  BarChart3,
  Smartphone,
  Cloud
} from 'lucide-react';

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: CreditCard,
      title: 'Billing Automation',
      description: 'Streamline your billing process with AI-powered automation that reduces errors and saves time.',
      details: [
        'Automated invoice generation',
        'Insurance claim processing',
        'Payment tracking and reminders',
        'Financial reporting and analytics'
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Bot,
      title: 'AI Talking Agent',
      description: 'Intelligent virtual assistant that handles patient inquiries and appointment scheduling 24/7.',
      details: [
        '24/7 patient support',
        'Natural language processing',
        'Appointment scheduling',
        'Prescription reminders'
      ],
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Globe,
      title: 'Bilingual Interface',
      description: 'Support multiple languages to serve diverse patient populations effectively.',
      details: [
        'Multi-language support',
        'Cultural adaptation',
        'Real-time translation',
        'Localized content'
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Building2,
      title: 'ERP Modules',
      description: 'Comprehensive enterprise resource planning tools designed specifically for healthcare.',
      details: [
        'Inventory management',
        'Staff scheduling',
        'Resource allocation',
        'Compliance tracking'
      ],
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: TrendingUp,
      title: 'Price Comparison',
      description: 'Compare treatment costs and help patients make informed financial decisions.',
      details: [
        'Treatment cost analysis',
        'Insurance coverage comparison',
        'Payment plan options',
        'Cost transparency tools'
      ],
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: MapPin,
      title: 'GPS-based Hospital Ratings',
      description: 'Location-based hospital ratings and reviews to help patients find the best care nearby.',
      details: [
        'Location-based search',
        'Patient reviews and ratings',
        'Quality metrics',
        'Appointment availability'
      ],
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const additionalFeatures = [
    { icon: Shield, title: 'Security & Compliance', description: 'HIPAA compliant with enterprise-grade security' },
    { icon: Clock, title: 'Real-time Updates', description: 'Instant synchronization across all devices' },
    { icon: Users, title: 'Team Collaboration', description: 'Seamless communication between healthcare teams' },
    { icon: BarChart3, title: 'Advanced Analytics', description: 'Comprehensive reporting and business intelligence' },
    { icon: Smartphone, title: 'Mobile Access', description: 'Full functionality on mobile devices' },
    { icon: Cloud, title: 'Cloud Infrastructure', description: 'Scalable and reliable cloud-based platform' },
  ];

  const comparisonData = [
    { feature: 'AI-Powered Automation', us: true, competitor1: false, competitor2: true },
    { feature: 'Bilingual Support', us: true, competitor1: false, competitor2: false },
    { feature: '24/7 AI Assistant', us: true, competitor1: false, competitor2: false },
    { feature: 'GPS-based Ratings', us: true, competitor1: false, competitor2: false },
    { feature: 'Price Comparison', us: true, competitor1: true, competitor2: false },
    { feature: 'HIPAA Compliance', us: true, competitor1: true, competitor2: true },
    { feature: 'Mobile App', us: true, competitor1: true, competitor2: false },
    { feature: 'Real-time Analytics', us: true, competitor1: false, competitor2: true },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern Healthcare
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how our comprehensive suite of AI-powered tools transforms healthcare operations and improves patient outcomes.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Additional Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Even more features to enhance your healthcare operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Chart */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              How We Compare
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See why healthcare professionals choose our platform over the competition.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 text-gray-900 dark:text-white font-bold">Feature</th>
                  <th className="text-center py-4 px-6 text-blue-600 dark:text-blue-400 font-bold">HealthAI</th>
                  <th className="text-center py-4 px-6 text-gray-600 dark:text-gray-400 font-bold">Competitor A</th>
                  <th className="text-center py-4 px-6 text-gray-600 dark:text-gray-400 font-bold">Competitor B</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.feature} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">{row.feature}</td>
                    <td className="text-center py-4 px-6">
                      {row.us ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                          <span className="text-white text-xs">✗</span>
                        </div>
                      )}
                    </td>
                    <td className="text-center py-4 px-6">
                      {row.competitor1 ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                          <span className="text-white text-xs">✗</span>
                        </div>
                      )}
                    </td>
                    <td className="text-center py-4 px-6">
                      {row.competitor2 ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                          <span className="text-white text-xs">✗</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your free trial today and see how our platform can transform your healthcare operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 transform hover:-translate-y-1 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
