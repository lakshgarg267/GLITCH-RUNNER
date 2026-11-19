/**
 * GLITCH RUNNER - 3D CODE RUNNER ENGINE
 * Real, playable 3D endless/distance third-person runner built on Three.js & WebGL.
 * Features 3-lane physics, procedural character rig, dynamic cyber obstacles,
 * Matrix bullet-time coding gates, and direct code-to-gameplay integration.
 */

class CodeRunner3DEngine {
  constructor() {
    this.container = null;
    this.canvas = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    // Subsystems
    this.controls = new RunnerControls(this);
    this.codeBridge = new CodeBridge(this);
    this.ui = new RunnerUI(this);

    // Gameplay Attributes
    this.laneWidth = 2.5;
    this.lanes = [-this.laneWidth, 0, this.laneWidth]; // Left (-2.5), Center (0), Right (+2.5)
    this.currentLane = 1; // 0: Left, 1: Center, 2: Right
    this.targetX = 0;
    this.groundY = 0.8;
    this.speed = 8.0; // Units per second
    this.baseSpeed = 8.0;
    this.distance = 0;
    this.targetDistance = 500; // Finish line distance for levels (or Infinity for endless)
    this.coinsCollected = 0;
    this.combo = 1.0;
    this.lives = 3;
    this.shieldActive = false;
    this.isJumping = false;
    this.jumpProgress = 0;
    this.jumpDuration = 0.65; // Seconds
    this.jumpHeight = 2.4;
    this.isSliding = false;
    this.slideProgress = 0;
    this.slideDuration = 0.6; // Seconds
    this.isInvulnerable = false;
    this.invulnerableTimer = 0;

    // Time & Loop
    this.isRunning = false;
    this.isPaused = false;
    this.isBulletTime = false;
    this.bulletTimeScale = 1.0;
    this.targetBulletTimeScale = 1.0;
    this.lastTime = 0;
    this.animationId = null;
    this.startTime = 0;

    // Level & Curriculum Info
    this.currentLevel = null;
    this.worldConfig = null;
    this.themeColor = '#00ffaa';

    // 3D Objects & Pools
    this.player = null;
    this.playerRig = {};
    this.shieldMesh = null;
    this.trackChunks = [];
    this.obstacles = [];
    this.coins = [];
    this.gateObject = null;
    this.nextGateDistance = 200;
    this.chunkLength = 40;
    this.activeChunkCount = 7;
    this.nextChunkZ = 0;

    this.onResize = this.handleResize.bind(this);
  }

  init(containerElement) {
    if (this.renderer) return; // Already initialized

    this.container = containerElement || document.getElementById('runner3d-viewport');
    if (!this.container) {
      console.error('3D Viewport container element not found.');
      return;
    }

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || (window.innerHeight - 80);

    // 1. Scene & Atmosphere
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x080c10, 0.015);

    // 2. Camera (Third-person chase)
    this.camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 400);
    this.camera.position.set(0, 4.2, -6.5);
    this.camera.lookAt(0, 1.6, 8.0);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.canvas = this.renderer.domElement;
    this.canvas.id = 'runner3d-canvas';
    this.container.appendChild(this.canvas);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    this.dirLight.position.set(10, 25, -15);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 1024;
    this.dirLight.shadow.mapSize.height = 1024;
    this.scene.add(this.dirLight);

    // 5. Build Procedural Player Mesh
    this.buildPlayer();

    // 6. Attach Controls & UI
    this.controls.attach(this.canvas);
    this.ui.init();

    window.addEventListener('resize', this.onResize);
  }

  // Build Cyberpunk Operative 3D Mesh
  buildPlayer() {
    this.player = new THREE.Group();
    this.player.position.set(0, this.groundY, 0);

    // Theme-based accent color
    const primaryMat = new THREE.MeshStandardMaterial({
      color: 0x112233,
      roughness: 0.3,
      metalness: 0.8
    });

    const glowMat = new THREE.MeshStandardMaterial({
      color: 0x00ffaa,
      emissive: 0x00ffaa,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    this.playerGlowMat = glowMat;

    // Torso
    const torsoGeo = new THREE.BoxGeometry(0.7, 0.9, 0.45);
    const torso = new THREE.Mesh(torsoGeo, primaryMat);
    torso.position.y = 0.85;
    torso.castShadow = true;
    this.player.add(torso);
    this.playerRig.torso = torso;

    // Jetpack / Core Battery
    const packGeo = new THREE.BoxGeometry(0.45, 0.6, 0.2);
    const pack = new THREE.Mesh(packGeo, glowMat);
    pack.position.set(0, 0.85, -0.28);
    this.player.add(pack);

    // Head with cyber visor
    const headGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const head = new THREE.Mesh(headGeo, primaryMat);
    head.position.y = 1.5;
    head.castShadow = true;
    this.player.add(head);

    const visorGeo = new THREE.BoxGeometry(0.42, 0.14, 0.2);
    const visor = new THREE.Mesh(visorGeo, glowMat);
    visor.position.set(0, 1.52, 0.15);
    this.player.add(visor);

    // Left Arm
    const armGeo = new THREE.BoxGeometry(0.2, 0.65, 0.2);
    const leftArm = new THREE.Mesh(armGeo, primaryMat);
    leftArm.position.set(-0.48, 0.8, 0);
    this.player.add(leftArm);
    this.playerRig.leftArm = leftArm;

    // Right Arm
    const rightArm = new THREE.Mesh(armGeo, primaryMat);
    rightArm.position.set(0.48, 0.8, 0);
    this.player.add(rightArm);
    this.playerRig.rightArm = rightArm;

    // Left Leg
    const legGeo = new THREE.BoxGeometry(0.24, 0.8, 0.24);
    const leftLeg = new THREE.Mesh(legGeo, primaryMat);
    leftLeg.position.set(-0.22, 0.4, 0);
    leftLeg.castShadow = true;
    this.player.add(leftLeg);
    this.playerRig.leftLeg = leftLeg;

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeo, primaryMat);
    rightLeg.position.set(0.22, 0.4, 0);
    rightLeg.castShadow = true;
    this.player.add(rightLeg);
    this.playerRig.rightLeg = rightLeg;

    // Energy Shield Barrier (Pulsing Wireframe Sphere)
    const shieldGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    this.shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    this.shieldMesh.position.y = 0.9;
    this.shieldMesh.visible = false;
    this.player.add(this.shieldMesh);

    this.scene.add(this.player);
  }

  // Start / Launch a Game Level or Free Sprint
  start(levelIdOrWorld = 'javascript', targetDistance = 500) {
    if (!this.renderer) this.init();

    // Reset game state
    this.distance = 0;
    this.coinsCollected = 0;
    this.combo = 1.0;
    this.lives = 3;
    this.shieldActive = false;
    this.shieldMesh.visible = false;
    this.currentLane = 1;
    this.targetX = this.lanes[1];
    this.player.position.set(this.targetX, this.groundY, 0);
    this.isJumping = false;
    this.isSliding = false;
    this.isBulletTime = false;
    this.bulletTimeScale = 1.0;
    this.targetBulletTimeScale = 1.0;
    this.nextGateDistance = 160;
    this.isInvulnerable = false;
    this.startTime = Date.now();

    // Check level or world data
    let worldId = 'javascript';
    if (typeof levelIdOrWorld === 'string') {
      const foundLvl = window.LEVELS_DATA ? window.LEVELS_DATA.find(l => l.id === levelIdOrWorld) : null;
      if (foundLvl) {
        this.currentLevel = foundLvl;
        worldId = foundLvl.worldId;
        this.targetDistance = foundLvl.timeLimitSeconds ? (foundLvl.timeLimitSeconds * 12) : targetDistance;
      } else {
        worldId = levelIdOrWorld;
        this.targetDistance = targetDistance;
      }
    }
    this.worldConfig = window.WORLDS_CONFIG ? window.WORLDS_CONFIG.find(w => w.id === worldId) : null;
    this.applyWorldTheming(worldId);

    // Set base speed
    this.baseSpeed = 9.0;
    this.speed = this.baseSpeed;

    // Reset 3D tracks, obstacles, and coins
    this.clearTrack();
    this.initTrack();

    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();

    if (this.ui) {
      this.ui.updateHUD();
      this.ui.closeCodeDrawer();
    }

    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.animate(this.lastTime);

    if (window.VisualFx) {
      const worldName = this.worldConfig ? this.worldConfig.name : 'CODE MATRIX';
      window.VisualFx.toast(`LAUNCHING 3D RUNNER // ${worldName.toUpperCase()}`, '🏃', 'info');
    }
  }

  applyWorldTheming(worldId) {
    const themeColors = {
      javascript: 0xffe600,
      python: 0x00ffaa,
      c: 0x00e5ff,
      java: 0xff9900,
      html: 0xff4422,
      cpp: 0x3388ff,
      csharp: 0x9933ff,
      go: 0x00d4ff,
      ruby: 0xff0055,
      swift: 0xff6633
    };

    const colorHex = themeColors[worldId] || 0x00ffaa;
    this.themeColor = colorHex;
    if (this.playerGlowMat) {
      this.playerGlowMat.color.setHex(colorHex);
      this.playerGlowMat.emissive.setHex(colorHex);
    }
    if (this.scene) {
      this.scene.fog.color.setHex(0x060a10);
    }
  }

  clearTrack() {
    // Remove track chunks
    this.trackChunks.forEach(c => this.scene.remove(c));
    this.trackChunks = [];

    // Remove obstacles
    this.obstacles.forEach(o => this.scene.remove(o.mesh));
    this.obstacles = [];

    // Remove coins
    this.coins.forEach(c => this.scene.remove(c.mesh));
    this.coins = [];

    // Remove gate
    if (this.gateObject) {
      this.scene.remove(this.gateObject);
      this.gateObject = null;
    }

    this.nextChunkZ = -this.chunkLength;
  }

  initTrack() {
    for (let i = 0; i < this.activeChunkCount; i++) {
      this.spawnTrackChunk();
    }
  }

  // Create a modular cyberpunk track chunk
  spawnTrackChunk() {
    const chunkZ = this.nextChunkZ;
    const chunkGroup = new THREE.Group();
    chunkGroup.position.z = chunkZ;

    const trackWidth = this.laneWidth * 3 + 1.2;
    const roadGeo = new THREE.BoxGeometry(trackWidth, 0.4, this.chunkLength);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x091018,
      roughness: 0.8,
      metalness: 0.3
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.position.y = -0.2;
    roadMesh.receiveShadow = true;
    chunkGroup.add(roadMesh);

    // Glowing Neon Lane Dividers
    const lineMat = new THREE.MeshBasicMaterial({
      color: this.themeColor,
      transparent: true,
      opacity: 0.7
    });

    const dividerGeo = new THREE.BoxGeometry(0.12, 0.05, this.chunkLength);
    const dividerLeft = new THREE.Mesh(dividerGeo, lineMat);
    dividerLeft.position.set(-this.laneWidth / 2, 0.02, 0);
    chunkGroup.add(dividerLeft);

    const dividerRight = new THREE.Mesh(dividerGeo, lineMat);
    dividerRight.position.set(this.laneWidth / 2, 0.02, 0);
    chunkGroup.add(dividerRight);

    // Outer Guard Rails
    const railMat = new THREE.MeshStandardMaterial({
      color: 0x1a2936,
      emissive: this.themeColor,
      emissiveIntensity: 0.25
    });
    const railGeo = new THREE.BoxGeometry(0.3, 0.5, this.chunkLength);

    const railLeft = new THREE.Mesh(railGeo, railMat);
    railLeft.position.set(-trackWidth / 2 + 0.15, 0.2, 0);
    chunkGroup.add(railLeft);

    const railRight = new THREE.Mesh(railGeo, railMat);
    railRight.position.set(trackWidth / 2 - 0.15, 0.2, 0);
    chunkGroup.add(railRight);

    this.scene.add(chunkGroup);
    this.trackChunks.push(chunkGroup);

    // Spawn obstacles and collectibles on this chunk (except initial starting runway)
    if (chunkZ > 40) {
      this.populateChunkDecorations(chunkZ);
    }

    this.nextChunkZ += this.chunkLength;
  }

  populateChunkDecorations(chunkZ) {
    const slots = [chunkZ - 12, chunkZ + 2, chunkZ + 14];

    slots.forEach(zPos => {
      // 60% chance for obstacle or collectible pattern
      const rand = Math.random();

      if (rand < 0.45) {
        // Spawn Obstacle
        const laneIdx = Math.floor(Math.random() * 3);
        const laneX = this.lanes[laneIdx];
        const typeRand = Math.random();

        if (typeRand < 0.45) {
          this.spawnFirewallObstacle(laneX, zPos, laneIdx);
        } else if (typeRand < 0.75) {
          this.spawnLaserObstacle(laneX, zPos, laneIdx);
        } else {
          this.spawnBugNodeObstacle(laneX, zPos, laneIdx);
        }
      } else if (rand < 0.85) {
        // Spawn Collectible Data Bit trail (3 coins in a row)
        const laneIdx = Math.floor(Math.random() * 3);
        const laneX = this.lanes[laneIdx];
        for (let i = 0; i < 3; i++) {
          this.spawnDataCoin(laneX, zPos + (i * 2.8));
        }
      }
    });

    // Check if we should spawn a Matrix Coding Gate
    if (chunkZ >= this.nextGateDistance && !this.gateObject) {
      this.spawnMatrixCodingGate(chunkZ);
      this.nextGateDistance += 220;
    }
  }

  // 1. Red Firewall Barrier Obstacle (Jump over or shift lane)
  spawnFirewallObstacle(x, z, laneIdx) {
    const geo = new THREE.BoxGeometry(2.1, 1.4, 0.4);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff0055,
      emissive: 0xff0055,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.85
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, 0.7, z);
    mesh.castShadow = true;
    this.scene.add(mesh);

    this.obstacles.push({
      type: 'FIREWALL',
      mesh,
      lane: laneIdx,
      width: 2.0,
      height: 1.4,
      depth: 0.5,
      cleared: false
    });
  }

  // 2. High Laser Beam Obstacle (Must slide underneath!)
  spawnLaserObstacle(x, z, laneIdx) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Two side posts
    const postGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.5);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x334455 });
    const postL = new THREE.Mesh(postGeo, postMat);
    postL.position.set(-1.1, 1.25, 0);
    group.add(postL);

    const postR = new THREE.Mesh(postGeo, postMat);
    postR.position.set(1.1, 1.25, 0);
    group.add(postR);

    // High beam
    const beamGeo = new THREE.CylinderGeometry(0.09, 0.09, 2.2);
    beamGeo.rotateZ(Math.PI / 2);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(0, 1.5, 0); // At head height
    group.add(beam);

    this.scene.add(group);

    this.obstacles.push({
      type: 'HIGH_LASER',
      mesh: group,
      lane: laneIdx,
      width: 2.2,
      height: 2.5,
      depth: 0.5,
      isHigh: true, // slide evades this
      cleared: false
    });
  }

  // 3. Corrupted Glitch Node (Spiky spiky bug)
  spawnBugNodeObstacle(x, z, laneIdx) {
    const geo = new THREE.DodecahedronGeometry(0.75, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff3300,
      emissive: 0xff5500,
      emissiveIntensity: 0.8,
      roughness: 0.3
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, 0.8, z);
    mesh.castShadow = true;
    this.scene.add(mesh);

    this.obstacles.push({
      type: 'BUG_NODE',
      mesh,
      lane: laneIdx,
      width: 1.5,
      height: 1.5,
      depth: 1.5,
      cleared: false
    });
  }

  // Gold Data Coin Pickups
  spawnDataCoin(x, z) {
    const geo = new THREE.CylinderGeometry(0.42, 0.42, 0.12, 16);
    geo.rotateX(Math.PI / 2);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffcc00,
      emissive: 0xffaa00,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.2
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, 0.9, z);
    this.scene.add(mesh);

    this.coins.push({
      mesh,
      collected: false,
      rotSpeed: 2.5 + Math.random()
    });
  }

  // Matrix Bullet-Time Coding Gate across all 3 lanes
  spawnMatrixCodingGate(z) {
    const gateGroup = new THREE.Group();
    gateGroup.position.set(0, 0, z);

    // Giant Hexagonal Arch
    const archGeo = new THREE.TorusGeometry(5.2, 0.35, 8, 24, Math.PI);
    const archMat = new THREE.MeshStandardMaterial({
      color: 0x112233,
      emissive: this.themeColor,
      emissiveIntensity: 0.8
    });
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.y = 0.5;
    gateGroup.add(arch);

    // Translucent Energy Barrier Field
    const fieldGeo = new THREE.PlaneGeometry(this.laneWidth * 3 + 1, 5.0);
    const fieldMat = new THREE.MeshBasicMaterial({
      color: this.themeColor,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    });
    const field = new THREE.Mesh(fieldGeo, fieldMat);
    field.position.y = 2.5;
    gateGroup.add(field);

    this.scene.add(gateGroup);
    this.gateObject = {
      mesh: gateGroup,
      zPos: z,
      field,
      triggered: false
    };
  }

  // Lane Changing: -1 (Left), 1 (Right)
  shiftLane(direction) {
    const nextLane = this.currentLane + direction;
    if (nextLane >= 0 && nextLane < this.lanes.length) {
      this.currentLane = nextLane;
      this.targetX = this.lanes[this.currentLane];
      if (window.Sound) window.Sound.playClick();
    }
  }

  shiftToLane(targetIndex) {
    if (targetIndex >= 0 && targetIndex < this.lanes.length) {
      this.currentLane = targetIndex;
      this.targetX = this.lanes[this.currentLane];
    }
  }

  // Jump Action
  jump() {
    if (this.isJumping) return;
    this.isJumping = true;
    this.jumpProgress = 0;
    if (window.Sound) {
      if (window.Sound.playJump) window.Sound.playJump();
      else window.Sound.playClick();
    }
  }

  // Slide Action
  slide() {
    if (this.isSliding) return;
    this.isSliding = true;
    this.slideProgress = 0;
    if (window.Sound) {
      if (window.Sound.playSlide) window.Sound.playSlide();
      else window.Sound.playClick();
    }
  }

  // Prime Energy Shield
  activateShield() {
    this.shieldActive = true;
    if (this.shieldMesh) this.shieldMesh.visible = true;
    if (this.ui) this.ui.updateHUD();
    if (window.Sound) window.Sound.playShield();
  }

  // Trigger Matrix Bullet-Time
  triggerBulletTime() {
    this.isBulletTime = true;
    this.targetBulletTimeScale = 0.08; // Slow down to 8% speed
  }

  // Turbo Boost after solving gate
  triggerTurboBoost() {
    this.isBulletTime = false;
    this.targetBulletTimeScale = 1.0;
    this.speed = this.baseSpeed * 1.6;

    // Disintegrate Gate Barrier
    if (this.gateObject) {
      this.scene.remove(this.gateObject.mesh);
      this.gateObject = null;
    }

    // Dynamic FOV turbo expansion
    if (this.camera) {
      this.camera.fov = 78;
      this.camera.updateProjectionMatrix();
    }

    setTimeout(() => {
      this.speed = this.baseSpeed;
      if (this.camera) {
        this.camera.fov = 65;
        this.camera.updateProjectionMatrix();
      }
    }, 2500);

    this.combo = Math.min(3.0, this.combo + 0.5);
    if (this.ui) this.ui.updateHUD();
  }

  resumeFromGate() {
    this.isBulletTime = false;
    this.targetBulletTimeScale = 1.0;
    if (this.ui) this.ui.closeCodeDrawer();
  }

  takeDamage() {
    if (this.isInvulnerable) return;

    if (this.shieldActive) {
      this.shieldActive = false;
      if (this.shieldMesh) this.shieldMesh.visible = false;
      this.isInvulnerable = true;
      this.invulnerableTimer = 1.0;
      if (this.ui) this.ui.updateHUD();
      if (window.VisualFx) {
        window.VisualFx.toast('SHIELD DEFLECTED CORRUPTION!', '🛡️', 'info');
      }
      if (window.Sound) window.Sound.playShield();
      return;
    }

    this.lives--;
    this.combo = 1.0;
    this.isInvulnerable = true;
    this.invulnerableTimer = 1.5;

    if (this.ui) this.ui.updateHUD();
    if (window.VisualFx) {
      window.VisualFx.glitchFlash();
      window.VisualFx.shake();
    }
    if (window.Sound) window.Sound.playError();

    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.isRunning = false;
    if (this.ui) {
      this.ui.showGameOver({
        distance: this.distance,
        coins: this.coinsCollected
      });
    }
  }

  finishLevel() {
    this.isRunning = false;
    const duration = Math.round((Date.now() - this.startTime) / 1000);

    let stars = 1;
    if (this.lives === 3) stars = 3;
    else if (this.lives === 2) stars = 2;

    const baseScore = 600 * stars;
    const totalScore = Math.round((baseScore + this.distance * 2 + this.coinsCollected * 10) * this.combo);
    const xpEarned = Math.round(180 * this.combo);
    const coinsEarned = Math.round((this.coinsCollected + (stars === 3 ? 35 : 15)) * this.combo);

    // Save in GameState
    if (window.GameState) {
      const worldId = this.worldConfig ? this.worldConfig.id : 'javascript';
      const levelId = this.currentLevel ? this.currentLevel.id : `${worldId}_runner_3d`;
      window.GameState.recordLevelCompletion(worldId, levelId, stars, totalScore);
      window.GameState.addXp(xpEarned);
      window.GameState.addCoins(coinsEarned);
      window.GameState.data.achievements.progress.timedCompleted++;
      if (stars === 3) window.GameState.data.achievements.progress.perfectRuns++;
      window.GameState.save();
    }

    if (this.ui) {
      this.ui.showVictory({
        stars,
        xp: xpEarned,
        coins: coinsEarned,
        duration,
        score: totalScore
      });
    }

    if (window.Sound) window.Sound.playLevelUp();
    if (window.VisualFx) window.VisualFx.toast('3D SECTOR CLEARED! MISSION ACCOMPLISHED!', '🏆', 'success');
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.ui) this.ui.showPauseModal(this.isPaused);
  }

  restart() {
    this.start(this.currentLevel ? this.currentLevel.id : (this.worldConfig ? this.worldConfig.id : 'javascript'), this.targetDistance);
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  // Core Render & Physics Loop
  animate(currentTime) {
    if (!this.isRunning) return;

    this.animationId = requestAnimationFrame((t) => this.animate(t));

    if (this.isPaused) {
      this.lastTime = currentTime;
      return;
    }

    const rawDelta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    const delta = Math.min(rawDelta, 0.1); // Guard against giant lag spikes

    // Lerp Bullet Time Scale
    this.bulletTimeScale += (this.targetBulletTimeScale - this.bulletTimeScale) * 0.15;
    const effectiveDelta = delta * this.bulletTimeScale;

    // 1. Move Player Forward
    const forwardStep = this.speed * effectiveDelta;
    this.player.position.z += forwardStep;
    this.distance += forwardStep;

    // 2. Smooth Lane Interpolation (Lerp X)
    this.player.position.x += (this.targetX - this.player.position.x) * 0.18;

    // 3. Jump Physics Arc
    if (this.isJumping) {
      this.jumpProgress += effectiveDelta / this.jumpDuration;
      if (this.jumpProgress >= 1.0) {
        this.isJumping = false;
        this.jumpProgress = 0;
        this.player.position.y = this.groundY;
      } else {
        this.player.position.y = this.groundY + Math.sin(this.jumpProgress * Math.PI) * this.jumpHeight;
      }
    } else if (!this.isSliding) {
      this.player.position.y = this.groundY;
    }

    // 4. Slide Physics
    if (this.isSliding) {
      this.slideProgress += effectiveDelta / this.slideDuration;
      if (this.slideProgress >= 1.0) {
        this.isSliding = false;
        this.slideProgress = 0;
        this.playerRig.torso.rotation.x = 0;
        this.player.scale.set(1, 1, 1);
      } else {
        // Compress scale and tilt torso
        this.player.scale.set(1, 0.5, 1.2);
        this.playerRig.torso.rotation.x = Math.PI / 4;
      }
    } else {
      this.player.scale.set(1, 1, 1);
    }

    // 5. Procedural Character Stride Animation
    if (!this.isJumping && !this.isSliding) {
      const strideFreq = this.speed * 1.4;
      const timeSec = currentTime / 1000;
      const legAngle = Math.sin(timeSec * strideFreq) * 0.65;
      this.playerRig.leftLeg.rotation.x = legAngle;
      this.playerRig.rightLeg.rotation.x = -legAngle;
      this.playerRig.leftArm.rotation.x = -legAngle;
      this.playerRig.rightArm.rotation.x = legAngle;
    }

    // 6. Camera Follow with Dynamic Lerp
    this.camera.position.x += (this.player.position.x * 0.65 - this.camera.position.x) * 0.12;
    this.camera.position.z = this.player.position.z - 7.0;
    this.camera.position.y = 4.2 + (this.isJumping ? this.player.position.y * 0.35 : 0);
    this.camera.lookAt(this.player.position.x * 0.3, 1.8, this.player.position.z + 9.0);

    // Update Directional Light Position to follow player
    this.dirLight.position.z = this.player.position.z - 10;
    this.dirLight.target = this.player;

    // 7. Track Recycling & Chunk Management
    const firstChunk = this.trackChunks[0];
    if (firstChunk && (this.player.position.z - firstChunk.position.z > this.chunkLength * 1.5)) {
      this.scene.remove(firstChunk);
      this.trackChunks.shift();
      this.spawnTrackChunk();
    }

    // 8. Obstacles Radar, Evade Callbacks & Collisions
    this.updateObstacles(effectiveDelta);

    // 9. Collectible Coins Bobbing & Pickup
    this.updateCoins(effectiveDelta);

    // 10. Matrix Coding Gate Interaction
    this.checkMatrixGate();

    // 11. Invulnerability timer flashing
    if (this.isInvulnerable) {
      this.invulnerableTimer -= delta;
      this.player.visible = (Math.floor(currentTime / 80) % 2 === 0);
      if (this.invulnerableTimer <= 0) {
        this.isInvulnerable = false;
        this.player.visible = true;
      }
    }

    // 12. Check Finish Line for Level
    if (this.targetDistance !== Infinity && this.distance >= this.targetDistance) {
      this.finishLevel();
      return;
    }

    // 13. Update HUD
    if (this.ui) this.ui.updateHUD();

    // 14. Render Frame
    this.renderer.render(this.scene, this.camera);
  }

  updateObstacles(delta) {
    const playerZ = this.player.position.z;
    const playerX = this.player.position.x;
    const playerY = this.player.position.y;

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      const obsZ = obs.mesh.position.z;

      // Radar proximity trigger for user's onObstacleDetected callback
      const distToObstacle = obsZ - playerZ;
      if (distToObstacle > 0 && distToObstacle < 18.0 && !obs.scanned) {
        obs.scanned = true;
        if (this.codeBridge) {
          this.codeBridge.checkRadarObstacle(obs);
        }
      }

      // Check collision
      if (Math.abs(obsZ - playerZ) < (obs.depth / 2 + 0.35)) {
        if (!obs.cleared && Math.abs(obs.mesh.position.x - playerX) < 1.1) {
          // If it's a high laser and player is sliding, evasion success!
          if (obs.isHigh && this.isSliding) {
            obs.cleared = true;
            this.combo = Math.min(3.0, this.combo + 0.2);
            if (window.VisualFx) window.VisualFx.toast('SLIDE EVASION! +COMBO', '🛹', 'success');
          }
          // If it's a low barrier/firewall and player is jumping high enough
          else if (!obs.isHigh && this.isJumping && playerY > (obs.height + 0.2)) {
            obs.cleared = true;
            this.combo = Math.min(3.0, this.combo + 0.2);
            if (window.VisualFx) window.VisualFx.toast('JUMP EVASION! +COMBO', '🦘', 'success');
          }
          // Direct collision hit!
          else {
            obs.cleared = true;
            this.takeDamage();
          }
        }
      }

      // Clean up past obstacles
      if (playerZ - obsZ > 25) {
        this.scene.remove(obs.mesh);
        this.obstacles.splice(i, 1);
      }
    }
  }

  updateCoins(delta) {
    const playerZ = this.player.position.z;
    const playerX = this.player.position.x;
    const playerY = this.player.position.y;

    for (let i = this.coins.length - 1; i >= 0; i--) {
      const coin = this.coins[i];

      // Rotate coin
      coin.mesh.rotation.z += coin.rotSpeed * delta;

      // Check pickup
      if (!coin.collected) {
        const dz = Math.abs(coin.mesh.position.z - playerZ);
        const dx = Math.abs(coin.mesh.position.x - playerX);
        const dy = Math.abs(coin.mesh.position.y - playerY);

        if (dz < 1.2 && dx < 1.1 && dy < 1.4) {
          coin.collected = true;
          this.coinsCollected++;
          this.combo = Math.min(3.0, this.combo + 0.1);

          if (window.Sound) window.Sound.playCoin();
          if (window.VisualFx) {
            window.VisualFx.spawnSparks(window.innerWidth / 2, window.innerHeight * 0.45, '#ffe600');
          }

          this.scene.remove(coin.mesh);
          this.coins.splice(i, 1);
          continue;
        }
      }

      // Clean up past coins
      if (playerZ - coin.mesh.position.z > 25) {
        this.scene.remove(coin.mesh);
        this.coins.splice(i, 1);
      }
    }
  }

  checkMatrixGate() {
    if (!this.gateObject || this.gateObject.triggered) return;

    const gateZ = this.gateObject.zPos;
    const playerZ = this.player.position.z;

    // Slow down into Matrix Bullet Time when approaching gate (10 meters ahead)
    if (gateZ - playerZ < 10.0 && gateZ - playerZ > -2.0) {
      this.gateObject.triggered = true;
      this.triggerBulletTime();

      // Pick curriculum challenge from active world
      let challenge = null;
      if (this.currentLevel) {
        challenge = this.currentLevel;
      } else if (window.CURRICULUM_DATA && this.worldConfig) {
        const langList = window.CURRICULUM_DATA[this.worldConfig.id] || [];
        challenge = langList[Math.floor(Math.random() * langList.length)];
      }

      if (!challenge) {
        challenge = {
          title: 'Compiler Checkpoint',
          question: 'Fix the syntax glitch to disintegrate the sector firewall:',
          code: 'let power = 100;\nif (power > 50) {\n  runner.activateShield();\n}',
          options: ['Activate Shield', 'Drop Speed', 'Halt Runtime', 'Format Drive'],
          correctAnswer: 0,
          explanation: 'Running power is above threshold; shield subroutine primes and disarms the barrier!'
        };
      }

      if (this.codeBridge) {
        this.codeBridge.prepareGateChallenge(challenge);
      }
      if (this.ui) {
        this.ui.showGateChallenge(challenge);
      }
      if (window.Sound) window.Sound.playClick();
    }
  }

  handleResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || (window.innerHeight - 80);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

// Global singleton instance
window.CodeRunner3D = new CodeRunner3DEngine();
