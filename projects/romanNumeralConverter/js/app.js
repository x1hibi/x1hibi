// Define elements used 
let inputElement = document.getElementById("input")
let spinnerElement = document.getElementById("spinner")
let iconElement = document.getElementById("icon")
let unitsList=[
    {lowUnit:'I',middleUnit:'V',highUnit:'X'},
    {lowUnit:'X',middleUnit:'L',highUnit:'C'},
    {lowUnit:'C',middleUnit:'D',highUnit:'M'},
    {lowUnit:'M',middleUnit:'M',highUnit:'M'}
]
let numberCopy=""

/**
 * This functions converts a decimal number into a roman
 * @param {numero} number - Value to tranform  
 * @param {Array} unitList - Array with selected units 
 * @returns romanNumber String digit converted in string 
 */

function convertNumberToRoman(number,unitList){
    // local variable of the number
    let romanNumberUnit=""
    // define the rules of roman number notation 
    romanNumberUnit= number < 4 ? unitList.lowUnit.repeat(number) : // numbers can be repeat max 3 times except V,L and D
                 number == 4 ? unitList.lowUnit + unitList.middleUnit : // number from left rest value from right number ej IX (10-1=9)
                 number < 9 ? unitList.middleUnit + unitList.lowUnit.repeat(number-5) : // number from right is added VI (5+1=6)
                 unitList.lowUnit + unitList.highUnit; // number 9
    return romanNumberUnit;
}

/**
 * Convert and concatenate each value from string number for the correct unit 
 * @param {String} numberString -String to convert to the correct units 
 * @param {String} multiplierLeft - Multiplicator used for units for the actual unit 
 * @param {String} multiplierRight - Multiplicator used for units for the right next unit 
 * @return {String}
 */

function getRomanNumber(numberString, multiplierLeft='none',multiplierRight=''){

    let romanNumber = "" 
    // iterate each number and his correspond unit list 
    numberString.forEach((string, i) => {
        //concatenate each unit 
        romanNumber = convertNumberToRoman(parseInt(string),unitsList[i]) + romanNumber
    });

    // check for number over 3999
    if(multiplierLeft != 'none'){
        //get number of I with number 4 avoid match any value
        let numberOfI= /I+$/g.test(romanNumber) ? romanNumber.match(/I+$/)[0].length : 4
        // define a regexs for match cases *I,*II,*III and replace for M
        let regexCorrection= new RegExp("I".repeat(numberOfI)+"$",'g')
        let regexMatchI= new RegExp("[V|X|L|C|D|M]"+"I".repeat(numberOfI)+"$",'g')
        // considering three cases 1) right I, this will change to M example V-I to V-M, 2) to avoid same simbol (13003003) X=MMM-III-III  X=MMM-MMMIII 3) when are IV,V,IX,X,IL,L .... set simbol 4) else 4=- to 4= in zero don't put multipicator
        stringCorrection = regexMatchI.test(romanNumber) ? multiplierLeft +"M".repeat(numberOfI)+multiplierRight :
                               /[≡|=|-]/g.test(multiplierLeft) && /I+$/g.test(romanNumber) ? (regexCorrection = /I+$/g ,"M".repeat(numberOfI)+multiplierRight):
                               romanNumber!=0 ? (regexCorrection = /.+/g,romanNumber+multiplierLeft) : "";
        // replace the last value and set the corrections for symbol
        romanNumber = romanNumber.replace(regexCorrection,stringCorrection)  
    }
    return romanNumber
}


/**
 * Clean a typed string and check if is a palindrome
 * @param {Number} number -Number typed by user cleaned
 */

function romanConverter(number) {
    let romanNumberString=""
    // convert the number into array and reverse
    let numberString=number.split("").reverse()
    // convert number into roman in base to the range
    if(number <= 3999 ){
        romanNumberString = getRomanNumber(numberString)
    }else if(number <= 3999999){
        // step 0 split the number 
        // first last 3 chars 
        let numberA= numberString.slice(3, numberString.length) // miles
        // after the rest of number 
        let numberB= numberString.slice(0, 3) // normla ≡
        let romanNumberA = getRomanNumber(numberA,"-")
        let romanNumberB = getRomanNumber(numberB)
        romanNumberString = romanNumberA + romanNumberB
    }else if(number <= 3999999999){
        // step 0 split the number 
        // first last 3 chars 
        let numberA= numberString.slice(6, numberString.length) // miles
        // after the rest of number 
        let numberB= numberString.slice(3, 6) // normal ≡
        // millones
        let numberC= numberString.slice(0, 3) // normal
        let romanNumberA = getRomanNumber(numberA,"=",parseInt(numberB.join()) < 4 ? "-" : "")
        let romanNumberB = getRomanNumber(numberB,"-")
        let romanNumberC = getRomanNumber(numberC)
        romanNumberString = romanNumberA + romanNumberB + romanNumberC
    }else if (number <= 3999999999999) {

        // first last 3 chars 
        let numberA= numberString.slice(9, numberString.length)
        let numberB= numberString.slice(6, 9) 
        let numberC= numberString.slice(3, 6) 
        let numberD= numberString.slice(0, 3) 

        let romanNumberA = getRomanNumber(numberA,"≡",parseInt(numberB.join()) < 4 ? "=" : "")
        let romanNumberB = getRomanNumber(numberB,"=",parseInt(numberC.join()) < 4 ? "-" : "")
        let romanNumberC = getRomanNumber(numberC,"-")
        let romanNumberD = getRomanNumber(numberD)

        romanNumberString = romanNumberA + romanNumberB + romanNumberC +romanNumberD
    }
    
    numberCopy=romanNumberString
    printAndStylingNumber(romanNumberString)
}

/**
 * check and clean the number typed for user
 */

function checkNumber() {
    // remove all left zeros
    let numberCleaned = inputElement.value.replace(/^[0]+/,"")
    inputElement.value=numberCleaned
    if(parseInt(numberCleaned) > 3999999999999){
        inputElement.value="3999999999999"
        romanConverter("3999999999999")
    }else if (parseInt(numberCleaned) > 0) {
        romanConverter(numberCleaned)
    }else{
        printAndStylingNumber("")
    }
}

let range3=document.getElementById("range3")
let range2=document.getElementById("range2")
let range1=document.getElementById("range1")
let range0=document.getElementById("range0")

/**
 * This print with style the number by span elements by blocks
 */

function printAndStylingNumber(number){
    // get trillions, millions, Thousands and hundreds
    let rangeUnit3= number.match(/[I|V|X|L|C|D|M]+(?=≡)/g) ? number.match(/[I|V|X|L|C|D|M]+(?=≡)/g)[0] : " "
    let rangeUnit2= number.match(/[I|V|X|L|C|D|M]+(?==)/g) ? number.match(/[I|V|X|L|C|D|M]+(?==)/g)[0] : " "
    let rangeUnit1= number.match(/[I|V|X|L|C|D|M]+(?=-)/g) ? number.match(/[I|V|X|L|C|D|M]+(?=-)/g)[0] : " "
    let rangeUnit0= number.match(/[I|V|X|L|C|D|M]+$/g) ? number.match(/[I|V|X|L|C|D|M]+$/g)[0] : " "
    // set value in span elements 
    range0.textContent=rangeUnit0
    range1.textContent=rangeUnit1
    range2.textContent=rangeUnit2
    range3.textContent=rangeUnit3
}

/**
 *  Copy roman number as clipboard
 */

 function copyNumber(){
    // get pre hidden 
    let clipboard = document.getElementById("clipboard")
    // set value to copy
    clipboard.textContent= numberCopy
    // click the div editable 
    clipboard.focus()
    // select all content 
    document.execCommand('selectAll', false, null)
    // copy text 
    document.execCommand("copy")
    // display none to avoid focus in input 
    clipboard.style.display="none"
    setTimeout(() => {
        clipboard.style.display="block"
    }, 50);
}