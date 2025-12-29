import React from 'react';
import { useLanguage } from '../hooks/useTranslation';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-slate-100 hover:border-indigo-500 transition-all shadow-sm"
      title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <span className={`text-sm font-black ${language === 'en' ? 'text-indigo-600' : 'text-slate-400'}`}>
        EN
      </span>
      <div className="w-8 h-5 bg-slate-100 rounded-full relative">
        <div 
          className={`absolute top-0.5 w-4 h-4 bg-indigo-600 rounded-full transition-all duration-300 ${
            language === 'ar' ? 'left-3.5' : 'left-0.5'
          }`}
        />
      </div>
      <span className={`text-sm font-black ${language === 'ar' ? 'text-indigo-600' : 'text-slate-400'}`}>
        عر
      </span>
    </button>
  );
};

export default LanguageToggle;
