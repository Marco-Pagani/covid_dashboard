<template>
  <div class="card">
    <graph id="graphID" ref="graph" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Graph from ''

export default {
    data() {
    return {
      data_source: '',
    }
  },
  mounted() {
    if(this.touched){
      this.$refs.graph.draw(this.format_data(this.api_data))
    } else {
      this.fetch_data({
        type: this.data_source,
    })
    }
  },
  computed: {
    ...mapState({
      api_data (state)  {return state.api_data[this.data_source].data},
      data_loaded (state)  {return !state.api_data[this.data_source].loading},
      touched (state)  {return !state.api_data[this.data_source].touched}
    }),
  },
  watch: {
    data_loaded(ready) {
      if (ready) {
        this.$refs.graph.draw(this.format_data(this.api_data))
      }
    },
  },
  methods: {
    ...mapActions(['fetch_data']),
    format_data(data) {
      return {data}
    }
  }
}
</script>

<style>
</style>