//import components
import testComponent from './components/testComponent.js';
import cardComponent from './components/CardComponent.js';
// Import the 
import TypedText from './textTypedEffect.js'

new Vue({
  el: "#app",
  mounted() {
    console.log("parent mount")

    this.typeEffect()

    if(window.location.pathname=="/x1hibi/index.html"){
      this.typeEffectContent('home')
    }

    window.addEventListener('scroll',()=>{
      this.stickyNavbar()
    })

    this.checkDevice()

    window.addEventListener('resize',()=>{
      this.checkDevice()
    })

    ScrollReveal().reveal('.cardContainer',{delay:500,duration:1250, origin:"bottom", distance:"250%",reset:true, useDelay:"once"});

  },
  data: {
    subtitle: " ",
    caret: "|",
    projects:[
      {
        title:"To Do List",
        previewImage:"media/preview_33.jpg",
        urlProject:"https://todolisttesting.000webhostapp.com/",
        tags:['HTML','CSS','JS','PHP','Laravel','Vue']
      },
      {
        title:"Pop Movies",
        previewImage:"media/preview_31.jpg",
        urlProject:"https://proteco-proyect-010101.000webhostapp.com/",
        tags:['HTML','CSS','JS','PHP','Bootstrap']
      },
      {
        title:"D3 Heat Map",
        previewImage:"media/preview_18.jpg",
        urlProject:"https://codepen.io/x1hibi/full/ZEbMrrL",
        tags:['HTML','CSS','JS','D3']
      },
      {
        title:"D3 Scatter Plot",
        previewImage:"media/preview_17.jpg",
        urlProject:"https://codepen.io/x1hibi/full/GRpBwMj",
        tags:['HTML','CSS','JS','D3']
      },
      {
        title:"D3 Bar Chart",
        previewImage:"media/preview_16.jpg",
        urlProject:"https://codepen.io/x1hibi/full/VwvBvKL",
        tags:['HTML','CSS','JS','D3']
      },
      {
        title:"Pomodoro Clock",
        previewImage:"media/preview_15.jpg",
        urlProject:"https://codepen.io/x1hibi/full/YzyEOZP",
        tags:['HTML','CSS','JS','React']
      },
      {
        title:"JS Calculator",
        previewImage:"media/preview_14.jpg",
        urlProject:"https://codepen.io/x1hibi/full/YzyxLQZ",
        tags:['HTML','CSS','JS','React']
      },
      {
        title:"Drum Simulator",
        previewImage:"media/preview_13.jpg",
        urlProject:"https://codepen.io/x1hibi/full/mdeRPvm",
        tags:['HTML','CSS','JS','React']
      },
      {
        title:"Markdown Editor",
        previewImage:"media/preview_12.jpg",
        urlProject:"https://codepen.io/x1hibi/full/BaoKRQG",
        tags:['HTML','CSS','JS','React']
      },
      {
        title:"Random Anime Quotes",
        previewImage:"media/preview_11.jpg",
        urlProject:"https://codepen.io/x1hibi/full/wvKaLJq",
        tags:['HTML','CSS','JS','React']
      },
      {
        title:"Documentation Page",
        previewImage:"media/preview_4.jpg",
        urlProject:"https://codepen.io/x1hibi/full/YmyNaZ",
        tags:['HTML','CSS']
      },
      {
        title:"Landing Page",
        previewImage:"media/preview_3.jpg",
        urlProject:"https://codepen.io/x1hibi/full/pMJMKb",
        tags:['HTML','CSS']
      },
      {
        title:"Survey Form",
        previewImage:"media/preview_2.jpg",
        urlProject:"https://codepen.io/x1hibi/full/eqNPWr",
        tags:['HTML','CSS']
      },
      {
        title:"Tribute Page",
        previewImage:"media/preview_1.jpg",
        urlProject:"https://codepen.io/x1hibi/full/rXVroO",
        tags:['HTML','CSS']
      },
      
    ],

  },
  methods: {
    typeEffectContent(section){
      let home=["Hello my nickname is x1hibi 🐲,I'm a lover of chemistry 🧪 and science 🔬, and yes... also a tech geek 😎, my main area is the development of web applications 🌐💻 (Front-End and Back-End)"]
      let contact=["Contact..."]
      let StringsToType=section=="home" ? home : contact
      let options = {
        delayTimeBeforeTyping:500,
        blinkCaretRepetitionsAtStart:2,
        caretRepetitionsFullString:100,
        loops: 1,
        textTyped: StringsToType,
        idContainer:"typingEffectHome",
        typingSpeed:70,
        finalStringState:"typed",
        idCaret:"caretContent"
      }
      //create a new instance of effect
      let typed = new TypedText(options)
      //typed the list of strings
      typed.typingList()


    },
    typeEffect() {
      //define options of the effect
      
      let StringsToType=["Web Design","Front-End","Back-End","Full Stack Web"]
      
      let options = {
        blinkCaretRepetitionsAtEnd:10,
        blinkCaretRepetitionsAtStart:1,
        loops: 9999,
        textTyped: StringsToType,
      }
      //create a new instance of effect
      let typed = new TypedText(options)
      //typed the list of strings
      typed.typingList()

    },
    stickyNavbar(){
      let navbar=document.getElementById("navbar") 
      let headerHeight=document.getElementById("header").clientHeight
      //we change fixed postion when navbar is in the top and removed and also change his backgroud color
      if(window.scrollY>=headerHeight){
        navbar.style.position="fixed"
        navbar.style.background="#2b2727"
        navbar.style.zIndex="1"
      }else{
        navbar.style.position="static"
        navbar.style.background="#1b1b1b"
        navbar.style.zIndex="0"
      }

    },
    checkDevice(){
      let smartphone=/iPhone|Android/g.test(navigator.userAgent)
      let cards=[...document.getElementsByClassName("cardContainer")]
      console.log(cards)
      cards.forEach(card => {
        card.style.width= smartphone ? '100%' : '350px'
        
      });
    }

  },
  components: {
    'test-component': testComponent,
    'card-component': cardComponent,
  }

});

