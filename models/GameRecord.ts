export type Team = 'Sailor' | 'Pirate' | 'Cultist' | 'Cultist Follower';

export interface GameRecord {
  id: string;
  players: Array<{
    name: string;
    originalTeam: Team;
    finalTeam: Team;
    won: boolean;
  }>;
  totalPlayers: number;
  createdAt: Date;
}