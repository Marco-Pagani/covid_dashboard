// set the dimensions and margins of the graph
function drawData(data) {

    var margin = { top: 50, right: 40, bottom: 80, left: 80 },
        width = 450 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var graph = d3.select("#dataviz")
        .append("svg")
        .attr("viewBox", `0 0 450 400`)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.country; }))
        .padding(0.2);
    graph.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    var y = d3.scaleLinear()
        .domain([0, Math.ceil(data[0].latest / 100000) * 100000])
        .range([height, 0]);
    graph.append("g")
        .call(d3.axisLeft(y));

    graph.selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.country); })
        .attr("y", function (d) { return y(d.latest); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.latest); })
        .attr("fill", "#69b3a2")

    graph.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Number of Cases by Country");
}
/*
function fetchData() {
    fetch('http://localhost:3000/getLatestGlobal', {
        method: 'post',
        body: JSON.stringify()
      }).then(function(response) {
        console.log(response);
        return drawData(response.json());
      }).then(function(data) {
        console.log(data);
      });
}

fetchData();
*/
(async () => {
    const rawResponse = await fetch('https://corona-stats-agent.herokuapp.com/getLatestGlobal', {
        method: 'post',
        body: JSON.stringify()
    });
    const content = await rawResponse.json();

    //console.log(content);
    drawData(content);
})();