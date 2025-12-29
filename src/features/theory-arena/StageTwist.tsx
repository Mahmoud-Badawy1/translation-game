import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { Card } from '../../types';
import { useTranslation } from '../../hooks';

interface StageTwistProps {
  currentTwist: Card;
  onContinue: () => void;
}

const StageTwist: React.FC<StageTwistProps> = ({ currentTwist, onContinue }) => {
  const { t, isRTL } = useTranslation();

  return (
    <motion.div 
      key="twist" 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="py-10 sm:py-20 text-center max-w-xl mx-auto space-y-8 sm:space-y-12 px-2"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-rose-50 p-6 sm:p-14 rounded-[2rem] sm:rounded-[4rem] border-4 sm:border-8 border-rose-100 shadow-2xl space-y-4 sm:space-y-8">
        <ShieldAlert size={40} className="mx-auto text-rose-600 animate-pulse sm:hidden" />
        <ShieldAlert size={60} className="mx-auto text-rose-600 animate-pulse hidden sm:block" />
        <h2 className="text-xl sm:text-3xl font-black text-rose-700 uppercase tracking-tighter">{t('constraintTwist')}</h2>
        <div className="text-2xl sm:text-6xl font-black text-rose-950 tracking-tighter italic leading-tight underline decoration-rose-300 px-2 sm:px-4">
          "{currentTwist?.content}"
        </div>
        <p className="text-xs sm:text-sm font-bold text-rose-600 max-w-xs mx-auto uppercase leading-relaxed">
          {t('twistQuestion')}
        </p>
      </div>
      <button 
        onClick={onContinue} 
        className="w-full bg-slate-900 text-white py-5 sm:py-7 rounded-xl sm:rounded-[2.5rem] font-black text-lg sm:text-2xl hover:bg-black shadow-xl"
      >
        {t('continueToScore')}
      </button>
    </motion.div>
  );
};

export default StageTwist;

