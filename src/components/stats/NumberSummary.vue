<template>
  <div>
    <div class="card">
      <div class="card-image">
        <StackedBars :data="this.chartData" />
      </div>
      <div class="card-content">
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
</template>

<script>
import StackedBars from '@/components/stats/charts/StackedBars.vue'

export default {
    name: 'NumberSummary',
    components: {
        StackedBars
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