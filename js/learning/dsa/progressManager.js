
/**
 * GLITCH-RUNNER
 * DSA Learning System
 * File: js/learning/dsa/progressManager.js
 *
 * Responsibilities:
 * - Track learning progress
 * - Store completed topics
 * - Manage XP and levels
 * - Calculate mastery
 * - Track daily learning streaks
 * - Save progress persistently
 * - Manage learning achievements
 */

(function (global) {
    "use strict";

    class ProgressManager {

        constructor(options = {}) {
            this.storageKey =
                options.storageKey || "glitchRunnerDSAProgress";

            this.xpPerTopic =
                Number(options.xpPerTopic) || 100;

            this.xpPerStep =
                Number(options.xpPerStep) || 1;

            this.maxDailyXP =
                Number(options.maxDailyXP) || 1000;

            this.listeners = new Set();

            this.data = this.load();

            this.checkDailyActivity();
        }

        // ---------------------------------------
        // DEFAULT DATA
        // ---------------------------------------

        getDefaultData() {
            return {
                version: 1,

                totalXP: 0,

                completedTopics: [],

                completedAlgorithms: [],

                topicProgress: {},

                categoryProgress: {},

                dailyActivity: {},

                currentStreak: 0,

                longestStreak: 0,

                lastActiveDate: null,

                achievements: [],

                totalStepsCompleted: 0,

                totalLearningTime: 0,

                createdAt: new Date().toISOString(),

                updatedAt: new Date().toISOString()
            };
        }

        // ---------------------------------------
        // DATE UTILITIES
        // ---------------------------------------

        getDateKey(date = new Date()) {
            const year = date.getFullYear();

            const month = String(
                date.getMonth() + 1
            ).padStart(2, "0");

            const day = String(
                date.getDate()
            ).padStart(2, "0");

            return `${year}-${month}-${day}`;
        }

        getPreviousDate(date = new Date()) {
            const previous = new Date(date);

            previous.setDate(previous.getDate() - 1);

            return this.getDateKey(previous);
        }

        // ---------------------------------------
        // STORAGE
        // ---------------------------------------

        load() {
            try {
                if (!global.localStorage) {
                    return this.getDefaultData();
                }

                const stored =
                    global.localStorage.getItem(this.storageKey);

                if (!stored) {
                    return this.getDefaultData();
                }

                const parsed = JSON.parse(stored);

                if (
                    !parsed ||
                    typeof parsed !== "object" ||
                    parsed.version !== 1
                ) {
                    return this.getDefaultData();
                }

                return {
                    ...this.getDefaultData(),
                    ...parsed
                };

            } catch (error) {
                console.error(
                    "Failed to load DSA progress:",
                    error
                );

                return this.getDefaultData();
            }
        }

        save() {
            this.data.updatedAt = new Date().toISOString();

            try {
                if (!global.localStorage) {
                    return false;
                }

                global.localStorage.setItem(
                    this.storageKey,
                    JSON.stringify(this.data)
                );

                return true;

            } catch (error) {
                console.error(
                    "Failed to save DSA progress:",
                    error
                );

                return false;
            }
        }

        // ---------------------------------------
        // EVENT SYSTEM
        // ---------------------------------------

        onChange(callback) {
            if (typeof callback !== "function") {
                throw new TypeError(
                    "Callback must be a function."
                );
            }

            this.listeners.add(callback);

            return () => {
                this.offChange(callback);
            };
        }

        offChange(callback) {
            this.listeners.delete(callback);
        }

        emit(eventName, details = {}) {
            const event = {
                type: eventName,
                details,
                progress: this.getOverview(),
                timestamp: new Date().toISOString()
            };

            this.listeners.forEach(callback => {
                try {
                    callback(event);
                } catch (error) {
                    console.error(
                        "Progress listener error:",
                        error
                    );
                }
            });

            this.save();
        }

        // ---------------------------------------
        // DAILY ACTIVITY
        // ---------------------------------------

        checkDailyActivity() {
            const today = this.getDateKey();

            const previous = this.getPreviousDate();

            if (!this.data.lastActiveDate) {
                this.data.currentStreak = 0;
            } else if (
                this.data.lastActiveDate === today
            ) {
                // Streak already updated today.
            } else if (
                this.data.lastActiveDate === previous
            ) {
                // Streak will increase when learning happens.
            } else {
                this.data.currentStreak = 0;
            }

            this.save();
        }

        recordActivity() {
            const today = this.getDateKey();

            if (!this.data.dailyActivity[today]) {
                this.data.dailyActivity[today] = {
                    xp: 0,
                    steps: 0,
                    topics: 0,
                    learningTime: 0
                };
            }

            if (this.data.lastActiveDate !== today) {
                const previous = this.getPreviousDate();

                if (this.data.lastActiveDate === previous) {
                    this.data.currentStreak += 1;
                } else {
                    this.data.currentStreak = 1;
                }

                this.data.lastActiveDate = today;

                this.data.longestStreak = Math.max(
                    this.data.longestStreak,
                    this.data.currentStreak
                );
            }

            return this.data.dailyActivity[today];
        }

        // ---------------------------------------
        // XP MANAGEMENT
        // ---------------------------------------

        addXP(amount, reason = "learning") {
            const value = Math.max(
                0,
                Math.floor(Number(amount) || 0)
            );

            if (value <= 0) return 0;

            const activity = this.recordActivity();

            const remaining = Math.max(
                0,
                this.maxDailyXP - activity.xp
            );

            const awarded = Math.min(value, remaining);

            if (awarded <= 0) return 0;

            this.data.totalXP += awarded;

            activity.xp += awarded;

            this.checkAchievements();

            this.emit("xp-earned", {
                amount: awarded,
                reason,
                totalXP: this.data.totalXP
            });

            return awarded;
        }

        getTotalXP() {
            return this.data.totalXP;
        }

        getLevel() {
            const xp = this.data.totalXP;

            return Math.floor(xp / 500) + 1;
        }

        getXPForNextLevel() {
            const level = this.getLevel();

            return level * 500;
        }

        getLevelProgress() {
            const currentLevelXP =
                (this.getLevel() - 1) * 500;

            const nextLevelXP = this.getLevel() * 500;

            return {
                current: this.data.totalXP - currentLevelXP,
                required: nextLevelXP - currentLevelXP,
                percentage:
                    ((this.data.totalXP - currentLevelXP) / 500) * 100
            };
        }

        // ---------------------------------------
        // STEP TRACKING
        // ---------------------------------------

        recordStep(topicId, stepCount = 1) {
            if (!topicId) return false;

            const count = Math.max(
                0,
                Math.floor(Number(stepCount) || 0)
            );

            if (count <= 0) return false;

            const activity = this.recordActivity();

            activity.steps += count;

            this.data.totalStepsCompleted += count;

            this.addXP(
                count * this.xpPerStep,
                "step-completed"
            );

            this.emit("step-completed", {
                topicId,
                steps: count
            });

            return true;
        }

        // ---------------------------------------
        // TOPIC PROGRESS
        // ---------------------------------------

        updateTopicProgress(topicId, percentage, category = "general") {
            if (!topicId) return false;

            const progress = Math.max(
                0,
                Math.min(100, Number(percentage) || 0)
            );

            const previous =
                this.data.topicProgress[topicId];

            const previousProgress =
                previous ? previous.percentage : 0;

            this.data.topicProgress[topicId] = {
                percentage: Math.max(
                    previousProgress,
                    progress
                ),

                category,

                updatedAt: new Date().toISOString()
            };

            this.updateCategoryProgress(category);

            this.emit("topic-progress", {
                topicId,
                percentage: this.data.topicProgress[topicId].percentage,
                category
            });

            return true;
        }

        getTopicProgress(topicId) {
            const topic = this.data.topicProgress[topicId];

            return topic ? topic.percentage : 0;
        }

        // ---------------------------------------
        // TOPIC COMPLETION
        // ---------------------------------------

        completeTopic(topicId, category = "general") {
            if (!topicId) return false;

            if (this.data.completedTopics.includes(topicId)) {
                return false;
            }

            this.data.completedTopics.push(topicId);
            if (!this.data.completedAlgorithms.includes(topicId)) {
                this.data.completedAlgorithms.push(topicId);
            }

            this.data.topicProgress[topicId] = {
                percentage: 100,
                category,
                completedAt: new Date().toISOString()
            };

            const activity = this.recordActivity();

            activity.topics += 1;

            this.updateCategoryProgress(category);

            this.addXP(
                this.xpPerTopic,
                "topic-completed"
            );

            this.checkAchievements();

            this.emit("topic-completed", {
                topicId,
                category
            });

            return true;
        }

        isTopicCompleted(topicId) {
            return this.data.completedTopics.includes(topicId);
        }

        getCompletedTopics() {
            return [...this.data.completedTopics];
        }

        // ---------------------------------------
        // ALGORITHM COMPLETION
        // ---------------------------------------

        completeAlgorithm(algorithmId) {
            if (!algorithmId) return false;

            if (
                this.data.completedAlgorithms.includes(
                    algorithmId
                )
            ) {
                return false;
            }

            this.data.completedAlgorithms.push(algorithmId);

            this.addXP(50, "algorithm-completed");

            this.emit("algorithm-completed", {
                algorithmId
            });

            return true;
        }

        isAlgorithmCompleted(algorithmId) {
            return this.data.completedAlgorithms.includes(
                algorithmId
            );
        }

        // ---------------------------------------
        // CATEGORY PROGRESS
        // ---------------------------------------

        updateCategoryProgress(category) {
            const topics = Object.entries(
                this.data.topicProgress
            ).filter(([id, topic]) => {
                return topic.category === category;
            });

            if (!topics.length) {
                this.data.categoryProgress[category] = 0;
                return 0;
            }

            const total = topics.reduce(
                (sum, [, topic]) => sum + topic.percentage,
                0
            );

            const percentage = Math.round(
                total / topics.length
            );

            this.data.categoryProgress[category] = percentage;

            return percentage;
        }

        getCategoryProgress(category) {
            return this.data.categoryProgress[category] || 0;
        }

        // ---------------------------------------
        // MASTERY
        // ---------------------------------------

        getMastery(topicId) {
            const percentage = this.getTopicProgress(topicId);

            let level = "Not Started";

            if (percentage >= 100) {
                level = "Mastered";
            } else if (percentage >= 75) {
                level = "Advanced";
            } else if (percentage >= 50) {
                level = "Intermediate";
            } else if (percentage > 0) {
                level = "Beginner";
            }

            return {
                percentage,
                level
            };
        }

        getOverallMastery() {
            const topics = Object.values(
                this.data.topicProgress
            );

            if (!topics.length) return 0;

            const total = topics.reduce(
                (sum, topic) => sum + topic.percentage,
                0
            );

            return Math.round(total / topics.length);
        }

        // ---------------------------------------
        // LEARNING TIME
        // ---------------------------------------

        recordLearningTime(seconds) {
            const value = Math.max(
                0,
                Number(seconds) || 0
            );

            if (!value) return false;

            const activity = this.recordActivity();

            activity.learningTime += value;

            this.data.totalLearningTime += value;

            this.emit("learning-time-recorded", {
                seconds: value
            });

            return true;
        }

        getTotalLearningTime() {
            return this.data.totalLearningTime;
        }

        // ---------------------------------------
        // STREAK
        // ---------------------------------------

        getStreak() {
            return {
                current: this.data.currentStreak,
                longest: this.data.longestStreak,
                lastActiveDate: this.data.lastActiveDate
            };
        }

        // ---------------------------------------
        // ACHIEVEMENTS
        // ---------------------------------------

        checkAchievements() {
            const rules = [
                {
                    id: "first-topic",
                    title: "First Steps",
                    description: "Complete your first topic.",
                    condition: () =>
                        this.data.completedTopics.length >= 1
                },
                {
                    id: "five-topics",
                    title: "Fast Learner",
                    description: "Complete five topics.",
                    condition: () =>
                        this.data.completedTopics.length >= 5
                },
                {
                    id: "ten-topics",
                    title: "DSA Explorer",
                    description: "Complete ten topics.",
                    condition: () =>
                        this.data.completedTopics.length >= 10
                },
                {
                    id: "first-algorithm",
                    title: "Algorithm Starter",
                    description: "Complete your first algorithm.",
                    condition: () =>
                        this.data.completedAlgorithms.length >= 1
                },
                {
                    id: "seven-day-streak",
                    title: "Consistency Champion",
                    description: "Maintain a seven-day learning streak.",
                    condition: () =>
                        this.data.currentStreak >= 7
                },
                {
                    id: "thousand-xp",
                    title: "XP Collector",
                    description: "Earn 1000 XP.",
                    condition: () =>
                        this.data.totalXP >= 1000
                }
            ];

            rules.forEach(rule => {
                const alreadyUnlocked =
                    this.data.achievements.some(
                        achievement => achievement.id === rule.id
                    );

                if (!alreadyUnlocked && rule.condition()) {
                    const achievement = {
                        id: rule.id,
                        title: rule.title,
                        description: rule.description,
                        unlockedAt: new Date().toISOString()
                    };

                    this.data.achievements.push(achievement);

                    this.emit("achievement-unlocked", achievement);
                }
            });
        }

        getAchievements() {
            return this.data.achievements.map(
                achievement => ({ ...achievement })
            );
        }

        // ---------------------------------------
        // OVERVIEW
        // ---------------------------------------

        getOverview() {
            return {
                totalXP: this.data.totalXP,

                level: this.getLevel(),

                levelProgress: this.getLevelProgress(),

                completedTopics:
                    this.data.completedTopics.length,

                completedAlgorithms:
                    this.data.completedAlgorithms.length,

                totalStepsCompleted:
                    this.data.totalStepsCompleted,

                totalLearningTime:
                    this.data.totalLearningTime,

                currentStreak:
                    this.data.currentStreak,

                longestStreak:
                    this.data.longestStreak,

                overallMastery:
                    this.getOverallMastery(),

                achievements:
                    this.data.achievements.length
            };
        }

        // ---------------------------------------
        // EXPORT / IMPORT
        // ---------------------------------------

        exportProgress() {
            return JSON.stringify(
                this.data,
                null,
                2
            );
        }

        importProgress(json) {
            let imported;

            try {
                imported = typeof json === "string"
                    ? JSON.parse(json)
                    : json;
            } catch (error) {
                throw new Error(
                    "Invalid progress JSON."
                );
            }

            if (
                !imported ||
                typeof imported !== "object" ||
                imported.version !== 1
            ) {
                throw new Error(
                    "Unsupported progress data."
                );
            }

            const defaults = this.getDefaultData();

            this.data = {
                ...defaults,
                ...imported
            };

            this.save();

            this.emit("progress-imported");

            return true;
        }

        // ---------------------------------------
        // RESET
        // ---------------------------------------

        resetProgress() {
            this.data = this.getDefaultData();

            this.save();

            this.emit("progress-reset");

            return true;
        }

        // ---------------------------------------
        // CLEANUP
        // ---------------------------------------

        destroy() {
            this.listeners.clear();
        }
    }

    // ---------------------------------------
    // GLOBAL EXPORT
    // ---------------------------------------

    global.ProgressManager = ProgressManager;

    // ---------------------------------------
    // MODULE EXPORT
    // ---------------------------------------

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ProgressManager;
    }

})(typeof window !== "undefined" ? window : globalThis);
