import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import { useTranslation } from '../../hooks';

interface StageJudgeProps {
  translation: string;
  onAddPoints: (points: number) => void;
  onAdvanceRound: () => void;
}

const StageJudge: React.FC<StageJudgeProps> = ({ translation, onAddPoints, onAdvanceRound }) => {
  const { t, isRTL } = useTranslation();

  return (
    <motion.div 
      key="judge" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="py-6 sm:py-10 max-w-2xl mx-auto space-y-6 sm:space-y-10 text-center px-2"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-white p-5 sm:p-14 rounded-[2rem] sm:rounded-[4rem] shadow-2xl border border-slate-100">
        <p className="text-xl sm:text-4xl font-black text-indigo-950 mb-6 sm:mb-14 leading-tight italic px-2 sm:px-4">"{translation}"</p>
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          <button 
            onClick={() => onAddPoints(10)} 
            className="p-4 sm:p-10 bg-emerald-50 rounded-xl sm:rounded-[3rem] border-2 sm:border-4 border-transparent hover:border-emerald-500 transition-all active:scale-95 group"
          >
            <CheckCircle className="mx-auto text-emerald-500 mb-2 sm:mb-4 group-hover:scale-110 transition-transform" size={28} />
            <span className="font-black text-[10px] sm:text-xs uppercase text-emerald-800">{t('theoryMatch')}</span>
          </button>
          <button 
            onClick={() => onAddPoints(5)} 
            className="p-4 sm:p-10 bg-amber-50 rounded-xl sm:rounded-[3rem] border-2 sm:border-4 border-transparent hover:border-amber-500 transition-all active:scale-95 group"
          >
            <Sparkles className="mx-auto text-amber-500 mb-2 sm:mb-4 group-hover:scale-110 transition-transform" size={28} />
            <span className="font-black text-[10px] sm:text-xs uppercase text-amber-800">{t('creativeShift')}</span>
          </button>
        </div>
        <button 
          onClick={onAdvanceRound} 
          className="w-full bg-indigo-600 text-white py-4 sm:py-7 rounded-xl sm:rounded-[2rem] font-black text-lg sm:text-2xl mt-6 sm:mt-12 shadow-xl hover:bg-indigo-700 transition-colors"
        >
          {t('nextRound')}
        </button>
      </div>
    </motion.div>
  );
};

export default StageJudge;

