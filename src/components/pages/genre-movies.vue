<template>
  <div class="container">
    <div class="movie-list">
      <template v-for="movie in movies">
        <movie-card :movie="movie" :key="movie.id" />
      </template>
    </div>
  </div>
</template>

<script>
import { genres } from '@/constants/index'
import { mapActions, mapGetters } from 'vuex'
import MovieCard from '@/components/general/movie-card'

export default {
  name: 'GenreMoviesPage',
  components: {MovieCard},
  computed: {
    ...mapGetters(['movies'])
  },
  methods: {
    ...mapActions(['getMovies'])
  },
  watch: {
    '$route.params.genre': {
      handler(val) {
        const genreCode = Object.values(genres)
          .find(genre => genre.name.toLowerCase() === val)?.key
        this.getMovies({ genres: [genreCode] });
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
.movie-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
</style>
