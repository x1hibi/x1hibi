//Define the size of the box
let height=10
let width=10
let size=10

//Select characters
let alive="o"
let dead="x"

//Time of each generation in ms
cicleTime=1500

//Declare array and make matrix and fill to zero
let boardRef=[]
let board=[]

//Global variable
let boardString=""

// Find container in html, global variable
let boardElement=document.getElementById("board")

//Functions

// convert matrix to String 
function matrixToString(matrix){
    boardString=""
    console.log("one")
    matrix.forEach(row => {
        row.forEach(cell=>{
            boardString+=cell+" "
        })
        boardString+="\n"
    });
    console.log("finish conversion")
}

//Insert text in board
function printBoardOnHTML(){
    // Change board
    boardElement.innerText=boardString
    //print in console
    console.log(boardString)
}





// Reference BOARD

// Fill matrix with ramdom values
for (let i=0;i<width;i++){
    //Declare each array
    boardRef[i]=[]
    for (let j=0;j<width;j++){
        let cell=Math.round(Math.random())
        boardRef[i][j]=cell ? dead : alive
    }
}

// Convert first time the matrix 
matrixToString(boardRef)

//print the board in html
printBoardOnHTML()




function nextGeneration(){
    // Declare a copy array as reference 
    const previusBoard=boardRef.slice(0)
    board=boardRef.slice(0)
    // iteration for 9 points 
    for (let i=0;i<width;i++){
        console.log("3")
        
        for (let j=0;j<height;j++){
            // let i=0
            // let j=0
            let livingCell=Boolean(previusBoard[i][j]==alive)
            // console.log("////////////////",i+1,j+1)
            // console.log("current esatus",previusBoard[i][j])
            console.log(i,j,"old",previusBoard[i][j])
            let cellsAround=0
            let xIndex=[i-1,i-1,i-1,i+0,i+0,i+1,i+1,i+1]
            let yIndex=[j-1,j+0,j+1,j-1,j+1,j-1,j+0,j+1]
            //Calculate the number of cell alive around of the current cell
            for(let n=0;n< xIndex.length ;n++){
                //check if point is not a undefine value and the center of 
                if( previusBoard[xIndex[n]] && previusBoard[xIndex[n]][yIndex[n]]){
                    // Check if the cell is alive or dead, add 1 to counter
                    cellsAround+=previusBoard[xIndex[n]][yIndex[n]]==alive ? (console.log(xIndex[n],yIndex[n]),1) : 0
                }
            }
            

            // Game rules
            if(livingCell && cellsAround<2 || cellsAround>3 ){
                board[i][j]=dead
                console.log(i,j,"old",previusBoard[i][j],cellsAround,"die","new",board[i][j])
            }else if(!livingCell && cellsAround==3 ){
                console.log(i,j,"old",previusBoard[i][j],cellsAround,"reborn","new",board[i][j])
                board[i][j]=alive
            }else{
                console.log(i,j,"old",previusBoard[i][j],cellsAround,"no change","new",board[i][j])

            }
            console.log("\n")

            if (i==0 && j==9) {
                console.log("boardRef",previusBoard[0])
                console.log("board",board[0])
            }


            
        }

        return true 
        
    }
    
}



function gameLife(){
    // we run a promise
    new Promise((response)=>{
        //here slice 
        response()
    }).then(()=>{
        //nextGeneration()
        nextGeneration()
    }).then(()=>{

        matrixToString(board)
    }).then(()=>{
        //printBoardOnHTML()
        console.log("after responose")
    })
}

setTimeout(() => {
    gameLife()
}, cicleTime);

