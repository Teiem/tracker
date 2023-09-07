import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { Game, loadGames } from "../scripts/storage";
import { roleColors } from "../components/PlayerInput";

const HistoryScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'History'>) => {
    const [games, setGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        loadGames().then(setGames);
    }, []);

    useEffect(() => {
        const newFilteredGames = games.filter(game =>
            game.players.some(player =>
                player.name.toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredGames(newFilteredGames);
    }, [searchText, games]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for a player..."
                onChangeText={text => setSearchText(text)}
                value={searchText}
            />
            <ScrollView style={styles.scrollView}>
                {filteredGames.map(({ id, players }) => (
                    <TouchableOpacity
                        style={styles.row}
                        key={id}
                        onPress={() => {
                            navigation.navigate('GameDetails', { players, id });
                        }}>
                        {players.map(({ name, role, converted }) => (
                            <Text key={name} style={[styles.playerText, { color: roleColors[role] }]}>{name}</Text>
                        ))}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    searchBar: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        margin: 15,
        paddingLeft: 20,
        borderRadius: 25,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    scrollView: {
        marginVertical: 5,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    playerText: {
        fontSize: 16,
        margin: 5,
    },
});

export default HistoryScreen;