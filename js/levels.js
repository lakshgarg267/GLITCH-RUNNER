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
// 51-LEVEL COMPREHENSIVE CURRICULUM GENERATOR & DATA ENGINE
// ==========================================================================

// Curriculum topics blueprints for all 10 languages
const LANGUAGE_CURRICULUMS = {
  javascript: [
    // Area 1: Training Camp (Lv 1-8)
    { t: 'Console Output', c: 'console.log outputs messages or object states to the debug terminal.', m: 'glitch', code: `conzole.log("OPERATIVE DEPLOYED");`, q: 'A typo in the console call is crashing initial boot. Fix the identifier:', opts: ['console.log("OPERATIVE DEPLOYED");', 'print("OPERATIVE DEPLOYED");', 'terminal.write();', 'alert("DEPLOY");'], a: 0, h: 'Check the spelling of "console".' },
    { t: 'Const Declaration', c: 'const variables cannot be reassigned after declaration. Use let if the value changes.', m: 'runner', code: `const shields = 100;\nshields = 80;`, q: 'SPEED RUN: What error does reassigning a const throw?', opts: ['TypeError: Assignment to constant variable', 'ReferenceError: shields is not defined', 'SyntaxError: Unexpected token', 'EvalError: Unknown binding'], a: 0, h: 'const throws a TypeError upon reassignment.' },
    { t: 'Data Types', c: 'JavaScript has 7 primitive types: string, number, bigint, boolean, undefined, symbol, null.', m: 'detective', code: `let val = 42;\nconsole.log(typeof val);`, q: 'What is logged to the debug terminal?', opts: ['"number"', '"int"', '"float"', '"double"'], a: 0, h: 'JavaScript represents all numbers with the "number" type.' },
    { t: 'Basic Arithmetic', c: 'Arithmetic operators (+, -, *, /, %) perform math computations on numbers.', m: 'detective', code: `let energy = 15 % 4;\nconsole.log(energy);`, q: 'Evaluate the modulus remainder calculation:', opts: ['3', '3.75', '4', '1'], a: 0, h: '15 divided by 4 is 3 with a remainder of 3.' },
    { t: 'String Concatenation', c: 'Strings can be merged with the + operator or interpolation.', m: 'builder', codeBlocks: ['let sector = "SECTOR ";', 'let id = "07";', 'let name = sector + id;', 'console.log(name);'], correctOrder: [0, 1, 2, 3], q: 'Reassemble the string assembly pipeline:' },
    { t: 'Template Literals', c: 'Backticks (` `) allow embedded expressions using ${expression} syntax.', m: 'detective', code: `let score = 50;\nlet msg = \`Score: \${score * 2}\`;\nconsole.log(msg);`, q: 'What string does template literal interpolation produce?', opts: ['Score: 100', 'Score: ${score * 2}', 'Score: 50', 'SyntaxError'], a: 0, h: 'Expressions inside ${} are evaluated before interpolating.' },
    { t: 'Undefined vs Null', c: 'undefined means a variable has been declared but not assigned. null is an intentional absence of value.', m: 'detective', code: `let target;\nconsole.log(target);`, q: 'What is the default value of an uninitialized variable?', opts: ['undefined', 'null', '0', 'NaN'], a: 0, h: 'Uninitialized variables always evaluate to undefined.' },
    // BOSS 1: Level 8
    { t: 'THE SYNTAX BEAST', isBoss: true, name: 'THE SYNTAX BEAST', hp: 500, avatar: '👾', story: 'A ravenous token corruptor blocking the exit of Training Camp! It spits malformed keywords.', phases: [
      { q: 'PHASE 1: Syntax Beast hurls a variable trap! Which keyword declares a block-scoped reassignable variable?', opts: ['let', 'var', 'const', 'global'], a: 0 },
      { q: 'PHASE 2: Beast casts a NaN blast! What is typeof NaN?', opts: ['"number"', '"nan"', '"undefined"', '"string"'], a: 0 },
      { q: 'PHASE 3: Beast spits implicit coercion! What does "5" + 2 evaluate to?', opts: ['"52"', '7', 'NaN', 'TypeError'], a: 0 },
      { q: 'PHASE 4: Beast alters boolean states! Which value is falsy in JavaScript?', opts: ['0', '"false"', '[]', '{}'], a: 0 },
      { q: 'PHASE 5: FINAL STRIKE! How do you write a single-line comment in JavaScript?', opts: ['// comment', '# comment', '/* comment */', '<!-- comment -->'], a: 0 }
    ]},

    // Area 2: Variable Valley (Lv 9-16)
    { t: 'If-Else Branching', c: 'if evaluates a boolean expression to branch execution flow.', m: 'glitch', code: `let power = 90;\nif (power > 50) {\n  console.log("SAFE");\n} elze {\n  console.log("CRITICAL");\n}`, q: 'Syntax error in the alternate branch keyword. Repair the code:', opts: ['Change "elze" to "else"', 'Change if to while', 'Remove parentheses', 'Add semicolon after if'], a: 0 },
    { t: 'Strict Equality', c: '=== compares value and type without coercion; == performs type conversion.', m: 'runner', code: `let result = (0 === false);`, q: 'SPEED RUN: What is the boolean result of (0 === false)?', opts: ['false', 'true', 'undefined', 'TypeError'], a: 0 },
    { t: 'Logical AND (&&)', c: '&& returns true only if BOTH operands evaluate to truthy values.', m: 'detective', code: `let key = true;\nlet door = false;\nconsole.log(key && door);`, q: 'What is logged by the security check?', opts: ['false', 'true', 'null', 'undefined'], a: 0 },
    { t: 'Logical OR (||)', c: '|| returns true if at least one operand evaluates to truthy.', m: 'detective', code: `let pass = false || "ADMIN";\nconsole.log(pass);`, q: 'Short-circuit evaluation: What is the resulting value?', opts: ['"ADMIN"', 'false', 'true', 'null'], a: 0 },
    { t: 'Ternary Operator', c: 'condition ? exprIfTrue : exprIfFalse acts as an inline if-else.', m: 'builder', codeBlocks: ['let hp = 70;', 'let status = hp > 50 ? "STRONG" : "WEAK";', 'console.log(status);'], correctOrder: [0, 1, 2], q: 'Construct the ternary status evaluation:' },
    { t: 'Switch Statements', c: 'switch matches an expression against case clauses and requires break.', m: 'detective', code: `let mode = "DEFENSE";\nswitch (mode) {\n  case "ATTACK": console.log("ATK"); break;\n  case "DEFENSE": console.log("DEF"); break;\n}`, q: 'What message will the switch case trigger?', opts: ['DEF', 'ATK', 'DEFENSE', 'undefined'], a: 0 },
    { t: 'Nullish Coalescing', c: '?? returns the right-hand operand only if the left operand is null or undefined.', m: 'detective', code: `let input = 0;\nlet val = input ?? 100;\nconsole.log(val);`, q: 'Nullish check: 0 is not null/undefined. What is logged?', opts: ['0', '100', 'undefined', 'NaN'], a: 0 },
    // BOSS 2: Level 16
    { t: 'THE BOOLEAN HYDRA', isBoss: true, name: 'THE BOOLEAN HYDRA', hp: 600, avatar: '🐉', story: 'A multi-headed beast dwelling in the forks of Variable Valley, guarding the gates to Loop Factory.', phases: [
      { q: 'PHASE 1: Hydra attacks with negation! What does !!"" evaluate to?', opts: ['false', 'true', '""', 'undefined'], a: 0 },
      { q: 'PHASE 2: Hydra summons comparison ambiguity! What does null == undefined evaluate to?', opts: ['true', 'false', 'null', 'TypeError'], a: 0 },
      { q: 'PHASE 3: Hydra strikes with NOT operator! What does !0 evaluate to?', opts: ['true', 'false', '-1', 'null'], a: 0 },
      { q: 'PHASE 4: Hydra triggers short-circuit OR! What does false || null || "HERO" yield?', opts: ['"HERO"', 'false', 'null', 'true'], a: 0 },
      { q: 'PHASE 5: FINAL STRIKE! Which operator checks strict inequality?', opts: ['!==', '!=', '<>', 'not=='], a: 0 }
    ]},

    // Area 3: Loop Factory (Lv 17-24)
    { t: 'Standard For Loop', c: 'for(initialization; condition; increment) repeats code block execution.', m: 'glitch', code: `for (let i = 0 i < 3; i++) { // Missing semicolon separator\n  console.log(i);\n}`, q: 'The loop counter header has a syntax break. Fix the loop syntax:', opts: ['for (let i = 0; i < 3; i++)', 'for (let i = 0, i < 3, i++)', 'for i from 0 to 3', 'for (i <= 3)'], a: 0 },
    { t: 'While Loop', c: 'while executes code continuously as long as its condition remains true.', m: 'runner', code: `let n = 3;\nwhile (n > 0) {\n  n--;\n}`, q: 'SPEED RUN: How many times will the while loop body execute?', opts: ['3 times', '2 times', '4 times', 'Infinite'], a: 0 },
    { t: 'Loop Break Control', c: 'break immediately terminates the enclosing loop statement.', m: 'detective', code: `let count = 0;\nfor (let i = 0; i < 10; i++) {\n  if (i === 3) break;\n  count++;\n}\nconsole.log(count);`, q: 'What is the value of count when break triggers?', opts: ['3', '2', '4', '10'], a: 0 },
    { t: 'Loop Continue Control', c: 'continue skips the current iteration and proceeds to the next cycle.', m: 'detective', code: `let sum = 0;\nfor (let i = 1; i <= 4; i++) {\n  if (i === 2) continue;\n  sum += i;\n}\nconsole.log(sum);`, q: 'Sum skipping 2 (1 + 3 + 4): What is logged?', opts: ['8', '10', '7', '6'], a: 0 },
    { t: 'For..Of Iterable Loop', c: 'for..of iterates over iterable objects like Arrays and Strings.', m: 'builder', codeBlocks: ['const codes = [10, 20];', 'let total = 0;', 'for (const c of codes) {', '  total += c;', '}', 'console.log(total);'], correctOrder: [0, 1, 2, 3, 4, 5], q: 'Assemble the for..of array iteration accumulator:' },
    { t: 'Do..While Loop', c: 'do..while always executes its body at least once before testing condition.', m: 'detective', code: `let x = 10;\ndo {\n  x += 5;\n} while (x < 10);\nconsole.log(x);`, q: 'What is the final value of x?', opts: ['15', '10', '20', '5'], a: 0 },
    { t: 'Nested Loops', c: 'Nested loops execute the inner loop completely for each outer loop iteration.', m: 'detective', code: `let ticks = 0;\nfor (let i = 0; i < 2; i++) {\n  for (let j = 0; j < 3; j++) {\n    ticks++;\n  }\n}\nconsole.log(ticks);`, q: 'How many total iterations run in 2 x 3 nested loops?', opts: ['6', '5', '8', '4'], a: 0 },
    // BOSS 3: Level 24
    { t: 'THE INFINITE LOOP DEMON', isBoss: true, name: 'THE INFINITE LOOP DEMON', hp: 700, avatar: '🔄', story: 'A rogue process consuming 100% CPU cycles, trapping memory in an endless recurrence.', phases: [
      { q: 'PHASE 1: Demon challenges condition exit! What happens if a while loop condition never becomes false?', opts: ['Infinite loop / Program hangs', 'Loop stops after 100 iterations', 'Throws LoopOverflowError', 'Automatic garbage collection'], a: 0 },
      { q: 'PHASE 2: Demon casts For..In check! What does for..in iterate over in an object?', opts: ['Enumerable property keys', 'Array values only', 'Object memory addresses', 'Methods only'], a: 0 },
      { q: 'PHASE 3: Demon tests post-increment! If x = 5, what is the value of x++?', opts: ['5 (then becomes 6)', '6 immediately', '7', 'TypeError'], a: 0 },
      { q: 'PHASE 4: Demon strikes loop accumulation! What does [2, 4, 6].length return?', opts: ['3', '6', '2', '4'], a: 0 },
      { q: 'PHASE 5: FINAL STRIKE! Which keyword immediately aborts execution out of the current loop?', opts: ['break', 'exit', 'stop', 'halt'], a: 0 }
    ]},

    // Area 4: Function Station (Lv 25-32)
    { t: 'Function Declarations', c: 'Functions encapsulate reusable instructions and can accept parameters.', m: 'glitch', code: `funtion disarmTrap() {\n  return "DISARMED";\n}`, q: 'Syntax glitch in function declaration keyword. Correct the spelling:', opts: ['function disarmTrap() {', 'def disarmTrap():', 'fn disarmTrap()', 'func disarmTrap()'], a: 0 },
    { t: 'Arrow Functions', c: 'Arrow functions provide a concise syntax and lexical this binding.', m: 'runner', code: `const square = x => x * x;\nconsole.log(square(5));`, q: 'SPEED RUN: What is the output of square(5)?', opts: ['25', '10', '5', 'undefined'], a: 0 },
    { t: 'Default Parameters', c: 'Default function parameters allow named parameters to be initialized with defaults.', m: 'detective', code: `function fireBeam(power = 100) {\n  return power * 2;\n}\nconsole.log(fireBeam());`, q: 'Evaluating call with omitted parameter: What does fireBeam() return?', opts: ['200', 'NaN', 'undefined', '100'], a: 0 },
    { t: 'Rest Parameters (...args)', c: 'Rest parameter syntax represents an indefinite number of arguments as an array.', m: 'detective', code: `function sumAll(...nums) {\n  return nums.length;\n}\nconsole.log(sumAll(4, 8, 12, 16));`, q: 'How many arguments were packed into the rest parameter array?', opts: ['4', '40', '1', 'undefined'], a: 0 },
    { t: 'Return Values', c: 'A function immediately stops executing when return is reached and yields the value.', m: 'builder', codeBlocks: ['function computeShield(layer) {', '  let barrier = layer * 50;', '  return barrier;', '}', 'console.log(computeShield(2));'], correctOrder: [0, 1, 2, 3, 4], q: 'Assemble the shield calculation function pipeline:' },
    { t: 'Function Scope', c: 'Variables declared inside a function cannot be accessed from outside.', m: 'detective', code: `function test() {\n  let secret = 99;\n}\ntest();\n// console.log(secret);`, q: 'Accessing secret outside test() would throw which error?', opts: ['ReferenceError: secret is not defined', 'TypeError: secret is private', 'SyntaxError', 'NullPointerException'], a: 0 },
    { t: 'Closures & Encapsulation', c: 'A closure is the combination of a function bundled together with its lexical environment.', m: 'detective', code: `function makeAdder(x) {\n  return function(y) { return x + y; };\n}\nconst add5 = makeAdder(5);\nconsole.log(add5(10));`, q: 'Closure execution: What is logged?', opts: ['15', '5', '10', 'NaN'], a: 0 },
    // BOSS 4: Level 32
    { t: 'THE CLOSURE WRAITH', isBoss: true, name: 'THE CLOSURE WRAITH', hp: 800, avatar: '👻', story: 'A phantom haunting Function Station, sealing outer scope environments in spectral memory closures.', phases: [
      { q: 'PHASE 1: Wraith tests hoisting! Are function declarations hoisted in JavaScript?', opts: ['Yes, fully hoisted with definition', 'No, only variables hoist', 'Only in strict mode', 'Never'], a: 0 },
      { q: 'PHASE 2: Wraith tests Arrow this! How does an arrow function determine the value of "this"?', opts: ['Lexically from enclosing scope', 'From call-site dynamic binding', 'Always points to window', 'Undefined by default'], a: 0 },
      { q: 'PHASE 3: Wraith strikes IIFE! What does IIFE stand for?', opts: ['Immediately Invoked Function Expression', 'Inline Internal Function Evaluation', 'Interface Input Function Entry', 'Indexed Instance Function Execution'], a: 0 },
      { q: 'PHASE 4: Wraith challenges pure functions! What defines a pure function?', opts: ['Same inputs always return same output with no side effects', 'Uses no local variables', 'Returns a boolean', 'Runs synchronously in 1ms'], a: 0 },
      { q: 'PHASE 5: FINAL STRIKE! What is the default return value of a function that returns nothing explicitly?', opts: ['undefined', 'null', 'void', '0'], a: 0 }
    ]},

    // Area 5: Array Zone (Lv 33-40)
    { t: 'Array Push & Pop', c: 'push adds elements to the end; pop removes the last element.', m: 'glitch', code: `let inventory = ["potion", "shield"];\ninventory.push("sword");\nlet last = inventory.pop();\nconsole.log(inventory.length);`, q: 'After pushing "sword" and popping it back off, what is inventory.length?', opts: ['2', '3', '1', '0'], a: 0 },
    { t: 'Array.map Transformation', c: 'map creates a new array populated with the results of calling a provided function.', m: 'runner', code: `let nums = [1, 2, 3];\nlet doubled = nums.map(x => x * 2);\nconsole.log(doubled);`, q: 'SPEED RUN: What is the resulting array from doubled?', opts: ['[2, 4, 6]', '[1, 2, 3]', '[2, 2, 2]', '12'], a: 0 },
    { t: 'Array.filter Predicates', c: 'filter creates a shallow copy filtered down to elements that pass the test.', m: 'detective', code: `let scores = [45, 80, 95, 30];\nlet passing = scores.filter(s => s >= 70);\nconsole.log(passing.length);`, q: 'How many scores passed the filter test (>= 70)?', opts: ['2', '3', '1', '4'], a: 0 },
    { t: 'Array.reduce Accumulator', c: 'reduce executes a reducer function on each element resulting in a single value.', m: 'detective', code: `let vals = [10, 20, 30];\nlet total = vals.reduce((acc, curr) => acc + curr, 0);\nconsole.log(total);`, q: 'Sum of [10, 20, 30] via reduce:', opts: ['60', '0', '30', '102030'], a: 0 },
    { t: 'Array.slice vs Splice', c: 'slice extracts without mutating; splice modifies original array by adding/removing.', m: 'builder', codeBlocks: ['let items = ["A", "B", "C", "D"];', 'let portion = items.slice(1, 3);', 'console.log(portion);'], correctOrder: [0, 1, 2], q: 'Construct the non-mutating slice pipeline:' },
    { t: 'Array.includes Search', c: 'includes determines whether an array includes a certain value returning true/false.', m: 'detective', code: `let codes = [101, 204, 404, 500];\nconsole.log(codes.includes(404));`, q: 'What boolean does codes.includes(404) return?', opts: ['true', 'false', '1', '404'], a: 0 },
    { t: 'Array Destructuring', c: 'Array destructuring unpacks values from arrays into distinct variables.', m: 'detective', code: `const [primary, secondary] = ["CYAN", "MAGENTA", "YELLOW"];\nconsole.log(secondary);`, q: 'What value is assigned to the secondary variable?', opts: ['"MAGENTA"', '"CYAN"', '"YELLOW"', 'undefined'], a: 0 },
    // BOSS 5: Level 40
    { t: 'THE MUTATOR TITAN', isBoss: true, name: 'THE MUTATOR TITAN', hp: 900, avatar: '🗿', story: 'A hulking behemoth of raw contiguous memory in Array Zone, crushing corrupted buffers.', phases: [
      { q: 'PHASE 1: Titan mutates index zero! Which method removes the first element from an array?', opts: ['shift()', 'pop()', 'unshift()', 'slice()'], a: 0 },
      { q: 'PHASE 2: Titan queries every()! What does [2, 4, 6].every(x => x % 2 === 0) return?', opts: ['true', 'false', '[2, 4, 6]', 'undefined'], a: 0 },
      { q: 'PHASE 3: Titan tests Spread! What does [...[1, 2], ...[3, 4]] create?', opts: ['[1, 2, 3, 4]', '[[1, 2], [3, 4]]', '[10]', 'Error'], a: 0 },
      { q: 'PHASE 4: Titan tests find()! What does [10, 25, 40].find(x => x > 20) return?', opts: ['25', '40', '[25, 40]', 'true'], a: 0 },
      { q: 'PHASE 5: FINAL STRIKE! Does Array.sort() mutate the original array in JavaScript?', opts: ['Yes, it sorts in place and mutates', 'No, returns pure copy', 'Only numbers', 'Never'], a: 0 }
    ]},

    // Area 6: Object Fortress (Lv 41-48)
    { t: 'Object Literals', c: 'Objects store key-value pairs and collections of properties and methods.', m: 'glitch', code: `let bot = {\n  name: "G-Runner",\n  hp: 100 // Missing closing brace\nconsole.log(bot.name);`, q: 'A missing closing brace breaks object literal syntax. Fix the closure:', opts: ['Add }; after hp: 100', 'Replace : with =', 'Wrap in brackets []', 'Add var keyword'], a: 0 },
    { t: 'Object Destructuring', c: 'Destructuring unpacks properties from objects into named variables.', m: 'runner', code: `let operative = { callsign: "Ghost", rank: "Elite" };\nlet { callsign } = operative;\nconsole.log(callsign);`, q: 'SPEED RUN: What is the value of callsign?', opts: ['"Ghost"', '"Elite"', 'undefined', 'operative'], a: 0 },
    { t: 'Object.keys & values', c: 'Object.keys returns an array of property names; Object.values returns property values.', m: 'detective', code: `let stats = { atk: 50, def: 30, spd: 40 };\nconsole.log(Object.keys(stats).length);`, q: 'How many keys are in the stats object?', opts: ['3', '120', 'undefined', '0'], a: 0 },
    { t: 'Object Methods & "this"', c: 'Methods are functions stored as object properties. "this" refers to the owner object.', m: 'detective', code: `let warrior = {\n  power: 40,\n  strike() { return this.power * 2; }\n};\nconsole.log(warrior.strike());`, q: 'What is returned by warrior.strike()?', opts: ['80', '40', 'NaN', 'undefined'], a: 0 },
    { t: 'Spread Operator in Objects', c: 'Object spread copies enumerable properties from one object to a new object.', m: 'builder', codeBlocks: ['const base = { hp: 100 };', 'const buffed = { ...base, shield: 50 };', 'console.log(buffed.shield);'], correctOrder: [0, 1, 2], q: 'Construct object cloning and enhancement pipeline:' },
    { t: 'Optional Chaining (?.)', c: '?. returns undefined instead of throwing error if reference is nullish.', m: 'detective', code: `let user = {};\nconsole.log(user.profile?.avatar);`, q: 'What does user.profile?.avatar evaluate to?', opts: ['undefined', 'TypeError: Cannot read property', 'null', 'false'], a: 0 },
    { t: 'JSON Serialization', c: 'JSON.stringify converts objects to strings; JSON.parse converts string to object.', m: 'detective', code: `let data = { id: 7 };\nlet json = JSON.stringify(data);\nconsole.log(typeof json);`, q: 'What is the type of the serialized JSON result?', opts: ['"string"', '"object"', '"json"', '"binary"'], a: 0 },
    // BOSS 6: Level 48
    { t: 'THE PROTOTYPE LICH', isBoss: true, name: 'THE PROTOTYPE LICH', hp: 1000, avatar: '💀', story: 'An ancient undead entity residing in Object Fortress, manipulating prototypes and memory inheritance chains.', phases: [
      { q: 'PHASE 1: Lich tests prototype chain! Where do JavaScript objects inherit properties from?', opts: ['Their prototype object (__proto__)', 'The global window object', 'C++ compiler tables', 'Local storage cache'], a: 0 },
      { q: 'PHASE 2: Lich casts freeze! What does Object.freeze() do?', opts: ['Prevents adding, removing, or modifying properties', 'Deletes all keys', 'Converts object to string', 'Makes object async'], a: 0 },
      { q: 'PHASE 3: Lich strikes class syntax! Which keyword is used to inherit a class in ES6?', opts: ['extends', 'inherits', 'implements', 'subclass'], a: 0 },
      { q: 'PHASE 4: Lich summons constructor! What function runs automatically when instantiating a class with new?', opts: ['constructor()', 'init()', 'build()', 'create()'], a: 0 },
      { q: 'PHASE 5: FINAL STRIKE! What does Object.hasOwn(obj, "prop") check?', opts: ['Checks if prop is an own property of obj', 'Checks prototype methods', 'Deletes the prop', 'Freezes prop'], a: 0 }
    ]},

    // Area 7: Async Citadel & Final Boss (Lv 49-51)
    { t: 'Promises & Resolving', c: 'A Promise represents the eventual completion or failure of an asynchronous operation.', m: 'detective', code: `const p = Promise.resolve("ONLINE");\np.then(status => console.log(status));`, q: 'What message is logged when the promise resolves?', opts: ['ONLINE', 'Promise { <pending> }', 'undefined', 'null'], a: 0 },
    { t: 'Async / Await Flow', c: 'async functions return promises; await pauses execution until promise settles.', m: 'builder', codeBlocks: ['async function fetchCore() {', '  let data = await Promise.resolve("CORE ACTIVE");', '  return data;', '}', 'fetchCore().then(console.log);'], correctOrder: [0, 1, 2, 3, 4], q: 'Construct async/await data retrieval sequence:' },
    // FINAL BOSS: Level 51
    { t: 'THE EVENT LOOP SOVEREIGN', isBoss: true, isFinalBoss: true, name: 'THE EVENT LOOP SOVEREIGN', hp: 1200, avatar: '👑', story: 'THE SUPREME ARCHITECT OF JAVASCRIPT! It rules the Call Stack, Microtask Queue, and V8 Runtime. Defeat it to achieve complete JavaScript Mastery!', phases: [
      { q: 'PHASE 1: Sovereign challenges Microtasks! Which queue executes first after the call stack clears: Microtasks (Promises) or Macrotasks (setTimeout)?', opts: ['Microtask Queue (Promises)', 'Macrotask Queue (setTimeout)', 'They run at the exact same time', 'Macrotasks always take priority'], a: 0 },
      { q: 'PHASE 2: Sovereign tests Promise.all! What happens if one promise rejects in Promise.all()?', opts: ['The entire Promise.all immediately rejects', 'It ignores the error and returns rest', 'It retries 3 times', 'It resolves with null'], a: 0 },
      { q: 'PHASE 3: Sovereign tests try/catch with async! Which statement catches errors from an awaited promise?', opts: ['try { ... } catch (err) { ... }', 'catchAsync { ... }', 'onerror = callback', 'await.catch()'], a: 0 },
      { q: 'PHASE 4: Sovereign unleashes Event Loop core! Is JavaScript fundamentally single-threaded or multi-threaded?', opts: ['Single-threaded with non-blocking event loop', 'Multi-threaded with 8 CPU cores', 'Dual-threaded OS processes', 'Hardware asynchronous threads'], a: 0 },
      { q: 'PHASE 5: MASTER STRIKE! What keyword exports functions or objects from an ES6 module?', opts: ['export', 'publish', 'expose', 'module.out'], a: 0 }
    ]}
  ],

  // Generic Blueprint Generator for other languages (Python, C, Java, HTML, etc.)
  createLanguageCurriculum: function(langId, langName) {
    const list = [];
    const worldConf = window.WORLDS_CONFIG.find(w => w.id === langId) || { areas: [] };
    const areas = worldConf.areas || [];

    for (let lvl = 1; lvl <= 51; lvl++) {
      const areaIndex = Math.min(Math.floor((lvl - 1) / 8), areas.length - 1);
      const area = areas[areaIndex] || { name: `Sector ${areaIndex + 1}` };
      const isBoss = (lvl % 8 === 0) || (lvl === 51);

      if (isBoss) {
        const isFinal = (lvl === 51);
        const bossName = isFinal ? `${langName.toUpperCase()} MASTER TITAN` : `BOSS ${Math.floor(lvl / 8)}: ${area.bossName || 'SECTOR GUARDIAN'}`;
        list.push({
          t: bossName,
          isBoss: true,
          isFinalBoss: isFinal,
          name: bossName,
          hp: 500 + lvl * 10,
          avatar: isFinal ? '👑' : (lvl % 16 === 0 ? '🐲' : '👹'),
          story: `A colossal corrupted guardian commanding ${area.name}. Defeat its 5 coding challenge waves to liberate this sector!`,
          phases: [
            { q: `PHASE 1: ${bossName} challenges core ${langName} syntax! What is the primary compilation/runtime model of ${langName}?`, opts: ['Valid standard language execution specification', 'Unchecked dynamic byte corruptor', 'Random script interpreter', 'Binary machine malfunction'], a: 0 },
            { q: `PHASE 2: ${bossName} tests condition branches in ${langName}! Which keyword handles conditional branches?`, opts: ['if', 'branch', 'switch_case_only', 'goto_only'], a: 0 },
            { q: `PHASE 3: ${bossName} strikes with loop iteration! How do repeated tasks run in ${langName}?`, opts: ['Loops (for, while)', 'Manual duplicated code only', 'Terminal crash loops', 'Timer interrupts only'], a: 0 },
            { q: `PHASE 4: ${bossName} demands functional modularity! What construct encapsulates reusable logic?`, opts: ['Functions / Methods', 'Global raw variables only', 'Comments', 'Header guards only'], a: 0 },
            { q: `PHASE 5: FINAL STRIKE! What ensures reliable, bug-free execution in ${langName}?`, opts: ['Proper syntax, error handling, and clean code structure', 'Ignoring compiler warnings', 'Infinite recursive loops', 'Deleting variable declarations'], a: 0 }
          ]
        });
      } else {
        const mode = (lvl % 4 === 1) ? 'glitch' : (lvl % 4 === 2 ? 'runner' : (lvl % 4 === 3 ? 'detective' : 'builder'));
        list.push({
          t: `${langName} Protocol ${lvl}`,
          c: `Core programming concept testing ${langName} operational integrity in ${area.name}.`,
          m: mode,
          q: `MISSION ${lvl}: Neutralize the corrupted ${langName} anomaly in ${area.name}.`,
          code: `// ${langName} Sector Mission ${lvl}\nfunction verifySystem() {\n  return "SYSTEM SECURE";\n}`,
          opts: ['Apply correct syntax and execute', 'Bypass error check', 'Crash compiler process', 'Skip instruction pointer'],
          a: 0,
          h: `Follow standard ${langName} best practices and language syntax rules.`,
          codeBlocks: ['// Step 1: Initialize', 'let state = "READY";', 'if (state === "READY") {', '  executeProtocol();', '}'],
          correctOrder: [0, 1, 2, 3, 4]
        });
      }
    }
    return list;
  }
};

// Generate full level objects for all 10 languages
function buildAllWorldsLevels() {
  const allLevels = [];

  window.WORLDS_CONFIG.forEach(world => {
    let rawList = LANGUAGE_CURRICULUMS[world.id];
    if (!rawList) {
      rawList = LANGUAGE_CURRICULUMS.createLanguageCurriculum(world.id, world.name);
    }

    rawList.forEach((item, index) => {
      const lvlNum = index + 1;
      const areaIndex = Math.min(Math.floor((lvlNum - 1) / 8), world.areas.length - 1);
      const area = world.areas[areaIndex] || { name: `Sector ${areaIndex + 1}` };

      const levelId = `${world.id}_lvl_${lvlNum}`;
      const isBoss = item.isBoss || false;

      const levelObj = {
        id: levelId,
        worldId: world.id,
        areaId: area.id || `area_${areaIndex + 1}`,
        areaName: area.name,
        levelNumber: lvlNum,
        title: item.t || `${world.name} Mission ${lvlNum}`,
        difficulty: isBoss ? 'Boss Event' : (lvlNum > 35 ? 'Advanced' : (lvlNum > 16 ? 'Medium' : 'Novice')),
        mode: isBoss ? 'boss' : (item.m || 'detective'),
        concept: item.c || `Mastering ${item.t} in ${world.name}.`,
        story: item.story || `Operative deployed to ${area.name}. A corrupted glitch node is destabilizing sector subroutines. Neutralize it!`,
        targetEnemy: {
          name: isBoss ? item.name : `GLITCH NODE #${lvlNum}`,
          avatar: isBoss ? item.avatar : (lvlNum % 3 === 0 ? '👾' : (lvlNum % 2 === 0 ? '🤖' : '🐛')),
          hp: isBoss ? item.hp : 100
        },
        question: item.q || `Solve the challenge to purify the corrupted ${world.name} node:`,
        code: item.code || null,
        options: item.opts || ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: item.a !== undefined ? item.a : 0,
        hint: item.h || `Remember ${world.name} syntax and execution rules.`,
        explanation: `Success! You repaired the code anomaly and restored sector telemetry.`,
        codeBlocks: item.codeBlocks || null,
        correctOrder: item.correctOrder || null,
        phases: item.phases || null,
        bossData: isBoss ? { name: item.name, avatar: item.avatar, hp: item.hp, damagePerHit: 100 } : null,
        timeLimitSeconds: (item.m === 'runner' ? 40 : null),
        xpReward: isBoss ? (item.isFinalBoss ? 1500 : 600) : (100 + lvlNum * 5),
        coinReward: isBoss ? (item.isFinalBoss ? 500 : 200) : (30 + Math.floor(lvlNum * 1.5))
      };

      allLevels.push(levelObj);
    });
  });

  return allLevels;
}

window.LEVELS_DATA = buildAllWorldsLevels();
