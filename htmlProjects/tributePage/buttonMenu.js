
//// Global variables 

// modal container element
const modalContainer=document.getElementById("modalContainer")
// modal content element
const sliderImage=document.getElementById("sliderImage")
// modal image caption
const sliderCaption=document.getElementById("sliderCaption")
// Array of modal images 
const modalImages=[
    [{
        "image":"./media/wireframeView1.png",
        "captionText":"Wireframe Home (1/2)",
        "altText":"this is the alternative text"
    },
    {
        "image":"./media/wireframeView2.png",
        "captionText":"Wireframe Home (2/2)",
        "altText":"this is the alternative text"
    }],
    [{
        "image":"./media/wireframeView2.png",
        "captionText":"this is a static caption",
        "altText":"this is the alternative text"
    },
    {
        "image":"./media/digivice.png",
        "captionText":"this is a static caption",
        "altText":"this is the alternative text"
    }],
    [{
        "image":"./media/digivice.png",
        "captionText":"this is a static caption",
        "altText":"this is the alternative text"
    },
    {
        "image":"./media/digivice.png",
        "captionText":"this is a static caption",
        "altText":"this is the alternative text"
    }]
]
// array of object selected
var currentOption = 0;
var currentIndex = 0;
var currentSize = 0;



// current list 

//// Global functions

/**
 * This function handle multiple clicks of button elements displayed in the current DOM
 * @param {String} type - Type of button 
 */

function buttonMenu(type){

    // make synchronous code with a promise
    new Promise(resolve=>{
        // send a function resolve if response is true
        if(buttonHandler(type)){
            resolve()
        }
    }).then(()=>{
        // Enable all buttons 
        disableButtons(false)
    })
}


function disableButtons(disable){

    // make an array of all buttons
    let buttonList=[...document.getElementsByTagName("button")]

    let status = disable ? true : false 

    // disable or enable all buttons 
    buttonList.forEach(button => {
        button.disabled=status
    });

    
}


/**
 * Execute the correspond action for each  button in base of type param 
 * @param {String} type -Define the function of the button 
 * @returns Always return true to resolve the promise 
 */

function buttonHandler(type) {
    
    // check each type and execute code
    if(type=="openMenu" || type=="closeMenu"){
        disableButtons(true)
        displayFixedMenu()
    }else if(type=="code" || type=="diagram" || type=="wireframe"){
        // Display modal
        disableButtons(true)
        displayModal(true)
        displayFixedMenu()
        selectOption(type)
    }else if(type.target.id=="modalContainer"){
        disableButtons(true)
        // when type is closeModal
        displayModal(false)
    }else{
        // click inside modal
        return false
    }
    disableButtons(true)
    return true 
}


/**
 * Toogle classes of fixed menu to show and hide the options
 * @param {Boolean} showMenu - Condition to display/hide menu
 */

function displayFixedMenu() {

    // hide and show menu
    document.getElementById("fixedMenu").classList.toggle("hide-element")
    // toogle classes for each button to move it 
    document.getElementById("wireframe").classList.toggle("wireframe-button-position");
    document.getElementById("code").classList.toggle("code-button-position");
    document.getElementById("diagram").classList.toggle("diagram-button-position");
}


/**
 * This funcition switch the class name of modal container to display the modal and his animation
 * @param {Boolean} showModal - Define if modal is displayed 
 */

function displayModal(showModal) {

    // check if modal is display or hide and change class name
    modalContainer.className= showModal ? "modal-container modal-open-animation" :
    "modal-container modal-close-animation" ;

}

/**
 * Selected option of fixed menu and set first image of array 
 * @param {String} type - Option selected 
 */

function selectOption(type){
    
    // select fixed menu seccion
    currentOption= type=="wireframe" ? 0 : type=="diagram" ? 1 : 2
    // set first image of array
    sliderImage.src=modalImages[currentOption][0].image
    sliderCaption.textContent=modalImages[currentOption][0].captionText
    currentSize=modalImages[currentOption].length
}


/**
 * Display the images of the selected section and controled with the modal arrows
 * @param {String} type - Option selected 
 */

function modalSlider(action) {

    disableButtons(true)

    //check index and handle cases -1 and index bigger than length array 
    currentIndex+= action=="next" ? 1 : -1
    if(currentIndex <= -1 ){
        currentIndex=currentSize-1
    }else if(currentIndex >= currentSize){
        currentIndex=0
    }

    sliderImage.classList.toggle("transition-effect")
    sliderCaption.classList.toggle("transition-effect")

    setTimeout(() => {
        // set selected image 
        sliderImage.src=modalImages[currentOption][currentIndex].image
        sliderCaption.textContent=modalImages[currentOption][currentIndex].captionText
        sliderImage.classList.toggle("transition-effect")
        sliderCaption.classList.toggle("transition-effect")
        setTimeout(() => {
            disableButtons(false)
        }, 300);
    }, 300);

}

