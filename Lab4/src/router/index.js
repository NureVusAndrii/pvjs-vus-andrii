import { createRouter, createWebHistory } from 'vue-router'

import EventsView from '../views/EventsView.vue'
import EventDetailsView from '../views/EventDetailsView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'events',
    component: EventsView,
  },
  {
    path: '/events/:id',
    name: 'event-details',
    component: EventDetailsView,
    props: true,
  },
  {
    path: '/events/:id/register',
    name: 'event-register',
    component: RegisterView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router