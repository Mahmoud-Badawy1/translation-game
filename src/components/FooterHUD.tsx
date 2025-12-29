import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '../../types';
import { useTranslation } from '../hooks';

interface FooterHUDProps {
  isLocalMode: boolean;
  currentPlayer: Player | null;
  playerName: string;
  score: number;
  localPlayers: Player[];
  peers: Player[];
}

const FooterHUD: React.FC<FooterHUDProps> = ({
  isLocalMode,
  currentPlayer,
  playerName,
  score,
  localPlayers,
  peers
}) => {
  const { t, isRTL } = useTranslation();
  const displayName = isLocalMode ? currentPlayer?.name : playerName;
  const displayScore = isLocalMode ? currentPlayer?.score : score;
  const participants = isLocalMode ? localPlayers : peers;
  const showParticipants = isLocalMode ? localPlayers.length > 1 : peers.length > 0;

  return (
    <motion.div 
      initial={{ y: 100 }} 
      animate={{ y: 0 }} 
      className="fixed bottom-2 sm:bottom-4 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bg-white/70 sm:bg-white/95 backdrop-blur-lg sm:backdrop-blur-xl px-3 sm:px-8 py-2 sm:py-4 rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-2xl border border-slate-100/50 sm:border-slate-100 flex items-center justify-between sm:justify-start gap-3 sm:gap-8 z-[110]"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Player Info - Compact on mobile */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <div className="w-7 h-7 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-[10px] sm:text-sm shrink-0">
          {displayName?.[0] || '?'}
        </div>
        <div className="min-w-0 hidden sm:block">
          <span className="font-black text-[10px] uppercase text-slate-400 block tracking-widest leading-none mb-1">{t('activePlayer')}</span>
          <span className="font-black text-xs uppercase text-slate-800 truncate block max-w-[100px]">
            {displayName}
          </span>
        </div>
        {/* Mobile: Just show name, no label */}
        <span className="font-black text-[10px] uppercase text-slate-700 truncate block max-w-[50px] sm:hidden">
          {displayName}
        </span>
      </div>

      <div className="w-px h-5 sm:h-8 bg-slate-200/50 sm:bg-slate-200 shrink-0" />

      {/* Score - Compact on mobile */}
      <div className="flex items-center gap-2 sm:gap-6">
        <div className="flex items-center sm:block gap-1.5">
          <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest sm:block leading-none sm:mb-1">{t('score')}:</span>
          <span className="text-base sm:text-xl font-black text-indigo-600 sm:block leading-none">
            {displayScore}
          </span>
        </div>

        {/* Participants - hidden on mobile */}
        {showParticipants && (
          <div className="hidden sm:flex items-center gap-4 border-l pl-6 border-slate-100">
            <div className="flex -space-x-2">
              {participants.slice(0, 3).map(p => (
                <div key={p.id} className="w-7 h-7 bg-indigo-50 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-indigo-500 shadow-sm">
                  {p.name[0]}
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase whitespace-nowrap">
              {isLocalMode ? `${localPlayers.length} ${t('local')}` : `${peers.length} ${t('live')}`}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FooterHUD;


