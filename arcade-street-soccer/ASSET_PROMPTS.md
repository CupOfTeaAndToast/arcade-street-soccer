# Arcade Street Soccer - Asset Generation Prompts

These are production-ready prompts for generating consistent 16-bit pixel art assets with tools like Midjourney, Stable Diffusion XL, DALL-E, Leonardo.ai, etc.

All assets should be: **16-bit retro pixel art, crisp pixels, no blur, no anti-aliasing, transparent background unless noted, Street Fighter II / Neo Geo / CPS-2 arcade aesthetic**

---

### 1. Background - `street_cage_bg.png`
**Resolution:** 960x540 (or 1920x1080 for 2x)
**Prompt:**
```
16-bit retro pixel art game background, side-view street soccer cage / futsal court, gritty urban alley at dusk, chain-link fence mid-ground, graffiti-covered red brick walls, cracked concrete ground with painted futsal lines, two small street soccer goals left and right edge of screen, neon signs in background "FUTSAL", warm streetlamp glow, trash cans and cardboard boxes for atmosphere, Street Fighter II arcade stage style, flat 2D fighting game perspective, no characters, no ball, vivid but gritty color palette
```
**Negative prompt:** characters, people, players, ball, blurry, photorealistic, 3D

---

### 2. Character Sprite Sheet - `striker_sheet.png`

You need 36 frames total, laid out in a clean grid.

**Recommended grid:** 8 columns × 5 rows = 40 slots (4 empty)
**Frame size:** 64x64 px or 128x128 px
**Transparent background, consistent lighting, same character throughout**

**Character Design:**
```
16-bit pixel art street soccer striker, male, athletic, 18-22 years old, spiky dark brown hair, blue soccer jersey with number 7, white shorts, blue socks, black street cleats, expressive anime-inspired fighter stance, Capcom CPS-2 / Street Fighter Alpha style
```

**Animation Breakdown - generate in 4 passes for consistency:**

**A. Idle Animation (8 frames)**
```
sprite sheet grid, street soccer striker idle breathing animation, subtle bounce, looking at camera, arms loose, ready stance, 8 frames left-to-right, 16-bit pixel art, transparent background
```

**B. Run Animation (8 frames)**
```
sprite sheet grid, street soccer striker running cycle, side view, full run loop, 8 frames, 16-bit pixel art, transparent background, same character as idle
```

**C. Standard Kick Animation (10 frames)**
```
sprite sheet grid, street soccer striker kicking animation, wind-up, leg swing, follow-through, impact dust puff, 10 frames, 16-bit pixel art, transparent background, same character
```

**D. "Kinetic Kick" Special Move Animation (10 frames)**
```
sprite sheet grid, street soccer striker special move KINETIC KICK, charging blue energy aura around foot, spinning crescent kick trail, glowing cyan motion blur, impact sparkles, over-the-top fighting game special, 10 frames, 16-bit pixel art, transparent background, same character
```

**Sprite Sheet Assembly Notes:**
- Idle frames: 0-7
- Run frames: 8-15
- Kick frames: 16-25
- Special frames: 26-35
- Frame size: 64x64 or 128x128 (be consistent)
- Export as PNG with transparency
- No grid lines in final sheet
- Character centered in each cell, feet at same baseline

**Tool tip:** Generate each animation separately with a character reference / seed for consistency, then pack with https://www.leshylabs.com/apps/sstool/ or Aseprite.

---

### 3. Ball - `ball_pixel.png`
**Resolution:** 32x32 px (will be scaled in-game)
**Prompt:**
```
16-bit pixel art soccer ball, classic black and white pentagon pattern, clean retro sprite, transparent background, centered, crisp pixels, no blur, no shadow, SNES era
```

---

### 4. Optional: Player 2 Variant
For a proper 2-player version, duplicate the striker sheet and recolor:
- Jersey: Red #ff4a4a
- Socks: Red
- Keep skin/hair/shorts the same

You can also just use Phaser's `setTint(0xff8888)` at runtime, which is what the included game does.

---

### Style Bible
- **Palette:** Gritty urban, neon accents cyan/orange
- **Resolution:** Low-res pixel art, integer scaling only
- **Reference games:** Street Fighter III: 3rd Strike, Garou: Mark of the Wolves, Neo Geo Cup '98
- **No:** gradients, blur, modern smooth shading
- **Yes:** dithering, limited 16-bit palette, bold outlines, 2-3 shade ramps
