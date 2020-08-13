<template>
  <div>
    <div class="card">
      <div class="card-content">
      <div class="columns is-vcentered">
        <div class="column is-4">
        <PieChart id="pie" radius="100" />
        </div>
        
        <div class="column ">
        <p class="title is-size-1 has-text-weight-semibold">
          There have been
          <span class="has-text-weight-bold" id="total">{{this.total_cases}}</span> 
          cases of Coronavirus worldwide. Of those,
          <span class="has-text-warning has-text-weight-bold" id="cases">{{this.active_cases}}</span> 
          are currently active,
          <span class="has-text-danger has-text-weight-bold" id="deaths">{{this.deaths}}</span> 
          people have died, and
          <span class="has-text-success has-text-weight-bold" id="recovered">{{this.recovered}}</span> 
          have recovered.
        </p>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/graphs/pie-chart.vue'

export default {
    name: 'NumberSummary',
    components: {
        PieChart
    },
  computed: {
    latest() {
      return this.$store.state.global_stats.latest;
    },
    total_cases () {
        return this.latest.confirmed
    },
    active_cases() {
        let latest = this.latest
        return latest.confirmed - latest.deaths - latest.recovered
    },
    deaths() {
        return this.latest.deaths
    },
    recovered () {
        return this.latest.recovered
    },
    chartData() {
        return [
            {
                type: 'total',
                value: this.total_cases
            },
            {
                type: 'cases',
                value: this.active_cases
            },
            {
                type: 'deaths',
                value: this.deaths
            },
            {
                type: 'recovered',
                value: this.recovered
            }
        ]
    }
  }
};
</script>