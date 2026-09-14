const fs = require('fs');
const path = require('path');
const vm = require('vm');

const context = { window: {} };
vm.createContext(context);

const languages = [
  'javascript', 'python', 'c', 'java', 'html',
  'cpp', 'csharp', 'go', 'ruby', 'swift'
];

languages.forEach(lang => {
  const filePath = path.join(__dirname, '..', 'js', 'curriculum', `${lang}.js`);
  const content = fs.readFileSync(filePath, 'utf8');
  vm.runInContext(content, context);
});

// Load levels.js
const levelsJsPath = path.join(__dirname, '..', 'js', 'levels.js');
const levelsJsContent = fs.readFileSync(levelsJsPath, 'utf8');
vm.runInContext(levelsJsContent, context);

const allLevels = context.window.LEVELS_DATA;
console.log(`Successfully built LEVELS_DATA: ${allLevels ? allLevels.length : 0} levels`);

if (!allLevels || allLevels.length !== 510) {
  console.error(`ERROR: Expected 510 levels, got ${allLevels ? allLevels.length : 0}`);
  process.exit(1);
}

// Check sample levels across worlds
const worlds = context.window.WORLDS_CONFIG;
worlds.forEach(w => {
  const worldLevels = allLevels.filter(l => l.worldId === w.id);
  const bossLevels = worldLevels.filter(l => l.mode === 'boss');
  console.log(`World [${w.name}]: ${worldLevels.length} levels, ${bossLevels.length} bosses`);
  if (worldLevels.length !== 51) {
    console.error(`ERROR: ${w.name} has ${worldLevels.length} levels!`);
    process.exit(1);
  }
  if (bossLevels.length !== 7) {
    console.error(`ERROR: ${w.name} has ${bossLevels.length} bosses!`);
    process.exit(1);
  }
  // Check boss phases
  bossLevels.forEach(b => {
    if (!b.phases || b.phases.length !== 5) {
      console.error(`ERROR: Boss ${b.title} does not have 5 phases!`);
      process.exit(1);
    }
  });
});

console.log('ALL 10 WORLDS AND 510 LEVELS BUILT WITH 100% INTEGRITY!');
