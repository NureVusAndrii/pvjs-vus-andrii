<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="registrations">
    <h3>Зареєстровані учасники</h3>

    <p v-if="users.length === 0" class="empty">
      Поки що на цю подію ніхто не зареєструвався.
    </p>

    <ul v-else>
      <li v-for="user in users" :key="user.id">
        <div>
          <strong>{{ user.name }}</strong>
          <span>{{ user.email }}</span>
        </div>

        <span
            class="status"
            :class="{ pending: user.status === 'pending' }"
        >
          {{ user.status === 'pending' ? 'Очікує' : 'Підтверджено' }}
        </span>
      </li>
    </ul>
  </section>
</template>