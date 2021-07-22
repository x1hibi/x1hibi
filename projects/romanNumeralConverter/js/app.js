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
let romanNumberStyles={"≡":'',"=":'',"-":'',none:''}
let numberCopy=""
let lastAllowedNumber=""


/**
 * This functions converts arabics number into a roman 
 * @param {numero} number - Value to tranform  
 * @returns romanNumber String digit converted in string 
 */

function numberToRoman(number,unitList){
    // local variable of the number
    let romanNumberUnit=""
    // define the rules of roman number notation 
    romanNumberUnit= number < 4 ? unitList.lowUnit.repeat(number) : // numbers can be repeat max 3 times except V,L and D
                 number == 4 ? unitList.lowUnit + unitList.middleUnit : // number from left rest value from right number ej IX (10-1=9)
                 number < 9 ? unitList.middleUnit + unitList.lowUnit.repeat(number-5) : // number from right is added VI (5+1=6)
                 unitList.lowUnit + unitList.highUnit;
    //console.log("romanNumberUnit",romanNumberUnit)
    return romanNumberUnit;
}


/**
 * convert and concatenate each value from number
 * @param {String} numberString -String to count
 * @param {String} symbol - String used as multiplicator
 * @returns 
 */

function getRomanNumber(numberString, multiplierLeft='none',multiplierRight=''){

    // define the container of roman traslate
    let romanNumber = "" 
    // iterate each number 
    numberString.forEach((string, i) => {
        romanNumber = numberToRoman(parseInt(string),unitsList[i]) + romanNumber
    });

    //let numberStyle = romanNumber // for none multiplier
    // check symbol 
    if(multiplierLeft != 'none'){
        // check cases for the four cases with regular expresions 
        let numberSize=romanNumber.length

        if(/[V|X|L|C|D|M]I$/g.test(romanNumber)){
            // STEP 1 replace all I for M and set multiplier
            romanNumber = romanNumber.replace(/I$/g,`${multiplierLeft}M${multiplierRight}`)
            // STEP 2 save style 
            // // cut word and save style
            // numberStyle  = romanNumber.slice(0,numberSize-1)
            // // remplace I for M and set correct multiplier
            
            // // miles counter
            // romanNumberStyles["none"]='M'+romanNumberStyles["none"]
        }else if(/[V|X|L|C|D|M]II$/g.test(romanNumber)){
            // cut word and save style
            //numberStyle= romanNumber.slice(0,numberSize-2)
            // remplace I for M and set correct multiplier
            romanNumber = romanNumber.replace(/II$/g,`${multiplierLeft}MM${multiplierRight}`)
            //romanNumberStyles["none"]='MM'+romanNumberStyles["none"]
        }else if(/[V|X|L|C|D|M]III$/g.test(romanNumber)){
            // cut word and save style
            //numberStyle= romanNumber.slice(0,numberSize-3)
            // remplace I for M and set correct multiplier
            romanNumber = romanNumber.replace(/III$/g,`${multiplierLeft}MMM${multiplierRight}`)
            //romanNumberStyles["none"]='MMM'+romanNumberStyles["none"]

        }else if(/[≡|=|-]/g.test(multiplierLeft) && /I+$/g.test(romanNumber)){
            console.log("Entre al caso especial ")
            romanNumber = romanNumber.replace(/I+$/g,"M".repeat(numberSize)+multiplierRight)
        }else{
            // avoid set miltipler dubler when romanNumber ==""
            if(romanNumber!=0){
                romanNumber = romanNumber+multiplierLeft
            }else{
                console.log("soy un cero y no pongo multiplicador ")
            }
        }
    }

    return romanNumber
}


/**
 * Clean a typed string and check if is a palindrome
 * @param {Number} number -Number typed by user cleaned
 */

function main(number) {
    let realRomanNumber=""
    // reset values for style
    romanNumberStyles={"≡":'',"=":'',"-":'',none:''}
    // define the roman value
    // convert the number into string and reverse 
    let numberString=number.replace(/^0*/g,"").split("").reverse()
    // convert number into roman in base to the range
    if(number <= 3999 ){
        realRomanNumber = getRomanNumber(numberString)
        console.log(realRomanNumber)
    }else if(number <= 3999999){

        // step 0 split the number 
        // first last 3 chars 
        let numberA= numberString.slice(3, numberString.length) // miles
        // after the rest of number 
        let numberB= numberString.slice(0, 3) // normla ≡
        let romanNumberA = getRomanNumber(numberA,"-")
        let romanNumberB = getRomanNumber(numberB)
        console.log(numberB)
        realRomanNumber = romanNumberA + romanNumberB
        console.log(realRomanNumber)

    }else if(number <= 3999999999){
        // step 0 split the number 
        // first last 3 chars 
        let numberA= numberString.slice(6, numberString.length) // miles
        // after the rest of number 
        let numberB= numberString.slice(3, 6) // normla ≡
        console.log(parseInt(numberB.join()),parseInt(numberB.join()) < 4)
        // millones
        let numberC= numberString.slice(0, 3) // normla 

        let romanNumberA = getRomanNumber(numberA,"=",parseInt(numberB.join()) < 4 ? "-" : "")
        let romanNumberB = getRomanNumber(numberB,"-")
        let romanNumberC = getRomanNumber(numberC)
        console.log(romanNumberA)
        console.log(romanNumberB)
        console.log(romanNumberC)
        realRomanNumber = romanNumberA + romanNumberB + romanNumberC
        console.log(realRomanNumber)

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

        realRomanNumber = romanNumberA + romanNumberB + romanNumberC +romanNumberD
        console.log(realRomanNumber)


        
    }
    
    numberCopy=realRomanNumber
    printAndStylingNumber(realRomanNumber)

}

/**
 * check and clean the number typed for user
 */

function checkNumber() {
    // remove all not allowed simbols and all left zeros 
    let numberCleaned = inputElement.value.replace(/^[0]+/,"")
    inputElement.value=numberCleaned
    if(parseInt(numberCleaned) > 3999999999999){
        console.log("entre")
        inputElement.value="3999999999999"
        main("3999999999999")
    }else if (parseInt(numberCleaned) > 0) {
        main(numberCleaned)
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
    
    let rangeUnit3= number.match(/[I|V|X|L|C|D|M]+(?=≡)/g) ? number.match(/[I|V|X|L|C|D|M]+(?=≡)/g)[0] : " "
    let rangeUnit2= number.match(/[I|V|X|L|C|D|M]+(?==)/g) ? number.match(/[I|V|X|L|C|D|M]+(?==)/g)[0] : " "
    let rangeUnit1= number.match(/[I|V|X|L|C|D|M]+(?=-)/g) ? number.match(/[I|V|X|L|C|D|M]+(?=-)/g)[0] : " "
    let rangeUnit0= number.match(/[I|V|X|L|C|D|M]+$/g) ? number.match(/[I|V|X|L|C|D|M]+$/g)[0] : " "
    
    console.log("range 0:",rangeUnit0)
    console.log("range 1:",rangeUnit1)
    console.log("range 2:",rangeUnit2)
    console.log("range 3:",rangeUnit3)

    range0.textContent=rangeUnit0
    range1.textContent=rangeUnit1
    range2.textContent=rangeUnit2
    range3.textContent=rangeUnit3
    
    // range0.textContent= units[0]

    

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