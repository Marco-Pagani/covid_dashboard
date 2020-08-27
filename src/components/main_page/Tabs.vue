<template>
  <div>
    <div class="tabs is-centered is-large">
      <ul>
        <li :class="{ 'is-active': this.activeTab == 0 }" @click="setActive(0)">
          <a>National Data</a>
        </li>
        <li :class="{ 'is-active': this.activeTab == 1 }" @click="setActive(1)">
          <a>State Data</a>
        </li>
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
          </div>
        </div>
      </section>
    </div>

    <div v-show="this.activeTab == 1">
      <state-cards />
    </div>
  </div>
</template>

<script>
import NumberSummary from '@/components/stat_cards/NumberSummary.vue'
import TopCountries from '@/components/stat_cards/TopCountries.vue'
import USTimeline from '@/components/stat_cards/USTimeline.vue'
import StateCards from '@/components/main_page/state-cards.vue'
export default {
  name: 'Tabs',
  components: {
    NumberSummary,
    TopCountries,
    USTimeline,
    StateCards
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  methods: {
    setActive(n) {
      this.activeTab = n
    },
  },
  mounted() {
    if (!window.webpackHotUpdate) {
      this.$store.dispatch('load')
    } else {
      console.log('In dev mode, should use dummy data')
      //this.$store.dispatch("load_mocked");
    }
  }
}
</script>
