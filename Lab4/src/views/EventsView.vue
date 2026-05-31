<script setup>
import EventCard from '../components/EventCard.vue'
import { useEvents } from '../composables/useEvents'

defineOptions({
  name: 'EventsView',
})

const { events } = useEvents()
</script>

<template>
  <section>
    <div class="hero">
      <p class="eyebrow">Лабораторна робота №4</p>
      <h1>Події для реєстрації</h1>
      <p>
        Оберіть подію, перегляньте деталі та зареєструйтесь через форму.
      </p>
    </div>

    <div class="events-grid">
      <EventCard
          v-for="event in events"
          :key="event.id"
          :event="event"
      />
    </div>
  </section>
</template>