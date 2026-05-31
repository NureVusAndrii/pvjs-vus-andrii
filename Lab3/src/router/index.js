import { createRouter, createWebHistory } from 'vue-router'

import TaskListView from '../views/TaskListView.vue'
import TaskDetailView from '../views/TaskDetailView.vue'
import TaskFormView from '../views/TaskFormView.vue'
import StatsView from '../views/StatsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: TaskListView
  },
  {
    path: '/tasks/new',
    name: 'task-create',
    component: TaskFormView
  },
  {
    path: '/tasks/:id',
    name: 'task-detail',
    component: TaskDetailView
  },
  {
    path: '/tasks/:id/edit',
    name: 'task-edit',
    component: TaskFormView
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router