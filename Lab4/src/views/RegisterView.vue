<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '../composables/useEvents'
import { useRegistration } from '../composables/useRegistration'
import BaseModal from '../components/BaseModal.vue'

const route = useRoute()
const router = useRouter()

const { getEventById } = useEvents()
const { validateForm, registerUser, isLoading, error } = useRegistration()

const event = computed(() => getEventById(route.params.id))

const form = reactive({
  name: '',
  email: '',
})

const validationErrors = ref({})
const isModalOpen = ref(false)

const submitForm = async () => {
  validationErrors.value = validateForm(form)

  if (Object.keys(validationErrors.value).length > 0) {
    return
  }

  const success = await registerUser(route.params.id, form)

  if (success) {
    isModalOpen.value = true
    form.name = ''
    form.email = ''
  }
}

const closeModal = () => {
  isModalOpen.value = false
  router.push(`/events/${route.params.id}`)
}
</script>

<template>
  <section v-if="event">
    <RouterLink :to="`/events/${event.id}`" class="back-link">
      ← Назад до деталей
    </RouterLink>

    <div class="register-layout">
      <div>
        <span class="badge">{{ event.type }}</span>
        <h1>{{ event.title }}</h1>
        <p class="date">{{ event.date }}</p>
        <p>{{ event.shortDescription }}</p>
      </div>

      <form class="form-card" @submit.prevent="submitForm">
        <h2>Реєстрація</h2>
        <p>Заповніть форму для участі у події.</p>

        <label>
          Імʼя
          <input
              v-model="form.name"
              type="text"
              placeholder="Наприклад, Андрій"
          />
          <span v-if="validationErrors.name" class="field-error">
            {{ validationErrors.name }}
          </span>
        </label>

        <label>
          Email
          <input
              v-model="form.email"
              type="email"
              placeholder="example@email.com"
          />
          <span v-if="validationErrors.email" class="field-error">
            {{ validationErrors.email }}
          </span>
        </label>

        <p v-if="error" class="error-message">
          {{ error }}
        </p>

        <button class="btn primary full" :disabled="isLoading">
          {{ isLoading ? 'Реєструємо...' : 'Зареєструватися' }}
        </button>
      </form>
    </div>

    <BaseModal
        :is-open="isModalOpen"
        title="Реєстрація успішна"
        @close="closeModal"
    >
      <p>
        Вашу реєстрацію підтверджено. Дані збережено у localStorage.
      </p>
    </BaseModal>
  </section>

  <section v-else class="not-found">
    <h1>Подію не знайдено</h1>
    <RouterLink to="/" class="btn primary">Повернутися до списку</RouterLink>
  </section>
</template>