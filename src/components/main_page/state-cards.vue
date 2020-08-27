<template>
  <section class="section">
    <div class="container">
      <h2 class="title" v-show="selected_state == ''">
        To see detailed data, select a state on the map or below
      </h2>
      <!--
      <div class="select">
        <select v-model="selected_state">
          <option v-for="state in state_list" :key="state[0]">
            {{ state[1].name }}
          </option>
        </select>
      </div>
        -->
      <div class="tile is-ancestor" v-show="selected_state != ''">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child box notification is-warning">
                <h2 class="title">Cases in {{ selected_state | name }}</h2>
                <ul class="is-family-secondary has-text-medium is-size-4">
                  <li>
                    {{ selected_state | name }} currently has a total of
                    {{ api_data.positive | formatted_number }} cases, that's an
                    increase of {{ api_data.positiveIncrease }} since yesterday.
                    {{ case_data.vs_population | to_percent }} of the population
                    is infected, or
                    {{ case_data.in_hundred_thou | round | formatted_number }}
                    in every 100,000 people.
                  </li>
                </ul>
              </article>
            </div>
            <div class="tile is-parent">
              <state-timeline />
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box notification is-danger">
              <h2 class="title">Deaths</h2>
              <p class="is-size-4">
                {{ api_data.death | formatted_number }} have sadly passed away
                due to COVID in {{ selected_state | name }}. That's
                {{ death_data.ratio_of_cases | to_percent }} of those infected
                with the virus. Of those,
                {{ api_data.deathIncrease | formatted_number }} passed away just
                today.
              </p>
            </article>
          </div>
        </div>
        <div class="tile is-parent is-vertical">
          <article class="tile is-child box notification is-info">
            <h2 class="title">Data Quality</h2>
            <p class="is-size-4">
              The Covid Tracking Project gives
              {{ selected_state | name }} a(n)
              {{ api_data.dataQualityGrade }} grade for data quality.
              <a href="https://covidtracking.com/about-data/state-grades"
                >Click here</a
              >
              to learn more about the imporatnce of accurate and honest data,
            </p>
          </article>
          <article class="tile is-child box notification is-info">
            <h2 class="title">Testing Volume</h2>
            <p class="is-size-4">
              {{ (api_data.positive + api_data.negative) | formatted_number }}
              tests have been performed in {{ selected_state | name }}, with
              {{ testing_data.ratio_positive | to_percent }} coming back
              positive.<br />
              Today,
              {{ api_data.totalTestResultsIncrease | formatted_number }} tests
              were conducted.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { state_id_to_name, formatNumber } from '@/utils/data_helper.js'
import StateTimeline from '@/components/stat_cards/state-timeline.vue'
import states from "@/data/states.json";

export default {
    components: {
    StateTimeline
  },
    computed: {
    selected_state() { return this.$store.state.selected_state; },
    state_list() { return Object.entries(states)},
    api_data() {return this.$store.state.api_data.states_current.data.find(e => e.fips == this.selected_state)},
    case_data(){return this.$store.state.computed_data.cases[this.selected_state] },
    testing_data(){return this.$store.state.computed_data.testing[this.selected_state] },
    death_data(){return this.$store.state.computed_data.deaths[this.selected_state] }
    },
    filters: {
    name(id) {
      return state_id_to_name(id)
    },
    to_percent(dec) {
      return (Math.round(dec * 1000) / 10) + '%'
    },
    round(dec) {
      return Math.round(dec)
    },
    formatted_number(n) {
      return formatNumber(n)
    },
  }
}
</script>