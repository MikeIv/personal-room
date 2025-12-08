# 💡 Примеры использования системы уведомлений

Практические примеры для различных сценариев использования системы уведомлений.

## 📋 Содержание

1. [Базовое использование](#базовое-использование)
2. [Расширенные возможности](#расширенные-возможности)
3. [Реальные сценарии](#реальные-сценарии)
4. [Интеграция с библиотеками](#интеграция-с-библиотеками)

---

## Базовое использование

### Простые уведомления

```typescript
import { useNotifications } from '~/composables/useNotifications'

const { success, error, warning, info } = useNotifications()

// Простые уведомления
success('Операция выполнена успешно!')
error('Произошла ошибка')
warning('Внимание!')
info('Полезная информация')
```

### Уведомления с кастомной длительностью

```typescript
const { success, error } = useNotifications()

// Исчезнет через 3 секунды
success('Сообщение', 3000)

// Не исчезнет автоматически
error('Критическая ошибка', 0)

// Используя объект опций
success('Сообщение', { duration: 3000 })
error('Критическая ошибка', { duration: 0 })
```

---

## Расширенные возможности

### Уведомления с заголовком

```typescript
const { success } = useNotifications()

success('Данные успешно сохранены', {
  title: 'Сохранение завершено',
  duration: 5000
})
```

### Уведомления с действиями

```typescript
const { error } = useNotifications()

error('Не удалось загрузить данные', {
  title: 'Ошибка загрузки',
  actions: [
    {
      label: 'Повторить',
      variant: 'primary',
      action: async () => {
        await retryLoad()
      }
    },
    {
      label: 'Отмена',
      variant: 'secondary',
      action: () => {
        console.log('Отменено')
      }
    }
  ],
  duration: 0 // не закрывать автоматически при наличии действий
})
```

### Постоянные уведомления

```typescript
const { warning } = useNotifications()

warning('Важное предупреждение', {
  persistent: true, // не закрывается при клике
  duration: 0 // не исчезает автоматически
})
```

### HTML контент (используйте с осторожностью)

```typescript
const { info } = useNotifications()

info('<strong>Важно:</strong> Проверьте настройки', {
  html: true,
  duration: 5000
})
```

### Кастомные стили

```typescript
const { info } = useNotifications()

info('Кастомное уведомление', {
  customClass: 'my-custom-class',
  duration: 5000
})
```

```css
/* В вашем CSS */
.my-custom-class {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

---

## Реальные сценарии

### Обработка ошибок API

```typescript
import { useNotifications } from '~/composables/useNotifications'

const { error, success } = useNotifications()

const saveData = async () => {
  try {
    await api.save(data)
    success('Данные сохранены')
  } catch (err) {
    error('Не удалось сохранить данные', {
      title: 'Ошибка сохранения',
      actions: [
        {
          label: 'Повторить',
          variant: 'primary',
          action: async () => {
            await saveData()
          }
        }
      ],
      duration: 0
    })
  }
}
```

### Уведомление о синхронизации

```typescript
const { info, success, error, remove } = useNotifications()

const syncData = async () => {
  const notificationId = info('Синхронизация данных...', { duration: 0 })
  
  try {
    await sync()
    remove(notificationId)
    success('Данные синхронизированы')
  } catch (err) {
    remove(notificationId)
    error('Ошибка синхронизации')
  }
}
```

### Подтверждение действий

```typescript
const { warning, success } = useNotifications()

const deleteItem = (id: string) => {
  warning('Вы уверены, что хотите удалить этот элемент?', {
    title: 'Подтверждение удаления',
    actions: [
      {
        label: 'Удалить',
        variant: 'primary',
        action: async () => {
          await api.delete(id)
          success('Элемент удален')
        }
      },
      {
        label: 'Отмена',
        variant: 'secondary',
        action: () => {}
      }
    ],
    duration: 0
  })
}
```

### Прогресс операции с обновлением

```typescript
const { info, success, error, remove } = useNotifications()

const uploadFile = async (file: File) => {
  const notificationId = info('Загрузка файла...', { duration: 0 })
  
  try {
    // Симуляция загрузки с прогрессом
    const formData = new FormData()
    formData.append('file', file)
    
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        // Обновляем уведомление (удаляем старое и создаем новое)
        remove(notificationId)
        const newId = info(`Загрузка файла... ${percent}%`, { duration: 0 })
        // Сохраняем ID для следующего обновления
        // В реальном сценарии используйте ref для хранения ID
      }
    })
    
    remove(notificationId)
    success('Файл успешно загружен')
  } catch (err) {
    remove(notificationId)
    error('Ошибка загрузки файла')
  }
}
```

### Валидация формы

```typescript
const { error, success } = useNotifications()

const validateAndSubmit = async (formData: FormData) => {
  // Валидация
  if (!formData.email) {
    error('Email обязателен для заполнения', {
      title: 'Ошибка валидации',
      duration: 3000
    })
    return
  }
  
  if (!formData.email.includes('@')) {
    error('Некорректный формат email', {
      title: 'Ошибка валидации',
      duration: 3000
    })
    return
  }
  
  // Отправка
  try {
    await api.submit(formData)
    success('Форма успешно отправлена')
  } catch (err) {
    error('Ошибка при отправке формы', {
      title: 'Ошибка отправки',
      actions: [
        {
          label: 'Повторить',
          variant: 'primary',
          action: () => validateAndSubmit(formData)
        }
      ],
      duration: 0
    })
  }
}
```

### Уведомление о подключении/отключении

```typescript
const { info, warning } = useNotifications()

// При подключении к сети
window.addEventListener('online', () => {
  info('Подключение к интернету восстановлено', {
    duration: 3000
  })
})

// При отключении от сети
window.addEventListener('offline', () => {
  warning('Нет подключения к интернету', {
    title: 'Офлайн режим',
    persistent: true,
    duration: 0
  })
})
```

---

## Интеграция с библиотеками

### Vue Router

```typescript
import { useRouter } from 'vue-router'
import { useNotifications } from '~/composables/useNotifications'

const router = useRouter()
const { error } = useNotifications()

router.beforeEach((to, from, next) => {
  if (!isAuthenticated && to.meta.requiresAuth) {
    error('Требуется авторизация', {
      actions: [
        {
          label: 'Войти',
          variant: 'primary',
          action: () => router.push('/login')
        }
      ],
      duration: 0
    })
    next(false)
  } else {
    next()
  }
})
```

### Pinia Store

```typescript
import { defineStore } from 'pinia'
import { useNotifications } from '~/composables/useNotifications'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  
  actions: {
    async login(credentials) {
      const { success, error } = useNotifications()
      try {
        const response = await api.login(credentials)
        this.user = response.user
        success('Вход выполнен успешно')
      } catch (err) {
        error('Ошибка входа', {
          title: 'Ошибка авторизации',
          duration: 5000
        })
        throw err
      }
    },
    
    async logout() {
      const { success } = useNotifications()
      try {
        await api.logout()
        this.user = null
        success('Выход выполнен')
      } catch (err) {
        console.error('Ошибка выхода:', err)
      }
    }
  }
})
```

### Axios Interceptors

```typescript
import axios from 'axios'
import { useNotifications } from '~/composables/useNotifications'

const { error } = useNotifications()

// Перехватчик ответов
axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response) {
      const status = err.response.status
      
      if (status === 401) {
        error('Сессия истекла. Пожалуйста, войдите снова', {
          title: 'Ошибка авторизации',
          duration: 0
        })
      } else if (status === 403) {
        error('Недостаточно прав для выполнения этого действия', {
          title: 'Доступ запрещен',
          duration: 5000
        })
      } else if (status >= 500) {
        error('Ошибка сервера. Попробуйте позже', {
          title: 'Ошибка сервера',
          duration: 0
        })
      } else {
        error(err.response.data.message || 'Произошла ошибка', {
          title: 'Ошибка',
          duration: 5000
        })
      }
    } else {
      error('Нет подключения к серверу', {
        title: 'Ошибка сети',
        duration: 0
      })
    }
    
    return Promise.reject(err)
  }
)
```

### Composition API с реактивностью

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNotifications } from '~/composables/useNotifications'

const { success, error } = useNotifications()
const isLoading = ref(false)
const data = ref(null)

const fetchData = async () => {
  isLoading.value = true
  try {
    const response = await api.getData()
    data.value = response.data
    success('Данные загружены')
  } catch (err) {
    error('Ошибка загрузки данных')
  } finally {
    isLoading.value = false
  }
}

// Автоматическая загрузка при изменении параметров
watch(() => someParam, () => {
  fetchData()
}, { immediate: true })
</script>
```

---

## 💡 Советы и лучшие практики

### 1. Используйте правильные типы уведомлений

- `success` - для успешных операций
- `error` - для ошибок и критичных проблем
- `warning` - для предупреждений и подтверждений
- `info` - для общей информации

### 2. Настройте длительность в зависимости от важности

- Критичные ошибки: `duration: 0` (не закрывать автоматически)
- Важные уведомления: `duration: 5000` (5 секунд)
- Информационные: `duration: 3000` (3 секунды)

### 3. Используйте заголовки для важных уведомлений

```typescript
error('Не удалось сохранить данные', {
  title: 'Ошибка сохранения', // Помогает пользователю быстро понять суть проблемы
  duration: 0
})
```

### 4. Предоставляйте действия для исправления ошибок

```typescript
error('Не удалось загрузить данные', {
  title: 'Ошибка загрузки',
  actions: [
    {
      label: 'Повторить',
      variant: 'primary',
      action: async () => {
        await retryLoad()
      }
    }
  ],
  duration: 0
})
```

### 5. Избегайте HTML контента, если возможно

Используйте `html: true` только когда действительно необходимо. Предпочитайте простой текст для лучшей доступности.

### 6. Не злоупотребляйте уведомлениями

Не показывайте уведомления для каждой мелкой операции. Используйте их для важных событий и ошибок.

---

**Готово!** Теперь вы знаете, как использовать систему уведомлений в различных сценариях. Для более подробной информации смотрите [полную документацию](./README.md).

