function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
  
function drawData(data) {

    var margin = { top: 50, right: 40, bottom: 80, left: 80 },
        width = 450 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var graph = d3.select("#cases_by_country")
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

    var linegraph = d3.select("#us_timeline")
        .append("svg")
        .attr("viewBox", `0 0 450 400`)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var linedata = [];
    Object.keys(data[0].history).map(function (key) {
        linedata.push({
            date: d3.timeParse("%m/%d/%Y")(key),
            value: data[0].history[key]
        });
    });

    console.log(linedata);

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
        .domain(d3.extent(linedata, function (d) { return d.date; }))
        .range([0, width]);
    linegraph.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLog()
        .domain([1, d3.max(linedata, function (d) { return +d.value; })])
        .range([height, 0]);
    linegraph.append("g")
        .call(d3.axisLeft(y));


    // Add the line
    linegraph.append("path")
        .datum(linedata)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d.date) })
            .y(function (d) { return y(d.value) })
        )


    linegraph.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("US Cases over Time");

}

function drawSummary(latest) {
    console.log(latest);
    var data =
        [
            {
                type: 'cases',
                value: (latest.confirmed - latest.deaths - latest.recovered)
            },
            {
                type: 'deaths',
                value: latest.deaths
            },
            {
                type: 'recovered',
                value: latest.recovered
            },
    ]
    var offset = 0;
    data = data.map(d => {
        
        offset += d.value;
        return {
            type: d.type,
            value: d.value,
            offset: offset - d.value
        }
    });
    var total = latest.confirmed;

    console.log(data);
    var margin = { top: 20, right: 10, bottom: 20, left: 10 },
        width = 800,
        height = 70,
        barHeight = 50,
        colors = ['#ffdd57', '#ff3860', '#48c774'];

    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom
    const halfBarHeight = barHeight / 2

    const xScale = d3.scaleLinear()
        .domain([0, total])
        .range([0, w])

    const selection = d3.select("#summary")
        .append('svg')
        .attr("viewBox", `0 0 800 70`)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    selection.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('class', 'rect-stacked')
        .attr('x', function (d) { return xScale(d.offset) })
        .attr('y', h / 2 - halfBarHeight)
        .attr('height', barHeight)
        .attr('width', function (d) {return xScale(d.value) })
        .style('fill', (d, i) => colors[i])
    
    
    data.map(d => document.getElementById(d.type).textContent = formatNumber(d.value));
    document.getElementById('total').textContent = formatNumber(offset);
}


(async () => {
    const rawResponse = await fetch('https://corona-stats-agent.herokuapp.com/all', {
        method: 'post',
        body: JSON.stringify()
    });
    const content = await rawResponse.json();

    console.log(content);

    var top = content.confirmed.locations;
    top = top.sort(function compare(a, b) {
        return b.latest - a.latest;
    });
    top.length = 7;
    top.forEach(function (country) {
        console.log(country.country + ": " + country.latest);
    });


    drawData(top);
    drawSummary(content.latest);
})();