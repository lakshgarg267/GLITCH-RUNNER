/**
 * GLITCH RUNNER - 3D CODE RUNNER UI CONTROLLER
 * Manages the in-game 3D HUD, live coding drawer, gate challenge dialogs, and pause menu.
 */

class RunnerUI {
  constructor(engine) {
    this.engine = engine;
    this.isDrawerOpen = false;
    this.terminalLogs = [];
  }

  init() {
    this.bindEvents();
    this.updateHUD();
  }

  bindEvents() {
    // Drawer close button & backdrop
    const closeBtn = document.getElementById('btn-runner-close-drawer');
    const backdrop = document.getElementById('runner-drawer-backdrop');
    if (closeBtn) closeBtn.onclick = () => this.closeCodeDrawer();
    if (backdrop) backdrop.onclick = () => this.closeCodeDrawer();

    // Drawer tabs
    document.querySelectorAll('.runner-drawer-tab').forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll('.runner-drawer-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.runner-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-tab');
        const targetContent = document.getElementById(`runner-tab-${targetId}`);
        if (targetContent) targetContent.classList.add('active');
      };
    });

    // Run Code button
    const runBtn = document.getElementById('btn-runner-run-code');
    if (runBtn) {
      runBtn.onclick = () => {
        const textarea = document.getElementById('runner-code-editor');
        if (textarea && this.engine.codeBridge) {
          const code = textarea.value;
          this.engine.codeBridge.executePlayerCode(code);
        }
      };
    }

    // Code snippet chips (for quick insertion on desktop & mobile)
    document.querySelectorAll('.code-chip-btn').forEach(chip => {
      chip.onclick = () => {
        const snippet = chip.getAttribute('data-snippet');
        const textarea = document.getElementById('runner-code-editor');
        if (textarea && snippet) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = textarea.value;
          textarea.value = text.substring(0, start) + snippet + text.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
          textarea.focus();
        }
      };
    });

    // Clear Terminal button
    const clearBtn = document.getElementById('btn-clear-terminal');
    if (clearBtn) {
      clearBtn.onclick = () => {
        this.terminalLogs = [];
        const box = document.getElementById('runner-terminal-logs');
        if (box) box.innerHTML = '<div style="color: var(--text-muted);">// Terminal cleared. Ready for input.</div>';
      };
    }

    // HUD Pause button
    const pauseBtn = document.getElementById('btn-runner-pause');
    if (pauseBtn) {
      pauseBtn.onclick = () => this.engine.togglePause();
    }

    // Pause Modal Buttons
    const resumeBtn = document.getElementById('btn-pause-resume');
    const retryBtn = document.getElementById('btn-pause-retry');
    const exitBtn = document.getElementById('btn-pause-exit');

    if (resumeBtn) resumeBtn.onclick = () => this.engine.togglePause();
    if (retryBtn) retryBtn.onclick = () => this.engine.restart();
    if (exitBtn) {
      exitBtn.onclick = () => {
        this.engine.stop();
        if (window.App) window.App.showView('world-map');
      };
    }

    // Gate Continue Button
    const gateContinueBtn = document.getElementById('btn-gate-continue');
    if (gateContinueBtn) {
      gateContinueBtn.onclick = () => this.engine.resumeFromGate();
    }
  }

  updateHUD() {
    if (!this.engine) return;

    // Speedometer
    const speedEl = document.getElementById('hud-runner-speed');
    if (speedEl) speedEl.textContent = `${this.engine.speed.toFixed(1)} m/s`;

    // Distance
    const distEl = document.getElementById('hud-runner-distance');
    if (distEl) distEl.textContent = `${Math.floor(this.engine.distance)}m`;

    // Coins / Data Bits
    const coinsEl = document.getElementById('hud-runner-coins');
    if (coinsEl) coinsEl.textContent = this.engine.coinsCollected;

    // Combo
    const comboEl = document.getElementById('hud-runner-combo');
    if (comboEl) {
      comboEl.textContent = `${this.engine.combo.toFixed(1)}x`;
      comboEl.style.display = this.engine.combo > 1 ? 'inline-block' : 'none';
    }

    // Lives
    const hearts = document.querySelectorAll('#runner3d-hud .runner-heart');
    hearts.forEach((h, idx) => {
      if (idx < this.engine.lives) h.classList.remove('lost');
      else h.classList.add('lost');
    });

    // Shield status
    const shieldBadge = document.getElementById('hud-runner-shield');
    if (shieldBadge) {
      shieldBadge.style.display = this.engine.shieldActive ? 'inline-flex' : 'none';
    }

    // World / Language badge
    const langBadge = document.getElementById('hud-runner-lang');
    if (langBadge && this.engine.worldConfig) {
      langBadge.textContent = `${this.engine.worldConfig.icon} ${this.engine.worldConfig.name.toUpperCase()}`;
    }
  }

  updateSpeedometer(speed) {
    const speedEl = document.getElementById('hud-runner-speed');
    if (speedEl) speedEl.textContent = `${speed.toFixed(1)} m/s`;
  }

  toggleCodeDrawer() {
    if (this.isDrawerOpen) this.closeCodeDrawer();
    else this.openCodeDrawer();
  }

  openCodeDrawer(tabToOpen = 'editor') {
    this.isDrawerOpen = true;
    const drawer = document.getElementById('runner-code-drawer');
    if (drawer) {
      drawer.classList.add('open');
      drawer.style.display = 'flex';
    }

    // Switch to specified tab
    const tabBtn = document.querySelector(`.runner-drawer-tab[data-tab="${tabToOpen}"]`);
    if (tabBtn) tabBtn.click();

    // Auto-focus code editor if on editor tab
    if (tabToOpen === 'editor') {
      const textarea = document.getElementById('runner-code-editor');
      if (textarea) setTimeout(() => textarea.focus(), 150);
    }
  }

  closeCodeDrawer() {
    this.isDrawerOpen = false;
    const drawer = document.getElementById('runner-code-drawer');
    if (drawer) {
      drawer.classList.remove('open');
      drawer.style.display = 'none';
    }
  }

  appendTerminalLog(logString) {
    this.terminalLogs.push(logString);
    if (this.terminalLogs.length > 50) this.terminalLogs.shift();

    const box = document.getElementById('runner-terminal-logs');
    if (box) {
      const entry = document.createElement('div');
      entry.className = 'terminal-log-entry';
      entry.textContent = logString;
      box.appendChild(entry);
      box.scrollTop = box.scrollHeight;
    }
  }

  // Display Matrix Bullet-Time Coding Gate Challenge
  showGateChallenge(challenge) {
    // Switch to gate tab
    this.openCodeDrawer('gate');

    const promptEl = document.getElementById('gate-challenge-prompt');
    const codeEl = document.getElementById('gate-challenge-code');
    const optionsContainer = document.getElementById('gate-challenge-options');
    const statusBox = document.getElementById('gate-status-box');
    const continueBtn = document.getElementById('btn-gate-continue');

    if (statusBox) statusBox.style.display = 'none';
    if (continueBtn) continueBtn.style.display = 'none';

    if (promptEl) promptEl.textContent = challenge.question || challenge.prompt || challenge.title;
    if (codeEl) {
      if (challenge.code) {
        codeEl.parentElement.style.display = 'block';
        codeEl.textContent = challenge.code;
      } else {
        codeEl.parentElement.style.display = 'none';
      }
    }

    if (optionsContainer) {
      const opts = challenge.options || challenge.opts || ['Option A', 'Option B', 'Option C', 'Option D'];
      optionsContainer.innerHTML = opts.map((opt, idx) => `
        <button class="option-btn gate-option-btn" data-index="${idx}">
          <span class="option-key-badge">${idx + 1}</span>
          <span>${this.escapeHtml(opt)}</span>
        </button>
      `).join('');

      optionsContainer.querySelectorAll('.gate-option-btn').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.getAttribute('data-index'));
          this.handleGateAnswer(idx, btn, challenge);
        };
      });
    }
  }

  handleGateAnswer(selectedIndex, btnEl, challenge) {
    const result = this.engine.codeBridge.validateGateAnswer(selectedIndex);
    const statusBox = document.getElementById('gate-status-box');
    const continueBtn = document.getElementById('btn-gate-continue');

    if (result.success) {
      btnEl.classList.add('correct');
      if (statusBox) {
        statusBox.style.display = 'flex';
        statusBox.className = 'diagnostic-feedback-box success';
        statusBox.innerHTML = `
          <div class="diagnostic-icon">⚡</div>
          <div class="diagnostic-content">
            <div class="diagnostic-title">FIREWALL NEUTRALIZED!</div>
            <div class="diagnostic-desc">${this.escapeHtml(result.explanation)}</div>
          </div>
        `;
      }
      if (continueBtn) continueBtn.style.display = 'inline-block';
      if (window.Sound) window.Sound.playSuccess();
      if (window.VisualFx) {
        window.VisualFx.toast('FIREWALL BREACHED! TURBO BOOST ENGAGED!', '⚡', 'success');
      }

      this.engine.triggerTurboBoost();
    } else {
      btnEl.classList.add('wrong');
      btnEl.disabled = true;
      if (statusBox) {
        statusBox.style.display = 'flex';
        statusBox.className = 'diagnostic-feedback-box danger';
        statusBox.innerHTML = `
          <div class="diagnostic-icon">⚠️</div>
          <div class="diagnostic-content">
            <div class="diagnostic-title">FIREWALL RESISTANCE DETECTED</div>
            <div class="diagnostic-desc">${this.escapeHtml(result.error)}</div>
          </div>
        `;
      }
      this.engine.takeDamage();
      if (window.Sound) window.Sound.playError();
      if (window.VisualFx) window.VisualFx.shake();
    }
  }

  showPauseModal(show) {
    const modal = document.getElementById('modal-runner-pause');
    if (modal) {
      if (show) modal.classList.add('active');
      else modal.classList.remove('active');
    }
  }

  showGameOver(stats) {
    const modal = document.getElementById('modal-gameover');
    if (modal) modal.classList.add('active');
  }

  showVictory(stats) {
    if (window.Game) {
      window.Game.showResultOverlay(
        stats.stars || 3,
        stats.xp || 150,
        stats.coins || 50,
        Math.floor(stats.duration || 30),
        stats.score || 1200
      );
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.RunnerUI = RunnerUI;
