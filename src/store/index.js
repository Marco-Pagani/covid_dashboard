import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import mock_data from '@/store/dummy.json'
import mock_state_data from '@/store/dummy_states.json'

Vue.use(Vuex)

const axi = axios.create()

const statistics = new Vuex.Store({
  state: {
    loading: true,
    state_loading: true,
    global_stats: {
      latest: {
        confirmed: 1000,
        deaths: 200,
        recovered: 60
      },
      locations: []
    },
    us_stats: {
      latest: {},
      timeline: []
    }
    
  },
  mutations: {
    LOAD_GLOBAL(state, payload) {
      state.global_stats = payload
    },
    LOAD_US_LATEST(state, payload) {
      state.us_stats.latest = payload
    },
    LOAD_US_TIMELINE(state, payload) {
      state.us_stats.timeline = payload
    },
    START_LOAD(state) {
      state.loading = true
    },
    FINISH_LOAD(state) {
      state.loading = false
    },
    START_LOAD_STATES(state) {
      state.state_loading = true
    },
    FINISH_LOAD_STATES(state) {
      state.state_loading = false
    },
  },
  actions: {
    load({ commit }) {
      return new Promise((resolve, reject) => {
        commit('START_LOAD')
        axi.get('https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true').then(res => {
          commit('LOAD_GLOBAL', res.data)
          commit('FINISH_LOAD')
          //console.log('data retreived')
        })
          .then(resolve)
          .catch(reject)
      })
    },
    load_states({ commit }) {
      return new Promise((resolve, reject) => {
        commit('START_LOAD_STATES')
        axi.get('https://covidtracking.com/api/v1/states/daily.json').then(res => {
          commit('LOAD_US_TIMELINE', res.data)
          commit('FINISH_LOAD_STATES')
        })
          .then(resolve)
          .catch(reject)
      })
    },
    load_mocked({ commit }) {
      commit('START_LOAD')
      commit('LOAD_GLOBAL', mock_data)
      commit('FINISH_LOAD')
    },
    load_mocked_states({ commit }) {
      commit('START_LOAD')
      commit('LOAD_US_TIMELINE', mock_state_data)
      commit('FINISH_LOAD')
    }
  },
  modules: {
  }
})

export default statistics
