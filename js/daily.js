/**
 * GLITCH RUNNER - DAILY CHALLENGE & 7-DAY STREAK SYSTEM
 * Daily missions and escalating weekly reward track.
 */

class DailyEngine {
  constructor() {
    this.streakRewards = [20, 30, 50, 70, 100, 150, 250];
  }

  getTodayDailyMission() {
    // Generate deterministic daily mission based on current date
    const today = new Date().toISOString().split('T')[0];
    return {
      id: `daily_${today}`,
      worldId: 'javascript',
      mode: 'runner',
      topic: 'Daily Glitch',
      levelNumber: 99,
      title: 'DAILY GLITCH PROTOCOL',
      difficulty: 'Hard',
      timeLimitSeconds: 45,
      concept: 'Deep logic verification under high-urgency conditions.',
      question: 'DAILY SPECIAL: What is the return value of [1, 2, 3].reduce((acc, curr) => acc + curr, 10)?',
      code: `const data = [1, 2, 3];\nconst initialValue = 10;\nconst result = data.reduce((acc, curr) => acc + curr, initialValue);\nconsole.log(result);`,
      options: [
        '16',
        '6',
        '15',
        'TypeError'
      ],
      correctAnswer: 0, // 10 + 1 + 2 + 3 = 16
      hint: 'The accumulator starts at 10, then adds 1, then 2, then 3.',
      explanation: 'Array.reduce with an initial value of 10 computes: 10 + 1 + 2 + 3 = 16.',
      xpReward: 200,
      coinReward: 100
    };
  }

  openDailyModal() {
    this.renderStreakCalendar();
    const modal = document.getElementById('modal-daily');
    if (modal) modal.classList.add('active');
  }

  renderStreakCalendar() {
    const grid = document.getElementById('daily-streak-calendar');
    const claimBtn = document.getElementById('btn-claim-streak');
    if (!grid) return;

    const currentStreak = window.GameState.data.player.currentStreak || 1;
    const streakDayIndex = ((currentStreak - 1) % 7) + 1; // 1 to 7
    const today = new Date().toISOString().split('T')[0];
    const alreadyClaimed = (window.GameState.data.player.streakClaimedDate === today);

    let html = '';
    for (let day = 1; day <= 7; day++) {
      const reward = this.streakRewards[day - 1];
      const isPastClaimed = (day < streakDayIndex);
      const isToday = (day === streakDayIndex);

      let boxClass = 'streak-day-box';
      if (isPastClaimed || (isToday && alreadyClaimed)) boxClass += ' claimed';
      else if (isToday) boxClass += ' today';

      html += `
        <div class="${boxClass}">
          <span style="font-family: var(--font-display); font-size: 0.75rem; font-weight: 800;">DAY ${day}</span>
          <span style="font-size: 1.25rem;">${isPastClaimed || (isToday && alreadyClaimed) ? '✓' : '🪙'}</span>
          <span style="font-weight: 800; font-size: 0.8rem; color: var(--accent-warning);">${reward}</span>
        </div>
      `;
    }

    grid.innerHTML = html;

    if (claimBtn) {
      if (alreadyClaimed) {
        claimBtn.disabled = true;
        claimBtn.textContent = '✓ CLAIMED FOR TODAY';
        claimBtn.style.opacity = '0.5';
      } else {
        claimBtn.disabled = false;
        claimBtn.textContent = `🔥 CLAIM DAY ${streakDayIndex} REWARD (${this.streakRewards[streakDayIndex - 1]} 🪙)`;
        claimBtn.style.opacity = '1';
        claimBtn.onclick = () => {
          const res = window.GameState.claimStreakReward(streakDayIndex);
          if (res.success) {
            if (window.Sound) window.Sound.playCoin();
            if (window.VisualFx) {
              window.VisualFx.toast(`Day ${streakDayIndex} reward claimed: +${res.coins} 🪙!`, '🔥', 'success');
            }
            this.renderStreakCalendar();
            if (window.App) window.App.updateAllHUD();
          }
        };
      }
    }
  }

  startDailyMission() {
    const mission = this.getTodayDailyMission();
    // Inject into levels list temporarily if not present
    if (!window.LEVELS_DATA.some(l => l.id === mission.id)) {
      window.LEVELS_DATA.push(mission);
    }
    const modal = document.getElementById('modal-daily');
    if (modal) modal.classList.remove('active');

    window.Game.startLevel(mission.id);
  }
}

window.Daily = new DailyEngine();
