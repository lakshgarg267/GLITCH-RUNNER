
/**
 * GLITCH-RUNNER
 * DSA VISUAL LEARNING SYSTEM
 *
 * FILE: stepEngine.js
 *
 * PURPOSE:
 * Central execution engine for all DSA visualizations.
 *
 * FEATURES:
 * - Automatic playback
 * - Pause and resume
 * - Manual next step
 * - Reset
 * - Speed control
 * - Code line synchronization
 * - Canvas synchronization
 * - Execution status
 * - Callback management
 * - Error handling
 */

export class StepEngine {

    constructor(options = {}) {

        this.steps = [];

        // Current executed step index.
        // -1 means no step has executed.
        this.currentIndex = -1;

        // Playback state.
        this.isRunning = false;
        this.isPaused = false;
        this.isCompleted = false;

        // Speed multiplier.
        this.speed = this._clampSpeed(
            options.speed ?? 1
        );

        // Default interval in milliseconds.
        this.baseInterval = Math.max(
            50,
            Number(options.baseInterval) || 800
        );

        // Timer reference.
        this.timer = null;

        // Prevent outdated scheduled callbacks.
        this.runId = 0;

        // Event callbacks.
        this.callbacks = {
            onStep: options.onStep || null,
            onStateChange: options.onStateChange || null,
            onComplete: options.onComplete || null,
            onReset: options.onReset || null,
            onError: options.onError || null
        };

        // Current execution information.
        this.currentStep = null;

        this.lastError = null;

    }


    // ==========================================
    // STEP MANAGEMENT
    // ==========================================

    /**
     * Load algorithm execution steps.
     *
     * Every step follows this structure:
     *
     * {
     *   line: 3,
     *   action: "compare",
     *   data: {},
     *   message: "Comparing two elements"
     * }
     */

    setSteps(steps, options = {}) {

        if (!Array.isArray(steps)) {
            throw new TypeError(
                "Steps must be provided as an array."
            );
        }

        this.pause();

        this.steps = steps.map((step, index) => {

            if (
                !step ||
                typeof step !== "object" ||
                Array.isArray(step)
            ) {
                throw new TypeError(
                    `Invalid step at index ${index}.`
                );
            }

            if (
                !Number.isInteger(step.line) ||
                step.line < 1
            ) {
                throw new Error(
                    `Step ${index} must contain a valid positive code line number.`
                );
            }

            if (
                typeof step.action !== "string" ||
                !step.action.trim()
            ) {
                throw new Error(
                    `Step ${index} must contain a valid action.`
                );
            }

            if (
                step.data !== undefined &&
                (
                    step.data === null ||
                    typeof step.data !== "object" ||
                    Array.isArray(step.data)
                )
            ) {
                throw new TypeError(
                    `Step ${index} data must be an object.`
                );
            }

            return Object.freeze({
                ...step,
                data: Object.freeze({
                    ...(step.data || {})
                }),
                message: String(step.message || "")
            });

        });

        if (options.autoReset !== false) {
            this.reset();
        }

        return this.getTotalSteps();

    }


    /**
     * Replace callbacks without recreating engine.
     */

    setCallbacks(callbacks = {}) {

        const allowedCallbacks = [
            "onStep",
            "onStateChange",
            "onComplete",
            "onReset",
            "onError"
        ];

        allowedCallbacks.forEach(name => {

            if (Object.prototype.hasOwnProperty.call(
                callbacks,
                name
            )) {
                if (
                    callbacks[name] !== null &&
                    typeof callbacks[name] !== "function"
                ) {
                    throw new TypeError(
                        `${name} must be a function or null.`
                    );
                }

                this.callbacks[name] = callbacks[name];
            }

        });

    }


    // ==========================================
    // PLAYBACK CONTROLS
    // ==========================================

    /**
     * Start automatic execution.
     *
     * Executes the next step immediately.
     * Remaining steps execute according to speed.
     */

    start() {

        if (this.steps.length === 0) {
            this._notifyError(
                new Error(
                    "No algorithm steps are loaded."
                )
            );

            return false;
        }

        if (this.isRunning) {
            return false;
        }

        if (this.isCompleted) {
            return false;
        }

        this.isRunning = true;
        this.isPaused = false;

        this.runId++;

        this._emitState();

        this._executeAutomaticPlayback();

        return true;

    }


    /**
     * Pause automatic execution.
     */

    pause() {

        if (!this.isRunning) {
            return false;
        }

        this.isRunning = false;
        this.isPaused = true;

        this._clearTimer();

        // Invalidate previous scheduled callbacks.
        this.runId++;

        this._emitState();

        return true;

    }


    /**
     * Execute exactly one step manually.
     *
     * Automatic playback stops first.
     */

    nextStep() {

        if (this.steps.length === 0) {
            return null;
        }

        if (this.isCompleted) {
            return null;
        }

        this.pause();

        const result = this._executeNextStep();

        if (this.isCompleted) {
            return result;
        }

        this.isPaused = true;

        this._emitState();

        return result;

    }


    /**
     * Reset execution to initial state.
     */

    reset() {

        this._clearTimer();

        this.runId++;

        this.isRunning = false;
        this.isPaused = false;
        this.isCompleted = false;

        this.currentIndex = -1;
        this.currentStep = null;

        this.lastError = null;

        this._emitState();

        this._callCallback(
            "onReset",
            this.getState()
        );

        return true;

    }


    // ==========================================
    // STEP EXECUTION
    // ==========================================

    /**
     * Execute the next algorithm step.
     */

    _executeNextStep() {

        const nextIndex = this.currentIndex + 1;

        if (nextIndex >= this.steps.length) {

            this._complete();

            return null;

        }

        const step = this.steps[nextIndex];

        this.currentIndex = nextIndex;
        this.currentStep = step;

        const executionContext = {
            index: nextIndex,
            total: this.steps.length,

            stepNumber: nextIndex + 1,

            line: step.line,

            action: step.action,

            data: step.data,

            message: step.message,

            progress: (
                (nextIndex + 1) /
                this.steps.length
            ) * 100,

            isLastStep: (
                nextIndex === this.steps.length - 1
            )
        };

        try {

            // This single event synchronizes
            // code highlighting and canvas rendering.
            this._callCallback(
                "onStep",
                executionContext
            );

        } catch (error) {

            this._handleExecutionError(error);

            return null;

        }

        this._emitState();

        // Return execution information.
        return executionContext;

    }


    /**
     * Complete the algorithm.
     */

    _complete() {

        this._clearTimer();

        this.isRunning = false;
        this.isPaused = false;
        this.isCompleted = true;

        this.runId++;

        this._emitState();

        this._callCallback(
            "onComplete",
            {
                totalSteps: this.steps.length,
                currentIndex: this.currentIndex,
                finalStep: this.currentStep
            }
        );

    }


    // ==========================================
    // AUTOMATIC SCHEDULING
    // ==========================================

    /**
     * Schedule next step.
     */

    _scheduleNextStep(runId) {

        if (
            !this.isRunning ||
            this.isCompleted ||
            runId !== this.runId
        ) {
            return;
        }

        this._clearTimer();

        this.timer = setTimeout(() => {

            this.timer = null;

            if (
                !this.isRunning ||
                runId !== this.runId
            ) {
                return;
            }

            this._executeNextStep();

            if (
                this.isRunning &&
                !this.isCompleted
            ) {
                this._scheduleNextStep(runId);
            }

        }, this.getInterval());

    }


    /**
     * Execute first step and schedule remaining steps.
     */

    _executeAutomaticPlayback() {

        const runId = this.runId;

        this._executeNextStep();

        if (
            this.isRunning &&
            !this.isCompleted
        ) {
            this._scheduleNextStep(runId);
        }

    }


    // ==========================================
    // SPEED CONTROL
    // ==========================================

    /**
     * Set playback speed.
     *
     * 0.25 = Very Slow
     * 0.50 = Slow
     * 1.00 = Normal
     * 1.50 = Fast
     * 2.00 = Very Fast
     * 3.00 = Maximum
     */

    setSpeed(speed) {

        const numericSpeed = Number(speed);

        if (!Number.isFinite(numericSpeed)) {
            throw new TypeError(
                "Speed must be a valid number."
            );
        }

        this.speed = this._clampSpeed(numericSpeed);

        // Restart the pending timer using new speed.
        if (this.isRunning) {

            const runId = this.runId;

            this._scheduleNextStep(runId);

        }

        this._emitState();

        return this.speed;

    }


    getSpeed() {
        return this.speed;
    }


    getInterval() {

        return Math.max(
            50,
            Math.round(
                this.baseInterval / this.speed
            )
        );

    }


    _clampSpeed(speed) {

        return Math.min(
            3,
            Math.max(0.25, speed)
        );

    }


    // ==========================================
    // STATE INFORMATION
    // ==========================================

    /**
     * Return complete execution state.
     */

    getState() {

        return {
            isRunning: this.isRunning,

            isPaused: this.isPaused,

            isCompleted: this.isCompleted,

            currentIndex: this.currentIndex,

            currentStep: this.currentStep,

            totalSteps: this.steps.length,

            speed: this.speed,

            interval: this.getInterval(),

            progress: this.getProgress(),

            lastError: this.lastError
        };

    }


    getCurrentStep() {

        return this.currentStep;

    }


    getCurrentIndex() {

        return this.currentIndex;

    }


    getTotalSteps() {

        return this.steps.length;

    }


    getProgress() {

        if (this.steps.length === 0) {
            return 0;
        }

        return Math.max(
            0,
            (
                (this.currentIndex + 1) /
                this.steps.length
            ) * 100
        );

    }


    hasNextStep() {

        return (
            this.currentIndex <
            this.steps.length - 1
        );

    }


    isIdle() {

        return (
            !this.isRunning &&
            !this.isPaused &&
            !this.isCompleted
        );

    }


    // ==========================================
    // CALLBACK MANAGEMENT
    // ==========================================

    _emitState() {

        this._callCallback(
            "onStateChange",
            this.getState()
        );

    }


    _callCallback(name, payload) {

        const callback = this.callbacks[name];

        if (typeof callback === "function") {
            callback(payload);
        }

    }


    // ==========================================
    // ERROR HANDLING
    // ==========================================

    _handleExecutionError(error) {

        this._clearTimer();

        this.runId++;

        this.isRunning = false;
        this.isPaused = false;

        this.lastError = error;

        this._notifyError(error);

        this._emitState();

    }


    _notifyError(error) {

        this.lastError = error;

        if (typeof this.callbacks.onError === "function") {

            try {
                this.callbacks.onError(error);
            } catch (callbackError) {
                console.error(
                    "[DSA StepEngine] Error callback failed:",
                    callbackError
                );
            }

        } else {

            console.error(
                "[DSA StepEngine]",
                error
            );

        }

    }


    // ==========================================
    // TIMER MANAGEMENT
    // ==========================================

    _clearTimer() {

        if (this.timer !== null) {

            clearTimeout(this.timer);

            this.timer = null;

        }

    }


    // ==========================================
    // CLEANUP
    // ==========================================

    /**
     * Completely stop engine and release references.
     */

    destroy() {

        this._clearTimer();

        this.runId++;

        this.isRunning = false;
        this.isPaused = false;

        this.steps = [];

        this.currentIndex = -1;
        this.currentStep = null;

        this.callbacks = {
            onStep: null,
            onStateChange: null,
            onComplete: null,
            onReset: null,
            onError: null
        };

    }

}


// Default export.
export default StepEngine;
