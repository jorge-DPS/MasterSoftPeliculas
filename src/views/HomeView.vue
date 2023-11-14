<script setup>
</script>

<template>
  <main>
    <div class="container">
      <h1 class="mb-4">Buscador de Películas</h1>
      <div class="input-group mb-3">
        <input v-model="searchTerm" type="text" class="form-control" placeholder="Buscar por título">
        <button @click="searchMovies" class="btn btn-outline-primary">Buscar</button>
      </div>

      <ul v-if="movies.length" class="list-group">
        <li v-for="movie in movies" @click="showMovieDetails(movie.imdbID)" class="list-group-item pointer">{{ movie.Title
        }}</li>
      </ul>

      <div v-if="selectedMovie" class="container mt-4">
        <h2>{{ selectedMovie.Title }}</h2>
        <p><strong>Año:</strong> {{ selectedMovie.Year }}</p>
        <p><strong>Director:</strong> {{ selectedMovie.Director }}</p>
        <p><strong>Reparto:</strong> {{ selectedMovie.Actors }}</p>
        <button @click="setObject(selectedMovie)" class="btn btn-outline-primary">Agregar a Favoritos</button>
      </div>
    </div>
  </main>
</template>

<script>

import { useDataStore } from '@/stores/favoritos';

export default {
  data() {
    return {
      searchTerm: '',
      movies: [],
      selectedMovie: null,
    };
  },
  methods: {
    setObject(peliculaSelecioanda) {
      console.log(peliculaSelecioanda.Title);
      const dataStore = useDataStore();
      dataStore.setMyObject({ name: 'Ejemplo', age: 25 });
    },
    searchMovies() {
      if (this.searchTerm.trim() !== '') {
        const apiUrl = `http://www.omdbapi.com/?apikey=b49f35af&s=${this.searchTerm}`;

        this.$axios.get(apiUrl)
          .then(response => {
            this.movies = response.data.Search || [];
            this.selectedMovie = null;
          })
          .catch(error => {
            console.error('Error fetching movies:', error);
          });
      }
    },
    showMovieDetails(imdbID) {
      const apiUrl = `http://www.omdbapi.com/?apikey=b49f35af&i=${imdbID}`;

      this.$axios.get(apiUrl)
        .then(response => {
          this.selectedMovie = response.data;
        })
        .catch(error => {
          console.error('Error fetching movie details:', error);
        });
    },
    // addToFavorites() {
    //   if (this.selectedMovie) {
    //     this.$store.commit('addToFavorites', this.selectedMovie);
    //   }
    // },

  }
}
</script>