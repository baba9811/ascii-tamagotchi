import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useGameStore } from './src/stores/gameStore';
import SelectModal from './src/components/SelectModal';
import InputModal from './src/components/InputModal';
import { ViceType } from './src/models/Pet';

export default function App() {
  const {
    pet,
    turn,
    lastMessage,
    initGame,
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
    resetGame,
    tick,
    getPetStats,
    isGameActive,
  } = useGameStore();

  // Modal states
  const [viceModalVisible, setViceModalVisible] = useState(false);
  const [gambleModalVisible, setGambleModalVisible] = useState(false);
  const [loanModalVisible, setLoanModalVisible] = useState(false);

  // Initialize game on mount
  useEffect(() => {
    if (!pet) {
      initGame('Fluffy');
    }
  }, []);

  const stats = getPetStats();
  const active = isGameActive();

  const handleAction = (action: () => void) => {
    action();
    tick(); // Time passes after each action
  };

  if (!stats) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>🎮 Chaotic Pet 🎮</Text>

      {/* Pet Display */}
      <View style={styles.petContainer}>
        <Text style={styles.petFace}>{stats.alive ? '(◕‿◕)' : '(✖╭╮✖)'}</Text>
        <Text style={styles.petName}>{pet?.name} (Age: {stats.age})</Text>
        <Text style={styles.petMood}>Status: {stats.mood.toUpperCase()}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>🍔 Hunger:</Text>
          <View style={styles.statBar}>
            <View style={[styles.statFill, {
              width: `${stats.hunger}%`,
              backgroundColor: stats.hunger > 70 ? '#ff4444' : stats.hunger > 40 ? '#ffaa00' : '#44ff44'
            }]} />
          </View>
          <Text style={styles.statValue}>{stats.hunger}%</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>😊 Happiness:</Text>
          <View style={styles.statBar}>
            <View style={[styles.statFill, {
              width: `${stats.happiness}%`,
              backgroundColor: stats.happiness > 60 ? '#44ff44' : stats.happiness > 30 ? '#ffaa00' : '#ff4444'
            }]} />
          </View>
          <Text style={styles.statValue}>{stats.happiness}%</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>⚡ Energy:</Text>
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
          <Text style={styles.infoText}>💸 Debt: ${stats.debt}</Text>
          <Text style={styles.infoText}>💩 {stats.poopCount}</Text>
        </View>
      </View>

      {/* Turn & Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.turnText}>Turn {turn}</Text>
        <Text style={styles.messageText}>{lastMessage || 'What will you do?'}</Text>
      </View>

      {/* Action Buttons */}
      {active && (
        <ScrollView style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(() => feedPet('pizza'))}
          >
            <Text style={styles.actionText}>🍕 Feed ($10)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(() => playWithPet('ball'))}
          >
            <Text style={styles.actionText}>🎾 Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(sleepPet)}
          >
            <Text style={styles.actionText}>😴 Sleep</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(cleanPoop)}
          >
            <Text style={styles.actionText}>💩 Clean Poop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(work)}
          >
            <Text style={styles.actionText}>💼 Work</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setViceModalVisible(true)}
          >
            <Text style={styles.actionText}>🍺 Vice ($15)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setGambleModalVisible(true)}
          >
            <Text style={styles.actionText}>🎰 Gamble</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setLoanModalVisible(true)}
          >
            <Text style={styles.actionText}>💸 Take Loan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(usePhone)}
          >
            <Text style={styles.actionText}>📱 Use Phone</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction(findPartner)}
          >
            <Text style={styles.actionText}>❤️ Find Partner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.quitButton]}
            onPress={() => resetGame()}
          >
            <Text style={styles.actionText}>🚪 Quit Game</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {!active && (
        <View style={styles.deathContainer}>
          <Text style={styles.deathText}>💀 Game Over 💀</Text>
          <Text style={styles.deathReason}>
            Cause: {pet?.getDeathReason()}
          </Text>
          <Text style={styles.deathStats}>
            Survived {stats.age} turns
          </Text>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={() => initGame('Fluffy')}
          >
            <Text style={styles.restartText}>🔄 Restart</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modals */}
      <SelectModal
        visible={viceModalVisible}
        title="Choose Your Vice"
        options={[
          { label: 'Beer', value: 'beer', emoji: '🍺' },
          { label: 'Cigarette', value: 'cigarette', emoji: '🚬' },
          { label: 'Pill', value: 'pill', emoji: '💊' },
        ]}
        onSelect={(value) => {
          handleAction(() => useVice(value as ViceType));
        }}
        onClose={() => setViceModalVisible(false)}
      />

      <InputModal
        visible={gambleModalVisible}
        title="How much to gamble?"
        description="40% chance to double your bet!"
        maxValue={stats?.money || 0}
        onConfirm={(amount) => {
          handleAction(() => gamble(amount));
        }}
        onClose={() => setGambleModalVisible(false)}
      />

      <InputModal
        visible={loanModalVisible}
        title="How much to borrow?"
        description="Debt compounds at 10% per turn!"
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
  quitButton: {
    backgroundColor: '#555',
    marginTop: 10,
  },
  deathContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deathText: {
    fontSize: 32,
    color: '#ff4444',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deathReason: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  deathStats: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#00ff88',
    padding: 15,
    borderRadius: 10,
    paddingHorizontal: 40,
  },
  restartText: {
    color: '#1a1a2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
