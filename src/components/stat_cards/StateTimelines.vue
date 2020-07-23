<template>
  <div class="column is-one-third">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Stats By State</p>
        <div class="select">
          <select v-model="selected">
            <option
              v-for="state in this.states"
              :key="state.abbreviation"
              :value="state.abbreviation"
            >{{state.name}}</option>
          </select>
        </div>
      </header>
      <div class="card-content">
        <TimelineLog id="state_timeline" :payload="this.chartData" />
      </div>
    </div>
  </div>
</template>

<script>
import states from "@/data/states.json";
import TimelineLog from "@/components/graphs/TimelineLog.vue";
import moment from 'moment'

import axios from "axios";
const axi = axios.create();

export default {
  components: {
    TimelineLog
  },
  data() {
    return {
      states: states,
      selected: "",
      chartData: { ready: false }
    };
  },
  methods: {
    getStateData(state) {
        // make the request
      axi.get(
          "https://covidtracking.com/api/v1/states/" +
            state.toLowerCase() +
            "/daily.json"
        )
        // format response and save
        .then(res => {
          let data = res.data;
             // console.log(data)
          // strip fields that are not needed
          data = data
            .map(function(item) {
              return {
                //TODO do this without moment to save space
                date: moment(item.date, 'YYYYMMDD').format('YYYY-MM-DD') + 'T00:00:00Z',
                value: item.positive
              };
            })
            .reverse();
            // convert array to object
            let data_obj = {}
           data.forEach(item => data_obj[item.date] = item.value)
          this.chartData = {
            ready: true,
            title: this.selected + " Cases Over Time",
            data: data_obj
          };
        });
    }
  },
  watch: {
    selected(v) {
      this.getStateData(v);
    }
  }
};
</script>