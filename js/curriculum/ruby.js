/**
 * GLITCH RUNNER - RUBY CURRICULUM (51 LEVELS)
 * Areas:
 * Area 1: Gem Mine (Lv 1-8, Boss: THE SYMBOL GOLEM)
 * Area 2: Block Forest (Lv 9-16, Boss: THE YIELD PHANTOM)
 * Area 3: Method Mountain (Lv 17-24, Boss: THE MONKEY PATCH CHIMERA)
 * Area 4: Module Meadow (Lv 25-32, Boss: THE METHOD MISSING BEAST)
 * Area 5: Enumerable Edge (Lv 33-40, Boss: THE ITERATOR TITAN)
 * Area 6: Meta Matrix (Lv 41-48, Boss: THE EVAL SPECTRE)
 * Area 7: Ruby Sanctuary (Lv 49-51, Final Boss: THE ELEGANT SOVEREIGN)
 */

window.CURRICULUM_DATA = window.CURRICULUM_DATA || {};

window.CURRICULUM_DATA.ruby = [
  // =========================================================================
  // AREA 1: GEM MINE (Lv 1-8) - FOUNDATION & SYMBOLS
  // =========================================================================
  {
    t: 'Ruby Standard Output (puts vs print)',
    c: 'puts outputs a string followed by a newline; print outputs without a trailing newline.',
    m: 'glitch',
    code: `System.out.println("RUBY ONLINE") # Bug: Java syntax!`,
    q: 'BUG HUNTER: Replace Java syntax with the standard Ruby printing method:',
    opts: [
      'puts "RUBY ONLINE"',
      'echo "RUBY ONLINE"',
      'console.write("RUBY ONLINE")',
      'terminal.out("RUBY ONLINE")'
    ],
    a: 0,
    h: 'Use puts "..." in Ruby.',
    explanation: 'Ruby uses `puts` (put string) for standard console output with an automatic newline.'
  },
  {
    t: 'Everything is an Object in Ruby',
    c: 'In Ruby, numbers, strings, and booleans are full objects with built-in methods.',
    m: 'runner',
    code: `result = 5.next\nputs result`,
    q: 'SPEED RUN: Even numbers have methods in Ruby! What does 5.next return?',
    opts: [
      '6',
      '5',
      '0',
      'NoMethodError'
    ],
    a: 0,
    h: '5.next evaluates to 6.',
    explanation: 'In Ruby, integer `5` is an instance of `Integer`. Calling `.next` returns `6`.'
  },
  {
    t: 'Symbols vs Strings (:symbol)',
    c: 'Symbols (:name) are immutable, interned identifiers that share the exact same object_id in memory.',
    m: 'detective',
    code: `s1 = :status\ns2 = :status\nputs s1.object_id == s2.object_id`,
    q: 'OUTPUT DETECTIVE: Because symbols are interned in memory, what boolean is printed?',
    opts: [
      'true',
      'false',
      'nil',
      'Compilation Error'
    ],
    a: 0,
    h: 'Identical symbols share the exact same object_id.',
    explanation: 'Unlike strings where `"status"` and `"status"` create separate objects in memory, identical symbols `:status` share the exact same `object_id`.'
  },
  {
    t: 'String Interpolation ("#{expr}")',
    c: 'Double-quoted strings support expression interpolation using #{expression}.',
    m: 'detective',
    code: `level = 7\nmsg = "Sector Level: #{level * 2}"\nputs msg`,
    q: 'OUTPUT DETECTIVE: What string is formatted by #{level * 2}?',
    opts: [
      '"Sector Level: 14"',
      '"Sector Level: #{level * 2}"',
      '"Sector Level: 7"',
      'TypeError'
    ],
    a: 0,
    h: '7 * 2 = 14 inside #{}.',
    explanation: 'Ruby evaluates expressions enclosed in `#{}` inside double-quoted strings: 7 * 2 = 14.'
  },
  {
    t: 'Ruby Script Execution Pipeline',
    c: 'Clean script assembly demonstrating variable declaration and interpolation.',
    m: 'builder',
    codeBlocks: [
      'gem_count = 15',
      'gem_count += 5',
      'report = "Vault: #{gem_count} gems"',
      'puts report'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the Ruby vault calculation script (15 + 5 = 20 gems):',
    h: 'Initialize gem_count, increment by 5, construct report string, puts report.',
    explanation: '`gem_count` begins at 15, increments to 20, is interpolated into `report`, and printed with `puts`.'
  },
  {
    t: 'Parallel Assignment & Swap',
    c: 'Ruby supports parallel multiple assignment: a, b = b, a swaps values directly.',
    m: 'completion',
    code: `x = 10\ny = 20\nx, y = ___\nputs x # prints 20`,
    q: 'CODE COMPLETION: Choose the right-hand expression that swaps x and y values:',
    opts: [
      'y, x',
      'x, y',
      '[y, x]',
      'swap(x, y)'
    ],
    a: 0,
    h: 'Parallel assignment: x, y = y, x.',
    explanation: '`x, y = y, x` swaps the two variables simultaneously without a temporary variable.'
  },
  {
    t: 'The nil Singleton Object',
    c: 'nil is an object representing nothingness; in boolean context only nil and false are falsy!',
    m: 'detective',
    code: `val = nil\nputs val.nil?`,
    q: 'OUTPUT DETECTIVE: What does val.nil? return when val is nil?',
    opts: [
      'true',
      'false',
      'nil',
      'NoMethodError'
    ],
    a: 0,
    h: 'The nil? predicate method returns true on nil.',
    explanation: '`nil` is an instance of `NilClass` with a `.nil?` method that returns `true`.'
  },
  // BOSS 1: Level 8
  {
    t: 'THE SYMBOL GOLEM',
    isBoss: true,
    name: 'THE SYMBOL GOLEM',
    hp: 500,
    avatar: '🗿',
    story: 'A crystalline behemoth guarding Gem Mine, testing symbol intern tables and truthiness laws!',
    phases: [
      {
        q: 'PHASE 1: Golem tests Ruby truthiness! In Ruby, which of the following values evaluates to truthy?',
        opts: [
          '0 and "" (empty string)',
          'nil',
          'false',
          'None of these'
        ],
        a: 0,
        explanation: 'In Ruby, ONLY `false` and `nil` are falsy! Everything else—including number `0` and empty string `""`—evaluates to `true`.'
      },
      {
        q: 'PHASE 2: Golem tests symbol conversion! Which method converts a String into a Symbol in Ruby?',
        opts: ['to_sym (or intern)', 'to_s', 'to_i', 'symbolize'],
        a: 0,
        explanation: '`"name".to_sym` (or `"name".intern`) converts a string into its corresponding symbol `:name`.'
      },
      {
        q: 'PHASE 3: Golem tests p vs puts! What is the difference between p obj and puts obj?',
        opts: [
          'p calls inspect on the object (useful for debugging, quotes strings); puts calls to_s',
          'p prints in red',
          'puts deletes the object',
          'There is no difference'
        ],
        a: 0,
        explanation: '`p` prints `obj.inspect` (revealing types, strings in quotes, arrays in brackets), making it the primary debugging tool.'
      },
      {
        q: 'PHASE 4: Golem tests integer division! What does 7 / 2 evaluate to in Ruby?',
        opts: ['3', '3.5', '4', 'TypeError'],
        a: 0,
        explanation: 'Dividing two integers in Ruby performs integer division, truncating to `3`. (To get a float, use `7 / 2.0`).'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which method checks the exact class of an object in Ruby?',
        opts: ['class', 'type', 'typeof', 'is_a'],
        a: 0,
        explanation: 'Every Ruby object inherits the `.class` method from `Object`, returning its class constant (e.g. `5.class == Integer`).'
      }
    ]
  },

  // =========================================================================
  // AREA 2: BLOCK FOREST (Lv 9-16) - BLOCKS, PROCS & LAMBDAS
  // =========================================================================
  {
    t: 'Blocks and the yield Keyword',
    c: 'yield transfers control from a method to the block passed to that method.',
    m: 'glitch',
    code: `def execute_strike\n    puts "AIM"\n    call // Bug: Use yield keyword to invoke block!\n    puts "FIRED"\n}\nexecute_strike { puts "FIRE!" }`,
    q: 'BUG HUNTER: Replace the invalid call with the Ruby keyword that invokes an attached block:',
    opts: [
      'yield',
      'block.call',
      'invoke',
      'run'
    ],
    a: 0,
    h: 'Use the yield keyword.',
    explanation: 'In Ruby, the `yield` keyword pauses the method and executes the attached block.'
  },
  {
    t: 'The block_given? Guard',
    c: 'block_given? checks whether a block was provided to the method before calling yield.',
    m: 'runner',
    code: `def ping\n    return "NO_BLOCK" unless block_given?\n    yield\nend\nputs ping`,
    q: 'SPEED RUN: Because no block was passed, what does ping return?',
    opts: [
      '"NO_BLOCK"',
      'LocalJumpError',
      'nil',
      'Compilation Error'
    ],
    a: 0,
    h: 'block_given? is false, returning "NO_BLOCK".',
    explanation: 'Calling `yield` without a block raises a `LocalJumpError`. `block_given?` guards against this, returning `"NO_BLOCK"`.'
  },
  {
    t: 'Blocks with Arguments',
    c: 'yield(value) passes arguments to the block, received between pipes |arg|.',
    m: 'detective',
    code: `def double_it(num)\n    yield(num * 2)\nend\ndouble_it(5) { |res| puts res }`,
    q: 'OUTPUT DETECTIVE: 5 * 2 = 10 passed to |res|. What is printed?',
    opts: [
      '10',
      '5',
      '2',
      'nil'
    ],
    a: 0,
    h: 'num * 2 yields 10 into res.',
    explanation: '`yield(num * 2)` evaluates 5 * 2 = 10, passing `10` into the block parameter `|res|`.'
  },
  {
    t: 'Lambdas in Ruby (-> syntax)',
    c: 'Lambdas are anonymous callable objects defined using ->(params) { body } or lambda { ... }.',
    m: 'builder',
    codeBlocks: [
      'cube = ->(x) { x ** 3 }',
      'result = cube.call(3)',
      'puts result'
    ],
    correctOrder: [0, 1, 2],
    q: 'CODE BUILDER: Assemble the Ruby stabby lambda creation and call (3 ** 3 = 27):',
    h: 'Define lambda cube, invoke with cube.call(3), puts result.',
    explanation: 'The stabby lambda `->(x) { x ** 3 }` creates a callable lambda object invoked via `.call(3)`, outputting 27.'
  },
  {
    t: 'Symbol to Proc Shorthand (&:method)',
    c: '&:method calls the method on each element, shorthand for { |item| item.method }.',
    m: 'completion',
    code: `words = ["cyber", "runner"]\nupper = words.map(___:upcase)\n# prints ["CYBER", "RUNNER"]`,
    q: 'CODE COMPLETION: Choose the symbol-to-proc operator prefix:',
    opts: [
      '&',
      '*',
      '->',
      '@'
    ],
    a: 0,
    h: 'Prefix the symbol with &: words.map(&:upcase).',
    explanation: '`&:upcase` invokes `Symbol#to_proc`, cleanly expanding into `{ |w| w.upcase }`.'
  },
  {
    t: 'Proc vs Lambda Argument Strictness',
    c: 'Lambdas check argument counts strictly (raises ArgumentError); Procs ignore extra arguments or set missing to nil.',
    m: 'detective',
    code: `lam = ->(a, b) { a + b }\n# lam.call(10) # Raises ArgumentError: wrong number of arguments!`,
    q: 'OUTPUT DETECTIVE: What happens when calling a 2-arg lambda with only 1 argument?',
    opts: [
      'Raises ArgumentError (wrong number of arguments)',
      'Sets b to nil and runs',
      'Sets b to 0',
      'Runs silently'
    ],
    a: 0,
    h: 'Lambdas enforce strict arity (argument count).',
    explanation: 'Unlike regular `Proc`s which have lenient arity, Ruby lambdas strictly enforce argument counts, raising an `ArgumentError`.'
  },
  {
    t: 'Times Iterator with Block',
    c: 'Integer#times runs the attached block N times, passing counter 0 to N-1.',
    m: 'detective',
    code: `sum = 0\n3.times { |i| sum += i }\nputs sum`,
    q: 'OUTPUT DETECTIVE: i takes values 0, 1, 2. What is sum (0 + 1 + 2)?',
    opts: [
      '3',
      '6',
      '0',
      '2'
    ],
    a: 0,
    h: '0 + 1 + 2 = 3.',
    explanation: '`3.times` passes 0, 1, and 2. The accumulated sum is 0 + 1 + 2 = 3.'
  },
  // BOSS 2: Level 16
  {
    t: 'THE YIELD PHANTOM',
    isBoss: true,
    name: 'THE YIELD PHANTOM',
    hp: 600,
    avatar: '👻',
    story: 'A phantom haunting Block Forest, stealing method control with unhandled LocalJumpErrors!',
    phases: [
      {
        q: 'PHASE 1: Phantom tests LocalJumpError! What occurs if yield is called inside a method that was NOT passed a block?',
        opts: [
          'Raises LocalJumpError (no block given)',
          'Returns nil silently',
          'Throws NullPointerException',
          'Crashes the OS'
        ],
        a: 0,
        explanation: 'Calling `yield` when no block is provided raises a `LocalJumpError: no block given (yield)`.'
      },
      {
        q: 'PHASE 2: Phantom tests return behavior in Procs vs Lambdas! What does return inside a Proc do?',
        opts: [
          'Returns immediately from the enclosing method where the Proc was called',
          'Returns only from the Proc itself',
          'Throws an error',
          'Halts the program'
        ],
        a: 0,
        explanation: 'A `return` inside a `Proc` returns from the enclosing method; a `return` inside a `lambda` returns only from the lambda itself.'
      },
      {
        q: 'PHASE 3: Phantom queries block-to-proc conversion parameter! How does a method capture an attached block as an explicit Proc variable in its parameters?',
        opts: ['def task(&block)', 'def task(*block)', 'def task(block:)', 'def task(proc)'],
        a: 0,
        explanation: 'Prefixing the last parameter with an ampersand `&block` converts the attached block into a `Proc` object.'
      },
      {
        q: 'PHASE 4: Phantom tests curly brace vs do..end precedence! Which has higher binding precedence in Ruby?',
        opts: [
          '{ ... } has higher operator precedence than do ... end',
          'do ... end has higher precedence',
          'They have identical precedence',
          'It depends on the method'
        ],
        a: 0,
        explanation: 'Braces `{ ... }` bind more tightly than `do ... end`. Convention uses `{}` for single-line blocks returning values, and `do..end` for multi-line actions.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which method converts an Array of key-value pairs into a Hash: [[:a, 1], [:b, 2]].to_h?',
        opts: ['to_h', 'to_hash', 'as_hash', 'to_map'],
        a: 0,
        explanation: '`to_h` converts array pairs or enumerables into a `Hash`.'
      }
    ]
  },

  // =========================================================================
  // AREA 3: METHOD MOUNTAIN (Lv 17-24) - METHODS & SPLAT OPERATORS
  // =========================================================================
  {
    t: 'Implicit Return Value in Methods',
    c: 'In Ruby, the value of the last evaluated expression is automatically returned without typing "return".',
    m: 'glitch',
    code: `def calculate_shield(base)\n    multiplier = 2\n    return base * multiplier\nend`,
    q: 'BUG HUNTER: The code has redundant syntax. Ruby idiomatic style omits what explicit keyword?',
    opts: [
      'The "return" keyword (Ruby returns the last expression implicitly)',
      'The def keyword',
      'The end keyword',
      'The parameter name'
    ],
    a: 0,
    h: 'Ruby automatically returns the value of the last expression.',
    explanation: 'In Ruby, explicit `return` is optional. The value of the last evaluated expression (`base * multiplier`) is implicitly returned.'
  },
  {
    t: 'Keyword Arguments with Defaults',
    c: 'Keyword arguments def fn(x:, y: 0) require named keys at call time, avoiding argument ordering bugs.',
    m: 'runner',
    code: `def strike(power:, hits: 2)\n    power * hits\nend\nputs strike(power: 25)`,
    q: 'SPEED RUN: 25 * 2 = 50. What is printed by strike(power: 25)?',
    opts: [
      '50',
      '25',
      '2',
      'ArgumentError'
    ],
    a: 0,
    h: 'power is 25, hits defaults to 2: 25 * 2 = 50.',
    explanation: '`hits` uses its default value of 2, while `power` is passed 25. 25 * 2 = 50.'
  },
  {
    t: 'The Splat Operator (*args)',
    c: 'The splat operator * collects variable positional arguments into an Array.',
    m: 'detective',
    code: `def squad_size(*members)\n    members.length\nend\nputs squad_size("A", "B", "C")`,
    q: 'OUTPUT DETECTIVE: How many items were gathered into the members array?',
    opts: [
      '3',
      '1',
      'nil',
      '0'
    ],
    a: 0,
    h: 'Count the arguments: "A", "B", "C".',
    explanation: '`*members` packages all arguments into an array `["A", "B", "C"]`, with length 3.'
  },
  {
    t: 'Predicate Methods (Question Mark ?)',
    c: 'Methods returning booleans end with ? by convention (e.g. empty?, zero?, include?).',
    m: 'completion',
    code: `scores = []\nif scores.___?\n    puts "NO_SCORES"\nend`,
    q: 'CODE COMPLETION: Choose the standard Ruby predicate method checking if an array has 0 elements:',
    opts: [
      'empty',
      'blank',
      'zero',
      'void'
    ],
    a: 0,
    h: 'Use the empty? method.',
    explanation: '`empty?` returns `true` if the collection contains no elements.'
  },
  {
    t: 'Bang Methods (Exclamation Mark !)',
    c: 'Methods ending with ! (bang) warn that they modify the receiver in-place or are dangerous.',
    m: 'detective',
    code: `s = "cyber"\ns.upcase!\nputs s`,
    q: 'OUTPUT DETECTIVE: Because upcase! mutates in-place, what is printed for s?',
    opts: [
      '"CYBER"',
      '"cyber"',
      'nil',
      'Compilation Error'
    ],
    a: 0,
    h: 'upcase! modifies the original string in place.',
    explanation: '`upcase!` is a destructive method that mutates `s` directly, changing it to `"CYBER"`.'
  },
  {
    t: 'Double Splat Operator (**kwargs)',
    c: '** collects arbitrary keyword arguments into a Hash.',
    m: 'builder',
    codeBlocks: [
      'def inspect_loadout(**gear)',
      '    gear.keys.length',
      'end',
      'count = inspect_loadout(laser: 1, shield: 2)',
      'puts count'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    q: 'CODE BUILDER: Assemble the double-splat keyword argument inspection function:',
    h: 'def with **gear, return gear.keys.length, end, call with laser & shield, puts count.',
    explanation: '`**gear` captures keyword arguments as a Hash `{:laser => 1, :shield => 2}` with 2 keys.'
  },
  {
    t: 'Method Default Parameter Evaluation',
    c: 'Default arguments in Ruby are evaluated at call-time in the method\'s scope.',
    m: 'detective',
    code: `def tag(val = "DEF")\n    val\nend\nputs tag`,
    q: 'OUTPUT DETECTIVE: No argument is passed to tag. What does it return?',
    opts: [
      '"DEF"',
      'nil',
      '""',
      'ArgumentError'
    ],
    a: 0,
    h: 'val uses the default value "DEF".',
    explanation: 'Calling `tag` with no arguments triggers the default parameter value `"DEF"`.'
  },
  // BOSS 3: Level 24
  {
    t: 'THE MONKEY PATCH CHIMERA',
    isBoss: true,
    name: 'THE MONKEY PATCH CHIMERA',
    hp: 700,
    avatar: '🐒',
    story: 'A chimera residing in Method Mountain, reopening core classes and dynamically redefining method dispatch!',
    phases: [
      {
        q: 'PHASE 1: Chimera tests Monkey Patching! What happens in Ruby when you define class String with a new method?',
        opts: [
          'Ruby reopens the existing String class and adds the method to all string instances globally',
          'Throws a DuplicateClassError',
          'Replaces the entire String class and deletes previous methods',
          'Has no effect'
        ],
        a: 0,
        explanation: 'In Ruby, classes are open. Declaring `class String` reopens the class and adds or overwrites methods (known as "monkey patching").'
      },
      {
        q: 'PHASE 2: Chimera tests alias_method! What does alias_method :new_name, :old_name do?',
        opts: [
          'Creates a duplicate copy of old_name under new_name (preserving the original implementation)',
          'Deletes old_name',
          'Makes the method private',
          'Renames the file'
        ],
        a: 0,
        explanation: '`alias_method` creates a copy of the method under a new name, commonly used before monkey patching to preserve the original behavior.'
      },
      {
        q: 'PHASE 3: Chimera tests method visibility! Which keyword restricts method calling to self only (no explicit receiver like obj.method)?',
        opts: ['private', 'protected', 'public', 'internal'],
        a: 0,
        explanation: 'In Ruby, `private` methods cannot be invoked with an explicit receiver (e.g. `obj.secret` fails; only plain `secret` is allowed).'
      },
      {
        q: 'PHASE 4: Chimera queries Refinements! What feature was added in Ruby 2.0 to scope monkey patches locally rather than globally?',
        opts: [
          'Refinements (using refine and using ModuleName)',
          'Namespaces',
          'Private modules',
          'Sandbox classes'
        ],
        a: 0,
        explanation: 'Refinements allow monkey patching classes scoped only to the specific file or module activating them with `using`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which operator checks if an object responds to a method without calling it?',
        opts: ['respond_to?(:method_name)', 'has_method?(:method_name)', 'can_call?(:method_name)', 'is_callable?'],
        a: 0,
        explanation: '`respond_to?(:symbol)` checks whether an object implements or handles the specified method name.'
      }
    ]
  },

  // =========================================================================
  // AREA 4: MODULE MEADOW (Lv 25-32) - OOP & MIXINS
  // =========================================================================
  {
    t: 'Class Definition and initialize',
    c: 'The initialize method is the constructor called when ClassName.new is executed.',
    m: 'glitch',
    code: `class Mech\n    def constructor(hp) # Bug: Constructor is named initialize in Ruby!\n        @hp = hp\n    end\nend`,
    q: 'BUG HUNTER: Replace "constructor" with the standard Ruby initializer method name:',
    opts: [
      'initialize',
      'new',
      'setup',
      'init'
    ],
    a: 0,
    h: 'In Ruby, constructors are named initialize.',
    explanation: 'When `Mech.new(hp)` is called, Ruby allocates the object and calls its `initialize(hp)` method.'
  },
  {
    t: 'Instance Variables (@variable)',
    c: 'Instance variables are prefixed with @ and belong to the individual object instance.',
    m: 'runner',
    code: `class Drone\n    def set_id(id) ; @id = id ; end\n    def get_id ; @id ; end\nend\nd = Drone.new\nd.set_id(42)\nputs d.get_id`,
    q: 'SPEED RUN: What is printed by d.get_id?',
    opts: [
      '42',
      'nil',
      '0',
      'Compilation Error'
    ],
    a: 0,
    h: '@id holds 42.',
    explanation: 'The instance variable `@id` stores `42` for instance `d`, which is returned by `get_id`.'
  },
  {
    t: 'Attr_accessor Shortcut',
    c: 'attr_accessor :attr creates both getter (attr) and setter (attr=) methods automatically.',
    m: 'detective',
    code: `class Operative\n    attr_accessor :rank\nend\nop = Operative.new\nop.rank = "Elite"\nputs op.rank`,
    q: 'OUTPUT DETECTIVE: What is printed by op.rank?',
    opts: [
      '"Elite"',
      'nil',
      'NoMethodError',
      'Compilation Error'
    ],
    a: 0,
    h: 'attr_accessor creates rank and rank= methods.',
    explanation: '`attr_accessor :rank` defines both `rank` getter and `rank=` setter methods, storing and printing `"Elite"`.'
  },
  {
    t: 'Module as Mixin (include vs extend)',
    c: 'include injects module methods as instance methods; extend injects them as class methods.',
    m: 'builder',
    codeBlocks: [
      'module Shieldable',
      '    def shield_up ; "SHIELDED" ; end',
      'end',
      'class Unit',
      '    include Shieldable',
      'end',
      'puts Unit.new.shield_up'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    q: 'CODE BUILDER: Assemble the module definition and class include mixin sequence:',
    h: 'module Shieldable, method shield_up, end, class Unit, include Shieldable, end, print instance call.',
    explanation: '`include Shieldable` mixes the methods of `Shieldable` into `Unit` instances, outputting "SHIELDED".'
  },
  {
    t: 'Class Variables (@@variable)',
    c: 'Class variables are prefixed with @@ and are shared across a class and all its subclasses.',
    m: 'detective',
    code: `class Counter\n    @@total = 0\n    def initialize ; @@total += 1 ; end\n    def self.total ; @@total ; end\nend\nCounter.new\nCounter.new\nputs Counter.total`,
    q: 'OUTPUT DETECTIVE: Two instances created. What does Counter.total return?',
    opts: [
      '2',
      '1',
      '0',
      'nil'
    ],
    a: 0,
    h: '@@total increments with each instance creation: 0 -> 1 -> 2.',
    explanation: '`@@total` is shared across all instances. Two `initialize` runs increment it to `2`.'
  },
  {
    t: 'Module Prepend (Method Interception)',
    c: 'prepend inserts the module BEFORE the class in the ancestor hierarchy, enabling method wrapping.',
    m: 'completion',
    code: `class Service\n    ___ LoggingModule # runs before Service methods\nend`,
    q: 'CODE COMPLETION: Choose the keyword that inserts a module before the class in the lookup chain:',
    opts: [
      'prepend',
      'include',
      'extend',
      'require'
    ],
    a: 0,
    h: 'Use prepend to intercept methods.',
    explanation: '`prepend` places the module ahead of the class in the method lookup chain (`ancestors`), allowing it to override and call `super`.'
  },
  {
    t: 'Single Inheritance (<)',
    c: 'Ruby supports single class inheritance using the < operator.',
    m: 'detective',
    code: `class Animal ; def speak ; "Sound" ; end ; end\nclass Dog < Animal ; def speak ; "Woof" ; end ; end\nputs Dog.new.speak`,
    q: 'OUTPUT DETECTIVE: Dog overrides speak. What is printed?',
    opts: [
      '"Woof"',
      '"Sound"',
      '"SoundWoof"',
      'NoMethodError'
    ],
    a: 0,
    h: 'Dog\'s overridden method runs: "Woof".',
    explanation: '`Dog < Animal` inherits from `Animal`, and `Dog#speak` overrides the parent method, returning `"Woof"`.'
  },
  // BOSS 4: Level 32
  {
    t: 'THE METHOD MISSING BEAST',
    isBoss: true,
    name: 'THE METHOD MISSING BEAST',
    hp: 800,
    avatar: '👹',
    story: 'A polymorphic trickster in Module Meadow, intercepting unknown messages with method_missing and dynamic dispatch!',
    phases: [
      {
        q: 'PHASE 1: Beast tests method_missing! When is method_missing invoked in Ruby?',
        opts: [
          'When an object receives a message (method call) that does not exist anywhere in its ancestor chain',
          'When a method returns nil',
          'When a file is missing',
          'On syntax errors'
        ],
        a: 0,
        explanation: 'When a method call fails to find a definition after walking the entire ancestor lookup chain, Ruby calls `method_missing`.'
      },
      {
        q: 'PHASE 2: Beast tests respond_to_missing?! Why must respond_to_missing? be overridden whenever method_missing is implemented?',
        opts: [
          'So respond_to?(:dynamic_method) correctly returns true for dynamically handled methods',
          'To prevent memory leaks',
          'To compile the method to C',
          'Required by the Ruby parser'
        ],
        a: 0,
        explanation: 'Overriding `respond_to_missing?` ensures that `object.respond_to?(:method)` and `method(:name)` remain consistent with dynamic handling.'
      },
      {
        q: 'PHASE 3: Beast queries ancestors order! What method lists the complete inheritance and mixin lookup chain for a class?',
        opts: ['ClassName.ancestors', 'ClassName.hierarchy', 'ClassName.parents', 'ClassName.chain'],
        a: 0,
        explanation: '`ClassName.ancestors` returns an array of classes and modules in the exact order Ruby searches for methods.'
      },
      {
        q: 'PHASE 4: Beast tests define_method! What does define_method(:name) { ... } do in Ruby?',
        opts: [
          'Dynamically creates a new instance method at runtime using a block',
          'Deletes a method',
          'Compiles a method into bytecode',
          'Aliases a method'
        ],
        a: 0,
        explanation: '`define_method` dynamically creates a method on the receiving class or module using the provided block.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which method in Object dynamically sends a message to an object: obj.send(:method_name, *args)?',
        opts: ['send (or public_send)', 'invoke', 'dispatch', 'call'],
        a: 0,
        explanation: '`send` invokes the method identified by symbol, even bypassing private visibility. `public_send` enforces visibility rules.'
      }
    ]
  },

  // =========================================================================
  // AREA 5: ENUMERABLE EDGE (Lv 33-40) - ENUMERABLE & ITERATORS
  // =========================================================================
  {
    t: 'Enumerable map Transformation',
    c: 'map returns a new array with the results of running the block once for every element.',
    m: 'glitch',
    code: `nums = [1, 2, 3]\ndoubled = nums.each { |n| n * 2 } # Bug: each returns the original array, not transformed!`,
    q: 'BUG HUNTER: each returns the original array. What Enumerable method returns a new array of transformed values?',
    opts: [
      'map (or collect)',
      'transform',
      'filter',
      'apply'
    ],
    a: 0,
    h: 'Use map or collect.',
    explanation: '`each` returns the original array; `map` (or `collect`) returns a new array populated with the block results.'
  },
  {
    t: 'Enumerable select (Filter)',
    c: 'select returns an array containing all elements of enum for which the given block returns true.',
    m: 'runner',
    code: `scores = [35, 80, 95, 40]\npassing = scores.select { |s| s >= 70 }\nputs passing.length`,
    q: 'SPEED RUN: 80 and 95 pass. What is passing.length?',
    opts: [
      '2',
      '4',
      '1',
      '0'
    ],
    a: 0,
    h: 'Two scores are >= 70.',
    explanation: '`select` filters down to elements matching `s >= 70` (`[80, 95]`), which has length 2.'
  },
  {
    t: 'Enumerable reduce / inject',
    c: 'reduce combines all elements of enum by applying a binary operation specified by a block or symbol.',
    m: 'detective',
    code: `total = [10, 20, 30].reduce(5, :+)\nputs total`,
    q: 'OUTPUT DETECTIVE: Initial accumulator is 5: 5 + 10 + 20 + 30. What is total?',
    opts: [
      '65',
      '60',
      '50',
      '0'
    ],
    a: 0,
    h: '5 + 10 + 20 + 30 = 65.',
    explanation: '`reduce(5, :+)` starts with 5 and adds each element, producing `65`.'
  },
  {
    t: 'Enumerable reject (Inverse of Select)',
    c: 'reject returns an array of all elements for which the block returns false or nil.',
    m: 'detective',
    code: `nums = [1, 2, 3, 4]\nodds = nums.reject { |n| n.even? }\nputs odds.join(",")`,
    q: 'OUTPUT DETECTIVE: Even numbers are rejected. What is printed?',
    opts: [
      '"1,3"',
      '"2,4"',
      '"1,2,3,4"',
      '""'
    ],
    a: 0,
    h: '2 and 4 are even and rejected, leaving 1 and 3.',
    explanation: '`reject` drops elements where `n.even?` is true, keeping `[1, 3]`.'
  },
  {
    t: 'Inclusive (..) vs Exclusive (...) Ranges',
    c: '1..5 includes 5 (1, 2, 3, 4, 5); 1...5 excludes 5 (1, 2, 3, 4).',
    m: 'builder',
    codeBlocks: [
      'range_inc = (1..5).to_a',
      'range_exc = (1...5).to_a',
      'puts "#{range_inc.length}:#{range_exc.length}"'
    ],
    correctOrder: [0, 1, 2],
    q: 'CODE BUILDER: Assemble the range comparison script (prints "5:4"):',
    h: 'Inclusive range to_a, exclusive range to_a, print lengths.',
    explanation: '`1..5` has 5 elements (1..5), while `1...5` has 4 elements (1..4), printing "5:4".'
  },
  {
    t: 'Enumerable find / detect',
    c: 'find passes each entry in enum to block; returns the FIRST for which block is not false.',
    m: 'completion',
    code: `pings = [12, 88, 45, 99]\nfirst_high = pings.___\ { |p| p > 50 }\nputs first_high; # prints 88`,
    q: 'CODE COMPLETION: Choose the Enumerable method that finds the first matching element:',
    opts: [
      'find',
      'search',
      'match',
      'locate'
    ],
    a: 0,
    h: 'Use find or detect.',
    explanation: '`find` (or `detect`) returns the first element satisfying the block condition (88).'
  },
  {
    t: 'Enumerable all? and any?',
    c: 'all? returns true if the block never returns false/nil; any? returns true if at least one matches.',
    m: 'detective',
    code: `flags = [true, true, false]\nputs flags.all?, flags.any?`,
    q: 'OUTPUT DETECTIVE: What booleans are printed for all? and any??',
    opts: [
      'false true',
      'true true',
      'false false',
      'true false'
    ],
    a: 0,
    h: 'Not all are true (false), but at least one is true (true).',
    explanation: '`all?` is `false` because of the `false` element; `any?` is `true` because truthy elements exist.'
  },
  // BOSS 5: Level 40
  {
    t: 'THE ITERATOR TITAN',
    isBoss: true,
    name: 'THE ITERATOR TITAN',
    hp: 900,
    avatar: '🗿',
    story: 'A massive titan dominating Enumerable Edge, testing lazy enumerators and infinite sequences!',
    phases: [
      {
        q: 'PHASE 1: Titan tests Lazy Enumerators! What is the purpose of enum.lazy in Ruby?',
        opts: [
          'Evaluates enumerable operations (map, select) on-demand element by element, enabling infinite sequences without hanging',
          'Delays execution until tomorrow',
          'Saves memory on disk',
          'Runs in background threads'
        ],
        a: 0,
        explanation: '`enum.lazy` creates an `Enumerator::Lazy` that processes items one at a time, allowing operations like `(1..Float::INFINITY).lazy.map{...}.take(5)`.'
      },
      {
        q: 'PHASE 2: Titan tests each_with_index! What arguments does each_with_index pass to its block?',
        opts: ['|item, index|', '|index, item|', '|item| only', '|key, value|'],
        a: 0,
        explanation: '`each_with_index` yields the element followed by its 0-based integer index: `|item, index|`.'
      },
      {
        q: 'PHASE 3: Titan queries Enumerable contract! What single method must a class implement to include Enumerable?',
        opts: ['each', 'next', 'iterator', 'size'],
        a: 0,
        explanation: 'A class only needs to implement the `each` method (and spaceship `<=>` for sorting) to gain all dozens of `Enumerable` methods.'
      },
      {
        q: 'PHASE 4: Titan tests flat_map! What does [[1, 2], [3, 4]].flat_map { |x| x } return?',
        opts: ['[1, 2, 3, 4]', '[[1, 2], [3, 4]]', '[1, 3, 2, 4]', '10'],
        a: 0,
        explanation: '`flat_map` maps the block over each element and flattens the result by one level into `[1, 2, 3, 4]`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which method partitions an array into two arrays based on boolean test: [1, 2, 3, 4].partition(&:even?)?',
        opts: ['partition', 'split_by', 'divide', 'group'],
        a: 0,
        explanation: '`partition` returns two arrays: elements for which the block evaluated to true, and elements for which it evaluated to false: `[[2, 4], [1, 3]]`.'
      }
    ]
  },

  // =========================================================================
  // AREA 6: META MATRIX (Lv 41-48) - METAPROGRAMMING & REFLECTION
  // =========================================================================
  {
    t: 'Dynamic Method Invocation with send',
    c: 'send(symbol, *args) calls the method named symbol on the receiver, bypassing private access.',
    m: 'glitch',
    code: `class Core\n    private\n    def secret ; "VAULT_OPEN" ; end\nend\n# Core.new.secret fails with NoMethodError (private!)\nputs Core.new.send(:secret) # Accesses private method!`,
    q: 'OUTPUT DETECTIVE: send bypasses private visibility. What is printed?',
    opts: [
      '"VAULT_OPEN"',
      'NoMethodError',
      'nil',
      'SecurityError'
    ],
    a: 0,
    h: 'send can invoke private methods.',
    explanation: 'In Ruby, `.send` can invoke private methods. (To respect visibility, use `public_send`).'
  },
  {
    t: 'instance_eval for Internal Access',
    c: 'instance_eval evaluates a block in the context of the receiver, setting self to that object.',
    m: 'runner',
    code: `class Bot ; def initialize ; @id = 99 ; end ; end\nb = Bot.new\nval = b.instance_eval { @id }\nputs val`,
    q: 'SPEED RUN: What is the value of private @id extracted by instance_eval?',
    opts: [
      '99',
      'nil',
      '0',
      'Compilation Error'
    ],
    a: 0,
    h: 'instance_eval runs with self set to b, reading @id (99).',
    explanation: '`instance_eval` evaluates code inside the object\'s private scope, returning `@id` (99).'
  },
  {
    t: 'Object Freezing (obj.freeze)',
    c: 'freeze prevents further modification to an object; modifying a frozen object raises FrozenError.',
    m: 'detective',
    code: `str = "IMMUTABLE".freeze\n# str.upcase! # Raises FrozenError: can't modify frozen String!\nputs str.frozen?`,
    q: 'OUTPUT DETECTIVE: What does str.frozen? return after calling .freeze?',
    opts: [
      'true',
      'false',
      'nil',
      'Error'
    ],
    a: 0,
    h: 'The object is frozen: true.',
    explanation: '`str.freeze` marks the object immutable; `str.frozen?` returns `true`.'
  },
  {
    t: 'Class Macro Assembly with define_method',
    c: 'Metaprogramming class macros to generate methods dynamically.',
    m: 'builder',
    codeBlocks: [
      'class Unit',
      '    ["laser", "shield"].each do |ability|',
      '        define_method("activate_#{ability}") do',
      '            "#{ability.upcase} ACTIVE"',
      '        end',
      '    end',
      'end',
      'puts Unit.new.activate_laser'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    q: 'CODE BUILDER: Assemble the dynamic metaprogrammed method generator:',
    h: 'class Unit, iterate array, define_method with block, close blocks, instantiate and test.',
    explanation: 'Using `define_method` in an iteration loop dynamically synthesizes `activate_laser` and `activate_shield`.'
  },
  {
    t: 'class_eval vs instance_eval',
    c: 'class_eval evaluates code in class context (adds instance methods); instance_eval adds class/singleton methods.',
    m: 'completion',
    code: `String.___ do\n    def shout ; self.upcase + "!" ; end\nend\nputs "run".shout # prints "RUN!"`,
    q: 'CODE COMPLETION: Choose the method that evaluates code in class context to add instance methods:',
    opts: [
      'class_eval',
      'instance_eval',
      'eval',
      'module_exec'
    ],
    a: 0,
    h: 'Use class_eval to add instance methods to a class.',
    explanation: '`class_eval` opens the class and defines instance methods available to all instances of that class.'
  },
  {
    t: 'Singleton Methods on Individual Objects',
    c: 'In Ruby, methods can be defined directly on an individual object instance (stored in its Eigenclass).',
    m: 'detective',
    code: `obj = "special"\ndef obj.sparkle ; "✨" ; end\nputs obj.sparkle`,
    q: 'OUTPUT DETECTIVE: Does sparkle exist on all strings or only on obj?',
    opts: [
      'Only on obj (singleton method stored in its metaclass/eigenclass)',
      'On all strings globally',
      'NoMethodError',
      'nil'
    ],
    a: 0,
    h: 'Defining a method on an individual object is a singleton method.',
    explanation: '`def obj.sparkle` defines a singleton method that exists exclusively on that specific `obj` instance.'
  },
  {
    t: 'Const_get for Dynamic Class Lookup',
    c: 'Object.const_get("ClassName") retrieves a class or module constant from its string name.',
    m: 'detective',
    code: `cls_name = "Array"\ncls = Object.const_get(cls_name)\nputs cls.new.class`,
    q: 'OUTPUT DETECTIVE: What class is instantiated dynamically via Object.const_get("Array")?',
    opts: [
      'Array',
      'String',
      'Object',
      'NameError'
    ],
    a: 0,
    h: 'Object.const_get("Array") returns the Array class constant.',
    explanation: '`const_get("Array")` resolves the string to the constant `Array`, creating a new `Array` instance.'
  },
  // BOSS 6: Level 48
  {
    t: 'THE EVAL SPECTRE',
    isBoss: true,
    name: 'THE EVAL SPECTRE',
    hp: 1000,
    avatar: '👻',
    story: 'An omniscient entity in Meta Matrix, rewriting runtime bindings and manipulating eigenclasses!',
    phases: [
      {
        q: 'PHASE 1: Spectre tests the Eigenclass (Metaclass)! What is an Eigenclass (Singleton class) in Ruby?',
        opts: [
          'An anonymous hidden class inserted into an object\'s ancestor chain to hold its singleton methods',
          'A compiled C struct',
          'The root of all objects',
          'A class that can only be instantiated once'
        ],
        a: 0,
        explanation: 'In Ruby\'s object model, every object has a hidden singleton class (eigenclass) that stores methods defined specifically on that object.'
      },
      {
        q: 'PHASE 2: Spectre tests binding objects! What does the binding keyword capture?',
        opts: [
          'The entire execution context (local variables, self, and block) at that point in time',
          'Memory address of the CPU',
          'The syntax tree',
          'Network sockets'
        ],
        a: 0,
        explanation: 'A `Binding` object encapsulates the execution context (variables, methods, self) at a point in the program, passed to `eval`.'
      },
      {
        q: 'PHASE 3: Spectre queries method removal! What is the difference between remove_method and undef_method?',
        opts: [
          'remove_method removes it from the current class (ancestors still answer); undef_method prevents instances from responding even if defined on ancestors',
          'undef_method crashes the program',
          'They are identical',
          'remove_method only works on variables'
        ],
        a: 0,
        explanation: '`remove_method` deletes the method from the current class so inherited versions can still be called; `undef_method` stops calls completely.'
      },
      {
        q: 'PHASE 4: Spectre tests method hooks! Which callback is invoked when a class is subclassed: class Child < Parent?',
        opts: ['self.inherited(subclass)', 'self.subclassed()', 'self.extended()', 'self.derived()'],
        a: 0,
        explanation: 'Ruby calls the `self.inherited(subclass)` hook on the parent class whenever a new subclass is created.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which method returns an array of symbol names for all instance variables on an object?',
        opts: ['instance_variables', 'get_variables', 'fields', 'properties'],
        a: 0,
        explanation: '`instance_variables` returns an array of symbols representing all instance variable names (e.g. `[:@name, :@id]`).'
      }
    ]
  },

  // =========================================================================
  // AREA 7: RUBY SANCTUARY & MASTER CHALLENGES (Lv 49-51)
  // =========================================================================
  {
    t: 'Exception Handling (begin, rescue, ensure)',
    c: 'begin wraps risky code, rescue catches StandardError, and ensure runs cleanup always.',
    m: 'detective',
    code: `result = begin\n    10 / 0\nrescue ZeroDivisionError\n    "SAFE_FALLBACK"\nensure\n    # always runs\nend\nputs result`,
    q: 'OUTPUT DETECTIVE: Division by 0 is caught! What is the value of result?',
    opts: [
      '"SAFE_FALLBACK"',
      '0',
      'ZeroDivisionError',
      'nil'
    ],
    a: 0,
    h: 'The rescue block evaluates to "SAFE_FALLBACK".',
    explanation: 'The `rescue ZeroDivisionError` block catches the exception and returns `"SAFE_FALLBACK"`.'
  },
  {
    t: 'The retry Keyword in Exceptions',
    c: 'retry re-executes the begin block from the start, useful for retrying network operations.',
    m: 'builder',
    codeBlocks: [
      'attempts = 0',
      'begin',
      '    attempts += 1',
      '    raise "Fail" if attempts < 2',
      'rescue',
      '    retry',
      'end',
      'puts attempts'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    q: 'CODE BUILDER: Assemble the begin-rescue retry loop (prints attempts = 2):',
    h: 'attempts=0, begin, increment, raise if < 2, rescue, retry, end, puts attempts.',
    explanation: 'When `attempts` is 1, it raises an error, `rescue` calls `retry`, incrementing `attempts` to 2 and completing.'
  },
  // FINAL BOSS: Level 51
  {
    t: 'THE ELEGANT SOVEREIGN',
    isBoss: true,
    isFinalBoss: true,
    name: 'THE ELEGANT SOVEREIGN',
    hp: 1200,
    avatar: '👑',
    story: 'THE SUPREME ARCHITECT OF RUBY HAPPINESS! It rules Matz\'s Ruby Interpreter (YARV), Garbage Collection heaps, fiber coroutines, and the dynamic object model. Defeat it for Ruby Mastery!',
    phases: [
      {
        q: 'PHASE 1: Sovereign tests MINASWAN! What does the famous community acronym MINASWAN stand for?',
        opts: [
          '"Matz Is Nice And So We Are Nice"',
          '"Methods In Namespaces Are Safe When Automated Now"',
          '"Modules In Networks Always Send Warnings And Notifications"',
          '"Many Iterators Need A Simple While And Next"'
        ],
        a: 0,
        explanation: 'MINASWAN: "Matz Is Nice And So We Are Nice", reflecting the welcoming and empathetic culture of the Ruby community.'
      },
      {
        q: 'PHASE 2: Sovereign tests Fiber coroutines! What is a Fiber in Ruby?',
        opts: [
          'A cooperatively scheduled, lightweight coroutine that pauses with Fiber.yield and resumes with fiber.resume',
          'A multi-core hardware thread',
          'A network cable protocol',
          'A string buffer'
        ],
        a: 0,
        explanation: 'Fibers are lightweight primitives for cooperative multitasking, yielding and resuming execution explicitly.'
      },
      {
        q: 'PHASE 3: Sovereign queries YARV bytecode! What is YARV in the standard CRuby implementation?',
        opts: [
          'Yet Another Ruby VM (the stack-based bytecode virtual machine powering modern Ruby 1.9+)',
          'A gem package manager',
          'A testing framework',
          'A web server'
        ],
        a: 0,
        explanation: 'YARV (Yet Another Ruby VM) compiles Ruby source into bytecode instructions executed by CRuby\'s virtual machine.'
      },
      {
        q: 'PHASE 4: Sovereign queries Ractors (Ruby 3+)! What feature introduced in Ruby 3 provides true parallel execution without the GVL?',
        opts: [
          'Ractors (Ruby Actor model)',
          'Fibers',
          'Threads',
          'Processes only'
        ],
        a: 0,
        explanation: 'Ractors provide actor-model concurrency with isolated object spaces, running in parallel across multiple CPU cores without GVL contention.'
      },
      {
        q: 'PHASE 5: MASTER STRIKE! Which Ruby keyword re-executes the current method from the very beginning with the original arguments?',
        opts: ['redo', 'retry', 'restart', 'reboot'],
        a: 0,
        explanation: '`redo` restarts the current iteration of a loop or block without evaluating the condition or incrementing the counter.'
      }
    ]
  }
];
