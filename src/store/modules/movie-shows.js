import { api } from '../api'
import * as types from '../mutation-types'

const state = {
  shows: null,
  showsByMovie: null,
}

const getters = {
  shows: state => state.shows,
  showsByMovie: state => state.showsByMovie,
}

const actions = {
  async getAllShows({ commit }) {
    const { data } = await this.$axios.get(api.movieShows)
    commit(types.SET_ALL_SHOWS, data.data)
    return data
  },
  async getShowsByMovie({ commit }, id) {
    const { data } = await this.$axios.get(api.movieShows, { params: { movie_id: id } })
    commit(types.SET_SHOWS_BY_MOVIE, { data: data.data, id })
    return data
  }
}

const mutations = {
  [types.SET_ALL_SHOWS](state, shows) {
    state.shows = [...shows]
  },
  [types.SET_SHOWS_BY_MOVIE](state, { data, id }) {
    state.showsByMovie = data[id]
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}