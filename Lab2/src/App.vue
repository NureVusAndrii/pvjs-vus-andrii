<template>
  <div class="container">
    <h1 class="title">Image Gallery</h1>

    <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by author..."
        class="search"
    />

    <div class="filters">
      <button
          class="filter-btn"
          :class="{ active: !showFavoritesOnly }"
          @click="showFavoritesOnly = false"
      >
        All
      </button>

      <button
          class="filter-btn"
          :class="{ active: showFavoritesOnly }"
          @click="showFavoritesOnly = true"
      >
        Favorites
      </button>
    </div>

    <div v-if="isLoading" class="message">
      Loading...
    </div>

    <div v-else-if="error" class="message error">
      <p>{{ error }}</p>

      <button @click="fetchImages">
        Retry
      </button>
    </div>

    <div v-else class="gallery">
      <ImageCard
          v-for="image in filteredImages"
          :key="image.id"
          :image="image"
          :isFavorite="isFavorite(image.id)"
          @toggle-favorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ImageCard from './components/ImageCard.vue'

const images = ref([])
const isLoading = ref(false)
const error = ref('')
const favorites = ref([])
const searchQuery = ref('')
const showFavoritesOnly = ref(false)

const fetchImages = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const response = await fetch(
        'https://picsum.photos/v2/list?page=2&limit=20'
    )

    if (!response.ok) {
      throw new Error('Failed to load images')
    }

    const data = await response.json()

    images.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const toggleFavorite = (id) => {
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter(
        favoriteId => favoriteId !== id
    )
  } else {
    favorites.value.push(id)
  }
}

const isFavorite = (id) => {
  return favorites.value.includes(id)
}

const filteredImages = computed(() => {
  let filtered = images.value.filter(image =>
      image.author
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
  )

  if (showFavoritesOnly.value) {
    filtered = filtered.filter(image =>
        favorites.value.includes(image.id)
    )
  }

  return filtered
})

onMounted(() => {
  fetchImages()
})
</script>