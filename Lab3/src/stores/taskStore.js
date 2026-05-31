import { defineStore } from 'pinia'

const STORAGE_KEY = 'vue-task-manager-tasks'

const defaultTasks = [
  {
    id: 1,
    title: 'Підготувати презентацію до захисту',
    description: 'Підготувати слайди для захисту лабораторної роботи №3.',
    category: 'Робота',
    priority: 'Високий',
    deadline: '2026-04-10',
    completed: false,
    createdAt: '2026-04-05'
  },
  {
    id: 2,
    title: 'Прочитати документацію Vue Router',
    description: 'Повторити маршрути, RouterLink, RouterView та useRoute.',
    category: 'Навчання',
    priority: 'Середній',
    deadline: '2026-04-15',
    completed: true,
    createdAt: '2026-04-06'
  },
  {
    id: 3,
    title: 'Написати unit-тести для store',
    description: 'Перевірити actions та getters Pinia-сховища.',
    category: 'Робота',
    priority: 'Низький',
    deadline: '2026-04-20',
    completed: false,
    createdAt: '2026-04-07'
  }
]

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return defaultTasks
  }

  try {
    return JSON.parse(saved)
  } catch {
    return defaultTasks
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function todayString() {
  return new Date().toISOString().split('T')[0]
}

function isDeadlineOverdue(task) {
  return !task.completed && task.deadline < todayString()
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: loadTasks()
  }),

  getters: {
    activeTasks: (state) => {
      return state.tasks.filter((task) => !task.completed)
    },

    completedTasks: (state) => {
      return state.tasks.filter((task) => task.completed)
    },

    overdueTasks: (state) => {
      return state.tasks.filter((task) => isDeadlineOverdue(task))
    },

    tasksByCategory: (state) => {
      return state.tasks.reduce((result, task) => {
        result[task.category] = (result[task.category] || 0) + 1
        return result
      }, {})
    },

    upcomingDeadlines: (state) => {
      const today = new Date(todayString())
      const maxDate = new Date(today)
      maxDate.setDate(today.getDate() + 3)

      return state.tasks
        .filter((task) => {
          const deadline = new Date(task.deadline)
          return !task.completed && deadline >= today && deadline <= maxDate
        })
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    },

    totalTasks: (state) => {
      return state.tasks.length
    },

    completedPercent: (state) => {
      if (state.tasks.length === 0) {
        return 0
      }

      const completed = state.tasks.filter((task) => task.completed).length
      return Math.round((completed / state.tasks.length) * 100)
    },

    categories: (state) => {
      return [...new Set(state.tasks.map((task) => task.category))]
    },

    stats: (state) => {
      const completed = state.tasks.filter((task) => task.completed)
      const active = state.tasks.filter((task) => !task.completed)
      const overdue = state.tasks.filter((task) => isDeadlineOverdue(task))

      return {
        total: state.tasks.length,
        active: active.length,
        completed: completed.length,
        overdue: overdue.length
      }
    }
  },

  actions: {
    persist() {
      saveTasks(this.tasks)
    },

    getTaskById(id) {
      return this.tasks.find((task) => task.id === Number(id))
    },

    addTask(taskData) {
      const newTask = {
        id: Date.now(),
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        priority: taskData.priority,
        deadline: taskData.deadline,
        completed: taskData.completed,
        createdAt: todayString()
      }

      this.tasks.push(newTask)
      this.persist()

      return newTask.id
    },

    updateTask(id, updatedData) {
      const index = this.tasks.findIndex((task) => task.id === Number(id))

      if (index === -1) {
        return false
      }

      this.tasks[index] = {
        ...this.tasks[index],
        ...updatedData
      }

      this.persist()
      return true
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== Number(id))
      this.persist()
    },

    toggleTaskStatus(id) {
      const task = this.getTaskById(id)

      if (task) {
        task.completed = !task.completed
        this.persist()
      }
    }
  }
})