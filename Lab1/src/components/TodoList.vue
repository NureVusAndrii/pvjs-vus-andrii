<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import TodoItem from './TodoItem.vue'

const tasks = ref([])
const newTask = ref('')
const filter = ref('all')

onMounted(() => {
  const saved = localStorage.getItem('todos')
  if (saved) tasks.value = JSON.parse(saved)
})

watch(tasks, (val) => localStorage.setItem('todos', JSON.stringify(val)), { deep: true })

const addTask = () => {
  const trimmedTask = newTask.value.trim()

  if (!trimmedTask) return

  const isDuplicate = tasks.value.some(
      (task) => task.text.toLowerCase() === trimmedTask.toLowerCase()
  )

  if (isDuplicate) {
    alert('Така задача вже існує у вашому списку!')
    return
  }

  tasks.value.push({
    id: Date.now(),
    text: trimmedTask,
    completed: false
  })

  newTask.value = ''
}

const filteredTasks = computed(() => {
  if (filter.value === 'active') return tasks.value.filter(t => !t.completed)
  if (filter.value === 'completed') return tasks.value.filter(t => t.completed)
  return tasks.value
})

const updateTask = (updated) => {
  const i = tasks.value.findIndex(t => t.id === updated.id)
  tasks.value[i] = updated
}

const removeTask = (id) => tasks.value = tasks.value.filter(t => t.id !== id)
</script>

<template>
  <div class="input-section">
    <input v-model="newTask" @keyup.enter="addTask" class="main-input" placeholder="Що потрібно зробити?" />
    <button @click="addTask" class="icon-btn add-btn">+</button>
  </div>

  <div class="filter-bar">
    <button v-for="f in ['all', 'active', 'completed']" :key="f"
            @click="filter = f" :class="{ active: filter === f }"
            class="filter-btn">
      {{ f === 'all' ? 'Усі' : f === 'active' ? 'Активні' : 'Виконані' }}
    </button>
  </div>

  <ul class="task-list-container">
    <TodoItem v-for="task in filteredTasks" :key="task.id" :task="task" @remove="removeTask" @update="updateTask" />
  </ul>
</template>