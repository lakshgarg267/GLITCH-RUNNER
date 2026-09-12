/**
 * GLITCH RUNNER - VISUAL FX & CANVAS CYBER BACKGROUND
 * Manages cyber grid/matrix canvas, screen shakes, glitch flashes, and particle explosions.
 */

class VisualFxEngine {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.animationId = null;

    this.initCanvas();
    this.bindEvents();
  }

  initCanvas() {
    if (!this.canvas) return;
    this.resize();
    this.initParticles();
    this.startLoop();
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
  }

  initParticles() {
    this.particles = [];
    const count = Math.min(Math.floor((this.width * this.height) / 18000), 70);
    const chars = '01<>/={};+$#*!λπ&_';

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        char: chars[Math.floor(Math.random() * chars.length)],
        speedY: 0.3 + Math.random() * 0.8,
        speedX: (Math.random() - 0.5) * 0.3,
        size: 10 + Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.35
      });
    }
  }

  startLoop() {
    const loop = () => {
      this.render();
      this.animationId = requestAnimationFrame(loop);
    };
    loop();
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Get current theme color from root variable
    const themeAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#00ffaa';

    // Draw Floating Code Characters
    this.ctx.font = '12px "Fira Code", monospace';

    for (let p of this.particles) {
      this.ctx.fillStyle = themeAccent;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillText(p.char, p.x, p.y);

      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y > this.height + 20) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }
      if (p.x > this.width + 20) p.x = -20;
      if (p.x < -20) p.x = this.width + 20;
    }

    this.ctx.globalAlpha = 1.0;
  }

  // Dramatic Screen Shake
  shake() {
    const app = document.getElementById('app');
    if (!app) return;
    app.classList.remove('screen-shake');
    void app.offsetWidth; // Force reflow
    app.classList.add('screen-shake');
    setTimeout(() => {
      app.classList.remove('screen-shake');
    }, 450);
  }

  // Glitch flash on mistake / hit
  glitchFlash() {
    const flash = document.createElement('div');
    flash.className = 'screen-glitch-flash';
    document.body.appendChild(flash);
    setTimeout(() => {
      if (flash.parentNode) flash.parentNode.removeChild(flash);
    }, 380);
  }

  // Particle explosion on correct answer or level victory
  spawnSparks(x, y, color = 'var(--accent-primary)') {
    const container = document.body;
    for (let i = 0; i < 16; i++) {
      const spark = document.createElement('div');
      spark.style.position = 'fixed';
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = '6px';
      spark.style.height = '6px';
      spark.style.borderRadius = '50%';
      spark.style.backgroundColor = color;
      spark.style.boxShadow = `0 0 10px ${color}`;
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '9999';

      const angle = (Math.PI * 2 * i) / 16;
      const velocity = 40 + Math.random() * 80;
      const targetX = Math.cos(angle) * velocity;
      const targetY = Math.sin(angle) * velocity;

      spark.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${targetX}px, ${targetY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        fill: 'forwards'
      });

      container.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  }

  // Toast alert system
  toast(message, icon = '⚡', type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
}

window.VisualFx = new VisualFxEngine();
