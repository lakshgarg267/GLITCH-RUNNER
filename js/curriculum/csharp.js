/**
 * GLITCH RUNNER - C# & .NET CURRICULUM (51 LEVELS)
 * Areas:
 * Area 1: Unity Foothills (Lv 1-8, Boss: THE NULLABLE BEAST)
 * Area 2: LINQ Forest (Lv 9-16, Boss: THE LAMBDA SENTINEL)
 * Area 3: Property Palace (Lv 17-24, Boss: THE GC SWEEPER)
 * Area 4: Delegate Den (Lv 25-32, Boss: THE EVENT DISPATCHER)
 * Area 5: Async Avenue (Lv 33-40, Boss: THE DEADLOCK BEHEMOTH)
 * Area 6: Generic Grove (Lv 41-48, Boss: THE PATTERN MATCHER)
 * Area 7: CLR Core (Lv 49-51, Final Boss: THE GARBAGE COLLECTOR)
 */

window.CURRICULUM_DATA = window.CURRICULUM_DATA || {};

window.CURRICULUM_DATA.csharp = [
  // =========================================================================
  // AREA 1: UNITY FOOTHILLS (Lv 1-8) - FOUNDATION & TYPES
  // =========================================================================
  {
    t: 'C# Console Output',
    c: 'Console.WriteLine() writes formatted text followed by the current line terminator to standard output.',
    m: 'glitch',
    code: `System.out.println("OPERATIVE SYNCED"); // Bug: Java syntax!`,
    q: 'BUG HUNTER: Replace the Java printing statement with C# standard console output:',
    opts: [
      'Console.WriteLine("OPERATIVE SYNCED");',
      'print("OPERATIVE SYNCED");',
      'terminal.write("OPERATIVE SYNCED");',
      'Debug.LogLine("OPERATIVE SYNCED");'
    ],
    a: 0,
    h: 'In C#, use System.Console.WriteLine().',
    explanation: 'C# uses `Console.WriteLine()` located in the `System` namespace for standard output.'
  },
  {
    t: 'Nullable Value Types (int?)',
    c: 'T? allows value types (like int or bool) to hold null in addition to their standard range.',
    m: 'runner',
    code: `int? battery = null;\nif (battery.HasValue) {\n    Console.WriteLine(battery.Value);\n} else {\n    Console.WriteLine("OFFLINE");\n}`,
    q: 'SPEED RUN: Because battery is null, what is printed?',
    opts: [
      '"OFFLINE"',
      '0',
      'null',
      'NullReferenceException'
    ],
    a: 0,
    h: 'battery.HasValue is false, taking the else branch.',
    explanation: '`int?` is a `Nullable<int>`. Since `battery` is `null`, `battery.HasValue` is `false`, outputting `"OFFLINE"`.'
  },
  {
    t: 'Null-Coalescing Operator (??)',
    c: '?? returns the left-hand operand if not null; otherwise it evaluates the right-hand operand.',
    m: 'detective',
    code: `string username = null;\nstring display = username ?? "GuestOperative";\nConsole.WriteLine(display);`,
    q: 'OUTPUT DETECTIVE: What is assigned to display when username is null?',
    opts: [
      '"GuestOperative"',
      'null',
      '""',
      'Compilation Error'
    ],
    a: 0,
    h: '?? falls back to the default value on the right.',
    explanation: 'Because `username` is `null`, the null-coalescing operator `??` returns `"GuestOperative"`.'
  },
  {
    t: 'String Interpolation ($"...")',
    c: 'Special character $ identifies a string literal as an interpolated string containing expressions in {}.',
    m: 'detective',
    code: `string hero = "Viper";\nint rank = 5;\nConsole.WriteLine($"Hunter: {hero} [{rank * 10}]");`,
    q: 'OUTPUT DETECTIVE: What string is formatted and printed?',
    opts: [
      '"Hunter: Viper [50]"',
      '"Hunter: {hero} [{rank * 10}]"',
      '"Hunter: Viper [5]"',
      'Compilation Error'
    ],
    a: 0,
    h: 'Expressions inside {} evaluate at runtime: 5 * 10 = 50.',
    explanation: '`$"Hunter: {hero} [{rank * 10}]"` interpolates `hero` and evaluates `5 * 10`, printing `"Hunter: Viper [50]"`.'
  },
  {
    t: 'Modern C# Top-Level Program Assembly',
    c: 'C# 9+ supports top-level statements, reducing boilerplate code.',
    m: 'builder',
    codeBlocks: [
      'using System;',
      'int energy = 100;',
      'energy -= 25;',
      'Console.WriteLine($"Energy: {energy}");'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the clean modern C# top-level statements program:',
    h: 'using directive, initialize energy, decrement energy, print formatted string.',
    explanation: 'In C# 9+, top-level statements execute directly without needing explicit `class Program` and `static void Main` wrappers.'
  },
  {
    t: 'Null-Coalescing Assignment (??=)',
    c: 'variable ??= value assigns value to variable only if variable is currently null.',
    m: 'completion',
    code: `string config = null;\nconfig ___ "LOADED";\nConsole.WriteLine(config);`,
    q: 'CODE COMPLETION: Choose the compound assignment operator that sets config only if null:',
    opts: [
      '??=',
      '?=',
      '||=',
      ':='
    ],
    a: 0,
    h: 'Use ??= for null-coalescing assignment.',
    explanation: '`config ??= "LOADED"` assigns `"LOADED"` to `config` if and only if `config` is currently `null`.'
  },
  {
    t: 'Var Implicit Type Inference',
    c: 'var declares strongly-typed local variables whose type is inferred by the compiler from the initialization expression.',
    m: 'detective',
    code: `var count = 42;\n// count = "hello"; // Compiler Error!\nConsole.WriteLine(count.GetType().Name);`,
    q: 'OUTPUT DETECTIVE: What underlying .NET type name does var deduce for 42?',
    opts: [
      '"Int32"',
      '"var"',
      '"Object"',
      '"dynamic"'
    ],
    a: 0,
    h: '42 is an int, which is System.Int32 in .NET.',
    explanation: '`var count = 42;` statically types `count` as a 32-bit integer (`System.Int32`). It is NOT dynamically typed.'
  },
  // BOSS 1: Level 8
  {
    t: 'THE NULLABLE BEAST',
    isBoss: true,
    name: 'THE NULLABLE BEAST',
    hp: 500,
    avatar: '👹',
    story: 'A ravenous null-dereferencing fiend stalking Unity Foothills, triggering NullReferenceException traps!',
    phases: [
      {
        q: 'PHASE 1: Beast tests Null-Conditional operator! What does obj?.Property return if obj is null?',
        opts: [
          'null (evaluates gracefully without throwing NullReferenceException)',
          'Throws NullReferenceException',
          '0',
          'Compilation Error'
        ],
        a: 0,
        explanation: 'The null-conditional operator `?.` short-circuits and returns `null` if the left operand is null.'
      },
      {
        q: 'PHASE 2: Beast tests value types vs reference types! Which of the following is a Value Type stored on the stack in C#?',
        opts: ['struct (and int, double, bool)', 'class', 'string', 'interface'],
        a: 0,
        explanation: 'In C#, `struct` types (including primitive numbers and booleans) are Value Types. Classes and strings are Reference Types.'
      },
      {
        q: 'PHASE 3: Beast queries the const keyword! Can a const variable in C# be initialized at runtime (e.g. DateTime.Now)?',
        opts: [
          'No, const variables must be compile-time constants (use readonly for runtime constants)',
          'Yes, const can be initialized with any expression',
          'Only with static const',
          'Only inside classes'
        ],
        a: 0,
        explanation: '`const` fields must be fully resolved at compile time. For runtime-calculated immutability, use the `readonly` modifier.'
      },
      {
        q: 'PHASE 4: Beast tests boxing! What occurs during boxing in C#?',
        opts: [
          'A value type is wrapped inside an Object instance allocated on the managed heap',
          'An object is cast to an integer',
          'Memory is compressed by the compiler',
          'An array is sorted'
        ],
        a: 0,
        explanation: 'Boxing converts a value type (like `int`) to `object` by allocating an object box on the heap and copying the value into it.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which C# feature enables compile-time null safety warnings when referencing potentially null objects?',
        opts: ['Nullable Reference Types (#nullable enable)', 'NullGuard', 'SafePointers', 'StrictTypes'],
        a: 0,
        explanation: 'C# 8 introduced Nullable Reference Types (`#nullable enable`), enabling static analysis warnings on dereferencing null variables.'
      }
    ]
  },

  // =========================================================================
  // AREA 2: LINQ FOREST (Lv 9-16) - LINQ & FUNCTIONAL PIPELINES
  // =========================================================================
  {
    t: 'LINQ Where Filter Method',
    c: 'Enumerable.Where() filters a sequence based on a predicate lambda function.',
    m: 'glitch',
    code: `var scores = new List<int> { 40, 85, 95, 30 };\nvar passing = scores.Filter(s => s >= 70); // Bug: method is named Where!`,
    q: 'BUG HUNTER: What standard LINQ extension method filters elements matching a condition?',
    opts: [
      'Where',
      'Filter',
      'Select',
      'FindAll'
    ],
    a: 0,
    h: 'Use the LINQ .Where() method.',
    explanation: 'In LINQ, sequence filtering is performed using the `.Where(predicate)` extension method from `System.Linq`.'
  },
  {
    t: 'LINQ Select Projection Method',
    c: 'Enumerable.Select() projects each element of a sequence into a transformed form.',
    m: 'runner',
    code: `var nums = new List<int> { 1, 2, 3 };\nvar doubled = nums.Select(x => x * 2).ToList();\nConsole.WriteLine(doubled[0]);`,
    q: 'SPEED RUN: 1 * 2 = 2. What is doubled[0]?',
    opts: [
      '2',
      '1',
      '4',
      '0'
    ],
    a: 0,
    h: 'First element 1 is doubled to 2.',
    explanation: '`Select(x => x * 2)` transforms each number. The first element becomes `2`.'
  },
  {
    t: 'Deferred Execution in LINQ',
    c: 'LINQ queries do not execute when constructed; they execute only when iterated (e.g. foreach, ToList, Count).',
    m: 'detective',
    code: `var list = new List<int> { 10, 20 };\nvar query = list.Where(x => x > 5);\nlist.Add(30);\nConsole.WriteLine(query.Count());`,
    q: 'OUTPUT DETECTIVE: Deferred execution evaluates when Count() is called! How many items are > 5 (10, 20, 30)?',
    opts: [
      '3',
      '2',
      '1',
      '0'
    ],
    a: 0,
    h: 'Because LINQ is deferred, Count() sees all 3 items (including 30).',
    explanation: 'Because LINQ queries execute lazily on evaluation, `Count()` executes *after* 30 is added, seeing 10, 20, and 30 (total 3).'
  },
  {
    t: 'LINQ FirstOrDefault with Fallback',
    c: 'FirstOrDefault() returns the first matching element, or a default value (e.g. 0 or null) if not found.',
    m: 'detective',
    code: `var list = new List<int> { 2, 4, 6 };\nint found = list.FirstOrDefault(x => x > 10);\nConsole.WriteLine(found);`,
    q: 'OUTPUT DETECTIVE: No numbers are > 10. What is the default value of an int?',
    opts: [
      '0',
      'null',
      '-1',
      'InvalidOperationException'
    ],
    a: 0,
    h: 'default(int) is 0.',
    explanation: 'Because no element satisfies `x > 10`, `FirstOrDefault` returns `default(int)`, which is `0`.'
  },
  {
    t: 'LINQ Query Expression Syntax Assembly',
    c: 'LINQ supports declarative SQL-like query expression syntax.',
    m: 'builder',
    codeBlocks: [
      'var ranks = new int[] { 5, 12, 8, 20 };',
      'var elites = from r in ranks',
      '             where r >= 10',
      '             select r;',
      'Console.WriteLine(elites.Count());'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    q: 'CODE BUILDER: Assemble the declarative LINQ query expression pipeline:',
    h: 'Array ranks, from r in ranks, where r >= 10, select r, print Count.',
    explanation: 'This declarative LINQ query filters numbers `>= 10` (12 and 20) and evaluates to a count of 2.'
  },
  {
    t: 'LINQ Any() Condition Checker',
    c: 'Any(predicate) determines whether any element of a sequence satisfies a condition, returning boolean true/false.',
    m: 'completion',
    code: `var health = new List<int> { 100, 80, 0 };\nbool hasDead = health.___\(h => h <= 0);`,
    q: 'CODE COMPLETION: Choose the LINQ method that returns true if at least one element matches:',
    opts: [
      'Any',
      'All',
      'Exists',
      'Contains'
    ],
    a: 0,
    h: 'Use Any() to test if any element passes.',
    explanation: '`Any()` checks whether any elements satisfy the predicate and immediately short-circuits with `true`.'
  },
  {
    t: 'LINQ OrderBy Sorting',
    c: 'OrderBy sorts elements in ascending order; OrderByDescending sorts in descending order.',
    m: 'detective',
    code: `var names = new List<string> { "Charlie", "Alice", "Bob" };\nvar sorted = names.OrderBy(n => n).First();\nConsole.WriteLine(sorted);`,
    q: 'OUTPUT DETECTIVE: Alphabetical sorting: What is the First() name?',
    opts: [
      '"Alice"',
      '"Bob"',
      '"Charlie"',
      'null'
    ],
    a: 0,
    h: '"Alice" comes first alphabetically.',
    explanation: '`OrderBy(n => n)` sorts names alphabetically to "Alice", "Bob", "Charlie". `First()` returns "Alice".'
  },
  // BOSS 2: Level 16
  {
    t: 'THE LAMBDA SENTINEL',
    isBoss: true,
    name: 'THE LAMBDA SENTINEL',
    hp: 600,
    avatar: '🛡️',
    story: 'A sentinel guarding LINQ Forest, challenging hackers on delegates, expression trees, and closures!',
    phases: [
      {
        q: 'PHASE 1: Sentinel tests closure variable capture! What happens when a lambda captures a local variable in a loop?',
        opts: [
          'It captures the variable reference, meaning changes to that variable are seen by the lambda',
          'It takes an immutable copy of the variable at capture time',
          'It converts the variable to static',
          'It throws a CompilerWarning'
        ],
        a: 0,
        explanation: 'C# lambdas create closures that capture the variable reference itself, not a snapshot value.'
      },
      {
        q: 'PHASE 2: Sentinel tests IEnumerable vs IQueryable! What is the key difference between IEnumerable and IQueryable in LINQ?',
        opts: [
          'IQueryable builds Expression Trees translated to SQL at the database; IEnumerable executes in-memory with delegates',
          'IEnumerable is faster for remote databases',
          'IQueryable is only for arrays',
          'They are identical'
        ],
        a: 0,
        explanation: '`IQueryable` retains the query as an Expression Tree that ORMs like Entity Framework translate into SQL; `IEnumerable` runs in-memory.'
      },
      {
        q: 'PHASE 3: Sentinel tests Single() vs First()! What does list.Single() throw if the list contains 2 matching items?',
        opts: [
          'InvalidOperationException ("Sequence contains more than one element")',
          'Returns the first item silently',
          'Returns null',
          'Throws IndexOutOfRangeException'
        ],
        a: 0,
        explanation: '`Single()` asserts there is exactly one element; if there are 0 or more than 1, it throws `InvalidOperationException`.'
      },
      {
        q: 'PHASE 4: Sentinel queries lambda discard parameter! In C# 9+, how do you discard an unused parameter in a lambda: (_, y) => y * 2?',
        opts: [
          'Use the underscore symbol _ as a discard',
          'Use the keyword discard',
          'Omit the parameter name entirely',
          'Use null'
        ],
        a: 0,
        explanation: 'Underscores `_` represent discards for unused lambda parameters.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which LINQ method flattens a list of lists into a single sequence: [[1, 2], [3, 4]] -> [1, 2, 3, 4]?',
        opts: ['SelectMany', 'Flatten', 'SelectAll', 'Merge'],
        a: 0,
        explanation: '`SelectMany()` projects each element of a sequence to an `IEnumerable` and flattens the resulting sequences into one sequence.'
      }
    ]
  },

  // =========================================================================
  // AREA 3: PROPERTY PALACE (Lv 17-24) - PROPERTIES & RECORDS
  // =========================================================================
  {
    t: 'Auto-Implemented Properties',
    c: 'Auto-properties encapsulate private backing fields automatically: public int Level { get; set; }.',
    m: 'glitch',
    code: `public class Operative {\n    public int Health { get set } // Bug: Missing semicolons!\n}`,
    q: 'BUG HUNTER: Auto-properties require semicolons after get and set accessors. Fix the syntax:',
    opts: [
      '{ get; set; }',
      '{ get, set }',
      ': get; set;',
      '{ read; write; }'
    ],
    a: 0,
    h: 'Add semicolons: { get; set; }.',
    explanation: 'C# auto-implemented properties use `{ get; set; }` with semicolons inside the accessor block.'
  },
  {
    t: 'Init-Only Setters (C# 9+)',
    c: 'init accessors make properties immutable after object creation, while allowing object initializer syntax.',
    m: 'runner',
    code: `public class Config {\n    public int Port { get; init; }\n}\nvar c = new Config { Port = 8080 };\n// c.Port = 9000; // Error!`,
    q: 'SPEED RUN: When can an init-only property be assigned a value?',
    opts: [
      'Only during object construction / object initializer',
      'Any time from any method',
      'Never',
      'Only inside static methods'
    ],
    a: 0,
    h: 'init properties are locked after object initialization.',
    explanation: 'An `init` accessor allows assignment only during object construction, enforcing immutability thereafter.'
  },
  {
    t: 'Expression-Bodied Members (=>)',
    c: 'The => operator defines concise single-expression properties and methods.',
    m: 'detective',
    code: `public class Weapon {\n    public int Power { get; set; } = 40;\n    public int Damage => Power * 2;\n}\nvar w = new Weapon();\nConsole.WriteLine(w.Damage);`,
    q: 'OUTPUT DETECTIVE: 40 * 2 = 80. What is printed by w.Damage?',
    opts: [
      '80',
      '40',
      '0',
      'Compilation Error'
    ],
    a: 0,
    h: 'Damage evaluates Power * 2.',
    explanation: 'The expression-bodied property `Damage => Power * 2` calculates 40 * 2 = 80 when accessed.'
  },
  {
    t: 'C# 9+ Records and Value Equality',
    c: 'record creates reference types with built-in value-based equality and with-expression cloning.',
    m: 'detective',
    code: `public record Point(int X, int Y);\nvar p1 = new Point(10, 20);\nvar p2 = new Point(10, 20);\nConsole.WriteLine(p1 == p2);`,
    q: 'OUTPUT DETECTIVE: Records compare values, not reference memory addresses! What is printed?',
    opts: [
      'True',
      'False',
      'null',
      'Compilation Error'
    ],
    a: 0,
    h: 'Records use value equality for comparisons.',
    explanation: 'C# `record` types automatically implement value-based equality. Since `X` and `Y` match, `p1 == p2` is `True`.'
  },
  {
    t: 'Record Non-Destructive Mutation (with)',
    c: 'The with expression creates a copy of a record with specified properties modified.',
    m: 'builder',
    codeBlocks: [
      'public record Drone(string Model, int Battery);',
      'var d1 = new Drone("Alpha", 100);',
      'var d2 = d1 with { Battery = 50 };',
      'Console.WriteLine($"{d2.Model}:{d2.Battery}");'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the record definition and non-destructive "with" mutation:',
    h: 'Define record Drone, instantiate d1, clone d2 with Battery=50, print.',
    explanation: 'The `with` expression creates a new `Drone` instance copying `d1`\'s `Model` ("Alpha") while updating `Battery` to 50.'
  },
  {
    t: 'Required Properties (C# 11)',
    c: 'The required modifier indicates that a property must be set during object initialization.',
    m: 'completion',
    code: `public class Operative {\n    public ___ string Callsign { get; init; }\n}\n// new Operative() without Callsign fails compilation!`,
    q: 'CODE COMPLETION: Choose the C# 11 modifier that enforces initialization at compile time:',
    opts: [
      'required',
      'mandatory',
      'must_set',
      'nonnull'
    ],
    a: 0,
    h: 'Use the required modifier.',
    explanation: 'The `required` keyword forces callers to populate that property when instantiating the class.'
  },
  {
    t: 'Struct vs Class Memory Allocation',
    c: 'struct is a value type allocated on the stack; class is a reference type allocated on the heap.',
    m: 'detective',
    code: `struct Counter { public int Val; }\nCounter c1 = new Counter { Val = 10 };\nCounter c2 = c1; // Copies value!\nc2.Val = 20;\nConsole.WriteLine(c1.Val);`,
    q: 'OUTPUT DETECTIVE: Because struct is copied by value, what is c1.Val?',
    opts: [
      '10',
      '20',
      '0',
      'Undefined'
    ],
    a: 0,
    h: 'c2 received an independent copy of c1.',
    explanation: 'Assigning a `struct` copies the entire value. Modifying `c2.Val` has no effect on `c1.Val`, which remains `10`.'
  },
  // BOSS 3: Level 24
  {
    t: 'THE GC SWEEPER',
    isBoss: true,
    name: 'THE GC SWEEPER',
    hp: 700,
    avatar: '🧹',
    story: 'A system cleaner entity in Property Palace, collecting Gen 0, 1, and 2 heap allocations!',
    phases: [
      {
        q: 'PHASE 1: Sweeper tests GC generations! How many generational buckets does the .NET Garbage Collector manage for small objects?',
        opts: [
          '3 generations (Gen 0, Gen 1, Gen 2)',
          '2 generations',
          '1 generation',
          '10 generations'
        ],
        a: 0,
        explanation: 'The .NET GC uses three generations: Gen 0 (newly allocated, frequent short collections), Gen 1 (buffer), and Gen 2 (long-lived objects).'
      },
      {
        q: 'PHASE 2: Sweeper tests Large Object Heap (LOH)! What size threshold qualifies an object for the Large Object Heap in .NET?',
        opts: ['85,000 bytes or larger', '1,000 bytes', '1 megabyte', '10,000 bytes'],
        a: 0,
        explanation: 'Objects 85,000 bytes or larger are allocated on the Large Object Heap (LOH), which is collected less frequently.'
      },
      {
        q: 'PHASE 3: Sweeper queries Finalizers! How is a finalizer defined in a C# class?',
        opts: ['~ClassName() { }', 'void finalize()', 'def __del__()', 'Dispose(bool final)'],
        a: 0,
        explanation: 'In C#, a finalizer uses tilde syntax `~ClassName()`, invoked by the GC finalizer thread before reclaiming unmanaged memory.'
      },
      {
        q: 'PHASE 4: Sweeper queries GC.SuppressFinalize! Why does Dispose() call GC.SuppressFinalize(this)?',
        opts: [
          'To inform the GC that cleanup was already completed manually, avoiding the expensive finalizer queue',
          'To pause the garbage collector',
          'To force immediate memory reclamation',
          'To delete the object'
        ],
        a: 0,
        explanation: 'Calling `GC.SuppressFinalize(this)` removes the object from the finalization queue, saving CPU cycles.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which C# keyword ensures an IDisposable object is properly disposed even if exceptions occur?',
        opts: ['using', 'clean', 'auto_free', 'guard'],
        a: 0,
        explanation: 'The `using` statement (or using declaration) guarantees that `Dispose()` is called upon leaving the scope inside a synthesized `finally` block.'
      }
    ]
  },

  // =========================================================================
  // AREA 4: DELEGATE DEN (Lv 25-32) - DELEGATES & EVENTS
  // =========================================================================
  {
    t: 'Action<T> and Func<T, TResult>',
    c: 'Action represents a method that returns void; Func represents a method that returns a value.',
    m: 'glitch',
    code: `Action<int, int> adder = (a, b) => a + b; // Bug: adder returns a value, so it must be a Func!`,
    q: 'BUG HUNTER: The lambda returns an int result. What delegate type must be used instead of Action?',
    opts: [
      'Func<int, int, int>',
      'Action<int, int, int>',
      'Predicate<int>',
      'Method<int>'
    ],
    a: 0,
    h: 'Func<in1, in2, out> returns a value; Action always returns void.',
    explanation: '`Action` is for `void` methods. To return a result, use `Func<T1, T2, TResult>` where the last generic type is the return type.'
  },
  {
    t: 'Event Declaration and Invocation',
    c: 'The event keyword provides a layer of encapsulation over a delegate, preventing external callers from clearing or overwriting listeners.',
    m: 'runner',
    code: `public class AlertSystem {\n    public event Action OnBreach;\n    public void Trigger() => OnBreach?.Invoke();\n}`,
    q: 'SPEED RUN: What operator subscribes an event listener method in C#?',
    opts: [
      '+=',
      '=',
      '<<',
      'subscribe'
    ],
    a: 0,
    h: 'Use += to subscribe to an event.',
    explanation: 'The `+=` operator adds a handler to the event\'s invocation list. `-=` unsubscribes.'
  },
  {
    t: 'Null-Conditional Event Invocation',
    c: 'OnEvent?.Invoke(sender, args) safely fires the event only if there are active subscribers.',
    m: 'detective',
    code: `Action onPing = null;\nonPing?.Invoke();\nConsole.WriteLine("SAFE");`,
    q: 'OUTPUT DETECTIVE: onPing is null. Does onPing?.Invoke() throw NullReferenceException?',
    opts: [
      'No, it safely short-circuits and prints "SAFE"',
      'Yes, it crashes',
      'It prints null',
      'Compilation Error'
    ],
    a: 0,
    h: '?. short-circuits if the delegate is null.',
    explanation: 'The null-conditional operator `?.` checks if `onPing` is non-null before invoking, safely avoiding exceptions.'
  },
  {
    t: 'Multicast Delegate Chaining',
    c: 'Delegates can point to multiple methods; invoking the delegate calls them sequentially.',
    m: 'builder',
    codeBlocks: [
      'int count = 0;',
      'Action act = () => count += 5;',
      'act += () => count += 10;',
      'act();',
      'Console.WriteLine(count);'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    q: 'CODE BUILDER: Assemble the multicast delegate chaining sequence (5 + 10 = 15):',
    h: 'Initialize count, create act adding 5, chain handler adding 10, invoke act, print count.',
    explanation: 'Invoking the multicast delegate executes both chained lambdas, resulting in `count = 15`.'
  },
  {
    t: 'Predicate<T> Delegate',
    c: 'Predicate<T> is a delegate representing a method that takes an object and returns a boolean (equivalent to Func<T, bool>).',
    m: 'completion',
    code: `___<int> isOverheat = temp => temp > 100;\nConsole.WriteLine(isOverheat(120));`,
    q: 'CODE COMPLETION: Choose the built-in delegate type that takes a single parameter and returns bool:',
    opts: [
      'Predicate',
      'Filter',
      'Matcher',
      'Boolean'
    ],
    a: 0,
    h: 'Use Predicate<T>.',
    explanation: '`Predicate<T>` represents a method that evaluates whether the specified object meets a condition, returning `bool`.'
  },
  {
    t: 'Anonymous Methods with delegate Keyword',
    c: 'Before lambdas, anonymous methods were declared with the delegate keyword.',
    m: 'detective',
    code: `Action act = delegate { Console.WriteLine("OLD_SCHOOL"); };\nact();`,
    q: 'OUTPUT DETECTIVE: What does invoking act print?',
    opts: [
      '"OLD_SCHOOL"',
      'Compilation Error',
      'null',
      'Undefined'
    ],
    a: 0,
    h: 'The anonymous method executes normally: "OLD_SCHOOL".',
    explanation: '`delegate { ... }` creates an anonymous method, which runs when `act()` is called.'
  },
  {
    t: 'Unsubscribing from Events (-=)',
    c: 'Failing to unsubscribe from events with -= can cause memory leaks (Lapsed Listener problem).',
    m: 'detective',
    code: `// Subscribed with: system.OnAlert += HandleAlert;\n// Unsubscribed with: system.OnAlert -= HandleAlert;`,
    q: 'OUTPUT DETECTIVE / BEST PRACTICE: Why must event handlers be unsubscribed when objects are destroyed?',
    opts: [
      'The publisher retains a reference to the subscriber, preventing it from being garbage collected',
      'Events crash if they have more than 1 listener',
      'It deletes the event',
      'To reset the CPU register'
    ],
    a: 0,
    h: 'The event holds a reference to the listener, causing a memory leak.',
    explanation: 'The publisher\'s invocation list holds a strong reference to the subscriber. If not removed via `-=`, the subscriber cannot be garbage collected.'
  },
  // BOSS 4: Level 32
  {
    t: 'THE EVENT DISPATCHER',
    isBoss: true,
    name: 'THE EVENT DISPATCHER',
    hp: 800,
    avatar: '📡',
    story: 'A rogue message broker in Delegate Den, overwhelming listeners with event cascades and synchronization locks!',
    phases: [
      {
        q: 'PHASE 1: Dispatcher tests event encapsulation! Why can code outside a class not directly invoke its public event?',
        opts: [
          'Events can only be invoked from within the class that declared them (external callers can only += or -=)',
          'Events cannot be public',
          'Only interfaces can invoke events',
          'Events can only be invoked once'
        ],
        a: 0,
        explanation: 'The `event` keyword encapsulates the delegate: outside classes are permitted only to add (`+=`) or remove (`-=`) handlers, not invoke or clear them.'
      },
      {
        q: 'PHASE 2: Dispatcher queries standard event pattern! What are the standard parameters of EventHandler<TEventArgs>?',
        opts: [
          '(object? sender, TEventArgs e)',
          '(int code, string message)',
          '(TEventArgs e)',
          '(object target)'
        ],
        a: 0,
        explanation: 'The standard .NET event pattern uses `(object? sender, TEventArgs e)`.'
      },
      {
        q: 'PHASE 3: Dispatcher tests delegate immutability! Are Delegate instances in C# mutable or immutable?',
        opts: [
          'Immutable (combining with += creates a brand-new MulticastDelegate instance)',
          'Mutable in-place',
          'Mutable only when static',
          'Stored in unmanaged memory'
        ],
        a: 0,
        explanation: 'Delegates are immutable. Using `+=` invokes `Delegate.Combine()`, creating a new `MulticastDelegate` containing the combined invocation list.'
      },
      {
        q: 'PHASE 4: Dispatcher queries local functions vs lambdas! What performance advantage can a static local function have over a lambda?',
        opts: [
          'A static local function guarantees zero memory allocations because it cannot capture enclosing scope variables',
          'It runs in a separate thread',
          'It compiles to C++',
          'It has no advantages'
        ],
        a: 0,
        explanation: 'Marking a local function `static` prevents capturing enclosing variables, ensuring the compiler creates zero heap allocation closures.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What method returns all individual delegates contained within a MulticastDelegate?',
        opts: ['GetInvocationList()', 'GetListeners()', 'ToArray()', 'GetSubscribers()'],
        a: 0,
        explanation: '`GetInvocationList()` returns an array of `Delegate` representing the invocation list in order.'
      }
    ]
  },

  // =========================================================================
  // AREA 5: ASYNC AVENUE (Lv 33-40) - ASYNC & AWAIT
  // =========================================================================
  {
    t: 'Async and Await Keywords',
    c: 'async enables the await keyword to pause execution asynchronously without blocking the UI thread.',
    m: 'glitch',
    code: `public Task<int> FetchDataAsync() {\n    int result = await Task.FromResult(100); // Bug: Missing async modifier on method!\n    return result;\n}`,
    q: 'BUG HUNTER: await can only be used in methods marked with which keyword?',
    opts: [
      'async',
      'awaitable',
      'threaded',
      'task'
    ],
    a: 0,
    h: 'Add the async modifier to the method signature.',
    explanation: 'In C#, the `await` keyword can only be used inside a method modified by the `async` keyword.'
  },
  {
    t: 'Task<T> Return Type',
    c: 'Task<T> represents an asynchronous operation that will eventually return a value of type T.',
    m: 'runner',
    code: `public async Task<int> GetPowerAsync() {\n    await Task.Delay(10);\n    return 42;\n}`,
    q: 'SPEED RUN: When the task completes, what type of value is extracted by await GetPowerAsync()?',
    opts: [
      'int',
      'Task<int>',
      'void',
      'object'
    ],
    a: 0,
    h: 'await unwraps the Task<T> and yields T (int).',
    explanation: 'Awaiting a `Task<int>` unwraps the task upon completion and yields the raw `int` value (42).'
  },
  {
    t: 'Parallel Tasks with Task.WhenAll',
    c: 'Task.WhenAll executes multiple tasks concurrently and completes when all of them finish.',
    m: 'detective',
    code: `var t1 = Task.FromResult(10);\nvar t2 = Task.FromResult(20);\nint[] results = await Task.WhenAll(t1, t2);\nConsole.WriteLine(results[0] + results[1]);`,
    q: 'OUTPUT DETECTIVE: 10 + 20 = 30. What is printed?',
    opts: [
      '30',
      '10',
      '20',
      '0'
    ],
    a: 0,
    h: 'Task.WhenAll collects both results: 10 + 20 = 30.',
    explanation: '`Task.WhenAll` awaits both tasks in parallel and returns an array of their results `[10, 20]`, whose sum is 30.'
  },
  {
    t: 'CancellationToken Cancellation',
    c: 'CancellationToken allows cooperative cancellation of long-running asynchronous tasks.',
    m: 'builder',
    codeBlocks: [
      'using var cts = new CancellationTokenSource();',
      'CancellationToken token = cts.Token;',
      'cts.Cancel();',
      'Console.WriteLine(token.IsCancellationRequested);'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the CancellationTokenSource initialization and cancellation pipeline:',
    h: 'Create cts, get token, cancel source, print IsCancellationRequested.',
    explanation: 'Calling `cts.Cancel()` sets `token.IsCancellationRequested` to `True`, signaling tasks to stop.'
  },
  {
    t: 'ValueTask<T> for Zero Allocation',
    c: 'ValueTask<T> is a struct alternative to Task<T> that avoids heap allocation when operations complete synchronously.',
    m: 'completion',
    code: `public ___<int> QuickCompute(int x) {\n    if (x == 0) return new ___\<int>(0); // Zero heap allocation!\n    return new ___\<int>(Task.Run(() => x * 2));\n}`,
    q: 'CODE COMPLETION: Choose the value-type task alternative in System.Threading.Tasks:',
    opts: [
      'ValueTask',
      'StructTask',
      'FastTask',
      'LiteTask'
    ],
    a: 0,
    h: 'Use ValueTask<T>.',
    explanation: '`ValueTask<T>` avoids allocating a `Task` object on the heap when an asynchronous method completes synchronously (e.g. from cache).'
  },
  {
    t: 'Async Void Danger',
    c: 'async void should be avoided except for top-level event handlers; exceptions cannot be caught by callers.',
    m: 'detective',
    code: `// Rule: "async Task" for normal methods; "async void" ONLY for event handlers.`,
    q: 'OUTPUT DETECTIVE / BEST PRACTICE: Why is async void dangerous for regular methods?',
    opts: [
      'Unhandled exceptions crash the process because the caller cannot catch or await them',
      'It takes twice as long to execute',
      'It blocks the CPU thread',
      'It leaks memory'
    ],
    a: 0,
    h: 'async void cannot be awaited and unhandled exceptions crash the process.',
    explanation: 'Because `async void` cannot be awaited, exceptions thrown inside it cannot be caught by surrounding `try-catch` blocks and will crash the process.'
  },
  {
    t: 'Task.Delay vs Thread.Sleep',
    c: 'Task.Delay is non-blocking asynchronous pause; Thread.Sleep blocks the underlying OS thread.',
    m: 'detective',
    code: `// await Task.Delay(1000); -> frees thread back to thread pool\n// Thread.Sleep(1000); -> freezes thread synchronously`,
    q: 'OUTPUT DETECTIVE: Why is await Task.Delay preferred over Thread.Sleep in async code?',
    opts: [
      'It yields the thread back to the thread pool to service other work while waiting',
      'It speeds up the system clock',
      'It is guaranteed to be 100% exact to the microsecond',
      'Thread.Sleep is deprecated'
    ],
    a: 0,
    h: 'Task.Delay releases the thread back to the thread pool.',
    explanation: '`Task.Delay` uses a timer to resume execution without holding onto a physical thread, maximizing scalability.'
  },
  // BOSS 5: Level 40
  {
    t: 'THE DEADLOCK BEHEMOTH',
    isBoss: true,
    name: 'THE DEADLOCK BEHEMOTH',
    hp: 900,
    avatar: '👹',
    story: 'A massive monstrosity in Async Avenue, causing deadlocks by mixing synchronous .Result and UI SynchronizationContexts!',
    phases: [
      {
        q: 'PHASE 1: Behemoth tests the sync-over-async deadlock! Why does calling task.Result or task.Wait() on a UI thread cause a deadlock?',
        opts: [
          'The UI thread blocks waiting for the task, but the task needs the UI SynchronizationContext to resume and complete',
          'It triggers an OutOfMemoryException',
          'It turns off the network adapter',
          'It terminates the task'
        ],
        a: 0,
        explanation: 'Blocking with `.Result` locks the UI thread, while the awaiting task waits for that same thread to be free, resulting in a deadlock.'
      },
      {
        q: 'PHASE 2: Behemoth tests ConfigureAwait(false)! What does await task.ConfigureAwait(false) accomplish in library code?',
        opts: [
          'Tells the runtime it does NOT need to resume on the captured SynchronizationContext, avoiding deadlocks',
          'Cancels the task immediately',
          'Makes the task synchronous',
          'Disables exception throwing'
        ],
        a: 0,
        explanation: '`ConfigureAwait(false)` instructs the awaiter to resume continuation on any available thread pool thread rather than capturing the original context.'
      },
      {
        q: 'PHASE 3: Behemoth tests async state machine! What does the C# compiler generate behind the scenes for an async method?',
        opts: [
          'An IAsyncStateMachine struct that tracks execution points and manages continuations',
          'A background OS process',
          'A raw C++ thread',
          'A recursive function'
        ],
        a: 0,
        explanation: 'The C# compiler converts `async` methods into a state machine struct implementing `IAsyncStateMachine`, resuming execution at each `await` point.'
      },
      {
        q: 'PHASE 4: Behemoth queries IAsyncEnumerable! Which C# 8 feature enables asynchronous streaming of data with foreach: await foreach?',
        opts: ['IAsyncEnumerable<T>', 'IEnumerable<Task<T>>', 'IStreamable<T>', 'IAsyncList<T>'],
        a: 0,
        explanation: '`IAsyncEnumerable<T>` and `await foreach` allow consuming asynchronous data streams as elements arrive.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which class is recommended over WebClient for making asynchronous HTTP network requests in modern .NET?',
        opts: ['HttpClient', 'HttpWebRequest', 'NetworkStream', 'WebClient'],
        a: 0,
        explanation: '`HttpClient` is the modern, high-performance, asynchronous HTTP client intended to be instantiated once and reused.'
      }
    ]
  },

  // =========================================================================
  // AREA 6: GENERIC GROVE (Lv 41-48) - GENERICS & PATTERN MATCHING
  // =========================================================================
  {
    t: 'Generic Type Constraints (where T :)',
    c: 'where T : constraint restricts generic arguments to specific types (e.g. class, struct, new(), Interface).',
    m: 'glitch',
    code: `public class Factory<T> {\n    public T Create() { return new T(); } // Bug: T lacks new() constraint!\n}`,
    q: 'BUG HUNTER: The compiler cannot guarantee T has a parameterless constructor. Add the constraint:',
    opts: [
      'where T : new()',
      'where T : constructor()',
      'where T : class',
      'where T : init'
    ],
    a: 0,
    h: 'Use where T : new() to require a parameterless constructor.',
    explanation: '`where T : new()` guarantees that `T` possesses a public parameterless constructor, allowing `new T()` inside the class.'
  },
  {
    t: 'Pattern Matching with "is"',
    c: 'The is operator checks type and pattern compatibility while simultaneously binding a new variable.',
    m: 'runner',
    code: `object val = "CYBER";\nif (val is string s) {\n    Console.WriteLine(s.Length);\n}`,
    q: 'SPEED RUN: What is printed for "CYBER".Length?',
    opts: [
      '5',
      '6',
      'null',
      'Compilation Error'
    ],
    a: 0,
    h: '"CYBER" has 5 characters.',
    explanation: '`val is string s` checks if `val` is a string; since it is, it binds `s` to `"CYBER"` with length 5.'
  },
  {
    t: 'Switch Expressions (C# 8+)',
    c: 'Switch expressions yield values using concise pattern matching arms with =>.',
    m: 'detective',
    code: `int temp = 105;\nstring status = temp switch {\n    > 100 => "CRITICAL",\n    > 50  => "WARM",\n    _     => "NORMAL"\n};\nConsole.WriteLine(status);`,
    q: 'OUTPUT DETECTIVE: 105 matches > 100. What is status?',
    opts: [
      '"CRITICAL"',
      '"WARM"',
      '"NORMAL"',
      'Compilation Error'
    ],
    a: 0,
    h: '105 > 100 evaluates to "CRITICAL".',
    explanation: 'The relational pattern `> 100` matches 105, returning `"CRITICAL"`.'
  },
  {
    t: 'IDisposable & Using Statement (RAII in C#)',
    c: 'The using statement guarantees Dispose() invocation even when exceptions occur.',
    m: 'builder',
    codeBlocks: [
      'public class Shield : IDisposable {',
      '    public void Dispose() => Console.WriteLine("DISPOSED");',
      '}',
      'using (var s = new Shield()) {',
      '    Console.WriteLine("ACTIVE");',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the IDisposable class and using statement execution block:',
    h: 'Class implementing IDisposable, Dispose method, close class, using block with active print.',
    explanation: 'When the `using` block finishes, `s.Dispose()` executes automatically, printing "DISPOSED".'
  },
  {
    t: 'C# 8 Using Declarations',
    c: 'using var resource = ... disposes the object automatically at the end of the enclosing block scope.',
    m: 'completion',
    code: `void ExecuteMission() {\n    ___ var barrier = new Shield();\n    Console.WriteLine("ENGAGED");\n    // barrier disposes here\n}`,
    q: 'CODE COMPLETION: Choose the keyword that disposes barrier at function exit without nested braces:',
    opts: [
      'using',
      'dispose',
      'auto',
      'scoped'
    ],
    a: 0,
    h: 'Use using var for scope-bound disposal.',
    explanation: 'A `using` declaration (`using var x = ...;`) instructs the compiler to dispose `x` when the enclosing block scope exits.'
  },
  {
    t: 'Positional and Property Patterns',
    c: 'Property patterns match fields and properties inside braces: obj is { Status: "ONLINE" }.',
    m: 'detective',
    code: `record Unit(int Level, bool Armed);\nUnit u = new Unit(10, true);\nif (u is { Level: >= 10, Armed: true }) {\n    Console.WriteLine("READY");\n}`,
    q: 'OUTPUT DETECTIVE: Unit has Level 10 and Armed true. What is printed?',
    opts: [
      '"READY"',
      'Nothing',
      'Compilation Error',
      'null'
    ],
    a: 0,
    h: 'Both properties match the pattern, printing "READY".',
    explanation: 'The property pattern checks that `Level >= 10` and `Armed == true`. Both are satisfied, outputting `"READY"`.'
  },
  {
    t: 'Tuple Pattern Matching',
    c: 'Switch expressions can match on tuples of multiple variables simultaneously.',
    m: 'detective',
    code: `var pair = ("DEFENSE", true);\nstring res = pair switch {\n    ("ATTACK", _) => "ATK",\n    ("DEFENSE", true) => "DEF_HIGH",\n    _ => "UNKNOWN"\n};\nConsole.WriteLine(res);`,
    q: 'OUTPUT DETECTIVE: What is printed for ("DEFENSE", true)?',
    opts: [
      '"DEF_HIGH"',
      '"ATK"',
      '"UNKNOWN"',
      'Compilation Error'
    ],
    a: 0,
    h: 'Matches ("DEFENSE", true) -> "DEF_HIGH".',
    explanation: 'The tuple pattern matches `("DEFENSE", true)` on the second arm, yielding `"DEF_HIGH"`.'
  },
  // BOSS 6: Level 48
  {
    t: 'THE PATTERN MATCHER',
    isBoss: true,
    name: 'THE PATTERN MATCHER',
    hp: 1000,
    avatar: '👹',
    story: 'A polymorphic entity commanding Generic Grove, shifting shapes through type hierarchies and switch patterns!',
    phases: [
      {
        q: 'PHASE 1: Matcher tests covariance and contravariance! Which keyword marks a generic type parameter as covariant (out)?',
        opts: ['out', 'in', 'covariant', 'ref'],
        a: 0,
        explanation: 'In C# interfaces, `out T` marks a generic type parameter as covariant, allowing derived types to be used in place of base types.'
      },
      {
        q: 'PHASE 2: Matcher tests list patterns (C# 11)! What does array is [1, .., 5] test for?',
        opts: [
          'Checks if array starts with 1, ends with 5, with any number of elements in between',
          'Checks if array is from 1 to 5',
          'Multiplies array elements',
          'Throws an exception'
        ],
        a: 0,
        explanation: 'The slice pattern `..` inside a list pattern matches zero or more elements between the start (1) and end (5).'
      },
      {
        q: 'PHASE 3: Matcher tests unmanaged generic constraint! What does where T : unmanaged require?',
        opts: [
          'T must be a non-nullable value type whose fields are all value types recursively (no reference types)',
          'T must be written in C++',
          'T must disable garbage collection',
          'T cannot be passed to methods'
        ],
        a: 0,
        explanation: 'The `unmanaged` constraint specifies that a type is a struct containing only primitive fields and no reference types, allowing pointer operations.'
      },
      {
        q: 'PHASE 4: Matcher queries nameof operator! What is the output of nameof(System.Collections.Generic.List<int>)?',
        opts: ['"List"', '"System.Collections.Generic.List<int>"', '"List<int>"', '"Collections"'],
        a: 0,
        explanation: '`nameof` returns the unqualified string name of the code element (here, `"List"`).'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which C# keyword allows declaring raw unsafe pointer blocks (*ptr) for low-level memory operations?',
        opts: ['unsafe', 'native', 'unmanaged', 'raw'],
        a: 0,
        explanation: 'The `unsafe` keyword enables code blocks containing raw pointers (`*`, `&`, `->`) and direct memory operations in C#.'
      }
    ]
  },

  // =========================================================================
  // AREA 7: CLR CORE & MASTER CHALLENGES (Lv 49-51)
  // =========================================================================
  {
    t: 'Span<T> High-Performance Memory Slicing',
    c: 'Span<T> provides a type-safe, contiguous view of arbitrary memory (stack, heap, native) with zero allocations.',
    m: 'detective',
    code: `Span<int> numbers = stackalloc int[3] { 10, 20, 30 };\nSpan<int> slice = numbers.Slice(1, 2);\nConsole.WriteLine(slice[0]);`,
    q: 'OUTPUT DETECTIVE: slice begins at index 1 (20). What is slice[0]?',
    opts: [
      '20',
      '10',
      '30',
      'IndexOutOfRangeException'
    ],
    a: 0,
    h: 'Index 0 of the slice is the original index 1 (20).',
    explanation: '`Span.Slice(1, 2)` creates a zero-allocation view starting at index 1. `slice[0]` returns `20`.'
  },
  {
    t: 'Reflection & Type Inspection',
    c: 'Reflection in System.Reflection allows inspecting metadata, types, and members at runtime.',
    m: 'builder',
    codeBlocks: [
      'using System.Reflection;',
      'Type t = typeof(string);',
      'MethodInfo m = t.GetMethod("ToUpper", Type.EmptyTypes);',
      'Console.WriteLine(m.Name);'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the reflection type inspection pipeline:',
    h: 'Include Reflection, get Type of string, query GetMethod ToUpper, print method Name.',
    explanation: 'Reflection queries type metadata at runtime, retrieving `MethodInfo` for the `ToUpper` method.'
  },
  // FINAL BOSS: Level 51
  {
    t: 'THE GARBAGE COLLECTOR',
    isBoss: true,
    isFinalBoss: true,
    name: 'THE GARBAGE COLLECTOR',
    hp: 1200,
    avatar: '👑',
    story: 'THE SUPREME CONTROLLER OF THE .NET CLR! It manages managed memory heaps, Tiered JIT compilation, GC threads, and runtime IL bytecode. Defeat it for C# Mastery!',
    phases: [
      {
        q: 'PHASE 1: Controller tests Tiered Compilation! What is Tiered Compilation in modern .NET (.NET Core 3+)?',
        opts: [
          'Code is first compiled quickly (Tier 0) to start fast, then recompiled with heavy optimizations (Tier 1) if invoked frequently',
          'Code is compiled in 10 different stages',
          'It compiles to JavaScript first, then C#',
          'It requires 3 CPU chips'
        ],
        a: 0,
        explanation: 'Tiered compilation starts fast with minimal optimization (Tier 0), then promotes frequently called ("hot") methods to Tier 1 with full JIT optimization.'
      },
      {
        q: 'PHASE 2: Controller tests ref struct limitations! Why can a ref struct (like Span<T>) NOT be boxed or used inside an async method?',
        opts: [
          'It must always reside on the call stack to guarantee safe memory access and can never escape to the managed heap',
          'Because it has no methods',
          'It only runs on 32-bit machines',
          'It requires unsafe compiler flags'
        ],
        a: 0,
        explanation: '`ref struct` types are stack-only. Because heap allocations, boxing, and async state machines would move them to the heap, the compiler forbids it.'
      },
      {
        q: 'PHASE 3: Controller tests GC Pause modes! Which GC mode in .NET is optimized for client apps with low latency (Workstation GC vs Server GC)?',
        opts: [
          'Workstation GC (optimized for UI responsiveness with background collections)',
          'Server GC (allocates a separate heap and GC thread per logical CPU core for max throughput)',
          'Both are identical',
          'Neither supports background GC'
        ],
        a: 0,
        explanation: 'Workstation GC prioritizes low latency and UI smoothness, whereas Server GC creates a heap per CPU core to maximize high-throughput concurrency.'
      },
      {
        q: 'PHASE 4: Controller queries ArrayPool<T>! What is the purpose of ArrayPool<T>.Shared.Rent(size)?',
        opts: [
          'Rents reusable memory arrays from a pool to eliminate heap allocations and reduce GC pressure',
          'Allocates unmanaged C memory',
          'Sorts arrays automatically',
          'Downloads arrays from the web'
        ],
        a: 0,
        explanation: '`ArrayPool<T>` rents pre-allocated arrays, returning them via `Return()` to avoid allocating short-lived large arrays that stress the GC.'
      },
      {
        q: 'PHASE 5: MASTER STRIKE! Which C# keyword allows defining compile-time source generators that emit C# code into the compilation pipeline?',
        opts: [
          'Roslyn Source Generators (IIncrementalGenerator)',
          'T4 Templates only',
          'CodeDOM',
          'IL Weaving'
        ],
        a: 0,
        explanation: 'Roslyn Source Generators (`IIncrementalGenerator`) inspect user code and generate additional source files at compile time, eliminating runtime reflection overhead.'
      }
    ]
  }
];
