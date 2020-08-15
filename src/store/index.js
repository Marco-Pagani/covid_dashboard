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
    SET_DATA(state, type, _data) {
      state.api_data[type].data = _data;
    }
  },
  actions: {
    /*
    payload: {
      type: national_current,national_historic,state_current,state_historic
      state: lowercase state abbreviation
    }
    */
    fetch_data({ commit }, payload) {
      commit('START_LOAD')

      let type = payload.type
      let api_path = ''

      switch (type) {
        case 'national_current':
          api_path = 'us/current.json'
          break
        case 'national_historic':
          api_path = 'us/daily.json'
          break
        case 'state_current':
          api_path = 'states/current.json'
          break
      }

      axi.get("https://api.covidtracking.com/v1/" + api_path)
        .then((res) => {
          console.log('Got API Response:')
          console.log(res)
          commit('SET_DATA', type, res)
          commit('FINISH_LOAD')
        })
    }
  },
  modules: {
  }
})

export default statistics
