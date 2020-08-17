<template>
  <div :id="this.id" />
</template>

<script>
import * as d3 from "d3";

export default {
  props: ["payload", "id", "radius"],
  methods: {
    draw(data, colors) {
      let 
        sideLength = 450,
        margin = 40;

      let radius = sideLength / 2 - margin;

      let svg = d3
        .select("#" + this.id)
        .append("svg")
        .attr("viewBox", [0,0,sideLength,sideLength])
        .append("g")
        .attr(
          "transform",
          "translate(" + sideLength / 2 + "," + sideLength / 2 + ")"
        );

      let color = d3
        .scaleOrdinal()
        .domain(data)
        .range(colors);

      let pie = d3.pie().value(function (d) {
        return d.value;
      });
      let data_ready = pie(d3.entries(data));

      svg
        .selectAll()
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
        .attr("fill", function (d) {
          return color(d.data.key);
        })
    },
  },
};
</script>