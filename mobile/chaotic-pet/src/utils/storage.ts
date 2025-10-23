/**
 * Storage Utility
 * Handles game state persistence using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pet } from '../models/Pet';

const GAME_STATE_KEY = '@chaotic_pet:game_state';

export interface SavedGameState {
  pet: {
    name: string;
    stats: any;
  };
  turn: number;
  lastMessage: string;
  savedAt: string;
}

/**
 * Save game state to local storage
 */
export async function saveGame(
  pet: Pet | null,
  turn: number,
  lastMessage: string
): Promise<boolean> {
  try {
    if (!pet) {
      console.log('[Storage] No pet to save');
      return false;
    }

    const gameState: SavedGameState = {
      pet: {
        name: pet.name,
        stats: pet.stats,
      },
      turn,
      lastMessage,
      savedAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    console.log('[Storage] Game saved successfully at turn', turn);
    return true;
  } catch (error) {
    console.error('[Storage] Failed to save game:', error);
    return false;
  }
}

/**
 * Load game state from local storage
 */
export async function loadGame(): Promise<SavedGameState | null> {
  try {
    const savedData = await AsyncStorage.getItem(GAME_STATE_KEY);

    if (!savedData) {
      console.log('[Storage] No saved game found');
      return null;
    }

    const gameState: SavedGameState = JSON.parse(savedData);
    console.log('[Storage] Game loaded successfully from', gameState.savedAt);
    return gameState;
  } catch (error) {
    console.error('[Storage] Failed to load game:', error);
    return null;
  }
}

/**
 * Delete saved game from local storage
 */
export async function deleteSavedGame(): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(GAME_STATE_KEY);
    console.log('[Storage] Saved game deleted');
    return true;
  } catch (error) {
    console.error('[Storage] Failed to delete saved game:', error);
    return false;
  }
}

/**
 * Check if saved game exists
 */
export async function hasSavedGame(): Promise<boolean> {
  try {
    const savedData = await AsyncStorage.getItem(GAME_STATE_KEY);
    return savedData !== null;
  } catch (error) {
    console.error('[Storage] Failed to check saved game:', error);
    return false;
  }
}
