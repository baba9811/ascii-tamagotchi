/**
 * Global Game State Store
 * Using Zustand for state management
 */

import { create } from 'zustand';
import { Pet, PetStats, FoodType, ToyType, ViceType } from '../models/Pet';

interface GameStore {
  // State
  pet: Pet | null;
  turn: number;
  lastMessage: string;

  // Actions
  initGame: (petName: string) => void;
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
    const { pet, turn } = get();
    if (!pet) return;

    pet.tick();
    set({ turn: turn + 1 });
  },

  // Reset game
  resetGame: () => {
    set({
      pet: null,
      turn: 0,
      lastMessage: '',
    });
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
