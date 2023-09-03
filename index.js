import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

d3.json('test_data.json').then(function(data) {
    const ledCounts = Array(8).fill(0);

    const ledInfo = [
        { name: "LED 0", color: "red" },
        { name: "LED 1", color: "blue" },
        { name: "LED 2", color: "green" },
        { name: "LED 3", color: "orange" },
        { name: "LED 4", color: "purple" },
        { name: "LED 5", color: "pink" },
        { name: "LED 6", color: "yellow" },
        { name: "LED 7", color: "brown" }
    ];

    data.forEach(function(d) {
        ledCounts[d.LED] += 1;
    });

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const bubble = d3.pack()
        .size([width, height])
        .padding(5);

    const root = d3.hierarchy({ children: ledCounts })
        .sum(function(d) { return d; });

    bubble(root);

    const node = svg.selectAll(".node")
        .data(root.children)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + (d.x + margin.left) + "," + (d.y + margin.top) + ")"; });

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(ledCounts)]);

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) {
            const ledIndex = root.children.indexOf(d);
            return colorScale(ledCounts[ledIndex]);
        })
        .on("mouseover", function(d, i) {
            const ledCount = i.data;
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html("Genauer Wert: " + ledCount)
                .style("left", (d.pageX) + "px")
                .style("top", (d.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d, i) { return ledInfo[i].name; });
});