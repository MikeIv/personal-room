# 📘 API Reference - Система уведомлений

Полная документация API для системы уведомлений.

## 📋 Содержание

1. [useNotifications()](#usenotifications)
2. [NotificationOptions](#notificationoptions)
3. [NotificationAction](#notificationaction)
4. [Notification](#notification)
5. [NotificationToast Props](#notificationtoast-props)
6. [CustomIcon](#customicon)
7. [NotificationType](#notificationtype)

---

## useNotifications()

Composable для управления уведомлениями.

### Возвращаемое значение

```typescript
{
  notifications: Readonly<Ref<Notification[]>>
  show: (message: string, type: NotificationType, options?: NotificationOptions | number) => string
  success: (message: string, options?: NotificationOptions | number) => string
  error: (message: string, options?: NotificationOptions | number) => string
  warning: (message: string, options?: NotificationOptions | number) => string
  info: (message: string, options?: NotificationOptions | number) => string
  remove: (id: string) => void
  clear: () => void
}
```

### Оптимизации (версия 2.1.0)

- **Использует `readonly()`** - более эффективное предоставление доступа только для чтения к массиву уведомлений
- **Функция `normalizeOptions()`** - единая функция для обработки опций, устраняет дублирование кода
- **Оптимизированные методы** - однострочные стрелочные функции для методов типов уведомлений
- **Правильная очистка таймеров** - все таймеры корректно очищаются при удалении уведомлений
- **Ограничение количества уведомлений** - по умолчанию 5, автоматически удаляется самое старое

### Методы

#### `show(message, type, options?)`

Показывает уведомление с указанным типом.

**Параметры:**
- `message: string` - Текст сообщения
- `type: NotificationType` - Тип уведомления (`'success' | 'error' | 'warning' | 'info'`)
- `options?: NotificationOptions | number` - Опции уведомления или длительность в миллисекундах (для обратной совместимости)

**Возвращает:** `string` - ID уведомления

**Пример:**
```typescript
const { show } = useNotifications()
const id = show('Сообщение', 'success', { duration: 3000 })
```

#### `success(message, options?)`

Показывает уведомление об успехе.

**Параметры:**
- `message: string` - Текст сообщения
- `options?: NotificationOptions | number` - Опции уведомления или длительность в миллисекундах

**Возвращает:** `string` - ID уведомления

**Пример:**
```typescript
const { success } = useNotifications()
success('Операция выполнена успешно!')
success('Операция выполнена успешно!', { duration: 3000 })
success('Операция выполнена успешно!', 3000) // обратная совместимость
```

#### `error(message, options?)`

Показывает уведомление об ошибке.

**Параметры:**
- `message: string` - Текст сообщения
- `options?: NotificationOptions | number` - Опции уведомления или длительность в миллисекундах

**Возвращает:** `string` - ID уведомления

**Пример:**
```typescript
const { error } = useNotifications()
error('Произошла ошибка', { duration: 0 })
```

#### `warning(message, options?)`

Показывает предупреждение.

**Параметры:**
- `message: string` - Текст сообщения
- `options?: NotificationOptions | number` - Опции уведомления или длительность в миллисекундах

**Возвращает:** `string` - ID уведомления

**Пример:**
```typescript
const { warning } = useNotifications()
warning('Внимание!', { title: 'Предупреждение' })
```

#### `info(message, options?)`

Показывает информационное уведомление.

**Параметры:**
- `message: string` - Текст сообщения
- `options?: NotificationOptions | number` - Опции уведомления или длительность в миллисекундах

**Возвращает:** `string` - ID уведомления

**Пример:**
```typescript
const { info } = useNotifications()
info('Полезная информация')
```

#### `remove(id)`

Удаляет уведомление по ID.

**Параметры:**
- `id: string` - ID уведомления для удаления

**Возвращает:** `void`

**Пример:**
```typescript
const { info, remove } = useNotifications()
const id = info('Сообщение', { duration: 0 })
// Позже
remove(id)
```

#### `clear()`

Очищает все уведомления.

**Возвращает:** `void`

**Пример:**
```typescript
const { clear } = useNotifications()
clear()
```

### Реактивные свойства

#### `notifications`

Readonly свойство с массивом всех активных уведомлений. Оптимизировано с использованием `readonly()` для лучшей производительности по сравнению с `computed()`.

**Тип:** `Readonly<Ref<Notification[]>>`

**Пример:**
```typescript
const { notifications } = useNotifications()
// Использование в шаблоне
// <NotificationToast :notifications="notifications" :on-remove="remove" />
```

**Примечание:** `readonly()` предоставляет доступ только для чтения без накладных расходов `computed()`, что делает его более эффективным для простых геттеров.

---

## NotificationOptions

Интерфейс для настройки уведомления.

```typescript
interface NotificationOptions {
  /** Тип уведомления */
  type?: NotificationType
  
  /** Длительность отображения в миллисекундах (0 = не удалять автоматически) */
  duration?: number
  
  /** Заголовок уведомления */
  title?: string
  
  /** Дополнительные действия (кнопки) */
  actions?: NotificationAction[]
  
  /** HTML контент вместо текста (используйте с осторожностью) */
  html?: boolean
  
  /** Не закрывать при клике на уведомление */
  persistent?: boolean
  
  /** Кастомный CSS класс */
  customClass?: string
}
```

### Свойства

| Свойство | Тип | Описание |
|----------|-----|----------|
| `type` | `NotificationType?` | Тип уведомления (обычно определяется методом) |
| `duration` | `number?` | Длительность отображения в миллисекундах. `0` = не удалять автоматически. По умолчанию: `5000` |
| `title` | `string?` | Заголовок уведомления |
| `actions` | `NotificationAction[]?` | Массив действий (кнопок) |
| `html` | `boolean?` | Разрешить HTML в сообщении (по умолчанию `false`) |
| `persistent` | `boolean?` | Не закрывать при клике на уведомление (по умолчанию `false`) |
| `customClass` | `string?` | Кастомный CSS класс для уведомления |

---

## NotificationAction

Интерфейс для действий в уведомлении.

```typescript
interface NotificationAction {
  /** Текст кнопки */
  label: string
  
  /** Функция-обработчик (может быть async) */
  action: () => void | Promise<void>
  
  /** Стиль кнопки */
  variant?: 'primary' | 'secondary'
}
```

### Свойства

| Свойство | Тип | Описание |
|----------|-----|----------|
| `label` | `string` | Текст кнопки (обязательно) |
| `action` | `() => void \| Promise<void>` | Функция-обработчик, выполняется при клике (обязательно) |
| `variant` | `'primary' \| 'secondary'?` | Стиль кнопки (по умолчанию `'secondary'`) |

**Пример:**
```typescript
{
  label: 'Повторить',
  variant: 'primary',
  action: async () => {
    await retryOperation()
  }
}
```

---

## Notification

Интерфейс уведомления (расширяет `NotificationOptions`).

```typescript
interface Notification extends NotificationOptions {
  id: string
  message: string
  type: NotificationType
  duration: number
  createdAt: number
}
```

### Свойства

| Свойство | Тип | Описание |
|----------|-----|----------|
| `id` | `string` | Уникальный идентификатор уведомления |
| `message` | `string` | Текст сообщения |
| `type` | `NotificationType` | Тип уведомления |
| `duration` | `number` | Длительность отображения |
| `createdAt` | `number` | Время создания (timestamp) |

Все свойства из `NotificationOptions` также доступны.

---

## NotificationToast Props

Пропсы компонента `NotificationToast`.

```typescript
interface NotificationToastProps {
  notifications: Notification[]
  onRemove: (id: string) => void
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxWidth?: string
  minWidth?: string
  zIndex?: number
  teleportTo?: string | HTMLElement
  customIcons?: Partial<Record<NotificationType, CustomIcon>>
  containerAriaLabel?: string
  closeButtonAriaLabel?: string
}
```

### Свойства

| Prop | Тип | По умолчанию | Обязательно | Описание |
|------|-----|--------------|-------------|----------|
| `notifications` | `Notification[]` | - | ✅ Да | Массив уведомлений для отображения |
| `onRemove` | `(id: string) => void` | - | ✅ Да | Функция для удаления уведомления по ID |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'top-right'` | ❌ Нет | Позиция контейнера уведомлений |
| `maxWidth` | `string` | `'500px'` | ❌ Нет | Максимальная ширина уведомления |
| `minWidth` | `string` | `'300px'` | ❌ Нет | Минимальная ширина уведомления |
| `zIndex` | `number` | `50` | ❌ Нет | Z-index контейнера |
| `teleportTo` | `string \| HTMLElement` | `'body'` | ❌ Нет | Целевой элемент для Teleport |
| `customIcons` | `Partial<Record<NotificationType, CustomIcon>>` | `undefined` | ❌ Нет | Кастомные иконки для типов уведомлений |
| `containerAriaLabel` | `string` | `'Уведомления'` | ❌ Нет | Текст для aria-label контейнера |
| `closeButtonAriaLabel` | `string` | `'Закрыть уведомление'` | ❌ Нет | Текст для aria-label кнопки закрытия |

**Пример:**
```vue
<NotificationToast 
  :notifications="notifications"
  :on-remove="remove"
  position="top-center"
  max-width="600px"
  :z-index="100"
/>
```

### Оптимизации компонента (версия 2.1.0)

- **Асинхронная загрузка иконок** - использование `defineAsyncComponent()` для ленивой загрузки SVG компонентов
- **Компонентная архитектура иконок** - SVG иконки вынесены в отдельные Vue компоненты (`NotificationIcons/`)
- **Мемоизация классов** - классы типов уведомлений и иконок хранятся в константах для быстрого доступа
- **Уменьшение размера бандла** - иконки загружаются только при необходимости
- **Упрощенная логика** - убрана избыточная функция `getIconSize()`, логика встроена напрямую в шаблон

---

## CustomIcon

Интерфейс для кастомной иконки.

```typescript
interface CustomIcon {
  /** Компонент иконки (Vue компонент или render function) */
  component: Component
  
  /** Размер иконки (по умолчанию используется --notification-icon-size) */
  size?: string
}
```

### Свойства

| Свойство | Тип | Описание |
|----------|-----|----------|
| `component` | `Component` | Vue компонент или render function для иконки (обязательно) |
| `size` | `string?` | Размер иконки (например, `'24px'`, `'1.5rem'`) |

**Пример:**
```typescript
import { h } from 'vue'
import MyIcon from './MyIcon.vue'

const customIcons = {
  success: {
    component: MyIcon,
    size: '24px'
  },
  error: {
    component: () => h('svg', { /* ... */ }, [/* ... */]),
    size: '20px'
  }
}
```

---

## NotificationType

Тип уведомления.

```typescript
type NotificationType = 'success' | 'error' | 'warning' | 'info'
```

### Значения

| Значение | Описание | Использование |
|----------|----------|---------------|
| `'success'` | Успешная операция | Сохранение данных, успешные действия |
| `'error'` | Ошибка | Ошибки API, валидации, критичные проблемы |
| `'warning'` | Предупреждение | Предупреждения, подтверждения |
| `'info'` | Информация | Общая информация, подсказки |

---

## CSS Переменные

Компонент использует CSS переменные для кастомизации. Полный список доступных переменных:

### Цвета для типов уведомлений

```css
/* Success */
--notification-success-bg-rgb: 20, 83, 45;
--notification-success-border: #15803d;
--notification-success-text: #dcfce7;
--notification-success-icon: #4ade80;

/* Error */
--notification-error-bg-rgb: 127, 29, 29;
--notification-error-border: #b91c1c;
--notification-error-text: #fee2e2;
--notification-error-icon: #f87171;

/* Warning */
--notification-warning-bg-rgb: 120, 53, 15;
--notification-warning-border: #a16207;
--notification-warning-text: #fef3c7;
--notification-warning-icon: #facc15;

/* Info */
--notification-info-bg-rgb: 30, 58, 138;
--notification-info-border: #1e40af;
--notification-info-text: #dbeafe;
--notification-info-icon: #60a5fa;
```

### Общие настройки

```css
--notification-padding: 1rem;
--notification-border-radius: 0.5rem;
--notification-gap: 0.5rem;
--notification-icon-size: 1.25rem;
--notification-z-index: 50;
--notification-offset: 1rem;
--notification-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
```

### Дополнительные переменные

```css
--notification-content-gap: 0.75rem;
--notification-icon-margin-top: 0.125rem;
--notification-title-font-size: 0.875rem;
--notification-title-font-weight: 600;
--notification-title-margin-bottom: 0.25rem;
--notification-message-font-size: 0.875rem;
--notification-message-font-weight: 500;
--notification-actions-gap: 0.5rem;
--notification-actions-margin-top: 0.75rem;
--notification-action-padding-y: 0.375rem;
--notification-action-padding-x: 0.75rem;
--notification-action-font-size: 0.75rem;
--notification-action-font-weight: 500;
--notification-action-border-radius: 0.25rem;
--notification-action-primary-bg: rgba(255, 255, 255, 0.2);
--notification-action-primary-text: #ffffff;
--notification-action-primary-bg-hover: rgba(255, 255, 255, 0.3);
--notification-action-secondary-bg: rgba(255, 255, 255, 0.1);
--notification-action-secondary-text: rgba(255, 255, 255, 0.9);
--notification-action-secondary-bg-hover: rgba(255, 255, 255, 0.2);
--notification-close-color: rgba(156, 163, 175, 1);
--notification-close-color-hover: #ffffff;
--notification-close-border-radius: 0.25rem;
--notification-close-icon-size: 1.25rem;
--notification-close-focus-ring: rgba(255, 255, 255, 0.5);
```

---

## Конфигурация по умолчанию

```typescript
const defaultConfig = {
  defaultDuration: 5000,      // 5 секунд
  maxNotifications: 5          // Максимальное количество уведомлений
} as const
```

---

---

## 📦 Структура файлов

```
components/
├── NotificationToast.vue          # Основной компонент
└── NotificationIcons/             # Папка с иконками
    ├── Success.vue                # Иконка успеха (асинхронная загрузка)
    ├── Error.vue                  # Иконка ошибки (асинхронная загрузка)
    ├── Warning.vue                # Иконка предупреждения (асинхронная загрузка)
    └── Info.vue                   # Иконка информации (асинхронная загрузка)

composables/
└── useNotifications.ts            # Composable для управления уведомлениями
```

---

**Версия:** 2.1.0  
**Последнее обновление:** Декабрь 2024

---

**Готово!** Теперь вы знаете все детали API системы уведомлений. Для примеров использования смотрите [примеры использования](./usage.md).

