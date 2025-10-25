import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LanguageSelect'>;
};

export default function LanguageSelectScreen({ navigation }: Props) {
  const { i18n } = useTranslation();

  const selectLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    navigation.navigate('NameInput', { language: lang });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Chaotic Pet 🎮</Text>
      <Text style={styles.subtitle}>Select Language / 언어 선택 / 选择语言</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => selectLanguage('en')}
        >
          <Text style={styles.buttonText}>🇺🇸 English</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => selectLanguage('ko')}
        >
          <Text style={styles.buttonText}>🇰🇷 한국어</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => selectLanguage('zh')}
        >
          <Text style={styles.buttonText}>🇨🇳 中文</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        A dark humor virtual pet game
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00ff88',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 60,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  languageButton: {
    backgroundColor: '#e94560',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
