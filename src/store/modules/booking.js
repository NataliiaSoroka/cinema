import { api } from '../api'
import * as types from '../mutation-types'

const state = {
  bookingDetails: null,
}

const getters = {
  bookingDetails: state => state.bookingDetails,
}

const actions = {
  async bookingTicket({ commit }, payload) {
    const { data } = await this.$axios.post(api.bookPlace, payload)
    commit(types.SET_BOOKING_DETAILS, data.data)
    return data
  },
  resetBookingDetails({ commit }) {
    commit(types.RESET_BOOKING_DETAILS)
  },
}

const mutations = {
  [types.SET_BOOKING_DETAILS](state, bookingDetails) {
    state.bookingDetails = bookingDetails
  },
  [types.RESET_BOOKING_DETAILS](state) {
    state.bookingDetails = null
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}