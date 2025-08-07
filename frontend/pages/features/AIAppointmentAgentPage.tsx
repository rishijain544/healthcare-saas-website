import React, { useState } from 'react';
import { Bot, MessageCircle, Phone, Globe, Mic, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { apiClient } from '../../lib/api';
import Button from '../../components/ui/Button';

const AIAppointmentAgentPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'bot',
      message: language === 'hi' 
        ? 'नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। मैं आपकी अपॉइंटमेंट बुक करने में मदद कर सकता हूं।'
        : 'Hello! I\'m your AI health assistant. I can help you book appointments and answer health questions.',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      type: 'user',
      message: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const response = await apiClient.chatWithAI(currentMessage, selectedLanguage);
      
      setTimeout(() => {
        const botMessage = {
          type: 'bot',
          message: response.response,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      setIsTyping(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
    setLanguage(newLanguage);
    
    const welcomeMessage = newLanguage === 'hi'
      ? 'नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। मैं आपकी अपॉइंटमेंट बुक करने में मदद कर सकता हूं।'
      : 'Hello! I\'m your AI health assistant. I can help you book appointments and answer health questions.';
    
    setChatMessages([{
      type: 'bot',
      message: welcomeMessage,
      timestamp: new Date()
    }]);
  };

  const quickQuestions = language === 'hi' ? [
    'अपॉइंटमेंट बुक करें',
    'डॉक्टर की उपलब्धता',
    'मेरी दवाइयां',
    'स्वास्थ्य सुझाव'
  ] : [
    'Book an appointment',
    'Doctor availability',
    'My medications',
    'Health tips'
  ];

  const features = [
    {
      icon: MessageCircle,
      title: language === 'hi' ? '24/7 चैट सपोर्ट' : '24/7 Chat Support',
      description: language === 'hi' 
        ? 'किसी भी समय अपने स्वास्थ्य प्रश्नों के लिए AI असिस्टेंट से बात करें।'
        : 'Chat with our AI assistant anytime for your health questions and appointment needs.',
    },
    {
      icon: Phone,
      title: language === 'hi' ? 'वॉयस कॉल्स' : 'Voice Calls',
      description: language === 'hi'
        ? 'AI एजेंट के साथ वॉयस कॉल करें और प्राकृतिक बातचीत का अनुभव लें।'
        : 'Make voice calls with our AI agent for a more natural conversation experience.',
    },
    {
      icon: Globe,
      title: language === 'hi' ? 'द्विभाषी सहायता' : 'Bilingual Support',
      description: language === 'hi'
        ? 'हिंदी और अंग्रेजी दोनों भाषाओं में सहायता प्राप्त करें।'
        : 'Get support in both Hindi and English for better communication.',
    },
    {
      icon: Bot,
      title: language === 'hi' ? 'स्मार्ट बुकिंग' : 'Smart Booking',
      description: language === 'hi'
        ? 'AI आपकी प्राथमिकताओं के आधार पर सबसे अच्छा अपॉइंटमेंट समय सुझाता है।'
        : 'AI suggests the best appointment times based on your preferences and availability.',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
                <Bot className="w-4 h-4 mr-2" />
                {language === 'hi' ? 'AI अपॉइंटमेंट एजेंट' : 'AI Appointment Agent'}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'hi' ? (
                  <>
                    AI के साथ
                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      अपॉइंटमेंट बुक करें
                    </span>
                  </>
                ) : (
                  <>
                    Book Appointments
                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      with AI
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {language === 'hi' 
                  ? 'हमारे AI एजेंट के साथ आसानी से अपॉइंटमेंट बुक करें। 24/7 उपलब्ध, द्विभाषी सहायता के साथ।'
                  : 'Easily book appointments with our AI agent. Available 24/7 with bilingual support for seamless communication.'
                }
              </p>
              
              {/* Language Toggle */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {language === 'hi' ? 'भाषा:' : 'Language:'}
                </span>
                <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedLanguage === 'en'
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('hi')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedLanguage === 'hi'
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    हिंदी
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {language === 'hi' ? 'चैट शुरू करें' : 'Start Chat'}
                </Button>
                <Button variant="outline" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  {language === 'hi' ? 'कॉल करें' : 'Make Call'}
                </Button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {language === 'hi' ? 'AI स्वास्थ्य सहायक' : 'AI Health Assistant'}
                      </h3>
                      <p className="text-blue-100 text-sm">
                        {language === 'hi' ? 'ऑनलाइन' : 'Online'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          msg.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Questions */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMessage(question)}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={language === 'hi' ? 'अपना संदेश टाइप करें...' : 'Type your message...'}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!currentMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'hi' ? 'AI एजेंट की विशेषताएं' : 'AI Agent Features'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'hi'
                ? 'हमारा AI एजेंट आपको बेहतरीन स्वास्थ्य सेवा अनुभव प्रदान करने के लिए डिज़ाइन किया गया है।'
                : 'Our AI agent is designed to provide you with the best healthcare experience possible.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'hi' ? 'बातचीत शुरू करें' : 'Start Conversation'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'hi'
                  ? 'AI एजेंट के साथ चैट या कॉल करके अपनी जरूरतें बताएं।'
                  : 'Chat or call with our AI agent to describe your healthcare needs.'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'hi' ? 'विकल्प प्राप्त करें' : 'Get Options'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'hi'
                  ? 'AI आपके लिए उपलब्ध डॉक्टर और समय के विकल्प सुझाएगा।'
                  : 'AI will suggest available doctors and appointment times for you.'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'hi' ? 'पुष्टि करें' : 'Confirm Booking'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'hi'
                  ? 'अपना पसंदीदा समय चुनें और अपॉइंटमेंट की पुष्टि करें।'
                  : 'Choose your preferred time and confirm your appointment booking.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {language === 'hi' ? 'आज ही AI एजेंट आज़माएं' : 'Try Our AI Agent Today'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {language === 'hi'
              ? 'हजारों मरीज़ों का भरोसा। आसान अपॉइंटमेंट बुकिंग के लिए हमारे AI एजेंट से बात करें।'
              : 'Trusted by thousands of patients. Experience easy appointment booking with our AI agent.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <MessageCircle className="w-5 h-5 mr-2" />
              {language === 'hi' ? 'चैट शुरू करें' : 'Start Chat'}
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Phone className="w-5 h-5 mr-2" />
              {language === 'hi' ? 'कॉल करें' : 'Make Call'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIAppointmentAgentPage;
