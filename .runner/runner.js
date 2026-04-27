const fs = require('fs');
const { spawn } = require('child_process');

const TRIGGER_FILE = '.runner/.trigger';
const RESULT_FILE = 'src/assets/test-result.txt';
const OUTPUT_FILE = 'src/assets/test-output.txt';

function ensureTriggerFile() {
  if (!fs.existsSync('.runner')) {
    fs.mkdirSync('.runner', { recursive: true });
  }
  if (!fs.existsSync(TRIGGER_FILE)) {
    fs.writeFileSync(TRIGGER_FILE, Date.now().toString());
  }
}

function writeResult(status) {
  const content = `__TEST_RESULT__${status}__`;
  fs.writeFileSync(RESULT_FILE, content);
  console.log(`[Runner] result: ${content}`);
}

let isRunning = false;

function runTests() {
  if (isRunning) return;
  isRunning = true;

  console.log('[Runner] running tests...');

  writeResult('RUNNING');

  const testProcess = spawn('npm', ['run', 'test'], {
    shell: true,
  });

  let fullOutput = '';

  testProcess.stdout.on('data', (data) => {
    const text = data.toString();
    fullOutput += text;
    process.stdout.write('[JEST] ' + text);
  });

  testProcess.stderr.on('data', (data) => {
    const text = data.toString();
    fullOutput += text;
    process.stderr.write('[JEST ERROR] ' + text);
  });

  testProcess.on('close', (code) => {
    console.log('[Runner] test process finished with code:', code);

    const status = code === 0 ? 'PASS' : 'FAIL';

    fs.writeFileSync(OUTPUT_FILE, fullOutput);

    writeResult(status);

    isRunning = false;
  });
}

function watchTrigger() {
  let debounceTimeout = null;

  fs.watch(TRIGGER_FILE, (eventType) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      console.log(`[Runner] trigger detected (event: ${eventType})`);
      runTests();
    }, 100);
  });
}

function bootstrap() {
  ensureTriggerFile();
  watchTrigger();
  console.log('[Runner] ready and watching for triggers...');
}

bootstrap();
