import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useGameStore } from '../stores/gameStore';
import SelectModal from '../components/SelectModal';
import InputModal from '../components/InputModal';
import { PetSprite } from '../components/PetSprite';
import { ViceType, FoodType, ToyType } from '../models/Pet';
import React from 'react';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>;
  route: RouteProp<RootStackParamList, 'Game'>;
};

export default function GameScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const {
    pet,
    turn,
    lastMessage,
    feedPet,
    playWithPet,
    sleepPet,
    cleanPoop,
    work,
    useVice,
    gamble,
    takeLoan,
    usePhone,
    findPartner,
    tick,
    getPetStats,
    isGameActive,
  } = useGameStore();

  // Modal states
  const [feedModalVisible, setFeedModalVisible] = useState(false);
  const [playModalVisible, setPlayModalVisible] = useState(false);
  const [viceModalVisible, setViceModalVisible] = useState(false);
  const [gambleModalVisible, setGambleModalVisible] = useState(false);
  const [loanModalVisible, setLoanModalVisible] = useState(false);

  const stats = getPetStats();
  const active = isGameActive();

  // Check for death and navigate to DeathScreen
  useEffect(() => {
    if (!active && pet) {
      navigation.navigate('Death', {
        deathReason: pet.getDeathReason(),
        age: stats?.age || 0,
      });
    }
  }, [active, pet, navigation, stats]);

  // Prevent back button during game
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Block back button during active game
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const handleAction = (action: () => void) => {
    action();
    tick(); // Time passes after each action
  };

  if (!stats) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>{t('loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 {t('title')} 🎮</Text>

      {/* Pet Display */}
      <View style={styles.petContainer}>
        {/*
          PetSprite Component - Shows pixel art sprite when available
          Falls back to emoji if sprite files don't exist yet

          To enable: Create pet_idle.png in assets/sprites/pets/
          and uncomment the line in PetSprite.tsx
        */}
        <PetSprite
          sprite="idle"
          width={128}
          height={128}
        />
        {/* Fallback emoji display (will be hidden once sprites are ready) */}
        <Text style={styles.petFace}>{stats.alive ? '(◕‿◕)' : '(✖╭╮✖)'}</Text>

        <Text style={styles.petName}>{pet?.name} ({t('age')}: {stats.age})</Text>
        <Text style={styles.petMood}>Status: {stats.mood.toUpperCase()}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>🍔 {t('hunger')}:</Text>
          <View style={styles.statBar}>
            <View style={[styles.statFill, {
              width: `${stats.hunger}%`,
              backgroundColor: stats.hunger > 70 ? '#ff4444' : stats.hunger > 40 ? '#ffaa00' : '#44ff44'
            }]} />
          </View>
          <Text style={styles.statValue}>{stats.hunger}%</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>😊 {t('happiness')}:</Text>
          <View style={styles.statBar}>
            <View style={[styles.statFill, {
              width: `${stats.happiness}%`,
              backgroundColor: stats.happiness > 60 ? '#44ff44' : stats.happiness > 30 ? '#ffaa00' : '#ff4444'
            }]} />
          </View>
          <Text style={styles.statValue}>{stats.happiness}%</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>⚡ {t('energy')}:</Text>
          <View style={styles.statBar}>
            <View style={[styles.statFill, {
              width: `${stats.energy}%`,
              backgroundColor: stats.energy > 50 ? '#44ff44' : stats.energy > 20 ? '#ffaa00' : '#ff4444'
            }]} />
          </View>
          <Text style={styles.statValue}>{stats.energy}%</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>💰 ${stats.money}</Text>
          <Text style={styles.infoText}>💸 {t('debt')}: ${stats.debt}</Text>
          <Text style={styles.infoText}>💩 {stats.poopCount}</Text>
        </View>
      </View>

      {/* Turn & Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.turnText}>{t('turn', { turn })}</Text>
        <Text style={styles.messageText}>{lastMessage || t('menuTitle')}</Text>
      </View>

      {/* Action Buttons */}
      {active && (
        <ScrollView style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setFeedModalVisible(true)}
          >
            <Text style={styles.actionText}>{t('feed')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setPlayModalVisible(true)}
          >
            <Text style={styles.actionText}>{t('play')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(sleepPet)}
          >
            <Text style={styles.actionText}>{t('sleep')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(cleanPoop)}
          >
            <Text style={styles.actionText}>{t('clean')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(work)}
          >
            <Text style={styles.actionText}>{t('work')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setViceModalVisible(true)}
          >
            <Text style={styles.actionText}>{t('vice')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setGambleModalVisible(true)}
          >
            <Text style={styles.actionText}>{t('gamble')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setLoanModalVisible(true)}
          >
            <Text style={styles.actionText}>{t('loan')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(usePhone)}
          >
            <Text style={styles.actionText}>{t('phone')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(findPartner)}
          >
            <Text style={styles.actionText}>{t('partner')}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Modals */}
      <SelectModal
        visible={feedModalVisible}
        title={t('feedPrompt')}
        options={[
          { label: t('pizza'), value: 'pizza', emoji: '🍕' },
          { label: t('burger'), value: 'burger', emoji: '🍔' },
          { label: t('apple'), value: 'apple', emoji: '🍎' },
          { label: t('cake'), value: 'cake', emoji: '🍰' },
          { label: t('carrot'), value: 'carrot', emoji: '🥕' },
          { label: t('sushi'), value: 'sushi', emoji: '🍣' },
        ]}
        onSelect={(value) => {
          handleAction(() => feedPet(value as FoodType));
        }}
        onClose={() => setFeedModalVisible(false)}
      />

      <SelectModal
        visible={playModalVisible}
        title={t('toyPrompt')}
        options={[
          { label: t('ball'), value: 'ball', emoji: '🎾' },
          { label: t('teddy'), value: 'teddy', emoji: '🧸' },
          { label: t('game'), value: 'game', emoji: '🎮' },
          { label: t('art'), value: 'art', emoji: '🎨' },
          { label: t('book'), value: 'book', emoji: '📚' },
        ]}
        onSelect={(value) => {
          handleAction(() => playWithPet(value as ToyType));
        }}
        onClose={() => setPlayModalVisible(false)}
      />

      <SelectModal
        visible={viceModalVisible}
        title={t('chooseVice')}
        options={[
          { label: t('beer'), value: 'beer', emoji: '🍺' },
          { label: t('cigarette'), value: 'cigarette', emoji: '🚬' },
          { label: t('pill'), value: 'pill', emoji: '💊' },
        ]}
        onSelect={(value) => {
          handleAction(() => useVice(value as ViceType));
        }}
        onClose={() => setViceModalVisible(false)}
      />

      <InputModal
        visible={gambleModalVisible}
        title={t('howMuchGamble')}
        description={t('gambleDescription')}
        maxValue={stats?.money || 0}
        onConfirm={(amount) => {
          handleAction(() => gamble(amount));
        }}
        onClose={() => setGambleModalVisible(false)}
      />

      <InputModal
        visible={loanModalVisible}
        title={t('howMuchLoan')}
        description={t('loanDescription')}
        onConfirm={(amount) => {
          handleAction(() => takeLoan(amount));
        }}
        onClose={() => setLoanModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff88',
    textAlign: 'center',
    marginBottom: 20,
  },
  petContainer: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  petFace: {
    fontSize: 48,
    marginBottom: 10,
  },
  petName: {
    fontSize: 20,
    color: '#00d4ff',
    fontWeight: 'bold',
  },
  petMood: {
    fontSize: 16,
    color: '#ffaa00',
    marginTop: 5,
  },
  statsContainer: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statLabel: {
    color: '#fff',
    width: 100,
    fontSize: 14,
  },
  statBar: {
    flex: 1,
    height: 20,
    backgroundColor: '#0f3460',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  statFill: {
    height: '100%',
  },
  statValue: {
    color: '#fff',
    width: 50,
    textAlign: 'right',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
  },
  messageContainer: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  turnText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
  },
  actionsContainer: {
    flex: 1,
  },
  actionButton: {
    backgroundColor: '#e94560',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
});
