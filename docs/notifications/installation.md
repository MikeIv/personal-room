# 📦 Инструкция по установке системы уведомлений

Пошаговое руководство по установке и настройке системы уведомлений в различных типах проектов.

## 📋 Содержание

1. [Для Nuxt 3](#для-nuxt-3)
2. [Для Vue 3 (Vite)](#для-vue-3-vite)
3. [Для Vue 3 (Webpack)](#для-vue-3-webpack)
4. [Проверка установки](#проверка-установки)
5. [Решение проблем](#решение-проблем)

---

## 🚀 Для Nuxt 3

### Шаг 1: Структура проекта

Создайте следующую структуру папок (если их нет):

```
ваш-проект/
├── app/
│   ├── composables/
│   │   └── useNotifications.ts
│   └── components/
│       ├── NotificationToast.vue
│       └── NotificationIcons/
│           ├── Success.vue
│           ├── Error.vue
│           ├── Warning.vue
│           └── Info.vue
└── nuxt.config.ts
```

### Шаг 2: Копирование файлов

Скопируйте файлы:

1. **`app/composables/useNotifications.ts`** - composable для управления уведомлениями
2. **`app/components/NotificationToast.vue`** - компонент отображения
3. **`app/components/NotificationIcons/`** - папка с компонентами иконок:
   - `Success.vue` - иконка успеха
   - `Error.vue` - иконка ошибки
   - `Warning.vue` - иконка предупреждения
   - `Info.vue` - иконка информации

**Важно:** В версии 2.1.0 добавлены следующие оптимизации:
- Использование `readonly()` вместо `computed()` для лучшей производительности
- SVG иконки вынесены в отдельные компоненты с асинхронной загрузкой
- Устранено дублирование кода в методах типов уведомлений

Убедитесь, что вы копируете последнюю версию всех файлов.

### Шаг 3: Подключение компонента

Откройте `app/app.vue` (или создайте, если его нет):

```vue
<script setup lang="ts">
import { useNotifications } from '~/composables/useNotifications'

const { notifications, remove } = useNotifications()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  
  <!-- Компонент уведомлений -->
  <NotificationToast :notifications="notifications" :on-remove="remove" />
</template>
```

Или в `app/layouts/default.vue`:

```vue
<script setup lang="ts">
import { useNotifications } from '~/composables/useNotifications'

const { notifications, remove } = useNotifications()
</script>

<template>
  <div>
    <slot />
  </div>
  
  <!-- Компонент уведомлений -->
  <NotificationToast :notifications="notifications" :on-remove="remove" />
</template>
```

### Шаг 4: Проверка

Создайте тестовую страницу:

```vue
<!-- app/pages/test.vue -->
<script setup lang="ts">
import { useNotifications } from '~/composables/useNotifications'

const { success, error, warning, info } = useNotifications()
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl mb-4">Тест уведомлений</h1>
    <div class="flex gap-4">
      <button @click="success('Успех!')" class="px-4 py-2 bg-green-500 text-white rounded">
        Успех
      </button>
      <button @click="error('Ошибка!')" class="px-4 py-2 bg-red-500 text-white rounded">
        Ошибка
      </button>
      <button @click="warning('Предупреждение!')" class="px-4 py-2 bg-yellow-500 text-white rounded">
        Предупреждение
      </button>
      <button @click="info('Информация!')" class="px-4 py-2 bg-blue-500 text-white rounded">
        Информация
      </button>
    </div>
  </div>
</template>
```

Запустите проект:

```bash
npm run dev
```

Откройте `/test` и нажмите кнопки - уведомления должны появиться в правом верхнем углу.

---

## ⚡ Для Vue 3 (Vite)

### Шаг 1: Структура проекта

```
ваш-проект/
├── src/
│   ├── composables/
│   │   └── useNotifications.ts
│   ├── components/
│   │   ├── NotificationToast.vue
│   │   └── NotificationIcons/
│   │       ├── Success.vue
│   │       ├── Error.vue
│   │       ├── Warning.vue
│   │       └── Info.vue
│   └── App.vue
└── package.json
```

### Шаг 2: Копирование файлов

Скопируйте все файлы в соответствующие папки:
- `useNotifications.ts` → `src/composables/`
- `NotificationToast.vue` → `src/components/`
- Папку `NotificationIcons/` со всеми иконками → `src/components/`

**Важно:** В `useNotifications.ts` используются стандартные импорты Vue:

```typescript
import { ref, readonly } from "vue";
```

В `NotificationToast.vue` измените импорт:

```typescript
// Было (для Nuxt):
import { useNotifications, type NotificationType, type Notification } from '~/composables/useNotifications'

// Стало (выберите один вариант):
// Вариант 1: Если используете алиасы (@)
import { useNotifications, type NotificationType, type Notification } from '@/composables/useNotifications'

// Вариант 2: Относительный путь
import { useNotifications, type NotificationType, type Notification } from '../composables/useNotifications'
```

**Примечание:** В `NotificationToast.vue` не нужно импортировать `useNotifications` - компонент получает уведомления через пропсы.

### Шаг 3: Настройка алиасов (опционально)

В `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

В `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Шаг 4: Подключение компонента

В `src/App.vue`:

```vue
<script setup lang="ts">
import { useNotifications } from '@/composables/useNotifications'
import NotificationToast from './components/NotificationToast.vue'

const { notifications, remove } = useNotifications()
</script>

<template>
  <div id="app">
    <!-- Ваш контент -->
    <router-view />
    
    <!-- Компонент уведомлений -->
    <NotificationToast :notifications="notifications" :on-remove="remove" />
  </div>
</template>
```

### Шаг 5: Использование

В любом компоненте:

```vue
<script setup lang="ts">
import { useNotifications } from '@/composables/useNotifications'

const { success } = useNotifications()

const handleClick = () => {
  success('Успешно!')
}
</script>
```

---

## 📦 Для Vue 3 (Webpack)

### Шаг 1: Структура проекта

Аналогично Vue 3 (Vite), но структура может отличаться в зависимости от шаблона.

### Шаг 2: Настройка алиасов

В `vue.config.js`:

```javascript
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
}
```

### Шаг 3: Остальные шаги

Следуйте инструкциям для Vue 3 (Vite), начиная с шага 2.

---

## ✅ Проверка установки

### Тест 1: Базовое использование

```vue
<script setup lang="ts">
import { useNotifications } from '~/composables/useNotifications' // или @/composables/useNotifications

const { success, error, warning, info } = useNotifications()

const testNotifications = () => {
  success('Тест успеха')
  setTimeout(() => error('Тест ошибки'), 500)
  setTimeout(() => warning('Тест предупреждения'), 1000)
  setTimeout(() => info('Тест информации'), 1500)
}
</script>

<template>
  <button @click="testNotifications">Тест уведомлений</button>
</template>
```

### Тест 2: Расширенные возможности

```vue
<script setup lang="ts">
import { useNotifications } from '~/composables/useNotifications'

const { success } = useNotifications()

const testAdvanced = () => {
  success('Уведомление с заголовком', {
    title: 'Заголовок',
    actions: [
      {
        label: 'Действие',
        variant: 'primary',
        action: () => {
          console.log('Действие выполнено')
        }
      }
    ],
    duration: 0
  })
}
</script>

<template>
  <button @click="testAdvanced">Тест расширенных возможностей</button>
</template>
```

---

## 🎨 Стилизация

### ⚠️ Важно: Tailwind CSS не требуется!

Модуль уведомлений **полностью работает без Tailwind CSS**. Все стили реализованы через:

✅ **Кастомные CSS классы**
- `notification-container`, `notification-toast`, `notification-item`
- `notification-content`, `notification-body`, `notification-actions`
- И другие специфичные классы

✅ **CSS переменные** для кастомизации
- `--notification-success-bg-rgb`, `--notification-error-border`
- `--notification-padding`, `--notification-border-radius`
- Полный список в [API Reference](./api.md#css-переменные)

### Кастомизация цветов

Для изменения цветов уведомлений добавьте CSS переменные в ваш глобальный CSS:

```css
:root {
  /* Успех */
  --notification-success-bg-rgb: 20, 83, 45;
  --notification-success-border: #15803d;
  --notification-success-text: #dcfce7;
  --notification-success-icon: #4ade80;
  
  /* Ошибка */
  --notification-error-bg-rgb: 127, 29, 29;
  --notification-error-border: #b91c1c;
  --notification-error-text: #fee2e2;
  --notification-error-icon: #f87171;
  
  /* Предупреждение */
  --notification-warning-bg-rgb: 120, 53, 15;
  --notification-warning-border: #a16207;
  --notification-warning-text: #fef3c7;
  --notification-warning-icon: #facc15;
  
  /* Информация */
  --notification-info-bg-rgb: 30, 58, 138;
  --notification-info-border: #1e40af;
  --notification-info-text: #dbeafe;
  --notification-info-icon: #60a5fa;
}
```

**Больше никаких зависимостей не требуется!**

---

## 🔧 Решение проблем

### Проблема: "Cannot find module '~/composables/useNotifications'"

**Решение для Nuxt 3:**
- Убедитесь, что файл находится в `app/composables/`
- Перезапустите dev сервер

**Решение для Vue 3:**
- Используйте относительный путь: `'../composables/useNotifications'`
- Или настройте алиасы и используйте: `'@/composables/useNotifications'`

### Проблема: Стили не применяются

**Решение:**
1. Модуль работает без Tailwind CSS - зависимости не требуются
2. Проверьте, что CSS переменные определены (если используете кастомизацию цветов)
3. Убедитесь, что нет конфликтов с глобальными стилями
4. Перезапустите dev сервер

### Проблема: Компонент не отображается

**Решение:**
1. Убедитесь, что `<NotificationToast />` добавлен в корневой компонент
2. Проверьте, что переданы обязательные пропсы `notifications` и `on-remove`
3. Проверьте консоль браузера на ошибки
4. Убедитесь, что `z-index` достаточен (по умолчанию 50)

### Проблема: TypeScript ошибки

**Решение:**
1. Убедитесь, что TypeScript правильно настроен
2. Проверьте `tsconfig.json` на наличие правильных путей
3. Перезапустите TypeScript сервер в IDE

### Проблема: "Property 'notifications' does not exist"

**Решение:**
- Убедитесь, что вы используете composable правильно:
  ```typescript
  const { notifications, remove } = useNotifications()
  ```
- Проверьте, что передаете `notifications` и `on-remove` в компонент:
  ```vue
  <NotificationToast :notifications="notifications" :on-remove="remove" />
  ```

---

## 📝 Чек-лист установки

- [ ] Все файлы скопированы в правильные папки
  - [ ] `useNotifications.ts` в `composables/`
  - [ ] `NotificationToast.vue` в `components/`
  - [ ] Папка `NotificationIcons/` с 4 файлами иконок в `components/`
- [ ] Компонент `<NotificationToast />` добавлен в корневой компонент
- [ ] Переданы обязательные пропсы `notifications` и `on-remove`
- [ ] Импорты исправлены (если не используете Nuxt)
- [ ] Тестовые уведомления работают
- [ ] Нет ошибок в консоли
- [ ] ✅ Никаких дополнительных CSS фреймворков не требуется!

---

## 🎯 Следующие шаги

После успешной установки:

1. Прочитайте [полную документацию](./README.md)
2. Изучите [примеры использования](./usage.md)
3. Настройте позицию и стили под ваш проект
4. Интегрируйте в ваши компоненты

---

**Готово!** 🎉 Система уведомлений установлена и готова к использованию.

