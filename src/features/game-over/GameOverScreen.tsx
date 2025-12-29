import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock } from 'lucide-react';
import { Player, UserRole } from '../../types';
import { Leaderboard } from '../../components';
import { playSound, SOUNDS } from '../../hooks/useSound';
import { useTranslation } from '../../hooks';

interface GameOverScreenProps {
  allParticipants: Player[];
  userRole: UserRole | null;
  isLocalMode: boolean;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  allParticipants, 
  userRole, 
  isLocalMode, 
  onRestart 
}) => {
  const { t, isRTL } = useTranslation();
  const winner = allParticipants[0];
  const isDraw = allParticipants.length > 1 && allParticipants[0].score === allParticipants[1].score;
  
  // Show restart button only to HOST or in local mode
  const canRestart = isLocalMode || userRole === 'HOST';

  const handleRestart = () => {
    playSound(SOUNDS.CLICK);
    onRestart();
  };

  return (
    <motion.div 
      key="over" 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      className="py-10 sm:py-20 space-y-8 sm:space-y-12 px-2"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-white p-8 sm:p-16 lg:p-20 rounded-[2rem] sm:rounded-[4rem] lg:rounded-[6rem] shadow-2xl border-2 sm:border-4 border-indigo-50 relative max-w-xl mx-auto text-center">
        <div className="absolute -top-8 sm:-top-14 left-1/2 -translate-x-1/2 bg-amber-400 p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] shadow-2xl rotate-12">
          <Trophy size={40} className="text-white sm:hidden" />
          <Trophy size={80} className="text-white hidden sm:block" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-black mb-2 sm:mb-4 mt-6 sm:mt-10 uppercase tracking-tighter">{t('arenaComplete')}</h2>
        <div className="space-y-4 sm:space-y-6 my-6 sm:my-10">
          <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('sessionChampion')}</div>
          <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-indigo-600 tracking-tighter uppercase underline decoration-indigo-100 break-words">
            {isDraw ? t('drawMatch') : winner?.name}
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-800">{t('finalScore')}: {winner?.score || 0}</div>
        </div>
        
        {canRestart ? (
          <button 
            onClick={handleRestart} 
            className="w-full bg-slate-900 text-white py-5 sm:py-7 rounded-2xl sm:rounded-[2.5rem] font-black text-lg sm:text-2xl hover:scale-105 transition-all shadow-2xl"
          >
            {t('newGame')}
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3 bg-slate-100 text-slate-600 py-5 sm:py-7 rounded-2xl sm:rounded-[2.5rem] font-black text-sm sm:text-lg">
            <Clock size={20} className="animate-pulse" />
            <span>{t('waitingForHost')}</span>
          </div>
        )}
      </div>
      <div className="flex justify-center px-2 sm:px-4">
        <Leaderboard players={allParticipants} />
      </div>
    </motion.div>
  );
};

export default GameOverScreen;

