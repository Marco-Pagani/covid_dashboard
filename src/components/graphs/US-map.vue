<template>
  <section class="section">
    <div :id="this.id" />
  </section>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson'
import us from '@/data/states-albers-10m.json'
import { mapState, mapActions } from 'vuex'

export default {
  props: ['id'],
  data() {
    return {
      data_source: 'states_current',
    }
  },
  mounted() {
    this.fetch_data({
      type: this.data_source,
    })
  },
  computed: {
    ...mapState({
      api_data (state)  {return state.api_data[this.data_source].data},
      data_loaded (state)  {return !state.api_data[this.data_source].loading},
    }),
  },
  watch: {
    data_loaded(ready) {
      if (ready) {
        this.draw(this.format_data(this.api_data))
      }
    },
  },
  methods: {
    ...mapActions(['fetch_data', 'set_state']),
    format_data(data) {
      return new Map(
        data.map((state) => [
          state.fips,
          {
            name: state.state,
            id: state.fips,
            cases: state.positive,
            delta: state.positiveIncrease,
          },
        ])
      )
    },
    draw(data) {
      // heavily derived from https://observablehq.com/@d3/state-choropleth
      // color scale
      let maxCases = 0
      data.forEach(function(value) {
        maxCases = Math.max(maxCases, value.cases)
      })
      let colorScale = d3
        .scaleSequentialSqrt()
        .domain([0, maxCases])
        .interpolator(d3.interpolateReds)

      // create svg
      let _svg = d3
        .select('#' + this.id)
        .append('svg')
        .attr('viewBox', [0, 0, 975, 610])

      // add states
      let path = d3.geoPath()
      _svg
        .append('g')
        .selectAll('path')
        .data(topojson.feature(us, us.objects.states).features)
        .join('path')
        .attr('fill', (d) => colorScale(data.get(d.id).cases))
        .attr('d', path)
        .on('mouseenter', function() {
          //console.log(this)
          d3.select(this).attr('fill', d3.interpolateBlues(0.5))
        })
        .on('mouseout', function() {
          d3.select(this).attr('fill', (d) => colorScale(data.get(d.id).cases))
        })
        .on('click', (d, i, nodes) => {
          // update vue store
          this.set_state({state: d.id})
          // reflect selection on map
          d3.select('.selected').classed('selected', false)
          d3.select(nodes[i]).classed('selected', true)
        })

      // add state borders
      _svg
        .append('path')
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-linejoin', 'round')
        .attr('d', path)

      // add national border
      _svg
        .append('path')
        .datum(topojson.mesh(us, us.objects.nation))
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-linejoin', 'round')
        .attr('d', path)
    },
  },
}
</script>

<style>
.selected {
  fill: rgb(10, 41, 120);
}
</style>
