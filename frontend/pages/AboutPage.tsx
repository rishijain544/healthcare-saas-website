import React from 'react';
import { Users, Target, Award, Heart, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage = () => {
  const { language } = useLanguage();

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: language === 'hi' ? 'CEO और सह-संस्थापक' : 'CEO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      bio: language === 'hi' 
        ? 'स्वास्थ्य प्रौद्योगिकी में 15+ वर्षों के अनुभव के साथ पूर्व मुख्य चिकित्सा अधिकारी।'
        : 'Former Chief Medical Officer with 15+ years in healthcare technology.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@healthai.com'
      }
    },
    {
      name: 'Michael Chen',
      role: language === 'hi' ? 'CTO और सह-संस्थापक' : 'CTO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      bio: language === 'hi'
        ? 'AI शोधकर्ता और पूर्व Google इंजीनियर जो स्वास्थ्य अनुप्रयोगों में विशेषज्ञता रखते हैं।'
        : 'AI researcher and former Google engineer specializing in healthcare applications.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'michael@healthai.com'
      }
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: language === 'hi' ? 'मुख्य चिकित्सा सलाहकार' : 'Chief Medical Advisor',
      image: 'https://images.unsplash.com/photo-1594824475317-d0b8e8b5e8e5?w=300&h=300&fit=crop&crop=face',
      bio: language === 'hi'
        ? '20+ वर्षों के अनुभव के साथ प्रैक्टिसिंग चिकित्सक और स्वास्थ्य नवाचार विशेषज्ञ।'
        : 'Practicing physician and healthcare innovation expert with 20+ years experience.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'emily@healthai.com'
      }
    },
    {
      name: 'James Wilson',
      role: language === 'hi' ? 'इंजीनियरिंग के VP' : 'VP of Engineering',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: language === 'hi'
        ? 'स्केलेबल स्वास्थ्य सिस्टम में विशेषज्ञता के साथ फुल-स्टैक इंजीनियर।'
        : 'Full-stack engineer with expertise in scalable healthcare systems.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'james@healthai.com'
      }
    },
    {
      name: 'Lisa Park',
      role: language === 'hi' ? 'उत्पाद प्रमुख' : 'Head of Product',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
      bio: language === 'hi'
        ? 'स्वास्थ्य प्रौद्योगिकी में उपयोगकर्ता अनुभव पर केंद्रित उत्पाद रणनीतिकार।'
        : 'Product strategist focused on user experience in healthcare technology.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'lisa@healthai.com'
      }
    },
  ];

  const values = [
    {
      icon: Heart,
      title: language === 'hi' ? 'रोगी-केंद्रित' : 'Patient-Centric',
      description: language === 'hi' 
        ? 'हमारी हर सुविधा रोगी के परिणामों और अनुभवों को बेहतर बनाने के लिए डिज़ाइन की गई है।'
        : 'Every feature we build is designed to improve patient outcomes and experiences.',
    },
    {
      icon: Target,
      title: language === 'hi' ? 'नवाचार' : 'Innovation',
      description: language === 'hi'
        ? 'हम लगातार स्वास्थ्य प्रौद्योगिकी में संभावनाओं की सीमाओं को आगे बढ़ाते हैं।'
        : 'We continuously push the boundaries of what\'s possible in healthcare technology.',
    },
    {
      icon: Users,
      title: language === 'hi' ? 'सहयोग' : 'Collaboration',
      description: language === 'hi'
        ? 'हम बेहतर समाधान बनाने के लिए स्वास्थ्य पेशेवरों के साथ मिलकर काम करने में विश्वास करते हैं।'
        : 'We believe in working together with healthcare professionals to create better solutions.',
    },
    {
      icon: Award,
      title: language === 'hi' ? 'उत्कृष्टता' : 'Excellence',
      description: language === 'hi'
        ? 'हम उत्पाद की गुणवत्ता से लेकर ग्राहक सेवा तक, हर काम में उत्कृष्टता के लिए प्रयास करते हैं।'
        : 'We strive for excellence in everything we do, from product quality to customer service.',
    },
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
                  नवाचार के माध्यम से
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    स्वास्थ्य सेवा को बदलना
                  </span>
                </>
              ) : (
                <>
                  Transforming Healthcare
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Through Innovation
                  </span>
                </>
              )}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'hi'
                ? 'हमारा मिशन कृत्रिम बुद्धिमत्ता और आधुनिक तकनीक की शक्ति के माध्यम से स्वास्थ्य सेवा को अधिक कुशल, सुलभ और रोगी-केंद्रित बनाना है।'
                : 'We\'re on a mission to make healthcare more efficient, accessible, and patient-focused through the power of artificial intelligence and modern technology.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {language === 'hi' ? 'हमारा दृष्टिकोण' : 'Our Vision'}
              </h2>
              <div className="space-y-6">
                <motion.div 
                  className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === 'hi' ? 'भविष्य की स्वास्थ्य सेवा' : 'Future of Healthcare'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {language === 'hi'
                      ? 'एक ऐसी दुनिया जहां स्वास्थ्य सुविधाएं निर्बाध रूप से संचालित होती हैं, रोगियों को असाधारण देखभाल मिलती है, और चिकित्सा पेशेवर कागजी कार्रवाई के बजाय उपचार पर अपना समय समर्पित कर सकते हैं।'
                      : 'A world where healthcare facilities operate seamlessly, patients receive exceptional care, and medical professionals can dedicate their time to healing rather than paperwork.'
                    }
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {language === 'hi'
                      ? 'हम AI और स्वचालन के माध्यम से स्वास्थ्य सेवा में क्रांति लाने के लिए प्रतिबद्ध हैं, जिससे प्रदाताओं को बेहतर परिणाम देने और रोगियों को बेहतर अनुभव प्रदान करने में मदद मिलती है।'
                      : 'We are committed to revolutionizing healthcare through AI and automation, enabling providers to deliver better outcomes and patients to receive superior experiences.'
                    }
                  </p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <div className="grid grid-cols-2 gap-8">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-4xl font-bold mb-2">500+</div>
                    <div className="text-blue-100">
                      {language === 'hi' ? 'स्वास्थ्य सुविधाएं' : 'Healthcare Facilities'}
                    </div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-4xl font-bold mb-2">1M+</div>
                    <div className="text-blue-100">
                      {language === 'hi' ? 'रोगियों की सेवा' : 'Patients Served'}
                    </div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-4xl font-bold mb-2">99.9%</div>
                    <div className="text-blue-100">
                      {language === 'hi' ? 'अपटाइम' : 'Uptime'}
                    </div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div className="text-blue-100">
                      {language === 'hi' ? 'सहायता' : 'Support'}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'hi' ? 'हमारे मूल्य' : 'Our Values'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'hi'
                ? 'वे सिद्धांत जो हमारे हर काम और हर निर्णय का मार्गदर्शन करते हैं।'
                : 'The principles that guide everything we do and every decision we make.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl mb-6 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <value.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
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
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Hover Background Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <div className="relative z-10 text-center">
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
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <motion.a
                      href={member.social.linkedin}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin size={18} />
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter size={18} />
                    </motion.a>
                    <motion.a
                      href={`mailto:${member.social.email}`}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail size={18} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              {language === 'hi' ? 'हमारे मिशन में शामिल हों' : 'Join Our Mission'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {language === 'hi'
                ? 'चाहे आप एक स्वास्थ्य पेशेवर हों जो अपने संचालन को बदलना चाहते हैं या एक प्रतिभाशाली व्यक्ति हैं जो बदलाव लाना चाहते हैं, हम आपसे सुनना चाहेंगे।'
                : 'Whether you\'re a healthcare professional looking to transform your operations or a talented individual wanting to make a difference, we\'d love to hear from you.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 transform hover:-translate-y-1 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'hi' ? 'हमसे संपर्क करें' : 'Contact Us'}
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'hi' ? 'करियर देखें' : 'View Careers'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
