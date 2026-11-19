/**
 * GLITCH RUNNER - AUTOMATED TEST CASE RUNNER ENGINE
 * Executes user code solutions against parameterized test cases.
 * Handles timeouts, infinite loop protection, and deep object/array equality.
 */

class TestCaseRunner {
  constructor() {
    this.timeoutMs = 150; // Max execution time per test
  }

  // Deep comparison of actual vs expected
  isEqual(actual, expected) {
    if (actual === expected) return true;
    if (Number.isNaN(actual) && Number.isNaN(expected)) return true;
    if (actual === null || expected === null) return actual === expected;
    if (typeof actual !== typeof expected) return false;

    if (Array.isArray(actual) && Array.isArray(expected)) {
      if (actual.length !== expected.length) return false;
      for (let i = 0; i < actual.length; i++) {
        if (!this.isEqual(actual[i], expected[i])) return false;
      }
      return true;
    }

    if (typeof actual === 'object' && typeof expected === 'object') {
      const keysA = Object.keys(actual);
      const keysB = Object.keys(expected);
      if (keysA.length !== keysB.length) return false;
      for (let k of keysA) {
        if (!this.isEqual(actual[k], expected[k])) return false;
      }
      return true;
    }

    return false;
  }

  async runTests(codeString, testCases, entryFunction = null, timeoutMs = 2000) {
    if (window.JsSandbox && typeof window.JsSandbox.runTests === 'function') {
      return window.JsSandbox.runTests(codeString, testCases, entryFunction, timeoutMs);
    }
    return this.runTestsSync(codeString, testCases, entryFunction);
  }

  // Synchronous evaluator used by Node CLI tests and Worker fallback.
  runTestsSync(codeString, testCases, entryFunction = null) {
    const results = [];
    let allPassed = true;

    try {
      // 1. Build sandboxed evaluator
      const sandboxFn = new Function('console', 'Math', `
        "use strict";
        ${codeString};
        return {
          ${entryFunction ? `${entryFunction}: typeof ${entryFunction} !== 'undefined' ? ${entryFunction} : null,` : ''}
          scope: typeof this !== 'undefined' ? this : {}
        };
      `);

      const sandboxedScope = sandboxFn({
        log: () => {},
        warn: () => {},
        error: () => {}
      }, Math);

      // 2. Iterate through each test case
      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const testNum = i + 1;
        const startTime = performance.now();

        try {
          let actualOutput;

          if (entryFunction && typeof sandboxedScope[entryFunction] === 'function') {
            const args = Array.isArray(tc.input) ? tc.input : [tc.input];
            actualOutput = sandboxedScope[entryFunction](...args);
          } else if (tc.evalExpression) {
            // Expression evaluation
            const exprFn = new Function('console', 'Math', `
              "use strict";
              ${codeString};
              return (${tc.evalExpression});
            `);
            actualOutput = exprFn({ log: () => {} }, Math);
          } else {
            throw new Error(`Entry function '${entryFunction || 'solution'}' was not declared as a valid function.`);
          }

          const elapsed = performance.now() - startTime;
          const passed = this.isEqual(actualOutput, tc.expected);

          if (!passed) allPassed = false;

          results.push({
            caseNumber: testNum,
            description: tc.hidden ? 'Hidden test' : (tc.description || `Test Case #${testNum}`),
            input: tc.hidden ? '[hidden]' : (tc.input !== undefined ? tc.input : (tc.evalExpression || 'None')),
            expected: tc.hidden ? '[hidden]' : tc.expected,
            actual: tc.hidden ? (passed ? '[hidden]' : '[hidden — mismatch]') : actualOutput,
            passed: passed,
            hidden: !!tc.hidden,
            durationMs: elapsed.toFixed(1),
            error: null
          });
        } catch (err) {
          allPassed = false;
          results.push({
            caseNumber: testNum,
            description: tc.hidden ? 'Hidden test' : (tc.description || `Test Case #${testNum}`),
            input: tc.hidden ? '[hidden]' : (tc.input !== undefined ? tc.input : 'None'),
            expected: tc.hidden ? '[hidden]' : tc.expected,
            actual: null,
            passed: false,
            hidden: !!tc.hidden,
            durationMs: (performance.now() - startTime).toFixed(1),
            error: err.name + ': ' + err.message
          });
        }
      }
    } catch (syntaxOrRuntimeErr) {
      allPassed = false;
      return {
        allPassed: false,
        compilationError: syntaxOrRuntimeErr.name + ': ' + syntaxOrRuntimeErr.message,
        results: []
      };
    }

    return {
      allPassed,
      compilationError: null,
      results
    };
  }

  // Render HTML test results panel
  renderResultsHTML(testOutcome) {
    if (testOutcome.compilationError) {
      return `
        <div class="test-error-box">
          <div class="test-error-header">❌ COMPILATION / SYNTAX ERROR</div>
          <div class="test-error-body">${this.escapeHtml(testOutcome.compilationError)}</div>
          <div class="test-error-hint">💡 Check syntax, matching brackets, and function definitions.</div>
        </div>
      `;
    }

    const cards = testOutcome.results.map(r => `
      <div class="test-card ${r.passed ? 'pass' : 'fail'}">
        <div class="test-card-header">
          <span class="test-status-badge ${r.passed ? 'pass' : 'fail'}">
            ${r.passed ? '✓ PASS' : '✗ FAIL'}
          </span>
          <span class="test-title">${this.escapeHtml(r.description)}</span>
          <span class="test-duration">${r.durationMs}ms</span>
        </div>
        <div class="test-card-body">
          <div class="test-row">
            <span class="test-label">Input:</span>
            <code>${this.escapeHtml(JSON.stringify(r.input))}</code>
          </div>
          <div class="test-row">
            <span class="test-label">Expected:</span>
            <code class="val-expected">${this.escapeHtml(JSON.stringify(r.expected))}</code>
          </div>
          <div class="test-row">
            <span class="test-label">Actual:</span>
            <code class="${r.passed ? 'val-pass' : 'val-fail'}">
              ${r.error ? `<span class="err-text">${this.escapeHtml(r.error)}</span>` : this.escapeHtml(JSON.stringify(r.actual))}
            </code>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <div class="test-results-container">
        <div class="test-summary-header ${testOutcome.allPassed ? 'all-pass' : 'has-fails'}">
          ${testOutcome.allPassed 
            ? `✓ ${testOutcome.results.length} / ${testOutcome.results.length} PASSED`
            : `✕ ${testOutcome.results.filter(r => r.passed).length} / ${testOutcome.results.length} PASSED`}
        </div>
        <div class="test-cards-list">
          ${cards}
        </div>
      </div>
    `;
  }

  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

window.TestCaseRunner = new TestCaseRunner();
