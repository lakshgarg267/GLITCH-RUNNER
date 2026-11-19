
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/algorithms/recursionAlgorithms.js
 *
 * Recursion Algorithms:
 * 1. Factorial
 * 2. Fibonacci
 * 3. Sum of Natural Numbers
 * 4. Power of a Number
 * 5. Recursive Binary Search
 * 6. Tower of Hanoi
 * 7. Generate Subsets
 */

(function (global) {
    "use strict";

    class RecursionAlgorithms {

        constructor() {
            this.algorithms = new Map();
            this.maxDepth = 100;
            this.registerAlgorithms();
        }

        // =====================================
        // COMMON UTILITIES
        // =====================================

        clone(value) {
            return JSON.parse(JSON.stringify(value));
        }

        validateInteger(value, name, min = 0, max = 100) {
            const number = Number(value);

            if (
                !Number.isInteger(number) ||
                number < min ||
                number > max
            ) {
                throw new RangeError(
                    `${name} must be an integer between ${min} and ${max}.`
                );
            }

            return number;
        }

        validateArray(array) {
            if (!Array.isArray(array)) {
                throw new TypeError(
                    "Input must be an array."
                );
            }

            return array.map(value => {
                const number = Number(value);

                if (!Number.isFinite(number)) {
                    throw new TypeError(
                        "Array values must be finite numbers."
                    );
                }

                return number;
            });
        }

        createScene(stack, options = {}) {
            const items = stack.map((frame, index) => ({
                id: `recursion-frame-${index}`,
                value: frame.label,
                index,
                label: frame.label,
                state: frame.state || "default",
                meta: {
                    functionName: frame.functionName,
                    arguments: frame.arguments,
                    returnValue: frame.returnValue
                }
            }));

            return {
                type: "stack",
                items,
                pointers: [],
                edges: [],
                status: options.status || "Ready",
                meta: {
                    operation: options.operation || "recursion",
                    depth: stack.length,
                    activeFrame: options.activeFrame ?? null,
                    direction: options.direction || "push"
                }
            };
        }

        createStep({
            title,
            explanation,
            codeLine,
            stack,
            variables = {},
            options = {},
            action = "inspect"
        }) {
            const stackSnapshot = this.clone(stack);

            return {
                title,
                explanation,
                codeLine,
                action,

                variables: this.clone(variables),

                scene: this.createScene(
                    stackSnapshot,
                    options
                ),

                snapshot: {
                    stack: stackSnapshot,
                    variables: this.clone(variables)
                }
            };
        }

        register(id, definition) {
            this.algorithms.set(id, {
                id,
                ...definition
            });
        }

        getAlgorithms() {
            return Array.from(
                this.algorithms.values()
            ).map(({ id, title, description, complexity }) => ({
                id,
                title,
                description,
                complexity
            }));
        }

        getAlgorithm(id) {
            return this.algorithms.get(id) || null;
        }

        getSteps(id, input = {}) {
            const algorithm = this.getAlgorithm(id);

            if (!algorithm) {
                throw new Error(
                    `Recursion algorithm not found: ${id}`
                );
            }

            return algorithm.execute(input);
        }

        // =====================================
        // 1. FACTORIAL
        // =====================================

        factorial(input = {}) {
            const n = this.validateInteger(
                input.n ?? 5,
                "n",
                0,
                20
            );

            const steps = [];
            const stack = [];

            let result = 1;

            steps.push(this.createStep({
                title: "Start Factorial",
                explanation:
                    `We need to calculate ${n}!. Factorial is the product of all positive integers up to n.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                stack,
                variables: {
                    n,
                    result: null
                },
                options: {
                    operation: "factorial",
                    direction: "push"
                },
                action: "initialize"
            }));

            const calculate = number => {
                const frame = {
                    functionName: "factorial",
                    arguments: { n: number },
                    label: `factorial(${number})`,
                    state: "active",
                    returnValue: null
                };

                stack.push(frame);

                steps.push(this.createStep({
                    title: `Call factorial(${number})`,
                    explanation:
                        `A new recursive call factorial(${number}) is added to the call stack.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 8,
                        java: 6
                    },
                    stack,
                    variables: {
                        n: number,
                        depth: stack.length,
                        currentCall: `factorial(${number})`
                    },
                    options: {
                        operation: "factorial",
                        direction: "push",
                        activeFrame: stack.length - 1,
                        status: "Function called"
                    },
                    action: "call"
                }));

                if (number === 0 || number === 1) {
                    steps.push(this.createStep({
                        title: "Base Case Reached",
                        explanation:
                            `factorial(${number}) returns 1. Recursion stops here.`,
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 9,
                            java: 7
                        },
                        stack,
                        variables: {
                            n: number,
                            returnValue: 1
                        },
                        options: {
                            operation: "factorial",
                            direction: "return",
                            activeFrame: stack.length - 1,
                            status: "Base case"
                        },
                        action: "base-case"
                    }));

                    stack[stack.length - 1].returnValue = 1;
                    stack[stack.length - 1].state = "returning";

                    steps.push(this.createStep({
                        title: "Return 1",
                        explanation:
                            `factorial(${number}) returns 1 to its previous call.`,
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 9,
                            java: 7
                        },
                        stack,
                        variables: {
                            n: number,
                            returnValue: 1
                        },
                        options: {
                            operation: "factorial",
                            direction: "return",
                            status: "Returning"
                        },
                        action: "return"
                    }));

                    stack.pop();

                    return 1;
                }

                const previous = calculate(number - 1);

                result = number * previous;

                steps.push(this.createStep({
                    title: `Calculate ${number} × ${previous}`,
                    explanation:
                        `factorial(${number}) = ${number} × factorial(${number - 1}) = ${result}.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 10,
                        java: 8
                    },
                    stack,
                    variables: {
                        n: number,
                        previousResult: previous,
                        returnValue: result
                    },
                    options: {
                        operation: "factorial",
                        direction: "return",
                        activeFrame: stack.length - 1,
                        status: "Calculating return"
                    },
                    action: "calculate"
                }));

                stack[stack.length - 1].returnValue = result;
                stack[stack.length - 1].state = "returning";

                steps.push(this.createStep({
                    title: `Return factorial(${number})`,
                    explanation:
                        `Returning ${result} to the previous recursive call.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 10,
                        java: 8
                    },
                    stack,
                    variables: {
                        n: number,
                        returnValue: result
                    },
                    options: {
                        operation: "factorial",
                        direction: "return",
                        status: "Returning"
                    },
                    action: "return"
                }));

                stack.pop();

                return result;
            };

            result = calculate(n);

            steps.push(this.createStep({
                title: "Factorial Completed",
                explanation:
                    `${n}! = ${result}. All recursive calls have returned.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 10,
                    java: 8
                },
                stack,
                variables: {
                    n,
                    result
                },
                options: {
                    operation: "factorial",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 2. FIBONACCI
        // =====================================

        fibonacci(input = {}) {
            const n = this.validateInteger(
                input.n ?? 5,
                "n",
                0,
                12
            );

            const steps = [];
            const stack = [];

            let calls = 0;

            steps.push(this.createStep({
                title: "Start Fibonacci",
                explanation:
                    "Fibonacci is defined as F(n) = F(n-1) + F(n-2), with base cases F(0) = 0 and F(1) = 1.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                stack,
                variables: {
                    n,
                    calls
                },
                options: {
                    operation: "fibonacci"
                },
                action: "initialize"
            }));

            const calculate = number => {
                calls++;

                stack.push({
                    functionName: "fibonacci",
                    arguments: { n: number },
                    label: `fibonacci(${number})`,
                    state: "active",
                    returnValue: null
                });

                steps.push(this.createStep({
                    title: `Call fibonacci(${number})`,
                    explanation:
                        `Push fibonacci(${number}) onto the recursive call stack.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 8,
                        java: 6
                    },
                    stack,
                    variables: {
                        n: number,
                        calls,
                        depth: stack.length
                    },
                    options: {
                        operation: "fibonacci",
                        direction: "push",
                        activeFrame: stack.length - 1
                    },
                    action: "call"
                }));

                if (number <= 1) {
                    steps.push(this.createStep({
                        title: "Fibonacci Base Case",
                        explanation:
                            `F(${number}) = ${number}. No further recursive calls are needed.`,
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 9,
                            java: 7
                        },
                        stack,
                        variables: {
                            n: number,
                            returnValue: number
                        },
                        options: {
                            operation: "fibonacci",
                            direction: "return",
                            status: "Base case"
                        },
                        action: "base-case"
                    }));

                    stack.pop();

                    return number;
                }

                const first = calculate(number - 1);
                const second = calculate(number - 2);

                const result = first + second;

                steps.push(this.createStep({
                    title: `Calculate F(${number})`,
                    explanation:
                        `F(${number}) = F(${number - 1}) + F(${number - 2}) = ${first} + ${second} = ${result}.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 10,
                        java: 8
                    },
                    stack,
                    variables: {
                        n: number,
                        firstResult: first,
                        secondResult: second,
                        returnValue: result
                    },
                    options: {
                        operation: "fibonacci",
                        direction: "return",
                        activeFrame: stack.length - 1
                    },
                    action: "calculate"
                }));

                stack.pop();

                return result;
            };

            const result = calculate(n);

            steps.push(this.createStep({
                title: "Fibonacci Completed",
                explanation:
                    `F(${n}) = ${result}. Total recursive calls: ${calls}.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 10,
                    java: 8
                },
                stack,
                variables: {
                    n,
                    result,
                    calls
                },
                options: {
                    operation: "fibonacci",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 3. SUM OF NATURAL NUMBERS
        // =====================================

        sumNatural(input = {}) {
            const n = this.validateInteger(
                input.n ?? 5,
                "n",
                0,
                100
            );

            const steps = [];
            const stack = [];

            const calculate = number => {
                stack.push({
                    functionName: "sum",
                    arguments: { n: number },
                    label: `sum(${number})`,
                    state: "active",
                    returnValue: null
                });

                steps.push(this.createStep({
                    title: `Call sum(${number})`,
                    explanation:
                        `The function is called with n = ${number}.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    stack,
                    variables: {
                        n: number,
                        depth: stack.length
                    },
                    options: {
                        operation: "sum-natural",
                        direction: "push"
                    },
                    action: "call"
                }));

                if (number === 0) {
                    steps.push(this.createStep({
                        title: "Base Case Reached",
                        explanation:
                            "sum(0) = 0. This is the stopping condition.",
                        codeLine: {
                            python: 3,
                            javascript: 3,
                            cpp: 7,
                            java: 5
                        },
                        stack,
                        variables: {
                            n: number,
                            returnValue: 0
                        },
                        options: {
                            operation: "sum-natural",
                            direction: "return"
                        },
                        action: "base-case"
                    }));

                    stack.pop();

                    return 0;
                }

                const previous = calculate(number - 1);
                const result = number + previous;

                steps.push(this.createStep({
                    title: `Add ${number} to ${previous}`,
                    explanation:
                        `sum(${number}) = ${number} + sum(${number - 1}) = ${result}.`,
                    codeLine: {
                        python: 4,
                        javascript: 4,
                        cpp: 8,
                        java: 6
                    },
                    stack,
                    variables: {
                        n: number,
                        previousResult: previous,
                        returnValue: result
                    },
                    options: {
                        operation: "sum-natural",
                        direction: "return"
                    },
                    action: "calculate"
                }));

                stack.pop();

                return result;
            };

            steps.push(this.createStep({
                title: "Start Natural Number Sum",
                explanation:
                    `Calculate the sum of numbers from 1 to ${n}.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                stack,
                variables: {
                    n
                },
                options: {
                    operation: "sum-natural"
                },
                action: "initialize"
            }));

            const result = calculate(n);

            steps.push(this.createStep({
                title: "Sum Completed",
                explanation:
                    `The sum of natural numbers from 1 to ${n} is ${result}.`,
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                stack,
                variables: {
                    n,
                    result
                },
                options: {
                    operation: "sum-natural",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 4. POWER OF A NUMBER
        // =====================================

        power(input = {}) {
            const base = Number(input.base ?? 2);
            const exponent = this.validateInteger(
                input.exponent ?? 4,
                "exponent",
                0,
                30
            );

            if (!Number.isFinite(base)) {
                throw new TypeError(
                    "Base must be a finite number."
                );
            }

            const steps = [];
            const stack = [];

            const calculate = number => {
                stack.push({
                    functionName: "power",
                    arguments: {
                        base,
                        exponent: number
                    },
                    label: `power(${base}, ${number})`,
                    state: "active",
                    returnValue: null
                });

                steps.push(this.createStep({
                    title: `Call power(${base}, ${number})`,
                    explanation:
                        `Calculate ${base} raised to the power ${number}.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    stack,
                    variables: {
                        base,
                        exponent: number,
                        depth: stack.length
                    },
                    options: {
                        operation: "power",
                        direction: "push"
                    },
                    action: "call"
                }));

                if (number === 0) {
                    steps.push(this.createStep({
                        title: "Power Base Case",
                        explanation:
                            "Any non-zero number raised to power 0 equals 1.",
                        codeLine: {
                            python: 3,
                            javascript: 3,
                            cpp: 7,
                            java: 5
                        },
                        stack,
                        variables: {
                            base,
                            exponent: 0,
                            returnValue: 1
                        },
                        options: {
                            operation: "power",
                            direction: "return"
                        },
                        action: "base-case"
                    }));

                    stack.pop();

                    return 1;
                }

                const previous = calculate(number - 1);
                const result = base * previous;

                steps.push(this.createStep({
                    title: "Multiply Base",
                    explanation:
                        `${base} × ${previous} = ${result}.`,
                    codeLine: {
                        python: 4,
                        javascript: 4,
                        cpp: 8,
                        java: 6
                    },
                    stack,
                    variables: {
                        base,
                        exponent: number,
                        previousResult: previous,
                        returnValue: result
                    },
                    options: {
                        operation: "power",
                        direction: "return"
                    },
                    action: "calculate"
                }));

                stack.pop();

                return result;
            };

            steps.push(this.createStep({
                title: "Start Power Calculation",
                explanation:
                    `Calculate ${base}^${exponent} recursively.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                stack,
                variables: {
                    base,
                    exponent
                },
                options: {
                    operation: "power"
                },
                action: "initialize"
            }));

            const result = calculate(exponent);

            steps.push(this.createStep({
                title: "Power Calculation Completed",
                explanation:
                    `${base}^${exponent} = ${result}.`,
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                stack,
                variables: {
                    base,
                    exponent,
                    result
                },
                options: {
                    operation: "power",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 5. RECURSIVE BINARY SEARCH
        // =====================================

        binarySearch(input = {}) {
            const array = this.validateArray(
                input.array || [10, 20, 30, 40, 50, 60]
            );

            const target = Number(input.target ?? 40);

            if (!Number.isFinite(target)) {
                throw new TypeError(
                    "Target must be a finite number."
                );
            }

            for (let i = 1; i < array.length; i++) {
                if (array[i] < array[i - 1]) {
                    throw new Error(
                        "Recursive Binary Search requires a sorted array."
                    );
                }
            }

            const steps = [];
            const stack = [];

            const search = (left, right) => {
                const mid = Math.floor((left + right) / 2);

                stack.push({
                    functionName: "binarySearch",
                    arguments: {
                        left,
                        right,
                        target
                    },
                    label: `search(${left}, ${right})`,
                    state: "active",
                    returnValue: null
                });

                steps.push(this.createStep({
                    title: "Recursive Search Call",
                    explanation:
                        `Search the range from index ${left} to ${right}.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 8,
                        java: 6
                    },
                    stack,
                    variables: {
                        left,
                        right,
                        target,
                        mid: left <= right ? mid : null
                    },
                    options: {
                        operation: "recursive-binary-search",
                        direction: "push"
                    },
                    action: "call"
                }));

                if (left > right) {
                    steps.push(this.createStep({
                        title: "Search Range Empty",
                        explanation:
                            "The search range is empty. The target was not found.",
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 9,
                            java: 7
                        },
                        stack,
                        variables: {
                            left,
                            right,
                            target,
                            result: -1
                        },
                        options: {
                            operation: "recursive-binary-search",
                            direction: "return"
                        },
                        action: "base-case"
                    }));

                    stack.pop();

                    return -1;
                }

                steps.push(this.createStep({
                    title: "Calculate Middle",
                    explanation:
                        `Middle index is ${mid}. Compare ${array[mid]} with ${target}.`,
                    codeLine: {
                        python: 6,
                        javascript: 6,
                        cpp: 11,
                        java: 9
                    },
                    stack,
                    variables: {
                        left,
                        right,
                        mid,
                        middleValue: array[mid],
                        target
                    },
                    options: {
                        operation: "recursive-binary-search",
                        direction: "inspect"
                    },
                    action: "calculate-mid"
                }));

                if (array[mid] === target) {
                    steps.push(this.createStep({
                        title: "Target Found",
                        explanation:
                            `${target} was found at index ${mid}.`,
                        codeLine: {
                            python: 7,
                            javascript: 7,
                            cpp: 12,
                            java: 10
                        },
                        stack,
                        variables: {
                            mid,
                            target,
                            result: mid
                        },
                        options: {
                            operation: "recursive-binary-search",
                            direction: "return"
                        },
                        action: "found"
                    }));

                    stack.pop();

                    return mid;
                }

                let result;

                if (array[mid] < target) {
                    steps.push(this.createStep({
                        title: "Search Right Half",
                        explanation:
                            `${array[mid]} is smaller than ${target}. Recursively search the right half.`,
                        codeLine: {
                            python: 9,
                            javascript: 9,
                            cpp: 14,
                            java: 12
                        },
                        stack,
                        variables: {
                            left,
                            right,
                            mid,
                            target
                        },
                        options: {
                            operation: "recursive-binary-search"
                        },
                        action: "move-right"
                    }));

                    result = search(mid + 1, right);
                } else {
                    steps.push(this.createStep({
                        title: "Search Left Half",
                        explanation:
                            `${array[mid]} is greater than ${target}. Recursively search the left half.`,
                        codeLine: {
                            python: 11,
                            javascript: 11,
                            cpp: 16,
                            java: 14
                        },
                        stack,
                        variables: {
                            left,
                            right,
                            mid,
                            target
                        },
                        options: {
                            operation: "recursive-binary-search"
                        },
                        action: "move-left"
                    }));

                    result = search(left, mid - 1);
                }

                steps.push(this.createStep({
                    title: "Return Search Result",
                    explanation:
                        `Returning ${result} from the current recursive call.`,
                    codeLine: {
                        python: 9,
                        javascript: 9,
                        cpp: 14,
                        java: 12
                    },
                    stack,
                    variables: {
                        left,
                        right,
                        result
                    },
                    options: {
                        operation: "recursive-binary-search",
                        direction: "return"
                    },
                    action: "return"
                }));

                stack.pop();

                return result;
            };

            steps.push(this.createStep({
                title: "Start Recursive Binary Search",
                explanation:
                    `Find ${target} in the sorted array.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                stack,
                variables: {
                    array,
                    target
                },
                options: {
                    operation: "recursive-binary-search"
                },
                action: "initialize"
            }));

            const result = search(0, array.length - 1);

            steps.push(this.createStep({
                title: result >= 0
                    ? "Search Completed"
                    : "Target Not Found",
                explanation: result >= 0
                    ? `Target ${target} found at index ${result}.`
                    : `Target ${target} does not exist in the array.`,
                codeLine: {
                    python: 11,
                    javascript: 11,
                    cpp: 16,
                    java: 14
                },
                stack,
                variables: {
                    target,
                    result
                },
                options: {
                    operation: "recursive-binary-search",
                    status: result >= 0 ? "Found" : "Not found"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 6. TOWER OF HANOI
        // =====================================

        towerOfHanoi(input = {}) {
            const n = this.validateInteger(
                input.n ?? 3,
                "n",
                1,
                6
            );

            const source = String(input.source ?? "A");
            const auxiliary = String(input.auxiliary ?? "B");
            const destination = String(input.destination ?? "C");

            if (
                new Set([source, auxiliary, destination]).size !== 3
            ) {
                throw new Error(
                    "Tower of Hanoi requires three different rod names."
                );
            }

            const rods = {
                [source]: Array.from(
                    { length: n },
                    (_, i) => n - i
                ),
                [auxiliary]: [],
                [destination]: []
            };

            const steps = [];
            const stack = [];

            let moveCount = 0;

            const createHanoiScene = () => ({
                type: "hanoi",
                items: Object.entries(rods).flatMap(
                    ([rod, disks]) =>
                        disks.map((size, index) => ({
                            id: `disk-${rod}-${size}`,
                            value: size,
                            label: `Disk ${size}`,
                            index,
                            rod,
                            state: "default"
                        }))
                ),
                pointers: [],
                edges: [],
                status: "Moving disks",
                meta: {
                    rods: this.clone(rods),
                    moveCount,
                    totalMoves: Math.pow(2, n) - 1
                }
            });

            const createHanoiStep = ({
                title,
                explanation,
                variables,
                action,
                codeLine
            }) => ({
                title,
                explanation,
                codeLine,
                action,
                variables: this.clone(variables),
                scene: createHanoiScene(),
                snapshot: {
                    rods: this.clone(rods),
                    variables: this.clone(variables)
                }
            });

            const move = (number, from, to, via) => {
                stack.push({
                    functionName: "hanoi",
                    arguments: {
                        n: number,
                        from,
                        to,
                        via
                    },
                    label: `hanoi(${number}, ${from}, ${to})`,
                    state: "active",
                    returnValue: null
                });

                steps.push(createHanoiStep({
                    title: `Call Hanoi(${number})`,
                    explanation:
                        `Move ${number} disk(s) from rod ${from} to rod ${to}, using ${via} as auxiliary.`,
                    variables: {
                        n: number,
                        from,
                        to,
                        via,
                        depth: stack.length
                    },
                    action: "call",
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    }
                }));

                if (number === 1) {
                    const disk = rods[from].pop();
                    rods[to].push(disk);

                    moveCount++;

                    steps.push(createHanoiStep({
                        title: `Move Disk ${disk}`,
                        explanation:
                            `Move disk ${disk} from rod ${from} to rod ${to}.`,
                        variables: {
                            disk,
                            from,
                            to,
                            moveCount
                        },
                        action: "move-disk",
                        codeLine: {
                            python: 3,
                            javascript: 3,
                            cpp: 7,
                            java: 5
                        }
                    }));

                    stack.pop();

                    return;
                }

                move(number - 1, from, via, to);

                const disk = rods[from].pop();
                rods[to].push(disk);

                moveCount++;

                steps.push(createHanoiStep({
                    title: `Move Disk ${disk}`,
                    explanation:
                        `Move disk ${disk} from rod ${from} to rod ${to}.`,
                    variables: {
                        disk,
                        from,
                        to,
                        moveCount
                    },
                    action: "move-disk",
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 9,
                        java: 7
                    }
                }));

                move(number - 1, via, to, from);

                stack.pop();
            };

            steps.push(createHanoiStep({
                title: "Start Tower of Hanoi",
                explanation:
                    `Move ${n} disks from rod ${source} to rod ${destination}.`,
                variables: {
                    n,
                    source,
                    auxiliary,
                    destination,
                    totalMoves: Math.pow(2, n) - 1
                },
                action: "initialize",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                }
            }));

            move(n, source, destination, auxiliary);

            steps.push(createHanoiStep({
                title: "Tower of Hanoi Completed",
                explanation:
                    `All ${n} disks have been moved in ${moveCount} moves.`,
                variables: {
                    n,
                    moveCount,
                    totalMoves: Math.pow(2, n) - 1,
                    finalRods: this.clone(rods)
                },
                action: "complete",
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                }
            }));

            return steps;
        }

        // =====================================
        // 7. GENERATE ALL SUBSETS
        // =====================================

        subsets(input = {}) {
            const array = this.validateArray(
                input.array || [1, 2, 3]
            );

            if (array.length > 12) {
                throw new RangeError(
                    "Subsets visualization supports up to 12 elements."
                );
            }

            const steps = [];
            const stack = [];
            const result = [];

            const generate = (index, current) => {
                stack.push({
                    functionName: "subsets",
                    arguments: {
                        index,
                        current: [...current]
                    },
                    label: `subsets(${index})`,
                    state: "active",
                    returnValue: null
                });

                steps.push(this.createStep({
                    title: `Generate Subsets at Index ${index}`,
                    explanation:
                        `Decide whether to include or exclude the element at index ${index}.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    stack,
                    variables: {
                        index,
                        currentSubset: [...current],
                        totalSubsets: result.length
                    },
                    options: {
                        operation: "subsets",
                        direction: "push"
                    },
                    action: "call"
                }));

                if (index === array.length) {
                    result.push([...current]);

                    steps.push(this.createStep({
                        title: "Subset Generated",
                        explanation:
                            `One subset has been generated: [${current.join(", ")}].`,
                        codeLine: {
                            python: 3,
                            javascript: 3,
                            cpp: 7,
                            java: 5
                        },
                        stack,
                        variables: {
                            currentSubset: [...current],
                            totalSubsets: result.length,
                            subsets: this.clone(result)
                        },
                        options: {
                            operation: "subsets",
                            direction: "return"
                        },
                        action: "base-case"
                    }));

                    stack.pop();

                    return;
                }

                const value = array[index];

                // Include current element.
                current.push(value);

                steps.push(this.createStep({
                    title: `Include ${value}`,
                    explanation:
                        `Include ${value} in the current subset.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 9,
                        java: 7
                    },
                    stack,
                    variables: {
                        index,
                        selectedValue: value,
                        currentSubset: [...current]
                    },
                    options: {
                        operation: "subsets",
                        direction: "inspect"
                    },
                    action: "include"
                }));

                generate(index + 1, current);

                // Backtrack.
                current.pop();

                steps.push(this.createStep({
                    title: `Backtrack: Remove ${value}`,
                    explanation:
                        `Remove ${value} to explore the branch where it is excluded.`,
                    codeLine: {
                        python: 7,
                        javascript: 7,
                        cpp: 11,
                        java: 9
                    },
                    stack,
                    variables: {
                        index,
                        removedValue: value,
                        currentSubset: [...current]
                    },
                    options: {
                        operation: "subsets",
                        direction: "return"
                    },
                    action: "backtrack"
                }));

                // Exclude current element.
                steps.push(this.createStep({
                    title: `Exclude ${value}`,
                    explanation:
                        `Explore the branch where ${value} is not included.`,
                    codeLine: {
                        python: 8,
                        javascript: 8,
                        cpp: 12,
                        java: 10
                    },
                    stack,
                    variables: {
                        index,
                        excludedValue: value,
                        currentSubset: [...current]
                    },
                    options: {
                        operation: "subsets"
                    },
                    action: "exclude"
                }));

                generate(index + 1, current);

                stack.pop();
            };

            steps.push(this.createStep({
                title: "Start Subset Generation",
                explanation:
                    "Every element has two choices: include it or exclude it. This generates all possible subsets.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                stack,
                variables: {
                    array,
                    totalPossibleSubsets: Math.pow(2, array.length)
                },
                options: {
                    operation: "subsets"
                },
                action: "initialize"
            }));

            generate(0, []);

            steps.push(this.createStep({
                title: "All Subsets Generated",
                explanation:
                    `Generated ${result.length} subsets from ${array.length} elements.`,
                codeLine: {
                    python: 8,
                    javascript: 8,
                    cpp: 12,
                    java: 10
                },
                stack,
                variables: {
                    totalSubsets: result.length,
                    subsets: this.clone(result)
                },
                options: {
                    operation: "subsets",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // REGISTER ALL ALGORITHMS
        // =====================================

        registerAlgorithms() {

            this.register("factorial", {
                title: "Factorial",
                description:
                    "Calculate factorial using recursive calls and a base case.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.factorial(input)
            });

            this.register("fibonacci", {
                title: "Fibonacci",
                description:
                    "Generate the Fibonacci value using recursive calls.",
                complexity: {
                    time: "O(2^n)",
                    space: "O(n)"
                },
                execute: input => this.fibonacci(input)
            });

            this.register("sum-natural", {
                title: "Sum of Natural Numbers",
                description:
                    "Calculate the sum from 1 to n recursively.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.sumNatural(input)
            });

            this.register("power", {
                title: "Power of a Number",
                description:
                    "Calculate a number raised to an integer power recursively.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.power(input)
            });

            this.register("recursive-binary-search", {
                title: "Recursive Binary Search",
                description:
                    "Find a target in a sorted array using recursive binary search.",
                complexity: {
                    time: "O(log n)",
                    space: "O(log n)"
                },
                execute: input => this.binarySearch(input)
            });

            this.register("tower-of-hanoi", {
                title: "Tower of Hanoi",
                description:
                    "Move disks between three rods using recursive calls.",
                complexity: {
                    time: "O(2^n)",
                    space: "O(n)"
                },
                execute: input => this.towerOfHanoi(input)
            });

            this.register("subsets", {
                title: "Generate All Subsets",
                description:
                    "Generate every possible subset using recursion and backtracking.",
                complexity: {
                    time: "O(n × 2^n)",
                    space: "O(n)"
                },
                execute: input => this.subsets(input)
            });
        }
    }

    // =====================================
    // GLOBAL EXPORT
    // =====================================

    global.RecursionAlgorithms = RecursionAlgorithms;

    // =====================================
    // COMMONJS EXPORT
    // =====================================

    if (
        typeof module !== "undefined" &&
        module.exports
    ) {
        module.exports = RecursionAlgorithms;
    }

})(typeof window !== "undefined" ? window : globalThis);
