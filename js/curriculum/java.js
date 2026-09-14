/**
 * GLITCH RUNNER - JAVA CURRICULUM (51 LEVELS)
 * Areas:
 * Area 1: Bytecode Gate (Lv 1-8, Boss: THE COMPILER SENTINEL)
 * Area 2: Primitive Plains (Lv 9-16, Boss: THE STRING POOL WRAITH)
 * Area 3: Control Citadel (Lv 17-24, Boss: THE POLYMORPHIC GOLEM)
 * Area 4: Class Sanctuary (Lv 25-32, Boss: THE ENCAPSULATION TITAN)
 * Area 5: Collection Vault (Lv 33-40, Boss: THE HASHMAP SPECTRE)
 * Area 6: Interface Nexus (Lv 41-48, Boss: THE THREAD RACER)
 * Area 7: JVM Core (Lv 49-51, Final Boss: THE ABSTRACT OVERLORD)
 */

window.CURRICULUM_DATA = window.CURRICULUM_DATA || {};

window.CURRICULUM_DATA.java = [
  // =========================================================================
  // AREA 1: BYTECODE GATE (Lv 1-8) - FOUNDATION & TYPES
  // =========================================================================
  {
    t: 'Java Standard Output',
    c: 'System.out.println() prints a line of text to standard output in Java.',
    m: 'glitch',
    code: `public class Main {\n    public static void main(String[] args) {\n        print("OPERATIVE ENGAGED");\n    }\n}`,
    q: 'BUG HUNTER: The print call lacks Java standard I/O library qualification. Fix the call:',
    opts: [
      'System.out.println("OPERATIVE ENGAGED");',
      'console.log("OPERATIVE ENGAGED");',
      'out.printLine("OPERATIVE ENGAGED");',
      'Io.write("OPERATIVE ENGAGED");'
    ],
    a: 0,
    h: 'Java routes console output through System.out.println().',
    explanation: 'In Java, standard console printing requires the `System.out.println()` method.'
  },
  {
    t: 'Java Main Method Signature',
    c: 'The JVM invokes public static void main(String[] args) as the entry point of any standalone Java application.',
    m: 'runner',
    code: `public class Runner {\n    public static void main(String[] args) {\n        // entry point\n    }\n}`,
    q: 'SPEED RUN: What must the return type of the Java main method entry point be?',
    opts: [
      'void',
      'int',
      'boolean',
      'String'
    ],
    a: 0,
    h: 'The JVM expects main() to return void.',
    explanation: 'The JVM requires the standard entry point signature to have a `void` return type: `public static void main(String[] args)`.'
  },
  {
    t: 'Explicit Type Casting',
    c: 'Casting (type) expression converts between incompatible primitive numerical types, truncating fractional values.',
    m: 'detective',
    code: `double raw = 8.75;\nint truncated = (int) raw;\nSystem.out.println(truncated);`,
    q: 'OUTPUT DETECTIVE: What integer is printed when 8.75 is explicitly cast to int?',
    opts: [
      '8',
      '9',
      '8.75',
      'Compilation Error'
    ],
    a: 0,
    h: 'Casting a double to an int truncates the decimal part (drops .75).',
    explanation: 'Casting a `double` to an `int` discards the fractional part completely, yielding `8`.'
  },
  {
    t: 'Final Constant Variables',
    c: 'Variables marked final cannot be reassigned once initialized.',
    m: 'detective',
    code: `final int SHIELD_MAX = 100;\n// SHIELD_MAX = 120; // Compiler Error\nSystem.out.println(SHIELD_MAX);`,
    q: 'OUTPUT DETECTIVE: What is printed for the final constant SHIELD_MAX?',
    opts: [
      '100',
      '120',
      '0',
      'Undefined'
    ],
    a: 0,
    h: 'The value is locked at initialization: 100.',
    explanation: 'The `final` keyword in Java renders primitive variables immutable; reassignment fails compilation.'
  },
  {
    t: 'Java Program Class Assembly',
    c: 'All code in Java must reside inside a class matching the filename.',
    m: 'builder',
    codeBlocks: [
      'public class Program {',
      '    public static void main(String[] args) {',
      '        int sector = 7;',
      '        System.out.println("Sector: " + sector);',
      '    }',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the valid Java executable class file structure:',
    h: 'Class header, main method header, declare sector, print with concatenation, close main, close class.',
    explanation: 'Java requires a class declaration, a main method, inner statements, and matching closing braces.'
  },
  {
    t: 'Long Literal Suffix (L)',
    c: 'Long integer literals exceeding standard 32-bit int bounds require an L or l suffix.',
    m: 'completion',
    code: `long credits = 9000000000___;\nSystem.out.println(credits);`,
    q: 'CODE COMPLETION: Choose the suffix that tells the Java compiler this literal is a 64-bit long:',
    opts: [
      'L',
      'D',
      'F',
      'B'
    ],
    a: 0,
    h: 'Append L (or l) to specify a long literal.',
    explanation: 'Integer literals in Java default to 32-bit `int`. Values exceeding 2,147,483,647 require an `L` suffix to be recognized as `long`.'
  },
  {
    t: 'Char vs String in Java',
    c: 'char stores a single 16-bit Unicode character in single quotes; String is an object in double quotes.',
    m: 'detective',
    code: `char glyph = 'A';\nint ascii = glyph;\nSystem.out.println(ascii);`,
    q: 'OUTPUT DETECTIVE: char implicitly widens to int. What is the ASCII value of \'A\'?',
    opts: [
      '65',
      '97',
      '1',
      '0'
    ],
    a: 0,
    h: 'ASCII/Unicode capital \'A\' has integer code 65.',
    explanation: 'In Java, `char` values automatically widen to `int`. The ASCII/Unicode code point for \'A\' is 65.'
  },
  // BOSS 1: Level 8
  {
    t: 'THE COMPILER SENTINEL',
    isBoss: true,
    name: 'THE COMPILER SENTINEL',
    hp: 500,
    avatar: '🤖',
    story: 'The gatekeeper of Bytecode Gate. It translates .java source into bytecode and enforces strict typing!',
    phases: [
      {
        q: 'PHASE 1: Sentinel tests compiler output! What file extension does the javac compiler produce from .java files?',
        opts: ['.class (bytecode)', '.exe (machine code)', '.jar', '.bin'],
        a: 0,
        explanation: 'The `javac` compiler compiles `.java` source code into intermediate `.class` bytecode files executed by the JVM.'
      },
      {
        q: 'PHASE 2: Sentinel tests primitive size! How many bits does a standard Java int occupy?',
        opts: ['32 bits (4 bytes)', '16 bits (2 bytes)', '64 bits (8 bytes)', '8 bits (1 byte)'],
        a: 0,
        explanation: 'In Java, an `int` is strictly guaranteed to be a 32-bit signed two\'s complement integer on all platforms.'
      },
      {
        q: 'PHASE 3: Sentinel tests primitive default values! What is the default value of an uninitialized boolean instance variable in a class?',
        opts: ['false', 'true', 'null', '0'],
        a: 0,
        explanation: 'Instance and static boolean fields in Java default to `false`.'
      },
      {
        q: 'PHASE 4: Sentinel queries compile error vs runtime exception! Which of these is caught by javac during compilation?',
        opts: [
          'Assigning a String literal to an int variable without conversion',
          'Dividing an int by 0',
          'Accessing an invalid array index',
          'NullPointerException'
        ],
        a: 0,
        explanation: 'Type mismatches (e.g. `int x = "text";`) are static type errors caught at compile time by `javac`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which Java package is automatically imported into every Java program without an explicit import statement?',
        opts: ['java.lang', 'java.util', 'java.io', 'java.net'],
        a: 0,
        explanation: '`java.lang` (containing `String`, `System`, `Math`, `Object`, etc.) is implicitly imported into every compilation unit.'
      }
    ]
  },

  // =========================================================================
  // AREA 2: PRIMITIVE PLAINS (Lv 9-16) - STRINGS & CORE LOGIC
  // =========================================================================
  {
    t: 'String Equality (.equals() vs ==)',
    c: '== compares object memory references; .equals() compares the actual character contents.',
    m: 'glitch',
    code: `String a = new String("PASS");\nString b = new String("PASS");\nif (a == b) { // Bug: reference comparison!\n    System.out.println("ACCESS GRANTED");\n}`,
    q: 'BUG HUNTER: Comparing distinct String objects with == fails. What method properly compares string content?',
    opts: [
      'a.equals(b)',
      'a.sameAs(b)',
      'a.compare(b) == 0',
      'String.match(a, b)'
    ],
    a: 0,
    h: 'Always use .equals() to compare String values in Java.',
    explanation: 'Because `a` and `b` are distinct heap objects, `a == b` is false. `a.equals(b)` compares their character sequences.'
  },
  {
    t: 'String Immutability in Memory',
    c: 'Java Strings are immutable; methods like toUpperCase() return a new String rather than modifying the original.',
    m: 'runner',
    code: `String tag = "cyber";\ntag.toUpperCase();\nSystem.out.println(tag);`,
    q: 'SPEED RUN: Because tag was not reassigned, what does System.out.println(tag) output?',
    opts: [
      '"cyber"',
      '"CYBER"',
      'null',
      'Compilation Error'
    ],
    a: 0,
    h: 'Strings cannot be mutated in place. tag.toUpperCase() was ignored.',
    explanation: '`tag.toUpperCase()` creates and returns a new String, but `tag` was never rebound (`tag = tag.toUpperCase()`), so it remains `"cyber"`.'
  },
  {
    t: 'StringBuilder for Concatenation',
    c: 'StringBuilder is a mutable sequence of characters, far more efficient than repeated String + operations.',
    m: 'detective',
    code: `StringBuilder sb = new StringBuilder("GRID");\nsb.append("-").append(9);\nSystem.out.println(sb.toString());`,
    q: 'OUTPUT DETECTIVE: What string is produced by the chained append calls?',
    opts: [
      '"GRID-9"',
      '"GRID"',
      '"GRID-9.0"',
      'TypeError'
    ],
    a: 0,
    h: 'append("-") then append(9) adds characters in order.',
    explanation: '`StringBuilder` appends "-" and 9 to "GRID", producing `"GRID-9"`.'
  },
  {
    t: 'Enhanced Switch Statements (Java 14+)',
    c: 'Enhanced switch uses -> arrows and returns expressions without needing break statements.',
    m: 'detective',
    code: `int tier = 2;\nString role = switch (tier) {\n    case 1 -> "ROOKIE";\n    case 2 -> "ELITE";\n    default -> "UNKNOWN";\n};\nSystem.out.println(role);`,
    q: 'OUTPUT DETECTIVE: What role string is evaluated for tier = 2?',
    opts: [
      '"ELITE"',
      '"ROOKIE"',
      '"UNKNOWN"',
      'Compilation Error'
    ],
    a: 0,
    h: 'case 2 -> "ELITE" matches tier 2.',
    explanation: 'The arrow `->` syntax in switch expressions evaluates and yields `"ELITE"` directly without fallthrough.'
  },
  {
    t: 'Conditional Logic Assembly',
    c: 'Chained if-else if-else logic handles multi-branch decisions in Java.',
    m: 'builder',
    codeBlocks: [
      'int energy = 40;',
      'if (energy > 75) {',
      '    System.out.println("HIGH");',
      '} else if (energy > 30) {',
      '    System.out.println("MEDIUM");',
      '} else {',
      '    System.out.println("LOW");',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    q: 'CODE BUILDER: Assemble the if-else if-else energy classification hierarchy:',
    h: 'Define energy, if > 75, else if > 30, else, closing braces.',
    explanation: 'Since 40 is not > 75 but is > 30, this conditional ladder evaluates and prints "MEDIUM".'
  },
  {
    t: 'String Length vs Array Length',
    c: 'String uses the method .length(); arrays use the field .length without parentheses.',
    m: 'completion',
    code: `String pass = "OMEGA";\nint len = pass.___;\nSystem.out.println(len);`,
    q: 'CODE COMPLETION: Choose the member that obtains the character count of a String:',
    opts: [
      'length()',
      'length',
      'size()',
      'count()'
    ],
    a: 0,
    h: 'Strings have a length() method with parentheses.',
    explanation: '`String.length()` is a method call in Java. (Arrays use the public field `arr.length`).'
  },
  {
    t: 'Ternary Operator Expression',
    c: 'condition ? expr1 : expr2 returns expr1 if true, else expr2.',
    m: 'detective',
    code: `int hp = 85;\nString badge = hp >= 70 ? "GOLD" : "SILVER";\nSystem.out.println(badge);`,
    q: 'OUTPUT DETECTIVE: 85 >= 70 is true. What is badge?',
    opts: [
      '"GOLD"',
      '"SILVER"',
      'null',
      '85'
    ],
    a: 0,
    h: 'hp >= 70 is true, so "GOLD" is chosen.',
    explanation: 'The ternary condition `85 >= 70` evaluates to true, assigning `"GOLD"` to `badge`.'
  },
  // BOSS 2: Level 16
  {
    t: 'THE STRING POOL WRAITH',
    isBoss: true,
    name: 'THE STRING POOL WRAITH',
    hp: 600,
    avatar: '👻',
    story: 'A phantom haunting Primitive Plains, exploiting String intern pools and literal references.',
    phases: [
      {
        q: 'PHASE 1: Wraith tests String intern pool! If String s1 = "A" and String s2 = "A", what is s1 == s2?',
        opts: [
          'true (string literals with identical text share the same String Pool instance)',
          'false (they are always distinct memory objects)',
          'Compilation Error',
          'Undefined'
        ],
        a: 0,
        explanation: 'String literals are stored in the JVM String Intern Pool; identical string literals share the exact same reference, making `s1 == s2` evaluate to `true`.'
      },
      {
        q: 'PHASE 2: Wraith queries StringBuilder thread-safety! Which mutable string class is synchronized and thread-safe?',
        opts: ['StringBuffer', 'StringBuilder', 'StringPool', 'StringArray'],
        a: 0,
        explanation: '`StringBuffer` is thread-safe with synchronized methods; `StringBuilder` is faster but not thread-safe.'
      },
      {
        q: 'PHASE 3: Wraith tests String.substring! What does "CYBER".substring(1, 4) return?',
        opts: ['"YBE"', '"YBER"', '"CYB"', '"CYBE"'],
        a: 0,
        explanation: '`substring(beginIndex, endIndex)` is end-exclusive: index 1 (\'Y\'), index 2 (\'B\'), index 3 (\'E\') yields `"YBE"`.'
      },
      {
        q: 'PHASE 4: Wraith queries null concatenation! What does "ID: " + null produce in Java?',
        opts: ['"ID: null"', 'NullPointerException', '"ID: "', 'Compilation Error'],
        a: 0,
        explanation: 'In Java string concatenation, `null` is automatically converted to the literal string `"null"`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which method explicitly places a runtime-created string into the JVM String Intern Pool?',
        opts: ['s.intern()', 's.pool()', 's.cache()', 's.freeze()'],
        a: 0,
        explanation: '`String.intern()` searches the string pool; if present it returns the pooled reference, otherwise it adds the string to the pool.'
      }
    ]
  },

  // =========================================================================
  // AREA 3: CONTROL CITADEL (Lv 17-24) - LOOPS & ARRAYS
  // =========================================================================
  {
    t: 'Enhanced For-Each Loop',
    c: 'for (Type var : collection) iterates through each element without managing an index counter.',
    m: 'glitch',
    code: `int[] scores = {10, 20, 30};\nfor (int s in scores) { // Bug: using "in" instead of ":"\n    System.out.println(s);\n}`,
    q: 'BUG HUNTER: Java for-each uses a colon (:), not "in". Fix the separator:',
    opts: [
      'for (int s : scores)',
      'for (int s of scores)',
      'for (int s -> scores)',
      'for (int s = scores)'
    ],
    a: 0,
    h: 'Java enhanced for loop syntax is: for (Type item : array).',
    explanation: 'Java uses a colon `:` in enhanced for-each loops: `for (int s : scores)`.'
  },
  {
    t: 'Array Instantiation & Bounds',
    c: 'Arrays in Java have a fixed size upon instantiation; accessing index >= length throws ArrayIndexOutOfBoundsException.',
    m: 'runner',
    code: `int[] data = new int[3];\ndata[0] = 5;\ndata[1] = 10;\ndata[2] = 15;\nSystem.out.println(data.length);`,
    q: 'SPEED RUN: What is data.length for an array initialized with new int[3]?',
    opts: [
      '3',
      '2',
      '4',
      '0'
    ],
    a: 0,
    h: 'The array capacity was allocated as 3 elements.',
    explanation: '`new int[3]` allocates an array of length 3 (valid indices: 0, 1, 2).'
  },
  {
    t: 'While Loop Counter Accumulation',
    c: 'while loops evaluate the condition before each iteration.',
    m: 'detective',
    code: `int energy = 15;\nint jumps = 0;\nwhile (energy >= 5) {\n    energy -= 5;\n    jumps++;\n}\nSystem.out.println(jumps);`,
    q: 'OUTPUT DETECTIVE: 15 -> 10 -> 5 -> 0. How many jumps are executed?',
    opts: [
      '3',
      '2',
      '4',
      '15'
    ],
    a: 0,
    h: '15 / 5 = 3 full steps.',
    explanation: 'Jumps: 1 (energy 10), 2 (energy 5), 3 (energy 0). Then 0 >= 5 is false, exiting with jumps = 3.'
  },
  {
    t: 'Break and Continue Mechanics',
    c: 'break exits the loop immediately; continue skips to the next iteration.',
    m: 'detective',
    code: `int total = 0;\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) continue;\n    if (i == 5) break;\n    total += i;\n}\nSystem.out.println(total);`,
    q: 'OUTPUT DETECTIVE: i=1 (total=1), i=2 (total=3), i=3 skipped, i=4 (total=7), i=5 breaks. What is total?',
    opts: [
      '7',
      '10',
      '6',
      '3'
    ],
    a: 0,
    h: '1 + 2 + 4 = 7 (3 is skipped by continue, 5 triggers break).',
    explanation: 'i=1 (+1), i=2 (+2), i=3 (continue skips), i=4 (+4 -> 7), i=5 (break terminates). Final total is 7.'
  },
  {
    t: 'Array Sum Accumulation Loop',
    c: 'Iterating over an array to compute cumulative totals.',
    m: 'builder',
    codeBlocks: [
      'int[] packets = {10, 20, 30};',
      'int sum = 0;',
      'for (int p : packets) {',
      '    sum += p;',
      '}',
      'System.out.println(sum);'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the array summation pipeline:',
    h: 'Declare array, initialize sum to 0, for-each loop accumulating p, print sum.',
    explanation: 'The loop traverses 10, 20, 30, computing a total sum of 60.'
  },
  {
    t: 'Do..While Guaranteed Run',
    c: 'do..while always runs its body at least once.',
    m: 'detective',
    code: `int x = 100;\ndo {\n    x += 10;\n} while (x < 50);\nSystem.out.println(x);`,
    q: 'OUTPUT DETECTIVE: x < 50 is false on the first check. What is the value of x?',
    opts: [
      '110',
      '100',
      '50',
      '0'
    ],
    a: 0,
    h: '100 + 10 = 110 runs before the condition check.',
    explanation: 'The body executes first, adding 10 to 100 (110). Then `110 < 50` evaluates to false, terminating the loop.'
  },
  {
    t: 'Multi-Dimensional Arrays (2D Matrix)',
    c: 'int[][] creates an array of arrays in Java.',
    m: 'detective',
    code: `int[][] grid = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\nSystem.out.println(grid[1][2]);`,
    q: 'OUTPUT DETECTIVE: What value is located at row index 1, column index 2?',
    opts: [
      '6',
      '5',
      '4',
      '3'
    ],
    a: 0,
    h: 'Row 1 is {4, 5, 6}; Column 2 of that row is 6.',
    explanation: '`grid[1]` is `{4, 5, 6}`. Accessing index 2 of that row yields `6`.'
  },
  // BOSS 3: Level 24
  {
    t: 'THE POLYMORPHIC GOLEM',
    isBoss: true,
    name: 'THE POLYMORPHIC GOLEM',
    hp: 700,
    avatar: '🗿',
    story: 'A massive stone titan defending Control Citadel. It tests dynamic method dispatch and array hierarchies!',
    phases: [
      {
        q: 'PHASE 1: Golem tests ArrayIndexOutOfBoundsException! What happens when accessing arr[5] on an array of length 5?',
        opts: [
          'Throws ArrayIndexOutOfBoundsException at runtime',
          'Returns 0 or null',
          'Expands the array automatically',
          'Compilation Error'
        ],
        a: 0,
        explanation: 'For an array of length 5, valid indices are 0 to 4. Accessing index 5 throws an `ArrayIndexOutOfBoundsException`.'
      },
      {
        q: 'PHASE 2: Golem tests labeled break! What is the purpose of a labeled break (e.g. break outerLoop;)?',
        opts: [
          'Breaks out of an outer enclosing loop from inside a nested loop',
          'Restarts the program',
          'Breaks only if an exception occurs',
          'Labels a switch statement'
        ],
        a: 0,
        explanation: 'A labeled `break` specifies which enclosing loop to terminate from within deeply nested loops.'
      },
      {
        q: 'PHASE 3: Golem tests Array copy! Which method in System performs high-speed native memory array copying?',
        opts: ['System.arraycopy()', 'System.copyArray()', 'System.clone()', 'System.memmove()'],
        a: 0,
        explanation: '`System.arraycopy()` is a native, highly optimized method for copying elements between arrays.'
      },
      {
        q: 'PHASE 4: Golem tests default array values! What do elements of new int[10] initialize to automatically?',
        opts: ['0', 'null', 'Garbage data', '-1'],
        a: 0,
        explanation: 'In Java, numeric arrays (`int[]`, `double[]`) are automatically initialized to zeroes.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Can array size be changed after instantiation in Java?',
        opts: [
          'No, Java array length is immutable once allocated (use ArrayList for resizable collections)',
          'Yes, using arr.resize(newSize)',
          'Yes, by calling arr.length = 10',
          'Only in Java 21'
        ],
        a: 0,
        explanation: 'Java arrays are fixed-length. To achieve dynamically resizable lists, use `java.util.ArrayList`.'
      }
    ]
  },

  // =========================================================================
  // AREA 4: CLASS SANCTUARY (Lv 25-32) - OOP & ENCAPSULATION
  // =========================================================================
  {
    t: 'Constructor Initialization & "this"',
    c: 'The constructor initializes fields; "this.field" distinguishes fields from parameters of the same name.',
    m: 'glitch',
    code: `public class Drone {\n    private int id;\n    public Drone(int id) {\n        id = id; // Bug: assigning parameter to itself!\n    }\n}`,
    q: 'BUG HUNTER: id = id assigns the parameter to itself. How do you properly assign to the instance field?',
    opts: [
      'this.id = id;',
      'Drone.id = id;',
      'super.id = id;',
      'self.id = id;'
    ],
    a: 0,
    h: 'Use this.id to refer to the current object instance field.',
    explanation: 'Using `this.id = id;` clarifies that the instance field `id` receives the value of parameter `id`.'
  },
  {
    t: 'Access Modifiers (private vs public)',
    c: 'private restricts visibility to within the class; public exposes members everywhere.',
    m: 'runner',
    code: `public class Vault {\n    private int pass = 777;\n}\n// In another class: new Vault().pass crashes!`,
    q: 'SPEED RUN: What prevents direct access to pass from outside the Vault class?',
    opts: [
      'The private access modifier',
      'The final keyword',
      'The static keyword',
      'The protected keyword'
    ],
    a: 0,
    h: 'private fields cannot be accessed from external classes.',
    explanation: '`private` fields are strictly encapsulated within their declaring class, inaccessible to outside classes.'
  },
  {
    t: 'Static Methods and Variables',
    c: 'static members belong to the class itself rather than any individual object instance.',
    m: 'detective',
    code: `public class Counter {\n    public static int total = 0;\n    public Counter() { total++; }\n}\nnew Counter();\nnew Counter();\nSystem.out.println(Counter.total);`,
    q: 'OUTPUT DETECTIVE: Two instances were created. What is Counter.total?',
    opts: [
      '2',
      '1',
      '0',
      'Compilation Error'
    ],
    a: 0,
    h: 'static variables are shared across all instances: 0 -> 1 -> 2.',
    explanation: '`total` is `static`, meaning it is shared among all `Counter` instances. Two constructor runs increment it to 2.'
  },
  {
    t: 'Method Overloading',
    c: 'Overloading allows multiple methods in the same class to share a name if their parameter lists differ.',
    m: 'detective',
    code: `public class MathBot {\n    public int calc(int a) { return a * 2; }\n    public int calc(int a, int b) { return a + b; }\n}\nMathBot b = new MathBot();\nSystem.out.println(b.calc(5, 10));`,
    q: 'OUTPUT DETECTIVE: Which overloaded version matches calc(5, 10)?',
    opts: [
      '15 (calc(int, int))',
      '10 (calc(int))',
      '50',
      'Compilation Error: Duplicate method'
    ],
    a: 0,
    h: 'calc(5, 10) takes two ints, invoking calc(int a, int b): 5 + 10 = 15.',
    explanation: 'The compiler resolves the call to the two-parameter version `calc(int a, int b)`, returning 5 + 10 = 15.'
  },
  {
    t: 'Encapsulated Getter / Setter Assembly',
    c: 'Standard JavaBeans pattern: private fields with public getter and setter methods.',
    m: 'builder',
    codeBlocks: [
      'public class Agent {',
      '    private int level;',
      '    public int getLevel() { return this.level; }',
      '    public void setLevel(int l) { this.level = l; }',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    q: 'CODE BUILDER: Assemble the encapsulated JavaBean class pattern:',
    h: 'Class header, private field, getter method, setter method, close class.',
    explanation: 'Encapsulation keeps internal state `private` and exposes controlled access through `getLevel()` and `setLevel()`.'
  },
  {
    t: 'Constructor Overloading with this()',
    c: 'this(args) calls another constructor in the same class, and must be the very first line.',
    m: 'completion',
    code: `public class Bot {\n    int battery;\n    public Bot() {\n        ___(100); // delegate to Bot(int)\n    }\n    public Bot(int b) { this.battery = b; }\n}`,
    q: 'CODE COMPLETION: Choose the keyword to call the parameterized constructor from the default constructor:',
    opts: [
      'this',
      'super',
      'Bot',
      'construct'
    ],
    a: 0,
    h: 'Use this(100) to invoke another constructor in the same class.',
    explanation: '`this(...)` invokes an alternate constructor within the same class, and must appear on the first line.'
  },
  {
    t: 'Garbage Collection Eligibility',
    c: 'An object becomes eligible for garbage collection when it is no longer reachable by any live reference.',
    m: 'detective',
    code: `Object ref1 = new Object();\nObject ref2 = ref1;\nref1 = null;\n// ref2 still references the object!`,
    q: 'OUTPUT DETECTIVE: Is the object eligible for garbage collection yet?',
    opts: [
      'No, because ref2 still points to it',
      'Yes, because ref1 became null',
      'Yes, objects are GC\'d immediately after assignment',
      'It depends on the CPU temperature'
    ],
    a: 0,
    h: 'An object is only reclaimed when zero active references reach it.',
    explanation: 'Because `ref2` still holds a reference to the `new Object()`, it remains reachable and is not eligible for GC.'
  },
  // BOSS 4: Level 32
  {
    t: 'THE ENCAPSULATION TITAN',
    isBoss: true,
    name: 'THE ENCAPSULATION TITAN',
    hp: 800,
    avatar: '🛡️',
    story: 'An ironclad colossus defending Class Sanctuary, repelling direct variable tampering with access gates!',
    phases: [
      {
        q: 'PHASE 1: Titan tests package-private visibility! What is the access level if no modifier (public/private/protected) is specified?',
        opts: [
          'Package-private (accessible only within classes in the same package)',
          'Public to all packages',
          'Private to that class only',
          'Protected'
        ],
        a: 0,
        explanation: 'Default (no modifier) access is "package-private", allowing access only to classes in the same package.'
      },
      {
        q: 'PHASE 2: Titan tests static method constraints! Can a static method directly call a non-static instance method without an instance?',
        opts: [
          'No, static methods cannot reference instance members without an object instance',
          'Yes, it automatically uses this',
          'Only if the method is public',
          'Yes, in Java 17 and later'
        ],
        a: 0,
        explanation: '`static` methods exist independently of any instance; they have no `this` context and cannot directly call instance methods.'
      },
      {
        q: 'PHASE 3: Titan queries final classes! What does applying the final modifier to a class declaration (public final class X) prevent?',
        opts: [
          'Prevents the class from being extended (subclassed)',
          'Prevents creating instances with new',
          'Makes all fields final automatically',
          'Deletes the constructor'
        ],
        a: 0,
        explanation: 'A `final` class cannot be inherited or subclassed (e.g. `java.lang.String` is `final`).'
      },
      {
        q: 'PHASE 4: Titan tests protected access modifier! Who can access a protected member?',
        opts: [
          'Classes in the same package AND subclasses in any package',
          'Subclasses only',
          'Same package only',
          'Any class with an import'
        ],
        a: 0,
        explanation: '`protected` members are accessible to all classes in the same package, plus subclasses in any other package.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which method in java.lang.Object returns a hash code integer value for the object?',
        opts: ['hashCode()', 'getHash()', 'hash()', 'id()'],
        a: 0,
        explanation: '`hashCode()` returns an integer hash representation of the object, used by hash-based collections like `HashMap`.'
      }
    ]
  },

  // =========================================================================
  // AREA 5: COLLECTION VAULT (Lv 33-40) - COLLECTIONS & GENERICS
  // =========================================================================
  {
    t: 'ArrayList Dynamic Operations',
    c: 'ArrayList<E> is a resizable array implementation of the List interface.',
    m: 'glitch',
    code: `ArrayList<int> list = new ArrayList<>(); // Bug: using primitive int in generics!`,
    q: 'BUG HUNTER: Java generics require reference types. What wrapper class must replace primitive int?',
    opts: [
      'Integer',
      'Number',
      'Int',
      'IntWrapper'
    ],
    a: 0,
    h: 'Use the wrapper class java.lang.Integer.',
    explanation: 'Java generics do not support primitive types directly; you must use wrapper classes like `Integer`, `Double`, etc.'
  },
  {
    t: 'HashMap Key-Value Storage',
    c: 'HashMap<K, V> stores key-value associations with average O(1) time complexity.',
    m: 'runner',
    code: `HashMap<String, Integer> map = new HashMap<>();\nmap.put("ATK", 80);\nmap.put("ATK", 95);\nSystem.out.println(map.get("ATK"));`,
    q: 'SPEED RUN: Putting a value with an existing key overwrites it. What does map.get("ATK") return?',
    opts: [
      '95',
      '80',
      '175',
      'null'
    ],
    a: 0,
    h: 'The second put overwrites the first value: 95.',
    explanation: '`HashMap.put(key, value)` with an existing key replaces the old value with the new value (95).'
  },
  {
    t: 'HashSet Uniqueness',
    c: 'HashSet contains no duplicate elements, backed by a HashMap internally.',
    m: 'detective',
    code: `HashSet<String> set = new HashSet<>();\nset.add("ALPHA");\nset.add("BETA");\nset.add("ALPHA");\nSystem.out.println(set.size());`,
    q: 'OUTPUT DETECTIVE: Duplicates are rejected. What is set.size()?',
    opts: [
      '2',
      '3',
      '1',
      '0'
    ],
    a: 0,
    h: '"ALPHA" is added once; "BETA" is added once: size is 2.',
    explanation: 'Sets enforce uniqueness. The second `"ALPHA"` is ignored, so the set contains only `{"ALPHA", "BETA"}` (size 2).'
  },
  {
    t: 'Autoboxing and Unboxing',
    c: 'Autoboxing is the automatic conversion the compiler makes between primitive types and their wrapper classes.',
    m: 'detective',
    code: `Integer wrapped = 42; // Autoboxing\nint primitive = wrapped; // Unboxing\nSystem.out.println(primitive + 8);`,
    q: 'OUTPUT DETECTIVE: What is primitive + 8 (42 + 8)?',
    opts: [
      '50',
      '428',
      '42',
      'NullPointerException'
    ],
    a: 0,
    h: '42 + 8 = 50.',
    explanation: 'Unboxing automatically extracts the `int` 42 from `wrapped`. Adding 8 yields `50`.'
  },
  {
    t: 'List Sorting with Collections.sort()',
    c: 'Collections.sort() sorts lists in natural ascending order or using a custom Comparator.',
    m: 'builder',
    codeBlocks: [
      'List<Integer> list = new ArrayList<>();',
      'list.add(30);',
      'list.add(10);',
      'list.add(20);',
      'Collections.sort(list);',
      'System.out.println(list);'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the list creation, element addition, and sorting pipeline:',
    h: 'Instantiate list, add 30, add 10, add 20, call Collections.sort(list), print.',
    explanation: '`Collections.sort(list)` sorts the list in ascending order to `[10, 20, 30]`.'
  },
  {
    t: 'HashMap .getOrDefault()',
    c: 'getOrDefault(key, defaultValue) returns the mapped value or fallback if key not found.',
    m: 'completion',
    code: `Map<String, Integer> cache = new HashMap<>();\nint count = cache.___\("MISSING", 0);\nSystem.out.println(count);`,
    q: 'CODE COMPLETION: Choose the method that returns 0 when the key is absent:',
    opts: [
      'getOrDefault',
      'getOrElse',
      'getOrFallback',
      'findOrDefault'
    ],
    a: 0,
    h: 'Java Map has a getOrDefault(key, defaultVal) method.',
    explanation: '`Map.getOrDefault(key, defaultVal)` safely returns the default value if the key does not exist.'
  },
  {
    t: 'LinkedList vs ArrayList',
    c: 'ArrayList has O(1) random access; LinkedList provides O(1) insertions/deletions at endpoints.',
    m: 'detective',
    code: `List<String> list = new ArrayList<>();\nlist.add("FIRST");\nlist.add("SECOND");\nSystem.out.println(list.get(0));`,
    q: 'OUTPUT DETECTIVE: What is printed by list.get(0)?',
    opts: [
      '"FIRST"',
      '"SECOND"',
      '0',
      'IndexOutOfBoundsException'
    ],
    a: 0,
    h: 'Index 0 is "FIRST".',
    explanation: '`list.get(0)` retrieves the element at index 0, which is `"FIRST"`.'
  },
  // BOSS 5: Level 40
  {
    t: 'THE HASHMAP SPECTRE',
    isBoss: true,
    name: 'THE HASHMAP SPECTRE',
    hp: 900,
    avatar: '👾',
    story: 'A shadowy entity haunting Collection Vault, sabotaging hash buckets and equals-hashCode contracts.',
    phases: [
      {
        q: 'PHASE 1: Spectre tests equals-hashCode contract! If two objects are equal by .equals(), what MUST their hashCode() return?',
        opts: [
          'They must return the exact same integer hashCode',
          'They must return different hashCodes',
          'Their hashCodes must be 0',
          'Java does not enforce any relationship'
        ],
        a: 0,
        explanation: 'The contract dictates: If `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` MUST be true for hash collections to work correctly.'
      },
      {
        q: 'PHASE 2: Spectre queries bucket treeification! In Java 8+, what data structure does a HashMap bucket convert to when collisions exceed 8?',
        opts: [
          'Red-Black Tree (TreeMap node)',
          'Circular Doubly-Linked List',
          'Binary Heap',
          'SkipList'
        ],
        a: 0,
        explanation: 'In Java 8+, when a bucket exceeds 8 nodes, it transforms from a linked list into a balanced Red-Black tree to improve search time from O(N) to O(log N).'
      },
      {
        q: 'PHASE 3: Spectre queries ConcurrentHashMap! How does ConcurrentHashMap achieve thread-safety without locking the whole map?',
        opts: [
          'Lock striping / synchronized buckets and CAS (Compare-And-Swap) operations',
          'Using a single global lock',
          'By making all methods static',
          'By running in a separate JVM'
        ],
        a: 0,
        explanation: '`ConcurrentHashMap` uses bucket-level synchronization and CAS operations, allowing concurrent reads and parallel partitioned writes.'
      },
      {
        q: 'PHASE 4: Spectre tests fail-fast iterators! What exception is thrown if a collection is structurally modified during iteration without using iterator.remove()?',
        opts: [
          'ConcurrentModificationException',
          'IllegalStateException',
          'CollectionCorruptedException',
          'IndexOutOfBoundsException'
        ],
        a: 0,
        explanation: 'Standard Java collection iterators are fail-fast and throw `ConcurrentModificationException` if the collection changes during iteration.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which interface represents an immutable, read-only list created via List.of("A", "B")?',
        opts: [
          'An unmodifiable List implementation (throws UnsupportedOperationException on add)',
          'ArrayList',
          'Vector',
          'LinkedList'
        ],
        a: 0,
        explanation: '`List.of()` creates an unmodifiable list. Attempting to call `.add()` or `.set()` raises an `UnsupportedOperationException`.'
      }
    ]
  },

  // =========================================================================
  // AREA 6: INTERFACE NEXUS (Lv 41-48) - INHERITANCE & POLYMORPHISM
  // =========================================================================
  {
    t: 'Class Inheritance with extends',
    c: 'The extends keyword creates a subclass that inherits fields and methods from a superclass.',
    m: 'glitch',
    code: `public class CyberUnit : Unit { // Bug: C# syntax! \n}`,
    q: 'BUG HUNTER: What keyword establishes class inheritance in Java?',
    opts: [
      'extends',
      'inherits',
      'implements',
      ':'
    ],
    a: 0,
    h: 'Java uses the extends keyword for class inheritance.',
    explanation: 'Java uses `extends` for class inheritance: `public class CyberUnit extends Unit`.'
  },
  {
    t: 'Method Overriding (@Override)',
    c: '@Override verifies that the subclass method matches a method signature in the superclass.',
    m: 'runner',
    code: `class Parent { void ping() { System.out.println("P"); } }\nclass Child extends Parent {\n    @Override\n    void ping() { System.out.println("C"); }\n}\nParent p = new Child();\np.ping();`,
    q: 'SPEED RUN: Polymorphism invokes the overridden child method. What is printed?',
    opts: [
      '"C"',
      '"P"',
      '"PC"',
      'Compilation Error'
    ],
    a: 0,
    h: 'Dynamic dispatch calls the runtime object method: "C".',
    explanation: 'Because `p` holds an instance of `Child` at runtime, dynamic method dispatch invokes `Child.ping()`, printing "C".'
  },
  {
    t: 'Interfaces and implements',
    c: 'A class implements an interface to adhere to a contract of abstract methods.',
    m: 'builder',
    codeBlocks: [
      'interface Shieldable {',
      '    void activateShield();',
      '}',
      'class Guardian implements Shieldable {',
      '    public void activateShield() { System.out.println("SHIELDED"); }',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the interface definition and class implementation:',
    h: 'interface header, method signature, close interface, class implements interface, implementation, close class.',
    explanation: '`interface` defines the contract, and `class Guardian implements Shieldable` implements the required method.'
  },
  {
    t: 'The super() Constructor Call',
    c: 'super() invokes the superclass constructor and must be the first line in a subclass constructor.',
    m: 'completion',
    code: `class Mech extends Unit {\n    public Mech(String name) {\n        ___(name); // call Unit(String)\n    }\n}`,
    q: 'CODE COMPLETION: Choose the call to invoke the superclass constructor:',
    opts: [
      'super',
      'this',
      'base',
      'parent'
    ],
    a: 0,
    h: 'Use super(name) to invoke the parent constructor.',
    explanation: '`super(...)` invokes the constructor of the parent class.'
  },
  {
    t: 'The instanceof Operator',
    c: 'instanceof tests whether an object is an instance of a specified class or implements an interface.',
    m: 'detective',
    code: `class Animal {}\nclass Dog extends Animal {}\nDog d = new Dog();\nSystem.out.println(d instanceof Animal);`,
    q: 'OUTPUT DETECTIVE: Dog inherits from Animal. What boolean is printed?',
    opts: [
      'true',
      'false',
      'null',
      'Compilation Error'
    ],
    a: 0,
    h: 'An instance of a subclass is an instance of its superclass: true.',
    explanation: 'Because `Dog` is a subclass of `Animal`, `d instanceof Animal` is `true`.'
  },
  {
    t: 'Default Methods in Interfaces',
    c: 'Java 8+ allows default methods with concrete implementations inside interfaces.',
    m: 'detective',
    code: `interface Diagnostic {\n    default void test() { System.out.println("PASS"); }\n}\nclass Machine implements Diagnostic {}\nnew Machine().test();`,
    q: 'OUTPUT DETECTIVE: Machine inherits the default method. What is printed?',
    opts: [
      '"PASS"',
      'Compilation Error: Machine is abstract',
      'null',
      'Undefined'
    ],
    a: 0,
    h: 'The default method executes when the implementing class does not override it.',
    explanation: 'The `default` keyword enables interface methods with a default implementation, printing "PASS".'
  },
  {
    t: 'Abstract Classes vs Interfaces',
    c: 'An abstract class can maintain instance state and constructors; an interface cannot store instance state.',
    m: 'detective',
    code: `abstract class Weapon {\n    int damage = 50;\n    abstract void fire();\n}\n// Weapon w = new Weapon(); // Fails!\nSystem.out.println("Weapon is abstract");`,
    q: 'OUTPUT DETECTIVE: Can an abstract class be directly instantiated with new?',
    opts: [
      'No, abstract classes cannot be instantiated directly',
      'Yes, any abstract class can be instantiated',
      'Only if it has no abstract methods',
      'Only with reflection'
    ],
    a: 0,
    h: 'Abstract classes cannot be instantiated; they serve as templates for subclasses.',
    explanation: 'An `abstract` class cannot be instantiated using `new`; it must be extended by a concrete subclass.'
  },
  // BOSS 6: Level 48
  {
    t: 'THE THREAD RACER',
    isBoss: true,
    name: 'THE THREAD RACER',
    hp: 1000,
    avatar: '🏎️',
    story: 'A cybernetic demon in Interface Nexus, racing across memory threads and triggering race conditions!',
    phases: [
      {
        q: 'PHASE 1: Racer tests Thread creation! Which two primary mechanisms create a new thread in Java?',
        opts: [
          'Extending the Thread class OR implementing the Runnable interface',
          'Calling System.thread() only',
          'Using the fork keyword',
          'Extending java.lang.Process'
        ],
        a: 0,
        explanation: 'In standard Java, threads are created by extending `Thread` and overriding `run()`, or by implementing the `Runnable` interface.'
      },
      {
        q: 'PHASE 2: Racer tests the synchronized keyword! What does synchronized on a method prevent?',
        opts: [
          'Prevents multiple threads from executing that method on the same monitor object simultaneously',
          'Stops the thread completely',
          'Makes the method run twice as fast',
          'Converts the code into C++'
        ],
        a: 0,
        explanation: '`synchronized` acquires an intrinsic lock on the target monitor, ensuring mutual exclusion across threads.'
      },
      {
        q: 'PHASE 3: Racer tests volatile in Java! What memory guarantee does the volatile keyword provide in Java?',
        opts: [
          'Guarantees visibility: writes to a volatile variable are immediately flushed and visible to all other threads',
          'Guarantees atomic operations for counter++',
          'Prevents garbage collection',
          'Locks the entire class'
        ],
        a: 0,
        explanation: 'In Java, `volatile` guarantees that any thread reading the field sees the most recent write, establishing a happens-before relationship.'
      },
      {
        q: 'PHASE 4: Racer queries thread start! What happens if you call t.run() instead of t.start() on a Thread t?',
        opts: [
          'It executes run() synchronously on the CURRENT thread without creating a new thread',
          'It throws an IllegalThreadStateException',
          'It spawns two background threads',
          'It terminates the JVM'
        ],
        a: 0,
        explanation: 'Calling `.run()` is just a regular method call on the caller thread. You must call `.start()` to allocate a new OS thread.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which java.util.concurrent class provides atomic increments without explicit synchronized locks?',
        opts: ['AtomicInteger', 'SyncInt', 'ThreadInt', 'VolatileNumber'],
        a: 0,
        explanation: '`AtomicInteger` provides thread-safe atomic operations (e.g. `incrementAndGet()`) using hardware-level CAS instructions.'
      }
    ]
  },

  // =========================================================================
  // AREA 7: JVM CORE & MASTER CHALLENGES (Lv 49-51)
  // =========================================================================
  {
    t: 'Streams API Pipeline',
    c: 'Java 8 Streams allow functional transformations over collections (filter, map, reduce).',
    m: 'detective',
    code: `List<Integer> nums = List.of(1, 2, 3, 4, 5);\nlong count = nums.stream()\n    .filter(n -> n > 2)\n    .count();\nSystem.out.println(count);`,
    q: 'OUTPUT DETECTIVE: How many numbers in [1, 2, 3, 4, 5] are strictly greater than 2?',
    opts: [
      '3',
      '2',
      '4',
      '5'
    ],
    a: 0,
    h: '3, 4, and 5 pass the filter: 3 numbers.',
    explanation: 'The filter `n -> n > 2` matches 3, 4, and 5. `.count()` returns `3`.'
  },
  {
    t: 'Try-with-Resources AutoCloseable',
    c: 'try-with-resources automatically closes resources that implement AutoCloseable upon completion.',
    m: 'builder',
    codeBlocks: [
      'try (Scanner sc = new Scanner("TEST")) {',
      '    String token = sc.next();',
      '    System.out.println(token);',
      '} catch (Exception e) {',
      '    e.printStackTrace();',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the try-with-resources auto-closing resource management block:',
    h: 'try with Scanner in parentheses, read token, print token, close try block, catch exception, printStackTrace.',
    explanation: 'Declaring `Scanner` inside the `try (...)` header guarantees that `sc.close()` is automatically called when exiting.'
  },
  // FINAL BOSS: Level 51
  {
    t: 'THE ABSTRACT OVERLORD',
    isBoss: true,
    isFinalBoss: true,
    name: 'THE ABSTRACT OVERLORD',
    hp: 1200,
    avatar: '👑',
    story: 'THE SUPREME MASTER OF THE JVM! It orchestrates HotSpot JIT compilation, classloaders, metaspace, and garbage collection. Overcome it for Java Mastery!',
    phases: [
      {
        q: 'PHASE 1: Overlord tests Checked vs Unchecked exceptions! Which exception class is unchecked (compiler does not force try-catch or throws)?',
        opts: [
          'RuntimeException (e.g. NullPointerException, IllegalArgumentException)',
          'IOException',
          'SQLException',
          'ClassNotFoundException'
        ],
        a: 0,
        explanation: '`RuntimeException` and its subclasses are unchecked exceptions; the compiler does not require them to be caught or declared.'
      },
      {
        q: 'PHASE 2: Overlord tests JVM Memory areas! Where are local variables stored during method execution?',
        opts: [
          'Stack memory (within the method stack frame)',
          'Heap memory',
          'Metaspace',
          'Constant Pool'
        ],
        a: 0,
        explanation: 'Local primitive variables and object references inside methods are stored in the thread\'s Stack memory frame.'
      },
      {
        q: 'PHASE 3: Overlord tests JIT compilation! What does the HotSpot JIT (Just-In-Time) compiler do?',
        opts: [
          'Compiles frequently executed bytecode into native machine code at runtime',
          'Converts Java source directly to JavaScript',
          'Transfers bytecode over the network',
          'Deletes unused classes'
        ],
        a: 0,
        explanation: 'HotSpot detects frequently executed ("hot") bytecode paths and compiles them into optimized native machine code at runtime.'
      },
      {
        q: 'PHASE 4: Overlord tests lambda functional interfaces! What defines a Functional Interface in Java?',
        opts: [
          'An interface with exactly one abstract method (@FunctionalInterface)',
          'An interface with no methods',
          'An interface with only default methods',
          'A class with static methods'
        ],
        a: 0,
        explanation: 'A Functional Interface has exactly one abstract method (SAM - Single Abstract Method), making it eligible as a target for lambda expressions.'
      },
      {
        q: 'PHASE 5: MASTER STRIKE! Which JVM garbage collector introduced concurrent, region-based compaction targeting predictable pause times?',
        opts: ['G1 (Garbage-First) GC', 'Serial GC', 'Parallel Mark Sweep', 'CMS (Concurrent Mark Sweep)'],
        a: 0,
        explanation: 'The G1 (Garbage-First) Collector divides the heap into equal-sized regions and prioritizes collecting regions with the most garbage while maintaining pause goals.'
      }
    ]
  }
];
