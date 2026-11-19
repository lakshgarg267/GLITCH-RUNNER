# PROJECT AUDIT — GLITCH RUNNER

Date: 2026-10-01  
Repo: CODE-ARENAA (product name: GLITCH RUNNER)

## Current architecture

Single-page vanilla HTML/CSS/JavaScript. No bundler, no `package.json`, no backend.

```
index.html
  css/ style.css, themes.css, animations.css
  js/state.js          localStorage persistence
  js/curriculum/*.js   10 language quiz banks
  js/levels.js         normalizes ~510 levels
  js/gameEngine.js     arena MCQ / builder / boss
  js/runner3d/*        Three.js endless runner
  js/worldMap.js, store, achievements, daily, leaderboard, app.js
```

Arena loop (legacy): show code snippet → multiple-choice or tile reorder → VFX → XP/coins.

## Existing features (working)

- Hub, world cards, 7-sector map, 51 nodes per language
- Five CSS themes, persisted
- XP, ranks, coins, stars, lives, power-ups, store
- Quiz curriculum (~510 levels, 70 bosses)
- Code-builder reorder mode
- 3D runner (lanes, jump/slide, coins, gates)
- 3D live script can call `runner.jump()` / `setSpeed()` via `new Function`
- Procedural SFX (Web Audio)
- Achievements and daily streak (client-side)

## Missing / incomplete (before this implementation pass)

- Most missions did not execute player code
- Editor, test runner, challenge engine existed as unused files
- No challenge JSON with public/hidden tests
- No isolated JS execution timeout
- Leaderboard mixed with demo names
- Daily mission was a static MCQ
- No PWA, auth, or server-side rewards
- `user-select: none` on `body` blocked editor text selection

## Bugs and debt

- `mode === 'runner'` map nodes launched 3D instead of the timed quiz
- `languagesPlayed` stored as a `Set` and broke on JSON round-trip
- `new Function` ran in the page (XSS / freeze risk)
- Rewards trusted the client (acceptable until a backend exists; do not claim they are cheat-proof)

## Recommended architecture

Extend vanilla JS. Do not introduce React until APIs and auth exist.

1. Data-driven challenges (`testCases`, `hiddenTests`, `starterCode`, `entryFunction`, `sim`)
2. Editor in the arena
3. JS Web Worker sandbox with timeout (browser-only; other languages need a server runner later)
4. Deterministic simulation whose actions come from function return values
5. Validator → win/lose → existing `GameState` XP/coins/stars

Migration: keep MCQ levels. Convert or add write-code levels one at a time. First vertical slice is JavaScript Glitch Hunter on world level 1.
