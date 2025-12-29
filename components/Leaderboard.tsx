
import React from 'react';
import { Player } from '../types';
import { Trophy } from 'lucide-react';

interface LeaderboardProps {
  players: Player[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl p-6 sm:p-10 w-full max-w-sm border border-slate-50">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
          <Trophy size={20} />
        </div>
        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">Arena Ranks</h3>
      </div>
      <div className="space-y-3">
        {sortedPlayers.map((player, idx) => (
          <div 
            key={player.id} 
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-50 border border-transparent hover:border-indigo-100 transition-all group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <span className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm text-white shadow-lg ${
                idx === 0 ? 'bg-amber-400' : idx === 1 ? 'bg-slate-400' : idx === 2 ? 'bg-orange-400' : 'bg-indigo-300'
              }`}>
                {idx + 1}
              </span>
              <div className="flex flex-col">
                <span className="font-black text-slate-700 uppercase text-xs sm:text-sm tracking-tight">{player.name}</span>
                {player.streak && player.streak > 1 && (
                  <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest">🔥 {player.streak} Streak</span>
                )}
              </div>
            </div>
            <span className="font-black text-indigo-600 text-sm sm:text-lg">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
