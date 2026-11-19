
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/algorithms/graphAlgorithms.js
 *
 * Graph Algorithms:
 * BFS, DFS, Dijkstra, Cycle Detection,
 * Topological Sort and Connected Components.
 */

(function (global) {
    "use strict";

    class GraphAlgorithms {

        constructor() {
            this.algorithms = new Map();
            this.registerAlgorithms();
        }

        // =====================================
        // VALIDATION AND GRAPH UTILITIES
        // =====================================

        validateGraph(input = {}) {
            const rawEdges = input.edges || [
                [0, 1],
                [0, 2],
                [1, 3],
                [1, 4],
                [2, 5],
                [3, 4],
                [4, 5]
            ];

            if (!Array.isArray(rawEdges)) {
                throw new TypeError("Edges must be an array.");
            }

            if (rawEdges.length > 200) {
                throw new RangeError("Maximum 200 edges are supported.");
            }

            const adjacency = new Map();

            const addNode = node => {
                const key = String(node);

                if (!adjacency.has(key)) {
                    adjacency.set(key, []);
                }
            };

            const nodes = input.nodes || [];

            if (!Array.isArray(nodes)) {
                throw new TypeError("Nodes must be an array.");
            }

            nodes.forEach(addNode);

            rawEdges.forEach(edge => {
                if (!Array.isArray(edge) || edge.length < 2) {
                    throw new TypeError(
                        "Every edge must contain two node values."
                    );
                }

                const from = String(edge[0]);
                const to = String(edge[1]);

                addNode(from);
                addNode(to);

                if (!adjacency.get(from).includes(to)) {
                    adjacency.get(from).push(to);
                }

                if (!input.directed) {
                    if (!adjacency.get(to).includes(from)) {
                        adjacency.get(to).push(from);
                    }
                }
            });

            adjacency.forEach(neighbors => {
                neighbors.sort((a, b) =>
                    a.localeCompare(b, undefined, { numeric: true })
                );
            });

            return adjacency;
        }

        getStartNode(adjacency, input = {}) {
            const start = String(input.start ?? adjacency.keys().next().value ?? "");

            if (!adjacency.has(start)) {
                throw new Error(`Start node "${start}" does not exist.`);
            }

            return start;
        }

        getNodeOrder(adjacency) {
            return Array.from(adjacency.keys()).sort((a, b) =>
                a.localeCompare(b, undefined, { numeric: true })
            );
        }

        getGraphScene(adjacency, state = {}) {
            const nodes = [];
            const edges = [];
            const visited = state.visited || [];
            const active = state.active ?? null;
            const queue = state.queue || [];
            const stack = state.stack || [];
            const distances = state.distances || {};

            const allNodes = this.getNodeOrder(adjacency);

            allNodes.forEach((node, index) => {
                let nodeState = "default";

                if (visited.includes(node)) {
                    nodeState = "visited";
                }

                if (node === active) {
                    nodeState = "active";
                }

                if (queue.includes(node)) {
                    nodeState = "queued";
                }

                if (stack.includes(node)) {
                    nodeState = "stack";
                }

                nodes.push({
                    id: `graph-node-${node}`,
                    value: node,
                    label: node,
                    state: nodeState,
                    distance: distances[node] ?? null,
                    index
                });

                adjacency.get(node).forEach(neighbor => {
                    if (allNodes.includes(neighbor)) {
                        const isDirected = Boolean(state.directed);

                        if (
                            isDirected ||
                            node.localeCompare(
                                neighbor,
                                undefined,
                                { numeric: true }
                            ) <= 0
                        ) {
                            edges.push({
                                from: `graph-node-${node}`,
                                to: `graph-node-${neighbor}`,
                                weight:
                                    state.weights?.[`${node}->${neighbor}`] ?? 1,
                                state:
                                    state.currentEdge?.from === node &&
                                    state.currentEdge?.to === neighbor
                                        ? "active"
                                        : "default"
                            });
                        }
                    }
                });
            });

            return {
                type: "graph",
                items: nodes,
                nodes,
                edges,
                pointers: active === null
                    ? []
                    : [{ name: "Current", target: `graph-node-${active}` }],
                status: state.status || "Processing",
                meta: {
                    directed: Boolean(state.directed),
                    visitedCount: visited.length,
                    nodeCount: allNodes.length
                }
            };
        }

        createStep({
            title,
            explanation,
            codeLine,
            adjacency,
            action = "inspect",
            variables = {},
            state = {}
        }) {
            const scene = this.getGraphScene(adjacency, state);

            return {
                title,
                explanation,
                codeLine,
                action,
                variables: JSON.parse(JSON.stringify(variables)),
                scene,
                snapshot: {
                    variables: JSON.parse(JSON.stringify(variables)),
                    graph: {
                        nodes: scene.nodes,
                        edges: scene.edges
                    }
                }
            };
        }

        createEmptyStep(title, explanation) {
            return {
                title,
                explanation,
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                action: "empty",
                variables: {},
                scene: {
                    type: "graph",
                    items: [],
                    nodes: [],
                    edges: [],
                    pointers: [],
                    status: "Empty",
                    meta: {}
                },
                snapshot: {}
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
                throw new Error(`Graph algorithm not found: ${id}`);
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
        // 1. BREADTH FIRST SEARCH
        // =====================================

        bfs(input = {}) {
            const adjacency = this.validateGraph(input);
            const start = this.getStartNode(adjacency, input);

            const queue = [start];
            const visited = [];
            const discovered = new Set([start]);
            const steps = [];

            steps.push(this.createStep({
                title: "Initialize BFS",
                explanation:
                    "BFS explores a graph level by level using a queue.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                adjacency,
                action: "initialize",
                variables: {
                    start,
                    queue: [...queue],
                    visited: []
                },
                state: {
                    queue
                }
            }));

            while (queue.length > 0) {
                const current = queue.shift();
                visited.push(current);

                steps.push(this.createStep({
                    title: `Visit Node ${current}`,
                    explanation:
                        `Remove ${current} from the queue and mark it as visited.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    adjacency,
                    action: "visit",
                    variables: {
                        current,
                        queue: [...queue],
                        visited: [...visited]
                    },
                    state: {
                        active: current,
                        visited,
                        queue
                    }
                }));

                adjacency.get(current).forEach(neighbor => {
                    if (!discovered.has(neighbor)) {
                        discovered.add(neighbor);
                        queue.push(neighbor);

                        steps.push(this.createStep({
                            title: `Enqueue ${neighbor}`,
                            explanation:
                                `${neighbor} is an unvisited neighbor of ${current}. Add it to the queue.`,
                            codeLine: {
                                python: 3,
                                javascript: 3,
                                cpp: 7,
                                java: 5
                            },
                            adjacency,
                            action: "enqueue",
                            variables: {
                                current,
                                neighbor,
                                queue: [...queue],
                                visited: [...visited]
                            },
                            state: {
                                active: current,
                                visited,
                                queue
                            }
                        }));
                    }
                });
            }

            steps.push(this.createStep({
                title: "BFS Completed",
                explanation:
                    `BFS traversal order: ${visited.join(" → ")}.`,
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                adjacency,
                action: "complete",
                variables: {
                    traversal: visited
                },
                state: {
                    visited,
                    status: "Completed"
                }
            }));

            return steps;
        }

        // =====================================
        // 2. DEPTH FIRST SEARCH
        // =====================================

        dfs(input = {}) {
            const adjacency = this.validateGraph(input);
            const start = this.getStartNode(adjacency, input);

            const visited = [];
            const steps = [];

            steps.push(this.createStep({
                title: "Initialize DFS",
                explanation:
                    "DFS explores one path as deeply as possible before backtracking.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                adjacency,
                action: "initialize",
                variables: {
                    start,
                    visited: []
                },
                state: {
                    stack: [start]
                }
            }));

            const visit = (node, path) => {
                visited.push(node);

                steps.push(this.createStep({
                    title: `Visit ${node}`,
                    explanation:
                        `Mark ${node} as visited and explore its unvisited neighbors.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    adjacency,
                    action: "visit",
                    variables: {
                        current: node,
                        path: [...path],
                        visited: [...visited]
                    },
                    state: {
                        active: node,
                        visited,
                        stack: [...path]
                    }
                }));

                adjacency.get(node).forEach(neighbor => {
                    if (!visited.includes(neighbor)) {
                        steps.push(this.createStep({
                            title: `Explore ${neighbor}`,
                            explanation:
                                `Move from ${node} to the unvisited neighbor ${neighbor}.`,
                            codeLine: {
                                python: 3,
                                javascript: 3,
                                cpp: 7,
                                java: 5
                            },
                            adjacency,
                            action: "explore",
                            variables: {
                                from: node,
                                to: neighbor
                            },
                            state: {
                                active: neighbor,
                                visited,
                                stack: [...path, neighbor]
                            }
                        }));

                        visit(neighbor, [...path, neighbor]);
                    }
                });

                steps.push(this.createStep({
                    title: `Backtrack from ${node}`,
                    explanation:
                        `All reachable unvisited neighbors of ${node} have been explored.`,
                    codeLine: {
                        python: 4,
                        javascript: 4,
                        cpp: 8,
                        java: 6
                    },
                    adjacency,
                    action: "backtrack",
                    variables: {
                        current: node,
                        visited: [...visited]
                    },
                    state: {
                        active: node,
                        visited,
                        stack: path.slice(0, -1)
                    }
                }));
            };

            visit(start, [start]);

            steps.push(this.createStep({
                title: "DFS Completed",
                explanation:
                    `DFS traversal order: ${visited.join(" → ")}.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                adjacency,
                action: "complete",
                variables: {
                    traversal: visited
                },
                state: {
                    visited,
                    status: "Completed"
                }
            }));

            return steps;
        }

        // =====================================
        // WEIGHTED GRAPH UTILITIES
        // =====================================

        validateWeightedGraph(input = {}) {
            const edges = input.edges || [
                ["A", "B", 4],
                ["A", "C", 2],
                ["B", "C", 1],
                ["B", "D", 5],
                ["C", "D", 8],
                ["C", "E", 10],
                ["D", "E", 2]
            ];

            if (!Array.isArray(edges)) {
                throw new TypeError("Weighted edges must be an array.");
            }

            if (edges.length > 200) {
                throw new RangeError("Maximum 200 edges are supported.");
            }

            const adjacency = new Map();

            (input.nodes || []).forEach(node => {
                adjacency.set(String(node), []);
            });

            edges.forEach(edge => {
                if (!Array.isArray(edge) || edge.length < 3) {
                    throw new TypeError(
                        "Weighted edge format must be [from, to, weight]."
                    );
                }

                const from = String(edge[0]);
                const to = String(edge[1]);
                const weight = Number(edge[2]);

                if (!Number.isFinite(weight) || weight < 0) {
                    throw new RangeError(
                        "Dijkstra requires non-negative finite weights."
                    );
                }

                if (!adjacency.has(from)) adjacency.set(from, []);
                if (!adjacency.has(to)) adjacency.set(to, []);

                adjacency.get(from).push({ node: to, weight });

                if (!input.directed) {
                    adjacency.get(to).push({
                        node: from,
                        weight
                    });
                }
            });

            return adjacency;
        }

        getWeightedScene(adjacency, state = {}) {
            const nodes = [];
            const edges = [];

            const visited = state.visited || [];
            const active = state.active ?? null;
            const distances = state.distances || {};

            const allNodes = Array.from(adjacency.keys()).sort();

            allNodes.forEach((node, index) => {
                nodes.push({
                    id: `graph-node-${node}`,
                    value: node,
                    label: node,
                    state:
                        node === active
                            ? "active"
                            : visited.includes(node)
                                ? "visited"
                                : "default",
                    distance: distances[node] ?? Infinity,
                    index
                });

                adjacency.get(node).forEach(edge => {
                    if (
                        state.directed ||
                        node.localeCompare(edge.node) <= 0
                    ) {
                        edges.push({
                            from: `graph-node-${node}`,
                            to: `graph-node-${edge.node}`,
                            weight: edge.weight,
                            state:
                                state.currentEdge?.from === node &&
                                state.currentEdge?.to === edge.node
                                    ? "active"
                                    : "default"
                        });
                    }
                });
            });

            return {
                type: "graph",
                items: nodes,
                nodes,
                edges,
                pointers: active === null
                    ? []
                    : [{
                        name: "Current",
                        target: `graph-node-${active}`
                    }],
                status: state.status || "Processing",
                meta: {
                    directed: Boolean(state.directed),
                    weighted: true
                }
            };
        }

        weightedStep({
            title,
            explanation,
            codeLine,
            adjacency,
            variables = {},
            state = {},
            action = "inspect"
        }) {
            const scene = this.getWeightedScene(adjacency, state);

            return {
                title,
                explanation,
                codeLine,
                action,
                variables: JSON.parse(JSON.stringify(variables)),
                scene,
                snapshot: {
                    variables: JSON.parse(JSON.stringify(variables)),
                    graph: {
                        nodes: scene.nodes,
                        edges: scene.edges
                    }
                }
            };
        }

        // =====================================
        // 3. DIJKSTRA SHORTEST PATH
        // =====================================

        dijkstra(input = {}) {
            const adjacency = this.validateWeightedGraph(input);

            const start = String(
                input.start ?? adjacency.keys().next().value ?? ""
            );

            const target = input.target === undefined
                ? null
                : String(input.target);

            if (!adjacency.has(start)) {
                throw new Error(`Start node "${start}" does not exist.`);
            }

            if (target !== null && !adjacency.has(target)) {
                throw new Error(`Target node "${target}" does not exist.`);
            }

            const distances = {};
            const previous = {};
            const visited = [];
            const steps = [];

            adjacency.forEach((_, node) => {
                distances[node] = Infinity;
                previous[node] = null;
            });

            distances[start] = 0;

            steps.push(this.weightedStep({
                title: "Initialize Dijkstra",
                explanation:
                    "Set the start node distance to 0 and all other distances to infinity.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                adjacency,
                variables: {
                    start,
                    distances: { ...distances }
                },
                state: {
                    distances,
                    visited
                },
                action: "initialize"
            }));

            while (true) {
                let current = null;
                let smallestDistance = Infinity;

                adjacency.forEach((_, node) => {
                    if (
                        !visited.includes(node) &&
                        distances[node] < smallestDistance
                    ) {
                        current = node;
                        smallestDistance = distances[node];
                    }
                });

                if (current === null) break;

                visited.push(current);

                steps.push(this.weightedStep({
                    title: `Select Node ${current}`,
                    explanation:
                        `Choose the unvisited node with the smallest known distance: ${smallestDistance}.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    adjacency,
                    variables: {
                        current,
                        distance: smallestDistance,
                        visited: [...visited]
                    },
                    state: {
                        active: current,
                        distances,
                        visited
                    },
                    action: "select"
                }));

                if (current === target) {
                    steps.push(this.weightedStep({
                        title: "Target Reached",
                        explanation:
                            `The shortest distance to ${target} has been finalized.`,
                        codeLine: {
                            python: 3,
                            javascript: 3,
                            cpp: 7,
                            java: 5
                        },
                        adjacency,
                        variables: {
                            target,
                            distance: distances[target]
                        },
                        state: {
                            active: target,
                            distances,
                            visited,
                            status: "Target Reached"
                        },
                        action: "found"
                    }));

                    break;
                }

                adjacency.get(current).forEach(edge => {
                    if (visited.includes(edge.node)) return;

                    const newDistance =
                        distances[current] + edge.weight;

                    const oldDistance = distances[edge.node];

                    if (newDistance < oldDistance) {
                        distances[edge.node] = newDistance;
                        previous[edge.node] = current;
                    }

                    steps.push(this.weightedStep({
                        title: `Relax Edge ${current} → ${edge.node}`,
                        explanation:
                            newDistance < oldDistance
                                ? `New distance ${newDistance} is shorter than ${oldDistance}. Update the distance.`
                                : `New distance ${newDistance} is not shorter than ${oldDistance}. Keep the existing distance.`,
                        codeLine: {
                            python: 4,
                            javascript: 4,
                            cpp: 8,
                            java: 6
                        },
                        adjacency,
                        variables: {
                            from: current,
                            to: edge.node,
                            weight: edge.weight,
                            oldDistance,
                            newDistance,
                            updated: newDistance < oldDistance,
                            distances: { ...distances }
                        },
                        state: {
                            active: edge.node,
                            currentEdge: {
                                from: current,
                                to: edge.node
                            },
                            distances,
                            visited
                        },
                        action: "relax"
                    }));
                });
            }

            let path = [];

            if (target !== null && Number.isFinite(distances[target])) {
                let current = target;

                while (current !== null) {
                    path.unshift(current);
                    current = previous[current];
                }
            }

            steps.push(this.weightedStep({
                title: "Dijkstra Completed",
                explanation:
                    target === null
                        ? "Shortest distances from the start node have been calculated."
                        : path.length
                            ? `Shortest path: ${path.join(" → ")}. Total distance: ${distances[target]}.`
                            : `No path exists from ${start} to ${target}.`,
                codeLine: {
                    python: 5,
                    javascript: 5,
                    cpp: 9,
                    java: 7
                },
                adjacency,
                variables: {
                    start,
                    target,
                    distances: { ...distances },
                    shortestPath: path
                },
                state: {
                    distances,
                    visited,
                    status: "Completed"
                },
                action: "complete"
            }));

            return steps;
        }

        // =====================================
        // 4. UNDIRECTED CYCLE DETECTION
        // =====================================

        detectUndirectedCycle(input = {}) {
            const adjacency = this.validateGraph({
                ...input,
                directed: false
            });

            const visited = new Set();
            const steps = [];
            let cycleFound = false;

            const dfs = (node, parent) => {
                visited.add(node);

                steps.push(this.createStep({
                    title: `Visit ${node}`,
                    explanation:
                        "Explore neighbors and remember the parent node.",
                    codeLine: {
                        python: 1,
                        javascript: 1,
                        cpp: 5,
                        java: 3
                    },
                    adjacency,
                    action: "visit",
                    variables: {
                        current: node,
                        parent,
                        visited: [...visited]
                    },
                    state: {
                        active: node,
                        visited: [...visited]
                    }
                }));

                for (const neighbor of adjacency.get(node)) {
                    if (!visited.has(neighbor)) {
                        if (dfs(neighbor, node)) {
                            return true;
                        }
                    } else if (neighbor !== parent) {
                        steps.push(this.createStep({
                            title: "Cycle Detected",
                            explanation:
                                `An already visited neighbor ${neighbor} is not the parent of ${node}. A cycle exists.`,
                            codeLine: {
                                python: 2,
                                javascript: 2,
                                cpp: 6,
                                java: 4
                            },
                            adjacency,
                            action: "cycle-found",
                            variables: {
                                current: node,
                                neighbor,
                                parent
                            },
                            state: {
                                active: node,
                                visited: [...visited],
                                status: "Cycle Found"
                            }
                        }));

                        return true;
                    }
                }

                return false;
            };

            for (const node of adjacency.keys()) {
                if (!visited.has(node) && dfs(node, null)) {
                    cycleFound = true;
                    break;
                }
            }

            steps.push(this.createStep({
                title: cycleFound
                    ? "Cycle Exists"
                    : "No Cycle Found",
                explanation: cycleFound
                    ? "The undirected graph contains at least one cycle."
                    : "The undirected graph does not contain any cycle.",
                codeLine: {
                    python: 3,
                    javascript: 3,
                    cpp: 7,
                    java: 5
                },
                adjacency,
                action: "complete",
                variables: {
                    hasCycle: cycleFound
                },
                state: {
                    visited: [...visited],
                    status: "Completed"
                }
            }));

            return steps;
        }

        // =====================================
        // 5. DIRECTED CYCLE DETECTION
        // =====================================

        detectDirectedCycle(input = {}) {
            const adjacency = this.validateGraph({
                ...input,
                directed: true
            });

            const visited = new Set();
            const recursionStack = new Set();
            const steps = [];

            let cycleFound = false;

            const dfs = node => {
                visited.add(node);
                recursionStack.add(node);

                steps.push(this.createStep({
                    title: `Enter ${node}`,
                    explanation:
                        "Mark this node visited and add it to the current recursion path.",
                    codeLine: {
                        python: 1,
                        javascript: 1,
                        cpp: 5,
                        java: 3
                    },
                    adjacency,
                    action: "visit",
                    variables: {
                        current: node,
                        recursionStack: [...recursionStack]
                    },
                    state: {
                        active: node,
                        visited: [...visited],
                        stack: [...recursionStack],
                        directed: true
                    }
                }));

                for (const neighbor of adjacency.get(node)) {
                    if (!visited.has(neighbor)) {
                        if (dfs(neighbor)) return true;
                    } else if (recursionStack.has(neighbor)) {
                        steps.push(this.createStep({
                            title: "Directed Cycle Detected",
                            explanation:
                                `An edge points back to ${neighbor}, which is already in the active recursion path.`,
                            codeLine: {
                                python: 2,
                                javascript: 2,
                                cpp: 6,
                                java: 4
                            },
                            adjacency,
                            action: "cycle-found",
                            variables: {
                                from: node,
                                to: neighbor
                            },
                            state: {
                                active: node,
                                visited: [...visited],
                                stack: [...recursionStack],
                                directed: true,
                                status: "Cycle Found"
                            }
                        }));

                        return true;
                    }
                }

                recursionStack.delete(node);

                steps.push(this.createStep({
                    title: `Exit ${node}`,
                    explanation:
                        "All outgoing edges have been explored. Remove the node from the active recursion path.",
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    adjacency,
                    action: "backtrack",
                    variables: {
                        current: node,
                        recursionStack: [...recursionStack]
                    },
                    state: {
                        active: node,
                        visited: [...visited],
                        stack: [...recursionStack],
                        directed: true
                    }
                }));

                return false;
            };

            for (const node of adjacency.keys()) {
                if (!visited.has(node) && dfs(node)) {
                    cycleFound = true;
                    break;
                }
            }

            steps.push(this.createStep({
                title: cycleFound
                    ? "Directed Cycle Exists"
                    : "No Directed Cycle",
                explanation: cycleFound
                    ? "The directed graph contains a back edge and therefore a cycle."
                    : "No directed cycle was found.",
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                adjacency,
                action: "complete",
                variables: {
                    hasCycle: cycleFound
                },
                state: {
                    visited: [...visited],
                    directed: true,
                    status: "Completed"
                }
            }));

            return steps;
        }

        // =====================================
        // 6. TOPOLOGICAL SORTING
        // =====================================

        topologicalSort(input = {}) {
            const adjacency = this.validateGraph({
                ...input,
                directed: true
            });

            const indegree = new Map();

            adjacency.forEach((_, node) => {
                indegree.set(node, 0);
            });

            adjacency.forEach(neighbors => {
                neighbors.forEach(neighbor => {
                    indegree.set(
                        neighbor,
                        indegree.get(neighbor) + 1
                    );
                });
            });

            const queue = [];

            indegree.forEach((degree, node) => {
                if (degree === 0) queue.push(node);
            });

            const result = [];
            const steps = [];

            steps.push(this.createStep({
                title: "Initialize Topological Sort",
                explanation:
                    "Calculate indegrees and place all zero-indegree nodes in the queue.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                adjacency,
                action: "initialize",
                variables: {
                    indegree: Object.fromEntries(indegree),
                    queue: [...queue]
                },
                state: {
                    queue,
                    directed: true
                }
            }));

            while (queue.length > 0) {
                const current = queue.shift();
                result.push(current);

                steps.push(this.createStep({
                    title: `Select ${current}`,
                    explanation:
                        `${current} has indegree zero. Add it to the topological ordering.`,
                    codeLine: {
                        python: 2,
                        javascript: 2,
                        cpp: 6,
                        java: 4
                    },
                    adjacency,
                    action: "visit",
                    variables: {
                        current,
                        result: [...result],
                        queue: [...queue]
                    },
                    state: {
                        active: current,
                        visited: result,
                        queue,
                        directed: true
                    }
                }));

                adjacency.get(current).forEach(neighbor => {
                    indegree.set(
                        neighbor,
                        indegree.get(neighbor) - 1
                    );

                    steps.push(this.createStep({
                        title: `Update Indegree of ${neighbor}`,
                        explanation:
                            `Remove the dependency from ${current}. Indegree of ${neighbor} becomes ${indegree.get(neighbor)}.`,
                        codeLine: {
                            python: 3,
                            javascript: 3,
                            cpp: 7,
                            java: 5
                        },
                        adjacency,
                        action: "update-indegree",
                        variables: {
                            node: neighbor,
                            indegree: indegree.get(neighbor)
                        },
                        state: {
                            active: neighbor,
                            visited: result,
                            queue,
                            directed: true
                        }
                    }));

                    if (indegree.get(neighbor) === 0) {
                        queue.push(neighbor);
                    }
                });
            }

            const hasCycle = result.length !== adjacency.size;

            steps.push(this.createStep({
                title: hasCycle
                    ? "Topological Sort Not Possible"
                    : "Topological Sort Completed",
                explanation: hasCycle
                    ? "The graph contains a directed cycle. A valid topological ordering does not exist."
                    : `Valid topological order: ${result.join(" → ")}.`,
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                adjacency,
                action: hasCycle ? "cycle-found" : "complete",
                variables: {
                    ordering: result,
                    hasCycle
                },
                state: {
                    visited: result,
                    directed: true,
                    status: "Completed"
                }
            }));

            return steps;
        }

        // =====================================
        // 7. CONNECTED COMPONENTS
        // =====================================

        connectedComponents(input = {}) {
            const adjacency = this.validateGraph({
                ...input,
                directed: false
            });

            const visited = new Set();
            const components = [];
            const steps = [];

            steps.push(this.createStep({
                title: "Find Connected Components",
                explanation:
                    "A connected component is a group of nodes where every node can reach every other node in that group.",
                codeLine: {
                    python: 1,
                    javascript: 1,
                    cpp: 5,
                    java: 3
                },
                adjacency,
                action: "initialize",
                variables: {
                    components: []
                }
            }));

            for (const start of adjacency.keys()) {
                if (visited.has(start)) continue;

                const component = [];
                const stack = [start];

                while (stack.length > 0) {
                    const current = stack.pop();

                    if (visited.has(current)) continue;

                    visited.add(current);
                    component.push(current);

                    steps.push(this.createStep({
                        title: `Explore ${current}`,
                        explanation:
                            "Add this node to the current connected component.",
                        codeLine: {
                            python: 2,
                            javascript: 2,
                            cpp: 6,
                            java: 4
                        },
                        adjacency,
                        action: "visit",
                        variables: {
                            current,
                            component: [...component],
                            components: JSON.parse(
                                JSON.stringify(components)
                            )
                        },
                        state: {
                            active: current,
                            visited: [...visited],
                            stack
                        }
                    }));

                    adjacency.get(current).forEach(neighbor => {
                        if (!visited.has(neighbor)) {
                            stack.push(neighbor);
                        }
                    });
                }

                components.push(component);

                steps.push(this.createStep({
                    title: "Component Completed",
                    explanation:
                        `Found component: ${component.join(", ")}.`,
                    codeLine: {
                        python: 3,
                        javascript: 3,
                        cpp: 7,
                        java: 5
                    },
                    adjacency,
                    action: "component-complete",
                    variables: {
                        component: [...component],
                        components: JSON.parse(
                            JSON.stringify(components)
                        )
                    },
                    state: {
                        visited: [...visited],
                        status: "Component Completed"
                    }
                }));
            }

            steps.push(this.createStep({
                title: "All Components Found",
                explanation:
                    `The graph contains ${components.length} connected component(s).`,
                codeLine: {
                    python: 4,
                    javascript: 4,
                    cpp: 8,
                    java: 6
                },
                adjacency,
                action: "complete",
                variables: {
                    components,
                    count: components.length
                },
                state: {
                    visited: [...visited],
                    status: "Completed"
                }
            }));

            return steps;
        }

        // =====================================
        // REGISTER ALL ALGORITHMS
        // =====================================

        registerAlgorithms() {

            this.register("graph-bfs", {
                title: "Breadth First Search (BFS)",
                description:
                    "Explore a graph level by level using a queue.",
                complexity: {
                    time: "O(V + E)",
                    space: "O(V)"
                },
                execute: input => this.bfs(input)
            });

            this.register("graph-dfs", {
                title: "Depth First Search (DFS)",
                description:
                    "Explore deeply using recursion and backtracking.",
                complexity: {
                    time: "O(V + E)",
                    space: "O(V)"
                },
                execute: input => this.dfs(input)
            });

            this.register("graph-dijkstra", {
                title: "Dijkstra's Shortest Path",
                description:
                    "Find shortest distances in a weighted graph with non-negative edge weights.",
                complexity: {
                    time: "O(V² + E)",
                    space: "O(V)"
                },
                execute: input => this.dijkstra(input)
            });

            this.register("graph-undirected-cycle", {
                title: "Undirected Cycle Detection",
                description:
                    "Detect a cycle using DFS and parent tracking.",
                complexity: {
                    time: "O(V + E)",
                    space: "O(V)"
                },
                execute: input => this.detectUndirectedCycle(input)
            });

            this.register("graph-directed-cycle", {
                title: "Directed Cycle Detection",
                description:
                    "Detect directed cycles using the recursion stack.",
                complexity: {
                    time: "O(V + E)",
                    space: "O(V)"
                },
                execute: input => this.detectDirectedCycle(input)
            });

            this.register("graph-topological-sort", {
                title: "Topological Sorting",
                description:
                    "Order vertices of a directed acyclic graph using Kahn's algorithm.",
                complexity: {
                    time: "O(V + E)",
                    space: "O(V)"
                },
                execute: input => this.topologicalSort(input)
            });

            this.register("graph-connected-components", {
                title: "Connected Components",
                description:
                    "Find all connected components in an undirected graph.",
                complexity: {
                    time: "O(V + E)",
                    space: "O(V)"
                },
                execute: input => this.connectedComponents(input)
            });
        }
    }

    // =====================================
    // GLOBAL EXPORT
    // =====================================

    global.GraphAlgorithms = GraphAlgorithms;

    // =====================================
    // COMMONJS EXPORT
    // =====================================

    if (
        typeof module !== "undefined" &&
        module.exports
    ) {
        module.exports = GraphAlgorithms;
    }

})(typeof window !== "undefined" ? window : globalThis);
