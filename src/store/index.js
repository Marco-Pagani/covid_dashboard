import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const axi = axios.create()

export default new Vuex.Store({
  state: {
    loading: false,
    stats: {
      latest: null,
      countries: null,
      us_states: null
    }
  },
  mutations: {
    LOAD_STATS(state, payload) {
      state.stats = payload
    }
  },
  actions: {
    load({ commit }) {
      return new Promise((resolve, reject) => {
        console.log('gettin')
        axi.get('https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true').then(res => {
          commit('LOAD_STATS', res.data)
        console.log('got')
        })
          .then(resolve)
          .catch(reject)
      })
    }
  },
  modules: {
  }
})
