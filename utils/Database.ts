import { GameRecord } from '../models/GameRecord';

const gameRecords: Array<GameRecord> = [];

export const saveGameRecord = async (record: GameRecord): Promise<void> => {
    gameRecords.push(record);
}

export const fetchGameRecords = async (): Promise<Array<GameRecord>> => {
    return gameRecords;
}