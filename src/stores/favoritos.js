import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: [],
    }),
    actions: {
        addToFavorites(movie) {
            if (!this.isInFavorites(movie)) {
                this.favorites.push(movie);
                this.persistFavorites();
            }
        },
        isInFavorites(movie) {
            return this.favorites.some(
                (favorite) => favorite.imdbID === movie.imdbID
            );
        },
        persistFavorites() {
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
        loadFavorites() {
            const storedFavorites = localStorage.getItem('favorites');
            this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        },
    },
});
