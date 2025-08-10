import React, { useState } from 'react';
import { Check, X, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/ui/Button';

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const { language } = useLanguage();

  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    INR: { symbol: '₹', rate: 83 },
    EUR: { symbol: '€', rate: 0.85 },
    GBP: { symbol: '£', rate: 0.73 }
  };

  const plans = [
    {
      name: language === 'hi' ? 'बेसिक' : 'Basic',
      description: language === 'hi' ? 'छोटे क्लीनिक और प्रैक्टिस के लिए बिल्कुल सही' : 'Perfect for small clinics and practices',
      monthlyPrice: 219,
      yearlyPrice: 2190,
      features: [
        language === 'hi' ? '5 उपयोगकर्ता तक' : 'Up to 5 users',
        language === 'hi' ? 'बेसिक बिलिंग स्वचालन' : 'Basic billing automation',
        language === 'hi' ? 'रोगी प्रबंधन' : 'Patient management',
        language === 'hi' ? 'ईमेल सहायता' : 'Email support',
        language === 'hi' ? 'मोबाइल ऐप एक्सेस' : 'Mobile app access',
        language === 'hi' ? 'बेसिक रिपोर्टिंग' : 'Basic reporting',
      ],
      limitations: [
        language === 'hi' ? 'कोई AI बात करने वाला एजेंट नहीं' : 'No AI talking agent',
        language === 'hi' ? 'सीमित एकीकरण' : 'Limited integrations',
        language === 'hi' ? 'कोई उन्नत एनालिटिक्स नहीं' : 'No advanced analytics',
      ],
      popular: false,
      color: 'from-gray-500 to-gray-600',
    },
    {
      name: language === 'hi' ? 'प्रो' : 'Pro',
      description: language === 'hi' ? 'बढ़ती स्वास्थ्य सुविधाओं के लिए सबसे लोकप्रिय' : 'Most popular for growing healthcare facilities',
      monthlyPrice: 309,
      yearlyPrice: 3090,
      features: [
        language === 'hi' ? '25 उपयोगकर्ता तक' : 'Up to 25 users',
        language === 'hi' ? 'पूर्ण बिलिंग स्वचालन' : 'Full billing automation',
        language === 'hi' ? 'AI बिलिंग एजेंट' : 'AI Billing Agent',
        language === 'hi' ? 'AI बात करने वाला एजेंट' : 'AI talking agent',
        language === 'hi' ? 'ERP मॉड्यूल' : 'ERP modules',
        language === 'hi' ? 'मूल्य तुलना' : 'Price comparison',
        language === 'hi' ? 'GPS-आधारित रेटिंग' : 'GPS-based ratings',
        language === 'hi' ? 'प्राथमिकता सहायता' : 'Priority support',
        language === 'hi' ? 'उन्नत एनालिटिक्स' : 'Advanced analytics',
        language === 'hi' ? 'कस्टम एकीकरण' : 'Custom integrations',
        language === 'hi' ? 'API एक्सेस' : 'API access',
      ],
      limitations: [],
      popular: true,
      color: 'from-blue-500 to-purple-600',
    },
    {
      name: language === 'hi' ? 'एंटरप्राइज़' : 'Enterprise',
      description: language === 'hi' ? 'बड़े अस्पतालों और स्वास्थ्य नेटवर्क के लिए' : 'For large hospitals and healthcare networks',
      monthlyPrice: null,
      yearlyPrice: null,
      customPricing: true,
      features: [
        language === 'hi' ? 'असीमित उपयोगकर्ता' : 'Unlimited users',
        language === 'hi' ? 'प्रो में सब कुछ' : 'Everything in Pro',
        language === 'hi' ? 'कस्टम AI प्रशिक्षण' : 'Custom AI training',
        language === 'hi' ? 'व्हाइट-लेबल समाधान' : 'White-label solution',
        language === 'hi' ? 'समर्पित खाता प्रबंधक' : 'Dedicated account manager',
        language === 'hi' ? '24/7 फोन सहायता' : '24/7 phone support',
        language === 'hi' ? 'कस्टम रिपोर्टिंग' : 'Custom reporting',
        language === 'hi' ? 'उन्नत सुरक्षा' : 'Advanced security',
        language === 'hi' ? 'अनुपालन उपकरण' : 'Compliance tools',
        language === 'hi' ? 'मल्टी-लोकेशन सहायता' : 'Multi-location support',
        language === 'hi' ? 'कस्टम एकीकरण' : 'Custom integrations',
      ],
      limitations: [],
      popular: false,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  const faqs = [
    {
      question: language === 'hi' ? 'क्या मैं किसी भी समय अपना प्लान बदल सकता हूं?' : 'Can I change my plan at any time?',
      answer: language === 'hi' ? 'हां, आप किसी भी समय अपना प्लान अपग्रेड या डाउनग्रेड कर सकते हैं। परिवर्तन आपके अगले बिलिंग चक्र में दिखाई देंगे।' : 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: language === 'hi' ? 'क्या कोई मुफ्त ट्रायल उपलब्ध है?' : 'Is there a free trial available?',
      answer: language === 'hi' ? 'हां, हम सभी प्लान के लिए 7-दिन का मुफ्त ट्रायल प्रदान करते हैं। शुरू करने के लिए कोई क्रेडिट कार्ड की आवश्यकता नहीं है।' : 'Yes, we offer a 7-day free trial for all plans. No credit card required to start.',
    },
    {
      question: language === 'hi' ? 'आप किस प्रकार की सहायता प्रदान करते हैं?' : 'What kind of support do you provide?',
      answer: language === 'hi' ? 'हम बेसिक प्लान के लिए ईमेल सहायता, प्रो प्लान के लिए प्राथमिकता सहायता, और एंटरप्राइज़ प्लान के लिए 24/7 फोन सहायता प्रदान करते हैं।' : 'We provide email support for Basic plans, priority support for Pro plans, and 24/7 phone support for Enterprise plans.',
    },
    {
      question: language === 'hi' ? 'क्या मेरा डेटा सुरक्षित है?' : 'Is my data secure?',
      answer: language === 'hi' ? 'बिल्कुल। हम आपके डेटा की सुरक्षा के लिए एंटरप्राइज़-ग्रेड सुरक्षा उपायों का उपयोग करते हैं।' : 'Absolutely. We use enterprise-grade security measures to protect your data.',
    },
    {
      question: language === 'hi' ? 'क्या मैं अपने मौजूदा सिस्टम के साथ एकीकरण कर सकता हूं?' : 'Can I integrate with my existing systems?',
      answer: language === 'hi' ? 'हां, हम अधिकांश लोकप्रिय स्वास्थ्य सिस्टम के साथ एकीकरण प्रदान करते हैं। प्रो और एंटरप्राइज़ प्लान के लिए कस्टम एकीकरण उपलब्ध हैं।' : 'Yes, we offer integrations with most popular healthcare systems. Custom integrations are available for Pro and Enterprise plans.',
    },
  ];

  const [openFAQ, setOpenFAQ] = useState(null);

  const formatPrice = (price) => {
    if (!price) return null;
    const convertedPrice = Math.round(price * currencyRates[currency].rate);
    return `${currencyRates[currency].symbol}${convertedPrice.toLocaleString()}`;
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'hi' ? (
                <>
                  हर क्लीनिक के लिए
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    सरल मूल्य निर्धारण
                  </span>
                </>
              ) : (
                <>
                  Simple Pricing for
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Every Clinic
                  </span>
                </>
              )}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              {language === 'hi'
                ? 'अपनी स्वास्थ्य सुविधा के लिए सही प्लान चुनें। सभी प्लान में हमारी मुख्य सुविधाएं शामिल हैं, कोई छुपी हुई फीस नहीं।'
                : 'Choose the perfect plan for your healthcare facility. All plans include our core features with no hidden fees.'
              }
            </p>

            {/* Currency Selector */}
            <div className="flex items-center justify-center mb-8">
              <span className="mr-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                {language === 'hi' ? 'मुद्रा:' : 'Currency:'}
              </span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-16">
              <span className={`mr-3 text-lg font-medium ${!isYearly ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                {language === 'hi' ? 'मासिक' : 'Monthly'}
              </span>
              <motion.button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${
                  isYearly ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300"
                  animate={{ x: isYearly ? 28 : 4 }}
                />
              </motion.button>
              <span className={`ml-3 text-lg font-medium ${isYearly ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                {language === 'hi' ? 'वार्षिक' : 'Yearly'}
              </span>
              {isYearly && (
                <motion.span 
                  className="ml-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {language === 'hi' ? '17% बचत' : 'Save 17%'}
                </motion.span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${
                  plan.popular
                    ? 'border-blue-500 dark:border-blue-400 scale-105'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: plan.popular ? 1.05 : 1.02 }}
              >
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {language === 'hi' ? 'सबसे लोकप्रिय' : 'Most Popular'}
                    </div>
                  </motion.div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {plan.description}
                    </p>
                    <div className="mb-6">
                      {plan.customPricing ? (
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          {language === 'hi' ? 'कस्टम मूल्य निर्धारण' : 'Custom Pricing'}
                        </div>
                      ) : (
                        <>
                          <span className="text-5xl font-bold text-gray-900 dark:text-white">
                            {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                          </span>
                          <span className="text-gray-600 dark:text-gray-300 ml-2">
                            /{isYearly ? (language === 'hi' ? 'वर्ष' : 'year') : (language === 'hi' ? 'माह' : 'month')}
                          </span>
                        </>
                      )}
                    </div>
                    {isYearly && !plan.customPricing && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {language === 'hi' 
                          ? `प्रति वर्ष ${formatPrice((plan.monthlyPrice * 12) - plan.yearlyPrice)} की बचत`
                          : `Save ${formatPrice((plan.monthlyPrice * 12) - plan.yearlyPrice)} per year`
                        }
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      {language === 'hi' ? 'क्या शामिल है:' : "What's included:"}
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * featureIndex }}
                        >
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <motion.li 
                          key={limitationIndex} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * (plan.features.length + limitationIndex) }}
                        >
                          <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-400 dark:text-gray-500">{limitation}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={plan.popular ? 'primary' : 'outline'}
                      size="lg"
                      className="w-full group"
                    >
                      {plan.customPricing 
                        ? (language === 'hi' ? 'बिक्री से संपर्क करें' : 'Contact Sales')
                        : (language === 'hi' ? 'मुफ्त ट्रायल शुरू करें' : 'Start Free Trial')
                      }
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'hi' 
                ? 'सभी प्लान में 7-दिन का मुफ्त ट्रायल • कोई सेटअप फीस नहीं • कभी भी रद्द करें'
                : 'All plans include 7-day free trial • No setup fees • Cancel anytime'
              }
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                {language === 'hi' ? 'सुरक्षित डेटा' : 'Secure Data'}
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                {language === 'hi' ? '99.9% अपटाइम SLA' : '99.9% Uptime SLA'}
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                {language === 'hi' ? '24/7 सहायता' : '24/7 Support'}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'hi' ? 'प्रश्न हैं? हमारे पास उत्तर हैं।' : 'Have questions? We have answers.'}
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full text-left p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? 'auto' : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {language === 'hi' ? 'अभी भी प्रश्न हैं? हम मदद के लिए यहां हैं।' : 'Still have questions? We\'re here to help.'}
            </p>
            <Button variant="primary" size="lg">
              {language === 'hi' ? 'सहायता से संपर्क करें' : 'Contact Support'}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {language === 'hi' ? 'शुरू करने के लिए तैयार हैं?' : 'Ready to Get Started?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {language === 'hi'
                ? 'हजारों स्वास्थ्य पेशेवरों के साथ जुड़ें जो अपने संचालन को सुव्यवस्थित करने के लिए हमारे प्लेटफॉर्म पर भरोसा करते हैं।'
                : 'Join thousands of healthcare professionals who trust our platform to streamline their operations.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 min-w-[200px]">
                  {language === 'hi' ? 'मुफ्त ट्रायल शुरू करें' : 'Start Free Trial'}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 min-w-[200px]">
                  {language === 'hi' ? 'डेमो शेड्यूल करें' : 'Schedule Demo'}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
