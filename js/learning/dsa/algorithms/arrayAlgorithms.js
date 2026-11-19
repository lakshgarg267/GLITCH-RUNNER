
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/arrayAlgorithms.js
 *
 * Array Algorithms:
 * 1. Traversal
 * 2. Linear Search
 * 3. Binary Search
 * 4. Insertion
 * 5. Deletion
 * 6. Update
 * 7. Reverse
 * 8. Maximum and Minimum
 *
 * Every algorithm generates:
 * - Execution steps
 * - Variable snapshots
 * - Code line information
 * - Visualization scenes
 * - Explanations
 */

(function (global) {
    "use strict";

    class ArrayAlgorithms {

        constructor() {
            this.algorithms = new Map();

            this.registerAlgorithms();
        }

        // =======================================
        // COMMON UTILITIES
        // =======================================

        clone(value) {
            return JSON.parse(JSON.stringify(value));
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
                        "Array elements must be valid numbers."
                    );
                }

                return number;
            });
        }

        validateIndex(index, length, allowEnd = false) {
            if (!Number.isInteger(index)) {
                throw new TypeError(
                    "Index must be an integer."
                );
            }

            const maximum = allowEnd ? length : length - 1;

            if (index < 0 || index > maximum) {
                throw new RangeError(
                    `Index must be between 0 and ${maximum}.`
                );
            }

            return index;
        }

        createScene(array, options = {}) {
            const items = array.map((value, index) => {

                let state = "default";

                if (options.activeIndex === index) {
                    state = "active";
                }

                if (
                    options.foundIndex === index
                ) {
                    state = "success";
                }

                if (
                    options.comparedIndices &&
                    options.comparedIndices.includes(index)
                ) {
                    state = "compared";
                }

                if (
                    options.sortedIndices &&
                    options.sortedIndices.includes(index)
                ) {
                    state = "sorted";
                }

                if (
                    options.deletedIndices &&
                    options.deletedIndices.includes(index)
                ) {
                    state = "deleted";
                }

                return {
                    id: `array-item-${index}`,
                    value,
                    index,
                    label: String(value),
                    state
                };
            });

            const pointers = [];

            if (Number.isInteger(options.activeIndex)) {
                pointers.push({
                    label: options.activeLabel || "i",
                    index: options.activeIndex,
                    color: "#38BDF8"
                });
            }

            if (Number.isInteger(options.left)) {
                pointers.push({
                    label: "LEFT",
                    index: options.left,
                    color: "#22C55E"
                });
            }

            if (Number.isInteger(options.right)) {
                pointers.push({
                    label: "RIGHT",
                    index: options.right,
                    color: "#F97316"
                });
            }

            if (Number.isInteger(options.mid)) {
                pointers.push({
                    label: "MID",
                    index: options.mid,
                    color: "#A78BFA"
                });
            }

            return {
                type: "array",
                items,
                pointers,
                edges: [],
                status: options.status || "Ready",
                meta: {
                    length: array.length,
                    operation: options.operation || "array",
                    target: options.target ?? null
                }
            };
        }

        createStep({
            title,
            explanation,
            codeLine,
            array,
            variables = {},
            options = {},
            action = "inspect"
        }) {
            return {
                title,
                explanation,
                codeLine,
                action,

                variables: this.clone(variables),

                scene: this.createScene(
                    array,
                    options
                ),

                snapshot: {
                    array: [...array],
                    variables: this.clone(variables)
                }
            };
        }

        register(id, definition) {
            if (!id || typeof id !== "string") {
                throw new TypeError(
                    "Algorithm ID is required."
                );
            }

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
                    `Array algorithm not found: ${id}`
                );
            }

            return algorithm.execute(input);
        }

        // =======================================
        // 1. ARRAY TRAVERSAL
        // =======================================

        traversal(input = {}) {

            const array = this.validateArray(
                input.array || [10, 20, 30, 40, 50]
            );

            const steps = [];

            steps.push(this.createStep({
                title: "Initialize Array",
                explanation:
                    "We have an array. We will visit every element from left to right.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 6,
                    java: 3
                },
                array,
                variables: {
                    length: array.length,
                    index: null
                },
                options: {
                    operation: "traversal"
                },
                action: "initialize"
            }));

            for (let i = 0; i < array.length; i++) {

                steps.push(this.createStep({
                    title: `Visit index ${i}`,
                    explanation:
                        `The pointer is now at index ${i}. The current element is ${array[i]}.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 9,
                        java: 6
                    },
                    array,
                    variables: {
                        i,
                        currentValue: array[i],
                        length: array.length
                    },
                    options: {
                        activeIndex: i,
                        activeLabel: "i",
                        operation: "traversal",
                        status: `Visiting ${array[i]}`
                    },
                    action: "visit"
                }));
            }

            steps.push(this.createStep({
                title: "Traversal Completed",
                explanation:
                    "Every element has been visited. Array traversal is complete.",
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 9,
                    java: 6
                },
                array,
                variables: {
                    visited: array.length,
                    length: array.length
                },
                options: {
                    sortedIndices: array.map((_, i) => i),
                    operation: "traversal",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =======================================
        // 2. LINEAR SEARCH
        // =======================================

        linearSearch(input = {}) {

            const array = this.validateArray(
                input.array || [10, 20, 30, 40, 50]
            );

            const target = Number(
                input.target ?? 30
            );

            if (!Number.isFinite(target)) {
                throw new TypeError(
                    "Search target must be a number."
                );
            }

            const steps = [];

            steps.push(this.createStep({
                title: "Start Linear Search",
                explanation:
                    `We need to find ${target}. We will check each element one by one.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                array,
                variables: {
                    target,
                    i: null,
                    found: false
                },
                options: {
                    operation: "linear-search",
                    target
                },
                action: "initialize"
            }));

            for (let i = 0; i < array.length; i++) {

                steps.push(this.createStep({
                    title: `Check index ${i}`,
                    explanation:
                        `Comparing ${array[i]} with target ${target}.`,
                    codeLine: {
                        python: 4,
                        javascript: 5,
                        cpp: 9,
                        java: 8
                    },
                    array,
                    variables: {
                        target,
                        i,
                        currentValue: array[i],
                        found: false
                    },
                    options: {
                        activeIndex: i,
                        activeLabel: "i",
                        target,
                        operation: "linear-search",
                        status: "Comparing"
                    },
                    action: "compare"
                }));

                if (array[i] === target) {

                    steps.push(this.createStep({
                        title: "Element Found!",
                        explanation:
                            `${target} was found at index ${i}. Search successful.`,
                        codeLine: {
                            python: 5,
                            javascript: 6,
                            cpp: 10,
                            java: 9
                        },
                        array,
                        variables: {
                            target,
                            i,
                            found: true,
                            result: i
                        },
                        options: {
                            foundIndex: i,
                            activeIndex: i,
                            target,
                            operation: "linear-search",
                            status: "Found"
                        },
                        action: "found"
                    }));

                    return steps;
                }
            }

            steps.push(this.createStep({
                title: "Element Not Found",
                explanation:
                    `${target} does not exist in this array.`,
                codeLine: {
                    python: 7,
                    javascript: 11,
                    cpp: 16,
                    java: 16
                },
                array,
                variables: {
                    target,
                    found: false,
                    result: -1
                },
                options: {
                    operation: "linear-search",
                    target,
                    status: "Not Found"
                },
                action: "not-found"
            }));

            return steps;
        }

        // =======================================
        // 3. BINARY SEARCH
        // =======================================

        binarySearch(input = {}) {

            const array = this.validateArray(
                input.array || [10, 20, 30, 40, 50]
            );

            const target = Number(
                input.target ?? 40
            );

            if (!Number.isFinite(target)) {
                throw new TypeError(
                    "Search target must be a number."
                );
            }

            for (let i = 1; i < array.length; i++) {
                if (array[i] < array[i - 1]) {
                    throw new Error(
                        "Binary Search requires a sorted array."
                    );
                }
            }

            const steps = [];

            let left = 0;
            let right = array.length - 1;

            steps.push(this.createStep({
                title: "Initialize Binary Search",
                explanation:
                    "Binary Search works on sorted arrays. We begin with the complete search range.",
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 9,
                    java: 6
                },
                array,
                variables: {
                    left,
                    right,
                    target,
                    mid: null
                },
                options: {
                    left,
                    right,
                    target,
                    operation: "binary-search"
                },
                action: "initialize"
            }));

            while (left <= right) {

                const mid = Math.floor(
                    (left + right) / 2
                );

                steps.push(this.createStep({
                    title: "Calculate Middle",
                    explanation:
                        `Middle index = (${left} + ${right}) / 2 = ${mid}.`,
                    codeLine: {
                        python: 7,
                        javascript: 7,
                        cpp: 12,
                        java: 10
                    },
                    array,
                    variables: {
                        left,
                        right,
                        mid,
                        target,
                        middleValue: array[mid]
                    },
                    options: {
                        left,
                        right,
                        mid,
                        target,
                        activeIndex: mid,
                        operation: "binary-search",
                        status: "Checking middle"
                    },
                    action: "calculate-mid"
                }));

                if (array[mid] === target) {

                    steps.push(this.createStep({
                        title: "Target Found!",
                        explanation:
                            `${target} equals the middle element at index ${mid}.`,
                        codeLine: {
                            python: 9,
                            javascript: 9,
                            cpp: 14,
                            java: 12
                        },
                        array,
                        variables: {
                            left,
                            right,
                            mid,
                            target,
                            result: mid
                        },
                        options: {
                            foundIndex: mid,
                            activeIndex: mid,
                            target,
                            operation: "binary-search",
                            status: "Found"
                        },
                        action: "found"
                    }));

                    return steps;
                }

                if (array[mid] < target) {

                    steps.push(this.createStep({
                        title: "Search Right Half",
                        explanation:
                            `${array[mid]} is smaller than ${target}. Discard the left half.`,
                        codeLine: {
                            python: 11,
                            javascript: 11,
                            cpp: 17,
                            java: 15
                        },
                        array,
                        variables: {
                            left,
                            right,
                            mid,
                            target,
                            comparison: "less-than"
                        },
                        options: {
                            left,
                            right,
                            mid,
                            target,
                            activeIndex: mid,
                            operation: "binary-search",
                            status: "Move right"
                        },
                        action: "move-right"
                    }));

                    left = mid + 1;

                } else {

                    steps.push(this.createStep({
                        title: "Search Left Half",
                        explanation:
                            `${array[mid]} is greater than ${target}. Discard the right half.`,
                        codeLine: {
                            python: 13,
                            javascript: 13,
                            cpp: 19,
                            java: 17
                        },
                        array,
                        variables: {
                            left,
                            right,
                            mid,
                            target,
                            comparison: "greater-than"
                        },
                        options: {
                            left,
                            right,
                            mid,
                            target,
                            activeIndex: mid,
                            operation: "binary-search",
                            status: "Move left"
                        },
                        action: "move-left"
                    }));

                    right = mid - 1;
                }

                steps.push(this.createStep({
                    title: "Update Search Range",
                    explanation:
                        `New search range is from index ${left} to ${right}.`,
                    codeLine: {
                        python: 11,
                        javascript: 11,
                        cpp: 17,
                        java: 15
                    },
                    array,
                    variables: {
                        left,
                        right,
                        target
                    },
                    options: {
                        left,
                        right,
                        target,
                        operation: "binary-search",
                        status: "Range updated"
                    },
                    action: "update-range"
                }));
            }

            steps.push(this.createStep({
                title: "Target Not Found",
                explanation:
                    "The search range is empty. The target does not exist in the array.",
                codeLine: {
                    python: 15,
                    javascript: 17,
                    cpp: 23,
                    java: 21
                },
                array,
                variables: {
                    left,
                    right,
                    target,
                    result: -1
                },
                options: {
                    target,
                    operation: "binary-search",
                    status: "Not Found"
                },
                action: "not-found"
            }));

            return steps;
        }

        // =======================================
        // 4. INSERTION
        // =======================================

        insert(input = {}) {

            const array = this.validateArray(
                input.array || [10, 20, 40, 50]
            );

            const index = this.validateIndex(
                input.index ?? 2,
                array.length,
                true
            );

            const value = Number(
                input.value ?? 30
            );

            if (!Number.isFinite(value)) {
                throw new TypeError(
                    "Inserted value must be a number."
                );
            }

            const steps = [];

            const working = [...array];

            steps.push(this.createStep({
                title: "Start Insertion",
                explanation:
                    `We want to insert ${value} at index ${index}.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                array: working,
                variables: {
                    index,
                    value,
                    length: working.length
                },
                options: {
                    operation: "array-insertion"
                },
                action: "initialize"
            }));

            for (let i = working.length; i > index; i--) {

                steps.push(this.createStep({
                    title: `Shift element at ${i - 1}`,
                    explanation:
                        `Move ${working[i - 1]} one position to the right to create space.`,
                    codeLine: {
                        python: 4,
                        javascript: 4,
                        cpp: 10,
                        java: 7
                    },
                    array: working,
                    variables: {
                        i,
                        index,
                        value,
                        shiftingValue: working[i - 1]
                    },
                    options: {
                        activeIndex: i - 1,
                        activeLabel: "i",
                        operation: "array-insertion",
                        status: "Shifting"
                    },
                    action: "shift"
                }));

                working[i] = working[i - 1];

                steps.push(this.createStep({
                    title: "Position Shifted",
                    explanation:
                        `Element moved from index ${i - 1} to index ${i}.`,
                    codeLine: {
                        python: 4,
                        javascript: 4,
                        cpp: 10,
                        java: 7
                    },
                    array: working,
                    variables: {
                        i,
                        index,
                        value
                    },
                    options: {
                        activeIndex: i,
                        activeLabel: "i",
                        operation: "array-insertion",
                        status: "Shift complete"
                    },
                    action: "shift-complete"
                }));
            }

            working[index] = value;

            steps.push(this.createStep({
                title: "Insert New Element",
                explanation:
                    `${value} has been placed at index ${index}.`,
                codeLine: {
                    python: 6,
                    javascript: 6,
                    cpp: 12,
                    java: 9
                },
                array: working,
                variables: {
                    index,
                    value,
                    length: working.length
                },
                options: {
                    foundIndex: index,
                    operation: "array-insertion",
                    status: "Inserted"
                },
                action: "insert"
            }));

            steps.push(this.createStep({
                title: "Insertion Completed",
                explanation:
                    "The array now contains the new element.",
                codeLine: {
                    python: 6,
                    javascript: 6,
                    cpp: 12,
                    java: 9
                },
                array: working,
                variables: {
                    length: working.length,
                    insertedValue: value,
                    insertedIndex: index
                },
                options: {
                    sortedIndices: working.map((_, i) => i),
                    operation: "array-insertion",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =======================================
        // 5. DELETION
        // =======================================

        delete(input = {}) {

            const array = this.validateArray(
                input.array || [10, 20, 30, 40, 50]
            );

            if (!array.length) {
                throw new Error(
                    "Cannot delete from an empty array."
                );
            }

            const index = this.validateIndex(
                input.index ?? 2,
                array.length
            );

            const steps = [];

            const working = [...array];

            const deletedValue = working[index];

            steps.push(this.createStep({
                title: "Start Deletion",
                explanation:
                    `We want to delete the element at index ${index}.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                array: working,
                variables: {
                    index,
                    deletedValue,
                    length: working.length
                },
                options: {
                    activeIndex: index,
                    operation: "array-deletion"
                },
                action: "initialize"
            }));

            steps.push(this.createStep({
                title: "Select Element",
                explanation:
                    `Element ${deletedValue} is selected for deletion.`,
                codeLine: {
                    python: 2,
                    javascript: 2,
                    cpp: 6,
                    java: 4
                },
                array: working,
                variables: {
                    index,
                    deletedValue
                },
                options: {
                    deletedIndices: [index],
                    activeIndex: index,
                    operation: "array-deletion",
                    status: "Selected for deletion"
                },
                action: "select"
            }));

            working.splice(index, 1);

            steps.push(this.createStep({
                title: "Shift Remaining Elements",
                explanation:
                    "The remaining elements move left to fill the empty position.",
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 9,
                    java: 6
                },
                array: working,
                variables: {
                    index,
                    deletedValue,
                    newLength: working.length
                },
                options: {
                    activeIndex: Math.min(
                        index,
                        working.length - 1
                    ),
                    operation: "array-deletion",
                    status: "Shifting left"
                },
                action: "shift-left"
            }));

            steps.push(this.createStep({
                title: "Deletion Completed",
                explanation:
                    `${deletedValue} has been removed from the array.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 9,
                    java: 6
                },
                array: working,
                variables: {
                    deletedValue,
                    deletedIndex: index,
                    length: working.length
                },
                options: {
                    sortedIndices: working.map((_, i) => i),
                    operation: "array-deletion",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =======================================
        // 6. UPDATE ELEMENT
        // =======================================

        update(input = {}) {

            const array = this.validateArray(
                input.array || [10, 20, 30, 40, 50]
            );

            if (!array.length) {
                throw new Error(
                    "Cannot update an empty array."
                );
            }

            const index = this.validateIndex(
                input.index ?? 2,
                array.length
            );

            const newValue = Number(
                input.value ?? 99
            );

            if (!Number.isFinite(newValue)) {
                throw new TypeError(
                    "Updated value must be a number."
                );
            }

            const steps = [];

            const working = [...array];

            const oldValue = working[index];

            steps.push(this.createStep({
                title: "Start Update",
                explanation:
                    `We want to replace ${oldValue} with ${newValue} at index ${index}.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                array: working,
                variables: {
                    index,
                    oldValue,
                    newValue
                },
                options: {
                    activeIndex: index,
                    operation: "array-update"
                },
                action: "initialize"
            }));

            steps.push(this.createStep({
                title: "Locate Element",
                explanation:
                    `Current value at index ${index} is ${oldValue}.`,
                codeLine: {
                    python: 2,
                    javascript: 2,
                    cpp: 6,
                    java: 4
                },
                array: working,
                variables: {
                    index,
                    oldValue,
                    newValue
                },
                options: {
                    activeIndex: index,
                    operation: "array-update",
                    status: "Element located"
                },
                action: "locate"
            }));

            working[index] = newValue;

            steps.push(this.createStep({
                title: "Replace Value",
                explanation:
                    `${oldValue} has been replaced with ${newValue}.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                array: working,
                variables: {
                    index,
                    oldValue,
                    newValue
                },
                options: {
                    foundIndex: index,
                    operation: "array-update",
                    status: "Updated"
                },
                action: "update"
            }));

            steps.push(this.createStep({
                title: "Update Completed",
                explanation:
                    "The array has been updated successfully.",
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                array: working,
                variables: {
                    index,
                    value: newValue
                },
                options: {
                    foundIndex: index,
                    operation: "array-update",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =======================================
        // 7. REVERSE ARRAY
        // =======================================

        reverse(input = {}) {

            const array = this.validateArray(
                input.array || [10, 20, 30, 40, 50]
            );

            const working = [...array];

            const steps = [];

            let left = 0;
            let right = working.length - 1;

            steps.push(this.createStep({
                title: "Start Array Reversal",
                explanation:
                    "We will reverse the array using two pointers: left and right.",
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 6,
                    java: 4
                },
                array: working,
                variables: {
                    left,
                    right
                },
                options: {
                    left,
                    right,
                    operation: "array-reverse"
                },
                action: "initialize"
            }));

            while (left < right) {

                steps.push(this.createStep({
                    title: "Select Two Elements",
                    explanation:
                        `We will swap ${working[left]} and ${working[right]}.`,
                    codeLine: {
                        python: 6,
                        javascript: 6,
                        cpp: 10,
                        java: 8
                    },
                    array: working,
                    variables: {
                        left,
                        right,
                        leftValue: working[left],
                        rightValue: working[right]
                    },
                    options: {
                        left,
                        right,
                        comparedIndices: [left, right],
                        operation: "array-reverse",
                        status: "Ready to swap"
                    },
                    action: "select-pair"
                }));

                const temp = working[left];

                working[left] = working[right];

                working[right] = temp;

                steps.push(this.createStep({
                    title: "Swap Elements",
                    explanation:
                        `Elements at index ${left} and ${right} have been swapped.`,
                    codeLine: {
                        python: 6,
                        javascript: 6,
                        cpp: 10,
                        java: 8
                    },
                    array: working,
                    variables: {
                        left,
                        right,
                        leftValue: working[left],
                        rightValue: working[right]
                    },
                    options: {
                        comparedIndices: [left, right],
                        operation: "array-reverse",
                        status: "Swapped"
                    },
                    action: "swap"
                }));

                left++;
                right--;

                steps.push(this.createStep({
                    title: "Move Pointers",
                    explanation:
                        "Move the left pointer forward and the right pointer backward.",
                    codeLine: {
                        python: 7,
                        javascript: 7,
                        cpp: 11,
                        java: 9
                    },
                    array: working,
                    variables: {
                        left,
                        right
                    },
                    options: {
                        left: left < working.length ? left : null,
                        right: right >= 0 ? right : null,
                        operation: "array-reverse",
                        status: "Pointers moved"
                    },
                    action: "move-pointers"
                }));
            }

            steps.push(this.createStep({
                title: "Reversal Completed",
                explanation:
                    "All required swaps are complete. The array is now reversed.",
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 7,
                    java: 5
                },
                array: working,
                variables: {
                    left,
                    right,
                    reversed: true
                },
                options: {
                    sortedIndices: working.map((_, i) => i),
                    operation: "array-reverse",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =======================================
        // 8. MAXIMUM AND MINIMUM
        // =======================================

        findMinMax(input = {}) {

            const array = this.validateArray(
                input.array || [10, 20, 30, 40, 50]
            );

            if (!array.length) {
                throw new Error(
                    "Cannot find minimum or maximum of an empty array."
                );
            }

            const steps = [];

            let minimum = array[0];
            let maximum = array[0];

            let minIndex = 0;
            let maxIndex = 0;

            steps.push(this.createStep({
                title: "Initialize Minimum and Maximum",
                explanation:
                    "Assume the first element is both the minimum and maximum.",
                codeLine: {
                    python: 2,
                    javascript: 2,
                    cpp: 6,
                    java: 4
                },
                array,
                variables: {
                    minimum,
                    maximum,
                    minIndex,
                    maxIndex
                },
                options: {
                    activeIndex: 0,
                    operation: "array-min-max"
                },
                action: "initialize"
            }));

            for (let i = 1; i < array.length; i++) {

                steps.push(this.createStep({
                    title: `Inspect index ${i}`,
                    explanation:
                        `Checking ${array[i]} against current minimum ${minimum} and maximum ${maximum}.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 10,
                        java: 8
                    },
                    array,
                    variables: {
                        i,
                        currentValue: array[i],
                        minimum,
                        maximum,
                        minIndex,
                        maxIndex
                    },
                    options: {
                        activeIndex: i,
                        operation: "array-min-max",
                        status: "Comparing"
                    },
                    action: "compare"
                }));

                if (array[i] < minimum) {

                    minimum = array[i];
                    minIndex = i;

                    steps.push(this.createStep({
                        title: "New Minimum Found",
                        explanation:
                            `${minimum} is the new minimum value.`,
                        codeLine: {
                            python: 6,
                            javascript: 6,
                            cpp: 11,
                            java: 9
                        },
                        array,
                        variables: {
                            i,
                            minimum,
                            maximum,
                            minIndex,
                            maxIndex
                        },
                        options: {
                            activeIndex: i,
                            foundIndex: i,
                            operation: "array-min-max",
                            status: "New minimum"
                        },
                        action: "update-min"
                    }));
                }

                if (array[i] > maximum) {

                    maximum = array[i];
                    maxIndex = i;

                    steps.push(this.createStep({
                        title: "New Maximum Found",
                        explanation:
                            `${maximum} is the new maximum value.`,
                        codeLine: {
                            python: 8,
                            javascript: 8,
                            cpp: 14,
                            java: 11
                        },
                        array,
                        variables: {
                            i,
                            minimum,
                            maximum,
                            minIndex,
                            maxIndex
                        },
                        options: {
                            activeIndex: i,
                            foundIndex: i,
                            operation: "array-min-max",
                            status: "New maximum"
                        },
                        action: "update-max"
                    }));
                }
            }

            steps.push(this.createStep({
                title: "Minimum and Maximum Found",
                explanation:
                    `Minimum = ${minimum}, Maximum = ${maximum}.`,
                codeLine: {
                    python: 8,
                    javascript: 8,
                    cpp: 14,
                    java: 11
                },
                array,
                variables: {
                    minimum,
                    maximum,
                    minIndex,
                    maxIndex
                },
                options: {
                    operation: "array-min-max",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =======================================
        // ALGORITHM REGISTRATION
        // =======================================

        registerAlgorithms() {

            this.register("array-traversal", {
                title: "Array Traversal",
                description:
                    "Visit every element of an array one by one.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.traversal(input)
            });

            this.register("linear-search", {
                title: "Linear Search",
                description:
                    "Search for a target element by checking each element.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.linearSearch(input)
            });

            this.register("binary-search", {
                title: "Binary Search",
                description:
                    "Find an element in a sorted array by repeatedly dividing the search range.",
                complexity: {
                    time: "O(log n)",
                    space: "O(1)"
                },
                execute: input => this.binarySearch(input)
            });

            this.register("array-insertion", {
                title: "Array Insertion",
                description:
                    "Insert a new element at a specified index.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.insert(input)
            });

            this.register("array-deletion", {
                title: "Array Deletion",
                description:
                    "Delete an element and shift remaining elements.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.delete(input)
            });

            this.register("array-update", {
                title: "Array Update",
                description:
                    "Replace an element at a specified index.",
                complexity: {
                    time: "O(1)",
                    space: "O(n)"
                },
                execute: input => this.update(input)
            });

            this.register("array-reverse", {
                title: "Reverse Array",
                description:
                    "Reverse an array using two pointers.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.reverse(input)
            });

            this.register("array-min-max", {
                title: "Find Minimum and Maximum",
                description:
                    "Find the smallest and largest values in an array.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.findMinMax(input)
            });
        }
    }

    // =======================================
    // GLOBAL EXPORT
    // =======================================

    global.ArrayAlgorithms = ArrayAlgorithms;

    // =======================================
    // MODULE EXPORT
    // =======================================

    if (
        typeof module !== "undefined" &&
        module.exports
    ) {
        module.exports = ArrayAlgorithms;
    }

})(typeof window !== "undefined" ? window : globalThis);
