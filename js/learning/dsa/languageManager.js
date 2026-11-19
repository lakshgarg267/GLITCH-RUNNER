
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
                const generated = this.generateAlgorithmCode(
                    algorithmId,
                    languageId
                );
                if (generated) {
                    this.registerAlgorithm(
                        algorithmId,
                        languageId,
                        generated
                    );
                    return generated;
                }
                throw new Error(`Algorithm not registered: ${algorithmId}`);
            }

            const code = algorithm[languageId];

            if (typeof code !== "string") {
                const generated = this.generateAlgorithmCode(
                    algorithmId,
                    languageId
                );
                if (generated) {
                    this.registerAlgorithm(
                        algorithmId,
                        languageId,
                        generated
                    );
                    return generated;
                }
                throw new Error(`Code unavailable for ${algorithmId} in ${languageId}.`);
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

        generateAlgorithmCode(algorithmId, language) {
            const codeSets = {
                "array-traversal": {
                    python: "arr = [10, 20, 30, 40, 50]\nfor i in range(len(arr)):\n    print(arr[i])",
                    javascript: "const arr = [10, 20, 30, 40, 50];\nfor (let i = 0; i < arr.length; i++) {\n    console.log(arr[i]);\n}",
                    cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    int arr[] = {10,20,30,40,50};\n    for (int i = 0; i < 5; i++) cout << arr[i] << '\\n';\n}",
                    java: "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {10,20,30,40,50};\n        for (int i = 0; i < arr.length; i++) System.out.println(arr[i]);\n    }\n}"
                },
                "array-insertion": {
                    python: "arr = [10, 20, 40]\nindex = 2\nvalue = 30\narr.insert(index, value)\nprint(arr)",
                    javascript: "const arr = [10, 20, 40];\nconst index = 2;\nconst value = 30;\narr.splice(index, 0, value);\nconsole.log(arr);",
                    cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    int arr[] = {10,20,30,40,50};\n    int n = 5, index = 2, value = 25;\n    for (int i = n; i > index; i--) arr[i] = arr[i-1];\n    arr[index] = value;\n}",
                    java: "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {10,20,40};\n        int index = 2, value = 30;\n        int[] out = new int[arr.length + 1];\n        for (int i = 0; i < index; i++) out[i] = arr[i];\n        out[index] = value;\n        for (int i = index; i < arr.length; i++) out[i+1] = arr[i];\n    }\n}"
                },
                "array-deletion": {
                    python: "arr = [10, 20, 30, 40]\nindex = 1\narr.pop(index)\nprint(arr)",
                    javascript: "const arr = [10, 20, 30, 40];\nconst index = 1;\narr.splice(index, 1);\nconsole.log(arr);",
                    cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    int arr[] = {10,20,30,40}; int n = 4, index = 1;\n    for (int i = index; i < n-1; i++) arr[i] = arr[i+1];\n}",
                    java: "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {10,20,30,40}; int index = 1;\n        int[] out = new int[arr.length-1];\n        for (int i = 0, j = 0; i < arr.length; i++) if (i != index) out[j++] = arr[i];\n    }\n}"
                },
                "array-reverse": {
                    python: "arr = [10,20,30,40]\nleft, right = 0, len(arr)-1\nwhile left < right:\n    arr[left], arr[right] = arr[right], arr[left]\n    left += 1\n    right -= 1",
                    javascript: "let arr = [10,20,30,40];\nlet left = 0, right = arr.length - 1;\nwhile (left < right) {\n    [arr[left], arr[right]] = [arr[right], arr[left]];\n    left++; right--;\n}",
                    cpp: "void reverseArray(int arr[], int n) {\n    int left = 0, right = n-1;\n    while (left < right) {\n        int temp = arr[left]; arr[left] = arr[right]; arr[right] = temp;\n        left++; right--;\n    }\n}",
                    java: "class Solution {\n    void reverseArray(int[] arr) {\n        int left = 0, right = arr.length-1;\n        while (left < right) {\n            int temp = arr[left]; arr[left] = arr[right]; arr[right] = temp;\n            left++; right--;\n        }\n    }\n}"
                },
                "array-min-max": {
                    python: "arr = [12, 3, 25, 8]\nminimum = maximum = arr[0]\nfor value in arr:\n    minimum = min(minimum, value)\n    maximum = max(maximum, value)",
                    javascript: "const arr = [12, 3, 25, 8];\nlet minimum = arr[0], maximum = arr[0];\nfor (const value of arr) {\n    minimum = Math.min(minimum, value);\n    maximum = Math.max(maximum, value);\n}",
                    cpp: "#include <algorithm>\nvoid findMinMax(int arr[], int n) {\n    int minimum = arr[0], maximum = arr[0];\n    for (int i = 1; i < n; i++) {\n        minimum = std::min(minimum, arr[i]);\n        maximum = std::max(maximum, arr[i]);\n    }\n}",
                    java: "class Solution {\n    void findMinMax(int[] arr) {\n        int minimum = arr[0], maximum = arr[0];\n        for (int value : arr) {\n            minimum = Math.min(minimum, value);\n            maximum = Math.max(maximum, value);\n        }\n    }\n}"
                },
                "string-traversal": {
                    python: "text = \"GLITCH\"\nfor character in text:\n    print(character)",
                    javascript: "const text = \"GLITCH\";\nfor (let i = 0; i < text.length; i++) console.log(text[i]);",
                    cpp: "#include <iostream>\n#include <string>\nint main() { std::string text = \"GLITCH\"; for (char c : text) std::cout << c << '\\n'; }",
                    java: "public class Main {\n    public static void main(String[] args) {\n        for (char c : \"GLITCH\".toCharArray()) System.out.println(c);\n    }\n}"
                },
                "string-reverse": {
                    python: "text = \"GLITCH\"\nprint(text[::-1])",
                    javascript: "const text = \"GLITCH\";\nconst reversed = [...text].reverse().join(\"\");\nconsole.log(reversed);",
                    cpp: "#include <algorithm>\n#include <string>\nint main() { std::string text = \"GLITCH\"; std::reverse(text.begin(), text.end()); }",
                    java: "class Solution { String reverse(String text) { return new StringBuilder(text).reverse().toString(); } }"
                },
                "palindrome": {
                    python: "text = \"racecar\"\nleft, right = 0, len(text)-1\nwhile left < right:\n    if text[left] != text[right]:\n        print(False); break\n    left += 1\n    right -= 1\nelse:\n    print(True)",
                    javascript: "const text = \"racecar\";\nlet left = 0, right = text.length-1, result = true;\nwhile (left < right) {\n    if (text[left] !== text[right]) result = false;\n    left++; right--;\n}",
                    cpp: "#include <string>\nbool isPalindrome(const std::string& text) {\n    int left = 0, right = (int)text.size()-1;\n    while (left < right) if (text[left++] != text[right--]) return false;\n    return true;\n}",
                    java: "class Solution {\n    boolean isPalindrome(String text) {\n        int left = 0, right = text.length()-1;\n        while (left < right) if (text.charAt(left++) != text.charAt(right--)) return false;\n        return true;\n    }\n}"
                },
                "character-frequency": {
                    python: "text = \"aabcc\"\nfrequency = {}\nfor character in text:\n    frequency[character] = frequency.get(character, 0) + 1",
                    javascript: "const text = \"aabcc\";\nconst frequency = {};\nfor (const character of text) frequency[character] = (frequency[character] || 0) + 1;",
                    cpp: "#include <unordered_map>\n#include <string>\nstd::unordered_map<char,int> frequency(const std::string& text) {\n    std::unordered_map<char,int> result;\n    for (char c : text) result[c]++;\n    return result;\n}",
                    java: "import java.util.*;\nclass Solution {\n    Map<Character,Integer> frequency(String text) {\n        Map<Character,Integer> result = new HashMap<>();\n        for (char c : text.toCharArray()) result.put(c, result.getOrDefault(c,0)+1);\n        return result;\n    }\n}"
                },
                "anagram": {
                    python: "from collections import Counter\nprint(Counter(\"listen\") == Counter(\"silent\"))",
                    javascript: "const normalize = text => [...text].sort().join(\"\");\nconsole.log(normalize(\"listen\") === normalize(\"silent\"));",
                    cpp: "#include <algorithm>\n#include <string>\nbool anagram(std::string a, std::string b) {\n    std::sort(a.begin(), a.end()); std::sort(b.begin(), b.end()); return a == b;\n}",
                    java: "import java.util.*;\nclass Solution { boolean anagram(String a, String b) {\n    char[] x=a.toCharArray(), y=b.toCharArray(); Arrays.sort(x); Arrays.sort(y); return Arrays.equals(x,y);\n}}"
                },
                "factorial": {
                    python: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)",
                    javascript: "function factorial(n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}",
                    cpp: "int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}",
                    java: "class Solution { int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}}"
                },
                "fibonacci": {
                    python: "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
                    javascript: "function fibonacci(n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}",
                    cpp: "int fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}",
                    java: "class Solution { int fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}}"
                },
                "tower-of-hanoi": {
                    python: "def hanoi(n, source, target, auxiliary):\n    if n == 1:\n        print(source, '->', target)\n        return\n    hanoi(n-1, source, auxiliary, target)\n    print(source, '->', target)\n    hanoi(n-1, auxiliary, target, source)",
                    javascript: "function hanoi(n, source, target, auxiliary) {\n    if (n === 1) { console.log(source + ' -> ' + target); return; }\n    hanoi(n-1, source, auxiliary, target);\n    console.log(source + ' -> ' + target);\n    hanoi(n-1, auxiliary, target, source);\n}",
                    cpp: "void hanoi(int n, char source, char target, char auxiliary) {\n    if (n == 1) { std::cout << source << \" -> \" << target << '\\n'; return; }\n    hanoi(n-1, source, auxiliary, target);\n    std::cout << source << \" -> \" << target << '\\n';\n    hanoi(n-1, auxiliary, target, source);\n}",
                    java: "class Solution { void hanoi(int n, char source, char target, char auxiliary) {\n    if (n == 1) { System.out.println(source + \" -> \" + target); return; }\n    hanoi(n-1, source, auxiliary, target);\n    System.out.println(source + \" -> \" + target);\n    hanoi(n-1, auxiliary, target, source);\n}}"
                },
                "subsets": {
                    python: "def subsets(nums):\n    result = []\n    def backtrack(index, current):\n        if index == len(nums):\n            result.append(current.copy()); return\n        backtrack(index + 1, current)\n        current.append(nums[index])\n        backtrack(index + 1, current)\n        current.pop()\n    backtrack(0, [])\n    return result",
                    javascript: "function subsets(nums) {\n    const result = [], current = [];\n    function backtrack(index) {\n        if (index === nums.length) { result.push([...current]); return; }\n        backtrack(index + 1);\n        current.push(nums[index]); backtrack(index + 1); current.pop();\n    }\n    backtrack(0); return result;\n}",
                    cpp: "void subsets(const vector<int>& nums, int index, vector<int>& current, vector<vector<int>>& result) {\n    if (index == nums.size()) { result.push_back(current); return; }\n    subsets(nums, index+1, current, result);\n    current.push_back(nums[index]); subsets(nums, index+1, current, result); current.pop_back();\n}",
                    java: "class Solution {\n    void subsets(int[] nums, int index, List<Integer> current, List<List<Integer>> result) {\n        if (index == nums.length) { result.add(new ArrayList<>(current)); return; }\n        subsets(nums,index+1,current,result);\n        current.add(nums[index]); subsets(nums,index+1,current,result); current.remove(current.size()-1);\n    }\n}"
                }
            };
            const fill = (id, python, javascript, cpp, java) => {
                codeSets[id] = { python, javascript, cpp, java };
            };

            fill("insertion-sort",
                "arr = [64,25,12,22,11]\nfor i in range(1, len(arr)):\n    key = arr[i]\n    j = i - 1\n    while j >= 0 and arr[j] > key:\n        arr[j+1] = arr[j]\n        j -= 1\n    arr[j+1] = key",
                "const arr = [64,25,12,22,11];\nfor (let i = 1; i < arr.length; i++) {\n    const key = arr[i]; let j = i - 1;\n    while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; }\n    arr[j+1] = key;\n}",
                "void insertionSort(int arr[], int n) {\n    for (int i=1; i<n; i++) {\n        int key=arr[i], j=i-1;\n        while (j>=0 && arr[j]>key) { arr[j+1]=arr[j]; j--; }\n        arr[j+1]=key;\n    }\n}",
                "class Solution { void insertionSort(int[] arr) {\n    for (int i=1; i<arr.length; i++) {\n        int key=arr[i], j=i-1;\n        while (j>=0 && arr[j]>key) { arr[j+1]=arr[j]; j--; }\n        arr[j+1]=key;\n    }\n}}");
            fill("merge-sort",
                "def mergeSort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr)//2\n    left = mergeSort(arr[:mid]); right = mergeSort(arr[mid:])\n    return merge(left, right)",
                "function mergeSort(arr) {\n    if (arr.length <= 1) return arr;\n    const mid = Math.floor(arr.length/2);\n    return merge(mergeSort(arr.slice(0,mid)), mergeSort(arr.slice(mid)));\n}",
                "void mergeSort(int arr[], int left, int right) {\n    if (left >= right) return;\n    int mid = left + (right-left)/2;\n    mergeSort(arr,left,mid); mergeSort(arr,mid+1,right); merge(arr,left,mid,right);\n}",
                "class Solution { void mergeSort(int[] arr, int left, int right) {\n    if (left >= right) return;\n    int mid=left+(right-left)/2;\n    mergeSort(arr,left,mid); mergeSort(arr,mid+1,right); merge(arr,left,mid,right);\n}}");
            fill("quick-sort",
                "def quickSort(arr, low, high):\n    if low < high:\n        pivot = partition(arr, low, high)\n        quickSort(arr, low, pivot-1)\n        quickSort(arr, pivot+1, high)",
                "function quickSort(arr, low, high) {\n    if (low < high) {\n        const pivot = partition(arr, low, high);\n        quickSort(arr, low, pivot-1); quickSort(arr, pivot+1, high);\n    }\n}",
                "void quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pivot=partition(arr,low,high);\n        quickSort(arr,low,pivot-1); quickSort(arr,pivot+1,high);\n    }\n}",
                "class Solution { void quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pivot=partition(arr,low,high);\n        quickSort(arr,low,pivot-1); quickSort(arr,pivot+1,high);\n    }\n}}");

            fill("linked-list-traversal",
                "head = node\nwhile head:\n    print(head.value)\n    head = head.next",
                "let head = listHead;\nwhile (head !== null) { console.log(head.value); head = head.next; }",
                "for (Node* current = head; current != nullptr; current = current->next)\n    cout << current->value;",
                "class Solution { void traverse(Node head) {\n    for (Node current=head; current!=null; current=current.next) System.out.println(current.value);\n}}");
            fill("linked-list-insert-position",
                "class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef insert_at_position(head, position, value):\n    node = Node(value)\n    if position <= 0 or head is None:\n        node.next = head\n        return node\n    current = head\n    for _ in range(position - 1):\n        if current.next is None: break\n        current = current.next\n    node.next = current.next\n    current.next = node\n    return head",
                "class Node { constructor(value) { this.value = value; this.next = null; } }\nfunction insertAtPosition(head, position, value) {\n    const node = new Node(value);\n    if (position <= 0 || head === null) { node.next = head; return node; }\n    let current = head;\n    for (let i = 0; i < position - 1 && current.next !== null; i++) current = current.next;\n    node.next = current.next;\n    current.next = node;\n    return head;\n}",
                "Node* insertAtPosition(Node* head, int position, int value) {\n    Node* node = new Node(value);\n    if (position <= 0 || head == nullptr) { node->next = head; return node; }\n    Node* current = head;\n    for (int i=0; i<position-1 && current->next; i++) current=current->next;\n    node->next=current->next; current->next=node; return head;\n}",
                "class Solution { Node insertAtPosition(Node head, int position, int value) {\n    Node node = new Node(value);\n    if (position <= 0 || head == null) { node.next=head; return node; }\n    Node current=head;\n    for (int i=0; i<position-1 && current.next!=null; i++) current=current.next;\n    node.next=current.next; current.next=node; return head;\n}}");
            fill("linked-list-delete-position",
                "class Node:\n    def __init__(self, value, next_node=None):\n        self.value = value\n        self.next = next_node\n\ndef delete_at_position(head, position):\n    if head is None: return None\n    if position <= 0: return head.next\n    current = head\n    for _ in range(position - 1):\n        if current.next is None: return head\n        current = current.next\n    if current.next is not None: current.next = current.next.next\n    return head",
                "function deleteAtPosition(head, position) {\n    if (head === null) return null;\n    if (position <= 0) return head.next;\n    let current = head;\n    for (let i = 0; i < position - 1 && current.next !== null; i++) current = current.next;\n    if (current.next !== null) current.next = current.next.next;\n    return head;\n}",
                "Node* deleteAtPosition(Node* head, int position) {\n    if (!head) return nullptr;\n    if (position <= 0) { Node* next=head->next; delete head; return next; }\n    Node* current=head;\n    for (int i=0; i<position-1 && current->next; i++) current=current->next;\n    if (current->next) { Node* removed=current->next; current->next=removed->next; delete removed; }\n    return head;\n}",
                "class Solution { Node deleteAtPosition(Node head, int position) {\n    if (head == null) return null;\n    if (position <= 0) return head.next;\n    Node current=head;\n    for (int i=0; i<position-1 && current.next!=null; i++) current=current.next;\n    if (current.next!=null) current.next=current.next.next;\n    return head;\n}}");
            fill("linked-list-reverse",
                "previous = None\ncurrent = head\nwhile current:\n    next_node = current.next\n    current.next = previous\n    previous = current\n    current = next_node\nhead = previous",
                "let previous = null, current = head;\nwhile (current !== null) {\n    const nextNode = current.next;\n    current.next = previous; previous = current; current = nextNode;\n}\nhead = previous;",
                "Node* previous=null, *current=head;\nwhile (current) {\n    Node* nextNode=current->next;\n    current->next=previous; previous=current; current=nextNode;\n}\nreturn previous;",
                "class Solution { Node reverse(Node head) {\n    Node previous=null, current=head;\n    while (current != null) {\n        Node nextNode=current.next;\n        current.next=previous; previous=current; current=nextNode;\n    }\n    return previous;\n}}");

            const stackPush = {
                python: "stack = []\nvalue = 10\nstack.append(value)",
                javascript: "const stack = []; const value = 10;\nstack.push(value);",
                cpp: "std::vector<int> stack;\nstack.push_back(10);",
                java: "java.util.Stack<Integer> stack = new java.util.Stack<>();\nstack.push(10);"
            };
            fill("stack-push", stackPush.python, stackPush.javascript, stackPush.cpp, stackPush.java);
            fill("stack-pop",
                "value = stack.pop()",
                "const value = stack.pop();",
                "int value = stack.back(); stack.pop_back();",
                "int value = stack.pop();");
            fill("stack-peek",
                "value = stack[-1]",
                "const value = stack[stack.length-1];",
                "int value = stack.back();",
                "int value = stack.peek();");
            fill("queue-enqueue",
                "from collections import deque\nqueue = deque()\nqueue.append(value)",
                "const queue = [];\nqueue.push(value);",
                "std::queue<int> queue;\nqueue.push(value);",
                "java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();\nqueue.offer(value);");
            fill("queue-dequeue",
                "value = queue.popleft()",
                "const value = queue.shift();",
                "int value = queue.front(); queue.pop();",
                "Integer value = queue.poll();");
            fill("circular-queue",
                "rear = (rear + 1) % capacity\nqueue[rear] = value",
                "rear = (rear + 1) % capacity;\nqueue[rear] = value;",
                "rear = (rear + 1) % capacity;\nqueue[rear] = value;",
                "rear = (rear + 1) % capacity;\nqueue[rear] = value;");
            fill("balanced-parentheses",
                "def balanced(expression):\n    pairs = {')':'(', ']':'[', '}':'{'}\n    stack = []\n    for ch in expression:\n        if ch in '([{': stack.append(ch)\n        elif ch in pairs and (not stack or stack.pop() != pairs[ch]): return False\n    return not stack",
                "function balanced(expression) {\n    const stack=[], pairs={')':'(',']':'[','}':'{'};\n    for (const ch of expression) {\n        if ('([{'.includes(ch)) stack.push(ch);\n        else if (pairs[ch] && stack.pop() !== pairs[ch]) return false;\n    }\n    return stack.length === 0;\n}",
                "bool balanced(const std::string& expression) {\n    std::stack<char> stack;\n    for (char ch : expression) {\n        if (ch=='('||ch=='['||ch=='{') stack.push(ch);\n        else if (ch==')'||ch==']'||ch=='}') {\n            if (stack.empty()) return false;\n            char open=stack.top(); stack.pop();\n            if ((ch==')'&&open!='(')||(ch==']'&&open!='[')||(ch=='}'&&open!='{')) return false;\n        }\n    }\n    return stack.empty();\n}",
                "boolean balanced(String expression) {\n    java.util.Deque<Character> stack=new java.util.ArrayDeque<>();\n    for (char ch : expression.toCharArray()) {\n        if (ch=='('||ch=='['||ch=='{') stack.push(ch);\n        else if (ch==')'||ch==']'||ch=='}') {\n            if (stack.isEmpty()) return false;\n            char open=stack.pop();\n            if ((ch==')'&&open!='(')||(ch==']'&&open!='[')||(ch=='}'&&open!='{')) return false;\n        }\n    }\n    return stack.isEmpty();\n}");

            fill("bst-insert",
                "def insert(root, value):\n    if root is None: return Node(value)\n    if value < root.value: root.left = insert(root.left, value)\n    else: root.right = insert(root.right, value)\n    return root",
                "function insert(root, value) {\n    if (root === null) return {value, left:null, right:null};\n    if (value < root.value) root.left = insert(root.left, value);\n    else root.right = insert(root.right, value);\n    return root;\n}",
                "Node* insert(Node* root, int value) {\n    if (!root) return new Node(value);\n    if (value < root->value) root->left=insert(root->left,value);\n    else root->right=insert(root->right,value);\n    return root;\n}",
                "class Solution { Node insert(Node root, int value) {\n    if (root == null) return new Node(value);\n    if (value < root.value) root.left=insert(root.left,value);\n    else root.right=insert(root.right,value);\n    return root;\n}}");
            fill("bst-search",
                "while root:\n    if value == root.value: return True\n    root = root.left if value < root.value else root.right\nreturn False",
                "while (root) {\n    if (value === root.value) return true;\n    root = value < root.value ? root.left : root.right;\n}",
                "while (root) {\n    if (value == root->value) return true;\n    root = value < root->value ? root->left : root->right;\n}",
                "while (root != null) {\n    if (value == root.value) return true;\n    root = value < root.value ? root.left : root.right;\n}");
            fill("bst-delete",
                "def delete(root, value):\n    if root is None: return None\n    if value < root.value: root.left = delete(root.left, value)\n    elif value > root.value: root.right = delete(root.right, value)\n    elif root.left is None: return root.right\n    elif root.right is None: return root.left\n    return root",
                "function deleteNode(root, value) {\n    if (!root) return null;\n    if (value < root.value) root.left=deleteNode(root.left,value);\n    else if (value > root.value) root.right=deleteNode(root.right,value);\n    else if (!root.left) return root.right;\n    else if (!root.right) return root.left;\n    else { let node=root.right; while(node.left) node=node.left; root.value=node.value; root.right=deleteNode(root.right,node.value); }\n    return root;\n}",
                "Node* deleteNode(Node* root, int value) {\n    if (!root) return nullptr;\n    if (value < root->value) root->left=deleteNode(root->left,value);\n    else if (value > root->value) root->right=deleteNode(root->right,value);\n    else if (!root->left) return root->right;\n    else if (!root->right) return root->left;\n    else { Node* node=root->right; while(node->left) node=node->left; root->value=node->value; root->right=deleteNode(root->right,node->value); }\n    return root;\n}",
                "class Solution { Node deleteNode(Node root, int value) {\n    if (root == null) return null;\n    if (value < root.value) root.left=deleteNode(root.left,value);\n    else if (value > root.value) root.right=deleteNode(root.right,value);\n    else if (root.left == null) return root.right;\n    else if (root.right == null) return root.left;\n    else { Node node=root.right; while(node.left!=null) node=node.left; root.value=node.value; root.right=deleteNode(root.right,node.value); }\n    return root;\n}}");
            for (const [id, title, order] of [
                ["tree-inorder","inorder","left, root, right"],
                ["tree-preorder","preorder","root, left, right"],
                ["tree-postorder","postorder","left, right, root"]
            ]) {
                fill(id,
                    `def ${title}(root):\n    if root:\n        ${order === "left, root, right" ? "inorder(root.left); print(root.value); inorder(root.right)" : order === "root, left, right" ? "print(root.value); preorder(root.left); preorder(root.right)" : "postorder(root.left); postorder(root.right); print(root.value)"}`,
                    `function ${title}(root) { if (!root) return; ${order === "left, root, right" ? "inorder(root.left); console.log(root.value); inorder(root.right);" : order === "root, left, right" ? "console.log(root.value); preorder(root.left); preorder(root.right);" : "postorder(root.left); postorder(root.right); console.log(root.value);" } }`,
                    `void ${title}(Node* root) { if (!root) return; ${order === "left, root, right" ? "inorder(root->left); cout<<root->value; inorder(root->right);" : order === "root, left, right" ? "cout<<root->value; preorder(root->left); preorder(root->right);" : "postorder(root->left); postorder(root->right); cout<<root->value;" } }`,
                    `void ${title}(Node root) { if (root == null) return; ${order === "left, root, right" ? "${title}(root.left); System.out.println(root.value); ${title}(root.right);" : order === "root, left, right" ? "System.out.println(root.value); ${title}(root.left); ${title}(root.right);" : "${title}(root.left); ${title}(root.right); System.out.println(root.value);" } }`);
            }
            fill("tree-level-order",
                "queue = deque([root])\nwhile queue:\n    node = queue.popleft()\n    print(node.value)\n    if node.left: queue.append(node.left)\n    if node.right: queue.append(node.right)",
                "const queue=[root];\nwhile(queue.length){ const node=queue.shift(); console.log(node.value); if(node.left) queue.push(node.left); if(node.right) queue.push(node.right); }",
                "std::queue<Node*> queue; queue.push(root);\nwhile(!queue.empty()){ Node* node=queue.front(); queue.pop(); cout<<node->value; if(node->left)queue.push(node->left); if(node->right)queue.push(node->right); }",
                "java.util.Queue<Node> queue=new java.util.ArrayDeque<>(); queue.offer(root);\nwhile(!queue.isEmpty()){ Node node=queue.poll(); System.out.println(node.value); if(node.left!=null)queue.offer(node.left); if(node.right!=null)queue.offer(node.right); }");

            fill("graph-bfs",
                "queue = deque([start])\nvisited = {start}\nwhile queue:\n    node = queue.popleft()\n    for neighbor in graph[node]:\n        if neighbor not in visited: visited.add(neighbor); queue.append(neighbor)",
                "const queue=[start], visited=new Set([start]);\nwhile(queue.length){ const node=queue.shift(); for(const next of graph[node]||[]) if(!visited.has(next)){visited.add(next);queue.push(next);} }",
                "queue<int> queue; set<int> visited;\nqueue.push(start); visited.insert(start);\nwhile(!queue.empty()){ int node=queue.front();queue.pop(); for(int next:graph[node]) if(!visited.count(next)){visited.insert(next);queue.push(next);} }",
                "Queue<Integer> queue=new ArrayDeque<>(); Set<Integer> visited=new HashSet<>(); queue.offer(start); visited.add(start);\nwhile(!queue.isEmpty()){ int node=queue.poll(); for(int next:graph.get(node)){if(visited.add(next))queue.offer(next);} }");
            fill("graph-dfs",
                "visited = set()\ndef dfs(node):\n    visited.add(node)\n    for neighbor in graph[node]:\n        if neighbor not in visited: dfs(neighbor)",
                "const visited=new Set();\nfunction dfs(node){ if(visited.has(node))return; visited.add(node); for(const next of graph[node]||[])dfs(next); }",
                "void dfs(int node, set<int>& visited, const vector<vector<int>>& graph) {\n    if(!visited.insert(node).second)return;\n    for(int next:graph[node]) dfs(next,visited,graph);\n}",
                "void dfs(int node, Set<Integer> visited, Map<Integer,List<Integer>> graph) {\n    if(!visited.add(node))return;\n    for(int next:graph.getOrDefault(node,List.of()))dfs(next,visited,graph);\n}");
            fill("graph-dijkstra",
                "import heapq\n\ndef dijkstra(graph, start):\n    distance={start:0}; queue=[(0,start)]\n    while queue:\n        cost,node=heapq.heappop(queue)\n        if cost != distance[node]: continue\n        for neighbor,weight in graph[node]:\n            candidate=cost+weight\n            if candidate < distance.get(neighbor,float('inf')):\n                distance[neighbor]=candidate; heapq.heappush(queue,(candidate,neighbor))\n    return distance",
                "function dijkstra(graph, start) {\n    const distance=new Map([[start,0]]), queue=[[0,start]];\n    while(queue.length){ queue.sort((a,b)=>a[0]-b[0]); const [cost,node]=queue.shift();\n        if(cost!==distance.get(node)) continue;\n        for(const [next,weight] of graph.get(node)||[]){ const candidate=cost+weight;\n            if(candidate<(distance.get(next)??Infinity)){distance.set(next,candidate);queue.push([candidate,next]);}\n        }\n    }\n    return distance;\n}",
                "vector<int> dijkstra(const vector<vector<pair<int,int>>>& graph, int start) {\n    const int INF=1e9; vector<int> dist(graph.size(),INF);\n    priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>> q;\n    dist[start]=0; q.push({0,start});\n    while(!q.empty()){ auto [cost,node]=q.top(); q.pop(); if(cost!=dist[node])continue;\n        for(auto [next,weight]:graph[node]) if(cost+weight<dist[next]){dist[next]=cost+weight;q.push({dist[next],next});}\n    } return dist;\n}",
                "Map<Integer,Integer> dijkstra(Map<Integer,List<int[]>> graph, int start) {\n    Map<Integer,Integer> dist=new HashMap<>(); PriorityQueue<int[]> q=new PriorityQueue<>(Comparator.comparingInt(a->a[0]));\n    dist.put(start,0); q.offer(new int[]{0,start});\n    while(!q.isEmpty()){int[] cur=q.poll(); int cost=cur[0],node=cur[1]; if(cost!=dist.get(node))continue;\n        for(int[] edge:graph.getOrDefault(node,List.of())){int next=edge[0],candidate=cost+edge[1]; if(candidate<dist.getOrDefault(next,Integer.MAX_VALUE)){dist.put(next,candidate);q.offer(new int[]{candidate,next});}}\n    } return dist;\n}");
            fill("graph-undirected-cycle",
                "visited = set()\ndef has_cycle(node, parent):\n    visited.add(node)\n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            if has_cycle(neighbor,node): return True\n        elif neighbor != parent: return True\n    return False",
                "function hasCycle(node,parent){ visited.add(node); for(const next of graph[node]||[]) { if(!visited.has(next)){if(hasCycle(next,node))return true;} else if(next!==parent)return true; } return false; }",
                "bool hasCycle(int node,int parent,vector<char>& visited,const vector<vector<int>>& graph) {\n    visited[node]=true;\n    for(int next:graph[node]) {\n        if(!visited[next]) { if(hasCycle(next,node,visited,graph)) return true; }\n        else if(next!=parent) return true;\n    }\n    return false;\n}",
                "boolean hasCycle(int node,int parent,Set<Integer> visited,Map<Integer,List<Integer>> graph) {\n    visited.add(node);\n    for(int next:graph.getOrDefault(node,java.util.List.of())) {\n        if(!visited.contains(next)){if(hasCycle(next,node,visited,graph))return true;}\n        else if(next!=parent)return true;\n    }\n    return false;\n}");
            fill("graph-topological-sort",
                "from collections import deque\n\ndef topological_sort(graph):\n    indegree = {node: 0 for node in graph}\n    for node in graph:\n        for neighbor in graph[node]: indegree[neighbor] = indegree.get(neighbor, 0) + 1\n    queue = deque(node for node in indegree if indegree[node] == 0)\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph.get(node, []):\n            indegree[neighbor] -= 1\n            if indegree[neighbor] == 0: queue.append(neighbor)\n    return order if len(order) == len(indegree) else []",
                "function topologicalSort(graph, nodes) {\n    const indegree=new Map(nodes.map(n=>[n,0]));\n    for(const edges of graph.values()) for(const v of edges) indegree.set(v,(indegree.get(v)||0)+1);\n    const queue=nodes.filter(n=>indegree.get(n)===0), order=[];\n    while(queue.length){const u=queue.shift();order.push(u);for(const v of graph.get(u)||[]){indegree.set(v,indegree.get(v)-1);if(indegree.get(v)===0)queue.push(v);}}\n    return order.length===nodes.length?order:[];\n}",
                "vector<int> topologicalSort(const vector<vector<int>>& graph) {\n    int n=graph.size(); vector<int> indegree(n), order;\n    for(const auto& edges:graph) for(int v:edges) indegree[v]++;\n    queue<int> q; for(int i=0;i<n;i++) if(indegree[i]==0) q.push(i);\n    while(!q.empty()){int u=q.front();q.pop();order.push_back(u);for(int v:graph[u])if(--indegree[v]==0)q.push(v);}\n    if((int)order.size()!=n) return {}; return order;\n}",
                "List<Integer> topologicalSort(Map<Integer,List<Integer>> graph) {\n    Map<Integer,Integer> indegree=new HashMap<>();\n    for(int node:graph.keySet())indegree.putIfAbsent(node,0);\n    for(List<Integer> edges:graph.values())for(int next:edges)indegree.put(next,indegree.getOrDefault(next,0)+1);\n    Queue<Integer> queue=new ArrayDeque<>(); for(var entry:indegree.entrySet())if(entry.getValue()==0)queue.offer(entry.getKey());\n    List<Integer> order=new ArrayList<>(); while(!queue.isEmpty()){int node=queue.poll();order.add(node);for(int next:graph.getOrDefault(node,List.of()))if(indegree.merge(next,-1,Integer::sum)==0)queue.offer(next);}\n    return order.size()==indegree.size()?order:List.of();\n}");
            fill("graph-connected-components",
                "def connected_components(graph):\n    visited = set()\n    components = []\n    for node in graph:\n        if node in visited: continue\n        component, stack = [], [node]\n        while stack:\n            current = stack.pop()\n            if current in visited: continue\n            visited.add(current)\n            component.append(current)\n            stack.extend(graph.get(current, []))\n        components.append(component)\n    return components",
                "function connectedComponents(graph, nodes) {\n    const visited = new Set(), components = [];\n    for (const node of nodes) {\n        if (visited.has(node)) continue;\n        const component = [], stack = [node];\n        while (stack.length) {\n            const current = stack.pop();\n            if (visited.has(current)) continue;\n            visited.add(current);\n            component.push(current);\n            stack.push(...(graph[current] || []));\n        }\n        components.push(component);\n    }\n    return components;\n}",
                "vector<vector<int>> connectedComponents(const vector<vector<int>>& graph) {\n    vector<char> visited(graph.size(), false);\n    vector<vector<int>> components;\n    for (int start = 0; start < (int)graph.size(); start++) {\n        if (visited[start]) continue;\n        vector<int> component, stack = {start};\n        visited[start] = true;\n        while (!stack.empty()) {\n            int node = stack.back(); stack.pop_back();\n            component.push_back(node);\n            for (int neighbor : graph[node]) {\n                if (!visited[neighbor]) { visited[neighbor] = true; stack.push_back(neighbor); }\n            }\n        }\n        components.push_back(component);\n    }\n    return components;\n}",
                "List<List<Integer>> connectedComponents(List<List<Integer>> graph) {\n    boolean[] visited = new boolean[graph.size()];\n    List<List<Integer>> components = new ArrayList<>();\n    for (int start = 0; start < graph.size(); start++) {\n        if (visited[start]) continue;\n        List<Integer> component = new ArrayList<>();\n        Deque<Integer> stack = new ArrayDeque<>();\n        stack.push(start);\n        visited[start] = true;\n        while (!stack.isEmpty()) {\n            int node = stack.pop();\n            component.add(node);\n            for (int neighbor : graph.get(node)) {\n                if (!visited[neighbor]) { visited[neighbor] = true; stack.push(neighbor); }\n            }\n        }\n        components.add(component);\n    }\n    return components;\n}");
            return codeSets[algorithmId]?.[language] || null;
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
