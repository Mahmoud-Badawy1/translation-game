import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Laptop } from 'lucide-react';
import { playSound, SOUNDS } from '../../hooks/useSound';
import { useTranslation } from '../../hooks';

interface ModeSelectScreenProps {
  onSelectLocalMode: (isLocal: boolean) => void;
}

const ModeSelectScreen: React.FC<ModeSelectScreenProps> = ({ onSelectLocalMode }) => {
  const { t, isRTL } = useTranslation();

  const handleSelect = (isLocal: boolean) => {
    playSound(SOUNDS.CLICK);
    onSelectLocalMode(isLocal);
  };

  return (
    <motion.div 
      key="modes" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="py-20 max-w-sm mx-auto text-center space-y-10"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <h2 className="text-3xl font-black uppercase tracking-tighter">{t('chooseMode')}</h2>
      <div className="space-y-4">
        <button 
          onClick={() => handleSelect(false)} 
          className="w-full bg-white p-8 rounded-[2rem] border-2 border-slate-100 hover:border-indigo-600 flex items-center gap-5 transition-all shadow-lg group"
        >
          <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Wifi size={28} />
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className="font-black uppercase text-sm">{t('onlineArena')}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('connectWithOthers')}</div>
          </div>
        </button>
        <button 
          onClick={() => handleSelect(true)} 
          className="w-full bg-white p-8 rounded-[2rem] border-2 border-slate-100 hover:border-rose-600 flex items-center gap-5 transition-all shadow-lg group"
        >
          <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
            <Laptop size={28} />
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className="font-black uppercase text-sm">{t('localParty')}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('shareDevice')}</div>
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default ModeSelectScreen;
