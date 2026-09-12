/**
 * GLITCH RUNNER - ACHIEVEMENTS SYSTEM
 * Collectible trophy badges with tracking, notifications, and coin/XP payouts.
 */

window.ACHIEVEMENTS_LIST = [
  {
    id: 'first_glitch',
    name: 'First Glitch',
    desc: 'Complete your first coding level.',
    icon: '⚡',
    rewardCoins: 50,
    rewardXp: 50,
    check: (state) => state.player.levelsCompleted >= 1
  },
  {
    id: 'perfect_run',
    name: 'Perfect Run',
    desc: 'Earn a 3-Star flawless rating on any challenge.',
    icon: '⭐',
    rewardCoins: 75,
    rewardXp: 100,
    check: (state) => (state.achievements.progress.perfectRuns || 0) >= 1
  },
  {
    id: 'bug_hunter',
    name: 'Bug Hunter',
    desc: 'Neutralize 3 glitches in Glitch Hunter mode.',
    icon: '🐛',
    rewardCoins: 120,
    rewardXp: 200,
    check: (state) => (state.achievements.progress.bugsFixed || 0) >= 3
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    desc: 'Complete a timed Code Runner sprint.',
    icon: '🏃',
    rewardCoins: 100,
    rewardXp: 150,
    check: (state) => (state.achievements.progress.timedCompleted || 0) >= 1
  },
  {
    id: 'boss_slayer',
    name: 'Boss Slayer',
    desc: 'Decimate your first World Boss.',
    icon: '👹',
    rewardCoins: 200,
    rewardXp: 300,
    check: (state) => (state.achievements.progress.bossesDefeated || 0) >= 1
  },
  {
    id: 'multi_language',
    name: 'Polyglot Hacker',
    desc: 'Explore and solve levels in 3 different programming languages.',
    icon: '🌍',
    rewardCoins: 150,
    rewardXp: 250,
    check: (state) => (state.achievements.progress.languagesPlayed ? state.achievements.progress.languagesPlayed.size >= 3 : false)
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    desc: 'Maintain at least a 3-day active streak.',
    icon: '🔥',
    rewardCoins: 180,
    rewardXp: 200,
    check: (state) => state.player.currentStreak >= 3
  },
  {
    id: 'code_master',
    name: 'Code Master',
    desc: 'Complete 8 total mission levels.',
    icon: '👑',
    rewardCoins: 300,
    rewardXp: 500,
    check: (state) => state.player.levelsCompleted >= 8
  }
];

class AchievementsEngine {
  constructor() {}

  checkAll() {
    const state = window.GameState.data;
    const unlocked = state.achievements.unlocked;

    window.ACHIEVEMENTS_LIST.forEach(achieve => {
      if (!unlocked.includes(achieve.id)) {
        if (achieve.check(state)) {
          unlocked.push(achieve.id);
          window.GameState.addCoins(achieve.rewardCoins);
          window.GameState.addXp(achieve.rewardXp);
          window.GameState.save();

          if (window.Sound) window.Sound.playLevelUp();
          if (window.VisualFx) {
            window.VisualFx.toast(`🏆 ACHIEVEMENT UNLOCKED: ${achieve.name}! (+${achieve.rewardCoins} 🪙)`, '🏆', 'success');
          }
        }
      }
    });
  }

  openModal() {
    this.checkAll();
    this.renderModal();
    const modal = document.getElementById('modal-achievements');
    if (modal) modal.classList.add('active');
  }

  renderModal() {
    const container = document.getElementById('achievements-grid-list');
    if (!container) return;

    const unlocked = window.GameState.data.achievements.unlocked;

    container.innerHTML = window.ACHIEVEMENTS_LIST.map(ach => {
      const isCompleted = unlocked.includes(ach.id);
      return `
        <div class="achievement-card ${isCompleted ? 'completed' : ''}">
          <div class="achieve-icon">${ach.icon}</div>
          <div style="flex: 1;">
            <div class="achieve-name">${ach.name}</div>
            <div class="achieve-desc">${ach.desc}</div>
            <div style="font-size: 0.75rem; color: var(--accent-warning); margin-top: 0.3rem;">
              Reward: +${ach.rewardCoins} 🪙 &bull; +${ach.rewardXp} XP
            </div>
          </div>
          <div>
            ${isCompleted 
              ? '<span style="color: var(--accent-primary); font-weight: 900; font-size: 0.85rem;">✓ UNLOCKED</span>' 
              : '<span style="color: var(--text-muted); font-size: 0.85rem;">🔒 LOCKED</span>'}
          </div>
        </div>
      `;
    }).join('');
  }
}

window.Achievements = new AchievementsEngine();
