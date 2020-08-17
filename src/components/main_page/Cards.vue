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
      <section class="section">
        <div class="container">
          <div class="columns is-centered">
            <div class="card">
              <div class="card-content">
                <p
                  v-if="this.selected_state"
                  class="title is-size-1 has-text-weight-semibold"
                >
                  Visualizations for {{ this.selected_state | name }} coming
                  soon.
                </p>
                <p v-else class="title is-size-1 has-text-weight-semibold">
                  Please select a state for further data.
                </p>
              </div>
            </div>
            <!--
            <StateTimelines />
            -->
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import NumberSummary from '@/components/stat_cards/NumberSummary.vue'
import TopCountries from '@/components/stat_cards/TopCountries.vue'
import USTimeline from '@/components/stat_cards/USTimeline.vue'
import { state_id_to_name } from '@/utils/data_helper.js'
//import StateTimelines from "@/components/stat_cards/StateTimelines.vue";
export default {
  name: 'Cards',
  components: {
    NumberSummary,
    TopCountries,
    USTimeline,
    //StateTimelines
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  computed: mapState(['selected_state']),
  methods: {
    ...mapActions([]),
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
  },
  filters: {
    name(id) {
      return state_id_to_name(id)
    }
  }
}
</script>
