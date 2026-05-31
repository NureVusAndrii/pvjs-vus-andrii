<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const task = computed(() => taskStore.getTaskById(route.params.id))

const deleteTask = () => {
  if (confirm('Ви справді хочете видалити цю задачу?')) {
    taskStore.deleteTask(route.params.id)
    router.push('/')
  }
}

const isOverdue = computed(() => {
  if (!task.value) {
    return false
  }

  const today = new Date().toISOString().split('T')[0]
  return !task.value.completed && task.value.deadline < today
})
</script>

<template>
  <section v-if="task">
    <RouterLink to="/" class="back-link">← Назад до списку</RouterLink>

    <div class="page-title-row">
      <div>
        <h1>{{ task.title }}</h1>

        <div class="badges">
          <span class="badge category">{{ task.category }}</span>
          <span class="badge">{{ task.priority }} пріоритет</span>
          <span v-if="isOverdue" class="deadline danger">Прострочено</span>
        </div>
      </div>
    </div>

    <div class="detail-grid">
      <div class="panel">
        <p class="label">Статус</p>
        <p>{{ task.completed ? 'Виконана' : 'Активна' }}</p>
      </div>

      <div class="panel">
        <p class="label">Категорія</p>
        <p>{{ task.category }}</p>
      </div>

      <div class="panel">
        <p class="label">Дата створення</p>
        <p>{{ task.createdAt }}</p>
      </div>

      <div class="panel">
        <p class="label">Дедлайн</p>
        <p :class="{ danger: isOverdue }">{{ task.deadline }}</p>
      </div>
    </div>

    <div class="panel description">
      <p class="label">Опис</p>
      <p>{{ task.description || 'Опис відсутній.' }}</p>
    </div>

    <div class="form-actions left">
      <RouterLink :to="`/tasks/${task.id}/edit`" class="button primary">✎ Редагувати</RouterLink>
      <button class="button danger" @click="deleteTask">× Видалити</button>
    </div>
  </section>

  <section v-else class="panel empty">
    <h1>Задачу не знайдено</h1>
    <p>Можливо, вона була видалена або має неправильний id.</p>
    <RouterLink to="/" class="button primary">Повернутися до списку</RouterLink>
  </section>
</template>