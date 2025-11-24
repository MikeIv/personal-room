import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Читаем version.json
const versionPath = join(rootDir, 'version.json');
const versionData = JSON.parse(readFileSync(versionPath, 'utf-8'));

// Парсим версию
const [major, minor, patch] = versionData.version.split('.').map(Number);

// Увеличиваем patch версию
const newVersion = `${major}.${minor}.${patch + 1}`;

// Обновляем version.json
versionData.version = newVersion;
writeFileSync(versionPath, JSON.stringify(versionData, null, 2) + '\n', 'utf-8');

// Копируем в public/version.json
const publicVersionPath = join(rootDir, 'public', 'version.json');
writeFileSync(publicVersionPath, JSON.stringify(versionData, null, 2) + '\n', 'utf-8');

// Добавляем изменения в git и создаем коммит
try {
  execSync(`git add "${versionPath}" "${publicVersionPath}"`, { cwd: rootDir, stdio: 'pipe' });
  
  // Проверяем, есть ли изменения для коммита
  try {
    execSync(`git commit -m "chore: bump version to ${newVersion}"`, { 
      cwd: rootDir, 
      stdio: 'inherit' 
    });
    console.log(`✅ Версия обновлена до ${newVersion} и закоммичена`);
  } catch (commitError) {
    // Если коммит не удался (например, нет изменений), это нормально
    if (commitError.message && commitError.message.includes('nothing to commit')) {
      console.log(`✅ Версия уже актуальна: ${newVersion}`);
    } else {
      throw commitError;
    }
  }
} catch (error) {
  console.error('❌ Ошибка при обновлении версии:', error.message);
  process.exit(1);
}

