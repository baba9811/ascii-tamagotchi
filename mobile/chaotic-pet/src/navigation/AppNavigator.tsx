import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import NameInputScreen from '../screens/NameInputScreen';
import GameScreen from '../screens/GameScreen';
import DeathScreen from '../screens/DeathScreen';

export type RootStackParamList = {
  LanguageSelect: undefined;
  NameInput: { language: string };
  Game: { petName: string; language: string };
  Death: {
    deathReason: string;
    age: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LanguageSelect"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1a1a2e' },
        }}
      >
        <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
        <Stack.Screen name="NameInput" component={NameInputScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Death" component={DeathScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
