
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/stringAlgorithms.js
 *
 * String Algorithms:
 * 1. String Traversal
 * 2. Reverse String
 * 3. Palindrome Check
 * 4. Character Search
 * 5. Character Frequency
 * 6. Vowel and Consonant Count
 * 7. Anagram Check
 * 8. Word Count
 */

(function (global) {
    "use strict";

    class StringAlgorithms {

        constructor() {
            this.algorithms = new Map();
            this.registerAlgorithms();
        }

        // =====================================
        // COMMON UTILITIES
        // =====================================

        validateString(value, name = "Input") {
            if (typeof value !== "string") {
                throw new TypeError(
                    `${name} must be a string.`
                );
            }

            return value;
        }

        clone(value) {
            return JSON.parse(JSON.stringify(value));
        }

        createScene(string, options = {}) {
            const characters = Array.from(string);

            const items = characters.map((character, index) => {
                let state = "default";

                if (options.activeIndex === index) {
                    state = "active";
                }

                if (
                    options.foundIndex === index ||
                    (
                        options.foundIndices &&
                        options.foundIndices.includes(index)
                    )
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
                    options.matchedIndices &&
                    options.matchedIndices.includes(index)
                ) {
                    state = "success";
                }

                return {
                    id: `string-character-${index}`,
                    value: character,
                    character,
                    index,
                    label: character === " " ? "SPACE" : character,
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

            if (Number.isInteger(options.secondIndex)) {
                pointers.push({
                    label: "j",
                    index: options.secondIndex,
                    color: "#A78BFA"
                });
            }

            return {
                type: "string",
                items,
                pointers,
                edges: [],
                status: options.status || "Ready",
                meta: {
                    length: characters.length,
                    operation: options.operation || "string",
                    target: options.target ?? null
                }
            };
        }

        createStep({
            title,
            explanation,
            codeLine,
            string,
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
                    string,
                    options
                ),

                snapshot: {
                    string,
                    characters: Array.from(string),
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
                    `String algorithm not found: ${id}`
                );
            }

            return algorithm.execute(input);
        }

        // =====================================
        // 1. STRING TRAVERSAL
        // =====================================

        traversal(input = {}) {
            const string = this.validateString(
                input.string ?? "GLITCH RUNNER"
            );

            const characters = Array.from(string);
            const steps = [];

            steps.push(this.createStep({
                title: "Initialize String Traversal",
                explanation:
                    "We will visit each character of the string from left to right.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                string,
                variables: {
                    length: characters.length,
                    index: null
                },
                options: {
                    operation: "string-traversal"
                },
                action: "initialize"
            }));

            for (let i = 0; i < characters.length; i++) {
                steps.push(this.createStep({
                    title: `Visit character ${i}`,
                    explanation:
                        `The current character is "${characters[i]}" at index ${i}.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 8,
                        java: 6
                    },
                    string,
                    variables: {
                        i,
                        currentCharacter: characters[i],
                        length: characters.length
                    },
                    options: {
                        activeIndex: i,
                        operation: "string-traversal",
                        status: "Visiting character"
                    },
                    action: "visit"
                }));
            }

            steps.push(this.createStep({
                title: "Traversal Completed",
                explanation:
                    "Every character has been visited successfully.",
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 8,
                    java: 6
                },
                string,
                variables: {
                    visitedCharacters: characters.length
                },
                options: {
                    matchedIndices: characters.map((_, i) => i),
                    operation: "string-traversal",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 2. REVERSE STRING
        // =====================================

        reverse(input = {}) {
            const string = this.validateString(
                input.string ?? "GLITCH"
            );

            const characters = Array.from(string);
            const working = [...characters];
            const steps = [];

            let left = 0;
            let right = working.length - 1;

            steps.push(this.createStep({
                title: "Start String Reversal",
                explanation:
                    "We will reverse the string using two pointers.",
                codeLine: {
                    python: 2,
                    javascript: 2,
                    cpp: 6,
                    java: 4
                },
                string: working.join(""),
                variables: {
                    left,
                    right
                },
                options: {
                    left,
                    right,
                    operation: "string-reverse"
                },
                action: "initialize"
            }));

            while (left < right) {
                const beforeSwap = working.join("");

                steps.push(this.createStep({
                    title: "Select Characters",
                    explanation:
                        `Select "${working[left]}" and "${working[right]}" for swapping.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 9,
                        java: 7
                    },
                    string: beforeSwap,
                    variables: {
                        left,
                        right,
                        leftCharacter: working[left],
                        rightCharacter: working[right]
                    },
                    options: {
                        left,
                        right,
                        comparedIndices: [left, right],
                        operation: "string-reverse",
                        status: "Ready to swap"
                    },
                    action: "select-pair"
                }));

                const temp = working[left];
                working[left] = working[right];
                working[right] = temp;

                steps.push(this.createStep({
                    title: "Swap Characters",
                    explanation:
                        `The characters at positions ${left} and ${right} have been swapped.`,
                    codeLine: {
                        python: 6,
                        javascript: 6,
                        cpp: 10,
                        java: 8
                    },
                    string: working.join(""),
                    variables: {
                        left,
                        right,
                        result: working.join("")
                    },
                    options: {
                        matchedIndices: [left, right],
                        operation: "string-reverse",
                        status: "Swapped"
                    },
                    action: "swap"
                }));

                left++;
                right--;

                steps.push(this.createStep({
                    title: "Move Pointers",
                    explanation:
                        "Move left pointer forward and right pointer backward.",
                    codeLine: {
                        python: 7,
                        javascript: 7,
                        cpp: 11,
                        java: 9
                    },
                    string: working.join(""),
                    variables: {
                        left,
                        right
                    },
                    options: {
                        left: left < working.length ? left : null,
                        right: right >= 0 ? right : null,
                        operation: "string-reverse"
                    },
                    action: "move-pointers"
                }));
            }

            steps.push(this.createStep({
                title: "String Reversed",
                explanation:
                    `Original string: "${string}". Reversed string: "${working.join("")}".`,
                codeLine: {
                    python: 7,
                    javascript: 7,
                    cpp: 11,
                    java: 9
                },
                string: working.join(""),
                variables: {
                    original: string,
                    reversed: working.join("")
                },
                options: {
                    matchedIndices: working.map((_, i) => i),
                    operation: "string-reverse",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 3. PALINDROME CHECK
        // =====================================

        palindrome(input = {}) {
            const original = this.validateString(
                input.string ?? "MADAM"
            );

            const normalized = original
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");

            const characters = Array.from(normalized);
            const steps = [];

            let left = 0;
            let right = characters.length - 1;
            let isPalindrome = true;

            steps.push(this.createStep({
                title: "Start Palindrome Check",
                explanation:
                    "A palindrome reads the same from left to right and right to left. We compare both ends.",
                codeLine: {
                    python: 2,
                    javascript: 2,
                    cpp: 6,
                    java: 4
                },
                string: normalized,
                variables: {
                    original,
                    normalized,
                    left,
                    right,
                    isPalindrome
                },
                options: {
                    left,
                    right,
                    operation: "palindrome"
                },
                action: "initialize"
            }));

            while (left < right) {
                steps.push(this.createStep({
                    title: "Compare Characters",
                    explanation:
                        `Compare "${characters[left]}" at index ${left} with "${characters[right]}" at index ${right}.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 9,
                        java: 7
                    },
                    string: normalized,
                    variables: {
                        left,
                        right,
                        leftCharacter: characters[left],
                        rightCharacter: characters[right],
                        isPalindrome
                    },
                    options: {
                        left,
                        right,
                        comparedIndices: [left, right],
                        operation: "palindrome",
                        status: "Comparing"
                    },
                    action: "compare"
                }));

                if (characters[left] !== characters[right]) {
                    isPalindrome = false;

                    steps.push(this.createStep({
                        title: "Mismatch Found",
                        explanation:
                            "The two characters are different. This string is not a palindrome.",
                        codeLine: {
                            python: 7,
                            javascript: 7,
                            cpp: 12,
                            java: 10
                        },
                        string: normalized,
                        variables: {
                            left,
                            right,
                            isPalindrome: false
                        },
                        options: {
                            comparedIndices: [left, right],
                            operation: "palindrome",
                            status: "Not a palindrome"
                        },
                        action: "mismatch"
                    }));

                    break;
                }

                steps.push(this.createStep({
                    title: "Characters Match",
                    explanation:
                        "Both characters match. Continue checking the remaining characters.",
                    codeLine: {
                        python: 9,
                        javascript: 9,
                        cpp: 14,
                        java: 12
                    },
                    string: normalized,
                    variables: {
                        left,
                        right,
                        matchedCharacter: characters[left]
                    },
                    options: {
                        matchedIndices: [left, right],
                        operation: "palindrome",
                        status: "Matched"
                    },
                    action: "match"
                }));

                left++;
                right--;
            }

            steps.push(this.createStep({
                title: isPalindrome
                    ? "Palindrome Confirmed"
                    : "Not a Palindrome",
                explanation: isPalindrome
                    ? `"${original}" is a palindrome.`
                    : `"${original}" is not a palindrome.`,
                codeLine: {
                    python: 11,
                    javascript: 11,
                    cpp: 16,
                    java: 14
                },
                string: normalized,
                variables: {
                    original,
                    normalized,
                    isPalindrome
                },
                options: {
                    matchedIndices: isPalindrome
                        ? characters.map((_, i) => i)
                        : [],
                    operation: "palindrome",
                    status: isPalindrome
                        ? "Palindrome"
                        : "Not a palindrome"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 4. CHARACTER SEARCH
        // =====================================

        characterSearch(input = {}) {
            const string = this.validateString(
                input.string ?? "GLITCH RUNNER"
            );

            const target = this.validateString(
                input.target ?? "R",
                "Search target"
            );

            const characters = Array.from(string);
            const targetCharacters = Array.from(target);

            if (targetCharacters.length !== 1) {
                throw new TypeError(
                    "Search target must contain exactly one character."
                );
            }

            const steps = [];
            let found = false;
            let foundIndex = -1;

            steps.push(this.createStep({
                title: "Start Character Search",
                explanation:
                    `We will search for "${target}" in the string.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                string,
                variables: {
                    target,
                    found,
                    index: null
                },
                options: {
                    target,
                    operation: "character-search"
                },
                action: "initialize"
            }));

            for (let i = 0; i < characters.length; i++) {
                steps.push(this.createStep({
                    title: `Check index ${i}`,
                    explanation:
                        `Compare "${characters[i]}" with "${target}".`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 8,
                        java: 6
                    },
                    string,
                    variables: {
                        i,
                        currentCharacter: characters[i],
                        target,
                        found
                    },
                    options: {
                        activeIndex: i,
                        target,
                        operation: "character-search",
                        status: "Comparing"
                    },
                    action: "compare"
                }));

                if (characters[i] === target) {
                    found = true;
                    foundIndex = i;

                    steps.push(this.createStep({
                        title: "Character Found",
                        explanation:
                            `"${target}" was found at index ${i}.`,
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 9,
                            java: 7
                        },
                        string,
                        variables: {
                            target,
                            found,
                            foundIndex
                        },
                        options: {
                            foundIndex: i,
                            target,
                            operation: "character-search",
                            status: "Found"
                        },
                        action: "found"
                    }));

                    break;
                }
            }

            if (!found) {
                steps.push(this.createStep({
                    title: "Character Not Found",
                    explanation:
                        `"${target}" does not exist in the string.`,
                    codeLine: {
                        python: 6,
                        javascript: 6,
                        cpp: 13,
                        java: 11
                    },
                    string,
                    variables: {
                        target,
                        found: false,
                        foundIndex: -1
                    },
                    options: {
                        target,
                        operation: "character-search",
                        status: "Not found"
                    },
                    action: "not-found"
                }));
            }

            return steps;
        }

        // =====================================
        // 5. CHARACTER FREQUENCY
        // =====================================

        frequency(input = {}) {
            const string = this.validateString(
                input.string ?? "PROGRAMMING"
            );

            const characters = Array.from(string);
            const frequency = {};
            const steps = [];

            steps.push(this.createStep({
                title: "Initialize Frequency Counter",
                explanation:
                    "We will count how many times each character appears.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                string,
                variables: {
                    frequency: {}
                },
                options: {
                    operation: "character-frequency"
                },
                action: "initialize"
            }));

            for (let i = 0; i < characters.length; i++) {
                const character = characters[i];

                frequency[character] =
                    (frequency[character] || 0) + 1;

                steps.push(this.createStep({
                    title: `Count "${character}"`,
                    explanation:
                        `Character "${character}" has now appeared ${frequency[character]} time(s).`,
                    codeLine: {
                        python: 4,
                        javascript: 4,
                        cpp: 9,
                        java: 7
                    },
                    string,
                    variables: {
                        i,
                        currentCharacter: character,
                        currentFrequency: frequency[character],
                        frequency: { ...frequency }
                    },
                    options: {
                        activeIndex: i,
                        operation: "character-frequency",
                        status: "Counting"
                    },
                    action: "count"
                }));
            }

            steps.push(this.createStep({
                title: "Frequency Count Completed",
                explanation:
                    "We have counted every character in the string.",
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 9,
                    java: 7
                },
                string,
                variables: {
                    frequency: { ...frequency },
                    totalCharacters: characters.length
                },
                options: {
                    matchedIndices: characters.map((_, i) => i),
                    operation: "character-frequency",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 6. VOWEL AND CONSONANT COUNT
        // =====================================

        vowelConsonant(input = {}) {
            const string = this.validateString(
                input.string ?? "GLITCH RUNNER"
            );

            const characters = Array.from(string);

            const vowels = "aeiou";
            let vowelCount = 0;
            let consonantCount = 0;
            let otherCount = 0;

            const steps = [];

            steps.push(this.createStep({
                title: "Start Vowel and Consonant Count",
                explanation:
                    "We will inspect each character and classify it as a vowel, consonant, or other character.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                string,
                variables: {
                    vowelCount,
                    consonantCount,
                    otherCount
                },
                options: {
                    operation: "vowel-consonant"
                },
                action: "initialize"
            }));

            for (let i = 0; i < characters.length; i++) {
                const character = characters[i].toLowerCase();

                let classification = "other";

                if (/^[a-z]$/.test(character)) {
                    if (vowels.includes(character)) {
                        vowelCount++;
                        classification = "vowel";
                    } else {
                        consonantCount++;
                        classification = "consonant";
                    }
                } else {
                    otherCount++;
                }

                steps.push(this.createStep({
                    title: `Classify "${characters[i]}"`,
                    explanation:
                        classification === "vowel"
                            ? `"${characters[i]}" is a vowel.`
                            : classification === "consonant"
                                ? `"${characters[i]}" is a consonant.`
                                : `"${characters[i]}" is not an English alphabet character.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 10,
                        java: 8
                    },
                    string,
                    variables: {
                        i,
                        currentCharacter: characters[i],
                        classification,
                        vowelCount,
                        consonantCount,
                        otherCount
                    },
                    options: {
                        activeIndex: i,
                        operation: "vowel-consonant",
                        status: classification
                    },
                    action: "classify"
                }));
            }

            steps.push(this.createStep({
                title: "Counting Completed",
                explanation:
                    `Vowels: ${vowelCount}, Consonants: ${consonantCount}, Other: ${otherCount}.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 10,
                    java: 8
                },
                string,
                variables: {
                    vowelCount,
                    consonantCount,
                    otherCount
                },
                options: {
                    operation: "vowel-consonant",
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 7. ANAGRAM CHECK
        // =====================================

        anagram(input = {}) {
            const first = this.validateString(
                input.first ?? "listen",
                "First string"
            );

            const second = this.validateString(
                input.second ?? "silent",
                "Second string"
            );

            const normalize = value =>
                Array.from(
                    value.toLowerCase().replace(/[^a-z0-9]/g, "")
                ).sort();

            const firstChars = normalize(first);
            const secondChars = normalize(second);

            const steps = [];

            steps.push(this.createStep({
                title: "Start Anagram Check",
                explanation:
                    "Two strings are anagrams if they contain the same characters with the same frequencies.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                string: first,
                variables: {
                    first,
                    second,
                    firstLength: firstChars.length,
                    secondLength: secondChars.length
                },
                options: {
                    operation: "anagram"
                },
                action: "initialize"
            }));

            steps.push(this.createStep({
                title: "Normalize First String",
                explanation:
                    `The normalized first string is "${firstChars.join("")}".`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 8,
                    java: 6
                },
                string: firstChars.join(""),
                variables: {
                    firstNormalized: firstChars.join("")
                },
                options: {
                    matchedIndices: firstChars.map((_, i) => i),
                    operation: "anagram"
                },
                action: "normalize-first"
            }));

            steps.push(this.createStep({
                title: "Normalize Second String",
                explanation:
                    `The normalized second string is "${secondChars.join("")}".`,
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 9,
                    java: 7
                },
                string: secondChars.join(""),
                variables: {
                    secondNormalized: secondChars.join("")
                },
                options: {
                    matchedIndices: secondChars.map((_, i) => i),
                    operation: "anagram"
                },
                action: "normalize-second"
            }));

            const firstSorted = firstChars.join("");
            const secondSorted = secondChars.join("");

            const isAnagram =
                firstSorted === secondSorted;

            steps.push(this.createStep({
                title: "Compare Sorted Strings",
                explanation:
                    isAnagram
                        ? "Both normalized strings are identical. They are anagrams."
                        : "The normalized strings are different. They are not anagrams.",
                codeLine: {
                    python: 6,
                    javascript: 6,
                    cpp: 11,
                    java: 9
                },
                string: firstSorted,
                variables: {
                    firstSorted,
                    secondSorted,
                    isAnagram
                },
                options: {
                    operation: "anagram",
                    status: isAnagram
                        ? "Anagram"
                        : "Not anagram"
                },
                action: "compare"
            }));

            return steps;
        }

        // =====================================
        // 8. WORD COUNT
        // =====================================

        wordCount(input = {}) {
            const string = this.validateString(
                input.string ?? "Learn Data Structures And Algorithms"
            );

            const words = string.trim()
                ? string.trim().split(/\s+/)
                : [];

            const steps = [];

            steps.push(this.createStep({
                title: "Start Word Count",
                explanation:
                    "We will split the sentence into individual words.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                string,
                variables: {
                    wordCount: 0
                },
                options: {
                    operation: "word-count"
                },
                action: "initialize"
            }));

            let count = 0;

            for (let i = 0; i < words.length; i++) {
                count++;

                steps.push(this.createStep({
                    title: `Word ${count}: ${words[i]}`,
                    explanation:
                        `We found the word "${words[i]}". Current word count is ${count}.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 8,
                        java: 6
                    },
                    string,
                    variables: {
                        wordIndex: i,
                        currentWord: words[i],
                        wordCount: count
                    },
                    options: {
                        operation: "word-count",
                        status: "Counting words"
                    },
                    action: "count-word"
                }));
            }

            steps.push(this.createStep({
                title: "Word Count Completed",
                explanation:
                    `The sentence contains ${count} word(s).`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 8,
                    java: 6
                },
                string,
                variables: {
                    wordCount: count,
                    words
                },
                options: {
                    operation: "word-count",
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

            this.register("string-traversal", {
                title: "String Traversal",
                description:
                    "Visit every character in a string.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.traversal(input)
            });

            this.register("string-reverse", {
                title: "Reverse String",
                description:
                    "Reverse a string using two pointers.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.reverse(input)
            });

            this.register("palindrome", {
                title: "Palindrome Check",
                description:
                    "Check whether a string reads the same forwards and backwards.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.palindrome(input)
            });

            this.register("character-search", {
                title: "Character Search",
                description:
                    "Find a character using linear search.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.characterSearch(input)
            });

            this.register("character-frequency", {
                title: "Character Frequency",
                description:
                    "Count occurrences of each character.",
                complexity: {
                    time: "O(n)",
                    space: "O(k)"
                },
                execute: input => this.frequency(input)
            });

            this.register("vowel-consonant", {
                title: "Vowel and Consonant Count",
                description:
                    "Count vowels, consonants and other characters.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.vowelConsonant(input)
            });

            this.register("anagram", {
                title: "Anagram Check",
                description:
                    "Check whether two strings contain the same characters.",
                complexity: {
                    time: "O(n log n)",
                    space: "O(n)"
                },
                execute: input => this.anagram(input)
            });

            this.register("word-count", {
                title: "Word Count",
                description:
                    "Count the number of words in a sentence.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.wordCount(input)
            });
        }
    }

    // =====================================
    // GLOBAL EXPORT
    // =====================================

    global.StringAlgorithms = StringAlgorithms;

    // =====================================
    // COMMONJS EXPORT
    // =====================================

    if (
        typeof module !== "undefined" &&
        module.exports
    ) {
        module.exports = StringAlgorithms;
    }

})(typeof window !== "undefined" ? window : globalThis);
