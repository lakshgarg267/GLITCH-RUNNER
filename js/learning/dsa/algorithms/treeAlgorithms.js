
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/algorithms/treeAlgorithms.js
 *
 * Binary Tree and Binary Search Tree Algorithms
 */

(function (global) {
    "use strict";

    class TreeAlgorithms {

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

        validateValues(values, name = "Values") {
            if (!Array.isArray(values)) {
                throw new TypeError(`${name} must be an array.`);
            }

            if (values.length > 50) {
                throw new RangeError(
                    `${name} supports a maximum of 50 values.`
                );
            }

            values.forEach(value => {
                if (!Number.isFinite(Number(value))) {
                    throw new TypeError(
                        `${name} must contain only finite numbers.`
                    );
                }
            });

            return values.map(Number);
        }

        createNode(value) {
            return {
                value,
                left: null,
                right: null
            };
        }

        insertNode(root, value) {
            if (!root) {
                return this.createNode(value);
            }

            if (value < root.value) {
                root.left = this.insertNode(root.left, value);
            } else if (value > root.value) {
                root.right = this.insertNode(root.right, value);
            }

            return root;
        }

        buildBST(values) {
            let root = null;

            values.forEach(value => {
                root = this.insertNode(root, value);
            });

            return root;
        }

        serializeTree(root) {
            const nodes = [];
            const edges = [];

            const visit = (node, parent = null, depth = 0, position = "root") => {
                if (!node) return;

                const id = `tree-node-${nodes.length}`;

                nodes.push({
                    id,
                    value: node.value,
                    label: String(node.value),
                    state: "default",
                    depth,
                    position
                });

                if (parent) {
                    edges.push({
                        from: parent,
                        to: id
                    });
                }

                visit(node.left, id, depth + 1, "left");
                visit(node.right, id, depth + 1, "right");
            };

            visit(root);

            return { nodes, edges };
        }

        findNodeId(root, value) {
            let current = root;
            let index = 0;

            while (current) {
                if (current.value === value) {
                    return `tree-node-${index}`;
                }

                index++;

                if (value < current.value) {
                    current = current.left;
                } else {
                    current = current.right;
                }
            }

            return null;
        }

        createStep({
            title,
            explanation,
            codeLine,
            root,
            action = "inspect",
            variables = {},
            pointers = [],
            status = "Processing",
            highlightValue = null
        }) {
            const serialized = this.serializeTree(root);

            if (highlightValue !== null) {
                serialized.nodes.forEach(node => {
                    if (node.value === highlightValue) {
                        node.state = "active";
                    }
                });
            }

            return {
                title,
                explanation,
                codeLine,
                action,
                variables: this.clone(variables),

                scene: {
                    type: "tree",
                    items: serialized.nodes,
                    nodes: serialized.nodes,
                    edges: serialized.edges,
                    pointers: this.clone(pointers),
                    status,
                    meta: {
                        nodeCount: serialized.nodes.length,
                        rootValue: root ? root.value : null
                    }
                },

                snapshot: {
                    tree: this.clone(root),
                    variables: this.clone(variables)
                }
            };
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
                throw new Error(`Tree algorithm not found: ${id}`);
            }

            return algorithm.execute(input);
        }

        register(id, definition) {
            this.algorithms.set(id, {
                id,
                ...definition
            });
        }

        // =====================================
        // 1. BST INSERTION
        // =====================================

        bstInsert(input = {}) {
            const values = this.validateValues(
                input.values || [50, 30, 70, 20, 40, 60, 80]
            );

            const value = Number(input.value ?? 65);

            if (!Number.isFinite(value)) {
                throw new TypeError("Inserted value must be a number.");
            }

            const root = this.buildBST(values);
            const steps = [];

            steps.push(this.createStep({
                title: "Initialize Binary Search Tree",
                explanation:
                    "In a BST, smaller values go to the left and larger values go to the right.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                root,
                action: "initialize",
                variables: {
                    root: root ? root.value : null,
                    insertValue: value
                }
            }));

            if (!root) {
                const newRoot = this.createNode(value);

                steps.push(this.createStep({
                    title: "Create Root Node",
                    explanation:
                        `${value} becomes the root because the tree is empty.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    root: newRoot,
                    action: "insert",
                    variables: {
                        inserted: value
                    },
                    highlightValue: value
                }));

                return steps;
            }

            let current = root;

            while (true) {
                steps.push(this.createStep({
                    title: `Compare ${value} with ${current.value}`,
                    explanation:
                        value < current.value
                            ? `${value} is smaller than ${current.value}. Move to the left subtree.`
                            : value > current.value
                                ? `${value} is greater than ${current.value}. Move to the right subtree.`
                                : `${value} already exists. Duplicate values are ignored.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    root,
                    action: "compare",
                    variables: {
                        current: current.value,
                        insertValue: value,
                        direction: value < current.value
                            ? "left"
                            : value > current.value
                                ? "right"
                                : "duplicate"
                    },
                    highlightValue: current.value
                }));

                if (value === current.value) {
                    steps.push(this.createStep({
                        title: "Duplicate Value",
                        explanation:
                            `${value} is already present. No insertion is required.`,
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 8,
                            java: 6
                        },
                        root,
                        action: "skip",
                        variables: {
                            duplicate: value
                        },
                        status: "Duplicate"
                    }));

                    return steps;
                }

                const direction = value < current.value
                    ? "left"
                    : "right";

                if (!current[direction]) {
                    current[direction] = this.createNode(value);

                    steps.push(this.createStep({
                        title: `Insert ${value}`,
                        explanation:
                            `The ${direction} position is empty. Insert ${value} here.`,
                        codeLine: {
                            python: 5,
                            javascript: 5,
                            cpp: 9,
                            java: 7
                        },
                        root,
                        action: "insert",
                        variables: {
                            inserted: value,
                            parent: current.value,
                            direction
                        },
                        highlightValue: value
                    }));

                    break;
                }

                current = current[direction];
            }

            steps.push(this.createStep({
                title: "BST Insertion Completed",
                explanation:
                    `${value} has been inserted while preserving the BST property.`,
                codeLine: {
                    python: 6,
                    javascript: 6,
                    cpp: 10,
                    java: 8
                },
                root,
                action: "complete",
                variables: {
                    inserted: value
                },
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 2. BST SEARCHING
        // =====================================

        bstSearch(input = {}) {
            const values = this.validateValues(
                input.values || [50, 30, 70, 20, 40, 60, 80]
            );

            const target = Number(input.target ?? 60);
            const root = this.buildBST(values);
            const steps = [];

            if (!Number.isFinite(target)) {
                throw new TypeError("Search target must be a number.");
            }

            steps.push(this.createStep({
                title: "Start BST Search",
                explanation:
                    `Search for ${target}. Compare with the current node and choose the correct subtree.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                root,
                action: "initialize",
                variables: {
                    target
                }
            }));

            let current = root;
            let found = false;

            while (current) {
                steps.push(this.createStep({
                    title: `Visit Node ${current.value}`,
                    explanation:
                        `Compare target ${target} with ${current.value}.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    root,
                    action: "compare",
                    variables: {
                        target,
                        current: current.value
                    },
                    highlightValue: current.value
                }));

                if (target === current.value) {
                    found = true;

                    steps.push(this.createStep({
                        title: "Value Found",
                        explanation:
                            `${target} is present in the Binary Search Tree.`,
                        codeLine: {
                            python: 3,
                            javascript: 3,
                            cpp: 7,
                            java: 5
                        },
                        root,
                        action: "found",
                        variables: {
                            target,
                            found: true
                        },
                        highlightValue: target,
                        status: "Found"
                    }));

                    break;
                }

                const direction = target < current.value
                    ? "left"
                    : "right";

                steps.push(this.createStep({
                    title: `Move ${direction}`,
                    explanation:
                        target < current.value
                            ? `${target} is smaller. Move left.`
                            : `${target} is greater. Move right.`,
                    codeLine: {
                        python: 4,
                        javascript: 4,
                        cpp: 8,
                        java: 6
                    },
                    root,
                    action: "move",
                    variables: {
                        target,
                        direction
                    },
                    highlightValue: current.value
                }));

                current = current[direction];
            }

            if (!found) {
                steps.push(this.createStep({
                    title: "Value Not Found",
                    explanation:
                        `${target} is not present in the tree.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 9,
                        java: 7
                    },
                    root,
                    action: "not-found",
                    variables: {
                        target,
                        found: false
                    },
                    status: "Not Found"
                }));
            }

            return steps;
        }

        // =====================================
        // 3. BST DELETION
        // =====================================

        bstDelete(input = {}) {
            const values = this.validateValues(
                input.values || [50, 30, 70, 20, 40, 60, 80]
            );

            const target = Number(input.target ?? 30);

            if (!Number.isFinite(target)) {
                throw new TypeError("Delete target must be a number.");
            }

            let root = this.buildBST(values);
            const steps = [];

            steps.push(this.createStep({
                title: "Start BST Deletion",
                explanation:
                    `Find ${target} before deleting it from the tree.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                root,
                action: "initialize",
                variables: {
                    target
                }
            }));

            let current = root;
            let parent = null;
            let direction = null;

            while (current && current.value !== target) {
                parent = current;
                direction = target < current.value
                    ? "left"
                    : "right";

                steps.push(this.createStep({
                    title: `Search ${current.value}`,
                    explanation:
                        `Move ${direction} to find ${target}.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    root,
                    action: "compare",
                    variables: {
                        current: current.value,
                        target,
                        direction
                    },
                    highlightValue: current.value
                }));

                current = current[direction];
            }

            if (!current) {
                steps.push(this.createStep({
                    title: "Node Not Found",
                    explanation:
                        `${target} does not exist. Tree remains unchanged.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    root,
                    action: "not-found",
                    variables: {
                        target
                    },
                    status: "Not Found"
                }));

                return steps;
            }

            const deleteNode = current;

            steps.push(this.createStep({
                title: `Found Node ${target}`,
                explanation:
                    "There are three deletion cases: leaf node, one child, or two children.",
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                root,
                action: "found",
                variables: {
                    target,
                    hasLeft: Boolean(current.left),
                    hasRight: Boolean(current.right)
                },
                highlightValue: target
            }));

            let caseName;

            if (!deleteNode.left || !deleteNode.right) {
                caseName = deleteNode.left || deleteNode.right
                    ? "one-child"
                    : "leaf";

                const replacement =
                    deleteNode.left || deleteNode.right;

                if (!parent) {
                    root = replacement;
                } else {
                    parent[direction] = replacement;
                }

                steps.push(this.createStep({
                    title: caseName === "leaf"
                        ? "Delete Leaf Node"
                        : "Replace Node with Its Child",
                    explanation:
                        caseName === "leaf"
                            ? `Remove ${target} because it has no children.`
                            : `Replace ${target} with its only child.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 9,
                        java: 7
                    },
                    root,
                    action: "delete",
                    variables: {
                        target,
                        case: caseName,
                        replacement: replacement
                            ? replacement.value
                            : null
                    }
                }));
            } else {
                caseName = "two-children";

                let successorParent = deleteNode;
                let successor = deleteNode.right;

                while (successor.left) {
                    successorParent = successor;
                    successor = successor.left;
                }

                const successorValue = successor.value;

                steps.push(this.createStep({
                    title: "Find Inorder Successor",
                    explanation:
                        `The inorder successor of ${target} is ${successorValue}, the smallest value in its right subtree.`,
                    codeLine: {
                        python: 6,
                        javascript: 6,
                        cpp: 10,
                        java: 8
                    },
                    root,
                    action: "find-successor",
                    variables: {
                        target,
                        successor: successorValue
                    },
                    highlightValue: successorValue
                }));

                deleteNode.value = successorValue;

                if (successorParent === deleteNode) {
                    successorParent.right = successor.right;
                } else {
                    successorParent.left = successor.right;
                }

                steps.push(this.createStep({
                    title: "Replace and Remove Successor",
                    explanation:
                        `Replace ${target} with ${successorValue}, then remove the successor's original node.`,
                    codeLine: {
                        python: 7,
                        javascript: 7,
                        cpp: 11,
                        java: 9
                    },
                    root,
                    action: "delete",
                    variables: {
                        deleted: target,
                        replacement: successorValue,
                        case: caseName
                    },
                    highlightValue: successorValue
                }));
            }

            steps.push(this.createStep({
                title: "BST Deletion Completed",
                explanation:
                    `Deletion of ${target} is complete. BST ordering is preserved.`,
                codeLine: {
                    python: 8,
                    javascript: 8,
                    cpp: 12,
                    java: 10
                },
                root,
                action: "complete",
                variables: {
                    deleted: target,
                    case: caseName
                },
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // TRAVERSAL HELPER
        // =====================================

        traversal(input, order) {
            const values = this.validateValues(
                input.values || [50, 30, 70, 20, 40, 60, 80]
            );

            const root = this.buildBST(values);
            const steps = [];
            const result = [];

            steps.push(this.createStep({
                title: `Start ${order} Traversal`,
                explanation:
                    `Visit every node using ${order.toLowerCase()} traversal.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                root,
                action: "initialize",
                variables: {
                    order,
                    result: []
                }
            }));

            const visit = node => {
                if (!node) return;

                if (order === "Preorder") {
                    result.push(node.value);

                    steps.push(this.createStep({
                        title: `Visit ${node.value}`,
                        explanation:
                            `Visit the current node ${node.value} before its children.`,
                        codeLine: {
                            python: 3,
                            javascript: 3,
                            cpp: 7,
                            java: 5
                        },
                        root,
                        action: "visit",
                        variables: {
                            current: node.value,
                            result: [...result]
                        },
                        highlightValue: node.value
                    }));
                }

                visit(node.left);

                if (order === "Inorder") {
                    result.push(node.value);

                    steps.push(this.createStep({
                        title: `Visit ${node.value}`,
                        explanation:
                            `Visit ${node.value} after its left subtree.`,
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 8,
                            java: 6
                        },
                        root,
                        action: "visit",
                        variables: {
                            current: node.value,
                            result: [...result]
                        },
                        highlightValue: node.value
                    }));
                }

                visit(node.right);

                if (order === "Postorder") {
                    result.push(node.value);

                    steps.push(this.createStep({
                        title: `Visit ${node.value}`,
                        explanation:
                            `Visit ${node.value} after both left and right subtrees.`,
                        codeLine: {
                            python: 5,
                            javascript: 5,
                            cpp: 9,
                            java: 7
                        },
                        root,
                        action: "visit",
                        variables: {
                            current: node.value,
                            result: [...result]
                        },
                        highlightValue: node.value
                    }));
                }
            };

            visit(root);

            steps.push(this.createStep({
                title: `${order} Traversal Completed`,
                explanation:
                    `Traversal order: ${result.join(" → ")}.`,
                codeLine: {
                    python: 6,
                    javascript: 6,
                    cpp: 10,
                    java: 8
                },
                root,
                action: "complete",
                variables: {
                    order,
                    result
                },
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 4. INORDER
        // =====================================

        inorderTraversal(input = {}) {
            return this.traversal(input, "Inorder");
        }

        // =====================================
        // 5. PREORDER
        // =====================================

        preorderTraversal(input = {}) {
            return this.traversal(input, "Preorder");
        }

        // =====================================
        // 6. POSTORDER
        // =====================================

        postorderTraversal(input = {}) {
            return this.traversal(input, "Postorder");
        }

        // =====================================
        // 7. LEVEL ORDER
        // =====================================

        levelOrderTraversal(input = {}) {
            const values = this.validateValues(
                input.values || [50, 30, 70, 20, 40, 60, 80]
            );

            const root = this.buildBST(values);
            const queue = [];
            const result = [];
            const steps = [];

            steps.push(this.createStep({
                title: "Start Level Order Traversal",
                explanation:
                    "Level order traversal visits nodes level by level using a queue.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                root,
                action: "initialize",
                variables: {
                    queue: [],
                    result: []
                }
            }));

            if (root) {
                queue.push(root);
            }

            while (queue.length > 0) {
                const current = queue.shift();

                result.push(current.value);

                steps.push(this.createStep({
                    title: `Visit ${current.value}`,
                    explanation:
                        `Remove ${current.value} from the queue and visit it.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    root,
                    action: "visit",
                    variables: {
                        current: current.value,
                        queue: queue.map(node => node.value),
                        result: [...result]
                    },
                    highlightValue: current.value
                }));

                if (current.left) {
                    queue.push(current.left);
                }

                if (current.right) {
                    queue.push(current.right);
                }

                steps.push(this.createStep({
                    title: "Add Children to Queue",
                    explanation:
                        "Add the left child first and then the right child.",
                    codeLine: {
                        python: 4,
                        javascript: 4,
                        cpp: 8,
                        java: 6
                    },
                    root,
                    action: "enqueue",
                    variables: {
                        queue: queue.map(node => node.value),
                        result: [...result]
                    }
                }));
            }

            steps.push(this.createStep({
                title: "Level Order Completed",
                explanation:
                    `Level order: ${result.join(" → ")}.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                root,
                action: "complete",
                variables: {
                    result
                },
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 8. FIND MINIMUM
        // =====================================

        findMinimum(input = {}) {
            const values = this.validateValues(
                input.values || [50, 30, 70, 20, 40, 60, 80]
            );

            const root = this.buildBST(values);
            const steps = [];

            if (!root) {
                return [
                    this.createStep({
                        title: "Empty Tree",
                        explanation:
                            "Cannot find minimum in an empty tree.",
                        codeLine: {
                            python: 1,
                            javascript: 1,
                            cpp: 5,
                            java: 3
                        },
                        root,
                        action: "empty",
                        status: "Empty"
                    })
                ];
            }

            let current = root;

            while (current.left) {
                steps.push(this.createStep({
                    title: `Check ${current.value}`,
                    explanation:
                        `${current.value} has a left child. Move left to find a smaller value.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    root,
                    action: "move",
                    variables: {
                        current: current.value,
                        next: current.left.value
                    },
                    highlightValue: current.value
                }));

                current = current.left;
            }

            steps.push(this.createStep({
                title: `Minimum Is ${current.value}`,
                explanation:
                    "The leftmost node contains the minimum value in a BST.",
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                root,
                action: "complete",
                variables: {
                    minimum: current.value
                },
                highlightValue: current.value,
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 9. FIND MAXIMUM
        // =====================================

        findMaximum(input = {}) {
            const values = this.validateValues(
                input.values || [50, 30, 70, 20, 40, 60, 80]
            );

            const root = this.buildBST(values);
            const steps = [];

            if (!root) {
                return [
                    this.createStep({
                        title: "Empty Tree",
                        explanation:
                            "Cannot find maximum in an empty tree.",
                        codeLine: {
                            python: 1,
                            javascript: 1,
                            cpp: 5,
                            java: 3
                        },
                        root,
                        action: "empty",
                        status: "Empty"
                    })
                ];
            }

            let current = root;

            while (current.right) {
                steps.push(this.createStep({
                    title: `Check ${current.value}`,
                    explanation:
                        `${current.value} has a right child. Move right to find a larger value.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    root,
                    action: "move",
                    variables: {
                        current: current.value,
                        next: current.right.value
                    },
                    highlightValue: current.value
                }));

                current = current.right;
            }

            steps.push(this.createStep({
                title: `Maximum Is ${current.value}`,
                explanation:
                    "The rightmost node contains the maximum value in a BST.",
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                root,
                action: "complete",
                variables: {
                    maximum: current.value
                },
                highlightValue: current.value,
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // 10. TREE HEIGHT
        // =====================================

        treeHeight(input = {}) {
            const values = this.validateValues(
                input.values || [50, 30, 70, 20, 40, 60, 80]
            );

            const root = this.buildBST(values);
            const steps = [];

            const calculateHeight = node => {
                if (!node) return 0;

                const leftHeight = calculateHeight(node.left);
                const rightHeight = calculateHeight(node.right);

                return 1 + Math.max(leftHeight, rightHeight);
            };

            const height = calculateHeight(root);

            steps.push(this.createStep({
                title: "Calculate Tree Height",
                explanation:
                    "Tree height is the number of nodes on the longest path from the root to a leaf. An empty tree has height 0.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                root,
                action: "initialize",
                variables: {
                    definition: "Number of nodes on longest root-to-leaf path"
                }
            }));

            const inspect = (node, depth = 1) => {
                if (!node) return;

                steps.push(this.createStep({
                    title: `Calculate Height at ${node.value}`,
                    explanation:
                        `Inspect node ${node.value} at depth ${depth}.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    root,
                    action: "inspect",
                    variables: {
                        current: node.value,
                        depth
                    },
                    highlightValue: node.value
                }));

                inspect(node.left, depth + 1);
                inspect(node.right, depth + 1);
            };

            inspect(root);

            steps.push(this.createStep({
                title: `Tree Height = ${height}`,
                explanation:
                    `The longest root-to-leaf path contains ${height} node(s).`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                root,
                action: "complete",
                variables: {
                    height,
                    levels: height
                },
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // REGISTER ALGORITHMS
        // =====================================

        registerAlgorithms() {

            this.register("bst-insert", {
                title: "BST Insertion",
                description:
                    "Insert a value while maintaining Binary Search Tree properties.",
                complexity: {
                    time: "O(log n) average, O(n) worst",
                    space: "O(h)"
                },
                execute: input => this.bstInsert(input)
            });

            this.register("bst-search", {
                title: "BST Search",
                description:
                    "Search for a value by comparing nodes and choosing left or right.",
                complexity: {
                    time: "O(log n) average, O(n) worst",
                    space: "O(1)"
                },
                execute: input => this.bstSearch(input)
            });

            this.register("bst-delete", {
                title: "BST Deletion",
                description:
                    "Delete a node using leaf, one-child, and two-child cases.",
                complexity: {
                    time: "O(log n) average, O(n) worst",
                    space: "O(h)"
                },
                execute: input => this.bstDelete(input)
            });

            this.register("tree-inorder", {
                title: "Inorder Traversal",
                description:
                    "Traverse left subtree, root, and right subtree.",
                complexity: {
                    time: "O(n)",
                    space: "O(h)"
                },
                execute: input => this.inorderTraversal(input)
            });

            this.register("tree-preorder", {
                title: "Preorder Traversal",
                description:
                    "Traverse root, left subtree, and right subtree.",
                complexity: {
                    time: "O(n)",
                    space: "O(h)"
                },
                execute: input => this.preorderTraversal(input)
            });

            this.register("tree-postorder", {
                title: "Postorder Traversal",
                description:
                    "Traverse left subtree, right subtree, and root.",
                complexity: {
                    time: "O(n)",
                    space: "O(h)"
                },
                execute: input => this.postorderTraversal(input)
            });

            this.register("tree-level-order", {
                title: "Level Order Traversal",
                description:
                    "Visit nodes level by level using a queue.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.levelOrderTraversal(input)
            });

            this.register("tree-minimum", {
                title: "Find Minimum",
                description:
                    "Find the leftmost node in a Binary Search Tree.",
                complexity: {
                    time: "O(h)",
                    space: "O(1)"
                },
                execute: input => this.findMinimum(input)
            });

            this.register("tree-maximum", {
                title: "Find Maximum",
                description:
                    "Find the rightmost node in a Binary Search Tree.",
                complexity: {
                    time: "O(h)",
                    space: "O(1)"
                },
                execute: input => this.findMaximum(input)
            });

            this.register("tree-height", {
                title: "Tree Height",
                description:
                    "Calculate the height of a binary tree.",
                complexity: {
                    time: "O(n)",
                    space: "O(h)"
                },
                execute: input => this.treeHeight(input)
            });
        }
    }

    // =====================================
    // GLOBAL EXPORT
    // =====================================

    global.TreeAlgorithms = TreeAlgorithms;

    // =====================================
    // COMMONJS EXPORT
    // =====================================

    if (
        typeof module !== "undefined" &&
        module.exports
    ) {
        module.exports = TreeAlgorithms;
    }

})(typeof window !== "undefined" ? window : globalThis);
