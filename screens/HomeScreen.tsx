import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { permission, requestPermission } from '../scripts/contacts';

const HomeScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Home'>) => {
    return (
        <View style={styles.container}>
            {permission !== 'granted' && <Button onPress={requestPermission} title="Load Contacts"></Button>}
            <Button title="Add Game Record" onPress={() => navigation.navigate('Add Game Record')} />
            <Button title="View Statistics" onPress={() => navigation.navigate('Statistics')} disabled={true}/>
            <Button title="View History" onPress={() => navigation.navigate('History')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;