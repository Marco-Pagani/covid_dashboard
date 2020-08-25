<template>
  <div class="column is-one-third">
    <div class="card">
      <timeline-log id="us_timeline" payload="" />
    </div>
  </div>
</template>

<script>
import TimelineLog from "@/components/graphs/timeline-log.vue";
export default {
  components: {
    TimelineLog
  }
};
</script>