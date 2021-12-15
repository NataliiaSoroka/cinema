<template>
  <router-link :to="{ name: 'page-movie-details', params: { id: movie.id } }">
    <div class="movie">
      <div class="movie-poster" :style="{ backgroundImage: `url(${movie.image})` }"></div>
      <div class="movie-info">
        <div class="movie-info__name" v-html="movie.name"></div>
        <div class="movie-info__genre">{{genre}}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { genres } from '@/constants/index'

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    genre() {
      return Object.values(genres)
        .find(genre => genre.key === this.movie.genre)?.displayName
    }
  },
}
</script>

<style lang="scss">
.movie {
  margin: 0 8px 20px;
  box-shadow: 0 0 18px rgb(214 214 214 / 60%);
  width: 185px;

  &-poster {
    background-size: cover;
    background-position: center;
    width: 185px;
    height: 287px;
  }

  &-info {
    height: 70px;
    padding: 20px 20px 18px;
    background: #fff;

    &__name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      width: 100%;
      font-weight: 700;
      color: #333;
      font-size: 14px;
      line-height: 17px;
      font-family: Arial, sans-serif;
    }

    &__genre {
      color: #7d7d7d;
      font-size: .85em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }
  }
}
</style>
