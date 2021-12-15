<template>
  <header class="header">
    <div class="container">
      <router-link :to="{ name: 'page-index' }">
        <img :src="logo" alt="Cinema" class="logo">

      </router-link>
      <div class="menu">
        <div class="menu-title">Жанри</div>
        <ul class="menu-dropdown">
          <li v-for="genre in genres" :key="genre.name">
            <router-link
              class="menu-dropdown__item"
              :to="{ name: 'page-genre-movies', params: { genre: genre.route}}"
            >
              {{genre.name}}
            </router-link>
          </li>
        </ul>
      </div>

      <input
        v-model="searchText"
        class="search-input"
        placeholder="Пошук фільмів..."
        autocomplete="off"
        @keypress.enter="goToHomePage"
      >
      <button @click="goToHomePage" class="search-button">Знайти</button>
    </div>
  </header>
</template>

<script>
import logo from '@/assets/images/logo.png';
import { genres } from '@/constants/index'

export default {
  data() {
    return {
      logo,
      genres: getGenreOptions(),
      searchText: '',
    }
  },
  methods: {
    goToHomePage() {
      const query = this.searchText ? { name: this.searchText } : null
      this.$router.push({ name: 'page-index', query })
      this.searchText = ''
    }
  },
}

function getGenreOptions() {
  return Object.values(genres)
    .map(genre => ({ route: genre.name.toLowerCase(), name: genre.displayName }))
}
</script>
<style lang="scss">
.header {
  height: 60px;
  width: 100%;
  background: #ededed;

  .container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo {
    height: 50px;
    margin-right: 30px;
  }

}

.menu {
  display: block;
  position: relative;
  cursor: pointer;

  &:hover {
    color: #3cb4e7;
  }

  &-title {
    display: block;
    width: 100px;
    height: 40px;
    padding-top: 12px;
    padding-left: 10px;
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.3s background-color;
    position: relative;
  }

  &::after {
    content: '▼';
    font-size: 9px;
    display: inline-block;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 12px;
    right: 15px;
  }
}

.menu-dropdown {
  display: none;
  min-width: 100%;
  padding: 10px 0 0;
  position: absolute;
  background: #ebebeb;
  z-index: 100;
  color: #000;

  li:first-child {
    border-top: 1px solid #3cb4e7;
  }

  li:hover {
    color: #3cb4e7;
  }

  &__item {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}

.menu:hover > .menu-dropdown {
  display: block;
}

.menu:hover::after {
  display: none;
}

.menu:not(:hover) > .menu-dropdown {
  padding: 4px 0;
  background: #dddddd;
  z-index: 99;
}

.menu-dropdown > * {
  overflow: hidden;
  height: 30px;
  padding: 5px 10px;
  background: rgba(0,0,0,0);
  white-space: nowrap;
}

.menu-dropdown > *:hover {
  background: rgba(0,0,0,0.1);
}

.search-input {
  border: none;
  border-right: none;
  padding: 0 10px;
  border-left: 1px solid #3cb4e7;
  background: transparent;
  height: 28px;
  width: 300px;

  &:focus {
    outline: none;
  }
}

.search-button {
  background: transparent;
  border: 1px solid #3cb4e7;
  color: #3cb4e7;
  padding: 8px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
}
</style>