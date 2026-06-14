# Arcade Street Soccer – Fighting Game Style

A 1v1 side-view Street Fighter II-style arcade soccer game built with **Phaser 3.60**. Two expressive pixel-art strikers battle in an urban cage to score goals using fighting-game stamina and special moves.

Playable in any modern browser. Single HTML file, ready for GitHub Pages.

![Status](https://img.shields.io/badge/Phaser-3.60-red)

---

## Features

- 16-bit retro pixel art aesthetic
- Fighting-game HUD with stamina bars
- Player 1 vs AI opponent
- Normal Kick (Z) and **Kinetic Kick** Special (X - 50 stamina)
- Physics-based ball with bounce / friction
- Goal detection, score keeping, first-to-5 wins
- Pixel-perfect Arcade Physics collisions

## Controls

| Key | Action |
|-----|--------|
| ← / → Arrow Keys | Move Left / Right |
| Z | Normal Kick |
| X | Kinetic Kick Special (costs 50 Stamina) |

Stamina regenerates automatically ~18/sec.

## Project Structure

```
arcade-street-soccer/
├── index.html          # Game container + Phaser CDN loader
├── game.js             # Full Phaser 3 game logic, commented
├── assets/
│   ├── street_cage_bg.png  # 960x540 cage background
│   ├── striker_sheet.png   # 1400x765 sprite sheet, 140x153 frames
│   │                       # Idle 0-7, Run 10-17, Kick 20-29, Special 30-39
│   └── ball_pixel.png      # 32x32 soccer ball
├── ASSET_PROMPTS.md    # Full AI art prompts to regenerate/expand assets
└── README.md
```

## Running Locally

No build step needed.

1. Clone / download this folder
2. Serve via a local web server (required for Phaser asset loading):
   ```bash
   # Python 3
   python -m http.server 8000
   # then open http://localhost:8000
   ```
   Or with Node:
   ```bash
   npx serve .
   ```
3. Open `http://localhost:8000/index.html`

Directly opening `index.html` via `file://` will fail to load sprites due to CORS.

## Game Logic Overview – `game.js`

- `preload()` – Loads `background`, `ball`, `striker` spritesheet from `/assets`
- `create()` – Sets up physics world, players, ball, goal zones, fighting-game HUD, animations
- `update()` – Handles P1 input, AI movement, stamina regen, state locks during kick animations
- `doKick(player, isSpecial)` – Lock movement, play animation, apply impulse at frame peak
- `scoreGoal()` – Freeze, show "GOAL!", reset after 2s
- AI – Simple chase-ball + kick when in range, 35% chance to use special

Collisions:
```js
physics.add.collider(player1, player2)
physics.add.collider(ball, player1)
physics.add.collider(ball, player2)
physics.add.overlap(ball, goalLeft, scoreGoal)
```

## Customizing

- **Frame sizes**: Edit the `load.spritesheet()` call in `preload()`
- **Player speed / kick power**: See `CONFIG` object at top of `game.js`
- **2-Player local**: Map WASD + C/V to a second player, disable `updateAI()`
- **Proper P2 sprite**: Replace `player2.tint = 0xff8888` with a red jersey sprite sheet

## Deploying to GitHub Pages

GitHub Pages hosts static sites for free directly from a repo.

### Step-by-step

1. **Create a new GitHub repository**
   - Go to https://github.com/new
   - Repository name: `arcade-street-soccer`
   - Public
   - Do NOT initialize with README (we already have one)
   - Create repository

2. **Push this project**
   ```bash
   cd arcade-street-soccer
   git init
   git add .
   git commit -m "Initial commit: Arcade Street Soccer v1"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/arcade-street-soccer.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - In your repo on GitHub: **Settings → Pages**
   - Under "Build and deployment":
     - Source: **Deploy from a branch**
     - Branch: **main** / **(root)**
   - Click Save

4. **Wait ~1-2 minutes**
   - Your game will be live at:  
     `https://YOUR_USERNAME.github.io/arcade-street-soccer/`

5. **Updating**
   ```bash
   git add .
   git commit -m "Update"
   git push
   ```
   Pages redeploys automatically.

### Troubleshooting Pages
- 404 on assets? Make sure asset paths in `game.js` are relative: `'assets/ball_pixel.png'` – not `/assets/...`
- Black screen? Open browser console (F12). Usually a CORS / case-sensitive filename issue. GitHub Pages is case-sensitive.
- Game loads but sprites missing? Ensure the `assets/` folder was committed: `git add assets/`

---

## Credits

- Engine: [Phaser 3.60](https://phaser.io/)
- Art: Generated pixel art – see `ASSET_PROMPTS.md` for full prompts
- Font: System monospace (swap in 'Press Start 2P' from Google Fonts if desired)

MIT License – use freely.
