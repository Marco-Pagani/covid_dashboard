<template>
  <section class="section">
    <NumberSummary />
    <div class="container">
      <div class="columns is-centered">
        <TopCountries />
        <USTimeline />
      </div>
    </div>
  </section>
</template>

<script>
import NumberSummary from "./stats/NumberSummary.vue";
import TopCountries from "./stats/TopCountries.vue";
import USTimeline from "./stats/USTimeline.vue";
export default {
  name: "Cards",
  components: {
    NumberSummary,
    TopCountries,
    USTimeline
  }
};
</script>