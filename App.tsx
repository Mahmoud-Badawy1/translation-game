
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MISSION_DECK, THEORY_DECK, TWIST_DECK, GLOSSARY_TERMS } from './constants';
import { GameState, Player, ActiveGame, UserRole } from './types';
import { seededShuffle } from './utils';
import Card3D from './components/Card3D';
import Leaderboard from './components/Leaderboard';
import { 
  Users, Sparkles, ArrowRight, Zap, CheckCircle, 
  ShieldAlert, Edit2, Trophy, Settings, 
  Play, Wifi, LogOut, Laptop, Plus, Trash2, Volume2,
  BookOpen, Info, HelpCircle, Target
} from 'lucide-react';

const MAX_ROUNDS = 10;
const HEARTBEAT_INTERVAL = 3000;
const STALE_PEER_TIMEOUT = 10000;

const SOUNDS = {
  CORRECT: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3527a0529.mp3',
  WRONG: 'https://cdn.pixabay.com/audio/2022/03/10/audio_5e29788d22.mp3',
  BOOSTER: 'https://cdn.pixabay.com/audio/2021/08/04/audio_0625615ef6.mp3',
  CLICK: 'https://cdn.pixabay.com/audio/2022/03/15/audio_50731f822e.mp3',
  START: 'https://cdn.pixabay.com/audio/2021/08/09/audio_88447e868d.mp3'
};

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<ActiveGame>('NONE');
  const [gameState, setGameState] = useState<GameState | 'INSTRUCTIONS' | 'MODE_SELECT'>('LOBBY');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [round, setRound] = useState(0);
  
  // Players State (Local & Online)
  const [localPlayers, setLocalPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [pendingPlayerName, setPendingPlayerName] = useState('');
  
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [boosterActive, setBoosterActive] = useState(false);
  const [playerId] = useState(() => 'p_' + Math.random().toString(36).substr(2, 9));

  const [peers, setPeers] = useState<(Player & { lastSeen: number })[]>([]);
  const [isSynced, setIsSynced] = useState(false);
  const [showRestartOverlay, setShowRestartOverlay] = useState(false);

  const [translation, setTranslation] = useState('');
  const channelRef = useRef<BroadcastChannel | null>(null);

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  const closeChannel = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.postMessage({ type: 'EXIT', playerId });
      channelRef.current.close();
      channelRef.current = null;
    }
  }, [playerId]);

  const broadcastStatus = useCallback((type: 'HEARTBEAT' | 'JOIN' | 'SYNC_UPDATE' = 'SYNC_UPDATE') => {
    if (!isLocalMode && channelRef.current && playerName && roomCode) {
      channelRef.current.postMessage({
        type,
        player: { id: playerId, name: playerName, score, streak, boosterActive }
      });
    }
  }, [playerName, score, playerId, roomCode, streak, boosterActive, isLocalMode]);

  useEffect(() => {
    if (isLocalMode || !roomCode || roomCode.length < 3) {
      closeChannel();
      return;
    }

    const channelName = `translator_room_${roomCode.toUpperCase()}`;
    const channel = new BroadcastChannel(channelName);
    channelRef.current = channel;

    const handleMessage = (event: MessageEvent) => {
      const { type, player, playerId: exitingId } = event.data;
      if (type === 'EXIT') {
        setPeers(prev => prev.filter(p => p.id !== exitingId));
        return;
      }
      if (player && player.id !== playerId) {
        setPeers(prev => {
          const now = Date.now();
          const index = prev.findIndex(p => p.id === player.id);
          if (index > -1) {
            const newPeers = [...prev];
            newPeers[index] = { ...player, lastSeen: now };
            return newPeers;
          }
          return [...prev, { ...player, lastSeen: now }];
        });
        setIsSynced(true);
        if (type === 'JOIN' || type === 'HEARTBEAT') {
          channel.postMessage({ type: 'HEARTBEAT', player: { id: playerId, name: playerName, score, streak, boosterActive } });
        }
      }
    };

    channel.onmessage = handleMessage;
    broadcastStatus('JOIN');

    const heartbeat = setInterval(() => {
      broadcastStatus('HEARTBEAT');
      setPeers(prev => prev.filter(p => Date.now() - p.lastSeen < STALE_PEER_TIMEOUT));
    }, HEARTBEAT_INTERVAL);

    return () => { clearInterval(heartbeat); closeChannel(); };
  }, [roomCode, playerId, playerName, score, streak, boosterActive, broadcastStatus, closeChannel, isLocalMode]);

  const syncedDecks = useMemo(() => {
    const seed = roomCode.trim().toUpperCase() || 'DEFAULT';
    return {
      missions: seededShuffle(MISSION_DECK, seed + '_m'),
      tools: seededShuffle(THEORY_DECK, seed + '_t'),
      twists: seededShuffle(TWIST_DECK, seed + '_w'),
      glossary: seededShuffle(GLOSSARY_TERMS, seed + '_g')
    };
  }, [roomCode]);

  const currentMission = syncedDecks.missions[round % syncedDecks.missions.length] || MISSION_DECK[0];
  const currentTool = syncedDecks.tools[round % syncedDecks.tools.length] || THEORY_DECK[0];
  const currentTwist = syncedDecks.twists[round % syncedDecks.twists.length] || TWIST_DECK[0];
  const currentTerm = syncedDecks.glossary[round % syncedDecks.glossary.length] || GLOSSARY_TERMS[0];

  const currentTermOptions = useMemo(() => {
    if (activeGame !== 'TERM_HUNTER') return [];
    const seed = `${roomCode}_round_${round}`;
    const others = GLOSSARY_TERMS.filter(t => t.id !== currentTerm.id);
    const shuffledOthers = seededShuffle(others, seed + '_others');
    const pool = [currentTerm.term, ...shuffledOthers.slice(0, 3).map(t => t.term)];
    return seededShuffle(pool, seed + '_pool');
  }, [activeGame, round, roomCode, currentTerm]);

  const handleRestart = () => {
    playSound(SOUNDS.CLICK);
    if (!isLocalMode && peers.length > 0) setShowRestartOverlay(true);
    else finalizeRestart();
  };

  const finalizeRestart = () => {
    closeChannel();
    setRound(0); setScore(0); setStreak(0); setBoosterActive(false); setTranslation('');
    setGameState('LOBBY'); setActiveGame('NONE'); setPeers([]); setIsSynced(false);
    setUserRole(null); setRoomCode(''); setPlayerName(''); setIsLocalMode(false);
    setLocalPlayers([]); setCurrentPlayerIndex(0);
    setShowRestartOverlay(false);
  };

  const addLocalPlayer = () => {
    if (pendingPlayerName.trim()) {
      playSound(SOUNDS.CLICK);
      const newP: Player = {
        id: 'lp_' + Math.random().toString(36).substr(2, 9),
        name: pendingPlayerName.trim(),
        score: 0,
        streak: 0,
        boosterActive: false
      };
      setLocalPlayers(prev => [...prev, newP]);
      setPendingPlayerName('');
    }
  };

  const removeLocalPlayer = (id: string) => {
    playSound(SOUNDS.CLICK);
    setLocalPlayers(prev => prev.filter(p => p.id !== id));
  };

  const startGame = () => {
    playSound(SOUNDS.START);
    setRound(0);
    setGameState(activeGame === 'TRANSLATOR' ? 'STAGE_REVEAL' : 'TERM_RACE');
    if (!isLocalMode) broadcastStatus('JOIN');
  };

  const advanceRound = () => {
    playSound(SOUNDS.CLICK);
    if (round + 1 >= MAX_ROUNDS) {
      setGameState('GAME_OVER');
    } else {
      setRound(r => r + 1);
      setTranslation('');
      if (isLocalMode) {
        setCurrentPlayerIndex(prev => (prev + 1) % localPlayers.length);
      }
      setGameState(activeGame === 'TRANSLATOR' ? 'STAGE_REVEAL' : 'TERM_RACE');
      broadcastStatus('SYNC_UPDATE');
    }
  };

  const addPoints = (basePts: number, isCorrect: boolean = true) => {
    if (isLocalMode) {
      const updatedPlayers = [...localPlayers];
      const p = updatedPlayers[currentPlayerIndex];
      if (isCorrect) {
        let pts = p.boosterActive ? basePts * 2 : basePts;
        p.score += pts;
        p.boosterActive = false;
        if (activeGame === 'TERM_HUNTER') {
          p.streak += 1;
          if (p.streak === 3) { p.boosterActive = true; playSound(SOUNDS.BOOSTER); }
          else playSound(SOUNDS.CORRECT);
        } else playSound(SOUNDS.CORRECT);
      } else {
        p.streak = 0; p.boosterActive = false; playSound(SOUNDS.WRONG);
      }
      setLocalPlayers(updatedPlayers);
    } else {
      if (isCorrect) {
        let pts = boosterActive ? basePts * 2 : basePts;
        setBoosterActive(false); setScore(s => s + pts);
        if (activeGame === 'TERM_HUNTER') {
          const ns = streak + 1; setStreak(ns);
          if (ns === 3) { setBoosterActive(true); playSound(SOUNDS.BOOSTER); }
          else playSound(SOUNDS.CORRECT);
        } else playSound(SOUNDS.CORRECT);
      } else {
        setStreak(0); setBoosterActive(false); playSound(SOUNDS.WRONG);
      }
      setTimeout(() => broadcastStatus('SYNC_UPDATE'), 0);
    }
  };

  const allParticipants = useMemo(() => {
    if (isLocalMode) return [...localPlayers].sort((a, b) => b.score - a.score);
    const list = [{ id: playerId, name: playerName || 'You', score, streak, boosterActive }, ...peers];
    return list.sort((a, b) => b.score - a.score);
  }, [peers, score, playerName, playerId, isLocalMode, localPlayers, streak, boosterActive]);

  const currentPlayer = isLocalMode ? localPlayers[currentPlayerIndex] : null;
  const winner = allParticipants[0];
  const isDraw = allParticipants.length > 1 && allParticipants[0].score === allParticipants[1].score;

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-outfit flex flex-col selection:bg-indigo-100 overflow-x-hidden">
      {/* 1. HEADER */}
      {gameState !== 'LOBBY' && gameState !== 'INSTRUCTIONS' && gameState !== 'MODE_SELECT' && gameState !== 'ROOM_CONFIG' && gameState !== 'GAME_OVER' && (
        <div className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block mb-0.5">
                {isLocalMode ? `Turn: ${currentPlayer?.name}` : 'Mission Progress'}
              </span>
              <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tighter">
                {round + 1} <span className="text-slate-300">/ {MAX_ROUNDS}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest block mb-0.5">Current Points</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tighter">
                {isLocalMode ? currentPlayer?.score : score}
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${(isLocalMode ? currentPlayer?.boosterActive : boosterActive) ? 'bg-orange-500' : 'bg-indigo-600'}`}
              initial={{ width: 0 }}
              animate={{ width: `${((round + 1) / MAX_ROUNDS) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 2. NAVBAR */}
      <nav className="p-4 sm:p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleRestart}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Sparkles size={20} />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-black text-lg tracking-tighter leading-none uppercase">Super Translator</h1>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Educational Arena</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {gameState !== 'LOBBY' && (
            <button onClick={handleRestart} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
              <LogOut size={20} />
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 flex-grow w-full">
        <AnimatePresence mode="wait">
          
          {/* LOBBY */}
          {gameState === 'LOBBY' && (
            <motion.div key="lobby" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12 py-10">
              <div className="text-center space-y-4">
                <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-none">The Academy</h2>
                <p className="text-slate-500 text-sm sm:text-lg font-medium max-w-md mx-auto">Master translation theories through interactive gamified challenges.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.button 
                  whileHover={{ y: -5 }} onClick={() => { playSound(SOUNDS.CLICK); setActiveGame('TRANSLATOR'); setGameState('INSTRUCTIONS'); }}
                  className="group bg-white p-10 rounded-[3rem] shadow-2xl border-2 border-transparent hover:border-indigo-500 transition-all text-left flex flex-col h-full"
                >
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <Edit2 size={32} />
                  </div>
                  <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">Theory Arena</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-grow">Apply Skopos, Dynamic Equivalence, and shifts to mission cards.</p>
                  <div className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest">Enter Arena <ArrowRight size={16} /></div>
                </motion.button>
                <motion.button 
                  whileHover={{ y: -5 }} onClick={() => { playSound(SOUNDS.CLICK); setActiveGame('TERM_HUNTER'); setGameState('INSTRUCTIONS'); }}
                  className="group bg-white p-10 rounded-[3rem] shadow-2xl border-2 border-transparent hover:border-rose-500 transition-all text-left flex flex-col h-full"
                >
                  <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">Term Race</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-grow">Identify strategies like Omission and Modulation in a rapid quiz.</p>
                  <div className="mt-8 flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-widest">Start Race <ArrowRight size={16} /></div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* INSTRUCTIONS */}
          {gameState === 'INSTRUCTIONS' && (
            <motion.div key="instructions" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-6 max-w-2xl mx-auto space-y-8">
              <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-2xl border border-slate-50 text-center space-y-10">
                <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto text-amber-500 shadow-sm">
                  <BookOpen size={40} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">How to Play: {activeGame === 'TRANSLATOR' ? 'Theory Arena' : 'Term Race'}</h2>
                <div className="space-y-4 text-left">
                  {activeGame === 'TRANSLATOR' ? (
                    <>
                      <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm">1</div>
                        <p className="text-sm font-bold text-slate-700">Receive a phrase and a theory card. Type your translation using that strategy.</p>
                      </div>
                      <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm">2</div>
                        <p className="text-sm font-bold text-slate-700">A "Red Twist" will reveal a challenge. Explain your choice based on the twist!</p>
                      </div>
                      <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm">3</div>
                        <p className="text-sm font-bold text-slate-700">Earn up to +10 points for correct theory application per round.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-sm">1</div>
                        <p className="text-sm font-bold text-slate-700">Read the definition of a translation strategy as quickly as you can.</p>
                      </div>
                      <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-sm">2</div>
                        <p className="text-sm font-bold text-slate-700">Pick the correct term from the options. 3 in a row triggers a Booster!</p>
                      </div>
                      <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-sm">3</div>
                        <p className="text-sm font-bold text-slate-700">Correct answers are worth 10 points. Speed and streaks are key.</p>
                      </div>
                    </>
                  )}
                </div>
                <button 
                  onClick={() => { playSound(SOUNDS.CLICK); setGameState('MODE_SELECT'); }}
                  className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl"
                >
                  START SESSION
                </button>
              </div>
            </motion.div>
          )}

          {/* MODE SELECT */}
          {gameState === 'MODE_SELECT' && (
            <motion.div key="modes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 max-w-sm mx-auto text-center space-y-10">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Choose Mode</h2>
              <div className="space-y-4">
                <button onClick={() => { playSound(SOUNDS.CLICK); setIsLocalMode(false); setGameState('ROOM_CONFIG'); }} className="w-full bg-white p-8 rounded-[2rem] border-2 border-slate-100 hover:border-indigo-600 flex items-center gap-5 transition-all shadow-lg group">
                  <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Wifi size={28} /></div>
                  <div className="text-left">
                    <div className="font-black uppercase text-sm">Online Arena</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Connect with others</div>
                  </div>
                </button>
                <button onClick={() => { playSound(SOUNDS.CLICK); setIsLocalMode(true); setGameState('ROOM_CONFIG'); }} className="w-full bg-white p-8 rounded-[2rem] border-2 border-slate-100 hover:border-rose-600 flex items-center gap-5 transition-all shadow-lg group">
                  <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors"><Laptop size={28} /></div>
                  <div className="text-left">
                    <div className="font-black uppercase text-sm">Local Party</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Share this device</div>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* ROOM CONFIG */}
          {gameState === 'ROOM_CONFIG' && (
            <motion.div key="config" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 max-w-sm mx-auto">
              <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100 space-y-8 text-center">
                <h2 className="text-3xl font-black uppercase tracking-tighter">{isLocalMode ? 'Local Players' : 'Arena Sync'}</h2>
                {isLocalMode ? (
                  <div className="space-y-6">
                    <div className="flex gap-2">
                      <input 
                        placeholder="NAME" value={pendingPlayerName} 
                        onChange={e => setPendingPlayerName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addLocalPlayer()}
                        className="flex-1 bg-slate-50 p-4 rounded-xl font-black border border-slate-100 outline-none focus:ring-4 ring-indigo-50"
                      />
                      <button onClick={addLocalPlayer} className="p-4 bg-indigo-600 text-white rounded-xl shadow-lg"><Plus size={24} /></button>
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-2 p-1">
                      {localPlayers.map(p => (
                        <div key={p.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="font-black uppercase text-xs tracking-tight text-slate-600">{p.name}</span>
                          <button onClick={() => removeLocalPlayer(p.id)} className="text-rose-400 hover:text-rose-600 p-1"><Trash2 size={18} /></button>
                        </div>
                      ))}
                      {localPlayers.length === 0 && <p className="text-[10px] font-black text-slate-300 uppercase py-6">Add players to start the party</p>}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                       <button onClick={() => { playSound(SOUNDS.CLICK); setUserRole('TRAINER'); }} className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${userRole === 'TRAINER' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}>Trainer</button>
                       <button onClick={() => { playSound(SOUNDS.CLICK); setUserRole('PLAYER'); }} className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${userRole === 'PLAYER' ? 'bg-rose-600 text-white border-rose-600 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}>Player</button>
                    </div>
                    <input 
                      placeholder="YOUR NAME" value={playerName} onChange={e => setPlayerName(e.target.value)}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-center font-black border border-slate-100 outline-none focus:ring-4 ring-indigo-50"
                    />
                    <input 
                      placeholder="ROOM CODE" value={roomCode} onChange={e => setRoomCode(e.target.value.toUpperCase())}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-center font-black text-2xl tracking-widest border border-slate-100 outline-none focus:ring-4 ring-indigo-50"
                    />
                  </div>
                )}
                <button 
                  disabled={isLocalMode ? localPlayers.length === 0 : (!playerName || !roomCode || !userRole)}
                  onClick={startGame}
                  className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black text-xl shadow-xl disabled:opacity-50 active:scale-95 transition-all"
                >
                  START ARENA
                </button>
              </div>
            </motion.div>
          )}

          {/* GAME STAGES (ARENA) */}
          {gameState === 'STAGE_REVEAL' && (
            <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 py-10">
              <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
                <Card3D card={currentMission} isFlipped={true} />
                <Card3D card={currentTool} isFlipped={true} showGlossary />
              </div>
              <button onClick={() => setGameState('STAGE_INPUT')} className="w-full max-w-lg mx-auto bg-slate-900 text-white py-6 rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 shadow-2xl hover:bg-black transition-all">
                DRAFT TRANSLATION <ArrowRight size={24} />
              </button>
            </motion.div>
          )}

          {gameState === 'STAGE_INPUT' && (
            <motion.div key="input" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="py-10 max-w-2xl mx-auto space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 relative">
                <div className="mb-10 text-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Target Text</span>
                  <p className="text-3xl font-black text-slate-800 leading-tight italic">"{currentMission?.content}"</p>
                </div>
                <textarea 
                  autoFocus value={translation} onChange={e => setTranslation(e.target.value)}
                  placeholder="Type your translation here..."
                  className="w-full h-48 p-8 bg-slate-50 border-4 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-bold transition-all shadow-inner resize-none"
                />
                <button onClick={() => setGameState('STAGE_TWIST')} className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-2xl mt-8 shadow-xl hover:bg-indigo-700 transition-colors">
                  SUBMIT STRATEGY
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'STAGE_TWIST' && (
            <motion.div key="twist" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center max-w-xl mx-auto space-y-12">
              <div className="bg-rose-50 p-14 rounded-[4rem] border-8 border-rose-100 shadow-2xl space-y-8">
                <ShieldAlert size={60} className="mx-auto text-rose-600 animate-pulse" />
                <h2 className="text-3xl font-black text-rose-700 uppercase tracking-tighter">Constraint Twist</h2>
                <div className="text-6xl font-black text-rose-950 tracking-tighter italic leading-none underline decoration-rose-300 px-4">"{currentTwist?.content}"</div>
                <p className="text-sm font-bold text-rose-600 max-w-xs mx-auto uppercase leading-relaxed">How does this twist change your translation? Defend your choices!</p>
              </div>
              <button onClick={() => setGameState('STAGE_JUDGE')} className="w-full bg-slate-900 text-white py-7 rounded-[2.5rem] font-black text-2xl hover:bg-black shadow-xl">
                CONTINUE TO SCORE
              </button>
            </motion.div>
          )}

          {gameState === 'STAGE_JUDGE' && (
            <motion.div key="judge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 max-w-2xl mx-auto space-y-10 text-center">
              <div className="bg-white p-14 rounded-[4rem] shadow-2xl border border-slate-100">
                <p className="text-4xl font-black text-indigo-950 mb-14 leading-tight italic px-4">"{translation}"</p>
                <div className="grid grid-cols-2 gap-6">
                  <button onClick={() => addPoints(10)} className="p-10 bg-emerald-50 rounded-[3rem] border-4 border-transparent hover:border-emerald-500 transition-all active:scale-95 group">
                    <CheckCircle className="mx-auto text-emerald-500 mb-4 group-hover:scale-110 transition-transform" size={40} />
                    <span className="font-black text-xs uppercase text-emerald-800">Theory Match (+10)</span>
                  </button>
                  <button onClick={() => addPoints(5)} className="p-10 bg-amber-50 rounded-[3rem] border-4 border-transparent hover:border-amber-500 transition-all active:scale-95 group">
                    <Sparkles className="mx-auto text-amber-500 mb-4 group-hover:scale-110 transition-transform" size={40} />
                    <span className="font-black text-xs uppercase text-amber-800">Creative Shift (+5)</span>
                  </button>
                </div>
                <button onClick={advanceRound} className="w-full bg-indigo-600 text-white py-7 rounded-[2rem] font-black text-2xl mt-12 shadow-xl hover:bg-indigo-700 transition-colors">
                  NEXT ROUND
                </button>
              </div>
            </motion.div>
          )}

          {/* TERM RACE */}
          {gameState === 'TERM_RACE' && (
            <motion.div key="race" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 space-y-10">
              <div className="bg-white p-14 rounded-[4rem] shadow-2xl border-4 border-indigo-50 text-center space-y-8 relative overflow-hidden">
                {(isLocalMode ? currentPlayer?.boosterActive : boosterActive) && (
                  <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent skew-x-12" />
                )}
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Identify the Term</span>
                   {(isLocalMode ? currentPlayer?.boosterActive : boosterActive) && (
                     <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1.1 }} transition={{ repeat: Infinity, repeatType: 'reverse' }} className="bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg shadow-orange-200">2x Booster!</motion.div>
                   )}
                </div>
                <p className="text-4xl font-black text-slate-800 italic leading-tight px-6">"{currentTerm?.definition}"</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentTermOptions.map((opt, idx) => (
                  <motion.button
                    key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => { const isCorrect = opt === currentTerm.term; addPoints(10, isCorrect); setGameState('TERM_RESULT'); }}
                    className="bg-white p-10 rounded-[2.5rem] border-4 border-slate-50 hover:border-indigo-600 shadow-xl font-black text-3xl text-slate-700 uppercase transition-all"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {gameState === 'TERM_RESULT' && (
             <motion.div key="term-res" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-20 text-center max-w-2xl mx-auto space-y-10">
                <div className="bg-white p-16 rounded-[5rem] shadow-2xl border border-slate-100 space-y-10">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Correct Answer</div>
                  <div className="text-7xl font-black text-indigo-600 uppercase tracking-tighter drop-shadow-sm">{currentTerm?.term}</div>
                  <div className="bg-slate-50 p-8 rounded-[2rem] text-left border border-slate-100">
                    <p className="text-xl font-bold italic text-slate-600 leading-relaxed">Example: "{currentTerm?.example}"</p>
                  </div>
                  <button onClick={advanceRound} className="w-full bg-slate-900 text-white py-7 rounded-[2rem] font-black text-2xl shadow-xl hover:bg-black transition-all">CONTINUE</button>
                </div>
             </motion.div>
          )}

          {/* GAME OVER */}
          {gameState === 'GAME_OVER' && (
            <motion.div key="over" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-20 space-y-12">
              <div className="bg-white p-20 rounded-[6rem] shadow-2xl border-4 border-indigo-50 relative max-w-xl mx-auto text-center">
                 <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-amber-400 p-10 rounded-[3rem] shadow-2xl rotate-12">
                    <Trophy size={80} className="text-white" />
                 </div>
                 <h2 className="text-4xl font-black mb-4 mt-10 uppercase tracking-tighter">Arena Complete</h2>
                 <div className="space-y-6 my-10">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session Champion</div>
                    <div className="text-6xl font-black text-indigo-600 tracking-tighter uppercase underline decoration-indigo-100 break-words">{isDraw ? "Draw Match!" : winner?.name}</div>
                    <div className="text-2xl font-black text-slate-800">Final Score: {winner?.score || 0}</div>
                 </div>
                 <button onClick={handleRestart} className="w-full bg-slate-900 text-white py-7 rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl">NEW GAME</button>
              </div>
              <div className="flex justify-center px-4">
                 <Leaderboard players={allParticipants} />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER HUD */}
      {(playerName || localPlayers.length > 0) && gameState !== 'GAME_OVER' && gameState !== 'LOBBY' && gameState !== 'INSTRUCTIONS' && gameState !== 'MODE_SELECT' && gameState !== 'ROOM_CONFIG' && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl px-10 py-5 rounded-[2.5rem] shadow-2xl border border-slate-100 flex items-center gap-12 z-[110] min-w-[320px]">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-sm">
                {(isLocalMode ? currentPlayer?.name?.[0] : playerName?.[0]) || '?'}
             </div>
             <div>
                <span className="font-black text-[10px] uppercase text-slate-400 block tracking-widest leading-none mb-1">Active Player</span>
                <span className="font-black text-xs uppercase text-slate-800 truncate block max-w-[100px]">
                  {isLocalMode ? currentPlayer?.name : playerName}
                </span>
             </div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="flex items-center gap-6">
             <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block leading-none mb-1">Score</span>
                <span className="text-xl font-black text-indigo-600 block leading-none">
                    {isLocalMode ? currentPlayer?.score : score}
                </span>
             </div>
             {(isLocalMode ? localPlayers.length > 1 : peers.length > 0) && (
                <div className="flex items-center gap-4 border-l pl-6 border-slate-100">
                   <div className="flex -space-x-2">
                      {(isLocalMode ? localPlayers : peers).slice(0, 3).map(p => (
                        <div key={p.id} className="w-7 h-7 bg-indigo-50 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-indigo-500 shadow-sm relative">
                          {p.name[0]}
                        </div>
                      ))}
                   </div>
                   <span className="text-[10px] font-black text-slate-400 uppercase whitespace-nowrap">
                        {isLocalMode ? `${localPlayers.length} Local` : `${peers.length} Live`}
                   </span>
                </div>
             )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App;
