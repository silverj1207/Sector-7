export type AirQuality = 'HIGH_PURITY' | 'STABLE' | 'WARNING' | 'CRITICAL';
export type SecurityLevel = 'MAXIMUM' | 'SECURE' | 'PATROLLED' | 'UNREGULATED' | 'HOSTILE';
export type LocationCategory = 'MILITARY' | 'RESIDENTIAL' | 'CIVILIAN' | 'MEDICAL' | 'BLACK_MARKET' | 'OUTSIDE';

export interface LocationInfo {
  id: string;
  name: string;
  category: LocationCategory;
  airQuality: AirQuality;
  securityLevel: SecurityLevel;
  shortDesc: string;
  description: string;
  keyFeatures: string[];
  associatedPeople: string[]; // Names of people associated
  coordinates: { x: number; y: number }; // 0-100 percentage for tactical map
  customIcon?: string;
}

export interface SporeStage {
  level: number;
  name: string;
  englishName: string;
  symptoms: string[];
  description: string;
  inhibitorEffect: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  title: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  mbti: string;
  bloodType: string;
  role: string;
  rank?: string;
  appearance: string;
  dialogueStyle: string;
  description: string;
  quotes: string[];
  playStyle?: string; // Sexual tendencies / Playstyles from prompt for Declan/Shane and some NPCs
  isMain: boolean;
  relationshipToUser: string;
  misc?: string[]; // Extra notes/facts like Shane's "can legal enter house" or Declan's guilt
}

export interface RelationshipLink {
  fromId: string;
  toId: string;
  type: string; // "Command", "Spying", "Spouse", "Bodyguard", "Suspicion", etc.
  description: string;
  intensity: 'STRONG' | 'MUTUAL' | 'TENSE' | 'SECRET';
}
