/**
 * GLITCH RUNNER - JAVASCRIPT CURRICULUM (51 LEVELS)
 * Areas:
 * Area 1: Training Camp (Lv 1-8, Boss: THE SYNTAX BEAST)
 * Area 2: Variable Valley (Lv 9-16, Boss: THE BOOLEAN HYDRA)
 * Area 3: Loop Factory (Lv 17-24, Boss: THE INFINITE LOOP DEMON)
 * Area 4: Function Station (Lv 25-32, Boss: THE CLOSURE WRAITH)
 * Area 5: Array Zone (Lv 33-40, Boss: THE MUTATOR TITAN)
 * Area 6: Object Fortress (Lv 41-48, Boss: THE PROTOTYPE LICH)
 * Area 7: Async Citadel (Lv 49-51, Final Boss: THE EVENT LOOP SOVEREIGN)
 */

window.CURRICULUM_DATA = window.CURRICULUM_DATA || {};

window.CURRICULUM_DATA.javascript = [
  // =========================================================================
  // AREA 1: TRAINING CAMP (Lv 1-8) - FOUNDATION
  // =========================================================================
  {
    t: 'Console Diagnostics',
    c: 'console.log outputs messages and variable states to the debug terminal.',
    m: 'glitch',
    code: `conzole.log("OPERATIVE ACTIVE");`,
    q: 'A syntax bug prevents the terminal from booting. Identify the corrected statement:',
    opts: [
      'print("OPERATIVE ACTIVE");',
      'console.log("OPERATIVE ACTIVE");',
      'System.out.println("OPERATIVE ACTIVE");',
      'terminal.write("OPERATIVE ACTIVE");'
    ],
    a: 1,
    h: 'Check the spelling of the standard browser and Node output object: "console".',
    explanation: 'JavaScript uses the global `console` object with its `.log()` method for standard output. Correcting "conzole" to "console" resolves the ReferenceError.'
  },
  {
    t: 'Constant Integrity',
    c: 'const declarations create block-scoped, immutable bindings. Reassignment throws a TypeError.',
    m: 'runner',
    code: `const maxShields = 100;\nmaxShields = 120;\nconsole.log(maxShields);`,
    q: 'SPEED RUN: What happens when the interpreter executes the reassignment to maxShields?',
    opts: [
      'Outputs 120 with a warning',
      'maxShields silently ignores the update and stays 100',
      'TypeError: Assignment to constant variable',
      'ReferenceError: maxShields is not defined'
    ],
    a: 2,
    h: 'Variables declared with const cannot be rebound to a new primitive value.',
    explanation: 'Variables declared with `const` cannot be reassigned once bound. Attempting to assign a new value throws an uncaught `TypeError: Assignment to constant variable`.'
  },
  {
    t: 'Primitive Types',
    c: 'typeof operator returns a string indicating the type of the unevaluated operand.',
    m: 'detective',
    code: `let corePower = 42;\nconsole.log(typeof corePower);`,
    q: 'OUTPUT DETECTIVE: What string does typeof corePower log?',
    opts: [
      '"int"',
      '"float"',
      '"number"',
      '"numeric"'
    ],
    a: 2,
    h: 'JavaScript does not separate integer and floating point into distinct primitive types.',
    explanation: 'In JavaScript, both integer and floating-point values belong to the single primitive type `"number"` (IEEE 754 double-precision float).'
  },
  {
    t: 'Modulus Calculations',
    c: 'The remainder operator (%) returns the remainder left over when one operand is divided by a second.',
    m: 'detective',
    code: `let packets = 19 % 4;\nconsole.log(packets);`,
    q: 'OUTPUT DETECTIVE: What is the calculated remainder logged to the console?',
    opts: [
      '3',
      '4',
      '4.75',
      '1'
    ],
    a: 0,
    h: '4 goes into 19 four times (16), leaving a remainder of 3.',
    explanation: '19 divided by 4 equals 4 with a remainder of 3 (4 * 4 = 16; 19 - 16 = 3). Therefore `19 % 4` evaluates to `3`.'
  },
  {
    t: 'String Assembly',
    c: 'Strings can be concatenated using the + operator or backtick template literals.',
    m: 'builder',
    codeBlocks: [
      'const sector = "GRID-";',
      'const node = 7;',
      'const target = sector + node;',
      'console.log(target);'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Reassemble the sequence to assemble and log the target sector string "GRID-7":',
    h: 'First define the string sector, then the node number, concatenate them, and finally log.',
    explanation: 'Declaring the sector string first, followed by the node number, concatenating with `+` (which coerces node to a string), and logging produces "GRID-7".'
  },
  {
    t: 'Template Literals',
    c: 'Template literals use backticks (` `) and allow embedded expressions via ${expression}.',
    m: 'completion',
    code: `const agent = "Cipher";\nconst level = 5;\nconst mission = ___;\nconsole.log(mission);`,
    q: 'CODE COMPLETION: Choose the expression that produces "Agent Cipher is Level 10":',
    opts: [
      '`Agent ${agent} is Level ${level * 2}`',
      '"Agent ${agent} is Level ${level * 2}"',
      '`Agent $agent is Level $level * 2`',
      '"Agent " + agent + " is Level " + level * 2'
    ],
    a: 0,
    h: 'Template literals require backticks (` `) and ${} wrappers for expression evaluation.',
    explanation: 'Backtick template literals evaluate JS expressions inside `${}`. Here `${level * 2}` evaluates to 10, producing "Agent Cipher is Level 10".'
  },
  {
    t: 'Undefined vs Null',
    c: 'undefined is the default value of uninitialized variables; null is an explicit assignment of intentional absence.',
    m: 'detective',
    code: `let unitA;\nlet unitB = null;\nconsole.log(typeof unitA, typeof unitB);`,
    q: 'OUTPUT DETECTIVE: What does typeof log for unassigned unitA and null unitB?',
    opts: [
      '"undefined" "undefined"',
      '"undefined" "null"',
      '"undefined" "object"',
      '"null" "object"'
    ],
    a: 2,
    h: 'Remember the infamous historical JS bug where typeof null returns "object".',
    explanation: 'An unassigned `let` variable is `"undefined"`. Due to a legacy design quirk in JavaScript since 1995, `typeof null` returns `"object"`.'
  },
  // BOSS 1: Level 8
  {
    t: 'THE SYNTAX BEAST',
    isBoss: true,
    name: 'THE SYNTAX BEAST',
    hp: 500,
    avatar: '👾',
    story: 'A ravenous token corruptor blocking the exit of Training Camp! It spits malformed keywords.',
    phases: [
      {
        q: 'PHASE 1: The Beast hurls a scope trap! Which keyword declares a block-scoped reassignable variable?',
        opts: ['var', 'let', 'const', 'global'],
        a: 1,
        explanation: '`let` declares block-scoped variables that can be reassigned. `var` is function-scoped and `const` cannot be reassigned.'
      },
      {
        q: 'PHASE 2: The Beast casts a NaN blast! What is typeof NaN in JavaScript?',
        opts: ['"nan"', '"undefined"', '"number"', '"symbol"'],
        a: 2,
        explanation: 'In JavaScript, `NaN` stands for "Not a Number", but its formal IEEE-754 representation is a numeric type, so `typeof NaN === "number"`.'
      },
      {
        q: 'PHASE 3: Beast triggers implicit string coercion! What does "8" + 2 evaluate to?',
        opts: ['10', '"82"', 'NaN', 'TypeError'],
        a: 1,
        explanation: 'When one operand in a `+` operation is a string, JavaScript converts the other operand to a string and concatenates them, producing `"82"`.'
      },
      {
        q: 'PHASE 4: Beast alters boolean states! Which of the following is considered truthy in JavaScript?',
        opts: ['0', '""', '"0"', 'NaN'],
        a: 2,
        explanation: 'Empty string `""`, `0`, and `NaN` are all falsy. Non-empty strings, including `"0"`, evaluate to truthy!'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which operator checks strict equality without implicit type coercion?',
        opts: ['==', '===', '!=', '='],
        a: 1,
        explanation: 'The triple equals operator (`===`) strictly compares both value and type without performing type coercion.'
      }
    ]
  },

  // =========================================================================
  // AREA 2: VARIABLE VALLEY (Lv 9-16) - CORE LOGIC
  // =========================================================================
  {
    t: 'If-Else Conditionals',
    c: 'if statements evaluate expressions for truthiness and route execution branching.',
    m: 'glitch',
    code: `let health = 45;\nif health < 50 {\n  console.log("MEDPACK REQUIRED");\n}`,
    q: 'BUG HUNTER: Why does the if statement fail to compile in JavaScript?',
    opts: [
      'The variable health must be declared with const',
      'The if condition must be enclosed in parentheses (health < 50)',
      'The console.log requires double semicolons',
      'Comparison operator < is invalid in if statements'
    ],
    a: 1,
    h: 'In JavaScript, if condition expressions must always be wrapped in ( ... ).',
    explanation: 'Unlike Python or Go, JavaScript requires parentheses around the condition expression in `if (health < 50)`.'
  },
  {
    t: 'Strict vs Loose Equality',
    c: '=== requires identical types and values; == coerces types before comparison.',
    m: 'runner',
    code: `const test1 = (0 == false);\nconst test2 = (0 === false);\nconsole.log(test1, test2);`,
    q: 'SPEED RUN: What is printed by console.log(test1, test2)?',
    opts: [
      'true true',
      'false false',
      'true false',
      'false true'
    ],
    a: 2,
    h: 'Loose equality coerces 0 and false to 0 == 0; strict equality notes number !== boolean.',
    explanation: '`0 == false` coerces `false` to numeric `0`, returning `true`. But `0 === false` compares number to boolean without coercion, returning `false`.'
  },
  {
    t: 'Logical AND Short-Circuit',
    c: '&& evaluates left-to-right; returns the first falsy operand, or the last operand if all are truthy.',
    m: 'detective',
    code: `let isArmed = true;\nlet targetAcquired = "TARGET LOCKED";\nlet result = isArmed && targetAcquired;\nconsole.log(result);`,
    q: 'OUTPUT DETECTIVE: What value is assigned to result?',
    opts: [
      'true',
      '"TARGET LOCKED"',
      'false',
      'undefined'
    ],
    a: 1,
    h: 'If the first operand is truthy, && returns the second operand value itself, not just a boolean.',
    explanation: 'In JavaScript, `&&` short-circuits: since `isArmed` is truthy, the evaluation continues and returns the actual value of `targetAcquired` ("TARGET LOCKED").'
  },
  {
    t: 'Logical OR Defaulting',
    c: '|| returns the first truthy value encountered, or the last value if none are truthy.',
    m: 'detective',
    code: `let userInput = "";\nlet username = userInput || "GUEST_OPERATIVE";\nconsole.log(username);`,
    q: 'OUTPUT DETECTIVE: An empty string "" is falsy. What does username contain?',
    opts: [
      '""',
      '"GUEST_OPERATIVE"',
      'undefined',
      'null'
    ],
    a: 1,
    h: 'Empty string evaluates to falsy, so || falls back to the right-hand operand.',
    explanation: 'Because `""` is falsy, the `||` operator falls back to the second operand, assigning `"GUEST_OPERATIVE"`.'
  },
  {
    t: 'Ternary Operator Structure',
    c: 'The conditional (ternary) operator takes three operands: condition ? exprIfTrue : exprIfFalse.',
    m: 'builder',
    codeBlocks: [
      'let powerLevel = 85;',
      'let alertColor = powerLevel > 75 ? "RED" : "BLUE";',
      'console.log(alertColor);'
    ],
    correctOrder: [0, 1, 2],
    q: 'CODE BUILDER: Assemble the inline conditional status evaluator:',
    h: 'Initialize powerLevel, then evaluate alertColor with ternary, then print.',
    explanation: 'The power level is checked: since 85 > 75 is true, alertColor receives "RED" and is logged.'
  },
  {
    t: 'Switch Statements & Break',
    c: 'switch statements execute matching case clauses. Missing a break causes fall-through.',
    m: 'detective',
    code: `let mode = "STEALTH";\nlet output = "";\nswitch (mode) {\n  case "STEALTH": output += "S";\n  case "ASSAULT": output += "A"; break;\n  default: output += "D";\n}\nconsole.log(output);`,
    q: 'OUTPUT DETECTIVE: Case "STEALTH" lacks a break statement! What is the final output?',
    opts: [
      '"S"',
      '"SA"',
      '"SAD"',
      '"A"'
    ],
    a: 1,
    h: 'Without a break after case "STEALTH", execution falls through directly into case "ASSAULT".',
    explanation: 'Because there is no `break` at the end of `case "STEALTH"`, execution falls through to `case "ASSAULT"`, appending both "S" and "A" before encountering break.'
  },
  {
    t: 'Nullish Coalescing (??)',
    c: '?? returns the right-hand side only if the left-hand operand is null or undefined (not 0 or false).',
    m: 'detective',
    code: `let damageScore = 0;\nlet finalScore = damageScore ?? 100;\nconsole.log(finalScore);`,
    q: 'OUTPUT DETECTIVE: What is printed? (Remember: 0 is falsy, but not nullish)',
    opts: [
      '100',
      '0',
      'undefined',
      'NaN'
    ],
    a: 1,
    h: 'The ?? operator only checks for null or undefined. 0 is a defined number.',
    explanation: 'Unlike `||` which treats `0` as falsy, `??` only falls back for `null` or `undefined`. Because `damageScore` is `0`, `finalScore` is `0`.'
  },
  // BOSS 2: Level 16
  {
    t: 'THE BOOLEAN HYDRA',
    isBoss: true,
    name: 'THE BOOLEAN HYDRA',
    hp: 600,
    avatar: '🐉',
    story: 'A multi-headed beast dwelling in the forks of Variable Valley, guarding the gates to Loop Factory.',
    phases: [
      {
        q: 'PHASE 1: Hydra attacks with double negation! What does !!"" evaluate to?',
        opts: ['true', 'false', '""', 'undefined'],
        a: 1,
        explanation: '`!""` converts empty string to `true`, and `!!""` negates it back to boolean `false`.'
      },
      {
        q: 'PHASE 2: Hydra summons loose comparison edge cases! What does null == undefined evaluate to?',
        opts: ['false', 'true', 'null', 'TypeError'],
        a: 1,
        explanation: 'By ECMA-262 specification rules, `null == undefined` is explicitly defined to evaluate to `true` (though strictly `null === undefined` is false).'
      },
      {
        q: 'PHASE 3: Hydra tests short-circuiting! What does false || null || "DEFENSE" return?',
        opts: ['false', 'null', '"DEFENSE"', 'true'],
        a: 2,
        explanation: 'The `||` operator returns the first truthy operand. Both `false` and `null` are falsy, so it yields `"DEFENSE"`.'
      },
      {
        q: 'PHASE 4: Hydra tests truthy arrays! What does Boolean([]) evaluate to?',
        opts: ['false', 'true', 'undefined', 'null'],
        a: 1,
        explanation: 'All objects and arrays in JavaScript are truthy, even empty ones like `[]` or `{}`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which expression checks if variable x is neither null nor undefined?',
        opts: ['x !== null && x !== undefined', 'x == false', 'x.isDefined()', '!x'],
        a: 0,
        explanation: '`x !== null && x !== undefined` (or `x != null`) explicitly checks that a value is not nullish without incorrectly rejecting 0, false, or "".'
      }
    ]
  },

  // =========================================================================
  // AREA 3: LOOP FACTORY (Lv 17-24) - LOOPS & ITERATION
  // =========================================================================
  {
    t: 'For Loop Syntax Header',
    c: 'for(initialization; condition; increment) coordinates loop iterations separated by semicolons.',
    m: 'glitch',
    code: `for (let i = 0, i < 5, i++) {\n  console.log(i);\n}`,
    q: 'BUG HUNTER: The loop header crashes with a SyntaxError. What is the bug?',
    opts: [
      'let cannot be used inside for loop headers',
      'The loop header clauses must be separated by semicolons (;), not commas (,)',
      'i++ is not supported in for loops; must use i = i + 1',
      'Loop condition must use <= instead of <'
    ],
    a: 1,
    h: 'For loops require two semicolons separating initialization, condition, and increment.',
    explanation: 'The three clauses in a classic `for` loop header must be separated by semicolons: `for (let i = 0; i < 5; i++)`.'
  },
  {
    t: 'While Loop Iteration Count',
    c: 'while loops continue running as long as the condition evaluates to true.',
    m: 'runner',
    code: `let energy = 12;\nlet cycles = 0;\nwhile (energy > 0) {\n  energy -= 4;\n  cycles++;\n}\nconsole.log(cycles);`,
    q: 'SPEED RUN: How many total cycles run before energy reaches 0?',
    opts: [
      '2',
      '3',
      '4',
      'Infinite'
    ],
    a: 1,
    h: '12 - 4 = 8 (cycle 1), 8 - 4 = 4 (cycle 2), 4 - 4 = 0 (cycle 3, loop ends).',
    explanation: 'Cycle 1: energy 8; Cycle 2: energy 4; Cycle 3: energy 0. The condition `0 > 0` is false, terminating after 3 cycles.'
  },
  {
    t: 'Loop Break Control',
    c: 'break immediately terminates the nearest enclosing loop.',
    m: 'detective',
    code: `let targetFound = -1;\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) {\n    targetFound = i;\n    break;\n  }\n}\nconsole.log(targetFound);`,
    q: 'OUTPUT DETECTIVE: What value of targetFound is logged?',
    opts: [
      '1',
      '3',
      '5',
      '-1'
    ],
    a: 1,
    h: 'The loop hits i === 3, sets targetFound = 3, and breaks immediately.',
    explanation: 'When `i` reaches 3, the `if` condition succeeds, `targetFound` is assigned 3, and `break` exits the loop before any further cycles.'
  },
  {
    t: 'Loop Continue Control',
    c: 'continue skips the rest of the current iteration and jumps to the next cycle.',
    m: 'detective',
    code: `let sum = 0;\nfor (let i = 1; i <= 4; i++) {\n  if (i === 2) continue;\n  sum += i;\n}\nconsole.log(sum);`,
    q: 'OUTPUT DETECTIVE: i=2 is skipped by continue. What is the sum (1 + 3 + 4)?',
    opts: [
      '10',
      '8',
      '7',
      '6'
    ],
    a: 1,
    h: 'Calculate 1 + 3 + 4, skipping 2.',
    explanation: 'Iterations: i=1 (sum=1), i=2 (continue skips), i=3 (sum=4), i=4 (sum=8). Final sum is 8.'
  },
  {
    t: 'For..Of Iterable Aggregator',
    c: 'for..of iterates directly over the values of an iterable collection such as an Array.',
    m: 'builder',
    codeBlocks: [
      'const signals = [10, 20, 30];',
      'let totalPower = 0;',
      'for (const sig of signals) {',
      '  totalPower += sig;',
      '}',
      'console.log(totalPower);'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Construct the for..of array iteration pipeline:',
    h: 'Define signals array, initialize totalPower to 0, loop with for..of, accumulate, log.',
    explanation: 'The `for..of` statement iterates over array values (10, 20, 30), accumulating them into `totalPower` which equals 60.'
  },
  {
    t: 'Do..While Minimum Execution',
    c: 'do..while always executes the block at least once before testing the loop condition.',
    m: 'detective',
    code: `let count = 100;\ndo {\n  count += 5;\n} while (count < 100);\nconsole.log(count);`,
    q: 'OUTPUT DETECTIVE: count < 100 is false initially! What is the logged value of count?',
    opts: [
      '100',
      '105',
      '0',
      'NaN'
    ],
    a: 1,
    h: 'The body of do..while always runs at least once before checking the condition.',
    explanation: 'Because `do..while` evaluates the condition *after* the body executes, `count` increases from 100 to 105. Then `105 < 100` is false, ending the loop.'
  },
  {
    t: 'For..In vs For..Of',
    c: 'for..in iterates over keys/indices (as strings); for..of iterates over collection values.',
    m: 'detective',
    code: `const arr = ["A", "B"];\nlet keys = "";\nfor (const k in arr) {\n  keys += k;\n}\nconsole.log(keys);`,
    q: 'OUTPUT DETECTIVE: What does for..in iterate over when used on an Array?',
    opts: [
      '"AB"',
      '"01"',
      '0',
      'undefined'
    ],
    a: 1,
    h: 'for..in inspects enumerable property keys/indices ("0", "1").',
    explanation: '`for..in` iterates over the enumerable property names (indices) of an object. For `["A", "B"]`, the keys are `"0"` and `"1"`, producing `"01"`.'
  },
  // BOSS 3: Level 24
  {
    t: 'THE INFINITE LOOP DEMON',
    isBoss: true,
    name: 'THE INFINITE LOOP DEMON',
    hp: 700,
    avatar: '🔄',
    story: 'A rogue process consuming 100% CPU cycles, trapping memory in an endless recurrence.',
    phases: [
      {
        q: 'PHASE 1: Demon challenges exit conditions! What causes an infinite while loop?',
        opts: [
          'Using let instead of const',
          'A loop condition that never becomes false',
          'Omitting a return statement',
          'Using console.log inside the loop'
        ],
        a: 1,
        explanation: 'A `while` loop runs until its condition evaluates to false. If the condition never changes to false, the loop hangs forever.'
      },
      {
        q: 'PHASE 2: Demon tests post-increment evaluation! If let x = 5, what does x++ evaluate to in that expression?',
        opts: ['6', '5', '4', 'TypeError'],
        a: 1,
        explanation: 'Post-increment (`x++`) returns the current value (`5`) first, then increments `x` to `6` afterwards.'
      },
      {
        q: 'PHASE 3: Demon tests nested loop complexity! How many times does the inner body run in 3 x 4 nested loops?',
        opts: ['7', '12', '16', '24'],
        a: 1,
        explanation: 'For each of the 3 outer iterations, the inner loop runs 4 times. 3 * 4 = 12 total iterations.'
      },
      {
        q: 'PHASE 4: Demon challenges break behavior! What does break do inside nested loops?',
        opts: [
          'Terminates only the innermost enclosing loop',
          'Terminates all outer loops simultaneously',
          'Stops the whole program process',
          'Restarts the current iteration'
        ],
        a: 0,
        explanation: 'By default, `break` only exits the innermost enclosing loop that contains it (unless a labeled break is used).'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which keyword skips directly to the next iteration of a loop?',
        opts: ['skip', 'pass', 'continue', 'next'],
        a: 2,
        explanation: 'The `continue` statement skips remaining statements in the current iteration and jumps to the next cycle.'
      }
    ]
  },

  // =========================================================================
  // AREA 4: FUNCTION STATION (Lv 25-32) - FUNCTIONS & MODULARITY
  // =========================================================================
  {
    t: 'Function Declarations',
    c: 'Function declarations define named reusable blocks of code and are hoisted to the top of their scope.',
    m: 'glitch',
    code: `funtion disarmCore() {\n  return "DISARMED";\n}`,
    q: 'BUG HUNTER: Fix the typo in the function keyword declaration:',
    opts: [
      'def disarmCore() {',
      'fn disarmCore() {',
      'function disarmCore() {',
      'func disarmCore() {'
    ],
    a: 2,
    h: 'JavaScript uses the full keyword "function".',
    explanation: 'In JavaScript, function declarations begin with the `function` keyword. "funtion" causes a SyntaxError.'
  },
  {
    t: 'Arrow Function Return',
    c: 'Single-expression arrow functions support implicit returns without curly braces.',
    m: 'runner',
    code: `const calcShield = radius => radius * 25;\nconsole.log(calcShield(4));`,
    q: 'SPEED RUN: What does calcShield(4) return?',
    opts: [
      '25',
      '100',
      'undefined',
      '4'
    ],
    a: 1,
    h: 'Multiply parameter 4 by 25.',
    explanation: 'The arrow function `radius => radius * 25` implicitly returns `4 * 25`, which equals `100`.'
  },
  {
    t: 'Default Parameters',
    c: 'Default function parameters allow named parameters to be initialized with default values if no value is passed.',
    m: 'detective',
    code: `function fireLaser(charge = 50, burst = 2) {\n  return charge * burst;\n}\nconsole.log(fireLaser(100));`,
    q: 'OUTPUT DETECTIVE: charge is 100, burst is omitted. What is the return value?',
    opts: [
      '200',
      '100',
      '50',
      'NaN'
    ],
    a: 0,
    h: 'charge uses the passed argument 100, while burst uses its default value 2.',
    explanation: 'Calling `fireLaser(100)` sets `charge = 100` and uses the default `burst = 2`. 100 * 2 = 200.'
  },
  {
    t: 'Rest Parameters (...args)',
    c: 'Rest parameters gather all remaining arguments into a genuine Array instance.',
    m: 'detective',
    code: `function scanNetwork(...nodes) {\n  return nodes.length;\n}\nconsole.log(scanNetwork("A", "B", "C", "D"));`,
    q: 'OUTPUT DETECTIVE: How many items were gathered into the nodes rest array?',
    opts: [
      '1',
      '4',
      'undefined',
      '0'
    ],
    a: 1,
    h: 'Count the arguments passed to scanNetwork.',
    explanation: 'The `...nodes` rest parameter captures all 4 arguments into an array `["A", "B", "C", "D"]`, whose `.length` is `4`.'
  },
  {
    t: 'Higher-Order Function Pipeline',
    c: 'A higher-order function is a function that accepts another function as an argument or returns a function.',
    m: 'builder',
    codeBlocks: [
      'function double(x) { return x * 2; }',
      'function applyOp(val, fn) {',
      '  return fn(val);',
      '}',
      'console.log(applyOp(15, double));'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    q: 'CODE BUILDER: Assemble the higher-order function callback invocation:',
    h: 'Define the callback double, define applyOp accepting val and fn, call applyOp with 15 and double.',
    explanation: '`applyOp(15, double)` executes `double(15)` passing the function reference, which returns 30.'
  },
  {
    t: 'Scope & ReferenceError',
    c: 'Variables declared with let or const inside a function have local scope and cannot be accessed outside.',
    m: 'detective',
    code: `function secretVault() {\n  let code = "ALPHA-7";\n}\nsecretVault();\n// console.log(code);`,
    q: 'OUTPUT DETECTIVE: If console.log(code) is uncommented outside secretVault(), what happens?',
    opts: [
      'Logs "ALPHA-7"',
      'Logs undefined',
      'Throws ReferenceError: code is not defined',
      'Logs null'
    ],
    a: 2,
    h: 'Local variables exist only within the function body where they were declared.',
    explanation: 'Variables declared with `let` inside a function are scoped to that function block. Accessing them externally throws a `ReferenceError`.'
  },
  {
    t: 'Closures in Action',
    c: 'A closure is the combination of a function bundled with references to its lexical environment.',
    m: 'detective',
    code: `function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst counter = createCounter();\ncounter();\nconsole.log(counter());`,
    q: 'OUTPUT DETECTIVE: counter() has been called twice. What is logged by the second call?',
    opts: [
      '1',
      '2',
      '0',
      'undefined'
    ],
    a: 1,
    h: 'The closure retains state across invocations: 0 -> 1 on first call, 1 -> 2 on second call.',
    explanation: 'The inner function maintains access to `count` in its closure. Call 1 increments count to 1; Call 2 increments and returns 2.'
  },
  // BOSS 4: Level 32
  {
    t: 'THE CLOSURE WRAITH',
    isBoss: true,
    name: 'THE CLOSURE WRAITH',
    hp: 800,
    avatar: '👻',
    story: 'A phantom haunting Function Station, sealing outer scope environments in spectral memory closures.',
    phases: [
      {
        q: 'PHASE 1: Wraith tests hoisting! How does a function declaration behave compared to a function expression?',
        opts: [
          'Function declarations are fully hoisted with their definitions',
          'Function expressions are hoisted with their definitions',
          'Neither is hoisted in JavaScript',
          'Only arrow functions are hoisted'
        ],
        a: 0,
        explanation: 'Function declarations (`function foo() {}`) are hoisted along with their complete function bodies to the top of the scope.'
      },
      {
        q: 'PHASE 2: Wraith tests Arrow this! How do arrow functions bind the "this" keyword?',
        opts: [
          'Dynamically from the caller site',
          'Lexically from the surrounding scope at declaration time',
          'Always binds to the global window/globalThis',
          'They create their own new "this" binding'
        ],
        a: 1,
        explanation: 'Arrow functions do not have their own `this`; they inherit `this` lexically from the enclosing execution context.'
      },
      {
        q: 'PHASE 3: Wraith strikes with default returns! What does a function that executes no return statement yield?',
        opts: ['null', '0', 'undefined', 'void'],
        a: 2,
        explanation: 'In JavaScript, functions that finish executing without an explicit `return` statement automatically return `undefined`.'
      },
      {
        q: 'PHASE 4: Wraith tests pure function characteristics! What defines a pure function?',
        opts: [
          'It has no parameters and runs in 0ms',
          'Same inputs always produce same output with no side effects',
          'It can only return boolean values',
          'It modifies global variables directly'
        ],
        a: 1,
        explanation: 'A pure function is deterministic (identical arguments yield identical results) and causes no observable side effects (no mutating external state).'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What design pattern immediately executes an anonymous function right after definition?',
        opts: ['IIFE (Immediately Invoked Function Expression)', 'Singleton Constructor', 'Curried Invoker', 'Decorator Pattern'],
        a: 0,
        explanation: 'An IIFE `(function() { ... })()` runs immediately upon evaluation, historically used for creating private scopes in JS.'
      }
    ]
  },

  // =========================================================================
  // AREA 5: ARRAY ZONE (Lv 33-40) - DATA STRUCTURES & COLLECTIONS
  // =========================================================================
  {
    t: 'Array Push & Pop Mutation',
    c: 'push adds elements to the end; pop removes the last element and returns it.',
    m: 'glitch',
    code: `const weapons = ["LASER", "CANNON"];\nweapons.push("MISSILE");\nconst removed = weapons.pop();\nconsole.log(weapons.length);`,
    q: 'BUG HUNTER / LOGIC: After pushing "MISSILE" and popping it right off, what is weapons.length?',
    opts: [
      '3',
      '2',
      '1',
      '0'
    ],
    a: 1,
    h: 'Adding 1 item and removing 1 item returns length back to 2.',
    explanation: 'Initial length is 2. `push("MISSILE")` increases length to 3, and `pop()` removes "MISSILE", restoring length to 2.'
  },
  {
    t: 'Array.map Transformation',
    c: 'map calls a callback on each element and returns a brand-new array without mutating the original.',
    m: 'runner',
    code: `const power = [2, 4, 6];\nconst amplified = power.map(p => p * 3);\nconsole.log(amplified);`,
    q: 'SPEED RUN: What is the resulting array in amplified?',
    opts: [
      '[6, 12, 18]',
      '[2, 4, 6]',
      '[6, 4, 6]',
      '36'
    ],
    a: 0,
    h: 'Multiply each element: 2*3=6, 4*3=12, 6*3=18.',
    explanation: '`.map()` applies `p => p * 3` to every item in `[2, 4, 6]`, returning a new array `[6, 12, 18]`.'
  },
  {
    t: 'Array.filter Selection',
    c: 'filter creates a shallow copy filtered down to elements that pass the predicate test.',
    m: 'detective',
    code: `const pings = [12, 85, 42, 99, 31];\nconst highLatency = pings.filter(ms => ms > 50);\nconsole.log(highLatency);`,
    q: 'OUTPUT DETECTIVE: Which elements pass the test ms > 50?',
    opts: [
      '[12, 42, 31]',
      '[85, 99]',
      '[99]',
      '[85]'
    ],
    a: 1,
    h: 'Look for numbers strictly greater than 50.',
    explanation: 'Only `85` and `99` are strictly greater than 50, so `filter` returns `[85, 99]`.'
  },
  {
    t: 'Array.reduce Accumulator',
    c: 'reduce executes a user-supplied reducer callback on each element of the array in order.',
    m: 'detective',
    code: `const bytes = [10, 20, 30];\nconst total = bytes.reduce((acc, curr) => acc + curr, 5);\nconsole.log(total);`,
    q: 'OUTPUT DETECTIVE: Notice initial value is 5! What is the reduced total?',
    opts: [
      '60',
      '65',
      '50',
      '55'
    ],
    a: 1,
    h: 'Initial accumulator is 5: 5 + 10 + 20 + 30 = 65.',
    explanation: '`reduce` begins with accumulator `5`. Adding 10 (15), 20 (35), and 30 produces `65`.'
  },
  {
    t: 'Array Slice vs Splice',
    c: 'slice returns a non-mutating shallow copy; splice modifies the original array.',
    m: 'builder',
    codeBlocks: [
      'const squad = ["Alpha", "Bravo", "Charlie", "Delta"];',
      'const vanguard = squad.slice(1, 3);',
      'console.log(vanguard);'
    ],
    correctOrder: [0, 1, 2],
    q: 'CODE BUILDER: Assemble the non-mutating slice extraction:',
    h: 'squad.slice(1, 3) extracts elements from index 1 up to (not including) index 3.',
    explanation: '`slice(1, 3)` extracts index 1 ("Bravo") and index 2 ("Charlie") without modifying the original squad array.'
  },
  {
    t: 'Array Destructuring',
    c: 'Array destructuring unpacks values from arrays into distinct variables.',
    m: 'detective',
    code: `const coords = [100, 250, 500];\nconst [x, , z] = coords;\nconsole.log(x, z);`,
    q: 'OUTPUT DETECTIVE: Note the skipped comma! What values are in x and z?',
    opts: [
      '100 250',
      '100 500',
      '250 500',
      '100 undefined'
    ],
    a: 1,
    h: 'The empty comma skips index 1 (250).',
    explanation: 'Destructuring pattern `[x, , z]` binds index 0 (100) to `x`, skips index 1, and binds index 2 (500) to `z`.'
  },
  {
    t: 'Spread Operator with Arrays',
    c: 'The spread syntax (...) expands iterable array elements into a new array literal.',
    m: 'completion',
    code: `const sectorA = [1, 2];\nconst sectorB = [3, 4];\nconst combined = [___];\nconsole.log(combined);`,
    q: 'CODE COMPLETION: Choose the syntax that merges both arrays into [1, 2, 3, 4]:',
    opts: [
      '...sectorA, ...sectorB',
      'sectorA + sectorB',
      '[sectorA], [sectorB]',
      'sectorA.append(sectorB)'
    ],
    a: 0,
    h: 'Spread elements using ... inside array brackets.',
    explanation: 'Using `[...sectorA, ...sectorB]` spreads the elements of both arrays into a single combined array `[1, 2, 3, 4]`.'
  },
  // BOSS 5: Level 40
  {
    t: 'THE MUTATOR TITAN',
    isBoss: true,
    name: 'THE MUTATOR TITAN',
    hp: 900,
    avatar: '🗿',
    story: 'A hulking behemoth of raw contiguous memory in Array Zone, crushing corrupted buffers.',
    phases: [
      {
        q: 'PHASE 1: Titan mutates index zero! Which method removes the first element from an array in place?',
        opts: ['pop()', 'shift()', 'unshift()', 'slice()'],
        a: 1,
        explanation: '`shift()` removes the first element (index 0) from an array in place and returns that element.'
      },
      {
        q: 'PHASE 2: Titan tests search methods! What does [10, 20, 30].includes(20) return?',
        opts: ['1', 'true', '20', 'undefined'],
        a: 1,
        explanation: '`includes()` returns a boolean (`true` or `false`) indicating whether an array contains the specified value.'
      },
      {
        q: 'PHASE 3: Titan tests find()! What does [5, 12, 8, 130].find(x => x > 10) return?',
        opts: ['[12, 130]', '12', 'true', '1'],
        a: 1,
        explanation: '`find()` returns the *first* element in the array that satisfies the provided testing function (12).'
      },
      {
        q: 'PHASE 4: Titan tests mutation behavior! Does Array.prototype.sort() mutate the original array?',
        opts: [
          'No, it returns a new sorted copy',
          'Yes, it sorts elements in place and mutates the array',
          'Only when sorting numeric values',
          'Only in strict mode'
        ],
        a: 1,
        explanation: '`sort()` mutates the original array in place (and also returns the reference to that same array).'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What does [2, 4, 6].every(x => x % 2 === 0) return?',
        opts: ['true', 'false', '[2, 4, 6]', 'undefined'],
        a: 0,
        explanation: '`every()` tests whether *all* elements in the array pass the provided function. Since all are even, it returns `true`.'
      }
    ]
  },

  // =========================================================================
  // AREA 6: OBJECT FORTRESS (Lv 41-48) - OBJECTS & OOP
  // =========================================================================
  {
    t: 'Object Literal Syntax',
    c: 'Objects store collections of key-value pairs representing state and methods.',
    m: 'glitch',
    code: `const bot = {\n  callsign: "Sentinel",\n  hp: 100;\n};`,
    q: 'BUG HUNTER: Property separator syntax error. What must replace the semicolon after 100?',
    opts: [
      'A comma (,)',
      'A colon (:)',
      'A period (.)',
      'Nothing; omit the semicolon'
    ],
    a: 0,
    h: 'Properties inside object literals are separated by commas, never semicolons.',
    explanation: 'Object properties must be separated by commas (`,`). Using a semicolon (`;`) inside an object literal produces a SyntaxError.'
  },
  {
    t: 'Object Destructuring',
    c: 'Object destructuring unpacks properties from objects into named variables.',
    m: 'runner',
    code: `const unit = { name: "Ghost", rank: "Elite", energy: 95 };\nconst { rank, energy } = unit;\nconsole.log(rank, energy);`,
    q: 'SPEED RUN: What is printed by console.log(rank, energy)?',
    opts: [
      '"Ghost" "Elite"',
      '"Elite" 95',
      'undefined undefined',
      '95 "Elite"'
    ],
    a: 1,
    h: 'Variables match the exact property names inside the target object.',
    explanation: 'Destructuring `{ rank, energy }` extracts `unit.rank` ("Elite") and `unit.energy` (95).'
  },
  {
    t: 'Object.keys & Object.values',
    c: 'Object.keys returns an array of property names; Object.values returns property values.',
    m: 'detective',
    code: `const turret = { ammo: 250, caliber: "50mm", active: true };\nconsole.log(Object.keys(turret).length);`,
    q: 'OUTPUT DETECTIVE: How many keys exist on the turret object?',
    opts: [
      '1',
      '2',
      '3',
      '250'
    ],
    a: 2,
    h: 'Count the keys: ammo, caliber, active.',
    explanation: '`Object.keys(turret)` returns `["ammo", "caliber", "active"]`, which has a `.length` of 3.'
  },
  {
    t: 'Method Definition & "this"',
    c: 'When a function is called as a method of an object, its "this" refers to the object.',
    m: 'detective',
    code: `const player = {\n  hp: 80,\n  heal(amount) {\n    this.hp += amount;\n    return this.hp;\n  }\n};\nconsole.log(player.heal(20));`,
    q: 'OUTPUT DETECTIVE: What is the new hp returned by player.heal(20)?',
    opts: [
      '80',
      '100',
      '20',
      'NaN'
    ],
    a: 1,
    h: 'this.hp refers to player.hp: 80 + 20 = 100.',
    explanation: 'Inside `player.heal`, `this` references the `player` object. 80 + 20 increases `player.hp` to 100.'
  },
  {
    t: 'ES6 Class Construction',
    c: 'Classes provide syntactic sugar over JavaScript prototype-based inheritance.',
    m: 'builder',
    codeBlocks: [
      'class Droid {',
      '  constructor(name) {',
      '    this.name = name;',
      '  }',
      '}',
      'const d = new Droid("R2");',
      'console.log(d.name);'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    q: 'CODE BUILDER: Assemble the ES6 class definition and instantiation:',
    h: 'Class header, constructor with parameter, property assignment, close class, instantiate with new, log.',
    explanation: 'The `class` definition with its `constructor` initializes `this.name`. Instantiating with `new Droid("R2")` produces an instance with name "R2".'
  },
  {
    t: 'Optional Chaining (?.)',
    c: '?. permits reading the value of a property located deep within a chain without throwing an error if null/undefined.',
    m: 'detective',
    code: `const agent = { profile: null };\nconst avatar = agent.profile?.image?.url;\nconsole.log(avatar);`,
    q: 'OUTPUT DETECTIVE: profile is null. What does agent.profile?.image?.url evaluate to?',
    opts: [
      'TypeError: Cannot read property image',
      'undefined',
      'null',
      'false'
    ],
    a: 1,
    h: 'Optional chaining short-circuits gracefully and returns undefined if reference is nullish.',
    explanation: 'Because `agent.profile` is `null`, `agent.profile?.` short-circuits evaluation and returns `undefined` without throwing an error.'
  },
  {
    t: 'Object Spread & Immutability',
    c: 'Object spread copies own enumerable properties from a source object into a new target object.',
    m: 'detective',
    code: `const base = { atk: 10, def: 5 };\nconst buffed = { ...base, atk: 25 };\nconsole.log(base.atk, buffed.atk);`,
    q: 'OUTPUT DETECTIVE: Did spreading into buffed mutate the original base object?',
    opts: [
      '10 25',
      '25 25',
      '10 10',
      'undefined 25'
    ],
    a: 0,
    h: 'Object spread creates a shallow copy. The original base object remains unchanged.',
    explanation: '`{ ...base, atk: 25 }` creates a new object with updated `atk: 25`. The original `base.atk` remains `10`.'
  },
  // BOSS 6: Level 48
  {
    t: 'THE PROTOTYPE LICH',
    isBoss: true,
    name: 'THE PROTOTYPE LICH',
    hp: 1000,
    avatar: '💀',
    story: 'An ancient undead entity residing in Object Fortress, manipulating prototypes and memory inheritance chains.',
    phases: [
      {
        q: 'PHASE 1: Lich tests prototype inheritance! Where do objects look when accessing a property not on themselves?',
        opts: [
          'Directly in global window variables',
          'Up their prototype chain (__proto__ / [[Prototype]])',
          'In the local storage cache',
          'In compiler static symbol tables'
        ],
        a: 1,
        explanation: 'JavaScript walks up the prototype chain until it finds the matching property or reaches `null` (end of chain).'
      },
      {
        q: 'PHASE 2: Lich casts Object.freeze! What effect does Object.freeze(obj) have?',
        opts: [
          'Prevents adding, deleting, or modifying existing properties',
          'Deletes all keys from the object',
          'Converts the object into a JSON string',
          'Makes all properties asynchronous'
        ],
        a: 0,
        explanation: '`Object.freeze()` makes an object immutable: existing properties cannot be changed, added, or deleted.'
      },
      {
        q: 'PHASE 3: Lich strikes class inheritance! Which keyword establishes subclass inheritance in ES6?',
        opts: ['inherits', 'implements', 'extends', 'subclass'],
        a: 2,
        explanation: 'The `extends` keyword is used in class declarations or expressions to create a class that is a child of another class.'
      },
      {
        q: 'PHASE 4: Lich tests super() call! In a derived class constructor, what must be called before accessing "this"?',
        opts: ['super()', 'this.init()', 'parent()', 'Object.assign()'],
        a: 0,
        explanation: 'In a derived class constructor, `super()` must be called before using `this`, otherwise a ReferenceError is thrown.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which method safely checks if a property belongs directly to an object (not prototype)?',
        opts: [
          'Object.hasOwn(obj, prop)',
          'obj.contains(prop)',
          'obj.prototype.has(prop)',
          'Object.is(obj, prop)'
        ],
        a: 0,
        explanation: '`Object.hasOwn(obj, prop)` is the modern, safe ECMAScript replacement for `hasOwnProperty`.'
      }
    ]
  },

  // =========================================================================
  // AREA 7: ASYNC CITADEL & MASTER CHALLENGES (Lv 49-51)
  // =========================================================================
  {
    t: 'Promises & Microtask Resolution',
    c: 'Promises represent the eventual completion (fulfillment) or rejection of an asynchronous operation.',
    m: 'detective',
    code: `console.log("A");\nPromise.resolve().then(() => console.log("B"));\nconsole.log("C");`,
    q: 'OUTPUT DETECTIVE: In what order do the logs execute?',
    opts: [
      '"A", "B", "C"',
      '"A", "C", "B"',
      '"B", "A", "C"',
      '"C", "B", "A"'
    ],
    a: 1,
    h: 'Synchronous code runs first; promise resolution callbacks are queued in the microtask queue.',
    explanation: 'Synchronous "A" logs, then the promise `.then()` is queued in the microtask queue, synchronous "C" logs, and finally microtasks run, logging "B". Output: A, C, B.'
  },
  {
    t: 'Async / Await Error Handling',
    c: 'async/await allows asynchronous, promise-based code to be written synchronously using try/catch.',
    m: 'builder',
    codeBlocks: [
      'async function fetchTelemetry() {',
      '  try {',
      '    const res = await Promise.resolve("ONLINE");',
      '    return res;',
      '  } catch (err) {',
      '    return "OFFLINE";',
      '  }',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    q: 'CODE BUILDER: Assemble the robust async/await try/catch data fetcher:',
    h: 'async function, try block, await promise, return data, catch block, return fallback, close function.',
    explanation: 'Wrapping `await` expressions inside `try...catch` provides clean and intuitive asynchronous error handling.'
  },
  // FINAL BOSS: Level 51
  {
    t: 'THE EVENT LOOP SOVEREIGN',
    isBoss: true,
    isFinalBoss: true,
    name: 'THE EVENT LOOP SOVEREIGN',
    hp: 1200,
    avatar: '👑',
    story: 'THE SUPREME ARCHITECT OF JAVASCRIPT! It rules the Call Stack, Microtask Queue, and V8 Runtime. Defeat it to achieve complete JavaScript Mastery!',
    phases: [
      {
        q: 'PHASE 1: Sovereign challenges task queues! Which queue executes first after the call stack empties?',
        opts: [
          'Macrotask Queue (setTimeout, setInterval)',
          'Microtask Queue (Promises, queueMicrotask)',
          'Both queues run simultaneously in parallel threads',
          'Macrotasks take priority over Promises'
        ],
        a: 1,
        explanation: 'All microtasks in the microtask queue are executed to completion before the event loop yields to the next macrotask.'
      },
      {
        q: 'PHASE 2: Sovereign tests Promise.all()! What happens if ANY single promise in Promise.all([p1, p2]) rejects?',
        opts: [
          'The entire Promise.all immediately rejects with that error',
          'It ignores the rejected promise and returns the rest',
          'It retries the rejected promise up to 3 times',
          'It resolves with undefined in that slot'
        ],
        a: 0,
        explanation: '`Promise.all` employs "fail-fast" behavior: if any passed promise rejects, the returned promise immediately rejects.'
      },
      {
        q: 'PHASE 3: Sovereign challenges concurrency models! How does JavaScript handle concurrency on the main thread?',
        opts: [
          'Multi-threaded preemptive hardware threads',
          'Single-threaded event loop with non-blocking I/O callbacks',
          'Forking background OS worker processes per function',
          'Synchronous blocking execution only'
        ],
        a: 1,
        explanation: 'JavaScript runs on a single main thread using an event loop model with non-blocking I/O and asynchronous event queues.'
      },
      {
        q: 'PHASE 4: Sovereign tests Promise.allSettled()! How does Promise.allSettled differ from Promise.all?',
        opts: [
          'It waits for all promises to finish, whether fulfilled or rejected',
          'It rejects on the first fulfilled promise',
          'It only works with synchronous arrays',
          'It runs in a separate Web Worker'
        ],
        a: 0,
        explanation: '`Promise.allSettled()` never rejects early; it resolves after all given promises have either fulfilled or rejected, with an array describing each outcome.'
      },
      {
        q: 'PHASE 5: MASTER STRIKE! Which keyword allows loading an ES module dynamically at runtime as a Promise?',
        opts: [
          'import("./module.js")',
          'require.async("./module.js")',
          'export.load("./module.js")',
          'loadModule("./module.js")'
        ],
        a: 0,
        explanation: 'Dynamic `import(specifier)` returns a promise that resolves to the module namespace object of the requested module.'
      }
    ]
  }
];
