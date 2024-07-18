const { createApp } = Vue

  createApp({
    data() {
      return {
        isMobile:/Mobile/.test(navigator.userAgent),
        monthValue:1,
        normalSave:true,
        simpleInterest:false,
        age:18,
        dataSet2:[],
        dataSet:[],
        dataSet0:[]

      }
    },
    mounted(){
        // Create a default graph
        this.interestData()

        // Rebuild graph in any resize
        window.addEventListener('resize', () => { 
            //this.createGraph(this.dataSet)
        });

        // asign default values for tritans and analytes
        //this.titrantNames=this.baseNames
        //this.analyteNames=this.acidNames

    },
    methods:{
        /**
         * Display the clicked menu in mobile view
         * @param {String} type - Type of menu
         */
        showMenu(type){
            // Check the type menu and add or remove class to show menu
            type=="burger" ? ( navigationMenu.classList.toggle("show-menu"),settingsButton.classList.toggle("hide-button"))
                           :   settingsMenu.classList.toggle("show-menu");
            // Remove scroll in body in desktop, more estetic
            if (!this.isMobile) {
                body.classList.toggle("non-scroll")
            }
        },
        /**
         * Create a dataset (vol(ml),pH) for a titulation of strong acid and strong basis and call createGraph function
         */
        interestData() {

            this.dataSet=[]
            // Calculo de ahorro por años línea recta 
            let avalibleTime = this.age
            console.log(avalibleTime)

            // ahorro normal
            // for (let i = 0; i < avalibleTime; i++) {
            //     // Multiplicamos el monto mensual por 12
            //     const anualValue=this.monthValue*12
            //     let numberOfYear = (i+1)
            //     let acumulatedValue=anualValue*numberOfYear
            //     this.dataSet0[i]=[numberOfYear,acumulatedValue]
            // }

            // ahorro normal
            for (let i = 0; i < avalibleTime; i++) {
                // Multiplicamos el monto mensual por 12
                const anualValue=this.monthValue
                let numberOfYear = (i+1)
                let acumulatedValue=anualValue*numberOfYear
                this.dataSet0[i]=[numberOfYear,acumulatedValue]
            }



            let tasa = 10
            // Interés simple
            // for (let i = 0; i < avalibleTime; i++) {
            //     // Multiplicamos el monto mensual por 12
            //     const anualValue=this.monthValue*12
            //     let numberOfYear = (i+1)
            //     let acumulatedValue=anualValue*(1+(tasa/100)*numberOfYear)
            //     this.dataSet2[i]=[numberOfYear,acumulatedValue]
            // }
            for (let i = 0; i < avalibleTime; i++) {
                // Multiplicamos el monto mensual por 12
                const anualValue=this.monthValue
                let numberOfYear = (i+1)
                let acumulatedValue=anualValue
                if (i>0) {
                    console.log(this.dataSet2[i-1][1]+anualValue)
                    acumulatedValue=(this.dataSet2[i-1][1]+anualValue)*(1+(tasa/100))
                }
                this.dataSet2[i]=[numberOfYear,acumulatedValue]
            }
            console.log( this.dataSet2)


            // interés compuesto
            for (let i = 0; i < avalibleTime; i++) {
                // Multiplicamos el monto mensual por 12
                const anualValue=this.monthValue*12
                let numberOfYear = (i+1)
                let acumulatedValue=anualValue*(1+(tasa/100))**numberOfYear
                
                this.dataSet[i]=[numberOfYear,acumulatedValue]
            }
    
            let dataSet = [...this.dataSet0,...this.dataSet2]
            console.log(dataSet)
            this.createGraph(dataSet)

        },
        /**
         * Create a scatter plot with dataset values 
         * @param {Array} dataSet - [tritantVolume,pHValues]
         */
        createGraph(dataSet){

            //check if graph exist and delete it if exist
            if (graph.children.length != 0) {
                graph.innerHTML=''
            }


            // Get width and height of graph element 
            let width = graph.offsetWidth
            let height = graph.offsetHeight
            let padding = 100

            // Create a svg element inside graph element
            const svg = d3.select('#graph')
                           .append("svg")
                           .attr("width",width)
                           .attr("height",height)
            // Define x scale for volumen 
            const xScale = d3.scaleLinear()
                             .domain([0,d3.max(dataSet,d=>d[0])])
                             .range([padding, width - padding/2]);
            // Define y scale for pH 
            const yScale = d3.scaleLinear()
                             .domain([0,d3.max(dataSet,d=>d[1])])
                             .range([height - padding,padding]);

            // Create axis
            const xAxis = d3.axisBottom(xScale)
            const yAxis = d3.axisLeft(yScale)
            // Create grid
            const xAxisGrid = d3.axisBottom(xScale).tickSize(-height+2*padding).tickFormat('')
            const yAxisGrid = d3.axisLeft(yScale).tickSize(-width+padding*1.5).tickFormat('')


            // Insert data into graph 
            svg.selectAll("circle")
               .data(dataSet)
               .enter()
               .append("circle")
               .attr("class","graph-dot")
               .attr("cx",d => xScale(d[0]))  
               .attr("cy",d => yScale(d[1]))
               .attr("r", 5)
               .attr("data-vol",d => (d[0]))
               .attr("data-pH",d => (d[1]))
               .on("mouseover",e=>{
                    let vol = e.target.getAttribute("data-vol")
                    let pH = Math.round(e.target.getAttribute("data-pH"))
                    tooltip.style.display= "block"
                    tooltip.children[0].textContent = `Ahorro: ${pH} MX`
                    tooltip.children[2].textContent = `Tiempo: ${vol} años`
                    tooltip.style.left = `${e.clientX+15}px`
                    tooltip.style.top = `${e.clientY}px`   
                })
                .on("mouseout", ()=>{
                    tooltip.style.display= "none"
                })

             

            // Add x axis
            svg.append("g")
                .attr("class","axis-g")
                .attr("id","x-axis")
                .attr("transform", "translate(0," + (height - padding) + ")")
                .call(xAxis);

            // Add y axis
            svg.append("g")
                .attr("class","axis-g")
               .attr("id","y-axis")
               .attr("transform", "translate(" + padding + ",0)")
              .call(yAxis);

            // Create grids
            svg.append('g')
            .attr('class', 'axis-grid')
            .attr('transform', `translate(0,${height-padding})`)
            .call(xAxisGrid);

            svg.append('g')
            .attr('class', 'axis-grid')
            .attr('transform', `translate(${padding},0)`)
            .call(yAxisGrid);

            // Define title with analyte and tritant and its concentrations
            let title = "Ahorro vs Interés compuesto"

            // Add a title
            svg.append("text")
               .attr("id","title")
               .attr("class", "graph-title")
               .attr("text-anchor", "middle")
               .attr("y", padding/3)
               .attr("x", width/2)
               .attr("dy", ".75em")
               .text(title);

            // Define x axis label with tritant name and its concentrations
            let label = "Tiempo (años)"

            // Add a x axis
            svg.append("text")
               .attr("text-anchor", "middle")
               .attr("class", "axis-label")
               .attr("x", width/2)
               .attr("y", height - padding/3)
               .text(label);  

            // Add a y axis
            svg.append("text")
               .attr("class", "axis-label")
               .attr("text-anchor", "end")
               .attr("y", height/2 - 7)
               .attr("x", padding/2)
               .attr("dy", ".75em")
               .text("Pesos");
        },
        changeInputValue(status){
            // update graph
            console.log("entre")
            status == 0 ? this.interestData() : this.createGraph(this.dataSet)
        }

    }
  }).mount('#app')