import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import mock_data from '@/store/dummy.json'
// import mock_state_data from '@/store/dummy_states.json'

Vue.use(Vuex)

const axi = axios.create()

const statistics = new Vuex.Store({
  state: {
    selected_state: '',
    api_data: {
      national_current: {
        loading: false,
        data: {}
      },
      national_historic: {
        loading: false,
        data: {}
      },
      states_current: {
        loading: false,
        data: {}
      },
      states_historic: {
        loading: false,
        data: {}
      }
    }

  },
  mutations: {
    SET_SELECTED(state, selected) {
      state.selected_state = selected
    },
    START_LOAD(state, type) {
      state.api_data[type].loading = true;
    },
    FINISH_LOAD(state, type) {
      state.api_data[type].loading = false;
    },
    SET_DATA(state, payload) {
      state.api_data[payload.type].data = payload.data;
    }
  },
  actions: {
    /*
    payload: {
      type: national_current,national_historic,states_current,state_historic
      state: lowercase state abbreviation
    }
    */
    fetch_data({ commit, state }, payload) {
      let type = payload.type
      let api_path = ''

      // OK, lets try to minimize the number of api calls
      // first, check if another component is already loading this data
      if (state.api_data[type].loading) {
        return;
      }
      // next, check if we already loaded data into the store
      if (Object.keys(state.api_data[type].data).length) {
        return;
      }

      // if not, we have to load the store ourselves
      commit('START_LOAD', type)

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
      }

      axi.get("https://api.covidtracking.com/v1/" + api_path)
        .then((res) => {
          commit('SET_DATA', { type: type, data: res.data })
          commit('FINISH_LOAD', type)
        })
    }
  },
  modules: {
  }
})

export default statistics
