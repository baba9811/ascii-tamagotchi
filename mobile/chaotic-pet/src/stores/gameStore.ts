/**
 * Global Game State Store
 * Using Zustand for state management
 */

import { create } from 'zustand';
import { Pet, PetStats, FoodType, ToyType, ViceType } from '../models/Pet';
import { saveGame, loadGame, deleteSavedGame } from '../utils/storage';

interface GameStore {
  // State
  pet: Pet | null;
  turn: number;
  lastMessage: string;

  // Actions
  initGame: (petName: string) => void;
  loadSavedGame: () => Promise<boolean>;
  feedPet: (food: FoodType) => void;
  playWithPet: (toy: ToyType) => void;
  sleepPet: () => void;
  cleanPoop: () => void;
  useVice: (vice: ViceType) => void;
  gamble: (amount: number) => void;
  work: () => void;
  takeLoan: (amount: number) => void;
  usePhone: () => void;
  findPartner: () => void;
  tick: () => void;
  resetGame: () => void;
  saveCurrentGame: () => Promise<boolean>;

  // Getters
  getPetStats: () => PetStats | null;
  isGameActive: () => boolean;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial State
  pet: null,
  turn: 0,
  lastMessage: '',

  // Initialize new game
  initGame: (petName: string) => {
    const newPet = new Pet(petName);
    set({
      pet: newPet,
      turn: 0,
      lastMessage: `Welcome, ${petName}! Let the chaos begin!`,
    });
    // Auto-save after init
    saveGame(newPet, 0, `Welcome, ${petName}! Let the chaos begin!`);
  },

  // Load saved game
  loadSavedGame: async () => {
    const savedState = await loadGame();
    if (!savedState) {
      return false;
    }

    // Reconstruct Pet instance from saved data
    const restoredPet = new Pet(savedState.pet.name);
    restoredPet.stats = savedState.pet.stats;

    set({
      pet: restoredPet,
      turn: savedState.turn,
      lastMessage: savedState.lastMessage,
    });

    console.log('[GameStore] Game loaded successfully');
    return true;
  },

  // Feed action
  feedPet: (food: FoodType) => {
    const { pet } = get();
    if (!pet) return;

    const message = pet.feed(food);
    set({ lastMessage: message });
  },

  // Play action
  playWithPet: (toy: ToyType) => {
    const { pet } = get();
    if (!pet) return;

    const message = pet.play(toy);
    set({ lastMessage: message });
  },

  // Sleep action
  sleepPet: () => {
    const { pet } = get();
    if (!pet) return;

    const message = pet.sleep();
    set({ lastMessage: message });
  },

  // Clean poop action
  cleanPoop: () => {
    const { pet } = get();
    if (!pet) return;

    const message = pet.cleanPoop();
    set({ lastMessage: message });
  },

  // Use vice action
  useVice: (vice: ViceType) => {
    const { pet } = get();
    if (!pet) return;

    const message = pet.useVice(vice);
    set({ lastMessage: message });
  },

  // Gamble action
  gamble: (amount: number) => {
    const { pet } = get();
    if (!pet) return;

    const message = pet.gamble(amount);
    set({ lastMessage: message });
  },

  // Work action
  work: () => {
    const { pet } = get();
    if (!pet) return;

    const message = pet.work();
    set({ lastMessage: message });
  },

  // Take loan action
  takeLoan: (amount: number) => {
    const { pet } = get();
    if (!pet) return;

    const message = pet.takeLoan(amount);
    set({ lastMessage: message });
  },

  // Use phone action
  usePhone: () => {
    const { pet } = get();
    if (!pet) return;

    const message = pet.usePhone();
    set({ lastMessage: message });
  },

  // Find partner action
  findPartner: () => {
    const { pet } = get();
    if (!pet) return;

    const message = pet.findPartner();
    set({ lastMessage: message });
  },

  // Tick (time passes)
  tick: () => {
    const { pet, turn, lastMessage } = get();
    if (!pet) return;

    pet.tick();
    const newTurn = turn + 1;
    set({ turn: newTurn });

    // Auto-save after each turn
    saveGame(pet, newTurn, lastMessage);
  },

  // Reset game
  resetGame: () => {
    set({
      pet: null,
      turn: 0,
      lastMessage: '',
    });
    // Delete saved game
    deleteSavedGame();
  },

  // Manual save
  saveCurrentGame: async () => {
    const { pet, turn, lastMessage } = get();
    return await saveGame(pet, turn, lastMessage);
  },

  // Getters
  getPetStats: () => {
    const { pet } = get();
    return pet ? pet.stats : null;
  },

  isGameActive: () => {
    const { pet } = get();
    return pet !== null && pet.stats.alive;
  },
}));
