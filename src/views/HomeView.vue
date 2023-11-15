<template>
  <div class="container">
    <h1 class="mb-4 text-center">Buscar Peliculas</h1>

    <div class="input-group mb-3">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="Buscar por título">
      <button @click="searchOnButtonClick" class="btn btn-outline-primary">Buscar</button>
    </div>

    <ul v-if="movies.length > 0" class="list-group">
      <li v-for="movie in movies" :key="movie.imdbID" @click="showMovieDetails(movie.imdbID)"
        class="list-group-item cursor-pointer">
        {{ movie.Title }} ({{ movie.Year }})
      </li>
    </ul>

    <div class="d-flex justify-content-center">
      <div v-if="selectedMovie" class="mt-4">
        <div class="card" style="width: 30rem;">
          <img :src="selectedMovie.Poster" :alt="selectedMovie.Title" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ selectedMovie.Title }} ({{ selectedMovie.Year }})</h5>
            <p class="card-text">{{ selectedMovie.Plot }}</p>
            <p><strong>Director:</strong> {{ selectedMovie.Director }}</p>
            <p><strong>Cast:</strong> {{ selectedMovie.Actors }}</p>
            <button @click="addToFavorites" class="btn btn-primary align-items-center">Añadir a Favoritos</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useFavoritesStore } from '@/stores/favoritos';

export default {
  setup() {
    const searchQuery = ref('');
    const movies = ref([]);
    const selectedMovie = ref(null);
    const favoritesStore = useFavoritesStore();

    const searchMovies = () => {
      if (searchQuery.value === '') {
        movies.value = [];
        return;
      }

      // cambiar api key
      const apiKey = 'b49f35af';
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery.value}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          movies.value = data.Search || [];
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    const showMovieDetails = (imdbID) => {
      // cambiar api key
      const apiKey = 'b49f35af';
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          selectedMovie.value = data;
        })
        .catch((error) => {
          console.error('Error fetching movie details:', error);
        });
    };

    const addToFavorites = () => {
      if (selectedMovie.value) {
        favoritesStore.addToFavorites(selectedMovie.value);
        alert('Pelicula Añadida a los favoritos!');
      }
    };

    const searchOnButtonClick = () => {
      searchMovies();
    };

    watch(searchQuery, searchMovies);

    onMounted(() => {
      favoritesStore.loadFavorites();
    });

    return {
      searchQuery,
      movies,
      selectedMovie,
      addToFavorites,
      showMovieDetails,
      searchOnButtonClick,
    };
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
