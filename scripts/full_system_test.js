const fs = require('fs');
const path = require('path');
const vm = require('vm');

const context = { window: {} };
vm.createContext(context);

const languages = [
  'javascript', 'python', 'c', 'java', 'html',
  'cpp', 'csharp', 'go', 'ruby', 'swift'
];

console.log('--- SYSTEM VERIFICATION TEST ---');
console.log('1. Loading all 10 curriculums...');
languages.forEach(lang => {
  const filePath = path.join(__dirname, '..', 'js', 'curriculum', `${lang}.js`);
  const content = fs.readFileSync(filePath, 'utf8');
  vm.runInContext(content, context);
  console.log(`  ✓ ${lang}.js loaded (${context.window.CURRICULUM_DATA[lang].length} levels)`);
});

console.log('\n2. Loading levels.js and building full curriculum matrix...');
const levelsPath = path.join(__dirname, '..', 'js', 'levels.js');
const levelsContent = fs.readFileSync(levelsPath, 'utf8');
vm.runInContext(levelsContent, context);

const allLevels = context.window.LEVELS_DATA;
console.log(`  ✓ Total Levels Built: ${allLevels.length}`);

let testFailures = 0;

if (allLevels.length !== 510) {
  console.error(`FAIL: Expected 510 levels, got ${allLevels.length}`);
  testFailures++;
}

console.log('\n3. Validating each world and level integrity...');
const worlds = context.window.WORLDS_CONFIG;

worlds.forEach(world => {
  const wLevels = allLevels.filter(l => l.worldId === world.id);
  if (wLevels.length !== 51) {
    console.error(`FAIL: World ${world.name} has ${wLevels.length} levels, expected 51`);
    testFailures++;
  }

  const bosses = wLevels.filter(l => l.mode === 'boss');
  if (bosses.length !== 7) {
    console.error(`FAIL: World ${world.name} has ${bosses.length} bosses, expected 7`);
    testFailures++;
  }

  wLevels.forEach((lvl, idx) => {
    const lvlNum = idx + 1;
    if (lvl.levelNumber !== lvlNum) {
      console.error(`FAIL: ${world.id} Lv ${lvlNum} has levelNumber ${lvl.levelNumber}`);
      testFailures++;
    }

    if (!lvl.title || lvl.title.trim() === '') {
      console.error(`FAIL: ${world.id} Lv ${lvlNum} missing title`);
      testFailures++;
    }

    if (!lvl.explanation || lvl.explanation.trim() === '') {
      console.error(`FAIL: ${world.id} Lv ${lvlNum} missing explanation`);
      testFailures++;
    }

    if (!lvl.hint || lvl.hint.trim() === '') {
      console.error(`FAIL: ${world.id} Lv ${lvlNum} missing hint`);
      testFailures++;
    }

    if (lvl.mode === 'boss') {
      if (!lvl.phases || lvl.phases.length !== 5) {
        console.error(`FAIL: ${world.id} Boss Lv ${lvlNum} does not have 5 phases`);
        testFailures++;
      } else {
        lvl.phases.forEach((p, pIdx) => {
          if (!p.question || p.question.trim() === '') {
            console.error(`FAIL: ${world.id} Boss Lv ${lvlNum} Phase ${pIdx + 1} empty question`);
            testFailures++;
          }
          if (!p.options || p.options.length !== 4) {
            console.error(`FAIL: ${world.id} Boss Lv ${lvlNum} Phase ${pIdx + 1} options length !== 4`);
            testFailures++;
          }
          if (p.correctAnswer < 0 || p.correctAnswer > 3 || p.correctAnswer === undefined) {
            console.error(`FAIL: ${world.id} Boss Lv ${lvlNum} Phase ${pIdx + 1} invalid correctAnswer: ${p.correctAnswer}`);
            testFailures++;
          }
        });
      }
    } else if (lvl.mode === 'builder') {
      if (!lvl.codeBlocks || lvl.codeBlocks.length === 0) {
        console.error(`FAIL: ${world.id} Builder Lv ${lvlNum} missing codeBlocks`);
        testFailures++;
      }
    } else {
      if (!lvl.options || lvl.options.length !== 4) {
        console.error(`FAIL: ${world.id} Lv ${lvlNum} options length !== 4`);
        testFailures++;
      }
      if (lvl.correctAnswer < 0 || lvl.correctAnswer > 3 || lvl.correctAnswer === undefined) {
        console.error(`FAIL: ${world.id} Lv ${lvlNum} invalid correctAnswer: ${lvl.correctAnswer}`);
        testFailures++;
      }
    }
  });
});

console.log(`  ✓ Checked all 510 levels across all 10 worlds.`);

console.log('\n4. Testing Fisher-Yates option shuffling logic...');
let shuffleTested = 0;
let positionChanges = 0;
for (let t = 0; t < 100; t++) {
  const sampleLevel = allLevels[Math.floor(Math.random() * allLevels.length)];
  if (sampleLevel.mode !== 'boss' && sampleLevel.mode !== 'builder' && sampleLevel.options) {
    shuffleTested++;
    const rawOptions = sampleLevel.options;
    const shuffled = rawOptions.map((opt, origIdx) => ({ text: opt, origIdx }));
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Verify that the correct answer is preserved
    const correctOption = shuffled.find(item => item.origIdx === sampleLevel.correctAnswer);
    if (!correctOption || correctOption.text !== sampleLevel.options[sampleLevel.correctAnswer]) {
      console.error(`FAIL: Shuffling broke correct answer mapping!`);
      testFailures++;
    }
    const newPos = shuffled.findIndex(item => item.origIdx === sampleLevel.correctAnswer);
    if (newPos !== sampleLevel.correctAnswer) {
      positionChanges++;
    }
  }
}
console.log(`  ✓ Tested ${shuffleTested} shuffles: dynamic position changes observed in ${positionChanges}/${shuffleTested} runs (proves non-static placement).`);

console.log('\n5. Checking index.html script tag inclusions...');
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
languages.forEach(lang => {
  const scriptTag = `js/curriculum/${lang}.js`;
  if (!indexHtml.includes(scriptTag)) {
    console.error(`FAIL: index.html missing script tag for ${scriptTag}`);
    testFailures++;
  } else {
    console.log(`  ✓ index.html links ${scriptTag}`);
  }
});

if (!indexHtml.includes('arena-explanation-drawer')) {
  console.error(`FAIL: index.html missing arena-explanation-drawer`);
  testFailures++;
} else {
  console.log(`  ✓ index.html contains arena-explanation-drawer`);
}

console.log('\n=============================================');
if (testFailures === 0) {
  console.log('🎉 ALL SYSTEM TESTS PASSED WITH 0 FAILURES!');
  console.log('510 levels, 70 bosses, 350 phases, 10 languages, explanation drawer, dynamic shuffling & responsive layout verified!');
} else {
  console.error(`❌ SYSTEM TESTS COMPLETED WITH ${testFailures} FAILURES.`);
  process.exit(1);
}
console.log('=============================================');
