import AsyncStorage from '@react-native-async-storage/async-storage';
import { Player } from '../screens/AddGameRecordScreen';

export type Game = {
    id: string;
    players: Player[]
};

export let loadedGames: Game[] = [];

export const loadGames = async (): Promise<Game[]> => {
    try {
        const value = await AsyncStorage.getItem('@games');
        if (value === null) return [];
        const _loadedGames = JSON.parse(value) ?? [];
        loadedGames = _loadedGames;
        return _loadedGames;

    } catch (e) {
        return [];
    }
};

export const saveGame = async (game: Omit<Game, "id">) => {
    const id = new Date().getTime().toString();
    const newGame = { ...game, id };
    loadedGames = [newGame, ...loadedGames];
    await AsyncStorage.setItem('@games', JSON.stringify(loadedGames));
};

export const deleteGame = async (game: Pick<Game, "id">) => {
    loadedGames = loadedGames.filter(g => g.id !== game.id);
    await AsyncStorage.setItem('@games', JSON.stringify(loadedGames));
};