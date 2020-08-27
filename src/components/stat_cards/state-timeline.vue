<template>
  <div>
    <timeline-log id="state_timeline" ref="graph" />
  </div>
</template>

<script>
import states from "@/data/states.json";
import TimelineLog from "@/components/graphs/timeline-log.vue";
import { state_id_to_name } from '@/utils/data_helper.js'
import { mapState, mapActions } from 'vuex'


export default {
  components: {
    TimelineLog
  },
  data() {
    return {
      states: states,
    }
  },
  computed: {
    ...mapState({
      selected_state(state) { return state.selected_state },
      data_loading(state) { return state.api_data.states_historic.loading },
      state_data(state) {
        return state.api_data.states_historic.states
      }
    }),
    title(){
      return 'Cases in ' + state_id_to_name(this.selected_state) + ' Over Time'
    }
  },
  watch: {
    selected_state(){
      let data = this.state_data[this.selected_state].data
      if(Object.keys(data).length){
        this.draw_graph()
      } else {
        this.fetch_data({
            type: 'states_historic',
            state: this.selected_state
          })
      }
      
    },
    data_loading(loading){
      if(!loading){
        this.draw_graph()
      }
    }

},
  methods: {
    ...mapActions(['fetch_data']),
    format_data(data) {
      data = data
      .filter(item => item.dateChecked !== null & item.dateChecked != '')
      .map(function (entry) {
        return {
          date: new Date(entry.dateChecked.substring(0,11) + '00:00:00Z'),
          value: entry.positive
        }
      })
      
      return data
    },
    draw_graph() {
      this.$refs.graph.draw(this.title, this.format_data(this.state_data[this.selected_state].data))
    }
  }
}
</script>