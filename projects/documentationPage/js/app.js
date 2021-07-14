// declare line elements from burger menu
let line1=document.getElementById("line1")
let line2=document.getElementById("line2")
let line3=document.getElementById("line3")
let burgerButton=document.getElementById("buttonBurger")
let tableContent=document.getElementById("tableContent")
let openMenu=false
let burgerMenuActive=false

/**
 * Handle burger button, toggle animation and display/hidde menu 
 * @param {Boolean} Status - Define if the menu is open or close
 */

function burgerMenu(status=true){
    //change estatus
    openMenu=!openMenu
    burgerMenuActive=status
    
    //disable button 
    burgerButton.disabled=true

    //toggle clases to make burger animation 
    line1.classList.toggle("burger-menu-line1")
    line2.classList.toggle("burger-menu-line2")
    line3.classList.toggle("burger-menu-line3")
    
    //Show table content with full size
    tableContent.className = openMenu ? "table-content-container full-table-content fadeIn" : "table-content-container full-table-content fadeOut"

    //active button y change status 
    setTimeout(() => {
        burgerButton.disabled=false
    }, 300);
}

/**
 * Get the code element from code block and copy clipboard
 * @param {Event} e - Click event  
 */

function copyCode(e){
    // get code element
    codeElement=e.target.parentElement.nextSibling.nextSibling.nextSibling
    // get content
    let codeToCopy = codeElement.textContent 
    // get pre hidden 
    let clipboard = document.getElementById("clipboard")
    // set value to copy
    clipboard.textContent= codeToCopy
    // click the div editable 
    clipboard.focus()
    // select all content 
    document.execCommand('selectAll', false, null)
    // copy text 
    document.execCommand("copy")
}

// root element
let root = document.querySelector(':root');
let darkModeActivate = false
let varNames = ['--text-color-main','--text-color-secondary','--shadow-color','--semi-black-color','--navbar-background','--gradient-background','--body-background','--var','--reserved-word','--function','--string']
let darkTheme = ['white','lightcyan','black','white','#323233','#1f1f1e','#252526','#79cffa','#1187ed','#e5e78e','#d0c9bf']
let lightTheme = ['black','darkslategrey','rgb(128 128 128 / 35%)','rgba(0, 0, 0, 0.65)','white','#f7f7f7','#f8f8ff90','rgb(160, 148, 148)','darkblue','darkgreen','brown']

/**
 * Change color of CSS vars to toggle between dark or light theme
 */

function darkMode(){
    // activate light theme 
    if(darkModeActivate) {
        // change status
        darkModeActivate=false
        varNames.forEach((name,i) => {
            // change each root variable with the value to get dark mode
            root.style.setProperty(name, lightTheme[i]);
        });
    }else{
        // activate dark theme 
        darkModeActivate=true
        varNames.forEach((name,i) => {
            root.style.setProperty(name, darkTheme[i]);
        });
    }
}
