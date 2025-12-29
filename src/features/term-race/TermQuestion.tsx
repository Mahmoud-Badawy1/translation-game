import React from 'react';
import { motion } from 'framer-motion';
import { Term, Player } from '../../types';
import { useTranslation } from '../../hooks';

interface TermQuestionProps {
  currentTerm: Term;
  currentTermOptions: string[];
  boosterActive: boolean;
  isLocalMode: boolean;
  currentPlayer: Player | null;
  onAnswer: (selectedTerm: string, isCorrect: boolean) => void;
}

const TermQuestion: React.FC<TermQuestionProps> = ({
  currentTerm,
  currentTermOptions,
  boosterActive,
  isLocalMode,
  currentPlayer,
  onAnswer
}) => {
  const { t, isRTL } = useTranslation();
  const displayBooster = isLocalMode ? currentPlayer?.boosterActive : boosterActive;

  const handleAnswer = (opt: string) => {
    const isCorrect = opt === currentTerm.term;
    onAnswer(opt, isCorrect);
  };

  return (
    <motion.div 
      key="race" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="py-6 sm:py-10 space-y-6 sm:space-y-10 px-2"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-white p-6 sm:p-14 rounded-[2rem] sm:rounded-[4rem] shadow-2xl border-2 sm:border-4 border-indigo-50 text-center space-y-4 sm:space-y-8 relative overflow-hidden">
        {displayBooster && (
          <motion.div 
            initial={{ x: '-100%' }} 
            animate={{ x: '100%' }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent skew-x-12" 
          />
        )}
        <div className="flex justify-between items-center">
          <span className="text-[9px] sm:text-[10px] font-black text-slate-300 uppercase tracking-widest">{t('identifyTerm')}</span>
          {displayBooster && (
            <motion.div 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1.1 }} 
              transition={{ repeat: Infinity, repeatType: 'reverse' }} 
              className="bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase shadow-lg shadow-orange-200"
            >
              {t('booster')}
            </motion.div>
          )}
        </div>
        <p className="text-xl sm:text-4xl font-black text-slate-800 italic leading-tight px-2 sm:px-6">"{currentTerm?.definition}"</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        {currentTermOptions.map((opt, idx) => (
          <motion.button
            key={idx} 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(opt)}
            className="bg-white p-5 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border-2 sm:border-4 border-slate-50 hover:border-indigo-600 shadow-xl font-black text-lg sm:text-3xl text-slate-700 uppercase transition-all"
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TermQuestion;

