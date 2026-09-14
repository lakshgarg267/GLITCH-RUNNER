/**
 * GLITCH RUNNER - C++ CURRICULUM (51 LEVELS)
 * Areas:
 * Area 1: STL Valley (Lv 1-8, Boss: THE RAW POINTER GHOUL)
 * Area 2: Template Peaks (Lv 9-16, Boss: THE TEMPLATE BEAST)
 * Area 3: RAII Bastion (Lv 17-24, Boss: THE MEMORY LEAK BEHEMOTH)
 * Area 4: Operator Core (Lv 25-32, Boss: THE OVERLOAD TITAN)
 * Area 5: Smart Pointer Vault (Lv 33-40, Boss: THE CIRCULAR REF LICH)
 * Area 6: Thread Nexus (Lv 41-48, Boss: THE MUTEX SPECTRE)
 * Area 7: Assembly Gateway (Lv 49-51, Final Boss: THE ZERO COST COMPILER)
 */

window.CURRICULUM_DATA = window.CURRICULUM_DATA || {};

window.CURRICULUM_DATA.cpp = [
  // =========================================================================
  // AREA 1: STL VALLEY (Lv 1-8) - FOUNDATION & REFERENCES
  // =========================================================================
  {
    t: 'C++ Stream Output (std::cout)',
    c: 'std::cout prints data to standard output using the stream insertion operator <<.',
    m: 'glitch',
    code: `#include <iostream>\nint main() {\n    std::cout >> "CORE ACTIVE" >> std::endl;\n    return 0;\n}`,
    q: 'BUG HUNTER: The stream operator direction is reversed. Which operator outputs to std::cout?',
    opts: [
      '<< (stream insertion)',
      '>> (stream extraction)',
      '<= (assignment)',
      '-> (arrow)'
    ],
    a: 0,
    h: 'Data flows into cout with <<.',
    explanation: '`std::cout` uses the stream insertion operator `<<` to direct data to output. The `>>` operator is used with `std::cin` for input.'
  },
  {
    t: 'C++ References (&ref)',
    c: 'A reference is an alias for an existing variable; modifying the reference modifies the original variable directly.',
    m: 'runner',
    code: `int shields = 100;\nint &ref = shields;\nref = 75;\nstd::cout << shields;`,
    q: 'SPEED RUN: What is the value of shields after updating ref?',
    opts: [
      '75',
      '100',
      '0',
      'Compilation Error'
    ],
    a: 0,
    h: 'ref is an alias for shields; changing ref changes shields.',
    explanation: 'A reference `int &ref = shields;` binds directly to `shields`. Assigning `ref = 75` changes the original variable to `75`.'
  },
  {
    t: 'Auto Type Deduction (C++11)',
    c: 'The auto keyword instructs the compiler to deduce the variable\'s type from its initializer expression.',
    m: 'detective',
    code: `auto speed = 3.14159;\n// The compiler deduces speed as double\nstd::cout << sizeof(speed);`,
    q: 'OUTPUT DETECTIVE: speed is deduced as a double. What is sizeof(double) on standard x64 systems?',
    opts: [
      '8',
      '4',
      '16',
      '2'
    ],
    a: 0,
    h: 'A standard IEEE-754 double occupies 8 bytes (64 bits).',
    explanation: '`auto speed = 3.14159` deduces `speed` as a `double`, which occupies 8 bytes on standard platforms.'
  },
  {
    t: 'Const Correctness with References',
    c: 'const Type & prevents modification of the referred object and allows binding to temporary rvalues.',
    m: 'detective',
    code: `const int max_energy = 500;\nconst int &ref = max_energy;\n// ref = 600; // Fails compilation!\nstd::cout << ref;`,
    q: 'OUTPUT DETECTIVE: Can a const reference be reassigned to a new value?',
    opts: [
      'No, the compiler prevents modifying objects through const references',
      'Yes, by calling ref.unlock()',
      'Yes, if the variable is static',
      'Only inside main()'
    ],
    a: 0,
    h: 'const references enforce read-only semantics.',
    explanation: 'A `const` reference cannot be used to modify the referenced variable; attempting to do so triggers a compile-time error.'
  },
  {
    t: 'Modern C++ Program Structure',
    c: 'Modern C++ emphasizes standard headers, std namespace usage, and integer main exit.',
    m: 'builder',
    codeBlocks: [
      '#include <iostream>',
      '#include <string>',
      'int main() {',
      '    std::string tag = "RUNNER";',
      '    std::cout << "Operative: " << tag << "\\n";',
      '    return 0;',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    q: 'CODE BUILDER: Assemble the clean modern C++ std::string program:',
    h: 'Includes, main declaration, declare string, print with cout, return 0.',
    explanation: 'The program includes `<iostream>` and `<string>`, declares `main()`, initializes a `std::string`, and outputs it with `std::cout`.'
  },
  {
    t: 'std::endl vs "\\n"',
    c: 'std::endl outputs a newline character AND explicitly flushes the output stream buffer.',
    m: 'completion',
    code: `std::cout << "Immediate telemetry update" << ___;`,
    q: 'CODE COMPLETION: Choose the stream manipulator that inserts a newline and flushes the buffer:',
    opts: [
      'std::endl',
      'std::flush_nl',
      'std::newline',
      'std::break'
    ],
    a: 0,
    h: 'Use std::endl to output a newline and flush.',
    explanation: '`std::endl` writes `\'\\n\'` and immediately calls `.flush()` on the stream.'
  },
  {
    t: 'C++ Namespaces & Scope Resolution',
    c: 'The :: scope resolution operator qualifies symbols within a namespace or class.',
    m: 'detective',
    code: `namespace Sector {\n    int code = 404;\n}\nint main() {\n    std::cout << Sector::code;\n    return 0;\n}`,
    q: 'OUTPUT DETECTIVE: How does main access variable code inside namespace Sector?',
    opts: [
      'Using the scope resolution operator Sector::code',
      'Using Sector.code',
      'Using Sector->code',
      'Using import Sector'
    ],
    a: 0,
    h: 'Namespaces in C++ use the :: operator.',
    explanation: 'The double colon `::` is C++\'s scope resolution operator, used to specify which namespace contains the identifier.'
  },
  // BOSS 1: Level 8
  {
    t: 'THE RAW POINTER GHOUL',
    isBoss: true,
    name: 'THE RAW POINTER GHOUL',
    hp: 500,
    avatar: '👹',
    story: 'A ghastly remnant from legacy C++ in STL Valley, haunting codebases with unmanaged raw new and delete calls!',
    phases: [
      {
        q: 'PHASE 1: Ghoul tests reference vs pointer differences! Can a reference in C++ be reseated (rebound) to another object after initialization?',
        opts: [
          'No, a reference must be initialized at declaration and cannot be rebound to another object',
          'Yes, using the rebind() method',
          'Yes, by using the assignment operator',
          'Only if it was declared with auto'
        ],
        a: 0,
        explanation: 'Once initialized, a C++ reference cannot be rebound to refer to a different object. Assigning to it changes the value of the referenced object.'
      },
      {
        q: 'PHASE 2: Ghoul tests nullptr keyword! What is the type-safe null pointer literal introduced in C++11?',
        opts: ['nullptr', 'NULL', '0', 'nil'],
        a: 0,
        explanation: 'C++11 introduced `nullptr` of type `std::nullptr_t`, eliminating function overloading ambiguities caused by literal `0` and `NULL`.'
      },
      {
        q: 'PHASE 3: Ghoul tests pass-by-reference efficiency! Why should large objects (like std::vector or std::string) be passed as const Type &?',
        opts: [
          'It avoids an expensive deep copy while preventing the function from modifying the caller\'s object',
          'It forces the object into CPU registers',
          'It compiles the code to assembly',
          'It makes the function asynchronous'
        ],
        a: 0,
        explanation: 'Passing by `const &` passes an address instead of copying the entire buffer, combining performance with immutability guarantees.'
      },
      {
        q: 'PHASE 4: Ghoul queries new[] and delete[] pairing! What operator must deallocate an array allocated with new int[10]?',
        opts: ['delete[]', 'delete', 'free()', 'dealloc()'],
        a: 0,
        explanation: 'Memory allocated with `new[]` must be freed with `delete[]`. Using plain `delete` on an array causes undefined behavior.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which C++ standard library header provides modern numeric limits (like std::numeric_limits<int>::max())?',
        opts: ['<limits>', '<climits>', '<algorithm>', '<numeric>'],
        a: 0,
        explanation: 'The `<limits>` header defines `std::numeric_limits<T>`, providing traits like minimum, maximum, and epsilon values for types.'
      }
    ]
  },

  // =========================================================================
  // AREA 2: TEMPLATE PEAKS (Lv 9-16) - TEMPLATES & STL CONTAINERS
  // =========================================================================
  {
    t: 'Generic Function Templates',
    c: 'template<typename T> allows writing algorithms that work with any data type.',
    m: 'glitch',
    code: `generic<T>\nT findMax(T a, T b) { return (a > b) ? a : b; }`,
    q: 'BUG HUNTER: C++ uses template<typename T> or template<class T>, not generic<T>. Fix the template prefix:',
    opts: [
      'template <typename T>',
      'template <generic T>',
      'template <type T>',
      'template <var T>'
    ],
    a: 0,
    h: 'Declare templates using template <typename T>.',
    explanation: 'In C++, generic functions and classes begin with `template <typename T>` or `template <class T>`.'
  },
  {
    t: 'std::vector Dynamic Arrays',
    c: 'std::vector<T> is a contiguous, dynamically-sized sequence container that manages its own memory.',
    m: 'runner',
    code: `#include <vector>\nstd::vector<int> scores;\nscores.push_back(50);\nscores.push_back(100);\nstd::cout << scores.size();`,
    q: 'SPEED RUN: What is scores.size() after two push_back calls?',
    opts: [
      '2',
      '1',
      '150',
      '0'
    ],
    a: 0,
    h: 'Two elements were added: size is 2.',
    explanation: '`push_back()` appends elements to the end of the vector. After two insertions, `.size()` is `2`.'
  },
  {
    t: 'Range-Based For Loops (C++11)',
    c: 'for (const auto &item : container) provides clean iteration over any STL container.',
    m: 'detective',
    code: `std::vector<int> vals = {1, 2, 3};\nint sum = 0;\nfor (const auto &v : vals) {\n    sum += v;\n}\nstd::cout << sum;`,
    q: 'OUTPUT DETECTIVE: Sum of elements in {1, 2, 3}:',
    opts: [
      '6',
      '3',
      '5',
      '123'
    ],
    a: 0,
    h: '1 + 2 + 3 = 6.',
    explanation: 'The range-based for loop iterates over each element in `vals`, adding 1, 2, and 3 to yield 6.'
  },
  {
    t: 'std::pair and std::make_pair',
    c: 'std::pair stores two heterogeneous values accessible via .first and .second.',
    m: 'detective',
    code: `auto coord = std::make_pair(10, 25);\nstd::cout << coord.first << " " << coord.second;`,
    q: 'OUTPUT DETECTIVE: What is printed by accessing first and second?',
    opts: [
      '"10 25"',
      '"25 10"',
      '"(10, 25)"',
      'Compilation Error'
    ],
    a: 0,
    h: 'first is 10 and second is 25.',
    explanation: '`std::pair` members are named `first` (10) and `second` (25), outputting "10 25".'
  },
  {
    t: 'Structured Bindings (C++17)',
    c: 'Structured bindings unpack tuples, pairs, or structs into separate variable names: auto [a, b] = pair.',
    m: 'builder',
    codeBlocks: [
      '#include <iostream>',
      '#include <utility>',
      'int main() {',
      '    std::pair<int, std::string> bot = {1, "Titan"};',
      '    auto [id, name] = bot;',
      '    std::cout << id << ":" << name << "\\n";',
      '    return 0;',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    q: 'CODE BUILDER: Assemble the C++17 structured binding decomposition program:',
    h: 'Includes, main, declare pair, unpack with auto [id, name], print, return 0.',
    explanation: 'C++17 structured bindings decompose the pair into `id` (1) and `name` ("Titan") cleanly without `.first`/`.second`.'
  },
  {
    t: 'Vector Element Access (at() vs operator[])',
    c: 'at(index) performs bounds-checking and throws std::out_of_range; operator[] does no bounds checking.',
    m: 'completion',
    code: `std::vector<int> vec = {10, 20};\nint val = vec.___\(0); // bounds-checked access`,
    q: 'CODE COMPLETION: Choose the bounds-checked accessor method for std::vector:',
    opts: [
      'at',
      'get',
      'safe_index',
      'lookup'
    ],
    a: 0,
    h: 'Use vec.at(index) for checked access.',
    explanation: '`vec.at(0)` checks that the index is within bounds before returning the element, throwing `std::out_of_range` if invalid.'
  },
  {
    t: 'std::vector Emplace Back',
    c: 'emplace_back constructs the element in-place directly in the vector buffer, avoiding extra copy/move operations.',
    m: 'detective',
    code: `std::vector<std::string> log;\nlog.emplace_back("SYSTEM READY");\nstd::cout << log.front();`,
    q: 'OUTPUT DETECTIVE: What does log.front() return?',
    opts: [
      '"SYSTEM READY"',
      'A pointer',
      '0',
      'Undefined'
    ],
    a: 0,
    h: 'front() returns a reference to the first element in the vector.',
    explanation: '`emplace_back` constructs "SYSTEM READY" at the back of the vector, which is also the first element returned by `front()`.'
  },
  // BOSS 2: Level 16
  {
    t: 'THE TEMPLATE BEAST',
    isBoss: true,
    name: 'THE TEMPLATE BEAST',
    hp: 600,
    avatar: '🐲',
    story: 'A mythological chimera lurking in Template Peaks, challenging operatives on template specialization and compile-time code generation!',
    phases: [
      {
        q: 'PHASE 1: Beast tests template compilation! When is template code compiled into machine instructions?',
        opts: [
          'At compile time, when the template is instantiated with a concrete type',
          'At runtime, via a JIT interpreter',
          'Only once when preprocessed',
          'Templates are never compiled'
        ],
        a: 0,
        explanation: 'C++ templates are a compile-time mechanism; the compiler generates distinct machine code implementations for each type used to instantiate the template.'
      },
      {
        q: 'PHASE 2: Beast tests vector capacity vs size! What is the difference between v.size() and v.capacity()?',
        opts: [
          'size() is the number of active elements; capacity() is the total memory allocated before reallocation is needed',
          'size() is bytes, capacity() is count',
          'They are always identical',
          'capacity() is the maximum possible size on the OS'
        ],
        a: 0,
        explanation: '`size()` returns the number of elements currently in the vector; `capacity()` is the number of elements it can hold without allocating more memory.'
      },
      {
        q: 'PHASE 3: Beast queries non-type template parameters! Can an integer constant be passed as a template parameter: template<int N>?',
        opts: [
          'Yes, C++ supports non-type template parameters (e.g. std::array<int, 5>)',
          'No, templates only accept types',
          'Only floating point numbers',
          'Only string literals'
        ],
        a: 0,
        explanation: 'C++ supports non-type template parameters such as integers, pointers, and enums (used heavily in `std::array<T, N>`).'
      },
      {
        q: 'PHASE 4: Beast tests template specialization syntax! What introduces a full template specialization for a specific type?',
        opts: ['template <>', 'template <special>', 'template <default>', 'specialized'],
        a: 0,
        explanation: '`template <>` designates a full template specialization for a specific type.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which C++20 feature constrains template arguments to enforce type requirements at compile time?',
        opts: ['Concepts (and requires clauses)', 'Interfaces', 'Contracts', 'Protocols'],
        a: 0,
        explanation: 'C++20 Concepts allow developers to constrain template arguments with clear compile-time requirements, producing readable compiler diagnostics.'
      }
    ]
  },

  // =========================================================================
  // AREA 3: RAII BASTION (Lv 17-24) - RAII & RESOURCE MANAGEMENT
  // =========================================================================
  {
    t: 'RAII (Resource Acquisition Is Initialization)',
    c: 'RAII binds resource lifecycle to object lifetime: acquired in constructor, released in destructor.',
    m: 'glitch',
    code: `class FileHolder {\n    FILE *f;\n    // Missing destructor! File handle leaks on destruction!\n};`,
    q: 'BUG HUNTER: The file resource leaks when the object leaves scope. What method releases resources upon object destruction?',
    opts: [
      'Destructor: ~FileHolder()',
      'Finalizer: finalize()',
      'dispose()',
      'deconstruct()'
    ],
    a: 0,
    h: 'A destructor is prefixed with a tilde: ~ClassName().',
    explanation: 'In C++, a class destructor `~ClassName()` executes automatically when an object goes out of scope, guaranteeing resource cleanup.'
  },
  {
    t: 'Stack vs Heap Allocation Lifetime',
    c: 'Stack objects destruct automatically when their enclosing block exits; heap objects persist until deleted.',
    m: 'runner',
    code: `void spawn() {\n    int stack_var = 10; // destroyed at block exit\n}`,
    q: 'SPEED RUN: When is a standard local stack variable destroyed in C++?',
    opts: [
      'Immediately when execution exits the enclosing block scope',
      'When the entire program exits',
      'When the garbage collector runs',
      'Never'
    ],
    a: 0,
    h: 'Local stack variables destruct automatically at block exit.',
    explanation: 'C++ stack-allocated objects are destroyed deterministically the exact moment execution leaves the block where they were created.'
  },
  {
    t: 'Destructor Execution Order',
    c: 'Objects on the stack are destroyed in reverse order of their construction (Last-In, First-Out).',
    m: 'detective',
    code: `struct Tracker {\n    int id;\n    Tracker(int i) : id(i) {}\n    ~Tracker() { std::cout << id; }\n};\nint main() {\n    Tracker a(1);\n    Tracker b(2);\n    return 0;\n}`,
    q: 'OUTPUT DETECTIVE: Stack objects destruct in reverse order! What output is printed on exit?',
    opts: [
      '"21"',
      '"12"',
      '"1"',
      '"2"'
    ],
    a: 0,
    h: 'b was created last, so b is destroyed first, then a.',
    explanation: 'C++ destroys local stack objects in reverse order of creation: `b` (id 2) destructs first, followed by `a` (id 1), printing "21".'
  },
  {
    t: 'Member Initializer Lists',
    c: 'Member initializer lists initialize member variables before the constructor body executes.',
    m: 'builder',
    codeBlocks: [
      'class Sensor {',
      '    int id;',
      '    int pin;',
      'public:',
      '    Sensor(int i, int p) : id(i), pin(p) {}',
      '};'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the C++ class with constructor member initializer list:',
    h: 'class Sensor, fields id & pin, public specifier, constructor with : id(i), pin(p), close class.',
    explanation: 'Using the colon member initializer list `: id(i), pin(p)` initializes members directly rather than constructing and reassigning.'
  },
  {
    t: 'The Copy Constructor',
    c: 'ClassName(const ClassName &other) defines how an object is duplicated when copied.',
    m: 'completion',
    code: `class Buffer {\npublic:\n    Buffer(const Buffer ___) { /* copy logic */ }\n};`,
    q: 'CODE COMPLETION: Complete the copy constructor parameter signature:',
    opts: [
      '&other',
      '*other',
      'other',
      '&&other'
    ],
    a: 0,
    h: 'Copy constructors accept a const reference: const ClassName &.',
    explanation: 'A copy constructor must accept its parameter by reference (`const ClassName &`), otherwise passing by value would cause infinite recursion.'
  },
  {
    t: 'Rule of Three in C++03',
    c: 'If a class requires a custom Destructor, Copy Constructor, or Copy Assignment Operator, it likely needs all three.',
    m: 'detective',
    code: `// Rule of 3: Destructor, Copy Constructor, Copy Assignment Operator`,
    q: 'OUTPUT DETECTIVE: Why does managing raw heap resources require defining all three of these methods?',
    opts: [
      'To prevent shallow copying of raw pointers resulting in double-free errors',
      'To make the class virtual',
      'To speed up compilation time',
      'It is required by the C++ linker'
    ],
    a: 0,
    h: 'Default memberwise copies duplicate the pointer address, leading to double-free crashes.',
    explanation: 'If a class manages raw resources, the default compiler-generated copy duplicates the raw pointer. When both destruct, the same pointer is freed twice!'
  },
  {
    t: 'The default and delete Keywords (C++11)',
    c: '= delete explicitly disables functions (e.g. non-copyable classes); = default requests compiler generation.',
    m: 'detective',
    code: `class NonCopyable {\npublic:\n    NonCopyable(const NonCopyable &) = delete;\n};\nNonCopyable a;\n// NonCopyable b = a; // Compile-time error!`,
    q: 'OUTPUT DETECTIVE: What does = delete do to the copy constructor?',
    opts: [
      'Disables copying completely at compile time',
      'Deletes the object from memory',
      'Frees the object immediately',
      'Makes the constructor private'
    ],
    a: 0,
    h: '= delete removes the function from the class interface.',
    explanation: 'Marking a function `= delete` instructs the compiler that any attempt to invoke that function is a compile-time error.'
  },
  // BOSS 3: Level 24
  {
    t: 'THE MEMORY LEAK BEHEMOTH',
    isBoss: true,
    name: 'THE MEMORY LEAK BEHEMOTH',
    hp: 700,
    avatar: '🗿',
    story: 'A gargantuan monster devouring unmanaged heap memory in RAII Bastion, causing system memory exhaustion!',
    phases: [
      {
        q: 'PHASE 1: Behemoth tests the Rule of Five! What two move operations were added in C++11 to complete the Rule of Five?',
        opts: [
          'Move Constructor and Move Assignment Operator',
          'Virtual Destructor and Static Cast',
          'Clone method and Print method',
          'Initializer list and Lambda'
        ],
        a: 0,
        explanation: 'C++11 added Move Constructor (`Type(Type &&)`) and Move Assignment Operator (`Type& operator=(Type &&)`), forming the Rule of Five.'
      },
      {
        q: 'PHASE 2: Behemoth tests virtual destructors! Why MUST a base class have a virtual destructor if deleted via a base pointer?',
        opts: [
          'To ensure the derived class destructor is called, preventing resource leaks',
          'To prevent memory from being freed',
          'To make the class abstract',
          'To allow public inheritance'
        ],
        a: 0,
        explanation: 'Deleting a derived object through a `Base *` without a `virtual ~Base()` destructor causes undefined behavior and fails to invoke the derived destructor.'
      },
      {
        q: 'PHASE 3: Behemoth queries exception safety guarantees! What is the "Strong Exception Guarantee"?',
        opts: [
          'If an operation fails, the program state remains unchanged (commit-or-rollback semantics)',
          'No exceptions will ever be thrown',
          'Resources are leaked safely',
          'The program terminates immediately'
        ],
        a: 0,
        explanation: 'The strong exception guarantee ensures that an operation has commit-or-rollback semantics: either it succeeds completely, or state is rolled back.'
      },
      {
        q: 'PHASE 4: Behemoth tests noexcept specifier! What happens if an exception escapes from a function marked noexcept?',
        opts: [
          'std::terminate() is called immediately, aborting the process',
          'The exception is swallowed silently',
          'It rethrows as std::runtime_error',
          'Compilation fails'
        ],
        a: 0,
        explanation: '`noexcept` guarantees a function will not throw. If an exception escapes a `noexcept` function, C++ calls `std::terminate()` immediately.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which standard header provides RAII file stream classes (std::ifstream, std::ofstream)?',
        opts: ['<fstream>', '<iostream>', '<file>', '<filesystem>'],
        a: 0,
        explanation: '`<fstream>` provides file stream classes whose destructors automatically flush and close files on scope exit.'
      }
    ]
  },

  // =========================================================================
  // AREA 4: OPERATOR CORE (Lv 25-32) - OPERATOR OVERLOADING & MOVE
  // =========================================================================
  {
    t: 'Operator Overloading Syntax',
    c: 'operator+ allows custom classes to define behavior for standard operators like +.',
    m: 'glitch',
    code: `class Vec2 {\npublic:\n    int x, y;\n    Vec2 add(const Vec2 &o) { return {x + o.x, y + o.y}; }\n};`,
    q: 'BUG HUNTER: Replace the named method add() with the operator overload for the + symbol:',
    opts: [
      'Vec2 operator+(const Vec2 &o)',
      'Vec2 operator_add(const Vec2 &o)',
      'Vec2 +(const Vec2 &o)',
      'Vec2::add_operator(const Vec2 &o)'
    ],
    a: 0,
    h: 'Use operator+ followed by parameter list.',
    explanation: 'In C++, operator overloading functions are named `operator` followed by the target symbol: `Vec2 operator+(const Vec2 &o)`.'
  },
  {
    t: 'Stream Output Operator Overload (<<)',
    c: 'Overloading std::ostream &operator<<(std::ostream &os, const T &obj) allows printing custom objects with cout.',
    m: 'runner',
    code: `class Point { public: int x = 5, y = 9; };\n// std::cout << pt prints "5, 9" when operator<< is implemented`,
    q: 'SPEED RUN: What must operator<< return to allow chained stream calls like cout << a << b?',
    opts: [
      'std::ostream & (reference to the output stream)',
      'void',
      'int',
      'const char *'
    ],
    a: 0,
    h: 'Return a reference to ostream so subsequent << calls can chain.',
    explanation: 'Returning `std::ostream &` enables method chaining: `std::cout << pt << std::endl;`.'
  },
  {
    t: 'Rvalue References (Type &&)',
    c: 'Rvalue references (Type &&) bind to temporary objects that are about to expire, enabling resource theft (move semantics).',
    m: 'detective',
    code: `int x = 10;\n// int &&r1 = x; // Error: x is an lvalue!\nint &&r2 = 10 + 5; // Valid: binds to temporary rvalue 15\nstd::cout << r2;`,
    q: 'OUTPUT DETECTIVE: What value is bound to the rvalue reference r2?',
    opts: [
      '15',
      '10',
      '5',
      'Compilation Error'
    ],
    a: 0,
    h: '10 + 5 is a temporary value: 15.',
    explanation: 'The double ampersand `&&` binds to temporary rvalues like the result of `10 + 5`, which is 15.'
  },
  {
    t: 'std::move Cast',
    c: 'std::move does not move anything itself; it unconditionally casts an lvalue to an rvalue reference to allow moving.',
    m: 'detective',
    code: `std::string a = "OPERATIVE";\nstd::string b = std::move(a);\nstd::cout << b.length() << " " << a.length();`,
    q: 'OUTPUT DETECTIVE: a\'s string buffer was moved into b. What is the length of b and a now?',
    opts: [
      '9 0',
      '9 9',
      '0 9',
      'Compilation Error'
    ],
    a: 0,
    h: 'b receives the 9 characters; a is left in a valid but empty state (length 0).',
    explanation: 'Moving transfers ownership of the underlying character array from `a` to `b`. `b` now has length 9; `a` is left empty (length 0).'
  },
  {
    t: 'Move Constructor Assembly',
    c: 'A move constructor transfers ownership of dynamic memory from a temporary object.',
    m: 'builder',
    codeBlocks: [
      'class Buffer {',
      '    int *data;',
      'public:',
      '    Buffer(Buffer &&other) noexcept : data(other.data) {',
      '        other.data = nullptr;',
      '    }',
      '};'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    q: 'CODE BUILDER: Assemble the move constructor transferring pointer ownership and nullifying other:',
    h: 'Class header, raw pointer, public, move constructor header with && noexcept, nullify other.data, close constructor, close class.',
    explanation: 'The move constructor takes `other.data` and sets `other.data = nullptr` so `other`\'s destructor won\'t free the stolen memory.'
  },
  {
    t: 'Struct vs Class in C++',
    c: 'In C++, struct and class are identical EXCEPT: members in struct default to public; members in class default to private.',
    m: 'completion',
    code: `struct Node {\n    int id; // public by default in struct\n};\nclass Block {\n    int id; // ___ by default in class\n};`,
    q: 'CODE COMPLETION: What is the default access level for members in a C++ class?',
    opts: [
      'private',
      'public',
      'protected',
      'internal'
    ],
    a: 0,
    h: 'Classes default to private; structs default to public.',
    explanation: 'The sole difference between `struct` and `class` in C++ is default visibility: `struct` defaults to `public`, `class` defaults to `private`.'
  },
  {
    t: 'Friend Functions in C++',
    c: 'A friend function is granted access to the private and protected members of the class declaring it.',
    m: 'detective',
    code: `class Core {\n    int secret = 77;\n    friend void audit(const Core &c);\n};\nvoid audit(const Core &c) {\n    std::cout << c.secret;\n}\nint main() { Core c; audit(c); return 0; }`,
    q: 'OUTPUT DETECTIVE: Does the friend function audit successfully access private secret?',
    opts: [
      'Yes, outputs 77',
      'No, compiler error',
      'Outputs 0',
      'Throws AccessViolation'
    ],
    a: 0,
    h: 'friend status grants access to private fields.',
    explanation: 'Because `audit` was declared a `friend` inside `Core`, it has permission to read private member `secret` (77).'
  },
  // BOSS 4: Level 32
  {
    t: 'THE OVERLOAD TITAN',
    isBoss: true,
    name: 'THE OVERLOAD TITAN',
    hp: 800,
    avatar: '🗿',
    story: 'A colossus forged from operator symbols in Operator Core, testing copy elision, move semantics, and overload rules!',
    phases: [
      {
        q: 'PHASE 1: Titan queries non-overloadable operators! Which of the following C++ operators CANNOT be overloaded?',
        opts: [
          ':: (scope resolution), . (member access), and sizeof',
          '+, -, *',
          '[], (), ->',
          '<< and >>'
        ],
        a: 0,
        explanation: 'In C++, operators `::`, `.`, `.*`, `?:`, and `sizeof` cannot be overloaded.'
      },
      {
        q: 'PHASE 2: Titan tests Copy Elision (RVO)! What does RVO stand for in C++ compiler optimizations?',
        opts: [
          'Return Value Optimization (eliding copies when returning objects by value)',
          'Reference Vector Ordering',
          'Runtime Value Overload',
          'Recursive Variable Operation'
        ],
        a: 0,
        explanation: 'RVO (Return Value Optimization) allows the compiler to construct a return value directly in the destination memory location, bypassing copy/move constructors.'
      },
      {
        q: 'PHASE 3: Titan tests explicit constructors! What does prefixing a single-argument constructor with explicit prevent?',
        opts: [
          'Implicit type conversions during assignment or function calls (e.g. MyClass c = 5;)',
          'Instantiating the class with new',
          'Inheriting from the class',
          'Destructing the object'
        ],
        a: 0,
        explanation: 'The `explicit` specifier prevents the compiler from using the constructor for implicit conversions.'
      },
      {
        q: 'PHASE 4: Titan tests subscript operator signature! When overloading operator[], what two versions should a container provide?',
        opts: [
          'A non-const version returning T& AND a const version returning const T&',
          'A static version and a non-static version',
          'A single void version',
          'An rvalue version only'
        ],
        a: 0,
        explanation: 'Providing both `T& operator[](size_t)` and `const T& operator[](size_t) const` ensures the container works on both mutable and const instances.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which C++20 operator <=> is known as the "spaceship operator"?',
        opts: [
          'Three-way comparison operator (replaces ==, !=, <, <=, >, >=)',
          'Pointer spaceship iterator',
          'Bitwise rocket shift',
          'Coroutine yield operator'
        ],
        a: 0,
        explanation: 'The C++20 spaceship operator `<=>` performs three-way comparison, automatically synthesizing all relational comparisons.'
      }
    ]
  },

  // =========================================================================
  // AREA 5: SMART POINTER VAULT (Lv 33-40) - MODERN MEMORY MANAGEMENT
  // =========================================================================
  {
    t: 'std::unique_ptr Exclusive Ownership',
    c: 'std::unique_ptr owns and manages another object through a pointer and disposes of that object when out of scope.',
    m: 'glitch',
    code: `#include <memory>\nstd::unique_ptr<int> p1 = std::make_unique<int>(42);\nstd::unique_ptr<int> p2 = p1; // Bug: unique_ptr cannot be copied!`,
    q: 'BUG HUNTER: unique_ptr cannot be copied because it has exclusive ownership. How do you transfer ownership to p2?',
    opts: [
      'std::unique_ptr<int> p2 = std::move(p1);',
      'std::unique_ptr<int> p2 = p1.clone();',
      'std::unique_ptr<int> p2 = &p1;',
      'p2.copy_from(p1);'
    ],
    a: 0,
    h: 'Use std::move to transfer unique ownership.',
    explanation: '`std::unique_ptr` deletes its copy constructor to enforce unique ownership. You must use `std::move(p1)` to transfer ownership.'
  },
  {
    t: 'std::make_unique Factory (C++14)',
    c: 'std::make_unique<T>(args) is the preferred, exception-safe way to create a unique_ptr without raw new.',
    m: 'runner',
    code: `auto ptr = std::make_unique<int>(100);\nstd::cout << *ptr;`,
    q: 'SPEED RUN: What is printed by dereferencing *ptr?',
    opts: [
      '100',
      'Address',
      '0',
      'Segmentation Fault'
    ],
    a: 0,
    h: 'Dereferencing the unique_ptr yields the managed value 100.',
    explanation: '`*ptr` accesses the heap integer managed by the smart pointer, outputting `100`.'
  },
  {
    t: 'std::shared_ptr Shared Ownership',
    c: 'std::shared_ptr retains shared ownership through a reference count; frees resource when count drops to 0.',
    m: 'detective',
    code: `#include <memory>\nauto p1 = std::make_shared<int>(50);\nauto p2 = p1;\nstd::cout << p1.use_count();`,
    q: 'OUTPUT DETECTIVE: Both p1 and p2 point to the same integer. What is p1.use_count()?',
    opts: [
      '2',
      '1',
      '50',
      '0'
    ],
    a: 0,
    h: 'Two shared_ptrs reference the object, so use_count() is 2.',
    explanation: '`p2 = p1` increments the internal reference count control block to `2`.'
  },
  {
    t: 'std::weak_ptr Breaking Reference Cycles',
    c: 'std::weak_ptr holds a non-owning reference to an object managed by std::shared_ptr to prevent circular memory leaks.',
    m: 'detective',
    code: `auto sp = std::make_shared<int>(99);\nstd::weak_ptr<int> wp = sp;\nstd::cout << wp.expired();`,
    q: 'OUTPUT DETECTIVE: sp is still alive. What does wp.expired() return?',
    opts: [
      '0 (false)',
      '1 (true)',
      '99',
      'Compilation Error'
    ],
    a: 0,
    h: 'The object is still managed by sp, so wp has not expired (false/0).',
    explanation: 'Because `sp` is still alive, the referenced object exists, so `wp.expired()` returns `false` (0).'
  },
  {
    t: 'Smart Pointer Node Creation Assembly',
    c: 'Building linked structures with modern smart pointers.',
    m: 'builder',
    codeBlocks: [
      '#include <memory>',
      'struct Node {',
      '    int val;',
      '    std::unique_ptr<Node> next;',
      '    Node(int v) : val(v), next(nullptr) {}',
      '};',
      'int main() {',
      '    auto head = std::make_unique<Node>(10);',
      '    head->next = std::make_unique<Node>(20);',
      '    return 0;',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    q: 'CODE BUILDER: Assemble the leak-free unique_ptr linked list node chain:',
    h: 'Header, struct Node with unique_ptr next, constructor, main, allocate head, allocate head->next, return 0.',
    explanation: 'Using `std::unique_ptr<Node> next` guarantees automatic recursive deletion of the entire list when `head` goes out of scope.'
  },
  {
    t: 'std::map Sorted Associative Container',
    c: 'std::map is a sorted associative container (Red-Black tree) storing key-value pairs sorted by keys.',
    m: 'completion',
    code: `#include <map>\nstd::map<std::string, int> ammo;\nammo["MISSILES"] = 4;\nammo["LASER"] = 100;\n// std::map keys are sorted ___ by default`,
    q: 'CODE COMPLETION: How are keys sorted by default in std::map?',
    opts: [
      'In ascending order according to operator<',
      'In insertion order',
      'Randomly based on hash',
      'Descending order'
    ],
    a: 0,
    h: 'std::map sorts keys in ascending order using operator<.',
    explanation: '`std::map` is a self-balancing binary search tree that maintains keys in sorted ascending order.'
  },
  {
    t: 'std::unordered_map Hash Table',
    c: 'std::unordered_map provides average O(1) key lookups backed by a bucket hash table.',
    m: 'detective',
    code: `#include <unordered_map>\nstd::unordered_map<int, int> squares;\nsquares[4] = 16;\nstd::cout << squares[4];`,
    q: 'OUTPUT DETECTIVE: What is printed by squares[4]?',
    opts: [
      '16',
      '4',
      '0',
      'KeyNotFoundException'
    ],
    a: 0,
    h: 'Key 4 maps to value 16.',
    explanation: '`squares[4]` retrieves the mapped value for key 4, outputting `16`.'
  },
  // BOSS 5: Level 40
  {
    t: 'THE CIRCULAR REF LICH',
    isBoss: true,
    name: 'THE CIRCULAR REF LICH',
    hp: 900,
    avatar: '💀',
    story: 'An immortal lich binding shared_ptr instances into circular cycles that trap heap memory for eternity!',
    phases: [
      {
        q: 'PHASE 1: Lich tests circular reference traps! What happens if two shared_ptr objects hold shared_ptr references to each other?',
        opts: [
          'A circular reference cycle forms; use_count never hits 0, causing a permanent memory leak',
          'They cancel each other out and delete immediately',
          'The compiler detects and breaks the cycle',
          'Throws a CyclicReferenceException'
        ],
        a: 0,
        explanation: 'If object A holds a `shared_ptr` to B, and B holds a `shared_ptr` to A, their reference counts never reach 0, leaking memory.'
      },
      {
        q: 'PHASE 2: Lich tests weak_ptr lock()! How do you safely access the object managed by a std::weak_ptr wp?',
        opts: [
          'Call wp.lock(), which returns a valid shared_ptr if the object is still alive',
          'Dereference it directly: *wp',
          'Call wp.get()',
          'Cast it with static_cast'
        ],
        a: 0,
        explanation: '`wp.lock()` creates a new `shared_ptr` that shares ownership. If the object was already deleted, it returns an empty `shared_ptr`.'
      },
      {
        q: 'PHASE 3: Lich tests custom deleters! Where is a custom deleter stored in std::unique_ptr compared to std::shared_ptr?',
        opts: [
          'In unique_ptr, the deleter type is part of the type signature; in shared_ptr, it is stored in the runtime control block',
          'Neither supports custom deleters',
          'In global static memory',
          'In the vtable'
        ],
        a: 0,
        explanation: '`std::unique_ptr<T, Deleter>` has zero space overhead because the deleter is part of the type. `shared_ptr` type-erases the deleter in its control block.'
      },
      {
        q: 'PHASE 4: Lich tests make_shared allocation efficiency! Why is std::make_shared more efficient than shared_ptr<T>(new T)?',
        opts: [
          'It allocates the object and the reference count control block in a single contiguous memory block',
          'It runs in a separate thread',
          'It bypasses memory allocation entirely',
          'It disables the destructor'
        ],
        a: 0,
        explanation: '`std::make_shared` performs a single memory allocation for both the control block and the object, improving cache locality and reducing heap overhead.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which smart pointer method yields the raw underlying pointer: ptr.get()?',
        opts: ['get()', 'raw()', 'unwrap()', 'ptr()'],
        a: 0,
        explanation: '`.get()` returns the raw underlying pointer without releasing ownership.'
      }
    ]
  },

  // =========================================================================
  // AREA 6: THREAD NEXUS (Lv 41-48) - MULTITHREADING & ALGORITHMS
  // =========================================================================
  {
    t: 'C++ Lambda Expression Syntax',
    c: '[capture](parameters) -> return_type { body } defines inline anonymous function objects.',
    m: 'glitch',
    code: `auto square = (x) => x * x; // Bug: JavaScript syntax in C++!`,
    q: 'BUG HUNTER: Replace JavaScript arrow syntax with the valid C++ lambda syntax:',
    opts: [
      '[](int x) { return x * x; }',
      'lambda(x) { return x * x; }',
      'fn(int x) -> x * x',
      'def(int x): x * x'
    ],
    a: 0,
    h: 'C++ lambdas start with capture brackets [].',
    explanation: 'C++ lambdas use `[capture](parameters) { body }`. `[](int x) { return x * x; }` is standard.'
  },
  {
    t: 'std::sort with Lambda Comparator',
    c: 'std::sort(begin, end, comparator) from <algorithm> sorts elements in O(N log N) time.',
    m: 'runner',
    code: `#include <algorithm>\n#include <vector>\nstd::vector<int> v = {5, 2, 8, 1};\nstd::sort(v.begin(), v.end());\nstd::cout << v.front();`,
    q: 'SPEED RUN: What is the first element after sorting in ascending order?',
    opts: [
      '1',
      '5',
      '8',
      '2'
    ],
    a: 0,
    h: '1 is the smallest element.',
    explanation: '`std::sort` arranges elements in non-descending order: `{1, 2, 5, 8}`. `v.front()` is 1.'
  },
  {
    t: 'std::thread Execution',
    c: 'std::thread from <thread> spawns a new OS thread of execution; must call .join() or .detach() before destruction.',
    m: 'detective',
    code: `#include <thread>\nvoid task() { /* work */ }\nint main() {\n    std::thread t(task);\n    t.join(); // waits for thread completion\n    return 0;\n}`,
    q: 'OUTPUT DETECTIVE: What happens if an active std::thread destructs without calling join() or detach()?',
    opts: [
      'std::terminate() is called and the program crashes',
      'The thread continues running in the background silently',
      'The thread is paused',
      'No effect'
    ],
    a: 0,
    h: 'An active thread must be joined or detached, otherwise ~thread calls std::terminate().',
    explanation: 'If a `std::thread` is still joinable when its destructor runs, C++ invokes `std::terminate()`, terminating the program.'
  },
  {
    t: 'std::mutex and std::lock_guard (RAII Locking)',
    c: 'std::lock_guard acquires a mutex upon creation and automatically releases it on destruction.',
    m: 'builder',
    codeBlocks: [
      '#include <mutex>',
      'std::mutex mtx;',
      'int counter = 0;',
      'void safe_increment() {',
      '    std::lock_guard<std::mutex> lock(mtx);',
      '    counter++;',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    q: 'CODE BUILDER: Assemble the thread-safe RAII mutex lock guard pattern:',
    h: 'Include mutex, declare mtx, declare counter, function safe_increment, lock_guard acquisition, increment counter, close function.',
    explanation: '`std::lock_guard` guarantees exception-safe mutex unlocking as soon as execution leaves the function scope.'
  },
  {
    t: 'Virtual Functions & Polymorphic Dispatch',
    c: 'The virtual keyword enables dynamic dispatch so the derived class implementation is invoked through base pointers.',
    m: 'completion',
    code: `class Weapon {\npublic:\n    ___ void fire() { std::cout << "BASE"; }\n};\nclass Laser : public Weapon {\n    void fire() override { std::cout << "LASER"; }\n};`,
    q: 'CODE COMPLETION: Choose the keyword that enables runtime dynamic dispatch:',
    opts: [
      'virtual',
      'override',
      'abstract',
      'dynamic'
    ],
    a: 0,
    h: 'Prefix base method with virtual.',
    explanation: 'Marking a base method `virtual` instructs the compiler to generate a vtable entry for dynamic dispatch.'
  },
  {
    t: 'Pure Virtual Functions & Abstract Classes',
    c: 'virtual void method() = 0 declares a pure virtual function, making the class abstract.',
    m: 'detective',
    code: `class Interface {\npublic:\n    virtual void execute() = 0;\n};\n// Interface i; // Cannot instantiate abstract class!`,
    q: 'OUTPUT DETECTIVE: Can a class with a pure virtual function (= 0) be instantiated?',
    opts: [
      'No, pure virtual functions make the class abstract',
      'Yes, by default',
      'Only with static members',
      'Only in C++20'
    ],
    a: 0,
    h: 'Classes with pure virtual functions are abstract and cannot be instantiated.',
    explanation: 'A class with at least one pure virtual function (`= 0`) is an abstract class and cannot be directly instantiated.'
  },
  {
    t: 'std::transform Algorithm',
    c: 'std::transform applies a transformation function to an input range and writes to an output iterator.',
    m: 'detective',
    code: `#include <algorithm>\n#include <vector>\nstd::vector<int> in = {1, 2, 3};\nstd::vector<int> out(3);\nstd::transform(in.begin(), in.end(), out.begin(), [](int x){ return x * 10; });\nstd::cout << out[0];`,
    q: 'OUTPUT DETECTIVE: 1 * 10 = 10. What is out[0]?',
    opts: [
      '10',
      '1',
      '20',
      '0'
    ],
    a: 0,
    h: 'The lambda multiplies each element by 10.',
    explanation: '`std::transform` multiplies each element by 10, placing `10` into `out[0]`.'
  },
  // BOSS 6: Level 48
  {
    t: 'THE MUTEX SPECTRE',
    isBoss: true,
    name: 'THE MUTEX SPECTRE',
    hp: 1000,
    avatar: '👻',
    story: 'A deadlock phantom haunting Thread Nexus, freezing parallel workers in circular mutex wait states!',
    phases: [
      {
        q: 'PHASE 1: Spectre tests Deadlock prevention! Which C++11 function locks multiple mutexes simultaneously without risk of deadlock?',
        opts: [
          'std::lock(m1, m2, ...)',
          'std::mutex_all(m1, m2)',
          'std::multi_lock()',
          'std::barrier()'
        ],
        a: 0,
        explanation: '`std::lock(m1, m2)` uses a deadlock-avoidance algorithm to lock all provided mutexes without risking circular deadlocks.'
      },
      {
        q: 'PHASE 2: Spectre tests std::atomic! What is the primary benefit of using std::atomic<int> for simple counters?',
        opts: [
          'Lock-free atomic read-modify-write operations without mutex locking overhead',
          'It makes the variable private',
          'It runs on the GPU',
          'It stores variables in permanent disk storage'
        ],
        a: 0,
        explanation: '`std::atomic` utilizes CPU-level atomic instructions (like `LOCK CMPXCHG`) to provide thread-safety without heavy OS mutex overhead.'
      },
      {
        q: 'PHASE 3: Spectre queries condition variables! Why must std::condition_variable wait() always be used inside a while loop with a predicate?',
        opts: [
          'To protect against spurious wakeups (the thread waking without notification)',
          'To speed up CPU clock speed',
          'Because if statements are illegal with condition variables',
          'It is required by POSIX only'
        ],
        a: 0,
        explanation: 'Operating systems can wake sleeping threads spuriously. Checking the condition in a while loop verifies the predicate is actually satisfied.'
      },
      {
        q: 'PHASE 4: Spectre queries lambda capture modes! What does [&] mean in a lambda capture clause?',
        opts: [
          'Capture all outer automatic variables by reference',
          'Capture all outer variables by copy/value',
          'Bitwise AND all variables',
          'Capture nothing'
        ],
        a: 0,
        explanation: '`[&]` captures all automatic variables used in the lambda body by reference.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which C++17 class provides scoped mutex locking that supports multiple mutexes via CTAD: std::scoped_lock?',
        opts: ['std::scoped_lock', 'std::multi_guard', 'std::safe_lock', 'std::unique_lock'],
        a: 0,
        explanation: '`std::scoped_lock` (C++17) accepts multiple mutexes and locks them all using a deadlock-avoidance algorithm with RAII.'
      }
    ]
  },

  // =========================================================================
  // AREA 7: ASSEMBLY GATEWAY & MASTER CHALLENGES (Lv 49-51)
  // =========================================================================
  {
    t: 'Constexpr Compile-Time Evaluation',
    c: 'constexpr specifier declares that it is possible to evaluate the value of the function or variable at compile time.',
    m: 'detective',
    code: `constexpr int cube(int x) { return x * x * x; }\nint main() {\n    constexpr int val = cube(3); // computed at compile time!\n    std::cout << val;\n    return 0;\n}`,
    q: 'OUTPUT DETECTIVE: 3 * 3 * 3 = 27 computed by the compiler! What is printed?',
    opts: [
      '27',
      '9',
      '3',
      'Compilation Error'
    ],
    a: 0,
    h: '3 cubed is 27.',
    explanation: '`constexpr` enables `cube(3)` to be calculated at compile time, replacing the function call with the constant `27`.'
  },
  {
    t: 'C++20 Coroutines Architecture',
    c: 'C++20 coroutines are functions that can suspend execution and resume later, using co_await, co_yield, or co_return.',
    m: 'builder',
    codeBlocks: [
      '// C++20 Coroutine Keywords:',
      'co_await 1;',
      'co_yield 2;',
      'co_return 3;'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the three distinctive C++20 coroutine keywords:',
    h: 'Comment, co_await, co_yield, co_return.',
    explanation: 'A function becomes a C++20 coroutine if it uses `co_await`, `co_yield`, or `co_return`.'
  },
  // FINAL BOSS: Level 51
  {
    t: 'THE ZERO COST COMPILER',
    isBoss: true,
    isFinalBoss: true,
    name: 'THE ZERO COST COMPILER',
    hp: 1200,
    avatar: '👑',
    story: 'THE SUPREME SOVEREIGN OF HIGH-PERFORMANCE C++! It rules register allocators, template meta-programs, SIMD vectorizers, and the ISO C++ Standard. Defeat it for C++ Mastery!',
    phases: [
      {
        q: 'PHASE 1: Sovereign tests Zero-Overhead Principle! What is Stroustrup\'s definition of the "Zero-Overhead Principle"?',
        opts: [
          'What you don\'t use, you don\'t pay for; and what you do use, you couldn\'t hand code any better',
          'Programs must use zero bytes of memory',
          'All software should be open source and free',
          'Compilation must take 0 seconds'
        ],
        a: 0,
        explanation: 'Bjarne Stroustrup\'s Zero-Overhead Principle: "What you don\'t use, you don\'t pay for. What you do use, you couldn\'t hand-code any better."'
      },
      {
        q: 'PHASE 2: Sovereign tests consteval (C++20)! How does consteval differ from constexpr?',
        opts: [
          'consteval functions MUST be evaluated at compile time; runtime invocation is a compiler error',
          'consteval only runs on GPU',
          'consteval is for pointers only',
          'There is no difference'
        ],
        a: 0,
        explanation: '`consteval` specifies an immediate function: every call to the function must produce a compile-time constant, or compilation fails.'
      },
      {
        q: 'PHASE 3: Sovereign queries UB! What does Undefined Behavior (UB) empower an optimizing C++ compiler to do?',
        opts: [
          'Assume the undefined condition never occurs, optimizing away checks and dead code based on that assumption',
          'Throw a runtime warning and continue safely',
          'Automatically fix the code',
          'Halt the compiler'
        ],
        a: 0,
        explanation: 'Optimizing compilers assume UB will never occur. If your code triggers UB, the compiler may optimize away checks, reorder instructions, or produce arbitrary binary behavior.'
      },
      {
        q: 'PHASE 4: Sovereign tests std::variant and std::optional! Which C++17 class represents a type-safe union of alternative types?',
        opts: ['std::variant', 'std::optional', 'std::any', 'std::union_t'],
        a: 0,
        explanation: '`std::variant<Types...>` is a type-safe, exception-safe tagged union holding one of its specified alternative types at a time.'
      },
      {
        q: 'PHASE 5: MASTER STRIKE! Which C++20 standard library feature provides lightweight, non-owning, zero-allocation views over contiguous memory?',
        opts: ['std::span', 'std::string_view', 'std::vector_view', 'std::slice'],
        a: 0,
        explanation: '`std::span` (C++20) represents a contiguous sequence of objects with zero memory allocation, generalizing `std::string_view` to arbitrary data.'
      }
    ]
  }
];
