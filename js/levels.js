/**
 * GLITCH RUNNER - COMPREHENSIVE LEVEL ROADMAP & CURRICULUM REPOSITORY
 * 10 Programming Language Worlds, each featuring:
 * - 7 Distinct Thematic Areas
 * - 51 Full Progressive Missions per Language (Levels 1 to 51)
 * - 7 Epic Boss Battles per Language (Levels 8, 16, 24, 32, 40, 48, and 51 Final Mastery Boss)
 * - Story objectives, corrupted target entities, real code challenges, and diverse game modes.
 */

window.WORLDS_CONFIG = [
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟡',
    tier: 'free',
    difficulty: 'Novice to Master',
    description: 'Master asynchronous loops, functional scopes, modern ES6+ paradigms, and browser engine mechanics.',
    areas: [
      { id: 'js_area_1', name: 'Area 1: Training Camp', range: 'Lv 1-8', bossId: 'js_lvl_8', bossName: 'THE SYNTAX BEAST' },
      { id: 'js_area_2', name: 'Area 2: Variable Valley', range: 'Lv 9-16', bossId: 'js_lvl_16', bossName: 'THE BOOLEAN HYDRA' },
      { id: 'js_area_3', name: 'Area 3: Loop Factory', range: 'Lv 17-24', bossId: 'js_lvl_24', bossName: 'THE INFINITE LOOP DEMON' },
      { id: 'js_area_4', name: 'Area 4: Function Station', range: 'Lv 25-32', bossId: 'js_lvl_32', bossName: 'THE CLOSURE WRAITH' },
      { id: 'js_area_5', name: 'Area 5: Array Zone', range: 'Lv 33-40', bossId: 'js_lvl_40', bossName: 'THE MUTATOR TITAN' },
      { id: 'js_area_6', name: 'Area 6: Object Fortress', range: 'Lv 41-48', bossId: 'js_lvl_48', bossName: 'THE PROTOTYPE LICH' },
      { id: 'js_area_7', name: 'Area 7: Async Citadel', range: 'Lv 49-51', bossId: 'js_lvl_51', bossName: 'THE EVENT LOOP SOVEREIGN' }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    tier: 'free',
    difficulty: 'Beginner to Architect',
    description: 'Explore elegant whitespace logic, comprehensions, robust collection models, and modular scripts.',
    areas: [
      { id: 'py_area_1', name: 'Area 1: Syntax Sanctuary', range: 'Lv 1-8', bossId: 'py_lvl_8', bossName: 'THE INDENTATION GOLEM' },
      { id: 'py_area_2', name: 'Area 2: Logic Highlands', range: 'Lv 9-16', bossId: 'py_lvl_16', bossName: 'THE SLICING BASILISK' },
      { id: 'py_area_3', name: 'Area 3: Iteration Ridge', range: 'Lv 17-24', bossId: 'py_lvl_24', bossName: 'THE RECURSION WYRM' },
      { id: 'py_area_4', name: 'Area 4: Function Foundry', range: 'Lv 25-32', bossId: 'py_lvl_32', bossName: 'THE SCOPE PHANTOM' },
      { id: 'py_area_5', name: 'Area 5: Collection Caverns', range: 'Lv 33-40', bossId: 'py_lvl_40', bossName: 'THE HASH COLLISION SPECTRE' },
      { id: 'py_area_6', name: 'Area 6: OOP Citadel', range: 'Lv 41-48', bossId: 'py_lvl_48', bossName: 'THE METACLASS BEHEMOTH' },
      { id: 'py_area_7', name: 'Area 7: Generator Core', range: 'Lv 49-51', bossId: 'py_lvl_51', bossName: 'THE GIL DRAGON' }
    ]
  },
  {
    id: 'c',
    name: 'C Language',
    icon: '⚡',
    tier: 'free',
    difficulty: 'Hardcore',
    description: 'Conquer bare-metal memory, stack pointers, dynamic allocation, and low-level system calls.',
    areas: [
      { id: 'c_area_1', name: 'Area 1: Memory Outpost', range: 'Lv 1-8', bossId: 'c_lvl_8', bossName: 'THE SEMICOLON SCOURGE' },
      { id: 'c_area_2', name: 'Area 2: Logic Sector', range: 'Lv 9-16', bossId: 'c_lvl_16', bossName: 'THE NULL POINTER TITAN' },
      { id: 'c_area_3', name: 'Area 3: Loop Chamber', range: 'Lv 17-24', bossId: 'c_lvl_24', bossName: 'THE STACK OVERFLOW WRAITH' },
      { id: 'c_area_4', name: 'Area 4: Function Lab', range: 'Lv 25-32', bossId: 'c_lvl_32', bossName: 'THE SCOPE GARGOYLE' },
      { id: 'c_area_5', name: 'Area 5: Pointer Peaks', range: 'Lv 33-40', bossId: 'c_lvl_40', bossName: 'THE DANGLING POINTER LICH' },
      { id: 'c_area_6', name: 'Area 6: Heap Highlands', range: 'Lv 41-48', bossId: 'c_lvl_48', bossName: 'THE SEGFAULT OVERLORD' },
      { id: 'c_area_7', name: 'Area 7: Kernel Core', range: 'Lv 49-51', bossId: 'c_lvl_51', bossName: 'THE HARDWARE DAEMON' }
    ]
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    tier: 'free',
    difficulty: 'Intermediate to Enterprise',
    description: 'Object-oriented structures, JVM bytecode execution, polymorphic hierarchies, and strong typing.',
    areas: [
      { id: 'java_area_1', name: 'Area 1: Bytecode Gate', range: 'Lv 1-8', bossId: 'java_lvl_8', bossName: 'THE COMPILER SENTINEL' },
      { id: 'java_area_2', name: 'Area 2: Primitive Plains', range: 'Lv 9-16', bossId: 'java_lvl_16', bossName: 'THE STRING POOL WRAITH' },
      { id: 'java_area_3', name: 'Area 3: Control Citadel', range: 'Lv 17-24', bossId: 'java_lvl_24', bossName: 'THE POLYMORPHIC GOLEM' },
      { id: 'java_area_4', name: 'Area 4: Class Sanctuary', range: 'Lv 25-32', bossId: 'java_lvl_32', bossName: 'THE ENCAPSULATION TITAN' },
      { id: 'java_area_5', name: 'Area 5: Collection Vault', range: 'Lv 33-40', bossId: 'java_lvl_40', bossName: 'THE HASHMAP SPECTRE' },
      { id: 'java_area_6', name: 'Area 6: Interface Nexus', range: 'Lv 41-48', bossId: 'java_lvl_48', bossName: 'THE THREAD RACER' },
      { id: 'java_area_7', name: 'Area 7: JVM Core', range: 'Lv 49-51', bossId: 'java_lvl_51', bossName: 'THE ABSTRACT OVERLORD' }
    ]
  },
  {
    id: 'html',
    name: 'HTML & Web',
    icon: '🌐',
    tier: 'free',
    difficulty: 'Architectural',
    description: 'Construct the visual web, semantic hierarchies, accessible forms, audio/video DOM, and modern schemas.',
    areas: [
      { id: 'html_area_1', name: 'Area 1: Markup Gateway', range: 'Lv 1-8', bossId: 'html_lvl_8', bossName: 'THE UNCLOSED PHANTOM' },
      { id: 'html_area_2', name: 'Area 2: Hyperlink Highway', range: 'Lv 9-16', bossId: 'html_lvl_16', bossName: 'THE BROKEN ANCHOR' },
      { id: 'html_area_3', name: 'Area 3: Layout Bastion', range: 'Lv 17-24', bossId: 'html_lvl_24', bossName: 'THE SEMANTIC MONOLITH' },
      { id: 'html_area_4', name: 'Area 4: Form Factory', range: 'Lv 25-32', bossId: 'html_lvl_32', bossName: 'THE VALIDATION DEMON' },
      { id: 'html_area_5', name: 'Area 5: Media Matrix', range: 'Lv 33-40', bossId: 'html_lvl_40', bossName: 'THE MULTIMEDIA HYDRA' },
      { id: 'html_area_6', name: 'Area 6: A11y Sanctuary', range: 'Lv 41-48', bossId: 'html_lvl_48', bossName: 'THE CONTRAST COLOSSUS' },
      { id: 'html_area_7', name: 'Area 7: DOM Core', range: 'Lv 49-51', bossId: 'html_lvl_51', bossName: 'THE DOM SOVEREIGN' }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '🛡️',
    tier: 'premium',
    difficulty: 'Advanced',
    description: 'High-performance game engines, RAII, template metaprogramming, and smart pointer mechanics.',
    areas: [
      { id: 'cpp_area_1', name: 'Area 1: STL Valley', range: 'Lv 1-8', bossId: 'cpp_lvl_8', bossName: 'THE RAW POINTER GHOUL' },
      { id: 'cpp_area_2', name: 'Area 2: Template Peaks', range: 'Lv 9-16', bossId: 'cpp_lvl_16', bossName: 'THE TEMPLATE BEAST' },
      { id: 'cpp_area_3', name: 'Area 3: RAII Bastion', range: 'Lv 17-24', bossId: 'cpp_lvl_24', bossName: 'THE MEMORY LEAK BEHEMOTH' },
      { id: 'cpp_area_4', name: 'Area 4: Operator Core', range: 'Lv 25-32', bossId: 'cpp_lvl_32', bossName: 'THE OVERLOAD TITAN' },
      { id: 'cpp_area_5', name: 'Area 5: Smart Pointer Vault', range: 'Lv 33-40', bossId: 'cpp_lvl_40', bossName: 'THE CIRCULAR REF LICH' },
      { id: 'cpp_area_6', name: 'Area 6: Thread Nexus', range: 'Lv 41-48', bossId: 'cpp_lvl_48', bossName: 'THE MUTEX SPECTRE' },
      { id: 'cpp_area_7', name: 'Area 7: Assembly Gateway', range: 'Lv 49-51', bossId: 'cpp_lvl_51', bossName: 'THE ZERO COST COMPILER' }
    ]
  },
  {
    id: 'csharp',
    name: 'C#',
    icon: '🎮',
    tier: 'premium',
    difficulty: 'Intermediate',
    description: 'Unity game scripts, LINQ data pipelines, modern async/await, and enterprise .NET core systems.',
    areas: [
      { id: 'csharp_area_1', name: 'Area 1: Unity Foothills', range: 'Lv 1-8', bossId: 'csharp_lvl_8', bossName: 'THE NULLABLE BEAST' },
      { id: 'csharp_area_2', name: 'Area 2: LINQ Forest', range: 'Lv 9-16', bossId: 'csharp_lvl_16', bossName: 'THE LAMBDA SENTINEL' },
      { id: 'csharp_area_3', name: 'Area 3: Property Palace', range: 'Lv 17-24', bossId: 'csharp_lvl_24', bossName: 'THE GC SWEEPER' },
      { id: 'csharp_area_4', name: 'Area 4: Delegate Den', range: 'Lv 25-32', bossId: 'csharp_lvl_32', bossName: 'THE EVENT DISPATCHER' },
      { id: 'csharp_area_5', name: 'Area 5: Async Avenue', range: 'Lv 33-40', bossId: 'csharp_lvl_40', bossName: 'THE DEADLOCK BEHEMOTH' },
      { id: 'csharp_area_6', name: 'Area 6: Generic Grove', range: 'Lv 41-48', bossId: 'csharp_lvl_48', bossName: 'THE PATTERN MATCHER' },
      { id: 'csharp_area_7', name: 'Area 7: CLR Core', range: 'Lv 49-51', bossId: 'csharp_lvl_51', bossName: 'THE GARBAGE COLLECTOR' }
    ]
  },
  {
    id: 'go',
    name: 'Go',
    icon: '🚀',
    tier: 'premium',
    difficulty: 'Intermediate',
    description: 'High-speed cloud microservices, goroutines, CSP concurrency channels, and efficient slices.',
    areas: [
      { id: 'go_area_1', name: 'Area 1: Gopher Gateway', range: 'Lv 1-8', bossId: 'go_lvl_8', bossName: 'THE UNCHECKED ERROR' },
      { id: 'go_area_2', name: 'Area 2: Slice Swamp', range: 'Lv 9-16', bossId: 'go_lvl_16', bossName: 'THE SLICE CAPACITY MONSTER' },
      { id: 'go_area_3', name: 'Area 3: Struct Sanctum', range: 'Lv 17-24', bossId: 'go_lvl_24', bossName: 'THE INTERFACE SHADOW' },
      { id: 'go_area_4', name: 'Area 4: Goroutine Grove', range: 'Lv 25-32', bossId: 'go_lvl_32', bossName: 'THE RACE CONDITION DEMON' },
      { id: 'go_area_5', name: 'Area 5: Channel Canyon', range: 'Lv 33-40', bossId: 'go_lvl_40', bossName: 'THE BLOCKED CHANNEL TITAN' },
      { id: 'go_area_6', name: 'Area 6: Context Citadel', range: 'Lv 41-48', bossId: 'go_lvl_48', bossName: 'THE TIMEOUT SPECTRE' },
      { id: 'go_area_7', name: 'Area 7: Cloud Nexus', range: 'Lv 49-51', bossId: 'go_lvl_51', bossName: 'THE CONCURRENCY GOD' }
    ]
  },
  {
    id: 'ruby',
    name: 'Ruby',
    icon: '💎',
    tier: 'premium',
    difficulty: 'Developer Happiness',
    description: 'Expressive block iterators, metaprogramming elegance, mixin modules, and dynamic gems.',
    areas: [
      { id: 'ruby_area_1', name: 'Area 1: Gem Mine', range: 'Lv 1-8', bossId: 'ruby_lvl_8', bossName: 'THE SYMBOL GOLEM' },
      { id: 'ruby_area_2', name: 'Area 2: Block Forest', range: 'Lv 9-16', bossId: 'ruby_lvl_16', bossName: 'THE YIELD PHANTOM' },
      { id: 'ruby_area_3', name: 'Area 3: Method Mountain', range: 'Lv 17-24', bossId: 'ruby_lvl_24', bossName: 'THE MONKEY PATCH CHIMERA' },
      { id: 'ruby_area_4', name: 'Area 4: Module Meadow', range: 'Lv 25-32', bossId: 'ruby_lvl_32', bossName: 'THE METHOD MISSING BEAST' },
      { id: 'ruby_area_5', name: 'Area 5: Enumerable Edge', range: 'Lv 33-40', bossId: 'ruby_lvl_40', bossName: 'THE ITERATOR TITAN' },
      { id: 'ruby_area_6', name: 'Area 6: Meta Matrix', range: 'Lv 41-48', bossId: 'ruby_lvl_48', bossName: 'THE EVAL SPECTRE' },
      { id: 'ruby_area_7', name: 'Area 7: Ruby Sanctuary', range: 'Lv 49-51', bossId: 'ruby_lvl_51', bossName: 'THE ELEGANT SOVEREIGN' }
    ]
  },
  {
    id: 'swift',
    name: 'Swift',
    icon: '🍎',
    tier: 'premium',
    difficulty: 'Intermediate',
    description: 'Safe optional binding, modern iOS app patterns, closures, value-type structs, and protocols.',
    areas: [
      { id: 'swift_area_1', name: 'Area 1: Cupertino Camp', range: 'Lv 1-8', bossId: 'swift_lvl_8', bossName: 'THE NIL UNWRAP DEMON' },
      { id: 'swift_area_2', name: 'Area 2: Guard Glade', range: 'Lv 9-16', bossId: 'swift_lvl_16', bossName: 'THE FORCE CAST HYDRA' },
      { id: 'swift_area_3', name: 'Area 3: Closure Canyon', range: 'Lv 17-24', bossId: 'swift_lvl_24', bossName: 'THE RETAIN CYCLE WRAITH' },
      { id: 'swift_area_4', name: 'Area 4: Struct Sanctuary', range: 'Lv 25-32', bossId: 'swift_lvl_32', bossName: 'THE MUTATING DRAGON' },
      { id: 'swift_area_5', name: 'Area 5: Protocol Peak', range: 'Lv 33-40', bossId: 'swift_lvl_40', bossName: 'THE EXTENSION TITAN' },
      { id: 'swift_area_6', name: 'Area 6: Async Arch', range: 'Lv 41-48', bossId: 'swift_lvl_48', bossName: 'THE ACTOR SPECTRE' },
      { id: 'swift_area_7', name: 'Area 7: SwiftUI Core', range: 'Lv 49-51', bossId: 'swift_lvl_51', bossName: 'THE SWIFT MASTER' }
    ]
  }
];

// ==========================================================================
// 51-LEVEL COMPREHENSIVE CURRICULUM AGGREGATOR & DATA ENGINE
// Combines hand-crafted curriculum data across all 10 languages
// ==========================================================================

function buildAllWorldsLevels() {
  const allLevels = [];
  const curriculumMap = window.CURRICULUM_DATA || {};

  window.WORLDS_CONFIG.forEach(world => {
    const rawList = curriculumMap[world.id] || [];

    rawList.forEach((item, index) => {
      const lvlNum = index + 1;
      const areaIndex = Math.min(Math.floor((lvlNum - 1) / 8), world.areas.length - 1);
      const area = world.areas[areaIndex] || { name: `Sector ${areaIndex + 1}` };
      const levelId = `${world.id}_lvl_${lvlNum}`;
      const isBoss = item.isBoss || item.mode === 'boss' || (lvlNum % 8 === 0) || (lvlNum === 51);
      const isFinal = (lvlNum === 51);

      // Normalize boss phases
      let normalizedPhases = null;
      const rawPhases = (item.bossData && item.bossData.phases) || item.phases || null;
      if (rawPhases && Array.isArray(rawPhases)) {
        normalizedPhases = rawPhases.map((p, pIdx) => ({
          phase: p.phase || (pIdx + 1),
          question: p.prompt || p.q || `Phase ${pIdx + 1} Boss Challenge`,
          code: p.code || null,
          options: p.options || p.opts || [],
          correctAnswer: p.correctAnswer !== undefined ? p.correctAnswer : (p.a !== undefined ? p.a : 0),
          explanation: p.explanation || item.explanation || item.concept || item.c || ''
        }));
      }

      const levelObj = {
        id: levelId,
        worldId: world.id,
        areaId: area.id || `area_${areaIndex + 1}`,
        areaName: area.name,
        levelNumber: lvlNum,
        title: item.title || item.t || `${world.name} Mission ${lvlNum}`,
        difficulty: isBoss ? (isFinal ? 'Mastery Boss' : 'Boss Event') : (lvlNum > 35 ? 'Advanced' : (lvlNum > 16 ? 'Medium' : 'Novice')),
        mode: isBoss ? 'boss' : (item.mode || item.m || (item.codeBlocks ? 'builder' : 'detective')),
        concept: item.concept || item.c || `Mastering ${item.title || item.t || world.name} concepts in ${area.name}.`,
        story: item.story || `Operative deployed to ${area.name}. A corrupted glitch node is destabilizing sector subroutines. Neutralize it!`,
        targetEnemy: {
          name: isBoss ? ((item.bossData && item.bossData.name) || item.name || item.t || 'SECTOR BOSS') : `GLITCH NODE #${lvlNum}`,
          avatar: isBoss ? ((item.bossData && item.bossData.avatar) || item.avatar || (isFinal ? '👑' : (lvlNum % 16 === 0 ? '🐲' : '👹'))) : (lvlNum % 3 === 0 ? '👾' : (lvlNum % 2 === 0 ? '🤖' : '🐛')),
          hp: isBoss ? ((item.bossData && item.bossData.hp) || item.hp || (500 + lvlNum * 10)) : 100
        },
        question: item.prompt || item.q || `Solve the challenge to purify the corrupted ${world.name} node:`,
        code: item.code || null,
        options: item.options || item.opts || ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: item.correctAnswer !== undefined ? item.correctAnswer : (item.a !== undefined ? item.a : 0),
        hint: item.hint || item.h || `Follow ${world.name} syntax and execution standards.`,
        explanation: item.explanation || item.concept || item.c || item.story || `Success! You repaired the ${world.name} code anomaly and restored sector telemetry.`,
        codeBlocks: item.codeBlocks || null,
        correctOrder: item.correctOrder || null,
        phases: normalizedPhases,
        bossData: isBoss ? {
          name: (item.bossData && item.bossData.name) || item.name || item.t || 'SECTOR BOSS',
          avatar: (item.bossData && item.bossData.avatar) || item.avatar || (isFinal ? '👑' : '👹'),
          hp: (item.bossData && item.bossData.hp) || item.hp || (500 + lvlNum * 10),
          damagePerHit: 100,
          phases: normalizedPhases
        } : null,
        timeLimitSeconds: ((item.mode || item.m) === 'runner' ? 40 : null),
        xpReward: isBoss ? (isFinal ? 1500 : 600) : (100 + lvlNum * 5),
        coinReward: isBoss ? (isFinal ? 500 : 200) : (30 + Math.floor(lvlNum * 1.5))
      };

      allLevels.push(levelObj);
    });
  });

  return allLevels;
}

window.LEVELS_DATA = buildAllWorldsLevels();
