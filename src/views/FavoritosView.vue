// FavoritesPage.vue

<template>
  <div class="container">
    <h1 class="mt-5 pt-5 text-center">Favoritos</h1>
    <div v-if="favorites.length > 0">
      <div v-for="movie in favorites" :key="movie.imdbID">
        <div class="d-flex justify-content-around">
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img :src="movie.Poster" :alt="movie.Title" class="img-fluid rounded-start">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ movie.Title }} ({{ movie.Year }})</h5>
                  <p class="card-text">{{ movie.Plot }}</p>
                  <p class="card-text"><small class="text-body-secondary">{{ movie.DVD }}</small></p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <p v-else>No favorites yet!</p>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useFavoritesStore } from '@/stores/favoritos';

export default {
  setup() {
    const favoritesStore = useFavoritesStore();
    const favorites = ref([]);

    onMounted(() => {
      favorites.value = favoritesStore.favorites;
    });

    return {
      favorites,
    };
  },
};
</script>
