//// Global variables 

// modal container element
const modalContainer=document.getElementById("modalContainer")
// image of modal slider 
const sliderImage=document.getElementById("sliderImage")
// caption of modal slider 
const sliderCaption=document.getElementById("sliderCaption")
// Array of modal images 
const modalSliderImages=[
    [{
        "imagePath":"./media/wireframe_home.png",
        "captionText":"Wireframe home section (1/3)",
        "altText":"Wireframe of home section"
    },
    {
        "imagePath":"./media/wireframe_projects.png",
        "captionText":"Wireframe projects section (2/3)",
        "altText":"Wireframe of projects section"
    },
    {
        "imagePath":"./media/wireframe_contact.png",
        "captionText":"Wireframe contact section (3/3)",
        "altText":"Wireframe of contact section"
    }],
    [{
        "imagePath":"./media/searchBar.png",
        "captionText":"Search by tag diagram (1/1)",
        "altText":"Search by tag diagram  (1/1)"
    }],
    [{
        "imagePath":"./media/html.png",
        "captionText":"index.html (1/5)",
        "altText":"image of html index file"
    },
    {
        "imagePath":"./media/css1.png",
        "captionText":"myStyles.css (2/5)",
        "altText":"image of css style file"
    },
    {
        "imagePath":"./media/css2.png",
        "captionText":"generalStyles.css (3/5)",
        "altText":"image of css style file"
    },
    {
        "imagePath":"./media/js1.png",
        "captionText":"app.js (4/5)",
        "altText":"image of js file"
    },
    {
        "imagePath":"./media/js2.png",
        "captionText":"fixedMenuAndModalSlider.js (5/5)",
        "altText":"image of js file"
    }]
]
// varibles of slider 
var currentOption = 0;
var currentIndex = 0;
var currentSize = 0;

//// Global functions

/**
 * Display web page after this load all media and show handle animations and styles
 */

function loader() {
    document.getElementById("app").style.display="block"
    document.getElementById("app").style.transitionDuration="0.5s"
    setTimeout(() => {
        document.getElementById("app").style.opacity="1"
        document.getElementById("loader").style.display="none"
    }, 10);
}  

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

/**
 * Disable all buttons in DOM 
 * @param {Boolean} disable - Condition to disable/ enable all buttons
 */
function disableButtons(disabled){

    // make an array of all buttons
    let buttonList=[...document.getElementsByTagName("button")]

    let status = disabled ? true : false 

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
        if(document.getElementById("fixedMenu").className=="fixed-button-menu hide-element"){
            displayFixedMenu()
        }
        sliderImage.src="#"
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
    document.getElementById("code").classList.toggle("first-button-position");
    document.getElementById("diagram").classList.toggle("second-button-position");
    document.getElementById("wireframe").classList.toggle("third-button-position");
}

/**
 * This funcition switch the class name of modal container to display the modal and his animation
 * @param {Boolean} showModal - Define if modal is displayed 
 */
function displayModal(showModal) {

    // check if modal is display or hide and change class name, and disable/enable body scroll
    modalContainer.className= showModal ? 
    (document.body.style.overflow="hidden","modal-container modal-open-animation") :
    (document.body.style.overflow="auto","modal-container modal-close-animation") ;

}

/**
 * Selected option of fixed menu and set first image of array 
 * @param {String} type - Option selected 
 */
function selectOption(type){

    // reset default values 
    this.currentOption=0;
    this.currentIndex = 0;
    this.currentSize = 0;
    
    // select fixed menu seccion
    currentOption= type=="wireframe" ? 0 : type=="diagram" ? 1 : 2
    // set first image of array
    sliderImage.src=modalSliderImages[currentOption][0].imagePath
    sliderImage.alt=modalSliderImages[currentOption][0].altText
    sliderCaption.textContent=modalSliderImages[currentOption][0].captionText
    currentSize=modalSliderImages[currentOption].length
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
        sliderImage.src=modalSliderImages[currentOption][currentIndex].imagePath
        sliderImage.alt=modalSliderImages[currentOption][currentIndex].altText
        sliderCaption.textContent=modalSliderImages[currentOption][currentIndex].captionText
        sliderImage.classList.toggle("transition-effect")
        sliderCaption.classList.toggle("transition-effect")
        document.getElementById("sliderContainer").scrollTo(0,0)
        setTimeout(() => {
            disableButtons(false)
        }, 300);
    }, 300);
}