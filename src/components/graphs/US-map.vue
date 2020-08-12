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
  data() {
    return {
      selected: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axi
        .get("https://api.covidtracking.com/v1/states/current.json")
        .then((res) => {
          // keep only the data we need and format it
          let data = new Map(
            res.data.map((state) => [
              state.fips,
              {
                name: state.state,
                id: state.fips,
                cases: state.positive,
                delta: state.positiveIncrease,
              },
            ])
          );
          // draw the resulting map
          this.draw(data);
        });
    },
    selectState(id) {
      console.log(id);
      this.selected = id;
    },
    draw(data) {
      // heavily derived from https://observablehq.com/@d3/state-choropleth
      // color scale
      let maxCases = 0;
      data.forEach(function (value) {
        maxCases = Math.max(maxCases, value.cases);
      });
      let color = d3.scaleQuantize([0, maxCases], d3.schemeReds[6]);

      // create svg
      let _svg = d3
        .select("#map")
        .append("svg")
        .attr("viewBox", [0, 0, 975, 610]);

      // add states
      let path = d3.geoPath();
      _svg
        .append("g")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .join("path")
        .attr("fill", (d) => color(data.get(d.id).cases))
        .attr("d", path)
        .on("mouseenter", function () {
          //console.log(this)
          d3.select(this).attr("fill", d3.interpolateBlues(0.5));
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", (d) => color(data.get(d.id).cases));
        })
        .on("click", (d) => {
          this.selectState(d.id);
        })
        .on("click", function() {
          console.log("click")
          d3.select(".selected").classed("selected", false);
          d3.select(this).classed("selected", true);
        });

      // add state borders
      _svg
        .append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("d", path);

      // add national border
      _svg
        .append("path")
        .datum(topojson.mesh(us, us.objects.nation))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("d", path);
    },
    /*
    selected() {
      d3.select('.selected').classed('selected', false);
      d3.select(this).classed('selected', true);
    }*/
  },
};
</script>

<style>
.selected {
  fill: rgb(10,41,120);
}
</style>