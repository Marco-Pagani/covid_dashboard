<template>
  <div :id="this.id" />
</template>

<script>
import * as d3 from "d3";

export default {
  props: ["payload", "id"],
  watch: {
    payload: {
      handler(value) {
        if (value.ready) {
          this.draw(value.title, value.data);
        }
      },
      deep: true
    }
  },
  methods: {
    draw(title, data) {
        // console.log(data)
      let margin = { top: 50, right: 40, bottom: 80, left: 80 },
        width = 450 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      let bar_graph = d3
        .select("#" + this.id)
        .append("svg")
        .attr("viewBox", `0 0 450 400`)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      let x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function(d) {
            return d.name;
          })
        )
        .padding(0.2);
      bar_graph
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      let y = d3
        .scaleLinear()
        .domain([0, Math.ceil(data[0].latest / 100000) * 100000])
        .range([height, 0]);
      bar_graph.append("g").call(d3.axisLeft(y));

      bar_graph
        .selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) {
          return x(d.name);
        })
        .attr("y", function(d) {
          return y(d.latest);
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
          return height - y(d.latest);
        })
        .attr("fill", "#69b3a2");

      bar_graph
        .append("text")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(title);
    }
  }
};
</script>