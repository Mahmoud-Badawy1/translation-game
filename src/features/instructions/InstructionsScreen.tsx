import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { ActiveGame } from '../../types';
import { playSound, SOUNDS } from '../../hooks/useSound';
import { useTranslation } from '../../hooks';

interface InstructionsScreenProps {
  activeGame: ActiveGame;
  onContinue: () => void;
}

const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ activeGame, onContinue }) => {
  const { t, isRTL } = useTranslation();

  const handleContinue = () => {
    playSound(SOUNDS.CLICK);
    onContinue();
  };

  return (
    <motion.div 
      key="instructions" 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0 }} 
      className="py-4 sm:py-6 max-w-2xl mx-auto space-y-6 sm:space-y-8 px-2"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-white p-5 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-slate-50 text-center space-y-6 sm:space-y-10">
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-amber-50 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto text-amber-500 shadow-sm">
          <BookOpen size={28} className="sm:hidden" />
          <BookOpen size={40} className="hidden sm:block" />
        </div>
        <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter">
          {t('howToPlay')}: {activeGame === 'TRANSLATOR' ? t('theoryArena') : t('termRace')}
        </h2>
        <div className="space-y-3 sm:space-y-4 text-left">
          {activeGame === 'TRANSLATOR' ? (
            <>
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0">1</div>
                <p className="text-xs sm:text-sm font-bold text-slate-700">{t('theoryStep1')}</p>
              </div>
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0">2</div>
                <p className="text-xs sm:text-sm font-bold text-slate-700">{t('theoryStep2')}</p>
              </div>
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0">3</div>
                <p className="text-xs sm:text-sm font-bold text-slate-700">{t('theoryStep3')}</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0">1</div>
                <p className="text-xs sm:text-sm font-bold text-slate-700">{t('termStep1')}</p>
              </div>
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0">2</div>
                <p className="text-xs sm:text-sm font-bold text-slate-700">{t('termStep2')}</p>
              </div>
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0">3</div>
                <p className="text-xs sm:text-sm font-bold text-slate-700">{t('termStep3')}</p>
              </div>
            </>
          )}
        </div>
        <button 
          onClick={handleContinue}
          className="w-full bg-slate-900 text-white py-4 sm:py-6 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:bg-black transition-all shadow-xl"
        >
          {t('startSession')}
        </button>
      </div>
    </motion.div>
  );
};

export default InstructionsScreen;

