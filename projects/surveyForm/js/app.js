/**
 * Display web page after this load all media and show handle animations and styles
 */

function loader(loadPage) {
    // when page is load 
    if(loadPage){
        document.getElementsByClassName('loader')[0].style.opacity="0"
        setTimeout(() => {
            document.getElementById("loader").style.display="none"
            document.getElementById("main").style.display="block"
            document.getElementById("fixedMenu").style.display="block"
            document.body.style.animation="gradient 2s ease-in-out 1.5s infinite alternate"
            stickyMenu=false
        }, 1510);
    }else{
        document.getElementById('startButton').style.display="block"
    }
}  

// Declare buttons 
let questionnaireButton=document.getElementById("questionnaireButton")
let questionnaireContainer=document.getElementById("survey-form")
let testButton=document.getElementById("testButton")
let testContainer=document.getElementById("test-form")
let resultQuestionnaireContainer=document.getElementById("questionnaireResult")
let resultTestContainer=document.getElementById("testResult")
let counterQuestionnaire=0
let submitForm=false
let username=""
let normalVision=0
let typesBlindness=[0,0,0,0,0]
let redGreen=0
let resultTest=""

/**
 * Handle the class in sections to display each section 
 * @param {string} section - Section to display
 */
function displaySection(section){
    questionnaireContainer.className= section=="questionnaire" ? "questionnaire-container" : "questionnaire-container hidden-section"
    testContainer.className= section=="questionnaire" ? "test-container hidden-section" : "test-container"
    questionnaireButton.className= section=="questionnaire" ? "option-selected option-button" : "option-button"
    testButton.className= section=="questionnaire" ? "option-button" : "option-button option-selected"
    resultQuestionnaireContainer.className="questionnaire-result-container hidden-section"
    resultTestContainer.className="test-result-container hidden-section"
    //reset forms 
    if(submitForm){
        questionnaireContainer.reset()
        testContainer.reset()
    }
}

/**
 * Prevent the submit and get data from form and evaluate the questionnaire and display result
 * @param {event} e - current event in form default is submit 
 */
function calfQuestionnaire(e){
    // Prevent default submit 
    e.preventDefault();
    submitForm=true

    //create a form data
    let formData = new FormData(document.getElementById('survey-form'));

    // Get data from form as JSON
    dataForm=Object.fromEntries(formData);
    // Convert JSON to a array
    let anwsers=Object.entries(dataForm)

    //save username
    username=dataForm.name

    //count each correct answer
    for (let i = 4; i < 14; i++) {
        if(anwsers[i][1]==0){
            counterQuestionnaire+=1
        }
    }

    // Print result in view
    document.getElementById("username").textContent=username
    document.getElementById("questionnaire-result").textContent=`${counterQuestionnaire}/10`
    
    // Display result
    resultQuestionnaireContainer.className="questionnaire-result-container"
    questionnaireContainer.className="questionnaire-container hidden-section"
}


/**
 * Prevent the submit and get data from form and evaluate the test and display result
 * @param {event} e - current event in form default is submit 
 */
 function resultIshiharaTest(e){
    // Prevent default submit 
    e.preventDefault();
    submitForm=true

    let formData = new FormData(document.getElementById('test-form'));

    // Get data from form as JSON
    dataForm=Object.fromEntries(formData);
    // Convert JSON to a array
    let anwsers=Object.entries(dataForm)

    //count each correct answer
    anwsers.forEach((plate,i) => {
        //evaluation for normal/poor
        if (i<15 & plate[1]==0) {
            normalVision+=1
        //evaluation for types of blindness
        }else if(i>13 & i<17){
            if(plate[1]==0){
                typesBlindness[0]+=1
            }else if(plate[1]==1){
                typesBlindness[1]+=1
            }else if(plate[1]==2){
                typesBlindness[2]+=1
            }else if(plate[1]==3){
                typesBlindness[3]+=1
            }else if(plate[1]==4){
                typesBlindness[4]+=1
            }
        //evaluation for type red-green
        }else if(i>17 & i<23){
            if(plate[1]==1){
                redGreen+=1
            }
        }
    });

    //Define result of test
    if(normalVision>8 & redGreen<3){
        resultTest="Normal vision 🤓"
    }else if(normalVision<=8){
        resultTest="Deficient vision 🥺"
        // Define a gama if exist
        if (redGreen>2) {
            resultTest+=" with Red-green color blindness 😭"
            //Define posible type
            if(typesBlindness[1]>1){
                resultTest+=" type protanopia 🤯"
            }else if(typesBlindness[2]>1){
                resultTest+=" type protanomaly 🤯"
            }else if(typesBlindness[3]>1){
                resultTest+=" type deuteranopia 🤯"
            }else if(typesBlindness[4]>1){
                resultTest+=" type deuteranomaly 🤯"
            }
        }
    }

    // Print result in view
    document.getElementById("test-result").textContent=resultTest
    
    // Display result
    resultTestContainer.className="test-result-container"
    testContainer.className="test-container hidden-section"
}