/**
 * GLITCH RUNNER - CHALLENGE & LEARNING ENGINE
 * Drives diverse interactive coding experiences:
 * - Real Code Writing with Automated Test Cases
 * - Bug Debugging & Diagnostic Fixing
 * - Code Completion & Blanks
 * - Output Prediction
 * - Mini-Lessons with Runnable Live Examples
 * - Logic Assembly Reordering
 * - 3-Tier Progressive Hint System
 */

class ChallengeEngine {
  constructor() {
    this.currentLevel = null;
    this.activeEditor = null;
    this.currentHintTier = 0;
    this.activeTestOutcome = null;
  }

  // Determine normalized challenge activity type
  getActivityType(level) {
    if ((level.testCases && level.testCases.length > 0) || level.mode === 'write') return 'write_code';
    if (level.mode === 'debug' || level.mode === 'glitch') return 'debug';
    if (level.mode === 'completion') return 'complete_code';
    if (level.mode === 'builder') return 'builder';
    if (level.mode === 'lesson' || level.miniLesson) return 'mini_lesson';
    if (level.mode === 'runner') return 'gameplay';
    if (level.mode === 'boss') return 'boss';
    return 'predict';
  }

  // Mount challenge into target DOM container
  renderChallenge(container, level, onCompleteCallback) {
    this.currentLevel = level;
    this.onComplete = onCompleteCallback;
    this.currentHintTier = 0;

    const activityType = this.getActivityType(level);

    if (activityType === 'write_code' || activityType === 'debug') {
      this.renderCodingChallenge(container, level, activityType);
    } else if (activityType === 'mini_lesson') {
      this.renderMiniLesson(container, level);
    } else {
      // Defer standard multiple-choice / builder / boss to existing gameEngine
      if (window.Game) {
        if (level.mode === 'builder') {
          window.Game.renderCodeBuilder(container);
        } else if (level.mode === 'boss') {
          window.Game.renderBossPhase(container);
        } else {
          window.Game.renderStandardChallenge(container);
        }
      }
    }
  }

  // 1. Full Code Writing & Debugging Interface
  renderCodingChallenge(container, level, activityType) {
    const isDebug = activityType === 'debug';
    const starterCode = level.starterCode || level.code || `function solution() {\n  // Write your code here\n  \n}`;
    const testCases = level.testCases || [
      { input: [], evalExpression: 'typeof solution === "function"', expected: true, description: 'Declares solution function' }
    ];

    const scene = (level.sim && level.sim.preview) || {
      player: { x: 0, y: 0 },
      glitches: [
        { id: 1, x: 3, y: 0 },
        { id: 2, x: 1, y: 1 }
      ]
    };

    container.innerHTML = `
      <div class="coding-mission-card">
        <div class="mission-mobile-tabs" role="tablist">
          <button type="button" class="mission-tab active" data-mission-tab="sim">GAME</button>
          <button type="button" class="mission-tab" data-mission-tab="code">CODE</button>
          <button type="button" class="mission-tab" data-mission-tab="tests">TESTS</button>
        </div>

        <div class="mission-split">
          <div class="mission-pane mission-pane-sim" data-pane="sim">
            <div class="mission-type-ribbon ${activityType}">
              <span>${isDebug ? 'DEBUG MISSION' : 'GLITCH HUNTER'}</span>
              <span class="mission-concept-tag">${this.escapeHtml(level.concept || level.worldId || '')}</span>
            </div>
            <div class="mission-instructions">
              <h3 class="mission-prompt-title">${this.escapeHtml(level.question || level.prompt || 'Implement the required algorithm:')}</h3>
              ${level.story ? `<p class="mission-story-text">${this.escapeHtml(level.story)}</p>` : ''}
              ${level.inputFormat ? `<p class="mission-io"><strong>Input:</strong> ${this.escapeHtml(level.inputFormat)}</p>` : ''}
              ${level.outputFormat ? `<p class="mission-io"><strong>Output:</strong> ${this.escapeHtml(level.outputFormat)}</p>` : ''}
            </div>
            <div id="glitch-sim-mount" class="glitch-sim-mount" aria-label="Game simulation"></div>
            <div class="game-log-panel" id="game-log-panel"></div>
          </div>

          <div class="mission-pane mission-pane-code" data-pane="code">
            <div class="tier-hints-bar">
              <div class="hint-header-row">
                <span class="hint-label">HINTS</span>
                <div class="hint-tier-buttons">
                  <button type="button" class="btn-hint-tier" id="btn-hint-tier-1">1. Concept</button>
                  <button type="button" class="btn-hint-tier" id="btn-hint-tier-2">2. Structure</button>
                  <button type="button" class="btn-hint-tier" id="btn-hint-tier-3">3. Push</button>
                </div>
              </div>
              <div class="hint-display-box" id="hint-display-box" style="display: none;"></div>
            </div>
            <div class="editor-mount-point" id="coding-editor-container"></div>
          </div>
        </div>

        <div class="coding-actions-bar">
          <button type="button" class="btn-cyber-secondary" id="btn-reset-code">RESET</button>
          <button type="button" class="btn-cyber-secondary" id="btn-editor-expand">FULL EDITOR</button>
          <button type="button" class="btn-cyber-primary" id="btn-run-tests">RUN</button>
          <button type="button" class="btn-cyber-primary btn-submit-solution" id="btn-submit-code" disabled>SUBMIT</button>
        </div>

        <div class="mission-pane mission-pane-tests" data-pane="tests">
          <div class="test-results-deck" id="test-results-deck">
            <div class="test-standby-message">RUN public tests. Hidden tests run only on SUBMIT and are not shown.</div>
          </div>
        </div>
      </div>
    `;

    if (window.GlitchHunterSim) {
      window.GlitchHunterSim.renderIdle(document.getElementById('glitch-sim-mount'), scene);
    }

    // Mount CyberCodeEditor
    const editorMount = document.getElementById('coding-editor-container');
    this.activeEditor = new CyberCodeEditor({
      container: editorMount,
      language: level.worldId || 'javascript',
      value: starterCode,
      minHeight: '190px',
      maxHeight: '340px',
      onSubmit: () => this.executeTests(level, testCases)
    });

    this.bindCodingEvents(container, level, testCases, starterCode);
  }

  bindCodingEvents(container, level, testCases, starterCode) {
    const runBtn = document.getElementById('btn-run-tests');
    const submitBtn = document.getElementById('btn-submit-code');
    const resetBtn = document.getElementById('btn-reset-code');
    const expandBtn = document.getElementById('btn-editor-expand');

    if (runBtn) {
      runBtn.onclick = () => this.executeTests(level, testCases, { includeHidden: false });
    }

    if (resetBtn) {
      resetBtn.onclick = () => {
        this.activeEditor.setValue(starterCode);
        document.getElementById('test-results-deck').innerHTML =
          '<div class="test-standby-message">Code reset. RUN public tests again.</div>';
        submitBtn.disabled = true;
        submitBtn.style.display = 'inline-flex';
      };
    }

    if (expandBtn) {
      expandBtn.onclick = () => {
        const card = container.querySelector('.coding-mission-card');
        card.classList.toggle('editor-expanded');
        expandBtn.textContent = card.classList.contains('editor-expanded') ? 'SHOW GAME' : 'FULL EDITOR';
      };
    }

    container.querySelectorAll('.mission-tab').forEach((tab) => {
      tab.onclick = () => {
        container.querySelectorAll('.mission-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const name = tab.getAttribute('data-mission-tab');
        container.querySelector('.coding-mission-card').setAttribute('data-active-pane', name);
      };
    });

    if (submitBtn) {
      submitBtn.style.display = 'inline-flex';
      submitBtn.onclick = () => this.submitSolution(level, testCases);
    }

    // 3-Tier Hint Buttons
    const hintBox = document.getElementById('hint-display-box');
    [1, 2, 3].forEach(tier => {
      const btn = document.getElementById(`btn-hint-tier-${tier}`);
      if (btn) {
        btn.onclick = () => {
          document.querySelectorAll('.btn-hint-tier').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const hintText = window.Mastery 
            ? window.Mastery.getHint(level, tier) 
            : (level.hint || 'Check syntax rules.');

          if (hintBox) {
            hintBox.style.display = 'block';
            hintBox.innerHTML = `<strong>Tier ${tier} Intel:</strong> ${this.escapeHtml(hintText)}`;
          }
          if (window.Sound) window.Sound.playClick();
        };
      }
    });
  }

  async executeTests(level, publicCases, options = {}) {
    if (!this.activeEditor || !window.TestCaseRunner) return null;
    const includeHidden = !!options.includeHidden;
    const code = this.activeEditor.getValue();
    const entryFunction = level.entryFunction || 'solution';
    const hidden = (level.hiddenTests || []).map((tc) => ({ ...tc, hidden: true }));
    const suite = includeHidden ? publicCases.concat(hidden) : publicCases;
    const timeoutMs = level.timeLimit || 2000;

    const runBtn = document.getElementById('btn-run-tests');
    const submitBtn = document.getElementById('btn-submit-code');
    if (runBtn) runBtn.disabled = true;

    const outcome = await window.TestCaseRunner.runTests(code, suite, entryFunction, timeoutMs);
    this.activeTestOutcome = outcome;

    const deck = document.getElementById('test-results-deck');
    if (deck) deck.innerHTML = window.TestCaseRunner.renderResultsHTML(outcome);

    this.playSimulation(level, code, publicCases[0], outcome);

    if (runBtn) runBtn.disabled = false;

    if (outcome.allPassed) {
      if (submitBtn) submitBtn.disabled = false;
      if (window.Sound) window.Sound.playCoin();
      if (window.VisualFx) {
        window.VisualFx.toast(
          includeHidden ? 'PUBLIC + HIDDEN TESTS PASSED' : 'PUBLIC TESTS PASSED — SUBMIT to run hidden tests',
          '✓',
          'success'
        );
      }
      if (window.Game && outcome.allPassed && publicCases[0]) {
        window.Game.triggerOperativeAttack();
        window.Game.targetHp = 0;
        window.Game.updateStageHealthMeters();
      }
    } else {
      if (submitBtn) submitBtn.disabled = true;
      if (window.Sound) window.Sound.playError();
      if (window.VisualFx) window.VisualFx.shake();
      if (window.Game && includeHidden) window.Game.takeDamage();
    }

    return outcome;
  }

  playSimulation(level, code, firstCase, outcome) {
    const mount = document.getElementById('glitch-sim-mount');
    const logPanel = document.getElementById('game-log-panel');
    if (!mount || !window.GlitchHunterSim || !firstCase || !Array.isArray(firstCase.input)) return;

    const player = firstCase.input[0];
    const glitches = firstCase.input[1];
    let chosenId = null;
    const firstResult = outcome.results && outcome.results[0];
    if (firstResult && !firstResult.hidden && firstResult.actual !== null && firstResult.actual !== undefined) {
      chosenId = firstResult.actual;
    }

    const snap = window.GlitchHunterSim.run(player, glitches, chosenId);
    window.GlitchHunterSim.render(mount, snap);
    if (logPanel) {
      logPanel.innerHTML = snap.log.map((l) => `<div>${this.escapeHtml(l.message)}</div>`).join('');
    }
  }

  async submitSolution(level, testCases) {
    const outcome = await this.executeTests(level, testCases, { includeHidden: true });
    if (!outcome || !outcome.allPassed) {
      if (window.VisualFx) {
        window.VisualFx.toast('Submit rejected. A hidden test failed or public tests are incomplete.', '✕', 'danger');
      }
      return;
    }

    const conceptId = level.conceptId || 'functions';
    if (window.Mastery) window.Mastery.recordAction(conceptId, 'write', true);
    if (window.Sound) window.Sound.playSuccess();
    if (window.VisualFx) window.VisualFx.toast('MISSION VERIFIED', '⚡', 'success');

    if (window.Game) {
      window.Game.combo = Math.max(window.Game.combo, 1.5);
      window.Game.openExplanationDrawer();
    } else if (this.onComplete) {
      this.onComplete(true);
    }
  }

  // 2. Mini-Lesson with Runnable Live Example
  renderMiniLesson(container, level) {
    const lesson = level.miniLesson || {
      title: level.title,
      content: level.concept || 'Foundational concept walkthrough.',
      codeExample: level.code || 'console.log("HELLO GLITCH MATRIX");'
    };

    container.innerHTML = `
      <div class="mini-lesson-card">
        <div class="lesson-header">
          <span class="lesson-badge">🧠 CONCEPT MINI-LESSON</span>
          <h3>${this.escapeHtml(lesson.title)}</h3>
        </div>

        <div class="lesson-body-prose">
          ${this.escapeHtml(lesson.content)}
        </div>

        <div class="lesson-interactive-sandbox">
          <div class="sandbox-title">⚡ INTERACTIVE CODE RUNTIME (EXPERIMENT &amp; RUN):</div>
          <div id="lesson-editor-mount"></div>
          <button class="btn-cyber-primary" id="btn-lesson-run" style="margin-top: 0.75rem; width: 100%;">
            ▶ RUN LIVE EXPERIMENT
          </button>
          <div class="terminal-logs-window" id="lesson-output" style="margin-top: 0.75rem; min-height: 80px;">
            <div style="color: var(--text-muted);">// Output terminal ready. Click Run to evaluate.</div>
          </div>
        </div>

        <button class="btn-cyber-primary btn-lesson-continue" id="btn-lesson-continue" style="margin-top: 1.25rem; width: 100%;">
          I UNDERSTAND — ENTER CODING CHALLENGE ▶
        </button>
      </div>
    `;

    // Mount editor
    const mount = document.getElementById('lesson-editor-mount');
    const editor = new CyberCodeEditor({
      container: mount,
      language: level.worldId || 'javascript',
      value: lesson.codeExample,
      minHeight: '130px'
    });

    const runBtn = document.getElementById('btn-lesson-run');
    const outBox = document.getElementById('lesson-output');
    if (runBtn && outBox) {
      runBtn.onclick = () => {
        outBox.innerHTML = '';
        const customConsole = {
          log: (...args) => {
            const row = document.createElement('div');
            row.textContent = '> ' + args.join(' ');
            outBox.appendChild(row);
          },
          error: (err) => {
            const row = document.createElement('div');
            row.style.color = 'var(--accent-danger)';
            row.textContent = '❌ ' + err;
            outBox.appendChild(row);
          }
        };

        try {
          const fn = new Function('console', 'Math', editor.getValue());
          fn(customConsole, Math);
          if (window.Sound) window.Sound.playSuccess();
        } catch (e) {
          customConsole.error(e.message);
          if (window.Sound) window.Sound.playError();
        }
      };
    }

    const continueBtn = document.getElementById('btn-lesson-continue');
    if (continueBtn) {
      continueBtn.onclick = () => {
        // Shift level to practical activity
        level.mode = 'completion';
        this.renderChallenge(container, level, this.onComplete);
      };
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

window.Challenge = new ChallengeEngine();
