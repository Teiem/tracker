import { GameRecord, Team } from '../models/GameRecord';

interface PlayerStats {
  gamesPlayed: number;
  gamesWon: number;
}

export interface Statistics {
  totalGames: number;
  playerStats: { [key: string]: PlayerStats };
}

export const generateStatistics = (records: Array<GameRecord>): Statistics => {
  const totalGames: number = records.length;
  const playerStats: { [key: string]: PlayerStats } = {};

  records.forEach((record: GameRecord) => {
    record.players.forEach(player => {
      if (!playerStats[player.name]) {
        playerStats[player.name] = { gamesPlayed: 0, gamesWon: 0 };
      }
      playerStats[player.name].gamesPlayed++;
      if (player.won) {
        playerStats[player.name].gamesWon++;
      }
    });
  });

  return { totalGames, playerStats };
}