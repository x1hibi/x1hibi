

// url with data 
let dataURL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"


let barChartData = ""

// Make a get request and save data in barChartData
axios.get(dataURL).then(response=>{
    barChartData = response.data.data
    console.log(barChartData)
    // Define dimensions for svg 

    let width = 1000
    let height = 500

    // Create a container for bar chart

    const svg = d3.select('#barChartContainer')
                  .append("svg")
                  .attr("width",width)
                  .attr("height",height)

        // Insert data into svg

    svg.selectAll("rect")
    .data(barChartData)
    .enter()
    .append("rect")
    .attr("height",data=>{
        return data[1]*0.01
    })
    .attr("width",2)
    .attr("x",(data,index)=>{
        return index*2
    })
    .attr("y",data=>{
        return height-data[1]*0.01
    })



})
