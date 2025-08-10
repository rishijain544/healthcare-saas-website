import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/ui/Button';

const ContactPage = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: language === 'hi' ? 'हमें ईमेल करें' : 'Email Us',
      details: 'contact@healthai.com',
      description: language === 'hi' 
        ? 'हमें एक ईमेल भेजें और हम 24 घंटों के भीतर जवाब देंगे।'
        : 'Send us an email and we\'ll respond within 24 hours.',
    },
    {
      icon: Phone,
      title: language === 'hi' ? 'हमें कॉल करें' : 'Call Us',
      details: '+1 (555) 123-4567',
      description: language === 'hi'
        ? 'सोमवार से शुक्रवार, सुबह 9 बजे से शाम 6 बजे PST तक हमारी टीम से बात करें।'
        : 'Speak with our team Monday to Friday, 9 AM to 6 PM PST.',
    },
    {
      icon: MapPin,
      title: language === 'hi' ? 'हमसे मिलें' : 'Visit Us',
      details: '123 Innovation Drive, San Francisco, CA 94105',
      description: language === 'hi'
        ? 'सैन फ्रांसिस्को के दिल में हमारे मुख्यालय में आएं।'
        : 'Come visit our headquarters in the heart of San Francisco.',
    },
    {
      icon: Clock,
      title: language === 'hi' ? 'व्यावसायिक घंटे' : 'Business Hours',
      details: language === 'hi' ? 'सोम - शुक्र: सुबह 9 - शाम 6 PST' : 'Mon - Fri: 9 AM - 6 PM PST',
      description: language === 'hi'
        ? 'एंटरप्राइज़ ग्राहकों के लिए 24/7 सहायता उपलब्ध।'
        : '24/7 support available for Enterprise customers.',
    },
  ];

  const subjects = [
    language === 'hi' ? 'सामान्य पूछताछ' : 'General Inquiry',
    language === 'hi' ? 'बिक्री और मूल्य निर्धारण' : 'Sales & Pricing',
    language === 'hi' ? 'तकनीकी सहायता' : 'Technical Support',
    language === 'hi' ? 'साझेदारी के अवसर' : 'Partnership Opportunities',
    language === 'hi' ? 'मीडिया और प्रेस' : 'Media & Press',
    language === 'hi' ? 'अन्य' : 'Other',
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: language === 'hi' ? 'CEO और सह-संस्थापक' : 'CEO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      email: 'sarah@healthai.com'
    },
    {
      name: 'Michael Chen',
      role: language === 'hi' ? 'CTO और सह-संस्थापक' : 'CTO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      email: 'michael@healthai.com'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: language === 'hi' ? 'मुख्य चिकित्सा सलाहकार' : 'Chief Medical Advisor',
      image: 'https://images.unsplash.com/photo-1594824475317-d0b8e8b5e8e5?w=150&h=150&fit=crop&crop=face',
      email: 'emily@healthai.com'
    },
    {
      name: 'James Wilson',
      role: language === 'hi' ? 'इंजीनियरिंग के VP' : 'VP of Engineering',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'james@healthai.com'
    },
    {
      name: 'Lisa Park',
      role: language === 'hi' ? 'उत्पाद प्रमुख' : 'Head of Product',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      email: 'lisa@healthai.com'
    }
  ];

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
                  संपर्क में
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    रहें
                  </span>
                </>
              ) : (
                <>
                  Get in
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Touch
                  </span>
                </>
              )}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'hi'
                ? 'हमारे प्लेटफॉर्म के बारे में प्रश्न हैं? डेमो शेड्यूल करना चाहते हैं? हम आपके स्वास्थ्य संचालन को बदलने में मदद करने के लिए यहां हैं।'
                : 'Have questions about our platform? Want to schedule a demo? We\'re here to help you transform your healthcare operations.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl mb-6 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <info.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {info.title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {info.details}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  {language === 'hi' ? 'हमें संदेश भेजें' : 'Send us a Message'}
                </h2>

                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {language === 'hi' ? 'संदेश भेजा गया!' : 'Message Sent!'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === 'hi'
                        ? 'संपर्क करने के लिए धन्यवाद। हम 24 घंटों के भीतर आपसे संपर्क करेंगे।'
                        : 'Thank you for reaching out. We\'ll get back to you within 24 hours.'
                      }
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {language === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          placeholder={language === 'hi' ? 'जॉन डो' : 'John Doe'}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {language === 'hi' ? 'ईमेल पता *' : 'Email Address *'}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {language === 'hi' ? 'कंपनी/संगठन' : 'Company/Organization'}
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          placeholder={language === 'hi' ? 'आपकी स्वास्थ्य सुविधा' : 'Your Healthcare Facility'}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {language === 'hi' ? 'फोन नंबर' : 'Phone Number'}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === 'hi' ? 'विषय *' : 'Subject *'}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">{language === 'hi' ? 'एक विषय चुनें' : 'Select a subject'}</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === 'hi' ? 'संदेश *' : 'Message *'}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
                        placeholder={language === 'hi' 
                          ? 'हमें अपनी स्वास्थ्य सुविधा के बारे में बताएं और हम कैसे मदद कर सकते हैं...'
                          : 'Tell us about your healthcare facility and how we can help...'
                        }
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" variant="primary" size="lg" className="w-full group">
                        {language === 'hi' ? 'संदेश भेजें' : 'Send Message'}
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Google Maps Integration */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'hi' ? 'हमारा स्थान' : 'Our Location'}
                  </h3>
                  
                  {/* Google Maps Embed */}
                  <div className="rounded-2xl overflow-hidden mb-6">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1234567890"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-64"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {language === 'hi' ? 'पता' : 'Address'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        123 Innovation Drive<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {language === 'hi' ? 'दिशा-निर्देश' : 'Directions'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {language === 'hi'
                          ? 'SOMA जिले में स्थित, सार्वजनिक परिवहन द्वारा आसानी से पहुंचा जा सकता है। बिल्डिंग गैराज में पार्किंग उपलब्ध।'
                          : 'Located in the SOMA district, easily accessible by public transportation. Parking available in the building garage.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">
                    {language === 'hi' ? 'तत्काल सहायता चाहिए?' : 'Need Immediate Help?'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5" />
                      <div>
                        <p className="font-medium">
                          {language === 'hi' ? 'आपातकालीन सहायता' : 'Emergency Support'}
                        </p>
                        <p className="text-blue-100 text-sm">+1 (555) 911-HELP</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5" />
                      <div>
                        <p className="font-medium">
                          {language === 'hi' ? 'बिक्री टीम' : 'Sales Team'}
                        </p>
                        <p className="text-blue-100 text-sm">sales@healthai.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5" />
                      <div>
                        <p className="font-medium">
                          {language === 'hi' ? 'प्रतिक्रिया समय' : 'Response Time'}
                        </p>
                        <p className="text-blue-100 text-sm">
                          {language === 'hi' ? '24 घंटों के भीतर' : 'Within 24 hours'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-blue-400">
                    <p className="text-blue-100 text-sm">
                      {language === 'hi'
                        ? 'तत्काल तकनीकी समस्याओं के लिए, एंटरप्राइज़ ग्राहक हमारी 24/7 सहायता लाइन पर कॉल कर सकते हैं।'
                        : 'For urgent technical issues, Enterprise customers can call our 24/7 support line.'
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'hi' ? 'हमारी टीम से मिलें' : 'Meet Our Team'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'hi'
                ? 'HealthAI के पीछे के जुनूनी व्यक्ति, स्वास्थ्य विशेषज्ञता को अत्याधुनिक तकनीक के साथ जोड़ते हैं।'
                : 'The passionate individuals behind HealthAI, combining healthcare expertise with cutting-edge technology.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-gray-100 dark:border-gray-700 group-hover:border-blue-500 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                  {member.role}
                </p>
                <motion.a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {language === 'hi' ? 'संपर्क करें' : 'Contact'}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
