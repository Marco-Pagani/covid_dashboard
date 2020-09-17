<template>
  <section class="section">
    <div class="container">
      <h2 class="title" v-show="selected_state == ''">
        To see detailed data, select a state on the map or below
      </h2>
      <div class="tile is-ancestor" v-show="selected_state != ''">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child box notification is-warning">
                <h2 class="title">Cases in {{ selected_state | name }}</h2>
                <h3 class="title is-size-4">Current Cases</h3>
                <p class="is-family-secondary has-text-medium is-size-4">
                  {{ selected_state | name }} has
                  <b>{{ api_data.positive | formatted_number }}</b> active cases
                  at this time. That's
                  <b>{{
                    case_data.in_hundred_thou | round | formatted_number
                  }}</b>
                  cases per 100K people.
                </p>
                <p class="is-family-secondary has-text-medium is-size-4">
                  The state added
                  <b>{{ api_data.positiveIncrease }}</b> new cases today.
                </p>
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
                <b>{{ api_data.death | formatted_number }}</b> have sadly passed
                away due to COVID in {{ selected_state | name }},
                <b>{{ api_data.deathIncrease | formatted_number }}</b> of them
                today.<br />
                That's <b>{{ death_data.ratio_of_cases | to_percent }}</b> of
                those infected with the virus.
              </p>
            </article>
          </div>
        </div>
        <div class="tile is-parent is-vertical">
          <article class="tile is-child box notification is-primary">
            <h2 class="title">Data Quality: {{ api_data.dataQualityGrade }}</h2>
            <p class="is-size-4">
              The Covid Tracking Project gives
              {{ selected_state | name }} a(n)
              <b>{{ api_data.dataQualityGrade }}</b> grade for data quality.
              <a href="https://covidtracking.com/about-data/state-grades"
                >Click here</a
              >
              to learn more about the imporatnce of accurate and honest data,
            </p>
          </article>
          <article class="tile is-child box notification is-info">
            <h2 class="title">Testing Volume</h2>
            <p class="is-size-4">
              <b>{{
                (api_data.positive + api_data.negative) | formatted_number
              }}</b>
              tests have been performed in {{ selected_state | name }},
              <b>{{ api_data.totalTestResultsIncrease | formatted_number }}</b>
              of them were taken today.<br />
              Positity rate of these tests is
              <b>{{ testing_data.ratio_positive | to_percent }}</b>
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { state_id_to_name, formatNumber } from "@/utils/data_helper.js";
import StateTimeline from "@/components/stat_cards/state-timeline.vue";
import states from "@/data/states.json";

export default {
  components: {
    StateTimeline,
  },
  computed: {
    selected_state() {
      return this.$store.state.selected_state;
    },
    state_list() {
      return Object.entries(states);
    },
    api_data() {
      return this.$store.state.api_data.states_current.data.find(
        (e) => e.fips == this.selected_state
      );
    },
    case_data() {
      return this.$store.state.computed_data.cases[this.selected_state];
    },
    testing_data() {
      return this.$store.state.computed_data.testing[this.selected_state];
    },
    death_data() {
      return this.$store.state.computed_data.deaths[this.selected_state];
    },
  },
  filters: {
    name(id) {
      return state_id_to_name(id);
    },
    to_percent(dec) {
      return Math.round(dec * 1000) / 10 + "%";
    },
    round(dec) {
      return Math.round(dec);
    },
    formatted_number(n) {
      return formatNumber(n);
    },
  },
};
</script>