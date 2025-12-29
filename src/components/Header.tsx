import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '../../types';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from '../hooks';

interface HeaderProps {
  round: number;
  maxRounds: number;
  isLocalMode: boolean;
  currentPlayer: Player | null;
  score: number;
  boosterActive: boolean;
}

const Header: React.FC<HeaderProps> = ({
  round,
  maxRounds,
  isLocalMode,
  currentPlayer,
  score,
  boosterActive
}) => {
  const { t, isRTL } = useTranslation();
  const displayBooster = isLocalMode ? currentPlayer?.boosterActive : boosterActive;
  const displayScore = isLocalMode ? currentPlayer?.score : score;

  return (
    <div className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3 shadow-sm" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block mb-0.5">
            {isLocalMode ? `${t('turn')}: ${currentPlayer?.name}` : t('missionProgress')}
          </span>
          <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tighter">
            {round + 1} <span className="text-slate-300">/ {maxRounds}</span>
          </div>
        </div>
        <LanguageToggle />
        <div className={isRTL ? 'text-left' : 'text-right'}>
          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest block mb-0.5">{t('currentPoints')}</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tighter">
            {displayScore}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${displayBooster ? 'bg-orange-500' : 'bg-indigo-600'}`}
          initial={{ width: 0 }}
          animate={{ width: `${((round + 1) / maxRounds) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Header;
