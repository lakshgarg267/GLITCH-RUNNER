
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/algorithms/stackQueueAlgorithms.js
 *
 * Stack & Queue Algorithms:
 * 1. Stack Push
 * 2. Stack Pop
 * 3. Stack Peek
 * 4. Stack Display
 * 5. Queue Enqueue
 * 6. Queue Dequeue
 * 7. Circular Queue
 * 8. Balanced Parentheses
 * 9. Reverse String using Stack
 * 10. Next Greater Element
 */

(function (global) {
    "use strict";

    class StackQueueAlgorithms {

        constructor() {
            this.algorithms = new Map();
            this.registerAlgorithms();
        }

        // =====================================
        // COMMON UTILITIES
        // =====================================

        clone(value) {
            return JSON.parse(JSON.stringify(value));
        }

        validateArray(array, name = "Input") {
            if (!Array.isArray(array)) {
                throw new TypeError(`${name} must be an array.`);
            }

            if (array.length > 30) {
                throw new RangeError(
                    `${name} supports a maximum of 30 elements.`
                );
            }

            return [...array];
        }

        validateCapacity(capacity, max = 30) {
            const value = Number(capacity);

            if (
                !Number.isInteger(value) ||
                value < 1 ||
                value > max
            ) {
                throw new RangeError(
                    `Capacity must be an integer between 1 and ${max}.`
                );
            }

            return value;
        }

        createStep({
            title,
            explanation,
            codeLine,
            items,
            variables = {},
            action = "inspect",
            structure = "stack",
            pointers = [],
            status = "Processing",
            meta = {}
        }) {
            const snapshot = this.clone(items);

            return {
                title,
                explanation,
                codeLine,
                action,
                variables: this.clone(variables),

                scene: {
                    type: structure,
                    items: snapshot.map((value, index) => ({
                        id: `${structure}-item-${index}`,
                        value,
                        label: String(value),
                        index,
                        state: "default"
                    })),
                    pointers: this.clone(pointers),
                    edges: [],
                    status,
                    meta: {
                        structure,
                        length: snapshot.length,
                        ...this.clone(meta)
                    }
                },

                snapshot: {
                    items: snapshot,
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
            return Array.from(this.algorithms.values()).map(
                ({ id, title, description, complexity }) => ({
                    id,
                    title,
                    description,
                    complexity
                })
            );
        }

        getAlgorithm(id) {
            return this.algorithms.get(id) || null;
        }

        getSteps(id, input = {}) {
            const algorithm = this.getAlgorithm(id);

            if (!algorithm) {
                throw new Error(
                    `Stack/Queue algorithm not found: ${id}`
                );
            }

            return algorithm.execute(input);
        }

        // =====================================
        // 1. STACK PUSH
        // =====================================

        stackPush(input = {}) {
            const stack = this.validateArray(
                input.stack || [10, 20, 30],
                "Stack"
            );

            const value = input.value ?? 40;
            const capacity = this.validateCapacity(
                input.capacity ?? 10
            );

            if (stack.length > capacity) {
                throw new RangeError(
                    "Initial stack cannot exceed its capacity."
                );
            }

            const steps = [];

            steps.push(this.createStep({
                title: "Initialize Stack",
                explanation:
                    "A stack follows LIFO: Last In, First Out. New elements are added at the top.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                items: stack,
                variables: {
                    top: stack.length - 1,
                    size: stack.length,
                    capacity
                },
                structure: "stack",
                action: "initialize"
            }));

            if (stack.length >= capacity) {
                steps.push(this.createStep({
                    title: "Stack Overflow",
                    explanation:
                        "The stack is full. A new element cannot be pushed.",
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    items: stack,
                    variables: {
                        value,
                        top: stack.length - 1,
                        capacity
                    },
                    structure: "stack",
                    action: "overflow",
                    status: "Overflow"
                }));

                return steps;
            }

            steps.push(this.createStep({
                title: "Push New Element",
                explanation:
                    `Push ${value} onto the top of the stack.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                items: [...stack, value],
                variables: {
                    value,
                    previousTop: stack.length - 1,
                    newTop: stack.length
                },
                pointers: [{
                    name: "newTop",
                    target: `stack-item-${stack.length}`
                }],
                structure: "stack",
                action: "push"
            }));

            stack.push(value);

            steps.push(this.createStep({
                title: "Push Completed",
                explanation:
                    `${value} is now the top element of the stack.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                items: stack,
                variables: {
                    top: stack.length - 1,
                    topValue: value,
                    size: stack.length,
                    capacity
                },
                structure: "stack",
                action: "complete",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 2. STACK POP
        // =====================================

        stackPop(input = {}) {
            const stack = this.validateArray(
                input.stack || [10, 20, 30, 40],
                "Stack"
            );

            const steps = [];

            steps.push(this.createStep({
                title: "Start Stack Pop",
                explanation:
                    "Remove the top element from the stack.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                items: stack,
                variables: {
                    top: stack.length - 1,
                    size: stack.length
                },
                structure: "stack",
                action: "initialize"
            }));

            if (stack.length === 0) {
                steps.push(this.createStep({
                    title: "Stack Underflow",
                    explanation:
                        "The stack is empty. No element can be popped.",
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    items: stack,
                    structure: "stack",
                    action: "underflow",
                    status: "Underflow"
                }));

                return steps;
            }

            const removed = stack[stack.length - 1];

            steps.push(this.createStep({
                title: "Identify Top Element",
                explanation:
                    `The top element is ${removed}.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                items: stack,
                variables: {
                    top: stack.length - 1,
                    topValue: removed
                },
                pointers: [{
                    name: "top",
                    target: `stack-item-${stack.length - 1}`
                }],
                structure: "stack",
                action: "inspect"
            }));

            stack.pop();

            steps.push(this.createStep({
                title: "Remove Top Element",
                explanation:
                    `Element ${removed} has been removed from the stack.`,
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                items: stack,
                variables: {
                    removed,
                    top: stack.length - 1,
                    size: stack.length
                },
                structure: "stack",
                action: "pop"
            }));

            steps.push(this.createStep({
                title: "Pop Completed",
                explanation:
                    "The stack top now points to the new last element.",
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                items: stack,
                variables: {
                    removed,
                    newTop: stack.length
                        ? stack[stack.length - 1]
                        : null,
                    size: stack.length
                },
                structure: "stack",
                action: "complete",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 3. STACK PEEK
        // =====================================

        stackPeek(input = {}) {
            const stack = this.validateArray(
                input.stack || [10, 20, 30, 40],
                "Stack"
            );

            const steps = [];

            steps.push(this.createStep({
                title: "Start Stack Peek",
                explanation:
                    "Peek reads the top element without removing it.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                items: stack,
                variables: {
                    size: stack.length
                },
                structure: "stack",
                action: "initialize"
            }));

            if (stack.length === 0) {
                steps.push(this.createStep({
                    title: "Empty Stack",
                    explanation:
                        "There is no top element because the stack is empty.",
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    items: stack,
                    structure: "stack",
                    action: "empty",
                    status: "Empty"
                }));

                return steps;
            }

            const top = stack[stack.length - 1];

            steps.push(this.createStep({
                title: "Read Top Element",
                explanation:
                    `The current top element is ${top}. It remains in the stack.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                items: stack,
                variables: {
                    top,
                    topIndex: stack.length - 1
                },
                pointers: [{
                    name: "top",
                    target: `stack-item-${stack.length - 1}`
                }],
                structure: "stack",
                action: "peek"
            }));

            steps.push(this.createStep({
                title: "Peek Completed",
                explanation:
                    `Peek returned ${top} without changing the stack.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                items: stack,
                variables: {
                    result: top,
                    size: stack.length
                },
                structure: "stack",
                action: "complete",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 4. STACK DISPLAY
        // =====================================

        stackDisplay(input = {}) {
            const stack = this.validateArray(
                input.stack || [10, 20, 30, 40],
                "Stack"
            );

            const steps = [];

            steps.push(this.createStep({
                title: "Display Stack",
                explanation:
                    "Display all elements from bottom to top.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                items: stack,
                variables: {
                    size: stack.length,
                    top: stack.length - 1
                },
                structure: "stack",
                action: "initialize"
            }));

            for (let i = 0; i < stack.length; i++) {
                steps.push(this.createStep({
                    title: `Display Element ${i}`,
                    explanation:
                        `Display stack element ${stack[i]} at index ${i}.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    items: stack,
                    variables: {
                        index: i,
                        value: stack[i]
                    },
                    pointers: [{
                        name: "current",
                        target: `stack-item-${i}`
                    }],
                    structure: "stack",
                    action: "visit"
                }));
            }

            steps.push(this.createStep({
                title: "Display Completed",
                explanation:
                    "Every stack element has been displayed.",
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                items: stack,
                variables: {
                    elements: stack,
                    size: stack.length
                },
                structure: "stack",
                action: "complete",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 5. QUEUE ENQUEUE
        // =====================================

        queueEnqueue(input = {}) {
            const queue = this.validateArray(
                input.queue || [10, 20, 30],
                "Queue"
            );

            const value = input.value ?? 40;
            const capacity = this.validateCapacity(
                input.capacity ?? 10
            );

            if (queue.length > capacity) {
                throw new RangeError(
                    "Initial queue cannot exceed its capacity."
                );
            }

            const steps = [];

            steps.push(this.createStep({
                title: "Initialize Queue",
                explanation:
                    "A queue follows FIFO: First In, First Out. New elements are inserted at the rear.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                items: queue,
                variables: {
                    front: queue.length ? 0 : -1,
                    rear: queue.length - 1,
                    size: queue.length,
                    capacity
                },
                structure: "queue",
                action: "initialize"
            }));

            if (queue.length >= capacity) {
                steps.push(this.createStep({
                    title: "Queue Overflow",
                    explanation:
                        "The queue is full. No more elements can be inserted.",
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    items: queue,
                    variables: {
                        value,
                        capacity
                    },
                    structure: "queue",
                    action: "overflow",
                    status: "Overflow"
                }));

                return steps;
            }

            steps.push(this.createStep({
                title: "Insert at Rear",
                explanation:
                    `Insert ${value} at the rear of the queue.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                items: [...queue, value],
                variables: {
                    value,
                    newRear: queue.length
                },
                pointers: [{
                    name: "rear",
                    target: `queue-item-${queue.length}`
                }],
                structure: "queue",
                action: "enqueue"
            }));

            queue.push(value);

            steps.push(this.createStep({
                title: "Enqueue Completed",
                explanation:
                    `${value} has been inserted at the rear.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                items: queue,
                variables: {
                    front: 0,
                    rear: queue.length - 1,
                    size: queue.length
                },
                structure: "queue",
                action: "complete",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 6. QUEUE DEQUEUE
        // =====================================

        queueDequeue(input = {}) {
            const queue = this.validateArray(
                input.queue || [10, 20, 30, 40],
                "Queue"
            );

            const steps = [];

            steps.push(this.createStep({
                title: "Start Queue Dequeue",
                explanation:
                    "Remove the front element from the queue.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                items: queue,
                variables: {
                    front: queue.length ? 0 : -1,
                    rear: queue.length - 1
                },
                structure: "queue",
                action: "initialize"
            }));

            if (queue.length === 0) {
                steps.push(this.createStep({
                    title: "Queue Underflow",
                    explanation:
                        "The queue is empty. No element can be removed.",
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    items: queue,
                    structure: "queue",
                    action: "underflow",
                    status: "Underflow"
                }));

                return steps;
            }

            const removed = queue[0];

            steps.push(this.createStep({
                title: "Identify Front Element",
                explanation:
                    `The front element is ${removed}.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                items: queue,
                variables: {
                    front: 0,
                    frontValue: removed
                },
                pointers: [{
                    name: "front",
                    target: "queue-item-0"
                }],
                structure: "queue",
                action: "inspect"
            }));

            queue.shift();

            steps.push(this.createStep({
                title: "Remove Front Element",
                explanation:
                    `Remove ${removed} and advance the front of the queue.`,
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                items: queue,
                variables: {
                    removed,
                    front: queue.length ? 0 : -1,
                    size: queue.length
                },
                pointers: queue.length ? [{
                    name: "front",
                    target: "queue-item-0"
                }] : [],
                structure: "queue",
                action: "dequeue"
            }));

            steps.push(this.createStep({
                title: "Dequeue Completed",
                explanation:
                    "The first element has been removed successfully.",
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                items: queue,
                variables: {
                    removed,
                    size: queue.length
                },
                structure: "queue",
                action: "complete",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 7. CIRCULAR QUEUE
        // =====================================

        circularQueue(input = {}) {
            const capacity = this.validateCapacity(
                input.capacity ?? 5
            );

            const initial = this.validateArray(
                input.queue || [10, 20, 30],
                "Circular Queue"
            );

            if (initial.length > capacity) {
                throw new RangeError(
                    "Initial queue cannot exceed its capacity."
                );
            }

            const operations = Array.isArray(input.operations)
                ? input.operations
                : [
                    { type: "dequeue" },
                    { type: "enqueue", value: 40 },
                    { type: "enqueue", value: 50 },
                    { type: "enqueue", value: 60 }
                ];

            const buffer = new Array(capacity).fill(null);

            let front = initial.length ? 0 : -1;
            let rear = initial.length - 1;

            initial.forEach((value, index) => {
                buffer[index] = value;
            });

            let size = initial.length;

            const steps = [];

            const addStep = (
                title,
                explanation,
                action,
                variables = {}
            ) => {
                const items = buffer.map((value, index) => ({
                    value: value === null ? "Empty" : value,
                    index,
                    state: value === null ? "empty" : "filled"
                }));

                steps.push({
                    title,
                    explanation,
                    action,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    variables: this.clone(variables),
                    scene: {
                        type: "circular-queue",
                        items: this.clone(items),
                        pointers: [
                            ...(front !== -1 ? [{
                                name: "front",
                                target: `circular-queue-item-${front}`
                            }] : []),
                            ...(rear !== -1 ? [{
                                name: "rear",
                                target: `circular-queue-item-${rear}`
                            }] : [])
                        ],
                        edges: [],
                        status: "Processing",
                        meta: {
                            capacity,
                            front,
                            rear,
                            size,
                            buffer: [...buffer]
                        }
                    },
                    snapshot: {
                        buffer: [...buffer],
                        front,
                        rear,
                        size
                    }
                });
            };

            addStep(
                "Initialize Circular Queue",
                "A circular queue reuses empty positions by wrapping around to the beginning.",
                "initialize",
                { front, rear, size, capacity }
            );

            operations.forEach((operation, index) => {
                if (!operation || typeof operation !== "object") {
                    throw new TypeError(
                        `Invalid circular queue operation at index ${index}.`
                    );
                }

                if (operation.type === "enqueue") {
                    if (size === capacity) {
                        addStep(
                            "Circular Queue Overflow",
                            "The circular queue is full. Cannot enqueue another element.",
                            "overflow",
                            { value: operation.value, front, rear, size }
                        );

                        return;
                    }

                    if (front === -1) {
                        front = 0;
                    }

                    rear = (rear + 1) % capacity;
                    buffer[rear] = operation.value;
                    size++;

                    addStep(
                        "Circular Queue Enqueue",
                        `Inserted ${operation.value} at rear index ${rear}.`,
                        "enqueue",
                        {
                            value: operation.value,
                            front,
                            rear,
                            size
                        }
                    );
                } else if (operation.type === "dequeue") {
                    if (size === 0) {
                        addStep(
                            "Circular Queue Underflow",
                            "The queue is empty. Cannot dequeue.",
                            "underflow",
                            { front, rear, size }
                        );

                        return;
                    }

                    const removed = buffer[front];

                    buffer[front] = null;

                    if (size === 1) {
                        front = -1;
                        rear = -1;
                    } else {
                        front = (front + 1) % capacity;
                    }

                    size--;

                    addStep(
                        "Circular Queue Dequeue",
                        `Removed ${removed} from the front.`,
                        "dequeue",
                        {
                            removed,
                            front,
                            rear,
                            size
                        }
                    );
                } else {
                    throw new Error(
                        `Unknown circular queue operation: ${operation.type}`
                    );
                }
            });

            addStep(
                "Circular Queue Completed",
                "All requested circular queue operations have been processed.",
                "complete",
                {
                    front,
                    rear,
                    size,
                    capacity,
                    buffer
                }
            );

            return steps;
        }

        // =====================================
        // 8. BALANCED PARENTHESES
        // =====================================

        balancedParentheses(input = {}) {
            const expression = String(
                input.expression ?? "{[()]}"
            );

            const stack = [];
            const steps = [];

            const pairs = {
                ")": "(",
                "]": "[",
                "}": "{"
            };

            steps.push(this.createStep({
                title: "Start Parentheses Matching",
                explanation:
                    "Use a stack to check whether every opening bracket has a matching closing bracket.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                items: stack,
                variables: {
                    expression,
                    balanced: null
                },
                structure: "stack",
                action: "initialize"
            }));

            let balanced = true;

            for (let i = 0; i < expression.length; i++) {
                const character = expression[i];

                if (
                    character === "(" ||
                    character === "[" ||
                    character === "{"
                ) {
                    stack.push(character);

                    steps.push(this.createStep({
                        title: `Push ${character}`,
                        explanation:
                            `Opening bracket ${character} is pushed onto the stack.`,
                        codeLine: {
                            python: 3,
                            javascript: 3,
                            cpp: 7,
                            java: 5
                        },
                        items: stack,
                        variables: {
                            character,
                            index: i,
                            stack: [...stack]
                        },
                        structure: "stack",
                        action: "push"
                    }));
                } else if (
                    character === ")" ||
                    character === "]" ||
                    character === "}"
                ) {
                    if (
                        stack.length === 0 ||
                        stack[stack.length - 1] !== pairs[character]
                    ) {
                        balanced = false;

                        steps.push(this.createStep({
                            title: "Bracket Mismatch",
                            explanation:
                                `Closing bracket ${character} does not match the top opening bracket.`,
                            codeLine: {
                                python: 5,
                                javascript: 5,
                                cpp: 9,
                                java: 7
                            },
                            items: stack,
                            variables: {
                                character,
                                index: i,
                                expected: pairs[character],
                                balanced: false
                            },
                            structure: "stack",
                            action: "mismatch",
                            status: "Mismatch"
                        }));

                        break;
                    }

                    const removed = stack.pop();

                    steps.push(this.createStep({
                        title: `Match ${removed} with ${character}`,
                        explanation:
                            `Matching pair ${removed}${character} found. Pop the opening bracket.`,
                        codeLine: {
                            python: 6,
                            javascript: 6,
                            cpp: 10,
                            java: 8
                        },
                        items: stack,
                        variables: {
                            removed,
                            character,
                            index: i
                        },
                        structure: "stack",
                        action: "pop"
                    }));
                } else if (!/\s/.test(character)) {
                    steps.push(this.createStep({
                        title: `Skip ${character}`,
                        explanation:
                            "This character is not a bracket, so it does not affect the stack.",
                        codeLine: {
                            python: 2,
                            javascript: 2,
                            cpp: 6,
                            java: 4
                        },
                        items: stack,
                        variables: {
                            character,
                            index: i
                        },
                        structure: "stack",
                        action: "skip"
                    }));
                }
            }

            if (stack.length !== 0) {
                balanced = false;
            }

            steps.push(this.createStep({
                title: balanced
                    ? "Expression Is Balanced"
                    : "Expression Is Not Balanced",
                explanation: balanced
                    ? "All opening brackets have matching closing brackets in the correct order."
                    : "One or more brackets are unmatched or incorrectly ordered.",
                codeLine: {
                    python: 8,
                    javascript: 8,
                    cpp: 12,
                    java: 10
                },
                items: stack,
                variables: {
                    expression,
                    balanced,
                    remainingOpeningBrackets: [...stack]
                },
                structure: "stack",
                action: "complete",
                status: balanced ? "Balanced" : "Not balanced"
            }));

            return steps;
        }

        // =====================================
        // 9. REVERSE STRING USING STACK
        // =====================================

        reverseString(input = {}) {
            const value = String(input.value ?? "GLITCH");

            if (value.length > 30) {
                throw new RangeError(
                    "String length must not exceed 30 characters."
                );
            }

            const stack = [];
            const steps = [];

            steps.push(this.createStep({
                title: "Start String Reversal",
                explanation:
                    "Push every character onto a stack. LIFO order will reverse the string when characters are popped.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                items: stack,
                variables: {
                    original: value
                },
                structure: "stack",
                action: "initialize"
            }));

            for (let i = 0; i < value.length; i++) {
                stack.push(value[i]);

                steps.push(this.createStep({
                    title: `Push Character ${value[i]}`,
                    explanation:
                        `Push character ${value[i]} onto the stack.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    items: stack,
                    variables: {
                        character: value[i],
                        index: i
                    },
                    structure: "stack",
                    action: "push"
                }));
            }

            let reversed = "";

            while (stack.length > 0) {
                const character = stack.pop();

                reversed += character;

                steps.push(this.createStep({
                    title: `Pop Character ${character}`,
                    explanation:
                        `Pop ${character} and append it to the reversed string.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 9,
                        java: 7
                    },
                    items: stack,
                    variables: {
                        character,
                        reversed
                    },
                    structure: "stack",
                    action: "pop"
                }));
            }

            steps.push(this.createStep({
                title: "String Reversal Completed",
                explanation:
                    `Original string: ${value}. Reversed string: ${reversed}.`,
                codeLine: {
                    python: 6,
                    javascript: 6,
                    cpp: 10,
                    java: 8
                },
                items: stack,
                variables: {
                    original: value,
                    reversed
                },
                structure: "stack",
                action: "complete",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 10. NEXT GREATER ELEMENT
        // =====================================

        nextGreaterElement(input = {}) {
            const array = this.validateArray(
                input.array || [4, 5, 2, 25],
                "Array"
            );

            const stack = [];
            const result = new Array(array.length).fill(null);
            const steps = [];

            steps.push(this.createStep({
                title: "Start Next Greater Element",
                explanation:
                    "For every element, find the first greater element to its right. A monotonic decreasing stack helps solve this efficiently.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                items: stack,
                variables: {
                    array,
                    result: [...result]
                },
                structure: "stack",
                action: "initialize"
            }));

            for (let i = 0; i < array.length; i++) {
                steps.push(this.createStep({
                    title: `Inspect Element ${array[i]}`,
                    explanation:
                        `Check whether ${array[i]} is greater than the elements stored at the top of the stack.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    items: stack.map(index => array[index]),
                    variables: {
                        currentIndex: i,
                        currentValue: array[i],
                        stackIndices: [...stack],
                        result: [...result]
                    },
                    structure: "stack",
                    action: "inspect"
                }));

                while (
                    stack.length > 0 &&
                    array[stack[stack.length - 1]] < array[i]
                ) {
                    const previousIndex = stack.pop();

                    result[previousIndex] = array[i];

                    steps.push(this.createStep({
                        title: `Next Greater for ${array[previousIndex]}`,
                        explanation:
                            `${array[i]} is the next greater element for ${array[previousIndex]}.`,
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 8,
                            java: 6
                        },
                        items: stack.map(index => array[index]),
                        variables: {
                            resolvedValue: array[previousIndex],
                            nextGreater: array[i],
                            result: [...result]
                        },
                        structure: "stack",
                        action: "resolve"
                    }));
                }

                stack.push(i);

                steps.push(this.createStep({
                    title: `Push Index ${i}`,
                    explanation:
                        `Push index ${i} because its next greater element has not been found yet.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 9,
                        java: 7
                    },
                    items: stack.map(index => array[index]),
                    variables: {
                        pushedIndex: i,
                        pushedValue: array[i],
                        stackIndices: [...stack],
                        result: [...result]
                    },
                    structure: "stack",
                    action: "push"
                }));
            }

            steps.push(this.createStep({
                title: "Unresolved Elements",
                explanation:
                    "Elements remaining in the stack have no greater element to their right. Their answer remains null.",
                codeLine: {
                    python: 6,
                    javascript: 6,
                    cpp: 10,
                    java: 8
                },
                items: stack.map(index => array[index]),
                variables: {
                    unresolvedIndices: [...stack],
                    result: [...result]
                },
                structure: "stack",
                action: "inspect"
            }));

            steps.push(this.createStep({
                title: "Next Greater Element Completed",
                explanation:
                    "Every array element now has its next greater element, or null if none exists.",
                codeLine: {
                    python: 7,
                    javascript: 7,
                    cpp: 11,
                    java: 9
                },
                items: stack.map(index => array[index]),
                variables: {
                    array,
                    result
                },
                structure: "stack",
                action: "complete",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // REGISTER ALL ALGORITHMS
        // =====================================

        registerAlgorithms() {

            this.register("stack-push", {
                title: "Stack Push",
                description:
                    "Insert a new element at the top of the stack.",
                complexity: {
                    time: "O(1)",
                    space: "O(1)"
                },
                execute: input => this.stackPush(input)
            });

            this.register("stack-pop", {
                title: "Stack Pop",
                description:
                    "Remove the top element from the stack.",
                complexity: {
                    time: "O(1)",
                    space: "O(1)"
                },
                execute: input => this.stackPop(input)
            });

            this.register("stack-peek", {
                title: "Stack Peek",
                description:
                    "Read the top element without removing it.",
                complexity: {
                    time: "O(1)",
                    space: "O(1)"
                },
                execute: input => this.stackPeek(input)
            });

            this.register("stack-display", {
                title: "Stack Display",
                description:
                    "Display all elements stored in the stack.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.stackDisplay(input)
            });

            this.register("queue-enqueue", {
                title: "Queue Enqueue",
                description:
                    "Insert an element at the rear of the queue.",
                complexity: {
                    time: "O(1)",
                    space: "O(1)"
                },
                execute: input => this.queueEnqueue(input)
            });

            this.register("queue-dequeue", {
                title: "Queue Dequeue",
                description:
                    "Remove an element from the front of the queue.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.queueDequeue(input)
            });

            this.register("circular-queue", {
                title: "Circular Queue",
                description:
                    "Perform enqueue and dequeue operations using circular indexing.",
                complexity: {
                    time: "O(1) per operation",
                    space: "O(n)"
                },
                execute: input => this.circularQueue(input)
            });

            this.register("balanced-parentheses", {
                title: "Balanced Parentheses",
                description:
                    "Check whether brackets are correctly matched using a stack.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.balancedParentheses(input)
            });

            this.register("reverse-string-stack", {
                title: "Reverse String Using Stack",
                description:
                    "Reverse a string by pushing and popping characters.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.reverseString(input)
            });

            this.register("next-greater-element", {
                title: "Next Greater Element",
                description:
                    "Find the next greater element for each array element using a monotonic stack.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.nextGreaterElement(input)
            });
        }
    }

    // =====================================
    // GLOBAL EXPORT
    // =====================================

    global.StackQueueAlgorithms = StackQueueAlgorithms;

    // =====================================
    // COMMONJS EXPORT
    // =====================================

    if (
        typeof module !== "undefined" &&
        module.exports
    ) {
        module.exports = StackQueueAlgorithms;
    }

})(typeof window !== "undefined" ? window : globalThis);
