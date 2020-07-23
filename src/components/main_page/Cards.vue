<template>
  <div>
    <section class="section">
      <div class="container">
        <NumberSummary />
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <TopCountries />
          <USTimeline />
          <StateTimelines />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NumberSummary from "@/components/stat_cards/NumberSummary.vue";
import TopCountries from "@/components/stat_cards/TopCountries.vue";
import USTimeline from "@/components/stat_cards/USTimeline.vue";
import StateTimelines from "@/components/stat_cards/StateTimelines.vue";
export default {
  name: "Cards",
  components: {
    NumberSummary,
    TopCountries,
    USTimeline,
    StateTimelines
  },
  methods: {
    ...mapActions([])
  },
  mounted() {
    if (!window.webpackHotUpdate) {
      this.$store.dispatch("load");
    } else {
      console.log("In dev mode, using dummy data");
      this.$store.dispatch("load_mocked");
    }
  }
};
</script>