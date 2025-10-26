# Pixel Art Assets

This directory contains all source files for pixel art assets used in the Chaotic Pet mobile app.

## 📁 Directory Structure

```
assets/
├── aseprite/          # Aseprite source files (.aseprite)
│   ├── pets/          # Pet sprite animations
│   ├── items/         # Food, toys, vice items
│   └── ui/            # UI icons and elements
├── palettes/          # Color palettes
│   ├── sweetie16_hex.txt
│   ├── sweetie16.ase  (create in Aseprite)
│   └── README.md
└── reference/         # Reference images and sketches
    └── (add your references here)
```

## 🎨 Getting Started

### 1. Install Aseprite

**Option A: Purchase** ($19.99 - Recommended)
- Download from: https://www.aseprite.org/
- Or buy on Steam for automatic updates

**Option B: Compile from Source** (Free)
```bash
git clone --recursive https://github.com/aseprite/aseprite.git
cd aseprite
mkdir build && cd build
cmake -G Ninja ..
ninja aseprite
```

### 2. Load Color Palette

1. Open Aseprite
2. Create new sprite: File → New
   - Size: 64x64 (for pets)
   - Color Mode: Indexed
3. Load Sweetie 16 palette:
   - Option A: Palette → Load Palette → `palettes/sweetie16.ase`
   - Option B: Manually create from `palettes/sweetie16_hex.txt`

### 3. Create Your First Sprite

Follow the comprehensive guide:
- **[PIXEL_ART_STYLE_GUIDE.md](../private/PIXEL_ART_STYLE_GUIDE.md)** - Complete style guide

Quick start steps:
1. New sprite: 64x64, Indexed, Transparent background
2. Load Sweetie 16 palette
3. Draw outline with #1a1c2c (black)
4. Fill with base color (#ffcd75 or #ef7d57)
5. Add shading (#b13e53 or #5d275d)
6. Add eyes (3x3 pixels, #f4f4f4 white)
7. Add mouth (simple line or curve)

### 4. Create Animation

1. **First Frame**: Draw static pose on Frame 0
2. **Duplicate Frame**: Alt+B (or right-click → Duplicate)
3. **Modify Slightly**: Move a few pixels for motion
4. **Repeat**: Create 3-4 frames total
5. **Add Tag**: Timeline → New Tag → Name: "idle"
6. **Preview**: Press F7 to see animation loop

### 5. Export for Game

**File → Export Sprite Sheet**

**Image Tab**:
- Output: `../mobile/chaotic-pet/assets/sprites/pets/pet_idle.png`
- Sheet Type: Packed
- Padding: 1 pixel
- Trim Cels: Yes

**Data Tab**:
- Output: `../mobile/chaotic-pet/assets/sprites/pets/pet_idle.json`
- JSON Data: Checked
- Format: JSON Array
- Meta: Tags ✓, Frame Duration ✓

## 📋 Asset Checklist

### Pet Sprites (64x64)
Priority order:
- [ ] pet_idle.aseprite (3-4 frames) - **FIRST PRIORITY**
- [ ] pet_happy.aseprite (4-5 frames)
- [ ] pet_sad.aseprite (3-4 frames)
- [ ] pet_hungry.aseprite (3-4 frames)
- [ ] pet_sleeping.aseprite (2-3 frames)
- [ ] pet_sick.aseprite (3-4 frames)
- [ ] pet_dead.aseprite (1 frame)

### Food Icons (32x32)
- [ ] food_pizza.aseprite
- [ ] food_burger.aseprite
- [ ] food_apple.aseprite
- [ ] food_cake.aseprite
- [ ] food_carrot.aseprite
- [ ] food_sushi.aseprite

### Toy Icons (32x32)
- [ ] toy_ball.aseprite
- [ ] toy_teddy.aseprite
- [ ] toy_game.aseprite
- [ ] toy_art.aseprite
- [ ] toy_book.aseprite

### Vice Icons (32x32)
- [ ] vice_beer.aseprite
- [ ] vice_cigarette.aseprite
- [ ] vice_pill.aseprite

### UI Icons (16x16 or 32x32)
- [ ] ui_money.aseprite
- [ ] ui_heart.aseprite
- [ ] ui_energy.aseprite
- [ ] ui_poop.aseprite
- [ ] ui_phone.aseprite
- [ ] ui_work.aseprite

## 🎯 Quality Standards

Before exporting, verify:
- ✅ All colors from Sweetie 16 palette only
- ✅ Correct canvas size (64x64 for pets, 32x32 for items)
- ✅ Transparent background
- ✅ Animation tag set correctly
- ✅ Smooth loop (preview with F7)
- ✅ Centered in canvas

After exporting, verify:
- ✅ PNG file has transparent background
- ✅ JSON file has correct frame coordinates
- ✅ File size < 20KB
- ✅ Looks sharp in app (no blur)

## 📚 Resources

### Documentation
- [PIXEL_ART_STYLE_GUIDE.md](../private/PIXEL_ART_STYLE_GUIDE.md) - **Complete style guide**
- [Implementation Plan](../private/plans/phase-3-2-pixel-art-design.md) - Detailed workflow

### Tutorials
- **Aseprite Official**: https://www.aseprite.org/docs/tutorial/
- **Animation Guide**: https://www.aseprite.org/docs/animation/
- **MortMort (YouTube)**: Beginner-friendly Aseprite tutorials
- **HeartBeast (YouTube)**: Run cycle and animation tutorials

### Inspiration
- **Lospec**: https://lospec.com/gallery
- **OpenGameArt**: https://opengameart.org/art-search?keys=pixel
- **Tamagotchi sprites** (reference)
- **Pou sprites** (modern mobile pet example)

## 💡 Tips

### Beginner Tips
1. **Start Simple**: Basic shapes, minimal detail
2. **Use References**: Study Tamagotchi, Pou, Stardew Valley
3. **Save Often**: Ctrl+S after every change
4. **Onion Skinning**: F3 to see previous frames
5. **Preview Constantly**: F7 to check animation smoothness

### Common Mistakes to Avoid
❌ Using colors outside the palette
❌ Forgetting to set animation tags
❌ Making frames too different (jarring animation)
❌ Not centering character in canvas
❌ Exporting without transparent background

### Pro Tips
✅ Use layers for easy editing (Base, Shading, Outline, Features)
✅ Duplicate frame with Alt+B for consistency
✅ Use Ctrl+Z liberally - experiment freely
✅ Test at 2x, 3x scale to see how it looks in-game
✅ Keep first and last frames similar for smooth loops

## 🚀 Workflow Example

**Creating pet_idle.aseprite** (estimated 2-4 hours):

1. **Setup** (5 min)
   - New sprite: 64x64, Indexed
   - Load Sweetie 16 palette
   - Save as: `aseprite/pets/pet_idle.aseprite`

2. **Frame 0 - Base Pose** (30-60 min)
   - Draw outline (black)
   - Fill body (yellow or orange)
   - Add shading (dark red or purple)
   - Add eyes (3x3, white + black)
   - Add mouth (simple line)

3. **Animation** (60-90 min)
   - Alt+B to duplicate Frame 0
   - Modify slightly for breathing effect
   - Create 3-4 frames total
   - Add "idle" tag (Timeline → New Tag)
   - Preview (F7) and adjust timing

4. **Polish** (15-30 min)
   - Refine rough edges
   - Ensure smooth loop
   - Check centering
   - Final preview

5. **Export** (5 min)
   - Export Sprite Sheet (PNG + JSON)
   - Verify files generated correctly
   - Test in app

**Total Time**: 2-4 hours for first sprite (gets faster with practice!)

## ❓ Troubleshooting

### "My sprite looks blurry in the app"
- Use `resizeMode="pixelated"` in Image component
- Scale by integer multiples only (64→128, not 64→100)
- Check that PNG export has no anti-aliasing

### "Colors don't match palette"
- Switch to Indexed color mode
- Lock palette to prevent accidental colors
- Use Eyedropper (I key) to pick from palette

### "Animation doesn't loop smoothly"
- Make sure first and last frames are similar
- Use Ping-pong loop direction
- Adjust frame durations (Timeline)

### "Export failed or JSON is empty"
- Check that animation tags are set
- Verify "JSON Data" is checked in export dialog
- Make sure frames have non-zero duration

## 📧 Need Help?

- Check [PIXEL_ART_STYLE_GUIDE.md](../private/PIXEL_ART_STYLE_GUIDE.md) first
- Review [Implementation Plan](../private/plans/phase-3-2-pixel-art-design.md)
- Ask in project Discord/Slack
- Consult Aseprite docs: https://www.aseprite.org/docs/

---

**Last Updated**: 2025-10-26
**Status**: Ready for asset creation
**Next**: Create pet_idle.aseprite (Priority 1)
