
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
                title: "Array Traversal",
                description: "Visit every element of an array.",
                difficulty: "Beginner",
                visualizer: "array",
                complexity: "O(n)",
                concepts: ["Array", "Index", "Iteration"]
            },
            {
                id: "linear-search",
                title: "Linear Search",
                description: "Find an element by checking elements one by one.",
                difficulty: "Beginner",
                visualizer: "array-search",
                complexity: "O(n)",
                concepts: ["Searching", "Iteration", "Target"]
            },
            {
                id: "binary-search",
                title: "Binary Search",
                description: "Find an element in a sorted array by dividing the search range.",
                difficulty: "Intermediate",
                visualizer: "binary-search",
                complexity: "O(log n)",
                concepts: ["Low", "High", "Mid", "Divide and Conquer"]
            },
            {
                id: "prefix-sum",
                title: "Prefix Sum",
                description: "Calculate cumulative sums to answer range queries efficiently.",
                difficulty: "Intermediate",
                visualizer: "prefix-sum",
                complexity: "O(n) preprocessing",
                concepts: ["Cumulative Sum", "Range Query"]
            },
            {
                id: "two-pointers",
                title: "Two Pointers",
                description: "Solve array problems using two moving pointers.",
                difficulty: "Intermediate",
                visualizer: "two-pointers",
                complexity: "O(n)",
                concepts: ["Left", "Right", "Pointers"]
            },
            {
                id: "sliding-window",
                title: "Sliding Window",
                description: "Process continuous subarrays using a moving window.",
                difficulty: "Intermediate",
                visualizer: "sliding-window",
                complexity: "O(n)",
                concepts: ["Window", "Left", "Right"]
            },
            {
                id: "kadane",
                title: "Kadane's Algorithm",
                description: "Find the maximum sum of a contiguous subarray.",
                difficulty: "Intermediate",
                visualizer: "kadane",
                complexity: "O(n)",
                concepts: ["Current Sum", "Maximum Sum"]
            }
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
                title: "Reverse String",
                description: "Reverse characters using two pointers.",
                difficulty: "Beginner",
                visualizer: "string-reverse",
                complexity: "O(n)",
                concepts: ["Characters", "Swap", "Two Pointers"]
            },
            {
                id: "palindrome",
                title: "Palindrome Check",
                description: "Check whether a string reads the same forward and backward.",
                difficulty: "Beginner",
                visualizer: "palindrome",
                complexity: "O(n)",
                concepts: ["Comparison", "Left", "Right"]
            },
            {
                id: "anagram",
                title: "Anagram Detection",
                description: "Determine whether two strings contain the same characters.",
                difficulty: "Intermediate",
                visualizer: "anagram",
                complexity: "O(n)",
                concepts: ["Frequency", "Character Mapping"]
            },
            {
                id: "substring-pattern",
                title: "Substring & Pattern Matching",
                description: "Find a pattern inside a larger string.",
                difficulty: "Intermediate",
                visualizer: "pattern-matching",
                complexity: "O(n × m) naive",
                concepts: ["Substring", "Pattern", "Matching"]
            }
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
                title: "Bubble Sort",
                description: "Sort elements through repeated adjacent comparisons.",
                difficulty: "Beginner",
                visualizer: "sorting",
                complexity: "O(n²)",
                concepts: ["Compare", "Swap", "Sorted"]
            },
            {
                id: "selection-sort",
                title: "Selection Sort",
                description: "Select the smallest remaining element in every pass.",
                difficulty: "Beginner",
                visualizer: "sorting",
                complexity: "O(n²)",
                concepts: ["Minimum", "Selection", "Swap"]
            },
            {
                id: "insertion-sort",
                title: "Insertion Sort",
                description: "Insert each element into its correct sorted position.",
                difficulty: "Beginner",
                visualizer: "sorting",
                complexity: "O(n²)",
                concepts: ["Key", "Shift", "Insertion"]
            },
            {
                id: "merge-sort",
                title: "Merge Sort",
                description: "Divide an array and merge sorted subarrays.",
                difficulty: "Advanced",
                visualizer: "merge-sort",
                complexity: "O(n log n)",
                concepts: ["Divide", "Merge", "Recursion"]
            },
            {
                id: "quick-sort",
                title: "Quick Sort",
                description: "Partition elements around a pivot and sort recursively.",
                difficulty: "Advanced",
                visualizer: "quick-sort",
                complexity: "O(n log n) average",
                concepts: ["Pivot", "Partition", "Recursion"]
            },
            {
                id: "heap-sort",
                title: "Heap Sort",
                description: "Sort elements using a binary heap.",
                difficulty: "Advanced",
                visualizer: "heap-sort",
                complexity: "O(n log n)",
                concepts: ["Heap", "Root", "Heapify"]
            },
            {
                id: "counting-sort",
                title: "Counting Sort",
                description: "Sort integer values using frequency counts.",
                difficulty: "Intermediate",
                visualizer: "counting-sort",
                complexity: "O(n + k)",
                concepts: ["Frequency", "Counting", "Reconstruction"]
            }
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
                title: "Factorial",
                description: "Understand recursive function calls and returns.",
                difficulty: "Beginner",
                visualizer: "call-stack",
                complexity: "O(n)",
                concepts: ["Base Case", "Recursive Call", "Call Stack"]
            },
            {
                id: "fibonacci",
                title: "Fibonacci Sequence",
                description: "Visualize recursive Fibonacci calls as a tree.",
                difficulty: "Intermediate",
                visualizer: "recursion-tree",
                complexity: "O(2ⁿ) naive",
                concepts: ["Recursion Tree", "Base Case"]
            },
            {
                id: "subsets",
                title: "Subsets",
                description: "Generate all possible subsets using backtracking.",
                difficulty: "Advanced",
                visualizer: "backtracking",
                complexity: "O(n × 2ⁿ)",
                concepts: ["Include", "Exclude", "Backtracking"]
            },
            {
                id: "n-queens",
                title: "N-Queens",
                description: "Place queens without attacking each other.",
                difficulty: "Advanced",
                visualizer: "chess-backtracking",
                complexity: "Exponential",
                concepts: ["Chessboard", "Safe Position", "Backtracking"]
            },
            {
                id: "maze",
                title: "Maze Solver",
                description: "Find a valid path through a maze.",
                difficulty: "Advanced",
                visualizer: "maze",
                complexity: "O(4^(n×m)) worst case",
                concepts: ["Path", "Visited", "Backtracking"]
            }
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
                title: "Linked List Traversal",
                description: "Move through linked nodes using next pointers.",
                difficulty: "Beginner",
                visualizer: "linked-list",
                complexity: "O(n)",
                concepts: ["Head", "Node", "Next"]
            },
            {
                id: "linked-list-insert",
                title: "Insertion",
                description: "Insert new nodes at different positions.",
                difficulty: "Intermediate",
                visualizer: "linked-list",
                complexity: "O(1) at head; O(n) at position",
                concepts: ["Node", "Pointer", "Insertion"]
            },
            {
                id: "linked-list-delete",
                title: "Deletion",
                description: "Remove nodes and reconnect their neighbors.",
                difficulty: "Intermediate",
                visualizer: "linked-list",
                complexity: "O(1) at head; O(n) at position",
                concepts: ["Delete", "Next", "Reconnection"]
            },
            {
                id: "linked-list-reverse",
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
                title: "Stack Operations",
                description: "Understand Push, Pop and Peek operations.",
                difficulty: "Beginner",
                visualizer: "stack",
                complexity: "O(1) push/pop",
                concepts: ["LIFO", "Top", "Push", "Pop"]
            },
            {
                id: "queue",
                title: "Queue Operations",
                description: "Understand Enqueue and Dequeue operations.",
                difficulty: "Beginner",
                visualizer: "queue",
                complexity: "O(1) with suitable implementation",
                concepts: ["FIFO", "Front", "Rear"]
            },
            {
                id: "circular-queue",
                title: "Circular Queue",
                description: "Reuse available queue positions through circular indexing.",
                difficulty: "Intermediate",
                visualizer: "circular-queue",
                complexity: "O(1)",
                concepts: ["Front", "Rear", "Modulo"]
            }
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
                title: "Inorder Traversal",
                description: "Visit Left, Root and Right nodes.",
                difficulty: "Intermediate",
                visualizer: "tree-traversal",
                complexity: "O(n)",
                concepts: ["Left", "Root", "Right"]
            },
            {
                id: "preorder",
                title: "Preorder Traversal",
                description: "Visit Root, Left and Right nodes.",
                difficulty: "Intermediate",
                visualizer: "tree-traversal",
                complexity: "O(n)",
                concepts: ["Root", "Left", "Right"]
            },
            {
                id: "postorder",
                title: "Postorder Traversal",
                description: "Visit Left, Right and Root nodes.",
                difficulty: "Intermediate",
                visualizer: "tree-traversal",
                complexity: "O(n)",
                concepts: ["Left", "Right", "Root"]
            },
            {
                id: "bst-insert",
                title: "BST Insertion",
                description: "Insert values while maintaining BST ordering.",
                difficulty: "Intermediate",
                visualizer: "bst",
                complexity: "O(log n) average",
                concepts: ["Left Child", "Right Child", "Comparison"]
            },
            {
                id: "bst-search",
                title: "BST Search",
                description: "Find a target value using BST properties.",
                difficulty: "Intermediate",
                visualizer: "bst",
                complexity: "O(log n) average",
                concepts: ["Target", "Comparison", "Traversal"]
            }
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
                title: "Breadth First Search",
                description: "Explore graph nodes level by level using a queue.",
                difficulty: "Advanced",
                visualizer: "graph-bfs",
                complexity: "O(V + E)",
                concepts: ["Queue", "Visited", "Level"]
            },
            {
                id: "dfs",
                title: "Depth First Search",
                description: "Explore graph paths deeply using recursion or a stack.",
                difficulty: "Advanced",
                visualizer: "graph-dfs",
                complexity: "O(V + E)",
                concepts: ["Stack", "Visited", "Backtracking"]
            }
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

export { CATEGORIES, TopicRegistry };

export default TopicRegistry;
