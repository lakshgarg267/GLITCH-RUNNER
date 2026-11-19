
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/algorithms/sortingAlgorithms.js
 *
 * Sorting Algorithms:
 * 1. Bubble Sort
 * 2. Selection Sort
 * 3. Insertion Sort
 * 4. Merge Sort
 * 5. Quick Sort
 * 6. Counting Sort
 */

(function (global) {
    "use strict";

    class SortingAlgorithms {

        constructor() {
            this.algorithms = new Map();
            this.registerAlgorithms();
        }

        // =====================================
        // COMMON UTILITIES
        // =====================================

        validateArray(array) {
            if (!Array.isArray(array)) {
                throw new TypeError("Input must be an array.");
            }

            return array.map(value => {
                const number = Number(value);

                if (!Number.isFinite(number)) {
                    throw new TypeError(
                        "All array elements must be finite numbers."
                    );
                }

                return number;
            });
        }

        clone(value) {
            return JSON.parse(JSON.stringify(value));
        }

        createScene(array, options = {}) {
            const items = array.map((value, index) => {
                let state = "default";

                if (
                    options.activeIndices &&
                    options.activeIndices.includes(index)
                ) {
                    state = "active";
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
                    options.pivotIndex === index
                ) {
                    state = "pivot";
                }

                return {
                    id: `sort-item-${index}`,
                    value,
                    index,
                    label: String(value),
                    state
                };
            });

            const pointers = [];

            if (Number.isInteger(options.i)) {
                pointers.push({
                    label: "i",
                    index: options.i,
                    color: "#38BDF8"
                });
            }

            if (Number.isInteger(options.j)) {
                pointers.push({
                    label: "j",
                    index: options.j,
                    color: "#F97316"
                });
            }

            if (Number.isInteger(options.minIndex)) {
                pointers.push({
                    label: "MIN",
                    index: options.minIndex,
                    color: "#22C55E"
                });
            }

            if (Number.isInteger(options.pivotIndex)) {
                pointers.push({
                    label: "PIVOT",
                    index: options.pivotIndex,
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
                    operation: options.operation || "sorting",
                    comparisons: options.comparisons || 0,
                    swaps: options.swaps || 0
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
                    `Sorting algorithm not found: ${id}`
                );
            }

            return algorithm.execute(input);
        }

        // =====================================
        // 1. BUBBLE SORT
        // =====================================

        bubbleSort(input = {}) {
            const array = this.validateArray(
                input.array || [64, 34, 25, 12, 22, 11, 90]
            );

            const working = [...array];
            const steps = [];

            let comparisons = 0;
            let swaps = 0;

            steps.push(this.createStep({
                title: "Start Bubble Sort",
                explanation:
                    "Bubble Sort compares adjacent elements and moves the largest unsorted value towards the end.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                array: working,
                variables: {
                    n: working.length,
                    comparisons,
                    swaps
                },
                options: {
                    operation: "bubble-sort"
                },
                action: "initialize"
            }));

            for (let i = 0; i < working.length - 1; i++) {
                let swapped = false;

                for (let j = 0; j < working.length - i - 1; j++) {
                    comparisons++;

                    steps.push(this.createStep({
                        title: `Compare ${working[j]} and ${working[j + 1]}`,
                        explanation:
                            `Compare adjacent elements at indexes ${j} and ${j + 1}.`,
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 9,
                            java: 7
                        },
                        array: working,
                        variables: {
                            i,
                            j,
                            leftValue: working[j],
                            rightValue: working[j + 1],
                            comparisons,
                            swaps
                        },
                        options: {
                            activeIndices: [j, j + 1],
                            comparedIndices: [j, j + 1],
                            operation: "bubble-sort",
                            comparisons,
                            swaps,
                            status: "Comparing"
                        },
                        action: "compare"
                    }));

                    if (working[j] > working[j + 1]) {
                        const temp = working[j];
                        working[j] = working[j + 1];
                        working[j + 1] = temp;

                        swaps++;
                        swapped = true;

                        steps.push(this.createStep({
                            title: "Swap Elements",
                            explanation:
                                "The left element is greater, so the adjacent elements are swapped.",
                            codeLine: {
                                python: 5,
                                javascript: 5,
                                cpp: 10,
                                java: 8
                            },
                            array: working,
                            variables: {
                                i,
                                j,
                                comparisons,
                                swaps
                            },
                            options: {
                                activeIndices: [j, j + 1],
                                comparedIndices: [j, j + 1],
                                operation: "bubble-sort",
                                comparisons,
                                swaps,
                                status: "Swapping"
                            },
                            action: "swap"
                        }));
                    } else {
                        steps.push(this.createStep({
                            title: "No Swap Needed",
                            explanation:
                                "The elements are already in ascending order.",
                            codeLine: {
                                python: 4,
                                javascript: 4,
                                cpp: 9,
                                java: 7
                            },
                            array: working,
                            variables: {
                                i,
                                j,
                                comparisons,
                                swaps
                            },
                            options: {
                                comparedIndices: [j, j + 1],
                                operation: "bubble-sort",
                                comparisons,
                                swaps,
                                status: "Correct order"
                            },
                            action: "no-swap"
                        }));
                    }
                }

                if (!swapped) {
                    break;
                }
            }

            steps.push(this.createStep({
                title: "Bubble Sort Completed",
                explanation:
                    "All elements are now arranged in ascending order.",
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 9,
                    java: 7
                },
                array: working,
                variables: {
                    sortedArray: [...working],
                    comparisons,
                    swaps
                },
                options: {
                    sortedIndices: working.map((_, i) => i),
                    operation: "bubble-sort",
                    comparisons,
                    swaps,
                    status: "Sorted"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 2. SELECTION SORT
        // =====================================

        selectionSort(input = {}) {
            const array = this.validateArray(
                input.array || [64, 25, 12, 22, 11]
            );

            const working = [...array];
            const steps = [];

            let comparisons = 0;
            let swaps = 0;

            steps.push(this.createStep({
                title: "Start Selection Sort",
                explanation:
                    "Selection Sort finds the smallest element in the unsorted section and places it at the beginning.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                array: working,
                variables: {
                    n: working.length,
                    comparisons,
                    swaps
                },
                options: {
                    operation: "selection-sort"
                },
                action: "initialize"
            }));

            for (let i = 0; i < working.length - 1; i++) {
                let minIndex = i;

                steps.push(this.createStep({
                    title: "Select Minimum Candidate",
                    explanation:
                        `Assume ${working[i]} at index ${i} is the smallest element.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 8,
                        java: 6
                    },
                    array: working,
                    variables: {
                        i,
                        minIndex,
                        minimum: working[minIndex],
                        comparisons,
                        swaps
                    },
                    options: {
                        i,
                        minIndex,
                        operation: "selection-sort",
                        status: "Finding minimum"
                    },
                    action: "select-minimum"
                }));

                for (let j = i + 1; j < working.length; j++) {
                    comparisons++;

                    steps.push(this.createStep({
                        title: `Check element ${working[j]}`,
                        explanation:
                            `Compare ${working[j]} with current minimum ${working[minIndex]}.`,
                        codeLine: {
                            python: 5,
                            javascript: 5,
                            cpp: 10,
                            java: 8
                        },
                        array: working,
                        variables: {
                            i,
                            j,
                            minIndex,
                            currentValue: working[j],
                            minimum: working[minIndex],
                            comparisons
                        },
                        options: {
                            i,
                            j,
                            minIndex,
                            comparedIndices: [j, minIndex],
                            operation: "selection-sort",
                            comparisons,
                            swaps,
                            status: "Comparing"
                        },
                        action: "compare"
                    }));

                    if (working[j] < working[minIndex]) {
                        minIndex = j;

                        steps.push(this.createStep({
                            title: "New Minimum Found",
                            explanation:
                                `${working[minIndex]} is now the smallest element found in this pass.`,
                            codeLine: {
                                python: 6,
                                javascript: 6,
                                cpp: 11,
                                java: 9
                            },
                            array: working,
                            variables: {
                                i,
                                j,
                                minIndex,
                                minimum: working[minIndex],
                                comparisons,
                                swaps
                            },
                            options: {
                                i,
                                j,
                                minIndex,
                                activeIndices: [minIndex],
                                operation: "selection-sort",
                                comparisons,
                                swaps,
                                status: "New minimum"
                            },
                            action: "update-minimum"
                        }));
                    }
                }

                if (minIndex !== i) {
                    const temp = working[i];
                    working[i] = working[minIndex];
                    working[minIndex] = temp;

                    swaps++;

                    steps.push(this.createStep({
                        title: "Place Minimum Element",
                        explanation:
                            `Swap the minimum element into index ${i}.`,
                        codeLine: {
                            python: 8,
                            javascript: 8,
                            cpp: 13,
                            java: 11
                        },
                        array: working,
                        variables: {
                            i,
                            minIndex,
                            comparisons,
                            swaps
                        },
                        options: {
                            activeIndices: [i, minIndex],
                            operation: "selection-sort",
                            comparisons,
                            swaps,
                            status: "Swapping"
                        },
                        action: "swap"
                    }));
                }
            }

            steps.push(this.createStep({
                title: "Selection Sort Completed",
                explanation:
                    "The smallest elements have been placed in their correct positions.",
                codeLine: {
                    python: 8,
                    javascript: 8,
                    cpp: 13,
                    java: 11
                },
                array: working,
                variables: {
                    sortedArray: [...working],
                    comparisons,
                    swaps
                },
                options: {
                    sortedIndices: working.map((_, i) => i),
                    operation: "selection-sort",
                    comparisons,
                    swaps,
                    status: "Sorted"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 3. INSERTION SORT
        // =====================================

        insertionSort(input = {}) {
            const array = this.validateArray(
                input.array || [12, 11, 13, 5, 6]
            );

            const working = [...array];
            const steps = [];

            let comparisons = 0;
            let shifts = 0;

            steps.push(this.createStep({
                title: "Start Insertion Sort",
                explanation:
                    "Insertion Sort builds a sorted section by inserting each new element into its correct position.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                array: working,
                variables: {
                    n: working.length,
                    comparisons,
                    shifts
                },
                options: {
                    operation: "insertion-sort"
                },
                action: "initialize"
            }));

            for (let i = 1; i < working.length; i++) {
                const key = working[i];
                let j = i - 1;

                steps.push(this.createStep({
                    title: "Select Key",
                    explanation:
                        `Take ${key} as the key element and insert it into the sorted left section.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 8,
                        java: 6
                    },
                    array: working,
                    variables: {
                        i,
                        j,
                        key,
                        comparisons,
                        shifts
                    },
                    options: {
                        i,
                        activeIndices: [i],
                        operation: "insertion-sort",
                        status: "Key selected"
                    },
                    action: "select-key"
                }));

                while (j >= 0) {
                    comparisons++;

                    steps.push(this.createStep({
                        title: `Compare ${working[j]} with ${key}`,
                        explanation:
                            `Check whether ${working[j]} is greater than the key ${key}.`,
                        codeLine: {
                            python: 5,
                            javascript: 5,
                            cpp: 10,
                            java: 8
                        },
                        array: working,
                        variables: {
                            i,
                            j,
                            key,
                            currentValue: working[j],
                            comparisons,
                            shifts
                        },
                        options: {
                            activeIndices: [j, i],
                            comparedIndices: [j, i],
                            operation: "insertion-sort",
                            comparisons,
                            shifts,
                            status: "Comparing"
                        },
                        action: "compare"
                    }));

                    if (working[j] > key) {
                        working[j + 1] = working[j];
                        shifts++;

                        steps.push(this.createStep({
                            title: "Shift Element Right",
                            explanation:
                                `Move ${working[j]} one position to the right.`,
                            codeLine: {
                                python: 6,
                                javascript: 6,
                                cpp: 11,
                                java: 9
                            },
                            array: working,
                            variables: {
                                i,
                                j,
                                key,
                                comparisons,
                                shifts
                            },
                            options: {
                                activeIndices: [j, j + 1],
                                operation: "insertion-sort",
                                comparisons,
                                shifts,
                                status: "Shifting"
                            },
                            action: "shift"
                        }));

                        j--;
                    } else {
                        break;
                    }
                }

                working[j + 1] = key;

                steps.push(this.createStep({
                    title: "Insert Key",
                    explanation:
                        `Place ${key} at index ${j + 1}.`,
                    codeLine: {
                        python: 8,
                        javascript: 8,
                        cpp: 13,
                        java: 11
                    },
                    array: working,
                    variables: {
                        i,
                        j,
                        key,
                        comparisons,
                        shifts
                    },
                    options: {
                        activeIndices: [j + 1],
                        operation: "insertion-sort",
                        comparisons,
                        shifts,
                        status: "Key inserted"
                    },
                    action: "insert-key"
                }));
            }

            steps.push(this.createStep({
                title: "Insertion Sort Completed",
                explanation:
                    "Every element has been inserted into its correct position.",
                codeLine: {
                    python: 8,
                    javascript: 8,
                    cpp: 13,
                    java: 11
                },
                array: working,
                variables: {
                    sortedArray: [...working],
                    comparisons,
                    shifts
                },
                options: {
                    sortedIndices: working.map((_, i) => i),
                    operation: "insertion-sort",
                    comparisons,
                    shifts,
                    status: "Sorted"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 4. MERGE SORT
        // =====================================

        mergeSort(input = {}) {
            const array = this.validateArray(
                input.array || [38, 27, 43, 3, 9, 82, 10]
            );

            const working = [...array];
            const steps = [];

            let comparisons = 0;

            steps.push(this.createStep({
                title: "Start Merge Sort",
                explanation:
                    "Merge Sort divides the array into smaller parts, sorts them and merges them back together.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                array: working,
                variables: {
                    length: working.length,
                    comparisons
                },
                options: {
                    operation: "merge-sort"
                },
                action: "initialize"
            }));

            const merge = (left, right, startIndex) => {
                const result = [];
                let i = 0;
                let j = 0;

                steps.push(this.createStep({
                    title: "Merge Two Sorted Parts",
                    explanation:
                        `Merge the left part [${left.join(", ")}] and right part [${right.join(", ")}].`,
                    codeLine: {
                        python: 10,
                        javascript: 10,
                        cpp: 18,
                        java: 15
                    },
                    array: working,
                    variables: {
                        leftPart: [...left],
                        rightPart: [...right],
                        startIndex
                    },
                    options: {
                        operation: "merge-sort",
                        status: "Merging"
                    },
                    action: "merge-start"
                }));

                while (i < left.length && j < right.length) {
                    comparisons++;

                    steps.push(this.createStep({
                        title: "Compare Merge Elements",
                        explanation:
                            `Compare ${left[i]} and ${right[j]} to choose the smaller element.`,
                        codeLine: {
                            python: 12,
                            javascript: 12,
                            cpp: 20,
                            java: 17
                        },
                        array: working,
                        variables: {
                            leftIndex: i,
                            rightIndex: j,
                            leftValue: left[i],
                            rightValue: right[j],
                            comparisons
                        },
                        options: {
                            operation: "merge-sort",
                            comparisons,
                            status: "Comparing merge elements"
                        },
                        action: "compare"
                    }));

                    if (left[i] <= right[j]) {
                        result.push(left[i]);
                        i++;
                    } else {
                        result.push(right[j]);
                        j++;
                    }
                }

                while (i < left.length) {
                    result.push(left[i]);
                    i++;
                }

                while (j < right.length) {
                    result.push(right[j]);
                    j++;
                }

                for (let k = 0; k < result.length; k++) {
                    working[startIndex + k] = result[k];
                }

                steps.push(this.createStep({
                    title: "Merged Section",
                    explanation:
                        `The merged section is [${result.join(", ")}].`,
                    codeLine: {
                        python: 16,
                        javascript: 16,
                        cpp: 25,
                        java: 22
                    },
                    array: working,
                    variables: {
                        merged: [...result],
                        startIndex,
                        comparisons
                    },
                    options: {
                        activeIndices: result.map(
                            (_, i) => startIndex + i
                        ),
                        operation: "merge-sort",
                        comparisons,
                        status: "Merged"
                    },
                    action: "merge-complete"
                }));

                return result;
            };

            const divide = (part, startIndex) => {
                if (part.length <= 1) {
                    return [...part];
                }

                const mid = Math.floor(part.length / 2);

                const left = part.slice(0, mid);
                const right = part.slice(mid);

                steps.push(this.createStep({
                    title: "Divide Array",
                    explanation:
                        `Divide [${part.join(", ")}] into [${left.join(", ")}] and [${right.join(", ")}].`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 10,
                        java: 8
                    },
                    array: working,
                    variables: {
                        currentPart: [...part],
                        leftPart: [...left],
                        rightPart: [...right],
                        mid
                    },
                    options: {
                        operation: "merge-sort",
                        status: "Dividing"
                    },
                    action: "divide"
                }));

                const sortedLeft = divide(left, startIndex);
                const sortedRight = divide(
                    right,
                    startIndex + mid
                );

                return merge(
                    sortedLeft,
                    sortedRight,
                    startIndex
                );
            };

            divide(working, 0);

            steps.push(this.createStep({
                title: "Merge Sort Completed",
                explanation:
                    "All divided sections have been merged into one sorted array.",
                codeLine: {
                    python: 16,
                    javascript: 16,
                    cpp: 25,
                    java: 22
                },
                array: working,
                variables: {
                    sortedArray: [...working],
                    comparisons
                },
                options: {
                    sortedIndices: working.map((_, i) => i),
                    operation: "merge-sort",
                    comparisons,
                    status: "Sorted"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 5. QUICK SORT
        // =====================================

        quickSort(input = {}) {
            const array = this.validateArray(
                input.array || [10, 7, 8, 9, 1, 5]
            );

            const working = [...array];
            const steps = [];

            let comparisons = 0;
            let swaps = 0;

            steps.push(this.createStep({
                title: "Start Quick Sort",
                explanation:
                    "Quick Sort selects a pivot and partitions the array around it.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                array: working,
                variables: {
                    length: working.length,
                    comparisons,
                    swaps
                },
                options: {
                    operation: "quick-sort"
                },
                action: "initialize"
            }));

            const partition = (low, high) => {
                const pivot = working[high];
                let i = low - 1;

                steps.push(this.createStep({
                    title: "Choose Pivot",
                    explanation:
                        `Select ${pivot} at index ${high} as the pivot.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 8,
                        java: 6
                    },
                    array: working,
                    variables: {
                        low,
                        high,
                        pivot,
                        i
                    },
                    options: {
                        pivotIndex: high,
                        operation: "quick-sort",
                        status: "Pivot selected"
                    },
                    action: "select-pivot"
                }));

                for (let j = low; j < high; j++) {
                    comparisons++;

                    steps.push(this.createStep({
                        title: `Compare ${working[j]} with pivot ${pivot}`,
                        explanation:
                            `Check whether ${working[j]} is smaller than or equal to the pivot.`,
                        codeLine: {
                            python: 6,
                            javascript: 6,
                            cpp: 11,
                            java: 9
                        },
                        array: working,
                        variables: {
                            low,
                            high,
                            i,
                            j,
                            pivot,
                            currentValue: working[j],
                            comparisons
                        },
                        options: {
                            i: i >= low ? i : undefined,
                            j,
                            pivotIndex: high,
                            comparedIndices: [j, high],
                            operation: "quick-sort",
                            comparisons,
                            swaps,
                            status: "Partitioning"
                        },
                        action: "compare"
                    }));

                    if (working[j] <= pivot) {
                        i++;

                        if (i !== j) {
                            const temp = working[i];
                            working[i] = working[j];
                            working[j] = temp;

                            swaps++;
                        }

                        steps.push(this.createStep({
                            title: "Move Smaller Element",
                            explanation:
                                `${working[i]} belongs in the section before the pivot.`,
                            codeLine: {
                                python: 7,
                                javascript: 7,
                                cpp: 12,
                                java: 10
                            },
                            array: working,
                            variables: {
                                low,
                                high,
                                i,
                                j,
                                pivot,
                                comparisons,
                                swaps
                            },
                            options: {
                                activeIndices: [i, j],
                                pivotIndex: high,
                                operation: "quick-sort",
                                comparisons,
                                swaps,
                                status: "Partitioning"
                            },
                            action: "partition-swap"
                        }));
                    }
                }

                const pivotPosition = i + 1;

                if (pivotPosition !== high) {
                    const temp = working[pivotPosition];
                    working[pivotPosition] = working[high];
                    working[high] = temp;
                    swaps++;
                }

                steps.push(this.createStep({
                    title: "Place Pivot",
                    explanation:
                        `Pivot ${pivot} is now at its correct sorted position ${pivotPosition}.`,
                    codeLine: {
                        python: 9,
                        javascript: 9,
                        cpp: 14,
                        java: 12
                    },
                    array: working,
                    variables: {
                        low,
                        high,
                        pivot,
                        pivotPosition,
                        comparisons,
                        swaps
                    },
                    options: {
                        pivotIndex: pivotPosition,
                        activeIndices: [pivotPosition],
                        operation: "quick-sort",
                        comparisons,
                        swaps,
                        status: "Pivot placed"
                    },
                    action: "pivot-placed"
                }));

                return pivotPosition;
            };

            const sort = (low, high) => {
                if (low < high) {
                    const pivotIndex = partition(low, high);

                    sort(low, pivotIndex - 1);
                    sort(pivotIndex + 1, high);
                }
            };

            sort(0, working.length - 1);

            steps.push(this.createStep({
                title: "Quick Sort Completed",
                explanation:
                    "All partitions have been sorted. The array is now in ascending order.",
                codeLine: {
                    python: 9,
                    javascript: 9,
                    cpp: 14,
                    java: 12
                },
                array: working,
                variables: {
                    sortedArray: [...working],
                    comparisons,
                    swaps
                },
                options: {
                    sortedIndices: working.map((_, i) => i),
                    operation: "quick-sort",
                    comparisons,
                    swaps,
                    status: "Sorted"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 6. COUNTING SORT
        // =====================================

        countingSort(input = {}) {
            const array = this.validateArray(
                input.array || [4, 2, 2, 8, 3, 3, 1]
            );

            if (array.some(value => !Number.isInteger(value))) {
                throw new TypeError(
                    "Counting Sort requires integer values."
                );
            }

            const steps = [];
            const working = [...array];

            if (working.length === 0) {
                return [
                    this.createStep({
                        title: "Empty Array",
                        explanation:
                            "There are no elements to sort.",
                        codeLine: {
                            python: 1,
                            javascript: 1,
                            cpp: 5,
                            java: 3
                        },
                        array: [],
                        variables: {
                            length: 0
                        },
                        options: {
                            operation: "counting-sort",
                            status: "Completed"
                        },
                        action: "complete"
                    })
                ];
            }

            const min = Math.min(...working);
            const max = Math.max(...working);

            const range = max - min + 1;

            // Avoid unexpectedly huge memory allocation.
            if (range > 100000) {
                throw new RangeError(
                    "Counting Sort range is too large. Use another sorting algorithm."
                );
            }

            const count = new Array(range).fill(0);

            steps.push(this.createStep({
                title: "Start Counting Sort",
                explanation:
                    "Counting Sort counts how many times each integer occurs, then rebuilds the sorted array.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                array: working,
                variables: {
                    min,
                    max,
                    range
                },
                options: {
                    operation: "counting-sort"
                },
                action: "initialize"
            }));

            for (let i = 0; i < working.length; i++) {
                const value = working[i];
                const index = value - min;

                count[index]++;

                steps.push(this.createStep({
                    title: `Count value ${value}`,
                    explanation:
                        `Increase the frequency of ${value} to ${count[index]}.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 10,
                        java: 8
                    },
                    array: working,
                    variables: {
                        i,
                        value,
                        count: [...count]
                    },
                    options: {
                        activeIndices: [i],
                        operation: "counting-sort",
                        status: "Counting"
                    },
                    action: "count"
                }));
            }

            let outputIndex = 0;

            for (let i = 0; i < count.length; i++) {
                const value = i + min;

                while (count[i] > 0) {
                    working[outputIndex] = value;
                    count[i]--;
                    outputIndex++;

                    steps.push(this.createStep({
                        title: `Place ${value}`,
                        explanation:
                            `Place ${value} into the next available position using its frequency.`,
                        codeLine: {
                            python: 9,
                            javascript: 9,
                            cpp: 15,
                            java: 12
                        },
                        array: working,
                        variables: {
                            value,
                            outputIndex,
                            remainingFrequency: count[i],
                            count: [...count]
                        },
                        options: {
                            activeIndices: [outputIndex - 1],
                            operation: "counting-sort",
                            status: "Rebuilding array"
                        },
                        action: "place"
                    }));
                }
            }

            steps.push(this.createStep({
                title: "Counting Sort Completed",
                explanation:
                    "The array has been rebuilt in ascending order.",
                codeLine: {
                    python: 9,
                    javascript: 9,
                    cpp: 15,
                    java: 12
                },
                array: working,
                variables: {
                    sortedArray: [...working],
                    min,
                    max
                },
                options: {
                    sortedIndices: working.map((_, i) => i),
                    operation: "counting-sort",
                    status: "Sorted"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // REGISTER ALGORITHMS
        // =====================================

        registerAlgorithms() {

            this.register("bubble-sort", {
                title: "Bubble Sort",
                description:
                    "Repeatedly compare adjacent elements and swap them if they are in the wrong order.",
                complexity: {
                    best: "O(n)",
                    average: "O(n²)",
                    worst: "O(n²)",
                    space: "O(1)"
                },
                execute: input => this.bubbleSort(input)
            });

            this.register("selection-sort", {
                title: "Selection Sort",
                description:
                    "Select the smallest element from the unsorted section and place it at the beginning.",
                complexity: {
                    best: "O(n²)",
                    average: "O(n²)",
                    worst: "O(n²)",
                    space: "O(1)"
                },
                execute: input => this.selectionSort(input)
            });

            this.register("insertion-sort", {
                title: "Insertion Sort",
                description:
                    "Build a sorted array by inserting each element into its correct position.",
                complexity: {
                    best: "O(n)",
                    average: "O(n²)",
                    worst: "O(n²)",
                    space: "O(1)"
                },
                execute: input => this.insertionSort(input)
            });

            this.register("merge-sort", {
                title: "Merge Sort",
                description:
                    "Divide the array, sort each half and merge the sorted halves.",
                complexity: {
                    best: "O(n log n)",
                    average: "O(n log n)",
                    worst: "O(n log n)",
                    space: "O(n)"
                },
                execute: input => this.mergeSort(input)
            });

            this.register("quick-sort", {
                title: "Quick Sort",
                description:
                    "Partition an array around a pivot and recursively sort both sides.",
                complexity: {
                    best: "O(n log n)",
                    average: "O(n log n)",
                    worst: "O(n²)",
                    space: "O(log n)"
                },
                execute: input => this.quickSort(input)
            });

            this.register("counting-sort", {
                title: "Counting Sort",
                description:
                    "Count the frequency of integer values and rebuild the array in sorted order.",
                complexity: {
                    best: "O(n + k)",
                    average: "O(n + k)",
                    worst: "O(n + k)",
                    space: "O(k)"
                },
                execute: input => this.countingSort(input)
            });
        }
    }

    // =====================================
    // GLOBAL EXPORT
    // =====================================

    global.SortingAlgorithms = SortingAlgorithms;

    // =====================================
    // COMMONJS EXPORT
    // =====================================

    if (
        typeof module !== "undefined" &&
        module.exports
    ) {
        module.exports = SortingAlgorithms;
    }

})(typeof window !== "undefined" ? window : globalThis);
