<template>
  <div :id="this.id" />
</template>

<script>
import * as d3 from "d3";

export default {
  props: ["id"],
  methods: {
    draw(title, data) {
      let margin = { top: 50, right: 40, bottom: 80, left: 80 },
        width = 450 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      d3.selectAll("#" + this.id + " > *").remove();
      let linegraph = d3
        .select("#" + this.id)
        .append("svg")
        .attr("viewBox", `0 0 450 400`)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      let x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return d.date;
          })
        )
        .range([0, width])
        .nice();
      linegraph
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "18px");

      // Add Y axis
      let y = d3
        .scaleLog()
        .base(10)
        .domain([
          1,
          d3.max(data, function (d) {
            return +d.value;
          }),
        ])
        .range([height, 0])
        .nice();
      linegraph
        .append("g")
        .call(d3.axisLeft(y).ticks(5, "~s"))
        .selectAll("text")
        .style("font-size", "18px");

      // Add the line
      linegraph
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              // console.log(x(d.date))
              return x(d.date);
            })
            .y(function (d) {
              return y(d.value);
            })
        );

      linegraph
        .append("text")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "600")
        .text(title);

      d3.select(this).style("font-size", "22px");
    },
  },
};
</script>