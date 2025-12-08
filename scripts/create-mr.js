import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Проверяем, что мы в ветке develop
const currentBranch = execSync('git symbolic-ref --short HEAD', { 
  cwd: rootDir, 
  encoding: 'utf-8' 
}).trim();

if (currentBranch !== 'develop') {
  console.error('❌ Этот скрипт должен запускаться только из ветки develop');
  console.error(`   Текущая ветка: ${currentBranch}`);
  process.exit(1);
}

// Проверяем, что есть удаленная ветка develop
try {
  execSync('git ls-remote --heads origin develop', { 
    cwd: rootDir, 
    stdio: 'pipe' 
  });
} catch (error) {
  console.error('❌ Удаленная ветка origin/develop не найдена');
  console.error('   Сначала выполните: git push -u origin develop');
  process.exit(1);
}

// Получаем последний коммит для описания PR
let commitMessage = '';
try {
  commitMessage = execSync('git log -1 --pretty=%B', { 
    cwd: rootDir, 
    encoding: 'utf-8' 
  }).trim();
} catch (error) {
  commitMessage = 'Merge develop into main';
}

// Получаем URL репозитория
const repoUrl = execSync('git config --get remote.origin.url', { 
  cwd: rootDir, 
  encoding: 'utf-8' 
}).trim();

// Преобразуем SSH URL в HTTPS или используем как есть
let githubUrl = repoUrl;
if (repoUrl.startsWith('git@')) {
  githubUrl = repoUrl
    .replace('git@github.com:', 'https://github.com/')
    .replace('.git', '');
} else if (repoUrl.endsWith('.git')) {
  githubUrl = repoUrl.replace('.git', '');
}

const prUrl = `${githubUrl}/compare/main...develop?expand=1`;

// Пытаемся создать Pull Request через GitHub CLI
try {
  const prResult = execSync(
    `gh pr create --base main --head develop --title "Merge develop into main" --body "${commitMessage.replace(/"/g, '\\"')}"`,
    { 
      cwd: rootDir, 
      encoding: 'utf-8',
      stdio: 'pipe'
    }
  ).trim();
  
  console.log('✅ Pull Request создан успешно!');
  console.log(`   ${prResult}`);
} catch (error) {
  // Если GitHub CLI не установлен, выводим ссылку
  console.log('💡 GitHub CLI не установлен. Откройте ссылку в браузере для создания PR:');
  console.log(`   ${prUrl}`);
  console.log('');
  console.log('   Или установите GitHub CLI: https://cli.github.com/');
}

