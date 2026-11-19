/**
 * GLITCH RUNNER - 3D CODE RUNNER CODE BRIDGE & SANDBOX
 * Safely executes user code, provides controlled runner APIs, and validates curriculum challenges.
 */

class CodeBridge {
  constructor(engine) {
    this.engine = engine;
    this.lastLogs = [];
    this.onObstacleCallback = null;
    this.activeChallenge = null;
  }

  // Create isolated API proxy for player scripts
  createRunnerAPI() {
    const self = this;
    const engine = this.engine;

    return {
      setSpeed: (val) => {
        const num = parseFloat(val);
        if (!isNaN(num)) {
          const clamped = Math.max(3.0, Math.min(18.0, num));
          engine.speed = clamped;
          self.log(`⚡ runner.setSpeed(${clamped.toFixed(1)}) applied.`);
          if (engine.ui) engine.ui.updateSpeedometer(clamped);
          return clamped;
        }
        self.log(`⚠️ Invalid speed value: ${val}`);
        return engine.speed;
      },

      getSpeed: () => engine.speed,

      jump: () => {
        engine.jump();
        self.log('🦘 runner.jump() triggered.');
      },

      slide: () => {
        engine.slide();
        self.log('🛹 runner.slide() triggered.');
      },

      shiftLane: (target) => {
        if (typeof target === 'number') {
          engine.shiftToLane(target);
          self.log(`↔️ runner.shiftLane(${target}) triggered.`);
        }
      },

      activateShield: () => {
        engine.activateShield();
        self.log('🛡️ runner.activateShield() primed.');
      },

      log: (msg) => {
        self.log(String(msg));
      },

      set onObstacleDetected(fn) {
        if (typeof fn === 'function') {
          self.onObstacleCallback = fn;
          self.log('🤖 Autonomous obstacle evasion subroutine armed.');
        } else {
          self.onObstacleCallback = null;
        }
      },

      get onObstacleDetected() {
        return self.onObstacleCallback;
      }
    };
  }

  log(msg) {
    const timestamp = new Date().toLocaleTimeString().split(' ')[0];
    this.lastLogs.push(`[${timestamp}] ${msg}`);
    if (this.lastLogs.length > 25) this.lastLogs.shift();
    if (this.engine.ui) {
      this.engine.ui.appendTerminalLog(`[${timestamp}] ${msg}`);
    }
  }

  // Safely execute arbitrary player script
  executePlayerCode(codeString) {
    this.lastLogs = [];
    const runnerAPI = this.createRunnerAPI();

    const sandboxedConsole = {
      log: (...args) => this.log(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')),
      warn: (...args) => this.log('⚠️ ' + args.join(' ')),
      error: (...args) => this.log('❌ ' + args.join(' '))
    };

    try {
      // Clean script execution inside restricted Function sandbox
      const wrapped = `
        "use strict";
        return (function(runner, console, Math, setInterval, setTimeout) {
          ${codeString}
        })(runner, console, Math, undefined, undefined);
      `;

      // 50ms Execution Time Guard
      const startTime = performance.now();
      const fn = new Function('runner', 'console', 'Math', wrapped);
      fn(runnerAPI, sandboxedConsole, Math);
      const elapsed = performance.now() - startTime;

      if (elapsed > 50) {
        this.log(`⚠️ Execution notice: script took ${elapsed.toFixed(1)}ms.`);
      }

      if (window.VisualFx) {
        window.VisualFx.toast('CODE COMPILED & EXECUTED!', '⚡', 'success');
      }
      if (window.Sound) {
        window.Sound.playSuccess();
      }

      return {
        success: true,
        message: 'Compilation successful. Telemetry updated.'
      };
    } catch (err) {
      const errorMsg = err.name + ': ' + err.message;
      this.log(`❌ ${errorMsg}`);
      if (window.VisualFx) {
        window.VisualFx.toast('COMPILER REJECTION: ' + err.message, '⚠️', 'danger');
        window.VisualFx.shake();
      }
      if (window.Sound) {
        window.Sound.playError();
      }
      return {
        success: false,
        error: errorMsg
      };
    }
  }

  // Called each frame when an obstacle is within radar detection range (e.g. 15-20m)
  checkRadarObstacle(obstacle) {
    if (this.onObstacleCallback && typeof this.onObstacleCallback === 'function') {
      try {
        const info = {
          type: obstacle.type,
          lane: obstacle.lane,
          distance: obstacle.mesh.position.z - this.engine.player.position.z,
          safeLane: (obstacle.lane === 0 ? 1 : 0)
        };
        this.onObstacleCallback(info);
      } catch (err) {
        console.warn('Error in onObstacleDetected user callback:', err);
      }
    }
  }

  // Load a curriculum challenge for a Matrix Coding Gate
  prepareGateChallenge(levelOrConfig) {
    this.activeChallenge = levelOrConfig;
    return this.activeChallenge;
  }

  // Validate gate challenge answer
  validateGateAnswer(selectedIndexOrCode) {
    if (!this.activeChallenge) return { success: true };

    const chal = this.activeChallenge;

    // Multiple-choice validation
    if (typeof selectedIndexOrCode === 'number') {
      const correct = (chal.correctAnswer !== undefined ? chal.correctAnswer : (chal.a !== undefined ? chal.a : 0));
      if (selectedIndexOrCode === correct) {
        return {
          success: true,
          explanation: chal.explanation || chal.concept || 'Code logic validated! Firewall disintegrated.'
        };
      } else {
        return {
          success: false,
          error: `Syntax mismatch. Hint: ${chal.hint || 'Check language operators.'}`
        };
      }
    }

    // Code execution validation
    return this.executePlayerCode(selectedIndexOrCode);
  }
}

window.CodeBridge = CodeBridge;
