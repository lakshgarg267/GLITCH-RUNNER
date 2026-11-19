
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/languageManager.js
 *
 * Responsibilities:
 * - Manage supported programming languages
 * - Store language-specific algorithm code
 * - Switch between languages
 * - Retrieve code for a selected algorithm
 * - Provide editor configuration
 * - Notify UI when language changes
 */

(function (global) {
    "use strict";

    class LanguageManager {

        constructor(options = {}) {
            this.languages = {
                python: {
                    id: "python",
                    name: "Python",
                    extension: ".py",
                    monacoId: "python",
                    aceId: "python",
                    label: "Python",
                    color: "#3776AB"
                },

                javascript: {
                    id: "javascript",
                    name: "JavaScript",
                    extension: ".js",
                    monacoId: "javascript",
                    aceId: "javascript",
                    label: "JavaScript",
                    color: "#F7DF1E"
                },

                cpp: {
                    id: "cpp",
                    name: "C++",
                    extension: ".cpp",
                    monacoId: "cpp",
                    aceId: "c_cpp",
                    label: "C++",
                    color: "#00599C"
                },

                java: {
                    id: "java",
                    name: "Java",
                    extension: ".java",
                    monacoId: "java",
                    aceId: "java",
                    label: "Java",
                    color: "#ED8B00"
                }
            };

            this.currentLanguage = this.normalizeLanguage(
                options.defaultLanguage || "python"
            );

            this.algorithmCodes = new Map();
            this.listeners = new Set();

            this.registerDefaultAlgorithms();

            if (options.onChange) {
                this.onChange(options.onChange);
            }
        }

        // ---------------------------------------
        // LANGUAGE MANAGEMENT
        // ---------------------------------------

        normalizeLanguage(language) {
            if (!language) return "python";

            const normalized = String(language)
                .trim()
                .toLowerCase();

            const aliases = {
                py: "python",
                python3: "python",
                js: "javascript",
                node: "javascript",
                nodejs: "javascript",
                c: "cpp",
                "c++": "cpp",
                cc: "cpp",
                "cxx": "cpp",
                "java 17": "java"
            };

            const resolved = aliases[normalized] || normalized;

            return this.languages &&
                this.languages[resolved]
                ? resolved
                : "python";
        }

        getSupportedLanguages() {
            return Object.values(this.languages).map(language => ({
                ...language
            }));
        }

        getLanguage(language = this.currentLanguage) {
            const id = this.normalizeLanguage(language);

            return {
                ...this.languages[id]
            };
        }

        getCurrentLanguage() {
            return this.currentLanguage;
        }

        setLanguage(language) {
            const id = this.normalizeLanguage(language);

            if (!this.languages[id]) {
                throw new Error(
                    `Unsupported programming language: ${language}`
                );
            }

            if (id === this.currentLanguage) {
                return this.getLanguage();
            }

            const previousLanguage = this.currentLanguage;

            this.currentLanguage = id;

            const event = {
                previousLanguage,
                currentLanguage: id,
                language: this.getLanguage()
            };

            this.notify(event);

            return this.getLanguage();
        }

        // ---------------------------------------
        // ALGORITHM CODE REGISTRY
        // ---------------------------------------

        registerAlgorithm(algorithmId, language, code) {
            if (!algorithmId || typeof algorithmId !== "string") {
                throw new TypeError(
                    "A valid algorithm ID is required."
                );
            }

            const languageId = this.normalizeLanguage(language);

            if (!this.languages[languageId]) {
                throw new Error(
                    `Unsupported language: ${language}`
                );
            }

            if (typeof code !== "string") {
                throw new TypeError(
                    "Algorithm code must be a string."
                );
            }

            if (!this.algorithmCodes.has(algorithmId)) {
                this.algorithmCodes.set(algorithmId, {});
            }

            const algorithm = this.algorithmCodes.get(algorithmId);

            algorithm[languageId] = code;

            return true;
        }

        registerAlgorithmSet(algorithmId, codeSet) {
            if (!codeSet || typeof codeSet !== "object") {
                throw new TypeError(
                    "A valid language code object is required."
                );
            }

            Object.entries(codeSet).forEach(([language, code]) => {
                this.registerAlgorithm(
                    algorithmId,
                    language,
                    code
                );
            });

            return true;
        }

        hasAlgorithm(algorithmId) {
            return this.algorithmCodes.has(algorithmId);
        }

        hasCode(algorithmId, language = this.currentLanguage) {
            const algorithm = this.algorithmCodes.get(algorithmId);

            if (!algorithm) return false;

            const languageId = this.normalizeLanguage(language);

            return typeof algorithm[languageId] === "string";
        }

        getAlgorithmCode(
            algorithmId,
            language = this.currentLanguage
        ) {
            const languageId = this.normalizeLanguage(language);

            const algorithm = this.algorithmCodes.get(algorithmId);

            if (!algorithm) {
                throw new Error(
                    `Algorithm not registered: ${algorithmId}`
                );
            }

            const code = algorithm[languageId];

            if (typeof code !== "string") {
                throw new Error(
                    `Code unavailable for ${algorithmId} in ${languageId}.`
                );
            }

            return code;
        }

        getAvailableLanguages(algorithmId) {
            const algorithm = this.algorithmCodes.get(algorithmId);

            if (!algorithm) return [];

            return Object.keys(algorithm).filter(
                language => typeof algorithm[language] === "string"
            );
        }

        // ---------------------------------------
        // EDITOR CONFIGURATION
        // ---------------------------------------

        getEditorConfig(language = this.currentLanguage) {
            const selected = this.getLanguage(language);

            return {
                language: selected.monacoId,
                mode: selected.aceId,
                extension: selected.extension,
                theme: "vs-dark",
                readOnly: true,
                automaticLayout: true,
                minimap: {
                    enabled: false
                },
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                fontSize: 14,
                tabSize: 4,
                renderLineHighlight: "all",
                smoothScrolling: true
            };
        }

        // ---------------------------------------
        // CODE LINE UTILITIES
        // ---------------------------------------

        getCodeLines(
            algorithmId,
            language = this.currentLanguage
        ) {
            const code = this.getAlgorithmCode(
                algorithmId,
                language
            );

            return code.replace(/\r\n/g, "\n").split("\n");
        }

        getLineCount(
            algorithmId,
            language = this.currentLanguage
        ) {
            return this.getCodeLines(
                algorithmId,
                language
            ).length;
        }

        getLine(
            algorithmId,
            lineNumber,
            language = this.currentLanguage
        ) {
            if (!Number.isInteger(lineNumber) || lineNumber < 1) {
                throw new RangeError(
                    "Line number must be a positive integer."
                );
            }

            const lines = this.getCodeLines(
                algorithmId,
                language
            );

            return lines[lineNumber - 1] ?? null;
        }

        // ---------------------------------------
        // LANGUAGE CHANGE EVENTS
        // ---------------------------------------

        onChange(callback) {
            if (typeof callback !== "function") {
                throw new TypeError(
                    "Language change listener must be a function."
                );
            }

            this.listeners.add(callback);

            return () => {
                this.offChange(callback);
            };
        }

        offChange(callback) {
            this.listeners.delete(callback);
        }

        notify(event) {
            this.listeners.forEach(callback => {
                try {
                    callback(event);
                } catch (error) {
                    console.error(
                        "LanguageManager listener error:",
                        error
                    );
                }
            });
        }

        // ---------------------------------------
        // EXPORT / IMPORT
        // ---------------------------------------

        exportAlgorithm(algorithmId) {
            const algorithm = this.algorithmCodes.get(algorithmId);

            if (!algorithm) {
                throw new Error(
                    `Algorithm not registered: ${algorithmId}`
                );
            }

            return {
                algorithmId,
                languages: { ...algorithm }
            };
        }

        importAlgorithm(data) {
            if (!data || !data.algorithmId || !data.languages) {
                throw new TypeError(
                    "Invalid algorithm import data."
                );
            }

            this.registerAlgorithmSet(
                data.algorithmId,
                data.languages
            );

            return true;
        }

        getRegistrySummary() {
            const summary = {};

            this.algorithmCodes.forEach((codes, id) => {
                summary[id] = Object.keys(codes);
            });

            return summary;
        }

        // ---------------------------------------
        // CLEANUP
        // ---------------------------------------

        destroy() {
            this.listeners.clear();
            this.algorithmCodes.clear();
        }

        // ---------------------------------------
        // INITIAL DEFAULT ALGORITHMS
        // ---------------------------------------

        registerDefaultAlgorithms() {

            // ARRAY TRAVERSAL

            this.registerAlgorithmSet("array-traversal", {

                python:
`arr = [10, 20, 30, 40, 50]

for i in range(len(arr)):
    print(arr[i])`,

                javascript:
`const arr = [10, 20, 30, 40, 50];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}`,

                cpp:
`#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};

    for (int i = 0; i < 5; i++) {
        cout << arr[i] << endl;
    }

    return 0;
}`,

                java:
`public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};

        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }
    }
}`
            });

            // LINEAR SEARCH

            this.registerAlgorithmSet("linear-search", {

                python:
`arr = [10, 20, 30, 40, 50]
target = 30

for i in range(len(arr)):
    if arr[i] == target:
        print("Found at index", i)
        break
else:
    print("Not found")`,

                javascript:
`const arr = [10, 20, 30, 40, 50];
const target = 30;

let found = -1;

for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
        found = i;
        break;
    }
}

console.log(found);`,

                cpp:
`#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int target = 30;
    int found = -1;

    for (int i = 0; i < 5; i++) {
        if (arr[i] == target) {
            found = i;
            break;
        }
    }

    cout << found;
    return 0;
}`,

                java:
`public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        int target = 30;
        int found = -1;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                found = i;
                break;
            }
        }

        System.out.println(found);
    }
}`
            });

            // BINARY SEARCH

            this.registerAlgorithmSet("binary-search", {

                python:
`arr = [10, 20, 30, 40, 50]
target = 40

left = 0
right = len(arr) - 1

while left <= right:
    mid = (left + right) // 2

    if arr[mid] == target:
        print("Found at", mid)
        break
    elif arr[mid] < target:
        left = mid + 1
    else:
        right = mid - 1`,

                javascript:
`const arr = [10, 20, 30, 40, 50];
const target = 40;

let left = 0;
let right = arr.length - 1;

while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
        console.log("Found at", mid);
        break;
    } else if (arr[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}`,

                cpp:
`#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int target = 40;

    int left = 0;
    int right = 4;

    while (left <= right) {
        int mid = (left + right) / 2;

        if (arr[mid] == target) {
            cout << mid;
            break;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return 0;
}`,

                java:
`public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        int target = 40;

        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = (left + right) / 2;

            if (arr[mid] == target) {
                System.out.println(mid);
                break;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
}`
            });

            // BUBBLE SORT

            this.registerAlgorithmSet("bubble-sort", {

                python:
`arr = [5, 3, 8, 1, 2]

for i in range(len(arr)):
    for j in range(0, len(arr) - i - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]

print(arr)`,

                javascript:
`const arr = [5, 3, 8, 1, 2];

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
    }
}

console.log(arr);`,

                cpp:
`#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 3, 8, 1, 2};
    int n = 5;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }

    for (int x : arr) cout << x << " ";

    return 0;
}`,

                java:
`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {5, 3, 8, 1, 2};

        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        System.out.println(Arrays.toString(arr));
    }
}`
            });

            // SELECTION SORT

            this.registerAlgorithmSet("selection-sort", {

                python:
`arr = [64, 25, 12, 22, 11]

for i in range(len(arr)):
    min_index = i

    for j in range(i + 1, len(arr)):
        if arr[j] < arr[min_index]:
            min_index = j

    arr[i], arr[min_index] = arr[min_index], arr[i]

print(arr)`,

                javascript:
`const arr = [64, 25, 12, 22, 11];

for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
            minIndex = j;
        }
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
}

console.log(arr);`,

                cpp:
`#include <iostream>
using namespace std;

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = 5;

    for (int i = 0; i < n; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        swap(arr[i], arr[minIndex]);
    }

    for (int x : arr) cout << x << " ";

    return 0;
}`,

                java:
`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};

        for (int i = 0; i < arr.length; i++) {
            int minIndex = i;

            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }

        System.out.println(Arrays.toString(arr));
    }
}`
            });
        }
    }

    // ---------------------------------------
    // GLOBAL EXPORT
    // ---------------------------------------

    global.LanguageManager = LanguageManager;

    // ---------------------------------------
    // MODULE EXPORT
    // ---------------------------------------

    if (typeof module !== "undefined" && module.exports) {
        module.exports = LanguageManager;
    }

})(typeof window !== "undefined" ? window : globalThis);
