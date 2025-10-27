# Pet Sprites Directory

This directory contains exported pet sprite sheets for use in the React Native app.

## 📁 Expected Files

For each pet state, you'll have two files:

### Idle State (First Priority)
- `pet_idle.png` - Sprite sheet with all animation frames
- `pet_idle.json` - Frame coordinates and animation data

### Other States (Create After Idle)
- `pet_happy.png` + `pet_happy.json`
- `pet_sad.png` + `pet_sad.json`
- `pet_hungry.png` + `pet_hungry.json`
- `pet_sleeping.png` + `pet_sleeping.json`
- `pet_sick.png` + `pet_sick.json`
- `pet_dead.png` + `pet_dead.json` (static, may not need JSON)

## 🎨 How to Add Sprites

### Step 1: Create Sprite in Aseprite
Follow the guide: `private/plans/IDLE_SPRITE_CREATION_GUIDE.md`

### Step 2: Export from Aseprite
1. File → Export Sprite Sheet
2. **Image Tab**:
   - Output File: (this directory)/pet_idle.png
   - Sheet Type: Packed
   - Padding: 1 pixel
3. **Data Tab**:
   - Output File: (this directory)/pet_idle.json
   - JSON Data: ✓ Checked
   - Tags: ✓, Frame Duration: ✓

### Step 3: Verify Files
- [ ] PNG file has transparent background
- [ ] PNG file size < 20KB
- [ ] JSON file is valid and contains frame data

### Step 4: Enable in Code
Edit `src/components/PetSprite.tsx`:

```typescript
const SPRITE_SOURCES = {
  idle: require('../../assets/sprites/pets/pet_idle.png'), // Uncomment this line
  // ... other sprites
};
```

### Step 5: Test in App
The sprite will automatically load when you run the app!

## 📊 Current Status

- [ ] pet_idle.png (Priority 1 - Next to create)
- [ ] pet_happy.png
- [ ] pet_sad.png
- [ ] pet_hungry.png
- [ ] pet_sleeping.png
- [ ] pet_sick.png
- [ ] pet_dead.png

## 🔗 Related Files

**Source Files** (Aseprite):
- `assets/aseprite/pets/pet_idle.aseprite`
- Keep these files - they're your original artwork!

**Component**:
- `src/components/PetSprite.tsx` - Loads and displays sprites

**Style Guide**:
- `private/PIXEL_ART_STYLE_GUIDE.md` - Complete style reference

## 🎯 Integration

Once pet_idle.png and pet_idle.json exist:

1. Uncomment the `idle` line in `PetSprite.tsx`
2. Use the component in GameScreen:
   ```tsx
   <PetSprite sprite="idle" width={128} height={128} />
   ```
3. The sprite will display automatically!

---

**Status**: Waiting for first sprite (pet_idle)
**Next**: Create pet_idle.aseprite following the guide
