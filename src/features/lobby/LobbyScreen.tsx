import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Zap, ArrowRight } from 'lucide-react';
import { ActiveGame } from '../../../types';
import { playSound, SOUNDS } from '../../hooks/useSound';
import { useTranslation } from '../../hooks';

interface LobbyScreenProps {
  onSelectGame: (game: ActiveGame) => void;
}

const LobbyScreen: React.FC<LobbyScreenProps> = ({ onSelectGame }) => {
  const { t, isRTL } = useTranslation();

  const handleSelectGame = (game: ActiveGame) => {
    playSound(SOUNDS.CLICK);
    onSelectGame(game);
  };

  return (
    <motion.div 
      key="lobby" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }} 
      className="space-y-12 py-10"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-none">{t('theAcademy')}</h2>
        <p className="text-slate-500 text-sm sm:text-lg font-medium max-w-md mx-auto">{t('lobbySubtitle')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* <motion.button 
          whileHover={{ y: -5 }} 
          onClick={() => handleSelectGame('TRANSLATOR')}
          className="group bg-white p-10 rounded-[3rem] shadow-2xl border-2 border-transparent hover:border-indigo-500 transition-all text-left flex flex-col h-full"
        >
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
            <Edit2 size={32} />
          </div>
          <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">{t('theoryArena')}</h3>
          <p className="text-slate-500 text-sm leading-relaxed flex-grow">{t('theoryArenaDesc')}</p>
          <div className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest">{t('enterArena')} <ArrowRight size={16} /></div>
        </motion.button> */}
        <motion.button 
          whileHover={{ y: -5 }} 
          onClick={() => handleSelectGame('TERM_HUNTER')}
          className="group bg-white p-10 rounded-[3rem] shadow-2xl border-2 border-transparent hover:border-rose-500 transition-all text-left flex flex-col h-full"
        >
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
            <Zap size={32} />
          </div>
          <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">{t('termRace')}</h3>
          <p className="text-slate-500 text-sm leading-relaxed flex-grow">{t('termRaceDesc')}</p>
          <div className="mt-8 flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-widest">{t('startRace')} <ArrowRight size={16} /></div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LobbyScreen;
