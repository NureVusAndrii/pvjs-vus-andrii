import { computed, ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

const registrations = useLocalStorage('event-registrations', [])

export function useRegistration() {
  const isLoading = ref(false)
  const error = ref('')

  const getRegistrationsByEventId = (eventId) => {
    return computed(() =>
      registrations.value.filter((item) => item.eventId === Number(eventId))
    )
  }

  const validateForm = (form) => {
    const errors = {}

    if (!form.name.trim()) {
      errors.name = 'Введіть імʼя'
    }

    if (!form.email.trim()) {
      errors.email = 'Введіть email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Введіть коректний email'
    }

    return errors
  }

  const fakeServerRequest = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.15

        if (isSuccess) {
          resolve()
        } else {
          reject(new Error('Помилка сервера. Спробуйте ще раз.'))
        }
      }, 900)
    })
  }

  const registerUser = async (eventId, form) => {
    error.value = ''
    isLoading.value = true

    const newRegistration = {
      id: Date.now(),
      eventId: Number(eventId),
      name: form.name.trim(),
      email: form.email.trim(),
      createdAt: new Date().toLocaleString('uk-UA'),
      status: 'pending',
    }

    registrations.value.push(newRegistration)

    try {
      await fakeServerRequest()

      const savedItem = registrations.value.find(
        (item) => item.id === newRegistration.id
      )

      if (savedItem) {
        savedItem.status = 'confirmed'
      }

      return true
    } catch (err) {
      registrations.value = registrations.value.filter(
        (item) => item.id !== newRegistration.id
      )

      error.value = err.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    registrations,
    isLoading,
    error,
    validateForm,
    registerUser,
    getRegistrationsByEventId,
  }
}