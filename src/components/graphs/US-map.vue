<template>
  <div id="map" />
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";
import us from "@/data/states-albers-10m.json";

import axios from "axios";
const axi = axios.create();

export default {
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axi
        .get("https://api.covidtracking.com/v1/states/current.json")
        .then((res) => {
          // keep only the data we need and format it
          let data = res.data.map(function (state) {
            return {
              name: state.state,
              id: state.fips,
              cases: state.positive,
              delta: state.positiveIncrease,
            };
          });
          // draw the resulting map
          this.draw(data);
        });
    },
    draw(data) {
      // heavily derived from https://observablehq.com/@d3/state-choropleth
      // color scale
      let maxCases = Math.max(...data.map((el) => el.cases), 0);
      let color = d3.scaleQuantize([0, maxCases], d3.schemeReds[6]);

      // create svg
      let svg = d3
        .select("#map")
        .append("svg")
        .attr("viewBox", [0, 0, 975, 610]);

      // add states
      let path = d3.geoPath();
      svg
        .append("g")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .join("path")
        .attr("fill", (d) => color(data.find((el) => el.id == d.id).cases))
        .attr("d", path);

      // add state borders
      svg
        .append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("d", path);

      // add national border
      svg
        .append("path")
        .datum(topojson.mesh(us, us.objects.nation))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("d", path);
    },
  },
};
</script>

