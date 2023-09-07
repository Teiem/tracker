import React, { useState, createRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, type TextInput, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ActionSheetIOS, Alert } from 'react-native';
import PlayerInput from '../components/PlayerInput';
import { RootStackParamList } from '../App';
import { StackScreenProps } from '@react-navigation/stack';
import { ObjectEntriesExact, mapObject, range, reduceObject, unique } from '../helper/helper';
import { saveGame } from '../scripts/storage';

const _structuredClone = <T extends Record<PropertyKey, unknown>>(obj: T): T => JSON.parse(JSON.stringify(obj));

const teamDistribution = {
    5: { Sailor: 2, Pirate: 2, Cultist: 1, Follower: 0 },
    6: { Sailor: 3, Pirate: 2, Cultist: 1, Follower: 0 },
    7: { Sailor: 4, Pirate: 2, Cultist: 1, Follower: 0 },
    8: { Sailor: 4, Pirate: 3, Cultist: 1, Follower: 0 },
    9: { Sailor: 5, Pirate: 3, Cultist: 1, Follower: 0 },
    10: { Sailor: 5, Pirate: 4, Cultist: 1, Follower: 0 },
    11: { Sailor: 5, Pirate: 4, Cultist: 1, Follower: 1 },
} as const;


type TeamDistribution = typeof teamDistribution;

type PossiblePlayerNumbers = keyof TeamDistribution;
export type Roles = keyof TeamDistribution[keyof TeamDistribution];

type AllRoles = typeof allRoles;
export type Player = AllRoles[keyof AllRoles][number];

const playerCountOptions = Object.keys(teamDistribution).map(Number) as PossiblePlayerNumbers[];
const nameList = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];

const maxRolesNeeded = reduceObject(teamDistribution, (acc: Record<string, number>, [_, cur]) => mapObject(cur, ([role, count]) => Math.max(acc[role] ?? 0, count)));
const allRoles = mapObject(maxRolesNeeded, ([role, count]) => range(count).map(i => ({ name: '', role, converted: false, key: `${role}${i}` })));


const selectPlayers = (count: PossiblePlayerNumbers, _allRoles: typeof allRoles) => ObjectEntriesExact(teamDistribution[count]).flatMap(([role, count]) => _allRoles[role].slice(0, count))

const AddGameRecordScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Add Game Record'>) => {
    const [localAllRoles, setLocalAllRoles] = useState(_structuredClone(allRoles));
    const [numPlayers, setNumPlayers] = useState<PossiblePlayerNumbers>(5);

    const inputRefs = Array(numPlayers).fill(null).map(() => createRef<TextInput>());
    const selectedPlayers = selectPlayers(numPlayers, localAllRoles);

    const hiddenPlayers = ObjectEntriesExact(localAllRoles)
        .flatMap(([_, playersOfRole]) => playersOfRole)
        .filter(({ name }) => name)
        .filter(({ key }) => !selectedPlayers.some(selectedPlayer => selectedPlayer.key === key));

    const suggestionNameList = [
        ...hiddenPlayers.map(({ name }) => name),
        ...nameList.filter(name => !selectedPlayers.some(selectedPlayer => selectedPlayer.name === name)),
    ];

    console.log("suggestionNameList", suggestionNameList);
    console.log("selectedPlayers", selectedPlayers.map(({ name }) => name));


    const setPlayer = (player: Player) => {
        console.log('setPlayer', player);

        const newLocalAllRoles = _structuredClone(localAllRoles);

        const playersOfRole = newLocalAllRoles[player.role];
        const index = playersOfRole.findIndex(p => p.key === player.key);

        newLocalAllRoles[player.role][index] = player;

        const hiddenPlayersWithSameName = hiddenPlayers.filter(({ name }) => name === player.name);
        hiddenPlayersWithSameName.forEach((hiddenPlayer) => {
            const playersOfRole = newLocalAllRoles[hiddenPlayer.role];
            const index = playersOfRole.findIndex(p => p.key === hiddenPlayer.key);

            newLocalAllRoles[hiddenPlayer.role][index] = { ...hiddenPlayer, name: '' };
        });

        setLocalAllRoles(newLocalAllRoles);

        const selectedPlayerIndex = selectedPlayers.findIndex(p => p.key === player.key);
        if (selectedPlayerIndex < selectedPlayers.length - 1 && selectedPlayers[selectedPlayerIndex + 1].name === '') {
            inputRefs[selectedPlayerIndex + 1].current?.focus();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView style={styles.container} behavior="height">
                <Text style={styles.heading}>Select Number of Players:</Text>
                <View style={styles.buttons}>
                    {playerCountOptions.map((count) => (
                        <TouchableOpacity key={count} style={[styles.button, count === numPlayers && styles.buttonActive]} onPress={() => {
                            setNumPlayers(count);
                            Keyboard.dismiss();
                        }}>
                            <Text>{count}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <ScrollView style={styles.scrollView}>
                    {selectedPlayers.map((player, i) => (
                        <PlayerInput
                            key={player.key}
                            ref={inputRefs[i]}
                            suggestionNameList={suggestionNameList}
                            player={player}
                            setPlayer={setPlayer}
                        />
                    ))}
                </ScrollView>
                <View>
                    <Button
                        title='Add'
                        disabled={selectedPlayers.some(({ name }) => !name) || !selectedPlayers.map(({ name }) => name).every(unique)}
                        onPress={() => {
                            ActionSheetIOS.showActionSheetWithOptions(
                                {
                                    options: ['Cancel', 'Add Game Record'],
                                    cancelButtonIndex: 0,
                                    userInterfaceStyle: 'dark',
                                },
                                async buttonIndex => {
                                    if (buttonIndex === 1) {
                                        await saveGame({
                                            players: selectedPlayers,
                                        });
                                        Alert.alert('Game Saved Successfully', undefined, [{
                                            text: 'Ok',
                                            style: 'default',
                                            onPress: () => navigation.navigate('Home'),
                                          },
                                        ]);
                                    }
                                },
                            );
                        }}></Button>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollView: {
        marginVertical: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        margin: 5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonActive: {
        backgroundColor: '#ccc',
    },
});

export default AddGameRecordScreen;