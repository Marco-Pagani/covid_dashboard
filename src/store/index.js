import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { state_id_to_abbr } from '@/utils/data_helper.js'
import states from '@/data/states.json'
// import mock_data from '@/store/dummy.json'
// import mock_state_data from '@/store/dummy_states.json'

Vue.use(Vuex)

const axi = axios.create()

const statistics = new Vuex.Store({
  state: {
    selected_state: '',
    api_data: {
      national_current: {
        touched: false,
        loading: false,
        data: {}
      },
      national_historic: {
        touched: false,
        loading: false,
        data: {}
      },
      states_current: {
        touched: false,
        loading: false,
        data: {}
      },
      states_historic: {
        states: {},
        loading: false
      }
    },
    computed_data: {
      cases: {},
      testing: {},
      deaths: {}
    }

  },
  mutations: {
    SET_SELECTED(state, selected) {
      state.selected_state = selected
    },
    START_LOAD(state, payload) {
      state.api_data[payload.type].loading = true;
    },
    FINISH_LOAD(state, payload) {
      state.api_data[payload.type].loading = false;
    },
    TOUCH(state, payload) {
      if (payload.type === 'states_historic')
        state.api_data.states_historic.states[payload.state].touched = true;
      else
        state.api_data[payload.type].touched = true;
    },
    SET_DATA(state, payload) {
      if (payload.type === 'states_historic')
        state.api_data.states_historic.states[payload.state].data = payload.data;
      else
        state.api_data[payload.type].data = payload.data;
    },
    ADD_STATE_KEY(state, payload) {
      state.api_data.states_historic.states[payload.state] = {
        touched: false,
        data: {}
      }
    },
    COMPUTE_DATA(state) {
      console.log(state)
      let api_data = state.api_data.states_current.data

      let state_data = Object.entries(states)

      state_data.forEach(us_state => {
        let data = api_data.find(e => e.fips == us_state[0])
        console.log(data)
        state.computed_data.cases[us_state[0]] = {
          vs_population: data.positive / us_state[1].population,

        }
        state.computed_data.testing[us_state[0]] = {
          vs_population: (data.positive + data.negative) / us_state[1].population,
          ratio_positive: data.positive / (data.positive + data.negative)
        }
        state.computed_data.deaths[us_state[0]] = {
          vs_population: data.death / us_state[1].population,
        }
      })
    }
  },
  actions: {
    set_state({ commit, state }, payload) {
      if (!(payload.state in state.api_data.states_historic.states)) {
        commit('ADD_STATE_KEY', { state: payload.state })
      }
      commit('SET_SELECTED', payload.state)
    },
    /*
    payload: {
      type: national_current,national_historic,states_current,state_historic
      state: fips id
    }
    */
    fetch_data({ commit, state }, payload) {
      console.log('fetching', payload)
      let type = payload.type
      let api_path = ''

      let data_location
      if (type === 'states_historic')
        data_location = state.api_data.states_historic.states[payload.state]
      else
        data_location = state.api_data[type]


      // OK, lets try to minimize the number of api calls
      // first, check if another component is already loading this data
      if (type != 'states_historic' && data_location.loading) {
        return;
      }
      // next, check if we already loaded data into the store
      if (data_location.touched) {
        return;
      }

      // if not, we have to load the store ourselves
      commit('START_LOAD', { type: type, state: payload.state })

      // check if the user has this data cached already
      // TODO

      // finally, if all else fails we will have to call the API

      switch (type) {
        case 'national_current':
          api_path = 'us/current.json'
          break
        case 'national_historic':
          api_path = 'us/daily.json'
          break
        case 'states_current':
          api_path = 'states/current.json'
          break
        case 'states_historic':
          api_path = 'states/' + state_id_to_abbr(payload.state) + '/daily.json'
      }

      axi.get("https://api.covidtracking.com/v1/" + api_path)
        .then((res) => {
          let data_payload = { type: type, data: res.data }
          if (payload.state)
            data_payload['state'] = payload.state
          commit('SET_DATA', data_payload)
          if (type === 'states_current')
            commit('COMPUTE_DATA')
          commit('FINISH_LOAD', data_payload)
          commit('TOUCH', data_payload)
        })
        .catch(e => console.log('Error: ', e))
    },
  },
  modules: {
  }
})

export default statistics
