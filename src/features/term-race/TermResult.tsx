import React from 'react';
import { motion } from 'framer-motion';
import { Term } from '../../types';
import { useTranslation } from '../../hooks';

interface TermResultProps {
  currentTerm: Term;
  onAdvanceRound: () => void;
}

const TermResult: React.FC<TermResultProps> = ({ currentTerm, onAdvanceRound }) => {
  const { t, isRTL } = useTranslation();

  return (
    <motion.div 
      key="term-res" 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      className="py-10 sm:py-20 text-center max-w-2xl mx-auto space-y-6 sm:space-y-10 px-2"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-white p-6 sm:p-16 rounded-[2rem] sm:rounded-[5rem] shadow-2xl border border-slate-100 space-y-6 sm:space-y-10">
        <div className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('correctAnswer')}</div>
        <div className="text-3xl sm:text-7xl font-black text-indigo-600 uppercase tracking-tighter drop-shadow-sm break-words">{currentTerm?.term}</div>
        <div className="bg-slate-50 p-4 sm:p-8 rounded-xl sm:rounded-[2rem] text-left border border-slate-100">
          <p className="text-sm sm:text-xl font-bold italic text-slate-600 leading-relaxed">{t('example')}: "{currentTerm?.example}"</p>
        </div>
        <button 
          onClick={onAdvanceRound} 
          className="w-full bg-slate-900 text-white py-4 sm:py-7 rounded-xl sm:rounded-[2rem] font-black text-lg sm:text-2xl shadow-xl hover:bg-black transition-all"
        >
          {t('continue')}
        </button>
      </div>
    </motion.div>
  );
};

export default TermResult;

