<template>
  <div id="map" />
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";
import us from "@/data/states-albers-10m.json";
export default {
  mounted() {
      this.draw([])
  },
  methods: {
    draw(data) {
        console.log(data);
        console.log(d3.version);
        
      //let margin = { top: 50, right: 40, bottom: 80, left: 80 }
        //width = 450 - margin.left - margin.right,
        //height = 400 - margin.top - margin.bottom;
      let path = d3.geoPath();

      let svg = d3
        .select("#map")
        .append("svg")
       .attr("viewBox", [0, 0, 975, 610]);

svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
      //.attr("fill", d => color(data.get(d.properties.name)))
      .attr("d", path)
    
    svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

      
        //console.log(map, svg, path);
    },
  },
};
</script>