// Validation script to test all curriculum files
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const languages = [
  'javascript',
  'python',
  'c',
  'java',
  'html',
  'cpp',
  'csharp',
  'go',
  'ruby',
  'swift'
];

const context = { window: {} };
vm.createContext(context);

console.log('Loading curriculum files...');
languages.forEach(lang => {
  const filePath = path.join(__dirname, '..', 'js', 'curriculum', `${lang}.js`);
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File missing: ${filePath}`);
    process.exit(1);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  vm.runInContext(content, context);
  console.log(`Loaded ${lang}.js successfully.`);
});

const curriculum = context.window.CURRICULUM_DATA;
if (!curriculum) {
  console.error('ERROR: window.CURRICULUM_DATA is undefined');
  process.exit(1);
}

let totalLevels = 0;
let totalBosses = 0;
let totalBossPhases = 0;
let totalErrors = 0;
const overallAnswerDist = { 0: 0, 1: 0, 2: 0, 3: 0 };

languages.forEach(lang => {
  const levels = curriculum[lang];
  if (!levels) {
    console.error(`ERROR: Language '${lang}' missing in window.CURRICULUM_DATA`);
    totalErrors++;
    return;
  }

  if (levels.length !== 51) {
    console.error(`ERROR: '${lang}' has ${levels.length} levels, expected 51`);
    totalErrors++;
  }

  const langAnswerDist = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const bossLevels = [8, 16, 24, 32, 40, 48, 51];

  levels.forEach((lvl, idx) => {
    totalLevels++;
    const expectedNum = idx + 1;
    const title = lvl.title || lvl.t;
    const prompt = lvl.prompt || lvl.q;
    const hint = lvl.hint || lvl.h;
    const explanation = lvl.explanation || lvl.c;
    const isBoss = bossLevels.includes(expectedNum);
    const options = lvl.options || lvl.opts;
    const correctAnswer = lvl.correctAnswer !== undefined ? lvl.correctAnswer : lvl.a;

    if (!title || title.trim() === '') {
      console.error(`ERROR in ${lang} Lv ${expectedNum}: Empty title`);
      totalErrors++;
    }

    if (!isBoss && (!prompt || prompt.trim() === '')) {
      console.error(`ERROR in ${lang} Lv ${expectedNum}: Empty prompt`);
      totalErrors++;
    }

    if (!hint || hint.trim() === '') {
      console.error(`ERROR in ${lang} Lv ${expectedNum}: Empty hint`);
      totalErrors++;
    }

    if (!explanation || explanation.trim() === '') {
      console.error(`ERROR in ${lang} Lv ${expectedNum}: Empty explanation`);
      totalErrors++;
    }

    if (isBoss) {
      totalBosses++;
      const bossPhases = (lvl.bossData && lvl.bossData.phases) || lvl.phases;
      if (!Array.isArray(bossPhases) || bossPhases.length !== 5) {
        console.error(`ERROR in ${lang} Lv ${expectedNum}: Boss phases missing or does not have 5 phases`);
        totalErrors++;
      } else {
        bossPhases.forEach((phase, pIdx) => {
          totalBossPhases++;
          const pPrompt = phase.prompt || phase.q;
          const pOptions = phase.options || phase.opts;
          const pAnswer = phase.correctAnswer !== undefined ? phase.correctAnswer : phase.a;
          const pExpl = phase.explanation;

          if (!pPrompt || pPrompt.trim() === '') {
            console.error(`ERROR in ${lang} Lv ${expectedNum} Phase ${pIdx + 1}: empty prompt`);
            totalErrors++;
          }
          if (!Array.isArray(pOptions) || pOptions.length !== 4) {
            console.error(`ERROR in ${lang} Lv ${expectedNum} Phase ${pIdx + 1}: options length is not 4`);
            totalErrors++;
          }
          if (pAnswer < 0 || pAnswer > 3 || pAnswer === undefined) {
            console.error(`ERROR in ${lang} Lv ${expectedNum} Phase ${pIdx + 1}: correctAnswer ${pAnswer} out of bounds`);
            totalErrors++;
          } else {
            langAnswerDist[pAnswer]++;
            overallAnswerDist[pAnswer]++;
          }
        });
      }
    } else {
      if (!Array.isArray(options) || options.length !== 4) {
        console.error(`ERROR in ${lang} Lv ${expectedNum}: options length is not 4`);
        totalErrors++;
      }
      if (correctAnswer < 0 || correctAnswer > 3 || correctAnswer === undefined) {
        console.error(`ERROR in ${lang} Lv ${expectedNum}: correctAnswer ${correctAnswer} out of bounds`);
        totalErrors++;
      } else {
        langAnswerDist[correctAnswer]++;
        overallAnswerDist[correctAnswer]++;
      }
    }
  });

  console.log(`Language [${lang}]: 51 levels verified. Answer dist: 0:${langAnswerDist[0]}, 1:${langAnswerDist[1]}, 2:${langAnswerDist[2]}, 3:${langAnswerDist[3]}`);
});

console.log('==================================================');
console.log(`TOTAL LEVELS: ${totalLevels} (Expected: 510)`);
console.log(`TOTAL BOSSES: ${totalBosses} (Expected: 70)`);
console.log(`TOTAL BOSS PHASES: ${totalBossPhases} (Expected: 350)`);
console.log(`OVERALL ANSWER DISTRIBUTION:`, overallAnswerDist);
console.log(`TOTAL ERRORS: ${totalErrors}`);
console.log('==================================================');

if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log('ALL 510 LEVELS VALIDATED SUCCESSFULLY!');
}
