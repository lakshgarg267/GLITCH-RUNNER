/**
 * Deterministic Glitch Hunter simulation.
 * Player code does not mutate the world directly. It returns a glitch id.
 * The engine applies that decision, then tests and the arena both read the same result.
 */

class GlitchHunterSim {
  distanceSq(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy;
  }

  nearestId(player, glitches) {
    if (!glitches || glitches.length === 0) return null;
    let best = glitches[0];
    let bestD = this.distanceSq(player, best);
    for (let i = 1; i < glitches.length; i++) {
      const g = glitches[i];
      const d = this.distanceSq(player, g);
      if (d < bestD || (d === bestD && g.id < best.id)) {
        best = g;
        bestD = d;
      }
    }
    return best.id;
  }

  run(player, glitches, chosenId) {
    const expected = this.nearestId(player, glitches);
    const log = [];
    let playerHp = 3;
    let destroyed = null;
    const remaining = glitches.map((g) => ({ id: g.id, x: g.x, y: g.y }));
    const target = remaining.find((g) => g.id === chosenId);

    if (chosenId === null || chosenId === undefined || !target) {
      playerHp -= 1;
      log.push({
        type: 'miss',
        message: 'No valid target id ' + String(chosenId) + '. Operative misfires.'
      });
    } else if (chosenId === expected) {
      destroyed = remaining.splice(remaining.findIndex((g) => g.id === chosenId), 1)[0];
      log.push({
        type: 'hit',
        id: chosenId,
        message: 'Lock acquired. Glitch #' + chosenId + ' destroyed.'
      });
    } else {
      destroyed = remaining.splice(remaining.findIndex((g) => g.id === chosenId), 1)[0];
      playerHp -= 1;
      log.push({
        type: 'wrong_target',
        id: chosenId,
        expected,
        message: 'Hit glitch #' + chosenId + ' but nearest was #' + expected + '.'
      });
    }

    return {
      player: { x: player.x, y: player.y, hp: playerHp },
      glitches: remaining,
      destroyed,
      expected,
      chosenId,
      won: chosenId === expected && playerHp > 0,
      log
    };
  }

  bounds(player, glitches) {
    const pts = [player].concat(glitches || []);
    let max = 4;
    pts.forEach((p) => {
      max = Math.max(max, Math.abs(p.x), Math.abs(p.y));
    });
    return Math.max(4, Math.ceil(max) + 1);
  }

  render(container, snapshot) {
    if (!container) return;
    const player = snapshot.player;
    const glitches = snapshot.glitches || [];
    const destroyed = snapshot.destroyed;
    const size = this.bounds(player, glitches.concat(destroyed ? [destroyed] : []));
    const dim = size * 2 + 1;
    const cells = [];

    for (let y = size; y >= -size; y--) {
      for (let x = -size; x <= size; x++) {
        const isPlayer = player.x === x && player.y === y;
        const glitch = glitches.find((g) => g.x === x && g.y === y);
        const wasHit = destroyed && destroyed.x === x && destroyed.y === y;
        let cls = 'sim-cell';
        let label = '';
        if (isPlayer) {
          cls += ' sim-player';
          label = 'P';
        } else if (wasHit) {
          cls += snapshot.won ? ' sim-hit' : ' sim-wrong';
          label = 'X';
        } else if (glitch) {
          cls += ' sim-glitch';
          label = String(glitch.id);
        }
        cells.push('<div class="' + cls + '" title="(' + x + ',' + y + ')">' + label + '</div>');
      }
    }

    const logHtml = (snapshot.log || []).map((line) => {
      return '<div class="sim-log-line sim-log-' + line.type + '">' + this.escapeHtml(line.message) + '</div>';
    }).join('');

    container.innerHTML =
      '<div class="sim-hud">' +
        '<span>HP ' + player.hp + '/3</span>' +
        '<span>' + (snapshot.won ? 'LOCK OK' : 'SCANNING') + '</span>' +
      '</div>' +
      '<div class="sim-grid" style="grid-template-columns: repeat(' + dim + ', 1fr);">' +
        cells.join('') +
      '</div>' +
      '<div class="sim-log">' + (logHtml || '<div class="sim-log-line">Awaiting compile…</div>') + '</div>';
  }

  renderIdle(container, scene) {
    this.render(container, {
      player: { x: scene.player.x, y: scene.player.y, hp: 3 },
      glitches: scene.glitches,
      destroyed: null,
      won: false,
      log: [{ type: 'info', message: 'Write findNearestGlitch, then RUN. Your return value chooses the target.' }]
    });
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

window.GlitchHunterSim = new GlitchHunterSim();
