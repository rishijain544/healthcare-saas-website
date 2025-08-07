import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    'nav.bookDemo': 'Book a Demo',

    // Hero Section
    'hero.title': 'Smarter Healthcare, Simplified',
    'hero.subtitle': 'Automate billing, AI appointment booking, ERP tools, and more with our comprehensive healthcare management platform.',
    'hero.getStarted': 'Get Started',
    'hero.bookDemo': 'Book a Demo',
    'hero.badge': 'AI-Powered Healthcare Platform',

    // Features
    'features.title': 'Our Key Features',
    'features.subtitle': 'Discover how our AI-powered platform transforms healthcare operations with cutting-edge technology and intuitive design.',
    'features.billingAutomation': 'Billing Automation',
    'features.billingDesc': 'Streamline your billing process with AI-powered automation that reduces errors and saves time.',
    'features.aiAgent': 'AI Talking Agent',
    'features.aiAgentDesc': 'Intelligent virtual assistant that handles patient inquiries and appointment scheduling 24/7.',
    'features.bilingual': 'Bilingual Interface',
    'features.bilingualDesc': 'Support multiple languages to serve diverse patient populations effectively.',
    'features.erp': 'ERP Modules',
    'features.erpDesc': 'Comprehensive enterprise resource planning tools designed specifically for healthcare.',
    'features.priceComparison': 'Price Comparison',
    'features.priceComparisonDesc': 'Compare treatment costs and help patients make informed financial decisions.',
    'features.gpsRatings': 'GPS-based Hospital Ratings',
    'features.gpsRatingsDesc': 'Location-based hospital ratings and reviews to help patients find the best care nearby.',

    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.user': 'User Dashboard',
    'dashboard.doctor': 'Doctor Dashboard',
    'dashboard.admin': 'Admin Dashboard',
    'dashboard.bookings': 'Bookings',
    'dashboard.appointments': 'Appointments',
    'dashboard.patients': 'Patients',
    'dashboard.billing': 'Billing',
    'dashboard.analytics': 'Analytics',
    'dashboard.settings': 'Settings',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.print': 'Print',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.submit': 'Submit',
    'common.reset': 'Reset',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.continue': 'Continue',
    'common.finish': 'Finish',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.features': 'सुविधाएं',
    'nav.pricing': 'मूल्य निर्धारण',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    'nav.login': 'लॉगिन',
    'nav.signup': 'साइन अप',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.logout': 'लॉगआउट',
    'nav.bookDemo': 'डेमो बुक करें',

    // Hero Section
    'hero.title': 'स्मार्ट स्वास्थ्य सेवा, सरल',
    'hero.subtitle': 'हमारे व्यापक स्वास्थ्य प्रबंधन प्लेटफॉर्म के साथ बिलिंग, AI अपॉइंटमेंट बुकिंग, ERP टूल्स और बहुत कुछ स्वचालित करें।',
    'hero.getStarted': 'शुरू करें',
    'hero.bookDemo': 'डेमो बुक करें',
    'hero.badge': 'AI-संचालित स्वास्थ्य प्लेटफॉर्म',

    // Features
    'features.title': 'हमारी मुख्य विशेषताएं',
    'features.subtitle': 'जानें कि कैसे हमारा AI-संचालित प्लेटफॉर्म अत्याधुनिक तकनीक और सहज डिज़ाइन के साथ स्वास्थ्य संचालन को बदल देता है।',
    'features.billingAutomation': 'बिलिंग स्वचालन',
    'features.billingDesc': 'AI-संचालित स्वचालन के साथ अपनी बिलिंग प्रक्रिया को सुव्यवस्थित करें जो त्रुटियों को कम करता है और समय बचाता है।',
    'features.aiAgent': 'AI बात करने वाला एजेंट',
    'features.aiAgentDesc': 'बुद्धिमान वर्चुअल असिस्टेंट जो 24/7 रोगी पूछताछ और अपॉइंटमेंट शेड्यूलिंग को संभालता है।',
    'features.bilingual': 'द्विभाषी इंटरफेस',
    'features.bilingualDesc': 'विविध रोगी आबादी की प्रभावी रूप से सेवा करने के लिए कई भाषाओं का समर्थन करें।',
    'features.erp': 'ERP मॉड्यूल',
    'features.erpDesc': 'स्वास्थ्य सेवा के लिए विशेष रूप से डिज़ाइन किए गए व्यापक उद्यम संसाधन योजना उपकरण।',
    'features.priceComparison': 'मूल्य तुलना',
    'features.priceComparisonDesc': 'उपचार लागतों की तुलना करें और रोगियों को सूचित वित्तीय निर्णय लेने में मदद करें।',
    'features.gpsRatings': 'GPS-आधारित अस्पताल रेटिंग',
    'features.gpsRatingsDesc': 'स्थान-आधारित अस्पताल रेटिंग और समीक्षाएं रोगियों को पास में सबसे अच्छी देखभाल खोजने में मदद करती हैं।',

    // Dashboard
    'dashboard.welcome': 'स्वागत है',
    'dashboard.user': 'उपयोगकर्ता डैशबोर्ड',
    'dashboard.doctor': 'डॉक्टर डैशबोर्ड',
    'dashboard.admin': 'एडमिन डैशबोर्ड',
    'dashboard.bookings': 'बुकिंग',
    'dashboard.appointments': 'अपॉइंटमेंट',
    'dashboard.patients': 'मरीज़',
    'dashboard.billing': 'बिलिंग',
    'dashboard.analytics': 'एनालिटिक्स',
    'dashboard.settings': 'सेटिंग्स',

    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.view': 'देखें',
    'common.search': 'खोजें',
    'common.filter': 'फिल्टर',
    'common.sort': 'क्रमबद्ध करें',
    'common.export': 'निर्यात',
    'common.import': 'आयात',
    'common.print': 'प्रिंट',
    'common.download': 'डाउनलोड',
    'common.upload': 'अपलोड',
    'common.submit': 'जमा करें',
    'common.reset': 'रीसेट',
    'common.close': 'बंद करें',
    'common.open': 'खोलें',
    'common.yes': 'हां',
    'common.no': 'नहीं',
    'common.ok': 'ठीक है',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.continue': 'जारी रखें',
    'common.finish': 'समाप्त',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
