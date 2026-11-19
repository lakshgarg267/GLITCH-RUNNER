const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- 3D CODE RUNNER INTEGRATION TEST ---');

let failures = 0;

// 1. Check Three.js file
const threePath = path.join(__dirname, '..', 'js', 'lib', 'three.min.js');
if (fs.existsSync(threePath)) {
  const stat = fs.statSync(threePath);
  console.log(`✓ three.min.js exists (${(stat.size / 1024).toFixed(1)} KB)`);
} else {
  console.error('FAIL: three.min.js missing');
  failures++;
}

// 2. Check 3D runner files
const runnerFiles = [
  'runnerControls.js',
  'codeBridge.js',
  'runnerUI.js',
  'runnerEngine.js'
];

runnerFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', 'js', 'runner3d', file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ js/runner3d/${file} exists`);
  } else {
    console.error(`FAIL: js/runner3d/${file} missing`);
    failures++;
  }
});

// 3. Test Sandbox Code Execution in CodeBridge
console.log('\n--- TESTING CODE BRIDGE SANDBOX ---');
const context = {
  window: {},
  document: {},
  performance: { now: () => Date.now() },
  console: console
};
vm.createContext(context);

// Load codeBridge.js in context
const codeBridgeContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'runner3d', 'codeBridge.js'), 'utf8');
vm.runInContext(codeBridgeContent, context);

if (context.window.CodeBridge) {
  console.log('✓ CodeBridge class exported to window');

  // Mock engine
  const mockEngine = {
    speed: 8.0,
    jumpCount: 0,
    slideCount: 0,
    shieldActive: false,
    lane: 1,
    jump: function() { this.jumpCount++; },
    slide: function() { this.slideCount++; },
    shiftToLane: function(l) { this.lane = l; },
    activateShield: function() { this.shieldActive = true; },
    player: { position: { z: 50 } },
    ui: { appendTerminalLog: () => {}, updateSpeedometer: () => {} }
  };

  const bridge = new context.window.CodeBridge(mockEngine);

  // Test speed modification
  const res1 = bridge.executePlayerCode('runner.setSpeed(12.5);');
  if (res1.success && mockEngine.speed === 12.5) {
    console.log('✓ Player code speed modification succeeded (speed = 12.5)');
  } else {
    console.error('FAIL: Player code speed modification failed', res1);
    failures++;
  }

  // Test shield activation
  const res2 = bridge.executePlayerCode('runner.activateShield();');
  if (res2.success && mockEngine.shieldActive === true) {
    console.log('✓ Player code shield activation succeeded');
  } else {
    console.error('FAIL: Player code shield activation failed', res2);
    failures++;
  }

  // Test onObstacleDetected callback
  const res3 = bridge.executePlayerCode(`
    runner.onObstacleDetected = function(obstacle) {
      if (obstacle.type === "FIREWALL") {
        runner.jump();
      } else if (obstacle.type === "HIGH_LASER") {
        runner.slide();
      }
    };
  `);
  if (res3.success && typeof bridge.onObstacleCallback === 'function') {
    console.log('✓ Autonomous obstacle evasion subroutine bound');

    // Simulate radar detection of firewall
    bridge.checkRadarObstacle({
      type: 'FIREWALL',
      lane: 1,
      mesh: { position: { z: 62 } }
    });

    if (mockEngine.jumpCount === 1) {
      console.log('✓ Autonomous jump reaction triggered by simulated firewall');
    } else {
      console.error('FAIL: Autonomous jump reaction was not triggered');
      failures++;
    }

    // Simulate radar detection of laser
    bridge.checkRadarObstacle({
      type: 'HIGH_LASER',
      lane: 1,
      mesh: { position: { z: 65 } }
    });

    if (mockEngine.slideCount === 1) {
      console.log('✓ Autonomous slide reaction triggered by simulated laser');
    } else {
      console.error('FAIL: Autonomous slide reaction was not triggered');
      failures++;
    }
  } else {
    console.error('FAIL: Failed to bind obstacle callback', res3);
    failures++;
  }

  // Test error handling in sandbox
  const errRes = bridge.executePlayerCode('this_is_invalid_syntax = ;');
  if (!errRes.success && errRes.error) {
    console.log('✓ Syntax errors caught cleanly without breaking runtime');
  } else {
    console.error('FAIL: Syntax error was not caught properly');
    failures++;
  }
} else {
  console.error('FAIL: CodeBridge not exported');
  failures++;
}

// 4. Verify index.html contains all 3D components and elements
console.log('\n--- VERIFYING INDEX.HTML INTEGRATION ---');
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const requiredTokens = [
  'id="nav-tab-runner3d"',
  'id="view-runner3d"',
  'id="runner3d-hud"',
  'id="hud-runner-speed"',
  'id="hud-runner-distance"',
  'id="hud-runner-coins"',
  'id="runner3d-viewport"',
  'id="runner3d-touch-controls"',
  'id="touch-btn-left"',
  'id="touch-btn-right"',
  'id="touch-btn-jump"',
  'id="touch-btn-slide"',
  'id="touch-btn-code"',
  'id="runner-code-drawer"',
  'id="runner-code-editor"',
  'id="btn-runner-run-code"',
  'id="gate-challenge-prompt"',
  'id="modal-runner-pause"',
  'js/lib/three.min.js',
  'js/runner3d/runnerControls.js',
  'js/runner3d/codeBridge.js',
  'js/runner3d/runnerUI.js',
  'js/runner3d/runnerEngine.js'
];

requiredTokens.forEach(token => {
  if (htmlContent.includes(token)) {
    console.log(`✓ index.html includes ${token}`);
  } else {
    console.error(`FAIL: index.html missing ${token}`);
    failures++;
  }
});

console.log('\n=============================================');
if (failures === 0) {
  console.log('🎉 ALL 3D CODE RUNNER INTEGRATION TESTS PASSED!');
} else {
  console.error(`❌ TEST FAILED WITH ${failures} ERRORS.`);
  process.exit(1);
}
