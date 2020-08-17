<template>
  <div class="column is-one-third">
    <div class="card">
      <TimelineLog id="us_timeline" payload="" />
    </div>
  </div>
</template>

<script>
import TimelineLog from "@/components/graphs/TimelineLog.vue";
export default {
  components: {
    TimelineLog
  }
};
</script>