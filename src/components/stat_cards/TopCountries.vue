<template>
  <div class="column is-one-third">
    <div class="card">
      <BarChart id="top_countries" payload="" />
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/graphs/BarChart.vue";
export default {
  components: {
    BarChart
  },
  computed: {
  }
};
</script>