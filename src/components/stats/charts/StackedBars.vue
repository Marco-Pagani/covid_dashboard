<template>
  <div id="chart" />
</template>

<script>
import * as d3 from 'd3'

export default {
  props: [
      'data'
  ],
  mounted() {
      this.draw()
  },
  methods: {
    draw() {
      let stats = this.data;
      console.log(stats)
      var offset = 0;
      stats = stats.map(d => {
        offset += d.value;
        return {
          type: d.type,
          value: d.value,
          offset: offset - d.value
        };
      });
      var total = stats[0].value;

      var margin = { top: 20, right: 10, bottom: 20, left: 10 },
        width = 800,
        height = 70,
        barHeight = 50,
        colors = ["#ffdd57", "#ff3860", "#48c774"];

      const w = width - margin.left - margin.right;
      const h = height - margin.top - margin.bottom;
      const halfBarHeight = barHeight / 2;

      const xScale = d3
        .scaleLinear()
        .domain([0, total])
        .range([0, w]);

      const selection = d3
        .select("#chart")
        .append("svg")
        .attr("viewBox", `0 0 800 70`)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      selection
        .selectAll("rect")
        .data(stats)
        .enter()
        .append("rect")
        .attr("class", "rect-stacked")
        .attr("x", function(d) {
          return xScale(d.offset);
        })
        .attr("y", h / 2 - halfBarHeight)
        .attr("height", barHeight)
        .attr("width", function(d) {
          return xScale(d.value);
        })
        .style("fill", (d, i) => colors[i]);
    }
  }
};
</script>