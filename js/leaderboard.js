/**
 * GLITCH RUNNER - COMPETITIVE LEADERBOARD SYSTEM
 * Ranks demo cyber-hackers alongside real player data dynamically.
 */

window.DEMO_LEADERBOARD = [
  { rank: 1, avatar: '🤖', name: 'lakshay', level: 42, score: 28400, stars: 84, xp: 14200 },
  { rank: 2, avatar: '🥷', name: 'kunal', level: 38, score: 23900, stars: 72, xp: 11950 },
  { rank: 3, avatar: '👾', name: 'NullPointerDemon', level: 34, score: 19200, stars: 65, xp: 9600 },
  { rank: 4, avatar: '🧙', name: 'ByteValkyrie', level: 29, score: 15800, stars: 54, xp: 7900 },
  { rank: 5, avatar: '⚡', name: 'GhostInTheCode', level: 25, score: 12400, stars: 48, xp: 6200 },
  { rank: 6, avatar: '💻', name: 'LogicRonin', level: 21, score: 9600, stars: 39, xp: 4800 },
  { rank: 7, avatar: '🛡️', name: 'BufferOverflow', level: 16, score: 6800, stars: 28, xp: 3400 },
  { rank: 8, avatar: '🔥', name: 'AsyncViper', level: 12, score: 4200, stars: 20, xp: 2100 }
];

class LeaderboardEngine {
  constructor() {}

  openModal() {
    this.renderLeaderboard();
    const modal = document.getElementById('modal-leaderboard');
    if (modal) modal.classList.add('active');
  }

  renderLeaderboard() {
    const tableBody = document.getElementById('leaderboard-body');
    if (!tableBody) return;

    const player = window.GameState.data.player;
    const playerEntry = {
      isPlayer: true,
      avatar: player.avatar || '⚡',
      name: player.username || 'CodeHunter',
      level: player.level,
      score: player.totalScore,
      stars: player.stars,
      xp: player.xp
    };

    // Combine demo players with real player, sort by score descending
    const combined = [...window.DEMO_LEADERBOARD, playerEntry];
    combined.sort((a, b) => b.score - a.score);

    tableBody.innerHTML = combined.map((entry, index) => {
      const rank = index + 1;
      let medal = `#${rank}`;
      if (rank === 1) medal = '🥇 #1';
      else if (rank === 2) medal = '🥈 #2';
      else if (rank === 3) medal = '🥉 #3';

      return `
        <tr class="${entry.isPlayer ? 'current-player' : ''}">
          <td style="font-family: var(--font-display); font-weight: 800;">${medal}</td>
          <td>
            <span style="font-size: 1.25rem; margin-right: 0.5rem;">${entry.avatar}</span>
            <span>${entry.name} ${entry.isPlayer ? '<span class="level-badge" style="margin-left: 0.4rem;">YOU</span>' : ''}</span>
          </td>
          <td><span class="level-badge">LVL ${entry.level}</span></td>
          <td style="color: var(--accent-primary); font-family: var(--font-display); font-weight: 800;">${entry.score.toLocaleString()}</td>
          <td style="color: #ffe600; font-weight: 700;">⭐ ${entry.stars}</td>
        </tr>
      `;
    }).join('');
  }
}

window.Leaderboard = new LeaderboardEngine();
