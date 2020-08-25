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
      <div class="columns is-centered" v-show="selected_state != ''">
        <state-timeline />
        <!--
        <div class="card">
          <div class="card-content">
            <p
              v-if="this.selected_state"
              class="title is-size-1 has-text-weight-semibold"
            >
              Visualizations for {{ this.selected_state | name }} coming soon.
            </p>
            <p v-else class="title is-size-1 has-text-weight-semibold">
              Please select a state for further data.
            </p>
          </div>
        </div>
        -->
      </div>
    </div>
  </section>
</template>

<script>
import { state_id_to_name } from '@/utils/data_helper.js'
import StateTimeline from '@/components/stat_cards/state-timeline.vue'
import states from "@/data/states.json";

export default {
    components: {
    StateTimeline
  },
    computed: {
    selected_state() { return this.$store.state.selected_state; },
    state_list() { return Object.entries(states)}
    },
    filters: {
    name(id) {
      return state_id_to_name(id)
    }
  }
}
</script>