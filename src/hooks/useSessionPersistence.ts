import { useCallback } from 'react';
import { GameState, Player, ActiveGame, UserRole } from '../types';

const SESSION_KEY = 'translator-game-session';

export interface SessionData {
    roomCode: string;
    playerName: string;
    playerId: string;
    userRole: UserRole | null;
    isLocalMode: boolean;
    activeGame: ActiveGame;
    gameState: GameState;
    localPlayers: Player[];
    round: number;
}

export function useSessionPersistence() {
    const saveSession = useCallback((data: SessionData) => {
        try {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save session:', e);
        }
    }, []);

    const loadSession = useCallback((): SessionData | null => {
        try {
            const stored = sessionStorage.getItem(SESSION_KEY);
            if (stored) {
                return JSON.parse(stored) as SessionData;
            }
        } catch (e) {
            console.warn('Failed to load session:', e);
        }
        return null;
    }, []);

    const clearSession = useCallback(() => {
        try {
            sessionStorage.removeItem(SESSION_KEY);
        } catch (e) {
            console.warn('Failed to clear session:', e);
        }
    }, []);

    return { saveSession, loadSession, clearSession };
}
