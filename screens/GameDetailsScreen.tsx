import React, { useState, createRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, type TextInput, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ActionSheetIOS, Alert } from 'react-native';
import PlayerInput from '../components/PlayerInput';
import { RootStackParamList } from '../App';
import { StackScreenProps } from '@react-navigation/stack';
import { ObjectEntriesExact, mapObject, range, reduceObject, unique } from '../helper/helper';
import { deleteGame, saveGame } from '../scripts/storage';



const GameDetailsScreen = ({ navigation, route: { params: { players, id } } }: StackScreenProps<RootStackParamList, 'GameDetails'>) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {players.map(player => (
                    <PlayerInput
                        viewOnly={true}
                        key={player.key}
                        player={player}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                    ActionSheetIOS.showActionSheetWithOptions(
                        {
                            options: ['Cancel', 'Delete Game Record'],
                            cancelButtonIndex: 0,
                            destructiveButtonIndex: 1,
                            userInterfaceStyle: 'dark',
                        },
                        async buttonIndex => {
                            if (buttonIndex === 1) {
                                await deleteGame({ id });

                                Alert.alert('Game Successfully Deleted', undefined, [{
                                    text: 'Ok',
                                    style: 'default',
                                    onPress: () => navigation.pop(),
                                },
                                ]);
                            }
                        },
                    );
                }}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    scrollView: {
        flex: 1,
        marginBottom: 16,
    },
    deleteButton: {
        backgroundColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteText: {
        fontSize: 14,
    },
});

export default GameDetailsScreen;