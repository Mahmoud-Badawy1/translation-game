import { useMemo } from 'react';
import { MISSION_DECK, THEORY_DECK, TWIST_DECK, GLOSSARY_TERMS } from '../constants';
import { seededShuffle } from '../utils';
import { Card, Term } from '../types';

interface UseGameDecksProps {
    roomCode: string;
    round: number;
}

interface UseGameDecksReturn {
    syncedDecks: {
        missions: Card[];
        tools: Card[];
        twists: Card[];
        glossary: Term[];
    };
    currentMission: Card;
    currentTool: Card;
    currentTwist: Card;
    currentTerm: Term;
    currentTermOptions: string[];
}

export const useGameDecks = ({ roomCode, round }: UseGameDecksProps): UseGameDecksReturn => {
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
        const seed = `${roomCode}_round_${round}`;
        const others = GLOSSARY_TERMS.filter(t => t.id !== currentTerm.id);
        const shuffledOthers = seededShuffle(others, seed + '_others');
        const pool = [currentTerm.term, ...shuffledOthers.slice(0, 3).map(t => t.term)];
        return seededShuffle(pool, seed + '_pool');
    }, [round, roomCode, currentTerm]);

    return {
        syncedDecks,
        currentMission,
        currentTool,
        currentTwist,
        currentTerm,
        currentTermOptions
    };
};
