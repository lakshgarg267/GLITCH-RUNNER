/**
 * GLITCH RUNNER - MASTERY ENGINE & CONCEPT MAPPING
 * Tracks granular concept proficiency (variables, conditions, loops, functions, arrays, objects).
 * Provides data-driven concept-to-game style mappings and adaptive recommendations.
 */

window.CONCEPT_TAXONOMY = {
  variables: {
    id: 'variables',
    name: 'Variables & Constants',
    gameType: 'runner',
    description: 'Storing states, numeric values, strings, and reassignment boundaries.',
    recommendedGames: ['3d_runner', 'racing']
  },
  conditions: {
    id: 'conditions',
    name: 'Logic & Branching Conditions',
    gameType: 'runner',
    description: 'if / else decisions, comparison operators, and reactive guards.',
    recommendedGames: ['3d_runner', 'shooter']
  },
  loops: {
    id: 'loops',
    name: 'Iteration & Loops',
    gameType: 'snake',
    description: 'for loops, while iteration, repeat cycles, and traversal.',
    recommendedGames: ['3d_snake', 'racing']
  },
  functions: {
    id: 'functions',
    name: 'Functions & Methods',
    gameType: 'boss',
    description: 'Parameters, return values, encapsulation, and modular logic.',
    recommendedGames: ['boss_arena', 'shooter']
  },
  arrays: {
    id: 'arrays',
    name: 'Arrays & Collections',
    gameType: 'snake',
    description: 'Lists, indexing, push/pop operations, and slice transformations.',
    recommendedGames: ['3d_snake', 'inventory']
  },
  objects: {
    id: 'objects',
    name: 'Objects & Key-Value Dictionaries',
    gameType: 'boss',
    description: 'Key-value maps, property mutation, methods, and entity models.',
    recommendedGames: ['boss_arena', 'puzzle']
  },
  debugging: {
    id: 'debugging',
    name: 'Debugging & Diagnostics',
    gameType: 'boss',
    description: 'Syntax anomaly correction, off-by-one repairs, and runtime fixes.',
    recommendedGames: ['boss_arena', 'puzzle']
  },
  algorithms: {
    id: 'algorithms',
    name: 'Algorithms & Problem Solving',
    gameType: 'puzzle',
    description: 'Optimization, search, mathematical reduction, and flow mastery.',
    recommendedGames: ['puzzle', 'boss_arena']
  },
  projects: {
    id: 'projects',
    name: 'Real Projects & Final Mastery',
    gameType: 'project',
    description: 'Multi-part architectural builds integrating all core mechanics.',
    recommendedGames: ['project_lab', 'boss_arena']
  }
};

class MasteryEngine {
  constructor() {
    this.ensureStateSchema();
  }

  ensureStateSchema() {
    if (!window.GameState) return;
    if (!window.GameState.data.mastery) {
      window.GameState.data.mastery = {
        concepts: {},
        activities: {
          predict: 0,
          complete: 0,
          debug: 0,
          write: 0,
          gameplay: 0,
          boss: 0
        },
        strengths: [],
        needsPractice: []
      };
      // Populate defaults for each concept
      Object.keys(window.CONCEPT_TAXONOMY).forEach(conceptId => {
        window.GameState.data.mastery.concepts[conceptId] = {
          points: 0,
          attempts: 0,
          successes: 0,
          tier: 'NOVICE',
          lastPracticed: null
        };
      });
      window.GameState.save();
    }
  }

  // Record an educational action and update mastery telemetry
  recordAction(conceptId, activityType, isSuccess, details = {}) {
    this.ensureStateSchema();
    const mastery = window.GameState.data.mastery;
    const concept = mastery.concepts[conceptId] || { points: 0, attempts: 0, successes: 0, tier: 'NOVICE' };

    concept.attempts++;
    if (isSuccess) {
      concept.successes++;
      const pointGains = {
        predict: 15,
        complete: 25,
        debug: 35,
        write: 50,
        gameplay: 45,
        boss: 100
      };
      concept.points += (pointGains[activityType] || 20);
    } else {
      concept.points = Math.max(0, concept.points - 5);
    }

    concept.lastPracticed = new Date().toISOString().split('T')[0];

    // Compute Tier: NOVICE -> APPRENTICE -> PRACTITIONER -> PROFICIENT -> MASTER
    const pct = concept.attempts > 0 ? (concept.successes / concept.attempts) : 0;
    if (concept.points >= 400 && pct >= 0.8) concept.tier = 'MASTER';
    else if (concept.points >= 250 && pct >= 0.7) concept.tier = 'PROFICIENT';
    else if (concept.points >= 140 && pct >= 0.6) concept.tier = 'PRACTITIONER';
    else if (concept.points >= 60) concept.tier = 'APPRENTICE';
    else concept.tier = 'NOVICE';

    if (mastery.activities[activityType] !== undefined) {
      if (isSuccess) mastery.activities[activityType]++;
    }

    mastery.concepts[conceptId] = concept;
    window.GameState.save();

    // Trigger toast milestone on tier promotion
    if (details.prevTier && details.prevTier !== concept.tier && window.VisualFx) {
      window.VisualFx.toast(`🏆 CONCEPT PROMOTION: ${conceptId.toUpperCase()} is now ${concept.tier}!`, '⭐', 'success');
    }

    return concept;
  }

  // Retrieve 3-Tier Hint
  getHint(challenge, tier = 1) {
    if (!challenge) return 'Follow language syntax conventions.';

    if (challenge.hints && Array.isArray(challenge.hints)) {
      if (tier === 1) return challenge.hints[0] || challenge.hint || 'Analyze the concept.';
      if (tier === 2) return challenge.hints[1] || challenge.hint || 'Check code structure and types.';
      if (tier === 3) return challenge.hints[2] || challenge.hint || 'Formulate the return statement or condition.';
    }

    // Fallback if challenge only has a single hint
    const base = challenge.hint || challenge.h || 'Carefully verify the variables and condition blocks.';
    if (tier === 1) return `💡 CONCEPTUAL CLUE: ${base}`;
    if (tier === 2) return `🛠️ STRUCTURAL HINT: Look at the required return type and control flow.`;
    return `⚡ TACTICAL SOLUTION HINT: Match the expected inputs and verify edge cases.`;
  }

  // Adaptive recommendation based on player performance
  getRecommendation(worldId) {
    this.ensureStateSchema();
    const mastery = window.GameState.data.mastery;
    let weakestConcept = 'variables';
    let minPoints = Infinity;

    Object.entries(mastery.concepts).forEach(([cid, data]) => {
      if (data.points < minPoints) {
        minPoints = data.points;
        weakestConcept = cid;
      }
    });

    const info = window.CONCEPT_TAXONOMY[weakestConcept];
    return {
      conceptId: weakestConcept,
      title: info ? info.name : 'Foundations',
      recommendedGame: info ? info.gameType : 'runner',
      description: info ? info.description : 'Practice coding foundations.'
    };
  }
}

window.Mastery = new MasteryEngine();
