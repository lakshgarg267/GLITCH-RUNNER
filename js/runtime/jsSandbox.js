/**
 * Browser JS execution sandbox.
 * User code runs in a short-lived Web Worker (blob URL), not on the UI thread.
 * This is isolation for a local educational game, not multi-tenant process sandboxing.
 */

function glitchSandboxWorkerMain() {
  function isEqual(actual, expected) {
    if (actual === expected) return true;
    if (Number.isNaN(actual) && Number.isNaN(expected)) return true;
    if (actual === null || expected === null) return actual === expected;
    if (typeof actual !== typeof expected) return false;
    if (Array.isArray(actual) && Array.isArray(expected)) {
      if (actual.length !== expected.length) return false;
      for (let i = 0; i < actual.length; i++) {
        if (!isEqual(actual[i], expected[i])) return false;
      }
      return true;
    }
    if (typeof actual === 'object' && typeof expected === 'object') {
      const keysA = Object.keys(actual);
      const keysB = Object.keys(expected);
      if (keysA.length !== keysB.length) return false;
      for (let k of keysA) {
        if (!isEqual(actual[k], expected[k])) return false;
      }
      return true;
    }
    return false;
  }

  function serializeValue(value) {
    try {
      const text = JSON.stringify(value);
      if (text && text.length > 12000) {
        return { ok: false, error: 'Output exceeded size limit' };
      }
      return { ok: true, value: text === undefined ? null : JSON.parse(text) };
    } catch (err) {
      return { ok: false, error: 'Result is not JSON-serializable' };
    }
  }

  self.onmessage = function (event) {
    const msg = event.data || {};
    const requestId = msg.requestId;
    if (msg.type !== 'runTests') return;

    const code = String(msg.code || '');
    const maxBytes = msg.maxCodeBytes || 50000;
    const entryFunction = msg.entryFunction || 'solution';
    const testCases = Array.isArray(msg.testCases) ? msg.testCases : [];

    if (code.length > maxBytes) {
      self.postMessage({
        requestId,
        outcome: {
          allPassed: false,
          compilationError: 'Code exceeds size limit (' + maxBytes + ' bytes).',
          results: []
        }
      });
      return;
    }

    let exported;
    try {
      const factory = new Function(
        'Math',
        '"use strict";\n' + code + ';\n' +
        'return { fn: (typeof ' + entryFunction + ' === "function") ? ' + entryFunction + ' : null };'
      );
      exported = factory(Math);
    } catch (err) {
      self.postMessage({
        requestId,
        outcome: {
          allPassed: false,
          compilationError: (err && err.name ? err.name : 'Error') + ': ' + (err && err.message ? err.message : String(err)),
          results: []
        }
      });
      return;
    }

    if (!exported || typeof exported.fn !== 'function') {
      self.postMessage({
        requestId,
        outcome: {
          allPassed: false,
          compilationError: "Function '" + entryFunction + "' was not declared.",
          results: []
        }
      });
      return;
    }

    const results = [];
    let allPassed = true;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const startTime = Date.now();
      try {
        const args = Array.isArray(tc.input) ? tc.input : [tc.input];
        const raw = exported.fn.apply(null, args);
        const packed = serializeValue(raw);
        const elapsed = Date.now() - startTime;
        if (!packed.ok) {
          allPassed = false;
          results.push({
            caseNumber: i + 1,
            description: tc.description || ('Test Case #' + (i + 1)),
            input: tc.hidden ? '[hidden]' : tc.input,
            expected: tc.hidden ? '[hidden]' : tc.expected,
            actual: null,
            passed: false,
            hidden: !!tc.hidden,
            durationMs: String(elapsed),
            error: packed.error
          });
          continue;
        }
        const passed = isEqual(packed.value, tc.expected);
        if (!passed) allPassed = false;
        results.push({
          caseNumber: i + 1,
          description: tc.hidden ? 'Hidden test' : (tc.description || ('Test Case #' + (i + 1))),
          input: tc.hidden ? '[hidden]' : tc.input,
          expected: tc.hidden ? '[hidden]' : tc.expected,
          actual: tc.hidden ? (passed ? '[hidden]' : '[hidden — mismatch]') : packed.value,
          passed: passed,
          hidden: !!tc.hidden,
          durationMs: String(elapsed),
          error: null
        });
      } catch (err) {
        allPassed = false;
        results.push({
          caseNumber: i + 1,
          description: tc.hidden ? 'Hidden test' : (tc.description || ('Test Case #' + (i + 1))),
          input: tc.hidden ? '[hidden]' : tc.input,
          expected: tc.hidden ? '[hidden]' : tc.expected,
          actual: null,
          passed: false,
          hidden: !!tc.hidden,
          durationMs: String(Date.now() - startTime),
          error: (err && err.name ? err.name : 'Error') + ': ' + (err && err.message ? err.message : String(err))
        });
      }
    }

    self.postMessage({
      requestId,
      outcome: { allPassed: allPassed, compilationError: null, results: results }
    });
  };
}

class JsSandbox {
  constructor() {
    this._url = null;
    this.maxCodeBytes = 50000;
  }

  _workerUrl() {
    if (this._url) return this._url;
    const source = '(' + glitchSandboxWorkerMain.toString() + ')();';
    const blob = new Blob([source], { type: 'text/javascript' });
    this._url = URL.createObjectURL(blob);
    return this._url;
  }

  runTests(code, testCases, entryFunction, timeoutMs) {
    const timeout = timeoutMs || 2000;

    if (typeof Worker === 'undefined') {
      return Promise.resolve(this.runTestsSync(code, testCases, entryFunction));
    }

    return new Promise((resolve) => {
      let settled = false;
      let worker;
      try {
        worker = new Worker(this._workerUrl());
      } catch (err) {
        resolve(this.runTestsSync(code, testCases, entryFunction));
        return;
      }

      const requestId = 'r_' + Date.now() + '_' + Math.random().toString(16).slice(2);
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        try { worker.terminate(); } catch (e) { /* ignore */ }
        resolve({
          allPassed: false,
          compilationError: 'Execution timed out after ' + timeout + 'ms. Check for infinite loops.',
          results: []
        });
      }, timeout);

      worker.onmessage = (event) => {
        if (settled) return;
        const data = event.data || {};
        if (data.requestId !== requestId) return;
        settled = true;
        clearTimeout(timer);
        try { worker.terminate(); } catch (e) { /* ignore */ }
        resolve(data.outcome || {
          allPassed: false,
          compilationError: 'Empty sandbox response',
          results: []
        });
      };

      worker.onerror = (event) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        try { worker.terminate(); } catch (e) { /* ignore */ }
        resolve({
          allPassed: false,
          compilationError: 'Sandbox error: ' + (event.message || 'unknown'),
          results: []
        });
      };

      worker.postMessage({
        type: 'runTests',
        requestId,
        code,
        testCases,
        entryFunction,
        maxCodeBytes: this.maxCodeBytes
      });
    });
  }

  /**
   * Node / fallback path. Still not a secure sandbox — used for CLI tests only.
   */
  runTestsSync(code, testCases, entryFunction) {
    const runner = window.TestCaseRunner;
    if (runner && typeof runner.runTestsSync === 'function') {
      return runner.runTestsSync(code, testCases, entryFunction);
    }
    return {
      allPassed: false,
      compilationError: 'No synchronous runner available',
      results: []
    };
  }
}

window.JsSandbox = new JsSandbox();
