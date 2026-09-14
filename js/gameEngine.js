/**
 * GLITCH RUNNER - ACTION GAMEPLAY ENGINE
 * Drives the visual game stage, player operative animations, target glitch entities,
 * combo multipliers, mission story objectives, and terminal coding mechanics.
 */

class GameEngine {
  constructor() {
    this.currentLevel = null;
    this.worldConfig = null;
    this.lives = 3;
    this.shieldActive = false;
    this.timerInterval = null;
    this.timeLeft = 0;
    this.totalTime = 0;
    this.timeElapsed = 0;
    this.bossPhaseIndex = 0;
    this.bossHp = 500;
    this.bossMaxHp = 500;
    this.targetHp = 100;
    this.targetMaxHp = 100;
    this.combo = 1;
    this.maxCombo = 1;
    this.builderCurrentOrder = [];
    this.isProcessing = false;
    this.startTime = 0;
  }

  startLevel(levelId) {
    const level = window.LEVELS_DATA.find(l => l.id === levelId);
    if (!level) {
      console.error('Level not found:', levelId);
      return;
    }

    this.currentLevel = level;
    this.worldConfig = window.WORLDS_CONFIG.find(w => w.id === level.worldId);
    this.lives = 3;
    this.shieldActive = false;
    this.bossPhaseIndex = 0;
    this.combo = 1;
    this.maxCombo = 1;
    this.isProcessing = false;
    this.startTime = Date.now();
    this.timeElapsed = 0;

    if (level.mode === 'boss') {
      this.bossHp = level.bossData ? level.bossData.hp : 500;
      this.bossMaxHp = this.bossHp;
    } else {
      this.targetHp = 100;
      this.targetMaxHp = 100;
    }

    // Clear active timer
    if (this.timerInterval) clearInterval(this.timerInterval);

    // Switch view to arena
    if (window.App) window.App.showView('arena');

    this.renderStageVisuals();
    this.renderMissionObjectiveHeader();
    this.renderArenaHUD();
    this.renderMissionContent();

    // Start timer if timed runner
    if (level.mode === 'runner') {
      this.totalTime = level.timeLimitSeconds || 40;
      this.timeLeft = this.totalTime;
      this.startTimer();
    } else {
      const tBox = document.getElementById('arena-timer-box');
      if (tBox) tBox.style.display = 'none';
    }

    if (window.Sound) window.Sound.playClick();
  }

  // Render the Cyber Combat Game Stage (Player Operative vs Target Entity / Boss)
  renderStageVisuals() {
    const player = window.GameState.data.player;
    const lvl = this.currentLevel;

    // Player Operative side
    const opAvatar = document.getElementById('stage-player-avatar');
    const opName = document.getElementById('stage-player-name');
    const opRank = document.getElementById('stage-player-rank');
    if (opAvatar) opAvatar.textContent = player.avatar || '⚡';
    if (opName) opName.textContent = player.username || 'CodeHunter';
    if (opRank) opRank.textContent = `LVL ${player.level} ${player.rank}`;

    // Target / Glitch / Boss side
    const targetAvatar = document.getElementById('stage-target-avatar');
    const targetName = document.getElementById('stage-target-name');
    const targetBubble = document.getElementById('stage-target-bubble');
    const targetEntity = document.getElementById('stage-target-entity');

    const enemy = lvl.targetEnemy || { name: 'GLITCH ENTITY', avatar: '👾', hp: 100 };

    if (targetAvatar) targetAvatar.textContent = enemy.avatar;
    if (targetName) targetName.textContent = enemy.name;
    if (targetBubble) {
      targetBubble.textContent = lvl.mode === 'boss' 
        ? (lvl.story || "System integrity compromised!") 
        : `Integrity at 100% Corruption`;
    }

    if (targetEntity) {
      if (lvl.mode === 'boss') {
        targetEntity.classList.add('boss-stage');
      } else {
        targetEntity.classList.remove('boss-stage');
      }
    }

    this.updateStageHealthMeters();
    this.updateComboDisplay();
  }

  updateStageHealthMeters() {
    // Target meter
    const targetFill = document.getElementById('stage-target-fill');
    const targetText = document.getElementById('stage-target-hp-val');
    if (this.currentLevel.mode === 'boss') {
      const pct = Math.max(0, Math.round((this.bossHp / this.bossMaxHp) * 100));
      if (targetFill) targetFill.style.width = `${pct}%`;
      if (targetText) targetText.textContent = `${this.bossHp} / ${this.bossMaxHp} HP`;
    } else {
      const pct = Math.max(0, Math.round((this.targetHp / this.targetMaxHp) * 100));
      if (targetFill) targetFill.style.width = `${pct}%`;
      if (targetText) targetText.textContent = `${pct}% Glitched`;
    }

    // Player meter
    const playerFill = document.getElementById('stage-player-fill');
    const playerText = document.getElementById('stage-player-hp-val');
    const playerPct = Math.round((this.lives / 3) * 100);
    if (playerFill) playerFill.style.width = `${playerPct}%`;
    if (playerText) playerText.textContent = `${this.lives} / 3 LIVES`;
  }

  updateComboDisplay() {
    const comboBadge = document.getElementById('stage-combo-badge');
    const comboVal = document.getElementById('stage-combo-val');
    if (comboVal) comboVal.textContent = `${this.combo.toFixed(1)}x`;
    if (comboBadge) {
      if (this.combo > 1) {
        comboBadge.style.display = 'inline-flex';
      } else {
        comboBadge.style.display = 'none';
      }
    }
  }

  // Render Mission Story & Objective Header
  renderMissionObjectiveHeader() {
    const codeEl = document.getElementById('mission-code-display');
    const titleEl = document.getElementById('mission-title-display');
    const storyEl = document.getElementById('mission-story-display');

    if (codeEl) codeEl.textContent = `${this.worldConfig.name.toUpperCase()} // ${this.currentLevel.areaName.toUpperCase()}`;
    if (titleEl) titleEl.textContent = `MISSION ${this.currentLevel.levelNumber}: ${this.currentLevel.title.toUpperCase()}`;
    if (storyEl) storyEl.textContent = this.currentLevel.story;
  }

  renderArenaHUD() {
    const modeTag = document.getElementById('arena-mode-tag');
    const titleEl = document.getElementById('arena-title');
    const conceptBox = document.getElementById('arena-concept-box');

    if (modeTag) {
      modeTag.className = `mode-tag ${this.currentLevel.mode}`;
      modeTag.textContent = this.getModeLabel(this.currentLevel.mode);
    }
    if (titleEl) {
      titleEl.textContent = this.currentLevel.title;
    }

    // Concept intel bar
    if (conceptBox) {
      if (this.currentLevel.concept) {
        conceptBox.style.display = 'flex';
        document.getElementById('concept-text').textContent = this.currentLevel.concept;
      } else {
        conceptBox.style.display = 'none';
      }
    }

    this.updateLivesDisplay();
    this.updatePowerupButtons();
  }

  getModeLabel(mode) {
    switch (mode) {
      case 'completion': return '✍️ CODE COMPLETION';
      case 'detective': return '🔍 OUTPUT DETECTIVE';
      case 'glitch': return '🐛 BUG HUNTER';
      case 'debug': return '🛠️ DEBUG MISSION';
      case 'runner': return '🏃 SPEED RUN';
      case 'builder': return '🧩 CODE BUILDER';
      case 'logic': return '⚡ LOGIC CHALLENGE';
      case 'concept': return '💡 ARCHITECT CONCEPT';
      case 'boss': return '👹 BOSS BATTLE';
      default: return '🎯 CODING MISSION';
    }
  }

  updateLivesDisplay() {
    const hearts = document.querySelectorAll('.player-lives .heart-icon');
    hearts.forEach((h, index) => {
      if (index < this.lives) h.classList.remove('lost');
      else h.classList.add('lost');
    });

    const shieldBadge = document.getElementById('arena-shield-badge');
    if (shieldBadge) shieldBadge.style.display = this.shieldActive ? 'inline-flex' : 'none';
  }

  updatePowerupButtons() {
    const inv = window.GameState.data.inventory;
    document.getElementById('count-hint').textContent = inv.hints;
    document.getElementById('count-time').textContent = inv.timeBoosts;
    document.getElementById('count-life').textContent = inv.extraLives;
    document.getElementById('count-shield').textContent = inv.shields;
    document.getElementById('btn-use-time').disabled = (this.currentLevel.mode !== 'runner');
  }

  startTimer() {
    const timerBox = document.getElementById('arena-timer-box');
    const timerVal = document.getElementById('arena-timer-value');
    if (timerBox) timerBox.style.display = 'flex';

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (timerVal) timerVal.textContent = `${this.timeLeft}s`;

      if (this.timeLeft <= 10) {
        if (timerBox) timerBox.classList.add('urgent');
      } else {
        if (timerBox) timerBox.classList.remove('urgent');
      }

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeOut();
      }
    }, 1000);
  }

  handleTimeOut() {
    if (window.Sound) window.Sound.playError();
    if (window.VisualFx) {
      window.VisualFx.shake();
      window.VisualFx.toast('TIME LIMIT EXCEEDED! Core glitch overheated.', '⏱️', 'danger');
    }
    this.takeDamage();
  }

  renderMissionContent() {
    const area = document.getElementById('arena-playable-area');
    if (!area) return;

    if (this.currentLevel.mode === 'builder') {
      this.renderCodeBuilder(area);
    } else if (this.currentLevel.mode === 'boss') {
      this.renderBossPhase(area);
    } else {
      this.renderStandardChallenge(area);
    }
  }

  renderStandardChallenge(container) {
    const lvl = this.currentLevel;

    // Fisher-Yates shuffle options while preserving origIdx mapping
    const rawOptions = lvl.options || ['Option A', 'Option B', 'Option C', 'Option D'];
    const shuffled = rawOptions.map((opt, origIdx) => ({ text: opt, origIdx }));
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.currentShuffledOptions = shuffled;

    // Code formatting: in completion mode, highlight '___' blanks
    let formattedCode = lvl.code ? this.escapeHtml(lvl.code) : '';
    if (lvl.mode === 'completion' && formattedCode) {
      formattedCode = formattedCode.replace(/___/g, '<span class="code-blank">___</span>');
    }

    container.innerHTML = `
      <div class="challenge-card mode-${lvl.mode || 'detective'}">
        <div class="challenge-header-bar">
          <span class="challenge-mode-badge ${lvl.mode}">${this.getModeLabel(lvl.mode)}</span>
          <span class="challenge-level-indicator">MISSION #${lvl.levelNumber}</span>
        </div>
        <div class="challenge-prompt">${this.escapeHtml(lvl.question)}</div>
        
        ${lvl.code ? `
          <div class="code-terminal">
            <div class="code-terminal-header">
              <div class="terminal-dots">
                <span class="terminal-dot red"></span>
                <span class="terminal-dot yellow"></span>
                <span class="terminal-dot green"></span>
              </div>
              <span>${lvl.worldId}.terminal // mission_${lvl.levelNumber}</span>
            </div>
            <pre class="code-body"><code>${formattedCode}</code></pre>
          </div>
        ` : ''}

        <!-- Inline Diagnostic Compiler Error Feedback -->
        <div class="diagnostic-feedback-box" id="diagnostic-feedback-box" style="display: none;"></div>

        <div class="options-grid" id="mission-options-grid">
          ${this.currentShuffledOptions.map((item, screenIdx) => `
            <button class="option-btn" data-orig-index="${item.origIdx}">
              <span class="option-key-badge">${screenIdx + 1}</span>
              <span>${this.escapeHtml(item.text)}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const origIdx = parseInt(btn.getAttribute('data-orig-index'));
        this.handleStandardAnswer(origIdx, btn);
      });
    });
  }

  renderCodeBuilder(container) {
    const lvl = this.currentLevel;
    const blocks = lvl.codeBlocks || ['let a = 1;', 'let b = 2;', 'console.log(a + b);'];
    const shuffled = blocks.map((block, idx) => ({ text: block, originalIdx: idx }));
    shuffled.sort(() => Math.random() - 0.5);
    this.builderCurrentOrder = shuffled;

    container.innerHTML = `
      <div class="challenge-card">
        <div class="challenge-prompt">${lvl.question}</div>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
          Reassemble the logic sequence to compile and discharge the weapon beam:
        </p>

        <div class="builder-board">
          <div class="builder-slot-area" id="builder-drop-area">
            <div class="builder-area-title">⚡ EXECUTION PIPELINE (TAP ARROWS TO REORDER)</div>
            ${this.builderCurrentOrder.map((item, idx) => `
              <div class="code-tile" data-index="${idx}">
                <span>${this.escapeHtml(item.text)}</span>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                  <button class="filter-btn btn-move-tile" data-dir="up" data-index="${idx}">▲</button>
                  <button class="filter-btn btn-move-tile" data-dir="down" data-index="${idx}">▼</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <button class="btn-cyber-primary" id="btn-submit-builder" style="width: 100%;">
          ⚡ DISCHARGE CODE BEAM &amp; COMPILE
        </button>
      </div>
    `;

    this.bindBuilderEvents(container);
  }

  bindBuilderEvents(container) {
    container.querySelectorAll('.btn-move-tile').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'));
        const dir = btn.getAttribute('data-dir');
        if (dir === 'up' && idx > 0) {
          const temp = this.builderCurrentOrder[idx];
          this.builderCurrentOrder[idx] = this.builderCurrentOrder[idx - 1];
          this.builderCurrentOrder[idx - 1] = temp;
          this.rebuildTilesList();
        } else if (dir === 'down' && idx < this.builderCurrentOrder.length - 1) {
          const temp = this.builderCurrentOrder[idx];
          this.builderCurrentOrder[idx] = this.builderCurrentOrder[idx + 1];
          this.builderCurrentOrder[idx + 1] = temp;
          this.rebuildTilesList();
        }
      });
    });

    const submitBtn = document.getElementById('btn-submit-builder');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.handleBuilderSubmit());
    }
  }

  rebuildTilesList() {
    const dropArea = document.getElementById('builder-drop-area');
    if (!dropArea) return;
    dropArea.innerHTML = `
      <div class="builder-area-title">⚡ EXECUTION PIPELINE (TAP ARROWS TO REORDER)</div>
      ${this.builderCurrentOrder.map((item, idx) => `
        <div class="code-tile" data-index="${idx}">
          <span>${this.escapeHtml(item.text)}</span>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button class="filter-btn btn-move-tile" data-dir="up" data-index="${idx}">▲</button>
            <button class="filter-btn btn-move-tile" data-dir="down" data-index="${idx}">▼</button>
          </div>
        </div>
      `).join('')}
    `;
    this.bindBuilderEvents(document.getElementById('arena-playable-area'));
  }

  handleBuilderSubmit() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    const targetOrder = this.currentLevel.correctOrder || [0, 1, 2];
    let isCorrect = true;

    if (this.builderCurrentOrder.length !== targetOrder.length) {
      isCorrect = false;
    } else {
      for (let i = 0; i < targetOrder.length; i++) {
        if (this.builderCurrentOrder[i].originalIdx !== targetOrder[i]) {
          isCorrect = false;
          break;
        }
      }
    }

    if (isCorrect) {
      this.triggerOperativeAttack();
      this.targetHp = 0;
      this.updateStageHealthMeters();
      if (window.Sound) window.Sound.playSuccess();
      if (window.VisualFx) {
        window.VisualFx.toast('PIPELINE COMPILED! TARGET PURIFIED.', '⚡', 'success');
      }
      setTimeout(() => this.openExplanationDrawer(), 800);
    } else {
      if (window.Sound) window.Sound.playError();
      if (window.VisualFx) {
        window.VisualFx.shake();
        window.VisualFx.toast('SYNTAX COLLAPSE: Faulty assembly sequence.', '❌', 'danger');
      }
      this.takeDamage();
      this.isProcessing = false;
    }
  }

  renderBossPhase(container) {
    const phases = this.currentLevel.phases || [
      { question: 'Boss Challenge Phase', options: ['Option A', 'Option B'], correctAnswer: 0 }
    ];
    const phase = phases[this.bossPhaseIndex];
    if (!phase) {
      this.openExplanationDrawer();
      return;
    }

    const phaseOptions = phase.options || phase.opts || [];
    const phaseAnswer = phase.correctAnswer !== undefined ? phase.correctAnswer : (phase.a !== undefined ? phase.a : 0);

    // Fisher-Yates shuffle boss options while preserving origIdx mapping
    const shuffled = phaseOptions.map((opt, origIdx) => ({ text: opt, origIdx }));
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.currentBossShuffledOptions = shuffled;

    container.innerHTML = `
      <div class="challenge-card boss-card" style="border-color: var(--accent-danger);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <span style="font-family: var(--font-display); font-weight: 900; color: var(--accent-danger); font-size: 0.85rem;">
            ⚔️ BOSS ENCOUNTER — PHASE ${this.bossPhaseIndex + 1} OF ${phases.length}
          </span>
          <span style="color: var(--accent-warning); font-weight: 800; font-size: 0.85rem;">
            Boss HP: ${this.bossHp} / ${this.bossMaxHp}
          </span>
        </div>
        <div class="challenge-prompt">${this.escapeHtml(phase.question || phase.q || '')}</div>

        ${phase.code ? `
          <div class="code-terminal" style="border-color: rgba(255, 0, 85, 0.4);">
            <div class="code-terminal-header">
              <div class="terminal-dots">
                <span class="terminal-dot red"></span>
                <span class="terminal-dot yellow"></span>
                <span class="terminal-dot green"></span>
              </div>
              <span style="color: var(--accent-danger);">${this.currentLevel.worldId}.boss // phase_${this.bossPhaseIndex + 1}</span>
            </div>
            <pre class="code-body"><code>${this.escapeHtml(phase.code)}</code></pre>
          </div>
        ` : ''}

        <!-- Inline Boss Diagnostic Feedback -->
        <div class="diagnostic-feedback-box" id="boss-diagnostic-box" style="display: none;"></div>

        <div class="options-grid" id="boss-options-grid">
          ${this.currentBossShuffledOptions.map((item, screenIdx) => `
            <button class="option-btn" data-orig-index="${item.origIdx}">
              <span class="option-key-badge">${screenIdx + 1}</span>
              <span>${this.escapeHtml(item.text)}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const origIdx = parseInt(btn.getAttribute('data-orig-index'));
        this.handleBossAnswer(origIdx, btn);
      });
    });
  }

  handleBossAnswer(origIdx, btnEl) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    const phases = this.currentLevel.phases;
    const phase = phases[this.bossPhaseIndex];
    const correctAns = phase.correctAnswer !== undefined ? phase.correctAnswer : (phase.a !== undefined ? phase.a : 0);

    if (origIdx === correctAns) {
      btnEl.classList.add('correct');
      this.triggerOperativeAttack();
      this.incrementCombo();

      const damage = Math.round(this.bossMaxHp / phases.length);
      this.bossHp = Math.max(0, this.bossHp - damage);
      this.updateStageHealthMeters();

      this.spawnCombatText(`-${damage} DMG!`, 'var(--accent-danger)');

      if (window.Sound) window.Sound.playBossHit();

      // Show phase cleared intel toast if explanation exists
      if (phase.explanation && window.VisualFx) {
        window.VisualFx.toast(`PHASE CLEARED: ${phase.explanation}`, '⚔️', 'success');
      }

      const bossDiag = document.getElementById('boss-diagnostic-box');
      if (bossDiag) bossDiag.style.display = 'none';

      setTimeout(() => {
        this.bossPhaseIndex++;
        this.isProcessing = false;

        if (this.bossPhaseIndex >= phases.length || this.bossHp <= 0) {
          if (window.Sound) window.Sound.playLevelUp();
          if (window.VisualFx) {
            window.VisualFx.toast(`🏆 ${this.currentLevel.bossData.name} ANNIHILATED!`, '🏆', 'success');
          }
          this.openExplanationDrawer();
        } else {
          this.renderBossPhase(document.getElementById('arena-playable-area'));
        }
      }, 700);
    } else {
      btnEl.classList.add('wrong');
      btnEl.disabled = true;
      this.resetCombo();
      if (window.Sound) window.Sound.playError();
      if (window.VisualFx) window.VisualFx.shake();
      this.takeDamage();

      const bossDiag = document.getElementById('boss-diagnostic-box');
      if (bossDiag) {
        bossDiag.style.display = 'flex';
        bossDiag.innerHTML = `
          <div class="diagnostic-icon">💥</div>
          <div class="diagnostic-content">
            <div class="diagnostic-title">BOSS COUNTER-SURGE DETECTED!</div>
            <div class="diagnostic-desc">Candidate submission rejected by boss firewall. Analyze syntax &amp; re-engage!</div>
          </div>
        `;
      }

      setTimeout(() => {
        this.isProcessing = false;
      }, 400);
    }
  }

  handleStandardAnswer(origIdx, btnEl) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    if (origIdx === this.currentLevel.correctAnswer) {
      btnEl.classList.add('correct');
      this.triggerOperativeAttack();
      this.incrementCombo();

      this.targetHp = 0;
      this.updateStageHealthMeters();
      this.spawnCombatText(`CRITICAL HIT!`, 'var(--accent-primary)');

      if (window.Sound) window.Sound.playSuccess();
      if (this.timerInterval) clearInterval(this.timerInterval);

      // Hide diagnostic feedback if visible
      const diagBox = document.getElementById('diagnostic-feedback-box');
      if (diagBox) diagBox.style.display = 'none';

      // Open Mission Intel / Explanation Drawer
      setTimeout(() => {
        this.openExplanationDrawer();
      }, 700);
    } else {
      btnEl.classList.add('wrong');
      btnEl.disabled = true;
      this.resetCombo();
      if (window.Sound) window.Sound.playError();
      if (window.VisualFx) window.VisualFx.shake();
      this.takeDamage();

      // Show Inline Diagnostic Compiler Error Feedback
      this.showDiagnosticFeedback(btnEl.textContent.trim());

      setTimeout(() => {
        this.isProcessing = false;
      }, 400);
    }
  }

  // Inline Diagnostic Compiler Error Feedback when a mistake is made
  showDiagnosticFeedback(wrongOptionText) {
    const diagBox = document.getElementById('diagnostic-feedback-box');
    if (!diagBox) return;

    diagBox.style.display = 'flex';
    diagBox.innerHTML = `
      <div class="diagnostic-icon">⚠️</div>
      <div class="diagnostic-content">
        <div class="diagnostic-title">COMPILER DIAGNOSTIC // SYNTAX MISMATCH</div>
        <div class="diagnostic-desc">
          Candidate <code>${this.escapeHtml(wrongOptionText)}</code> rejected by runtime validation checks.
        </div>
        <div class="diagnostic-hint">
          💡 <strong>INTEL CLUE:</strong> ${this.escapeHtml(this.currentLevel.hint)}
        </div>
      </div>
    `;
  }

  // Mission Intel / Educational Explanation Drawer
  openExplanationDrawer() {
    const drawer = document.getElementById('arena-explanation-drawer');
    if (!drawer) {
      this.finishLevel(true);
      return;
    }

    const titleEl = document.getElementById('drawer-level-title');
    const explEl = document.getElementById('drawer-explanation-content');
    const tipEl = document.getElementById('drawer-pro-tip-content');

    if (titleEl) titleEl.textContent = this.currentLevel.title;
    if (explEl) explEl.textContent = this.currentLevel.explanation || this.currentLevel.concept;
    if (tipEl) tipEl.textContent = this.currentLevel.hint || `Mastering this mechanic unlocks deeper ${this.worldConfig ? this.worldConfig.name : ''} architectural capabilities.`;

    drawer.style.display = 'flex';
    drawer.classList.add('open');

    // Bind continue & close buttons
    const continueBtn = document.getElementById('btn-drawer-continue');
    const closeBtn = document.getElementById('btn-drawer-close');
    const backdrop = document.getElementById('explanation-drawer-backdrop');

    const handleContinue = () => {
      drawer.classList.remove('open');
      drawer.style.display = 'none';
      this.finishLevel(true);
    };

    if (continueBtn) continueBtn.onclick = handleContinue;
    if (closeBtn) closeBtn.onclick = handleContinue;
    if (backdrop) backdrop.onclick = handleContinue;
  }

  // Combat Visual FX: Operative fires laser beam at target
  triggerOperativeAttack() {
    const operative = document.getElementById('stage-player-entity');
    const target = document.getElementById('stage-target-avatar');

    if (operative) {
      operative.classList.remove('operative-attacking');
      void operative.offsetWidth;
      operative.classList.add('operative-attacking');
    }

    // Spawn animated laser beam on stage
    const arena = document.getElementById('stage-arena-platform');
    if (arena) {
      const beam = document.createElement('div');
      beam.className = 'laser-beam';
      arena.appendChild(beam);
      setTimeout(() => beam.remove(), 450);
    }

    if (target) {
      setTimeout(() => {
        target.classList.remove('target-damaged');
        void target.offsetWidth;
        target.classList.add('target-damaged');
        if (window.VisualFx) {
          const rect = target.getBoundingClientRect();
          window.VisualFx.spawnSparks(rect.left + rect.width / 2, rect.top + rect.height / 2, 'var(--accent-primary)');
        }
      }, 150);
    }
  }

  spawnCombatText(text, color = 'var(--accent-primary)') {
    const centerZone = document.getElementById('stage-combat-center');
    if (!centerZone) return;

    const floating = document.createElement('div');
    floating.className = 'floating-combat-text';
    floating.textContent = text;
    floating.style.color = color;
    floating.style.textShadow = `0 0 15px ${color}`;
    centerZone.appendChild(floating);
    setTimeout(() => floating.remove(), 800);
  }

  incrementCombo() {
    this.combo = Math.min(3.0, this.combo + 0.5);
    if (this.combo > this.maxCombo) this.maxCombo = this.combo;
    this.updateComboDisplay();
  }

  resetCombo() {
    this.combo = 1.0;
    this.updateComboDisplay();
  }

  takeDamage() {
    if (this.shieldActive) {
      this.shieldActive = false;
      if (window.Sound) window.Sound.playShield();
      if (window.VisualFx) {
        window.VisualFx.toast('SHIELD BARRIER ABSORBED GLITCH DAMAGE!', '🛡️', 'info');
      }
      this.spawnCombatText('SHIELD DEFLECT!', 'var(--accent-secondary)');
      this.updateLivesDisplay();
      this.updateStageHealthMeters();
      return;
    }

    this.lives--;
    if (window.VisualFx) window.VisualFx.glitchFlash();
    this.spawnCombatText('-1 LIFE!', 'var(--accent-danger)');
    this.updateLivesDisplay();
    this.updateStageHealthMeters();

    if (this.lives <= 0) {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.showGameOverModal();
    }
  }

  useHint() {
    if (window.GameState.data.inventory.hints <= 0) {
      this.promptBuyPowerup('hints', '💡 Hint', 20);
      return;
    }

    window.GameState.data.inventory.hints--;
    window.GameState.save();
    this.updatePowerupButtons();

    if (window.Sound) window.Sound.playClick();
    if (window.VisualFx) {
      window.VisualFx.toast(`HINT INTEL: ${this.currentLevel.hint}`, '💡', 'info');
    }

    const isBoss = this.currentLevel.mode === 'boss';
    const currentPhase = isBoss && this.currentLevel.phases ? this.currentLevel.phases[this.bossPhaseIndex] : null;
    const correctAns = isBoss
      ? (currentPhase ? (currentPhase.correctAnswer !== undefined ? currentPhase.correctAnswer : currentPhase.a) : 0)
      : this.currentLevel.correctAnswer;

    const wrongButtons = Array.from(document.querySelectorAll('#mission-options-grid .option-btn, #boss-options-grid .option-btn'))
      .filter(b => parseInt(b.getAttribute('data-orig-index')) !== correctAns && !b.disabled);
    if (wrongButtons.length > 0) {
      wrongButtons[0].style.opacity = '0.3';
      wrongButtons[0].style.pointerEvents = 'none';
      wrongButtons[0].disabled = true;
    }
  }

  useTimeBoost() {
    if (this.currentLevel.mode !== 'runner') return;
    if (window.GameState.data.inventory.timeBoosts <= 0) {
      this.promptBuyPowerup('timeBoosts', '⏱ Time Boost', 40);
      return;
    }

    window.GameState.data.inventory.timeBoosts--;
    this.timeLeft += 20;
    window.GameState.save();
    this.updatePowerupButtons();

    if (window.Sound) window.Sound.playCoin();
    if (window.VisualFx) {
      window.VisualFx.toast('+20 SECONDS ADDED TO CLOCK!', '⏱️', 'success');
    }
  }

  useExtraLife() {
    if (this.lives >= 3) {
      if (window.VisualFx) window.VisualFx.toast('Operative health is already 100%!', '❤️', 'info');
      return;
    }
    if (window.GameState.data.inventory.extraLives <= 0) {
      this.promptBuyPowerup('extraLives', '❤️ Extra Life', 50);
      return;
    }

    window.GameState.data.inventory.extraLives--;
    this.lives = Math.min(3, this.lives + 1);
    window.GameState.save();
    this.updatePowerupButtons();
    this.updateLivesDisplay();
    this.updateStageHealthMeters();

    if (window.Sound) window.Sound.playCoin();
    if (window.VisualFx) window.VisualFx.toast('+1 LIFE RESTORED!', '❤️', 'success');
  }

  useShield() {
    if (this.shieldActive) {
      if (window.VisualFx) window.VisualFx.toast('Energy Shield is already primed!', '🛡️', 'info');
      return;
    }
    if (window.GameState.data.inventory.shields <= 0) {
      this.promptBuyPowerup('shields', '🛡 Shield', 35);
      return;
    }

    window.GameState.data.inventory.shields--;
    this.shieldActive = true;
    window.GameState.save();
    this.updatePowerupButtons();
    this.updateLivesDisplay();

    if (window.Sound) window.Sound.playShield();
    if (window.VisualFx) window.VisualFx.toast('ENERGY BARRIER ARMED!', '🛡️', 'success');
  }

  promptBuyPowerup(itemKey, name, cost) {
    if (window.GameState.data.player.coins >= cost) {
      if (confirm(`You have 0 ${name}. Buy one right now for ${cost} 🪙?`)) {
        window.GameState.spendCoins(cost);
        window.GameState.data.inventory[itemKey]++;
        window.GameState.save();
        this.updatePowerupButtons();
        if (window.VisualFx) window.VisualFx.toast(`Acquired ${name}!`, '🛒', 'success');
      }
    } else {
      if (window.VisualFx) window.VisualFx.toast(`Need ${cost} Coins!`, '⚠️', 'danger');
    }
  }

  finishLevel(isSuccess) {
    if (this.timerInterval) clearInterval(this.timerInterval);
    const duration = Math.round((Date.now() - this.startTime) / 1000);

    let stars = 1;
    if (this.lives === 3) stars = 3;
    else if (this.lives === 2) stars = 2;

    const baseScore = 500 * stars;
    const timeBonus = Math.max(0, (60 - duration) * 5);
    const totalScore = Math.round((baseScore + timeBonus) * this.maxCombo);

    const xpEarned = Math.round((this.currentLevel.xpReward || 100) * this.maxCombo);
    const coinsEarned = Math.round(((this.currentLevel.coinReward || 30) + (stars === 3 ? 25 : 0)) * this.maxCombo);

    // Save level completion in GameState
    window.GameState.recordLevelCompletion(this.currentLevel.worldId, this.currentLevel.id, stars, totalScore);
    window.GameState.addXp(xpEarned);
    window.GameState.addCoins(coinsEarned);

    if (this.currentLevel.mode === 'glitch') window.GameState.data.achievements.progress.bugsFixed++;
    if (this.currentLevel.mode === 'runner') window.GameState.data.achievements.progress.timedCompleted++;
    if (this.currentLevel.mode === 'boss') {
      window.GameState.data.achievements.progress.bossesDefeated++;
      if (this.currentLevel.isFinalBoss) {
        window.GameState.data.worlds[this.currentLevel.worldId].bossDefeated = true;
      }
    }
    if (stars === 3) window.GameState.data.achievements.progress.perfectRuns++;
    window.GameState.save();

    this.showResultOverlay(stars, xpEarned, coinsEarned, duration, totalScore);
  }

  showResultOverlay(stars, xp, coins, duration, score) {
    const modal = document.getElementById('modal-result');
    if (!modal) return;

    const titleText = this.currentLevel.mode === 'boss' ? 'BOSS OBLITERATED! 🏆' : 'MISSION ACCOMPLISHED! ⚡';
    document.getElementById('result-title-text').textContent = titleText;
    document.getElementById('result-title-text').className = 'result-title victory';
    document.getElementById('result-xp-val').textContent = `+${xp} XP`;
    document.getElementById('result-coins-val').textContent = `+${coins} 🪙`;
    document.getElementById('result-accuracy-val').textContent = `${Math.round((this.lives / 3) * 100)}% (${this.maxCombo.toFixed(1)}x Combo)`;
    document.getElementById('result-time-val').textContent = `${duration}s`;

    const starEls = [
      document.getElementById('star-slot-1'),
      document.getElementById('star-slot-2'),
      document.getElementById('star-slot-3')
    ];

    starEls.forEach((s, idx) => {
      s.classList.remove('earned', 'star-pop-anim');
      if (idx < stars) {
        setTimeout(() => {
          s.classList.add('earned', 'star-pop-anim');
          if (window.Sound) window.Sound.playCoin();
        }, (idx + 1) * 300);
      }
    });

    modal.classList.add('active');
    if (window.Sound) window.Sound.playLevelUp();
  }

  showGameOverModal() {
    const modal = document.getElementById('modal-gameover');
    if (modal) modal.classList.add('active');
  }

  reviveWithCoins() {
    if (window.GameState.data.player.coins >= 50) {
      window.GameState.spendCoins(50);
      this.lives = 3;
      this.updateLivesDisplay();
      this.updateStageHealthMeters();
      const modal = document.getElementById('modal-gameover');
      if (modal) modal.classList.remove('active');
      if (window.Sound) window.Sound.playCoin();
      if (window.VisualFx) window.VisualFx.toast('OPERATIVE REVIVED! 3 Lives Restored.', '❤️', 'success');
      this.isProcessing = false;
    } else {
      if (window.VisualFx) window.VisualFx.toast('Need 50 coins to revive!', '⚠️', 'danger');
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

window.Game = new GameEngine();
