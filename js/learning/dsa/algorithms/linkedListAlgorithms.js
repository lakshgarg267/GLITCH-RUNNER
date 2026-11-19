
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/algorithms/linkedListAlgorithms.js
 *
 * Linked List Algorithms:
 * 1. Create Linked List
 * 2. Traversal
 * 3. Insert at Beginning
 * 4. Insert at End
 * 5. Insert at Position
 * 6. Delete from Beginning
 * 7. Delete from End
 * 8. Delete at Position
 * 9. Search
 * 10. Reverse Linked List
 */

(function (global) {
    "use strict";

    class LinkedListAlgorithms {

        constructor() {
            this.algorithms = new Map();
            this.registerAlgorithms();
        }

        // =====================================
        // UTILITIES
        // =====================================

        clone(value) {
            return JSON.parse(JSON.stringify(value));
        }

        validateArray(array) {
            if (!Array.isArray(array)) {
                throw new TypeError("Input must be an array.");
            }

            if (array.length > 30) {
                throw new RangeError(
                    "Linked List visualization supports up to 30 nodes."
                );
            }

            return array.map(value => {
                if (
                    typeof value !== "number" &&
                    typeof value !== "string"
                ) {
                    throw new TypeError(
                        "Node values must be numbers or strings."
                    );
                }

                return value;
            });
        }

        validatePosition(position, min, max) {
            const value = Number(position);

            if (
                !Number.isInteger(value) ||
                value < min ||
                value > max
            ) {
                throw new RangeError(
                    `Position must be an integer between ${min} and ${max}.`
                );
            }

            return value;
        }

        createNodes(values) {
            return values.map((value, index) => ({
                id: `node-${index}`,
                value,
                next: index < values.length - 1
                    ? `node-${index + 1}`
                    : null
            }));
        }

        createScene(nodes, options = {}) {
            const items = nodes.map((node, index) => ({
                id: node.id,
                value: node.value,
                label: String(node.value),
                index,
                state: node.state || "default",
                meta: {
                    next: node.next
                }
            }));

            const edges = [];

            for (let i = 0; i < nodes.length - 1; i++) {
                edges.push({
                    from: nodes[i].id,
                    to: nodes[i + 1].id,
                    type: "next",
                    label: "next"
                });
            }

            return {
                type: "linked-list",
                items,
                pointers: options.pointers || [],
                edges,
                status: options.status || "Ready",
                meta: {
                    head: nodes.length ? nodes[0].id : null,
                    tail: nodes.length
                        ? nodes[nodes.length - 1].id
                        : null,
                    length: nodes.length,
                    operation: options.operation || "traversal"
                }
            };
        }

        createStep({
            title,
            explanation,
            codeLine,
            nodes,
            variables = {},
            pointers = [],
            action = "inspect",
            operation = "linked-list",
            status = "Processing"
        }) {
            const snapshot = this.clone(nodes);

            return {
                title,
                explanation,
                codeLine,
                action,
                variables: this.clone(variables),
                scene: this.createScene(snapshot, {
                    pointers: this.clone(pointers),
                    operation,
                    status
                }),
                snapshot: {
                    nodes: snapshot,
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
                    `Linked List algorithm not found: ${id}`
                );
            }

            return algorithm.execute(input);
        }

        // =====================================
        // CREATE LINKED LIST
        // =====================================

        create(input = {}) {
            const values = this.validateArray(
                input.array || [10, 20, 30, 40]
            );

            const steps = [];
            const nodes = [];

            steps.push(this.createStep({
                title: "Initialize Linked List",
                explanation:
                    "Start with an empty linked list. Each node stores data and a reference to the next node.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                nodes,
                variables: {
                    head: null,
                    length: 0
                },
                action: "initialize",
                operation: "create"
            }));

            values.forEach((value, index) => {
                const node = {
                    id: `node-${index}`,
                    value,
                    next: null
                };

                if (nodes.length > 0) {
                    nodes[nodes.length - 1].next = node.id;
                }

                nodes.push(node);

                steps.push(this.createStep({
                    title: `Create Node ${index + 1}`,
                    explanation:
                        `Create a node containing ${value} and connect it to the previous node.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    nodes,
                    variables: {
                        newNode: value,
                        head: nodes[0].value,
                        length: nodes.length
                    },
                    pointers: [{
                        name: "newNode",
                        target: node.id
                    }],
                    action: "insert",
                    operation: "create"
                }));
            });

            steps.push(this.createStep({
                title: "Linked List Created",
                explanation:
                    `Successfully created a linked list with ${nodes.length} nodes.`,
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                nodes,
                variables: {
                    head: nodes.length ? nodes[0].value : null,
                    length: nodes.length
                },
                action: "complete",
                operation: "create",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // TRAVERSAL
        // =====================================

        traverse(input = {}) {
            const values = this.validateArray(
                input.array || [10, 20, 30, 40]
            );

            const nodes = this.createNodes(values);
            const steps = [];

            steps.push(this.createStep({
                title: "Start Traversal",
                explanation:
                    "Start from the head node and visit each node one by one.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                nodes,
                variables: {
                    current: nodes.length ? nodes[0].value : null,
                    visited: []
                },
                pointers: nodes.length ? [{
                    name: "current",
                    target: nodes[0].id
                }] : [],
                action: "initialize",
                operation: "traversal"
            }));

            const visited = [];

            nodes.forEach((node, index) => {
                node.state = "active";
                visited.push(node.value);

                steps.push(this.createStep({
                    title: `Visit Node ${index + 1}`,
                    explanation:
                        `Visit node containing ${node.value}.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    nodes,
                    variables: {
                        current: node.value,
                        index,
                        visited: [...visited]
                    },
                    pointers: [{
                        name: "current",
                        target: node.id
                    }],
                    action: "visit",
                    operation: "traversal"
                }));

                node.state = "visited";
            });

            steps.push(this.createStep({
                title: "Traversal Completed",
                explanation:
                    `All ${nodes.length} nodes have been visited.`,
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                nodes,
                variables: {
                    visited,
                    totalNodes: nodes.length
                },
                action: "complete",
                operation: "traversal",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // INSERT AT BEGINNING
        // =====================================

        insertBeginning(input = {}) {
            const values = this.validateArray(
                input.array || [20, 30, 40]
            );

            const value = input.value ?? 10;
            const nodes = this.createNodes(values);
            const steps = [];

            steps.push(this.createStep({
                title: "Start Insertion at Beginning",
                explanation:
                    `A new node containing ${value} will become the new head.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                nodes,
                variables: {
                    value,
                    head: nodes.length ? nodes[0].value : null
                },
                action: "initialize",
                operation: "insert-beginning"
            }));

            const newNode = {
                id: "new-node",
                value,
                next: nodes.length ? nodes[0].id : null
            };

            steps.push(this.createStep({
                title: "Create New Node",
                explanation:
                    `Create a new node containing ${value}.`,
                codeLine: {
                    python: 2,
                    javascript: 2,
                    cpp: 6,
                    java: 4
                },
                nodes: [...nodes, newNode],
                variables: {
                    newNode: value,
                    oldHead: nodes.length ? nodes[0].value : null
                },
                pointers: [{
                    name: "newNode",
                    target: "new-node"
                }],
                action: "create-node",
                operation: "insert-beginning"
            }));

            newNode.next = nodes.length ? nodes[0].id : null;
            nodes.unshift(newNode);

            steps.push(this.createStep({
                title: "Update Head Pointer",
                explanation:
                    "Point the head reference to the newly inserted node.",
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                nodes,
                variables: {
                    head: value,
                    length: nodes.length
                },
                pointers: [{
                    name: "head",
                    target: "new-node"
                }],
                action: "update-head",
                operation: "insert-beginning"
            }));

            steps.push(this.createStep({
                title: "Insertion Completed",
                explanation:
                    `${value} has been inserted at the beginning.`,
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                nodes,
                variables: {
                    head: value,
                    length: nodes.length
                },
                action: "complete",
                operation: "insert-beginning",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // INSERT AT END
        // =====================================

        insertEnd(input = {}) {
            const values = this.validateArray(
                input.array || [10, 20, 30]
            );

            const value = input.value ?? 40;
            const nodes = this.createNodes(values);
            const steps = [];

            steps.push(this.createStep({
                title: "Start Insertion at End",
                explanation:
                    "Traverse the linked list to locate the last node.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                nodes,
                variables: {
                    value,
                    length: nodes.length
                },
                action: "initialize",
                operation: "insert-end"
            }));

            for (let i = 0; i < nodes.length; i++) {
                nodes[i].state = "active";

                steps.push(this.createStep({
                    title: `Visit Node ${i + 1}`,
                    explanation:
                        `Check node ${nodes[i].value} to find the end of the list.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    nodes,
                    variables: {
                        current: nodes[i].value,
                        index: i
                    },
                    pointers: [{
                        name: "current",
                        target: nodes[i].id
                    }],
                    action: "traverse",
                    operation: "insert-end"
                }));

                nodes[i].state = "default";
            }

            const newNode = {
                id: `node-${nodes.length}`,
                value,
                next: null
            };

            if (nodes.length > 0) {
                nodes[nodes.length - 1].next = newNode.id;
            }

            nodes.push(newNode);

            steps.push(this.createStep({
                title: "Connect New Node",
                explanation:
                    `Set the previous last node's next pointer to the new node containing ${value}.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                nodes,
                variables: {
                    newNode: value,
                    tail: value,
                    length: nodes.length
                },
                pointers: [{
                    name: "tail",
                    target: newNode.id
                }],
                action: "insert",
                operation: "insert-end"
            }));

            steps.push(this.createStep({
                title: "Insertion Completed",
                explanation:
                    `${value} has been added at the end of the linked list.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                nodes,
                variables: {
                    tail: value,
                    length: nodes.length
                },
                action: "complete",
                operation: "insert-end",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // INSERT AT POSITION
        // =====================================

        insertPosition(input = {}) {
            const values = this.validateArray(
                input.array || [10, 20, 40, 50]
            );

            const value = input.value ?? 30;
            const position = this.validatePosition(
                input.position ?? 2,
                0,
                values.length
            );

            const nodes = this.createNodes(values);
            const steps = [];

            steps.push(this.createStep({
                title: "Start Positional Insertion",
                explanation:
                    `Insert ${value} at zero-based position ${position}.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                nodes,
                variables: {
                    position,
                    value
                },
                action: "initialize",
                operation: "insert-position"
            }));

            for (let i = 0; i < position; i++) {
                steps.push(this.createStep({
                    title: `Move to Position ${i}`,
                    explanation:
                        `Move current pointer to node at index ${i}.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    nodes,
                    variables: {
                        current: nodes[i].value,
                        index: i,
                        targetPosition: position
                    },
                    pointers: [{
                        name: "current",
                        target: nodes[i].id
                    }],
                    action: "traverse",
                    operation: "insert-position"
                }));
            }

            const newNode = {
                id: "inserted-node",
                value,
                next: position < nodes.length
                    ? nodes[position].id
                    : null
            };

            if (position > 0) {
                nodes[position - 1].next = newNode.id;
            }

            nodes.splice(position, 0, newNode);

            steps.push(this.createStep({
                title: "Insert New Node",
                explanation:
                    `Connect the new node at position ${position} and update the next references.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                nodes,
                variables: {
                    value,
                    position,
                    length: nodes.length
                },
                pointers: [{
                    name: "newNode",
                    target: newNode.id
                }],
                action: "insert",
                operation: "insert-position"
            }));

            steps.push(this.createStep({
                title: "Insertion Completed",
                explanation:
                    `Node ${value} has been inserted at position ${position}.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                nodes,
                variables: {
                    value,
                    position,
                    length: nodes.length
                },
                action: "complete",
                operation: "insert-position",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // DELETE FROM BEGINNING
        // =====================================

        deleteBeginning(input = {}) {
            const values = this.validateArray(
                input.array || [10, 20, 30, 40]
            );

            const nodes = this.createNodes(values);
            const steps = [];

            if (!nodes.length) {
                return [this.createStep({
                    title: "List Is Empty",
                    explanation:
                        "There is no node to delete.",
                    codeLine: {
                        python: 1,
                        javascript: 1,
                        cpp: 5,
                        java: 3
                    },
                    nodes,
                    action: "complete",
                    operation: "delete-beginning",
                    status: "Empty list"
                })];
            }

            const removed = nodes[0];

            steps.push(this.createStep({
                title: "Identify Head Node",
                explanation:
                    `The head node contains ${removed.value}.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                nodes,
                variables: {
                    head: removed.value
                },
                pointers: [{
                    name: "head",
                    target: removed.id
                }],
                action: "inspect",
                operation: "delete-beginning"
            }));

            nodes.shift();

            steps.push(this.createStep({
                title: "Move Head Pointer",
                explanation:
                    "Update head to point to the next node.",
                codeLine: {
                    python: 2,
                    javascript: 2,
                    cpp: 6,
                    java: 4
                },
                nodes,
                variables: {
                    removedValue: removed.value,
                    newHead: nodes.length ? nodes[0].value : null
                },
                pointers: nodes.length ? [{
                    name: "head",
                    target: nodes[0].id
                }] : [],
                action: "delete",
                operation: "delete-beginning"
            }));

            steps.push(this.createStep({
                title: "Deletion Completed",
                explanation:
                    `Node ${removed.value} has been removed from the beginning.`,
                codeLine: {
                    python: 2,
                    javascript: 2,
                    cpp: 6,
                    java: 4
                },
                nodes,
                variables: {
                    removedValue: removed.value,
                    length: nodes.length
                },
                action: "complete",
                operation: "delete-beginning",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // DELETE FROM END
        // =====================================

        deleteEnd(input = {}) {
            const values = this.validateArray(
                input.array || [10, 20, 30, 40]
            );

            const nodes = this.createNodes(values);
            const steps = [];

            if (!nodes.length) {
                return [this.createStep({
                    title: "List Is Empty",
                    explanation:
                        "There is no node to delete.",
                    codeLine: {
                        python: 1,
                        javascript: 1,
                        cpp: 5,
                        java: 3
                    },
                    nodes,
                    action: "complete",
                    operation: "delete-end",
                    status: "Empty list"
                })];
            }

            if (nodes.length === 1) {
                const removed = nodes.pop();

                steps.push(this.createStep({
                    title: "Delete Only Node",
                    explanation:
                        `The only node ${removed.value} is removed. The list becomes empty.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    nodes,
                    variables: {
                        removedValue: removed.value,
                        head: null
                    },
                    action: "delete",
                    operation: "delete-end"
                }));
            } else {
                for (let i = 0; i < nodes.length - 1; i++) {
                    steps.push(this.createStep({
                        title: `Traverse Node ${i}`,
                        explanation:
                            `Move through the list to find the second-last node.`,
                        codeLine: {
                            python: 3,
                            javascript: 3,
                            cpp: 7,
                            java: 5
                        },
                        nodes,
                        variables: {
                            current: nodes[i].value,
                            index: i
                        },
                        pointers: [{
                            name: "current",
                            target: nodes[i].id
                        }],
                        action: "traverse",
                        operation: "delete-end"
                    }));
                }

                const removed = nodes.pop();

                nodes[nodes.length - 1].next = null;

                steps.push(this.createStep({
                    title: "Remove Last Node",
                    explanation:
                        `Remove node ${removed.value} and set the previous node's next reference to null.`,
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 9,
                        java: 7
                    },
                    nodes,
                    variables: {
                        removedValue: removed.value,
                        newTail: nodes[nodes.length - 1].value
                    },
                    pointers: [{
                        name: "tail",
                        target: nodes[nodes.length - 1].id
                    }],
                    action: "delete",
                    operation: "delete-end"
                }));
            }

            steps.push(this.createStep({
                title: "Deletion Completed",
                explanation:
                    "The last node has been removed successfully.",
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                nodes,
                variables: {
                    length: nodes.length
                },
                action: "complete",
                operation: "delete-end",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // DELETE AT POSITION
        // =====================================

        deletePosition(input = {}) {
            const values = this.validateArray(
                input.array || [10, 20, 30, 40, 50]
            );

            if (!values.length) {
                throw new Error(
                    "Cannot delete from an empty linked list."
                );
            }

            const position = this.validatePosition(
                input.position ?? 2,
                0,
                values.length - 1
            );

            const nodes = this.createNodes(values);
            const steps = [];

            steps.push(this.createStep({
                title: "Start Positional Deletion",
                explanation:
                    `Delete the node at zero-based index ${position}.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                nodes,
                variables: {
                    position
                },
                action: "initialize",
                operation: "delete-position"
            }));

            for (let i = 0; i < position; i++) {
                steps.push(this.createStep({
                    title: `Move to Node ${i}`,
                    explanation:
                        "Traverse until reaching the node before the target.",
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    nodes,
                    variables: {
                        current: nodes[i].value,
                        index: i,
                        targetPosition: position
                    },
                    pointers: [{
                        name: "current",
                        target: nodes[i].id
                    }],
                    action: "traverse",
                    operation: "delete-position"
                }));
            }

            const removed = nodes.splice(position, 1)[0];

            if (position > 0) {
                nodes[position - 1].next = position < nodes.length
                    ? nodes[position].id
                    : null;
            }

            steps.push(this.createStep({
                title: "Reconnect Nodes",
                explanation:
                    `Remove node ${removed.value} and connect its previous node to its next node.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                nodes,
                variables: {
                    removedValue: removed.value,
                    position,
                    length: nodes.length
                },
                action: "delete",
                operation: "delete-position"
            }));

            steps.push(this.createStep({
                title: "Deletion Completed",
                explanation:
                    `Node ${removed.value} has been deleted from position ${position}.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                nodes,
                variables: {
                    removedValue: removed.value,
                    length: nodes.length
                },
                action: "complete",
                operation: "delete-position",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // SEARCH
        // =====================================

        search(input = {}) {
            const values = this.validateArray(
                input.array || [10, 20, 30, 40, 50]
            );

            const target = input.target ?? 30;
            const nodes = this.createNodes(values);
            const steps = [];

            steps.push(this.createStep({
                title: "Start Linked List Search",
                explanation:
                    `Search for value ${target} by visiting nodes sequentially.`,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                nodes,
                variables: {
                    target,
                    found: false
                },
                action: "initialize",
                operation: "search"
            }));

            let foundIndex = -1;

            for (let i = 0; i < nodes.length; i++) {
                nodes.forEach(node => {
                    node.state = "default";
                });

                nodes[i].state = "active";

                steps.push(this.createStep({
                    title: `Compare Node ${i}`,
                    explanation:
                        `Compare ${nodes[i].value} with target ${target}.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    nodes,
                    variables: {
                        current: nodes[i].value,
                        target,
                        index: i
                    },
                    pointers: [{
                        name: "current",
                        target: nodes[i].id
                    }],
                    action: "compare",
                    operation: "search"
                }));

                if (nodes[i].value === target) {
                    foundIndex = i;
                    nodes[i].state = "found";

                    steps.push(this.createStep({
                        title: "Target Found",
                        explanation:
                            `Value ${target} was found at index ${i}.`,
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 8,
                            java: 6
                        },
                        nodes,
                        variables: {
                            target,
                            foundIndex: i
                        },
                        pointers: [{
                            name: "found",
                            target: nodes[i].id
                        }],
                        action: "found",
                        operation: "search"
                    }));

                    break;
                }

                nodes[i].state = "visited";
            }

            steps.push(this.createStep({
                title: foundIndex >= 0
                    ? "Search Completed"
                    : "Value Not Found",
                explanation: foundIndex >= 0
                    ? `Target ${target} is at index ${foundIndex}.`
                    : `Target ${target} does not exist in this linked list.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                nodes,
                variables: {
                    target,
                    foundIndex,
                    found: foundIndex >= 0
                },
                action: "complete",
                operation: "search",
                status: foundIndex >= 0 ? "Found" : "Not found"
            }));

            return steps;
        }

        // =====================================
        // REVERSE LINKED LIST
        // =====================================

        reverse(input = {}) {
            const values = this.validateArray(
                input.array || [10, 20, 30, 40, 50]
            );

            const nodes = this.createNodes(values);
            const steps = [];

            let previous = null;
            let current = nodes.length ? nodes[0].id : null;
            let next = null;

            steps.push(this.createStep({
                title: "Start Linked List Reversal",
                explanation:
                    "Reverse the direction of each next pointer using three references: previous, current and next.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                nodes,
                variables: {
                    previous: null,
                    current: nodes.length ? nodes[0].value : null,
                    next: null
                },
                action: "initialize",
                operation: "reverse"
            }));

            let index = 0;

            while (current !== null) {
                const currentIndex = nodes.findIndex(
                    node => node.id === current
                );

                if (currentIndex === -1) {
                    break;
                }

                const currentNode = nodes[currentIndex];

                next = currentNode.next;

                steps.push(this.createStep({
                    title: "Store Next Node",
                    explanation:
                        `Save the next reference of node ${currentNode.value} before reversing its link.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    nodes,
                    variables: {
                        previous,
                        current: currentNode.value,
                        next: next
                            ? nodes.find(node => node.id === next)?.value
                            : null
                    },
                    pointers: [{
                        name: "current",
                        target: currentNode.id
                    }],
                    action: "store-next",
                    operation: "reverse"
                }));

                currentNode.next = previous;

                steps.push(this.createStep({
                    title: `Reverse Link at Node ${currentNode.value}`,
                    explanation:
                        `Change the next reference of ${currentNode.value} to point to its previous node.`,
                    codeLine: {
                        python: 4,
                        javascript: 4,
                        cpp: 8,
                        java: 6
                    },
                    nodes,
                    variables: {
                        previous,
                        current: currentNode.value,
                        next
                    },
                    pointers: [{
                        name: "current",
                        target: currentNode.id
                    }],
                    action: "reverse-link",
                    operation: "reverse"
                }));

                previous = current;
                current = next;

                steps.push(this.createStep({
                    title: "Move Pointers Forward",
                    explanation:
                        "Move previous and current references to the next positions.",
                    codeLine: {
                        python: 5,
                        javascript: 5,
                        cpp: 9,
                        java: 7
                    },
                    nodes,
                    variables: {
                        previous: previous
                            ? nodes.find(node => node.id === previous)?.value
                            : null,
                        current: current
                            ? nodes.find(node => node.id === current)?.value
                            : null
                    },
                    pointers: [
                        ...(previous ? [{
                            name: "previous",
                            target: previous
                        }] : []),
                        ...(current ? [{
                            name: "current",
                            target: current
                        }] : [])
                    ],
                    action: "move-pointers",
                    operation: "reverse"
                }));

                index++;
            }

            const reversedNodes = [];

            let pointer = previous;

            while (pointer !== null) {
                const node = nodes.find(
                    item => item.id === pointer
                );

                if (!node) break;

                reversedNodes.push(node);
                pointer = node.next;
            }

            steps.push(this.createStep({
                title: "Update Head",
                explanation:
                    "The previous pointer now points to the new head of the reversed linked list.",
                codeLine: {
                    python: 6,
                    javascript: 6,
                    cpp: 10,
                    java: 8
                },
                nodes: reversedNodes,
                variables: {
                    newHead: reversedNodes.length
                        ? reversedNodes[0].value
                        : null,
                    length: reversedNodes.length
                },
                pointers: reversedNodes.length ? [{
                    name: "head",
                    target: reversedNodes[0].id
                }] : [],
                action: "update-head",
                operation: "reverse"
            }));

            steps.push(this.createStep({
                title: "Reversal Completed",
                explanation:
                    "All links have been reversed successfully.",
                codeLine: {
                    python: 6,
                    javascript: 6,
                    cpp: 10,
                    java: 8
                },
                nodes: reversedNodes,
                variables: {
                    reversedValues: reversedNodes.map(
                        node => node.value
                    )
                },
                action: "complete",
                operation: "reverse",
                status: "Completed"
            }));

            return steps;
        }

        // =====================================
        // REGISTER ALGORITHMS
        // =====================================

        registerAlgorithms() {

            this.register("linked-list-create", {
                title: "Create Linked List",
                description:
                    "Create nodes and connect them using next references.",
                complexity: {
                    time: "O(n)",
                    space: "O(n)"
                },
                execute: input => this.create(input)
            });

            this.register("linked-list-traversal", {
                title: "Linked List Traversal",
                description:
                    "Visit every node from head to tail.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.traverse(input)
            });

            this.register("linked-list-insert-beginning", {
                title: "Insert at Beginning",
                description:
                    "Insert a new node before the current head.",
                complexity: {
                    time: "O(1)",
                    space: "O(1)"
                },
                execute: input => this.insertBeginning(input)
            });

            this.register("linked-list-insert-end", {
                title: "Insert at End",
                description:
                    "Traverse to the final node and append a new node.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.insertEnd(input)
            });

            this.register("linked-list-insert-position", {
                title: "Insert at Position",
                description:
                    "Insert a node at a selected zero-based position.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.insertPosition(input)
            });

            this.register("linked-list-delete-beginning", {
                title: "Delete from Beginning",
                description:
                    "Remove the head node and move head to the next node.",
                complexity: {
                    time: "O(1)",
                    space: "O(1)"
                },
                execute: input => this.deleteBeginning(input)
            });

            this.register("linked-list-delete-end", {
                title: "Delete from End",
                description:
                    "Find and remove the final node.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.deleteEnd(input)
            });

            this.register("linked-list-delete-position", {
                title: "Delete at Position",
                description:
                    "Remove a node at a selected zero-based position.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.deletePosition(input)
            });

            this.register("linked-list-search", {
                title: "Search Linked List",
                description:
                    "Find a target value using sequential traversal.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.search(input)
            });

            this.register("linked-list-reverse", {
                title: "Reverse Linked List",
                description:
                    "Reverse all next references using three pointers.",
                complexity: {
                    time: "O(n)",
                    space: "O(1)"
                },
                execute: input => this.reverse(input)
            });
        }
    }

    // =====================================
    // GLOBAL EXPORT
    // =====================================

    global.LinkedListAlgorithms = LinkedListAlgorithms;

    // =====================================
    // COMMONJS EXPORT
    // =====================================

    if (
        typeof module !== "undefined" &&
        module.exports
    ) {
        module.exports = LinkedListAlgorithms;
    }

})(typeof window !== "undefined" ? window : globalThis);
