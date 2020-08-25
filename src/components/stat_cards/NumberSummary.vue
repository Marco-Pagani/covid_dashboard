<template>
  <div class="card">
    <div class="card-content">
      <div class="columns is-vcentered">
        <div class="column is-4">
          <PieChart id="pie" radius="100" ref="graph" />
        </div>

        <div class="column">
          <p class="title is-size-1 has-text-weight-semibold">
            There have been
            <span class="has-text-weight-bold" id="total">{{
              this.total_cases | formatted_number
            }}</span>
            confirmed cases of Coronavirus in the United States. Of those,
            <span class="has-text-warning has-text-weight-bold" id="cases">{{
              this.active_cases | formatted_number
            }}</span>
            are active cases,
            <span class="has-text-danger has-text-weight-bold" id="deaths">{{
              this.deaths | formatted_number
            }}</span>
            people have died, and
            <span
              class="has-text-success has-text-weight-bold"
              id="recovered"
              >{{ this.recovered | formatted_number }}</span
            >
            have recovered.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/graphs/pie-chart.vue'
import { formatNumber } from '@/utils/data_helper.js'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'NumberSummary',
  components: {
    PieChart,
  },

  data() {
    return {
      data_source: 'national_current',
      total_cases: '???',
      active_cases: '???',
      deaths: '???',
      recovered: '???',
      colors: [
        'hsl(48, 100%, 67%)',
        'hsl(141, 71%, 48%)',
        'hsl(348, 100%, 61%)',
      ],
    }
  },
  mounted() {
    if(this.touched){
      this.format_data()
    } else{
      this.fetch_data({
        type: this.data_source,
    })
    }
  },
  computed: {
    ...mapState({
      api_data(state) {
        return state.api_data[this.data_source].data
      },
      data_loaded(state) {
        return !state.api_data[this.data_source].loading
      },
      touched(state) {
        return state.api_data[this.data_source].touched
      }
    }),
  },
  watch: {
    data_loaded(ready) {
      if (ready) {
        this.format_data()
      }
    },
  },
  methods: {
    ...mapMutations({ set_selected: 'SET_SELECTED' }),
    ...mapActions(['fetch_data']),
    format_display(number) {
      return formatNumber(number)
    },
    format_data() {
      this.active_cases = this.api_data[0].positive
      this.deaths = this.api_data[0].death
      this.recovered = this.api_data[0].recovered
      this.total_cases = this.active_cases + this.deaths + this.recovered
      let chart_data = [this.active_cases, this.recovered, this.deaths]
      this.$refs.graph.draw(chart_data, this.colors)
    },
  },
  filters: {
    formatted_number(n) {
      return formatNumber(n)
    },
  },
}
</script>
