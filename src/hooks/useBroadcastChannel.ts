import { useEffect, useCallback, useRef, useState } from 'react';
import { Player } from '../../types';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

const HEARTBEAT_INTERVAL = 3000;
const STALE_PEER_TIMEOUT = 10000;

interface UseBroadcastChannelProps {
    roomCode: string;
    playerId: string;
    playerName: string;
    score: number;
    streak: number;
    boosterActive: boolean;
    isLocalMode: boolean;
}

interface UseBroadcastChannelReturn {
    peers: (Player & { lastSeen: number })[];
    isSynced: boolean;
    broadcastStatus: (type?: 'HEARTBEAT' | 'JOIN' | 'SYNC_UPDATE') => void;
    closeChannel: () => void;
}

export const useBroadcastChannel = ({
    roomCode,
    playerId,
    playerName,
    score,
    streak,
    boosterActive,
    isLocalMode
}: UseBroadcastChannelProps): UseBroadcastChannelReturn => {
    const [peers, setPeers] = useState<(Player & { lastSeen: number })[]>([]);
    const [isSynced, setIsSynced] = useState(false);
    const supabaseChannelRef = useRef<RealtimeChannel | null>(null);
    const localChannelRef = useRef<BroadcastChannel | null>(null);

    const closeChannel = useCallback(() => {
        // Close Supabase channel
        if (supabaseChannelRef.current) {
            supabase.removeChannel(supabaseChannelRef.current);
            supabaseChannelRef.current = null;
        }
        // Close local BroadcastChannel
        if (localChannelRef.current) {
            localChannelRef.current.postMessage({ type: 'EXIT', playerId });
            localChannelRef.current.close();
            localChannelRef.current = null;
        }
        setPeers([]);
        setIsSynced(false);
    }, [playerId]);

    const broadcastStatus = useCallback((type: 'HEARTBEAT' | 'JOIN' | 'SYNC_UPDATE' = 'SYNC_UPDATE') => {
        if (isLocalMode || !playerName || !roomCode) return;

        const playerData = { id: playerId, name: playerName, score, streak, boosterActive };

        // Supabase Realtime
        if (supabaseChannelRef.current && isSupabaseConfigured()) {
            supabaseChannelRef.current.track(playerData);
        }

        // Fallback: Local BroadcastChannel
        if (localChannelRef.current) {
            localChannelRef.current.postMessage({ type, player: playerData });
        }
    }, [playerName, score, playerId, roomCode, streak, boosterActive, isLocalMode]);

    useEffect(() => {
        if (isLocalMode || !roomCode || roomCode.length < 3) {
            closeChannel();
            return;
        }

        const channelName = `game_room_${roomCode.toUpperCase()}`;

        // Setup Supabase Realtime if configured
        if (isSupabaseConfigured()) {
            const channel = supabase.channel(channelName, {
                config: { presence: { key: playerId } }
            });

            channel
                .on('presence', { event: 'sync' }, () => {
                    const state = channel.presenceState();
                    const now = Date.now();
                    const newPeers: (Player & { lastSeen: number })[] = [];

                    Object.keys(state).forEach(key => {
                        if (key !== playerId) {
                            const presence = state[key][0] as any;
                            if (presence && presence.id) {
                                newPeers.push({
                                    id: presence.id,
                                    name: presence.name || 'Unknown',
                                    score: presence.score || 0,
                                    streak: presence.streak || 0,
                                    boosterActive: presence.boosterActive || false,
                                    lastSeen: now
                                });
                            }
                        }
                    });

                    setPeers(newPeers);
                    if (newPeers.length > 0) setIsSynced(true);
                })
                .on('presence', { event: 'join' }, ({ key, newPresences }) => {
                    if (key !== playerId) {
                        const presence = newPresences[0] as any;
                        if (presence && presence.id) {
                            setPeers(prev => {
                                const exists = prev.find(p => p.id === presence.id);
                                if (exists) return prev;
                                return [...prev, {
                                    id: presence.id,
                                    name: presence.name || 'Unknown',
                                    score: presence.score || 0,
                                    streak: presence.streak || 0,
                                    boosterActive: presence.boosterActive || false,
                                    lastSeen: Date.now()
                                }];
                            });
                            setIsSynced(true);
                        }
                    }
                })
                .on('presence', { event: 'leave' }, ({ key }) => {
                    setPeers(prev => prev.filter(p => p.id !== key));
                })
                .subscribe(async (status) => {
                    if (status === 'SUBSCRIBED') {
                        await channel.track({
                            id: playerId,
                            name: playerName,
                            score,
                            streak,
                            boosterActive
                        });
                    }
                });

            supabaseChannelRef.current = channel;
        }

        // Also setup local BroadcastChannel as fallback (for same-device testing)
        const localChannel = new BroadcastChannel(channelName);
        localChannelRef.current = localChannel;

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
                    localChannel.postMessage({
                        type: 'HEARTBEAT',
                        player: { id: playerId, name: playerName, score, streak, boosterActive }
                    });
                }
            }
        };

        localChannel.onmessage = handleMessage;

        // Send initial join
        broadcastStatus('JOIN');

        // Heartbeat interval for updates
        const heartbeat = setInterval(() => {
            broadcastStatus('HEARTBEAT');
            setPeers(prev => prev.filter(p => Date.now() - p.lastSeen < STALE_PEER_TIMEOUT));
        }, HEARTBEAT_INTERVAL);

        return () => {
            clearInterval(heartbeat);
            closeChannel();
        };
    }, [roomCode, playerId, playerName, score, streak, boosterActive, broadcastStatus, closeChannel, isLocalMode]);

    // Update presence when player data changes
    useEffect(() => {
        if (supabaseChannelRef.current && isSupabaseConfigured() && !isLocalMode && roomCode) {
            supabaseChannelRef.current.track({
                id: playerId,
                name: playerName,
                score,
                streak,
                boosterActive
            });
        }
    }, [score, streak, boosterActive, playerId, playerName, isLocalMode, roomCode]);

    return { peers, isSynced, broadcastStatus, closeChannel };
};
