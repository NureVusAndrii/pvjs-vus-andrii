<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="event-card">
    <div class="event-cover" :class="event.imageClass">
      <h3>{{ event.title }}</h3>
      <p>{{ event.shortDescription }}</p>
    </div>

    <div class="event-content">
      <span class="badge">{{ event.type }}</span>
      <h2>{{ event.title }}</h2>
      <p class="date">{{ event.date }}</p>
      <p>{{ event.shortDescription }}</p>

      <div class="card-actions">
        <RouterLink class="btn secondary" :to="`/events/${event.id}`">
          Деталі
        </RouterLink>

        <RouterLink class="btn primary" :to="`/events/${event.id}/register`">
          Реєстрація
        </RouterLink>
      </div>
    </div>
  </article>
</template>