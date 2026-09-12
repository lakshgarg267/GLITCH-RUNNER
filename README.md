# 🎮 GLITCH RUNNER - CODING ADVENTURE GAME

> **"ENTER THE CODE. FIX THE GLITCH. MASTER THE WORLD."**

**GLITCH RUNNER** is an action-adventure coding game built with **pure HTML5, CSS3, and Vanilla JavaScript** with `localStorage` state persistence.

Coding is the mechanic used to battle corrupted digital entities, unlock security gates, disarm rogue firewalls, and vanquish massive multi-phase Bosses across 10 programming language worlds.

---

## ⚡ Game Concept & Architecture

The player is a **GLITCH HUNTER** exploring cyberspace:

$$\text{Deploy Operative} \longrightarrow \text{Assess Anomaly} \longrightarrow \text{Execute Code Fix / Trace} \longrightarrow \text{Discharge Plasma Beam} \longrightarrow \text{Earn XP + Coins + Stars} \longrightarrow \text{Unlock Sectors & Bosses} \longrightarrow \text{Ascend Ranks}$$

---

## 🌟 Key Gameplay Innovations

### 1. 🎮 Visual Action Combat Stage
Unlike traditional quiz websites, GLITCH RUNNER features an active 2.5D visual combat arena:
- **Left**: The **Player Operative** sprite with energy aura, customizable avatar, health status, and plasma discharge animations.
- **Center**: Trajectory zone with **animated laser beams**, **floating combat text** (`-100 DMG!`, `CRITICAL HIT!`), **Combo Multiplier counter** (`1.5x`, `2.0x`, `3.0x HYPER!`), and speed-run timer.
- **Right**: The **Target Glitch Entity / World Boss** with animated flinch/damage recoil, speech taunts, and live corruption/health meter.

### 2. 🗺️ 51-Level Comprehensive Curriculum per Language
Each of the 10 programming languages features a full 51-level journey divided into **7 Thematic Areas** with **7 Epic Boss Battles**:
- **Levels 1–7**: Foundations & Core Syntax ➔ **Level 8: BOSS 1**
- **Levels 9–15**: Conditions & Logic ➔ **Level 16: BOSS 2**
- **Levels 17–23**: Loops & Iteration ➔ **Level 24: BOSS 3**
- **Levels 25–31**: Functions & Scopes ➔ **Level 32: BOSS 4**
- **Levels 33–39**: Data Structures & Collections ➔ **Level 40: BOSS 5**
- **Levels 41–47**: Advanced Architectures & OOP ➔ **Level 48: BOSS 6**
- **Levels 49–50**: Master Core Concepts ➔ **Level 51: FINAL BOSS / LANGUAGE MASTERY BATTLE**

### 3. 👹 Boss Battle Events
Every 7 levels leads to a special Boss encounter:
- Real-time Boss health bar (500–1200 HP).
- Multi-phase combat waves testing skills learned in the sector.
- Each correct solution launches a beam attack dealing direct damage.
- Wrong answers trigger boss retaliatory strikes (-1 life heart).
- Defeating a Boss awards massive XP (+500–1500 XP), bonus coins (+200–500 🪙), stars, and unlocks the next sector.

### 4. 🔥 Combo Multiplier System
- Consecutive successful code executions build an escalating combo meter:
  $$1.0\text{x} \longrightarrow 1.5\text{x} \longrightarrow 2.0\text{x} \longrightarrow 3.0\text{x (MAX HYPER!)}$$
- The combo directly multiplies score, XP, and coin payouts!
- Mistakes break the combo, shake the screen, and damage the operative.

### 5. 🎯 5 Core Mission Modes
1. **🐛 Glitch Hunter (Bug Fixing)**: Identify and patch corrupted code tokens, syntax typos, and logic faults.
2. **🏃 Code Runner (Speed Run)**: High-urgency timed challenges with animated countdown bar and speed bonuses.
3. **🔍 Output Detective (Logic Trace)**: Trace step-by-step code execution and diagnose exact console output.
4. **🧩 Code Builder (Puzzle Pipeline)**: Reorder scrambled logic blocks using drag-and-drop or touch arrow controls.
5. **👹 Boss Battle (Combat Encounter)**: Multi-stage combat against sector guardians and final titans.

### 6. ❤️ Life & Power-Up System
- Default: 3 Lives ($❤️❤️❤️$).
- **Tactical Power-Ups**:
  - 💡 **HINT**: Reveals clues and eliminates false options.
  - ⏱️ **TIME BOOST**: Adds +20 seconds to the timer.
  - ❤️ **EXTRA LIFE**: Restores 1 life heart.
  - 🛡️ **ENERGY SHIELD**: Absorbs 1 mistake without damage.
- Fair recovery on Game Over: revive with coins or retry.

### 7. 🎨 5 Dynamic CSS Themes
1. **Cyber Hacker**: Emerald green and dark terminal.
2. **Neon City**: Synthwave magenta and electric cyan.
3. **The Matrix**: Digital rain monochrome green.
4. **Space Station**: Deep cosmic blue and pulsar accents.
5. **Retro Terminal**: 1980s amber phosphor CRT with scanlines.

### 8. 🔊 Procedural Web Audio Synthesizer
- Uses native Web Audio API oscillators and gain envelopes.
- Generates 8-bit laser zaps, coin chimes, error buzzes, boss hit explosions, and victory fanfare with zero external audio assets.
- 100% offline and latency-free.

---

## 📁 File Structure

```
CODE-ARENAA/
├── index.html              # Main game layout and interactive game stage
├── README.md               # Game overview & documentation
├── css/
│   ├── style.css           # Core styling, visual game arena, and responsive layout
│   ├── themes.css          # 5 switchable CSS themes via data-theme
│   └── animations.css      # Glitch effects, screen shakes, lasers, combat text
└── js/
    ├── app.js              # Application controller and modal orchestrator
    ├── state.js            # LocalStorage persistence, economy, and event bus
    ├── audio.js            # Procedural Web Audio API sound synthesizer
    ├── visualFx.js         # Canvas cyber particle background & visual effects
    ├── levels.js           # 51-level curriculum repository across 10 worlds
    ├── gameEngine.js       # Action game loop, combat stage, combos, and bosses
    ├── worldMap.js         # 7-sector progressive roadmap engine
    ├── store.js            # Cyber marketplace for power-ups, avatars, and themes
    ├── achievements.js     # Badges and achievement reward triggers
    ├── daily.js            # Daily glitch challenge and 7-day streak calendar
    └── leaderboard.js      # Competitive leaderboard with dynamic player rank
```

---

## 🚀 Running the Game

Open [index.html](file:///c:/Users/Lakshay%20Garg/OneDrive/Desktop/CODE-ARENAA/index.html) directly in any modern web browser or start a local server:

```powershell
python -m http.server 8000
```
Navigate to `http://localhost:8000` to play!