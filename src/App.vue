<template>
  <div id="app">
    <a-header />
    <div class="body">
      <router-view />
    </div>
    <a-footer />
    <v-preloader v-if="loadingState"></v-preloader>
  </div>
</template>

<script>
import AHeader from '@/components/layouts/header'
import AFooter from '@/components/layouts/footer'
import VPreloader from '@/components/general/preloader'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { AHeader, AFooter, VPreloader },
  computed: {
    ...mapGetters(['loadingState'])
  }
}
</script>

<style lang="scss">
@import 'assets/scss/reset.scss';

.body {
  min-height: calc(100vh - 160px);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  @media screen and (max-width: 1320px) {
    margin: 0 20px;
  }
}
</style>
