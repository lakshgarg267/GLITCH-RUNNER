/**
 * GLITCH RUNNER - HTML & WEB MARKUP CURRICULUM (51 LEVELS)
 * Areas:
 * Area 1: Markup Gateway (Lv 1-8, Boss: THE UNCLOSED PHANTOM)
 * Area 2: Hyperlink Highway (Lv 9-16, Boss: THE BROKEN ANCHOR)
 * Area 3: Layout Bastion (Lv 17-24, Boss: THE SEMANTIC MONOLITH)
 * Area 4: Form Factory (Lv 25-32, Boss: THE VALIDATION DEMON)
 * Area 5: Media Matrix (Lv 33-40, Boss: THE MULTIMEDIA HYDRA)
 * Area 6: A11y Sanctuary (Lv 41-48, Boss: THE CONTRAST COLOSSUS)
 * Area 7: DOM Core (Lv 49-51, Final Boss: THE DOM SOVEREIGN)
 */

window.CURRICULUM_DATA = window.CURRICULUM_DATA || {};

window.CURRICULUM_DATA.html = [
  // =========================================================================
  // AREA 1: MARKUP GATEWAY (Lv 1-8) - DOCUMENT STRUCTURE & TAGS
  // =========================================================================
  {
    t: 'HTML5 Doctype Declaration',
    c: '<!DOCTYPE html> must be the first line of an HTML5 document, preventing Quirks Mode in browsers.',
    m: 'glitch',
    code: `<!DOCUMENT html5>\n<html>\n  <head><title>System</title></head>\n</html>`,
    q: 'BUG HUNTER: The document type declaration is malformed. What is the standard HTML5 doctype declaration?',
    opts: [
      '<!DOCTYPE html>',
      '<!DOCTYPE HTML5 PUBLIC "W3C">',
      '<html5 doctype="true">',
      '<!HTML doctype="modern">'
    ],
    a: 0,
    h: 'The standard HTML5 doctype declaration is simple: <!DOCTYPE html>.',
    explanation: 'In HTML5, the preamble `<!DOCTYPE html>` is required at the very start of the file to ensure the browser renders in Standards Mode rather than Quirks Mode.'
  },
  {
    t: 'Page Title & Metadata',
    c: '<title> defines the document title displayed on browser tabs, search results, and bookmarks.',
    m: 'runner',
    code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>GRID OPERATIVE</title>\n  </head>\n</html>`,
    q: 'SPEED RUN: Inside which parent tag must the <title> tag be placed?',
    opts: [
      '<head>',
      '<body>',
      '<header>',
      '<main>'
    ],
    a: 0,
    h: 'Metadata elements like title, meta, and link belong in the <head>.',
    explanation: 'The `<title>` element must always be a child of the `<head>` element, which holds non-visual document metadata.'
  },
  {
    t: 'Heading Hierarchy Levels',
    c: 'HTML provides 6 levels of document headings, from <h1> (highest importance) to <h6>.',
    m: 'detective',
    code: `<h1>MAIN MAINFRAME</h1>\n<h3>SUB-SECTOR</h3>`,
    q: 'OUTPUT DETECTIVE: Which heading element represents the highest structural section level?',
    opts: [
      '<h1>',
      '<h6>',
      '<header>',
      '<heading>'
    ],
    a: 0,
    h: 'h1 is the top-level heading.',
    explanation: '`<h1>` represents the highest level of heading on a page. Best practices recommend having exactly one primary `<h1>` per page.'
  },
  {
    t: 'Paragraph & Line Break Tags',
    c: '<p> wraps a block of text; <br> inserts a line break without creating a new paragraph.',
    m: 'detective',
    code: `<p>Grid Online.<br>Telemetry active.</p>`,
    q: 'OUTPUT DETECTIVE: How does the browser render <br> within a paragraph?',
    opts: [
      'Breaks the line immediately within the same paragraph',
      'Closes the paragraph and creates a new one',
      'Adds horizontal divider line',
      'Makes text bold'
    ],
    a: 0,
    h: '<br> is a void element that introduces an inline line break.',
    explanation: 'The `<br>` tag produces a line break in text without closing the containing block element.'
  },
  {
    t: 'HTML Document Skeleton Assembly',
    c: 'The foundational structure of every valid HTML document.',
    m: 'builder',
    codeBlocks: [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <title>Cyber Gate</title>',
      '</head>',
      '<body>',
      '  <h1>Welcome</h1>',
      '</body>',
      '</html>'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    q: 'CODE BUILDER: Assemble the valid HTML5 boilerplate document structure:',
    h: 'Doctype, html tag, head with meta & title, body with content, close html.',
    explanation: 'Every modern HTML page begins with `<!DOCTYPE html>`, wraps content in `<html>`, includes metadata inside `<head>`, and visual elements in `<body>`.'
  },
  {
    t: 'Void Elements (Self-Closing Tags)',
    c: 'Void elements cannot have closing tags or contain inner content (e.g. <img>, <br>, <hr>, <input>, <meta>).',
    m: 'completion',
    code: `<p>Section Complete</p>\n___\n<p>Next Phase</p>`,
    q: 'CODE COMPLETION: Choose the void tag that draws a thematic horizontal divider rule:',
    opts: [
      '<hr>',
      '<divider>',
      '<line>',
      '<rule></rule>'
    ],
    a: 0,
    h: '<hr> represents a horizontal rule / thematic break.',
    explanation: 'The `<hr>` element represents a thematic break between paragraph-level elements and is a void element that requires no closing tag.'
  },
  {
    t: 'HTML Character Entities',
    c: 'Special characters must be escaped with character entity references (&lt;, &gt;, &amp;, &quot;).',
    m: 'detective',
    code: `<p>Condition: x &lt; 10 &amp;&amp; y &gt; 5</p>`,
    q: 'OUTPUT DETECTIVE: How does the browser render &lt; and &gt;?',
    opts: [
      'Condition: x < 10 && y > 5',
      'Condition: x &lt; 10 && y &gt; 5',
      'Condition: x [less] 10 and y [greater] 5',
      'Syntax Error'
    ],
    a: 0,
    h: '&lt; renders < and &gt; renders >.',
    explanation: '`&lt;` is the HTML entity for `<` (less-than), `&gt;` is `>`, and `&amp;` is `&`.'
  },
  // BOSS 1: Level 8
  {
    t: 'THE UNCLOSED PHANTOM',
    isBoss: true,
    name: 'THE UNCLOSED PHANTOM',
    hp: 500,
    avatar: '👻',
    story: 'A shadowy glitch in Markup Gateway, corrupting DOM trees with unclosed tags and broken nesting!',
    phases: [
      {
        q: 'PHASE 1: Phantom tests void tags! Which of the following tags CANNOT have a closing tag in HTML5?',
        opts: ['<input>', '<div>', '<p>', '<span>'],
        a: 0,
        explanation: '`<input>` is a void element in HTML5 and cannot have any child content or a closing `</input>` tag.'
      },
      {
        q: 'PHASE 2: Phantom tests character encoding! What meta tag sets Unicode UTF-8 encoding in HTML5?',
        opts: [
          '<meta charset="UTF-8">',
          '<meta encoding="utf-8">',
          '<charset>UTF-8</charset>',
          '<meta type="unicode">'
        ],
        a: 0,
        explanation: '`<meta charset="UTF-8">` is the standard HTML5 declaration ensuring correct rendering of international characters and symbols.'
      },
      {
        q: 'PHASE 3: Phantom tests tag nesting rules! Which markup properly nests inline emphasis inside strong text?',
        opts: [
          '<strong><em>Critical</em> Alert</strong>',
          '<strong><em>Critical Alert</strong></em>',
          '<em><strong>Critical Alert</em></strong>',
          '<strong em="true">Critical Alert</strong>'
        ],
        a: 0,
        explanation: 'Tags must close in reverse order of opening (First-In, Last-Out): `<strong><em>...</em></strong>`.'
      },
      {
        q: 'PHASE 4: Phantom queries the lang attribute! Why should the <html> tag declare lang="en"?',
        opts: [
          'Assists screen readers with pronunciation and search engines with language indexing',
          'Enforces English spelling in form inputs',
          'Required for CSS to load',
          'Translates the web page automatically'
        ],
        a: 0,
        explanation: 'Declaring `lang="en"` assists accessibility screen readers in selecting the correct voice synthesizer and helps search engines index content.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which HTML tag comments out code so it does not render in the browser?',
        opts: [
          '<!-- Comment here -->',
          '// Comment here',
          '/* Comment here */',
          '# Comment here'
        ],
        a: 0,
        explanation: 'HTML comments use `<!-- comment -->` syntax.'
      }
    ]
  },

  // =========================================================================
  // AREA 2: HYPERLINK HIGHWAY (Lv 9-16) - LINKS, TEXT & ANCHORS
  // =========================================================================
  {
    t: 'Hyperlink Anchor Tags (href)',
    c: 'The <a> tag creates hyperlinks; the href attribute specifies the destination URL.',
    m: 'glitch',
    code: `<a link="https://codearena.dev">ENTER MATRIX</a>`,
    q: 'BUG HUNTER: The hyperlink attribute is incorrect. What attribute specifies the destination URL in an <a> tag?',
    opts: [
      'href',
      'url',
      'src',
      'target'
    ],
    a: 0,
    h: 'Hypertext REFerence: href.',
    explanation: 'The destination of an anchor tag `<a>` is always designated by the `href` (Hypertext REFerence) attribute.'
  },
  {
    t: 'Target Blank Security (rel="noopener")',
    c: 'When using target="_blank" to open links in a new tab, always include rel="noopener noreferrer" for security.',
    m: 'runner',
    code: `<a href="https://external.org" target="_blank" rel="noopener noreferrer">Intel Link</a>`,
    q: 'SPEED RUN: What value of the target attribute opens a link in a brand-new browser tab or window?',
    opts: [
      '_blank',
      '_new',
      '_tab',
      '_parent'
    ],
    a: 0,
    h: 'target="_blank" is the standard keyword for opening links in a new window/tab.',
    explanation: '`target="_blank"` instructs the browser to open the hyperlink in a new browsing context.'
  },
  {
    t: 'Page Anchor Fragment Navigation',
    c: 'Hyperlinks can jump to specific elements on the same page using href="#elementId".',
    m: 'detective',
    code: `<a href="#section-boss">Jump to Boss</a>\n...\n<h2 id="section-boss">Boss Arena</h2>`,
    q: 'OUTPUT DETECTIVE: Clicking "Jump to Boss" scrolls the page to which element?',
    opts: [
      'The element with id="section-boss"',
      'A new page named section-boss.html',
      'The top of the page',
      'Nothing; # is ignored'
    ],
    a: 0,
    h: '# denotes an internal fragment link matching an element\'s id.',
    explanation: 'In HTML, `#section-boss` targets the element possessing the matching `id="section-boss"`, scrolling it directly into view.'
  },
  {
    t: 'Email & Phone Scheme Links',
    c: 'Special URI schemes allow creating email (mailto:) and telephone (tel:) links.',
    m: 'completion',
    code: `<a href="___:hunter@glitchrunner.io">Dispatch Operative</a>`,
    q: 'CODE COMPLETION: Choose the protocol prefix to trigger an email client when clicked:',
    opts: [
      'mailto',
      'email',
      'send',
      'inbox'
    ],
    a: 0,
    h: 'Use mailto:user@domain.com.',
    explanation: '`mailto:` is the standard URI scheme that instructs the OS to open the user\'s default email client.'
  },
  {
    t: 'Text Formatting Semantics (strong vs b)',
    c: '<strong> indicates strong importance/urgency; <b> is purely stylistic bold with no semantic meaning.',
    m: 'detective',
    code: `<p>STATUS: <strong>CRITICAL OVERHEAT</strong></p>`,
    q: 'OUTPUT DETECTIVE: What semantic meaning does <strong> convey compared to plain <b>?',
    opts: [
      'Conveys serious importance, seriousness, or urgency to screen readers',
      'Only changes the color to red',
      'Makes text larger than h1',
      'It has no difference whatsoever'
    ],
    a: 0,
    h: 'strong represents semantic importance, which screen readers emphasize.',
    explanation: '`<strong>` conveys semantic importance, seriousness, or urgency, prompting assistive technologies to read with altered inflection, whereas `<b>` is purely visual.'
  },
  {
    t: 'Downloadable Asset Link Assembly',
    c: 'The download attribute instructs browsers to download the linked URL rather than navigating to it.',
    m: 'builder',
    codeBlocks: [
      '<a href="telemetry.pdf"',
      '   download="mission_report.pdf">',
      '   Download Intel File',
      '</a>'
    ],
    correctOrder: [0, 1, 2, 3],
    q: 'CODE BUILDER: Assemble the downloadable anchor link with custom download filename:',
    h: 'Anchor opening tag, download attribute, link text, close anchor.',
    explanation: 'The `download` attribute on an `<a>` tag signals the browser to download the target resource, optionally specifying a default save filename.'
  },
  {
    t: 'Code and Monospace Formatting',
    c: '<code> represents a fragment of computer code, rendered in the browser\'s monospace font.',
    m: 'detective',
    code: `<p>Press <code>CTRL+C</code> to terminate the rogue loop.</p>`,
    q: 'OUTPUT DETECTIVE: How does the browser style text inside <code> by default?',
    opts: [
      'In a monospace (fixed-width) font',
      'Italicized',
      'Centered',
      'Invisible'
    ],
    a: 0,
    h: 'Code is displayed using a monospace font.',
    explanation: 'The `<code>` tag displays inline code snippets using the browser\'s default monospace font family.'
  },
  // BOSS 2: Level 16
  {
    t: 'THE BROKEN ANCHOR',
    isBoss: true,
    name: 'THE BROKEN ANCHOR',
    hp: 600,
    avatar: '⚓',
    story: 'A rogue navigational kraken tearing apart hyperlinks, protocol schemes, and URL fragment targets!',
    phases: [
      {
        q: 'PHASE 1: Anchor tests relative URLs! If a page is at /sector1/index.html, what does href="../sector2/map.html" do?',
        opts: [
          'Navigates up one directory level to root, then into sector2/map.html',
          'Navigates to an external website',
          'Throws a 404 error automatically',
          'Downloads index.html'
        ],
        a: 0,
        explanation: 'In relative file paths, `../` moves up one directory level in the filesystem hierarchy.'
      },
      {
        q: 'PHASE 2: Anchor tests tabnabbing security! Why is rel="noopener noreferrer" essential when using target="_blank"?',
        opts: [
          'Prevents the newly opened page from accessing window.opener to maliciously redirect the parent page',
          'Stops popup blockers',
          'Caches the external website',
          'Improves download speed'
        ],
        a: 0,
        explanation: 'Without `rel="noopener"`, the opened page can access `window.opener` and navigate your legitimate page to a phishing URL.'
      },
      {
        q: 'PHASE 3: Anchor tests semantic italics! What is the semantic difference between <em> and <i>?',
        opts: [
          '<em> indicates linguistic stress emphasis; <i> represents an alternate voice without emphasis',
          '<em> is bold, <i> is italic',
          '<i> is deprecated and deleted',
          'No difference'
        ],
        a: 0,
        explanation: '`<em>` indicates stress emphasis (altering sentence meaning), while `<i>` represents text in an alternate voice or mood (e.g. thoughts, ship names) without emphasis.'
      },
      {
        q: 'PHASE 4: Anchor queries phone calling links! Which scheme creates a clickable link to dial a phone number?',
        opts: ['tel:+15550199', 'call:+15550199', 'phone:+15550199', 'dial:+15550199'],
        a: 0,
        explanation: 'The `tel:` URI scheme creates clickable telephone links that prompt mobile devices to initiate a call.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which element highlights text for reference purposes, like a yellow highlighter pen?',
        opts: ['<mark>', '<highlight>', '<yellow>', '<spot>'],
        a: 0,
        explanation: 'The `<mark>` element represents text marked or highlighted for reference purposes due to relevance.'
      }
    ]
  },

  // =========================================================================
  // AREA 3: LAYOUT BASTION (Lv 17-24) - SEMANTIC HTML5 CONTAINERS
  // =========================================================================
  {
    t: 'Semantic <header> and <main>',
    c: 'HTML5 semantic elements describe their meaning to both browser and developer.',
    m: 'glitch',
    code: `<div class="main-content">\n  <div class="top-nav">Header Area</div>\n</div>`,
    q: 'BUG HUNTER: Replace generic divs with modern HTML5 landmark tags for header and main content:',
    opts: [
      '<header> and <main>',
      '<top> and <center>',
      '<head> and <body>',
      '<nav> and <content>'
    ],
    a: 0,
    h: 'Use <header> for introductory content and <main> for unique page body.',
    explanation: '`<header>` and `<main>` are HTML5 landmark elements that convey clear structural meaning to search engines and accessibility tools.'
  },
  {
    t: 'Semantic <nav> Tag',
    c: '<nav> identifies a major navigational block of links (menus, table of contents, pagination).',
    m: 'runner',
    code: `<nav aria-label="Main Menu">\n  <ul>\n    <li><a href="/worlds">Worlds</a></li>\n    <li><a href="/profile">Profile</a></li>\n  </ul>\n</nav>`,
    q: 'SPEED RUN: What HTML5 element should wrap major site navigation links?',
    opts: [
      '<nav>',
      '<menu-bar>',
      '<navigation>',
      '<links>'
    ],
    a: 0,
    h: 'Use the semantic <nav> tag.',
    explanation: 'The `<nav>` tag represents a section of a page whose purpose is to provide navigation links.'
  },
  {
    t: '<article> vs <section>',
    c: '<article> is independent, self-contained content; <section> is a thematic grouping of content.',
    m: 'detective',
    code: `<article>\n  <h2>Glitch Runner Patch Notes 2.0</h2>\n  <p>New languages deployed.</p>\n</article>`,
    q: 'OUTPUT DETECTIVE: Why is <article> appropriate for a blog post or news release?',
    opts: [
      'It represents content that could be distributed or syndicated independently',
      'It automatically changes the font to newspaper style',
      'It makes the text readable offline',
      'It prevents user selection'
    ],
    a: 0,
    h: '<article> represents an autonomous, syndicatable composition.',
    explanation: '`<article>` is designed for self-contained compositions (like a news article, blog post, or forum reply) that make sense independently.'
  },
  {
    t: 'Semantic <aside> for Sidebars',
    c: '<aside> represents content indirectly related to the main content (callouts, sidebars, related links).',
    m: 'detective',
    code: `<main>\n  <h1>Cyber Mission 01</h1>\n  <aside>\n    <h3>Tactical Tip</h3>\n    <p>Shields absorb damage.</p>\n  </aside>\n</main>`,
    q: 'OUTPUT DETECTIVE: What role does <aside> play in document structure?',
    opts: [
      'Identifies auxiliary content tangential to the surrounding content',
      'Hides content until hovered',
      'Pins content fixed to the bottom',
      'Draws a border around text'
    ],
    a: 0,
    h: '<aside> holds sidebars, callout boxes, or related references.',
    explanation: '`<aside>` demarcates content that is tangentially related to the content around it (such as a sidebar or tip box).'
  },
  {
    t: 'Ordered vs Unordered Lists',
    c: '<ul> creates bulleted lists; <ol> creates numbered sequence lists; both contain <li> items.',
    m: 'builder',
    codeBlocks: [
      '<ol>',
      '  <li>Identify syntax corruption</li>',
      '  <li>Select proper statement</li>',
      '  <li>Discharge laser attack</li>',
      '</ol>'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    q: 'CODE BUILDER: Assemble the ordered procedural list of operative steps:',
    h: 'Opening <ol>, sequence of <li> items in order, closing </ol>.',
    explanation: '`<ol>` denotes an ordered list where sequence matters, numbered 1, 2, 3 by default.'
  },
  {
    t: 'Definition Lists (<dl>, <dt>, <dd>)',
    c: '<dl> represents a description list; <dt> specifies the term; <dd> contains the definition description.',
    m: 'completion',
    code: `<dl>\n  <dt>CPU</dt>\n  <___>Central Processing Unit</___>\n</dl>`,
    q: 'CODE COMPLETION: Choose the element that wraps the term description in a definition list:',
    opts: [
      'dd',
      'desc',
      'def',
      'data'
    ],
    a: 0,
    h: 'dl = definition list, dt = definition term, dd = definition description.',
    explanation: '`<dd>` (Description Details) provides the description or definition corresponding to a `<dt>` (Description Term).'
  },
  {
    t: '<figure> and <figcaption>',
    c: '<figure> wraps self-contained media; <figcaption> provides an optional descriptive caption.',
    m: 'detective',
    code: `<figure>\n  <img src="boss.png" alt="Syntax Beast">\n  <figcaption>Fig 1. The Syntax Beast in Phase 3.</figcaption>\n</figure>`,
    q: 'OUTPUT DETECTIVE: What relationship does <figcaption> have to the image inside <figure>?',
    opts: [
      'It serves as the semantic caption or legend for the figure',
      'It creates an alt tag automatically',
      'It scales the image to 100% width',
      'It acts as a download link'
    ],
    a: 0,
    h: '<figcaption> defines a caption for its parent <figure>.',
    explanation: '`<figcaption>` represents a caption or legend describing the contents of its parent `<figure>` element.'
  },
  // BOSS 3: Level 24
  {
    t: 'THE SEMANTIC MONOLITH',
    isBoss: true,
    name: 'THE SEMANTIC MONOLITH',
    hp: 700,
    avatar: '🗿',
    story: 'A massive architectural monolith crushing websites built out of "div soup" without semantic tags!',
    phases: [
      {
        q: 'PHASE 1: Monolith tests footer contents! Which semantic element represents copyright, author, and back-to-top links?',
        opts: ['<footer>', '<bottom>', '<base>', '<copyright>'],
        a: 0,
        explanation: '`<footer>` represents a footer for its nearest sectioning content or page root, typically containing copyright and author details.'
      },
      {
        q: 'PHASE 2: Monolith tests landmark limits! How many <main> elements can be visible on an HTML document at one time?',
        opts: [
          'Exactly one (the main element must be unique to the document)',
          'As many as you want',
          'One per section tag',
          'None, main is deprecated'
        ],
        a: 0,
        explanation: 'A document must not have more than one `<main>` element that does not have the `hidden` attribute specified.'
      },
      {
        q: 'PHASE 3: Monolith queries "div soup"! Why are semantic tags preferred over generic <div> tags everywhere?',
        opts: [
          'They provide accessibility landmarks for screen readers, aid SEO, and improve maintainability',
          'They load 50% faster in browsers',
          'They require zero CSS styling',
          'Browsers refuse to render pages with more than 10 divs'
        ],
        a: 0,
        explanation: 'Semantic elements provide meaningful structural information to search engine crawlers and assistive technologies like screen readers.'
      },
      {
        q: 'PHASE 4: Monolith tests list nesting! How must a nested list be structured inside an outer list?',
        opts: [
          'The nested <ul> or <ol> must be placed inside an <li> of the outer list',
          'Placed directly between two <li> items without wrapping',
          'Placed outside the <ul>',
          'Using a <sublist> tag'
        ],
        a: 0,
        explanation: 'In HTML, lists can only contain `<li>` elements as direct children; nested lists must be enclosed inside an `<li>`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which tag represents pre-formatted text where whitespace and line breaks are preserved exactly?',
        opts: ['<pre>', '<format>', '<raw>', '<preserve>'],
        a: 0,
        explanation: 'The `<pre>` element displays preformatted text exactly as written in the HTML source, preserving whitespace and newlines.'
      }
    ]
  },

  // =========================================================================
  // AREA 4: FORM FACTORY (Lv 25-32) - FORMS & INPUT VALIDATION
  // =========================================================================
  {
    t: 'Accessible Form Labels (<label for>)',
    c: '<label for="id"> binds a text label to an input, expanding the clickable area and supporting screen readers.',
    m: 'glitch',
    code: `<label>Callsign:</label>\n<input type="text" name="callsign">`,
    q: 'BUG HUNTER: The label is not programmatically bound to the input. How do you link them?',
    opts: [
      'Give the input an id="callsign" and the label for="callsign"',
      'Set target="input"',
      'Put value="callsign" on label',
      'Wrap both in a <bind> tag'
    ],
    a: 0,
    h: 'Match label for="..." with input id="...".',
    explanation: 'Setting `<label for="userInput">` and `<input id="userInput">` programmatically links the label to the input for accessibility.'
  },
  {
    t: 'HTML5 Input Types (email, number, password)',
    c: 'HTML5 input types provide built-in validation and trigger optimized software keyboards on mobile.',
    m: 'runner',
    code: `<input type="email" required placeholder="operative@arena.io">`,
    q: 'SPEED RUN: What input type triggers native browser email syntax validation (@ check)?',
    opts: [
      'type="email"',
      'type="text"',
      'type="mail"',
      'type="address"'
    ],
    a: 0,
    h: 'Use type="email".',
    explanation: '`type="email"` automatically validates email formatting upon form submission and presents an email keyboard on mobile devices.'
  },
  {
    t: 'Radio Buttons vs Checkboxes',
    c: 'Radio buttons in a group must share the same name attribute so only one can be selected.',
    m: 'detective',
    code: `<input type="radio" name="difficulty" value="EASY">\n<input type="radio" name="difficulty" value="HARD">`,
    q: 'OUTPUT DETECTIVE: Why must mutually exclusive radio buttons share the same name attribute?',
    opts: [
      'It groups them so selecting one automatically deselects the other',
      'It makes them appear side by side',
      'It connects them to the database',
      'It makes them required'
    ],
    a: 0,
    h: 'Shared name forms a mutually exclusive radio group.',
    explanation: 'Radio buttons sharing the same `name` attribute form a radio group where only one button can be checked at a time.'
  },
  {
    t: 'Form Validation Attributes',
    c: 'required, minlength, maxlength, and pattern provide declarative client-side validation.',
    m: 'completion',
    code: `<input type="text" name="code" ___ minlength="6">`,
    q: 'CODE COMPLETION: Choose the boolean attribute that prevents form submission if the field is empty:',
    opts: [
      'required',
      'mandatory',
      'validate="true"',
      'nonempty'
    ],
    a: 0,
    h: 'The attribute is required.',
    explanation: 'The `required` attribute specifies that an input field must be filled out before submitting the form.'
  },
  {
    t: 'Accessible Form Fieldset Assembly',
    c: '<fieldset> groups related form controls; <legend> provides a caption for the group.',
    m: 'builder',
    codeBlocks: [
      '<fieldset>',
      '  <legend>Operative Loadout</legend>',
      '  <label for="w1">Primary Weapon:</label>',
      '  <input type="text" id="w1" name="weapon">',
      '</fieldset>'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    q: 'CODE BUILDER: Assemble the accessible fieldset and legend form grouping:',
    h: 'Opening fieldset, legend caption, label for w1, input with id w1, close fieldset.',
    explanation: '`<fieldset>` groups controls and `<legend>` titles the group, read together by screen readers when navigating between fields.'
  },
  {
    t: 'Dropdown Select Menus (<select>)',
    c: '<select> creates a drop-down list populated by <option> items.',
    m: 'detective',
    code: `<select name="sector">\n  <option value="s1">Sector 1</option>\n  <option value="s2" selected>Sector 2</option>\n</select>`,
    q: 'OUTPUT DETECTIVE: Which option is selected by default upon page load?',
    opts: [
      'Sector 2 (because of the selected attribute)',
      'Sector 1',
      'Neither',
      'Compilation Error'
    ],
    a: 0,
    h: 'The selected attribute specifies the default choice.',
    explanation: 'The `selected` attribute pre-selects that `<option>` when the page loads, making "Sector 2" active.'
  },
  {
    t: 'Multi-Line Textarea Inputs',
    c: '<textarea> provides a multi-line plain text editing control with rows and cols attributes.',
    m: 'detective',
    code: `<textarea rows="4" cols="50">Initial Mission Briefing</textarea>`,
    q: 'OUTPUT DETECTIVE: Where is default text placed in a <textarea>?',
    opts: [
      'Between the opening <textarea> and closing </textarea> tags',
      'In a value="..." attribute',
      'In a placeholder attribute only',
      'In a <text> child element'
    ],
    a: 0,
    h: 'Unlike <input>, <textarea> places initial text between opening and closing tags.',
    explanation: '`<textarea>` is not a void element; its default text is enclosed between `<textarea>` and `</textarea>`.'
  },
  // BOSS 4: Level 32
  {
    t: 'THE VALIDATION DEMON',
    isBoss: true,
    name: 'THE VALIDATION DEMON',
    hp: 800,
    avatar: '👹',
    story: 'A fiend commanding Form Factory, intercepting malformed submissions and payload attacks!',
    phases: [
      {
        q: 'PHASE 1: Demon tests form submission methods! What is the difference between method="GET" and method="POST"?',
        opts: [
          'GET appends form data to the URL query string; POST sends data in the HTTP request body',
          'GET is for sending files, POST is for text only',
          'GET is encrypted, POST is plaintext',
          'There is no difference'
        ],
        a: 0,
        explanation: '`method="GET"` appends form fields as URL parameters (bookmarkable, public); `method="POST"` transmits data in the request body (for sensitive or state-changing operations).'
      },
      {
        q: 'PHASE 2: Demon queries regex pattern validation! What attribute takes a regular expression to validate an input?',
        opts: ['pattern', 'regex', 'match', 'format'],
        a: 0,
        explanation: 'The `pattern="regex"` attribute checks the input value against a regular expression before permitting submission.'
      },
      {
        q: 'PHASE 3: Demon queries submit buttons! What is the default type of a <button> placed inside a <form>?',
        opts: ['type="submit"', 'type="button"', 'type="reset"', 'type="action"'],
        a: 0,
        explanation: 'By HTML specification, `<button>` elements inside a `<form>` default to `type="submit"` unless explicitly given `type="button"`.'
      },
      {
        q: 'PHASE 4: Demon tests file uploads! What enctype attribute is mandatory on a form uploading files with <input type="file">?',
        opts: [
          'enctype="multipart/form-data"',
          'enctype="application/x-www-form-urlencoded"',
          'enctype="text/plain"',
          'enctype="file/binary"'
        ],
        a: 0,
        explanation: 'File uploads require `enctype="multipart/form-data"` on the `<form>` to encode binary file data properly.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! Which attribute on an input provides a temporary hint describing expected value that vanishes on typing?',
        opts: ['placeholder', 'hint', 'value', 'tooltip'],
        a: 0,
        explanation: '`placeholder` displays a faint hint inside an empty input field that disappears as soon as the user types.'
      }
    ]
  },

  // =========================================================================
  // AREA 5: MEDIA MATRIX (Lv 33-40) - IMAGES, AUDIO, VIDEO & CANVAS
  // =========================================================================
  {
    t: 'Image Tags & Mandatory alt Attribute',
    c: '<img> embeds images; the alt attribute provides alternative text for screen readers and when images fail to load.',
    m: 'glitch',
    code: `<img src="glitch.png"> <!-- Bug: Missing alt text! -->`,
    q: 'BUG HUNTER: Accessibility audit flagged this image for missing alt text. Fix the tag:',
    opts: [
      '<img src="glitch.png" alt="Corrupted Glitch Node">',
      '<img src="glitch.png" title="Glitch">',
      '<img src="glitch.png" desc="Glitch">',
      '<image source="glitch.png"></image>'
    ],
    a: 0,
    h: 'Add a descriptive alt="..." attribute.',
    explanation: 'The `alt` attribute is required on all `<img>` tags for web accessibility (WCAG) and renders if the image URL fails.'
  },
  {
    t: 'Image Dimensions & CLS Prevention',
    c: 'Specifying width and height attributes allows the browser to compute aspect ratio and prevent Cumulative Layout Shift (CLS).',
    m: 'runner',
    code: `<img src="avatar.png" alt="Operative" width="80" height="80">`,
    q: 'SPEED RUN: Why is defining explicit width and height on <img> elements a Core Web Vitals best practice?',
    opts: [
      'It reserves space before the image downloads, preventing jarring layout shifts',
      'It makes images download 10x faster',
      'It prevents copying the image',
      'It converts PNG to WebP'
    ],
    a: 0,
    h: 'It reserves layout space, eliminating layout shifts.',
    explanation: 'Providing `width` and `height` attributes enables modern browsers to calculate aspect ratio and allocate space before downloading, eliminating layout shifts.'
  },
  {
    t: 'HTML5 Video Controls',
    c: '<video> embeds video files with built-in controls and fallback sources.',
    m: 'builder',
    codeBlocks: [
      '<video width="640" height="360" controls>',
      '  <source src="briefing.mp4" type="video/mp4">',
      '  <source src="briefing.webm" type="video/webm">',
      '  Your browser does not support the video tag.',
      '</video>'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    q: 'CODE BUILDER: Assemble the accessible HTML5 multi-format video player:',
    h: 'Opening video tag with controls, mp4 source, webm source, fallback text, close video.',
    explanation: 'Providing multiple `<source>` tags allows the browser to choose its most compatible video codec.'
  },
  {
    t: 'The Responsive <picture> Element',
    c: '<picture> wraps multiple <source> elements to serve different image formats or dimensions based on media queries.',
    m: 'detective',
    code: `<picture>\n  <source srcset="hero-dark.webp" media="(prefers-color-scheme: dark)">\n  <img src="hero-light.png" alt="Hero Banner">\n</picture>`,
    q: 'OUTPUT DETECTIVE: If a user has Dark Mode enabled in their OS, which image does <picture> load?',
    opts: [
      'hero-dark.webp',
      'hero-light.png',
      'Both simultaneously',
      'Neither'
    ],
    a: 0,
    h: 'The <source> matching the media query takes precedence.',
    explanation: 'The browser matches the media query `(prefers-color-scheme: dark)` and loads `hero-dark.webp` instead of the fallback `<img>`.'
  },
  {
    t: 'HTML5 Audio Player',
    c: '<audio controls> embeds sound clips without requiring Flash or third-party plugins.',
    m: 'completion',
    code: `<audio ___>\n  <source src="laser.mp3" type="audio/mpeg">\n</audio>`,
    q: 'CODE COMPLETION: Choose the boolean attribute that displays play/pause/volume controls:',
    opts: [
      'controls',
      'autoplay',
      'playbar',
      'ui="true"'
    ],
    a: 0,
    h: 'Use the controls attribute.',
    explanation: 'Without the `controls` attribute, the `<audio>` element is invisible and has no playback UI.'
  },
  {
    t: 'Inline SVG Graphics',
    c: '<svg> renders resolution-independent vector graphics directly in the HTML document.',
    m: 'detective',
    code: `<svg width="100" height="100">\n  <circle cx="50" cy="50" r="40" fill="green" />\n</svg>`,
    q: 'OUTPUT DETECTIVE: What vector shape does <circle> draw?',
    opts: [
      'A green circle of radius 40 centered at coordinates (50, 50)',
      'A green square',
      'An ellipse',
      'A line'
    ],
    a: 0,
    h: 'circle with cx, cy center and r radius.',
    explanation: 'SVG `<circle>` defines a circle with center `(cx, cy)` and radius `r`, filled with green.'
  },
  {
    t: 'HTML5 <canvas> Surface',
    c: '<canvas> provides a scriptable resolution-dependent bitmap canvas for drawing graphics via JavaScript.',
    m: 'detective',
    code: `<canvas id="bg-canvas" width="800" height="600"></canvas>`,
    q: 'OUTPUT DETECTIVE: How does content get rendered onto an HTML <canvas>?',
    opts: [
      'Via JavaScript using a 2D or WebGL rendering context API',
      'Via HTML child tags like <rect>',
      'Via CSS background properties only',
      'Via SVG markup'
    ],
    a: 0,
    h: 'Canvas is painted programmatically via JavaScript.',
    explanation: 'The `<canvas>` tag is a raw pixel container painted dynamically using JavaScript drawing APIs (`getContext("2d")` or `WebGL`).'
  },
  // BOSS 5: Level 40
  {
    t: 'THE MULTIMEDIA HYDRA',
    isBoss: true,
    name: 'THE MULTIMEDIA HYDRA',
    hp: 900,
    avatar: '🐉',
    story: 'A multi-headed media beast roaring across Media Matrix, corrupting codecs and layout dimensions!',
    phases: [
      {
        q: 'PHASE 1: Hydra tests modern image formats! Which modern image format provides superior compression over PNG and JPEG?',
        opts: ['WebP (and AVIF)', 'BMP', 'TIFF', 'ICO'],
        a: 0,
        explanation: 'WebP and AVIF provide vastly superior lossy and lossless compression compared to legacy JPEG and PNG formats.'
      },
      {
        q: 'PHASE 2: Hydra tests lazy loading! Which attribute natively defers loading an offscreen image until the user scrolls near it?',
        opts: ['loading="lazy"', 'defer="true"', 'async="image"', 'fetchpriority="low"'],
        a: 0,
        explanation: '`loading="lazy"` instructs the browser to defer loading images until they are near the viewport, saving network bandwidth.'
      },
      {
        q: 'PHASE 3: Hydra tests iframe sandboxing! Which attribute restricts scripts, popups, and forms inside an <iframe> for security?',
        opts: ['sandbox', 'security="high"', 'protected', 'isolate'],
        a: 0,
        explanation: 'The `sandbox` attribute applies strict security restrictions on content embedded inside an `<iframe>`.'
      },
      {
        q: 'PHASE 4: Hydra queries video accessibility! Which element provides subtitles, captions, or chapter descriptions inside a <video>?',
        opts: ['<track>', '<caption>', '<subtitle>', '<vtt>'],
        a: 0,
        explanation: 'The `<track>` element specifies text tracks (such as WebVTT subtitles, captions, or descriptions) for `<video>` and `<audio>`.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! When should an image have an empty alt text attribute: alt=""?',
        opts: [
          'When the image is purely decorative and conveys no information to the user',
          'When the image fails to load',
          'On all thumbnail images',
          'Never, alt must always have text'
        ],
        a: 0,
        explanation: 'Decorative images should have `alt=""` so assistive technologies (screen readers) know to skip them entirely.'
      }
    ]
  },

  // =========================================================================
  // AREA 6: A11Y SANCTUARY (Lv 41-48) - ACCESSIBILITY & TABLES
  // =========================================================================
  {
    t: 'Accessible Tables (<thead>, <tbody>, <th scope>)',
    c: 'Accessible data tables require <caption>, header cells with <th>, and scope attributes.',
    m: 'glitch',
    code: `<table>\n  <tr><td>NAME</td><td>SCORE</td></tr> <!-- Bug: Using td instead of th for headers! -->\n  <tr><td>Viper</td><td>950</td></tr>\n</table>`,
    q: 'BUG HUNTER: Data table headers are using <td> instead of semantic <th>. What tag identifies a table header cell?',
    opts: [
      '<th scope="col">NAME</th>',
      '<header>NAME</header>',
      '<td header="true">NAME</td>',
      '<caption>NAME</caption>'
    ],
    a: 0,
    h: 'Use <th> with scope="col" for table column headers.',
    explanation: '`<th>` defines header cells, and `scope="col"` explicitly associates the header with its entire column for screen readers.'
  },
  {
    t: 'ARIA Labeling (aria-label)',
    c: 'aria-label provides an invisible accessible name for interactive elements lacking visible text (e.g. icon buttons).',
    m: 'runner',
    code: `<button class="btn-icon" aria-label="Close Modal">✕</button>`,
    q: 'SPEED RUN: An icon-only button displays "✕". What attribute announces "Close Modal" to screen reader users?',
    opts: [
      'aria-label="Close Modal"',
      'tooltip="Close Modal"',
      'alt="Close Modal"',
      'name="Close Modal"'
    ],
    a: 0,
    h: 'aria-label provides an accessible name for screen readers.',
    explanation: '`aria-label` provides a string label for elements that lack visible text, allowing screen readers to speak a meaningful name.'
  },
  {
    t: 'Keyboard Navigation (tabindex)',
    c: 'tabindex="0" includes an element in standard tab order; tabindex="-1" allows programmatic focus without tab access.',
    m: 'detective',
    code: `<div role="button" tabindex="0">Custom Key Button</div>`,
    q: 'OUTPUT DETECTIVE: What does tabindex="0" do for an element?',
    opts: [
      'Makes the element focusable via sequential keyboard navigation (Tab key)',
      'Removes the element from tab order',
      'Focuses the element automatically on page load',
      'Locks keyboard input'
    ],
    a: 0,
    h: 'tabindex="0" inserts the element into standard tab navigation order.',
    explanation: '`tabindex="0"` allows an element to receive keyboard focus in natural document order via the Tab key.'
  },
  {
    t: 'Semantic Buttons vs Clickable Divs',
    c: '<button> provides built-in keyboard activation (Enter/Space), focus management, and button semantics.',
    m: 'detective',
    code: `<div onclick="fireLaser()">SHOOT</div> <!-- Bad practice -->\n<button onclick="fireLaser()">SHOOT</button> <!-- Accessible -->`,
    q: 'OUTPUT DETECTIVE: Why is <button> far superior to <div onclick> for interactive actions?',
    opts: [
      '<button> is natively focusable and triggers on both Enter and Space keys automatically',
      'div onclick is forbidden in HTML5',
      '<button> has faster JavaScript execution',
      'button cannot be styled with CSS'
    ],
    a: 0,
    h: '<button> comes with native keyboard support and accessible roles.',
    explanation: 'Native `<button>` elements have built-in accessibility: they are focusable by Tab and can be triggered with both Enter and Space bar without extra code.'
  },
  {
    t: 'Accessible Data Table Assembly',
    c: 'Full table structure with caption, thead, tbody, th, and td.',
    m: 'builder',
    codeBlocks: [
      '<table>',
      '  <caption>Operative Leaderboard</caption>',
      '  <thead>',
      '    <tr><th scope="col">Hunter</th><th scope="col">XP</th></tr>',
      '  </thead>',
      '  <tbody>',
      '    <tr><td>Viper</td><td>1200</td></tr>',
      '  </tbody>',
      '</table>'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    q: 'CODE BUILDER: Assemble the accessible table with caption, thead, and tbody:',
    h: 'Table, caption, thead with th, tbody with td, close table.',
    explanation: 'This complete table structure satisfies accessibility standards: `<caption>` describes table purpose, and `<thead>` associates columns.'
  },
  {
    t: 'The aria-hidden Attribute',
    c: 'aria-hidden="true" hides purely decorative elements from the accessibility tree.',
    m: 'completion',
    code: `<button>\n  <span ___="true">⚡</span>\n  <span>Activate Turbo</span>\n</button>`,
    q: 'CODE COMPLETION: Choose the ARIA attribute to prevent screen readers from announcing the decorative lightning icon:',
    opts: [
      'aria-hidden',
      'aria-invisible',
      'aria-skip',
      'hidden'
    ],
    a: 0,
    h: 'aria-hidden="true" hides elements from assistive tech.',
    explanation: '`aria-hidden="true"` removes an element from the accessibility API, preventing screen readers from reading decorative icons.'
  },
  {
    t: 'Heading Hierarchy Order (No Skipping Levels)',
    c: 'Headings should follow logical hierarchical order (h1 -> h2 -> h3) without skipping levels.',
    m: 'detective',
    code: `<h1>Code Arena</h1>\n<h4>Level 1</h4> <!-- Bad: Skips h2 and h3! -->`,
    q: 'OUTPUT DETECTIVE: Why does WCAG accessibility prohibit jumping directly from <h1> to <h4>?',
    opts: [
      'It creates a fragmented, confusing outline for users navigating by heading levels',
      'It breaks CSS cascading rules',
      'The browser ignores h4 tags if h2 is missing',
      'h4 is only for footnotes'
    ],
    a: 0,
    h: 'Screen reader users rely on headings to form a mental table of contents.',
    explanation: 'Screen readers provide navigation by heading level. Skipping levels (e.g. `<h1>` straight to `<h4>`) breaks the mental outline of the page.'
  },
  // BOSS 6: Level 48
  {
    t: 'THE CONTRAST COLOSSUS',
    isBoss: true,
    name: 'THE CONTRAST COLOSSUS',
    hp: 1000,
    avatar: '🗿',
    story: 'A titan residing in A11y Sanctuary, smashing unreadable markup, inaccessible forms, and missing labels!',
    phases: [
      {
        q: 'PHASE 1: Colossus tests ARIA live regions! What does aria-live="polite" do when dynamic text changes in a container?',
        opts: [
          'Screen reader announces the new text when the user finishes current speech',
          'Immediately interrupts speech with an alarm',
          'Speaks the text in a whisper',
          'Translates the text into braille only'
        ],
        a: 0,
        explanation: '`aria-live="polite"` instructs assistive technologies to announce dynamic content updates when the user is idle, without interrupting current speech.'
      },
      {
        q: 'PHASE 2: Colossus queries skip navigation links! What is a "Skip to Content" link at the top of a page used for?',
        opts: [
          'Allows keyboard and screen reader users to bypass repetitive header navigation menus directly to main content',
          'Skips advertisements only',
          'Navigates to the bottom footer',
          'Reloads the page'
        ],
        a: 0,
        explanation: 'Skip links allow keyboard-only users to bypass repetitive navigation bars with a single keystroke, jumping straight to `<main>`.'
      },
      {
        q: 'PHASE 3: Colossus queries the role attribute! When should ARIA role="..." attributes be used?',
        opts: [
          'Only when no native HTML semantic element exists that already provides that role (First Rule of ARIA)',
          'On every single HTML tag',
          'Only on span tags',
          'In place of all CSS classes'
        ],
        a: 0,
        explanation: 'The First Rule of ARIA: Do not use ARIA if you can use a native HTML element with the semantics and behavior already built in.'
      },
      {
        q: 'PHASE 4: Colossus queries visible focus states! Why must CSS never use :focus { outline: none; } without a custom visible alternative?',
        opts: [
          'Keyboard users lose track of which interactive element currently has focus',
          'It crashes Chrome and Safari',
          'It disables the mouse cursor',
          'It breaks touchscreens'
        ],
        a: 0,
        explanation: 'Removing focus outlines without a clear visual replacement makes the page unusable for keyboard navigators, violating WCAG criterion 2.4.7.'
      },
      {
        q: 'PHASE 5: FINAL STRIKE! What is the minimum recommended touch target size for mobile buttons according to WCAG / mobile guidelines?',
        opts: [
          'At least 44x44 to 48x48 CSS pixels',
          '10x10 pixels',
          '100x100 pixels',
          '20x20 pixels'
        ],
        a: 0,
        explanation: 'WCAG 2.5.5 and mobile platforms (Apple HIG / Android Material) recommend minimum interactive touch targets of 44–48px for comfortable thumb tapping.'
      }
    ]
  },

  // =========================================================================
  // AREA 7: DOM CORE & MASTER CHALLENGES (Lv 49-51)
  // =========================================================================
  {
    t: 'HTML5 Data Attributes (data-*)',
    c: 'data-* attributes allow storing custom data private to the page or application on any HTML element.',
    m: 'detective',
    code: `<div id="operative" data-level="42" data-rank="elite">Viper</div>\n// In JS: el.dataset.level returns "42"`,
    q: 'OUTPUT DETECTIVE: How does JavaScript access custom HTML5 data-level attributes?',
    opts: [
      'Via the element.dataset.level property',
      'Via element.data.level',
      'Via element.dataLevel() method',
      'Through a global data array'
    ],
    a: 0,
    h: 'Use the element.dataset object.',
    explanation: 'Custom attributes prefixed with `data-` are mapped to the DOM element\'s `dataset` object (e.g. `data-rank` -> `element.dataset.rank`).'
  },
  {
    t: 'Script Loading: defer vs async',
    c: 'defer downloads scripts in parallel and executes them in order after the HTML document is parsed.',
    m: 'builder',
    codeBlocks: [
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      '  <script src="engine.js" defer></script>',
      '</head>',
      '<body><h1>App</h1></body>',
      '</html>'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    q: 'CODE BUILDER: Assemble the optimal non-blocking defer script tag in the document head:',
    h: 'Doctype, html, head, script with defer attribute, close head, body, close html.',
    explanation: 'The `defer` attribute allows the script to be downloaded in the background without pausing HTML parsing, executing in order once the DOM is ready.'
  },
  // FINAL BOSS: Level 51
  {
    t: 'THE DOM SOVEREIGN',
    isBoss: true,
    isFinalBoss: true,
    name: 'THE DOM SOVEREIGN',
    hp: 1200,
    avatar: '👑',
    story: 'THE SUPREME EMPEROR OF THE WEB! It rules Document Object Model trees, CSSOM layouts, browser parsing pipelines, and accessibility standards. Overcome it for Web Mastery!',
    phases: [
      {
        q: 'PHASE 1: Sovereign tests responsive viewport meta tag! What is the purpose of <meta name="viewport" content="width=device-width, initial-scale=1.0">?',
        opts: [
          'Ensures the page matches the screen width of mobile devices and sets initial zoom to 100%',
          'Enables desktop view on mobile phones',
          'Enables full-screen mode',
          'Scales images to high resolution'
        ],
        a: 0,
        explanation: 'The viewport meta tag instructs mobile browsers to render the page at the physical device width rather than a default virtual 980px desktop canvas.'
      },
      {
        q: 'PHASE 2: Sovereign tests script defer vs async! How does async differ from defer for external script tags?',
        opts: [
          'async executes immediately when downloaded, potentially interrupting HTML parsing; defer executes after parsing in document order',
          'async only runs on mobile',
          'defer is synchronous and blocking',
          'They are exact synonyms'
        ],
        a: 0,
        explanation: '`async` executes as soon as the script finishes downloading (out of order, potentially pausing HTML parsing). `defer` guarantees execution order after DOM parsing finishes.'
      },
      {
        q: 'PHASE 3: Sovereign tests Open Graph social metadata! Which meta tags allow platforms (Discord, Twitter, LinkedIn) to show rich preview cards?',
        opts: [
          '<meta property="og:title"> and <meta property="og:image">',
          '<meta name="social">',
          '<link rel="preview">',
          '<card type="social">'
        ],
        a: 0,
        explanation: 'Open Graph (`og:`) meta tags provide rich media titles, descriptions, and preview images when links are shared on social platforms.'
      },
      {
        q: 'PHASE 4: Sovereign queries DOM tree construction! What does the browser create when parsing an HTML document?',
        opts: [
          'The DOM (Document Object Model) tree of nodes representing the document structure',
          'A binary machine code image',
          'A relational SQL database',
          'An SVG canvas'
        ],
        a: 0,
        explanation: 'The browser parser tokenizes HTML tags and constructs a live hierarchical tree of Node objects called the Document Object Model (DOM).'
      },
      {
        q: 'PHASE 5: MASTER STRIKE! Which HTML5 element represents self-contained content that can be toggled open and closed natively without JavaScript?',
        opts: [
          '<details> with a <summary> element',
          '<accordion>',
          '<collapse>',
          '<toggle>'
        ],
        a: 0,
        explanation: 'The `<details>` and `<summary>` elements create native, accessible disclosure widgets (accordions/dropdowns) with zero JavaScript required.'
      }
    ]
  }
];
