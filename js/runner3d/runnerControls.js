/**
 * GLITCH RUNNER - 3D CODE RUNNER CONTROLS
 * Handles keyboard input, touch swipe gestures, and virtual on-screen buttons.
 */

class RunnerControls {
  constructor(engine) {
    this.engine = engine;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.swipeThreshold = 35; // Minimum px for swipe
    this.maxSwipeTime = 500;  // Max ms for swipe
    this.isListening = false;

    this.onKeyDown = this.handleKeyDown.bind(this);
    this.onTouchStart = this.handleTouchStart.bind(this);
    this.onTouchEnd = this.handleTouchEnd.bind(this);
    this.onTouchMove = this.handleTouchMove.bind(this);
  }

  attach(domElement) {
    if (this.isListening) return;
    this.targetElement = domElement || window;

    window.addEventListener('keydown', this.onKeyDown);

    if (domElement) {
      domElement.addEventListener('touchstart', this.onTouchStart, { passive: false });
      domElement.addEventListener('touchend', this.onTouchEnd, { passive: false });
      domElement.addEventListener('touchmove', this.onTouchMove, { passive: false });
    }

    this.bindVirtualButtons();
    this.isListening = true;
  }

  detach() {
    if (!this.isListening) return;
    window.removeEventListener('keydown', this.onKeyDown);

    if (this.targetElement) {
      this.targetElement.removeEventListener('touchstart', this.onTouchStart);
      this.targetElement.removeEventListener('touchend', this.onTouchEnd);
      this.targetElement.removeEventListener('touchmove', this.onTouchMove);
    }
    this.isListening = false;
  }

  handleKeyDown(e) {
    // If user is currently typing in an input or textarea (like the live coding drawer), do not hijack movement keys
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      if (e.key === 'Escape') {
        activeEl.blur();
      }
      return;
    }

    if (!this.engine || !this.engine.isRunning) return;

    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        e.preventDefault();
        this.engine.shiftLane(-1);
        break;

      case 'ArrowRight':
      case 'd':
      case 'D':
        e.preventDefault();
        this.engine.shiftLane(1);
        break;

      case 'ArrowUp':
      case 'w':
      case 'W':
      case ' ':
        e.preventDefault();
        this.engine.jump();
        break;

      case 'ArrowDown':
      case 's':
      case 'S':
        e.preventDefault();
        this.engine.slide();
        break;

      case 'c':
      case 'C':
      case 't':
      case 'T':
        e.preventDefault();
        if (this.engine.ui) this.engine.ui.toggleCodeDrawer();
        break;

      case 'p':
      case 'P':
      case 'Escape':
        e.preventDefault();
        this.engine.togglePause();
        break;
    }
  }

  handleTouchStart(e) {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const touch = e.changedTouches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.touchStartTime = Date.now();
  }

  handleTouchMove(e) {
    // Prevent background scrolling while interacting with the 3D canvas
    if (this.engine && this.engine.isRunning) {
      e.preventDefault();
    }
  }

  handleTouchEnd(e) {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    if (!this.engine || !this.engine.isRunning) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - this.touchStartX;
    const deltaY = touch.clientY - this.touchStartY;
    const deltaTime = Date.now() - this.touchStartTime;

    if (deltaTime > this.maxSwipeTime) return;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (Math.max(absX, absY) < this.swipeThreshold) return;

    e.preventDefault();

    if (absX > absY) {
      // Horizontal swipe
      if (deltaX > 0) {
        this.engine.shiftLane(1); // Swipe Right
      } else {
        this.engine.shiftLane(-1); // Swipe Left
      }
    } else {
      // Vertical swipe
      if (deltaY < 0) {
        this.engine.jump(); // Swipe Up
      } else {
        this.engine.slide(); // Swipe Down
      }
    }
  }

  bindVirtualButtons() {
    const btnLeft = document.getElementById('touch-btn-left');
    const btnRight = document.getElementById('touch-btn-right');
    const btnJump = document.getElementById('touch-btn-jump');
    const btnSlide = document.getElementById('touch-btn-slide');
    const btnCode = document.getElementById('touch-btn-code');

    const addTouch = (btn, action) => {
      if (!btn) return;
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        action();
      });
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        action();
      });
    };

    addTouch(btnLeft, () => this.engine.shiftLane(-1));
    addTouch(btnRight, () => this.engine.shiftLane(1));
    addTouch(btnJump, () => this.engine.jump());
    addTouch(btnSlide, () => this.engine.slide());
    addTouch(btnCode, () => {
      if (this.engine.ui) this.engine.ui.toggleCodeDrawer();
    });
  }
}

window.RunnerControls = RunnerControls;
