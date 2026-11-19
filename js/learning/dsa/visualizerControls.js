
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/visualizerControls.js
 *
 * Controls:
 * Play, Pause, Next, Previous, Reset, Speed
 */

(function (global) {
    "use strict";

    class VisualizerControls {

        constructor(options = {}) {
            this.engine = options.engine || null;
            this.container = options.container || null;

            this.speed = options.speed || 1;
            this.minSpeed = 0.25;
            this.maxSpeed = 3;
            this.speedStep = 0.25;

            this.isPlaying = false;
            this.isDestroyed = false;

            this.totalSteps = 0;
            this.currentStep = 0;

            this.listeners = new Map();

            this.elements = {
                play: null,
                pause: null,
                next: null,
                previous: null,
                reset: null,
                speed: null,
                progress: null,
                progressText: null
            };

            this.callbacks = {
                onPlay: options.onPlay || null,
                onPause: options.onPause || null,
                onNext: options.onNext || null,
                onPrevious: options.onPrevious || null,
                onReset: options.onReset || null,
                onSpeedChange: options.onSpeedChange || null
            };

            if (this.container) {
                this.mount(this.container);
            }
        }

        // ---------------------------------------
        // INITIALIZATION
        // ---------------------------------------

        mount(container) {
            if (!container || !container.querySelector) {
                throw new TypeError(
                    "A valid controls container is required."
                );
            }

            this.container = container;

            this.elements.play =
                container.querySelector('[data-dsa-control="play"]');

            this.elements.pause =
                container.querySelector('[data-dsa-control="pause"]');

            this.elements.next =
                container.querySelector('[data-dsa-control="next"]');

            this.elements.previous =
                container.querySelector('[data-dsa-control="previous"]');

            this.elements.reset =
                container.querySelector('[data-dsa-control="reset"]');

            this.elements.speed =
                container.querySelector('[data-dsa-control="speed"]');

            this.elements.progress =
                container.querySelector('[data-dsa-control="progress"]');

            this.elements.progressText =
                container.querySelector('[data-dsa-control="progress-text"]');

            this.bindEvents();
            this.updateUI();

            return this;
        }

        // ---------------------------------------
        // EVENT BINDING
        // ---------------------------------------

        bindEvents() {
            this.unbindEvents();

            this.bind(
                this.elements.play,
                "click",
                () => this.play()
            );

            this.bind(
                this.elements.pause,
                "click",
                () => this.pause()
            );

            this.bind(
                this.elements.next,
                "click",
                () => this.next()
            );

            this.bind(
                this.elements.previous,
                "click",
                () => this.previous()
            );

            this.bind(
                this.elements.reset,
                "click",
                () => this.reset()
            );

            this.bind(
                this.elements.speed,
                "input",
                event => {
                    this.setSpeed(Number(event.target.value));
                }
            );

            this.updateUI();
        }

        bind(element, eventName, callback) {
            if (!element) return;

            element.addEventListener(eventName, callback);

            this.listeners.set(
                `${eventName}-${this.listeners.size}`,
                {
                    element,
                    eventName,
                    callback
                }
            );
        }

        unbindEvents() {
            this.listeners.forEach(listener => {
                listener.element.removeEventListener(
                    listener.eventName,
                    listener.callback
                );
            });

            this.listeners.clear();
        }

        // ---------------------------------------
        // ENGINE CONNECTION
        // ---------------------------------------

        setEngine(engine) {
            if (!engine) {
                throw new TypeError(
                    "A valid step engine is required."
                );
            }

            this.engine = engine;

            this.isPlaying = false;
            this.syncFromEngine();

            return this;
        }

        getEngine() {
            return this.engine;
        }

        callEngine(method, ...args) {
            if (!this.engine) {
                return false;
            }

            if (typeof this.engine[method] !== "function") {
                console.warn(
                    `StepEngine method "${method}" is not available.`
                );

                return false;
            }

            return this.engine[method](...args);
        }

        // ---------------------------------------
        // PLAY
        // ---------------------------------------

        play() {
            if (this.isDestroyed || !this.engine) {
                return false;
            }

            const result = this.callEngine("play");

            this.isPlaying = result !== false;

            if (this.callbacks.onPlay) {
                this.callbacks.onPlay({
                    step: this.currentStep,
                    speed: this.speed
                });
            }

            this.updateUI();

            return result;
        }

        // ---------------------------------------
        // PAUSE
        // ---------------------------------------

        pause() {
            if (this.isDestroyed) return false;

            const result = this.callEngine("pause");

            this.isPlaying = false;

            if (this.callbacks.onPause) {
                this.callbacks.onPause({
                    step: this.currentStep
                });
            }

            this.updateUI();

            return result;
        }

        // ---------------------------------------
        // NEXT STEP
        // ---------------------------------------

        next() {
            if (this.isDestroyed || !this.engine) {
                return false;
            }

            const result = this.callEngine("next");

            this.syncFromEngine();

            if (this.callbacks.onNext) {
                this.callbacks.onNext({
                    step: this.currentStep,
                    result
                });
            }

            this.updateUI();

            return result;
        }

        // ---------------------------------------
        // PREVIOUS STEP
        // ---------------------------------------

        previous() {
            if (this.isDestroyed || !this.engine) {
                return false;
            }

            const result = this.callEngine("previous");

            this.syncFromEngine();

            if (this.callbacks.onPrevious) {
                this.callbacks.onPrevious({
                    step: this.currentStep,
                    result
                });
            }

            this.updateUI();

            return result;
        }

        // ---------------------------------------
        // RESET
        // ---------------------------------------

        reset() {
            if (this.isDestroyed || !this.engine) {
                return false;
            }

            this.isPlaying = false;

            const result = this.callEngine("reset");

            this.syncFromEngine();

            if (this.callbacks.onReset) {
                this.callbacks.onReset();
            }

            this.updateUI();

            return result;
        }

        // ---------------------------------------
        // SPEED MANAGEMENT
        // ---------------------------------------

        setSpeed(speed) {
            if (!Number.isFinite(speed)) {
                return false;
            }

            const normalizedSpeed = Math.max(
                this.minSpeed,
                Math.min(this.maxSpeed, speed)
            );

            this.speed = normalizedSpeed;

            this.callEngine("setSpeed", normalizedSpeed);

            if (this.callbacks.onSpeedChange) {
                this.callbacks.onSpeedChange(normalizedSpeed);
            }

            this.updateUI();

            return this.speed;
        }

        increaseSpeed() {
            return this.setSpeed(
                this.speed + this.speedStep
            );
        }

        decreaseSpeed() {
            return this.setSpeed(
                this.speed - this.speedStep
            );
        }

        // ---------------------------------------
        // PROGRESS MANAGEMENT
        // ---------------------------------------

        setProgress(current, total) {
            this.currentStep = Math.max(
                0,
                Number(current) || 0
            );

            this.totalSteps = Math.max(
                0,
                Number(total) || 0
            );

            this.updateUI();
        }

        syncFromEngine() {
            if (!this.engine) return;

            if (typeof this.engine.getCurrentStep === "function") {
                this.currentStep =
                    this.engine.getCurrentStep();
            } else if (
                Number.isFinite(this.engine.currentStep)
            ) {
                this.currentStep = this.engine.currentStep;
            } else if (
                Number.isFinite(this.engine.currentIndex)
            ) {
                this.currentStep = this.engine.currentIndex;
            }

            if (typeof this.engine.getTotalSteps === "function") {
                this.totalSteps =
                    this.engine.getTotalSteps();
            } else if (
                Number.isFinite(this.engine.totalSteps)
            ) {
                this.totalSteps = this.engine.totalSteps;
            } else if (
                Array.isArray(this.engine.steps)
            ) {
                this.totalSteps = this.engine.steps.length;
            }
        }

        getProgress() {
            if (this.totalSteps <= 0) return 0;

            return Math.min(
                100,
                (this.currentStep / this.totalSteps) * 100
            );
        }

        // ---------------------------------------
        // UI UPDATE
        // ---------------------------------------

        updateUI() {
            if (!this.container) return;

            const progress = this.getProgress();

            if (this.elements.play) {
                this.elements.play.disabled = this.isPlaying;
            }

            if (this.elements.pause) {
                this.elements.pause.disabled = !this.isPlaying;
            }

            if (this.elements.previous) {
                this.elements.previous.disabled =
                    this.currentStep <= 0;
            }

            if (this.elements.next) {
                this.elements.next.disabled =
                    this.totalSteps > 0 &&
                    this.currentStep >= this.totalSteps;
            }

            if (this.elements.speed) {
                this.elements.speed.value = String(this.speed);
            }

            if (this.elements.progress) {
                this.elements.progress.max = 100;
                this.elements.progress.value = progress;
            }

            if (this.elements.progressText) {
                this.elements.progressText.textContent =
                    `${this.currentStep} / ${this.totalSteps}`;
            }

            this.container.dataset.playing =
                String(this.isPlaying);

            this.container.dataset.speed =
                String(this.speed);
        }

        // ---------------------------------------
        // KEYBOARD SHORTCUTS
        // ---------------------------------------

        handleKeyboard(event) {
            if (!event || event.repeat) return false;

            const target = event.target;

            if (
                target &&
                (
                    target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable
                )
            ) {
                return false;
            }

            switch (event.code) {
                case "Space":
                    event.preventDefault();

                    if (this.isPlaying) {
                        this.pause();
                    } else {
                        this.play();
                    }

                    return true;

                case "ArrowRight":
                    event.preventDefault();
                    this.next();
                    return true;

                case "ArrowLeft":
                    event.preventDefault();
                    this.previous();
                    return true;

                case "ArrowUp":
                    event.preventDefault();
                    this.increaseSpeed();
                    return true;

                case "ArrowDown":
                    event.preventDefault();
                    this.decreaseSpeed();
                    return true;

                case "KeyR":
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault();
                        this.reset();
                        return true;
                    }
                    return false;

                default:
                    return false;
            }
        }

        enableKeyboardShortcuts() {
            if (this.keyboardHandler) return;

            this.keyboardHandler = event => {
                this.handleKeyboard(event);
            };

            global.addEventListener(
                "keydown",
                this.keyboardHandler
            );
        }

        disableKeyboardShortcuts() {
            if (!this.keyboardHandler) return;

            global.removeEventListener(
                "keydown",
                this.keyboardHandler
            );

            this.keyboardHandler = null;
        }

        // ---------------------------------------
        // STATE
        // ---------------------------------------

        getState() {
            return {
                isPlaying: this.isPlaying,
                speed: this.speed,
                currentStep: this.currentStep,
                totalSteps: this.totalSteps,
                progress: this.getProgress()
            };
        }

        // ---------------------------------------
        // CLEANUP
        // ---------------------------------------

        destroy() {
            if (this.isDestroyed) return;

            this.pause();

            this.unbindEvents();
            this.disableKeyboardShortcuts();

            this.container = null;
            this.engine = null;

            this.elements = {
                play: null,
                pause: null,
                next: null,
                previous: null,
                reset: null,
                speed: null,
                progress: null,
                progressText: null
            };

            this.isDestroyed = true;
        }
    }

    // ---------------------------------------
    // GLOBAL EXPORT
    // ---------------------------------------

    global.VisualizerControls = VisualizerControls;

    // ---------------------------------------
    // MODULE EXPORT
    // ---------------------------------------

    if (typeof module !== "undefined" && module.exports) {
        module.exports = VisualizerControls;
    }

})(typeof window !== "undefined" ? window : globalThis);
