import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddGameRecordScreen, { Player } from './screens/AddGameRecordScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import HistoryScreen from './screens/HistoryScreen';
import GameDetailsScreen from './screens/GameDetailsScreen';

export type RootStackParamList = {
    "Home": any;
    "Add Game Record": undefined;
    "Statistics": undefined;
    "History": undefined;
    "GameDetails": { players: Player[], id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <AutocompleteDropdownContextProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Add Game Record" component={AddGameRecordScreen} />
                    <Stack.Screen name="Statistics" component={StatisticsScreen} />
                    <Stack.Screen name="History" component={HistoryScreen} />
                    <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AutocompleteDropdownContextProvider>
    );
}

export default App;