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
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CreditCard,
      title: 'Billing Automation',
      description: 'Streamline your billing process with AI-powered automation that reduces errors and saves time.',
      color: 'from-blue-500 to-blue-600',
      path: '/features/billing-automation'
    },
    {
      icon: Bot,
      title: 'AI Talking Agent',
      description: 'Intelligent virtual assistant that handles patient inquiries and appointment scheduling 24/7.',
      color: 'from-purple-500 to-purple-600',
      path: '/features/ai-appointment-agent'
    },
    {
      icon: Globe,
      title: 'Bilingual Interface',
      description: 'Support multiple languages to serve diverse patient populations effectively.',
      color: 'from-green-500 to-green-600',
      path: '/features'
    },
    {
      icon: Building2,
      title: 'ERP Modules',
      description: 'Comprehensive enterprise resource planning tools designed specifically for healthcare.',
      color: 'from-orange-500 to-orange-600',
      path: '/features'
    },
    {
      icon: TrendingUp,
      title: 'Price Comparison',
      description: 'Compare treatment costs and help patients make informed financial decisions.',
      color: 'from-pink-500 to-pink-600',
      path: '/features/rate-comparison'
    },
    {
      icon: MapPin,
      title: 'GPS-based Hospital Ratings',
      description: 'Location-based hospital ratings and reviews to help patients find the best care nearby.',
      color: 'from-indigo-500 to-indigo-600',
      path: '/features/gps-hospital-finder'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Key Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how our AI-powered platform transforms healthcare operations with cutting-edge technology and intuitive design.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              {/* Icon */}
              <motion.div 
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <motion.div 
                className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <span className="mr-2">Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to transform your healthcare operations?
          </p>
          <motion.button 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/features')}
          >
            Explore All Features
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
