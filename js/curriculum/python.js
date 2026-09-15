/**
 * GLITCH RUNNER - PYTHON CURRICULUM (51 LEVELS)
 * Areas:
 * Area 1: Syntax Sanctuary (Lv 1-8, Boss: THE INDENTATION GOLEM)
 * Area 2: Logic Highlands (Lv 9-16, Boss: THE SLICING BASILISK)
 * Area 3: Iteration Ridge (Lv 17-24, Boss: THE RECURSION WYRM)
 * Area 4: Function Foundry (Lv 25-32, Boss: THE SCOPE PHANTOM)
 * Area 5: Collection Caverns (Lv 33-40, Boss: THE HASH COLLISION SPECTRE)
 * Area 6: OOP Citadel (Lv 41-48, Boss: THE METACLASS BEHEMOTH)
 * Area 7: Generator Core (Lv 49-51, Final Boss: THE GIL DRAGON)
 */

window.CURRICULUM_DATA = window.CURRICULUM_DATA || {};

window.CURRICULUM_DATA.python = [
  // =========================================================================
  // AREA 1: SYNTAX SANCTUARY (Lv 1-8) - FOUNDATION
  // =========================================================================
  {
    t: 'Python Console Output',
    c: 'print() outputs text and variables to standard output in Python.',
    m: 'glitch',
    code: `System.out.println("OPERATIVE BOOTED")`,
    q: 'BUG HUNTER: Foreign syntax detected in Python terminal. Identify the correct Python call:',
    opts: [
      'echo "OPERATIVE BOOTED"',
      'print("OPERATIVE BOOTED")',
      'console.log("OPERATIVE BOOTED")',
      'printf("OPERATIVE BOOTED")'
    ],
    a: 1,
    h: 'Python uses the built-in print() function.',
    explanation: 'Python uses the built-in `print()` function for terminal output. `System.out.println` is Java syntax.'
  },
  {
    t: 'Floor Division Operator',
    c: 'The // operator performs integer (floor) division, truncating fractional remainders.',
    m: 'runner',
    code: `val = 17 // 4\nprint(val)`,
    q: 'SPEED RUN: What is the integer result of 17 // 4?',
    opts: [
      '4.25',
      '4',
      '5',
      '1'
    ],
    a: 1,
    h: 'Floor division rounds down to the nearest whole integer.',
    explanation: 'Standard division `17 / 4` is `4.25`. Floor division `17 // 4` rounds down to `4`.'
  },
  {
    t: 'Type Inspection',
    c: 'type() returns the type class of an object in Python.',
    m: 'detective',
    code: `power = 3.14\nprint(type(power).__name__)`,
    q: 'OUTPUT DETECTIVE: What type name is printed for 3.14 in Python?',
    opts: [
      '"double"',
      '"decimal"',
      '"float"',
      '"number"'
    ],
    a: 2,
    h: 'Python floating-point numbers belong to the float class.',
    explanation: 'In Python, real numbers with a decimal point are instances of the `float` class (there is no separate double type).'
  },
  {
    t: 'Exponentiation Operator',
    c: 'Python uses ** for exponentiation (raising a number to a power).',
    m: 'detective',
    code: `charge = 2 ** 5\nprint(charge)`,
    q: 'OUTPUT DETECTIVE: Evaluate 2 ** 5 (2 raised to the power of 5):',
    opts: [
      '10',
      '32',
      '64',
      '25'
    ],
    a: 1,
    h: '2 * 2 * 2 * 2 * 2 = 32.',
    explanation: 'The `**` operator raises the base to the exponent. 2 to the 5th power is 32.'
  },
  {
    t: 'F-String Interpolation',
    c: 'Formatted string literals (f-strings) let you embed expressions inside string literals using {}.',
    m: 'builder',
    codeBlocks: [
      'operative = "Viper"',
      'rank = 9',
      'briefing = f"Operative {operative} clearance Level {rank * 2}"',
      'print(briefing)'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the f-string diagnostic message pipeline:',
    h: 'Declare operative, declare rank, format with f-string multiplying rank by 2, and print.',
    explanation: 'F-strings prefix the string literal with `f` and evaluate expressions within `{}` at runtime.'
  },
  {
    t: 'String Multiplication',
    c: 'Multiplying a string by an integer repeats the string that many times.',
    m: 'completion',
    code: `banner = "=" * 4\nprint(banner)`,
    q: 'CODE COMPLETION / DETECTIVE: What string does "=" * 4 produce?',
    opts: [
      '"===="',
      'SyntaxError',
      '"=4"',
      'TypeError: can\'t multiply sequence by non-int'
    ],
    a: 0,
    h: 'In Python, multiplying a string by an integer repeats it.',
    explanation: 'Python sequence repetition multiplies strings: `"=" * 4` produces `"===="`.'
  },
  {
    t: 'Dynamic Typing & None',
    c: 'None is a singleton object used to signify the absence of a value or null state.',
    m: 'detective',
    code: `sensor = None\nprint(sensor is None, type(sensor).__name__)`,
    q: 'OUTPUT DETECTIVE: What is printed for the None singleton check and its type?',
    opts: [
      'True NoneType',
      'False None',
      'True null',
      'True undefined'
    ],
    a: 0,
    h: 'None belongs to the NoneType class and identity is tested using "is".',
    explanation: '`sensor is None` evaluates to `True`, and the class of `None` is `NoneType`.'
  },
  // BOSS 1: Level 8
  {
    t: 'THE INDENTATION GOLEM',
    isBoss: true,
    name: 'THE INDENTATION GOLEM',
    hp: 500,
    avatar: '🗿',
    story: 'A towering guardian of pure whitespace in Syntax Sanctuary. It crushes sloppy tabs and misaligned blocks!',
    phases: [
      {
        q: 'PHASE 1: Golem tests whitespace laws! How does Python define code blocks instead of curly braces {}?',
        opts: [
          'Using parentheses ( )',
          'Using consistent indentation (spaces or tabs)',
          'Using semicolons at the end of each line',
          'Using begin and end keywords'
        ],
        a: 1,
        explanation: 'Python uses indentation levels (typically 4 spaces per block) to delimit code blocks rather than curly braces.'
      },
      {
        q: 'PHASE 2: Golem casts type conversion! What does int("42") + float("3.5") evaluate to?',
        opts: ['45.5', '"423.5"', '45', 'ValueError'],
        a: 0,
        explanation: '`int("42")` becomes 42, `float("3.5")` becomes 3.5, and adding them yields the float `45.5`.'
      },
      {
        q: 'PHASE 3: Golem tests single-line comment syntax! Which symbol denotes a single-line comment in Python?',
        opts: ['//', '#', '/*', '--'],
        a: 1,
        explanation: 'In Python, comments start with the hash/pound symbol `#` and continue to the end of the physical line.'
      },
      {
        q: 'PHASE 4: Golem tests multiple assignment! After x, y = 10, 20, what are the values of x and y?',
        opts: ['x=10, y=20', 'x=20, y=10', 'x=[10, 20], y=None', 'SyntaxError'],
        a: 0,
        explanation: 'Python supports tuple unpacking for parallel assignment: `x` receives 10 and `y` receives 20.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which built-in function returns the number of characters in a string or items in a list?',
        opts: ['size()', 'count()', 'len()', 'length()'],
        a: 2,
        explanation: 'The standard built-in function `len()` returns the length (the number of items) of an object.'
      }
    ]
  },

  // =========================================================================
  // AREA 2: LOGIC HIGHLANDS (Lv 9-16) - CORE LOGIC
  // =========================================================================
  {
    t: 'Elif Branching Syntax',
    c: 'Python uses elif (not else if) for chained conditional evaluation.',
    m: 'glitch',
    code: `tier = 2\nif tier == 1:\n    print("GOLD")\nelse if tier == 2:\n    print("SILVER")`,
    q: 'BUG HUNTER: The chained condition throws a SyntaxError. What is the valid Python keyword?',
    opts: [
      'elseif',
      'elif',
      'else_if',
      'elsif'
    ],
    a: 1,
    h: 'Python shortens "else if" to "elif".',
    explanation: 'Python uses `elif` for secondary conditional branches. `else if` produces a SyntaxError.'
  },
  {
    t: 'Identity (is) vs Equality (==)',
    c: '== checks if values are equal; is checks whether two variables point to the same memory object.',
    m: 'runner',
    code: `list_a = [1, 2]\nlist_b = [1, 2]\nprint(list_a == list_b, list_a is list_b)`,
    q: 'SPEED RUN: What does the comparison output for two separately allocated lists with equal elements?',
    opts: [
      'True True',
      'False False',
      'True False',
      'False True'
    ],
    a: 2,
    h: 'They have the same contents (== is True), but are distinct objects in memory (is is False).',
    explanation: '`list_a == list_b` is `True` because their elements match. But `list_a is list_b` is `False` because they are separate list instances in memory.'
  },
  {
    t: 'Logical Operators (and, or, not)',
    c: 'Python uses English words: and, or, not (not &&, ||, !).',
    m: 'detective',
    code: `shield_up = True\nemp_blast = False\ncombat_ready = shield_up and not emp_blast\nprint(combat_ready)`,
    q: 'OUTPUT DETECTIVE: What is the boolean value of combat_ready?',
    opts: [
      'True',
      'False',
      'None',
      'SyntaxError'
    ],
    a: 0,
    h: 'True and not False -> True and True -> True.',
    explanation: '`not False` evaluates to `True`. `True and True` evaluates to `True`.'
  },
  {
    t: 'Membership Operator (in)',
    c: 'The in operator tests whether a value exists within a sequence (string, list, tuple, etc.).',
    m: 'detective',
    code: `protocol = "CYBER_OVERDRIVE"\nprint("DRIVE" in protocol, "LASER" in protocol)`,
    q: 'OUTPUT DETECTIVE: What does substring membership testing log?',
    opts: [
      'True True',
      'False True',
      'True False',
      'False False'
    ],
    a: 2,
    h: '"DRIVE" is a substring of protocol; "LASER" is not.',
    explanation: '"DRIVE" exists within "CYBER_OVERDRIVE" (True), while "LASER" does not (False).'
  },
  {
    t: 'Conditional Ternary Expression',
    c: 'Python ternary syntax is: value_if_true if condition else value_if_false.',
    m: 'builder',
    codeBlocks: [
      'hp = 30',
      'status = "DANGER" if hp < 50 else "STABLE"',
      'print(status)'
    ],
    correctOrder: [0, 1, 2],
    q: 'CODE BUILDER: Assemble the inline conditional expression:',
    h: 'Define hp, assign status using "A if cond else B", and print.',
    explanation: 'Python conditional expressions read naturally: `x = A if condition else B`. Here hp is 30 (< 50), so status is "DANGER".'
  },
  {
    t: 'Chained Comparisons',
    c: 'Python allows chained comparisons like 0 < x < 10, evaluated as (0 < x) and (x < 10).',
    m: 'detective',
    code: `level = 7\nis_valid = 1 <= level <= 10\nprint(is_valid)`,
    q: 'OUTPUT DETECTIVE: Does 7 satisfy the chained comparison 1 <= 7 <= 10?',
    opts: [
      'True',
      'False',
      'TypeError',
      '7'
    ],
    a: 0,
    h: '7 is both >= 1 and <= 10.',
    explanation: 'Python elegantly evaluates `1 <= level <= 10` as `(1 <= level) and (level <= 10)`, which is `True`.'
  },
  {
    t: 'Falsy Value Rules',
    c: 'In Python, empty collections ([], {}, set(), ()), 0, 0.0, "", None, and False are falsy.',
    m: 'detective',
    code: `inventory = []\nif not inventory:\n    print("EMPTY")\nelse:\n    print("STOCKED")`,
    q: 'OUTPUT DETECTIVE: An empty list [] is evaluated in a boolean context. What is printed?',
    opts: [
      '"EMPTY"',
      '"STOCKED"',
      'None',
      'IndexError'
    ],
    a: 0,
    h: 'An empty list [] evaluates to False, so not inventory is True.',
    explanation: 'In Python, empty collections have a truth value of `False`. Thus `not inventory` is `True`, printing "EMPTY".'
  },
  // BOSS 2: Level 16
  {
    t: 'THE SLICING BASILISK',
    isBoss: true,
    name: 'THE SLICING BASILISK',
    hp: 600,
    avatar: '🐍',
    story: 'A serpent coiled around the logic gates of Logic Highlands, testing sequence boundaries.',
    phases: [
      {
        q: 'PHASE 1: Basilisk tests reverse slicing! What does "PYTHON"[::-1] produce?',
        opts: ['"NOHTYP"', '"PYTHON"', '"P"', 'IndexError'],
        a: 0,
        explanation: 'Slicing with a negative step `[::-1]` reverses any sequence in Python, producing `"NOHTYP"`.'
      },
      {
        q: 'PHASE 2: Basilisk tests slice upper-bound exclusivity! What elements are in [10, 20, 30, 40][1:3]?',
        opts: ['[20, 30]', '[10, 20, 30]', '[20, 30, 40]', '[10, 20]'],
        a: 0,
        explanation: 'Slices in Python are half-open: `[1:3]` includes index 1 (20) and index 2 (30), but excludes index 3.'
      },
      {
        q: 'PHASE 3: Basilisk tests negative indexing! What does [100, 200, 300][-1] return?',
        opts: ['300', '100', '200', 'IndexError'],
        a: 0,
        explanation: 'Negative index `-1` accesses the last element of the sequence, returning 300.'
      },
      {
        q: 'PHASE 4: Basilisk tests string immutability! What happens if you execute s = "code"; s[0] = "m"?',
        opts: [
          's becomes "mode"',
          'TypeError: \'str\' object does not support item assignment',
          's becomes "mcode"',
          'ValueError'
        ],
        a: 1,
        explanation: 'Python strings are immutable. Direct in-place character assignment throws a `TypeError`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What does list(range(2, 8, 2)) generate?',
        opts: ['[2, 4, 6]', '[2, 4, 6, 8]', '[2, 5, 8]', '[0, 2, 4, 6]'],
        a: 0,
        explanation: '`range(start, stop, step)` starts at 2, steps by 2, and stops before 8, yielding `[2, 4, 6]`.'
      }
    ]
  },

  // =========================================================================
  // AREA 3: ITERATION RIDGE (Lv 17-24) - LOOPS & ITERATION
  // =========================================================================
  {
    t: 'For Loop over Range',
    c: 'for loops in Python iterate over items in any sequence or iterable produced by range().',
    m: 'glitch',
    code: `total = 0\nfor i in range(1, 4)\n    total += i`,
    q: 'BUG HUNTER: The loop header crashes with a SyntaxError. What character is missing at the end of the for line?',
    opts: [
      'A semicolon (;)',
      'A colon (:)',
      'Curly braces { }',
      'The keyword do'
    ],
    a: 1,
    h: 'Compound statements in Python (for, while, if, def) must terminate with a colon (:).',
    explanation: 'In Python, statement headers like `for`, `while`, `if`, and `def` must end with a colon `:`.'
  },
  {
    t: 'While Loop Break',
    c: 'break immediately terminates the loop body.',
    m: 'runner',
    code: `count = 0\nwhile True:\n    count += 1\n    if count == 4:\n        break\nprint(count)`,
    q: 'SPEED RUN: What is the value of count when the while loop breaks?',
    opts: [
      '3',
      '4',
      '5',
      'Infinite'
    ],
    a: 1,
    h: 'The condition count == 4 triggers the break statement.',
    explanation: '`count` increments from 0 to 1, 2, 3, 4. When it reaches 4, `break` terminates the infinite loop.'
  },
  {
    t: 'Enumerate with Indices',
    c: 'enumerate() yields pairs of (index, item) during sequence iteration.',
    m: 'detective',
    code: `items = ["A", "B"]\nfor idx, val in enumerate(items, start=1):\n    print(f"{idx}:{val}", end=" ")\n`,
    q: 'OUTPUT DETECTIVE: Notice start=1! What is printed?',
    opts: [
      '"0:A 1:B "',
      '"1:A 2:B "',
      '"A:1 B:2 "',
      '"1:0 2:1 "'
    ],
    a: 1,
    h: 'enumerate with start=1 begins numbering at 1 rather than 0.',
    explanation: 'Passing `start=1` to `enumerate()` causes the counter to begin at 1, yielding `1:A` and `2:B`.'
  },
  {
    t: 'Loop Continue Statement',
    c: 'continue skips the rest of the current iteration and advances to the next.',
    m: 'detective',
    code: `evens = []\nfor n in range(5):\n    if n % 2 != 0:\n        continue\n    evens.append(n)\nprint(evens)`,
    q: 'OUTPUT DETECTIVE: Odd numbers are skipped. What elements are appended for range(5)?',
    opts: [
      '[1, 3]',
      '[0, 2, 4]',
      '[2, 4]',
      '[0, 1, 2, 3, 4]'
    ],
    a: 1,
    h: 'range(5) is 0, 1, 2, 3, 4. 0, 2, and 4 have remainder 0 when divided by 2.',
    explanation: 'Numbers 0, 2, 4 pass the check (they are even), while 1 and 3 are skipped by `continue`. Output is `[0, 2, 4]`.'
  },
  {
    t: 'Zip Parallel Iteration',
    c: 'zip() pairs corresponding elements from multiple iterables until the shortest iterable is exhausted.',
    m: 'builder',
    codeBlocks: [
      'names = ["CPU", "GPU"]',
      'temps = [45, 65]',
      'for name, temp in zip(names, temps):',
      '    print(f"{name}={temp}C")'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the parallel zip iteration pipeline:',
    h: 'Define names, define temps, loop using zip(names, temps), print formatted string.',
    explanation: '`zip(names, temps)` pairs "CPU" with 45 and "GPU" with 65 for parallel unpack in the for loop.'
  },
  {
    t: 'For..Else Construct',
    c: 'A loop\'s else clause runs when the loop finishes normally without encountering a break.',
    m: 'detective',
    code: `found = False\nfor x in [1, 3, 5]:\n    if x % 2 == 0:\n        found = True\n        break\nelse:\n    print("NO_EVENS")`,
    q: 'OUTPUT DETECTIVE: No break is hit because all numbers are odd. What does the else block print?',
    opts: [
      '"NO_EVENS"',
      'Nothing; else is only for if statements',
      'SyntaxError',
      '"FOUND"'
    ],
    a: 0,
    h: 'In Python, a loop else executes only if the loop completes without a break.',
    explanation: 'In Python, a `for...else` block executes when the loop finishes iterating all items without encountering a `break`.'
  },
  {
    t: 'List Comprehension Basics',
    c: 'List comprehensions provide a concise way to create lists using [expr for item in iterable].',
    m: 'completion',
    code: `numbers = [1, 2, 3, 4]\nsquares = [___ for n in numbers]\nprint(squares)`,
    q: 'CODE COMPLETION: Choose the expression to create a list of squared numbers [1, 4, 9, 16]:',
    opts: [
      'n ** 2',
      'n * n * n',
      'n ^ 2',
      'sqr(n)'
    ],
    a: 0,
    h: 'Use n ** 2 or n * n for squaring.',
    explanation: '`[n ** 2 for n in numbers]` squares each number, resulting in `[1, 4, 9, 16]`.'
  },
  // BOSS 3: Level 24
  {
    t: 'THE RECURSION WYRM',
    isBoss: true,
    name: 'THE RECURSION WYRM',
    hp: 700,
    avatar: '🐉',
    story: 'A serpentine beast nesting in deep call stacks of Iteration Ridge. It guards against infinite recursion and stack collapse!',
    phases: [
      {
        q: 'PHASE 1: Wyrm tests recursion base cases! What occurs if a recursive function lacks a terminating base case?',
        opts: [
          'RecursionError: maximum recursion depth exceeded',
          'The function automatically returns 0',
          'Memory is purged and program restarts',
          'SyntaxError'
        ],
        a: 0,
        explanation: 'Without a base case, Python exceeds its maximum call stack depth (default 1000) and raises a `RecursionError`.'
      },
      {
        q: 'PHASE 2: Wyrm tests nested comprehension! What does [x for row in [[1, 2], [3, 4]] for x in row] produce?',
        opts: ['[1, 2, 3, 4]', '[[1, 2], [3, 4]]', '[1, 3, 2, 4]', '[[1, 3], [2, 4]]'],
        a: 0,
        explanation: 'This flattens the 2D matrix into a 1D list `[1, 2, 3, 4]` using nested iteration.'
      },
      {
        q: 'PHASE 3: Wyrm challenges range bounds! What is len(range(10, 20))?',
        opts: ['10', '11', '9', '20'],
        a: 0,
        explanation: '`range(10, 20)` covers values 10 through 19, which contains exactly 10 numbers.'
      },
      {
        q: 'PHASE 4: Wyrm tests filtered comprehensions! What is [x for x in range(6) if x > 3]?',
        opts: ['[4, 5]', '[3, 4, 5]', '[4, 5, 6]', '[0, 1, 2, 3]'],
        a: 0,
        explanation: '`range(6)` contains 0..5. Only 4 and 5 are strictly greater than 3, producing `[4, 5]`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which built-in function returns an iterator that moves through items in reverse?',
        opts: ['reversed()', 'backward()', 'invert()', 'flip()'],
        a: 0,
        explanation: '`reversed(seq)` returns a reverse iterator over the values of the given sequence.'
      }
    ]
  },

  // =========================================================================
  // AREA 4: FUNCTION FOUNDRY (Lv 25-32) - FUNCTIONS & SCOPE
  // =========================================================================
  {
    t: 'Function Definition Syntax',
    c: 'Functions are defined using the def keyword, followed by the function name and parameters in parentheses.',
    m: 'glitch',
    code: `function neutralizeBug(target):\n    return f"Purified {target}"`,
    q: 'BUG HUNTER: Fix the keyword in the function definition header:',
    opts: [
      'def neutralizeBug(target):',
      'fn neutralizeBug(target):',
      'func neutralizeBug(target):',
      'define neutralizeBug(target):'
    ],
    a: 0,
    h: 'Python uses def to define functions.',
    explanation: 'In Python, function headers begin with `def`, followed by the function name, arguments, and a colon.'
  },
  {
    t: 'Multiple Return Values (Tuples)',
    c: 'A Python function can return multiple values separated by commas, packaged as a tuple.',
    m: 'runner',
    code: `def get_coords():\n    return 10, 20\nx, y = get_coords()\nprint(x + y)`,
    q: 'SPEED RUN: What is the sum of unpacked coordinates x and y (10 + 20)?',
    opts: [
      '30',
      '1020',
      '(10, 20)',
      'None'
    ],
    a: 0,
    h: 'x is 10, y is 20: 10 + 20 = 30.',
    explanation: 'Returning `10, 20` returns a tuple `(10, 20)`. Unpacking sets `x=10` and `y=20`, whose sum is 30.'
  },
  {
    t: 'Arbitrary Positional Arguments (*args)',
    c: '*args collects extra positional arguments into a tuple.',
    m: 'detective',
    code: `def calc_sum(*args):\n    return sum(args)\nprint(calc_sum(5, 10, 15))`,
    q: 'OUTPUT DETECTIVE: What does calc_sum(5, 10, 15) return?',
    opts: [
      '30',
      '15',
      '(5, 10, 15)',
      'TypeError'
    ],
    a: 0,
    h: 'Sum 5 + 10 + 15.',
    explanation: '`*args` packages the arguments `(5, 10, 15)` into a tuple. `sum(args)` computes 5 + 10 + 15 = 30.'
  },
  {
    t: 'Arbitrary Keyword Arguments (**kwargs)',
    c: '**kwargs collects keyword arguments into a standard dictionary.',
    m: 'detective',
    code: `def inspect_bot(**kwargs):\n    return len(kwargs)\nprint(inspect_bot(model="X1", hp=100, role="Sniper"))`,
    q: 'OUTPUT DETECTIVE: How many key-value pairs were passed into kwargs?',
    opts: [
      '1',
      '2',
      '3',
      'None'
    ],
    a: 2,
    h: 'Count the keyword arguments: model, hp, role.',
    explanation: '`**kwargs` stores `{"model": "X1", "hp": 100, "role": "Sniper"}`, which has 3 keys.'
  },
  {
    t: 'Default Mutable Argument Trap',
    c: 'Default parameter expressions are evaluated once when the function is defined, not per call!',
    m: 'detective',
    code: `def append_item(val, bucket=[]):\n    bucket.append(val)\n    return bucket\nappend_item(1)\nprint(append_item(2))`,
    q: 'OUTPUT DETECTIVE: The default list [] is shared across calls! What is printed?',
    opts: [
      '[2]',
      '[1, 2]',
      '[[1], [2]]',
      '[1]'
    ],
    a: 1,
    h: 'The same list instance is reused across invocations when using a mutable default argument.',
    explanation: 'Because default arguments are evaluated only once at definition time, the same list `bucket` is reused across calls, retaining `[1]` from call 1 and adding `2` on call 2.'
  },
  {
    t: 'Lambda Anonymous Functions',
    c: 'lambda parameters: expression creates a small anonymous inline function.',
    m: 'completion',
    code: `multiplier = ___ x, y: x * y\nprint(multiplier(6, 7))`,
    q: 'CODE COMPLETION: Choose the keyword that defines an anonymous inline function in Python:',
    opts: [
      'lambda',
      'def',
      'fn',
      'arrow'
    ],
    a: 0,
    h: 'Python uses the keyword lambda for inline single-expression functions.',
    explanation: '`lambda x, y: x * y` creates an anonymous function taking parameters x and y and returning their product (42).'
  },
  {
    t: 'Global vs Local Scope',
    c: 'To reassign a global variable from inside a function, the global keyword must be declared.',
    m: 'builder',
    codeBlocks: [
      'score = 50',
      'def boost():',
      '    global score',
      '    score += 25',
      'boost()',
      'print(score)'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the global variable modification sequence:',
    h: 'Initialize score, define function with global declaration, increment score, call function, print.',
    explanation: 'Declaring `global score` inside `boost()` informs Python that assignments to `score` affect the global module-level variable.'
  },
  // BOSS 4: Level 32
  {
    t: 'THE SCOPE PHANTOM',
    isBoss: true,
    name: 'THE SCOPE PHANTOM',
    hp: 800,
    avatar: '👻',
    story: 'A phantom haunting Function Foundry, twisting LEGB scope lookups and closing enclosing variables.',
    phases: [
      {
        q: 'PHASE 1: Phantom tests LEGB lookup order! What does the acronym LEGB stand for?',
        opts: [
          'Local, Enclosing, Global, Built-in',
          'Linear, Extended, Global, Binary',
          'Lexical, Evaluation, Global, Base',
          'Local, Environment, Global, Bytecode'
        ],
        a: 0,
        explanation: 'Python resolves variable names following LEGB order: Local -> Enclosing -> Global -> Built-in.'
      },
      {
        q: 'PHASE 2: Phantom tests nonlocal! Which keyword modifies a variable in an outer enclosing (non-global) scope?',
        opts: ['nonlocal', 'global', 'outer', 'super'],
        a: 0,
        explanation: '`nonlocal` causes the variable identifier to refer to previously bound variables in the nearest enclosing scope excluding globals.'
      },
      {
        q: 'PHASE 3: Phantom tests first-class functions! Can Python functions be passed as arguments and stored in lists?',
        opts: [
          'Yes, functions are first-class objects in Python',
          'No, only primitive types can be passed',
          'Only lambda functions can be stored',
          'Only functions decorated with @object'
        ],
        a: 0,
        explanation: 'In Python, functions are first-class citizens: they can be assigned to variables, passed as arguments, and returned from other functions.'
      },
      {
        q: 'PHASE 4: Phantom casts basic decorator syntax! What does the @decorator syntax above a function def do?',
        opts: [
          'Passes the function to the decorator and rebinds the name to its result',
          'Compiles the function into C machine code',
          'Runs the function in a background OS thread',
          'Makes the function private'
        ],
        a: 0,
        explanation: '`@dec\ndef f(): ...` is syntactic sugar for `f = dec(f)`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What is the default return value of a Python function that executes no return statement?',
        opts: ['None', '0', 'False', 'undefined'],
        a: 0,
        explanation: 'Functions without an explicit `return` statement in Python automatically return `None` upon reaching the end.'
      }
    ]
  },

  // =========================================================================
  // AREA 5: COLLECTION CAVERNS (Lv 33-40) - DATA STRUCTURES
  // =========================================================================
  {
    t: 'Dictionary Access with .get()',
    c: 'dict.get(key, default) avoids KeyError exceptions by returning a default value if the key is missing.',
    m: 'glitch',
    code: `config = {"mode": "STEALTH"}\nlevel = config["difficulty"]`,
    q: 'BUG HUNTER: Accessing "difficulty" directly crashes with KeyError. What method safely retrieves it with a fallback?',
    opts: [
      'config.get("difficulty", "NORMAL")',
      'config.fetch("difficulty", "NORMAL")',
      'config.find("difficulty") or "NORMAL"',
      'config.safe_read("difficulty")'
    ],
    a: 0,
    h: 'Use the dictionary .get() method with a second default argument.',
    explanation: '`config.get("difficulty", "NORMAL")` safely returns `"NORMAL"` without throwing a KeyError.'
  },
  {
    t: 'Tuple Immutability',
    c: 'Tuples are ordered collections that cannot be modified after creation.',
    m: 'runner',
    code: `coords = (10, 20)\ncoords[0] = 99`,
    q: 'SPEED RUN: What exception is raised by trying to mutate a tuple element?',
    opts: [
      'TypeError: \'tuple\' object does not support item assignment',
      'ValueError: tuple is locked',
      'IndexError: index 0 out of bounds',
      'AttributeError: readonly'
    ],
    a: 0,
    h: 'Tuples are immutable; attempting to reassign an index raises TypeError.',
    explanation: 'Tuples cannot be altered once instantiated. Attempting item assignment raises a `TypeError`.'
  },
  {
    t: 'Set Uniqueness & Deduplication',
    c: 'Sets contain only unique, hashable elements and eliminate duplicate values.',
    m: 'detective',
    code: `raw_ids = [1, 2, 2, 3, 3, 3, 4]\nunique_ids = set(raw_ids)\nprint(len(unique_ids))`,
    q: 'OUTPUT DETECTIVE: How many unique elements remain in the set?',
    opts: [
      '4',
      '7',
      '3',
      '1'
    ],
    a: 0,
    h: 'The unique values are 1, 2, 3, 4.',
    explanation: 'Converting `[1, 2, 2, 3, 3, 3, 4]` to a `set` deduplicates duplicates, leaving `{1, 2, 3, 4}` with length 4.'
  },
  {
    t: 'Dictionary Comprehension',
    c: 'Dict comprehensions construct new dictionaries using {k: v for item in iterable}.',
    m: 'detective',
    code: `nodes = ["A", "B"]\nstatus = {n: len(n) * 10 for n in nodes}\nprint(status["A"])`,
    q: 'OUTPUT DETECTIVE: What value is mapped to key "A" (len("A") * 10)?',
    opts: [
      '10',
      '20',
      '1',
      '"10"'
    ],
    a: 0,
    h: 'len("A") is 1: 1 * 10 = 10.',
    explanation: 'The dictionary maps each letter to its length times 10. `len("A")` is 1, so `status["A"]` is 10.'
  },
  {
    t: 'Set Operations (Union & Intersection)',
    c: 'Sets support mathematical operations: & (intersection), | (union), - (difference).',
    m: 'builder',
    codeBlocks: [
      'group_a = {"LASER", "SHIELD"}',
      'group_b = {"SHIELD", "MISSILE"}',
      'common = group_a & group_b',
      'print(common)'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the set intersection calculation:',
    h: 'Define group_a, define group_b, compute intersection with &, print common elements.',
    explanation: 'The `&` operator computes the intersection of sets, returning `{"SHIELD"}`.'
  },
  {
    t: 'List Sorting: sort() vs sorted()',
    c: 'list.sort() modifies the list in-place and returns None; sorted(list) returns a new sorted list.',
    m: 'detective',
    code: `nums = [3, 1, 2]\nres = nums.sort()\nprint(res, nums)`,
    q: 'OUTPUT DETECTIVE: What does nums.sort() return into res, and what is nums now?',
    opts: [
      'None [1, 2, 3]',
      '[1, 2, 3] [1, 2, 3]',
      '[1, 2, 3] [3, 1, 2]',
      'None [3, 1, 2]'
    ],
    a: 0,
    h: 'In-place methods in Python return None by convention to prevent chaining confusion.',
    explanation: '`.sort()` mutates the list in place and returns `None`. Therefore `res` is `None` and `nums` is `[1, 2, 3]`.'
  },
  {
    t: 'Unpacking with Asterisk (*rest)',
    c: 'Extended iterable unpacking collects excess elements into a list using *rest.',
    m: 'detective',
    code: `first, *middle, last = [10, 20, 30, 40, 50]\nprint(middle)`,
    q: 'OUTPUT DETECTIVE: What elements were gathered into the middle list?',
    opts: [
      '[20, 30, 40]',
      '[10, 20, 30]',
      '[20, 30, 40, 50]',
      '[30]'
    ],
    a: 0,
    h: 'first gets 10, last gets 50, middle gets everything in between.',
    explanation: '`first` takes 10, `last` takes 50, and `*middle` captures `[20, 30, 40]`.'
  },
  // BOSS 5: Level 40
  {
    t: 'THE HASH COLLISION SPECTRE',
    isBoss: true,
    name: 'THE HASH COLLISION SPECTRE',
    hp: 900,
    avatar: '👻',
    story: 'A shadowy entity haunting Collection Caverns, corrupting hash buckets and dictionary keys.',
    phases: [
      {
        q: 'PHASE 1: Spectre tests dictionary key requirements! What requirement must an object satisfy to be used as a dict key?',
        opts: [
          'It must be hashable and immutable (e.g. str, int, tuple)',
          'It must be a mutable list or dictionary',
          'It must inherit from collections.abc.Key',
          'It must have an integer id smaller than 256'
        ],
        a: 0,
        explanation: 'Dictionary keys in Python must be hashable, requiring a `__hash__()` method and immutability (lists and dicts cannot be keys).'
      },
      {
        q: 'PHASE 2: Spectre tests list pop index! What does [10, 20, 30].pop(0) return?',
        opts: ['10', '30', '20', '[20, 30]'],
        a: 0,
        explanation: '`pop(0)` removes and returns the element at index 0 (10).'
      },
      {
        q: 'PHASE 3: Spectre queries zip dictionary creation! How do you convert two lists of keys and values into a dictionary?',
        opts: [
          'dict(zip(keys, values))',
          'map(keys, values).to_dict()',
          'keys.merge(values)',
          '{keys: values}'
        ],
        a: 0,
        explanation: '`dict(zip(keys, values))` is the standard idiomatic way to construct a dictionary from paired sequences in Python.'
      },
      {
        q: 'PHASE 4: Spectre tests dict .items() iteration! What does dict.items() yield during iteration?',
        opts: [
          'Tuples of (key, value)',
          'Keys only',
          'Values only',
          'Nested dictionaries'
        ],
        a: 0,
        explanation: 'The `.items()` method returns a dynamic view of `(key, value)` 2-tuples.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which collections module class provides a dictionary with default values for nonexistent keys?',
        opts: [
          'collections.defaultdict',
          'collections.OrderedDict',
          'collections.Counter',
          'collections.deque'
        ],
        a: 0,
        explanation: '`defaultdict` calls a factory function (e.g. `list`, `int`) to supply missing values automatically without raising KeyError.'
      }
    ]
  },

  // =========================================================================
  // AREA 6: OOP CITADEL (Lv 41-48) - OBJECT-ORIENTED PROGRAMMING
  // =========================================================================
  {
    t: 'Class __init__ Initializer',
    c: '__init__ is the initializer method automatically called when a new class instance is created.',
    m: 'glitch',
    code: `class Drone:\n    def init(self, model):\n        self.model = model`,
    q: 'BUG HUNTER: The constructor never fires on instantiation. What are the missing dunder underscores?',
    opts: [
      'def __init__(self, model):',
      'def __construct__(self, model):',
      'def Drone(self, model):',
      'def __new_drone__(self, model):'
    ],
    a: 0,
    h: 'Python initializer methods have two leading and two trailing underscores: __init__.',
    explanation: 'The instance initializer method in Python is named `__init__`. Omitting the double underscores leaves it as an uncalled regular method.'
  },
  {
    t: 'The "self" Parameter',
    c: 'self represents the instance of the class and binds instance attributes and methods.',
    m: 'runner',
    code: `class Mech:\n    def __init__(self, hp):\n        self.hp = hp\n    def get_hp():\n        return hp\nm = Mech(100)\n# m.get_hp() crashes with TypeError!`,
    q: 'SPEED RUN: Why would m.get_hp() fail when invoked on the instance?',
    opts: [
      'get_hp() lacks the mandatory "self" parameter in its definition',
      'm must be declared with new Mech(100)',
      'hp must be declared as private with $$$',
      'Methods cannot return numbers in Python'
    ],
    a: 0,
    h: 'Instance methods in Python must explicitly accept "self" as their first argument.',
    explanation: 'When an instance method is called (`m.get_hp()`), Python automatically passes the instance `m` as the first argument. If `get_hp` accepts 0 arguments, a `TypeError` occurs.'
  },
  {
    t: 'Class Inheritance & super()',
    c: 'Inheritance allows a child class to inherit attributes and methods from a parent class.',
    m: 'builder',
    codeBlocks: [
      'class Unit:',
      '    def __init__(self, name): self.name = name',
      'class Cyborg(Unit):',
      '    def __init__(self, name, cyber_level):',
      '        super().__init__(name)',
      '        self.cyber_level = cyber_level',
      'c = Cyborg("K-9", 3)',
      'print(c.name, c.cyber_level)'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    q: 'CODE BUILDER: Assemble the parent-child class inheritance and super() initializer:',
    h: 'Parent Unit, child Cyborg(Unit), super().__init__, set cyber_level, instantiate, print.',
    explanation: '`Cyborg(Unit)` inherits from `Unit`, and `super().__init__(name)` initializes the parent class state.'
  },
  {
    t: 'String Representation: __str__ vs __repr__',
    c: '__str__ returns human-readable text (used by print); __repr__ returns unambiguous code representation.',
    m: 'detective',
    code: `class Core:\n    def __str__(self):\n        return "Core:Active"\n    def __repr__(self):\n        return "Core(status=1)"\nc = Core()\nprint(str(c))`,
    q: 'OUTPUT DETECTIVE: What string does str(c) return?',
    opts: [
      '"Core:Active"',
      '"Core(status=1)"',
      '<Core object at 0x...>',
      'None'
    ],
    a: 0,
    h: '__str__ is invoked by str() and print().',
    explanation: '`str()` invokes the `__str__()` dunder method, which returns `"Core:Active"`.'
  },
  {
    t: 'The @property Decorator',
    c: '@property turns a method into a getter attribute, accessed without parentheses.',
    m: 'detective',
    code: `class Reactor:\n    def __init__(self, temp):\n        self._temp = temp\n    @property\n    def temp_f(self):\n        return (self._temp * 9/5) + 32\nr = Reactor(0)\nprint(r.temp_f)`,
    q: 'OUTPUT DETECTIVE: Notice temp_f has no ()! What is printed for 0 degrees C in Fahrenheit?',
    opts: [
      '32.0',
      '0.0',
      '<bound method Reactor.temp_f>',
      'TypeError'
    ],
    a: 0,
    h: '@property makes the method accessible like an attribute: (0 * 9/5) + 32 = 32.0.',
    explanation: 'The `@property` decorator allows `temp_f` to be accessed without parentheses like an attribute. 0 * 9/5 + 32 = 32.0.'
  },
  {
    t: 'Class Methods vs Static Methods',
    c: '@classmethod receives the class (cls) as first argument; @staticmethod receives neither self nor cls.',
    m: 'completion',
    code: `class Factory:\n    unit_count = 0\n    @___\n    def create_unit(cls):\n        cls.unit_count += 1\n        return cls()`,
    q: 'CODE COMPLETION: Choose the decorator that passes the class cls as first argument:',
    opts: [
      'classmethod',
      'staticmethod',
      'property',
      'singleton'
    ],
    a: 0,
    h: 'Class methods use @classmethod and accept cls as first argument.',
    explanation: '`@classmethod` designates a method that receives the class `cls` as its first parameter rather than an instance.'
  },
  {
    t: 'Dunder Method __len__',
    c: 'Implementing __len__ enables the built-in len() function on instances of your custom class.',
    m: 'detective',
    code: `class Squad:\n    def __init__(self):\n        self.members = ["A", "B", "C"]\n    def __len__(self):\n        return len(self.members)\ns = Squad()\nprint(len(s))`,
    q: 'OUTPUT DETECTIVE: What does len(s) return on the custom Squad instance?',
    opts: [
      '3',
      'TypeError: object of type Squad has no len()',
      '0',
      '["A", "B", "C"]'
    ],
    a: 0,
    h: 'len(s) delegates directly to s.__len__().',
    explanation: 'When `len(s)` is called, Python calls `s.__len__()`, which returns the length of `members` (3).'
  },
  // BOSS 6: Level 48
  {
    t: 'THE METACLASS BEHEMOTH',
    isBoss: true,
    name: 'THE METACLASS BEHEMOTH',
    hp: 1000,
    avatar: '👹',
    story: 'A cosmic titan commanding OOP Citadel, constructing classes dynamically from type metaclasses.',
    phases: [
      {
        q: 'PHASE 1: Behemoth tests MRO! What does MRO stand for in Python multiple inheritance?',
        opts: [
          'Method Resolution Order',
          'Memory Reference Optimization',
          'Module Runtime Object',
          'Meta Reduction Operation'
        ],
        a: 0,
        explanation: 'MRO (Method Resolution Order) defines the order in which base classes are searched when looking for an attribute or method (using the C3 linearization algorithm).'
      },
      {
        q: 'PHASE 2: Behemoth tests private name mangling! How does Python mangle double-underscore attributes like self.__secret in class Bot?',
        opts: [
          'self._Bot__secret',
          'self.__private__secret',
          'It throws an AccessError',
          'It encrypts the variable at runtime'
        ],
        a: 0,
        explanation: 'Python prevents subclass collisions by mangling `__attribute` to `_ClassName__attribute`.'
      },
      {
        q: 'PHASE 3: Behemoth tests isinstance vs type! Does isinstance(cyborg, Unit) return True if Cyborg inherits from Unit?',
        opts: [
          'Yes, isinstance respects inheritance relationships',
          'No, only type() respects inheritance',
          'Only if Unit is an abstract class',
          'It throws a TypeError'
        ],
        a: 0,
        explanation: '`isinstance()` returns `True` for instances of the class or any class derived from it.'
      },
      {
        q: 'PHASE 4: Behemoth strikes slots! What is the primary benefit of defining __slots__ on a Python class?',
        opts: [
          'Restricts dynamic attribute creation and saves memory by avoiding __dict__',
          'Enables multi-threading execution',
          'Makes all methods static',
          'Encrypts class bytecode'
        ],
        a: 0,
        explanation: '`__slots__` tells Python not to use a dynamic `__dict__` for each instance, substantially reducing memory consumption.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What is the default metaclass that creates all standard classes in Python?',
        opts: ['type', 'object', 'metaclass', 'ClassType'],
        a: 0,
        explanation: 'In Python, `type` is the built-in metaclass that constructs classes: `class Foo:` is created by `type("Foo", bases, dict)`.'
      }
    ]
  },

  // =========================================================================
  // AREA 7: GENERATOR CORE & MASTER CHALLENGES (Lv 49-51)
  // =========================================================================
  {
    t: 'Generators & the yield Keyword',
    c: 'A generator function uses yield to produce a sequence of values lazily on demand.',
    m: 'detective',
    code: `def power_gen():\n    yield 100\n    yield 200\n    yield 300\ngen = power_gen()\nprint(next(gen), next(gen))`,
    q: 'OUTPUT DETECTIVE: What two values are yielded by the first two next() calls?',
    opts: [
      '100 200',
      '100 100',
      '200 300',
      '300 200'
    ],
    a: 0,
    h: 'Each next() advances the generator to the next yield statement.',
    explanation: 'The first `next(gen)` yields 100 and pauses; the second `next(gen)` resumes and yields 200.'
  },
  {
    t: 'Context Managers (with statement)',
    c: 'The with statement guarantees entry and exit clean-up (calling __enter__ and __exit__).',
    m: 'builder',
    codeBlocks: [
      'class ShieldBarrier:',
      '    def __enter__(self):',
      '        print("ARMED")',
      '        return self',
      '    def __exit__(self, exc_type, exc_val, tb):',
      '        print("DISARMED")',
      'with ShieldBarrier():',
      '    print("MISSION")'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    q: 'CODE BUILDER: Assemble the custom context manager with __enter__ and __exit__:',
    h: 'Define class, __enter__ prints ARMED, __exit__ prints DISARMED, with block prints MISSION.',
    explanation: 'The `with` statement calls `__enter__` before entering the block, and `__exit__` upon exiting the block, even if an exception occurs.'
  },
  // FINAL BOSS: Level 51
  {
    t: 'THE GIL DRAGON',
    isBoss: true,
    isFinalBoss: true,
    name: 'THE GIL DRAGON',
    hp: 1200,
    avatar: '🐲',
    story: 'THE SUPREME BEAST OF PYTHON RUNTIME! It wields the Global Interpreter Lock, bytecode compilers, and garbage collectors. Overcome it to achieve complete Python Mastery!',
    phases: [
      {
        q: 'PHASE 1: Dragon challenges thread concurrency! What is the GIL in standard CPython?',
        opts: [
          'Global Interpreter Lock (a mutex that prevents multiple native threads from executing Python bytecodes at once)',
          'Graphic Interface Library',
          'Garbage Inspection Loop',
          'General Instruction Linker'
        ],
        a: 0,
        explanation: 'The GIL (Global Interpreter Lock) is a mutex in CPython that ensures only one thread executes Python bytecode at a time.'
      },
      {
        q: 'PHASE 2: Dragon tests CPU parallelism! Which standard library module bypasses the GIL for CPU-bound tasks?',
        opts: ['multiprocessing', 'threading', 'asyncio', 'time'],
        a: 0,
        explanation: 'The `multiprocessing` module side-steps the GIL by spawning distinct OS processes with their own separate Python interpreters and memory spaces.'
      },
      {
        q: 'PHASE 3: Dragon tests generator exhaustion! What exception is raised when next() is called on an exhausted generator?',
        opts: ['StopIteration', 'GeneratorExit', 'IndexError', 'StopAsyncIteration'],
        a: 0,
        explanation: 'When a generator has no more values to yield, it signals termination by raising a `StopIteration` exception.'
      },
      {
        q: 'PHASE 4: Dragon tests memory garbage collection! How does CPython primarily track and reclaim memory?',
        opts: [
          'Reference counting combined with a generational cyclic garbage collector',
          'Manual free() invocations only',
          'Full stop-the-world tracing only',
          'Stack allocation only'
        ],
        a: 0,
        explanation: 'CPython primarily deallocates objects the moment their reference count drops to zero, and uses a generational collector for reference cycles.'
      },
      {
        q: 'PHASE 5: MASTER STRIKE! Which dunder method is invoked when an instance is called like a function obj()?',
        opts: ['__call__', '__invoke__', '__run__', '__execute__'],
        a: 0,
        explanation: 'Implementing the `__call__()` method allows an instance of a class to be called as a function (making it a callable).'
      }
    ]
  }
];
