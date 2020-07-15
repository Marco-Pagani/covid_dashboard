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
      console.log("chart got data:");
      console.log(data);
      var margin = { top: 50, right: 40, bottom: 80, left: 80 },
        width = 450 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      d3.selectAll("#" + this.id + " > *").remove();
      var linegraph = d3
        .select("#" + this.id)
        .append("svg")
        .attr("viewBox", `0 0 450 400`)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var linedata = [];
      Object.keys(data).map(function(key) {
        linedata.push({
          date: d3.timeParse("%Y-%m-%dT%H:%M:%SZ")(key),
          value: data[key]
        });
      });

      // console.log(linedata);

      // Add X axis --> it is a date format
      var x = d3
        .scaleTime()
        .domain(
          d3.extent(linedata, function(d) {
            return d.date;
          })
        )
        .range([0, width]);
      linegraph
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3
        .scaleLog()
        .domain([
          1,
          d3.max(linedata, function(d) {
            return +d.value;
          })
        ])
        .range([height, 0]);
      linegraph.append("g").call(d3.axisLeft(y));

      // Add the line
      linegraph
        .append("path")
        .datum(linedata)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
        .attr(
          "d",
          d3
            .line()
            .x(function(d) {
              return x(d.date);
            })
            .y(function(d) {
              return y(d.value);
            })
        );

      linegraph
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