# Personal Room

Персональный сайт-портфолио веб-разработчика на Nuxt 4.

## Технологии

- **Nuxt 4** - фреймворк для Vue.js
- **Vue 3** - прогрессивный JavaScript фреймворк
- **TypeScript** - типизированный JavaScript
- **SCSS** - препроцессор CSS
- **Pinia** - state management
- **VueUse** - коллекция композаблов для Vue
- **i18n** - интернационализация

## Особенности

- Минималистичный современный дизайн
- Адаптивная верстка
- Поддержка темной/светлой темы (автоматическое определение)
- Мультиязычность (RU/EN)
- SSR отключен (SPA режим)

## Установка

### Использование npm

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Предпросмотр production сборки
npm run preview
```

### Использование yarn

```bash
# Установка зависимостей
yarn install

# Запуск dev сервера
yarn dev

# Сборка для production
yarn build

# Предпросмотр production сборки
yarn preview
```

## Структура проекта

```
personal-room/
├── app/
│   ├── assets/          # Ресурсы (стили, изображения, иконки)
│   ├── components/      # Vue компоненты
│   ├── composables/     # Композаблы
│   ├── layouts/         # Layouts
│   ├── locales/         # Файлы локализации
│   ├── pages/           # Страницы
│   └── types/           # TypeScript типы
├── public/              # Публичные файлы
└── .husky/              # Git hooks
```

## Линтинг и форматирование

### Использование npm

```bash
# Проверка ESLint
npm run lint

# Автоисправление ESLint
npm run lint:fix

# Форматирование Prettier
npm run format

# Проверка Stylelint
npm run stylelint

# Автоисправление Stylelint
npm run stylelint:fix
```

### Использование yarn

```bash
# Проверка ESLint
yarn lint

# Автоисправление ESLint
yarn lint:fix

# Форматирование Prettier
yarn format

# Проверка Stylelint
yarn stylelint

# Автоисправление Stylelint
yarn stylelint:fix
```

## Git Hooks

Проект использует Husky для автоматической проверки кода перед коммитом:

- **pre-commit**: Автоматически запускает линтинг и форматирование через lint-staged

## Стили

Проект использует SCSS с модульной структурой:

- `variables/` - переменные (цвета, размеры, брейкпоинты)
- `tools/` - функции и миксины
- `base/` - базовые стили

### Функции и миксины

- `rem()` - конвертация px в rem
- `@mixin mobile`, `@mixin tablet`, `@mixin desktop` - медиа-запросы

## Лицензия

MIT

