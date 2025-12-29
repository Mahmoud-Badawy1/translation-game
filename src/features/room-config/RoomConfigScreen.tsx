import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Player, UserRole } from '../../types';
import { playSound, SOUNDS } from '../../hooks/useSound';
import { useTranslation } from '../../hooks';

interface RoomConfigScreenProps {
  isLocalMode: boolean;
  localPlayers: Player[];
  pendingPlayerName: string;
  playerName: string;
  roomCode: string;
  userRole: UserRole | null;
  onAddPlayer: () => void;
  onRemovePlayer: (id: string) => void;
  onPendingPlayerNameChange: (name: string) => void;
  onPlayerNameChange: (name: string) => void;
  onRoomCodeChange: (code: string) => void;
  onUserRoleChange: (role: UserRole) => void;
  onStartGame: () => void;
}

const RoomConfigScreen: React.FC<RoomConfigScreenProps> = ({
  isLocalMode,
  localPlayers,
  pendingPlayerName,
  playerName,
  roomCode,
  userRole,
  onAddPlayer,
  onRemovePlayer,
  onPendingPlayerNameChange,
  onPlayerNameChange,
  onRoomCodeChange,
  onUserRoleChange,
  onStartGame
}) => {
  const { t, isRTL } = useTranslation();

  const handleAddPlayer = () => {
    playSound(SOUNDS.CLICK);
    onAddPlayer();
  };

  const handleRemovePlayer = (id: string) => {
    playSound(SOUNDS.CLICK);
    onRemovePlayer(id);
  };

  const handleRoleChange = (role: UserRole) => {
    playSound(SOUNDS.CLICK);
    onUserRoleChange(role);
  };

  const isDisabled = isLocalMode 
    ? localPlayers.length === 0 
    : (!playerName || !roomCode || !userRole);

  return (
    <motion.div 
      key="config" 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="py-10 max-w-sm mx-auto"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100 space-y-8 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter">
          {isLocalMode ? t('localPlayers') : t('arenaSync')}
        </h2>
        {isLocalMode ? (
          <div className="space-y-6">
            <div className="flex gap-2">
              <input 
                placeholder={t('name')} 
                value={pendingPlayerName} 
                onChange={e => onPendingPlayerNameChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddPlayer()}
                className="flex-1 bg-slate-50 p-4 rounded-xl font-black border border-slate-100 outline-none focus:ring-4 ring-indigo-50"
              />
              <button onClick={handleAddPlayer} className="p-4 bg-indigo-600 text-white rounded-xl shadow-lg">
                <Plus size={24} />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 p-1">
              {localPlayers.map(p => (
                <div key={p.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="font-black uppercase text-xs tracking-tight text-slate-600">{p.name}</span>
                  <button onClick={() => handleRemovePlayer(p.id)} className="text-rose-400 hover:text-rose-600 p-1">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {localPlayers.length === 0 && (
                <p className="text-[10px] font-black text-slate-300 uppercase py-6">{t('addPlayersPrompt')}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={() => handleRoleChange('HOST')} 
                className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${
                  userRole === 'HOST' 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                    : 'bg-white border-slate-100 text-slate-400'
                }`}
              >
                {t('host')}
              </button>
              <button 
                onClick={() => handleRoleChange('STUDENT')} 
                className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${
                  userRole === 'STUDENT' 
                    ? 'bg-rose-600 text-white border-rose-600 shadow-lg' 
                    : 'bg-white border-slate-100 text-slate-400'
                }`}
              >
                {t('student')}
              </button>
            </div>
            <input 
              placeholder={t('yourName')} 
              value={playerName} 
              onChange={e => onPlayerNameChange(e.target.value)}
              className="w-full bg-slate-50 p-5 rounded-2xl text-center font-black border border-slate-100 outline-none focus:ring-4 ring-indigo-50"
            />
            <input 
              placeholder={t('roomCode')} 
              value={roomCode} 
              onChange={e => onRoomCodeChange(e.target.value.toUpperCase())}
              className="w-full bg-slate-50 p-5 rounded-2xl text-center font-black text-2xl tracking-widest border border-slate-100 outline-none focus:ring-4 ring-indigo-50"
            />
          </div>
        )}
        <button 
          disabled={isDisabled}
          onClick={onStartGame}
          className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black text-xl shadow-xl disabled:opacity-50 active:scale-95 transition-all"
        >
          {t('startArena')}
        </button>
      </div>
    </motion.div>
  );
};

export default RoomConfigScreen;
