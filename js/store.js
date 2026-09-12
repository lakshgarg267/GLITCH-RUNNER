/**
 * GLITCH RUNNER - IN-GAME STORE SYSTEM
 * Economy and catalog for power-ups, avatars, themes, and special booster items.
 */

window.STORE_CATALOG = {
  powerups: [
    { id: 'hints', name: '💡 Code Clue Hint', price: 20, desc: 'Reveals syntax clues or eliminates false options.', icon: '💡' },
    { id: 'extraLives', name: '❤️ Extra Life', price: 50, desc: 'Restores 1 life heart during combat or debugging.', icon: '❤️' },
    { id: 'timeBoosts', name: '⏱ Time Boost', price: 40, desc: 'Adds +20 seconds to your Code Runner timer.', icon: '⏱️' },
    { id: 'shields', name: '🛡 Energy Barrier', price: 35, desc: 'Absorbs 1 mistake without losing life hearts.', icon: '🛡️' }
  ],
  avatars: [
    { id: '⚡', name: 'Cyber Hunter', price: 0, desc: 'Standard issue field operative.', icon: '⚡' },
    { id: '🤖', name: 'Cyber Droid', price: 150, desc: 'High-speed automated logic processor.', icon: '🤖' },
    { id: '👾', name: 'Glitch Phantom', price: 250, desc: 'Phases directly through corrupted byte arrays.', icon: '👾' },
    { id: '💻', name: 'Terminal Master', price: 300, desc: 'Executes root commands from memory.', icon: '💻' },
    { id: '🥷', name: 'Code Shinobi', price: 350, desc: 'Silently patches memory leaks in the dark.', icon: '🥷' },
    { id: '🧙', name: 'Web Sorcerer', price: 400, desc: 'Commands DOM elements with CSS incantations.', icon: '🧙' }
  ],
  themes: [
    { id: 'cyber-hacker', name: 'Cyber Hacker', price: 0, desc: 'Classic emerald terminal HUD with neon accents.', icon: '🟢' },
    { id: 'neon-city', name: 'Neon City', price: 200, desc: 'Vibrant synthwave magenta and electric cyan aesthetic.', icon: '🟣' },
    { id: 'matrix', name: 'The Matrix', price: 300, desc: 'Deep digital rain stream on pure OLED obsidian.', icon: '🟩' },
    { id: 'space-station', name: 'Space Station', price: 350, desc: 'Cosmic pulsar blue with high-tech cards.', icon: '🛰️' },
    { id: 'retro-terminal', name: 'Retro Terminal', price: 400, desc: '1980s amber phosphor CRT glow with scanlines.', icon: '📺' }
  ]
};

class StoreEngine {
  constructor() {
    this.activeCategory = 'powerups';
  }

  openStore(category = 'powerups') {
    this.activeCategory = category;
    this.renderStore();
    const modal = document.getElementById('modal-store');
    if (modal) modal.classList.add('active');
  }

  renderStore() {
    const container = document.getElementById('store-items-grid');
    if (!container) return;

    const items = window.STORE_CATALOG[this.activeCategory] || [];
    const coins = window.GameState.data.player.coins;
    const unlockedAvatars = window.GameState.data.customization.unlockedAvatars;
    const unlockedThemes = window.GameState.data.customization.unlockedThemes;
    const activeAvatar = window.GameState.data.customization.activeAvatar;
    const activeTheme = window.GameState.data.customization.activeTheme;

    let html = '';

    items.forEach(item => {
      let isOwned = false;
      let isEquipped = false;

      if (this.activeCategory === 'avatars') {
        isOwned = unlockedAvatars.includes(item.id);
        isEquipped = (activeAvatar === item.id);
      } else if (this.activeCategory === 'themes') {
        isOwned = unlockedThemes.includes(item.id);
        isEquipped = (activeTheme === item.id);
      }

      html += `
        <div class="store-card">
          <div class="store-card-icon">${item.icon}</div>
          <div class="store-card-name">${item.name}</div>
          <p style="font-size: 0.8rem; color: var(--text-muted); flex: 1;">${item.desc}</p>
          <div class="store-card-price">${isOwned ? 'OWNED' : `${item.price} 🪙`}</div>
          
          ${this.renderActionButton(item, isOwned, isEquipped, coins)}
        </div>
      `;
    });

    container.innerHTML = html;
    this.bindStoreActions(container);
  }

  renderActionButton(item, isOwned, isEquipped, playerCoins) {
    if (this.activeCategory === 'powerups') {
      const canAfford = playerCoins >= item.price;
      return `
        <button class="btn-cyber-primary btn-buy-item" data-cat="powerups" data-id="${item.id}" data-price="${item.price}" ${!canAfford ? 'disabled style="opacity: 0.5;"' : ''} style="width: 100%; font-size: 0.8rem; padding: 0.5rem;">
          BUY (${item.price} 🪙)
        </button>
      `;
    } else if (isEquipped) {
      return `
        <button class="filter-btn" disabled style="width: 100%; font-size: 0.8rem; opacity: 0.7;">
          ✓ EQUIPPED
        </button>
      `;
    } else if (isOwned) {
      return `
        <button class="btn-cyber-secondary btn-equip-item" data-cat="${this.activeCategory}" data-id="${item.id}" style="width: 100%; font-size: 0.8rem; padding: 0.5rem;">
          EQUIP
        </button>
      `;
    } else {
      const canAfford = playerCoins >= item.price;
      return `
        <button class="btn-cyber-primary btn-buy-item" data-cat="${this.activeCategory}" data-id="${item.id}" data-price="${item.price}" ${!canAfford ? 'disabled style="opacity: 0.5;"' : ''} style="width: 100%; font-size: 0.8rem; padding: 0.5rem;">
          UNLOCK (${item.price} 🪙)
        </button>
      `;
    }
  }

  bindStoreActions(container) {
    container.querySelectorAll('.btn-buy-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        const id = btn.getAttribute('data-id');
        const price = parseInt(btn.getAttribute('data-price'));

        if (window.GameState.spendCoins(price)) {
          if (cat === 'powerups') {
            window.GameState.data.inventory[id]++;
          } else if (cat === 'avatars') {
            window.GameState.data.customization.unlockedAvatars.push(id);
            window.GameState.data.customization.activeAvatar = id;
            window.GameState.data.player.avatar = id;
          } else if (cat === 'themes') {
            window.GameState.data.customization.unlockedThemes.push(id);
            window.GameState.data.customization.activeTheme = id;
            document.documentElement.setAttribute('data-theme', id);
          }
          window.GameState.save();

          if (window.Sound) window.Sound.playCoin();
          if (window.VisualFx) {
            window.VisualFx.toast('Purchase confirmed!', '🛒', 'success');
          }
          this.renderStore();
          if (window.App) window.App.updateAllHUD();
        } else {
          if (window.VisualFx) {
            window.VisualFx.toast('Not enough coins! Solve more glitches.', '⚠️', 'danger');
          }
        }
      });
    });

    container.querySelectorAll('.btn-equip-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        const id = btn.getAttribute('data-id');

        if (cat === 'avatars') {
          window.GameState.data.customization.activeAvatar = id;
          window.GameState.data.player.avatar = id;
        } else if (cat === 'themes') {
          window.GameState.data.customization.activeTheme = id;
          document.documentElement.setAttribute('data-theme', id);
        }
        window.GameState.save();

        if (window.Sound) window.Sound.playClick();
        if (window.VisualFx) window.VisualFx.toast('Equipped successfully!', '✨', 'info');
        this.renderStore();
        if (window.App) window.App.updateAllHUD();
      });
    });
  }
}

window.Store = new StoreEngine();
