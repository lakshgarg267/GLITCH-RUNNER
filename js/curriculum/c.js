/**
 * GLITCH RUNNER - C LANGUAGE CURRICULUM (51 LEVELS)
 * Areas:
 * Area 1: Memory Outpost (Lv 1-8, Boss: THE SEMICOLON SCOURGE)
 * Area 2: Logic Sector (Lv 9-16, Boss: THE NULL POINTER TITAN)
 * Area 3: Loop Chamber (Lv 17-24, Boss: THE STACK OVERFLOW WRAITH)
 * Area 4: Function Lab (Lv 25-32, Boss: THE SCOPE GARGOYLE)
 * Area 5: Pointer Peaks (Lv 33-40, Boss: THE DANGLING POINTER LICH)
 * Area 6: Heap Highlands (Lv 41-48, Boss: THE SEGFAULT OVERLORD)
 * Area 7: Kernel Core (Lv 49-51, Final Boss: THE HARDWARE DAEMON)
 */

window.CURRICULUM_DATA = window.CURRICULUM_DATA || {};

window.CURRICULUM_DATA.c = [
  // =========================================================================
  // AREA 1: MEMORY OUTPOST (Lv 1-8) - FOUNDATION
  // =========================================================================
  {
    t: 'C Standard Header & Main',
    c: 'C programs require standard headers like <stdio.h> and start execution inside main().',
    m: 'glitch',
    code: `#include <stdio.h>\nvoid main() {\n    printf("GRID ONLINE\\n");\n}`,
    q: 'BUG HUNTER: C standard defines the return type of main() as an integer. Fix the declaration:',
    opts: [
      'int main(void)',
      'def main()',
      'function main(): int',
      'public static void main()'
    ],
    a: 0,
    h: 'ISO C standards require main to return an int status code.',
    explanation: 'According to ISO C standards (C99, C11, C17), `main` must return `int`: `int main(void)` or `int main(int argc, char *argv[])`.'
  },
  {
    t: 'Printf Format Specifiers',
    c: '%d formats integers, %f formats floats, and %s formats null-terminated strings.',
    m: 'runner',
    code: `int shields = 85;\nprintf("Shields: %d%%\\n", shields);`,
    q: 'SPEED RUN: What format specifier in printf outputs a signed decimal integer?',
    opts: [
      '%s',
      '%d',
      '%c',
      '%p'
    ],
    a: 1,
    h: '%d is used for signed decimals (integers).',
    explanation: '`%d` (or `%i`) prints signed decimal integers. `%s` is for strings, `%c` for characters, and `%p` for pointer memory addresses.'
  },
  {
    t: 'Sizeof Operator',
    c: 'sizeof yields the storage size in bytes of an expression or data type at compile time.',
    m: 'detective',
    code: `char byte = 'A';\nprintf("%zu", sizeof(byte));`,
    q: 'OUTPUT DETECTIVE: By C specification, what is sizeof(char) always guaranteed to be in bytes?',
    opts: [
      '1',
      '2',
      '4',
      '8'
    ],
    a: 0,
    h: 'sizeof(char) is defined by the C standard to be exactly 1 byte.',
    explanation: 'In the C standard, `sizeof(char)` is explicitly defined to be exactly `1` byte (which is at least 8 bits).'
  },
  {
    t: 'Integer Division Truncation',
    c: 'Dividing two integers in C performs integer truncation, dropping the fractional part.',
    m: 'detective',
    code: `int a = 9;\nint b = 2;\nint res = a / b;\nprintf("%d", res);`,
    q: 'OUTPUT DETECTIVE: What is the truncated integer quotient of 9 / 2?',
    opts: [
      '4.5',
      '4',
      '5',
      '1'
    ],
    a: 1,
    h: 'Integer division discards any decimal portion without rounding.',
    explanation: 'In C, dividing two `int` types truncates toward zero. 9 / 2 results in integer `4`.'
  },
  {
    t: 'C Source Compilation Assembly',
    c: 'A basic C program includes headers, declares main, performs computations, and returns 0.',
    m: 'builder',
    codeBlocks: [
      '#include <stdio.h>',
      'int main(void) {',
      '    int core_temp = 72;',
      '    printf("TEMP: %d\\n", core_temp);',
      '    return 0;',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the valid C program execution structure:',
    h: 'Header include, main header, variable init, printf statement, return 0, closing brace.',
    explanation: 'The C compiler requires the header include before calling `printf`, followed by the function body and standard `return 0`.'
  },
  {
    t: 'Character Constants vs Strings',
    c: 'Single quotes \' \' denote a single char; double quotes " " denote a null-terminated string literal.',
    m: 'completion',
    code: `char status_code = ___;\nprintf("%c\\n", status_code);`,
    q: 'CODE COMPLETION: Choose the valid char constant for letter X:',
    opts: [
      '\'X\'',
      '"X"',
      'X',
      'char("X")'
    ],
    a: 0,
    h: 'Characters in C are wrapped in single quotes \' \'.',
    explanation: "In C, single quotes 'X' denote an integer character constant of type int/char. Double quotes \"X\" create a 2-byte array {'X', '\\0'}."
  },
  {
    t: 'Constants and Const Qualifier',
    c: 'The const type qualifier declares that an identifier value cannot be modified after initialization.',
    m: 'detective',
    code: `const int MAX_USERS = 50;\n// MAX_USERS = 60; // Compiler Error!\nprintf("%d", MAX_USERS);`,
    q: 'OUTPUT DETECTIVE: What is printed by printf("%d", MAX_USERS)?',
    opts: [
      '50',
      '60',
      '0',
      'Undefined'
    ],
    a: 0,
    h: 'The initialized constant value is 50.',
    explanation: '`const int MAX_USERS = 50;` prevents modification. Attempting to assign to it produces a compile-time error.'
  },
  // BOSS 1: Level 8
  {
    t: 'THE SEMICOLON SCOURGE',
    isBoss: true,
    name: 'THE SEMICOLON SCOURGE',
    hp: 500,
    avatar: '👹',
    story: 'A merciless compiler daemon in Memory Outpost that terminates any translation unit lacking semicolons!',
    phases: [
      {
        q: 'PHASE 1: Scourge tests statement terminators! What character must end every statement in C?',
        opts: ['; (semicolon)', ': (colon)', '. (period)', 'None, newlines suffice'],
        a: 0,
        explanation: 'In C, every statement must be terminated with a semicolon `;`.'
      },
      {
        q: 'PHASE 2: Scourge casts format specifier trap! Which format specifier prints a single character in printf?',
        opts: ['%c', '%s', '%d', '%ch'],
        a: 0,
        explanation: '`%c` formats and prints a single character.'
      },
      {
        q: 'PHASE 3: Scourge tests signed overflow behavior! In standard C, what is signed integer overflow considered?',
        opts: [
          'Undefined Behavior (UB)',
          'Guaranteed two\'s complement wrap-around',
          'Throws an OverflowException',
          'Silently clamps to INT_MAX'
        ],
        a: 0,
        explanation: 'In C, signed integer overflow is officially Undefined Behavior (UB), allowing the compiler to optimize under the assumption it never occurs.'
      },
      {
        q: 'PHASE 4: Scourge tests main exit code convention! What does returning 0 from main() signal to the OS?',
        opts: [
          'Successful termination (EXIT_SUCCESS)',
          'General error failure',
          'Program restart requested',
          'Memory leak detected'
        ],
        a: 0,
        explanation: 'Returning `0` from `main()` indicates successful execution to the operating system.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which header file declares standard integer types with exact widths like int32_t and uint8_t?',
        opts: ['<stdint.h>', '<stdlib.h>', '<limits.h>', '<string.h>'],
        a: 0,
        explanation: '`<stdint.h>` (introduced in C99) defines exact-width integer types such as `int8_t`, `int32_t`, and `uint64_t`.'
      }
    ]
  },

  // =========================================================================
  // AREA 2: LOGIC SECTOR (Lv 9-16) - CORE LOGIC & BITWISE
  // =========================================================================
  {
    t: 'Boolean Logic in C',
    c: 'In C, 0 represents false; any non-zero integer evaluates to true in a conditional context.',
    m: 'detective',
    code: `int flag = -5;\nif (flag) {\n    printf("ACTIVE\\n");\n} else {\n    printf("INACTIVE\\n");\n}`,
    q: 'OUTPUT DETECTIVE: -5 is non-zero. What does the if statement print?',
    opts: [
      '"ACTIVE"',
      '"INACTIVE"',
      'Compilation Error',
      'Segmentation Fault'
    ],
    a: 0,
    h: 'In C, any non-zero value (including negative numbers) is treated as true.',
    explanation: 'In C, any expression evaluating to any non-zero value (such as -5) is considered `true`.'
  },
  {
    t: 'Short-Circuit Evaluation',
    c: 'Logical operators && and || short-circuit; right operands are not evaluated if left determines result.',
    m: 'runner',
    code: `int x = 0;\nif (0 && ++x) {}\nprintf("%d", x);`,
    q: 'SPEED RUN: Because 0 is false, does ++x ever execute?',
    opts: [
      '0',
      '1',
      '-1',
      'Undefined'
    ],
    a: 0,
    h: '&& short-circuits on 0; the second operand is never evaluated.',
    explanation: 'Because the left operand `0` is false, `&&` short-circuits immediately. `++x` never runs, leaving `x = 0`.'
  },
  {
    t: 'Bitwise AND (&)',
    c: 'The bitwise & operator compares corresponding bits of two operands; yields 1 only if both bits are 1.',
    m: 'detective',
    code: `unsigned char a = 6;  // binary: 0110\nunsigned char b = 3;  // binary: 0011\nprintf("%d", a & b);`,
    q: 'OUTPUT DETECTIVE: 0110 & 0011 = 0010 in binary. What decimal number is printed?',
    opts: [
      '2',
      '1',
      '7',
      '0'
    ],
    a: 0,
    h: '0110 AND 0011 has a 1 only in the 2s place: 2.',
    explanation: 'Bitwise AND: bit 1 is 0, bit 2 is 1 (2), bit 3 is 0, bit 4 is 0. Result is 2.'
  },
  {
    t: 'Bitwise Left Shift (<<)',
    c: 'Left shifting a << n shifts bits to the left, equivalent to multiplying by 2^n.',
    m: 'detective',
    code: `int val = 5 << 2; // 5 * 4\nprintf("%d", val);`,
    q: 'OUTPUT DETECTIVE: What is 5 shifted left by 2 bit positions (5 * 2^2)?',
    opts: [
      '20',
      '10',
      '25',
      '7'
    ],
    a: 0,
    h: '5 * 4 = 20.',
    explanation: '`5 << 2` shifts bits left by 2 positions (multiplying by 2^2 = 4), resulting in `20`.'
  },
  {
    t: 'Switch Case Fallthrough & Break',
    c: 'switch statements require break to prevent falling through to subsequent case labels.',
    m: 'builder',
    codeBlocks: [
      'int sector = 2;',
      'switch (sector) {',
      '    case 1: printf("S1\\n"); break;',
      '    case 2: printf("S2\\n"); break;',
      '    default: printf("DEF\\n"); break;',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the clean switch-case dispatch block with breaks:',
    h: 'Declare sector, switch statement, case 1 with break, case 2 with break, default with break, close brace.',
    explanation: 'Each case requires a `break` to avoid unintentional fall-through to the next case.'
  },
  {
    t: 'Ternary Operator in C',
    c: 'The conditional operator condition ? expr1 : expr2 returns expr1 if condition is non-zero, else expr2.',
    m: 'completion',
    code: `int hp = 25;\nconst char *alert = (hp < 50) ___ "LOW" : "OK";\nprintf("%s", alert);`,
    q: 'CODE COMPLETION: Choose the missing token to complete the ternary expression:',
    opts: [
      '?',
      'then',
      ':',
      '->'
    ],
    a: 0,
    h: 'The ternary operator format is condition ? val_if_true : val_if_false.',
    explanation: 'The ternary operator in C uses `?` following the condition, and `:` separating true and false branches.'
  },
  {
    t: 'Bitwise XOR Swap Trick',
    c: '^ is bitwise exclusive OR. Two values can be swapped without a temporary variable using XOR.',
    m: 'detective',
    code: `int a = 5, b = 9;\na = a ^ b;\nb = a ^ b;\na = a ^ b;\nprintf("a=%d b=%d", a, b);`,
    q: 'OUTPUT DETECTIVE: What are the values of a and b after the 3-step XOR swap?',
    opts: [
      'a=9 b=5',
      'a=5 b=9',
      'a=0 b=0',
      'a=14 b=14'
    ],
    a: 0,
    h: 'The three XOR operations exchange the values of a and b.',
    explanation: 'The classic 3-step XOR swap exchanges the values of `a` and `b` in-place, resulting in `a=9` and `b=5`.'
  },
  // BOSS 2: Level 16
  {
    t: 'THE NULL POINTER TITAN',
    isBoss: true,
    name: 'THE NULL POINTER TITAN',
    hp: 600,
    avatar: '🗿',
    story: 'A hulking entity guarding the logic boundary of Logic Sector. It obliterates any program that dereferences address 0x0!',
    phases: [
      {
        q: 'PHASE 1: Titan tests NULL definition! What is NULL typically defined as in standard C headers?',
        opts: ['((void *)0)', '0xFFFFFFFF', '-1', '"NULL"'],
        a: 0,
        explanation: 'In C, `NULL` is defined in `<stddef.h>` and other headers as an integer constant expression with the value 0, typically `((void *)0)`.'
      },
      {
        q: 'PHASE 2: Titan tests dereference crash! What happens when a program dereferences a NULL pointer (*(int *)NULL)?',
        opts: [
          'Segmentation Fault / Crash (Undefined Behavior)',
          'Returns 0 silently',
          'Throws a NullPointerException',
          'Resets the CPU'
        ],
        a: 0,
        explanation: 'Dereferencing `NULL` violates memory access privileges, resulting in undefined behavior—almost universally crashing with a Segmentation Fault.'
      },
      {
        q: 'PHASE 3: Titan queries bitwise NOT operator! Which operator performs bitwise NOT (one\'s complement) in C?',
        opts: ['~', '!', '^', '&'],
        a: 0,
        explanation: 'The tilde `~` operator inverts all bits (bitwise NOT). The exclamation point `!` is logical NOT.'
      },
      {
        q: 'PHASE 4: Titan queries boolean type inclusion! Which header introduced the bool type and true/false constants in C99?',
        opts: ['<stdbool.h>', '<boolean.h>', '<types.h>', '<stdlib.h>'],
        a: 0,
        explanation: 'C99 added `<stdbool.h>`, defining `bool`, `true`, and `false` as macros over `_Bool`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What does bitwise expression x & (x - 1) do to a positive integer x?',
        opts: [
          'Clears the lowest set bit (used to test if x is a power of 2)',
          'Multiplies x by 2',
          'Reverses all bits',
          'Sets all bits to 1'
        ],
        a: 0,
        explanation: '`x & (x - 1)` clears the least-significant set bit. If the result is 0 (and x > 0), x is an exact power of 2.'
      }
    ]
  },

  // =========================================================================
  // AREA 3: LOOP CHAMBER (Lv 17-24) - ITERATION & CONTROL FLOW
  // =========================================================================
  {
    t: 'For Loop Counter Mechanics',
    c: 'for loops declare initialization, loop condition, and step increment.',
    m: 'glitch',
    code: `int i;\nfor (i = 0; i < 3; i+1) {\n    printf("%d ", i);\n}`,
    q: 'BUG HUNTER: The loop runs forever because i is never updated! What should replace i+1?',
    opts: [
      'i++',
      'i == 1',
      'i - 1',
      'i <= 3'
    ],
    a: 0,
    h: 'Use the increment operator i++ or i += 1.',
    explanation: '`i+1` calculates a value but does not reassign it back to `i`. `i++` increments and stores the updated value.'
  },
  {
    t: 'Do..While Post-Condition',
    c: 'do..while guarantees at least one execution because condition evaluation occurs at the end.',
    m: 'runner',
    code: `int n = 10;\ndo {\n    n += 5;\n} while (n < 10);\nprintf("%d", n);`,
    q: 'SPEED RUN: What is the value of n after the single pass through do..while?',
    opts: [
      '15',
      '10',
      '20',
      '0'
    ],
    a: 0,
    h: 'The body runs once before checking n < 10: 10 + 5 = 15.',
    explanation: '`n` is incremented to 15. The condition `15 < 10` is false, so the loop exits with `n = 15`.'
  },
  {
    t: 'Loop Break Interruption',
    c: 'break immediately terminates the loop and jumps to the statement following the loop.',
    m: 'detective',
    code: `int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i > 3) break;\n    sum += i;\n}\nprintf("%d", sum);`,
    q: 'OUTPUT DETECTIVE: What is sum when the loop breaks on i > 3 (1 + 2 + 3)?',
    opts: [
      '6',
      '10',
      '15',
      '3'
    ],
    a: 0,
    h: '1 + 2 + 3 = 6.',
    explanation: 'The loop adds 1, 2, and 3 (sum = 6). When `i` becomes 4, `i > 3` triggers `break`, terminating the loop.'
  },
  {
    t: 'Continue Cycle Skip',
    c: 'continue skips the rest of the current iteration and jumps directly to the step increment clause.',
    m: 'detective',
    code: `int count = 0;\nfor (int i = 0; i < 5; i++) {\n    if (i == 2) continue;\n    count++;\n}\nprintf("%d", count);`,
    q: 'OUTPUT DETECTIVE: Iteration i = 2 is skipped. What is the final value of count?',
    opts: [
      '4',
      '5',
      '3',
      '2'
    ],
    a: 0,
    h: 'Out of 5 iterations (0, 1, 2, 3, 4), 1 is skipped: 5 - 1 = 4.',
    explanation: 'The loop runs for i = 0, 1, 3, 4. When i = 2, `continue` skips incrementing `count`. Total count is 4.'
  },
  {
    t: 'Nested Loop Matrix Accumulator',
    c: 'Nested loops iterate over multi-dimensional spaces; outer loop steps once per complete inner loop run.',
    m: 'builder',
    codeBlocks: [
      'int cells = 0;',
      'for (int r = 0; r < 2; r++) {',
      '    for (int c = 0; c < 3; c++) {',
      '        cells++;',
      '    }',
      '}',
      'printf("Cells: %d\\n", cells);'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    q: 'CODE BUILDER: Assemble the 2x3 nested loop counter:',
    h: 'Initialize cells, outer loop r from 0 to 2, inner loop c from 0 to 3, cells++, close loops, print.',
    explanation: 'The outer loop runs 2 times and inner loop 3 times, giving 2 * 3 = 6 total cell increments.'
  },
  {
    t: 'Infinite While Loop with Break',
    c: 'while(1) creates an infinite loop frequently used for game loops and embedded hardware listeners.',
    m: 'completion',
    code: `int ticks = 0;\nwhile (___) {\n    ticks++;\n    if (ticks == 5) break;\n}\nprintf("%d", ticks);`,
    q: 'CODE COMPLETION: Choose the standard idiom for an infinite loop condition in C:',
    opts: [
      '1',
      'true()',
      'forever',
      'loop'
    ],
    a: 0,
    h: 'In C, 1 is the canonical non-zero truth constant for while loops.',
    explanation: '`while (1)` is the classic and standard C idiom for an intentional infinite loop.'
  },
  {
    t: 'Comma Operator in For Loop Header',
    c: 'The comma operator evaluates both operands and returns the value of the second operand.',
    m: 'detective',
    code: `int i, j, sum = 0;\nfor (i = 0, j = 10; i < 2; i++, j--) {\n    sum += j;\n}\nprintf("%d", sum);`,
    q: 'OUTPUT DETECTIVE: i=0 (j=10), i=1 (j=9). What is sum (10 + 9)?',
    opts: [
      '19',
      '20',
      '10',
      '9'
    ],
    a: 0,
    h: 'First iteration adds 10; second iteration adds 9: 10 + 9 = 19.',
    explanation: 'The comma operator allows multiple initializations and increments. In iteration 1, j=10; in iteration 2, j=9. 10 + 9 = 19.'
  },
  // BOSS 3: Level 24
  {
    t: 'THE STACK OVERFLOW WRAITH',
    isBoss: true,
    name: 'THE STACK OVERFLOW WRAITH',
    hp: 700,
    avatar: '👻',
    story: 'A spectral entity haunting Loop Chamber, overflowing call frames and corrupting the instruction pointer!',
    phases: [
      {
        q: 'PHASE 1: Wraith tests stack frame exhaustion! What causes a Stack Overflow in C?',
        opts: [
          'Uncontrolled or infinitely deep recursion consuming all stack memory',
          'Using too many printf calls',
          'Allocating memory with malloc()',
          'Using a while(1) loop'
        ],
        a: 0,
        explanation: 'Each function invocation pushes a new stack frame (return address, arguments, locals). Infinite recursion exhausts available stack memory.'
      },
      {
        q: 'PHASE 2: Wraith tests goto statement! Which keyword performs an unconditional jump to a labeled statement?',
        opts: ['goto', 'jump', 'skip', 'branch'],
        a: 0,
        explanation: 'The `goto` keyword jumps unconditionally to a local label within the current function.'
      },
      {
        q: 'PHASE 3: Wraith queries pre vs post increment! If int x = 5, what is y = ++x?',
        opts: ['y = 6, x = 6', 'y = 5, x = 6', 'y = 5, x = 5', 'y = 6, x = 5'],
        a: 0,
        explanation: 'Pre-increment `++x` increments `x` first (to 6) and returns the new value, so both `y` and `x` are 6.'
      },
      {
        q: 'PHASE 4: Wraith queries loop without braces! How many statements belong to a for loop lacking curly braces { }?',
        opts: [
          'Exactly one statement following the header',
          'All statements until the next blank line',
          'Zero statements (it is a syntax error)',
          'All indented statements'
        ],
        a: 0,
        explanation: 'In C, control flow statements without braces attach to only the single immediately following statement.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which storage class specifier requests the compiler to store a variable in a CPU register?',
        opts: ['register', 'volatile', 'auto', 'extern'],
        a: 0,
        explanation: 'The `register` keyword hints to the compiler that the variable should be kept in a high-speed CPU register if possible.'
      }
    ]
  },

  // =========================================================================
  // AREA 4: FUNCTION LAB (Lv 25-32) - FUNCTIONS & MODULARITY
  // =========================================================================
  {
    t: 'Function Prototypes',
    c: 'A function prototype declares a function\'s name, return type, and parameters before its definition.',
    m: 'glitch',
    code: `int main(void) {\n    int dmg = calculate_damage(50); // Warning / Error without prototype!\n    return 0;\n}\nint calculate_damage(int base) { return base * 2; }`,
    q: 'BUG HUNTER: C requires functions to be declared before first call. What prototype must be placed at the top?',
    opts: [
      'int calculate_damage(int base);',
      'function calculate_damage(int): int;',
      'def calculate_damage(int base);',
      'declare calculate_damage;'
    ],
    a: 0,
    h: 'Copy the function signature followed by a semicolon above main().',
    explanation: 'Placing `int calculate_damage(int base);` above `main()` informs the compiler of the function\'s existence and parameter signature.'
  },
  {
    t: 'Pass by Value in C',
    c: 'C passes all arguments by value (making a copy). Modifying a parameter does not affect the caller.',
    m: 'runner',
    code: `void modify(int x) {\n    x = 100;\n}\nint main(void) {\n    int val = 10;\n    modify(val);\n    printf("%d", val);\n    return 0;\n}`,
    q: 'SPEED RUN: Because C is pass-by-value, what does printf("%d", val) output?',
    opts: [
      '10',
      '100',
      '0',
      'Undefined'
    ],
    a: 0,
    h: 'The function modify only changes its own local copy of x.',
    explanation: 'In C, arguments are passed by value. `modify(val)` receives a local copy; `val` in `main()` remains unchanged at 10.'
  },
  {
    t: 'Pass by Pointer (Reference Simulation)',
    c: 'To modify the caller\'s variable, pass the memory address (&val) and dereference (*ptr) inside the function.',
    m: 'detective',
    code: `void heal(int *hp) {\n    *hp += 50;\n}\nint main(void) {\n    int health = 50;\n    heal(&health);\n    printf("%d", health);\n    return 0;\n}`,
    q: 'OUTPUT DETECTIVE: What is health after heal(&health) modifies it via pointer dereference?',
    opts: [
      '100',
      '50',
      '0',
      'Segmentation Fault'
    ],
    a: 0,
    h: 'health starts at 50, and heal adds 50 through the pointer: 50 + 50 = 100.',
    explanation: '`heal(&health)` passes the address of `health`. `*hp += 50` dereferences that address and modifies the original variable to 100.'
  },
  {
    t: 'Static Local Variables',
    c: 'A static local variable retains its value between function invocations for the program lifetime.',
    m: 'detective',
    code: `int get_id(void) {\n    static int id = 100;\n    id++;\n    return id;\n}\nint main(void) {\n    get_id();\n    printf("%d", get_id());\n    return 0;\n}`,
    q: 'OUTPUT DETECTIVE: id persists across calls (100 -> 101 -> 102). What does the second call return?',
    opts: [
      '102',
      '101',
      '100',
      'Undefined'
    ],
    a: 0,
    h: 'Call 1 increments id to 101; Call 2 increments id to 102.',
    explanation: 'Static local variables are initialized only once and persist across function calls in data memory. The second call returns 102.'
  },
  {
    t: 'Recursive Factorial Function',
    c: 'A recursive function calls itself to break down problems until reaching a base condition.',
    m: 'builder',
    codeBlocks: [
      'int factorial(int n) {',
      '    if (n <= 1) return 1;',
      '    return n * factorial(n - 1);',
      '}'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the classic recursive factorial function:',
    h: 'Function header, base case checking n <= 1, recursive step n * factorial(n - 1), close brace.',
    explanation: 'The base case `if (n <= 1) return 1;` stops recursion; otherwise it recurses on `n - 1`.'
  },
  {
    t: 'Void Functions with Return',
    c: 'A void function returns no value, but a bare return; can be used to exit early.',
    m: 'completion',
    code: `void purge_cache(int emergency) {\n    if (!emergency) ___; // exit immediately\n    printf("PURGED\\n");\n}`,
    q: 'CODE COMPLETION: Choose the statement that terminates the void function early:',
    opts: [
      'return;',
      'return 0;',
      'break;',
      'exit;'
    ],
    a: 0,
    h: 'In a void function, use a bare return; with no expression.',
    explanation: 'In C, functions with `void` return type exit using `return;` without supplying any value.'
  },
  {
    t: 'The Inline Function Specifier',
    c: 'The inline specifier suggests to the compiler that the function call overhead be replaced by direct code expansion.',
    m: 'detective',
    code: `static inline int square(int x) {\n    return x * x;\n}\nint main(void) {\n    printf("%d", square(5));\n    return 0;\n}`,
    q: 'OUTPUT DETECTIVE: What is printed by square(5)?',
    opts: [
      '25',
      '10',
      '5',
      'Compilation Error'
    ],
    a: 0,
    h: '5 * 5 = 25.',
    explanation: 'The `inline` keyword suggests substituting the function code inline at the call site. 5 * 5 is 25.'
  },
  // BOSS 4: Level 32
  {
    t: 'THE SCOPE GARGOYLE',
    isBoss: true,
    name: 'THE SCOPE GARGOYLE',
    hp: 800,
    avatar: '🗿',
    story: 'A stone guardian overlooking Function Lab, enforcing linkage rules and preventing symbol pollution.',
    phases: [
      {
        q: 'PHASE 1: Gargoyle tests internal linkage! What keyword restricts a global variable or function to its translation unit?',
        opts: ['static', 'extern', 'volatile', 'private'],
        a: 0,
        explanation: 'In file scope, `static` gives a function or variable internal linkage, restricting visibility to that file only.'
      },
      {
        q: 'PHASE 2: Gargoyle tests external linkage! What keyword declares a variable defined in a different source file?',
        opts: ['extern', 'static', 'export', 'import'],
        a: 0,
        explanation: '`extern` declares a global variable or function that is defined in another translation unit.'
      },
      {
        q: 'PHASE 3: Gargoyle queries C calling conventions! How are arguments typically pushed onto the stack in standard cdecl?',
        opts: [
          'Right-to-left, with caller cleaning the stack',
          'Left-to-right, with callee cleaning the stack',
          'In alphabetic order',
          'Always in hardware CPU registers only'
        ],
        a: 0,
        explanation: 'The standard `cdecl` calling convention pushes arguments onto the stack from right to left, and the caller cleans up the stack.'
      },
      {
        q: 'PHASE 4: Gargoyle tests variadic functions! Which header is required to handle variable argument lists like ... in printf?',
        opts: ['<stdarg.h>', '<varargs.h>', '<stdargs.h>', '<stdlib.h>'],
        a: 0,
        explanation: '`<stdarg.h>` provides `va_list`, `va_start`, `va_arg`, and `va_end` for variadic functions.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Can C functions return an entire array directly by value (e.g. int[5] get_array())?',
        opts: [
          'No, C functions cannot return arrays directly (must return pointer or wrap in struct)',
          'Yes, any array can be returned directly by value',
          'Only arrays of char can be returned',
          'Only in C11 and later'
        ],
        a: 0,
        explanation: 'In C, functions cannot return array types directly. You must return a pointer or enclose the array inside a `struct`.'
      }
    ]
  },

  // =========================================================================
  // AREA 5: POINTER PEAKS (Lv 33-40) - POINTERS & STRINGS
  // =========================================================================
  {
    t: 'Address-of and Dereference',
    c: '& obtains the memory address of a variable; * dereferences a pointer to access the value stored at that address.',
    m: 'glitch',
    code: `int val = 42;\nint *ptr = val; // Bug: assigning int to int*`,
    q: 'BUG HUNTER: Initializing pointer with raw integer value causes a compiler error. What operator obtains the address?',
    opts: [
      '&val',
      '*val',
      '@val',
      'addr(val)'
    ],
    a: 0,
    h: 'Use the & (address-of) operator.',
    explanation: 'Pointers store memory addresses. To point `ptr` to `val`, use the address-of operator: `int *ptr = &val;`.'
  },
  {
    t: 'Pointer Dereferencing Read',
    c: '*ptr accesses the memory location pointed to by ptr.',
    m: 'runner',
    code: `int data = 128;\nint *p = &data;\nprintf("%d", *p);`,
    q: 'SPEED RUN: What is printed by dereferencing *p?',
    opts: [
      '128',
      'A hex memory address (e.g. 0x7fff...)',
      '0',
      'Segmentation Fault'
    ],
    a: 0,
    h: '*p accesses the integer 128 stored at the address.',
    explanation: '`p` holds the address of `data`. Dereferencing `*p` yields the integer value stored there: `128`.'
  },
  {
    t: 'Pointer Arithmetic',
    c: 'Adding 1 to a pointer (ptr + 1) advances the address by sizeof(*ptr) bytes, NOT 1 byte!',
    m: 'detective',
    code: `int arr[3] = {10, 20, 30};\nint *p = arr;\nprintf("%d", *(p + 1));`,
    q: 'OUTPUT DETECTIVE: What value is located at *(p + 1)?',
    opts: [
      '20',
      '10',
      '30',
      '11'
    ],
    a: 0,
    h: 'p + 1 advances to the next array element (index 1).',
    explanation: 'Pointer arithmetic scales by `sizeof(int)`. `*(p + 1)` accesses `arr[1]`, which is `20`.'
  },
  {
    t: 'Array and Pointer Equivalence',
    c: 'In most contexts, an array name decays into a pointer to its first element: arr[i] == *(arr + i).',
    m: 'detective',
    code: `int nums[3] = {5, 15, 25};\nprintf("%d", 1[nums]);`,
    q: 'OUTPUT DETECTIVE: By C pointer symmetry, 1[nums] == *(1 + nums) == nums[1]! What is printed?',
    opts: [
      '15',
      '5',
      '25',
      'Compilation Error'
    ],
    a: 0,
    h: '1[nums] is equivalent to nums[1].',
    explanation: 'Because array subscripting `a[b]` is defined as `*(a + b)`, addition is commutative: `nums[1]` and `1[nums]` both evaluate to `15`.'
  },
  {
    t: 'Null-Terminated Strings in C',
    c: 'In C, strings are character arrays terminated by a null byte \'\\0\' (ASCII 0).',
    m: 'builder',
    codeBlocks: [
      '#include <stdio.h>',
      '#include <string.h>',
      'int main(void) {',
      '    char msg[] = "CYBER";',
      '    printf("len=%zu\\n", strlen(msg));',
      '    return 0;',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    q: 'CODE BUILDER: Assemble the strlen string length measurement program:',
    h: 'Headers stdio and string.h, main, declare string, print strlen, return 0.',
    explanation: '`strlen` in `<string.h>` counts characters up to (but not including) the terminating null byte `\'\\0\'`.'
  },
  {
    t: 'Buffer Overflow Vulnerability (strcpy vs strncpy)',
    c: 'strcpy does not check destination buffer boundaries; strncpy bounds the maximum bytes copied.',
    m: 'completion',
    code: `char dest[5];\n___(dest, "OVERFLOW", sizeof(dest) - 1);\ndest[4] = '\\0';`,
    q: 'CODE COMPLETION: Choose the safer bounded copy function from <string.h>:',
    opts: [
      'strncpy',
      'strcpy',
      'strcat',
      'memcpy_unsafe'
    ],
    a: 0,
    h: 'Use strncpy with buffer bounds.',
    explanation: '`strncpy` limits the number of bytes copied to prevent writing beyond the allocated destination buffer.'
  },
  {
    t: 'Pointer to Pointer (Double Pointer)',
    c: 'A pointer to a pointer (int **pp) stores the address of another pointer.',
    m: 'detective',
    code: `int val = 99;\nint *p = &val;\nint **pp = &p;\nprintf("%d", **pp);`,
    q: 'OUTPUT DETECTIVE: Double dereferencing **pp accesses val. What is printed?',
    opts: [
      '99',
      'Address of p',
      'Address of val',
      'Undefined'
    ],
    a: 0,
    h: '**pp dereferences pp to p, then p to val (99).',
    explanation: '`**pp` dereferences the pointer to the pointer, yielding the original integer `val` (99).'
  },
  // BOSS 5: Level 40
  {
    t: 'THE DANGLING POINTER LICH',
    isBoss: true,
    name: 'THE DANGLING POINTER LICH',
    hp: 900,
    avatar: '💀',
    story: 'An undead horror lurking in Pointer Peaks. It preys upon pointers pointing to deallocated stack frames!',
    phases: [
      {
        q: 'PHASE 1: Lich tests dangling pointers! What defines a "dangling pointer"?',
        opts: [
          'A pointer that still references memory that has been deallocated or freed',
          'A pointer set to NULL',
          'A pointer that points to another pointer',
          'A pointer declared without static'
        ],
        a: 0,
        explanation: 'A dangling pointer points to a memory location that has already been deallocated (e.g. after `free()` or returning address of a local variable).'
      },
      {
        q: 'PHASE 2: Lich tests returning local address! What error occurs if a function executes return &local_var?',
        opts: [
          'Returning address of stack memory that becomes invalid upon function exit',
          'Stack memory is automatically converted to heap',
          'The program terminates with a compiler warning only and works fine',
          'SyntaxError'
        ],
        a: 0,
        explanation: 'Local stack variables are popped when the function returns. Returning their address leaves a dangling pointer to reclaimed stack space.'
      },
      {
        q: 'PHASE 3: Lich queries void pointer capabilities! Can you directly dereference a void *ptr (*ptr) without casting?',
        opts: [
          'No, void has no size; you must cast to a concrete type first',
          'Yes, it defaults to dereferencing 1 byte',
          'Yes, it defaults to int',
          'Only in GCC'
        ],
        a: 0,
        explanation: 'A `void *` represents raw address memory with no type or size; the compiler cannot know how many bytes to read without a typecast.'
      },
      {
        q: 'PHASE 4: Lich tests string literal modification! What happens if a program tries to modify a string literal: char *s = "HI"; s[0] = \'B\';?',
        opts: [
          'Segmentation Fault / Crash (string literals are typically in read-only memory)',
          's becomes "BI"',
          'The literal is cloned into heap',
          'Compiler changes it to a char array'
        ],
        a: 0,
        explanation: 'String literals are stored in read-only memory segments (like .rodata). Writing to them invokes undefined behavior, usually crashing.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What best practice neutralizes a pointer immediately after free(ptr)?',
        opts: [
          'ptr = NULL;',
          'free(&ptr);',
          'ptr = (void *)1;',
          'delete ptr;'
        ],
        a: 0,
        explanation: 'Setting `ptr = NULL` immediately after `free(ptr)` prevents accidental double-free or dangling pointer dereference bugs.'
      }
    ]
  },

  // =========================================================================
  // AREA 6: HEAP HIGHLANDS (Lv 41-48) - DYNAMIC MEMORY & STRUCTS
  // =========================================================================
  {
    t: 'Dynamic Allocation with malloc()',
    c: 'malloc(size) allocates size contiguous bytes on the heap and returns a void* pointer.',
    m: 'glitch',
    code: `int *arr = malloc(5 * sizeof(int));\n// Using arr without checking if malloc succeeded!`,
    q: 'BUG HUNTER: What critical verification must follow any malloc() call before using the pointer?',
    opts: [
      'Check if (arr == NULL)',
      'Call sizeof(arr)',
      'Execute free(arr) immediately',
      'Cast arr to (char *)'
    ],
    a: 0,
    h: 'If the system is out of memory, malloc returns NULL.',
    explanation: 'If memory allocation fails, `malloc` returns `NULL`. Failing to check `if (arr == NULL)` will crash if dereferenced.'
  },
  {
    t: 'Freeing Heap Memory',
    c: 'Every memory block allocated with malloc, calloc, or realloc must be returned using free().',
    m: 'runner',
    code: `int *ptr = (int *)malloc(sizeof(int));\n*ptr = 77;\nfree(ptr);`,
    q: 'SPEED RUN: What function deallocates heap memory in standard C?',
    opts: [
      'free()',
      'delete()',
      'dispose()',
      'clear()'
    ],
    a: 0,
    h: 'In C, memory is freed with free().',
    explanation: 'C uses `free()` from `<stdlib.h>` to deallocate dynamically allocated heap memory.'
  },
  {
    t: 'Calloc Zero-Initialization',
    c: 'calloc(num, size) allocates memory and initializes all bytes to zero.',
    m: 'detective',
    code: `int *arr = (int *)calloc(3, sizeof(int));\nprintf("%d %d %d", arr[0], arr[1], arr[2]);\nfree(arr);`,
    q: 'OUTPUT DETECTIVE: What values does calloc initialize the elements to?',
    opts: [
      '0 0 0',
      'Garbage memory values',
      '1 1 1',
      '-1 -1 -1'
    ],
    a: 0,
    h: 'calloc clears all allocated bits to zero.',
    explanation: 'Unlike `malloc` which leaves memory uninitialized (garbage values), `calloc` zeroes out all allocated memory.'
  },
  {
    t: 'C Structures (struct)',
    c: 'struct groups different data types together into a single cohesive record.',
    m: 'builder',
    codeBlocks: [
      'struct Node {',
      '    int id;',
      '    int energy;',
      '};',
      'struct Node n1 = {1, 100};',
      'printf("ID: %d\\n", n1.id);'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the C struct definition, instantiation, and member access:',
    h: 'struct Node header, members id and energy, close struct with semicolon, instantiate n1, print n1.id.',
    explanation: 'Defining a `struct` creates a composite type. Members are accessed with the dot `.` operator on instances.'
  },
  {
    t: 'Arrow Operator (->) for Struct Pointers',
    c: 'ptr->member is syntactic shorthand for (*ptr).member when working with struct pointers.',
    m: 'completion',
    code: `struct Player { int hp; };\nstruct Player hero = { 100 };\nstruct Player *p = &hero;\np___hp = 80;`,
    q: 'CODE COMPLETION: Choose the operator to access struct members through a pointer:',
    opts: [
      '->',
      '.',
      '::',
      '=>'
    ],
    a: 0,
    h: 'Use the arrow operator -> for pointer member access.',
    explanation: 'In C, `p->hp` is equivalent to `(*p).hp`. The arrow operator dereferences the pointer and accesses the member.'
  },
  {
    t: 'Typedef Struct Simplification',
    c: 'typedef creates an alias for a type, eliminating the need to type "struct Name" every time.',
    m: 'detective',
    code: `typedef struct {\n    int x, y;\n} Point;\nPoint pt = {10, 20};\nprintf("%d", pt.x + pt.y);`,
    q: 'OUTPUT DETECTIVE: What is printed by pt.x + pt.y (10 + 20)?',
    opts: [
      '30',
      '1020',
      '0',
      'Compilation Error'
    ],
    a: 0,
    h: '10 + 20 = 30.',
    explanation: '`typedef struct { ... } Point;` allows declaring `Point pt` without the `struct` keyword. 10 + 20 = 30.'
  },
  {
    t: 'Memory Leak Detection',
    c: 'Failing to call free() on allocated memory before losing all pointer references produces a memory leak.',
    m: 'detective',
    code: `void spawn(void) {\n    int *data = malloc(1024);\n    // Missing free(data);\n}\n// data pointer is lost upon return!`,
    q: 'OUTPUT DETECTIVE / DEBUG: What problem occurs when data is not freed before spawn() returns?',
    opts: [
      'A memory leak (1024 bytes remain allocated on the heap but unreachable)',
      'Segmentation Fault immediately',
      'Automatic garbage collection frees it',
      'The CPU halts'
    ],
    a: 0,
    h: 'C has no garbage collector. Unfreed heap memory remains allocated.',
    explanation: 'Because C lacks automatic garbage collection, abandoning allocated heap pointers without calling `free()` causes a permanent memory leak.'
  },
  // BOSS 6: Level 48
  {
    t: 'THE SEGFAULT OVERLORD',
    isBoss: true,
    name: 'THE SEGFAULT OVERLORD',
    hp: 1000,
    avatar: '👾',
    story: 'The master of Heap Highlands. It commands memory access faults, heap corruption, and buffer overruns!',
    phases: [
      {
        q: 'PHASE 1: Overlord tests realloc! What does realloc(ptr, new_size) do?',
        opts: [
          'Resizes the memory block, potentially moving it to a new location and copying existing data',
          'Frees the pointer without returning anything',
          'Only shrinks memory, never expands',
          'Zeros all memory'
        ],
        a: 0,
        explanation: '`realloc()` resizes an allocated memory block. If it cannot expand in place, it allocates new space, copies data, frees old memory, and returns the new pointer.'
      },
      {
        q: 'PHASE 2: Overlord tests double-free vulnerability! What happens if free(ptr) is called twice on the exact same pointer?',
        opts: [
          'Undefined Behavior / Heap Corruption crash',
          'Silently ignored on second call',
          'Frees neighboring memory',
          'Throws a DoubleFreeException'
        ],
        a: 0,
        explanation: 'Calling `free()` twice on the same address corrupts the internal heap management metadata structures, causing undefined behavior or crashes.'
      },
      {
        q: 'PHASE 3: Overlord queries struct memory padding! Why is sizeof(struct { char c; int i; }) usually 8 bytes on a 32/64-bit machine instead of 5?',
        opts: [
          'The compiler adds 3 padding bytes for memory alignment efficiency',
          'char always takes 4 bytes in structs',
          'int takes 7 bytes',
          'It is a compiler bug'
        ],
        a: 0,
        explanation: 'Processors access memory much faster when data is aligned to word boundaries. Compilers insert padding bytes between struct members to enforce alignment.'
      },
      {
        q: 'PHASE 4: Overlord queries memory copy functions! What is the difference between memcpy() and memmove()?',
        opts: [
          'memmove safely handles overlapping memory regions; memcpy does not',
          'memcpy is for strings only; memmove is for integers',
          'memmove is 10x slower',
          'memcpy allocates heap memory automatically'
        ],
        a: 0,
        explanation: '`memmove()` utilizes a temporary buffer or copies backward to safely handle overlapping source and destination memory; `memcpy()` requires non-overlapping buffers.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which diagnostic tool is standard on Linux/UNIX for detecting memory leaks and illegal memory accesses in C programs?',
        opts: ['Valgrind', 'GDB', 'Make', 'GCC'],
        a: 0,
        explanation: 'Valgrind (specifically the Memcheck tool) is the premier tool for detecting memory leaks, uninitialized memory reads, and invalid heap operations.'
      }
    ]
  },

  // =========================================================================
  // AREA 7: KERNEL CORE & MASTER CHALLENGES (Lv 49-51)
  // =========================================================================
  {
    t: 'Function Pointers',
    c: 'Function pointers store the address of executable code, allowing functions to be passed as callbacks.',
    m: 'detective',
    code: `int add(int a, int b) { return a + b; }\nint main(void) {\n    int (*op)(int, int) = add;\n    printf("%d", op(10, 20));\n    return 0;\n}`,
    q: 'OUTPUT DETECTIVE: Function pointer op points to add. What does op(10, 20) return?',
    opts: [
      '30',
      'Address of add',
      '10',
      'Compilation Error'
    ],
    a: 0,
    h: 'op invokes add(10, 20). 10 + 20 = 30.',
    explanation: '`int (*op)(int, int) = add;` creates a function pointer pointing to `add`. Calling `op(10, 20)` executes `add`, returning 30.'
  },
  {
    t: 'Preprocessor Macros & #define',
    c: '#define creates preprocessor text substitutions before compilation begins.',
    m: 'builder',
    codeBlocks: [
      '#define MAX(a, b) ((a) > (b) ? (a) : (b))',
      'int main(void) {',
      '    int top = MAX(15, 40);',
      '    printf("Top: %d\\n", top);',
      '    return 0;',
      '}'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    q: 'CODE BUILDER: Assemble the preprocessor macro definition and usage:',
    h: '#define MAX macro with parentheses, main header, invoke MAX, print, return 0.',
    explanation: 'Macro arguments must be wrapped in parentheses `((a) > (b) ? (a) : (b))` to prevent operator precedence bugs during expansion.'
  },
  // FINAL BOSS: Level 51
  {
    t: 'THE HARDWARE DAEMON',
    isBoss: true,
    isFinalBoss: true,
    name: 'THE HARDWARE DAEMON',
    hp: 1200,
    avatar: '👑',
    story: 'THE ABSOLUTE ARCHITECT OF BARE-METAL C! It commands CPU caches, memory controllers, OS kernel system calls, and hardware interrupt vectors. Conquer it to achieve C Mastery!',
    phases: [
      {
        q: 'PHASE 1: Daemon tests the volatile qualifier! What does declaring a variable volatile int *reg do?',
        opts: [
          'Tells the compiler that the value may change unexpectedly (e.g. hardware register) and forbids caching it in CPU registers',
          'Prevents multiple threads from writing to it',
          'Stores the variable in volatile RAM instead of disk cache',
          'Makes the variable constant'
        ],
        a: 0,
        explanation: 'The `volatile` keyword tells the optimizer that the variable\'s value can change at any time without any action taken by the code, forcing direct memory reads.'
      },
      {
        q: 'PHASE 2: Daemon queries union memory behavior! How much memory does a union allocate?',
        opts: [
          'Enough to hold its largest member (all members share the exact same memory space)',
          'The sum of all member sizes',
          'Always 64 bytes',
          '4 bytes fixed'
        ],
        a: 0,
        explanation: 'A `union` stores different types in the same memory location; its size is equal to the size of its largest member.'
      },
      {
        q: 'PHASE 3: Daemon queries memory endianness! On a Little-Endian architecture, how is the 32-bit int 0x12345678 stored in sequential memory bytes?',
        opts: [
          '0x78, 0x56, 0x34, 0x12 (least significant byte at lowest address)',
          '0x12, 0x34, 0x56, 0x78 (most significant byte at lowest address)',
          '0x34, 0x12, 0x78, 0x56',
          '0x00, 0x00, 0x12, 0x78'
        ],
        a: 0,
        explanation: 'Little-endian stores the least-significant byte (LSB, 0x78) at the lowest memory address.'
      },
      {
        q: 'PHASE 4: Daemon tests bit fields! What is the purpose of struct { unsigned int ready : 1; }?',
        opts: [
          'Allocates exactly 1 bit for the member ready to pack flags tightly',
          'Initializes ready to 1',
          'Sets a 1-second timeout',
          'Restricts ready to value 1 only'
        ],
        a: 0,
        explanation: 'Bit fields specify the exact number of bits allocated for structure members, minimizing memory footprints for hardware register representations.'
      },
      {
        q: 'PHASE 5: MASTER STRIKE! Which POSIX C function allocates a specified number of bytes aligned to a specified boundary (e.g. for SIMD/AVX)?',
        opts: ['posix_memalign()', 'malloc_aligned()', 'aligned_alloc()', 'heap_align()'],
        a: 0,
        explanation: '`posix_memalign()` allocates memory aligned to a specified alignment boundary (must be a power of two multiple of sizeof(void*)).'
      }
    ]
  }
];
