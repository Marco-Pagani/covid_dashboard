<template>
  <div>
    <div class="tabs is-centered is-large">
  <ul>
    <li :class="{ 'is-active': this.activeTab == 0}" @click="setActive(0)"><a>National Data</a></li>
    <li :class="{ 'is-active': this.activeTab == 1}" @click="setActive(1)"><a>State Data</a></li>
  </ul>
</div>
<div v-show="this.activeTab == 0">
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
  data() {
    return {
      activeTab: 0
    }
  },
  computed: mapState([
    'selected_state'
  ]),
  methods: {
    ...mapActions([]),
    setActive(n){
      this.activeTab = n
    }
  },
  mounted() {
    if (!window.webpackHotUpdate) {
      this.$store.dispatch("load");
    } else {
      console.log("In dev mode, should use dummy data");
      //this.$store.dispatch("load_mocked");
    }
  }
};
</script>