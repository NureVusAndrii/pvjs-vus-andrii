<template>
  <div class="card">
    <img
        :src="image.download_url"
        :alt="image.author"
    />

    <div class="card-content">
      <h3>{{ image.author }}</h3>

      <button
          class="favorite-btn"
          :class="{ favorite: isFavorite }"
          @click="$emit('toggle-favorite', image.id)"
      >
        <span v-if="isFavorite">
          In favorites
        </span>

        <span v-else>
          Add to favorites
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: Object,
  isFavorite: Boolean
})

defineEmits(['toggle-favorite'])
</script>