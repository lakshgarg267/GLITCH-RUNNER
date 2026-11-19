
/**
 * GLITCH-RUNNER
 * DSA VISUAL LEARNING SYSTEM
 *
 * FILE: animationUtils.js
 *
 * PURPOSE:
 * Reusable mathematical animation utilities for
 * character-based DSA visualizations.
 *
 * FEATURES:
 * - Smooth interpolation
 * - Easing functions
 * - Arc jumping
 * - Sliding movement
 * - Object swapping
 * - Pointer movement
 * - Spring motion
 * - Circular motion
 * - Distance calculation
 * - Animation progress
 * - Coordinate conversion
 *
 * No external libraries required.
 */

const AnimationUtils = (() => {

    "use strict";

    // ==========================================
    // CONSTANTS
    // ==========================================

    const EPSILON = 0.000001;

    const DEFAULT_DURATION = 600;

    const DEFAULT_ARC_HEIGHT = 90;


    // ==========================================
    // BASIC MATHEMATICS
    // ==========================================

    function clamp(value, min = 0, max = 1) {

        return Math.min(
            max,
            Math.max(min, value)
        );

    }


    function lerp(start, end, progress) {

        return start + (end - start) * progress;

    }


    function inverseLerp(start, end, value) {

        if (Math.abs(end - start) < EPSILON) {
            return 0;
        }

        return (value - start) / (end - start);

    }


    function mapRange(
        value,
        inputMin,
        inputMax,
        outputMin,
        outputMax
    ) {

        const progress = clamp(
            inverseLerp(
                inputMin,
                inputMax,
                value
            )
        );

        return lerp(
            outputMin,
            outputMax,
            progress
        );

    }


    function distance(x1, y1, x2, y2) {

        return Math.hypot(
            x2 - x1,
            y2 - y1
        );

    }


    function distanceBetweenPoints(start, end) {

        return distance(
            start.x,
            start.y,
            end.x,
            end.y
        );

    }


    // ==========================================
    // EASING FUNCTIONS
    // ==========================================

    const easing = {

        linear(t) {
            return t;
        },

        easeInQuad(t) {
            return t * t;
        },

        easeOutQuad(t) {
            return t * (2 - t);
        },

        easeInOutQuad(t) {
            return t < 0.5
                ? 2 * t * t
                : 1 - Math.pow(-2 * t + 2, 2) / 2;
        },

        easeInCubic(t) {
            return t * t * t;
        },

        easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        },

        easeInOutCubic(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        },

        easeInQuart(t) {
            return t * t * t * t;
        },

        easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        },

        easeInOutQuart(t) {
            return t < 0.5
                ? 8 * Math.pow(t, 4)
                : 1 - Math.pow(-2 * t + 2, 4) / 2;
        },

        easeOutBack(t) {

            const c1 = 1.70158;
            const c3 = c1 + 1;

            return (
                1 +
                c3 * Math.pow(t - 1, 3) +
                c1 * Math.pow(t - 1, 2)
            );

        },

        easeOutBounce(t) {

            const n1 = 7.5625;
            const d1 = 2.75;

            if (t < 1 / d1) {
                return n1 * t * t;
            }

            if (t < 2 / d1) {
                return (
                    n1 *
                    (t -= 1.5 / d1) *
                    t +
                    0.75
                );
            }

            if (t < 2.5 / d1) {
                return (
                    n1 *
                    (t -= 2.25 / d1) *
                    t +
                    0.9375
                );
            }

            return (
                n1 *
                (t -= 2.625 / d1) *
                t +
                0.984375
            );

        },

        easeInOutSine(t) {

            return -(
                Math.cos(Math.PI * t) - 1
            ) / 2;

        },

        easeOutElastic(t) {

            if (t === 0 || t === 1) {
                return t;
            }

            const c4 = (2 * Math.PI) / 3;

            return (
                Math.pow(2, -10 * t) *
                Math.sin((t * 10 - 0.75) * c4) +
                1
            );

        }

    };


    function getEasing(name = "easeInOutCubic") {

        const selected = easing[name];

        if (typeof selected !== "function") {
            throw new Error(
                `Unknown easing function: ${name}`
            );
        }

        return selected;

    }


    // ==========================================
    // PROGRESS CALCULATION
    // ==========================================

    function getProgress(
        currentTime,
        startTime,
        duration
    ) {

        if (!Number.isFinite(duration) || duration <= 0) {
            return 1;
        }

        return clamp(
            (currentTime - startTime) / duration
        );

    }


    function getAnimationProgress(
        elapsed,
        duration
    ) {

        if (duration <= 0) {
            return 1;
        }

        return clamp(elapsed / duration);

    }


    function isAnimationComplete(
        elapsed,
        duration
    ) {

        return elapsed >= duration;

    }


    // ==========================================
    // POINT INTERPOLATION
    // ==========================================

    function interpolatePoint(
        start,
        end,
        progress,
        easingName = "easeInOutCubic"
    ) {

        const ease = getEasing(easingName);

        const t = ease(clamp(progress));

        return {

            x: lerp(start.x, end.x, t),

            y: lerp(start.y, end.y, t)

        };

    }


    // ==========================================
    // SLIDE ANIMATION
    // ==========================================

    /**
     * Smooth horizontal or vertical movement.
     *
     * Useful for:
     * - Array elements
     * - Binary search pointers
     * - Sliding windows
     * - Queue movement
     * - Linked list pointers
     */

    function slide(
        start,
        end,
        progress,
        easingName = "easeInOutCubic"
    ) {

        const ease = getEasing(easingName);

        const t = ease(clamp(progress));

        return {

            x: lerp(start.x, end.x, t),

            y: lerp(start.y, end.y, t),

            progress: t

        };

    }


    // ==========================================
    // JUMP / ARC ANIMATION
    // ==========================================

    /**
     * Move an object along a smooth arc.
     *
     * Useful for:
     * - Sorting characters
     * - Array swaps
     * - Element insertion
     * - Element removal
     */

    function jump(
        start,
        end,
        progress,
        options = {}
    ) {

        const t = clamp(progress);

        const ease = getEasing(
            options.easing || "easeInOutCubic"
        );

        const movement = ease(t);

        const arcHeight = Math.max(
            0,
            Number(options.arcHeight) || DEFAULT_ARC_HEIGHT
        );

        const direction = (
            options.direction === "down"
                ? 1
                : -1
        );

        const x = lerp(
            start.x,
            end.x,
            movement
        );

        const baseY = lerp(
            start.y,
            end.y,
            movement
        );

        const arc = (
            Math.sin(Math.PI * t) *
            arcHeight *
            direction
        );

        return {

            x,

            y: baseY + arc,

            progress: t,

            arcHeight: Math.abs(arc),

            finished: t >= 1

        };

    }


    // ==========================================
    // QUADRATIC BEZIER MOVEMENT
    // ==========================================

    function quadraticBezier(
        start,
        control,
        end,
        progress
    ) {

        const t = clamp(progress);

        const inverse = 1 - t;

        const x =
            inverse * inverse * start.x +
            2 * inverse * t * control.x +
            t * t * end.x;

        const y =
            inverse * inverse * start.y +
            2 * inverse * t * control.y +
            t * t * end.y;

        return { x, y };

    }


    // ==========================================
    // CUBIC BEZIER MOVEMENT
    // ==========================================

    function cubicBezier(
        start,
        control1,
        control2,
        end,
        progress
    ) {

        const t = clamp(progress);

        const inverse = 1 - t;

        const x =
            Math.pow(inverse, 3) * start.x +
            3 * Math.pow(inverse, 2) * t * control1.x +
            3 * inverse * Math.pow(t, 2) * control2.x +
            Math.pow(t, 3) * end.x;

        const y =
            Math.pow(inverse, 3) * start.y +
            3 * Math.pow(inverse, 2) * t * control1.y +
            3 * inverse * Math.pow(t, 2) * control2.y +
            Math.pow(t, 3) * end.y;

        return { x, y };

    }


    // ==========================================
    // SWAP ANIMATION
    // ==========================================

    /**
     * Animate two objects crossing each other.
     *
     * First object moves in an upper arc.
     * Second object moves in a lower arc.
     *
     * IMPORTANT:
     * This function only calculates positions.
     * CanvasRenderer draws the actual objects.
     */

    function swapPositions(
        firstStart,
        secondStart,
        progress,
        options = {}
    ) {

        const t = clamp(progress);

        const arcHeight = Math.max(
            0,
            Number(options.arcHeight) || 65
        );

        const ease = getEasing(
            options.easing || "easeInOutCubic"
        );

        const movement = ease(t);

        const firstDirection = (
            options.firstDirection === "down"
                ? 1
                : -1
        );

        const secondDirection = -firstDirection;

        const firstPosition = jump(
            firstStart,
            secondStart,
            movement,
            {
                arcHeight,
                direction: (
                    firstDirection === 1
                        ? "down"
                        : "up"
                ),
                easing: "linear"
            }
        );

        const secondPosition = jump(
            secondStart,
            firstStart,
            movement,
            {
                arcHeight,
                direction: (
                    secondDirection === 1
                        ? "down"
                        : "up"
                ),
                easing: "linear"
            }
        );

        return {

            first: firstPosition,

            second: secondPosition,

            progress: movement,

            finished: t >= 1

        };

    }


    // ==========================================
    // POINTER ANIMATION
    // ==========================================

    /**
     * Animate pointers such as:
     * low, high, mid, left, right, i, j.
     */

    function movePointer(
        currentPosition,
        targetPosition,
        progress,
        options = {}
    ) {

        const ease = getEasing(
            options.easing || "easeOutCubic"
        );

        const t = ease(clamp(progress));

        return {

            x: lerp(
                currentPosition.x,
                targetPosition.x,
                t
            ),

            y: lerp(
                currentPosition.y,
                targetPosition.y,
                t
            ),

            label: options.label || "",

            visible: options.visible !== false,

            progress: t

        };

    }


    // ==========================================
    // SCALE ANIMATION
    // ==========================================

    function scale(
        startScale,
        endScale,
        progress,
        easingName = "easeOutBack"
    ) {

        const ease = getEasing(easingName);

        return lerp(
            startScale,
            endScale,
            ease(clamp(progress))
        );

    }


    // ==========================================
    // FADE ANIMATION
    // ==========================================

    function fade(
        startOpacity,
        endOpacity,
        progress,
        easingName = "linear"
    ) {

        const ease = getEasing(easingName);

        return clamp(
            lerp(
                startOpacity,
                endOpacity,
                ease(clamp(progress))
            )
        );

    }


    // ==========================================
    // ROTATION ANIMATION
    // ==========================================

    function rotate(
        startAngle,
        endAngle,
        progress,
        easingName = "easeInOutCubic"
    ) {

        const ease = getEasing(easingName);

        return lerp(
            startAngle,
            endAngle,
            ease(clamp(progress))
        );

    }


    // ==========================================
    // SPRING ANIMATION
    // ==========================================

    /**
     * Damped spring movement.
     *
     * Useful for:
     * - Character landing
     * - Button interactions
     * - Node appearance
     */

    function spring(
        start,
        end,
        progress,
        options = {}
    ) {

        const damping = Math.max(
            0,
            Number(options.damping) || 6
        );

        const frequency = Math.max(
            0.1,
            Number(options.frequency) || 10
        );

        const t = clamp(progress);

        const oscillation = (
            1 -
            Math.exp(-damping * t) *
            Math.cos(frequency * t)
        );

        return lerp(
            start,
            end,
            oscillation
        );

    }


    // ==========================================
    // PULSE ANIMATION
    // ==========================================

    /**
     * Repeating pulse effect.
     *
     * Useful for active elements and targets.
     */

    function pulse(
        time,
        options = {}
    ) {

        const frequency = Math.max(
            0.01,
            Number(options.frequency) || 2
        );

        const minimum = (
            options.minimum ?? 0.85
        );

        const maximum = (
            options.maximum ?? 1.15
        );

        const wave = (
            Math.sin(time * frequency * Math.PI * 2) + 1
        ) / 2;

        return lerp(
            minimum,
            maximum,
            wave
        );

    }


    // ==========================================
    // WINDOW INTERPOLATION
    // ==========================================

    /**
     * Calculate a smooth sliding window.
     *
     * Useful for:
     * - Sliding Window
     * - Array range highlighting
     */

    function interpolateWindow(
        startLeft,
        startRight,
        endLeft,
        endRight,
        progress
    ) {

        const t = easing.easeInOutCubic(
            clamp(progress)
        );

        return {

            left: lerp(
                startLeft,
                endLeft,
                t
            ),

            right: lerp(
                startRight,
                endRight,
                t
            ),

            width: lerp(
                startRight - startLeft,
                endRight - endLeft,
                t
            )

        };

    }


    // ==========================================
    // COLOR INTERPOLATION
    // ==========================================

    /**
     * Blend two hexadecimal colors.
     *
     * Useful for theme-aware visual transitions.
     */

    function interpolateColor(
        colorA,
        colorB,
        progress
    ) {

        function parseColor(color) {

            const normalized = String(color)
                .replace("#", "")
                .trim();

            if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
                throw new Error(
                    `Invalid hexadecimal color: ${color}`
                );
            }

            return {

                r: parseInt(
                    normalized.slice(0, 2),
                    16
                ),

                g: parseInt(
                    normalized.slice(2, 4),
                    16
                ),

                b: parseInt(
                    normalized.slice(4, 6),
                    16
                )

            };

        }

        const a = parseColor(colorA);
        const b = parseColor(colorB);

        const t = clamp(progress);

        const r = Math.round(
            lerp(a.r, b.r, t)
        );

        const g = Math.round(
            lerp(a.g, b.g, t)
        );

        const blue = Math.round(
            lerp(a.b, b.b, t)
        );

        return (
            "#" +
            [r, g, blue]
                .map(value =>
                    value.toString(16).padStart(2, "0")
                )
                .join("")
        );

    }


    // ==========================================
    // CIRCULAR MOVEMENT
    // ==========================================

    /**
     * Circular orbit for graph and tree animations.
     */

    function circularPosition(
        centerX,
        centerY,
        radius,
        angle
    ) {

        return {

            x: centerX + Math.cos(angle) * radius,

            y: centerY + Math.sin(angle) * radius

        };

    }


    // ==========================================
    // ARRAY POSITION HELPERS
    // ==========================================

    /**
     * Convert an array index into canvas position.
     */

    function getArrayPosition(
        index,
        options = {}
    ) {

        const startX = options.startX ?? 60;

        const startY = options.startY ?? 200;

        const spacing = options.spacing ?? 80;

        return {

            x: startX + index * spacing,

            y: startY,

            index

        };

    }


    /**
     * Calculate bar height based on value.
     */

    function getBarHeight(
        value,
        maximumValue,
        maximumHeight = 250
    ) {

        if (
            !Number.isFinite(value) ||
            !Number.isFinite(maximumValue) ||
            maximumValue <= 0
        ) {
            return 0;
        }

        return clamp(
            value / maximumValue,
            0,
            1
        ) * maximumHeight;

    }


    // ==========================================
    // ANIMATION FRAME INFORMATION
    // ==========================================

    /**
     * Generate animation information using
     * elapsed time instead of frame counting.
     */

    function createFrame(
        elapsed,
        duration,
        easingName = "easeInOutCubic"
    ) {

        const progress = getAnimationProgress(
            elapsed,
            duration
        );

        const ease = getEasing(easingName);

        return {

            elapsed,

            duration,

            progress,

            easedProgress: ease(progress),

            remaining: Math.max(
                0,
                duration - elapsed
            ),

            finished: progress >= 1

        };

    }


    // ==========================================
    // PUBLIC API
    // ==========================================

    return Object.freeze({

        DEFAULT_DURATION,
        DEFAULT_ARC_HEIGHT,

        clamp,
        lerp,
        inverseLerp,
        mapRange,

        distance,
        distanceBetweenPoints,

        easing,
        getEasing,

        getProgress,
        getAnimationProgress,
        isAnimationComplete,

        interpolatePoint,

        slide,
        jump,

        quadraticBezier,
        cubicBezier,

        swapPositions,
        movePointer,

        scale,
        fade,
        rotate,

        spring,
        pulse,

        interpolateWindow,
        interpolateColor,

        circularPosition,

        getArrayPosition,
        getBarHeight,

        createFrame

    });

})();


// Browser export (classic-script compatible).
if (typeof window !== "undefined") {
    window.AnimationUtils = AnimationUtils;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = AnimationUtils;
}
