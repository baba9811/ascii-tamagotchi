# Sprite Generation Scripts

This directory contains scripts for generating sprites programmatically.

## generate_test_sprite.py

**Purpose**: Generate a simple test sprite for the Idle animation

**Features**:
- Creates a cute blob character using Sweetie 16 palette
- 3 frames of breathing animation
- Outputs PNG sprite sheet + JSON metadata
- Pixel-perfect 64x64 sprites
- ~900 bytes total file size

**Usage**:
```bash
uv run python scripts/generate_test_sprite.py
```

**Output**:
- `mobile/chaotic-pet/assets/sprites/pets/pet_idle.png` - Sprite sheet (192x64, 3 frames)
- `mobile/chaotic-pet/assets/sprites/pets/pet_idle.json` - Frame metadata
- `mobile/chaotic-pet/assets/sprites/pets/preview/` - Individual frame previews

**What it creates**:
- Yellow/orange blob character
- Black eyes with white highlights
- Simple smile
- Pink blush marks
- Breathing animation (expands 2 pixels on frame 1)

**Note**: This is a test/placeholder sprite. For final production, use Aseprite following the style guide!

---

## Future Scripts

Ideas for additional sprite generation scripts:

- `generate_all_moods.py` - Generate all 7 pet states
- `generate_icons.py` - Generate food/toy/vice icons
- `sprite_optimizer.py` - Optimize existing sprites
- `palette_converter.py` - Convert colors to Sweetie 16

---

**Last Updated**: 2025-10-28
**Dependencies**: Pillow (via uv)
