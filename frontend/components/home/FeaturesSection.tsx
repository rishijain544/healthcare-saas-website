import React from 'react';
import { 
  CreditCard, 
  Bot, 
  Building2, 
  TrendingUp, 
  MapPin,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const FeaturesSection = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const features = [
    {
      icon: CreditCard,
      title: language === 'hi' ? 'बिलिंग स्वचालन' : 'Billing Automation',
      description: language === 'hi' 
        ? 'AI-संचालित स्वचालन के साथ अपनी बिलिंग प्रक्रिया को सुव्यवस्थित करें जो त्रुटियों को कम करता है और समय बचाता है।'
        : 'Streamline your billing process with AI-powered automation that reduces errors and saves time.',
      color: 'from-blue-500 to-blue-600',
      path: '/features/billing-automation'
    },
    {
      icon: Bot,
      title: language === 'hi' ? 'AI बात करने वाला एजेंट' : 'AI Talking Agent',
      description: language === 'hi'
        ? 'बुद्धिमान वर्चुअल असिस्टेंट जो 24/7 रोगी पूछताछ और अपॉइंटमेंट शेड्यूलिंग को संभालता है।'
        : 'Intelligent virtual assistant that handles patient inquiries and appointment scheduling 24/7.',
      color: 'from-purple-500 to-purple-600',
      path: '/features/ai-appointment-agent'
    },
    {
      icon: Building2,
      title: language === 'hi' ? 'ERP मॉड्यूल' : 'ERP Modules',
      description: language === 'hi'
        ? 'स्वास्थ्य सेवा के लिए विशेष रूप से डिज़ाइन किए गए व्यापक उद्यम संसाधन योजना उपकरण।'
        : 'Comprehensive enterprise resource planning tools designed specifically for healthcare.',
      color: 'from-orange-500 to-orange-600',
      path: '/features'
    },
    {
      icon: TrendingUp,
      title: language === 'hi' ? 'मूल्य तुलना' : 'Price Comparison',
      description: language === 'hi'
        ? 'उपचार लागतों की तुलना करें और रोगियों को सूचित वित्तीय निर्णय लेने में मदद करें।'
        : 'Compare treatment costs and help patients make informed financial decisions.',
      color: 'from-pink-500 to-pink-600',
      path: '/features/rate-comparison'
    },
    {
      icon: MapPin,
      title: language === 'hi' ? 'GPS-आधारित अस्पताल रेटिंग' : 'GPS-based Hospital Ratings',
      description: language === 'hi'
        ? 'स्थान-आधारित अस्पताल रेटिंग और समीक्षाएं रोगियों को पास में सबसे अच्छी देखभाल खोजने में मदद करती हैं।'
        : 'Location-based hospital ratings and reviews to help patients find the best care nearby.',
      color: 'from-indigo-500 to-indigo-600',
      path: '/features/gps-hospital-finder'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
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
            {language === 'hi' ? 'हमारी मुख्य विशेषताएं' : 'Our Key Features'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'hi'
              ? 'जानें कि कैसे हमारा AI-संचालित प्लेटफॉर्म अत्याधुनिक तकनीक और सहज डिज़ाइन के साथ स्वास्थ्य संचालन को बदल देता है।'
              : 'Discover how our AI-powered platform transforms healthcare operations with cutting-edge technology and intuitive design.'
            }
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
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden"
              onClick={() => navigate(feature.path)}
            >
              {/* Background Gradient on Hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Icon */}
              <motion.div 
                className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 z-10`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
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
                  <span className="mr-2">
                    {language === 'hi' ? 'और जानें' : 'Learn more'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </div>

              {/* Hover Effect Border */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
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
            {language === 'hi' 
              ? 'अपने स्वास्थ्य संचालन को बदलने के लिए तैयार हैं?'
              : 'Ready to transform your healthcare operations?'
            }
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
            {language === 'hi' ? 'सभी सुविधाएं देखें' : 'Explore All Features'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
