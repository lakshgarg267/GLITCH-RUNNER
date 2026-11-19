
/**
 * GLITCH-RUNNER
 * DSA VISUAL LEARNING SYSTEM
 *
 * FILE: canvasRenderer.js
 *
 * PURPOSE:
 * Complete Canvas 2D rendering engine for DSA.
 *
 * Supports:
 * - Animated array characters
 * - Sorting bars and swaps
 * - Search pointers
 * - Sliding windows
 * - Linked lists
 * - Stack and queue
 * - Binary trees
 * - Graphs
 * - Recursion call stack
 * - Theme synchronization
 * - Responsive canvas
 */

const DSAAnimationUtils =
    typeof window !== "undefined" && window.AnimationUtils
        ? window.AnimationUtils
        : null;

class CanvasRenderer {

    constructor(canvas, options = {}) {

        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new TypeError(
                "CanvasRenderer requires a valid HTMLCanvasElement."
            );
        }

        this.canvas = canvas;

        this.ctx = canvas.getContext("2d", {
            alpha: true,
            desynchronized: true
        });

        if (!this.ctx) {
            throw new Error(
                "Unable to initialize Canvas 2D context."
            );
        }

        this.width = 0;
        this.height = 0;
        this.dpr = 1;

        this.isRunning = false;
        this.rafId = null;

        this.lastFrameTime = 0;
        this.elapsedTime = 0;

        this.scene = "array";

        this.status = "Ready to visualize";

        this.data = {
            elements: [],
            pointers: [],
            edges: [],
            nodes: [],
            frames: [],
            visited: [],
            window: null,
            target: null,
            active: null
        };

        this.theme = {
            background: "transparent",
            primary: "#00E5FF",
            secondary: "#8B5CF6",
            accent: "#FFB020",
            success: "#22C55E",
            danger: "#EF4444",
            text: "#FFFFFF",
            muted: "#8A9AAF",
            surface: "#172033",
            border: "rgba(255,255,255,0.15)",
            glow: "#00E5FF"
        };

        this.options = {
            showGrid: true,
            showValues: true,
            showIndices: true,
            showPointers: true,
            showLabels: true,
            showGlow: true,
            showStatus: true,
            characterStyle: "runner",
            ...options
        };

        this.resizeObserver = null;

        this._resizeHandler = () => this.resize();

        this._initialize();

    }


    // ==========================================
    // INITIALIZATION
    // ==========================================

    _initialize() {

        this.resize();

        if (typeof ResizeObserver !== "undefined") {

            this.resizeObserver = new ResizeObserver(() => {
                this.resize();
            });

            this.resizeObserver.observe(this.canvas);

        } else {

            window.addEventListener(
                "resize",
                this._resizeHandler
            );

        }

        this.syncTheme();

        this.start();

    }


    // ==========================================
    // CANVAS RESIZING
    // ==========================================

    resize() {

        const rect = this.canvas.getBoundingClientRect();

        const width = rect.width || 800;
        const height = rect.height || 500;

        this.dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        this.width = width;
        this.height = height;

        this.canvas.width = Math.round(
            width * this.dpr
        );

        this.canvas.height = Math.round(
            height * this.dpr
        );

        this.ctx.setTransform(
            this.dpr,
            0,
            0,
            this.dpr,
            0,
            0
        );

        this.ctx.imageSmoothingEnabled = true;

        this.ctx.imageSmoothingQuality = "high";

        this.render();

    }


    // ==========================================
    // THEME SYNCHRONIZATION
    // ==========================================

    syncTheme() {

        const root = getComputedStyle(
            document.documentElement
        );

        const canvasStyle = getComputedStyle(
            this.canvas
        );

        const getColor = (names, fallback) => {

            for (const name of names) {

                const value =
                    root.getPropertyValue(name).trim() ||
                    canvasStyle.getPropertyValue(name).trim();

                if (value) {
                    return value;
                }

            }

            return fallback;

        };

        this.theme = {

            background: getColor(
                ["--learning-canvas-bg", "--bg-primary", "--bg"],
                "transparent"
            ),

            primary: getColor(
                ["--learning-primary", "--primary-color", "--accent-color", "--neon-cyan"],
                "#00E5FF"
            ),

            secondary: getColor(
                ["--learning-secondary", "--secondary-color", "--neon-purple"],
                "#8B5CF6"
            ),

            accent: getColor(
                ["--learning-accent", "--accent-secondary"],
                "#FFB020"
            ),

            success: getColor(
                ["--success-color", "--success"],
                "#22C55E"
            ),

            danger: getColor(
                ["--danger-color", "--error-color"],
                "#EF4444"
            ),

            text: getColor(
                ["--text-primary", "--text-color"],
                "#FFFFFF"
            ),

            muted: getColor(
                ["--text-secondary", "--muted-color"],
                "#8A9AAF"
            ),

            surface: getColor(
                ["--card-bg", "--surface-color"],
                "#172033"
            ),

            border: getColor(
                ["--border-color"],
                "rgba(255,255,255,0.15)"
            ),

            glow: getColor(
                ["--glow-color", "--neon-cyan"],
                "#00E5FF"
            )

        };

        this.render();

    }


    setTheme(theme = {}) {

        this.theme = {
            ...this.theme,
            ...theme
        };

        this.render();

    }


    // ==========================================
    // DATA MANAGEMENT
    // ==========================================

    setScene(scene) {

        const supportedScenes = [
            "array",
            "sorting",
            "search",
            "sliding-window",
            "linked-list",
            "stack",
            "queue",
            "circular-queue",
            "tree",
            "graph",
            "recursion",
            "hanoi",
            "maze",
            "string"
        ];

        if (!supportedScenes.includes(scene)) {
            throw new Error(
                `Unsupported visualization scene: ${scene}`
            );
        }

        this.scene = scene;

        this.render();

    }


    setData(data = {}) {

        this.data = {
            ...this.data,
            ...data
        };

        this.render();

    }


    setElements(elements = []) {

        if (!Array.isArray(elements)) {
            throw new TypeError(
                "Elements must be an array."
            );
        }

        this.data.elements = elements.map((item, index) => {

            if (
                typeof item === "number" ||
                typeof item === "string"
            ) {
                return {
                    id: index,
                    value: item,
                    index,
                    state: "normal"
                };
            }

            return {
                id: item.id ?? index,
                value: item.value,
                index: item.index ?? index,
                state: item.state || "normal",
                ...item
            };

        });

        this.render();

    }


    setPointers(pointers = []) {

        if (!Array.isArray(pointers)) {
            throw new TypeError(
                "Pointers must be an array."
            );
        }

        this.data.pointers = pointers;

        this.render();

    }


    setStatus(message) {

        this.status = String(message || "");

        this.render();

    }


    setOptions(options = {}) {

        this.options = {
            ...this.options,
            ...options
        };

        this.render();

    }


    // ==========================================
    // ANIMATION LOOP
    // ==========================================

    start() {

        if (this.isRunning) {
            return;
        }

        this.isRunning = true;

        this.lastFrameTime = 0;

        this._animate(performance.now());

    }


    stop() {

        this.isRunning = false;

        if (this.rafId !== null) {

            cancelAnimationFrame(this.rafId);

            this.rafId = null;

        }

    }


    _animate = (timestamp) => {

        if (!this.isRunning) {
            return;
        }

        if (this.lastFrameTime !== 0) {

            const delta = Math.min(
                timestamp - this.lastFrameTime,
                50
            );

            this.elapsedTime += delta;

        }

        this.lastFrameTime = timestamp;

        this.render(this.elapsedTime);

        this.rafId = requestAnimationFrame(
            this._animate
        );

    };


    // ==========================================
    // MAIN RENDER METHOD
    // ==========================================

    render(time = this.elapsedTime) {

        const ctx = this.ctx;

        const width = this.width;
        const height = this.height;

        if (!width || !height) {
            return;
        }

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        this._drawBackground();

        if (this.options.showGrid) {
            this._drawGrid();
        }

        switch (this.scene) {

            case "array":
            case "sorting":
            case "search":
            case "sliding-window":
                this._drawArray(time);
                break;

            case "string":
                this._drawString(time);
                break;

            case "linked-list":
                this._drawLinkedList(time);
                break;

            case "stack":
                this._drawStack(time);
                break;

            case "queue":
                this._drawQueue(time);
                break;

            case "circular-queue":
                this._drawCircularQueue(time);
                break;

            case "tree":
                this._drawTree(time);
                break;

            case "graph":
                this._drawGraph(time);
                break;

            case "recursion":
                this._drawRecursion(time);
                break;

            case "hanoi":
                this._drawHanoi();
                break;

            case "maze":
                this._drawMaze(time);
                break;

        }

        if (this.options.showStatus) {
            this._drawStatus();
        }

    }


    // ==========================================
    // BACKGROUND
    // ==========================================

    _drawBackground() {

        const ctx = this.ctx;

        if (this.theme.background !== "transparent") {

            ctx.fillStyle = this.theme.background;

            ctx.fillRect(
                0,
                0,
                this.width,
                this.height
            );

        }

    }


    // ==========================================
    // GRID
    // ==========================================

    _drawGrid() {

        const ctx = this.ctx;

        const spacing = 32;

        ctx.save();

        ctx.strokeStyle = this.theme.border;

        ctx.lineWidth = 0.5;

        for (
            let x = 0;
            x <= this.width;
            x += spacing
        ) {

            ctx.beginPath();

            ctx.moveTo(x, 0);

            ctx.lineTo(x, this.height);

            ctx.stroke();

        }

        for (
            let y = 0;
            y <= this.height;
            y += spacing
        ) {

            ctx.beginPath();

            ctx.moveTo(0, y);

            ctx.lineTo(this.width, y);

            ctx.stroke();

        }

        ctx.restore();

    }


    // ==========================================
    // ARRAY / SORTING VISUALIZATION
    // ==========================================

    _drawArray(time) {

        const elements = this.data.elements;

        if (!elements.length) {
            this._drawEmptyState("Waiting for algorithm data");
            return;
        }

        const ctx = this.ctx;

        const count = elements.length;

        const padding = 42;

        const availableWidth = Math.max(
            1,
            this.width - padding * 2
        );

        const gap = Math.min(
            18,
            availableWidth * 0.025
        );

        const itemWidth = Math.max(
            8,
            (availableWidth - gap * (count - 1)) / count
        );

        const maxValue = Math.max(
            1,
            ...elements.map(item =>
                Math.abs(Number(item.value) || 0)
            )
        );

        const chartHeight = Math.max(
            80,
            this.height * 0.48
        );

        const bottom = this.height * 0.76;

        const startX = padding;

        this._drawWindow();

        elements.forEach((item, index) => {

            const value = Number(item.value) || 0;

            const normalized = Math.abs(value) / maxValue;

            const barHeight = Math.max(
                10,
                normalized * chartHeight
            );

            const x = startX + index * (
                itemWidth + gap
            );

            const y = bottom - barHeight;

            const state = this._getElementState(item);

            const color = this._getStateColor(state);

            const pulse = (
                state === "active" ||
                state === "compare" ||
                state === "pivot" ||
                state === "found"
            )
                ? DSAAnimationUtils.pulse(time / 1000, {
                    frequency: 1.5,
                    minimum: 0.92,
                    maximum: 1.08
                })
                : 1;

            const scale = pulse;

            const centerX = x + itemWidth / 2;

            const scaledWidth = itemWidth * scale;

            const scaledHeight = barHeight * scale;

            const drawX = centerX - scaledWidth / 2;

            const drawY = bottom - scaledHeight;

            // Draw active character shadow.
            if (
                this.options.showGlow &&
                state !== "normal"
            ) {

                this._drawGlow(
                    centerX,
                    drawY + scaledHeight / 2,
                    color,
                    20
                );

            }

            // Draw gradient bar.
            const gradient = ctx.createLinearGradient(
                0,
                drawY,
                0,
                bottom
            );

            gradient.addColorStop(
                0,
                color
            );

            gradient.addColorStop(
                1,
                this.theme.surface
            );

            ctx.save();

            ctx.globalAlpha = (
                state === "inactive" ? 0.25 : 1
            );

            ctx.fillStyle = gradient;

            this._roundedRect(
                drawX,
                drawY,
                scaledWidth,
                scaledHeight,
                7
            );

            ctx.fill();

            ctx.restore();

            // Draw value label.
            if (this.options.showValues) {

                this._drawText(
                    String(item.value),
                    centerX,
                    drawY - 14,
                    {
                        color: this.theme.text,
                        size: 13,
                        weight: "bold"
                    }
                );

            }

            // Draw index label.
            if (this.options.showIndices) {

                this._drawText(
                    `[${item.index ?? index}]`,
                    centerX,
                    bottom + 20,
                    {
                        color: this.theme.muted,
                        size: 11
                    }
                );

            }

            // Draw runner-style character face.
            if (this.options.characterStyle === "runner") {

                this._drawRunnerFace(
                    centerX,
                    drawY + Math.min(
                        23,
                        scaledHeight / 2
                    ),
                    state,
                    color
                );

            }

            // Draw sorted or found marker.
            if (
                state === "sorted" ||
                state === "found"
            ) {

                this._drawText(
                    state === "found" ? "★" : "✓",
                    centerX,
                    drawY - 31,
                    {
                        color: this.theme.success,
                        size: 15,
                        weight: "bold"
                    }
                );

            }

        });

        this._drawPointers();

        this._drawTarget();

    }


    // ==========================================
    // ELEMENT STATES
    // ==========================================

    _getElementState(item) {

        if (item.state) {
            return item.state;
        }

        if (
            this.data.active === item.index
        ) {
            return "active";
        }

        return "normal";

    }


    _getStateColor(state) {

        const colors = {

            normal: this.theme.primary,

            active: this.theme.accent,

            current: this.theme.accent,

            compare: this.theme.accent,

            swapping: this.theme.secondary,

            swapped: this.theme.secondary,

            pivot: this.theme.secondary,

            sorted: this.theme.success,

            found: this.theme.success,

            matched: this.theme.success,

            visited: this.theme.success,

            target: this.theme.danger,

            inactive: this.theme.muted,

            error: this.theme.danger,

            removed: this.theme.danger,

            queued: this.theme.secondary,

            processing: this.theme.accent

        };

        return colors[state] || this.theme.primary;

    }


    // ==========================================
    // RUNNER CHARACTER
    // ==========================================

    _drawRunnerFace(x, y, state, color) {

        const ctx = this.ctx;

        ctx.save();

        ctx.fillStyle = color;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            8,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Eyes.
        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();

        ctx.arc(
            x - 2.5,
            y - 1,
            1.5,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + 2.5,
            y - 1,
            1.5,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // State marker.
        if (state === "pivot") {

            this._drawText(
                "P",
                x,
                y - 19,
                {
                    color: color,
                    size: 10,
                    weight: "bold"
                }
            );

        }

        ctx.restore();

    }


    // ==========================================
    // POINTERS
    // ==========================================

    _drawPointers() {

        if (!this.options.showPointers) {
            return;
        }

        const pointers = this.data.pointers;

        if (!Array.isArray(pointers)) {
            return;
        }

        const count = this.data.elements.length;

        if (!count) {
            return;
        }

        const padding = 42;

        const availableWidth = this.width - padding * 2;

        const gap = Math.min(
            18,
            availableWidth * 0.025
        );

        const itemWidth = (
            availableWidth - gap * (count - 1)
        ) / count;

        pointers.forEach(pointer => {

            if (
                !Number.isInteger(pointer.index) ||
                pointer.index < 0 ||
                pointer.index >= count
            ) {
                return;
            }

            const x = (
                padding +
                pointer.index * (itemWidth + gap) +
                itemWidth / 2
            );

            const y = this.height * 0.86;

            const color = pointer.color ||
                this.theme.accent;

            this._drawArrow(
                x,
                y - 35,
                x,
                y - 5,
                color
            );

            this._drawText(
                pointer.label || "",
                x,
                y,
                {
                    color,
                    size: 12,
                    weight: "bold"
                }
            );

        });

    }


    // ==========================================
    // SLIDING WINDOW
    // ==========================================

    _drawWindow() {

        const windowData = this.data.window;

        if (!windowData) {
            return;
        }

        const left = windowData.left;
        const right = windowData.right;

        if (
            !Number.isInteger(left) ||
            !Number.isInteger(right) ||
            left < 0 ||
            right < left ||
            right >= this.data.elements.length
        ) {
            return;
        }

        const padding = 42;

        const count = this.data.elements.length;

        const availableWidth = this.width - padding * 2;

        const gap = Math.min(
            18,
            availableWidth * 0.025
        );

        const itemWidth = (
            availableWidth - gap * (count - 1)
        ) / count;

        const x = padding + left * (itemWidth + gap) - 5;

        const width = (
            (right - left + 1) * itemWidth +
            (right - left) * gap +
            10
        );

        const ctx = this.ctx;

        ctx.save();

        ctx.strokeStyle = this.theme.accent;

        ctx.lineWidth = 2;

        ctx.setLineDash([7, 5]);

        this._roundedRect(
            x,
            this.height * 0.15,
            width,
            this.height * 0.68,
            12
        );

        ctx.stroke();

        ctx.setLineDash([]);

        ctx.restore();

    }


    // ==========================================
    // TARGET MARKER
    // ==========================================

    _drawTarget() {

        if (this.data.target === null) {
            return;
        }

        const ctx = this.ctx;

        this._drawText(
            `TARGET: ${this.data.target}`,
            this.width / 2,
            25,
            {
                color: this.theme.accent,
                size: 13,
                weight: "bold"
            }
        );

    }


    // ==========================================
    // STRING VISUALIZATION
    // ==========================================

    _drawString() {

        const elements = this.data.elements;

        if (!elements.length) {
            this._drawEmptyState("Waiting for string data");
            return;
        }

        const count = elements.length;

        const cellWidth = Math.min(
            65,
            (this.width - 50) / count
        );

        const totalWidth = count * cellWidth;

        const startX = (
            this.width - totalWidth
        ) / 2;

        const y = this.height / 2;

        elements.forEach((item, index) => {

            const x = startX + index * cellWidth;

            const state = this._getElementState(item);

            const color = this._getStateColor(state);

            if (state !== "normal") {
                this._drawGlow(
                    x + cellWidth / 2,
                    y,
                    color,
                    20
                );
            }

            this._roundedRect(
                x + 3,
                y - 28,
                cellWidth - 6,
                56,
                9
            );

            this.ctx.fillStyle = this.theme.surface;

            this.ctx.fill();

            this.ctx.strokeStyle = color;

            this.ctx.lineWidth = 2;

            this.ctx.stroke();

            this._drawText(
                String(item.value),
                x + cellWidth / 2,
                y,
                {
                    color: this.theme.text,
                    size: 18,
                    weight: "bold"
                }
            );

            this._drawText(
                `[${index}]`,
                x + cellWidth / 2,
                y + 50,
                {
                    color: this.theme.muted,
                    size: 11
                }
            );

        });

        this._drawPointers();

    }


    // ==========================================
    // LINKED LIST VISUALIZATION
    // ==========================================

    _drawLinkedList() {

        const nodes = this.data.nodes;

        if (!nodes.length) {
            this._drawEmptyState("Waiting for linked list nodes");
            return;
        }

        const ctx = this.ctx;

        const nodeWidth = 100;

        const nodeHeight = 58;

        const spacing = 40;

        const totalWidth = (
            nodes.length * nodeWidth +
            (nodes.length - 1) * spacing
        );

        const startX = Math.max(
            20,
            (this.width - totalWidth) / 2
        );

        const centerY = this.height / 2;

        // Draw connections first.
        nodes.forEach((node, index) => {

            if (index >= nodes.length - 1) {
                return;
            }

            const x1 = startX + index * (
                nodeWidth + spacing
            ) + nodeWidth;

            const x2 = x1 + spacing;

            this._drawArrow(
                x1,
                centerY,
                x2,
                centerY,
                this.theme.primary
            );

        });

        // Draw nodes.
        nodes.forEach((node, index) => {

            const x = startX + index * (
                nodeWidth + spacing
            );

            const state = node.state || "normal";

            const color = this._getStateColor(state);

            this._drawGlow(
                x + nodeWidth / 2,
                centerY,
                color,
                state === "normal" ? 0 : 18
            );

            ctx.fillStyle = this.theme.surface;

            ctx.strokeStyle = color;

            ctx.lineWidth = 2;

            this._roundedRect(
                x,
                centerY - nodeHeight / 2,
                nodeWidth,
                nodeHeight,
                9
            );

            ctx.fill();

            ctx.stroke();

            this._drawText(
                String(node.value),
                x + nodeWidth / 2,
                centerY - 4,
                {
                    color: this.theme.text,
                    size: 16,
                    weight: "bold"
                }
            );

            this._drawText(
                `NODE ${index}`,
                x + nodeWidth / 2,
                centerY + 37,
                {
                    color: this.theme.muted,
                    size: 10
                }
            );

            if (index === 0) {

                this._drawText(
                    "HEAD",
                    x + nodeWidth / 2,
                    centerY - 48,
                    {
                        color: this.theme.accent,
                        size: 12,
                        weight: "bold"
                    }
                );

            }

            if (index === nodes.length - 1) {

                this._drawText(
                    "NULL",
                    x + nodeWidth + 20,
                    centerY,
                    {
                        color: this.theme.danger,
                        size: 12,
                        weight: "bold"
                    }
                );

            }

        });

    }


    // ==========================================
    // STACK VISUALIZATION
    // ==========================================

    _drawStack() {

        const elements = this.data.elements;

        const ctx = this.ctx;

        const centerX = this.width / 2;

        const baseY = this.height * 0.84;

        const itemWidth = 130;

        const itemHeight = 45;

        const gap = 7;

        // Stack boundaries.
        ctx.strokeStyle = this.theme.muted;

        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.moveTo(
            centerX - itemWidth / 2 - 5,
            this.height * 0.17
        );

        ctx.lineTo(
            centerX - itemWidth / 2 - 5,
            baseY
        );

        ctx.lineTo(
            centerX + itemWidth / 2 + 5,
            baseY
        );

        ctx.lineTo(
            centerX + itemWidth / 2 + 5,
            this.height * 0.17
        );

        ctx.stroke();

        elements.forEach((item, index) => {

            const y = baseY - (
                (index + 1) * (itemHeight + gap)
            );

            const state = this._getElementState(item);

            const color = this._getStateColor(state);

            ctx.fillStyle = this.theme.surface;

            ctx.strokeStyle = color;

            ctx.lineWidth = 2;

            this._roundedRect(
                centerX - itemWidth / 2,
                y,
                itemWidth,
                itemHeight,
                7
            );

            ctx.fill();

            ctx.stroke();

            this._drawText(
                String(item.value),
                centerX,
                y + itemHeight / 2,
                {
                    color: this.theme.text,
                    size: 15,
                    weight: "bold"
                }
            );

        });

        if (elements.length) {

            this._drawText(
                "TOP",
                centerX + itemWidth / 2 + 38,
                baseY - (
                    elements.length *
                    (itemHeight + gap)
                ),
                {
                    color: this.theme.accent,
                    size: 12,
                    weight: "bold"
                }
            );

        }

    }


    // ==========================================
    // QUEUE VISUALIZATION
    // ==========================================

    _drawQueue() {

        const elements = this.data.elements;

        const ctx = this.ctx;

        const centerY = this.height / 2;

        const cellWidth = Math.min(
            90,
            (this.width - 100) / Math.max(1, elements.length)
        );

        const startX = (
            this.width -
            cellWidth * elements.length
        ) / 2;

        elements.forEach((item, index) => {

            const x = startX + index * cellWidth;

            const color = this._getStateColor(
                this._getElementState(item)
            );

            ctx.fillStyle = this.theme.surface;

            ctx.strokeStyle = color;

            ctx.lineWidth = 2;

            ctx.fillRect(
                x,
                centerY - 30,
                cellWidth - 5,
                60
            );

            ctx.strokeRect(
                x,
                centerY - 30,
                cellWidth - 5,
                60
            );

            this._drawText(
                String(item.value),
                x + (cellWidth - 5) / 2,
                centerY,
                {
                    color: this.theme.text,
                    size: 16,
                    weight: "bold"
                }
            );

        });

        if (elements.length) {

            this._drawText(
                "FRONT",
                startX,
                centerY - 65,
                {
                    color: this.theme.success,
                    size: 12,
                    weight: "bold"
                }
            );

            this._drawText(
                "REAR",
                startX + (elements.length - 1) * cellWidth,
                centerY - 65,
                {
                    color: this.theme.accent,
                    size: 12,
                    weight: "bold"
                }
            );

        }

    }


    // ==========================================
    // CIRCULAR QUEUE
    // ==========================================

    _drawCircularQueue() {

        const elements = this.data.elements;

        const count = Math.max(
            1,
            elements.length
        );

        const centerX = this.width / 2;

        const centerY = this.height / 2;

        const radius = Math.min(
            this.width,
            this.height
        ) * 0.29;

        const cellRadius = Math.min(
            28,
            110 / count
        );

        for (let i = 0; i < count; i++) {

            const angle = (
                (Math.PI * 2 * i) / count
            ) - Math.PI / 2;

            const x = centerX + Math.cos(angle) * radius;

            const y = centerY + Math.sin(angle) * radius;

            const item = elements[i];

            const color = item
                ? this._getStateColor(
                    this._getElementState(item)
                )
                : this.theme.muted;

            this._drawGlow(
                x,
                y,
                color,
                item ? 14 : 0
            );

            this.ctx.beginPath();

            this.ctx.arc(
                x,
                y,
                cellRadius,
                0,
                Math.PI * 2
            );

            this.ctx.fillStyle = this.theme.surface;

            this.ctx.fill();

            this.ctx.strokeStyle = color;

            this.ctx.lineWidth = 2;

            this.ctx.stroke();

            this._drawText(
                item ? String(item.value) : "EMPTY",
                x,
                y,
                {
                    color: this.theme.text,
                    size: 12,
                    weight: "bold"
                }
            );

        }

    }


    // ==========================================
    // TREE VISUALIZATION
    // ==========================================

    _drawTree() {

        const nodes = this.data.nodes;

        if (!nodes.length) {
            this._drawEmptyState("Waiting for tree nodes");
            return;
        }

        const ctx = this.ctx;

        const positions = new Map();

        const levelHeight = Math.max(
            65,
            this.height / 5
        );

        const rootX = this.width / 2;

        const rootY = 65;

        nodes.forEach(node => {

            const depth = Math.max(
                0,
                node.depth || 0
            );

            const levelWidth = (
                this.width /
                Math.pow(2, depth + 1)
            );

            const slot = node.position ?? 0;

            const x = (
                rootX +
                (slot - (
                    Math.pow(2, depth) - 1
                ) / 2) * levelWidth
            );

            const y = rootY + depth * levelHeight;

            positions.set(node.id, { x, y });

        });

        // Draw tree branches.
        nodes.forEach(node => {

            if (node.parentId === undefined || node.parentId === null) {
                return;
            }

            const parent = positions.get(node.parentId);

            const child = positions.get(node.id);

            if (!parent || !child) {
                return;
            }

            this._drawArrow(
                parent.x,
                parent.y + 18,
                child.x,
                child.y - 18,
                this.theme.primary
            );

        });

        // Draw tree nodes.
        nodes.forEach(node => {

            const position = positions.get(node.id);

            const color = this._getStateColor(
                node.state || "normal"
            );

            this._drawGlow(
                position.x,
                position.y,
                color,
                20
            );

            ctx.beginPath();

            ctx.arc(
                position.x,
                position.y,
                22,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = this.theme.surface;

            ctx.fill();

            ctx.strokeStyle = color;

            ctx.lineWidth = 2;

            ctx.stroke();

            this._drawText(
                String(node.value),
                position.x,
                position.y,
                {
                    color: this.theme.text,
                    size: 14,
                    weight: "bold"
                }
            );

        });

    }


    // ==========================================
    // GRAPH VISUALIZATION
    // ==========================================

    _drawGraph() {

        const nodes = this.data.nodes;

        const edges = this.data.edges;

        if (!nodes.length) {
            this._drawEmptyState("Waiting for graph nodes");
            return;
        }

        const positions = new Map();

        nodes.forEach(node => {

            positions.set(
                node.id,
                {
                    x: node.x,
                    y: node.y
                }
            );

        });

        // Draw graph connections.
        edges.forEach(edge => {

            const start = positions.get(edge.from);

            const end = positions.get(edge.to);

            if (!start || !end) {
                return;
            }

            this._drawArrow(
                start.x,
                start.y,
                end.x,
                end.y,
                edge.visited
                    ? this.theme.success
                    : this.theme.muted
            );

        });

        // Draw graph nodes.
        nodes.forEach(node => {

            const position = positions.get(node.id);

            const color = this._getStateColor(
                node.state || "normal"
            );

            const radius = node.radius || 23;

            this._drawGlow(
                position.x,
                position.y,
                color,
                node.state === "active" ? 28 : 16
            );

            this.ctx.beginPath();

            this.ctx.arc(
                position.x,
                position.y,
                radius,
                0,
                Math.PI * 2
            );

            this.ctx.fillStyle = this.theme.surface;

            this.ctx.fill();

            this.ctx.strokeStyle = color;

            this.ctx.lineWidth = 3;

            this.ctx.stroke();

            this._drawText(
                String(node.value),
                position.x,
                position.y,
                {
                    color: this.theme.text,
                    size: 14,
                    weight: "bold"
                }
            );

        });

    }


    // ==========================================
    // RECURSION CALL STACK
    // ==========================================

    _drawHanoi() {
        const elements = this.data.elements;
        const rods = ["A", "B", "C"];
        const xPositions = rods.map((_, index) =>
            this.width * (index + 1) / (rods.length + 1)
        );
        const baseY = this.height * 0.84;
        const rodTop = this.height * 0.22;
        const maxSize = Math.max(1, ...elements.map(item => Number(item.value) || 1));
        const diskHeight = Math.max(12, Math.min(22, this.height * 0.055));
        const maxWidth = Math.min(this.width * 0.25, 150);

        xPositions.forEach((x, index) => {
            this.ctx.strokeStyle = this.theme.muted;
            this.ctx.lineWidth = 5;
            this.ctx.beginPath();
            this.ctx.moveTo(x, rodTop);
            this.ctx.lineTo(x, baseY);
            this.ctx.stroke();
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(x - maxWidth * 0.55, baseY);
            this.ctx.lineTo(x + maxWidth * 0.55, baseY);
            this.ctx.stroke();
            this._drawText(rods[index], x, baseY + 22, {
                color: this.theme.text,
                size: 13,
                weight: "bold"
            });
        });

        elements.forEach(item => {
            const rodIndex = rods.indexOf(String(item.rod));
            if (rodIndex < 0) return;
            const width = Math.max(26, (Number(item.value) / maxSize) * maxWidth);
            const x = xPositions[rodIndex] - width / 2;
            const y = baseY - (Number(item.index) + 1) * diskHeight;
            this.ctx.fillStyle = this._getStateColor(this._getElementState(item));
            this._roundedRect(x, y, width, diskHeight - 2, 5);
            this.ctx.fill();
            this._drawText(String(item.value), xPositions[rodIndex], y + diskHeight / 2, {
                color: this.theme.text,
                size: 11,
                weight: "bold"
            });
        });
    }

    _drawRecursion() {

        const frames = this.data.frames;

        if (!frames.length) {
            this._drawEmptyState("Waiting for recursive calls");
            return;
        }

        const ctx = this.ctx;

        const width = Math.min(
            300,
            this.width * 0.65
        );

        const frameHeight = 50;

        const gap = 9;

        const centerX = this.width / 2;

        const baseY = this.height - 65;

        frames.forEach((frame, index) => {

            const y = baseY - (
                (index + 1) * (frameHeight + gap)
            );

            const color = this._getStateColor(
                frame.state || "normal"
            );

            ctx.fillStyle = this.theme.surface;

            ctx.strokeStyle = color;

            ctx.lineWidth = 2;

            this._roundedRect(
                centerX - width / 2,
                y,
                width,
                frameHeight,
                8
            );

            ctx.fill();

            ctx.stroke();

            this._drawText(
                frame.label || `CALL ${index + 1}`,
                centerX,
                y + frameHeight / 2,
                {
                    color: this.theme.text,
                    size: 13,
                    weight: "bold"
                }
            );

        });

        this._drawText(
            "CALL STACK",
            centerX,
            25,
            {
                color: this.theme.primary,
                size: 15,
                weight: "bold"
            }
        );

    }


    // ==========================================
    // MAZE VISUALIZATION
    // ==========================================

    _drawMaze() {

        const maze = this.data.nodes;

        if (!maze.length) {
            this._drawEmptyState("Waiting for maze data");
            return;
        }

        const columns = this.data.columns || Math.ceil(
            Math.sqrt(maze.length)
        );

        const rows = this.data.rows || Math.ceil(
            maze.length / columns
        );

        const cellSize = Math.min(
            (this.width - 50) / columns,
            (this.height - 70) / rows
        );

        const startX = (
            this.width - columns * cellSize
        ) / 2;

        const startY = (
            this.height - rows * cellSize
        ) / 2;

        maze.forEach((cell, index) => {

            const row = Math.floor(index / columns);

            const col = index % columns;

            const x = startX + col * cellSize;

            const y = startY + row * cellSize;

            const color = (
                cell.state === "wall"
                    ? "#273244"
                    : cell.state === "visited"
                        ? this.theme.secondary
                        : cell.state === "path"
                            ? this.theme.success
                            : cell.state === "current"
                                ? this.theme.accent
                                : this.theme.surface
            );

            this.ctx.fillStyle = color;

            this.ctx.fillRect(
                x + 2,
                y + 2,
                cellSize - 4,
                cellSize - 4
            );

            if (cell.state === "start" || cell.state === "end") {

                this._drawText(
                    cell.state === "start" ? "S" : "E",
                    x + cellSize / 2,
                    y + cellSize / 2,
                    {
                        color: this.theme.text,
                        size: 14,
                        weight: "bold"
                    }
                );

            }

        });

    }


    // ==========================================
    // GLOW EFFECT
    // ==========================================

    _drawGlow(x, y, color, intensity = 20) {

        if (
            !this.options.showGlow ||
            intensity <= 0
        ) {
            return;
        }

        const ctx = this.ctx;

        ctx.save();

        ctx.shadowBlur = intensity;

        ctx.shadowColor = color;

        ctx.fillStyle = color;

        ctx.globalAlpha = 0.12;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            intensity,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }


    // ==========================================
    // ARROW DRAWING
    // ==========================================

    _drawArrow(
        x1,
        y1,
        x2,
        y2,
        color = this.theme.primary
    ) {

        const ctx = this.ctx;

        const angle = Math.atan2(
            y2 - y1,
            x2 - x1
        );

        const headLength = 9;

        ctx.save();

        ctx.strokeStyle = color;

        ctx.fillStyle = color;

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(x1, y1);

        ctx.lineTo(x2, y2);

        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(x2, y2);

        ctx.lineTo(
            x2 - headLength * Math.cos(angle - Math.PI / 6),
            y2 - headLength * Math.sin(angle - Math.PI / 6)
        );

        ctx.lineTo(
            x2 - headLength * Math.cos(angle + Math.PI / 6),
            y2 - headLength * Math.sin(angle + Math.PI / 6)
        );

        ctx.closePath();

        ctx.fill();

        ctx.restore();

    }


    // ==========================================
    // TEXT DRAWING
    // ==========================================

    _drawText(
        text,
        x,
        y,
        options = {}
    ) {

        const ctx = this.ctx;

        ctx.save();

        ctx.font = (
            `${options.weight || "normal"} ` +
            `${options.size || 13}px ` +
            `${options.font || "Arial, sans-serif"}`
        );

        ctx.fillStyle = options.color ||
            this.theme.text;

        ctx.textAlign = options.align || "center";

        ctx.textBaseline = "middle";

        ctx.globalAlpha = options.opacity ?? 1;

        ctx.fillText(
            String(text),
            x,
            y,
            options.maxWidth
        );

        ctx.restore();

    }


    // ==========================================
    // ROUNDED RECTANGLE
    // ==========================================

    _roundedRect(
        x,
        y,
        width,
        height,
        radius = 8
    ) {

        const ctx = this.ctx;

        const r = Math.min(
            radius,
            width / 2,
            height / 2
        );

        ctx.beginPath();

        ctx.moveTo(x + r, y);

        ctx.lineTo(x + width - r, y);

        ctx.quadraticCurveTo(
            x + width,
            y,
            x + width,
            y + r
        );

        ctx.lineTo(
            x + width,
            y + height - r
        );

        ctx.quadraticCurveTo(
            x + width,
            y + height,
            x + width - r,
            y + height
        );

        ctx.lineTo(
            x + r,
            y + height
        );

        ctx.quadraticCurveTo(
            x,
            y + height,
            x,
            y + height - r
        );

        ctx.lineTo(x, y + r);

        ctx.quadraticCurveTo(
            x,
            y,
            x + r,
            y
        );

        ctx.closePath();

    }


    // ==========================================
    // EMPTY STATE
    // ==========================================

    _drawEmptyState(message) {

        this._drawText(
            message,
            this.width / 2,
            this.height / 2,
            {
                color: this.theme.muted,
                size: 15
            }
        );

    }


    // ==========================================
    // STATUS INFORMATION
    // ==========================================

    _drawStatus() {

        if (!this.status) {
            return;
        }

        this._drawText(
            this.status,
            16,
            this.height - 18,
            {
                color: this.theme.muted,
                size: 11,
                align: "left"
            }
        );

    }


    // ==========================================
    // CLEANUP
    // ==========================================

    destroy() {

        this.stop();

        if (this.resizeObserver) {

            this.resizeObserver.disconnect();

            this.resizeObserver = null;

        } else {

            window.removeEventListener(
                "resize",
                this._resizeHandler
            );

        }

        this.data = {
            elements: [],
            pointers: [],
            edges: [],
            nodes: [],
            frames: [],
            visited: [],
            window: null,
            target: null,
            active: null
        };

        this.ctx.clearRect(
            0,
            0,
            this.width,
            this.height
        );

    }

}


if (typeof window !== "undefined") {
    window.CanvasRenderer = CanvasRenderer;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = CanvasRenderer;
}
