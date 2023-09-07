import { GameRecord, Team } from '../models/GameRecord';

export const validateGameRecord = (record: GameRecord): boolean => {
  const sailorCount = record.players.filter(p => p.originalTeam === 'Sailor').length;
  const pirateCount = record.players.filter(p => p.originalTeam === 'Pirate').length;
  const cultistCount = record.players.filter(p => p.originalTeam === 'Cultist').length;

  // Add validation logic based on totalPlayers
  if (record.totalPlayers === 5 && ((sailorCount === 2 && pirateCount === 2 && cultistCount === 1) || (sailorCount === 3 && pirateCount === 1 && cultistCount === 1))) {
    return true;
  }
  // Continue for other player counts

  return false;
}