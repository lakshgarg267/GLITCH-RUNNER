
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/dsaController.js
 *
 * Main controller responsible for connecting:
 * TopicRegistry
 * StepEngine
 * AnimationUtils
 * CanvasRenderer
 * LanguageManager
 * VisualizerControls
 * ProgressManager
 */

(function (global) {
    "use strict";

    class DSAController {

        constructor(options = {}) {

            this.options = options;

            this.registry = options.registry || null;
            this.engine = options.engine || null;
            this.renderer = options.renderer || null;
            this.languageManager = options.languageManager || null;
            this.controls = options.controls || null;
            this.progressManager = options.progressManager || null;
            this.algorithmModules = options.algorithmModules || {};

            this.currentTopic = null;
            this.currentAlgorithm = null;
            this.currentCategory = null;

            this.currentLanguage = "python";

            this.isInitialized = false;
            this.isDestroyed = false;

            this.listeners = new Map();

            this.codeElement = options.codeElement || null;
            this.statusElement = options.statusElement || null;
            this.topicTitleElement = options.topicTitleElement || null;
            this.descriptionElement = options.descriptionElement || null;

            this.unsubscribeLanguage = null;
            this.unsubscribeProgress = null;

            this.state = {
                status: "idle",
                step: 0,
                totalSteps: 0,
                speed: 1,
                error: null
            };
        }

        // =======================================
        // INITIALIZATION
        // =======================================

        initialize() {

            if (this.isDestroyed) {
                throw new Error(
                    "Cannot initialize a destroyed DSAController."
                );
            }

            if (this.isInitialized) {
                return this;
            }

            this.validateDependencies();

            this.connectModules();

            this.isInitialized = true;

            this.setStatus("ready");

            this.emit("initialized");

            return this;
        }

        validateDependencies() {

            const required = [
                ["registry", this.registry],
                ["engine", this.engine],
                ["renderer", this.renderer],
                ["languageManager", this.languageManager],
                ["controls", this.controls],
                ["progressManager", this.progressManager]
            ];

            const missing = required
                .filter(([, instance]) => !instance)
                .map(([name]) => name);

            if (missing.length) {
                throw new Error(
                    "Missing DSA dependencies: " +
                    missing.join(", ")
                );
            }
        }

        // =======================================
        // MODULE CONNECTION
        // =======================================

        connectModules() {

            if (typeof this.engine.setCallbacks === "function") {
                this.engine.setCallbacks({
                    onStep: context => {
                        this.syncState();
                        this.highlightCodeLine(context.line);
                        if (context.data && context.data.scene) {
                            this.renderScene(context.data.scene);
                        }
                        const message = context.data && context.data.explanation;
                        const messageElement = document.getElementById("dsa-step-message");
                        if (messageElement) messageElement.textContent = message || context.message || "";
                        const variablesElement = document.getElementById("dsa-variables");
                        if (variablesElement && context.data) {
                            variablesElement.textContent = JSON.stringify(
                                context.data.snapshot && context.data.snapshot.variables
                                    ? context.data.snapshot.variables
                                    : context.data.variables || {},
                                null,
                                2
                            );
                        }
                        if (this.statusElement) {
                            this.statusElement.textContent = "Step " + context.stepNumber;
                        }
                        if (
                            context.direction !== "previous" &&
                            this.currentTopic &&
                            this.progressManager
                        ) {
                            this.progressManager.recordStep(this.currentTopic.id, 1);
                            this.progressManager.updateTopicProgress(
                                this.currentTopic.id,
                                context.progress,
                                this.currentCategory
                            );
                        }
                        this.emit("step-executed", context);
                    },
                    onStateChange: state => {
                        this.state.status = state.isRunning
                            ? "playing"
                            : state.isPaused
                                ? "paused"
                                : state.isCompleted
                                    ? "completed"
                                    : this.state.status;
                        this.syncState();
                        if (this.controls) {
                            this.controls.isPlaying = Boolean(state.isRunning);
                            this.controls.syncFromEngine();
                            this.controls.updateUI();
                        }
                    },
                    onComplete: context => {
                        this.setStatus("completed");
                        this.checkCompletion();
                        this.emit("execution-completed", { topic: this.currentTopic, context });
                    },
                    onReset: () => {
                        this.state.step = 0;
                        this.setStatus("ready");
                        this.renderInitialScene();
                        const initialStep = this.engine.steps[0];
                        const messageElement = document.getElementById("dsa-step-message");
                        if (messageElement) {
                            messageElement.textContent = initialStep
                                ? initialStep.data.explanation || initialStep.message
                                : "Choose an algorithm to load its steps.";
                        }
                        const variablesElement = document.getElementById("dsa-variables");
                        if (variablesElement) {
                            const data = initialStep ? initialStep.data : null;
                            variablesElement.textContent = JSON.stringify(
                                data && data.snapshot && data.snapshot.variables
                                    ? data.snapshot.variables
                                    : data && data.variables || {},
                                null,
                                2
                            );
                        }
                        if (this.codeElement) {
                            this.codeElement.textContent = this.codeElement.textContent || "";
                        }
                    },
                    onError: error => this.handleError(error)
                });
            }

            if (
                typeof this.controls.setEngine === "function"
            ) {
                this.controls.setEngine(this.engine);
            }

            if (
                typeof this.languageManager.onChange === "function"
            ) {
                this.unsubscribeLanguage =
                    this.languageManager.onChange(event => {
                        this.handleLanguageChange(event);
                    });
            }

            if (
                typeof this.progressManager.onChange === "function"
            ) {
                this.unsubscribeProgress =
                    this.progressManager.onChange(event => {
                        this.emit("progress-change", event);
                    });
            }

            if (
                typeof this.controls.enableKeyboardShortcuts === "function"
            ) {
                this.controls.enableKeyboardShortcuts();
            }

            this.currentLanguage =
                this.languageManager.getCurrentLanguage();
        }

        // =======================================
        // EVENT SYSTEM
        // =======================================

        on(eventName, callback) {

            if (typeof callback !== "function") {
                throw new TypeError(
                    "Event listener must be a function."
                );
            }

            if (!this.listeners.has(eventName)) {
                this.listeners.set(eventName, new Set());
            }

            this.listeners.get(eventName).add(callback);

            return () => {
                this.off(eventName, callback);
            };
        }

        off(eventName, callback) {

            const group = this.listeners.get(eventName);

            if (!group) return;

            group.delete(callback);

            if (!group.size) {
                this.listeners.delete(eventName);
            }
        }

        emit(eventName, details = {}) {

            const group = this.listeners.get(eventName);

            if (!group) return;

            const event = {
                type: eventName,
                details,
                state: this.getState(),
                timestamp: Date.now()
            };

            group.forEach(callback => {
                try {
                    callback(event);
                } catch (error) {
                    console.error(
                        `DSA event error (${eventName}):`,
                        error
                    );
                }
            });
        }

        // =======================================
        // TOPIC REGISTRY ACCESS
        // =======================================

        getTopics() {

            if (
                typeof this.registry.getAllTopics === "function"
            ) {
                return this.registry.getAllTopics();
            }

            if (
                typeof this.registry.getTopics === "function"
            ) {
                return this.registry.getTopics();
            }

            if (Array.isArray(this.registry.topics)) {
                return this.registry.topics;
            }

            return [];
        }

        getTopic(topicId) {

            if (!topicId) return null;

            if (
                typeof this.registry.getTopic === "function"
            ) {
                return this.registry.getTopic(topicId);
            }

            if (
                typeof this.registry.getById === "function"
            ) {
                return this.registry.getById(topicId);
            }

            return this.getTopics().find(
                topic => topic.id === topicId
            ) || null;
        }

        // =======================================
        // LOAD TOPIC
        // =======================================

        loadTopic(topicId) {

            this.ensureInitialized();

            const topic = this.getTopic(topicId);

            if (!topic) {
                return this.handleError(
                    new Error(`Topic not found: ${topicId}`)
                );
            }

            this.pause();

            this.currentTopic = topic;
            this.currentCategory =
                topic.category || topic.categoryId || "general";

            const algorithmId =
                topic.algorithmId ||
                topic.algorithm ||
                topic.id;

            this.currentAlgorithm = algorithmId;
            if (typeof this.progressManager.updateTopicProgress === "function") {
                this.progressManager.updateTopicProgress(
                    topic.id,
                    this.progressManager.getTopicProgress(topic.id),
                    this.currentCategory
                );
            }

            try {

                this.resetEngine();

                this.loadCode();

                this.updateTopicInformation();

                this.renderInitialScene();

                this.loadAlgorithmSteps();

                this.setStatus("ready");

                this.emit("topic-loaded", {
                    topic,
                    algorithmId
                });

                return topic;

            } catch (error) {

                return this.handleError(error);
            }
        }

        loadAlgorithmSteps(input = {}) {
            this.ensureInitialized();

            if (!this.currentAlgorithm) {
                throw new Error("No algorithm is selected.");
            }

            const module = this.resolveAlgorithmModule(this.currentAlgorithm);
            if (!module || typeof module.getSteps !== "function") {
                throw new Error(
                    `Algorithm implementation unavailable: ${this.currentAlgorithm}`
                );
            }

            const generated = module.getSteps(this.currentAlgorithm, input);
            if (!Array.isArray(generated) || generated.length === 0) {
                throw new Error(
                    `Algorithm returned no execution steps: ${this.currentAlgorithm}`
                );
            }

            const codeLineCount = this.languageManager.getLineCount(
                this.currentAlgorithm,
                this.currentLanguage
            );
            const steps = generated.map((step, index) => {
                const codeLine = step.codeLine;
                const line = typeof codeLine === "number"
                    ? codeLine
                    : (codeLine && typeof codeLine === "object"
                        ? Number(codeLine[this.currentLanguage] ?? codeLine.line ?? codeLine.python ?? 1)
                        : 1);

                return {
                    line: Number.isInteger(line) && line > 0
                        ? Math.min(line, codeLineCount)
                        : 1,
                    action: String(step.action || "inspect"),
                    data: {
                        scene: step.scene || null,
                        snapshot: step.snapshot || null,
                        variables: step.variables || {},
                        title: step.title || "",
                        explanation: step.explanation || step.message || ""
                    },
                    message: step.message || step.explanation || step.title || ""
                };
            });

            this.engine.setSteps(steps);
            this.syncState();
            this.setStatus("ready");
            return steps;
        }

        resolveAlgorithmModule(algorithmId) {
            const direct = this.algorithmModules[algorithmId];
            if (direct) return direct;

            if (typeof this.algorithmModules.getModule === "function") {
                return this.algorithmModules.getModule(algorithmId);
            }

            for (const module of Object.values(this.algorithmModules)) {
                if (
                    module &&
                    typeof module.getAlgorithm === "function" &&
                    module.getAlgorithm(algorithmId)
                ) {
                    return module;
                }
            }
            return null;
        }

        // =======================================
        // LOAD ALGORITHM CODE
        // =======================================

        loadCode() {

            if (!this.currentAlgorithm) {
                return null;
            }

            const code =
                this.languageManager.getAlgorithmCode(
                    this.currentAlgorithm,
                    this.currentLanguage
                );

            this.renderCode(code);

            return code;
        }

        renderCode(code) {

            if (!this.codeElement) {
                this.emit("code-loaded", { code });
                return;
            }

            this.codeElement.textContent = code;

            this.codeElement.dataset.language =
                this.currentLanguage;

            this.emit("code-loaded", {
                code,
                language: this.currentLanguage
            });
        }

        highlightCodeLine(lineNumber) {
            if (!this.codeElement || !Number.isInteger(lineNumber)) return;

            const code = this.codeElement.textContent || "";
            const lines = code.replace(/\r\n/g, "\n").split("\n");
            const highlighted = lines.map((line, index) =>
                index + 1 === lineNumber
                    ? `<span class="dsa-code-line active">${this.escapeCodeLine(line)}</span>`
                    : `<span class="dsa-code-line">${this.escapeCodeLine(line)}</span>`
            ).join("\n");

            this.codeElement.innerHTML = highlighted;
        }

        escapeCodeLine(line) {
            return String(line)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        }

        // =======================================
        // TOPIC INFORMATION
        // =======================================

        updateTopicInformation() {

            if (!this.currentTopic) return;

            if (this.topicTitleElement) {
                this.topicTitleElement.textContent =
                    this.currentTopic.title ||
                    this.currentTopic.name ||
                    "DSA Topic";
            }

            if (this.descriptionElement) {
                this.descriptionElement.textContent =
                    this.currentTopic.description || "";
            }
            const explanationElement =
                typeof document !== "undefined"
                    ? document.getElementById("dsa-explanation")
                    : null;
            if (explanationElement) {
                explanationElement.textContent =
                    this.currentTopic.description || "";
            }
        }

        // =======================================
        // LANGUAGE SWITCHING
        // =======================================

        changeLanguage(language) {

            this.ensureInitialized();

            try {

                this.pause();

                const selected =
                    this.languageManager.setLanguage(language);

                this.currentLanguage = selected.id;

                this.loadCode();
                if (this.currentTopic) {
                    this.loadAlgorithmSteps();
                }

                this.emit("language-changed", {
                    language: selected.id
                });

                return selected;

            } catch (error) {

                return this.handleError(error);
            }
        }

        handleLanguageChange(event) {

            if (!event || !event.currentLanguage) {
                return;
            }

            this.currentLanguage = event.currentLanguage;

            if (this.currentAlgorithm) {
                try {
                    this.loadCode();
                } catch (error) {
                    this.handleError(error);
                }
            }
        }

        // =======================================
        // ENGINE CONTROL
        // =======================================

        play() {

            this.ensureInitialized();

            if (!this.currentTopic) {
                return false;
            }

            try {

                const result = this.engine.play();

                this.setStatus("playing");

                this.emit("play");

                return result;

            } catch (error) {

                return this.handleError(error);
            }
        }

        pause() {

            if (!this.engine) return false;

            const result = this.engine.pause();

            this.setStatus("paused");

            this.emit("pause");

            return result;
        }

        nextStep() {

            this.ensureInitialized();

            if (!this.currentTopic) return false;

            try {

                const result = this.engine.next();

                this.syncState();

                this.emit("step-changed", {
                    direction: "next",
                    result
                });

                return result;

            } catch (error) {

                return this.handleError(error);
            }
        }

        previousStep() {

            this.ensureInitialized();

            if (!this.currentTopic) return false;

            try {

                const result = this.engine.previous();

                this.syncState();

                this.emit("step-changed", {
                    direction: "previous",
                    result
                });

                return result;

            } catch (error) {

                return this.handleError(error);
            }
        }

        resetEngine() {

            if (!this.engine) return false;

            const result = this.engine.reset();

            this.syncState();

            this.setStatus("ready");

            return result;
        }

        // =======================================
        // SPEED CONTROL
        // =======================================

        setSpeed(speed) {

            this.ensureInitialized();

            const result =
                this.controls.setSpeed(speed);

            this.state.speed = result;

            this.emit("speed-changed", {
                speed: result
            });

            return result;
        }

        // =======================================
        // STEP STATE
        // =======================================

        syncState() {

            if (!this.engine) return;

            if (
                typeof this.engine.getCurrentStep === "function"
            ) {
                const currentStep = this.engine.getCurrentStep();
                this.state.step = typeof currentStep === "number"
                    ? currentStep
                    : (Number.isInteger(this.engine.currentIndex)
                        ? this.engine.currentIndex + 1
                        : 0);

            } else if (
                Number.isFinite(this.engine.currentStep)
            ) {
                this.state.step = this.engine.currentStep;
            }

            if (
                typeof this.engine.getTotalSteps === "function"
            ) {
                this.state.totalSteps =
                    this.engine.getTotalSteps();

            } else if (
                Number.isFinite(this.engine.totalSteps)
            ) {
                this.state.totalSteps = this.engine.totalSteps;

            } else if (
                Array.isArray(this.engine.steps)
            ) {
                this.state.totalSteps = this.engine.steps.length;
            }

            if (
                this.controls &&
                typeof this.controls.setProgress === "function"
            ) {
                this.controls.setProgress(
                    this.state.step,
                    this.state.totalSteps
                );
            }
        }

        // =======================================
        // RENDERING
        // =======================================

        renderInitialScene() {
            if (!this.renderer) return;
            this.renderScene({
                type: this.sceneTypeForTopic(this.currentTopic),
                items: [],
                nodes: [],
                pointers: [],
                edges: [],
                status: "Ready",
                meta: { topicId: this.currentTopic.id }
            });
        }

        sceneTypeForTopic(topic) {
            const type = topic && (topic.visualizer || topic.visualType);
            const map = {
                "array-search": "search",
                "binary-search": "search",
                "merge-sort": "sorting",
                "quick-sort": "sorting",
                "string-reverse": "string",
                palindrome: "string",
                anagram: "string",
                "call-stack": "recursion",
                "recursion-tree": "recursion",
                backtracking: "recursion",
                "linked-list-reverse": "linked-list",
                bst: "tree",
                "tree-traversal": "tree",
                "graph-bfs": "graph",
                "graph-dfs": "graph",
                "graph-dijkstra": "graph",
                "tower-of-hanoi": "hanoi",
            };
            const supported = [
                "array", "sorting", "search", "sliding-window", "string",
                "linked-list", "stack", "queue", "circular-queue",
                "tree", "graph", "recursion", "hanoi", "maze"
            ];
            return map[type] || (supported.includes(type) ? type : "array");
        }

        renderScene(scene) {

            if (!this.renderer || !scene) {
                return false;
            }

            if (
                typeof this.renderer.setScene === "function"
            ) {
                const supported = [
                    "array", "sorting", "search", "sliding-window", "string",
                    "linked-list", "stack", "queue", "circular-queue",
                    "tree", "graph", "recursion", "hanoi", "maze"
                ];
                const type = supported.includes(scene.type)
                    ? scene.type
                    : this.sceneTypeForTopic(this.currentTopic);
                this.renderer.setScene(type);
                if (typeof this.renderer.setData === "function") {
                    this.renderer.setData({
                        ...scene,
                        elements: scene.items || scene.elements || [],
                        nodes: scene.nodes || [],
                        edges: scene.edges || [],
                        pointers: scene.pointers || [],
                        frames: scene.frames || []
                    });
                }
                if (typeof this.renderer.setStatus === "function") {
                    this.renderer.setStatus(scene.status || "Running");
                }
            }

            if (
                typeof this.renderer.render === "function"
            ) {
                this.renderer.render();
            }

            this.emit("scene-rendered", { scene });

            return true;
        }

        // =======================================
        // STEP PROGRESS
        // =======================================

        recordStepProgress() {

            if (!this.currentTopic) return;

            if (
                this.progressManager &&
                typeof this.progressManager.recordStep === "function"
            ) {
                this.progressManager.recordStep(
                    this.currentTopic.id,
                    1
                );
            }

            this.checkCompletion();
        }

        checkCompletion() {

            if (!this.currentTopic) return false;

            this.syncState();

            if (
                this.state.totalSteps <= 0 ||
                this.state.step < this.state.totalSteps
            ) {
                return false;
            }

            const completed =
                this.progressManager.completeTopic(
                    this.currentTopic.id,
                    this.currentCategory
                );

            if (completed) {

                this.setStatus("completed");

                this.emit("topic-completed", {
                    topic: this.currentTopic
                });
            }

            return completed;
        }

        // =======================================
        // THEME INTEGRATION
        // =======================================

        setTheme(theme) {

            if (!this.renderer) return false;

            if (
                typeof this.renderer.setTheme === "function"
            ) {
                this.renderer.setTheme(theme);

                this.renderer.render();

                this.emit("theme-changed", { theme });

                return true;
            }

            return false;
        }

        // =======================================
        // STATUS
        // =======================================

        setStatus(status) {

            this.state.status = status;

            if (this.statusElement) {
                this.statusElement.textContent = status;
                this.statusElement.dataset.status = status;
            }

            this.emit("status-changed", { status });
        }

        // =======================================
        // ERROR HANDLING
        // =======================================

        handleError(error) {

            this.state.error = error
                ? error.message
                : "Unknown DSA error";

            this.setStatus("error");

            console.error(
                "[GLITCH-RUNNER DSA]",
                error
            );

            this.emit("error", {
                message: this.state.error,
                error
            });

            return false;
        }

        // =======================================
        // STATE ACCESS
        // =======================================

        getState() {

            return {
                status: this.state.status,

                step: this.state.step,

                totalSteps: this.state.totalSteps,

                speed: this.state.speed,

                language: this.currentLanguage,

                topicId: this.currentTopic
                    ? this.currentTopic.id
                    : null,

                algorithmId: this.currentAlgorithm,

                category: this.currentCategory,

                error: this.state.error
            };
        }

        // =======================================
        // VALIDATION
        // =======================================

        ensureInitialized() {

            if (!this.isInitialized) {
                throw new Error(
                    "DSAController must be initialized first."
                );
            }

            if (this.isDestroyed) {
                throw new Error(
                    "DSAController has been destroyed."
                );
            }
        }

        // =======================================
        // CLEANUP
        // =======================================

        destroy() {

            if (this.isDestroyed) return;

            this.pause();

            if (this.unsubscribeLanguage) {
                this.unsubscribeLanguage();
                this.unsubscribeLanguage = null;
            }

            if (this.unsubscribeProgress) {
                this.unsubscribeProgress();
                this.unsubscribeProgress = null;
            }

            this.listeners.clear();

            this.currentTopic = null;
            this.currentAlgorithm = null;
            this.currentCategory = null;

            this.isInitialized = false;
            this.isDestroyed = true;

            this.emit("destroyed");
        }
    }

    // =======================================
    // GLOBAL EXPORT
    // =======================================

    global.DSAController = DSAController;

    // =======================================
    // MODULE EXPORT
    // =======================================

    if (
        typeof module !== "undefined" &&
        module.exports
    ) {
        module.exports = DSAController;
    }

})(typeof window !== "undefined" ? window : globalThis);
