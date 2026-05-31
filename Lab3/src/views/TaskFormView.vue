<script setup>
import { computed, reactive } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const isEditMode = computed(() => Boolean(route.params.id))
const existingTask = computed(() => taskStore.getTaskById(route.params.id))

const form = reactive({
  title: existingTask.value?.title || '',
  description: existingTask.value?.description || '',
  category: existingTask.value?.category || 'Навчання',
  priority: existingTask.value?.priority || 'Середній',
  deadline: existingTask.value?.deadline || '',
  completed: existingTask.value?.completed || false
})

const errors = reactive({
  title: '',
  deadline: ''
})

const validateForm = () => {
  errors.title = ''
  errors.deadline = ''

  if (!form.title.trim()) {
    errors.title = 'Назва задачі є обовʼязковою'
  }

  if (!form.deadline) {
    errors.deadline = 'Дедлайн є обовʼязковим'
  }

  const today = new Date().toISOString().split('T')[0]

  if (!isEditMode.value && form.deadline && form.deadline < today) {
    errors.deadline = 'При створенні дедлайн не може бути у минулому'
  }

  return !errors.title && !errors.deadline
}

const submitForm = () => {
  if (!validateForm()) {
    return
  }

  if (isEditMode.value) {
    taskStore.updateTask(route.params.id, { ...form })
    router.push(`/tasks/${route.params.id}`)
  } else {
    const newId = taskStore.addTask({ ...form })
    router.push(`/tasks/${newId}`)
  }
}
</script>

<template>
  <section v-if="!isEditMode || existingTask">
    <RouterLink
        :to="isEditMode ? `/tasks/${route.params.id}` : '/'"
        class="back-link"
    >
      ← Назад
    </RouterLink>

    <h1>{{ isEditMode ? 'Редагування задачі' : 'Створення задачі' }}</h1>

    <form class="panel form" @submit.prevent="submitForm">
      <label>
        Назва задачі
        <input v-model="form.title" type="text" placeholder="Введіть назву задачі" />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </label>

      <label>
        Опис
        <textarea
            v-model="form.description"
            rows="5"
            placeholder="Короткий опис задачі"
        ></textarea>
      </label>

      <div class="form-grid">
        <label>
          Категорія
          <select v-model="form.category">
            <option>Навчання</option>
            <option>Робота</option>
            <option>Особисте</option>
            <option>Інше</option>
          </select>
        </label>

        <label>
          Пріоритет
          <select v-model="form.priority">
            <option>Високий</option>
            <option>Середній</option>
            <option>Низький</option>
          </select>
        </label>

        <label>
          Дедлайн
          <input v-model="form.deadline" type="date" />
          <span v-if="errors.deadline" class="error">{{ errors.deadline }}</span>
        </label>

        <label>
          Статус
          <select v-model="form.completed">
            <option :value="false">Активна</option>
            <option :value="true">Виконана</option>
          </select>
        </label>
      </div>

      <div class="form-actions">
        <RouterLink
            :to="isEditMode ? `/tasks/${route.params.id}` : '/'"
            class="button secondary"
        >
          Скасувати
        </RouterLink>

        <button class="button primary" type="submit">
          {{ isEditMode ? 'Зберегти зміни' : 'Створити задачу' }}
        </button>
      </div>
    </form>
  </section>

  <section v-else class="panel empty">
    <h1>Задачу для редагування не знайдено</h1>
    <RouterLink to="/" class="button primary">До списку задач</RouterLink>
  </section>
</template>