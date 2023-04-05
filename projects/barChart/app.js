// Get data from freecodecamp
let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
let graphData = ""
let tool = document.getElementById("tooltip")

// Make a GET request to get data
fetch(url).then(response => response.json())
          .then(data => {
            graphData = data.data
            makeBarChart(graphData)
        })

/**
 * Create a bar chart with array of data
 * @param {Array} data - Data of bar chart
 */
function makeBarChart(dataSet) {

    // Check if graph exist 
    if (barChart.children.length != 0) {
        barChart.innerHTML=''
    }

    // Define size of graph using device size
    let width = barChart.offsetWidth
    let height = barChart.offsetHeight
    let padding = 50

    // Create graph container
    const svg = d3.select("#barChart")
                .append("svg")
                .attr("width",width)
                .attr("height",height)
                .attr("class","barchart")

    // Create a x scale
    const xScale = d3.scaleTime()
    .domain([Date.parse(d3.min(dataSet,d => d[0])),Date.parse(d3.max(dataSet,d => d[0]))])
    .range([padding,width - padding]); 

    // Create a y scale
    const yScale = d3.scaleLinear()
    .domain([d3.max(dataSet,d => d[1]),0])
    .range([padding,height - padding]);
    // Two ways to set a y scale 
    //.domain([0,d3.max(dataSet,d => d[1])])
    //.range([height - padding,padding]);    
     

    // Create axis
    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale);

    // Width size calculated
    let barWidth = (width - padding*2)/dataSet.length

    // Insert data into graph 
    svg.selectAll("rect")
       .data(dataSet)
       .enter()
       .append("rect")
       .attr("class","bar")
       .attr("data-date",d => d[0])
       .attr("data-gdp",d => d[1])
       .attr("title",d => d[1])
       .attr("x",d=> xScale(Date.parse(d[0])))  
       .attr("y",d => yScale(d[1]))
       .attr("width",barWidth)
       .attr("height", d => height - yScale(d[1]) - padding)
       .on("mouseover",e=>{
            let date0 = e.target.getAttribute("data-date")
            let date1 = e.target.getAttribute("data-gdp")
            tool.setAttribute("data-date", date0)
            tool.style.display= "block"
            tool.children[0].textContent = date0
            tool.children[2].textContent = date1
            tool.style.left = `${e.clientX+15}px`
            tool.style.top = `${e.clientY}px`   
         })
         .on("mouseout", ()=>{
            tool.style.display= "none"
        })

    // Add x axis
    svg.append("g")
    .attr("id","x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

    // Add y axis
    svg.append("g")
    .attr("id","y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

    // Add a title
    svg.append("text")
        .attr("id","title")
        .attr("class", "graphTitle")
        .attr("text-anchor", "middle")
        .attr("y", padding/3)
        .attr("x", width/2)
        .attr("dy", ".75em")
        .text("United States GDP");

    // Add a x axis label
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("class", "axisLabel")
    .attr("x", width - 5)
    .attr("y", height-padding)
    .text('Years');  
    
    // Add a y axis label
    svg.append("text")
    .attr("class", "axisLabel")
    .attr("text-anchor", "end")
    .attr("y", padding/3)
    .attr("x", padding)
    .attr("dy", ".75em")
    .text("GDP");

}

/*** Make a responsive graph ***/
window.addEventListener('resize', () => { 
    makeBarChart(graphData)
});