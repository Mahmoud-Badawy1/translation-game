import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card } from '../../types';
import { Card3D } from '../../components';
import { useTranslation } from '../../hooks';

interface StageRevealProps {
  currentMission: Card;
  currentTool: Card;
  onContinue: () => void;
}

const StageReveal: React.FC<StageRevealProps> = ({ currentMission, currentTool, onContinue }) => {
  const { t, isRTL } = useTranslation();

  return (
    <motion.div 
      key="reveal" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-8 sm:space-y-12 py-6 sm:py-10 px-2"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center">
        <Card3D card={currentMission} isFlipped={true} />
        <Card3D card={currentTool} isFlipped={true} showGlossary />
      </div>
      <button 
        onClick={onContinue} 
        className="w-full max-w-lg mx-auto bg-slate-900 text-white py-4 sm:py-6 rounded-xl sm:rounded-[2rem] font-black text-lg sm:text-2xl flex items-center justify-center gap-3 sm:gap-4 shadow-2xl hover:bg-black transition-all"
      >
        {t('draftTranslation')} <ArrowRight size={20} className="sm:hidden" /><ArrowRight size={24} className="hidden sm:block" />
      </button>
    </motion.div>
  );
};

export default StageReveal;

