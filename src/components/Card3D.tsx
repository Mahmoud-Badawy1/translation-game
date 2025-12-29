import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../types';
import { Info, HelpCircle } from 'lucide-react';

interface Card3DProps {
  card: Card | null;
  isFlipped: boolean;
  onFlip?: () => void;
  showGlossary?: boolean;
}

const Card3D: React.FC<Card3DProps> = ({ card, isFlipped, onFlip, showGlossary = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!card) return (
    <div className="w-52 h-64 sm:w-64 sm:h-80 border-4 border-dashed border-slate-200 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center text-slate-300">
      Empty Slot
    </div>
  );

  return (
    <div className="relative w-52 h-64 sm:w-64 sm:h-80 perspective" onClick={onFlip}>
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 200, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face (Shirt) */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-6 sm:p-8 bg-white border-4 sm:border-8 border-slate-50"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-50 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:6 text-indigo-200">
             <HelpCircle size={32} className="sm:w-12 sm:h-12" />
          </div>
          <h3 className="text-[10px] sm:text-xs font-black text-slate-300 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Translation Card</h3>
        </div>

        {/* Back Face (Content) */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-between p-4 sm:p-6 text-white overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)',
            backgroundColor: card.color
          }}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[8px] sm:text-[10px] font-black opacity-60 uppercase tracking-widest">{card.category}</span>
            {showGlossary && (
               <button 
                 onClick={(e) => { e.stopPropagation(); setShowTooltip(!showTooltip); }}
                 className="p-1.5 sm:p-2 rounded-lg sm:xl bg-white/20 hover:bg-white/30 transition-colors"
               >
                 <Info size={14} className="sm:w-4 sm:h-4" />
               </button>
            )}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-1 sm:px-2">
            <h2 className="text-xl sm:text-2xl font-black leading-tight mb-2 sm:mb-4 drop-shadow-md">{card.content}</h2>
            <div className="space-y-0.5 sm:space-y-1">
              <h4 className="text-[10px] sm:text-sm font-black uppercase tracking-tight">{card.titleEn}</h4>
              <h4 className="text-lg sm:text-xl font-bold font-cairo" dir="rtl">{card.titleAr}</h4>
            </div>
          </div>

          <div className="w-full text-center space-y-0.5 sm:space-y-1 border-t border-white/10 pt-3 sm:pt-4">
            <p className="text-[8px] sm:text-[10px] font-medium opacity-80 leading-relaxed italic line-clamp-2">{card.descriptionEn}</p>
            <p className="text-[10px] sm:text-xs font-bold font-cairo opacity-90 leading-relaxed italic line-clamp-1" dir="rtl">{card.descriptionAr}</p>
          </div>

          <AnimatePresence>
            {showTooltip && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/95 p-6 sm:p-8 flex flex-col items-center justify-center text-center z-20"
              >
                 <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-4 text-indigo-400">Glossary Info</h4>
                 <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4 sm:mb-6">{card.descriptionEn}</p>
                 <button 
                   onClick={() => setShowTooltip(false)}
                   className="text-[8px] sm:text-[10px] bg-white text-slate-900 px-4 sm:px-6 py-2 rounded-full font-black uppercase tracking-widest"
                 >
                   Close
                 </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Card3D;
