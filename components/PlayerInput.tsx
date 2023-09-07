import React, { forwardRef, useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Player } from '../screens/AddGameRecordScreen';
import { contacts } from '../scripts/contacts';

type PlayerInputProps = {
    player: Player;
    setPlayer: (player: Player) => void;
    suggestionNameList?: string[];
    viewOnly?: false;
} | {
    setPlayer?: never;
    suggestionNameList?: never;
    player: Player;
    viewOnly: true;
}


export const roleColors = {
    'Sailor': '#00f',
    'Pirate': '#f00',
    'Cultist': '#ff0',
    'Follower': '#0f0',
}

const PlayerInput = forwardRef(({ player, setPlayer = () => { }, suggestionNameList = [], viewOnly = false }: PlayerInputProps, ref) => {
    const setName = (selectedName: string) => {
        if (selectedName === player.name) return;
        setPlayer({ ...player, name: selectedName });
    }
    const setConverted = (converted: boolean) => {
        if (converted === player.converted) return;
        setPlayer({ ...player, converted });
    }

    // Prevent onBlur from firing when selecting an item from the dropdown
    const [preventBlur, setPreventBlur] = useState(false);

    // const localSuggestions = player.name ? [player.name, ...suggestionNameList] : [...suggestionNameList];
    const localSuggestions = player.name ? [player.name, ...suggestionNameList, ...contacts] : [...suggestionNameList, ...contacts];
    return (
        <View style={styles.container}>
            {viewOnly
                ? <Text>{player.name}</Text>
                : <AutocompleteDropdown
                    ref={ref}
                    initialValue={player.name ? "0" : undefined}
                    closeOnBlur={true}
                    closeOnSubmit={true}
                    showClear={false}
                    clearOnFocus={true}
                    debounce={50}
                    containerStyle={styles.textInput}
                    onSelectItem={item => {
                        if (!item) return // gets called on load

                        console.log('onSelectItem');
                        setPreventBlur(true);
                        setName(item.title!);

                        // new Promise(resolve => setTimeout(resolve, 10000)).then(() => setPreventBlur(false));
                    }}
                    onBlur={(data) => {
                        console.log('onBlur', preventBlur);
                        if (preventBlur) {
                            setPreventBlur(false);
                            return;
                        }
                        setName(data.nativeEvent.text);
                    }}
                    dataSet={localSuggestions.map((s, i) => ({ id: String(i), title: s }))}
                    textInputProps={{
                        placeholder: 'Name',
                    }}
                    emptyResultText="No players found"
                />}
            <Text style={[styles.roleText, { color: roleColors[player.role] }]}>{player.role}</Text>
            <Switch
                value={player.converted}
                onValueChange={setConverted}
                disabled={player.role === 'Cultist' || player.role === 'Follower' || viewOnly}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        gap: 10,
    },
    textInput: {
        flex: 1,
    },
    roleText: {
        fontSize: 16,
    },
});

export default PlayerInput;