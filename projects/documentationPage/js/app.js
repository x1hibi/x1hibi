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
    //tableContent.classList.toggle("full-table-content")
    if(openMenu){
        tableContent.className="table-content-container full-table-content fadeIn"
    }else{
        tableContent.className="table-content-container full-table-content fadeOut"
    }

    setTimeout(() => {
        //active button y change status 
        burgerButton.disabled=false
    }, 300);
    
}

/**
 * close menu burger only in mobile 
 */

function closeBurgerMenu(){

    if (burgerMenuActive) {
        burgerMenu('false')
    }

}

/**
 * Get the code element from code block and copy clipboard
 * @param {Event} - Click event  
 * @returns void 
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