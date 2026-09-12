/**
 * GLITCH RUNNER - MAIN APPLICATION ORCHESTRATOR
 * Connects HUD, navigation router, modal handlers, profile management, and global key bindings.
 */

class AppController {
  constructor() {
    this.currentView = 'home';
    this.init();
  }

  init() {
    // Apply saved theme
    const activeTheme = window.GameState.data.customization.activeTheme || 'cyber-hacker';
    document.documentElement.setAttribute('data-theme', activeTheme);

    this.bindDOMEvents();
    this.updateAllHUD();
    this.renderWorldsGrid();
    this.showView('home');

    // Check achievements on boot
    if (window.Achievements) window.Achievements.checkAll();
  }

  // View Router (home, worlds, world-map, arena)
  showView(viewId) {
    this.currentView = viewId;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
      if (tab.getAttribute('data-view') === viewId) tab.classList.add('active');
      else tab.classList.remove('active');
    });

    if (viewId === 'worlds') {
      this.renderWorldsGrid();
    }
  }

  // Update HUD elements across the app
  updateAllHUD() {
    const player = window.GameState.data.player;
    const inv = window.GameState.data.inventory;

    // HUD Header stats
    const avatarEls = document.querySelectorAll('.hud-avatar-icon');
    avatarEls.forEach(el => el.textContent = player.avatar || '⚡');

    const nameEls = document.querySelectorAll('.hud-player-name-val');
    nameEls.forEach(el => el.textContent = player.username || 'CodeHunter');

    const levelEls = document.querySelectorAll('.hud-level-val');
    levelEls.forEach(el => el.textContent = player.level);

    const coinsEls = document.querySelectorAll('.hud-coins-val');
    coinsEls.forEach(el => el.textContent = player.coins.toLocaleString());

    const starsEls = document.querySelectorAll('.hud-stars-val');
    starsEls.forEach(el => el.textContent = player.stars);

    const streakEls = document.querySelectorAll('.hud-streak-val');
    streakEls.forEach(el => el.textContent = `${player.currentStreak}d`);

    // XP Progress Bar
    const xpNeeded = window.GameState.getXpForLevel(player.level);
    const xpPct = Math.min(100, Math.round((player.xp / xpNeeded) * 100));
    const xpFill = document.getElementById('hud-xp-fill');
    if (xpFill) xpFill.style.width = `${xpPct}%`;

    // Home Hub Quick Stats
    const homeLevels = document.getElementById('home-stat-levels');
    const homeScore = document.getElementById('home-stat-score');
    const homeRank = document.getElementById('home-stat-rank');
    const homeCoins = document.getElementById('home-stat-coins');
    if (homeLevels) homeLevels.textContent = player.levelsCompleted;
    if (homeScore) homeScore.textContent = player.totalScore.toLocaleString();
    if (homeRank) homeRank.textContent = player.rank;
    if (homeCoins) homeCoins.textContent = player.coins;
  }

  // Render 10 Programming Worlds Grid on Home & Worlds view
  renderWorldsGrid(filter = 'all') {
    const containers = [
      document.getElementById('home-worlds-grid'),
      document.getElementById('all-worlds-grid')
    ];

    containers.forEach(grid => {
      if (!grid) return;

      const worlds = window.WORLDS_CONFIG.filter(w => {
        if (filter === 'free') return w.tier === 'free';
        if (filter === 'premium') return w.tier === 'premium';
        return true;
      });

      grid.innerHTML = worlds.map(w => {
        const state = window.GameState.data.worlds[w.id] || { completedLevels: {}, starsEarned: 0, unlocked: w.tier === 'free' };
        const completedLevelsCount = Object.keys(state.completedLevels || {}).length;
        const totalWorldLevels = 51;
        const progressPct = Math.min(100, Math.round((completedLevelsCount / totalWorldLevels) * 100));

        return `
          <div class="world-card ${!state.unlocked ? 'locked' : ''}" data-world-id="${w.id}">
            <div class="world-card-top">
              <div class="world-icon-wrapper">${w.icon}</div>
              <span class="world-badge-tier ${w.tier}">${w.tier.toUpperCase()} ${!state.unlocked ? '🔒' : ''}</span>
            </div>
            <div class="world-name">${w.name}</div>
            <div class="world-desc">${w.description}</div>
            
            <div class="world-progress-bar">
              <div class="world-progress-fill" style="width: ${progressPct}%;"></div>
            </div>

            <div class="world-meta-row">
              <span>${completedLevelsCount}/${totalWorldLevels} Levels</span>
              <span class="world-meta-stars">⭐ ${state.starsEarned || 0}</span>
            </div>
          </div>
        `;
      }).join('');

      // Attach click to open world map
      grid.querySelectorAll('.world-card').forEach(card => {
        card.addEventListener('click', () => {
          const worldId = card.getAttribute('data-world-id');
          if (window.WorldMap) window.WorldMap.openWorld(worldId);
        });
      });
    });
  }

  // Render Player Profile Modal
  openProfileModal() {
    const p = window.GameState.data.player;
    document.getElementById('profile-avatar-display').textContent = p.avatar;
    document.getElementById('profile-username-input').value = p.username;
    document.getElementById('profile-rank-title').textContent = p.rank;
    document.getElementById('profile-level-badge').textContent = `LEVEL ${p.level}`;
    document.getElementById('profile-coins-val').textContent = p.coins;
    document.getElementById('profile-stars-val').textContent = p.stars;
    document.getElementById('profile-score-val').textContent = p.totalScore.toLocaleString();
    document.getElementById('profile-levels-val').textContent = p.levelsCompleted;
    document.getElementById('profile-streak-val').textContent = `${p.currentStreak} Days`;

    // Language Progress Breakdown
    const listContainer = document.getElementById('profile-languages-list');
    if (listContainer) {
      listContainer.innerHTML = window.WORLDS_CONFIG.map(w => {
        const state = window.GameState.data.worlds[w.id] || { completedLevels: {}, starsEarned: 0 };
        const completedCount = Object.keys(state.completedLevels || {}).length;
        const total = 51;
        const pct = Math.min(100, Math.round((completedCount / total) * 100));

        return `
          <div class="profile-lang-item">
            <div class="profile-lang-header">
              <span>${w.icon} ${w.name}</span>
              <span>Level ${completedCount}/${total} &bull; ⭐ ${state.starsEarned || 0}</span>
            </div>
            <div class="world-progress-bar" style="margin-bottom: 0;">
              <div class="world-progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    const modal = document.getElementById('modal-profile');
    if (modal) modal.classList.add('active');
  }

  // Open Settings Modal
  openSettingsModal() {
    const state = window.GameState.data;
    const soundCheck = document.getElementById('setting-sound-toggle');
    if (soundCheck) soundCheck.checked = state.settings.soundEnabled;

    const themeSelect = document.getElementById('setting-theme-select');
    if (themeSelect) themeSelect.value = state.customization.activeTheme;

    const modal = document.getElementById('modal-settings');
    if (modal) modal.classList.add('active');
  }

  bindDOMEvents() {
    // Brand click -> return to home hub
    document.querySelector('.brand-section')?.addEventListener('click', () => {
      this.showView('home');
      if (window.Sound) window.Sound.playClick();
    });

    // Nav Tabs clicks
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.getAttribute('data-view');
        if (view) {
          this.showView(view);
          if (window.Sound) window.Sound.playClick();
        }
      });
    });

    // HUD Action buttons
    document.getElementById('btn-hud-sound')?.addEventListener('click', () => {
      const enabled = window.Sound.toggleSound();
      const btn = document.getElementById('btn-hud-sound');
      if (btn) btn.textContent = enabled ? '🔊' : '🔇';
      if (window.VisualFx) window.VisualFx.toast(enabled ? 'Sound Enabled' : 'Sound Muted', '🔊', 'info');
    });

    document.getElementById('btn-hud-profile')?.addEventListener('click', () => {
      this.openProfileModal();
      if (window.Sound) window.Sound.playClick();
    });

    document.getElementById('btn-hud-settings')?.addEventListener('click', () => {
      this.openSettingsModal();
      if (window.Sound) window.Sound.playClick();
    });

    // Hero buttons
    document.getElementById('btn-continue-journey')?.addEventListener('click', () => {
      // Find first incomplete free world or open javascript
      window.WorldMap.openWorld('javascript');
    });

    document.getElementById('btn-explore-worlds')?.addEventListener('click', () => {
      this.showView('worlds');
    });

    document.getElementById('btn-home-daily')?.addEventListener('click', () => {
      if (window.Daily) window.Daily.openDailyModal();
    });

    // World Filter buttons
    document.querySelectorAll('.worlds-filter-tabs .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.worlds-filter-tabs .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.renderWorldsGrid(filter);
      });
    });

    // World Map header back button
    document.getElementById('btn-map-back')?.addEventListener('click', () => {
      this.showView('worlds');
      if (window.Sound) window.Sound.playClick();
    });

    // Powerup Tray buttons in Game Arena
    document.getElementById('btn-use-hint')?.addEventListener('click', () => window.Game.useHint());
    document.getElementById('btn-use-time')?.addEventListener('click', () => window.Game.useTimeBoost());
    document.getElementById('btn-use-life')?.addEventListener('click', () => window.Game.useExtraLife());
    document.getElementById('btn-use-shield')?.addEventListener('click', () => window.Game.useShield());

    // Result Overlay buttons
    document.getElementById('btn-result-next')?.addEventListener('click', () => {
      document.getElementById('modal-result').classList.remove('active');
      // Advance to world map to select next node
      window.WorldMap.openWorld(window.Game.currentLevel.worldId);
    });

    document.getElementById('btn-result-retry')?.addEventListener('click', () => {
      document.getElementById('modal-result').classList.remove('active');
      window.Game.startLevel(window.Game.currentLevel.id);
    });

    document.getElementById('btn-result-map')?.addEventListener('click', () => {
      document.getElementById('modal-result').classList.remove('active');
      window.WorldMap.openWorld(window.Game.currentLevel.worldId);
    });

    // Game Over Overlay buttons
    document.getElementById('btn-gameover-revive')?.addEventListener('click', () => {
      window.Game.reviveWithCoins();
    });

    document.getElementById('btn-gameover-retry')?.addEventListener('click', () => {
      document.getElementById('modal-gameover').classList.remove('active');
      window.Game.startLevel(window.Game.currentLevel.id);
    });

    document.getElementById('btn-gameover-home')?.addEventListener('click', () => {
      document.getElementById('modal-gameover').classList.remove('active');
      this.showView('home');
    });

    // Close Modal buttons (all modals)
    document.querySelectorAll('.btn-close-modal, .modal-backdrop').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el || el.classList.contains('btn-close-modal')) {
          document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
        }
      });
    });

    // Prevent backdrop click when clicking modal content
    document.querySelectorAll('.modal-content').forEach(c => {
      c.addEventListener('click', (e) => e.stopPropagation());
    });

    // Profile Username save
    document.getElementById('btn-save-username')?.addEventListener('click', () => {
      const newName = document.getElementById('profile-username-input').value.trim();
      if (newName) {
        window.GameState.data.player.username = newName;
        window.GameState.save();
        this.updateAllHUD();
        if (window.VisualFx) window.VisualFx.toast('Hunter Call-Sign updated!', '⚡', 'success');
      }
    });

    // Store Tab Category Switchers
    document.querySelectorAll('.store-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.store-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        window.Store.openStore(cat);
      });
    });

    // Daily Mission Start Button in Modal
    document.getElementById('btn-start-daily-mission')?.addEventListener('click', () => {
      window.Daily.startDailyMission();
    });

    // Settings Sound Toggle
    document.getElementById('setting-sound-toggle')?.addEventListener('change', (e) => {
      window.Sound.enabled = e.target.checked;
      window.GameState.data.settings.soundEnabled = e.target.checked;
      window.GameState.save();
      const btn = document.getElementById('btn-hud-sound');
      if (btn) btn.textContent = e.target.checked ? '🔊' : '🔇';
    });

    // Settings Theme Dropdown
    document.getElementById('setting-theme-select')?.addEventListener('change', (e) => {
      const selected = e.target.value;
      window.GameState.data.customization.activeTheme = selected;
      window.GameState.save();
      document.documentElement.setAttribute('data-theme', selected);
      if (window.VisualFx) window.VisualFx.toast(`Theme shifted to ${selected.toUpperCase()}`, '🎨', 'info');
    });

    // Settings Reset Button
    document.getElementById('btn-reset-game')?.addEventListener('click', () => {
      if (confirm('CRITICAL WARNING: This will permanently wipe all local game progress, coins, stars, and levels! Continue?')) {
        window.GameState.resetAllProgress();
      }
    });

    // Global Keyboard Shortcuts (1, 2, 3, 4 for multi-choice answers)
    window.addEventListener('keydown', (e) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        const optBtn = document.querySelectorAll('.options-grid .option-btn')[idx];
        if (optBtn) optBtn.click();
      } else if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
      }
    });
  }
}

// Boot application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.App = new AppController();
});
