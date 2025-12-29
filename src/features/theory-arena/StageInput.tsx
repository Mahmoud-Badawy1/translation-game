import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../types';
import { useTranslation } from '../../hooks';

interface StageInputProps {
  currentMission: Card;
  translation: string;
  onTranslationChange: (value: string) => void;
  onSubmit: () => void;
}

const StageInput: React.FC<StageInputProps> = ({ 
  currentMission, 
  translation, 
  onTranslationChange, 
  onSubmit 
}) => {
  const { t, isRTL } = useTranslation();

  return (
    <motion.div 
      key="input" 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="py-6 sm:py-10 max-w-2xl mx-auto space-y-6 sm:space-y-8 px-2"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-white p-5 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-slate-50 relative">
        <div className="mb-6 sm:mb-10 text-center">
          <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{t('targetText')}</span>
          <p className="text-xl sm:text-3xl font-black text-slate-800 leading-tight italic">"{currentMission?.content}"</p>
        </div>
        <textarea 
          autoFocus 
          value={translation} 
          onChange={e => onTranslationChange(e.target.value)}
          placeholder={t('typeTranslation')}
          className="w-full h-32 sm:h-48 p-4 sm:p-8 bg-slate-50 border-2 sm:border-4 border-transparent focus:border-indigo-600 rounded-xl sm:rounded-[2rem] outline-none text-base sm:text-2xl font-bold transition-all shadow-inner resize-none"
        />
        <button 
          onClick={onSubmit} 
          className="w-full bg-indigo-600 text-white py-4 sm:py-6 rounded-xl sm:rounded-3xl font-black text-lg sm:text-2xl mt-4 sm:mt-8 shadow-xl hover:bg-indigo-700 transition-colors"
        >
          {t('submitStrategy')}
        </button>
      </div>
    </motion.div>
  );
};

export default StageInput;

