// Define elements used 
let currentRot = 13 // as default 
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let alphabetIds = {'A':0, 'B':1, 'C':2, 'D':3, 'E':4, 'F':5, 'G':6, 'H':7, 'I':8, 'J':9, 'K':10, 'L':11, 'M':12,'N':13, 'O':14, 'P':15, 'Q':16, 'R':17, 'S':18, 'T':19, 'U':20, 'V':21, 'W':22, 'X':23, 'Y':24, 'Z':25}

function telephoneCheck(str) {
  //We check the six variants
  let strWithoutLateralSpaces=str.trim();
  let regex=/^(1\s?)?(\d{3}|\(\d{3}\)(?!-))(\s|-)?\d{3}(\s|-)?\d{4}$/g

  let rule1=rule1.value  // "(1\s?)?"
  let regexStr="^"+rule1+

  //Make a coincidence with the regex
  if(strWithoutLateralSpaces.match(regex)){
    return true
  }else{
    return false
  }
}
