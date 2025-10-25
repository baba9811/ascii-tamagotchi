import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Death'>;
  route: RouteProp<RootStackParamList, 'Death'>;
};

export default function DeathScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { deathReason, age } = route.params;

  const handleRestart = () => {
    // Navigate back to language selection for a fresh start
    navigation.reset({
      index: 0,
      routes: [{ name: 'LanguageSelect' }],
    });
  };

  const handleMainMenu = () => {
    navigation.navigate('LanguageSelect');
  };

  return (
    <View style={styles.container}>
      <View style={styles.deathContainer}>
        <Text style={styles.skull}>💀</Text>
        <Text style={styles.deathText}>{t('gameOver')}</Text>

        <View style={styles.statsContainer}>
          <Text style={styles.deathReason}>
            {t('causeOfDeath') || 'Cause of Death'}:
          </Text>
          <Text style={styles.deathReasonText}>{deathReason}</Text>

          <Text style={styles.survivalText}>
            {t('survived', { age })}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestart}
          >
            <Text style={styles.restartText}>🔄 {t('restart')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleMainMenu}
          >
            <Text style={styles.menuText}>🏠 {t('mainMenu') || 'Main Menu'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.quoteText}>
          "{t('deathQuote') || 'Life is fleeting, chaos is eternal.'}"
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  deathContainer: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  skull: {
    fontSize: 80,
    marginBottom: 20,
  },
  deathText: {
    fontSize: 36,
    color: '#ff4444',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 25,
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  deathReason: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  deathReasonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  survivalText: {
    fontSize: 16,
    color: '#00d4ff',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  restartButton: {
    backgroundColor: '#00ff88',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  restartText: {
    color: '#1a1a2e',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#0f3460',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  menuText: {
    color: '#00d4ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quoteText: {
    marginTop: 40,
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
