<template>
  <div class="container">
    <div class="search-title" v-if="hasQueries">
      <h1>Пошук по сайту</h1>
    </div>
    <div class="movie-list">
      <template v-for="movie in movies">
        <movie-card :movie="movie" :key="movie.id" />
      </template>
      <div v-if="!hasMovies" class="search">
        Фільми за цим запитом не знайдено.
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
import MovieCard from '@/components/general/movie-card'

export default {
  components: { MovieCard },
  watch: {
    '$route.query'(val) {
      this.getMovies(val)
    }
  },
  created() {
    this.getMovies(this.$route.query)
  },
  computed: {
    ...mapGetters(['movies']),
    hasMovies() {
      return this.movies && this.movies.length
    },
    hasQueries() {
      return JSON.stringify(this.$route.query) !=='{}'
    }
  },
  methods: {
    ...mapActions(['getMovies', 'resetMovies']),
  },
  destroyed() {
    this.resetMovies()
  },
};
</script>

<style lang="scss">
.movie-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}

.search-title {
  width: 100%;
  margin: 40px 0;
  border-bottom: 1px solid #eaeaea;

  h1 {
    border-bottom: 1px solid #3cb4e7;
    display: inline-block;
    padding-bottom: 15px;
    margin-bottom: -1px;
    font-size: 24px;
    line-height: 28px;
    font-weight: 400;
  }
}
</style>
