import * as types from '../mutation-types'

const state = {
  count: 0,
}

const getters = {
  loadingState: state => state.count > 0,
}

const actions = {
  showLoader({ commit }) {
    commit(types.SHOW_LOADER)
  },
  hideLoader({ commit }) {
    commit(types.HIDE_LOADER)
  }
}

const mutations = {
  [types.SHOW_LOADER](state) {
    state.count++
  },
  [types.HIDE_LOADER](state) {
    if (state.count > 0) state.count--;
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}