import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Проверяем последний коммит - не был ли он уже коммитом версии
try {
  const lastCommitMessage = execSync("git log -1 --pretty=%B", {
    cwd: rootDir,
    encoding: "utf-8",
  }).trim();

  // Если последний коммит уже был обновлением версии, не создаем новый
  if (lastCommitMessage.startsWith("chore: bump version to")) {
    console.log(
      "ℹ️  Пропускаем обновление версии (последний коммит уже обновил версию)",
    );
    process.exit(0);
  }
} catch {
  // Если ошибка при проверке, продолжаем
}

// Читаем version.json
const versionPath = join(rootDir, "version.json");
const packagePath = join(rootDir, "package.json");
const versionData = JSON.parse(readFileSync(versionPath, "utf-8"));
const packageData = JSON.parse(readFileSync(packagePath, "utf-8"));

// Парсим версию
const [major, minor, patch] = versionData.version.split(".").map(Number);

// Увеличиваем patch версию
const newVersion = `${major}.${minor}.${patch + 1}`;

// Обновляем version.json
versionData.version = newVersion;
writeFileSync(
  versionPath,
  JSON.stringify(versionData, null, 2) + "\n",
  "utf-8",
);

// Обновляем package.json
packageData.version = newVersion;
writeFileSync(
  packagePath,
  JSON.stringify(packageData, null, 2) + "\n",
  "utf-8",
);

// Копируем в public/version.json
const publicVersionPath = join(rootDir, "public", "version.json");
writeFileSync(
  publicVersionPath,
  JSON.stringify(versionData, null, 2) + "\n",
  "utf-8",
);

// Создаем коммит с обновлением версии
try {
  execSync(`git add "${versionPath}" "${publicVersionPath}" "${packagePath}"`, {
    cwd: rootDir,
    stdio: "pipe",
  });

  // Проверяем, есть ли изменения
  const status = execSync("git status --porcelain", {
    cwd: rootDir,
    encoding: "utf-8",
  });

  if (status.trim()) {
    // Временно отключаем post-commit hook чтобы избежать рекурсии
    execSync(
      `git -c core.hooksPath=/dev/null commit -m "chore: bump version to ${newVersion}"`,
      {
        cwd: rootDir,
        stdio: "inherit",
      },
    );
    console.log(`✅ Версия обновлена до ${newVersion} и закоммичена`);
  } else {
    console.log(`ℹ️  Версия уже актуальна: ${newVersion}`);
  }
} catch (error) {
  console.error("❌ Ошибка при обновлении версии:", error.message);
  process.exit(1);
}
