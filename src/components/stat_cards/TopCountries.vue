<template>
  <div class="column is-one-third">
    <div class="card">
      <BarChart id="top_countries" :payload="this.chartData" />
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/graphs/BarChart.vue";
import statistics from "@/store/index.js";
export default {
  components: {
    BarChart
  },
  computed: {
    chartData() {
      if (!statistics.state.loading) {
        let global_data = statistics.state.global_stats.locations.map(
          country => {
            return {
              name: country.country,
              latest: country.latest.confirmed
            }
          }
        )

        let top = global_data.sort(function compare(a, b) {
          return b.latest - a.latest;
        })
        top.length = 7;
        return {
          ready: true,
          title: "Countries with Most Infections",
          data: top
        };
      } else {
        return { ready: false };
      }
    }
  }
};
</script>