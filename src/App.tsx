import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Types
import { GameState, Player, ActiveGame, UserRole } from './types';

// Hooks
import { playSound, SOUNDS, useBroadcastChannel, useGameDecks, useSessionPersistence } from './hooks';

// Components
import { Header, Navbar, FooterHUD } from './components';

// Feature Screens
import { LobbyScreen } from './features/lobby';
import { InstructionsScreen } from './features/instructions';
import { ModeSelectScreen } from './features/mode-select';
import { RoomConfigScreen } from './features/room-config';
import { StageReveal, StageInput, StageTwist, StageJudge } from './features/theory-arena';
import { TermQuestion, TermResult } from './features/term-race';
import { GameOverScreen } from './features/game-over';

const MAX_ROUNDS = 10;

const App: React.FC = () => {
  // Game Mode State
  const [activeGame, setActiveGame] = useState<ActiveGame>('NONE');
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [round, setRound] = useState(0);
  
  // Players State (Local & Online)
  const [localPlayers, setLocalPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [pendingPlayerName, setPendingPlayerName] = useState('');
  
  // Online Player State
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [boosterActive, setBoosterActive] = useState(false);
  const [playerId] = useState(() => 'p_' + Math.random().toString(36).substr(2, 9));

  // Translation Input
  const [translation, setTranslation] = useState('');

  // P2P Sync Hook
  const { peers, broadcastStatus, closeChannel } = useBroadcastChannel({
    roomCode,
    playerId,
    playerName,
    score,
    streak,
    boosterActive,
    isLocalMode
  });

  // Game Decks Hook
  const { currentMission, currentTool, currentTwist, currentTerm, currentTermOptions } = useGameDecks({
    roomCode,
    round
  });

  // Session Persistence
  const { saveSession, loadSession, clearSession } = useSessionPersistence();

  // Restore session on mount
  useEffect(() => {
    const session = loadSession();
    if (session) {
      setRoomCode(session.roomCode);
      setPlayerName(session.playerName);
      setUserRole(session.userRole);
      setIsLocalMode(session.isLocalMode);
      setActiveGame(session.activeGame);
      setGameState(session.gameState);
      setLocalPlayers(session.localPlayers);
      setRound(session.round);
    }
  }, [loadSession]);

  // Save session on key state changes
  useEffect(() => {
    // Only persist if we've moved past the lobby
    if (gameState !== 'LOBBY') {
      saveSession({
        roomCode,
        playerName,
        playerId,
        userRole,
        isLocalMode,
        activeGame,
        gameState,
        localPlayers,
        round
      });
    }
  }, [gameState, roomCode, playerName, playerId, userRole, isLocalMode, activeGame, localPlayers, round, saveSession]);

  // Computed Values
  const currentPlayer = isLocalMode ? localPlayers[currentPlayerIndex] : null;
  
  const allParticipants = useMemo(() => {
    if (isLocalMode) return [...localPlayers].sort((a, b) => b.score - a.score);
    const list = [{ id: playerId, name: playerName || 'You', score, streak, boosterActive }, ...peers];
    return list.sort((a, b) => b.score - a.score);
  }, [peers, score, playerName, playerId, isLocalMode, localPlayers, streak, boosterActive]);

  // Game Actions
  const handleRestart = useCallback(() => {
    playSound(SOUNDS.CLICK);
    closeChannel();
    clearSession();
    setRound(0);
    setScore(0);
    setStreak(0);
    setBoosterActive(false);
    setTranslation('');
    setGameState('LOBBY');
    setActiveGame('NONE');
    setUserRole(null);
    setRoomCode('');
    setPlayerName('');
    setIsLocalMode(false);
    setLocalPlayers([]);
    setCurrentPlayerIndex(0);
  }, [closeChannel, clearSession]);

  const addLocalPlayer = useCallback(() => {
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
  }, [pendingPlayerName]);

  const removeLocalPlayer = useCallback((id: string) => {
    playSound(SOUNDS.CLICK);
    setLocalPlayers(prev => prev.filter(p => p.id !== id));
  }, []);

  const startGame = useCallback(() => {
    playSound(SOUNDS.START);
    setRound(0);
    setGameState(activeGame === 'TRANSLATOR' ? 'STAGE_REVEAL' : 'TERM_RACE');
    if (!isLocalMode) broadcastStatus('JOIN');
  }, [activeGame, isLocalMode, broadcastStatus]);

  const advanceRound = useCallback(() => {
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
  }, [round, isLocalMode, localPlayers.length, activeGame, broadcastStatus]);

  const addPoints = useCallback((basePts: number, isCorrect: boolean = true) => {
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
  }, [isLocalMode, localPlayers, currentPlayerIndex, activeGame, boosterActive, streak, broadcastStatus]);

  // Show Header conditions
  const showHeader = !['LOBBY', 'INSTRUCTIONS', 'MODE_SELECT', 'ROOM_CONFIG', 'GAME_OVER'].includes(gameState);
  const showLogout = gameState !== 'LOBBY';
  const showFooter = (playerName || localPlayers.length > 0) && showHeader;

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-outfit flex flex-col selection:bg-indigo-100 overflow-x-hidden">
      {/* Header */}
      {showHeader && (
        <Header
          round={round}
          maxRounds={MAX_ROUNDS}
          isLocalMode={isLocalMode}
          currentPlayer={currentPlayer}
          score={score}
          boosterActive={boosterActive}
        />
      )}

      {/* Navbar */}
      <Navbar showLogout={showLogout} onRestart={handleRestart} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6 flex-grow w-full">
        <AnimatePresence mode="wait">
          {/* LOBBY */}
          {gameState === 'LOBBY' && (
            <LobbyScreen
              onSelectGame={(game) => {
                setActiveGame(game);
                setGameState('INSTRUCTIONS');
              }}
            />
          )}

          {/* INSTRUCTIONS */}
          {gameState === 'INSTRUCTIONS' && (
            <InstructionsScreen
              activeGame={activeGame}
              onContinue={() => setGameState('MODE_SELECT')}
            />
          )}

          {/* MODE SELECT */}
          {gameState === 'MODE_SELECT' && (
            <ModeSelectScreen
              onSelectLocalMode={(isLocal) => {
                setIsLocalMode(isLocal);
                setGameState('ROOM_CONFIG');
              }}
            />
          )}

          {/* ROOM CONFIG */}
          {gameState === 'ROOM_CONFIG' && (
            <RoomConfigScreen
              isLocalMode={isLocalMode}
              localPlayers={localPlayers}
              pendingPlayerName={pendingPlayerName}
              playerName={playerName}
              roomCode={roomCode}
              userRole={userRole}
              onAddPlayer={addLocalPlayer}
              onRemovePlayer={removeLocalPlayer}
              onPendingPlayerNameChange={setPendingPlayerName}
              onPlayerNameChange={setPlayerName}
              onRoomCodeChange={setRoomCode}
              onUserRoleChange={setUserRole}
              onStartGame={startGame}
            />
          )}

          {/* THEORY ARENA - Stage Reveal */}
          {gameState === 'STAGE_REVEAL' && (
            <StageReveal
              currentMission={currentMission}
              currentTool={currentTool}
              onContinue={() => setGameState('STAGE_INPUT')}
            />
          )}

          {/* THEORY ARENA - Stage Input */}
          {gameState === 'STAGE_INPUT' && (
            <StageInput
              currentMission={currentMission}
              translation={translation}
              onTranslationChange={setTranslation}
              onSubmit={() => setGameState('STAGE_TWIST')}
            />
          )}

          {/* THEORY ARENA - Stage Twist */}
          {gameState === 'STAGE_TWIST' && (
            <StageTwist
              currentTwist={currentTwist}
              onContinue={() => setGameState('STAGE_JUDGE')}
            />
          )}

          {/* THEORY ARENA - Stage Judge */}
          {gameState === 'STAGE_JUDGE' && (
            <StageJudge
              translation={translation}
              onAddPoints={addPoints}
              onAdvanceRound={advanceRound}
            />
          )}

          {/* TERM RACE - Question */}
          {gameState === 'TERM_RACE' && (
            <TermQuestion
              currentTerm={currentTerm}
              currentTermOptions={currentTermOptions}
              boosterActive={boosterActive}
              isLocalMode={isLocalMode}
              currentPlayer={currentPlayer}
              onAnswer={(_, isCorrect) => {
                addPoints(10, isCorrect);
                setGameState('TERM_RESULT');
              }}
            />
          )}

          {/* TERM RACE - Result */}
          {gameState === 'TERM_RESULT' && (
            <TermResult
              currentTerm={currentTerm}
              onAdvanceRound={advanceRound}
            />
          )}

          {/* GAME OVER */}
          {gameState === 'GAME_OVER' && (
            <GameOverScreen
              allParticipants={allParticipants}
              userRole={userRole}
              isLocalMode={isLocalMode}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer HUD */}
      {showFooter && (
        <FooterHUD
          isLocalMode={isLocalMode}
          currentPlayer={currentPlayer}
          playerName={playerName}
          score={score}
          localPlayers={localPlayers}
          peers={peers}
        />
      )}
    </div>
  );
};

export default App;
