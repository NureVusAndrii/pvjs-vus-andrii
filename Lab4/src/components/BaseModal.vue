<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-backdrop" @click.self="emit('close')">
      <div class="modal">
        <h3>{{ title }}</h3>

        <div class="modal-content">
          <slot />
        </div>

        <button class="btn primary full" @click="emit('close')">
          Закрити
        </button>
      </div>
    </div>
  </Teleport>
</template>