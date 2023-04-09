// Get data from freecodecamp
let url0 = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
// Get data from freecodecamp
let url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
let graphData0 = ""
let graphData = ""
let tool = document.getElementById("tooltip")


// Make a GET request to get data
fetch(url0).then(response => response.json())
          .then(data => {
            graphData0 = data
            requestCoords()
        })

function requestCoords() {
    // Make a GET request to get data
    fetch(url).then(response => response.json())
              .then(data => {
                graphData = data
                makeGraph(graphData)
            })
}

/**
 * Create a choropleth map
 * @param {Array} data - Data of scatter plot 
 */
function makeGraph(dataSet) {

    // Define size of graph using device size
    let width = 860
    let height = 560
    let padding = 0


    // Create graph container
    const svg = d3.select("#choroplethMap")
                .append("svg")
                .attr("width",width)
                .attr("height",height)

    //Define geoPath function to read geoJSON daat          
    let path = d3.geoPath()

    // Convert topojson to geoJSON
    let dataGeoJSON = topojson.feature(dataSet, dataSet.objects.counties)

    // Create a color scale 
    let colorDomainString=['#d5def5','#8594e4',' #6643b5','#430f58']
    let colorDomain=["2.6","20.725","38.85","56.975"]
    let colorScale = d3.scaleQuantize()
                       .domain([d3.min(graphData0,d=>d.bachelorsOrHigher),d3.max(graphData0,d=>d.bachelorsOrHigher)])
                       .range(colorDomainString) 


    // Create a legend scale
    let legendWidth= width/5
    let legendScale = d3.scaleLinear()
                .domain([d3.min(graphData0,d=>d.bachelorsOrHigher),d3.max(graphData0,d=>d.bachelorsOrHigher)])
                .rangeRound([0,legendWidth])

    const colorAxis = d3.axisBottom(legendScale).ticks(5).tickValues(["2.6","20.725","38.85","56.975","75.1"]).tickFormat(d3.format('.1f'));

                
    svg.append("g")
       .attr("class",'usaContanier')
       .selectAll()
        .data(dataGeoJSON.features)
        .enter()
        .append("path")
        .attr("class","county")
        .attr("d",path)
        .attr("data-fips",d=>d.id)
        .attr("data-education",d=>graphData0.find(countie=>countie.fips == d.id).bachelorsOrHigher)
        .attr("data-county",d=>graphData0.find(countie=>countie.fips == d.id).area_name)
        .attr("fill",d=>{
            let bachelorsOrHigher = graphData0.find(countie=>countie.fips == d.id).bachelorsOrHigher
            return colorScale(bachelorsOrHigher)
        }).on("mouseover",e=>{
            let county = e.target.getAttribute("data-county")
            let education = e.target.getAttribute("data-education")
            tool.setAttribute("data-county", county)
            tool.setAttribute("data-education", education)
            tool.style.display= "block"
            tool.children[0].textContent = `${county}: ${education}%`
            tool.style.left = `${e.clientX+15}px`
            tool.style.top = `${e.clientY}px`   
        })
        .on("mouseout", ()=>{
            tool.style.display= "none"
        })
    
    // Add a title
    svg.append("text")
        .attr("id","title")
        .attr("class", "graphTitle")
        .attr("text-anchor", "middle")
        .attr("y", 15)
        .attr("x", width/2)
        .attr("dy", ".75em")
        .text("United States Educational Attainment")
        
    // Add a description
    svg.append("text")
    .attr("id","description")
    .attr("class", "graphDescription")
    .attr("text-anchor", "middle")
    .attr("y", 50)
    .attr("x", width/2)
    .attr("dy", ".75em")
    .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)");

    // Create a sub axis as legend
    let legend = svg.append("g")
                    .attr("id","legend")
                    .attr("transform", `translate(${width/2},${padding/3})`)

    // Create rects for legend
    legend.selectAll("rect")
       .data(colorDomain)
       .enter()
       .append("rect")
       .attr("width",legendWidth*0.25)
       .attr("height",15)
       .attr("x",(d,i)=> i*(legendWidth*0.25)+35)  
       .attr("y",520-15)
       .attr("fill",d=> colorScale(d))
       .attr("stroke","black")

    // Add color axis
    legend.append("g")
        .attr("class","axis")
        .attr("transform", `translate(35,520)`)
        .call(colorAxis);

}