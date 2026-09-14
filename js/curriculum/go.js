/**
 * GLITCH RUNNER - GO (GOLANG) CURRICULUM (51 LEVELS)
 * Areas:
 * Area 1: Gopher Gateway (Lv 1-8, Boss: THE UNCHECKED ERROR)
 * Area 2: Slice Swamp (Lv 9-16, Boss: THE SLICE CAPACITY MONSTER)
 * Area 3: Struct Sanctum (Lv 17-24, Boss: THE INTERFACE SHADOW)
 * Area 4: Goroutine Grove (Lv 25-32, Boss: THE RACE CONDITION DEMON)
 * Area 5: Channel Canyon (Lv 33-40, Boss: THE BLOCKED CHANNEL TITAN)
 * Area 6: Context Citadel (Lv 41-48, Boss: THE TIMEOUT SPECTRE)
 * Area 7: Cloud Nexus (Lv 49-51, Final Boss: THE CONCURRENCY GOD)
 */

window.CURRICULUM_DATA = window.CURRICULUM_DATA || {};

window.CURRICULUM_DATA.go = [
  // =========================================================================
  // AREA 1: GOPHER GATEWAY (Lv 1-8) - FOUNDATION & TYPES
  // =========================================================================
  {
    t: 'Go Package Main & Println',
    c: 'Executable Go programs belong to package main and use fmt.Println() for output.',
    m: 'glitch',
    code: `package app // Bug: Executable programs must be package main!\nimport "fmt"\nfunc main() {\n    fmt.Println("GOPHER ONLINE")\n}`,
    q: 'BUG HUNTER: The go compiler refuses to build an executable without package main. Fix the package declaration:',
    opts: [
      'package main',
      'package root',
      'package executable',
      'package system'
    ],
    a: 0,
    h: 'Executable Go programs must declare package main.',
    explanation: 'In Go, executable entry points require `package main`. Any other package name compiles as a library without an executable binary.'
  },
  {
    t: 'Short Variable Declaration (:=)',
    c: 'The := short declaration syntax declares and initializes a variable with inferred type inside functions.',
    m: 'runner',
    code: `energy := 100\nenergy -= 20\nfmt.Println(energy)`,
    q: 'SPEED RUN: What operator declares and initializes a variable without explicitly naming its type in Go?',
    opts: [
      ':=',
      '=',
      'var',
      'let'
    ],
    a: 0,
    h: 'Use the := operator.',
    explanation: 'The `:=` syntax is shorthand for declaring a variable with inferred type inside a function.'
  },
  {
    t: 'Multiple Return Values',
    c: 'Go functions can return multiple values, standardly used for returning (result, error) pairs.',
    m: 'detective',
    code: `func divide(a, b int) (int, bool) {\n    if b == 0 { return 0, false }\n    return a / b, true\n}\n// Calling: val, ok := divide(10, 2)`,
    q: 'OUTPUT DETECTIVE: What values are bound to val and ok for divide(10, 2)?',
    opts: [
      'val=5, ok=true',
      'val=5, ok=false',
      'val=0, ok=true',
      'Compilation Error'
    ],
    a: 0,
    h: '10 / 2 = 5, and b != 0 so ok is true.',
    explanation: '10 divided by 2 is 5, and since division was valid, `ok` is `true`. Result: `val=5, ok=true`.'
  },
  {
    t: 'The Blank Identifier (_)',
    c: 'The blank identifier _ discards unwanted return values; Go forbids unused declared variables.',
    m: 'detective',
    code: `func coords() (int, int) { return 100, 200 }\nval, _ := coords()\nfmt.Println(val)`,
    q: 'OUTPUT DETECTIVE: What is printed by fmt.Println(val)?',
    opts: [
      '100',
      '200',
      '100, 200',
      'Compilation Error: unused variable'
    ],
    a: 0,
    h: 'The first value is 100, and the second is discarded by _.',
    explanation: '`val` captures the first return value `100`, while the second value `200` is discarded using `_`, satisfying Go\'s unused variable rule.'
  },
  {
    t: 'Standard Go Program Structure',
    c: 'Package declaration, imports, and main function form the basic Go application.',
    m: 'builder',
    codeBlocks: [
      'package main',
      'import "fmt"',
      'func main() {',
      '    core := "ALPHA"',
      '    fmt.Println("Core:", core)',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the valid Go program executable structure:',
    h: 'package main, import "fmt", func main(), variable declaration, print statement, close brace.',
    explanation: 'Go enforces clean file structure: package declaration first, followed by imports, and top-level function declarations.'
  },
  {
    t: 'Explicit Error Handling Pattern',
    c: 'Go uses explicit error returns rather than exceptions; if err != nil checks for failure.',
    m: 'completion',
    code: `res, err := doOperation()\nif err ___ nil {\n    fmt.Println("Error:", err)\n    return\n}`,
    q: 'CODE COMPLETION: Choose the standard Go idiom for checking if an error occurred:',
    opts: [
      '!=',
      '==',
      '>',
      'is'
    ],
    a: 0,
    h: 'If err is not equal to nil, an error occurred: if err != nil.',
    explanation: 'The ubiquitous Go error check pattern is `if err != nil`, which verifies whether a function returned an error.'
  },
  {
    t: 'Zero Values in Go',
    c: 'Variables declared without an explicit initial value are automatically assigned their type\'s zero value (0, false, "").',
    m: 'detective',
    code: `var count int\nvar flag bool\nvar name string\nfmt.Printf("%d %t %q", count, flag, name)`,
    q: 'OUTPUT DETECTIVE: What zero values are printed for uninitialized int, bool, and string?',
    opts: [
      '0 false ""',
      'nil nil nil',
      'undefined undefined undefined',
      'Compilation Error'
    ],
    a: 0,
    h: 'int is 0, bool is false, string is "" (empty string).',
    explanation: 'In Go, uninitialized variables receive deterministic zero values: `0` for numbers, `false` for booleans, and `""` for strings.'
  },
  // BOSS 1: Level 8
  {
    t: 'THE UNCHECKED ERROR',
    isBoss: true,
    name: 'THE UNCHECKED ERROR',
    hp: 500,
    avatar: '👾',
    story: 'A corrupted anomaly in Gopher Gateway, born from ignored error returns and unhandled nil pointers!',
    phases: [
      {
        q: 'PHASE 1: Anomaly tests unused variable rules! What does the Go compiler do if a local variable is declared but never read?',
        opts: [
          'Throws a compilation error (Go forbids unused local variables)',
          'Emits a warning and compiles normally',
          'Deletes the variable at runtime',
          'Zeros the variable'
        ],
        a: 0,
        explanation: 'The Go compiler strictly forbids unused local variables or unused package imports to prevent dead code buildup, failing compilation.'
      },
      {
        q: 'PHASE 2: Anomaly tests exported identifier rules! How does Go designate whether a function or struct field is public (exported) outside its package?',
        opts: [
          'The identifier starts with a Capital letter (e.g. Println vs print)',
          'Using the public keyword',
          'Using an export prefix',
          'In a package.json file'
        ],
        a: 0,
        explanation: 'In Go, capitalization determines visibility: identifiers starting with an uppercase letter are exported (public); lowercase are package-private.'
      },
      {
        q: 'PHASE 3: Anomaly queries error interface! What method must a type implement to satisfy the built-in error interface?',
        opts: ['Error() string', 'GetMessage() string', 'String() string', 'ToString()'],
        a: 0,
        explanation: 'The built-in `error` interface consists of a single method: `Error() string`.'
      },
      {
        q: 'PHASE 4: Anomaly tests rune data type! What is a rune in Go?',
        opts: [
          'An alias for int32 representing a single Unicode code point',
          'An alias for byte',
          'A special cryptographic key',
          'A floating point number'
        ],
        a: 0,
        explanation: 'In Go, `rune` is an alias for `int32` and represents an individual Unicode code point.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which tool in the standard Go toolchain automatically formats code to official standards?',
        opts: ['gofmt (or go fmt)', 'golint', 'gostyle', 'goclean'],
        a: 0,
        explanation: '`gofmt` is Go\'s official code formatter that automatically standardizes indentation, spacing, and layout across the ecosystem.'
      }
    ]
  },

  // =========================================================================
  // AREA 2: SLICE SWAMP (Lv 9-16) - SLICES & ARRAYS
  // =========================================================================
  {
    t: 'Arrays vs Slices in Go',
    c: 'Arrays [N]T have a fixed compile-time size; Slices []T are dynamic views over an underlying array.',
    m: 'glitch',
    code: `var arr [3]int = [3]int{1, 2, 3}\n// arr = append(arr, 4); // Bug: Cannot append to a fixed array!`,
    q: 'BUG HUNTER: Arrays cannot change length. What type declaration creates a dynamically resizable slice?',
    opts: [
      '[]int (slice with no length in brackets)',
      '[dynamic]int',
      'slice<int>',
      'Vector[int]'
    ],
    a: 0,
    h: 'A slice omits the length in the brackets: []int.',
    explanation: '`[3]int` is a fixed array; omitting the number `[]int` creates a slice that can be dynamically expanded using `append()`.'
  },
  {
    t: 'The append() Built-In Function',
    c: 'append(slice, elements...) appends elements to a slice, returning an updated slice header.',
    m: 'runner',
    code: `s := []int{10, 20}\ns = append(s, 30)\nfmt.Println(len(s))`,
    q: 'SPEED RUN: What is len(s) after appending 30?',
    opts: [
      '3',
      '2',
      '30',
      '0'
    ],
    a: 0,
    h: 'Two elements plus one appended element equals 3.',
    explanation: '`append(s, 30)` appends 30 to `[10, 20]`, producing `[10, 20, 30]` with length 3.'
  },
  {
    t: 'Slice Length vs Capacity',
    c: 'len(s) is the number of elements; cap(s) is the capacity of the underlying array from the slice start.',
    m: 'detective',
    code: `s := make([]int, 2, 5)\nfmt.Printf("len=%d cap=%d", len(s), cap(s))`,
    q: 'OUTPUT DETECTIVE: make([]int, 2, 5) allocates length 2 and capacity 5. What is printed?',
    opts: [
      '"len=2 cap=5"',
      '"len=5 cap=2"',
      '"len=2 cap=2"',
      '"len=0 cap=5"'
    ],
    a: 0,
    h: 'First argument is length, second is capacity.',
    explanation: '`make([]T, len, cap)` sets initial length to 2 and preallocates capacity for 5 elements, printing "len=2 cap=5".'
  },
  {
    t: 'Slice Sub-Slicing (Half-Open Range)',
    c: 's[low:high] creates a slice from index low up to (not including) index high.',
    m: 'detective',
    code: `nums := []int{10, 20, 30, 40}\nsub := nums[1:3]\nfmt.Println(sub[0], sub[1])`,
    q: 'OUTPUT DETECTIVE: nums[1:3] extracts index 1 and 2. What are sub[0] and sub[1]?',
    opts: [
      '20 30',
      '10 20',
      '30 40',
      '20 40'
    ],
    a: 0,
    h: 'Index 1 is 20, index 2 is 30.',
    explanation: '`nums[1:3]` extracts `[20, 30]`. `sub[0]` is 20 and `sub[1]` is 30.'
  },
  {
    t: 'Slice Creation with Make Assembly',
    c: 'Preallocating slice capacity with make avoids repeated reallocations.',
    m: 'builder',
    codeBlocks: [
      's := make([]int, 0, 3)',
      's = append(s, 100)',
      's = append(s, 200)',
      'fmt.Println("len:", len(s))'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the slice preallocation and append pipeline:',
    h: 'make slice with len 0 cap 3, append 100, append 200, print len.',
    explanation: 'Preallocating capacity with `make([]int, 0, 3)` prevents memory reallocation while appending elements.'
  },
  {
    t: 'The copy() Built-In Function',
    c: 'copy(dst, src) copies elements from src to dst up to min(len(dst), len(src)).',
    m: 'completion',
    code: `src := []int{1, 2, 3}\ndst := make([]int, 2)\n___(dst, src)\nfmt.Println(dst); // prints [1, 2]`,
    q: 'CODE COMPLETION: Choose the built-in function that copies slice elements:',
    opts: [
      'copy',
      'clone',
      'duplicate',
      'sliceCopy'
    ],
    a: 0,
    h: 'Use the copy(dst, src) function.',
    explanation: '`copy(dst, src)` copies elements from the source slice into the destination slice.'
  },
  {
    t: 'Slices Share Underlying Memory',
    c: 'Sub-slices reference the same underlying backing array; modifying one alters the other!',
    m: 'detective',
    code: `orig := []int{1, 2, 3}\nsub := orig[1:3]\nsub[0] = 99\nfmt.Println(orig[1])`,
    q: 'OUTPUT DETECTIVE: Modifying sub[0] updates orig[1]! What is orig[1]?',
    opts: [
      '99',
      '2',
      '1',
      'Compilation Error'
    ],
    a: 0,
    h: 'sub points to the same backing array: sub[0] IS orig[1].',
    explanation: 'Because slices are headers pointing to an underlying array, modifying `sub[0]` mutates `orig[1]` to 99.'
  },
  // BOSS 2: Level 16
  {
    t: 'THE SLICE CAPACITY MONSTER',
    isBoss: true,
    name: 'THE SLICE CAPACITY MONSTER',
    hp: 600,
    avatar: '👾',
    story: 'A gluttonous beast dwelling in Slice Swamp, triggering massive array reallocations and memory bloat!',
    phases: [
      {
        q: 'PHASE 1: Monster tests slice growth strategy! What happens to slice capacity when append exceeds current capacity?',
        opts: [
          'Go allocates a new, larger backing array (typically doubling capacity) and copies existing elements',
          'Throws an ArrayOverflowPanic',
          'Drops the oldest element to make room',
          'Capacity never changes'
        ],
        a: 0,
        explanation: 'When capacity is exceeded, `append` allocates a new backing array (roughly doubling capacity for small slices) and copies elements.'
      },
      {
        q: 'PHASE 2: Monster queries slice header composition! What three fields comprise a slice header in the Go runtime?',
        opts: [
          'Pointer to underlying array, Length (int), and Capacity (int)',
          'Pointer, Hash, and Type',
          'Array, ReadIndex, WriteIndex',
          'Head, Tail, Size'
        ],
        a: 0,
        explanation: 'In the Go runtime (`reflect.SliceHeader`), a slice is a 24-byte struct (on 64-bit) containing `Data uintptr`, `Len int`, and `Cap int`.'
      },
      {
        q: 'PHASE 3: Monster tests three-index slicing! What does s[1:3:4] set as the capacity of the resulting slice?',
        opts: [
          'Capacity is 4 - 1 = 3',
          'Capacity is 4',
          'Capacity is 1',
          'SyntaxError'
        ],
        a: 0,
        explanation: 'Three-index slicing `s[low:high:max]` restricts capacity to `max - low` (here `4 - 1 = 3`), protecting the remaining backing array.'
      },
      {
        q: 'PHASE 4: Monster tests nil slice vs empty slice! What is the difference between var s []int (nil) and s := []int{} (empty)?',
        opts: [
          'var s is nil (Data pointer is 0x0); []int{} is non-nil with a zero-length allocation',
          'var s cannot be appended to',
          '[]int{} has capacity 10',
          'They are identical in all contexts'
        ],
        a: 0,
        explanation: 'A `nil` slice has no backing allocation (`s == nil` is true); an empty slice `[]int{}` is non-nil, though both have length and capacity 0.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! How do you append another entire slice other to slice s using variadic expansion?',
        opts: [
          's = append(s, other...)',
          's = append(s, other)',
          's = s.concat(other)',
          's += other'
        ],
        a: 0,
        explanation: 'Appending a slice requires the `...` unpack operator: `s = append(s, other...)`.'
      }
    ]
  },

  // =========================================================================
  // AREA 3: STRUCT SANCTUM (Lv 17-24) - STRUCTS & MAPS
  // =========================================================================
  {
    t: 'Go Struct Definition',
    c: 'type Name struct defines custom composite data structures in Go.',
    m: 'glitch',
    code: `class Drone {\n    Model string\n    Power int\n}`,
    q: 'BUG HUNTER: C++ / Java class keyword used in Go code. What keywords define a struct in Go?',
    opts: [
      'type Drone struct',
      'struct Drone',
      'typedef struct Drone',
      'record Drone'
    ],
    a: 0,
    h: 'In Go, custom types use: type Name struct { ... }.',
    explanation: 'Go uses `type Name struct { ... }` to declare custom structures. Go does not have a `class` keyword.'
  },
  {
    t: 'Methods with Pointer vs Value Receivers',
    c: 'Pointer receiver (p *Type) allows modifying the receiver; value receiver (p Type) receives a copy.',
    m: 'runner',
    code: `type Operative struct { HP int }\nfunc (o *Operative) Heal(amt int) {\n    o.HP += amt\n}\nop := Operative{HP: 50}\nop.Heal(50)\nfmt.Println(op.HP)`,
    q: 'SPEED RUN: Because Heal uses a pointer receiver (*Operative), what is op.HP after heal(50)?',
    opts: [
      '100',
      '50',
      '0',
      'Compilation Error'
    ],
    a: 0,
    h: 'The pointer receiver modifies the original struct: 50 + 50 = 100.',
    explanation: 'A pointer receiver `(o *Operative)` operates directly on the original struct in memory, updating `HP` to 100.'
  },
  {
    t: 'Go Hash Maps (map[K]V)',
    c: 'Maps store unordered key-value pairs; created using make(map[K]V) or map literals.',
    m: 'detective',
    code: `ammo := map[string]int{\n    "ROCKET": 5,\n    "LASER":  100,\n}\nfmt.Println(ammo["ROCKET"])`,
    q: 'OUTPUT DETECTIVE: What value is mapped to key "ROCKET"?',
    opts: [
      '5',
      '100',
      '0',
      'nil'
    ],
    a: 0,
    h: 'Key "ROCKET" has value 5.',
    explanation: '`ammo["ROCKET"]` retrieves the mapped integer value `5`.'
  },
  {
    t: 'Map Comma-OK Idiom',
    c: 'val, ok := m[key] checks whether a key is actually present in the map.',
    m: 'detective',
    code: `nodes := map[string]int{"A": 10}\nval, exists := nodes["B"]\nfmt.Printf("%d %t", val, exists)`,
    q: 'OUTPUT DETECTIVE: Key "B" does not exist! What are val (zero value) and exists (boolean)?',
    opts: [
      '0 false',
      '0 true',
      'nil false',
      'Panic: key not found'
    ],
    a: 0,
    h: 'Missing keys return the zero value (0 for int) and exists = false.',
    explanation: 'The comma-ok idiom returns the type\'s zero value (`0`) for missing keys and sets `exists` to `false` without panicking.'
  },
  {
    t: 'Struct Embedding (Composition over Inheritance)',
    c: 'Go uses struct composition (embedding) instead of class inheritance.',
    m: 'builder',
    codeBlocks: [
      'type BaseUnit struct { ID int }',
      'type Cyborg struct {',
      '    BaseUnit',
      '    CyberLevel int',
      '}',
      'c := Cyborg{BaseUnit: BaseUnit{ID: 7}, CyberLevel: 3}',
      'fmt.Println(c.ID)'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    q: 'CODE BUILDER: Assemble the Go struct embedding and promoted field access:',
    h: 'BaseUnit struct, Cyborg embedding BaseUnit, instantiate Cyborg, print promoted field c.ID.',
    explanation: 'Embedding `BaseUnit` inside `Cyborg` promotes `ID` so it can be accessed directly as `c.ID`.'
  },
  {
    t: 'The delete() Built-In for Maps',
    c: 'delete(map, key) removes the specified key and its associated value from a map.',
    m: 'completion',
    code: `cache := map[string]int{"OLD": 1}\n___(cache, "OLD"); // remove key`,
    q: 'CODE COMPLETION: Choose the built-in function to remove an entry from a map:',
    opts: [
      'delete',
      'remove',
      'drop',
      'unset'
    ],
    a: 0,
    h: 'Use delete(map, key).',
    explanation: '`delete(m, key)` deletes the key-value pair from the map. If the key is absent, it is a safe no-op.'
  },
  {
    t: 'Struct Field Tags for JSON',
    c: 'Field tags `json:"name"` annotate struct fields to control serialization.',
    m: 'detective',
    code: `type User struct {\n    Name string \`json:"username"\`\n}`,
    q: 'OUTPUT DETECTIVE: What JSON key name will encoding/json emit for Name?',
    opts: [
      '"username"',
      '"Name"',
      '"USER_NAME"',
      'None'
    ],
    a: 0,
    h: 'The tag `json:"username"` dictates the serialized key name.',
    explanation: 'The struct tag `` `json:"username"` `` instructs Go\'s `encoding/json` package to serialize the field as `"username"`.'
  },
  // BOSS 3: Level 24
  {
    t: 'THE INTERFACE SHADOW',
    isBoss: true,
    name: 'THE INTERFACE SHADOW',
    hp: 700,
    avatar: '👥',
    story: 'An elusive phantom in Struct Sanctum, testing implicit interface contracts and duck typing!',
    phases: [
      {
        q: 'PHASE 1: Shadow tests interface satisfaction! How does a struct implement an interface in Go?',
        opts: [
          'Implicitly, by implementing all methods declared in the interface (no implements keyword)',
          'Explicitly with the implements keyword',
          'Using an inherits tag',
          'By registering with the runtime'
        ],
        a: 0,
        explanation: 'Go uses implicit duck typing: if a type implements all methods defined by an interface, it automatically implements that interface.'
      },
      {
        q: 'PHASE 2: Shadow tests the empty interface! What does any (or interface{}) represent in Go?',
        opts: [
          'An interface with zero methods, satisfied by literally any value in Go',
          'A null pointer only',
          'A void function',
          'An empty struct'
        ],
        a: 0,
        explanation: 'The empty interface `interface{}` (aliased as `any` in Go 1.18+) has zero methods, meaning all types satisfy it.'
      },
      {
        q: 'PHASE 3: Shadow tests map concurrency safety! Are standard Go maps safe for concurrent reads and writes by multiple goroutines?',
        opts: [
          'No, concurrent read/write to standard maps causes a fatal runtime crash (fatal error: concurrent map writes)',
          'Yes, Go maps are always thread-safe',
          'Only if keys are integers',
          'Only on 64-bit systems'
        ],
        a: 0,
        explanation: 'Go maps are not thread-safe. Concurrent writes trigger a fatal runtime crash; use `sync.RWMutex` or `sync.Map` for concurrent access.'
      },
      {
        q: 'PHASE 4: Shadow tests unexported struct fields in JSON! Will json.Marshal serialize lowercase unexported fields?',
        opts: [
          'No, unexported (lowercase) fields are ignored by json.Marshal',
          'Yes, if they have tags',
          'Yes, by default',
          'It throws an error'
        ],
        a: 0,
        explanation: 'Because external packages like `encoding/json` cannot access unexported fields, only uppercase (exported) fields are serialized.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What happens when you read a non-existent key from a map without comma-ok: val := m["missing"]?',
        opts: [
          'Returns the zero value for the map\'s value type without panicking',
          'Panics with KeyNotFound',
          'Returns nil',
          'Returns -1'
        ],
        a: 0,
        explanation: 'Reading a missing map key in Go returns the zero value of the value type (e.g. 0 for ints, "" for strings).'
      }
    ]
  },

  // =========================================================================
  // AREA 4: GOROUTINE GROVE (Lv 25-32) - GOROUTINES & SYNC
  // =========================================================================
  {
    t: 'Launching Goroutines (go keyword)',
    c: 'The go keyword launches a lightweight concurrent thread of execution managed by the Go runtime.',
    m: 'glitch',
    code: `spawnWorker(7) // Synchronous call! Run concurrently with go keyword!`,
    q: 'BUG HUNTER: Prefix the function invocation with the keyword to run it concurrently as a goroutine:',
    opts: [
      'go spawnWorker(7)',
      'async spawnWorker(7)',
      'thread spawnWorker(7)',
      'fork spawnWorker(7)'
    ],
    a: 0,
    h: 'Use the go keyword.',
    explanation: 'Prefixing any function call with `go` starts execution concurrently in a new goroutine.'
  },
  {
    t: 'sync.WaitGroup Synchronization',
    c: 'sync.WaitGroup waits for a collection of goroutines to finish: Add() increments, Done() decrements, Wait() blocks.',
    m: 'runner',
    code: `var wg sync.WaitGroup\nwg.Add(1)\ngo func() {\n    defer wg.Done()\n    // do work\n}()\nwg.Wait()`,
    q: 'SPEED RUN: What method on WaitGroup is called by a goroutine when it completes its task?',
    opts: [
      'wg.Done()',
      'wg.Finish()',
      'wg.Complete()',
      'wg.Stop()'
    ],
    a: 0,
    h: 'Call wg.Done() to signal completion.',
    explanation: '`wg.Done()` decrements the `WaitGroup` counter by 1. When the counter reaches 0, `wg.Wait()` unblocks.'
  },
  {
    t: 'Goroutine Anonymous Closure Capture',
    c: 'Passing loop variables as parameters to goroutines prevents the classic closure data race gotcha.',
    m: 'detective',
    code: `for i := 1; i <= 3; i++ {\n    go func(n int) {\n        // n receives a unique copy\n    }(i)\n}`,
    q: 'OUTPUT DETECTIVE: Why is passing i as a parameter (n int) to the goroutine essential?',
    opts: [
      'It ensures each goroutine gets a copy of i at that iteration rather than sharing the mutating loop variable',
      'It makes the goroutine run 3x faster',
      'Goroutines cannot access outer variables',
      'Required by Go compiler'
    ],
    a: 0,
    h: 'Passing i as an argument captures its value at that iteration.',
    explanation: 'Passing `i` as parameter `n` copies the current loop value, avoiding race conditions where all goroutines observe the loop\'s final value.'
  },
  {
    t: 'sync.Mutex Mutual Exclusion',
    c: 'sync.Mutex protects shared data from simultaneous read/write corruption using Lock() and Unlock().',
    m: 'builder',
    codeBlocks: [
      'var mu sync.Mutex',
      'count := 0',
      'mu.Lock()',
      'count++',
      'mu.Unlock()',
      'fmt.Println(count)'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the thread-safe mutex counter update pattern:',
    h: 'Declare mu, initialize count, lock mutex, increment count, unlock mutex, print count.',
    explanation: 'Calling `mu.Lock()` ensures exclusive access to `count++`, and `mu.Unlock()` releases the lock.'
  },
  {
    t: 'Detecting Races with -race',
    c: 'The Go compiler includes a built-in data race detector enabled via the -race flag.',
    m: 'completion',
    code: `// Command to test for data races:\n// go test ___\n// go run ___ main.go`,
    q: 'CODE COMPLETION: Choose the flag that enables the thread race detector in Go:',
    opts: [
      '-race',
      '-check',
      '-safe',
      '-sanitize'
    ],
    a: 0,
    h: 'Use the -race flag.',
    explanation: 'The `-race` flag compiles Go binaries with race detection instrumentation, reporting unsynchronized concurrent access.'
  },
  {
    t: 'sync.Once Lazy Initialization',
    c: 'sync.Once guarantees that a function executes exactly once, even across concurrent goroutines.',
    m: 'detective',
    code: `var once sync.Once\ninitFn := func() { fmt.Println("INIT") }\nonce.Do(initFn)\nonce.Do(initFn)`,
    q: 'OUTPUT DETECTIVE: once.Do() is called twice with initFn. How many times is "INIT" printed?',
    opts: [
      '1',
      '2',
      '0',
      'Compilation Error'
    ],
    a: 0,
    h: 'sync.Once executes the function only once.',
    explanation: '`sync.Once.Do` guarantees that the passed function is called exactly once. Subsequent invocations are ignored.'
  },
  {
    t: 'Goroutine Stack Size Footprint',
    c: 'Goroutines begin with tiny 2KB stacks that grow and shrink dynamically on the heap as needed.',
    m: 'detective',
    code: `// A Go goroutine initial stack size is only ~2KB (vs 1-8MB for OS threads).`,
    q: 'OUTPUT DETECTIVE / ARCHITECTURE: Why can a single Go program run hundreds of thousands of concurrent goroutines?',
    opts: [
      'Goroutines have minuscule initial stacks (~2KB) multiplexed onto a few OS threads',
      'They don\'t use memory',
      'They run in the browser',
      'They use hardware GPUs'
    ],
    a: 0,
    h: 'Small ~2KB initial stack size allows high scalability.',
    explanation: 'Unlike OS threads that allocate several megabytes of stack, goroutines start at ~2KB, enabling programs to spawn millions concurrently.'
  },
  // BOSS 4: Level 32
  {
    t: 'THE RACE CONDITION DEMON',
    isBoss: true,
    name: 'THE RACE CONDITION DEMON',
    hp: 800,
    avatar: '👹',
    story: 'A chaotic demon in Goroutine Grove, scrambling shared memory states and unsynchronized data writes!',
    phases: [
      {
        q: 'PHASE 1: Demon tests Data Race conditions! What constitutes a data race in Go?',
        opts: [
          'Two goroutines accessing the same memory location concurrently, where at least one is a write, without synchronization',
          'Two loops running at the same speed',
          'Using goroutines without channels',
          'Having more than 4 CPU cores'
        ],
        a: 0,
        explanation: 'A data race occurs when two or more goroutines access the same memory address concurrently, at least one access is a write, and there is no synchronization.'
      },
      {
        q: 'PHASE 2: Demon tests atomic package! What package provides low-level lock-free atomic primitives in Go?',
        opts: ['sync/atomic', 'sync/mutex', 'runtime/atomic', 'os/atomic'],
        a: 0,
        explanation: '`sync/atomic` provides lock-free memory primitives like `atomic.AddInt64()` and `atomic.LoadPointer()`.'
      },
      {
        q: 'PHASE 3: Demon tests RWMutex! What is the advantage of sync.RWMutex over a standard sync.Mutex?',
        opts: [
          'Allows multiple simultaneous concurrent readers (RLock) while granting exclusive access to writers (Lock)',
          'Uses 0 bytes of memory',
          'Prevents deadlocks automatically',
          'Runs in hardware registers'
        ],
        a: 0,
        explanation: '`sync.RWMutex` allows any number of concurrent readers to hold `RLock()` simultaneously, blocking only for exclusive `Lock()` writers.'
      },
      {
        q: 'PHASE 4: Demon tests goroutine leaks! What causes a goroutine leak?',
        opts: [
          'A goroutine blocked forever waiting on a channel that is never sent to or closed',
          'Using too many functions',
          'Running a goroutine without an import',
          'Using fmt.Println'
        ],
        a: 0,
        explanation: 'A goroutine leak occurs when a goroutine remains blocked indefinitely (e.g. waiting on a channel with no sender), preventing GC of its stack.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What Go proverb summarizes Go\'s philosophy on communication and concurrency?',
        opts: [
          '"Do not communicate by sharing memory; instead, share memory by communicating."',
          '"Always use mutexes for concurrency."',
          '"Threads are better than channels."',
          '"Write code as fast as possible."'
        ],
        a: 0,
        explanation: 'The famous Go proverb by Rob Pike: "Do not communicate by sharing memory; instead, share memory by communicating."'
      }
    ]
  },

  // =========================================================================
  // AREA 5: CHANNEL CANYON (Lv 33-40) - CHANNELS & SELECT
  // =========================================================================
  {
    t: 'Unbuffered Channel Communication',
    c: 'Channels connect concurrent goroutines; unbuffered channels block until both sender and receiver are ready.',
    m: 'glitch',
    code: `ch := make(chan int)\nch <- 42 // Bug: Deadlock! No goroutine is receiving from unbuffered ch!`,
    q: 'BUG HUNTER: Sending to an unbuffered channel blocks until a receiver is ready. How do you run the send concurrently?',
    opts: [
      'go func() { ch <- 42 }()',
      'ch <- 42 async',
      'send(ch, 42)',
      'ch.Post(42)'
    ],
    a: 0,
    h: 'Send in a background goroutine: go func() { ch <- 42 }().',
    explanation: 'An unbuffered channel requires both sender and receiver to synchronize. Sending without a ready receiver deadlocks the main thread unless run in a goroutine.'
  },
  {
    t: 'Buffered Channels',
    c: 'make(chan T, capacity) creates a buffered channel that accepts capacity elements without blocking.',
    m: 'runner',
    code: `ch := make(chan int, 2)\nch <- 10\nch <- 20\nfmt.Println(<-ch)`,
    q: 'SPEED RUN: What is the first value read from the channel (<-ch)?',
    opts: [
      '10 (FIFO order)',
      '20',
      '0',
      'Deadlock'
    ],
    a: 0,
    h: 'Channels are First-In, First-Out (FIFO) queues: 10 was sent first.',
    explanation: 'Channels operate as FIFO queues. Reading `<-ch` pulls the first inserted element, `10`.'
  },
  {
    t: 'Closing Channels (close())',
    c: 'close(ch) signals that no more values will be sent; reading from a closed channel yields zero values.',
    m: 'detective',
    code: `ch := make(chan int, 1)\nch <- 99\nclose(ch)\nval, open := <-ch\nfmt.Println(val, open)`,
    q: 'OUTPUT DETECTIVE: Reading buffered item from closed channel: What are val and open?',
    opts: [
      '99 true',
      '99 false',
      '0 false',
      'Panic'
    ],
    a: 0,
    h: '99 was in the buffer, so val is 99 and open is true until the buffer empties.',
    explanation: 'Even when closed, buffered elements are read successfully with `open = true`. Only subsequent reads after buffer exhaustion yield `0 false`.'
  },
  {
    t: 'Channel Range Iteration Loop',
    c: 'for v := range ch reads values until the channel is explicitly closed.',
    m: 'builder',
    codeBlocks: [
      'ch := make(chan int, 2)',
      'ch <- 1',
      'ch <- 2',
      'close(ch)',
      'for val := range ch {',
      '    fmt.Print(val)',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    q: 'CODE BUILDER: Assemble the channel send, close, and range iteration pipeline:',
    h: 'make channel, send 1, send 2, close channel, for val := range ch, print val, close loop.',
    explanation: 'Closing the channel is essential before `for val := range ch`, otherwise the loop waits forever for more elements, deadlocking.'
  },
  {
    t: 'The select Statement (Multiplexing Channels)',
    c: 'select lets a goroutine wait on multiple communication operations simultaneously.',
    m: 'completion',
    code: `___ {\ncase msg1 := <-ch1:\n    fmt.Println(msg1)\ncase ch2 <- 100:\n    fmt.Println("sent")\n}`,
    q: 'CODE COMPLETION: Choose the keyword that waits on multiple channel operations:',
    opts: [
      'select',
      'switch',
      'poll',
      'listen'
    ],
    a: 0,
    h: 'Use the select keyword.',
    explanation: '`select` blocks until one of its cases is ready to communicate, then executes that case.'
  },
  {
    t: 'Select with default (Non-Blocking Channel Operations)',
    c: 'A select statement with a default case executes immediately if no channels are ready, preventing blocking.',
    m: 'detective',
    code: `ch := make(chan int)\nselect {\ncase val := <-ch:\n    fmt.Println(val)\ndefault:\n    fmt.Println("EMPTY")\n}`,
    q: 'OUTPUT DETECTIVE: ch has no sender. What branch does select execute?',
    opts: [
      '"EMPTY" (executes default without blocking)',
      'Deadlock panic',
      'Blocks forever',
      'Prints 0'
    ],
    a: 0,
    h: 'default runs immediately when no channel is ready.',
    explanation: 'The `default` clause prevents blocking, executing immediately with `"EMPTY"` when no case is ready.'
  },
  {
    t: 'Channel Timeouts with time.After',
    c: 'time.After(duration) returns a channel that sends the current time after the duration elapses.',
    m: 'detective',
    code: `ch := make(chan string)\nselect {\ncase res := <-ch:\n    fmt.Println(res)\ncase <-time.After(10 * time.Millisecond):\n    fmt.Println("TIMEOUT")\n}`,
    q: 'OUTPUT DETECTIVE: ch receives nothing within 10ms. What is printed?',
    opts: [
      '"TIMEOUT"',
      'Nothing',
      'Deadlock',
      'Panic'
    ],
    a: 0,
    h: 'time.After fires first, taking the timeout branch.',
    explanation: '`time.After` sends on its channel when the timer expires, cleanly implementing timeouts inside `select`.'
  },
  // BOSS 5: Level 40
  {
    t: 'THE BLOCKED CHANNEL TITAN',
    isBoss: true,
    name: 'THE BLOCKED CHANNEL TITAN',
    hp: 900,
    avatar: '🗿',
    story: 'A crystalline behemoth in Channel Canyon, locking goroutines in permanent deadlocks and channel traps!',
    phases: [
      {
        q: 'PHASE 1: Titan tests sending to a closed channel! What occurs if code executes ch <- val on a closed channel?',
        opts: [
          'Panics immediately (panic: send on closed channel)',
          'Silently drops the value',
          'Reopens the channel',
          'Blocks forever'
        ],
        a: 0,
        explanation: 'Sending on a closed channel in Go causes an immediate runtime panic.'
      },
      {
        q: 'PHASE 2: Titan tests closing a closed channel! What occurs if close(ch) is called a second time on the same channel?',
        opts: [
          'Panics immediately (panic: close of closed channel)',
          'Silently ignores the call',
          'Clears the channel buffer',
          'Returns false'
        ],
        a: 0,
        explanation: 'Closing an already-closed channel is a programming bug that triggers a runtime panic.'
      },
      {
        q: 'PHASE 3: Titan tests directional channels! What does func process(ch <-chan int) restrict the channel parameter to?',
        opts: [
          'Receive-only (cannot send to ch inside the function)',
          'Send-only',
          'Read and write allowed',
          'Closed channel only'
        ],
        a: 0,
        explanation: '`<-chan T` indicates a receive-only channel; attempting to send `ch <- 1` is rejected at compile time.'
      },
      {
        q: 'PHASE 4: Titan tests reading from a nil channel! What happens when a goroutine receives from a nil channel: <-(chan int)(nil)?',
        opts: [
          'Blocks forever (used deliberately to disable select cases)',
          'Panics immediately',
          'Returns 0 immediately',
          'Throws NullPointerException'
        ],
        a: 0,
        explanation: 'Reading or writing to a `nil` channel in Go blocks forever. This is often used to disable a `select` arm dynamically.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Who is responsible for closing a channel in Go: the sender or the receiver?',
        opts: [
          'The sender (only the sender should close to signal that no more data will be sent)',
          'The receiver',
          'Both simultaneously',
          'The garbage collector'
        ],
        a: 0,
        explanation: 'Only the sender should close a channel, because sending to a closed channel panics while receiving from one is safe.'
      }
    ]
  },

  // =========================================================================
  // AREA 6: CONTEXT CITADEL (Lv 41-48) - CONTEXT, DEFER & PANIC
  // =========================================================================
  {
    t: 'The defer Keyword (LIFO Execution)',
    c: 'defer pushes a function call onto a stack; deferred calls execute in reverse order when the surrounding function returns.',
    m: 'glitch',
    code: `func task() {\n    defer fmt.Print("1")\n    defer fmt.Print("2")\n}`,
    q: 'OUTPUT DETECTIVE: Deferred calls execute in Last-In, First-Out (LIFO) order! What is printed on return?',
    opts: [
      '"21"',
      '"12"',
      '"1"',
      '"2"'
    ],
    a: 0,
    h: '2 was deferred last, so 2 runs first, then 1.',
    explanation: '`defer` operates as a stack (LIFO). `defer 2` is popped and executes first, followed by `defer 1`, printing "21".'
  },
  {
    t: 'Context Cancellation (context.WithCancel)',
    c: 'context.Context carries deadlines, cancellation signals, and request-scoped values across API boundaries.',
    m: 'runner',
    code: `ctx, cancel := context.WithCancel(context.Background())\ncancel()\nselect {\ncase <-ctx.Done():\n    fmt.Println("CANCELLED")\n}`,
    q: 'SPEED RUN: cancel() closes ctx.Done(). What is printed by the select statement?',
    opts: [
      '"CANCELLED"',
      'Blocks forever',
      'Panic',
      'Nothing'
    ],
    a: 0,
    h: 'Calling cancel() closes the Done() channel.',
    explanation: 'Calling `cancel()` closes `ctx.Done()`, unblocking the `select` case and printing `"CANCELLED"`.'
  },
  {
    t: 'Defer Argument Evaluation Timing',
    c: 'Arguments to deferred functions are evaluated immediately when defer is called, not when the function executes!',
    m: 'detective',
    code: `func trace() {\n    i := 0\n    defer fmt.Println(i)\n    i = 10\n}`,
    q: 'OUTPUT DETECTIVE: i was 0 when defer evaluated! What is printed when trace() returns?',
    opts: [
      '0',
      '10',
      'undefined',
      'Compilation Error'
    ],
    a: 0,
    h: 'Arguments are evaluated at the moment the defer statement is reached.',
    explanation: 'In Go, arguments to a deferred call are evaluated immediately. At the time of `defer`, `i` was `0`, so `0` is printed.'
  },
  {
    t: 'Type Assertions on Interfaces',
    c: 'val, ok := i.(ConcreteType) asserts and extracts the underlying concrete value from an interface.',
    m: 'builder',
    codeBlocks: [
      'var raw any = "GRID-7"',
      'str, ok := raw.(string)',
      'if ok {',
      '    fmt.Println("Verified:", str)',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    q: 'CODE BUILDER: Assemble the safe type assertion extraction pipeline:',
    h: 'Assign any, type assert with raw.(string), if ok check, print verified string, close if.',
    explanation: 'The comma-ok type assertion `str, ok := raw.(string)` safely inspects the interface without panicking.'
  },
  {
    t: 'Panic and Recover Error Handling',
    c: 'panic stops ordinary flow; recover() called inside a deferred function regains control of a panicking goroutine.',
    m: 'completion',
    code: `defer func() {\n    if r := ___(); r != nil {\n        fmt.Println("Recovered from crash:", r)\n    }\n}()\npanic("CRITICAL DISASTER")`,
    q: 'CODE COMPLETION: Choose the built-in function that catches a panic inside a deferred function:',
    opts: [
      'recover',
      'catch',
      'rescue',
      'handle'
    ],
    a: 0,
    h: 'Use the recover() function.',
    explanation: '`recover()` captures the value passed to `panic()` and restores normal execution, but only works when called inside a deferred function.'
  },
  {
    t: 'Context with Timeout (context.WithTimeout)',
    c: 'WithTimeout automatically cancels the context after the specified duration expires.',
    m: 'detective',
    code: `ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)\ndefer cancel() // always release resources!\n<-ctx.Done()\nfmt.Println(ctx.Err())`,
    q: 'OUTPUT DETECTIVE: After 50ms expires, what does ctx.Err() return?',
    opts: [
      'context.DeadlineExceeded',
      'context.Canceled',
      'nil',
      'Panic'
    ],
    a: 0,
    h: 'A timeout returns context.DeadlineExceeded.',
    explanation: 'When a context times out, its `Err()` method returns `context.DeadlineExceeded`.'
  },
  {
    t: 'Type Switches on Interfaces',
    c: 'switch v := i.(type) branches execution based on the concrete dynamic type of an interface.',
    m: 'detective',
    code: `var x any = 42\nswitch v := x.(type) {\ncase int:\n    fmt.Println("Integer:", v)\ncase string:\n    fmt.Println("String:", v)\n}`,
    q: 'OUTPUT DETECTIVE: What branch does x (holding 42) match?',
    opts: [
      '"Integer: 42"',
      '"String: 42"',
      'default',
      'Compilation Error'
    ],
    a: 0,
    h: 'x holds an int (42).',
    explanation: 'The type switch inspects the dynamic type of `x`, matching `case int` and printing `"Integer: 42"`.'
  },
  // BOSS 6: Level 48
  {
    t: 'THE TIMEOUT SPECTRE',
    isBoss: true,
    name: 'THE TIMEOUT SPECTRE',
    hp: 1000,
    avatar: '👻',
    story: 'A phantom haunting Context Citadel, canceling downstream HTTP calls and leaking orphaned goroutines!',
    phases: [
      {
        q: 'PHASE 1: Spectre tests defer cancel() best practice! Why should defer cancel() be called immediately after context.WithCancel?',
        opts: [
          'To release timer and context resources as soon as the function returns, avoiding context leaks',
          'To cancel the operation immediately before it starts',
          'Because the compiler requires it',
          'It has no effect'
        ],
        a: 0,
        explanation: 'Failing to call the `cancel` function leaks the context resources and associated goroutines until the parent context finishes.'
      },
      {
        q: 'PHASE 2: Spectre tests context propagation! How should a context.Context be passed through functions in idiomatic Go?',
        opts: [
          'Explicitly as the very first parameter: func DoWork(ctx context.Context, ...)',
          'Stored inside a struct field',
          'As a global package variable',
          'In thread-local storage'
        ],
        a: 0,
        explanation: 'Official Go conventions state: `context.Context` should be passed explicitly as the first parameter to functions that need it.'
      },
      {
        q: 'PHASE 3: Spectre queries context.WithValue! What should context.WithValue be used for?',
        opts: [
          'Request-scoped metadata (e.g. auth tokens, request IDs, trace headers), NOT optional function parameters',
          'Passing all function arguments',
          'Storing database connections',
          'Caching query results'
        ],
        a: 0,
        explanation: '`context.WithValue` is intended exclusively for transit of request-scoped metadata across process and API boundaries.'
      },
      {
        q: 'PHASE 4: Spectre queries panic across goroutines! What happens if a panic occurs inside a goroutine and is NOT recovered within that goroutine?',
        opts: [
          'The entire application process crashes immediately, terminating all goroutines',
          'Only that single goroutine dies silently',
          'The panic bubbles up to main() automatically',
          'It is logged as a warning'
        ],
        a: 0,
        explanation: 'An unrecovered `panic` in any goroutine crashes the entire process. A `recover()` in `main()` cannot catch panics from other goroutines.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which function in package runtime returns the number of currently active goroutines: runtime.NumGoroutine()?',
        opts: ['runtime.NumGoroutine()', 'runtime.ActiveThreads()', 'runtime.Count()', 'runtime.Goroutines()'],
        a: 0,
        explanation: '`runtime.NumGoroutine()` returns the number of goroutines that currently exist, vital for monitoring goroutine leaks.'
      }
    ]
  },

  // =========================================================================
  // AREA 7: CLOUD NEXUS & MASTER CHALLENGES (Lv 49-51)
  // =========================================================================
  {
    t: 'Go Generics (Go 1.18+)',
    c: 'Type parameters [T any] enable generic data structures and functions in modern Go.',
    m: 'detective',
    code: `func Reverse[T any](s []T) {\n    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {\n        s[i], s[j] = s[j], s[i]\n    }\n}\n// Works with []int, []string, []float64!`,
    q: 'OUTPUT DETECTIVE: What enables Reverse to accept slices of any element type in Go 1.18+?',
    opts: [
      'Type parameters with generic constraints: [T any]',
      'Reflection API',
      'The empty interface only',
      'Preprocessor macros'
    ],
    a: 0,
    h: '[T any] declares a type parameter T.',
    explanation: 'Go 1.18 introduced generics with type parameters `[T any]`, allowing type-safe algorithms across any slice type.'
  },
  {
    t: 'Escape Analysis (Stack vs Heap)',
    c: 'The Go compiler analyzes variable lifecycles; values that outlive their stack frame escape to the heap automatically.',
    m: 'builder',
    codeBlocks: [
      'type Node struct { val int }',
      'func createNode() *Node {',
      '    n := Node{val: 42}',
      '    return &n // n escapes to heap safely!',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    q: 'CODE BUILDER: Assemble the function returning pointer to local variable (heap escape):',
    h: 'Define Node, function createNode returning *Node, initialize n, return &n, close function.',
    explanation: 'Unlike C, returning the address of a local variable in Go is 100% safe: the compiler\'s escape analysis detects it and allocates `n` on the heap.'
  },
  // FINAL BOSS: Level 51
  {
    t: 'THE CONCURRENCY GOD',
    isBoss: true,
    isFinalBoss: true,
    name: 'THE CONCURRENCY GOD',
    hp: 1200,
    avatar: '👑',
    story: 'THE SUPREME ARCHITECT OF CLOUD CONCURRENCY! It rules the Go Runtime Scheduler, the M:N GMP scheduler, network pollers, and memory allocators. Defeat it for Go Mastery!',
    phases: [
      {
        q: 'PHASE 1: God tests the GMP Scheduler model! In Go\'s M:N scheduler, what do G, M, and P represent?',
        opts: [
          'G = Goroutine, M = OS Machine Thread, P = Logical Processor (execution context with run queue)',
          'G = Garbage, M = Memory, P = Pointer',
          'G = Global, M = Main, P = Process',
          'G = Generic, M = Mutex, P = Parallel'
        ],
        a: 0,
        explanation: 'Go\'s scheduler model: `G` is a goroutine, `M` is an OS thread, and `P` is a logical processor holding a local run queue of goroutines.'
      },
      {
        q: 'PHASE 2: God tests Work Stealing! What does an idle logical processor P do when its local run queue is empty?',
        opts: [
          'Steals half the runnable goroutines from another processor\'s run queue',
          'Terminates immediately',
          'Spawns a new OS process',
          'Halts the CPU'
        ],
        a: 0,
        explanation: 'Go uses a work-stealing scheduler: when a processor `P` runs out of work, it attempts to steal half the goroutines from another processor.'
      },
      {
        q: 'PHASE 3: God queries the Network Poller! How does Go handle blocking network I/O without wasting OS threads?',
        opts: [
          'The runtime Network Poller uses epoll/kqueue to park blocked goroutines asynchronously, freeing the OS thread',
          'Spawns 10,000 OS threads',
          'Blocks the entire application until network responds',
          'Transfers network traffic to disk'
        ],
        a: 0,
        explanation: 'Go\'s runtime integrates with OS I/O multiplexers (`epoll`, `kqueue`), detaching blocked goroutines from their thread so the thread can run other work.'
      },
      {
        q: 'PHASE 4: God tests Garbage Collector architecture! What type of garbage collector does modern Go implement?',
        opts: [
          'Non-moving, concurrent, tri-color mark-sweep collector targeting sub-millisecond pause times',
          'Stop-the-world generational copying collector',
          'Reference counting only',
          'Manual free only'
        ],
        a: 0,
        explanation: 'Go employs a concurrent, tri-color mark-sweep collector designed for predictable sub-millisecond STW (stop-the-world) pauses.'
      },
      {
        q: 'PHASE 5: MASTER STRIKE! Which build tag or compiler flag analyzes and prints escape analysis decisions: go build -gcflags="-m"?',
        opts: ['go build -gcflags="-m"', 'go build -escape', 'go build -v', 'go build -race'],
        a: 0,
        explanation: 'Passing `-gcflags="-m"` to `go build` causes the compiler to print optimization diagnostics, including escape analysis decisions.'
      }
    ]
  }
];
