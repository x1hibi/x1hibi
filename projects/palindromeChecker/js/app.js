// Define elements used 
let inputElement = document.getElementById("input")
let spinnerElement = document.getElementById("spinner")
let iconElement = document.getElementById("icon")

/**
 * Clean a typed string and check if is a palindrome
 */

function palindromeChecker() {
    // get input value 
    let string=inputElement.value
    // check only string bigger than 1
    if(string.length > 1){
        // define a regular expresion that match all especial characteres 
        let regex= /\s|!|@|#|%|&|-|_|\.|,|\(|\)|\:|\/|\|/g
        //We replace all the special characters using regex and convert the string to lower case
        let cleanString=string.replace(regex,"").toLowerCase()
        // get int of half lenght of the string
        let halfLength=Math.floor(cleanString.length/2)
        let counter=0
        //We make a loop to compare all the characteres with the oposite character
        for(let i=0;i<halfLength;i++){
            cleanString[i] == cleanString[cleanString.length-1-i] ? counter++ : false
        }
        // Set correct icon 
        iconElement.children[0].className = counter==halfLength ? 'fas fa-check title-responsive-text icon-result-check' : 'fas fa-times title-responsive-text icon-result-times'
        // display result
        displayResult(true)
    }else{
        inputElement.focus()
    }
}

/**
 * Clean input value
 */

function deleteString(){
    // clean input 
    input.value = ""
    displayResult(false)
}

/**
 * Toggle the display style of result element
 * @param {Boolean} show - New status of display 
 */

function displayResult(show){
    // select value
    iconValue = show ? 'flex' : 'none'
    spinnerValue = show ? 'none' : 'inline-block'
    // set properties
    iconElement.style.setProperty("display", iconValue, "important")
    spinnerElement.style.setProperty("display", spinnerValue, "important")
}

// listener for enter key call to palindromeChecker
input.addEventListener("keyup", event => {
    //check key code 
    if (event.key == 'Enter') {
        palindromeChecker();
    }
});