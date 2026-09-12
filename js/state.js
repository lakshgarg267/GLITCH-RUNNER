/**
 * GLITCH RUNNER - STATE & SAVE MANAGEMENT SYSTEM
 * Handles localStorage persistence, player progression, economy, and event bus.
 */

const STORAGE_KEY = 'GLITCH_RUNNER_DATA_V1';

const DEFAULT_STATE = {
  player: {
    username: 'CodeHunter',
    avatar: '⚡',
    level: 1,
    xp: 0,
    coins: 120,
    stars: 0,
    totalScore: 0,
    levelsCompleted: 0,
    totalCorrect: 0,
    totalAttempts: 0,
    currentStreak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    streakClaimedDate: null,
    rank: 'BEGINNER'
  },
  inventory: {
    hints: 3,
    timeBoosts: 2,
    extraLives: 2,
    shields: 1
  },
  worlds: {
    // 5 Free Worlds
    javascript: { unlocked: true, completedLevels: {}, starsEarned: 0, bossDefeated: false },
    python:     { unlocked: true, completedLevels: {}, starsEarned: 0, bossDefeated: false },
    c:          { unlocked: true, completedLevels: {}, starsEarned: 0, bossDefeated: false },
    java:       { unlocked: true, completedLevels: {}, starsEarned: 0, bossDefeated: false },
    html:       { unlocked: true, completedLevels: {}, starsEarned: 0, bossDefeated: false },
    // 5 Premium Worlds (Unlocked via Coins or Stars)
    cpp:        { unlocked: false, completedLevels: {}, starsEarned: 0, bossDefeated: false, unlockPrice: 300 },
    csharp:     { unlocked: false, completedLevels: {}, starsEarned: 0, bossDefeated: false, unlockPrice: 300 },
    go:         { unlocked: false, completedLevels: {}, starsEarned: 0, bossDefeated: false, unlockPrice: 350 },
    ruby:       { unlocked: false, completedLevels: {}, starsEarned: 0, bossDefeated: false, unlockPrice: 350 },
    swift:      { unlocked: false, completedLevels: {}, starsEarned: 0, bossDefeated: false, unlockPrice: 400 }
  },
  customization: {
    activeTheme: 'cyber-hacker',
    unlockedThemes: ['cyber-hacker', 'neon-city'],
    activeAvatar: '⚡',
    unlockedAvatars: ['⚡', '🤖', '👾', '💻']
  },
  achievements: {
    unlocked: [],
    progress: {
      bugsFixed: 0,
      timedCompleted: 0,
      bossesDefeated: 0,
      languagesPlayed: new Set(),
      perfectRuns: 0
    }
  },
  daily: {
    lastCompletedDate: null,
    streakDay: 1
  },
  settings: {
    soundEnabled: true,
    sfxVolume: 0.75,
    musicEnabled: true
  }
};

class StateManager {
  constructor() {
    this.listeners = {};
    this.data = this.load();
    this.checkDailyStreak();
  }

  // Pub/Sub Event System
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, payload) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try { cb(payload); } catch(err) { console.error('Event error:', err); }
      });
    }
  }

  // Load from LocalStorage with migration/fallback
  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with defaults to safeguard new schema additions
        const merged = {
          ...DEFAULT_STATE,
          ...parsed,
          player: { ...DEFAULT_STATE.player, ...parsed.player },
          inventory: { ...DEFAULT_STATE.inventory, ...parsed.inventory },
          worlds: { ...DEFAULT_STATE.worlds, ...parsed.worlds },
          customization: { ...DEFAULT_STATE.customization, ...parsed.customization },
          settings: { ...DEFAULT_STATE.settings, ...parsed.settings }
        };
        // Rebuild Set for languages played
        if (parsed.achievements && parsed.achievements.progress) {
          merged.achievements = {
            unlocked: parsed.achievements.unlocked || [],
            progress: {
              ...DEFAULT_STATE.achievements.progress,
              ...parsed.achievements.progress,
              languagesPlayed: new Set(parsed.achievements.progress.languagesPlayed || [])
            }
          };
        }
        return merged;
      }
    } catch (e) {
      console.warn('Could not read saved game state. Initializing default state.', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  // Save to LocalStorage
  save() {
    try {
      const copy = {
        ...this.data,
        achievements: {
          ...this.data.achievements,
          progress: {
            ...this.data.achievements.progress,
            languagesPlayed: Array.from(this.data.achievements.progress.languagesPlayed || [])
          }
        }
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
      this.emit('state:saved', this.data);
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  }

  // XP & Level Progression Algorithm
  getXpForLevel(level) {
    // Progressive XP curve: Level 1 = 100, Level 2 = 250, etc.
    return Math.floor(100 * Math.pow(level, 1.4));
  }

  getRankTitle(level) {
    if (level >= 36) return 'GLITCH LEGEND';
    if (level >= 26) return 'GLITCH HUNTER';
    if (level >= 19) return 'CODE MASTER';
    if (level >= 13) return 'CODE HUNTER';
    if (level >= 8)  return 'DEBUGGER';
    if (level >= 4)  return 'CODER';
    return 'BEGINNER';
  }

  addXp(amount) {
    this.data.player.xp += amount;
    let leveledUp = false;

    while (this.data.player.xp >= this.getXpForLevel(this.data.player.level)) {
      this.data.player.xp -= this.getXpForLevel(this.data.player.level);
      this.data.player.level++;
      leveledUp = true;
      // Level-up rewards
      this.addCoins(50);
      this.emit('player:levelup', { level: this.data.player.level });
    }

    this.data.player.rank = this.getRankTitle(this.data.player.level);
    this.save();
    this.emit('stats:updated', this.data.player);
    return leveledUp;
  }

  addCoins(amount) {
    this.data.player.coins += amount;
    this.save();
    this.emit('coins:updated', { coins: this.data.player.coins, gained: amount });
  }

  spendCoins(amount) {
    if (this.data.player.coins >= amount) {
      this.data.player.coins -= amount;
      this.save();
      this.emit('coins:updated', { coins: this.data.player.coins, spent: amount });
      return true;
    }
    return false;
  }

  addStars(amount) {
    this.data.player.stars += amount;
    this.save();
    this.emit('stars:updated', { stars: this.data.player.stars, gained: amount });
  }

  recordLevelCompletion(worldId, levelId, starsEarned, score) {
    const world = this.data.worlds[worldId];
    if (!world) return;

    // Track language played for achievement
    this.data.achievements.progress.languagesPlayed.add(worldId);

    const prevStars = world.completedLevels[levelId] || 0;
    if (starsEarned > prevStars) {
      const starDiff = starsEarned - prevStars;
      world.starsEarned += starDiff;
      this.addStars(starDiff);
      world.completedLevels[levelId] = starsEarned;
    }

    this.data.player.levelsCompleted++;
    this.data.player.totalScore += score;
    this.save();
    this.emit('level:completed', { worldId, levelId, starsEarned, score });
  }

  // Daily Streak Verification
  checkDailyStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = this.data.player.lastActiveDate;

    if (!lastActive) {
      this.data.player.lastActiveDate = today;
      this.data.player.currentStreak = 1;
      this.save();
      return;
    }

    const diffDays = Math.floor((new Date(today) - new Date(lastActive)) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day login!
      this.data.player.lastActiveDate = today;
      this.data.player.currentStreak += 1;
    } else if (diffDays > 1) {
      // Streak broken
      this.data.player.lastActiveDate = today;
      this.data.player.currentStreak = 1;
    }
    this.save();
  }

  claimStreakReward(day) {
    const today = new Date().toISOString().split('T')[0];
    if (this.data.player.streakClaimedDate === today) {
      return { success: false, reason: 'Already claimed today!' };
    }

    // Reward curve based on day
    const rewards = [20, 30, 50, 70, 100, 150, 250];
    const rewardCoins = rewards[Math.min(day - 1, 6)] || 20;

    this.data.player.streakClaimedDate = today;
    this.addCoins(rewardCoins);
    this.save();
    return { success: true, coins: rewardCoins };
  }

  // Reset progress (for testing or user settings)
  resetAllProgress() {
    localStorage.removeItem(STORAGE_KEY);
    this.data = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
    window.location.reload();
  }
}

// Global singleton instance
window.GameState = new StateManager();
