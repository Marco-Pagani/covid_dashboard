<template>
  <div class="column is-one-third">
    <div class="card" id="us_timeline">
      <TimelineLog id="us_timeline" :payload="this.chartData" />
    </div>
  </div>
</template>

<script>
import TimelineLog from "@/components/stats/charts/TimelineLog.vue";
import statistics from '@/store/index.js'
export default {
  components: {
    TimelineLog
  },
  computed: {
    chartData() {
      if (!statistics.state.loading) {
        let us_data = statistics.state.global_stats.locations[225]
        return {
          ready: true,
          title: 'US Cases over Time',
          data: us_data.timelines.confirmed.timeline
        }
      } else {
        return { ready: false };
      }
    }
  }
};
</script>