<template>
  <div :id="this.id" />
</template>

<script>
import * as d3 from 'd3'

export default {
  props: ['id'],
  data() {
    return {
    }
  },
  methods: {
    draw(data) {
      // create svg
      let _svg = d3
        .select('#' + this.id)
        .append('svg')
        .attr('viewBox', [0, 0, 500, 500])
    }
  }
}
</script>

<style>
</style>
