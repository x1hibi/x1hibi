//Define the size of the box
let width=25


//Select characters
let alive="■"
let dead="□"

//Time of each generation in ms
var cicleTime= 100

//Declare array and make matrix and fill to zero
let board=[]

//Global variable
let boardString=""

// game status
let gameRunning=false

//Functions

// convert matrix to String 
function matrixToString(matrix){
    boardString=""
    matrix.forEach(row => {
        row.forEach(cell=>{
            boardString+=cell
        })
        boardString+="\n"
    });
}

//Insert text in board
function printBoardOnHTML(){
    boardElement.innerText=boardString
}
// Reference BOARD

function nextGeneration(){
    // Declare a copy array as reference 
    let previusBoard=[]

    // make a board of reference with not linked 
    for(let i=0;i<width;i++){
        previusBoard[i]=[]
        for(let j=0;j<width;j++){
            previusBoard[i][j]=board[i][j]

        }
    }

    // iteration for 9 points 
    for (let i=0;i<width;i++){
        for (let j=0;j<width;j++){
            
            let livingCell=Boolean(previusBoard[i][j]==alive)
            let cellsAround=0
            let xIndex=[i-1,i-1,i-1,i+0,i+0,i+1,i+1,i+1]
            let yIndex=[j-1,j+0,j+1,j-1,j+1,j-1,j+0,j+1]
            //Calculate the number of cell alive around of the current cell
            for(let n=0;n< xIndex.length ;n++){
                //check if point is not a undefine value and the center of 
                if( previusBoard[xIndex[n]] && previusBoard[xIndex[n]][yIndex[n]]){
                    // Check if the cell is alive or dead, add 1 to counter
                    cellsAround+=previusBoard[xIndex[n]][yIndex[n]]==alive ? 1 : 0
                }
            }
            
            // Game rules
            if(livingCell && (cellsAround<2 || cellsAround>3) ){
                board[i][j]=dead
                // console.log(i,j,"old",previusBoard[i][j],cellsAround,"die","new",board[i][j])
            }else if(!livingCell && cellsAround==3 ){
                board[i][j]=alive
                // console.log(i,j,"old",previusBoard[i][j],cellsAround,"reborn","new",board[i][j])
            }else{
                // console.log(i,j,"old",previusBoard[i][j],cellsAround,"no change","new",board[i][j])
            }
            //console.log("\n")
        }   
    }
}

function randomBoard(){
    // Fill matrix with ramdom values
    for (let i=0;i<width;i++){
        //Declare each array
        board[i]=[]
        for (let j=0;j<width;j++){
            let cell=Math.round(Math.random())
            board[i][j]=cell ? dead : alive
        }
    }
    // Convert first time the matrix 
    matrixToString(board)
    
    //print the board in html
    printBoardOnHTML()
}

randomBoard()

function gameLife(){
    // we run a promise
    new Promise((response)=>{
        nextGeneration()
        response()
    }).then(()=>{
        matrixToString(board)
    }).then(()=>{
        printBoardOnHTML()
    })
}


function startGame(){
    if (!gameRunning) {
        // handle user clicks
        gameRunning=true
        // get user initial conditions
        width=document.getElementById("width").value
        //cicleTime=document.getElementById("time").value
        // build a new board
        randomBoard()
        setInterval(() => {
            gameLife()
        }, cicleTime);
}
}


function updateBoard(){
    // get user initial conditions
    width=document.getElementById("width").value
    //cicleTime=document.getElementById("time").value
    // Clean the board
    boardElement.textContent=""
    // Re run random board
    randomBoard()
}