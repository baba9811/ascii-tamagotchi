/**
 * PetSprite Component
 *
 * Simple component for displaying pet sprite images.
 * This is a temporary test component to verify pixel art loading.
 *
 * Next phase (Priority 3): Replace with AnimatedSprite component
 * that supports frame-by-frame animation using sprite sheets.
 *
 * Usage:
 * ```tsx
 * <PetSprite
 *   sprite="idle"  // or "happy", "sad", etc.
 *   width={128}
 *   height={128}
 * />
 * ```
 */

import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface PetSpriteProps {
  /**
   * Sprite name - determines which sprite sheet to load
   * Options: "idle", "happy", "sad", "hungry", "sleeping", "sick", "dead"
   * Currently only supports static images (no animation yet)
   */
  sprite?: 'idle' | 'happy' | 'sad' | 'hungry' | 'sleeping' | 'sick' | 'dead';

  /**
   * Display width in pixels
   * Should be integer multiple of 64 (64, 128, 192, 256, etc.)
   * Default: 128 (2x scale)
   */
  width?: number;

  /**
   * Display height in pixels
   * Should be integer multiple of 64 (64, 128, 192, 256, etc.)
   * Default: 128 (2x scale)
   */
  height?: number;

  /**
   * Optional test mode - if true, displays placeholder
   */
  testMode?: boolean;
}

/**
 * Sprite source mapping
 * Add more sprites as they are created in assets/sprites/pets/
 */
const SPRITE_SOURCES: Record<string, ImageSourcePropType> = {
  // TODO: Uncomment as sprite files are created
  // idle: require('../../assets/sprites/pets/pet_idle.png'),
  // happy: require('../../assets/sprites/pets/pet_happy.png'),
  // sad: require('../../assets/sprites/pets/pet_sad.png'),
  // hungry: require('../../assets/sprites/pets/pet_hungry.png'),
  // sleeping: require('../../assets/sprites/pets/pet_sleeping.png'),
  // sick: require('../../assets/sprites/pets/pet_sick.png'),
  // dead: require('../../assets/sprites/pets/pet_dead.png'),
};

/**
 * PetSprite Component
 *
 * Displays a static pet sprite image.
 * Ensures pixel-perfect rendering (no blur) using integer scaling.
 *
 * @param props - Component props
 * @returns JSX.Element
 */
export const PetSprite: React.FC<PetSpriteProps> = ({
  sprite = 'idle',
  width = 128,
  height = 128,
  testMode = false,
}) => {
  // Get sprite source
  const spriteSource = SPRITE_SOURCES[sprite];

  // If test mode or sprite not found, show placeholder
  if (testMode || !spriteSource) {
    return (
      <View style={[styles.container, { width, height }]}>
        <View style={[styles.placeholder, { width, height }]}>
          {/* Placeholder - replace with actual sprite */}
          <View style={styles.placeholderText}>
            {/* Simple emoji placeholder until sprites are ready */}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={spriteSource}
        style={{ width, height }}
        // IMPORTANT: Use 'pixelated' to prevent blur on pixel art
        // This works on Android. For iOS/Web, may need additional config.
        resizeMode="pixelated"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 48,
  },
});

/**
 * TODO (Priority 3 - Sprite Animation System):
 *
 * Replace this component with AnimatedSprite that:
 * 1. Loads sprite sheet PNG + JSON
 * 2. Parses frame coordinates from JSON
 * 3. Animates frames using react-native-reanimated
 * 4. Supports different animations (idle, happy, sad, etc.)
 * 5. Handles state transitions smoothly
 *
 * Example future API:
 * ```tsx
 * <AnimatedSprite
 *   sprite="idle"
 *   playing={true}
 *   loop={true}
 *   fps={12}
 *   width={128}
 *   height={128}
 *   onComplete={() => console.log('Animation complete')}
 * />
 * ```
 */
