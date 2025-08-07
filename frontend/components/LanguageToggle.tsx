import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <Globe size={16} />
        <span className="text-sm font-medium">
          {language === 'en' ? 'EN' : 'हि'}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;
