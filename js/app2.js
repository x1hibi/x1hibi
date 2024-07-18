import cardComponent from './components/CardComponent.js';

createApp({
//import components
import cardComponent from './components/CardComponent.js';
// Import the module textTypedEffect
import TypedText from './textTypedEffect.js'
const { createApp, ref } = Vue
    data() {
      return {
        subtitle: " ",
        caret: "|",
        projectsBackup:[
          {
            title:"To Do List",
            previewImage:"media/preview_33.jpg",
            urlProject:"https://todolisttesting.000webhostapp.com/",
            description:'this is a description',
            tags:['HTML','CSS','JS','PHP','LARAVEL','VUE'],
          },
          {
            title:"Pop Movies",
            previewImage:"media/preview_31.jpg",
            urlProject:"https://proteco-proyect-010101.000webhostapp.com/",
            description:'this is a description',
            tags:['HTML','CSS','JS','PHP','BOOTSTRAP'],
          },
          {
            title:"D3 Heat Map",
            previewImage:"media/preview_18.jpg",
            urlProject:"https://codepen.io/x1hibi/full/ZEbMrrL",
            description:'this is a description',
            tags:['HTML','CSS','JS','D3'],
          },
          {
            title:"D3 Scatter Plot",
            previewImage:"media/preview_17.jpg",
            urlProject:"https://codepen.io/x1hibi/full/GRpBwMj",
            description:'this is a description',
            tags:['HTML','CSS','JS','D3'],
          },
          {
            title:"D3 Bar Chart",
            previewImage:"media/preview_16.jpg",
            urlProject:"https://codepen.io/x1hibi/full/VwvBvKL",
            description:'this is a description',
            tags:['HTML','CSS','JS','D3'],
          },
          {
            title:"Pomodoro Clock",
            previewImage:"media/preview_15.jpg",
            urlProject:"https://codepen.io/x1hibi/full/YzyEOZP",
            description:'this is a description',
            tags:['HTML','CSS','JS','REACT'],
          },
          {
            title:"JS Calculator",
            previewImage:"media/preview_14.jpg",
            urlProject:"https://codepen.io/x1hibi/full/YzyxLQZ",
            description:'this is a description',
            tags:['HTML','CSS','JS','REACT'],
          },
          {
            title:"Drum Simulator",
            previewImage:"media/preview_13.jpg",
            urlProject:"https://codepen.io/x1hibi/full/mdeRPvm",
            description:'this is a description',
            tags:['HTML','CSS','JS','REACT'],
          },
          {
            title:"Markdown Editor",
            previewImage:"media/preview_12.jpg",
            urlProject:"https://codepen.io/x1hibi/full/BaoKRQG",
            description:'this is a description',
            tags:['HTML','CSS','JS','REACT'],
          },
          {
            title:"Random Anime Quotes",
            previewImage:"media/preview_11.jpg",
            urlProject:"https://codepen.io/x1hibi/full/wvKaLJq",
            description:'this is a description',
            tags:['HTML','CSS','JS','REACT'],
          },
          {
            title:"Caesar Cipher",
            previewImage:"media/preview_8.jpg",
            urlProject:"./projects/caesarCipher/index.html",
            description:'This is a caesar cipher which is a substitution cipher which by using the Latin alphabet can provide 25 encryptions since there are 25 possible shifts.',
            tags:['HTML','CSS','JS','BOOTSTRAP'],
          },{
            title:"Roman Numeral Converter",
            previewImage:"media/preview_7.jpg",
            urlProject:"./projects/romanNumeralConverter/index.html",
            description:'This application converts numbers from the decimal system to Roman and, using the symbol of valium the system extends from 3999 to 3999999999999 numbers.',
            tags:['HTML','CSS','JS','BOOTSTRAP'],
          },
          {
            title:"Palindrome Checker",
            previewImage:"media/preview_6.jpg",
            urlProject:"./projects/palindromeChecker/index.html",
            description:'Palindrome checker is a tools to help to know easily if a string (word, number, date u other) can be reads the same backward as forward.',
            tags:['HTML','CSS','JS','BOOTSTRAP'],
          },
          {
            title:"Personal Portfolio Webpage",
            previewImage:"media/preview_5.jpg",
            urlProject:"https://x1hibi.github.io/x1hibi/",
            description:'This is my personal web page where I show my profile and web projects.',
            tags:['HTML','CSS','JS','VUE'],
          },
          {
            title:"Tecnical Documentation Page",
            previewImage:"media/preview_4.jpg",
            urlProject:"./projects/documentationPage/index.html",
            description:'On this documentation page you will be able to compare some of the most used programming languages ​​and make a quick syntax comparison with the most common and simple example, the lovely hello world program.',
            tags:['HTML','CSS','JS'],
          },
          {
            title:"Product Landing Page",
            previewImage:"media/preview_3.jpg",
            urlProject:"./projects/landingPage/index.html",
            description:'This is a landing page of the MSI Modern 15, which highlights its attractions, characteristics and multimedia of the product and its main purchase action',
            tags:['HTML','CSS'],
          },
          {
            title:"Survey Form",
            previewImage:"media/preview_2.jpg",
            urlProject:"./projects/surveyForm/index.html",
            description:'This questionnaire allows you to know how much you know about color blindness, as well as determine if you have color blindness using the Ishihara test.',
            tags:['HTML','CSS','JS'],
          },
          {
            title:"Tribute Page",
            previewImage:"media/preview_1.jpg",
            urlProject:"./projects/tributePage/index.html",
            description:'This is a tribute in honor to the singer Kōji Wada, who interpret a lot of anime songs, but especially remembered by his Digimon songs, you can listen to his album Koji Wada Digimon Memorial Best on our page.',
            tags:['HTML','CSS','JS'],
          },
        ],
        projects:'',
        searchValue:"",
        lastsearchValue:" ",
        allowedTags:["HTML","CSS","JS","REACT","VUE","PHP","PYTHON","LARAVEL","BOOTSTRAP","D3"],
        emailSubject:"",
        emailContent:"",
      }
    },
    mounted(){
      console.log("mounted")
      console.log("mounted")
      //make a copy non mutable of array projects
      this.projects=[...this.projectsBackup]

      this.typeEffect()

      // Make effect only in home section 
      if(window.location.pathname=="/x1hibi/" || window.location.pathname=="/x1hibi/index.html" || window.location.pathname=="/index.html"){
        this.typeEffectContent()
      }

      // Make better!
      //resize search bar
      window.addEventListener('click',()=>{
        let searchInput=document.getElementById("searchInput")
        if(searchInput){
          if(searchInput==document.activeElement){
            searchInput.parentElement.style.width="1024px"
            searchInput.placeholder="HTML CSS JS REACT VUE PHP PYTHON LARAVEL BOOTSTRAP D3"
          }else{
            searchInput.parentElement.style.width="200px"
            searchInput.placeholder="Search by tags"
          }
        }
      })
    },
    methods:{
      /**
     * Auto type my areas in the banner 
     */
     typeEffect() {
      // set content to typed
      let StringsToType=["Web Design","Front-End","Back-End","Full Stack Web"]
      //define options of the effect
      let options = {
        blinkCaretRepetitionsAtEnd:8,
        blinkCaretRepetitionsAtStart:2,
        blinkDuration:700,
        typingSpeed:55,
        loops: 9999,
        textTyped: StringsToType,
      }
      //create a new instance of effect
      let typed = new TypedText(options)
      //typed the list of strings
      typed.typingList()
    },
    /**
     * Type my personal info into main element in home section 
     */
    typeEffectContent(){
      let myAbstract=["     My nickname is x1hibi 🐉, I'm a lover of chemistry ⚗️, science 🔬, anime 🇯🇵 and videogames 🎮 , and yes... also a tech geek 😎, my main area is the development of web applications 🌐💻 (Front-End and Back-End)"]
      let options = {
        delayTimeBeforeTyping:500,
        blinkCaretRepetitionsAtStart:2,
        blinkDuration:700,
        caretRepetitionsFullString:100,
        loops: 1,
        textTyped: myAbstract,
        idContainer:"typingEffectHome",
        typingSpeed:45,
        finalStringState:"typed",
        idCaret:"caretContent"
      }
      //create a new instance of effect
      let typed = new TypedText(options)
      //typed the list of strings
      typed.typingList()
    },
    /**
     * Search all projects that match with tags typed 
     */
    sortByTags(){
      let searchInput=document.getElementById("searchInput")
      //focus search input 
      searchInput.focus()
      // check if enter a valid tags
      // clean the string with a regex and convert into array
      let tags =this.searchValue.replace(/[-|\s|,]+/g," ").toUpperCase().split(" ")
      //check if typed tags are in allowed list and get final clean array of tags
      let validTags=[]
      tags.forEach((tag)=>{
          if(this.allowedTags.includes(tag)){
            validTags.push(tag)
          }
      })

      // Avoid exceution for useless cases 
      if(this.searchValue.length>0 & this.searchValue!=this.lastsearchValue){
        if(validTags.length >0 ){
          // array with sort projects
          let sortProjects=[]

          // check each tag
          let projectsToCheck=[...this.projectsBackup]
          for (let i = 0; i < validTags.length; i++) {
            //create a copy all projects 
            for (let j = 0; j < projectsToCheck.length; j++) {
              //check if tag is typed are in the current proyect 
              if(projectsToCheck[j].tags.includes(validTags[i])){
                //add project to array 
                sortProjects.push(projectsToCheck[j])
                //remove project to array 
                projectsToCheck.splice(j,1)
                // reset index in -1 to restart in index 0
                j=-1 
                continue
              }
            }
          }
          //save last search
          this.lastsearchValue=this.searchValue
          //set close animation 
          document.getElementsByClassName("cards-container")[0].className="cards-container cards-container-close-animation"
          setTimeout(() => {
            this.projects=sortProjects
            document.getElementsByClassName("cards-container")[0].className="cards-container cards-container-open-animation"
            window.scrollTo(0, document.getElementById("banner").offsetHeight)
          }, 300);
        }else {
          // TO MAKE BETTER !
          // input effect 
          searchInput.style.opacity="0"
          searchInput.disabled=true
          setTimeout(() => {
            searchInput.style.opacity="1"
            this.searchValue="Tag not found !"
            setTimeout(() => {
              searchInput.style.opacity="0"
              setTimeout(() => {
                this.searchValue=""
                searchInput.style.opacity="1"
                searchInput.disabled=false
              }, 250);
            }, 1000);
          }, 250);
        }
      }
      
      // Down keyboard in movil devices
      if(/Android|iPhone/g.test(navigator.userAgent)){
        // Create a input and focus it, and use styles to prevent see it in body
        let hiddenInput = document.createElement('input')
        hiddenInput.setAttribute('type', 'text')
        hiddenInput.className="hiddenInput"
        document.getElementsByClassName("search-option")[0].appendChild(hiddenInput);
        hiddenInput.focus()
        setTimeout(() => {
          //Disable the input that force to close the keyboard
          hiddenInput.disabled="true"
        }, 10);
      }
    },
    /**
     * Load all projects when search input are empty
     */
    resetSort(){
      // check when search input lenght are 0 
      if(this.searchValue.length==0){
        document.getElementsByClassName("cards-container")[0].className="cards-container cards-container-close-animation"
        setTimeout(() => {
          // load backup array with all projects
          this.projects=this.projectsBackup
          document.getElementsByClassName("cards-container")[0].className="cards-container cards-container-open-animation"
        }, 300);
      }
    },
    /**
     * Use mailto API to use the local app to send a email 
     */
    sendEmail(){
      //send email using mailto
      let mail="mailto:dinoox1hibi@gmail.com?subject="+this.emailSubject+"&body="+this.emailContent
      window.open(mail, '_blank');
      // empty fields
      this.emailSubject=""
      this.emailContent=""
    }
  },components: {
    'card-component': cardComponent,
  }

  }).mount('#app')