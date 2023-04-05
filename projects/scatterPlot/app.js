// Get data from freecodecamp
let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
let graphData = ""
let tool = document.getElementById("tooltip")

// Make a GET request to get data
fetch(url).then(response => response.json())
          .then(data => {
            graphData = data
            makeBarChart(graphData)
        })

/**
 * Create a bar chart with array of data
 * @param {Array} data - Data of bar chart
 */
function makeBarChart(dataSet) {

    // Check if graph exist 
    if (scatterplot.children.length != 0) {
        scatterplot.innerHTML=''
    }

    // Define size of graph using device size
    let width = scatterplot.offsetWidth
    let height = scatterplot.offsetHeight
    let padding = 50

    // Create a x scale
    const xScale = d3.scaleTime()
    .domain([Date.parse(d3.min(dataSet,d => d.Year)),Date.parse(d3.max(dataSet,d => d.Year))])
    .range([padding,width - padding]);
    
    // Alternative option to represent date
    //let minDate = Date.parse(`1970 00:${d3.max(dataSet,d => d.Time)}`)
    //let maxDate = Date.parse(`1970 00:${d3.min(dataSet,d => d.Time)}`)
    let maxDate = new Date(`1970-01-01 00:${d3.max(dataSet,d => d.Time)}`)
    let minDate = new Date(`1970-01-01 00:${d3.min(dataSet,d => d.Time)}`)
    
    // Create a y scale
    const yScale = d3.scaleTime()
    .domain([minDate,maxDate])
    .range([padding,height - padding]);

    // Create graph container
    const svg = d3.select("#scatterplot")
                .append("svg")
                .attr("width",width)
                .attr("height",height)
                .attr("class","scatterplot")

    // Insert data into graph 
    svg.selectAll("circle")
       .data(dataSet)
       .enter()
       .append("circle")
       .attr("class","dot")
       .attr("fill",d=>{
            if (d.Doping == "") {
                return "darkRed"
            }else{
                return "url(#my-cool-gradient)"
            }
       })
       .attr("cx",d=> xScale(Date.parse(d.Year)))  
       .attr("cy",d=> yScale(new Date(`1970-01-01 00:${d.Time}`)))
       .attr("r", 5)
       .attr("data-xvalue",d => d.Year)
       .attr("data-yvalue",d => new Date(`1970-01-01 00:${d.Time}`).toISOString())
       .on("mouseover",e=>{
            let data = e.target.getAttribute("data-xvalue")
            let data1 = e.target.getAttribute("data-yvalue")
            tool.setAttribute("data-year", data)
            tool.setAttribute("data-time", data1)
            tool.style.display= "block"
            tool.children[0].textContent = `Year: ${data}`
            tool.children[2].textContent = `Time: ${new Date(data1).getMinutes()}:${new Date(data1).getSeconds()}`
            tool.style.left = `${e.clientX+15}px`
            tool.style.top = `${e.clientY}px`   
        })
        .on("mouseout", ()=>{
            tool.style.display= "none"
        })

    // Create axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

    svg.append("g")
    .attr("id","x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

    // Add y axis
    svg.append("g")
    .attr("id","y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

    // Add legend (semi responsive)
    let xposition = scatterplot.offsetWidth*(555/923)
    let yposition = padding + 10

    let legend=svg.append("g").attr("id","legend")
    legend.append("text").attr("transform",`translate(${xposition+15},${yposition+10})`).text("Cyclists with alleged drug")
    legend.append("rect").attr("transform",`translate(${xposition},${yposition})`).attr("class","legendCircle").attr("fill","darkred")
    legend.append("text").attr("transform",`translate(${xposition+15},${yposition+30})`).text("Cyclists with not alleged drug") 
    legend.append("rect").attr("transform",`translate(${xposition},${yposition+20})`).attr("class","legendCircle").attr("fill","url(#my-cool-gradient)")


    // Add a title
    svg.append("text")
        .attr("id","title")
        .attr("class", "graphTitle")
        .attr("text-anchor", "middle")
        .attr("y", padding/3)
        .attr("x", width/2)
        .attr("dy", ".75em")
        .text("Doping in Professional Bicycle Racing");

    // Add a y axis
    svg.append("text")
       .attr("text-anchor", "end")
       .attr("class", "axisLabel")
       .attr("x", width - 5)
       .attr("y", height-padding)
       .text('Years');  
    
    // Add a x axis
    svg.append("text")
       .attr("class", "axisLabel")
       .attr("text-anchor", "end")
       .attr("y", padding/3)
       .attr("x", 1.25*padding)
       .attr("dy", ".75em")
       .text("Time");

}

/*** Make a responsive graph ***/
window.addEventListener('resize', () => { 
    makeBarChart(graphData)
});