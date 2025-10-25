import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useGameStore } from '../stores/gameStore';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NameInput'>;
  route: RouteProp<RootStackParamList, 'NameInput'>;
};

const randomNames = [
  'Fluffy', 'Shadow', 'Chaos', 'Pixel', 'Glitch',
  'Noodle', 'Pancake', 'Mochi', 'Bubbles', 'Ziggy'
];

export default function NameInputScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { initGame } = useGameStore();
  const [petName, setPetName] = useState('');

  const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    setPetName(randomNames[randomIndex]);
  };

  const startGame = () => {
    const name = petName.trim() || 'Fluffy';
    initGame(name);
    navigation.navigate('Game', {
      petName: name,
      language: route.params.language,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('title')}</Text>
      <Text style={styles.subtitle}>{t('nameYourPet') || 'Name Your Pet'}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={petName}
          onChangeText={setPetName}
          placeholder={t('enterName') || 'Enter pet name...'}
          placeholderTextColor="#666"
          maxLength={20}
          autoFocus
        />

        <TouchableOpacity
          style={styles.randomButton}
          onPress={getRandomName}
        >
          <Text style={styles.randomButtonText}>🎲 {t('random') || 'Random'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={startGame}
      >
        <Text style={styles.startButtonText}>▶️ {t('start') || 'Start Game'}</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        {t('nameHint') || 'Leave blank for default name "Fluffy"'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00ff88',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#00d4ff',
    textAlign: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#16213e',
    color: '#fff',
    fontSize: 18,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00d4ff',
    marginBottom: 15,
    textAlign: 'center',
  },
  randomButton: {
    backgroundColor: '#0f3460',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  randomButtonText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#00ff88',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  startButtonText: {
    color: '#1a1a2e',
    fontSize: 20,
    fontWeight: 'bold',
  },
  hint: {
    marginTop: 30,
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
