<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEvents } from '../composables/useEvents'
import { useRegistration } from '../composables/useRegistration'
import RegistrationList from '../components/RegistrationList.vue'

const route = useRoute()
const { getEventById } = useEvents()
const { getRegistrationsByEventId } = useRegistration()

const event = computed(() => getEventById(route.params.id))
const users = getRegistrationsByEventId(route.params.id)
</script>

<template>
  <section v-if="event">
    <RouterLink to="/" class="back-link">← Назад</RouterLink>

    <div class="details-layout">
      <div class="event-cover large" :class="event.imageClass">
        <h2>{{ event.title }}</h2>
        <p>{{ event.shortDescription }}</p>
      </div>

      <div class="details-info">
        <span class="badge">{{ event.type }}</span>
        <h1>{{ event.title }}</h1>
        <p class="date">{{ event.date }}</p>
        <p class="location">{{ event.location }}</p>
        <p>{{ event.description }}</p>

        <RouterLink class="btn primary full" :to="`/events/${event.id}/register`">
          Зареєструватися
        </RouterLink>
      </div>
    </div>

    <RegistrationList :users="users" />
  </section>

  <section v-else class="not-found">
    <h1>Подію не знайдено</h1>
    <RouterLink to="/" class="btn primary">Повернутися до списку</RouterLink>
  </section>
</template>