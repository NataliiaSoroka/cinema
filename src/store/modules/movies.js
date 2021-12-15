import { api } from '../api'
import * as types from '../mutation-types'

const state = {
  movies: null,
  movieDetails: null,
}

const getters = {
  movies: state => state.movies,
  movieDetails: state => state.movieDetails,
}

const actions = {
  async getMovies({ commit }, payload) {
    const { data } = await this.$axios.get(api.movies, { params: payload })
    commit(types.SET_ALL_MOVIES, data.data)
    return data
  },
  async getMovieById({ commit }, id) {
    const { data } = await this.$axios.get(api.movies, { params: { movie_id: id } })
    commit(types.SET_MOVIE_DETAILS, data.data)
    return data
  },
  resetMovieDetails({ commit }) {
    commit(types.REST_MOVIE_DETAILS)
  },
  resetMovies({ commit }) {
    commit(types.REST_MOVIES)
  },
}

const mutations = {
  [types.SET_ALL_MOVIES](state, movies) {
    state.movies = [...movies]
  },
  [types.SET_MOVIE_DETAILS](state, [movieDetails]) {
    state.movieDetails = { ...movieDetails }
  },
  [types.REST_MOVIE_DETAILS](state) {
    state.movieDetails = null
  },
  [types.REST_MOVIES](state) {
    state.movies = null
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}