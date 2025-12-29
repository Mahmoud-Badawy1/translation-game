
export type CardCategory = 'QUEST' | 'TOOL' | 'TWIST';
export type UserRole = 'HOST' | 'STUDENT';

export interface Card {
  id: string;
  category: CardCategory;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  content: string;
  color: string;
  examples?: string[];
}

export interface Player {
  id: string;
  name: string;
  score: number;
  streak: number;
  boosterActive: boolean;
}

export interface Term {
  id: string;
  term: string;
  definition: string;
  example: string;
}

export type ActiveGame = 'NONE' | 'TRANSLATOR' | 'TERM_HUNTER';

export type GameState =
  | 'LOBBY'
  | 'ROLE_SELECT'
  | 'ROOM_CONFIG'
  | 'STAGE_REVEAL' // Quest + Tool
  | 'STAGE_INPUT'  // Player typing
  | 'STAGE_TWIST'  // Twist reveal
  | 'STAGE_JUDGE'  // Scoring
  | 'TERM_RACE'    // Term Hunter active
  | 'TERM_RESULT'  // Term Hunter answer
  | 'GAME_OVER';
