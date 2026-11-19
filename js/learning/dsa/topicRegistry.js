
/**
 * GLITCH-RUNNER - DSA LEARNING SYSTEM
 * Module: Topic Registry
 * Purpose: Central registry for all DSA categories and topics.
 *
 * Architecture:
 * - Category management
 * - Topic metadata
 * - Difficulty classification
 * - Algorithm visualization type
 * - Complexity information
 * - Search and filtering
 */

const freeze = (value) => {
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
        Object.freeze(value);

        Object.values(value).forEach(freeze);
    }

    return value;
};

const CATEGORIES = [
    {
        id: "arrays",
        title: "Arrays & Basics",
        icon: "grid",
        description: "Learn array operations, searching and optimization.",
        order: 1,
        topics: [
            {
                id: "array-traversal",
                algorithmId: "array-traversal",
                title: "Array Traversal",
                description: "Visit every element of an array.",
                difficulty: "Beginner",
                visualizer: "array",
                complexity: "O(n)",
                concepts: ["Array", "Index", "Iteration"]
            },
            {
                id: "linear-search",
                algorithmId: "linear-search",
                title: "Linear Search",
                description: "Find an element by checking elements one by one.",
                difficulty: "Beginner",
                visualizer: "array-search",
                complexity: "O(n)",
                concepts: ["Searching", "Iteration", "Target"]
            },
            {
                id: "binary-search",
                algorithmId: "binary-search",
                title: "Binary Search",
                description: "Find an element in a sorted array by dividing the search range.",
                difficulty: "Intermediate",
                visualizer: "binary-search",
                complexity: "O(log n)",
                concepts: ["Low", "High", "Mid", "Divide and Conquer"]
            },
            { id: "array-insertion", algorithmId: "array-insertion", title: "Insert", description: "Insert a value at a valid index.", difficulty: "Beginner", visualizer: "array", complexity: "O(n)", concepts: ["Index", "Shift", "Insertion"] },
            { id: "array-deletion", algorithmId: "array-deletion", title: "Delete", description: "Delete a value at a valid index.", difficulty: "Beginner", visualizer: "array", complexity: "O(n)", concepts: ["Index", "Shift", "Deletion"] },
            { id: "array-reverse", algorithmId: "array-reverse", title: "Reverse", description: "Reverse array elements using two pointers.", difficulty: "Beginner", visualizer: "array", complexity: "O(n)", concepts: ["Left", "Right", "Swap"] },
            { id: "array-min-max", algorithmId: "array-min-max", title: "Find Maximum and Minimum", description: "Find the smallest and largest values.", difficulty: "Beginner", visualizer: "array", complexity: "O(n)", concepts: ["Minimum", "Maximum", "Iteration"] }
        ]
    },

    {
        id: "strings",
        title: "Strings",
        icon: "text",
        description: "Explore character manipulation and string algorithms.",
        order: 2,
        topics: [
            {
                id: "reverse-string",
                algorithmId: "string-reverse",
                title: "Reverse String",
                description: "Reverse characters using two pointers.",
                difficulty: "Beginner",
                visualizer: "string-reverse",
                complexity: "O(n)",
                concepts: ["Characters", "Swap", "Two Pointers"]
            },
            {
                id: "palindrome",
                algorithmId: "palindrome",
                title: "Palindrome Check",
                description: "Check whether a string reads the same forward and backward.",
                difficulty: "Beginner",
                visualizer: "palindrome",
                complexity: "O(n)",
                concepts: ["Comparison", "Left", "Right"]
            },
            {
                id: "anagram",
                algorithmId: "anagram",
                title: "Anagram Detection",
                description: "Determine whether two strings contain the same characters.",
                difficulty: "Intermediate",
                visualizer: "anagram",
                complexity: "O(n)",
                concepts: ["Frequency", "Character Mapping"]
            },
            { id: "string-traversal", algorithmId: "string-traversal", title: "String Traversal", description: "Visit every character of a string.", difficulty: "Beginner", visualizer: "string", complexity: "O(n)", concepts: ["Character", "Index", "Iteration"] },
            { id: "character-frequency", algorithmId: "character-frequency", title: "Character Frequency", description: "Count occurrences of every character.", difficulty: "Beginner", visualizer: "string", complexity: "O(n)", concepts: ["Frequency", "Character", "Mapping"] }
        ]
    },

    {
        id: "sorting",
        title: "Sorting Algorithms",
        icon: "chart",
        description: "Understand sorting through animated comparisons and movements.",
        order: 3,
        topics: [
            {
                id: "bubble-sort",
                algorithmId: "bubble-sort",
                title: "Bubble Sort",
                description: "Sort elements through repeated adjacent comparisons.",
                difficulty: "Beginner",
                visualizer: "sorting",
                complexity: "O(n²)",
                concepts: ["Compare", "Swap", "Sorted"]
            },
            {
                id: "selection-sort",
                algorithmId: "selection-sort",
                title: "Selection Sort",
                description: "Select the smallest remaining element in every pass.",
                difficulty: "Beginner",
                visualizer: "sorting",
                complexity: "O(n²)",
                concepts: ["Minimum", "Selection", "Swap"]
            },
            {
                id: "insertion-sort",
                algorithmId: "insertion-sort",
                title: "Insertion Sort",
                description: "Insert each element into its correct sorted position.",
                difficulty: "Beginner",
                visualizer: "sorting",
                complexity: "O(n²)",
                concepts: ["Key", "Shift", "Insertion"]
            },
            {
                id: "merge-sort",
                algorithmId: "merge-sort",
                title: "Merge Sort",
                description: "Divide an array and merge sorted subarrays.",
                difficulty: "Advanced",
                visualizer: "merge-sort",
                complexity: "O(n log n)",
                concepts: ["Divide", "Merge", "Recursion"]
            },
            {
                id: "quick-sort",
                algorithmId: "quick-sort",
                title: "Quick Sort",
                description: "Partition elements around a pivot and sort recursively.",
                difficulty: "Advanced",
                visualizer: "quick-sort",
                complexity: "O(n log n) average",
                concepts: ["Pivot", "Partition", "Recursion"]
            },
        ]
    },

    {
        id: "recursion",
        title: "Recursion & Backtracking",
        icon: "repeat",
        description: "Visualize recursive calls, decisions and backtracking.",
        order: 4,
        topics: [
            {
                id: "factorial",
                algorithmId: "factorial",
                title: "Factorial",
                description: "Understand recursive function calls and returns.",
                difficulty: "Beginner",
                visualizer: "call-stack",
                complexity: "O(n)",
                concepts: ["Base Case", "Recursive Call", "Call Stack"]
            },
            {
                id: "fibonacci",
                algorithmId: "fibonacci",
                title: "Fibonacci Sequence",
                description: "Visualize recursive Fibonacci calls as a tree.",
                difficulty: "Intermediate",
                visualizer: "recursion-tree",
                complexity: "O(2ⁿ) naive",
                concepts: ["Recursion Tree", "Base Case"]
            },
            {
                id: "subsets",
                algorithmId: "subsets",
                title: "Subsets",
                description: "Generate all possible subsets using backtracking.",
                difficulty: "Advanced",
                visualizer: "backtracking",
                complexity: "O(n × 2ⁿ)",
                concepts: ["Include", "Exclude", "Backtracking"]
            },
            { id: "tower-of-hanoi", algorithmId: "tower-of-hanoi", title: "Tower of Hanoi", description: "Move disks using recursive calls.", difficulty: "Intermediate", visualizer: "tower-of-hanoi", complexity: "O(2^n)", concepts: ["Recursion", "Rods", "Disks"] }
        ]
    },

    {
        id: "linked-list",
        title: "Linked Lists",
        icon: "link",
        description: "Understand dynamic nodes and pointer connections.",
        order: 5,
        topics: [
            {
                id: "linked-list-traversal",
                algorithmId: "linked-list-traversal",
                title: "Linked List Traversal",
                description: "Move through linked nodes using next pointers.",
                difficulty: "Beginner",
                visualizer: "linked-list",
                complexity: "O(n)",
                concepts: ["Head", "Node", "Next"]
            },
            {
                id: "linked-list-insert",
                algorithmId: "linked-list-insert-position",
                title: "Insertion",
                description: "Insert new nodes at different positions.",
                difficulty: "Intermediate",
                visualizer: "linked-list",
                complexity: "O(1) at head; O(n) at position",
                concepts: ["Node", "Pointer", "Insertion"]
            },
            {
                id: "linked-list-delete",
                algorithmId: "linked-list-delete-position",
                title: "Deletion",
                description: "Remove nodes and reconnect their neighbors.",
                difficulty: "Intermediate",
                visualizer: "linked-list",
                complexity: "O(1) at head; O(n) at position",
                concepts: ["Delete", "Next", "Reconnection"]
            },
            {
                id: "linked-list-reverse",
                algorithmId: "linked-list-reverse",
                title: "Reverse Linked List",
                description: "Reverse node connections using three pointers.",
                difficulty: "Intermediate",
                visualizer: "linked-list-reverse",
                complexity: "O(n)",
                concepts: ["Previous", "Current", "Next"]
            }
        ]
    },

    {
        id: "stacks-queues",
        title: "Stacks & Queues",
        icon: "layers",
        description: "Explore LIFO and FIFO data structures.",
        order: 6,
        topics: [
            {
                id: "stack",
                algorithmId: "stack-push",
                title: "Stack Operations",
                description: "Understand Push, Pop and Peek operations.",
                difficulty: "Beginner",
                visualizer: "stack",
                complexity: "O(1) push/pop",
                concepts: ["LIFO", "Top", "Push", "Pop"]
            },
            {
                id: "queue",
                algorithmId: "queue-enqueue",
                title: "Queue Operations",
                description: "Understand Enqueue and Dequeue operations.",
                difficulty: "Beginner",
                visualizer: "queue",
                complexity: "O(1) with suitable implementation",
                concepts: ["FIFO", "Front", "Rear"]
            },
            {
                id: "circular-queue",
                algorithmId: "circular-queue",
                title: "Circular Queue",
                description: "Reuse available queue positions through circular indexing.",
                difficulty: "Intermediate",
                visualizer: "circular-queue",
                complexity: "O(1)",
                concepts: ["Front", "Rear", "Modulo"]
            },
            { id: "stack-pop", algorithmId: "stack-pop", title: "Stack Pop", description: "Remove the top element from a stack.", difficulty: "Beginner", visualizer: "stack", complexity: "O(1)", concepts: ["LIFO", "Top", "Pop"] },
            { id: "stack-peek", algorithmId: "stack-peek", title: "Stack Peek", description: "Read the top element without removing it.", difficulty: "Beginner", visualizer: "stack", complexity: "O(1)", concepts: ["LIFO", "Top", "Peek"] },
            { id: "queue-dequeue", algorithmId: "queue-dequeue", title: "Queue Dequeue", description: "Remove the front element from a queue.", difficulty: "Beginner", visualizer: "queue", complexity: "O(1)", concepts: ["FIFO", "Front", "Dequeue"] },
            { id: "balanced-parentheses", algorithmId: "balanced-parentheses", title: "Balanced Parentheses", description: "Check bracket matching with a stack.", difficulty: "Beginner", visualizer: "stack", complexity: "O(n)", concepts: ["Stack", "Brackets", "Matching"] }
        ]
    },

    {
        id: "trees",
        title: "Trees & Binary Search Trees",
        icon: "git-branch",
        description: "Explore hierarchical data structures and traversals.",
        order: 7,
        topics: [
            {
                id: "inorder",
                algorithmId: "tree-inorder",
                title: "Inorder Traversal",
                description: "Visit Left, Root and Right nodes.",
                difficulty: "Intermediate",
                visualizer: "tree-traversal",
                complexity: "O(n)",
                concepts: ["Left", "Root", "Right"]
            },
            {
                id: "preorder",
                algorithmId: "tree-preorder",
                title: "Preorder Traversal",
                description: "Visit Root, Left and Right nodes.",
                difficulty: "Intermediate",
                visualizer: "tree-traversal",
                complexity: "O(n)",
                concepts: ["Root", "Left", "Right"]
            },
            {
                id: "postorder",
                algorithmId: "tree-postorder",
                title: "Postorder Traversal",
                description: "Visit Left, Right and Root nodes.",
                difficulty: "Intermediate",
                visualizer: "tree-traversal",
                complexity: "O(n)",
                concepts: ["Left", "Right", "Root"]
            },
            {
                id: "bst-insert",
                algorithmId: "bst-insert",
                title: "BST Insertion",
                description: "Insert values while maintaining BST ordering.",
                difficulty: "Intermediate",
                visualizer: "bst",
                complexity: "O(log n) average",
                concepts: ["Left Child", "Right Child", "Comparison"]
            },
            {
                id: "bst-search",
                algorithmId: "bst-search",
                title: "BST Search",
                description: "Find a target value using BST properties.",
                difficulty: "Intermediate",
                visualizer: "bst",
                complexity: "O(log n) average",
                concepts: ["Target", "Comparison", "Traversal"]
            },
            { id: "bst-delete", algorithmId: "bst-delete", title: "BST Deletion", description: "Delete a node from a binary search tree.", difficulty: "Intermediate", visualizer: "bst", complexity: "O(log n) average", concepts: ["Deletion", "Successor", "BST"] },
            { id: "tree-level-order", algorithmId: "tree-level-order", title: "Level Order Traversal", description: "Visit tree nodes level by level.", difficulty: "Intermediate", visualizer: "tree-traversal", complexity: "O(n)", concepts: ["Queue", "Level", "Traversal"] }
        ]
    },

    {
        id: "graphs",
        title: "Graphs",
        icon: "network",
        description: "Explore graph traversal and node connections.",
        order: 8,
        topics: [
            {
                id: "bfs",
                algorithmId: "graph-bfs",
                title: "Breadth First Search",
                description: "Explore graph nodes level by level using a queue.",
                difficulty: "Advanced",
                visualizer: "graph-bfs",
                complexity: "O(V + E)",
                concepts: ["Queue", "Visited", "Level"]
            },
            {
                id: "dfs",
                algorithmId: "graph-dfs",
                title: "Depth First Search",
                description: "Explore graph paths deeply using recursion or a stack.",
                difficulty: "Advanced",
                visualizer: "graph-dfs",
                complexity: "O(V + E)",
                concepts: ["Stack", "Visited", "Backtracking"]
            },
            { id: "dijkstra", algorithmId: "graph-dijkstra", title: "Dijkstra", description: "Find shortest paths in a weighted graph.", difficulty: "Advanced", visualizer: "graph-dijkstra", complexity: "O(V^2 + E)", concepts: ["Distance", "Priority", "Relaxation"] },
            { id: "graph-cycle-detection", algorithmId: "graph-undirected-cycle", title: "Cycle Detection", description: "Detect a cycle in an undirected graph.", difficulty: "Advanced", visualizer: "graph", complexity: "O(V + E)", concepts: ["DFS", "Visited", "Cycle"] },
            { id: "topological-sort", algorithmId: "graph-topological-sort", title: "Topological Sort", description: "Order a directed acyclic graph.", difficulty: "Advanced", visualizer: "graph", complexity: "O(V + E)", concepts: ["Indegree", "Queue", "DAG"] },
            { id: "connected-components", algorithmId: "graph-connected-components", title: "Connected Components", description: "Find disconnected groups of vertices.", difficulty: "Advanced", visualizer: "graph", complexity: "O(V + E)", concepts: ["DFS", "Component", "Visited"] }
        ]
    }
];

const TopicRegistry = {

    getAllCategories() {
        return CATEGORIES;
    },

    getCategory(categoryId) {
        return CATEGORIES.find(
            category => category.id === categoryId
        ) || null;
    },

    getTopic(topicId) {
        for (const category of CATEGORIES) {
            const topic = category.topics.find(
                item => item.id === topicId
            );

            if (topic) {
                return {
                    ...topic,
                    categoryId: category.id,
                    categoryTitle: category.title
                };
            }
        }

        return null;
    },

    getTopics(categoryId) {
        const category = this.getCategory(categoryId);

        return category ? category.topics : [];
    },

    getAllTopics() {
        return CATEGORIES.flatMap(category =>
            category.topics.map(topic => ({
                ...topic,
                categoryId: category.id,
                categoryTitle: category.title
            }))
        );
    },

    searchTopics(query) {
        const search = String(query || "")
            .trim()
            .toLowerCase();

        if (!search) {
            return this.getAllTopics();
        }

        return this.getAllTopics().filter(topic => {
            const searchableText = [
                topic.title,
                topic.description,
                topic.categoryTitle,
                topic.difficulty,
                ...topic.concepts
            ].join(" ").toLowerCase();

            return searchableText.includes(search);
        });
    },

    getTopicsByDifficulty(difficulty) {
        const normalized = String(difficulty || "")
            .toLowerCase();

        return this.getAllTopics().filter(topic =>
            topic.difficulty.toLowerCase() === normalized
        );
    },

    getStatistics() {
        const topics = this.getAllTopics();

        return {
            totalCategories: CATEGORIES.length,
            totalTopics: topics.length,
            beginner: topics.filter(t => t.difficulty === "Beginner").length,
            intermediate: topics.filter(t => t.difficulty === "Intermediate").length,
            advanced: topics.filter(t => t.difficulty === "Advanced").length
        };
    },

    hasTopic(topicId) {
        return this.getTopic(topicId) !== null;
    }
};

freeze(CATEGORIES);

if (typeof window !== "undefined") {
    window.CATEGORIES = CATEGORIES;
    window.TopicRegistry = TopicRegistry;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = { CATEGORIES, TopicRegistry };
}
