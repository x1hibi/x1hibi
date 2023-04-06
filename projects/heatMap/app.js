// Get data from freecodecamp
let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
let graphData = ""
let tool = document.getElementById("tooltip")

// Make a GET request to get data
fetch(url).then(response => response.json())
          .then(data => {
            graphData = data
            makeGraph(graphData)
        })

/**
 * Create a bar chart with array of data
 * @param {Array} data - Data of bar chart
 */
function makeGraph(dataSet) {

    // Check if graph exist 
    if (heatMap.children.length != 0) {
        heatMap.innerHTML=''
    }

    // Define size of graph using device size
    let width = heatMap.offsetWidth
    let height = heatMap.offsetHeight
    let padding = 70

    // Create a x scale
    const xScale = d3.scaleTime()
    .domain([Date.parse(d3.min(dataSet.monthlyVariance,d=>d.year)),Date.parse(d3.max(dataSet.monthlyVariance,d=>d.year))])
    .rangeRound([padding,width - padding]);

    // Static domain for months 
    let domainData=[0,1,2,3,4,5,6,7,8,9,10,11]
    // Create a y scale
    const yScale = d3.scaleBand()
    .domain(domainData)
    .range([padding,height - padding]);

    // Static data of color scale
    let interpolationCool = ['rgb(110, 64, 170)','rgb(100, 80, 195)','rgb(85, 99, 213)','rgb(67, 122, 224)','rgb(50, 146, 225)','rgb(35, 171, 216)','rgb(27, 194, 199)','rgb(26, 214, 176)','rgb(35, 230, 150)','rgb(54, 241, 124)']

    // Create a color scale 
    let colorScale = d3.scaleQuantize()
                       .domain([1.6,13.8])
                       .range(interpolationCool)     
                       

    // Create static data for legend axis                  
    let colorDomain = []
    let colorDomainString = []

    for (let i = 0; i < 10; i++) {
        let valueTemp=(1.61+i*1.22).toFixed(2)
        colorDomain[i]=parseFloat(valueTemp)
        colorDomainString[i]=valueTemp

    }

    // Create a legend scale
    let legendWidth= width/3
    let legendScale = d3.scaleLinear()
                .domain([1.6,13.8])
                .rangeRound([0,legendWidth])
                      

    // Create graph container
    const svg = d3.select("#heatMap")
                .append("svg")
                .attr("width",width)
                .attr("height",height)
                .attr("class","heatMap")
    let baseTemp = 8.66

    // Insert data into graph 
    svg.selectAll("rect")
       .data(dataSet.monthlyVariance)
       .enter()
       .append("rect")
       .attr("class","cell")
       .attr("x",d=> xScale(Date.parse(d.year)))  
       .attr("y",d=> yScale(d.month - 1))
       .attr("width",(width - padding*2 )/(263))
       .attr("height", (height - 2*padding)/12)
       .attr("data-month",d => d.month - 1)
       .attr("data-year",d => d.year)
       .attr("data-temp",d => baseTemp + d.variance)
       .attr("data-var",d => d.variance)
       .attr("fill",d => colorScale(baseTemp + d.variance))
       .on("mouseover",e=>{
        let year = e.target.getAttribute("data-year")
        let temp = e.target.getAttribute("data-temp")
        let variance = e.target.getAttribute("data-var")
        tool.setAttribute("data-year", year)
        tool.setAttribute("data-temp", temp)
        tool.setAttribute("data-var", variance)
        tool.style.display= "block"
        tool.children[0].textContent = `Year: ${year}`
        tool.children[2].textContent = `Temperature: ${temp}`
        tool.children[4].textContent = `Varience: ${variance}`
        tool.style.left = `${e.clientX+15}px`
        tool.style.top = `${e.clientY}px`   
    })
    .on("mouseout", ()=>{
        tool.style.display= "none"
    })
       
    // Create axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickValues(domainData)
    .tickFormat((d, i) => ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'][i]); 
    const colorAxis = d3.axisBottom(legendScale).ticks(12).tickValues([...colorDomainString,"13.81"]).tickFormat(d3.format('.1f'));

    // Create a sub axis as legend
    let legend = svg.append("g")
                    .attr("id","legend")
                    .attr("transform", `translate(${width/3},${padding/3})`)
       
    // Create rects for legend
    legend.selectAll("rect")
       .data(colorDomain)
       .enter()
       .append("rect")
       .attr("width",legendWidth*0.1)
       .attr("height",25)
       .attr("x",(d,i)=> i*(legendWidth*0.1))  
       .attr("y",0)
       .attr("fill",d=> colorScale(d))
       .attr("stroke","black")


    // Add color axis
    legend.append("g")
        .attr("transform", `translate(0,25)`)
        .call(colorAxis);
    
    
    // Add y axis
    svg.append("g")
        .attr("id","x-axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    // Add y axis
    svg.append("g")
    .attr("id","y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

}

/*** Make a responsive graph ***/
window.addEventListener('resize', () => { 
    makeGraph(graphData)
});