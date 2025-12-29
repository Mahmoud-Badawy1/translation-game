import React from 'react';
import { Sparkles, LogOut } from 'lucide-react';
import { playSound, SOUNDS } from '../hooks/useSound';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from '../hooks';

interface NavbarProps {
  showLogout: boolean;
  onRestart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ showLogout, onRestart }) => {
  const { t, isRTL } = useTranslation();

  const handleLogoClick = () => {
    playSound(SOUNDS.CLICK);
    onRestart();
  };

  return (
    <nav className="p-4 sm:p-6 flex justify-between items-center max-w-6xl mx-auto w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <Sparkles size={20} />
        </div>
        <div className="hidden sm:block">
          <h1 className="font-black text-lg tracking-tighter leading-none uppercase">{t('superTranslator')}</h1>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('educationalArena')}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <LanguageToggle />
        {showLogout && (
          <button onClick={onRestart} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
            <LogOut size={20} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
