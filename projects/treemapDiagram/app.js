// Get data from freecodecamp
let url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
let graphData = ""
let tool = document.getElementById("tooltip")

// Make a GET request to get data
fetch(url).then(response => response.json())
          .then(data => {
            graphData = data
            makeGraph(graphData)
        })

/**
 * Create a treemap diagram with array of data
 * @param {Array} data - Data of treemap diagram
 */
function makeGraph(dataSet) {

    // Check if graph exist 
    if (treemapDiagram.children.length != 0) {
        treemapDiagram.innerHTML=''
    }

    // get current size of container
    let width = treemapDiagram.offsetWidth
    let height = treemapDiagram.offsetHeight
    let padding = 50

    // Create graph container
    const svg = d3.select("#treemapDiagram")
                .append("svg")
                .attr("width",width)
                .attr("height",height-1.5*padding)
                .attr("class","treemapDiagram")

    // Pass data to root 
    var root = d3.hierarchy(dataSet).sum(d =>d.value)

    // Create a color scale 
    // Static domain for months 
    let domainData=["2600","Wii","NES","GB","DS","X360","PS3","PS2","SNES","GBA","PS4","3DS","N64","PS","XB","PC","PSP","XOne"]
    // Create a color scale (discrete scale 1:1)
    const colorScale = d3.scaleOrdinal()
    .domain(domainData)
    .range(["rgb(181, 212, 233,0.95)","rgb(181, 212, 233)","rgb(147, 195, 223,0.95)","rgb(147, 195, 223)","rgb(109, 174, 213,0.95)","rgb(109, 174, 213)","rgb(75, 151, 201,0.95)","rgb(75, 151, 201)","rgb(47, 126, 188,0.95)","rgb(47, 126, 188)","rgb(24, 100, 170,0.95)","rgb(24, 100, 170)","rgb(10, 74, 144,0.95)","rgb(10, 74, 144)","rgb(8, 48, 107,0.95)","rgb(8, 48, 107)","rgb(3, 34, 79,0.95)","rgb(3, 34, 79)"]);

    // Declare a treemap
    d3.treemap()
      .size([width,height-3*padding+10])
      .padding(2)(root)

    // General container
    let treemapContanier = svg.append('g')
                              .attr("transform",`translate(0,${padding+10})`);

    let gContanier = treemapContanier.selectAll('rect')
       .data(root.leaves())
       .enter()
       .append("g")

    // Create each rect of the treemap
    gContanier.append('rect')
       .attr('class','tile')
       .attr('x',d=>d.x0)
       .attr('y',d=>d.y0)
       .attr('width',d=>d.x1 - d.x0)
       .attr('height',d=>d.y1 - d.y0)
       .attr('data-name',d=>d.data.name)
       .attr('data-category',d=>d.data.category)
       .attr('data-value',d=>d.data.value)
       .on("mouseover",e=>{
            let data0 = e.target.getAttribute('data-name')
            let data1 = e.target.getAttribute('data-category')
            let data2 = e.target.getAttribute('data-value')
            tool.setAttribute('data-name', data0)
            tool.setAttribute('data-category', data1)
            tool.setAttribute('data-value', data2)
            tool.style.display= "block"
            tool.children[0].textContent = `Name: ${data0}`
            tool.children[2].textContent = `Category: ${data1}`
            tool.children[4].textContent = `Value: ${data2}`
            tool.style.left = `${e.clientX+15}px`
            tool.style.top = `${e.clientY}px`   
        })
        .on("mouseout", ()=>{
            tool.style.display= "none"
        })
       .style('stroke','black')
       .style('fill',d=>colorScale(d.data.category))


    // Create each text inside of g container     
    gContanier.append('text')
              .attr('x',d=>d.x0+5)
              .attr('y',d=>d.y0+10)
              .style('text-shadow','1px 0 1px #ffffff69, -1px 0 1px #ffffff69, 0 1px 1px #ffffff69, 0 -1px 1px #ffffff69,1px 1px #ffffff69, -1px -1px #ffffff69, 1px -1px #ffffff69, -1px 1px #ffffff69')
              .selectAll('tspan')
              .data(d=>{
                    let arrayData=[]
                    let wordBreak=d.data.name.split(' ')
                    for (let i = 0; i < 3; i++) {
                        arrayData.push([wordBreak[i],d.x0,d.y0])
                        }
                    return arrayData
                    })
                .enter()
                .append('tspan')
                .text(d=>d[0])
                .attr('x',d=>d[1]+2.5)
                .attr('y',(d,i)=>d[2]+10*i+10)
                .attr('fill','black')
                .attr('font-size','0.5rem')

    // Create a svg for legends
    let legend = d3.select("#treemapDiagram")
                    .append("svg")
                    .attr("id","legend")
                    .attr("class","treemapDiagram2")
                    .append("g")
                    .attr("transform",`translate(0,0)`);

    // Print labels by colums
    domainData.forEach((category,i) => {

        let xPosition= i < 3 ? 0 :
                       i < 6 ? 50 : 
                       i < 9 ? 100 : 
                       i < 12 ? 150 : 
                       i < 15 ? 200 : 250

        let yPosition= i < 3 ? i :
                       i < 6 ? i-3 : 
                       i < 9 ? i-6 : 
                       i < 12 ? i-9 : 
                       i < 15 ? i-12 : i-15

        let gLegend= legend.append("g")
                           .attr("transform",`translate(${xPosition},${yPosition*20})`);

        gLegend.append("rect")
            .attr("class","legend-item")
            .attr("width","15px")
            .attr("height","15px")
            .attr("fill",colorScale(category))
            .attr("ry","3px")
            .attr("stroke","darkblue")
         gLegend.append("text")
            .text(category)
            .attr("fill","black")
            .attr("dy","13px")
            .attr("dx","18px")
            .attr("font-size","12px")
    })

    // Add a title
    svg.append("text")
        .attr("id","title")
        .attr("class", "graphTitle")
        .attr("text-anchor", "middle")
        .attr("y", padding/2 + 10)
        .attr("x", width/2)
        .text("Video Game Sales");

    // Add a title
    svg.append("text")
    .attr("id","description")
    .attr("class", "graphDescription")
    .attr("text-anchor", "middle")
    .attr("y", padding+5)
    .attr("x", width/2)
    .text("Top 100 Most Sold Video Games Grouped by Platform");

}

/*** Make a responsive graph ***/
window.addEventListener('resize', () => { 
    makeGraph(graphData)
});