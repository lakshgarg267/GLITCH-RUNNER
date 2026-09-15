// =============================================================================
// CODE ARENAA / GLITCH RUNNER - SWIFT CURRICULUM
// 51 Levels across 7 Worlds with 7 Epic Boss Battles
// =============================================================================

window.CURRICULUM_DATA = window.CURRICULUM_DATA || {};

window.CURRICULUM_DATA['swift'] = [
  // =========================================================================
  // WORLD 1: CUPERTINO CAMP (Levels 1-8) - Core Syntax, Types & Optionals
  // =========================================================================
  {
    level: 1,
    title: "Immutable Constant Declaration",
    mode: "completion",
    prompt: "In Swift, declare an immutable constant named 'shieldPower' initialized to 100:",
    code: "___ shieldPower = 100",
    options: [
      "let",
      "var",
      "const",
      "val"
    ],
    correctAnswer: 0,
    hint: "Swift uses 'let' for constants (immutable) and 'var' for mutable variables.",
    explanation: "Swift uses 'let' to declare constants whose values cannot change once assigned, promoting immutability and compile-time safety.",
    reward: { xp: 40, coins: 15 }
  },
  {
    level: 2,
    title: "String Interpolation",
    mode: "completion",
    prompt: "Complete the string interpolation syntax in Swift to embed the 'score' variable:",
    code: "let score = 42\nlet message = \"Your score is ___(score)\"",
    options: [
      "$",
      "\\",
      "#",
      "&"
    ],
    correctAnswer: 1,
    hint: "Swift uses a backslash followed by parentheses for string interpolation.",
    explanation: "Swift's string interpolation syntax is \\(expression). It evaluates the expression inside parentheses and renders it as part of the string literal.",
    reward: { xp: 40, coins: 15 }
  },
  {
    level: 3,
    title: "Explicit Type Annotation",
    mode: "detective",
    prompt: "What is the type of 'velocity' inferred or declared in this code snippet?",
    code: "let velocity: Double = 42",
    options: [
      "Int",
      "Float",
      "Double",
      "NSNumber"
    ],
    correctAnswer: 2,
    hint: "Notice the explicit type annotation ': Double' after the identifier.",
    explanation: "Even though 42 is an integer literal, the explicit annotation ': Double' forces the compiler to store velocity as a 64-bit floating-point Double (42.0).",
    reward: { xp: 45, coins: 15 }
  },
  {
    level: 4,
    title: "Optional Declaration",
    mode: "completion",
    prompt: "In Swift, declare a variable 'playerScore' that can either hold an Int or nil:",
    code: "var playerScore: Int___ = nil",
    options: [
      "!",
      "*",
      "?",
      "&"
    ],
    correctAnswer: 2,
    hint: "A question mark makes a type optional in Swift.",
    explanation: "In Swift, regular types cannot be nil. Appending '?' (e.g. Int?) marks it as an Optional, meaning it can contain either a wrapped value or nil.",
    reward: { xp: 45, coins: 15 }
  },
  {
    level: 5,
    title: "Optional Binding with if let",
    mode: "detective",
    prompt: "What does this optional binding code print?",
    code: "var name: String? = \"Swift\"\nif let unwrapped = name {\n    print(\"Hello, \\(unwrapped)!\")\n} else {\n    print(\"Guest\")\n}",
    options: [
      "Guest",
      "Optional(\"Swift\")",
      "Hello, Swift!",
      "Fatal error: Unexpectedly found nil"
    ],
    correctAnswer: 2,
    hint: "Since name is not nil, the if branch safely unwraps it into 'unwrapped'.",
    explanation: "'if let' unwraps the optional value if it contains a value. Because name is \"Swift\", unwrapped becomes the non-optional String \"Swift\".",
    reward: { xp: 50, coins: 20 }
  },
  {
    level: 6,
    title: "Nil-Coalescing Operator",
    mode: "detective",
    prompt: "What is the evaluated value of 'result'?",
    code: "let input: String? = nil\nlet result = input ?? \"Default\"",
    options: [
      "nil",
      "\"Default\"",
      "\"\"",
      "Optional(\"Default\")"
    ],
    correctAnswer: 1,
    hint: "The nil-coalescing operator '??' unwraps the optional or provides the fallback default if nil.",
    explanation: "The '??' operator checks if the optional is nil. If it is nil, it evaluates and returns the right-hand side default operand, returning \"Default\".",
    reward: { xp: 50, coins: 20 }
  },
  {
    level: 7,
    title: "Force Unwrapping Hazard",
    mode: "glitch",
    prompt: "Identify the runtime crash in this Swift snippet:",
    code: "var energy: Int?\nlet current = energy!\nprint(current)",
    options: [
      "Compile error: energy must be initialized with 0",
      "energy! force-unwraps nil at runtime, causing a fatal error",
      "energy! automatically sets energy to 0",
      "print statement fails because current is optional"
    ],
    correctAnswer: 1,
    hint: "Using '!' on an optional that is currently nil triggers a fatal crash.",
    explanation: "Force unwrapping with '!' asserts to the compiler that the optional is definitely non-nil. When energy is nil, evaluating energy! terminates the program with 'Fatal error: Unexpectedly found nil while unwrapping an Optional value'.",
    reward: { xp: 55, coins: 20 }
  },
  {
    level: 8,
    title: "BOSS BATTLE: THE NIL UNWRAP DEMON",
    mode: "boss",
    bossData: {
      name: "THE NIL UNWRAP DEMON",
      hp: 500,
      phases: [
        {
          phase: 1,
          prompt: "The Demon strikes with uninitialized optionals! What does 'print(serverCode)' output without unwrapping?",
          code: "var serverCode: Int? = 404\nprint(serverCode)",
          options: [
            "404",
            "Optional(404)",
            "nil",
            "Fatal error"
          ],
          correctAnswer: 1,
          explanation: "Printing an optional directly outputs 'Optional(404)' with a compiler warning alerting you to unwrap it."
        },
        {
          phase: 2,
          prompt: "The Demon casts nil into the stream! Which syntax safely provides 200 if serverCode is nil?",
          code: "let finalCode = serverCode ___ 200",
          options: [
            "||",
            "?:",
            "??",
            "&?"
          ],
          correctAnswer: 2,
          explanation: "The nil-coalescing operator '??' supplies a fallback default value when the optional is nil."
        },
        {
          phase: 3,
          prompt: "The Demon cloaks a nested optional! How do you safely read the first letter?",
          code: "var username: String? = \"Cyber\"\nlet char = username?.first",
          options: [
            "char has type Character?",
            "char has type Character",
            "char has type String",
            "Runtime crash if username has length > 0"
          ],
          correctAnswer: 0,
          explanation: "Optional chaining on a String produces an optional result: username?.first returns Optional<Character> (Character?)."
        },
        {
          phase: 4,
          prompt: "The Demon tests multiple optional unwrapping! Which 'if let' condition unwraps both x and y?",
          code: "let x: Int? = 10, y: Int? = 20\n___ let a = x, let b = y {\n    print(a + b)\n}",
          options: [
            "when",
            "guard",
            "if",
            "where"
          ],
          correctAnswer: 2,
          explanation: "Swift allows comma-separated unwraps in a single 'if let a = x, let b = y' statement."
        },
        {
          phase: 5,
          prompt: "Final Strike! What is the type of 'count' after implicit unwrapped optional declaration?",
          code: "var bufferSize: Int! = 1024",
          options: [
            "Int (plain non-optional)",
            "Implicitly Unwrapped Optional (treated as Int? but automatically unwraps)",
            "Double",
            "Invalid Swift syntax"
          ],
          correctAnswer: 1,
          explanation: "Int! declares an Implicitly Unwrapped Optional. It still wraps an optional value under the hood, but the compiler automatically unwraps it at access points."
        }
      ]
    },
    hint: "Defeat the Nil Unwrap Demon by mastering optionals, safe unwrapping, and nil coalescing.",
    explanation: "The Nil Unwrap Demon has fallen! You command Swift's optional type system and safe unwrapping paradigms.",
    reward: { xp: 120, coins: 50, stars: 3 }
  },

  // =========================================================================
  // WORLD 2: GUARD GLADE (Levels 9-16) - Guard, Collections, Tuples & Casting
  // =========================================================================
  {
    level: 9,
    title: "Early Exit with guard let",
    mode: "completion",
    prompt: "Complete the guard statement to safely exit the function early if token is nil:",
    code: "func authenticate(token: String?) {\n    ___ let validToken = token else {\n        return\n    }\n    print(\"Authenticated: \\(validToken)\")\n}",
    options: [
      "if",
      "guard",
      "check",
      "require"
    ],
    correctAnswer: 1,
    hint: "Swift uses 'guard ... else' for early exits and happy-path programming.",
    explanation: "'guard let' requires an 'else' block that exits the scope (e.g. return, throw, fatalError). Once passed, 'validToken' remains available in the remainder of the enclosing scope.",
    reward: { xp: 60, coins: 25 }
  },
  {
    level: 10,
    title: "Array Appending and Mutability",
    mode: "detective",
    prompt: "What will this code output?",
    code: "var weapons = [\"Laser\", \"Plasma\"]\nweapons.append(\"Railgun\")\nprint(weapons.count)",
    options: [
      "2",
      "3",
      "4",
      "Compile error: Arrays are fixed size"
    ],
    correctAnswer: 1,
    hint: "append(_:) adds an element to the end of a mutable array.",
    explanation: "Swift arrays declared with 'var' are dynamic and mutable. Appending 'Railgun' increases weapons.count from 2 to 3.",
    reward: { xp: 60, coins: 25 }
  },
  {
    level: 11,
    title: "Dictionary Subscripting Returns Optionals",
    mode: "detective",
    prompt: "What does subscripting a Swift dictionary always return?",
    code: "let stats = [\"hp\": 100, \"mp\": 50]\nlet armor = stats[\"armor\"]",
    options: [
      "0",
      "Optional<Int> (which is nil here)",
      "Runtime crash (KeyNotFoundException)",
      "undefined"
    ],
    correctAnswer: 1,
    hint: "Looking up keys in a dictionary might fail, so Swift returns an Optional.",
    explanation: "Because a dictionary key might not exist, dictionary subscripting in Swift always returns an Optional (Int? here). Looking up 'armor' yields nil.",
    reward: { xp: 65, coins: 25 }
  },
  {
    level: 12,
    title: "Set Uniqueness",
    mode: "detective",
    prompt: "What is the count of the following Set?",
    code: "let badges: Set<String> = [\"gold\", \"silver\", \"gold\", \"bronze\", \"silver\"]\nprint(badges.count)",
    options: [
      "5",
      "3",
      "2",
      "Compile error"
    ],
    correctAnswer: 1,
    hint: "Sets only store distinct unique elements.",
    explanation: "A Set in Swift discards duplicate elements. Inserting 'gold', 'silver', 'gold', 'bronze', 'silver' retains only 'gold', 'silver', and 'bronze' (count = 3).",
    reward: { xp: 65, coins: 25 }
  },
  {
    level: 13,
    title: "Safe Downcasting with as?",
    mode: "completion",
    prompt: "Downcast 'item' safely to a String, returning nil if the cast fails:",
    code: "let item: Any = 42\nlet text = item ___ String",
    options: [
      "as!",
      "as?",
      "is",
      "to"
    ],
    correctAnswer: 1,
    hint: "'as?' performs a conditional downcast and returns an optional.",
    explanation: "'as?' conditionally downcasts an instance to a specified type. If successful, it wraps it in an optional; if it fails, it returns nil instead of crashing.",
    reward: { xp: 70, coins: 30 }
  },
  {
    level: 14,
    title: "Switch with Value Binding and Where",
    mode: "detective",
    prompt: "What will this switch statement output?",
    code: "let coordinate = (3, 3)\nswitch coordinate {\ncase (let x, let y) where x == y:\n    print(\"Diagonal: \\(x)\")\ncase (0, 0):\n    print(\"Origin\")\ndefault:\n    print(\"Other\")\n}",
    options: [
      "Diagonal: 3",
      "Origin",
      "Other",
      "Compile error: switch must be exhaustive"
    ],
    correctAnswer: 0,
    hint: "The first case binds (x, y) and checks 'where x == y'. Since 3 == 3, it matches.",
    explanation: "Swift switch statements support pattern matching with 'let' value binding and 'where' clauses. Because 3 == 3, the first case matches and prints 'Diagonal: 3'.",
    reward: { xp: 70, coins: 30 }
  },
  {
    level: 15,
    title: "Tuples with Named Elements",
    mode: "detective",
    prompt: "What does this code print?",
    code: "let response: (status: Int, message: String) = (200, \"OK\")\nprint(response.status)",
    options: [
      "200",
      "\"OK\"",
      "Optional(200)",
      "(200, \"OK\")"
    ],
    correctAnswer: 0,
    hint: "Tuples can have named elements accessed via dot notation.",
    explanation: "Swift tuples can name their member fields. 'response.status' directly accesses the Int member 200.",
    reward: { xp: 75, coins: 30 }
  },
  {
    level: 16,
    title: "BOSS BATTLE: THE FORCE CAST HYDRA",
    mode: "boss",
    bossData: {
      name: "THE FORCE CAST HYDRA",
      hp: 600,
      phases: [
        {
          phase: 1,
          prompt: "The Hydra strikes with runtime crashes! What happens when running this forced cast?",
          code: "let obj: Any = \"Glitch\"\nlet num = obj as! Int",
          options: [
            "num becomes 0",
            "num becomes nil",
            "Fatal error: Could not cast value of type String to Int",
            "Compile time error"
          ],
          correctAnswer: 2,
          explanation: "Forced downcasting with 'as!' triggers an immediate fatal runtime crash if the actual type does not match."
        },
        {
          phase: 2,
          prompt: "The Hydra attempts an illegal fallthrough! In Swift switch statements, does execution fall through by default?",
          code: "switch state {\ncase .idle: print(\"A\")\ncase .active: print(\"B\")\n}",
          options: [
            "Yes, like C, it falls through unless break is written",
            "No, Swift switch cases do NOT fall through automatically",
            "Yes, but only if return is omitted",
            "Swift does not support switch statements"
          ],
          correctAnswer: 1,
          explanation: "Unlike C or Java, Swift switch statements do not fall through to the next case automatically. An explicit 'fallthrough' keyword is required if needed."
        },
        {
          phase: 3,
          prompt: "Cut a Hydra head! Which keyword checks the type of an instance without downcasting it?",
          code: "if item ___ String {\n    print(\"It is a string!\")\n}",
          options: [
            "hasType",
            "as?",
            "is",
            "matches"
          ],
          correctAnswer: 2,
          explanation: "The 'is' type check operator checks whether an instance is of a certain subclass type, returning true or false."
        },
        {
          phase: 4,
          prompt: "The Hydra locks the guard scope! Can a variable declared in 'guard let x = ... else { return }' be used AFTER the guard block?",
          code: "guard let name = optName else { return }\nprint(name)",
          options: [
            "No, name goes out of scope after the else block",
            "Yes, unwrapped variables from guard let remain in scope for the rest of the enclosing block",
            "Only if name was declared with 'var'",
            "Only within an accompanying catch block"
          ],
          correctAnswer: 1,
          explanation: "This is a key advantage of 'guard let' over 'if let': variables unwrapped by guard let stay in scope for the remainder of the enclosing function/block."
        },
        {
          phase: 5,
          prompt: "Final Strike! How do you provide a default value when subscripting a dictionary to avoid an optional?",
          code: "let counts = [\"gold\": 5]\nlet silver = counts[\"silver\", default: 0]",
          options: [
            "counts[\"silver\", default: 0] returns a non-optional Int (0)",
            "counts[\"silver\", default: 0] returns Optional(0)",
            "Compile error: dictionaries cannot take default arguments",
            "It crashes if key is not found"
          ],
          correctAnswer: 0,
          explanation: "Dictionary subscripting with 'default:' returns a non-optional value, returning the fallback (0) if the key is missing."
        }
      ]
    },
    hint: "Slay the Force Cast Hydra using safe downcasts, guard conditions, and dictionary defaults.",
    explanation: "The Force Cast Hydra is shattered! You are an expert in Swift pattern matching, guard statements, and collection safety.",
    reward: { xp: 140, coins: 60, stars: 3 }
  },

  // =========================================================================
  // WORLD 3: CLOSURE CANYON (Levels 17-24) - Functions & Closures
  // =========================================================================
  {
    level: 17,
    title: "Argument Labels and Parameter Names",
    mode: "completion",
    prompt: "In Swift, omit the external argument label for the parameter 'amount':",
    code: "func heal(___ amount: Int) {\n    currentHp += amount\n}",
    options: [
      "nil",
      "void",
      "_",
      "skip"
    ],
    correctAnswer: 2,
    hint: "An underscore '_' as an argument label indicates no argument label is required when calling.",
    explanation: "In Swift, writing an underscore '_' before a parameter name suppresses the external argument label, allowing callers to invoke heal(50) instead of heal(amount: 50).",
    reward: { xp: 80, coins: 35 }
  },
  {
    level: 18,
    title: "In-Out Parameters",
    mode: "completion",
    prompt: "Complete the keyword so a function can modify an argument passed by reference:",
    code: "func swapTwoInts(_ a: ___ Int, _ b: ___ Int) {\n    let temp = a; a = b; b = temp\n}",
    options: [
      "ref",
      "pointer",
      "inout",
      "mutating"
    ],
    correctAnswer: 2,
    hint: "Parameters are constants by default in Swift unless marked with this keyword.",
    explanation: "'inout' parameters allow a function to modify values outside the function scope. Callers must pass arguments prefixed with '&' (e.g. swapTwoInts(&x, &y)).",
    reward: { xp: 80, coins: 35 }
  },
  {
    level: 19,
    title: "Closure Syntax and Type Signature",
    mode: "detective",
    prompt: "What is the closure type signature of this variable?",
    code: "let multiplier: (Int, Int) -> Int = { (a, b) in\n    return a * b\n}",
    options: [
      "(Int, Int) -> Int",
      "Int -> (Int, Int)",
      "Void -> Int",
      "Func<Int, Int, Int>"
    ],
    correctAnswer: 0,
    hint: "Look at the type annotation before the equals sign.",
    explanation: "In Swift, closures have function types denoted as '(ParameterTypes) -> ReturnType'. Here it takes two Ints and returns an Int.",
    reward: { xp: 85, coins: 35 }
  },
  {
    level: 20,
    title: "Trailing Closure Syntax",
    mode: "detective",
    prompt: "What does this higher-order array transformation print?",
    code: "let numbers = [1, 2, 3, 4]\nlet doubled = numbers.map { $0 * 2 }\nprint(doubled)",
    options: [
      "[1, 2, 3, 4]",
      "[2, 4, 6, 8]",
      "20",
      "[2, 4]"
    ],
    correctAnswer: 1,
    hint: "$0 refers to the first argument of the closure in each iteration.",
    explanation: "When a closure is the last argument of a method, trailing closure syntax lets you write it outside parentheses. '$0 * 2' doubles every element, yielding [2, 4, 6, 8].",
    reward: { xp: 85, coins: 35 }
  },
  {
    level: 21,
    title: "Filter and Shorthand Arguments",
    mode: "detective",
    prompt: "What is the output of this filtered collection?",
    code: "let powers = [10, 25, 5, 80, 15]\nlet strong = powers.filter { $0 >= 20 }\nprint(strong.count)",
    options: [
      "1",
      "2",
      "3",
      "5"
    ],
    correctAnswer: 1,
    hint: "Elements >= 20 are 25 and 80.",
    explanation: "filter keeps only elements where the closure returns true. 25 and 80 are >= 20, so strong contains 2 elements.",
    reward: { xp: 90, coins: 40 }
  },
  {
    level: 22,
    title: "Reduce Operation",
    mode: "detective",
    prompt: "What does this reduce operation calculate?",
    code: "let values = [1, 2, 3, 4, 5]\nlet sum = values.reduce(0, +)\nprint(sum)",
    options: [
      "0",
      "15",
      "120",
      "Compile error: '+' cannot be used as a closure"
    ],
    correctAnswer: 1,
    hint: "In Swift, operator functions like '+' match the closure signature (Int, Int) -> Int.",
    explanation: "reduce(0, +) takes an initial accumulator (0) and folds the array using the '+' operator function, calculating 0 + 1 + 2 + 3 + 4 + 5 = 15.",
    reward: { xp: 90, coins: 40 }
  },
  {
    level: 23,
    title: "Escaping Closures",
    mode: "completion",
    prompt: "Complete the attribute marking a closure parameter that outlives the function call:",
    code: "func fetchData(completion: ___ () -> Void) {\n    DispatchQueue.main.asyncAfter(deadline: .now() + 1) {\n        completion()\n    }\n}",
    options: [
      "@async",
      "@escaping",
      "@rethrows",
      "@sendable"
    ],
    correctAnswer: 1,
    hint: "Closures that are called after the function returns must be annotated with this keyword.",
    explanation: "An '@escaping' closure is passed as an argument to a function, but is called after the function returns (for example in an asynchronous task or stored property).",
    reward: { xp: 95, coins: 40 }
  },
  {
    level: 24,
    title: "BOSS BATTLE: THE RETAIN CYCLE WRAITH",
    mode: "boss",
    bossData: {
      name: "THE RETAIN CYCLE WRAITH",
      hp: 700,
      phases: [
        {
          phase: 1,
          prompt: "The Wraith drains memory with strong reference cycles! How do you break a retain cycle inside a closure capturing self?",
          code: "button.onTap = { [___ self] in\n    self?.refresh()\n}",
          options: [
            "strong",
            "weak",
            "unsafe",
            "borrow"
          ],
          correctAnswer: 1,
          explanation: "Using '[weak self]' in the closure capture list creates a weak reference that does not keep self alive, breaking the retain cycle."
        },
        {
          phase: 2,
          prompt: "The Wraith questions capture types! What is the type of 'self' inside a '[weak self]' closure?",
          code: "button.onTap = { [weak self] in\n    // what type is self here?\n}",
          options: [
            "Optional (e.g. MyClass?)",
            "Non-optional (MyClass)",
            "AnyObject",
            "Void"
          ],
          correctAnswer: 0,
          explanation: "Because the object may be deallocated while the closure is alive, '[weak self]' turns self into an Optional."
        },
        {
          phase: 3,
          prompt: "Strike the Wraith! When should you use '[unowned self]' instead of '[weak self]'?",
          code: "class Customer {\n    var card: CreditCard!\n}",
          options: [
            "Whenever self could be nil at any time",
            "When the closure and captured instance will always have the same lifetime and never become nil",
            "Never, unowned is deprecated",
            "Only for value types like structs"
          ],
          correctAnswer: 1,
          explanation: "Use '[unowned self]' only when the captured reference will never be nil during the closure's execution; accessing a deallocated unowned reference crashes like an invalid pointer."
        },
        {
          phase: 4,
          prompt: "The Wraith casts an autoclosure! What does '@autoclosure' do to an argument?",
          code: "func logIfTrue(_ predicate: @autoclosure () -> Bool)",
          options: [
            "It runs the closure in a background thread",
            "It automatically wraps an expression in a closure without requiring explicit { } at call site",
            "It executes the closure before the function is called",
            "It converts the closure into a String"
          ],
          correctAnswer: 1,
          explanation: "'@autoclosure' delays evaluation of the expression passed to it, wrapping it implicitly into a closure without requiring curly braces from the caller."
        },
        {
          phase: 5,
          prompt: "Final Strike! What does the compactMap method do on a sequence?",
          code: "let strings = [\"1\", \"two\", \"3\"]\nlet nums = strings.compactMap { Int($0) }",
          options: [
            "Compresses the array into a zip file",
            "Transforms elements and automatically unwraps and discards nil results",
            "Returns an array of optionals [Optional(1), nil, Optional(3)]",
            "Crashes when parsing \"two\""
          ],
          correctAnswer: 1,
          explanation: "'compactMap' applies a closure returning an optional, discarding any nil results and unwrapping the non-nil values (producing [1, 3])."
        }
      ]
    },
    hint: "Banish the Retain Cycle Wraith with capture lists, weak references, and functional transformations.",
    explanation: "The Retain Cycle Wraith is banished! You have conquered Swift closures, memory capture semantics, and higher-order functions.",
    reward: { xp: 160, coins: 70, stars: 3 }
  },

  // =========================================================================
  // WORLD 4: STRUCT SANCTUARY (Levels 25-32) - Structs, Classes & Memory
  // =========================================================================
  {
    level: 25,
    title: "Struct Value Semantics",
    mode: "detective",
    prompt: "What will this struct mutation print?",
    code: "struct Point {\n    var x: Int\n    var y: Int\n}\nvar p1 = Point(x: 10, y: 20)\nvar p2 = p1\np2.x = 99\nprint(p1.x)",
    options: [
      "99",
      "10",
      "0",
      "Compile error"
    ],
    correctAnswer: 1,
    hint: "Structs in Swift are value types, copied when assigned to a new variable.",
    explanation: "Because Point is a struct (value type), assigning 'p2 = p1' creates a distinct copy. Modifying p2.x leaves p1.x unchanged at 10.",
    reward: { xp: 100, coins: 45 }
  },
  {
    level: 26,
    title: "Mutating Methods in Structs",
    mode: "completion",
    prompt: "Which keyword must precede a struct method that modifies its own stored properties?",
    code: "struct Player {\n    var health: Int = 100\n    ___ func takeDamage(_ dmg: Int) {\n        health -= dmg\n    }\n}",
    options: [
      "mutating",
      "modifying",
      "dynamic",
      "override"
    ],
    correctAnswer: 0,
    hint: "By default, struct methods cannot modify stored properties unless marked with this keyword.",
    explanation: "Because structs are value types, methods that modify self or stored properties must be explicitly marked 'mutating'.",
    reward: { xp: 100, coins: 45 }
  },
  {
    level: 27,
    title: "Class Reference Semantics",
    mode: "detective",
    prompt: "What will this class instance mutation print?",
    code: "class Node {\n    var val: Int\n    init(val: Int) { self.val = val }\n}\nlet n1 = Node(val: 5)\nlet n2 = n1\nn2.val = 42\nprint(n1.val)",
    options: [
      "5",
      "42",
      "nil",
      "Compile error: n1 is declared with let"
    ],
    correctAnswer: 1,
    hint: "Classes are reference types: n1 and n2 point to the same object in memory.",
    explanation: "Classes in Swift are reference types. 'let n2 = n1' copies the reference, so both refer to the same object. Modifying n2.val changes n1.val to 42.",
    reward: { xp: 105, coins: 45 }
  },
  {
    level: 28,
    title: "Computed Property Get and Set",
    mode: "detective",
    prompt: "What is the value of 'sq.area' and what does updating it do?",
    code: "struct Square {\n    var side: Double\n    var area: Double {\n        get { side * side }\n        set { side = newValue.squareRoot() }\n    }\n}\nvar sq = Square(side: 4)\nsq.area = 25\nprint(sq.side)",
    options: [
      "4.0",
      "5.0",
      "25.0",
      "16.0"
    ],
    correctAnswer: 1,
    hint: "The setter uses newValue (25.0) and calculates its square root.",
    explanation: "In a computed property setter, 'newValue' is the default parameter name for the incoming value. squareRoot of 25 is 5.0, so sq.side becomes 5.0.",
    reward: { xp: 105, coins: 45 }
  },
  {
    level: 29,
    title: "Property Observers: didSet and willSet",
    mode: "detective",
    prompt: "What is printed when 'volume' is changed from 10 to 30?",
    code: "var volume: Int = 10 {\n    didSet {\n        print(\"Old was \\(oldValue), new is \\(volume)\")\n    }\n}\nvolume = 30",
    options: [
      "Old was 10, new is 30",
      "Old was 30, new is 10",
      "Old was 10, new is 10",
      "Compile error"
    ],
    correctAnswer: 0,
    hint: "'didSet' has access to 'oldValue', while the property already holds the new value.",
    explanation: "'didSet' is called immediately after a new value is stored. Swift automatically provides the identifier 'oldValue' containing the previous value.",
    reward: { xp: 110, coins: 50 }
  },
  {
    level: 30,
    title: "Lazy Stored Properties",
    mode: "completion",
    prompt: "Complete the declaration so 'heavyAsset' is only created when first accessed:",
    code: "class GameEngine {\n    ___ var heavyAsset = HeavyResource()\n}",
    options: [
      "defer",
      "async",
      "lazy",
      "static"
    ],
    correctAnswer: 2,
    hint: "A lazy stored property is calculated upon its initial call.",
    explanation: "A 'lazy' stored property has its initial value calculated only upon its first access. Lazy properties must always be declared with 'var'.",
    reward: { xp: 110, coins: 50 }
  },
  {
    level: 31,
    title: "Deinitialization in Classes",
    mode: "completion",
    prompt: "Which keyword defines a class cleanup routine called before deallocation?",
    code: "class FileHandler {\n    ___ {\n        closeFile()\n    }\n}",
    options: [
      "deinit",
      "destructor",
      "finalizer",
      "dispose"
    ],
    correctAnswer: 0,
    hint: "Swift uses init for construction and this paired keyword for destruction.",
    explanation: "'deinit' is called immediately before a class instance is deallocated by ARC, making it ideal for releasing non-memory resources like file handles or sockets.",
    reward: { xp: 115, coins: 50 }
  },
  {
    level: 32,
    title: "BOSS BATTLE: THE MUTATING DRAGON",
    mode: "boss",
    bossData: {
      name: "THE MUTATING DRAGON",
      hp: 800,
      phases: [
        {
          phase: 1,
          prompt: "The Dragon scorches constant structs! Why does this produce a compiler error?",
          code: "struct Car {\n    var speed = 0\n    mutating func boost() { speed += 50 }\n}\nlet raceCar = Car()\nraceCar.boost()",
          options: [
            "boost() cannot be called because raceCar is declared as a 'let' constant",
            "speed must be private",
            "Structs cannot have methods",
            "mutating is only allowed in classes"
          ],
          correctAnswer: 0,
          explanation: "Because structs are value types, calling a mutating method on a 'let' instance is forbidden; all properties of a constant struct are immutable."
        },
        {
          phase: 2,
          prompt: "The Dragon unleashes inheritance! Can a Swift struct inherit from another struct?",
          code: "struct Dragon : Monster { }",
          options: [
            "Yes, multiple inheritance is allowed for structs",
            "Yes, single inheritance only",
            "No, Swift structs cannot inherit from other structs; only classes support inheritance",
            "Only if Monster is an open struct"
          ],
          correctAnswer: 2,
          explanation: "Swift structs cannot inherit from other structs or classes. Structs achieve code reuse and polymorphism exclusively through Protocols."
        },
        {
          phase: 3,
          prompt: "Pierce the Dragon's scales! Which operator tests whether two class variables point to the exact same object reference?",
          code: "if objA ___ objB {\n    print(\"Same instance in memory!\")\n}",
          options: [
            "==",
            "===",
            "equals",
            "isSame"
          ],
          correctAnswer: 1,
          explanation: "The identical-to operator '===' checks whether two constants or variables refer to the exact same class instance in memory."
        },
        {
          phase: 4,
          prompt: "The Dragon guards memberwise initializers! Which type automatically receives a memberwise initializer if no custom init is written?",
          code: "let p = Player(name: \"Viper\", level: 50)",
          options: [
            "Structs only",
            "Classes only",
            "Both structs and classes",
            "Protocols"
          ],
          correctAnswer: 0,
          explanation: "Swift structs automatically receive a memberwise initializer containing all stored properties if no custom initializers are declared. Classes do not."
        },
        {
          phase: 5,
          prompt: "Final Strike! What does the 'final' keyword prevent when attached to a class declaration?",
          code: "final class SecurityVault { }",
          options: [
            "Prevents instances from being created",
            "Prevents the class from being subclassed or overridden",
            "Makes all properties constant",
            "Prevents garbage collection"
          ],
          correctAnswer: 1,
          explanation: "Marking a class 'final' prevents other classes from inheriting from it, and allows the Swift compiler to use direct/static dispatch instead of dynamic vtable dispatch."
        }
      ]
    },
    hint: "Overcome the Mutating Dragon by demonstrating mastery of value vs reference semantics, immutability, and ARC.",
    explanation: "The Mutating Dragon collapses into ash! You have proven complete command over Swift's struct and class architectures.",
    reward: { xp: 180, coins: 80, stars: 3 }
  },

  // =========================================================================
  // WORLD 5: PROTOCOL PEAK (Levels 33-40) - Protocols, Generics & Errors
  // =========================================================================
  {
    level: 33,
    title: "Protocol Conformance",
    mode: "completion",
    prompt: "Declare that struct 'Drone' conforms to the protocol 'Flyable':",
    code: "protocol Flyable {\n    func takeOff()\n}\nstruct Drone: ___ {\n    func takeOff() { print(\"Airborne\") }\n}",
    options: [
      "implements Flyable",
      "Flyable",
      "conforms Flyable",
      "<Flyable>"
    ],
    correctAnswer: 1,
    hint: "In Swift, protocol adoption follows a colon after the type name.",
    explanation: "In Swift, protocol conformance is written using a colon ': ProtocolName', identical to subclass syntax in classes.",
    reward: { xp: 120, coins: 55 }
  },
  {
    level: 34,
    title: "Protocol Extensions for Default Implementations",
    mode: "detective",
    prompt: "What makes protocol extensions so powerful in Swift?",
    code: "extension Flyable {\n    func glide() { print(\"Gliding...\") }\n}",
    options: [
      "They allow protocols to store variable state",
      "They provide default method implementations for all conforming types",
      "They disable inheritance",
      "They convert structs into classes"
    ],
    correctAnswer: 1,
    hint: "Conforming types automatically inherit the method without writing it themselves.",
    explanation: "Protocol extensions enable Protocol-Oriented Programming (POP) by providing default method implementations that all conforming types inherit for free.",
    reward: { xp: 120, coins: 55 }
  },
  {
    level: 35,
    title: "Generic Function Definition",
    mode: "completion",
    prompt: "Complete the generic function to accept any two items of the same type 'T':",
    code: "func swapValues<___>(_ a: inout T, _ b: inout T) {\n    let temp = a; a = b; b = temp\n}",
    options: [
      "Any",
      "T",
      "Type",
      "Generic"
    ],
    correctAnswer: 1,
    hint: "Place the placeholder type name between angle brackets.",
    explanation: "Angle brackets '<T>' declare a generic type parameter placeholder that the compiler specializes for whatever concrete type is passed in.",
    reward: { xp: 125, coins: 55 }
  },
  {
    level: 36,
    title: "Generic Constraints",
    mode: "completion",
    prompt: "Constrain type parameter 'T' so elements can be compared using '==' :",
    code: "func findIndex<T: ___>(of item: T, in list: [T]) -> Int? {\n    for (idx, val) in list.enumerated() {\n        if val == item { return idx }\n    }\n    return nil\n}",
    options: [
      "Comparable",
      "Identifiable",
      "Equatable",
      "Hashable"
    ],
    correctAnswer: 2,
    hint: "Which standard protocol provides the '==' equality operator?",
    explanation: "Conforming to 'Equatable' guarantees that instances can be compared for value equality using '=='.",
    reward: { xp: 125, coins: 55 }
  },
  {
    level: 37,
    title: "Enum with Associated Values",
    mode: "detective",
    prompt: "What will this switch statement match?",
    code: "enum NetworkState {\n    case idle\n    case success(data: String)\n    case failure(code: Int)\n}\nlet state = NetworkState.success(data: \"Payload\")\nswitch state {\ncase .success(let payload):\n    print(\"Got: \\(payload)\")\ndefault:\n    print(\"Other\")\n}",
    options: [
      "Got: Payload",
      "Other",
      "Compile error",
      "Got: 200"
    ],
    correctAnswer: 0,
    hint: "The state is .success(\"Payload\"), matching the pattern case .success(let payload).",
    explanation: "Swift enums support associated values, letting each case carry custom data payloads. Pattern matching extracts 'Payload' into 'payload'.",
    reward: { xp: 130, coins: 60 }
  },
  {
    level: 38,
    title: "Throwing Functions and Error Protocol",
    mode: "completion",
    prompt: "Complete the keyword indicating a function can emit an error:",
    code: "func loadConfig(path: String) ___ -> Config {\n    guard fileExists(path) else {\n        throw FileError.notFound\n    }\n    return parse(path)\n}",
    options: [
      "raises",
      "throws",
      "error",
      "except"
    ],
    correctAnswer: 1,
    hint: "Swift uses throws before the return arrow.",
    explanation: "Functions that can propagate errors use the 'throws' keyword after parameter parentheses and before the '->' return type.",
    reward: { xp: 130, coins: 60 }
  },
  {
    level: 39,
    title: "Optional Try (try?)",
    mode: "detective",
    prompt: "What does 'try?' return if the throwing function fails by throwing an error?",
    code: "let fileData = try? loadConfig(path: \"invalid.txt\")",
    options: [
      "A fatal runtime crash",
      "nil",
      "An empty Config object",
      "The thrown FileError object"
    ],
    correctAnswer: 1,
    hint: "try? converts throwing operations into Optional results.",
    explanation: "'try?' attempts to execute a throwing call. If it throws an error, the error is suppressed and the expression returns nil. If it succeeds, it returns Optional(value).",
    reward: { xp: 135, coins: 60 }
  },
  {
    level: 40,
    title: "BOSS BATTLE: THE EXTENSION TITAN",
    mode: "boss",
    bossData: {
      name: "THE EXTENSION TITAN",
      hp: 900,
      phases: [
        {
          phase: 1,
          prompt: "The Titan blocks your types! Can an extension in Swift add stored properties to an existing type?",
          code: "extension String {\n    var customID: Int = 0\n}",
          options: [
            "Yes, extensions can store any new state",
            "No, extensions can add computed properties, but NOT stored properties",
            "Yes, but only if marked private",
            "Only for class types"
          ],
          correctAnswer: 1,
          explanation: "Swift extensions cannot add stored properties or property observers; they can only add computed properties, convenience initializers, methods, and protocol conformances."
        },
        {
          phase: 2,
          prompt: "The Titan invokes the Result type! What are the two generic parameters of Swift's Result type?",
          code: "enum Result<Success, Failure: Error>",
          options: [
            "Success and Failure (where Failure conforms to Error)",
            "Value and Code",
            "Response and Exception",
            "Data and Nil"
          ],
          correctAnswer: 0,
          explanation: "Swift's standard library Result enum is declared as Result<Success, Failure: Error>, modeling operations that yield either a Success value or a Failure error."
        },
        {
          phase: 3,
          prompt: "Titan's protocol constraint! What is an 'associatedtype' inside a protocol?",
          code: "protocol Container {\n    associatedtype Item\n    func append(_ item: Item)\n}",
          options: [
            "A static property requirement",
            "A placeholder name for a type used as part of the protocol, determined upon adoption",
            "A subclass restriction",
            "An optional protocol method"
          ],
          correctAnswer: 1,
          explanation: "'associatedtype' gives a placeholder name to a type that is used as part of a protocol; conforming types specify the concrete type via typealias or method signatures."
        },
        {
          phase: 4,
          prompt: "Titan tests forced try! What happens when 'try!' is executed on an expression that throws?",
          code: "let data = try! parseData(corruptedBytes)",
          options: [
            "data is nil",
            "Execution jumps to the nearest catch block",
            "A runtime crash (fatal error)",
            "The error is silently ignored"
          ],
          correctAnswer: 2,
          explanation: "'try!' asserts that the call will not throw. If it actually throws, the program immediately terminates with a fatal runtime crash."
        },
        {
          phase: 5,
          prompt: "Final Strike! What is the purpose of the 'defer' statement in Swift?",
          code: "func processFile() {\n    open()\n    defer { close() }\n    work()\n}",
          options: [
            "Runs close() immediately in the background",
            "Guarantees close() executes when current code block exits, regardless of how it exits",
            "Defers execution of the entire function by 100ms",
            "Only runs if work() throws an error"
          ],
          correctAnswer: 1,
          explanation: "'defer' actions are executed in reverse order of declaration right before exiting the current scope, guaranteeing cleanup even if early returns or errors occur."
        }
      ]
    },
    hint: "Overthrow the Extension Titan by utilizing extensions, protocols with associated types, and robust error handling.",
    explanation: "The Extension Titan has been toppled! You are a master of Swift protocols, generics, and resilient error architectures.",
    reward: { xp: 200, coins: 90, stars: 3 }
  },

  // =========================================================================
  // WORLD 6: ASYNC ARCH (Levels 41-48) - Concurrency & Actors
  // =========================================================================
  {
    level: 41,
    title: "Async and Await Basics",
    mode: "completion",
    prompt: "Complete the keyword that suspends execution until the asynchronous function finishes:",
    code: "func refreshDashboard() async {\n    let user = ___ fetchUserProfile()\n    render(user)\n}",
    options: [
      "yield",
      "async",
      "await",
      "wait"
    ],
    correctAnswer: 2,
    hint: "Pairs with 'async' to mark suspension points in Swift.",
    explanation: "'await' marks a potential suspension point where the current thread can be yielded to do other work until the asynchronous call completes.",
    reward: { xp: 140, coins: 65 }
  },
  {
    level: 42,
    title: "Declaring Asynchronous Functions",
    mode: "completion",
    prompt: "Mark this function so it can perform asynchronous operations and suspend:",
    code: "func downloadAsset(id: String) ___ -> Data {\n    // network fetch\n}",
    options: [
      "sync",
      "async",
      "background",
      "defer"
    ],
    correctAnswer: 1,
    hint: "Placed before the return arrow '->'.",
    explanation: "The 'async' keyword marks a function as asynchronous, signaling that it can suspend execution and must be called using 'await'.",
    reward: { xp: 140, coins: 65 }
  },
  {
    level: 43,
    title: "Structured Concurrency with async let",
    mode: "detective",
    prompt: "What does 'async let' accomplish here?",
    code: "async let avatar = loadAvatar()\nasync let stats = loadStats()\nlet player = await (avatar, stats)",
    options: [
      "Loads avatar and stats concurrently in parallel",
      "Runs avatar first, then blocks for stats sequentially",
      "Forces execution on the main thread",
      "Creates a memory leak"
    ],
    correctAnswer: 0,
    hint: "'async let' starts child tasks concurrently.",
    explanation: "'async let' creates child tasks that run concurrently in parallel. The subsequent 'await' suspends until both concurrent tasks have completed.",
    reward: { xp: 145, coins: 65 }
  },
  {
    level: 44,
    title: "Actor Isolation for Thread Safety",
    mode: "detective",
    prompt: "How do Swift 'actor' types protect shared mutable state?",
    code: "actor BankAccount {\n    var balance: Int = 100\n    func deposit(amount: Int) {\n        balance += amount\n    }\n}",
    options: [
      "By placing all actors on the Main thread",
      "By ensuring only one task can access its mutable state at any given time (preventing data races)",
      "By converting all properties to immutable let constants",
      "By using spinlocks on every function"
    ],
    correctAnswer: 1,
    hint: "Actors serialize access to their internal mutable state.",
    explanation: "Actors are reference types that protect their own mutable state through actor isolation, guaranteeing that only one thread/task accesses that state at a time, eliminating data races.",
    reward: { xp: 145, coins: 65 }
  },
  {
    level: 45,
    title: "Accessing Actor Methods from Outside",
    mode: "completion",
    prompt: "Because actor methods are isolated, what keyword must callers use to invoke them externally?",
    code: "let account = BankAccount()\n___ account.deposit(amount: 50)",
    options: [
      "try",
      "lock",
      "await",
      "atomic"
    ],
    correctAnswer: 2,
    hint: "External calls might have to wait if the actor is busy.",
    explanation: "External access to an actor's methods or mutable properties requires 'await' because the calling task may suspend while waiting for the actor to become available.",
    reward: { xp: 150, coins: 70 }
  },
  {
    level: 46,
    title: "@MainActor Annotation",
    mode: "detective",
    prompt: "What does annotating a class or method with '@MainActor' ensure?",
    code: "@MainActor\nclass ViewModel: ObservableObject {\n    @Published var title = \"\"\n}",
    options: [
      "It executes exclusively on the main UI thread",
      "It makes the class run in the background kernel",
      "It prevents garbage collection",
      "It makes the class a singleton"
    ],
    correctAnswer: 0,
    hint: "MainActor is a globally unique actor representing the main dispatch queue.",
    explanation: "'@MainActor' ensures that all operations, state mutations, and UI updates on the marked type or function occur safely on the main thread.",
    reward: { xp: 150, coins: 70 }
  },
  {
    level: 47,
    title: "Task Cancellation Handling",
    mode: "completion",
    prompt: "How does a long-running asynchronous task check if it was cancelled?",
    code: "func computePrimes() async {\n    for n in 1...100_000 {\n        if Task.___ {\n            return\n        }\n    }\n}",
    options: [
      "isKilled",
      "isCancelled",
      "hasStopped",
      "isDead"
    ],
    correctAnswer: 1,
    hint: "Swift tasks use cooperative cancellation through this property.",
    explanation: "Swift concurrency uses cooperative cancellation. Long-running tasks should regularly check 'Task.isCancelled' (or call 'try Task.checkCancellation()') to exit early.",
    reward: { xp: 155, coins: 70 }
  },
  {
    level: 48,
    title: "BOSS BATTLE: THE ACTOR SPECTRE",
    mode: "boss",
    bossData: {
      name: "THE ACTOR SPECTRE",
      hp: 1000,
      phases: [
        {
          phase: 1,
          prompt: "The Spectre creates a data race! What compiler error happens when accessing an actor's mutable property directly without await?",
          code: "actor Cache {\n    var items: [String] = []\n}\nlet c = Cache()\nprint(c.items.count)",
          options: [
            "Actor-isolated property 'items' can not be referenced from a non-isolated context without 'await'",
            "Compile success with warning",
            "Segmentation fault",
            "items is automatically made nil"
          ],
          correctAnswer: 0,
          explanation: "Actor isolation prevents direct synchronous access to mutable properties from outside the actor. You must access it asynchronously with await."
        },
        {
          phase: 2,
          prompt: "The Spectre tests Sendable types! What does conforming to the 'Sendable' protocol indicate?",
          code: "struct Message: Sendable {\n    let text: String\n}",
          options: [
            "The type can be encoded to JSON",
            "The type is safe to transfer across concurrency boundaries and threads",
            "The type can send push notifications",
            "The type must be a class"
          ],
          correctAnswer: 1,
          explanation: "'Sendable' indicates that values of the type can be safely passed between concurrency domains (actors, tasks) without risk of data races."
        },
        {
          phase: 3,
          prompt: "Dispel the Spectre's rogue task! How do you spawn an unattached background task?",
          code: "___ {\n    await processBackgroundSync()\n}",
          options: [
            "Thread.new",
            "Task",
            "DispatchQueue.async",
            "Go"
          ],
          correctAnswer: 1,
          explanation: "'Task { ... }' creates an asynchronous task unit that runs concurrently with inherited actor context and priorities."
        },
        {
          phase: 4,
          prompt: "The Spectre locks the actor! What keyword exempts an actor method from isolation when it only accesses immutable state?",
          code: "actor PlayerProfile {\n    let id: String\n    ___ func getID() -> String { id }\n}",
          options: [
            "sync",
            "nonisolated",
            "public",
            "detached"
          ],
          correctAnswer: 1,
          explanation: "'nonisolated' tells the compiler that the method or computed property does not touch any mutable actor state and can be called synchronously from anywhere."
        },
        {
          phase: 5,
          prompt: "Final Strike! What happens if you call 'try Task.checkCancellation()' inside a cancelled task?",
          code: "try Task.checkCancellation()",
          options: [
            "It returns false",
            "It throws a CancellationError immediately",
            "It restarts the task",
            "It pauses for 100 milliseconds"
          ],
          correctAnswer: 1,
          explanation: "'Task.checkCancellation()' throws a 'CancellationError' if the current task has been cancelled, terminating execution of the current throwing flow."
        }
      ]
    },
    hint: "Banish the Actor Spectre by mastering Swift structured concurrency, actor isolation, and Sendable types.",
    explanation: "The Actor Spectre dissolves into clean async streams! You have mastered modern Swift concurrency and thread safety.",
    reward: { xp: 220, coins: 100, stars: 3 }
  },

  // =========================================================================
  // WORLD 7: SWIFTUI CORE (Levels 49-51) - Declarative UI & Swift Master
  // =========================================================================
  {
    level: 49,
    title: "The @State Property Wrapper",
    mode: "detective",
    prompt: "What is the role of '@State' in a SwiftUI View?",
    code: "struct CounterView: View {\n    @State private var count = 0\n    var body: some View {\n        Button(\"Tap: \\(count)\") { count += 1 }\n    }\n}",
    options: [
      "It persists the counter in a SQLite database",
      "It manages local view state; modifying it automatically triggers re-rendering of the view's body",
      "It shares the count with all other views in the application",
      "It marks the variable as immutable"
    ],
    correctAnswer: 1,
    hint: "SwiftUI observes @State variables to rebuild UI when their values change.",
    explanation: "'@State' declares a source of truth owned by the view. When a @State property changes, SwiftUI invalidates its appearance and recomputes the 'body' property.",
    reward: { xp: 160, coins: 75 }
  },
  {
    level: 50,
    title: "@Binding for Two-Way State Sharing",
    mode: "completion",
    prompt: "Which property wrapper connects a child view to a mutable state owned by an ancestor?",
    code: "struct ToggleSwitch: View {\n    ___ var isOn: Bool\n    var body: some View {\n        Toggle(\"Power\", isOn: $isOn)\n    }\n}",
    options: [
      "@State",
      "@Binding",
      "@Observed",
      "@Shared"
    ],
    correctAnswer: 1,
    hint: "Creates a two-way connection to state stored elsewhere without owning it.",
    explanation: "'@Binding' creates a two-way reference to a state property owned by another view (usually passed with '$stateVariable'), allowing child views to read and write without owning the state.",
    reward: { xp: 160, coins: 75 }
  },
  {
    level: 51,
    title: "FINAL BOSS: THE SWIFT MASTER",
    mode: "boss",
    bossData: {
      name: "THE SWIFT MASTER",
      hp: 1200,
      phases: [
        {
          phase: 1,
          prompt: "The Master tests property wrappers! What does the '$' prefix before a property wrapper like @State or @Binding access?",
          code: "$counter",
          options: [
            "The wrapped value",
            "The projected value (such as a Binding to the property)",
            "The memory address pointer",
            "The variable's String name"
          ],
          correctAnswer: 1,
          explanation: "In Swift property wrappers, prefixing with '$' accesses the projected value (for @State, this is a Binding<Value> allowing two-way connections)."
        },
        {
          phase: 2,
          prompt: "The Master tests opaque return types! What does 'some View' signify in a SwiftUI body?",
          code: "var body: some View { Text(\"Arena\") }",
          options: [
            "The view can return any random type at runtime",
            "An opaque return type: the function returns a specific concrete type conforming to View, hidden from callers",
            "The view is optional and can be nil",
            "The view will be rendered only if visible on screen"
          ],
          correctAnswer: 1,
          explanation: "'some View' declares an opaque return type. The compiler knows the exact concrete type conforming to View, but hides that complex concrete type from the client API."
        },
        {
          phase: 3,
          prompt: "The Master invokes Copy-on-Write (COW)! How do standard collections like Array and Dictionary behave during copy in Swift?",
          code: "var listA = [1, 2, 3]\nvar listB = listA",
          options: [
            "Both immediately allocate separate memory buffers",
            "They share the underlying memory buffer until one of them is modified (Copy-on-Write)",
            "listB becomes a pointer reference and changes to it modify listA forever",
            "Memory is copied using deep disk serialization"
          ],
          correctAnswer: 1,
          explanation: "Swift standard collections employ Copy-on-Write (COW). Memory is shared until a mutation is attempted on one copy, which then clones the buffer."
        },
        {
          phase: 4,
          prompt: "The Master unleashes KeyPath subscripting! What is the syntax for a key path targeting the name property of Person?",
          code: "\\Person.name",
          options: [
            "&Person.name",
            "\\Person.name",
            "#Person.name",
            "->Person.name"
          ],
          correctAnswer: 1,
          explanation: "Key paths in Swift begin with a backslash '\\Type.property', providing strongly typed, uninvoked references to properties."
        },
        {
          phase: 5,
          prompt: "FINAL VICTORY STRIKE! Which Swift feature allows types to behave like functions when invoked with parentheses?",
          code: "struct Adder {\n    let base: Int\n    func callAsFunction(_ x: Int) -> Int { base + x }\n}\nlet addFive = Adder(base: 5)\nlet result = addFive(10)",
          options: [
            "operator overloading",
            "callAsFunction",
            "invoke() method",
            "subscript override"
          ],
          correctAnswer: 1,
          explanation: "Implementing 'callAsFunction' allows instances of structs or classes to be called directly with function call syntax (e.g. addFive(10))."
        }
      ]
    },
    hint: "Synthesize all Swift knowledge: property wrappers, opaque types, copy-on-write, and callAsFunction to claim ultimate victory.",
    explanation: "THE SWIFT MASTER HAS BEEN CONQUERED! You have mastered Swift from basic optionals and closures to protocol-oriented programming, modern concurrency, actors, and SwiftUI!",
    reward: { xp: 300, coins: 150, stars: 3 }
  }
];
