<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPriority = ref('')
const sortType = ref('deadline')

const priorities = ['Високий', 'Середній', 'Низький']

const priorityWeight = {
  Високий: 1,
  Середній: 2,
  Низький: 3
}

const filteredTasks = computed(() => {
  let result = [...taskStore.tasks]

  if (searchQuery.value.trim()) {
    result = result.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    result = result.filter((task) => task.category === selectedCategory.value)
  }

  if (selectedPriority.value) {
    result = result.filter((task) => task.priority === selectedPriority.value)
  }

  if (sortType.value === 'deadline') {
    result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  }

  if (sortType.value === 'priority') {
    result.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority])
  }

  return result
})

const isOverdue = (task) => {
  const today = new Date().toISOString().split('T')[0]
  return !task.completed && task.deadline < today
}
</script>

<template>
  <section>
    <div class="page-title-row">
      <div>
        <h1>Список задач</h1>
        <p class="muted">Керуйте задачами, категоріями, пріоритетами та дедлайнами.</p>
      </div>

      <RouterLink to="/tasks/new" class="button primary">+ Додати задачу</RouterLink>
    </div>

    <div class="panel filters">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Пошук за назвою..."
      />

      <select v-model="selectedCategory">
        <option value="">Усі категорії</option>
        <option
            v-for="category in taskStore.categories"
            :key="category"
            :value="category"
        >
          {{ category }}
        </option>
      </select>

      <select v-model="selectedPriority">
        <option value="">Усі пріоритети</option>
        <option
            v-for="priority in priorities"
            :key="priority"
            :value="priority"
        >
          {{ priority }}
        </option>
      </select>

      <select v-model="sortType">
        <option value="deadline">Сортування: дедлайн</option>
        <option value="priority">Сортування: пріоритет</option>
      </select>
    </div>

    <div v-if="filteredTasks.length" class="task-list">
      <article
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-card"
          :class="{ completed: task.completed, overdue: isOverdue(task) }"
      >
        <button
            class="status-button"
            :class="{ done: task.completed }"
            @click="taskStore.toggleTaskStatus(task.id)"
            title="Змінити статус"
        ></button>

        <div class="task-content">
          <h2>{{ task.title }}</h2>

          <div class="badges">
            <span class="badge category">{{ task.category }}</span>
            <span class="badge" :class="task.priority.toLowerCase()">
              {{ task.priority }}
            </span>
            <span class="deadline" :class="{ danger: isOverdue(task) }">
              до {{ task.deadline }}
            </span>
          </div>
        </div>

        <div class="task-actions">
          <RouterLink :to="`/tasks/${task.id}/edit`" class="icon-button">✎</RouterLink>
          <RouterLink :to="`/tasks/${task.id}`" class="icon-button">👁</RouterLink>
          <button class="icon-button danger" @click="taskStore.deleteTask(task.id)">×</button>
        </div>
      </article>
    </div>

    <div v-else class="empty panel">
      <h2>Задач не знайдено</h2>
      <p>Спробуйте змінити фільтри або створити нову задачу.</p>
    </div>
  </section>
</template>