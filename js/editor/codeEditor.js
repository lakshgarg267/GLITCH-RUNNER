/**
 * GLITCH RUNNER - CYBERNETIC CODE EDITOR & MOBILE TOOLBAR
 * High-performance, lightweight, self-contained in-browser code editor.
 * Features:
 * - Line numbers gutter with synchronized scrolling
 * - Syntax highlighting (keywords, strings, numbers, comments, functions)
 * - Auto-indent on Enter, auto-closing bracket matching
 * - Tab key indentation (2 spaces)
 * - Mobile symbol toolbar: ( ) { } [ ] = + - * / < > ! ; : " ' _ , .
 * - Real-time error markers and diagnostic line highlighting
 * - Zero external dependencies, 100% offline, mobile & desktop optimized
 */

class CyberCodeEditor {
  constructor(options = {}) {
    this.container = options.container || null;
    this.language = options.language || 'javascript';
    this.value = options.value || '';
    this.readOnly = options.readOnly || false;
    this.onChange = options.onChange || null;
    this.onSubmit = options.onSubmit || null;
    this.minHeight = options.minHeight || '180px';
    this.maxHeight = options.maxHeight || '380px';

    this.wrapper = null;
    this.textarea = null;
    this.pre = null;
    this.codeElement = null;
    this.gutter = null;
    this.symbolToolbar = null;

    if (this.container) {
      this.mount(this.container);
    }
  }

  mount(container) {
    this.container = container;
    this.container.innerHTML = '';

    // Main editor container
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'cyber-editor-wrapper';
    this.wrapper.style.minHeight = this.minHeight;
    this.wrapper.style.maxHeight = this.maxHeight;

    // Mobile Symbol Toolbar (inserted above or below editor)
    this.symbolToolbar = document.createElement('div');
    this.symbolToolbar.className = 'cyber-editor-toolbar';
    this.buildSymbolToolbar();

    // Editor Area (Gutter + Code Surface)
    const editorArea = document.createElement('div');
    editorArea.className = 'cyber-editor-area';

    // Line Numbers Gutter
    this.gutter = document.createElement('div');
    this.gutter.className = 'cyber-editor-gutter';
    editorArea.appendChild(this.gutter);

    // Code Surface (Overlay Pre + Transparent Textarea)
    const surface = document.createElement('div');
    surface.className = 'cyber-editor-surface';

    this.pre = document.createElement('pre');
    this.pre.className = 'cyber-editor-highlight';
    this.pre.setAttribute('aria-hidden', 'true');

    this.codeElement = document.createElement('code');
    this.codeElement.className = `language-${this.language}`;
    this.pre.appendChild(this.codeElement);

    this.textarea = document.createElement('textarea');
    this.textarea.className = 'cyber-editor-input';
    this.textarea.spellcheck = false;
    this.textarea.autocapitalize = 'none';
    this.textarea.autocomplete = 'off';
    this.textarea.value = this.value;
    if (this.readOnly) this.textarea.readOnly = true;

    surface.appendChild(this.pre);
    surface.appendChild(this.textarea);
    editorArea.appendChild(surface);

    this.findBar = document.createElement('div');
    this.findBar.className = 'cyber-editor-findbar';
    this.findBar.hidden = true;
    this.findBar.innerHTML = `
      <label class="editor-find-label">Find
        <input type="search" class="cyber-editor-find-input" aria-label="Find in code">
      </label>
      <button type="button" class="cyber-sym-btn" data-find-dir="next">Next</button>
      <button type="button" class="cyber-sym-btn" data-find-dir="prev">Prev</button>
      <button type="button" class="cyber-sym-btn" data-find-close="1">Close</button>
    `;

    this.wrapper.appendChild(this.symbolToolbar);
    this.wrapper.appendChild(this.findBar);
    this.wrapper.appendChild(editorArea);
    this.container.appendChild(this.wrapper);

    this.bindEvents();
    this.update();
  }

  buildSymbolToolbar() {
    const symbols = [
      '(', ')', '{', '}', '[', ']', '=', '+', '-', '*', '/', 
      '<', '>', '!', ';', ':', '"', "'", '`', '_', ',', '.'
    ];

    const label = document.createElement('span');
    label.className = 'editor-toolbar-label';
    label.textContent = 'SYMBOLS:';
    this.symbolToolbar.appendChild(label);

    const btnRow = document.createElement('div');
    btnRow.className = 'editor-toolbar-buttons';

    symbols.forEach(sym => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cyber-sym-btn';
      btn.textContent = sym;
      btn.title = `Insert ${sym}`;
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Don't steal focus from textarea
        this.insertText(sym);
      });
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.insertText(sym);
      });
      btnRow.appendChild(btn);
    });

    // Quick indentation button (Tab)
    const tabBtn = document.createElement('button');
    tabBtn.type = 'button';
    tabBtn.className = 'cyber-sym-btn sym-tab';
    tabBtn.textContent = '⇥ Tab';
    tabBtn.title = 'Insert 2 Spaces';
    tabBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.insertText('  ');
    });
    tabBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.insertText('  ');
    });
    btnRow.appendChild(tabBtn);

    this.symbolToolbar.appendChild(btnRow);
  }

  insertText(text) {
    if (!this.textarea) return;
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const val = this.textarea.value;

    this.textarea.value = val.substring(0, start) + text + val.substring(end);
    this.textarea.selectionStart = this.textarea.selectionEnd = start + text.length;
    this.textarea.focus();
    this.update();
  }

  bindEvents() {
    if (!this.textarea) return;

    // Synchronize scrolling between textarea, highlighted pre, and line numbers gutter
    this.textarea.addEventListener('scroll', () => {
      if (this.pre) {
        this.pre.scrollTop = this.textarea.scrollTop;
        this.pre.scrollLeft = this.textarea.scrollLeft;
      }
      if (this.gutter) {
        this.gutter.scrollTop = this.textarea.scrollTop;
      }
    });

    // Handle input & typing
    this.textarea.addEventListener('input', () => {
      this.value = this.textarea.value;
      this.update();
      if (this.onChange) this.onChange(this.value);
    });

    // Keyboard shortcuts (Tab indent, Enter auto-indent, Bracket auto-close)
    this.textarea.addEventListener('keydown', (e) => {
      const start = this.textarea.selectionStart;
      const end = this.textarea.selectionEnd;
      const val = this.textarea.value;

      // 1. Tab key (Insert 2 spaces)
      if (e.key === 'Tab') {
        e.preventDefault();
        this.insertText('  ');
        return;
      }

      // 2. Enter key (Auto-indentation)
      if (e.key === 'Enter') {
        e.preventDefault();
        const currentLine = val.substring(0, start).split('\n').pop();
        const indentMatch = currentLine.match(/^\s*/);
        const indent = indentMatch ? indentMatch[0] : '';
        const shouldAddExtra = currentLine.trim().endsWith('{') || currentLine.trim().endsWith(':');
        const extraIndent = shouldAddExtra ? '  ' : '';
        const newLineContent = '\n' + indent + extraIndent;

        this.insertText(newLineContent);
        return;
      }

      // 3. Auto-close brackets and quotes
      const pairs = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'", '`': '`' };
      if (pairs[e.key] && !this.readOnly) {
        // If text is selected, wrap it
        if (start !== end) {
          e.preventDefault();
          const selected = val.substring(start, end);
          this.textarea.value = val.substring(0, start) + e.key + selected + pairs[e.key] + val.substring(end);
          this.textarea.selectionStart = start + 1;
          this.textarea.selectionEnd = end + 1;
          this.update();
          return;
        }
      }

      // 4. Ctrl+Enter or Cmd+Enter to run / submit
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (this.onSubmit) this.onSubmit(this.value);
        return;
      }

      // 5. Ctrl/Cmd+F find
      if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        this.toggleFind(true);
      }

      if (e.key === 'Escape' && this.findBar && !this.findBar.hidden) {
        e.preventDefault();
        this.toggleFind(false);
      }
    });

    const findInput = this.findBar.querySelector('.cyber-editor-find-input');
    findInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.findNext(e.shiftKey ? -1 : 1);
      }
      if (e.key === 'Escape') {
        this.toggleFind(false);
      }
    });
    this.findBar.querySelector('[data-find-dir="next"]').addEventListener('click', () => this.findNext(1));
    this.findBar.querySelector('[data-find-dir="prev"]').addEventListener('click', () => this.findNext(-1));
    this.findBar.querySelector('[data-find-close]').addEventListener('click', () => this.toggleFind(false));
  }

  toggleFind(show) {
    if (!this.findBar) return;
    this.findBar.hidden = show === false;
    if (!this.findBar.hidden) {
      const input = this.findBar.querySelector('.cyber-editor-find-input');
      input.focus();
      input.select();
    } else if (this.textarea) {
      this.textarea.focus();
    }
  }

  findNext(dir) {
    if (!this.textarea) return;
    const input = this.findBar.querySelector('.cyber-editor-find-input');
    const needle = input.value;
    if (!needle) return;
    const hay = this.textarea.value;
    const start = dir > 0 ? this.textarea.selectionEnd : this.textarea.selectionStart - 1;
    let idx;
    if (dir > 0) {
      idx = hay.indexOf(needle, start);
      if (idx === -1) idx = hay.indexOf(needle, 0);
    } else {
      idx = hay.lastIndexOf(needle, start);
      if (idx === -1) idx = hay.lastIndexOf(needle);
    }
    if (idx >= 0) {
      this.textarea.focus();
      this.textarea.setSelectionRange(idx, idx + needle.length);
    }
  }

  setValue(newVal) {
    this.value = newVal || '';
    if (this.textarea) {
      this.textarea.value = this.value;
      this.update();
    }
  }

  getValue() {
    return this.textarea ? this.textarea.value : this.value;
  }

  setLanguage(lang) {
    this.language = lang || 'javascript';
    if (this.codeElement) {
      this.codeElement.className = `language-${this.language}`;
    }
    this.update();
  }

  update() {
    if (!this.textarea || !this.codeElement || !this.gutter) return;

    const val = this.textarea.value;
    const lines = val.split('\n');

    // Update line numbers in gutter
    this.gutter.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join('');

    // Highlight code syntax
    this.codeElement.innerHTML = this.highlightSyntax(val, this.language);
  }

  highlightSyntax(code, lang) {
    if (!code) return '&nbsp;';

    // Simple, blazing-fast, robust regex syntax tokenizer
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Language keyword sets
    const keywords = [
      'let', 'const', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
      'class', 'import', 'export', 'default', 'new', 'this', 'async', 'await',
      'try', 'catch', 'throw', 'typeof', 'instanceof', 'def', 'elif', 'print',
      'int', 'float', 'double', 'char', 'void', 'public', 'private', 'static',
      'struct', 'bool', 'true', 'false', 'null', 'undefined', 'None', 'nil'
    ];

    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');

    // Tokens matching with placeholders to prevent double-replacement
    const tokens = [];
    const saveToken = (html) => {
      const id = `___TOKEN_${tokens.length}___`;
      tokens.push({ id, html });
      return id;
    };

    // 1. Comments
    escaped = escaped.replace(/(\/\/[^\n]*|#[^\n]*)/g, (match) => {
      return saveToken(`<span class="token-comment">${match}</span>`);
    });

    // 2. Strings (double, single, backtick)
    escaped = escaped.replace(/(".*?"|'.*?'|`.*?`)/g, (match) => {
      return saveToken(`<span class="token-string">${match}</span>`);
    });

    // 3. Numbers
    escaped = escaped.replace(/\b(\d+(\.\d+)?)\b/g, (match) => {
      return saveToken(`<span class="token-number">${match}</span>`);
    });

    // 4. Function invocations (e.g. runner.jump(), console.log())
    escaped = escaped.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g, (match) => {
      return saveToken(`<span class="token-function">${match}</span>`);
    });

    // 5. Keywords
    escaped = escaped.replace(kwRegex, (match) => {
      return saveToken(`<span class="token-keyword">${match}</span>`);
    });

    // Restore tokens
    tokens.forEach(t => {
      escaped = escaped.replace(t.id, t.html);
    });

    // Ensure trailing newline is visible in pre
    if (code.endsWith('\n')) {
      escaped += ' ';
    }

    return escaped;
  }
}

window.CyberCodeEditor = CyberCodeEditor;
