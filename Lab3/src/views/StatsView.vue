<script setup>
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <section>
    <h1>Статистика</h1>

    <div class="stats-grid">
      <div class="panel stat-card">
        <strong>{{ taskStore.stats.total }}</strong>
        <span>Всього задач</span>
      </div>

      <div class="panel stat-card">
        <strong>{{ taskStore.stats.active }}</strong>
        <span>Активних</span>
      </div>

      <div class="panel stat-card">
        <strong>{{ taskStore.stats.completed }}</strong>
        <span>Виконано</span>
      </div>

      <div class="panel stat-card danger-stat">
        <strong>{{ taskStore.stats.overdue }}</strong>
        <span>Прострочено</span>
      </div>
    </div>

    <div class="panel progress-panel">
      <div class="progress-header">
        <h2>Прогрес виконання</h2>
        <strong>{{ taskStore.completedPercent }}%</strong>
      </div>

      <div class="progress-bar">
        <div
            class="progress-fill"
            :style="{ width: `${taskStore.completedPercent}%` }"
        ></div>
      </div>
    </div>

    <div class="panel">
      <h2>Найближчі дедлайни — наступні 3 дні</h2>

      <div v-if="taskStore.upcomingDeadlines.length" class="deadline-list">
        <div
            v-for="task in taskStore.upcomingDeadlines"
            :key="task.id"
            class="deadline-row"
        >
          <span>{{ task.title }}</span>
          <div>
            <span class="badge category">{{ task.category }}</span>
            <strong>{{ task.deadline }}</strong>
          </div>
        </div>
      </div>

      <p v-else class="muted">Немає задач із дедлайном протягом 3 днів.</p>
    </div>

    <div class="panel">
      <h2>Кількість задач за категоріями</h2>

      <div
          v-for="(count, category) in taskStore.tasksByCategory"
          :key="category"
          class="deadline-row"
      >
        <span>{{ category }}</span>
        <strong>{{ count }}</strong>
      </div>
    </div>
  </section>
</template>