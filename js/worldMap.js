/**
 * GLITCH RUNNER - 51-LEVEL EXPEDITION WORLD MAP ENGINE
 * Renders 7 distinct Areas per language world and 51 connected progression nodes.
 */

class WorldMapEngine {
  constructor() {
    this.currentWorldId = 'javascript';
    this.currentAreaIndex = 0;
  }

  openWorld(worldId, targetAreaIdx = 0) {
    const worldConfig = window.WORLDS_CONFIG.find(w => w.id === worldId);
    if (!worldConfig) return;

    const worldState = window.GameState.data.worlds[worldId];
    if (!worldState.unlocked) {
      if (worldConfig.tier === 'premium') {
        const cost = worldConfig.unlockPrice || 300;
        if (window.GameState.data.player.coins >= cost) {
          if (confirm(`Unlock ${worldConfig.name} World for ${cost} Coins?`)) {
            window.GameState.spendCoins(cost);
            worldState.unlocked = true;
            window.GameState.save();
            if (window.VisualFx) window.VisualFx.toast(`${worldConfig.name} UNLOCKED!`, '🔓', 'success');
          } else {
            return;
          }
        } else {
          if (window.VisualFx) {
            window.VisualFx.toast(`Locked Premium World! Requires ${cost} Coins to unlock.`, '🔒', 'warning');
          }
          return;
        }
      }
    }

    this.currentWorldId = worldId;
    this.currentAreaIndex = targetAreaIdx;
    this.renderMap(worldId);
    if (window.App) window.App.showView('world-map');
  }

  renderMap(worldId) {
    const worldConfig = window.WORLDS_CONFIG.find(w => w.id === worldId);
    const worldState = window.GameState.data.worlds[worldId] || { completedLevels: {}, starsEarned: 0 };
    const allWorldLevels = window.LEVELS_DATA.filter(l => l.worldId === worldId);

    // Header stats
    document.getElementById('map-world-icon').textContent = worldConfig.icon;
    document.getElementById('map-world-name').textContent = `${worldConfig.name.toUpperCase()} WORLD`;
    document.getElementById('map-stars-count').textContent = worldState.starsEarned || 0;

    const completedCount = Object.keys(worldState.completedLevels || {}).length;
    const progressPercent = Math.min(100, Math.round((completedCount / 51) * 100));
    document.getElementById('map-progress-percent').textContent = `${completedCount}/51 (${progressPercent}%)`;

    // Render Area Tabs Selector (7 Sectors)
    const areasContainer = document.getElementById('map-areas-selector');
    if (areasContainer) {
      areasContainer.innerHTML = worldConfig.areas.map((area, idx) => {
        return `
          <button class="area-tab-btn ${idx === this.currentAreaIndex ? 'active' : ''}" data-area-idx="${idx}">
            <span>${idx === 6 ? '👑' : (idx % 2 === 0 ? '⚡' : '🌱')}</span>
            <span>${area.name} (${area.range})</span>
          </button>
        `;
      }).join('');

      areasContainer.querySelectorAll('.area-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.currentAreaIndex = parseInt(btn.getAttribute('data-area-idx'));
          this.renderMap(worldId);
          if (window.Sound) window.Sound.playClick();
        });
      });
    }

    // Filter levels for the currently selected Area (e.g. Lv 1-8, Lv 9-16, etc.)
    const activeArea = worldConfig.areas[this.currentAreaIndex];
    const areaLevels = allWorldLevels.filter(l => l.areaId === activeArea.id || l.areaName === activeArea.name);

    // Compute active area circuit fill
    const areaCompletedCount = areaLevels.filter(l => (worldState.completedLevels[l.id] || 0) > 0).length;
    const areaProgressPct = Math.round((areaCompletedCount / Math.max(1, areaLevels.length)) * 100);
    const lineFill = document.getElementById('map-circuit-fill');
    if (lineFill) lineFill.style.width = `${areaProgressPct}%`;

    // Render nodes for this sector
    const nodesContainer = document.getElementById('map-nodes-container');
    if (!nodesContainer) return;

    let html = `
      <div class="map-node completed">
        <div class="node-circle">🏠</div>
        <div class="node-label">CHECKPOINT</div>
        <div class="node-stars">✓ ONLINE</div>
      </div>
    `;

    areaLevels.forEach((lvl, index) => {
      const starsEarned = worldState.completedLevels[lvl.id] || 0;
      const isCompleted = starsEarned > 0;
      
      // Level unlock logic:
      // Level 1 is always unlocked.
      // Any level is unlocked if preceding level was cleared.
      let isUnlocked = false;
      if (lvl.levelNumber === 1) {
        isUnlocked = true;
      } else {
        const prevLevel = allWorldLevels.find(l => l.levelNumber === lvl.levelNumber - 1);
        if (prevLevel && worldState.completedLevels[prevLevel.id] && worldState.completedLevels[prevLevel.id] > 0) {
          isUnlocked = true;
        }
      }

      // Boss levels require clearing at least preceding levels in this area
      if (lvl.mode === 'boss' && !isCompleted && !isUnlocked) {
        isUnlocked = false;
      }

      let nodeClass = 'map-node';
      if (lvl.mode === 'boss') nodeClass += ' boss';
      if (isCompleted) nodeClass += ' completed';
      else if (isUnlocked) nodeClass += ' active-current';
      else nodeClass += ' locked';

      const icon = this.getNodeIcon(lvl.mode);

      html += `
        <div class="${nodeClass}" data-level-id="${lvl.id}" data-unlocked="${isUnlocked}">
          <div class="node-circle">
            ${icon}
            ${!isUnlocked ? '<div class="node-lock-badge">🔒</div>' : ''}
          </div>
          <div class="node-label">${lvl.title.length > 18 ? lvl.title.substring(0, 16) + '...' : lvl.title}</div>
          <div class="node-stars">
            ${isCompleted ? '⭐'.repeat(starsEarned) : (isUnlocked ? 'READY' : 'LOCKED')}
          </div>
        </div>
      `;
    });

    nodesContainer.innerHTML = html;

    // Attach click events
    nodesContainer.querySelectorAll('.map-node[data-level-id]').forEach(node => {
      node.addEventListener('click', () => {
        const lvlId = node.getAttribute('data-level-id');
        const unlocked = node.getAttribute('data-unlocked') === 'true';

        if (unlocked) {
          window.Game.startLevel(lvlId);
        } else {
          if (window.VisualFx) {
            window.VisualFx.toast('Complete preceding missions to unlock this terminal!', '🔒', 'warning');
          }
          if (window.Sound) window.Sound.playError();
        }
      });
    });
  }

  getNodeIcon(mode) {
    switch (mode) {
      case 'glitch': return '🐛';
      case 'runner': return '🏃';
      case 'detective': return '🔍';
      case 'builder': return '🧩';
      case 'boss': return '👹';
      default: return '⚡';
    }
  }
}

window.WorldMap = new WorldMapEngine();
