import { api } from '../api'
import * as types from '../mutation-types'

const state = {
  places: null,
}

const getters = {
  places: state => state.places,
}

const actions = {
  async getPlaces({ commit }, payload) {
    const { data } = await this.$axios.get(
      api.showPlaces,
      { params: payload, withoutLoader: true }
    )
    commit(types.SET_PLACES, data.data)
    return data
  },
}

const mutations = {
  [types.SET_PLACES](state, places) {
    state.places = places
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}